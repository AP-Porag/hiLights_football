<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::prefix('player')->group(function () {
    Route::get('/', function () {
        return Inertia::render('player/dashboard/Index');
    })->name('player-dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
