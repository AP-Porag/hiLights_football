import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, BriefcaseBusiness, BriefcaseBusinessIcon, DollarSign, Folder, Group, GroupIcon, LayoutGrid, LucideBriefcaseBusiness, SubscriptIcon, User, User2, User2Icon } from 'lucide-react';
import AppLogo from './app-logo';
import { adminTheme } from '@/lib/adminTheme'

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
     {
        title: 'Users',
        url: '',
        icon: User,
    },
      {
        title: 'Player Profile',
        url: '',
        icon: User2,
    },
     {
        title: 'Subscriptions',
        url: '',
        icon: DollarSign,
    },
      {
        title: 'Scout Rating',
        url: '/dashboard',
        icon: LucideBriefcaseBusiness,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     url: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     url: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar className="border-2 border-orange-500 rounded-3xl" style={{backgroundColor:adminTheme.colors.sidebar.background,
            color:adminTheme.colors.text.sidebar
        }} collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
