<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Kon channel-e OTP verify hoyeche: 'whatsapp' othoba 'sms'
            $table->string('whatsapp_verified_via', 20)->nullable()->after('whatsapp_verified_at');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('whatsapp_verified_via');
        });
    }
};
