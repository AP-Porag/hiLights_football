import ThemeToggle from '@/components/shared/ThemeToggle';
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
    // { label: 'Search Players', href: '/scout/search', prominent: true },
    // { label: 'My Account', href: '/scout/account' },
    { label: 'Dashboard', href: '/scouting' },
    { label: 'Saved Players', href: '/scouting/player/saved' },
];
const ROLE_STYLES: Record<ScoutRole, string> = {
    SCOUT: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    AGENT: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    CLUB: 'bg-green-500/10 text-green-300 border-green-500/30',
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
                'bg-[#0D0D0D]',
                'border-b border-[#2A2A2A]',
                scrolled ? 'shadow-md' : 'shadow-none',
                'transition-shadow duration-200',
            ].join(' ')}
        >
            <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-6">
                {/* LEFT — Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="HiLights Football">
                    <img src="/images/logo/mobile-nav-logo.png" className="h-9 w-auto" alt="HiLights Football" />
                    {/* <img src="/images/logo/hilights_logo_dark_200.png" className="hidden h-9 w-auto dark:block" alt="HiLights Football" /> */}
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
                                        : 'text-[#9A9A9A] hover:text-[#FF6B00]',
                                ].join(' ')}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
                {/* RIGHT — Actions (desktop) */}
                <div className="hidden shrink-0 items-center gap-3 md:flex">
                    {/* <ThemeToggle /> */}
                    {/* Notification bell */}
                    {/* <Link
                        href="/scout/notifications"
                        className="relative rounded-md p-2 transition-colors hover:bg-[#1F1F1F]"
                        aria-label="Notifications"
                    >
                        <Bell className="h-5 w-5 text-[#555555] hover:text-[#FF6B00]" />
                        {notificationCount > 0 && (
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#0D0D0D]" />
                        )}
                    </Link> */}
                    {/* Avatar dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="flex items-center gap-1.5 rounded-full p-0.5 transition-colors outline-none hover:bg-[#1F1F1F] focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                                aria-label="Account menu"
                            >
                                <Avatar className="h-9 w-9 border border-[#2A2A2A]">
                                    {auth.user.avatar_url ? <AvatarImage src={auth.user.avatar_url} alt={auth.user.name} /> : null}
                                    <AvatarFallback className="bg-[rgba(255,107,0,0.15)] text-sm font-bold text-[#FF6B00]">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <ChevronDown className="h-3 w-3 text-[#94A3B8]" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-56 rounded-xl border border-[#2A2A2A] bg-[#161616] p-1 shadow-lg"
                        >
                            <div className="mb-1 border-b border-[#1F1F1F] px-3 py-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="truncate text-sm font-semibold text-[#F5F5F5]">{auth.user.name}</div>
                                    <span
                                        className={['shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider', roleChip].join(
                                            ' ',
                                        )}
                                    >
                                        {auth.user.role}
                                    </span>
                                </div>
                                <div className="mt-0.5 truncate text-xs text-[#555555]">
                                    {auth.user.organization ?? auth.user.email}
                                </div>
                            </div>
                            {/* <DropdownMenuItem asChild className="cursor-pointer rounded-md focus:bg-[#1F1F1F]">
                                <Link href="/scout/account" className="flex items-center gap-2 px-3 py-2 text-sm text-[#F5F5F5]">
                                    <Settings className="h-4 w-4 text-[#94A3B8]" />
                                    Account Settings
                                </Link>
                            </DropdownMenuItem> */}
                            {/* <DropdownMenuItem asChild className="cursor-pointer rounded-md focus:bg-[#1F1F1F]">
                                <Link href="/scout/plan" className="flex items-center gap-2 px-3 py-2 text-sm text-[#F5F5F5]">
                                    <CreditCard className="h-4 w-4 text-[#94A3B8]" />
                                    My Plan
                                </Link>
                            </DropdownMenuItem> */}
                            <DropdownMenuSeparator className="my-1 bg-[#1F1F1F]" />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-red-400 focus:bg-[rgba(220,38,38,0.1)] focus:text-red-400"
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
                        className="relative rounded-md p-2 transition-colors hover:bg-[#1F1F1F]"
                        aria-label="Notifications"
                    >
                        <Bell className="h-5 w-5 text-[#555555]" />
                        {notificationCount > 0 && (
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#0D0D0D]" />
                        )}
                    </Link>
                    <ThemeToggle />
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Open menu"
                                className="h-9 w-9 text-[#F5F5F5] hover:bg-[#1F1F1F]"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="flex w-[300px] flex-col border-r border-[#2A2A2A] bg-[#0D0D0D] p-0"
                        >
                            <SheetHeader className="border-b border-[#2A2A2A] px-6 py-4">
                                <SheetTitle className="flex items-center gap-2">
                                    <img
                                        src="/images/logo/hilights_logo_dark_200.png"
                                        className="h-9 w-auto"
                                        alt="HiLights Football"
                                    />
                                    <div className="flex items-end gap-0.5 leading-none">
                                        <span className="text-xl font-black tracking-tight text-[#F5F5F5]">Hi</span>
                                        <span className="text-xl font-black tracking-tight text-[#FF6B00] italic">Lights</span>
                                        <span className="mb-0.5 ml-1 self-end text-[10px] font-bold tracking-[0.12em] text-[#94A3B8]">FOOTBALL</span>
                                    </div>
                                </SheetTitle>
                            </SheetHeader>
                            {/* User card */}
                            <div className="flex items-center gap-3 border-b border-[#2A2A2A] px-6 py-4">
                                <Avatar className="h-11 w-11 border border-[#2A2A2A]">
                                    {auth.user.avatar_url ? <AvatarImage src={auth.user.avatar_url} alt={auth.user.name} /> : null}
                                    <AvatarFallback className="bg-[rgba(255,107,0,0.15)] text-sm font-bold text-[#FF6B00]">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className="truncate text-sm font-semibold text-[#F5F5F5]">{auth.user.name}</div>
                                        <span
                                            className={[
                                                'shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider',
                                                roleChip,
                                            ].join(' ')}
                                        >
                                            {auth.user.role}
                                        </span>
                                    </div>
                                    <div className="truncate text-xs text-[#555555]">
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
                                                'block border-b border-[#1F1F1F] py-3 text-base transition-colors',
                                                link.prominent ? 'font-semibold' : 'font-medium',
                                                active ? 'text-[#FF6B00]' : 'text-[#F5F5F5] hover:text-[#FF6B00]',
                                            ].join(' ')}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                                <Link
                                    href="/scout/plan"
                                    onClick={() => setMobileOpen(false)}
                                    className="block border-b border-[#1F1F1F] py-3 text-base font-medium text-[#F5F5F5] transition-colors hover:text-[#FF6B00]"
                                >
                                    My Plan
                                </Link>
                            </nav>
                            <div className="mt-4 border-t border-[#2A2A2A] px-6 py-4">
                                <Button
                                    onClick={(e) => {
                                        handleLogout(e);
                                        setMobileOpen(false);
                                    }}
                                    variant="outline"
                                    className="w-full gap-2 border-red-900/40 bg-transparent text-sm font-medium text-red-400 hover:bg-[rgba(220,38,38,0.1)] hover:text-red-400"
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
