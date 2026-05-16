import ThemeToggle from '@/Components/Shared/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link, router, usePage } from '@inertiajs/react';
import { Bell, ChevronDown, CreditCard, LogOut, Menu, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

type ScoutRole = 'SCOUT' | 'AGENT' | 'CLUB';

interface ScoutUser {
    id: number;
    name: string;
    email: string;
    role: ScoutRole;
    organization?: string | null;
    avatar_url?: string | null;
}

interface PageProps {
    auth: { user: ScoutUser };
    notificationCount?: number;
    [key: string]: any;
}

interface NavLink {
    label: string;
    href: string;
    prominent?: boolean;
}

// TODO: Replace with route() helper from Ziggy
const NAV_LINKS: NavLink[] = [
    { label: 'Search Players', href: '/scout/search', prominent: true },
    { label: 'Saved Players', href: '/scout/saved' },
    { label: 'My Account', href: '/scout/account' },
];

const ROLE_STYLES: Record<ScoutRole, string> = {
    SCOUT: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30',
    AGENT: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30',
    CLUB: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/30',
};

function getInitials(name: string): string {
    if (!name) return 'S';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function ScoutNavbar() {
    const { url, props } = usePage<PageProps>();
    // TODO: const { auth } = usePage<PageProps>().props;
    // const auth = props.auth ?? {
    //     user: {
    //         id: 42,
    //         name: 'Marco Verratti',
    //         email: 'marco.verratti@scoutnet.eu',
    //         role: 'SCOUT' as ScoutRole,
    //         organization: 'ScoutNet Europe',
    //         avatar_url: null,
    //     },
    // };

    const auth = props.auth?.user
        ? props.auth
        : {
            user: {
                id: 1,
                name: 'Lucas Pereira',
                email: 'lucas@hilights.fc',
                avatar_url: null,
            },
        };
    const notificationCount = props.notificationCount ?? 2;

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

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        // TODO: Replace with route('logout')
        router.post('/logout');
    };

    const initials = getInitials(auth.user.name);
    const roleChip = ROLE_STYLES[auth.user.role] ?? ROLE_STYLES.SCOUT;

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
                <Link href="/scout/search" className="flex shrink-0 items-center gap-2" aria-label="HiLights Football">
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
                                    'relative text-sm transition-colors',
                                    link.prominent ? 'font-semibold' : 'font-medium',
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

                {/* RIGHT — Actions (desktop) */}
                <div className="hidden shrink-0 items-center gap-3 md:flex">
                    <ThemeToggle />

                    {/* Notification bell */}
                    <Link
                        href="/scout/notifications"
                        className="relative rounded-md p-2 transition-colors hover:bg-[#F8FAFC] dark:hover:bg-[#1F1F1F]"
                        aria-label="Notifications"
                    >
                        <Bell className="h-5 w-5 text-[#94A3B8] hover:text-[#FF6B00] dark:text-[#555555]" />
                        {notificationCount > 0 && (
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#0D0D0D]" />
                        )}
                    </Link>

                    {/* Avatar dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="flex items-center gap-1.5 rounded-full p-0.5 transition-colors outline-none hover:bg-[#F8FAFC] focus-visible:ring-2 focus-visible:ring-[#FF6B00] dark:hover:bg-[#1F1F1F]"
                                aria-label="Account menu"
                            >
                                <Avatar className="h-9 w-9 border border-[#E2E8F0] dark:border-[#2A2A2A]">
                                    {auth.user.avatar_url ? <AvatarImage src={auth.user.avatar_url} alt={auth.user.name} /> : null}
                                    <AvatarFallback className="bg-[#FFF3EB] text-sm font-bold text-[#FF6B00] dark:bg-[rgba(255,107,0,0.15)]">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <ChevronDown className="h-3 w-3 text-[#94A3B8]" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-56 rounded-xl border border-[#E2E8F0] bg-white p-1 shadow-lg dark:border-[#2A2A2A] dark:bg-[#161616]"
                        >
                            <div className="mb-1 border-b border-[#F1F5F9] px-3 py-2 dark:border-[#1F1F1F]">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="truncate text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]">{auth.user.name}</div>
                                    <span
                                        className={['shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider', roleChip].join(
                                            ' ',
                                        )}
                                    >
                                        {auth.user.role}
                                    </span>
                                </div>
                                <div className="mt-0.5 truncate text-xs text-[#94A3B8] dark:text-[#555555]">
                                    {auth.user.organization ?? auth.user.email}
                                </div>
                            </div>

                            <DropdownMenuItem asChild className="cursor-pointer rounded-md focus:bg-[#F8FAFC] dark:focus:bg-[#1F1F1F]">
                                <Link href="/scout/account" className="flex items-center gap-2 px-3 py-2 text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                                    <Settings className="h-4 w-4 text-[#94A3B8]" />
                                    Account Settings
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild className="cursor-pointer rounded-md focus:bg-[#F8FAFC] dark:focus:bg-[#1F1F1F]">
                                <Link href="/scout/plan" className="flex items-center gap-2 px-3 py-2 text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                                    <CreditCard className="h-4 w-4 text-[#94A3B8]" />
                                    My Plan
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="my-1 bg-[#F1F5F9] dark:bg-[#1F1F1F]" />

                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-[rgba(220,38,38,0.1)] dark:focus:text-red-400"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* MOBILE — Hamburger */}
                <div className="flex items-center gap-1 md:hidden">
                    <Link
                        href="/scout/notifications"
                        className="relative rounded-md p-2 transition-colors hover:bg-[#F8FAFC] dark:hover:bg-[#1F1F1F]"
                        aria-label="Notifications"
                    >
                        <Bell className="h-5 w-5 text-[#94A3B8] dark:text-[#555555]" />
                        {notificationCount > 0 && (
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#0D0D0D]" />
                        )}
                    </Link>
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

                            {/* User card */}
                            <div className="flex items-center gap-3 border-b border-[#E2E8F0] px-6 py-4 dark:border-[#2A2A2A]">
                                <Avatar className="h-11 w-11 border border-[#E2E8F0] dark:border-[#2A2A2A]">
                                    {auth.user.avatar_url ? <AvatarImage src={auth.user.avatar_url} alt={auth.user.name} /> : null}
                                    <AvatarFallback className="bg-[#FFF3EB] text-sm font-bold text-[#FF6B00] dark:bg-[rgba(255,107,0,0.15)]">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className="truncate text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]">{auth.user.name}</div>
                                        <span
                                            className={[
                                                'shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider',
                                                roleChip,
                                            ].join(' ')}
                                        >
                                            {auth.user.role}
                                        </span>
                                    </div>
                                    <div className="truncate text-xs text-[#94A3B8] dark:text-[#555555]">
                                        {auth.user.organization ?? auth.user.email}
                                    </div>
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
                                                'block border-b border-[#F1F5F9] py-3 text-base transition-colors dark:border-[#1F1F1F]',
                                                link.prominent ? 'font-semibold' : 'font-medium',
                                                active ? 'text-[#FF6B00]' : 'text-[#0F172A] hover:text-[#FF6B00] dark:text-[#F5F5F5]',
                                            ].join(' ')}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}

                                <Link
                                    href="/scout/plan"
                                    onClick={() => setMobileOpen(false)}
                                    className="block border-b border-[#F1F5F9] py-3 text-base font-medium text-[#0F172A] transition-colors hover:text-[#FF6B00] dark:border-[#1F1F1F] dark:text-[#F5F5F5]"
                                >
                                    My Plan
                                </Link>
                            </nav>

                            <div className="mt-4 border-t border-[#E2E8F0] px-6 py-4 dark:border-[#2A2A2A]">
                                <Button
                                    onClick={(e) => {
                                        handleLogout(e);
                                        setMobileOpen(false);
                                    }}
                                    variant="outline"
                                    className="w-full gap-2 border-red-200 bg-transparent text-sm font-medium text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-[rgba(220,38,38,0.1)]"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
