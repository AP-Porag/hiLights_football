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
        Schema::create('saved_players', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scout_id')->constrained()->cascadeOnDelete();
            $table->foreignId('player_id')->constrained()->cascadeOnDelete();
            $table->text('notes')->nullable();              // Private scout notes (max 500)
            $table->json('tags')->nullable();               // ['follow_up', 'priority']
            $table->timestamps();

            $table->unique(['scout_id', 'player_id']);
            $table->index('scout_id');
            $table->index('player_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saved_players');
    }
};
