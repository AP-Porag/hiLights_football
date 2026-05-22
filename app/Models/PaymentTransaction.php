<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subscription_id',
        'type',
        'status',
        'amount',
        'currency',
        'payment_provider',
        'provider_transaction_id',
        'provider_charge_id',
        'invoice_url',
        'failure_reason',
        'metadata',
        'paid_at',
    ];

    protected $casts = [
        'amount'    => 'decimal:2',
        'metadata'  => 'array',
        'paid_at'   => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }
}
