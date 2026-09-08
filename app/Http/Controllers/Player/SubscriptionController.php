<?php

namespace App\Http\Controllers\Player;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Services\Player\SubscriptionService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    protected SubscriptionService $service;

    public function __construct(SubscriptionService $service)
    {
        $this->service = $service;
    }
    public function index(Request $request)
    {
        return Inertia::render('player/subscription/Index', $this->subscriptionState($request));
    }


    public function checkout($name, Request $request)
    {
        return $this->service->checkout($name, $request);
        //                                            ↑ string   ↑ Request
    }



    public function success(Request $request)
    {
        $user = $request->user();
        $plan = Plan::whereName($request->plan)->firstOrFail();

        try {
            $subscription = $user->subscription('default');
            $stripeSubscription = $subscription?->asStripeSubscription(['default_payment_method']);

            // subscription theke, na thakle customer theke PM id nao
            $pmId = $stripeSubscription?->default_payment_method
                ?: $user->asStripeCustomer(['invoice_settings.default_payment_method'])
                ->invoice_settings->default_payment_method;

            if ($pmId) {
                $paymentMethod = is_string($pmId)
                    ? $user->stripe()->paymentMethods->retrieve($pmId)
                    : $pmId;

                $user->updateDefaultPaymentMethod($paymentMethod);

                // manual force-fill — early-return holeo eta guaranteed save
                if ($paymentMethod->type === 'card' && $paymentMethod->card) {
                    $user->forceFill([
                        'pm_type'      => $paymentMethod->card->brand,
                        'pm_last_four' => $paymentMethod->card->last4,
                    ])->save();
                }
            }
        } catch (\Throwable $e) {
            report($e);
        }

        // ✅ Update local subscription state
        $user->update([
            'subscription_status' => 'active',
            'subscription_tier'   => $plan->name,
            'trial_ends_at'       => null,
        ]);

        $user->refresh();

        // ✅ Decide which component to render based on entry point
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

    public function downloadInvoice(Request $request, string $invoiceId)
    {
        return $request->user()->downloadInvoice($invoiceId, [
            'vendor'  => 'HiLights Football',
            'product' => 'HiLights Premium Subscription',
        ]);
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
