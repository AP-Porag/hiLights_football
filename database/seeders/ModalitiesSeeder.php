<?php

namespace Database\Seeders;

use App\Models\Modality;
use Illuminate\Database\Seeder;

class ModalitiesSeeder extends Seeder
{
    public function run(): void
    {
        $modalities = [
            ['code' => 'football',     'name' => 'Football'],
            ['code' => 'futsal',       'name' => 'Futsal'],
            ['code' => 'beach_soccer', 'name' => 'Beach Soccer'],
        ];

        foreach ($modalities as $modality) {
            Modality::create($modality);
        }

        $this->command->info('✓ Seeded 3 modalities');
    }
}
