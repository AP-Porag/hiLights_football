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
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('email', 150);
            $table->enum('subject', [
                'general',
                'support',
                'partnership',
                'advertising',
                'press'
            ])->default('general');
            $table->text('message');
            $table->enum('status', ['new', 'in_progress', 'resolved', 'spam'])
                ->default('new');
            $table->foreignId('replied_by_user_id')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->timestamp('replied_at')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('subject');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
