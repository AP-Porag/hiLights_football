<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\Subscriptions\AdminSubscriptionsService;
use Inertia\Inertia;

class AdminSubscriptionsController extends Controller
{
    public function __construct(
        protected AdminSubscriptionsService $service
    ) {}

    public function index()
    {
        $filters = request()->only([
            'search',
            'status',
            'perPage',
            'sort_by',
            'sort_order',
        ]);

        // ডিফল্ট status = 'active'
        $filters['status'] = $filters['status'] ?? 'active';

        $subscriptions = $this->service->getSubscriptions($filters);

        // Cashier-এ সম্ভাব্য সব স্ট্যাটাস
        $statuses = [
            'all',
            'active',
            'trialing',
            'canceled',
            // 'incomplete',
            // 'incomplete_expired',
            // 'past_due',
            // 'unpaid',
            // 'paused',
            // 'ended',
        ];

        return Inertia::render('admin/subscription/index', [
            'subscriptions' => $subscriptions,
            'filters'      => $filters,
            'statuses'     => $statuses,
        ]);
    }
    public function show($id)
    {
        $subscription = $this->service->getSubscription($id);

        return Inertia::render('admin/subscription/show', [
            'subscription' => $subscription,
        ]);
    }
}
