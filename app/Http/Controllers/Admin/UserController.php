<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Intl\Countries;

class UserController extends Controller
{
    public function index(Request $request)
    {

        $query = User::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");

                // দেশের পুরো নাম → কোড (Bangladesh → BD)
                try {
                    $exactCode = Countries::getAlpha2Code($search);
                    $q->orWhere('nationality', $exactCode);
                } catch (\Exception $e) {
                    // যদি সরাসরি ২ অক্ষরের কোড হয়
                    if (strlen($search) === 2 && ctype_alpha($search)) {
                        $q->orWhere('nationality', strtoupper($search));
                    }
                }

                // দেশের নামের আংশিক টাইপ → সম্ভাব্য কোড (Bra → BR)
                $allCountries = Countries::getNames('en');
                $matchingCodes = [];
                foreach ($allCountries as $code => $name) {
                    if (stripos($name, $search) !== false) {
                        $matchingCodes[] = $code;
                    }
                }
                if (!empty($matchingCodes)) {
                    $q->orWhereIn('nationality', $matchingCodes);
                }
            });
        }

        if ($role = $request->input('role')) {
            if ($role !== 'all') {
                $query->where('role', $role);
            }
        }

        $filteredQuery = clone $query;
        $total = $filteredQuery->count();

        // সব দেশের তালিকা প্রস্তুত (frontend dropdown-এর জন্য)
        $countries = [];
        foreach (Countries::getNames('en') as $code => $name) {
            $countries[] = ['code' => $code, 'name' => $name];
        }

        $users = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString()
            ->through(fn($user) => [
                'id'           => $user->id,
                'name'         => $user->name,
                'email'        => $user->email,
                'nationality'  => $user->nationality,  // শুধু কোড পাঠাচ্ছি
                'role'         => $user->role,
                'subscription' => $user->subscription_plan ?? 'Free',
                'status'       => $user->status ?? 'Active',
                'joined'       => $user->created_at->format('Y-m-d'),
            ]);



        return Inertia::render('admin/users/Index', [
            'users'     => $users,
            'filters'   => $request->only(['search', 'role']),
            'total'     => $total,
            'countries' => collect(Countries::getNames('en'))
                ->map(fn($name, $code) => ['code' => $code, 'name' => $name])
                ->values()
                ->toArray(),
        ]);
    }

    // store মেথড (আগের মতোই)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:users,email',
            'password'    => 'required|min:6',
            'role'        => 'required|in:Player,Scout,Agent,Club,Admin',
            'nationality' => 'nullable|string|size:2',
        ]);

        User::create([
            'name'        => $validated['name'],
            'email'       => $validated['email'],
            'password'    => bcrypt($validated['password']),
            'role'        => $validated['role'],
            'nationality' => strtoupper($validated['nationality'] ?? ''),
        ]);

        return redirect()->route('users.index')->with('success', 'User created.');
    }
    public function edit($id)
    {
        $user = User::findOrFail($id);
        $countries = [];
        foreach (Countries::getNames('en') as $code => $name) {
            $countries[] = ['code' => $code, 'name' => $name];
        }

        return Inertia::render('admin/users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'nationality' => $user->nationality,
                'role' => $user->role,
                'subscription' => $user->subscription_plan ?? 'Free',
                'status' => $user->status ?? 'Active',
            ],
            'countries' => $countries,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            // 'email' => 'required|email|unique:users,email,' . $user->id,
            // 'password' => 'nullable|min:6',
            'role' => 'required|in:Player,Scout,Agent,Club,Admin',
            'nationality' => 'nullable|string|size:2',
            // 'subscription' => 'nullable|string|in:Free,Premium,Agent',
            'status' => 'nullable|string|in:Active,Suspended,Pending',
        ]);

        $user->name = $validated['name'];
        // $user->email = $validated['email'];
        // if (!empty($validated['password'])) {
        //     $user->password = Hash::make($validated['password']);
        // }
        $user->role = $validated['role'];
        $user->nationality = strtoupper($validated['nationality'] ?? '');
        // $user->subscription_plan = $validated['subscription'] ?? 'Free';
        $user->status = $validated['status'] ?? 'Active';
        $user->save();

        return redirect()->route('users.index')->with('success', 'User updated.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted.');
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        $countries = [];
        foreach (Countries::getNames('en') as $code => $name) {
            $countries[] = ['code' => $code, 'name' => $name];
        }

        return Inertia::render('admin/users/Show', [
            'user' => [
                'id'           => $user->id,
                'name'         => $user->name,
                'email'        => $user->email,
                'nationality'  => $user->nationality,
                'role'         => $user->role,
                'subscription' => $user->subscription_plan ?? 'Free',
                'status'       => $user->status ?? 'Active',
                'joined'       => $user->created_at->format('Y-m-d'),
            ],
            'countries' => $countries,  // optional, might not be needed in show page
        ]);
    }

    /**
     * Suspend or reactivate a user.
     */
    public function suspend($id)
    {
        $user = User::findOrFail($id);

        // Toggle status
        $user->status = ($user->status === 'Suspended') ? 'Active' : 'Suspended';
        $user->save();

        return redirect()->route('users.index')
            ->with('success', $user->status === 'Suspended'
                ? 'User suspended.'
                : 'User reactivated.');
    }
}
