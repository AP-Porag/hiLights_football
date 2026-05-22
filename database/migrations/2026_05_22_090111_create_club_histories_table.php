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
        Schema::create('club_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('year');           // e.g. 2024
            $table->string('club_name', 150);
            $table->foreignId('country_id')->nullable()
                ->constrained('countries')->nullOnDelete();
            $table->string('league', 100)->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            // Allow up to 2 entries per year (do not enforce unique on year)
            $table->index(['player_id', 'year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('club_histories');
    }
};
