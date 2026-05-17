import ThemeToggle from '@/components/shared/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavLink {
    label: string;
    href: string;
    routeName: string;
}

const NAV_LINKS: NavLink[] = [
    { label: 'Home', href: '/', routeName: 'home' },
    { label: 'About', href: '/about', routeName: 'about' },
    { label: 'Pricing', href: '/pricing', routeName: 'pricing' },
    { label: 'Contact', href: '/contact', routeName: 'contact' },
];

export default function PublicNavbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isActive = (href: string) => {
        if (href === '/') return url === '/' || url === '';
        return url.startsWith(href);
    };

    return (
        <header
            className={[
                'fixed top-0 right-0 left-0 z-50 h-16',
                'bg-white dark:bg-[#0D0D0D]',
                'border-b border-[#E2E8F0] dark:border-[#2A2A2A]',
                scrolled ? 'shadow-md' : 'shadow-[0_1px_0_rgba(0,0,0,0.05)] dark:shadow-none',
                'transition-shadow duration-200',
            ].join(' ')}
        >
            <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-6">
                {/* LEFT — Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="HiLights Football home">
                    <img src="/images/logo/hilights_logo_transparent_200.png" className="h-9 w-auto dark:hidden" alt="HiLights Football" />
                    <img src="/images/logo/hilights_logo_dark_200.png" className="hidden h-9 w-auto dark:block" alt="HiLights Football" />
                    <div className="hidden items-end gap-0.5 leading-none sm:flex">
                        <span className="text-xl font-black tracking-tight text-[#0F172A] dark:text-[#F5F5F5]">Hi</span>
                        <span className="text-xl font-black tracking-tight text-[#FF6B00] italic">Lights</span>
                        <span className="mb-0.5 ml-1 self-end text-[10px] font-bold tracking-[0.12em] text-[#94A3B8]">FOOTBALL</span>
                    </div>
                </Link>

                {/* CENTER — Nav links (desktop) */}
                <nav className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={[
                                    'relative text-sm font-medium transition-colors',
                                    active
                                        ? 'text-[#FF6B00] after:absolute after:right-0 after:bottom-[-22px] after:left-0 after:h-[2px] after:bg-[#FF6B00]'
                                        : 'text-[#475569] hover:text-[#FF6B00] dark:text-[#9A9A9A]',
                                ].join(' ')}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* CENTER-RIGHT — Search (desktop) */}
                <div className="relative hidden w-56 lg:block">
                    <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                    <Input
                        type="search"
                        placeholder="Search players..."
                        className="h-9 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pr-3 pl-8 text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 focus-visible:ring-offset-0 dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F5F5F5] dark:focus-visible:ring-[rgba(255,107,0,0.15)]"
                    />
                </div>

                {/* RIGHT — Actions (desktop) */}
                <div className="hidden shrink-0 items-center gap-2 md:flex">
                    <ThemeToggle />
                    <Link href="/login">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-[#E2E8F0] bg-transparent text-sm font-medium text-[#0F172A] hover:border-[#FF6B00] hover:bg-transparent hover:text-[#FF6B00] dark:border-[#2A2A2A] dark:text-[#F5F5F5] dark:hover:bg-transparent"
                        >
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm" className="bg-[#FF6B00] px-4 text-sm font-semibold text-white hover:bg-[#CC5500]">
                            Register
                        </Button>
                    </Link>
                </div>

                {/* MOBILE — Hamburger */}
                <div className="flex items-center gap-1 md:hidden">
                    <ThemeToggle />
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Open menu"
                                className="h-9 w-9 text-[#0F172A] hover:bg-[#F8FAFC] dark:text-[#F5F5F5] dark:hover:bg-[#1F1F1F]"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="flex w-[300px] flex-col border-r border-[#E2E8F0] bg-white p-0 dark:border-[#2A2A2A] dark:bg-[#0D0D0D]"
                        >
                            <SheetHeader className="border-b border-[#E2E8F0] px-6 py-4 dark:border-[#2A2A2A]">
                                <SheetTitle className="flex items-center gap-2">
                                    <img
                                        src="/images/logo/hilights_logo_transparent_200.png"
                                        className="h-9 w-auto dark:hidden"
                                        alt="HiLights Football"
                                    />
                                    <img
                                        src="/images/logo/hilights_logo_dark_200.png"
                                        className="hidden h-9 w-auto dark:block"
                                        alt="HiLights Football"
                                    />
                                    <div className="flex items-end gap-0.5 leading-none">
                                        <span className="text-xl font-black tracking-tight text-[#0F172A] dark:text-[#F5F5F5]">Hi</span>
                                        <span className="text-xl font-black tracking-tight text-[#FF6B00] italic">Lights</span>
                                        <span className="mb-0.5 ml-1 self-end text-[10px] font-bold tracking-[0.12em] text-[#94A3B8]">FOOTBALL</span>
                                    </div>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="px-6 py-4">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                                    <Input
                                        type="search"
                                        placeholder="Search players..."
                                        className="h-10 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pr-3 pl-8 text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 focus-visible:ring-offset-0 dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F5F5F5] dark:focus-visible:ring-[rgba(255,107,0,0.15)]"
                                    />
                                </div>
                            </div>

                            <nav className="flex-1 px-6">
                                {NAV_LINKS.map((link) => {
                                    const active = isActive(link.href);
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={[
                                                'block border-b border-[#F1F5F9] py-3 text-base font-medium transition-colors dark:border-[#1F1F1F]',
                                                active ? 'text-[#FF6B00]' : 'text-[#0F172A] hover:text-[#FF6B00] dark:text-[#F5F5F5]',
                                            ].join(' ')}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="mt-4 flex flex-col gap-2 border-t border-[#E2E8F0] px-6 py-4 dark:border-[#2A2A2A]">
                                <Link href="/login" onClick={() => setMobileOpen(false)}>
                                    <Button
                                        variant="outline"
                                        className="w-full border-[#E2E8F0] bg-transparent text-sm font-medium text-[#0F172A] hover:border-[#FF6B00] hover:bg-transparent hover:text-[#FF6B00] dark:border-[#2A2A2A] dark:text-[#F5F5F5] dark:hover:bg-transparent"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register" onClick={() => setMobileOpen(false)}>
                                    <Button className="w-full bg-[#FF6B00] text-sm font-semibold text-white hover:bg-[#CC5500]">Register</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
