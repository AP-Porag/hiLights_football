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
        Schema::create('scout_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scout_id')->constrained()->cascadeOnDelete();
            $table->foreignId('player_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('technical');       // 1-5
            $table->unsignedTinyInteger('physical');        // 1-5
            $table->unsignedTinyInteger('mental');          // 1-5
            $table->unsignedTinyInteger('overall');         // 1-5
            $table->text('notes')->nullable();              // Public note (max 500)
            $table->boolean('is_visible')->default(true);   // Admin can hide if abusive
            $table->timestamps();

            $table->unique(['scout_id', 'player_id']);     // One rating per scout per player
            $table->index('player_id');
            $table->index('scout_id');
            $table->index('overall');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scout_ratings');
    }
};
