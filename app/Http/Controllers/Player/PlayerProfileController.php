<?php


namespace App\Http\Controllers\Player;

use App\Http\Controllers\Controller;
use App\Http\Requests\Player\PlayerProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PlayerProfileController extends Controller
{
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

        return back()->with('success', 'Profile saved.');
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
}
