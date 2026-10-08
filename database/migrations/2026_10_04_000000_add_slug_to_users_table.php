<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Fresh install e create_users_table migration e slug already ache — tai check kore add
        if (! Schema::hasColumn('users', 'slug')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('slug', 120)->nullable()->unique()->after('name');
            });
        }

        // Existing users er jonno slug generate (backfill)
        User::query()->whereNull('slug')->chunkById(200, function ($users) {
            foreach ($users as $user) {
                $user->slug = User::generateUniqueSlug($user);
                $user->saveQuietly();
            }
        });
    }

    public function down(): void
    {
        // slug column create_users_table migration er part, tai ekhane drop kora hocche na
    }
};
