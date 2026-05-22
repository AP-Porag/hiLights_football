<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('🌍 Seeding HiLights Football platform...');

        $this->call([
            // ─── Lookup data (must run first) ───
            CountriesSeeder::class,
            PositionsSeeder::class,
            ModalitiesSeeder::class,
            PlansSeeder::class,

            // ─── Users & profiles ───
            AdminUserSeeder::class,
            PlayersSeeder::class,
            ClubHistoriesSeeder::class,
            ScoutsSeeder::class,

            // ─── Monetization ───
            SubscriptionsSeeder::class,

            // ─── Engagement (run after all profiles exist) ───
            ScoutRatingsSeeder::class,
            SavedPlayersSeeder::class,
            ProfileViewsSeeder::class,

            // ─── Misc ───
            ContactMessagesSeeder::class,
        ]);

        $this->command->info('✅ Platform seeded successfully!');
        $this->command->info('📧 Admin login: admin@hilightsfootball.com / password');
    }
}
