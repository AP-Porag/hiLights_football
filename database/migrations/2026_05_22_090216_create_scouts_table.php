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
        Schema::create('scouts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();

            // Note: actual role (scout/agent/club) lives on the users table.
            // This table holds shared scout-side profile data.

            $table->string('organization_name', 150)->nullable();   // FC Porto, Talentos S/A
            $table->string('job_title', 100)->nullable();           // Head Scout, Senior Agent
            $table->foreignId('country_id')->nullable()
                ->constrained('countries')->nullOnDelete();
            $table->string('city', 100)->nullable();
            $table->string('phone', 30)->nullable();
            $table->string('website', 200)->nullable();
            $table->string('linkedin_url', 200)->nullable();
            $table->text('bio')->nullable();
            $table->json('specializations')->nullable();            // ['youth', 'south_america']
            $table->boolean('is_verified')->default(false);
            $table->unsignedInteger('saved_players_count')->default(0);
            $table->unsignedInteger('ratings_given_count')->default(0);
            $table->softDeletes();
            $table->timestamps();

            $table->index('country_id');
            $table->index('is_verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scouts');
    }
};
