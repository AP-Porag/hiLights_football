<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PlanSeeder::class,
        ]);
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'role' => 'player',
            'email' => 'test@example.com',
        ]);

        // Test Player User
        User::factory()->create([
            'name' => 'Admin',
            'role' => 'admin',
            'email' => 'admin@app.com',
            'password' => Hash::make('12345678'),
        ]);
    }
}
