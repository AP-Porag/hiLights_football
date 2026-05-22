<?php

namespace App\Services\Home;

use App\Models\Player;
use App\Services\BaseService;
use Inertia\Inertia;

class HomeService extends BaseService
{
    public function __construct(Player $model)
    {
        parent::__construct($model);
    }
    public function index()
    {
        return $this->model
            ->query()
            ->with('user', 'positions')
            ->where('is_featured', true)
            ->latest()
            ->get();
    }
}
