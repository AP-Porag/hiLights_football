<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlansSeeder extends Seeder
{
    public function run(): void
    {
        Plan::create([
            'slug' => 'free',
            'name' => 'Free',
            'description' => 'Get your profile online and start being discovered.',
            'monthly_price' => 0,
            'annual_price' => 0,
            'currency' => 'EUR',
            'target_role' => 'player',
            'features' => [
                ['feature' => 'Public profile page',          'included' => true],
                ['feature' => 'Highlight video',              'included' => true],
                ['feature' => 'Basic profile stats',          'included' => true],
                ['feature' => 'Visible to scouts globally',   'included' => true],
                ['feature' => 'See last 3 profile views',     'included' => true],
                ['feature' => 'Unlimited views history',      'included' => false],
                ['feature' => 'Country analytics map',        'included' => false],
                ['feature' => 'Scout contact details',        'included' => false],
                ['feature' => 'Priority search placement',    'included' => false],
                ['feature' => 'Featured profile badge',       'included' => false],
            ],
            'is_active' => true,
            'sort_order' => 1,
        ]);

        Plan::create([
            'slug' => 'premium',
            'name' => 'Premium',
            'description' => 'Unlock full visibility and analytics for serious players.',
            'monthly_price' => 9.90,
            'annual_price' => 95.00,
            'currency' => 'EUR',
            'target_role' => 'player',
            'features' => [
                ['feature' => 'Everything in Free',           'included' => true],
                ['feature' => 'Unlimited profile views history', 'included' => true],
                ['feature' => 'Full country analytics map',   'included' => true],
                ['feature' => 'See who viewed your profile',  'included' => true],
                ['feature' => 'Scout contact visibility',     'included' => true],
                ['feature' => 'Priority search placement',    'included' => true],
                ['feature' => 'Featured profile badge',       'included' => true],
                ['feature' => 'Scout interaction history',    'included' => true],
                ['feature' => 'Profile PDF download',         'included' => true],
                ['feature' => 'Email alerts for views',       'included' => true],
            ],
            'is_active' => true,
            'sort_order' => 2,
        ]);

        Plan::create([
            'slug' => 'agent',
            'name' => 'Agent',
            'description' => 'Manage and represent multiple players professionally.',
            'monthly_price' => 24.90,
            'annual_price' => 249.00,
            'currency' => 'EUR',
            'target_role' => 'agent',
            'features' => [
                ['feature' => 'Manage up to 10 player profiles',   'included' => true],
                ['feature' => 'Verified agent badge',              'included' => true],
                ['feature' => 'Advanced scouting search tools',    'included' => true],
                ['feature' => 'Bulk profile editing',              'included' => true],
                ['feature' => 'Dedicated agent dashboard',         'included' => true],
                ['feature' => 'Priority support',                  'included' => true],
                ['feature' => 'Export player data (CSV)',          'included' => true],
            ],
            'max_managed_profiles' => 10,
            'is_active' => true,
            'sort_order' => 3,
        ]);

        $this->command->info('✓ Seeded 3 subscription plans');
    }
}
