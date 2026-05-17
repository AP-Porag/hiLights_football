<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//all web routes
Route::get('/', function () {
    return Inertia::render('web/Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('web/About');
})->name('about');

Route::get('/pricing', function () {
    return Inertia::render('web/Pricing');
})->name('pricing');

Route::get('/contact', function () {
    return Inertia::render('web/Contact');
})->name('contact');

Route::get('/player/profile/{id}', function () {
    return Inertia::render('player/profile/public/Detail');
})->name('profile.public.detail');

//all player routes
Route::prefix('player')->group(function () {

    Route::get('/', function () {
        return Inertia::render('player/dashboard/Index');
    })->name('dashboard');

    Route::get('/profile', function () {
        return Inertia::render('player/profile/Edit');
    })->name('profile.edit');


    Route::get('/subscription', function () {
        return Inertia::render('player/subscription/Index');
    })->name('subscription');
});

//all Scouts / Agents / Clubs routes
Route::prefix('scouting')->group(function () {

    Route::get('/', function () {
        return Inertia::render('scouting/dashboard/Index');
    })->name('dashboard');

    Route::get('/player', function () {
        return Inertia::render('scouting/player/Detail');
    })->name('player.details');

    //saved player
    //    Route::get('/player/saved', function () {
    //        return Inertia::render('scouting/player/Saved');
    //    })->name('player.saved');

});


//all admin routes
//Route::middleware(['auth'])->prefix('admin')->group(function () {
Route::prefix('admin')->group(function () {

    Route::get('/', function () {
        return Inertia::render('admin/dashboard/Index');
    })->name('dashboard');

    Route::get('/players', function () {
        return Inertia::render('admin/players/Index');
    })->name('players.index');

    //TODO this page should be made uisng claude
    Route::get('/players/{id}', function () {
        return Inertia::render('admin/players/Detail');
    })->name('players.details');
//
//    Route::get('/subscriptions', function () {
//        return Inertia::render('admin/subscriptions/Index');
//    })->name('subscriptions.index');
//
//    Route::get('/scouting', function () {
//        return Inertia::render('admin/scouting/Index');
//    })->name('scouting.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
