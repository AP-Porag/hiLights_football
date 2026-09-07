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
    | Subscription Tiers
    |--------------------------------------------------------------------------
    */
    public const TRIAL = 'price_1TXH33HKtXG9R7bGb5heMCgK';
    public const STRIPE_PLAN_ONE = 'price_1TsfD5HKtXG9R7bGyzR4H6C9';
    public const STRIPE_PLAN_TWO = 'price_1TsfDtHKtXG9R7bGVsNxRTT6';




    public const TIER_TRIAL = 'trial';
    public const TIER_ONE_VIEW_ONLY = 'tier_1_view_only';
    public const TIER_TWO_FULL_ACCESS = 'tier_2_full_acces';

    // public const TIER_PRICE = [
    //     self::TIER_VIEW_ONLY => 14.99,
    //     self::TIER_FULL_ACCESS => 19.99,
    // ];

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
