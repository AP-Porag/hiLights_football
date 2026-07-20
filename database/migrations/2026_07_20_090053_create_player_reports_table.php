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
        Schema::create('player_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scout_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('player_profile_id')->constrained()->cascadeOnDelete();
            $table->string('recommendation')->nullable();   // sign / monitor / pass
            $table->string('match_context')->nullable();    // kon match/period dekhe likha
            $table->text('strengths')->nullable();
            $table->text('weaknesses')->nullable();
            $table->text('summary')->nullable();
            $table->string('status')->default('draft');     // draft / final
            $table->timestamps();

            $table->unique(['scout_id', 'player_profile_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_reports');
    }
};
