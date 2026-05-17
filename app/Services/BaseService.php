<?php

namespace App\Services;

use App\Utils\GlobalConstant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Carbon\Carbon;

abstract class BaseService
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all records
     */
    public function all(): Collection
    {
        return $this->model->newQuery()->get();
    }

    /**
     * Paginate records
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->newQuery()->paginate($perPage);
    }

    /**
     * Find record by ID
     */
    public function find(int $id): Model
    {
        return $this->model->newQuery()->findOrFail($id);
    }

    /**
     * Find by column
     */
    public function findBy(string $column, mixed $value): ?Model
    {
        return $this->model->newQuery()
            ->where($column, $value)
            ->first();
    }

    /**
     * Check existence
     */
    public function exists(string $column, mixed $value): bool
    {
        return $this->model->newQuery()
            ->where($column, $value)
            ->exists();
    }

    /**
     * Count records
     */
    public function count(): int
    {
        return $this->model->newQuery()->count();
    }

    /**
     * Create record
     */
    public function create(array $data): Model
    {
        return $this->model->newQuery()->create($data);
    }

    /**
     * Update record by ID or Model instance
     */
    public function update(Model|int $modelOrId, array $data): Model
    {
        $model = $modelOrId instanceof Model
            ? $modelOrId
            : $this->find($modelOrId);

        $model->update($data);

        return $model->refresh();
    }

    /**
     * Update or Create
     */
    public function updateOrCreate(array $conditions, array $data): Model
    {
        return $this->model->newQuery()
            ->updateOrCreate($conditions, $data);
    }

    /**
     * Delete record by ID or Model instance
     */
    public function delete(Model|int $modelOrId): bool
    {
        $model = $modelOrId instanceof Model
            ? $modelOrId
            : $this->find($modelOrId);

        return (bool) $model->delete();
    }

    public function getSubscription($user)
    {
        return $user->subscription('default');
    }

    public function getStripeStatus($user)
    {
        return $this->getSubscription($user)?->stripe_status;
    }

    public function hasFullAccess($user): bool
    {
        $subscription = $this->getSubscription($user);

        if (!$subscription) {
            return false;
        }

        $isTrialActive = $subscription->onTrial();

        $isSubscriptionActive =
            $subscription->active() ||
            $subscription->onGracePeriod();

        return (
            $isTrialActive
            || (
                $isSubscriptionActive &&
                $user->subscribedToPrice(
                    GlobalConstant::TIER_TWO_FULL_ACCESS_PRICE_ID,
                    'default'
                )
            )
        );
    }

    // public function hasFullAccess($user): bool
    // {
    //     $subscription = $this->getSubscription($user);

    //     if (!$subscription) {
    //         return false;
    //     }

    //     $isTrialActive = $subscription->onTrial();

    //     $isSubscriptionActive =
    //         $subscription->active() ||
    //         $subscription->onGracePeriod(); // covers ends_at safely

    //     return (
    //         $isTrialActive
    //         || (
    //             $isSubscriptionActive &&
    //             $user->subscription_tier === 'tier_2_full_access'
    //         )
    //     );
    // }
}
