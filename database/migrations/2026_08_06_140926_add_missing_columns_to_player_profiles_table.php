<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.


    /**
     * Reverse the migrations.
     */
    public function up(): void
    {
        Schema::table('player_profiles', function (Blueprint $table) {
            // অনুপস্থিত কলাম যোগ করা
            $table->string('status')->default('Draft')->after('foot');
            $table->boolean('featured')->default(false)->after('status');
            $table->string('subscription_plan')->default('Free')->after('featured');
            $table->string('market_value')->nullable()->after('subscription_plan');
        });
    }

    public function down(): void
    {
        Schema::table('player_profiles', function (Blueprint $table) {
            $table->dropColumn(['status', 'featured', 'subscription_plan', 'market_value']);
        });
    }
};
