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
            $table->foreignId('player_id')->constrained()->cascadeOnDelete();
            $table->foreignId('viewer_user_id')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->enum('viewer_role', ['player', 'scout', 'agent', 'club', 'guest'])
                ->default('guest');
            $table->foreignId('viewer_country_id')->nullable()
                ->constrained('countries')->nullOnDelete();
            $table->string('viewer_ip', 45)->nullable();
            $table->string('user_agent', 500)->nullable();
            $table->string('referrer', 500)->nullable();
            $table->timestamp('viewed_at')->useCurrent();
            $table->index('player_id');
            $table->index('viewer_user_id');
            $table->index('viewed_at');
            $table->index(['player_id', 'viewed_at']);
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
