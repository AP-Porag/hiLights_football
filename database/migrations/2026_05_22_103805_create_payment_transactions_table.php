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
        Schema::create('payment_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subscription_id')->nullable()
                ->constrained()->nullOnDelete();

            $table->enum('type', [
                'subscription',
                'one_time',
                'refund',
                'chargeback'
            ])->default('subscription');

            $table->enum('status', [
                'pending',
                'succeeded',
                'failed',
                'refunded',
                'cancelled'
            ])->default('pending');

            $table->decimal('amount', 8, 2);
            $table->string('currency', 3)->default('EUR');

            $table->enum('payment_provider', ['stripe', 'paypal', 'manual']);
            $table->string('provider_transaction_id')->nullable();
            $table->string('provider_charge_id')->nullable();
            $table->string('invoice_url', 500)->nullable();
            $table->text('failure_reason')->nullable();

            $table->json('metadata')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('subscription_id');
            $table->index('status');
            $table->index('provider_transaction_id');
            $table->index('paid_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_transactions');
    }
};
