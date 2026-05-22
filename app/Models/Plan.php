<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'description',
        'monthly_price',
        'annual_price',
        'currency',
        'target_role',
        'features',
        'max_managed_profiles',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'features'        => 'array',
        'is_active'       => 'boolean',
        'monthly_price'   => 'decimal:2',
        'annual_price'    => 'decimal:2',
    ];

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function activeSubscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class)
            ->whereIn('status', ['active', 'trial']);
    }
}
