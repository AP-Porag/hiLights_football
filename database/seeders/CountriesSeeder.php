<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountriesSeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            // South America (priority for player base)
            ['name' => 'Brazil',        'code' => 'BRA', 'flag_emoji' => '🇧🇷', 'continent' => 'South America'],
            ['name' => 'Argentina',     'code' => 'ARG', 'flag_emoji' => '🇦🇷', 'continent' => 'South America'],
            ['name' => 'Uruguay',       'code' => 'URY', 'flag_emoji' => '🇺🇾', 'continent' => 'South America'],
            ['name' => 'Colombia',      'code' => 'COL', 'flag_emoji' => '🇨🇴', 'continent' => 'South America'],
            ['name' => 'Chile',         'code' => 'CHL', 'flag_emoji' => '🇨🇱', 'continent' => 'South America'],
            ['name' => 'Peru',          'code' => 'PER', 'flag_emoji' => '🇵🇪', 'continent' => 'South America'],
            ['name' => 'Ecuador',       'code' => 'ECU', 'flag_emoji' => '🇪🇨', 'continent' => 'South America'],
            ['name' => 'Paraguay',      'code' => 'PRY', 'flag_emoji' => '🇵🇾', 'continent' => 'South America'],
            ['name' => 'Venezuela',     'code' => 'VEN', 'flag_emoji' => '🇻🇪', 'continent' => 'South America'],
            ['name' => 'Bolivia',       'code' => 'BOL', 'flag_emoji' => '🇧🇴', 'continent' => 'South America'],

            // Europe (priority for scouts)
            ['name' => 'Portugal',      'code' => 'PRT', 'flag_emoji' => '🇵🇹', 'continent' => 'Europe'],
            ['name' => 'Spain',         'code' => 'ESP', 'flag_emoji' => '🇪🇸', 'continent' => 'Europe'],
            ['name' => 'France',        'code' => 'FRA', 'flag_emoji' => '🇫🇷', 'continent' => 'Europe'],
            ['name' => 'Italy',         'code' => 'ITA', 'flag_emoji' => '🇮🇹', 'continent' => 'Europe'],
            ['name' => 'Germany',       'code' => 'DEU', 'flag_emoji' => '🇩🇪', 'continent' => 'Europe'],
            ['name' => 'England',       'code' => 'ENG', 'flag_emoji' => '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'continent' => 'Europe'],
            ['name' => 'Netherlands',   'code' => 'NLD', 'flag_emoji' => '🇳🇱', 'continent' => 'Europe'],
            ['name' => 'Belgium',       'code' => 'BEL', 'flag_emoji' => '🇧🇪', 'continent' => 'Europe'],
            ['name' => 'Switzerland',   'code' => 'CHE', 'flag_emoji' => '🇨🇭', 'continent' => 'Europe'],
            ['name' => 'Austria',       'code' => 'AUT', 'flag_emoji' => '🇦🇹', 'continent' => 'Europe'],
            ['name' => 'Poland',        'code' => 'POL', 'flag_emoji' => '🇵🇱', 'continent' => 'Europe'],
            ['name' => 'Croatia',       'code' => 'HRV', 'flag_emoji' => '🇭🇷', 'continent' => 'Europe'],
            ['name' => 'Serbia',        'code' => 'SRB', 'flag_emoji' => '🇷🇸', 'continent' => 'Europe'],
            ['name' => 'Greece',        'code' => 'GRC', 'flag_emoji' => '🇬🇷', 'continent' => 'Europe'],
            ['name' => 'Turkey',        'code' => 'TUR', 'flag_emoji' => '🇹🇷', 'continent' => 'Europe'],
            ['name' => 'Norway',        'code' => 'NOR', 'flag_emoji' => '🇳🇴', 'continent' => 'Europe'],
            ['name' => 'Sweden',        'code' => 'SWE', 'flag_emoji' => '🇸🇪', 'continent' => 'Europe'],
            ['name' => 'Denmark',       'code' => 'DNK', 'flag_emoji' => '🇩🇰', 'continent' => 'Europe'],
            ['name' => 'Russia',        'code' => 'RUS', 'flag_emoji' => '🇷🇺', 'continent' => 'Europe'],
            ['name' => 'Ukraine',       'code' => 'UKR', 'flag_emoji' => '🇺🇦', 'continent' => 'Europe'],

            // Africa
            ['name' => 'Senegal',       'code' => 'SEN', 'flag_emoji' => '🇸🇳', 'continent' => 'Africa'],
            ['name' => 'Nigeria',       'code' => 'NGA', 'flag_emoji' => '🇳🇬', 'continent' => 'Africa'],
            ['name' => 'Ghana',         'code' => 'GHA', 'flag_emoji' => '🇬🇭', 'continent' => 'Africa'],
            ['name' => 'Ivory Coast',   'code' => 'CIV', 'flag_emoji' => '🇨🇮', 'continent' => 'Africa'],
            ['name' => 'Cameroon',      'code' => 'CMR', 'flag_emoji' => '🇨🇲', 'continent' => 'Africa'],
            ['name' => 'Morocco',       'code' => 'MAR', 'flag_emoji' => '🇲🇦', 'continent' => 'Africa'],
            ['name' => 'Algeria',       'code' => 'DZA', 'flag_emoji' => '🇩🇿', 'continent' => 'Africa'],
            ['name' => 'Egypt',         'code' => 'EGY', 'flag_emoji' => '🇪🇬', 'continent' => 'Africa'],
            ['name' => 'Tunisia',       'code' => 'TUN', 'flag_emoji' => '🇹🇳', 'continent' => 'Africa'],
            ['name' => 'South Africa',  'code' => 'ZAF', 'flag_emoji' => '🇿🇦', 'continent' => 'Africa'],
            ['name' => 'Mali',          'code' => 'MLI', 'flag_emoji' => '🇲🇱', 'continent' => 'Africa'],
            ['name' => 'Guinea',        'code' => 'GIN', 'flag_emoji' => '🇬🇳', 'continent' => 'Africa'],

            // North & Central America
            ['name' => 'United States', 'code' => 'USA', 'flag_emoji' => '🇺🇸', 'continent' => 'North America'],
            ['name' => 'Canada',        'code' => 'CAN', 'flag_emoji' => '🇨🇦', 'continent' => 'North America'],
            ['name' => 'Mexico',        'code' => 'MEX', 'flag_emoji' => '🇲🇽', 'continent' => 'North America'],
            ['name' => 'Costa Rica',    'code' => 'CRI', 'flag_emoji' => '🇨🇷', 'continent' => 'North America'],
            ['name' => 'Panama',        'code' => 'PAN', 'flag_emoji' => '🇵🇦', 'continent' => 'North America'],
            ['name' => 'Honduras',      'code' => 'HND', 'flag_emoji' => '🇭🇳', 'continent' => 'North America'],

            // Asia & Oceania
            ['name' => 'Japan',         'code' => 'JPN', 'flag_emoji' => '🇯🇵', 'continent' => 'Asia'],
            ['name' => 'South Korea',   'code' => 'KOR', 'flag_emoji' => '🇰🇷', 'continent' => 'Asia'],
            ['name' => 'China',         'code' => 'CHN', 'flag_emoji' => '🇨🇳', 'continent' => 'Asia'],
            ['name' => 'Saudi Arabia',  'code' => 'SAU', 'flag_emoji' => '🇸🇦', 'continent' => 'Asia'],
            ['name' => 'Qatar',         'code' => 'QAT', 'flag_emoji' => '🇶🇦', 'continent' => 'Asia'],
            ['name' => 'UAE',           'code' => 'ARE', 'flag_emoji' => '🇦🇪', 'continent' => 'Asia'],
            ['name' => 'Iran',          'code' => 'IRN', 'flag_emoji' => '🇮🇷', 'continent' => 'Asia'],
            ['name' => 'Australia',     'code' => 'AUS', 'flag_emoji' => '🇦🇺', 'continent' => 'Oceania'],
            ['name' => 'New Zealand',   'code' => 'NZL', 'flag_emoji' => '🇳🇿', 'continent' => 'Oceania'],
        ];

        foreach ($countries as $country) {
            Country::create(array_merge($country, ['is_active' => true]));
        }

        $this->command->info('✓ Seeded ' . count($countries) . ' countries');
    }
}
