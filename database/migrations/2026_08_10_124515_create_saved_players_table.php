<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('saved_players', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('player_profile_id')->constrained('player_profiles')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['user_id', 'player_profile_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('saved_players');
    }
};
