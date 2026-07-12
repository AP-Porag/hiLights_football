<?php


namespace App\Http\Controllers\Player;

use App\Http\Controllers\Controller;
use App\Http\Requests\Player\PlayerProfileUpdateRequest;
use App\Models\PlayerProfile;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PlayerProfileController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $profile = $user->playerProfile;

        // User এর সাথে সম্পর্কিত ডেটা লোড করুন
        // যেমন: matches, teams, statistics ইত্যাদি

        return Inertia::render('player/dashboard/Index', [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'dob' => $user->dob?->format('Y-m-d'),
                    'nationality' => $user->nationality,
                    'created_at' => $user->created_at?->format('Y-m-d H:i:s'),
                    'player_profile' => $user->playerProfile,
                ]
            ]
        ]);
    }



    public function edit(Request $request)
    {

        $user = $request->user();
        $profile = $user->playerProfile;

        return Inertia::render('player/profile/Edit', [
            'user' => [
                'name'        => $user->name,
                'dob'         => $user->dob?->format('Y-m-d'),
                'nationality' => $user->nationality,
            ],
            'profile' => $profile ? [
                ...$profile->toArray(),
                'photo_url' => $profile->photo_url, // accessor
            ] : null,
        ]);
    }

    public function update(PlayerProfileUpdateRequest $request)
    {
        $data = $request->validated();
        $user = $request->user();

        // shared field gula users table-e sync
        $user->update([
            'name'        => $data['full_name'],
            'dob'         => $data['dob'],
            'nationality' => $data['nationality'],
        ]);

        // profile payload (shared field + photo bad diye)
        $payload = collect($data)->except([
            'full_name',
            'dob',
            'nationality',
            'photo',
        ])->all();

        // photo upload -> photo_path column-e set (payload banano-r POR)
        if ($request->hasFile('photo')) {
            // purano photo delete (thakle)
            if ($user->playerProfile?->photo_path) {
                Storage::disk('public')->delete($user->playerProfile->photo_path);
            }

            $payload['photo_path'] = $this->storeUpload(
                $request->file('photo'),
                'players/player-photos'
            );
        }

        $user->playerProfile()->updateOrCreate(
            ['user_id' => $user->id],
            $payload
        );

        return redirect()->route('player.dashboard')
            ->with('success', 'Profile saved.');
    }

    /**
     * Store an uploaded file without any path resolution issues.
     *
     * Uses move_uploaded_file() which is designed for temp uploads and never
     * calls getRealPath(), fopen(), or any path resolution that fails on Windows.
     * Works with all file types: PDFs, JPEGs, PNGs, WebP, etc.
     *
     * @param UploadedFile|null $file
     * @param string $dir Directory path relative to storage/app/public (e.g. 'providers/photos')
     * @return string|null Stored file path relative to public disk, or null if invalid
     */

    private function storeUpload(?UploadedFile $file, string $dir): ?string
    {
        if (!$file || !$file->isValid()) {
            return null;
        }

        $photo_path = storage_path('app/public/' . $dir);

        if (!is_dir($photo_path)) {
            mkdir($photo_path, 0755, true);
        }

        $filename = $file->hashName();

        $file->move(
            $photo_path,
            $filename
        );

        return $dir . '/' . $filename;
    }

    public function updateLists(Request $request)
    {
        $data = $request->validate([
            'videos'              => ['sometimes', 'array'],
            'videos.*.label'      => ['nullable', 'string', 'max:50'],
            'videos.*.url'        => ['nullable', 'string', 'max:255'],

            'club_history'        => ['sometimes', 'array'],
            'club_history.*.year' => ['nullable'],
            'club_history.*.club' => ['nullable', 'string', 'max:255'],

            'transfer_history'        => ['sometimes', 'array'],
            'transfer_history.*.year' => ['nullable'],
            'transfer_history.*.club' => ['nullable', 'string', 'max:255'],

            'achievements'            => ['sometimes', 'array'],
            'achievements.*.year'     => ['nullable'],
            'achievements.*.title'    => ['nullable', 'string', 'max:255'],

            'competitions'            => ['sometimes', 'array'],
            'competitions.*.name'     => ['nullable', 'string', 'max:255'],
            'competitions.*.year'     => ['nullable'],

            'matches'                 => ['sometimes', 'array'],
            'matches.*.home'          => ['nullable', 'string', 'max:255'],
            'matches.*.score'         => ['nullable', 'string', 'max:20'],
            'matches.*.away'          => ['nullable', 'string', 'max:255'],
            'matches.*.goals'         => ['nullable'],
            'matches.*.assists'       => ['nullable'],
            'matches.*.minutes'       => ['nullable', 'string', 'max:20'],
        ]);

        $profile = $request->user()->playerProfile()->firstOrCreate(
            ['user_id' => $request->user()->id]
        );

        $profile->fill($data);

        // videos ashle first url ke video_url-e sync
        if (array_key_exists('videos', $data)) {
            $first = collect($data['videos'])->first(fn($v) => !empty($v['url'] ?? null));
            if ($first) {
                $profile->video_url = $first['url'];
            }
        }

        $profile->save();

        return back();
    }

    public function updateFields(Request $request)
    {
        $data = $request->validate([
            'full_name'     => ['sometimes', 'nullable', 'string', 'max:255'],
            'dob'           => ['sometimes', 'nullable', 'date'],
            'nationality'   => ['sometimes', 'nullable', 'string', 'size:2'],
            'gender'        => ['sometimes', 'nullable', 'string', 'max:10'],
            'height'        => ['sometimes', 'nullable', 'integer'],
            'weight'        => ['sometimes', 'nullable', 'integer'],
            'birth_city'    => ['sometimes', 'nullable', 'string', 'max:255'],
            'birth_country' => ['sometimes', 'nullable', 'string', 'size:2'],
            'current_club'  => ['sometimes', 'nullable', 'string', 'max:255'],
            'in_team_since' => ['sometimes', 'nullable', 'string', 'max:7'],
            'agent'         => ['sometimes', 'nullable', 'string', 'max:255'],
            'modality'      => ['sometimes', 'nullable', 'string', 'max:50'],
            'positions'     => ['sometimes', 'array'],
            'positions.*'   => ['string', 'max:10'],
            'foot'          => ['sometimes', 'nullable', 'string', 'max:20'],
            'video_url'     => ['sometimes', 'nullable', 'url', 'max:255'],
            'videos'          => ['sometimes', 'array'],
            'videos.*.label'  => ['nullable', 'string', 'max:50'],
            'videos.*.url'    => ['nullable', 'string', 'max:255'],
            'photo'         => ['sometimes', 'image', 'mimes:jpeg,png', 'max:5120'],
            'club_history'        => ['sometimes', 'array'],
            'club_history.*.year' => ['nullable'],
            'club_history.*.club' => ['nullable', 'string', 'max:255'],
        ]);

        $user = $request->user();

        // user table-er field (name/dob/nationality)
        if (array_key_exists('full_name', $data)) {
            $user->name = $data['full_name'];
        }
        if (array_key_exists('dob', $data)) {
            $user->dob = $data['dob'];
        }
        if (array_key_exists('nationality', $data)) {
            $user->nationality = $data['nationality'];
        }
        $user->save();

        // player_profile-er field
        $profile = $user->playerProfile()->firstOrCreate(['user_id' => $user->id]);
        $profileData = collect($data)->except(['full_name', 'dob', 'nationality', 'photo'])->toArray();

        if ($request->hasFile('photo')) {
            $profileData['photo_path'] = $this->storeUpload($request->file('photo'), 'players/player-photos');
        }

        $profile->fill($profileData);

        // videos ashle first url ke video_url-e sync koro (100% + purano video_url binding thik thake)
        if (array_key_exists('videos', $data)) {
            $first = collect($data['videos'])->first(fn($v) => !empty($v['url'] ?? null));
            if ($first) {
                $profile->video_url = $first['url'];
            }
        }

        $profile->save();

        return back();
    }

    public function playerDetails($id)
    {
        $player = PlayerProfile::with('user')
            ->where('id', $id)
            ->firstOrFail();

        return Inertia::render('player/profile/public/new-detail', [
            'player' => $player,
        ]);
    }
}
