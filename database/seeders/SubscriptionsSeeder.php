<?php

namespace Database\Seeders;

use App\Models\PaymentTransaction;
use App\Models\Plan;
use App\Models\Player;
use App\Models\Scout;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Seeder;

class SubscriptionsSeeder extends Seeder
{
    public function run(): void
    {
        $premiumPlan = Plan::where('slug', 'premium')->first();
        $agentPlan = Plan::where('slug', 'agent')->first();

        // ─── 50% of players get Premium ───
        $players = Player::with('user')->inRandomOrder()->take(40)->get();

        foreach ($players as $player) {
            $startedDaysAgo = rand(15, 300);
            $startedAt = now()->subDays($startedDaysAgo);
            $billingCycle = rand(0, 1) === 1 ? 'annual' : 'monthly';
            $amount = $billingCycle === 'annual' ? $premiumPlan->annual_price : $premiumPlan->monthly_price;
            $periodLength = $billingCycle === 'annual' ? 365 : 30;
            $currentPeriodStart = $startedAt->copy()->addDays(floor($startedDaysAgo / $periodLength) * $periodLength);
            $currentPeriodEnd = $currentPeriodStart->copy()->addDays($periodLength);

            $subscription = Subscription::create([
                'user_id' => $player->user_id,
                'plan_id' => $premiumPlan->id,
                'status' => 'active',
                'billing_cycle' => $billingCycle,
                'amount' => $amount,
                'currency' => 'EUR',
                'payment_provider' => rand(0, 1) === 1 ? 'stripe' : 'paypal',
                'provider_subscription_id' => 'sub_' . strtolower(uniqid()),
                'provider_customer_id' => 'cus_' . strtolower(uniqid()),
                'started_at' => $startedAt,
                'current_period_start' => $currentPeriodStart,
                'current_period_end' => $currentPeriodEnd,
                'cancel_at_period_end' => false,
                'created_at' => $startedAt,
            ]);

            // Create payment history
            $periodsElapsed = max(1, floor($startedDaysAgo / $periodLength));
            for ($i = 0; $i < $periodsElapsed; $i++) {
                $paidAt = $startedAt->copy()->addDays($i * $periodLength);
                PaymentTransaction::create([
                    'user_id' => $player->user_id,
                    'subscription_id' => $subscription->id,
                    'type' => 'subscription',
                    'status' => 'succeeded',
                    'amount' => $amount,
                    'currency' => 'EUR',
                    'payment_provider' => $subscription->payment_provider,
                    'provider_transaction_id' => 'txn_' . strtolower(uniqid()),
                    'provider_charge_id' => 'ch_' . strtolower(uniqid()),
                    'invoice_url' => 'https://invoice.stripe.com/' . uniqid(),
                    'paid_at' => $paidAt,
                    'created_at' => $paidAt,
                ]);
            }
        }

        // ─── All agents get Agent plan ───
        $agents = User::where('role', 'agent')->get();
        foreach ($agents as $agent) {
            $startedAt = now()->subDays(rand(30, 180));
            Subscription::create([
                'user_id' => $agent->id,
                'plan_id' => $agentPlan->id,
                'status' => 'active',
                'billing_cycle' => 'annual',
                'amount' => $agentPlan->annual_price,
                'currency' => 'EUR',
                'payment_provider' => 'stripe',
                'provider_subscription_id' => 'sub_' . strtolower(uniqid()),
                'provider_customer_id' => 'cus_' . strtolower(uniqid()),
                'started_at' => $startedAt,
                'current_period_start' => $startedAt,
                'current_period_end' => $startedAt->copy()->addYear(),
                'created_at' => $startedAt,
            ]);
        }

        $this->command->info('✓ Created ' . (40 + $agents->count()) . ' active subscriptions');
        $this->command->info('✓ Generated payment transaction history');
    }
}
