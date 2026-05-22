<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Services\Home\HomeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected HomeService $homeService;

    public function __construct(HomeService $homeService)
    {
        $this->homeService = $homeService;
    }

    public function index(Request $request)
    {

        $featuredPlayers = $this->homeService->index();
        return Inertia::render(
            'web/Home',
            ['featuredPlayers' => $featuredPlayers]

        );
    }
}
