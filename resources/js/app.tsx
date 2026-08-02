import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { route as routeFn } from 'ziggy-js';
import { initializeTheme } from './hooks/use-appearance';

declare global {
    const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || 'Hilightsfootball';

// --- ডিফল্ট ডার্ক মোড নিশ্চিত করা ---
if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');   // ডিফল্ট স্টোরেজ সেট
}
// initializeTheme কলের আগেই HTML-এ dark ক্লাস যোগ করি
document.documentElement.classList.add('dark');
// ------------------------------------

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

//initializeTheme(); // এটি পরে রান করবে, তবে আমরা ইতিমধ্যে dark সেট করে ফেলেছি
if (typeof window !== 'undefined') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark'); // optional
}
