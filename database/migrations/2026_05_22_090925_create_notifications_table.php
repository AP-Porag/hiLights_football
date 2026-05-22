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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();

            $table->string('type');                          // class name of notification
            $table->morphs('notifiable');                    // notifiable_type + notifiable_id
            $table->text('data');                            // JSON payload
            $table->enum('category', [
                'profile_view',
                'scout_rating',
                'subscription',
                'system',
                'message',
                'promo'
            ])->default('system');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->index(['notifiable_type', 'notifiable_id', 'read_at']);
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
