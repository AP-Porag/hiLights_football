<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AccessRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccessRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = AccessRequest::query()->latest();

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('organization', 'like', "%{$search}%");
            });
        }

        $requests = $query->paginate(15)->withQueryString()->through(fn($r) => [
            'id'           => $r->id,
            'name'         => $r->name,
            'organization' => $r->organization,
            'role'         => $r->role,
            'email'        => $r->email,
            'country'      => $r->country,
            'phone'        => $r->phone,
            'interest'     => $r->interest,
            'message'      => $r->message,
            'status'       => $r->status,
            'created_at'   => $r->created_at?->diffForHumans(),
        ]);

        return Inertia::render('admin/access-requests/Index', [
            'requests' => $requests,
            'filters'  => $request->only(['status', 'search']),
            'counts'   => [
                'all'       => AccessRequest::count(),
                'pending'   => AccessRequest::where('status', 'pending')->count(),
                'contacted' => AccessRequest::where('status', 'contacted')->count(),
                'approved'  => AccessRequest::where('status', 'approved')->count(),
                'rejected'  => AccessRequest::where('status', 'rejected')->count(),
            ],
        ]);
    }

    public function updateStatus(Request $request, AccessRequest $accessRequest)
    {
        $request->validate([
            'status' => ['required', 'in:pending,contacted,approved,rejected'],
        ]);

        $accessRequest->update([
            'status'      => $request->status,
            'reviewed_at' => now(),
        ]);

        return back()->with('status', 'Status updated.');
    }

    public function destroy(AccessRequest $accessRequest)
    {
        $accessRequest->delete();

        return back()->with('status', 'Request deleted.');
    }
}
