<?php

namespace App\Services\Web;

use Illuminate\Support\Facades\Lang;

class LegalService
{
    public const DEFAULT_LOCALE = 'en';

    public const SESSION_KEY = 'locale';

    public const LOCALES = [
        'en' => ['label' => 'English', 'flag' => '🇬🇧', 'intl' => 'en-GB'],
        'pt' => ['label' => 'Português', 'flag' => '🇧🇷', 'intl' => 'pt-BR'],
        'es' => ['label' => 'Español', 'flag' => '🇪🇸', 'intl' => 'es-ES'],
        'fr' => ['label' => 'Français', 'flag' => '🇫🇷', 'intl' => 'fr-FR'],
    ];

    public const DOCUMENT_SLUGS = [
        'privacy-policy',
        'terms-and-conditions',
        'cookie-policy',
        'refund-policy',
    ];

    private const DOCUMENT_META = [
        'privacy-policy' => [
            'icon' => 'privacy',
            'version' => '2.1',
            'effective_date' => '2026-09-01',
            'last_updated' => '2026-09-15',
        ],
        'terms-and-conditions' => [
            'icon' => 'terms',
            'version' => '2.0',
            'effective_date' => '2026-09-01',
            'last_updated' => '2026-09-15',
        ],
        'cookie-policy' => [
            'icon' => 'cookies',
            'version' => '1.3',
            'effective_date' => '2026-09-01',
            'last_updated' => '2026-09-10',
        ],
        'refund-policy' => [
            'icon' => 'refund',
            'version' => '1.2',
            'effective_date' => '2026-09-01',
            'last_updated' => '2026-09-10',
        ],
    ];

    // TODO: Move to config/hilights.php / .env before production
    private const CONTACT = [
        'legal' => 'legal@hilightsfootball.com',
        'privacy' => 'privacy@hilightsfootball.com',
        'support' => 'support@hilightsfootball.com',
    ];

    private array $cache = [];

    public function resolveLocale(?string $requested): string
    {
        if ($this->isSupported($requested)) {
            session()->put(self::SESSION_KEY, $requested);
            $locale = $requested;
        } else {
            $stored = session(self::SESSION_KEY);
            $current = app()->getLocale();

            $locale = match (true) {
                $this->isSupported($stored) => $stored,
                $this->isSupported($current) => $current,
                default => self::DEFAULT_LOCALE,
            };
        }

        app()->setLocale($locale);

        return $locale;
    }

    public function isSupported(mixed $locale): bool
    {
        return is_string($locale) && array_key_exists($locale, self::LOCALES);
    }

    public function sharedProps(string $locale): array
    {
        return [
            'locale' => $locale,
            'locales' => $this->locales(),
            'ui' => $this->ui($locale),
            'contact' => self::CONTACT,
        ];
    }

    public function locales(): array
    {
        return collect(self::LOCALES)
            ->map(fn(array $meta, string $code) => ['code' => $code, ...$meta])
            ->values()
            ->all();
    }

    public function ui(string $locale): array
    {
        $ui = $this->content($locale)['ui'] ?? [];

        return array_merge($this->content(self::DEFAULT_LOCALE)['ui'] ?? [], $ui);
    }

    public function documents(string $locale): array
    {
        return collect(self::DOCUMENT_SLUGS)
            ->map(fn(string $slug) => $this->summarise($slug, $locale))
            ->all();
    }

    public function document(string $slug, string $locale): array
    {
        $document = $this->rawDocument($slug, $locale);

        return [
            ...$this->summarise($slug, $locale),
            'sections' => array_map(fn(array $section) => [
                'id' => $section['id'],
                'heading' => $section['heading'],
                'paragraphs' => $section['paragraphs'] ?? [],
                'items' => $section['items'] ?? [],
                'closing' => $section['closing'] ?? [],
            ], $document['sections'] ?? []),
        ];
    }

    public function related(string $slug, string $locale): array
    {
        return collect(self::DOCUMENT_SLUGS)
            ->reject(fn(string $item) => $item === $slug)
            ->map(fn(string $item) => $this->summarise($item, $locale))
            ->values()
            ->all();
    }

    private function summarise(string $slug, string $locale): array
    {
        $document = $this->rawDocument($slug, $locale);
        $meta = self::DOCUMENT_META[$slug];
        $ui = $this->ui($locale);

        return [
            'slug' => $slug,
            'title' => $document['title'],
            'summary' => $document['summary'],
            'icon' => $meta['icon'],
            'version' => $meta['version'],
            'effectiveDate' => $meta['effective_date'],
            'lastUpdated' => $meta['last_updated'],
            'readTime' => str_replace(':min', (string) $this->readingMinutes($document), $ui['read_time'] ?? ':min min'),
            'sectionsCount' => count($document['sections'] ?? []),
        ];
    }

    private function rawDocument(string $slug, string $locale): array
    {
        abort_unless(in_array($slug, self::DOCUMENT_SLUGS, true), 404);

        $documents = $this->content($locale)['documents'] ?? [];

        if (! isset($documents[$slug])) {
            $documents = $this->content(self::DEFAULT_LOCALE)['documents'] ?? [];
        }

        abort_unless(isset($documents[$slug]), 404);

        return $documents[$slug];
    }

    private function content(string $locale): array
    {
        if (isset($this->cache[$locale])) {
            return $this->cache[$locale];
        }

        $content = Lang::get('legal', [], $locale);

        if (! is_array($content)) {
            $content = Lang::get('legal', [], self::DEFAULT_LOCALE);
        }

        return $this->cache[$locale] = $this->replaceTokens(is_array($content) ? $content : []);
    }

    private function replaceTokens(array $content): array
    {
        $search = [':legal_email', ':privacy_email', ':support_email'];
        $replace = [self::CONTACT['legal'], self::CONTACT['privacy'], self::CONTACT['support']];

        array_walk_recursive($content, function (&$value) use ($search, $replace) {
            if (is_string($value)) {
                $value = str_replace($search, $replace, $value);
            }
        });

        return $content;
    }

    private function readingMinutes(array $document): int
    {
        $text = collect($document['sections'] ?? [])
            ->flatMap(fn(array $section) => [
                $section['heading'] ?? '',
                ...($section['paragraphs'] ?? []),
                ...($section['items'] ?? []),
                ...($section['closing'] ?? []),
            ])
            ->implode(' ');

        $words = count(preg_split('/\s+/u', trim($text), -1, PREG_SPLIT_NO_EMPTY));

        return max(1, (int) ceil($words / 200));
    }
}
