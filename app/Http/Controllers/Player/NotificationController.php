<?php

namespace App\Http\Controllers\Player;

use App\Http\Controllers\Controller;
use App\Models\ProfileView;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class NotificationController extends Controller
{
    // Bell panel er feed — profile view based notification + unread count
    public function feed(Request $request)
    {
        $user    = $request->user();
        $profile = $user->playerProfile;

        if (! $profile) {
            return response()->json(['notifications' => [], 'unreadCount' => 0]);
        }

        $lastRead = $user->notifications_read_at
            ? Carbon::parse($user->notifications_read_at)
            : null;

        // unread = last read er por koto notun view eseche
        $unreadCount = ProfileView::where('player_profile_id', $profile->id)
            ->when($lastRead, fn($q) => $q->where('created_at', '>', $lastRead))
            ->count();

        // panel list — viewer wise latest (dedup), max 15
        $views = ProfileView::with('viewer:id,name,role', 'viewer.playerProfile:id,user_id,photo_path')
            ->where('player_profile_id', $profile->id)
            ->latest()
            ->get()
            ->unique('viewer_id')
            ->take(15)
            ->values();

        $notifications = $views->map(fn($v) => [
            'id'                => $v->id,
            'name'              => $v->viewer?->name ?? 'Someone',
            'role'              => $v->viewer?->role ? ucfirst($v->viewer->role) : null,
            'viewed_at'         => $v->created_at->diffForHumans(),
            'player_profile_id' => $v->viewer?->playerProfile?->id,
            'avatar'            => $v->viewer?->playerProfile?->photo_url,
            'unread'            => $lastRead ? $v->created_at->gt($lastRead) : true,
        ]);

        return response()->json([
            'notifications' => $notifications,
            'unreadCount'   => $unreadCount,
        ]);
    }

    // Panel open korle sob notification read mark
    public function markRead(Request $request)
    {
        $request->user()->forceFill(['notifications_read_at' => now()])->save();

        return response()->json(['ok' => true]);
    }
}
