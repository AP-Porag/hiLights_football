<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionsSeeder extends Seeder
{
    public function run(): void
    {
        $positions = [
            ['code' => 'GK',  'name' => 'Goalkeeper',          'category' => 'goalkeeper', 'sort_order' => 1],
            ['code' => 'CB',  'name' => 'Centre Back',         'category' => 'defender',   'sort_order' => 2],
            ['code' => 'LB',  'name' => 'Left Back',           'category' => 'defender',   'sort_order' => 3],
            ['code' => 'RB',  'name' => 'Right Back',          'category' => 'defender',   'sort_order' => 4],
            ['code' => 'CDM', 'name' => 'Defensive Midfielder', 'category' => 'midfielder', 'sort_order' => 5],
            ['code' => 'CM',  'name' => 'Central Midfielder',  'category' => 'midfielder', 'sort_order' => 6],
            ['code' => 'CAM', 'name' => 'Attacking Midfielder', 'category' => 'midfielder', 'sort_order' => 7],
            ['code' => 'LW',  'name' => 'Left Winger',         'category' => 'forward',    'sort_order' => 8],
            ['code' => 'RW',  'name' => 'Right Winger',        'category' => 'forward',    'sort_order' => 9],
            ['code' => 'ST',  'name' => 'Striker',             'category' => 'forward',    'sort_order' => 10],
            ['code' => 'CF',  'name' => 'Centre Forward',      'category' => 'forward',    'sort_order' => 11],
        ];

        foreach ($positions as $position) {
            Position::create($position);
        }

        $this->command->info('✓ Seeded 11 football positions');
    }
}
