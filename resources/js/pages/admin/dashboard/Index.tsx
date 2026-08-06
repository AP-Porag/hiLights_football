import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage, router } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, Ban, Crown, Eye, MoreHorizontal, Pencil, Search, TrendingUp, UserPlus, Users } from 'lucide-react';
import React from 'react';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Breadcrumbs } from '@/components/breadcrumbs';

// ── Types (controller theke asha real data) ──
interface AdminStats {
    totalPlayers: number;
    activePremium: number;
    mrr: number;
    newToday: number;
    activeScouts: number;
}
interface Trends {
    players: string;
    premium: string;
    scouts: string;
}
interface SubSeg {
    name: string;
    color: string;
    count: number;
    value: number;
}
interface RegPoint {
    day: string;
    registrations: number;
}
interface RecentUser {
    id: number;
    name: string;
    email: string;
    avatar: string;
    initials: string;
    role: string;
    subscription: string;
    status: string;
    registered: string;
}
interface PageProps {
    stats: AdminStats;
    trends: Trends;
    registrations: RegPoint[];
    registrationTrend: number;
    subscriptionData: SubSeg[];
    recentUsers: RecentUser[];
    [key: string]: any;
}

const roleStyles: Record<string, string> = {
    Player: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Scout: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    Agent: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    Club: 'bg-green-500/10 text-green-400 border-green-500/30',
    Admin: 'bg-[rgba(255,107,0,0.12)] text-[#FF6B00] border-[#FF6B00]/30',
};
const statusStyles: Record<string, string> = {
    Active: 'bg-green-500/10 text-green-400 border-green-500/30',
    Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    Suspended: 'bg-red-500/10 text-red-400 border-red-500/30',
};
const subscriptionStyles: Record<string, string> = {
    Free: 'bg-[#1F1F1F] text-[#9A9A9A] border-[#2A2A2A]',
    Premium: 'bg-[rgba(255,107,0,0.12)] text-[#FF6B00] border-[#FF6B00]/30',
    Elite: 'bg-[rgba(255,107,0,0.12)] text-[#FF6B00] border-[#FF6B00]/30',
    Agent: 'bg-[rgba(255,107,0,0.12)] text-[#FF6B00] border-[#FF6B00]/30',
};

const statusClasses: Record<string, string> = {
    Active: 'bg-green-600 text-white',
    Suspended: 'bg-red-600 text-white',
    Pending: 'bg-yellow-600 text-white',
};
const StatCard: React.FC<{
    label: string;
    value: string;
    icon: React.ReactNode;
    trend?: { text: string; positive?: boolean };
    valueClass?: string;
    subtitle?: string;
}> = ({ label, value, icon, trend, valueClass, subtitle }) => (
    <Card className="relative overflow-hidden rounded-2xl border-[#2A2A2A] bg-[#161616] shadow-sm">
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-[#FF6B00]" />
        <CardContent className="p-6">
            <div className="mb-4 flex items-start justify-between">
                <span className="font-sans text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">{label}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(255,107,0,0.12)]">{icon}</div>
            </div>
            <div className={`font-display text-3xl leading-none font-bold text-[#F5F5F5] ${valueClass ?? ''}`}>{value}</div>
            {subtitle && <div className="mt-1 font-mono text-xs text-[#555555]">{subtitle}</div>}
            {trend && (
                <div className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
                    <ArrowUpRight className="h-3 w-3" />
                    {trend.text}
                </div>
            )}
        </CardContent>
    </Card>
);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-[#2A2A2A] bg-[#161616] px-3 py-2 shadow-md">
                <div className="mb-1 font-sans text-xs text-[#9A9A9A]">{label}</div>
                <div className="font-mono text-sm font-semibold text-[#F5F5F5]">
                    {payload[0].value} <span className="font-sans text-xs font-normal text-[#555555]">sign-ups</span>
                </div>
            </div>
        );
    }
    return null;
};

export default function Index() {
    const {
        stats,
        trends,
        registrations = [],
        registrationTrend = 0,
        subscriptionData = [],
        recentUsers = [],

    } = usePage<PageProps>().props;
    console.log(recentUsers)

    const chartData = registrations;
    const nf = (n: number) => n.toLocaleString();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen space-y-6 bg-[#0D0D0D] p-4 sm:p-6 lg:p-8">
                {/* Page Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-[#F5F5F5] sm:text-4xl">Dashboard</h1>
                        <p className="mt-1 text-sm text-[#9A9A9A]">Platform overview and key performance metrics.</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#161616] px-3 py-2 font-mono text-xs text-[#9A9A9A]">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        Live · Updated just now
                    </div>
                </div>
                {/* Stat Widgets */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                    <StatCard
                        label="Total Players"
                        value={nf(stats.totalPlayers)}
                        icon={<Users className="h-4 w-4 text-[#FF6B00]" />}
                        trend={{ text: trends.players, positive: true }}
                    />
                    <StatCard
                        label="Active Premium"
                        value={nf(stats.activePremium)}
                        subtitle={stats.totalPlayers > 0 ? `${((stats.activePremium / stats.totalPlayers) * 100).toFixed(1)}% of players` : undefined}
                        icon={<Crown className="h-4 w-4 text-[#FF6B00]" />}
                        trend={{ text: trends.premium, positive: true }}
                    />
                    <StatCard
                        label="Revenue MRR"
                        value={`€${nf(stats.mrr)}`}
                        valueClass="text-[#FF6B00] font-mono"
                        icon={<TrendingUp className="h-4 w-4 text-[#FF6B00]" />}
                    />
                    <StatCard
                        label="New Today"
                        value={`+${nf(stats.newToday)}`}
                        valueClass="text-green-400 font-mono"
                        icon={<UserPlus className="h-4 w-4 text-[#FF6B00]" />}
                    />
                    <StatCard
                        label="Active Scouts"
                        value={nf(stats.activeScouts)}
                        icon={<Search className="h-4 w-4 text-[#FF6B00]" />}
                        trend={{ text: trends.scouts, positive: true }}
                    />
                </div>
                {/* Charts Row */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Registrations Line Chart */}
                    <Card className="rounded-2xl border-[#2A2A2A] bg-[#161616] shadow-sm">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 p-6 pb-2">
                            <div>
                                <CardTitle className="font-display text-lg font-bold text-[#F5F5F5]">Registrations — Last 30 Days</CardTitle>
                                <p className="mt-1 text-xs text-[#9A9A9A]">Daily new user sign-ups across all roles</p>
                            </div>
                            <Badge className="border border-[#FF6B00]/30 bg-[rgba(255,107,0,0.12)] text-[#FF6B00] hover:bg-[rgba(255,107,0,0.12)]">
                                <span className="font-mono text-xs">{registrationTrend >= 0 ? '+' : ''}{registrationTrend}%</span>
                            </Badge>
                        </CardHeader>
                        <CardContent className="p-6 pt-4">
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                                        <CartesianGrid stroke="#2A2A2A" strokeDasharray="3 3" vertical={false} />
                                        <XAxis
                                            dataKey="day"
                                            tick={{ fontSize: 10, fill: '#6B6B6B' }}
                                            tickLine={false}
                                            axisLine={{ stroke: '#2A2A2A' }}
                                            interval={4}
                                        />
                                        <YAxis tick={{ fontSize: 10, fill: '#6B6B6B' }} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#FF6B00', strokeOpacity: 0.2, strokeWidth: 2 }} />
                                        <Line
                                            type="monotone"
                                            dataKey="registrations"
                                            stroke="#FF6B00"
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{ r: 5, fill: '#FF6B00', stroke: '#161616', strokeWidth: 2 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Subscription Distribution Pie */}
                    <Card className="rounded-2xl border-[#2A2A2A] bg-[#161616] shadow-sm">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="font-display text-lg font-bold text-[#F5F5F5]">Subscription Distribution</CardTitle>
                            <p className="mt-1 text-xs text-[#9A9A9A]">Breakdown of all active accounts by tier</p>
                        </CardHeader>
                        <CardContent className="p-6 pt-4">
                            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
                                <div className="h-[200px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={subscriptionData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={80}
                                                paddingAngle={2}
                                                dataKey="value"
                                                stroke="#161616"
                                                strokeWidth={2}
                                            >
                                                {subscriptionData.map((entry, i) => (
                                                    <Cell key={i} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#161616',
                                                    border: '1px solid #2A2A2A',
                                                    borderRadius: '8px',
                                                    fontSize: '12px',
                                                    color: '#F5F5F5',
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-3">
                                    {subscriptionData.map((seg) => (
                                        <div key={seg.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                                                <span className="text-sm font-medium text-[#F5F5F5]">{seg.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-mono text-sm font-semibold text-[#F5F5F5]">{seg.count.toLocaleString()}</div>
                                                <div className="font-mono text-xs text-[#555555]">{seg.value}%</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Recent Registrations Table */}
                <Card className="rounded-2xl border-[#2A2A2A] bg-[#161616] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4">
                        <div>
                            <CardTitle className="font-display text-lg font-bold text-[#F5F5F5]">Recent Registrations</CardTitle>
                            <p className="mt-1 text-xs text-[#9A9A9A]">Last 8 sign-ups across all roles and regions</p>
                        </div>
                        <Link
                            href="/admin/users"
                            className="inline-flex items-center gap-1 text-sm font-medium text-[#FF6B00] transition-colors hover:text-[#CC5500]"
                        >
                            View All
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Desktop table */}
                        <div className="hidden overflow-x-auto md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-[#2A2A2A] hover:bg-transparent">
                                        <TableHead className="px-6 text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">User</TableHead>
                                        <TableHead className="text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Email</TableHead>
                                        <TableHead className="text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Role</TableHead>
                                        <TableHead className="text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Subscription</TableHead>
                                        <TableHead className="text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Status</TableHead>
                                        <TableHead className="text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Registered</TableHead>
                                        <TableHead className="pr-6 text-right text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentUsers.map((user) => (
                                        <TableRow key={user.id} className="border-[#2A2A2A] transition-colors hover:bg-[#1F1F1F]">
                                            <TableCell className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 border border-[#2A2A2A]">
                                                        {user?.avatar && <AvatarImage src={user?.avatar} alt={user.name} />}
                                                        <AvatarFallback className="bg-[rgba(255,107,0,0.12)] text-xs font-semibold text-[#FF6B00]">
                                                            {user.initials}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-[#F5F5F5]">{user.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono text-xs text-[#9A9A9A]">{user.email}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`${roleStyles[user.role] ?? roleStyles.Admin} text-xs font-medium`}>
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`${subscriptionStyles[user.subscription] ?? subscriptionStyles.Free} text-xs font-medium`}>
                                                    {user.subscription}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`${statusClasses[user.status] ?? statusClasses.Active} text-xs font-medium`}>
                                                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' :
                                                        user.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`} />
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono text-xs text-[#555555]">{user.registered}</span>
                                            </TableCell>
                                            <TableCell className="pr-6 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-[#9A9A9A] hover:bg-[rgba(255,107,0,0.12)] hover:text-[#FF6B00]"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40 border-[#2A2A2A] bg-[#161616] text-[#F5F5F5]">
                                                        <DropdownMenuItem asChild className="cursor-pointer focus:bg-[#1F1F1F]">
                                                            <Link href={route('users.show', user.id)} className="flex items-center gap-2">
                                                                <Eye className="h-3.5 w-3.5" />
                                                                <span className="text-sm">View</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild className="cursor-pointer focus:bg-[#1F1F1F]">
                                                            <Link href={route('users.edit', user.id)} className="flex items-center gap-2">
                                                                <Pencil className="h-3.5 w-3.5" />
                                                                <span className="text-sm">Edit</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                                                        <DropdownMenuItem
                                                            onClick={() => router.post(route('users.suspend', user.id))}
                                                            className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-300"
                                                        >
                                                            <Ban className="mr-2 h-3.5 w-3.5" />
                                                            <span className="text-sm">Suspend</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        {/* Mobile stacked cards */}
                        <div className="divide-y divide-[#2A2A2A] md:hidden">
                            {recentUsers.map((user) => (
                                <div key={user.id} className="p-4 transition-colors hover:bg-[#1F1F1F]">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex min-w-0 flex-1 items-center gap-3">
                                            <Avatar className="h-10 w-10 shrink-0 border border-[#2A2A2A]">
                                                {user?.avatar && <AvatarImage src={user?.avatar} alt={user.name} />}
                                                <AvatarFallback className="bg-[rgba(255,107,0,0.12)] text-xs font-semibold text-[#FF6B00]">
                                                    {user.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0 flex-1">
                                                <div className="truncate text-sm font-medium text-[#F5F5F5]">{user.name}</div>
                                                <div className="truncate font-mono text-xs text-[#9A9A9A]">{user.email}</div>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 shrink-0 p-0 text-[#9A9A9A] hover:bg-[rgba(255,107,0,0.12)] hover:text-[#FF6B00]"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40 border-[#2A2A2A] bg-[#161616] text-[#F5F5F5]">
                                                <DropdownMenuItem asChild className="cursor-pointer focus:bg-[#1F1F1F]">
                                                    <Link href={`/admin/users/${user.id}`} className="flex items-center gap-2">
                                                        <Eye className="h-3.5 w-3.5" />
                                                        <span className="text-sm">View</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="cursor-pointer focus:bg-[#1F1F1F]">
                                                    <Link href={`/admin/users/${user.id}/edit`} className="flex items-center gap-2">
                                                        <Pencil className="h-3.5 w-3.5" />
                                                        <span className="text-sm">Edit</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                                                <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-300">
                                                    <Ban className="mr-2 h-3.5 w-3.5" />
                                                    <span className="text-sm">Suspend</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <Badge variant="outline" className={`${roleStyles[user.role] ?? roleStyles.Admin} text-xs font-medium`}>
                                            {user.role}
                                        </Badge>
                                        <Badge variant="outline" className={`${subscriptionStyles[user.subscription] ?? subscriptionStyles.Free} text-xs font-medium`}>
                                            {user.subscription}
                                        </Badge>
                                        <Badge variant="outline" className={`${statusStyles[user.status] ?? statusStyles.Pending} text-xs font-medium`}>
                                            <span
                                                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${user.status === 'Active'
                                                    ? 'bg-green-500'
                                                    : user.status === 'Pending'
                                                        ? 'bg-yellow-500'
                                                        : 'bg-red-500'
                                                    }`}
                                            />
                                            {user.status}
                                        </Badge>
                                        <span className="ml-auto font-mono text-xs text-[#555555]">{user.registered}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
