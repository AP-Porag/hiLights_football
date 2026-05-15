import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    ClipboardList,
    CreditCard,
    FileText,
    LayoutDashboard,
    LogOut,
    LucideIcon,
    Menu,
    Search,
    Settings,
    Star,
    Tag,
    User,
    Users,
} from 'lucide-react';
import { ReactNode, useState } from 'react';

interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar_url?: string | null;
}

interface PageProps {
    auth: { user: AdminUser };
    [key: string]: any;
}

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    exactMatch?: boolean;
    comingSoon?: boolean;
    queryMatch?: string;
}

interface NavGroup {
    label: string;
    items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
    {
        label: 'Main',
        items: [{ label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard }],
    },
    {
        label: 'Users',
        items: [
            { label: 'All Users', href: '/admin/users', icon: Users, exactMatch: true },
            { label: 'Players', href: '/admin/users?role=player', icon: User, queryMatch: 'role=player' },
            { label: 'Scouts & Agents', href: '/admin/users?role=scout', icon: Search, queryMatch: 'role=scout' },
        ],
    },
    {
        label: 'Content',
        items: [
            { label: 'Player Profiles', href: '/admin/players', icon: ClipboardList },
            { label: 'Featured', href: '/admin/featured', icon: Star },
        ],
    },
    {
        label: 'Monetization',
        items: [
            { label: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
            { label: 'Plans', href: '/admin/plans', icon: Tag },
        ],
    },
    {
        label: 'Engagement',
        items: [
            { label: 'Scout Ratings', href: '/admin/ratings', icon: Star },
            { label: 'Notifications', href: '/admin/notifications', icon: Bell },
        ],
    },
    {
        label: 'System',
        items: [
            { label: 'Settings', href: '/admin/settings', icon: Settings },
            { label: 'Audit Log', href: '/admin/audit', icon: FileText, comingSoon: true },
        ],
    },
];

function getInitials(name: string): string {
    if (!name) return 'A';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function parseUrl(fullUrl: string): { path: string; query: string } {
    const [path, query = ''] = fullUrl.split('?');
    return { path, query };
}

function isItemActive(item: NavItem, currentUrl: string): boolean {
    const { path: currentPath, query: currentQuery } = parseUrl(currentUrl);
    const { path: itemPath, query: itemQuery } = parseUrl(item.href);

    if (item.queryMatch) {
        return currentPath === itemPath && currentQuery.includes(item.queryMatch);
    }

    if (item.exactMatch) {
        return currentPath === itemPath && !currentQuery;
    }

    if (currentPath === itemPath) {
        if (itemQuery) return currentQuery === itemQuery;
        return true;
    }

    return currentPath.startsWith(itemPath + '/');
}

interface SidebarContentProps {
    url: string;
    user: AdminUser;
    onNavigate?: () => void;
    onLogout: () => void;
}

function SidebarContent({ url, user, onNavigate, onLogout }: SidebarContentProps) {
    const initials = getInitials(user.name);

    return (
        <>
            {/* TOP */}
            <div className="flex items-center gap-2 border-b border-[#1F1F1F] px-5 py-5">
                <img src="/images/logo/hilights_logo_dark_200.png" className="h-8 w-auto" alt="HiLights Football" />
                <div className="flex items-end gap-0.5 leading-none">
                    <span className="text-lg font-black tracking-tight text-white">HiLights</span>
                    <span className="mb-0.5 ml-1 self-end text-[10px] font-bold tracking-[0.14em] text-[#555555]">FOOTBALL</span>
                </div>
                <span className="ml-1 rounded bg-[#FF6B00] px-2 py-0.5 text-[9px] font-black tracking-wider text-white">ADMIN</span>
            </div>

            {/* NAV */}
            <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-4">
                {NAV_GROUPS.map((group, gIdx) => (
                    <div key={group.label}>
                        <div
                            className={[
                                'px-3 py-2 text-[9px] font-bold tracking-[0.14em] text-[#555555] uppercase',
                                gIdx === 0 ? 'mt-0' : 'mt-3',
                            ].join(' ')}
                        >
                            {group.label}
                        </div>
                        {group.items.map((item) => {
                            const active = isItemActive(item, url);
                            const Icon = item.icon;
                            const baseClasses =
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-all duration-150 w-full';

                            if (item.comingSoon) {
                                return (
                                    <TooltipProvider key={item.href} delayDuration={200}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className={[
                                                        baseClasses,
                                                        'cursor-not-allowed text-[#555555] opacity-60 hover:text-[#9A9A9A]',
                                                    ].join(' ')}
                                                >
                                                    <Icon className="h-4 w-4 shrink-0 text-[#555555]" />
                                                    <span className="truncate">{item.label}</span>
                                                    <span className="ml-auto rounded bg-[rgba(255,107,0,0.10)] px-1.5 py-0.5 text-[9px] font-bold text-[#FF6B00]">
                                                        SOON
                                                    </span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className="border-[#2A2A2A] bg-[#1F1F1F] text-xs text-[#F5F5F5]">
                                                Coming soon
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                );
                            }

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onNavigate}
                                    className={[
                                        baseClasses,
                                        active
                                            ? 'rounded-l-none border-l-[3px] border-[#FF6B00] bg-[rgba(255,107,0,0.10)] pl-[9px] text-[#F5F5F5]'
                                            : 'text-[#9A9A9A] hover:bg-[rgba(255,107,0,0.05)] hover:text-[#F5F5F5]',
                                    ].join(' ')}
                                >
                                    <Icon className={['h-4 w-4 shrink-0', active ? 'text-[#FF6B00]' : 'text-[#555555]'].join(' ')} />
                                    <span className="truncate">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* BOTTOM */}
            <div className="mt-auto border-t border-[#1F1F1F] px-4 py-4">
                <div className="mb-3 flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-[#2A2A2A]">
                        {user.avatar_url ? <AvatarImage src={user.avatar_url} alt={user.name} /> : null}
                        <AvatarFallback className="bg-[#1F1F1F] text-sm font-bold text-[#9A9A9A]">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-[#F5F5F5]">{user.name}</div>
                        <div className="truncate text-xs text-[#555555]">{user.role}</div>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-400 transition-colors hover:bg-[rgba(220,38,38,0.08)] hover:text-red-300"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );
}

interface AdminLayoutProps {
    children: ReactNode;
    pageTitle: string;
    breadcrumb?: string;
}

export default function AdminLayout({ children, pageTitle, breadcrumb }: AdminLayoutProps) {
    const { url, props } = usePage<PageProps>();
    // TODO: const { auth } = usePage<PageProps>().props;
    const auth = props.auth ?? {
        user: {
            id: 1,
            name: 'Helena Costa',
            email: 'helena.costa@hilights.fc',
            role: 'Super Admin',
            avatar_url: null,
        },
    };

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        // TODO: Replace with route('logout')
        router.post('/logout');
    };

    const adminInitials = getInitials(auth.user.name);
    const computedBreadcrumb = breadcrumb ?? `Admin / ${pageTitle}`;

    return (
        <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
            {/* DESKTOP SIDEBAR */}
            <aside className="fixed top-0 left-0 z-30 hidden h-screen w-60 shrink-0 flex-col border-r border-[#1F1F1F] bg-[#0D0D0D] md:flex">
                <SidebarContent url={url} user={auth.user} onLogout={handleLogout} />
            </aside>

            {/* CONTENT */}
            <div className="flex min-h-screen flex-1 flex-col overflow-auto bg-[#F8FAFC] md:ml-60">
                {/* TOP HEADER */}
                <header className="sticky top-0 z-20 flex h-[60px] items-center justify-between border-b border-[#E2E8F0] bg-white px-4 md:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        {/* MOBILE — hamburger */}
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 shrink-0 text-[#0F172A] hover:bg-[#F8FAFC] md:hidden"
                                    aria-label="Open admin menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex w-[260px] flex-col border-r border-[#1F1F1F] bg-[#0D0D0D] p-0 [&>button]:text-[#9A9A9A] [&>button]:hover:text-white"
                            >
                                <SidebarContent
                                    url={url}
                                    user={auth.user}
                                    onNavigate={() => setMobileOpen(false)}
                                    onLogout={() => {
                                        setMobileOpen(false);
                                        handleLogout();
                                    }}
                                />
                            </SheetContent>
                        </Sheet>

                        <div className="min-w-0">
                            <h1 className="truncate text-xl leading-tight font-bold text-[#0F172A]">{pageTitle}</h1>
                            <div className="mt-0.5 truncate text-xs text-[#94A3B8]">{computedBreadcrumb}</div>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-4">
                        <button className="relative rounded-md p-2 transition-colors hover:bg-[#F8FAFC]" aria-label="Notifications">
                            <Bell className="h-5 w-5 text-[#94A3B8] hover:text-[#FF6B00]" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        </button>

                        <div className="flex items-center gap-2.5">
                            <Avatar className="h-9 w-9 border border-[#E2E8F0]">
                                {auth.user.avatar_url ? <AvatarImage src={auth.user.avatar_url} alt={auth.user.name} /> : null}
                                <AvatarFallback className="bg-[#FFF3EB] text-sm font-bold text-[#FF6B00]">{adminInitials}</AvatarFallback>
                            </Avatar>
                            <span className="hidden text-sm font-medium text-[#0F172A] sm:inline">{auth.user.name}</span>
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
        </div>
    );
}
