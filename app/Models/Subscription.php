<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'plan_id',
        'status',
        'billing_cycle',
        'amount',
        'currency',
        'payment_provider',
        'provider_subscription_id',
        'provider_customer_id',
        'started_at',
        'current_period_start',
        'current_period_end',
        'trial_ends_at',
        'cancelled_at',
        'ended_at',
        'cancel_at_period_end',
        'metadata',
    ];

    protected $casts = [
        'started_at'             => 'datetime',
        'current_period_start'   => 'datetime',
        'current_period_end'     => 'datetime',
        'trial_ends_at'          => 'datetime',
        'cancelled_at'           => 'datetime',
        'ended_at'               => 'datetime',
        'cancel_at_period_end'   => 'boolean',
        'amount'                 => 'decimal:2',
        'metadata'               => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(PaymentTransaction::class);
    }

    public function isActive(): bool
    {
        return in_array($this->status, ['active', 'trial'])
            && (!$this->current_period_end || $this->current_period_end->isFuture());
    }
}
