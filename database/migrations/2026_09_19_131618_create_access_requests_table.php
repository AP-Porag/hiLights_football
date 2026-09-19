<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('access_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('organization')->nullable();
            $table->string('role'); // scout, club, agent, other
            $table->string('email');
            $table->string('country', 3)->nullable();
            $table->string('phone')->nullable();
            $table->string('interest')->nullable(); // ki bishoye interested
            $table->text('message')->nullable();
            $table->string('status')->default('pending'); // pending, contacted, approved, rejected
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('access_requests');
    }
};
