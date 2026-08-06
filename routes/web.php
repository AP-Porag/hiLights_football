<?php

use App\Http\Controllers\Web\ContactController;
use App\Http\Controllers\Player\PlayerProfileController;
use App\Http\Controllers\Player\SubscriptionController;
use App\Http\Controllers\Scout\ScoutController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\Web\HomeController;
use Laravel\Cashier\Http\Controllers\WebhookController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Web\PlayerSearchController;

Route::get('/execute-command', function () {
    //    return redirect()->route('login');
    //    Artisan::call('storage:link');
    Artisan::call('migrate:fresh --seed');
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    Artisan::call('route:clear');
    Artisan::call('optimize');
    dd('All commands executed successfully');

    //deploy command
    ///opt/alt/php84/usr/bin/php artisan migrate:fresh --seed -vvv

});

// all web routes
// Route::get('/', function () {
//     return Inertia::render('web/Home');
// })->name('home');

Route::get('/register/scout', function () {
    return Inertia::render('auth/Register', [
        'forceRole' => 'scout',
    ]);
})->name('register.scout');


Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', function () {
    return Inertia::render('web/About');
})->name('about');

// Route::get('/pricing', function () {
//     return Inertia::render('web/Pricing');
// })->name('pricing');

Route::get('/plans', function () {
    return Inertia::render('web/Plans');
})->name('plans');


Route::get('/contact', function () {
    return Inertia::render('web/Contact');
})->name('contact');

// Route::get('/player/profile/{id}', function () {
//     return Inertia::render('player/profile/public/Detail');
// })->name('profile.public.detail');

// Route::get('/player/profile/{id}', function () {
//     return Inertia::render('player/profile/public/New-Detail');
// })->name('profile.public.detail');


Route::get('/player/profile/{id}', [PlayerProfileController::class, 'publicPlayerDetails'])
    ->name('player.public.profile');

Route::get('/scout', [HomeController::class, 'scout'])->name('scout');


// Route::get('/profile/{id}', [ProfileController::class, 'detail'])
//     ->name('profile.public.detail');

//all player routes
Route::middleware(['auth'])->prefix('player')->group(function () {



    // Route::get('/', function () {
    //     return Inertia::render('player/dashboard/Index');
    // })->name('player.dashboard');

    Route::get('/', [PlayerProfileController::class, 'index'])
        ->name('player.dashboard');


    // Route::get('/profile', function () {
    //     return Inertia::render('player/profile/Edit');
    // })->name('profile.change');

    Route::get('/profile/data/edit', [PlayerProfileController::class, 'edit'])
        ->name('player.profile.edit');

    Route::post('/profile', [PlayerProfileController::class, 'update'])
        ->name('player.profile.update');

    Route::post('/profile/lists', [PlayerProfileController::class, 'updateLists'])
        ->name('player.profile.lists');

    Route::post('/profile/fields', [PlayerProfileController::class, 'updateFields'])
        ->name('player.profile.fields');

    Route::post('/profile/upload-logo', [PlayerProfileController::class, 'uploadLogo'])
        ->name('player.profile.upload-logo');

    // Route::get('/subscription', function () {
    //     return Inertia::render('player/subscription/Index');
    // })->name('subscription');
    Route::get('/subscription', [SubscriptionController::class, 'index'])
        ->name('subscription');
    Route::post(
        '/subscription/checkout/{name}',
        [SubscriptionController::class, 'checkout']
    )->name('subscription.checkout');

    Route::get('subscription/checkout/success', [SubscriptionController::class, 'success'])
        ->name('checkout.success');

    Route::post('/subscription/cancel', [SubscriptionController::class, 'cancel'])->name('subscription.cancel');

    Route::post('/subscription/resume', [SubscriptionController::class, 'resume'])->name('subscription.resume');

    Route::get('/views', [PlayerProfileController::class, 'views'])->name('player.views');
});

//all Scouts / Agents / Clubs routes
Route::middleware(['auth'])->prefix('scouting')->group(function () {

    Route::get('/', [ScoutController::class, 'index'])->name('scouting.dashboard');

    Route::get('/player/{id}', [ScoutController::class, 'playerDetails'])->name('player.details');
    Route::post('/player/{id}/rating', [ScoutController::class, 'storeRating'])->name('player.rating.store');


    Route::get('/player/{id}/report', [ScoutController::class, 'playerReport'])->name('player.report');
    Route::post('/player/{id}/report', [ScoutController::class, 'storeReport'])->name('player.report.store');

    Route::get('/player/saved', function () {
        return Inertia::render('scouting/search/Saved');
    })->name('player.saved');
});

//all admin routes
//Route::middleware(['auth'])->prefix('admin')->group(function () {
Route::prefix('admin')->group(function () {

    // Route::get('/', function () {
    //     return Inertia::render('admin/dashboard/Index');
    // })->name('admin.dashboard');
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/users', function () {
        return Inertia::render('admin/users/Index');
    })->name('users.index');

    Route::get('/players', function () {
        return Inertia::render('admin/players/Index');
    })->name('players.index');

    Route::get('/players/{id}', function () {
        return Inertia::render('admin/players/Detail');
    })->name('players.details');

    Route::get('/subscriptions', function () {
        return Inertia::render('admin/subscriptions/Index');
    })->name('subscriptions.index');

    Route::get('/scouting', function () {
        return Inertia::render('admin/scouting/Index');
    })->name('scouting.index');
});

Route::post('/stripe/webhook', [WebhookController::class, 'handleWebhook'])
    ->name('cashier.webhook');

// Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
//Player Search
Route::get('/players/search', [PlayerSearchController::class, 'search'])->name('players.search');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
