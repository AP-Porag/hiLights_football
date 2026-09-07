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
    public const TIER_TRIAL_PRICE_ID = 'price_1TXH33HKtXG9R7bGb5heMCgK';
    public const TIER_ONE_VIEW_ONLY_PRICE_ID = 'price_1TSwAKHKtXG9R7bGP5EtUGrg';
    public const TIER_TWO_FULL_ACCESS_PRICE_ID = 'price_1TSyapHKtXG9R7bGgdo6OLrA';

    // public const TIER_TRIAL_PRICE_ID = 'price_1U0nSxFulxMQQHJjszqFW2i1';
    // public const TIER_ONE_VIEW_ONLY_PRICE_ID = 'price_1U0nQCFulxMQQHJjvEsWv8wc';
    // public const TIER_TWO_FULL_ACCESS_PRICE_ID = 'price_1U0nRqFulxMQQHJjA3FJ4s5r';



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
