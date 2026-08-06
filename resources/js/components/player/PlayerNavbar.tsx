import ThemeToggle from '@/components/shared/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link, router, usePage } from '@inertiajs/react';
import { Bell, ChevronDown, LogOut, Menu, Settings, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
interface PlayerUser {
    id: number;
    name: string;
    email: string;
    avatar_url?: string | null;
    player_profile?: {
        id: number;
    } | null;
}
interface PageProps {
    auth: { user: PlayerUser };
    notificationCount?: number;
    [key: string]: any;
}
interface NavLink {
    label: string;
    href: string;
}
interface NotifItem {
    id: number;
    name: string;
    role?: string | null;
    viewed_at: string;
    player_profile_id?: number | null;
    avatar?: string | null;
    unread?: boolean;
}
// TODO: Replace with route() helper from Ziggy
const NAV_LINKS: NavLink[] = [
    { label: 'Dashboard', href: '/player/' },
    { label: 'My Profile', href: '/player/profile/data/edit' },
    // { label: 'Analytics', href: '/player/analytics' },
    { label: 'Subscription', href: '/player/subscription' },
];
function getInitials(name: string): string {
    if (!name) return 'P';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
export default function PlayerNavbar() {
    const { url, props } = usePage<PageProps>();
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
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotifItem[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(props.notificationCount ?? 0);
    const [notifLoading, setNotifLoading] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    // CSRF cookie (mark-read POST er jonno)
    const getCookie = (name: string): string => {
        const row = document.cookie.split('; ').find((r) => r.startsWith(name + '='));
        return row ? decodeURIComponent(row.split('=')[1]) : '';
    };
    // profile-view notifications load
    const loadNotifications = async () => {
        setNotifLoading(true);
        try {
            const res = await fetch('/player/notifications/feed', { headers: { Accept: 'application/json' } });
            const data = await res.json();
            setNotifications(data.notifications ?? []);
            setUnreadCount(data.unreadCount ?? 0);
        } catch {
            /* ignore */
        } finally {
            setNotifLoading(false);
        }
    };
    useEffect(() => {
        loadNotifications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // bell click — panel open + mark read
    const openNotifications = async () => {
        setNotifOpen(true);
        if (unreadCount > 0) {
            setUnreadCount(0);
            try {
                await fetch('/player/notifications/read', {
                    method: 'POST',
                    headers: { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'), Accept: 'application/json' },
                    credentials: 'same-origin',
                });
            } catch {
                /* ignore */
            }
        }
    };
    const isActive = (href: string) => {
        const normalize = (path: string) => path.replace(/\/$/, '');
        return normalize(url) === normalize(href);
    };
    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        router.post('/logout');
    };
    const initials = getInitials(auth?.user?.name ?? 'Player');
    return (
        <header
            className={[
                'fixed top-0 right-0 left-0 z-50 h-14 lg:h-18',
                'bg-[#0D0D0D]',
                'border-b border-[#2A2A2A]',
                scrolled ? 'shadow-md' : 'shadow-none',
                'transition-shadow duration-200',
            ].join(' ')}
        >
            <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-2 sm:px-6">
                {/* LEFT — Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="HiLights Football dashboard">
                    <img
                        src="/images/logo/final_logo.png"
                        className="h-6 w-auto sm:h-8 lg:h-10 xl:h-12 2xl:h-14"
                        alt="HiLights Football"
                    />
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
                    {/* Notification bell */}
                    {/* <button
                        type="button"
                        onClick={openNotifications}
                        className="relative rounded-md p-2 transition-colors hover:bg-[#1F1F1F]"
                        aria-label="Notifications"
                    >
                        <Bell className="h-5 w-5 text-[#94A3B8] hover:text-[#FF6B00]" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-[#0D0D0D]">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button> */}
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
                            className="w-56 rounded-xl border border-[#E2E8F0] bg-white p-1 shadow-lg dark:border-[#2A2A2A] bg-[#161616]"
                        >
                            <div className="mb-1 border-b border-[#F1F5F9] px-3 py-2 dark:border-[#1F1F1F]">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="truncate text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]">{auth.user.name}</div>
                                    <span className="shrink-0 rounded-full border border-[#FF6B00] bg-[#FFF3EB] px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#CC5500] dark:bg-[rgba(255,107,0,0.12)]">
                                        PLAYER
                                    </span>
                                </div>
                                <div className="mt-0.5 truncate text-xs text-[#94A3B8] dark:text-[#555555]">{auth.user.email}</div>
                            </div>
                            <DropdownMenuItem asChild className="cursor-pointer rounded-md focus:bg-[#F8FAFC] dark:focus:bg-[#1F1F1F]">
                                <Link
                                    href={`${window.location.origin}/player/profile/${auth?.user?.player_profile?.id}`}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-[#94A3B8]"
                                >
                                    <User className="h-4 w-4 text-[#94A3B8]" />
                                    View Public Profile
                                </Link>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem asChild className="cursor-pointer rounded-md focus:bg-[#F8FAFC] dark:focus:bg-[#1F1F1F]">
                                <Link
                                    href="/player/settings"
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-[#94A3B8]"
                                >
                                    <Settings className="h-4 w-4 text-[#94A3B8] " />
                                    Account Settings
                                </Link>
                            </DropdownMenuItem> */}
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
                    <button
                        type="button"
                        onClick={openNotifications}
                        className="relative rounded-md p-2 transition-colors hover:bg-[#1F1F1F]"
                        aria-label="Notifications"
                    >
                        <Bell className="h-5 w-5 text-[#94A3B8]" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-[#0D0D0D]">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>
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
                            <SheetHeader className="border-b px-6 py-4 border-[#2A2A2A]">
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
                                        <span className="shrink-0 rounded-full border border-[#FF6B00] bg-[#FFF3EB] px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#CC5500] dark:bg-[rgba(255,107,0,0.12)]">
                                            PLAYER
                                        </span>
                                    </div>
                                    <div className="truncate text-xs text-[#94A3B8] dark:text-[#555555]">{auth.user.email}</div>
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
                                <Link
                                    href={`/players/${auth.user.id}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="block border-b border-[#F1F5F9] py-3 text-base font-medium text-[#0F172A] transition-colors hover:text-[#FF6B00] dark:border-[#1F1F1F] dark:text-[#F5F5F5]"
                                >
                                    View Public Profile
                                </Link>
                                <Link
                                    href="/player/settings"
                                    onClick={() => setMobileOpen(false)}
                                    className="block border-b border-[#F1F5F9] py-3 text-base font-medium text-[#0F172A] transition-colors hover:text-[#FF6B00] dark:border-[#1F1F1F] dark:text-[#F5F5F5]"
                                >
                                    Account Settings
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
            {/* ============ NOTIFICATION PANEL (right drawer) ============ */}
            <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
                <SheetContent
                    side="right"
                    className="flex w-[340px] flex-col border-l border-[#2A2A2A] bg-[#0D0D0D] p-0 sm:w-[380px]"
                >
                    <SheetHeader className="border-b border-[#2A2A2A] px-5 py-4">
                        <SheetTitle className="text-left text-[#F5F5F5]">Notifications</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto">
                        {notifLoading && (
                            <p className="px-5 py-10 text-center text-sm text-[#555555]">Loading…</p>
                        )}
                        {!notifLoading && notifications.length === 0 && (
                            <p className="px-5 py-12 text-center text-sm text-[#9A9A9A]">No profile views yet.</p>
                        )}
                        {notifications.map((n) => {
                            const href = n.player_profile_id
                                ? `/player/profile/${n.player_profile_id}`
                                : '/player/views';
                            return (
                                <Link
                                    key={n.id}
                                    href={href}
                                    onClick={() => setNotifOpen(false)}
                                    className={[
                                        'flex items-start gap-3 border-b border-[#1F1F1F] px-5 py-4 transition-colors hover:bg-[#161616]',
                                        n.unread ? 'bg-[rgba(255,107,0,0.06)]' : '',
                                    ].join(' ')}
                                >
                                    <Avatar className="h-9 w-9 shrink-0 border border-[#2A2A2A]">
                                        {n.avatar ? <AvatarImage src={n.avatar} alt={n.name} /> : null}
                                        <AvatarFallback className="bg-[rgba(255,107,0,0.15)] text-xs font-bold text-[#FF6B00]">
                                            {getInitials(n.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm leading-snug text-[#F5F5F5]">
                                            <span className="font-semibold">{n.name}</span>{' '}
                                            <span className="text-[#9A9A9A]">viewed your profile</span>
                                        </p>
                                        <p className="mt-0.5 text-xs text-[#555555]">
                                            {n.viewed_at}{n.role ? ` · ${n.role}` : ''}
                                        </p>
                                    </div>
                                    {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#FF6B00]" />}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="border-t border-[#2A2A2A] p-3">
                        <Link
                            href="/player/views"
                            onClick={() => setNotifOpen(false)}
                            className="block rounded-lg py-2 text-center text-sm font-semibold text-[#FF6B00] transition-colors hover:bg-[#161616]"
                        >
                            View all
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </header >
    );
}
