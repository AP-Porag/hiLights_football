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
        Schema::create('player_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('player_id', 10)->unique();
            $table->string('nickname')->nullable();
            $table->string('gender')->default('M');           // M / F / Other
            $table->unsignedSmallInteger('height')->nullable(); // cm
            $table->unsignedSmallInteger('weight')->nullable(); // cm
            $table->string('birth_city')->nullable();
            $table->string('birth_country', 2)->nullable();
            $table->string('current_club')->nullable();
            $table->string('in_team_since', 7)->nullable();   // "YYYY-MM"
            $table->string('agent')->nullable();
            $table->string('guardian_name')->nullable();
            $table->string('modality')->default('Football');
            $table->json('positions')->nullable();            // ["CAM","ST"]
            $table->string('foot')->default('Right');
            $table->string('photo_path')->nullable();
            $table->string('video_url')->nullable();
            $table->json('videos')->nullable();
            $table->json('transfer_history')->nullable();
            $table->json('achievements')->nullable();
            $table->json('competitions')->nullable();
            $table->json('matches')->nullable();
            $table->json('club_history')->nullable();         // [{year, club}]
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_profiles');
    }
};
