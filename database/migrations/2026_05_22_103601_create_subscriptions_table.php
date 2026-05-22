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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained()->restrictOnDelete();

            $table->enum('status', [
                'trial',
                'active',
                'past_due',
                'cancelled',
                'expired'
            ])->default('trial');

            $table->enum('billing_cycle', ['monthly', 'annual'])->default('monthly');
            $table->decimal('amount', 8, 2);
            $table->string('currency', 3)->default('EUR');

            // ─── Stripe / PayPal ───
            $table->enum('payment_provider', ['stripe', 'paypal', 'manual'])
                ->nullable();
            $table->string('provider_subscription_id')->nullable();    // Stripe sub ID
            $table->string('provider_customer_id')->nullable();        // Stripe customer

            // ─── Lifecycle ───
            $table->timestamp('started_at');
            $table->timestamp('current_period_start')->nullable();
            $table->timestamp('current_period_end')->nullable();
            $table->timestamp('trial_ends_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->boolean('cancel_at_period_end')->default(false);

            $table->json('metadata')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index('user_id');
            $table->index('status');
            $table->index(['user_id', 'status']);
            $table->index('provider_subscription_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
