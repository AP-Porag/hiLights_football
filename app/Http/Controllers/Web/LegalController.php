<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\Web\LegalService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function __construct(private readonly LegalService $legalService) {}

    public function index(Request $request): Response
    {
        $locale = $this->legalService->resolveLocale($request->string('lang')->toString());

        return Inertia::render('Web/Legal/Index', [
            ...$this->legalService->sharedProps($locale),
            'documents' => $this->legalService->documents($locale),
        ]);
    }

    public function show(Request $request, string $slug): Response
    {
        $locale = $this->legalService->resolveLocale($request->string('lang')->toString());

        return Inertia::render('web/legal/show', [
            ...$this->legalService->sharedProps($locale),
            'document' => $this->legalService->document($slug, $locale),
            'related' => $this->legalService->related($slug, $locale),
        ]);
    }
}
