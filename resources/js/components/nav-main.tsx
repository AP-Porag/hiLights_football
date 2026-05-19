import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { adminTheme } from '@/lib/adminTheme';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel
            //  className={`${adminTheme.colors.text.sidebar}`}
             style={{ color: adminTheme.colors.text.sidebarMuted }}
             >
                Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}
                    style={{color: adminTheme.colors.text.sidebarMuted
                        
                    }}
                    >
                        <SidebarMenuButton asChild isActive={item.url === page.url}
                         className={`hover:bg-orange-500/10 active:bg-orange-500/10 active:border-orange-500 active:border-l-3 active:rounded-none active:text-white`}
                        >
                            <Link href={item.url} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
