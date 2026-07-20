<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('player_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scout_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('player_profile_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('technical')->default(0);
            $table->unsignedTinyInteger('physical')->default(0);
            $table->unsignedTinyInteger('tactical')->default(0);
            $table->unsignedTinyInteger('mental')->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();

            // ek scout ek player-ke ekbar-i rate korbe (update hobe)
            $table->unique(['scout_id', 'player_profile_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player_ratings');
    }
};
