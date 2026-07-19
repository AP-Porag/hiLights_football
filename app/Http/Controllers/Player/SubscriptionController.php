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
        return Inertia::render('player/subscription/Index', $this->subscriptionState($request));
    }

    public function checkout($name, Request $request)
    {
        $plan = Plan::whereName($name)->firstOrFail();
        $from = $request->input('from', 'plans');

        $checkout = $request->user()
            ->newSubscription('default', $plan->stripe_price_id)
            ->checkout([
                'success_url' => route('checkout.success', ['from' => $from]),
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
        $from = $request->query('from', 'plans');

        $component = $from === 'subscription'
            ? 'player/subscription/Index'
            : 'web/Plans';

        return Inertia::render($component, $this->subscriptionState($request));
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

    /**
     * Subscription state — index / plans / success shob jaygায় ei same state pathabo
     */
    private function subscriptionState(Request $request): array
    {
        $subscription = $request->user()?->subscription('default');

        $currentPlan   = null;
        $onGracePeriod = false;
        $isCancelled   = false;
        $endsAt        = null;

        if ($subscription) {
            $onGracePeriod = $subscription->onGracePeriod();
            $isCancelled   = $subscription->ends_at !== null;
            $endsAt        = $subscription->ends_at;

            // valid() = active / trial / grace period
            // ends_at past hoye gele valid() false → currentPlan null → button abar enable
            if ($subscription->valid()) {
                $currentPlan = $subscription->stripe_price;
            }
        }

        return [
            'current_plan'         => $currentPlan,
            'on_grace_period'      => $onGracePeriod,
            'is_cancelled'         => $isCancelled,
            'subscription_ends_at' => $endsAt,
        ];
    }
}
