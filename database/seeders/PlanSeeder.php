<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            ["name" => "plan_one", "stripe_plan_id" => "prod_UsQ3R6Fb75lcZ7", "stripe_price_id" => "price_1TsfD5HKtXG9R7bGyzR4H6C9"],
            ["name" => "plan_two", "stripe_plan_id" => "prod_UsQ4pDnFPuV4y2", "stripe_price_id" => "price_1TsfDtHKtXG9R7bGVsNxRTT6"]
        ];
        foreach ($plans as $plan) {
            Plan::create($plan);
        }
    }
}
