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
    public function index(Request $request)
    {
        $subscription = $request->user()->subscription('default');

        return Inertia::render('player/subscription/Index', [
            'current_plan' => $subscription?->stripe_price,
            'on_grace_period' => $subscription?->onGracePeriod() ?? false,
            'is_cancelled' => $subscription?->onGracePeriod() ?? false,
            'subscription_ends_at' => $subscription?->ends_at?->toDateTimeString(),
        ]);
    }

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

        // Check if it's an Inertia request
        if ($request->header('X-Inertia')) {
            // For Inertia, return a location redirect
            return Inertia::location($checkout->url);
        }

        // For regular AJAX/API requests (keep this if you have other clients)
        return response()->json([
            'url' => $checkout->url
        ]);
    }

    public function success(Request $request)
    {
        $subscription = $request->user()
            ->subscriptions()
            ->where('stripe_status', 'active')
            ->latest()
            ->first();


        $currentPlan = $subscription?->stripe_price;
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
                'current_plan' => $currentPlan,
                'is_cancelled' => $subscription?->ends_at !== null,
            ]
        );
    }
    public function cancel(Request $request)
    {
        $subscription = $request->user()->subscription('default');

        if ($subscription && $subscription->active()) {
            $subscription->cancel();
        }

        return redirect()->route('subscription');
    }

    public function resume(Request $request)
    {
        $subscription = $request->user()->subscription('default');

        if ($subscription && $subscription->onGracePeriod()) {
            $subscription->resume();
        }

        return redirect()->route('subscription');
    }
}
