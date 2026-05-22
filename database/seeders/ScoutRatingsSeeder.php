<?php

namespace Database\Seeders;

use App\Models\Player;
use App\Models\Scout;
use App\Models\ScoutRating;
use Illuminate\Database\Seeder;

class ScoutRatingsSeeder extends Seeder
{
    public function run(): void
    {
        $scouts = Scout::all();
        $players = Player::all();

        $notes = [
            'Excellent positioning and work rate. One to watch closely over the next 18 months.',
            'Outstanding technical ability for his age. Needs to add physical strength.',
            'Strong in the air and excellent passing range from the back. Future captain material.',
            'Quick feet, low centre of gravity. Compared favorably to top wingers in the youth system.',
            'Reliable performer. Brings the team together with his work rate and attitude.',
            'Two-footed and intelligent. Reads the game well beyond his years.',
            'Strong leadership qualities. Captain of his current team.',
            'Sharp finisher in the box. Needs to improve his hold-up play.',
            'Pacy and direct. Beats defenders consistently in 1v1 situations.',
            'Tactically excellent. Disciplined and never out of position.',
            '',
            'Promising profile but needs to add consistency.',
            'Excellent attitude in training and during games. Great potential.',
            'Versatile player capable of filling multiple roles. Valuable asset.',
            'Has all the technical attributes — just needs more competitive minutes.',
        ];

        $totalRatings = 0;

        foreach ($scouts as $scout) {
            // Each scout rates 8-20 random players
            $ratingsCount = rand(8, 20);
            $playersToRate = $players->random(min($ratingsCount, $players->count()));

            foreach ($playersToRate as $player) {
                // Generate realistic ratings (mostly 3-5, occasional 2)
                $technical = $this->weightedRating();
                $physical = $this->weightedRating();
                $mental = $this->weightedRating();
                $overall = (int) round(($technical + $physical + $mental) / 3);

                ScoutRating::create([
                    'scout_id' => $scout->id,
                    'player_id' => $player->id,
                    'technical' => $technical,
                    'physical' => $physical,
                    'mental' => $mental,
                    'overall' => $overall,
                    'notes' => $notes[array_rand($notes)] ?: null,
                    'is_visible' => true,
                    'created_at' => now()->subDays(rand(1, 90)),
                ]);
                $totalRatings++;
            }
        }

        // Update denormalized rating counts on players
        foreach ($players as $player) {
            $ratings = $player->ratings;
            if ($ratings->count() > 0) {
                $player->update([
                    'ratings_count' => $ratings->count(),
                    'avg_rating' => round($ratings->avg('overall'), 2),
                    'avg_technical' => round($ratings->avg('technical'), 2),
                    'avg_physical' => round($ratings->avg('physical'), 2),
                    'avg_mental' => round($ratings->avg('mental'), 2),
                ]);
            }
        }

        $this->command->info("✓ Generated {$totalRatings} scout ratings");
        $this->command->info('✓ Updated player rating averages');
    }

    /**
     * Most ratings 3-5, occasional 2, rare 1.
     * This produces realistic distributions.
     */
    private function weightedRating(): int
    {
        $rand = rand(1, 100);
        if ($rand <= 5) return 2;
        if ($rand <= 20) return 3;
        if ($rand <= 60) return 4;
        return 5;
    }
}
