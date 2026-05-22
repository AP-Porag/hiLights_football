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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();           // free, premium, agent
            $table->string('name', 50);                 // Free, Premium, Agent
            $table->text('description')->nullable();
            $table->decimal('monthly_price', 8, 2)->default(0);
            $table->decimal('annual_price', 8, 2)->default(0);
            $table->string('currency', 3)->default('EUR');
            $table->enum('target_role', ['player', 'scout', 'agent', 'club']);
            $table->json('features');                   // [{"feature":"X","included":true}]
            $table->integer('max_managed_profiles')->nullable();  // for agent plan
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index('target_role');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
