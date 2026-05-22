<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Carlos Mendes',
            'email' => 'admin@hilightsfootball.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'role' => 'admin',
            'status' => 'active',
            'avatar_path' => 'https://ui-avatars.com/api/?name=Carlos+Mendes&background=FF6B00&color=fff&size=400&bold=true',
            'locale' => 'en',
            'timezone' => 'Europe/Lisbon',
        ]);

        $this->command->info('✓ Created admin user: admin@hilightsfootball.com');
    }
}
