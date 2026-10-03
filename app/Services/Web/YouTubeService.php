<?php

namespace App\Services\Web;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class YouTubeService
{
    private const API_URL = 'https://www.googleapis.com/youtube/v3/videos';

    private const CACHE_TTL_DAYS = 7;

    private const MAX_IDS_PER_REQUEST = 50;

    public function extractVideoId(?string $url): ?string
    {
        if (! $url) {
            return null;
        }

        $pattern = '~(?:youtube\.com/(?:watch\?(?:.*&)?v=|embed/|shorts/|live/|v/)|youtu\.be/)([A-Za-z0-9_-]{11})~';

        return preg_match($pattern, $url, $matches) ? $matches[1] : null;
    }

    /**
     * @param  array<int, mixed>  $urls
     * @return array<string, string>  videoId => "m:ss" / "h:mm:ss"
     */
    public function durationsForUrls(array $urls): array
    {
        $ids = collect($urls)
            ->map(fn($url) => $this->extractVideoId(is_string($url) ? $url : null))
            ->filter()
            ->unique()
            ->values()
            ->all();

        return $this->durations($ids);
    }

    /**
     * @param  array<int, string>  $ids
     * @return array<string, string>
     */
    public function durations(array $ids): array
    {
        $result = [];
        $missing = [];

        foreach ($ids as $id) {
            $cached = Cache::get($this->cacheKey($id));

            if ($cached !== null) {
                $result[$id] = $cached;
            } else {
                $missing[] = $id;
            }
        }

        if ($missing === []) {
            return $result;
        }

        $apiKey = config('services.youtube.key');

        if (! $apiKey) {
            Log::warning('YouTube duration: YOUTUBE_API_KEY is not set.');

            return $result;
        }

        foreach (array_chunk($missing, self::MAX_IDS_PER_REQUEST) as $chunk) {
            try {
                $response = Http::timeout(8)->get(self::API_URL, [
                    'part' => 'contentDetails',
                    'id' => implode(',', $chunk),
                    'key' => $apiKey,
                ]);
            } catch (ConnectionException $e) {
                Log::warning('YouTube duration: connection failed.', ['message' => $e->getMessage()]);

                continue;
            }

            if ($response->failed()) {
                Log::warning('YouTube duration: API request failed.', [
                    'status' => $response->status(),
                    'error' => $response->json('error.message'),
                ]);

                continue;
            }

            foreach ($response->json('items', []) as $item) {
                $id = $item['id'] ?? null;
                $iso = $item['contentDetails']['duration'] ?? null;

                if (! $id || ! $iso) {
                    continue;
                }

                $formatted = $this->formatDuration($this->toSeconds($iso));

                if ($formatted === null) {
                    continue;
                }

                Cache::put($this->cacheKey($id), $formatted, now()->addDays(self::CACHE_TTL_DAYS));
                $result[$id] = $formatted;
            }
        }

        return $result;
    }

    private function toSeconds(string $iso): int
    {
        try {
            $interval = new \DateInterval($iso);
        } catch (\Exception) {
            return 0;
        }

        return ($interval->d * 86400) + ($interval->h * 3600) + ($interval->i * 60) + $interval->s;
    }

    private function formatDuration(int $seconds): ?string
    {
        if ($seconds <= 0) {
            return null; // live stream / upcoming premiere
        }

        $hours = intdiv($seconds, 3600);
        $minutes = intdiv($seconds % 3600, 60);
        $secs = $seconds % 60;

        if ($hours > 0) {
            return sprintf('%d:%02d:%02d', $hours, $minutes, $secs);
        }

        return sprintf('%d:%02d', $minutes, $secs);
    }

    private function cacheKey(string $id): string
    {
        return "youtube:duration:{$id}";
    }
}
