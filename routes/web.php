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

//all player routes
Route::prefix('player')->group(function () {

    Route::get('/', function () {
        return Inertia::render('player/dashboard/Index');
    })->name('dashboard');
});

//all Scouts / Agents / Clubs routes
Route::prefix('scouting')->group(function () {

    Route::get('/', function () {
        return Inertia::render('scouting/dashboard/Index');
    })->name('dashboard');

    Route::get('/search', function () {
            return Inertia::render('scouting/search/Index');
        })->name('search.player');

    Route::get('/player-profile', function () {
                return Inertia::render('scouting/player/details');
            })->name('player.details');
});


//all admin routes
Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::get('/', function () {
        return Inertia::render('admin/dashboard/Index');
    })->name('dashboard');

    Route::get('/users', function () {
        return Inertia::render('admin/users/Index');
    })->name('users.index');

    Route::get('/players', function () {
        return Inertia::render('admin/players/Index');
    })->name('players.index');

    Route::get('/players/{id}', function () {
        return Inertia::render('admin/players/details');
    })->name('players.details');

    Route::get('/players/{id}', function () {
        return Inertia::render('admin/players/details');
    })->name('players.details');

    Route::get('/subscriptions', function () {
        return Inertia::render('admin/subscriptions/Index');
    })->name('subscriptions.index');

    Route::get('/scouting', function () {
        return Inertia::render('admin/scouting/Index');
    })->name('scouting.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
