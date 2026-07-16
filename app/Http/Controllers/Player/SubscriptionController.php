<?php

namespace App\Http\Controllers\Player;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    // public function checkout($name, Request $request)
    // {

    //     $plan = Plan::whereName($name)->first();
    //     $planPrice = $plan->stripe_price_id;
    //     return $request->user()
    //         ->newSubscription('default', $planPrice)
    //         ->checkout([
    //             'success_url' => route('checkout.success', [
    //                 'plan' => $plan->name,
    //             ]),
    //             // 'cancel_url' => route('app.myplan'),
    //             // 'payment_method_types' => ['card'],
    //         ]);
    // }

    public function checkout($name, Request $request)
    {
        $plan = Plan::whereName($name)->firstOrFail();

        $checkout = $request->user()
            ->newSubscription('default', $plan->stripe_price_id)
            ->checkout([
                'success_url' => route('checkout.success', [
                    'plan' => $plan->name,
                ]),
                // 'cancel_url' => route('app.myplan'),
            ]);

        return response()->json([
            'url' => $checkout->url
        ]);
    }

    public function success(Request $request)
    {
        // $user = $request->user();
        $subscription = $request->user()
            ->subscriptions()
            ->where('stripe_status', 'active')
            ->latest()
            ->first();


        $currentPlan = $subscription?->stripe_price;
        // $plan = Plan::whereName($request->plan)->firstOrFail();
        if ($subscription) {

            // Current active subscription
            if (
                $subscription->stripe_status === 'active' ||
                $subscription->onGracePeriod()
            ) {
                $currentPlan = $subscription->stripe_price;
            }
        }
        return Inertia::render(
            'player/subscription/Index',
            [
                // 'plan' => $plan->name,
                // 'on_grace_period' => $subscription?->onGracePeriod(),
                // 'subscription_ends_at' => $subscription?->ends_at,
                // 'is_cancelled' => $subscription?->stripe_status === 'canceled',
                // 'is_active' => $subscription?->stripe_status === 'active',
                // 'is_expired' => $subscription?->ends_at?->isPast(),
                'current_plan' => $currentPlan,
                'is_cancelled' => $subscription?->ends_at !== null,
            ]
        );

        // $user = $request->user();

        // $plan = Plan::whereName($request->plan)->firstOrFail();

        // // ✅ Update local subscription state
        // $user->update([
        //     'subscription_status' => 'active',
        //     'subscription_tier' => $plan->name,

        //     // optional cleanup (important)
        //     'trial_ends_at' => null,
        // ]);
        // $subscription = $user->subscription('default');

        // return Inertia::render('app/subscriptions/success', [
        //     'plan' => $plan->name,
        //     // 'subscription_status' => $user->subscription_status,
        //     'subscription_status' => $user->subscription('default')?->stripe_status,
        //     'subscription_tier' => $user->subscription_tier,
        //     'on_grace_period' => $subscription?->onGracePeriod(),
        //     'subscription_ends_at' => $subscription?->ends_at,
        //     'is_cancelled' => $subscription?->stripe_status === 'canceled',
        //     'is_active' => $subscription?->stripe_status === 'active',
        //     'is_expired' => $subscription?->ends_at?->isPast(),
        // ]);
    }
}
