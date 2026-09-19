<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    {{-- Favicon --}}
    <link rel="icon" type="image/png" href="{{ asset('images/icon/favicon.png') }}">
    <link rel="shortcut icon" type="image/png" href="{{ asset('images/icon/favicon.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('images/icon/favicon.png') }}">

    {{-- Open Graph — WhatsApp / Facebook / LinkedIn share preview --}}
    <meta property="og:title" content="HiLights Football" />
    <meta property="og:description" content="Discover, follow, and connect with football talent worldwide." />
    <meta property="og:image" content="{{ asset('images/icon/og-image.png') }}" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="HiLights Football" />

    {{-- Twitter Card (X share preview) --}}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="HiLights Football" />
    <meta name="twitter:description" content="Discover, follow, and connect with football talent worldwide." />
    <meta name="twitter:image" content="{{ asset('images/icon/og-image.png') }}" />

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
