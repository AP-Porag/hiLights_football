<?php

use App\Http\Controllers\Player\PlayerProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\Web\HomeController;

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


Route::get('/player/profile/{id}', [PlayerProfileController::class, 'playerDetails'])
    ->name('player.public.profile');

Route::get('/scout', function () {
    return Inertia::render('web/Scout');
})->name('scout');


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

    Route::get('/subscription', function () {
        return Inertia::render('player/subscription/Index');
    })->name('subscription');
});

//all Scouts / Agents / Clubs routes
Route::prefix('scouting')->group(function () {

    Route::get('/', function () {
        return Inertia::render('scouting/dashboard/Index');
    })->name('scouting.dashboard');

    Route::get('/player', function () {
        return Inertia::render('scouting/player/Detail');
    })->name('player.details');

    Route::get('/player/saved', function () {
        return Inertia::render('scouting/search/Saved');
    })->name('player.saved');
});

//all admin routes
//Route::middleware(['auth'])->prefix('admin')->group(function () {
Route::prefix('admin')->group(function () {

    Route::get('/', function () {
        return Inertia::render('admin/dashboard/Index');
    })->name('admin.dashboard');

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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
