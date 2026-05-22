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
        Schema::create('positions', function (Blueprint $table) {
            $table->id();
            $table->string('code', 5)->unique();   // GK, CB, LB, RB, ST, LW, RW, CM, CDM, CAM, CF
            $table->string('name', 50);            // Goalkeeper, Centre Back, etc.
            $table->enum('category', [
                'goalkeeper',
                'defender',
                'midfielder',
                'forward'
            ]);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('positions');
    }
};
