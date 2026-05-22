<?php

namespace Database\Seeders;

use App\Models\ClubHistory;
use App\Models\Player;
use Illuminate\Database\Seeder;

class ClubHistoriesSeeder extends Seeder
{
    /**
     * Generate realistic past club history per player.
     * Most players have 2-4 historical entries (excluding their current club).
     */
    public function run(): void
    {
        $clubsByCountry = [
            'BRA' => ['Flamengo Base', 'São Paulo FC Juvenil', 'Palmeiras Sub-15', 'Vasco da Gama', 'Atlético MG', 'Botafogo Sub-17', 'Internacional Base', 'Coritiba'],
            'ARG' => ['CA Independiente', 'Vélez Sarsfield', 'Racing Club', 'Lanús', 'San Lorenzo', 'Argentinos Juniors', 'Banfield'],
            'PRT' => ['SL Benfica B', 'Sporting CP B', 'FC Porto B', 'Vitória SC', 'Boavista FC', 'Rio Ave'],
            'ESP' => ['CD Leganés', 'Getafe CF', 'Real Sociedad B', 'Villarreal B', 'CA Osasuna B'],
            'FRA' => ['AS Saint-Étienne', 'OGC Nice', 'Stade Rennais', 'LOSC Lille', 'AS Monaco Academy'],
            'ITA' => ['Atalanta Primavera', 'Juventus Primavera', 'Inter Milan Primavera', 'Lazio Primavera'],
            'DEU' => ['Schalke 04 U19', 'Eintracht Frankfurt U19', 'Bayer Leverkusen U19'],
            'NLD' => ['Feyenoord U19', 'FC Twente U19', 'AZ Alkmaar U19'],
            'ENG' => ['Arsenal U18', 'Liverpool U18', 'Tottenham U18', 'Newcastle U18'],
            'SEN' => ['Diambars Academy', 'AS Douanes', 'Casa Sports'],
            'GHA' => ['Asante Kotoko', 'WAFA SC', 'Liberty Professionals'],
            'NGA' => ['Akwa United', 'Plateau United', 'Sunshine Stars'],
        ];

        $players = Player::with('nationality')->get();
        $currentYear = (int) now()->format('Y');

        foreach ($players as $player) {
            $age = $player->age;
            $countryCode = $player->nationality->code;
            $availableClubs = $clubsByCountry[$countryCode] ?? $clubsByCountry['BRA'];

            // Number of historical entries: 2-4 depending on age
            $historyCount = max(2, min(4, intdiv($age - 12, 2)));

            // Start year (oldest entry)
            $startYear = $currentYear - $historyCount;

            // Add current club for current year
            ClubHistory::create([
                'player_id' => $player->id,
                'year' => $currentYear,
                'club_name' => $player->current_club,
                'sort_order' => 0,
            ]);

            // Generate past entries
            $shuffledClubs = collect($availableClubs)->shuffle();
            for ($i = 0; $i < $historyCount; $i++) {
                $year = $startYear + $i;
                if ($year === $currentYear) continue;

                // 60% chance of having a club for any given past year (some years skipped)
                if (rand(1, 100) > 40) {
                    ClubHistory::create([
                        'player_id' => $player->id,
                        'year' => $year,
                        'club_name' => $shuffledClubs[$i] ?? $availableClubs[array_rand($availableClubs)],
                        'sort_order' => $i + 1,
                    ]);
                }
            }
        }

        $this->command->info('✓ Generated club histories for ' . $players->count() . ' players');
    }
}
