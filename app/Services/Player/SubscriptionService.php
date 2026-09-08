<?php

namespace App\Services\Player;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Services\BaseService;
use Carbon\Carbon;
use App\Utils\SubscriptionPlan;
use App\Models\Plan;
use Illuminate\Http\RedirectResponse;
use Laravel\Cashier\Checkout;
use Inertia\Inertia;

class SubscriptionService extends BaseService
{
    public function __construct(User $model)
    {
        parent::__construct($model); // ✅ concrete model
    }


    public function checkout($name, Request $request): Checkout|RedirectResponse|JsonResponse|Response
    {
        $plan = Plan::whereName($name)->firstOrFail();
        $from = $request->input('from', 'plans');
        $user = $request->user();
        $priceId = $plan->stripe_price_id;
        $subscription = $user->subscription('default');

        // ── Active বা Grace Period Subscription থাকলে swap ──
        if ($subscription && !$user->onTrial('default') && ($subscription->active() || $subscription->onGracePeriod())) {
            if ($subscription->stripe_price === $priceId) {
                return back()->with('info', 'You are already subscribed to this plan.');
            }

            try {
                $subscription->swapAndInvoice($priceId);
            } catch (\Stripe\Exception\InvalidRequestException $e) {
                // stale item — Stripe theke re-sync kore abar try
                report($e);
                $subscription->syncStripeStatus();
                $subscription->refresh();
                $subscription->swapAndInvoice($priceId);
            }

            // ✅ swap er por PM details sync (early-return bug erate FromStripe use)
            try {
                $user->updateDefaultPaymentMethodFromStripe();
            } catch (\Throwable $e) {
                report($e);
            }

            $user->update([
                'subscription_tier'   => $plan->name,
                'subscription_status' => 'active',
                'trial_ends_at'       => null,
            ]);

            return back()->with('success', 'Subscription plan updated successfully.');
        }

        // ── Trial subscription থাকলে delete ──
        if ($subscription && $user->onTrial('default')) {
            $subscription->cancelNow();
            $subscription->delete();
            $user->refresh();
        }

        // ── Canceled বা Ended subscription থাকলে delete (duplicate রোধে) ──
        if ($subscription && ($subscription->canceled() || $subscription->ended())) {
            $subscription->delete();
            $user->refresh();
        }

        // ── নতুন subscription তৈরি ──
        $checkout = $user
            ->newSubscription('default', $priceId)
            ->checkout([
                'success_url' => route('checkout.success', [
                    'plan'       => $plan->name,
                    'from'       => $from,
                    'session_id' => '{CHECKOUT_SESSION_ID}', // Stripe nijei replace kore
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
            'url' => $checkout->url,
        ]);
    }

    public function index($request)
    {
        return inertia('app/subscriptions/index', [
            'users' => $this->model->latest()->paginate(20),
        ]);
    }

    public function store($userId, $data)
    {
        $user = $this->model->findOrFail($userId);

        $user->update([
            'plan_type' => 'tier_2',
            'subscription_status' => 'active',
            'subscription_ends_at' => Carbon::now()->addMonth(),
        ]);

        return redirect()
            ->route('app.myplan')
            ->with('success', 'Upgraded successfully');
    }

    public function update(\Illuminate\Database\Eloquent\Model|int $modelOrId, array $data): \Illuminate\Database\Eloquent\Model
    {
        $user = is_int($modelOrId)
            ? $this->model->findOrFail($modelOrId)
            : $modelOrId;

        $user->update([
            'plan_type' => $data['plan_type'] ?? $user->plan_type,
            'subscription_status' => $data['status'] ?? $user->subscription_status,
        ]);

        return $user;
    }

    public function destroy($id)
    {
        $user = $this->model->findOrFail($id);

        $user->update([
            'subscription_status' => 'cancelled',
        ]);

        return redirect()
            ->route('app.myplan')
            ->with('success', 'Cancelled successfully');
    }

    /**
     * Check access
     */
    public function hasAccess(User $user): bool
    {
        return $user->subscribed('default');
    }
}
