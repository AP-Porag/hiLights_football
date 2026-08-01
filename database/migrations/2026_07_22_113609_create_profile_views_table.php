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
        Schema::create('profile_views', function (Blueprint $table) {
            $table->id();

            $table->foreignId('player_profile_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('viewer_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('country', 100)->nullable();
            $table->string('country_code', 2)->nullable();
            $table->string('ip_address', 45)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_views');
    }
};
