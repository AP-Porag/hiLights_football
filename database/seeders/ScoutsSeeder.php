<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\Scout;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ScoutsSeeder extends Seeder
{
    public function run(): void
    {
        $scouts = [
            // ─── Scouts ───
            ['name' => 'João Ferreira', 'gender' => 'male', 'email' => 'joao.ferreira@scout.com', 'role' => 'scout', 'org' => 'FC Porto Scouting Department', 'title' => 'Senior Scout', 'country' => 'PRT', 'city' => 'Porto', 'photo' => 'https://i.pravatar.cc/400?img=51', 'specializations' => ['south_america', 'youth']],
            ['name' => 'Maria Costa', 'gender' => 'female', 'email' => 'maria.costa@scout.com', 'role' => 'scout', 'org' => 'SL Benfica International', 'title' => 'Head of Recruitment', 'country' => 'PRT', 'city' => 'Lisbon', 'photo' => 'https://i.pravatar.cc/400?img=1', 'specializations' => ['europe', 'analytics']],
            ['name' => 'Carlos Mendez', 'gender' => 'male', 'email' => 'carlos.mendez@scout.com', 'role' => 'scout', 'org' => 'Real Madrid Talent ID', 'title' => 'Regional Scout - Americas', 'country' => 'ESP', 'city' => 'Madrid', 'photo' => 'https://i.pravatar.cc/400?img=52', 'specializations' => ['south_america']],
            ['name' => 'Anna Schmidt', 'gender' => 'female', 'email' => 'anna.schmidt@scout.com', 'role' => 'scout', 'org' => 'Borussia Dortmund Academy', 'title' => 'Youth Scout', 'country' => 'DEU', 'city' => 'Dortmund', 'photo' => 'https://i.pravatar.cc/400?img=5', 'specializations' => ['youth', 'europe']],
            ['name' => 'Pierre Dubois', 'gender' => 'male', 'email' => 'pierre.dubois@scout.com', 'role' => 'scout', 'org' => 'Olympique Lyonnais', 'title' => 'Chief Scout', 'country' => 'FRA', 'city' => 'Lyon', 'photo' => 'https://i.pravatar.cc/400?img=53', 'specializations' => ['france', 'africa']],
            ['name' => 'Giuseppe Rossi', 'gender' => 'male', 'email' => 'giuseppe.rossi@scout.com', 'role' => 'scout', 'org' => 'Juventus FC', 'title' => 'International Scout', 'country' => 'ITA', 'city' => 'Turin', 'photo' => 'https://i.pravatar.cc/400?img=54', 'specializations' => ['europe', 'south_america']],
            ['name' => 'Sofia Wagner', 'gender' => 'female', 'email' => 'sofia.wagner@scout.com', 'role' => 'scout', 'org' => 'Bayern Munich Scouting', 'title' => 'Senior Scout', 'country' => 'DEU', 'city' => 'Munich', 'photo' => 'https://i.pravatar.cc/400?img=9', 'specializations' => ['data', 'europe']],
            ['name' => 'James Mitchell', 'gender' => 'male', 'email' => 'james.mitchell@scout.com', 'role' => 'scout', 'org' => 'Chelsea FC Recruitment', 'title' => 'Talent Identification Lead', 'country' => 'ENG', 'city' => 'London', 'photo' => 'https://i.pravatar.cc/400?img=55', 'specializations' => ['youth', 'south_america']],

            // ─── Agents ───
            ['name' => 'Rafael Pinto', 'gender' => 'male', 'email' => 'rafael.pinto@agency.com', 'role' => 'agent', 'org' => 'Talentos S/A', 'title' => 'Founder & Lead Agent', 'country' => 'BRA', 'city' => 'São Paulo', 'photo' => 'https://i.pravatar.cc/400?img=56', 'specializations' => ['brazilian_players']],
            ['name' => 'Patricia Almeida', 'gender' => 'female', 'email' => 'patricia.almeida@agency.com', 'role' => 'agent', 'org' => 'Sports Future Agency', 'title' => 'Senior Agent', 'country' => 'BRA', 'city' => 'Rio de Janeiro', 'photo' => 'https://i.pravatar.cc/400?img=10', 'specializations' => ['youth', 'brazilian_players']],
            ['name' => 'Marco Bianchi', 'gender' => 'male', 'email' => 'marco.bianchi@agency.com', 'role' => 'agent', 'org' => 'European Stars Agency', 'title' => 'Senior Agent', 'country' => 'ITA', 'city' => 'Milan', 'photo' => 'https://i.pravatar.cc/400?img=57', 'specializations' => ['europe']],
            ['name' => 'Christina Müller', 'gender' => 'female', 'email' => 'christina.muller@agency.com', 'role' => 'agent', 'org' => 'Top Eleven Agency', 'title' => 'Director', 'country' => 'DEU', 'city' => 'Berlin', 'photo' => 'https://i.pravatar.cc/400?img=20', 'specializations' => ['women_football']],
            ['name' => 'Diego Ramírez', 'gender' => 'male', 'email' => 'diego.ramirez@agency.com', 'role' => 'agent', 'org' => 'South Stars Management', 'title' => 'Lead Agent', 'country' => 'ARG', 'city' => 'Buenos Aires', 'photo' => 'https://i.pravatar.cc/400?img=58', 'specializations' => ['south_america']],
            ['name' => 'Sarah Kowalski', 'gender' => 'female', 'email' => 'sarah.kowalski@agency.com', 'role' => 'agent', 'org' => 'Global Sports Connect', 'title' => 'Agent', 'country' => 'POL', 'city' => 'Warsaw', 'photo' => 'https://i.pravatar.cc/400?img=21', 'specializations' => ['eastern_europe']],

            // ─── Clubs ───
            ['name' => 'Manuel García', 'gender' => 'male', 'email' => 'manuel.garcia@club.com', 'role' => 'club', 'org' => 'Atlético Madrid Academy', 'title' => 'Academy Director', 'country' => 'ESP', 'city' => 'Madrid', 'photo' => 'https://i.pravatar.cc/400?img=59', 'specializations' => ['youth_recruitment']],
            ['name' => 'Henrik Andersson', 'gender' => 'male', 'email' => 'henrik.andersson@club.com', 'role' => 'club', 'org' => 'Malmö FF', 'title' => 'Sporting Director', 'country' => 'SWE', 'city' => 'Malmö', 'photo' => 'https://i.pravatar.cc/400?img=60', 'specializations' => ['scandinavian_market']],
            ['name' => 'Elena Petrova', 'gender' => 'female', 'email' => 'elena.petrova@club.com', 'role' => 'club', 'org' => 'Dynamo Kyiv', 'title' => 'Director of Football', 'country' => 'UKR', 'city' => 'Kyiv', 'photo' => 'https://i.pravatar.cc/400?img=24', 'specializations' => ['eastern_europe']],
            ['name' => 'Thomas Berg', 'gender' => 'male', 'email' => 'thomas.berg@club.com', 'role' => 'club', 'org' => 'Ajax Amsterdam', 'title' => 'Talent ID Manager', 'country' => 'NLD', 'city' => 'Amsterdam', 'photo' => 'https://i.pravatar.cc/400?img=61', 'specializations' => ['youth_development']],
            ['name' => 'Laure Fontaine', 'gender' => 'female', 'email' => 'laure.fontaine@club.com', 'role' => 'club', 'org' => 'Paris Saint-Germain', 'title' => 'Youth Scouting Director', 'country' => 'FRA', 'city' => 'Paris', 'photo' => 'https://i.pravatar.cc/400?img=44', 'specializations' => ['elite_youth']],
            ['name' => 'Christian Becker', 'gender' => 'male', 'email' => 'christian.becker@club.com', 'role' => 'club', 'org' => 'RB Leipzig', 'title' => 'Head of Recruitment', 'country' => 'DEU', 'city' => 'Leipzig', 'photo' => 'https://i.pravatar.cc/400?img=62', 'specializations' => ['analytics', 'youth']],
            ['name' => 'Roberto Salinas', 'gender' => 'male', 'email' => 'roberto.salinas@club.com', 'role' => 'club', 'org' => 'Club América', 'title' => 'Director Deportivo', 'country' => 'MEX', 'city' => 'Mexico City', 'photo' => 'https://i.pravatar.cc/400?img=63', 'specializations' => ['concacaf', 'south_america']],
            ['name' => 'Yuki Nakamura', 'gender' => 'female', 'email' => 'yuki.nakamura@club.com', 'role' => 'club', 'org' => 'FC Tokyo', 'title' => 'International Recruitment', 'country' => 'JPN', 'city' => 'Tokyo', 'photo' => 'https://i.pravatar.cc/400?img=45', 'specializations' => ['asian_market']],
            ['name' => 'Antonio Silva', 'gender' => 'male', 'email' => 'antonio.silva@club.com', 'role' => 'club', 'org' => 'Sporting CP Academy', 'title' => 'Youth Coach', 'country' => 'PRT', 'city' => 'Lisbon', 'photo' => 'https://i.pravatar.cc/400?img=64', 'specializations' => ['portuguese_youth']],
            ['name' => 'Luís Costa', 'gender' => 'male', 'email' => 'luis.costa@club.com', 'role' => 'club', 'org' => 'SC Braga', 'title' => 'Scouting Coordinator', 'country' => 'PRT', 'city' => 'Braga', 'photo' => 'https://i.pravatar.cc/400?img=65', 'specializations' => ['portuguese_market']],
        ];

        foreach ($scouts as $data) {
            $country = Country::where('code', $data['country'])->first();

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'email_verified_at' => now()->subDays(rand(30, 200)),
                'role' => $data['role'],
                'status' => 'active',
                'avatar_path' => $data['photo'],
                'locale' => $this->localeFromCountry($data['country']),
                'timezone' => $this->timezoneFromCountry($data['country']),
                'last_login_at' => now()->subDays(rand(0, 7)),
                'created_at' => now()->subDays(rand(60, 400)),
            ]);

            Scout::create([
                'user_id' => $user->id,
                'organization_name' => $data['org'],
                'job_title' => $data['title'],
                'country_id' => $country->id,
                'city' => $data['city'],
                'phone' => $this->randomPhone($data['country']),
                'website' => 'https://www.' . strtolower(str_replace(' ', '', $data['org'])) . '.com',
                'linkedin_url' => 'https://linkedin.com/in/' . strtolower(str_replace(' ', '-', $data['name'])),
                'bio' => $this->scoutBio($data['name'], $data['title'], $data['org']),
                'specializations' => $data['specializations'],
                'is_verified' => rand(0, 100) > 30,
                'created_at' => $user->created_at,
            ]);
        }

        $this->command->info('✓ Created ' . count($scouts) . ' scout/agent/club profiles');
    }

    private function localeFromCountry(string $code): string
    {
        return match ($code) {
            'BRA', 'PRT' => 'pt',
            'ARG', 'ESP', 'MEX', 'COL' => 'es',
            'FRA' => 'fr',
            'ITA' => 'it',
            'DEU' => 'de',
            'NLD' => 'nl',
            'JPN' => 'ja',
            default => 'en',
        };
    }

    private function timezoneFromCountry(string $code): string
    {
        return match ($code) {
            'BRA' => 'America/Sao_Paulo',
            'ARG' => 'America/Argentina/Buenos_Aires',
            'PRT', 'ENG' => 'Europe/Lisbon',
            'ESP' => 'Europe/Madrid',
            'FRA' => 'Europe/Paris',
            'ITA' => 'Europe/Rome',
            'DEU' => 'Europe/Berlin',
            'NLD' => 'Europe/Amsterdam',
            'POL' => 'Europe/Warsaw',
            'SWE' => 'Europe/Stockholm',
            'UKR' => 'Europe/Kyiv',
            'JPN' => 'Asia/Tokyo',
            'MEX' => 'America/Mexico_City',
            default => 'UTC',
        };
    }

    private function randomPhone(string $code): string
    {
        $prefix = match ($code) {
            'BRA' => '+55',
            'PRT' => '+351',
            'ESP' => '+34',
            'FRA' => '+33',
            'DEU' => '+49',
            'ITA' => '+39',
            'NLD' => '+31',
            'ENG' => '+44',
            'ARG' => '+54',
            'MEX' => '+52',
            'JPN' => '+81',
            default => '+1',
        };
        return $prefix . ' ' . rand(100, 999) . ' ' . rand(100000, 999999);
    }

    private function scoutBio(string $name, string $title, string $org): string
    {
        $bios = [
            "{$title} at {$org} with 12+ years of experience identifying emerging football talent. Passionate about youth development and data-driven scouting.",
            "Working as {$title} for {$org}. Specializes in scouting players aged 15-21 with potential to step up to professional football.",
            "With over a decade in football recruitment, currently serving as {$title} at {$org}. Focus on technical players with strong tactical understanding.",
            "Football professional working as {$title} at {$org}. Believes in long-term player development and the importance of mental attributes.",
        ];
        return $bios[array_rand($bios)];
    }
}
