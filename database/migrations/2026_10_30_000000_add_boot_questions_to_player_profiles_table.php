<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('player_profiles', function (Blueprint $table) {
            // Bochore kotota boot kene — '1' | '2' | '3' | '4' | '5 or more'
            $table->string('boots_per_year', 20)->nullable()->after('boot_brand_other');
            // Usual price range — e.g. '€50 – €100'
            $table->string('boot_price_range', 40)->nullable()->after('boots_per_year');
        });
    }

    public function down(): void
    {
        Schema::table('player_profiles', function (Blueprint $table) {
            $table->dropColumn(['boots_per_year', 'boot_price_range']);
        });
    }
};
