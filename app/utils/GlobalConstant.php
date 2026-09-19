<?php

namespace App\Utils;

class GlobalConstant
{
    /*
    |--------------------------------------------------------------------------
    | User Roles
    |--------------------------------------------------------------------------
    */
    public const ROLE_ADMIN = 'admin';
    public const ROLE_USER = 'user';

    /*
    |--------------------------------------------------------------------------
    | Subscription Status
    |--------------------------------------------------------------------------
    */
    public const SUB_ACTIVE = 'active';
    public const SUB_TRIAL = 'trial';
    public const SUB_EXPIRED = 'expired';
    public const SUB_CANCELLED = 'cancelled';


    /*
    |--------------------------------------------------------------------------
    | User Status
    |--------------------------------------------------------------------------
    */
    public const USER_ACTIVE = 'active';
    public const USER_INACTIVE = 'inactive';

    /*
    |--------------------------------------------------------------------------
    | Subscription Tiers — Stripe Price IDs
    |--------------------------------------------------------------------------
    */
    public const TRIAL = 'price_1TXH33HKtXG9R7bGb5heMCgK';
    public const STRIPE_PLAN_ONE = 'price_1TsfD5HKtXG9R7bGyzR4H6C9'; // Premium
    public const STRIPE_PLAN_TWO = 'price_1TsfDtHKtXG9R7bGVsNxRTT6'; // Elite

    /*
    |--------------------------------------------------------------------------
    | Plan Monthly Amounts (€) — MRR calculation-er jonno
    | Key = Stripe price ID (STRIPE_PLAN_ONE/TWO), Value = euro amount
    |--------------------------------------------------------------------------
    */
    public const PLAN_AMOUNTS = [
        self::STRIPE_PLAN_ONE => 0.10,   // Premium actual price
        self::STRIPE_PLAN_TWO => 0.20,  // Elite actual price — confirm koro
    ];

    /*
    |--------------------------------------------------------------------------
    | Route Prefix
    |--------------------------------------------------------------------------
    */
    public const ROUTE_ADMIN = 'admin';
    public const ROUTE_APP = 'app';

    /*
    |--------------------------------------------------------------------------
    | Pagination Defaults
    |--------------------------------------------------------------------------
    */
    public const PAGINATION_LIMIT = 25;

    /*
    |--------------------------------------------------------------------------
    | Cache Keys
    |--------------------------------------------------------------------------
    */
    public const CACHE_SUBSCRIPTION_PREFIX = 'subscription_';
}
