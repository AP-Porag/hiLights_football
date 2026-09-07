<?php

namespace App\Services\Admin\Subscriptions;

use App\Models\Record;
use App\Models\User;
use App\Services\BaseService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Subscription;

class AdminSubscriptionsService extends BaseService
{
    public function __construct(Subscription $model)
    {
        parent::__construct($model);
    }

    /**
     * Get paginated subscriptions with filters.
     *
     * @param array $filters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getSubscriptions(array $filters)
    {
        $query = $this->model->query()->with('user');

        // Search by user name or email
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by status (stripe_status)
        // If status is 'all' or empty, do not apply the filter
        if (!empty($filters['status']) && $filters['status'] !== 'all') {
            $query->where('stripe_status', $filters['status']);
        }

        // Sorting
        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $filters['perPage'] ?? 10;

        return $query->paginate($perPage)
            ->withQueryString()
            ->through(function ($subscription) {
                // প্রতিটি সাবস্ক্রিপশনে computed next renewal date যোগ করা হচ্ছে
                $subscription->next_renewal_date = $this->computeNextRenewalDate($subscription);
                return $subscription;
            });
    }

    public function getSubscription($id)
    {
        return $this->model->with('user', 'items')->findOrFail($id);
    }

    /**
     * Active auto-renewing subscription-এর পরবর্তী monthly renewal date approximate করা হয়।
     * Stripe API কল ছাড়াই created_at / trial_ends_at anchor ধরে হিসাব করা হয়।
     */
    protected function computeNextRenewalDate($subscription): ?string
    {
        // শুধু active + ends_at null হলেই auto-renew ধরা হবে
        if ($subscription->stripe_status !== 'active' || $subscription->ends_at) {
            return null;
        }

        // Billing anchor: trial থাকলে trial end, নাহলে creation date
        $anchor = $subscription->trial_ends_at ?? $subscription->created_at;

        if (!$anchor) {
            return null;
        }

        $anchor = Carbon::parse($anchor);
        $next = $anchor->copy();
        $now = Carbon::now();

        // ভবিষ্যতের তারিখ না আসা পর্যন্ত মাস যোগ (month-end overflow ছাড়া)
        while ($next->lessThanOrEqualTo($now)) {
            $next->addMonthNoOverflow();
        }

        return $next->toIso8601String();
    }
}
