<?php

namespace Database\Seeders;

use App\Models\Player;
use App\Models\SavedPlayer;
use App\Models\Scout;
use Illuminate\Database\Seeder;

class SavedPlayersSeeder extends Seeder
{
    public function run(): void
    {
        $scouts = Scout::all();
        $players = Player::all();

        $notes = [
            'Follow up next month after league restart.',
            'Schedule a live viewing for the cup match in October.',
            'Discuss with head of recruitment before next transfer window.',
            'Excellent profile — needs more minutes at higher level.',
            'Could be valuable in our reserve squad transition pathway.',
            'Watch closely, may need fast-track decision.',
            'Strong potential but parent club may want significant fee.',
            '',
            'Priority target for 2026 summer recruitment.',
            'Verify medical history before any further interest.',
            'Speak to agent directly — see Rafael at Talentos S/A.',
            '',
            'Multiple positions, very valuable squad option.',
            '',
        ];

        $tagOptions = [
            ['follow_up'],
            ['priority'],
            ['watch_list'],
            ['priority', 'follow_up'],
            ['ready_now'],
            ['development_project'],
            ['set_piece_specialist'],
            [],
            [],
            ['urgent'],
        ];

        $totalSaved = 0;

        foreach ($scouts as $scout) {
            // Each scout saves 5-15 players
            $saveCount = rand(5, 15);
            $playersToSave = $players->random(min($saveCount, $players->count()));

            foreach ($playersToSave as $player) {
                SavedPlayer::create([
                    'scout_id' => $scout->id,
                    'player_id' => $player->id,
                    'notes' => $notes[array_rand($notes)] ?: null,
                    'tags' => $tagOptions[array_rand($tagOptions)],
                    'created_at' => now()->subDays(rand(1, 60)),
                ]);
                $totalSaved++;
            }

            // Update scout's saved count
            $scout->update(['saved_players_count' => $scout->savedPlayers()->count()]);
        }

        $this->command->info("✓ Generated {$totalSaved} saved player bookmarks");
    }
}
