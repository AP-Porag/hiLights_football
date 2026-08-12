<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\PlayerProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PlanSeeder::class,
        ]);

        // // ── Player ──
        // $user = User::updateOrCreate(
        //     ['email' => 'player@app.com'],
        //     [
        //         'name' => 'Player User',
        //         'whatsapp' => '+8801234567890',
        //         'email_verified_at' => now(),
        //         'password' => Hash::make('12345678'),
        //         'role' => 'player',
        //         'dob' => '2005-06-15',
        //         'nationality' => 'BD',
        //         'remember_token' => Str::random(10),
        //     ]
        // );

        // PlayerProfile::updateOrCreate(
        //     ['user_id' => $user->id],
        //     [
        //         'player_id' => 'PL-' . strtoupper(Str::random(6)),
        //         'views' => 0,
        //         'nickname' => 'The Pro',
        //         'gender' => 'M',
        //         'height' => 178,
        //         'weight' => 72,
        //         'birth_city' => 'Dhaka',
        //         'birth_country' => 'BD',
        //         'current_club' => 'Dhaka United',
        //         'current_club_country' => 'BD',
        //         'in_team_since' => '2024-01',
        //         'agent' => null,
        //         'guardian_name' => 'Mr. Guardian',
        //         'modality' => 'Football',
        //         'positions' => json_encode(['ST', 'LW']),
        //         'foot' => 'Right',
        //         'photo_path' => null,
        //         'video_url' => null,
        //         'videos' => null,
        //         'transfer_history' => null,
        //         'achievements' => null,
        //         'competitions' => null,
        //         'matches' => null,

        //         'description' => 'A talented young forward with great dribbling skills.',
        //     ]
        // );

        // ── Test Admin ──
        User::factory()->create([
            'name' => 'Admin',
            'role' => 'admin',
            'email' => 'admin@app.com',
            'password' => Hash::make('12345678'),
        ]);

        // ── Test Scout ──
        User::factory()->create([
            'name' => 'Scout',
            'role' => 'scout',
            'email' => 'scout@app.com',
            'password' => Hash::make('12345678'),
        ]);

        // ── Test Agent ──
        User::factory()->create([
            'name' => 'Agent',
            'role' => 'agent',
            'email' => 'agent@app.com',
            'password' => Hash::make('12345678'),
        ]);

        // ── Test Club ──
        User::factory()->create([
            'name' => 'Club',
            'role' => 'club',
            'email' => 'club@app.com',
            'password' => Hash::make('12345678'),
        ]);
    }
}
