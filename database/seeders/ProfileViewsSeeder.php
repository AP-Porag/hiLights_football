<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\Player;
use App\Models\ProfileView;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProfileViewsSeeder extends Seeder
{
    public function run(): void
    {
        $players = Player::all();
        $scouts = User::whereIn('role', ['scout', 'agent', 'club'])->get();
        $countries = Country::all();

        $userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        ];

        $totalViews = 0;

        foreach ($players as $player) {
            // Featured players get more views (150-350)
            // Premium players get more (80-200)
            // Free players get fewer (10-80)
            if ($player->is_featured) {
                $viewCount = rand(150, 350);
            } elseif ($player->user->isPremium()) {
                $viewCount = rand(80, 200);
            } else {
                $viewCount = rand(10, 80);
            }

            $viewerCountries = $countries->random(min(rand(5, 15), $countries->count()));

            for ($i = 0; $i < $viewCount; $i++) {
                // 60% authenticated scouts, 40% anonymous guests
                $isAuthenticated = rand(1, 100) <= 60;
                $viewer = $isAuthenticated ? $scouts->random() : null;
                $viewerCountry = $viewerCountries->random();

                ProfileView::create([
                    'player_id' => $player->id,
                    'viewer_user_id' => $viewer?->id,
                    'viewer_role' => $viewer?->role ?? 'guest',
                    'viewer_country_id' => $viewerCountry->id,
                    'viewer_ip' => $this->fakeIp(),
                    'user_agent' => $userAgents[array_rand($userAgents)],
                    'referrer' => $this->fakeReferrer(),
                    'viewed_at' => now()->subDays(rand(0, 90))
                        ->subHours(rand(0, 23))
                        ->subMinutes(rand(0, 59)),
                ]);
                $totalViews++;
            }

            // Update denormalized count on player
            $uniqueCountries = ProfileView::where('player_id', $player->id)
                ->distinct('viewer_country_id')
                ->count('viewer_country_id');

            $player->update([
                'profile_views_count' => $viewCount,
                'countries_reached_count' => $uniqueCountries,
            ]);
        }

        $this->command->info("✓ Generated {$totalViews} profile views with country distribution");
    }

    private function fakeIp(): string
    {
        return rand(1, 255) . '.' . rand(0, 255) . '.' . rand(0, 255) . '.' . rand(1, 254);
    }

    private function fakeReferrer(): ?string
    {
        $referrers = [
            'https://www.google.com/',
            'https://www.transfermarkt.com/',
            'https://highlightsfootball.com/players',
            null,
            null,
            null,  // many will be direct visits
        ];
        return $referrers[array_rand($referrers)];
    }
}
