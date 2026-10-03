<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\Web\YouTubeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class YouTubeController extends Controller
{
    public function __construct(private readonly YouTubeService $youTubeService) {}

    public function durations(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'urls' => ['required', 'array', 'max:50'],
            'urls.*' => ['string', 'max:500'],
        ]);

        return response()->json([
            'durations' => (object) $this->youTubeService->durationsForUrls($validated['urls']),
        ]);
    }
}
