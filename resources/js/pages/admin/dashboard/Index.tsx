// import AdminLayout from '@/components/Admin/AdminLayout';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
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

// MOCK DATA — TODO: Replace with usePage().props
const stats = {
    totalPlayers: 12847,
    activePremium: 834,
    mrr: 4200,
    newToday: 47,
    activeScouts: 1243,
    churnRate: 2.3,
};

const chartData = Array.from({ length: 30 }, (_, i) => ({
    day: `D${i + 1}`,
    registrations: Math.floor(30 + Math.random() * 70),
}));

const subscriptionData = [
    { name: 'Free', value: 68, color: '#94A3B8', count: 8736 },
    { name: 'Premium', value: 27, color: '#FF6B00', count: 3469 },
    { name: 'Agent', value: 5, color: '#CC5500', count: 642 },
];

const recentUsers = [
    {
        id: 1,
        name: 'Lucas Almeida',
        email: 'lucas.almeida@gmail.com',
        avatar: 'https://i.pravatar.cc/100?img=12',
        initials: 'LA',
        role: 'Player',
        subscription: 'Premium',
        status: 'Active',
        registered: '2 min ago',
    },
    {
        id: 2,
        name: 'James Whitfield',
        email: 'j.whitfield@scoutpro.co.uk',
        avatar: 'https://i.pravatar.cc/100?img=33',
        initials: 'JW',
        role: 'Scout',
        subscription: 'Premium',
        status: 'Active',
        registered: '14 min ago',
    },
    {
        id: 3,
        name: 'Marco Rossi',
        email: 'marco.rossi@agency.it',
        avatar: 'https://i.pravatar.cc/100?img=52',
        initials: 'MR',
        role: 'Agent',
        subscription: 'Agent',
        status: 'Active',
        registered: '1 hour ago',
    },
    {
        id: 4,
        name: 'Rafael Santos',
        email: 'rafael.s@outlook.com',
        avatar: 'https://i.pravatar.cc/100?img=15',
        initials: 'RS',
        role: 'Player',
        subscription: 'Free',
        status: 'Pending',
        registered: '2 hours ago',
    },
    {
        id: 5,
        name: 'FC Porto Academy',
        email: 'recruitment@fcporto.pt',
        avatar: '',
        initials: 'FP',
        role: 'Club',
        subscription: 'Premium',
        status: 'Active',
        registered: '4 hours ago',
    },
    {
        id: 6,
        name: 'Tomás Pereira',
        email: 'tomas.pereira22@gmail.com',
        avatar: 'https://i.pravatar.cc/100?img=68',
        initials: 'TP',
        role: 'Player',
        subscription: 'Free',
        status: 'Active',
        registered: '6 hours ago',
    },
    {
        id: 7,
        name: 'Sofia Hernández',
        email: 'sofia.h@elite-scouts.es',
        avatar: 'https://i.pravatar.cc/100?img=47',
        initials: 'SH',
        role: 'Scout',
        subscription: 'Premium',
        status: 'Active',
        registered: '9 hours ago',
    },
    {
        id: 8,
        name: 'Daniel Okafor',
        email: 'd.okafor@futurestars.ng',
        avatar: 'https://i.pravatar.cc/100?img=60',
        initials: 'DO',
        role: 'Player',
        subscription: 'Free',
        status: 'Suspended',
        registered: '1 day ago',
    },
];

const roleStyles: Record<string, string> = {
    Player: 'bg-blue-50 text-blue-700 border-blue-100',
    Scout: 'bg-purple-50 text-purple-700 border-purple-100',
    Agent: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    Club: 'bg-green-50 text-green-700 border-green-100',
};

const statusStyles: Record<string, string> = {
    Active: 'bg-green-50 text-green-700 border-green-100',
    Pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    Suspended: 'bg-red-50 text-red-700 border-red-100',
};

const subscriptionStyles: Record<string, string> = {
    Free: 'bg-slate-100 text-slate-700 border-slate-200',
    Premium: 'bg-[#FFF3EB] text-[#CC5500] border-[#FF6B00]/30',
    Agent: 'bg-[#FFF3EB] text-[#CC5500] border-[#FF6B00]/30',
};

const StatCard: React.FC<{
    label: string;
    value: string;
    icon: React.ReactNode;
    trend?: { text: string; positive?: boolean };
    valueClass?: string;
    subtitle?: string;
}> = ({ label, value, icon, trend, valueClass, subtitle }) => (
    <Card className="relative overflow-hidden rounded-2xl border-[#E2E8F0] bg-white shadow-sm">
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-[#FF6B00]" />
        <CardContent className="p-6">
            <div className="mb-4 flex items-start justify-between">
                <span className="font-sans text-xs font-medium tracking-wider text-[#475569] uppercase">{label}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF3EB]">{icon}</div>
            </div>
            <div className={`font-display text-3xl leading-none font-bold text-[#0F172A] ${valueClass ?? ''}`}>{value}</div>
            {subtitle && <div className="mt-1 font-mono text-xs text-[#94A3B8]">{subtitle}</div>}
            {trend && (
                <div className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
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
            <div className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 shadow-md">
                <div className="mb-1 font-sans text-xs text-[#475569]">{label}</div>
                <div className="font-mono text-sm font-semibold text-[#0F172A]">
                    {payload[0].value} <span className="font-sans text-xs font-normal text-[#94A3B8]">sign-ups</span>
                </div>
            </div>
        );
    }
    return null;
};

export default function Index() {
    return (
        <AppLayout>
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Page Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">Dashboard</h1>
                        <p className="mt-1 text-sm text-[#475569]">Platform overview and key performance metrics.</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 font-mono text-xs text-[#475569]">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        Live · Updated just now
                    </div>
                </div>

                {/* Stat Widgets */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                    <StatCard
                        label="Total Players"
                        value="12,847"
                        icon={<Users className="h-4 w-4 text-[#FF6B00]" />}
                        trend={{ text: '234 this month', positive: true }}
                    />
                    <StatCard
                        label="Active Premium"
                        value="834"
                        subtitle="6.5% of total users"
                        icon={<Crown className="h-4 w-4 text-[#FF6B00]" />}
                        trend={{ text: '42 this week', positive: true }}
                    />
                    <StatCard
                        label="Revenue MRR"
                        value="€4,200"
                        valueClass="text-[#FF6B00] font-mono"
                        icon={<TrendingUp className="h-4 w-4 text-[#FF6B00]" />}
                        trend={{ text: '€320 vs last month', positive: true }}
                    />
                    <StatCard
                        label="New Today"
                        value="+47"
                        valueClass="text-green-600 font-mono"
                        icon={<UserPlus className="h-4 w-4 text-[#FF6B00]" />}
                        trend={{ text: '12% above average', positive: true }}
                    />
                    <StatCard
                        label="Active Scouts"
                        value="1,243"
                        subtitle="Across 38 countries"
                        icon={<Search className="h-4 w-4 text-[#FF6B00]" />}
                        trend={{ text: '89 this month', positive: true }}
                    />
                </div>

                {/* Charts Row */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Registrations Line Chart */}
                    <Card className="rounded-2xl border-[#E2E8F0] bg-white shadow-sm">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 p-6 pb-2">
                            <div>
                                <CardTitle className="font-display text-lg font-bold text-[#0F172A]">Registrations — Last 30 Days</CardTitle>
                                <p className="mt-1 text-xs text-[#475569]">Daily new user sign-ups across all roles</p>
                            </div>
                            <Badge className="border border-[#FF6B00]/30 bg-[#FFF3EB] text-[#CC5500] hover:bg-[#FFF3EB]">
                                <span className="font-mono text-xs">+18.2%</span>
                            </Badge>
                        </CardHeader>
                        <CardContent className="p-6 pt-4">
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                                        <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                                        <XAxis
                                            dataKey="day"
                                            tick={{ fontSize: 10, fill: '#94A3B8' }}
                                            tickLine={false}
                                            axisLine={{ stroke: '#E2E8F0' }}
                                            interval={4}
                                        />
                                        <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#FF6B00', strokeOpacity: 0.2, strokeWidth: 2 }} />
                                        <Line
                                            type="monotone"
                                            dataKey="registrations"
                                            stroke="#FF6B00"
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{ r: 5, fill: '#FF6B00', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subscription Distribution Pie */}
                    <Card className="rounded-2xl border-[#E2E8F0] bg-white shadow-sm">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="font-display text-lg font-bold text-[#0F172A]">Subscription Distribution</CardTitle>
                            <p className="mt-1 text-xs text-[#475569]">Breakdown of all active accounts by tier</p>
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
                                                stroke="#fff"
                                                strokeWidth={2}
                                            >
                                                {subscriptionData.map((entry, i) => (
                                                    <Cell key={i} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #E2E8F0',
                                                    borderRadius: '8px',
                                                    fontSize: '12px',
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
                                                <span className="text-sm font-medium text-[#0F172A]">{seg.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-mono text-sm font-semibold text-[#0F172A]">{seg.count.toLocaleString()}</div>
                                                <div className="font-mono text-xs text-[#94A3B8]">{seg.value}%</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Registrations Table */}
                <Card className="rounded-2xl border-[#E2E8F0] bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4">
                        <div>
                            <CardTitle className="font-display text-lg font-bold text-[#0F172A]">Recent Registrations</CardTitle>
                            <p className="mt-1 text-xs text-[#475569]">Last 8 sign-ups across all roles and regions</p>
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
                                    <TableRow className="border-[#E2E8F0] hover:bg-transparent">
                                        <TableHead className="px-6 text-xs font-medium tracking-wider text-[#475569] uppercase">User</TableHead>
                                        <TableHead className="text-xs font-medium tracking-wider text-[#475569] uppercase">Email</TableHead>
                                        <TableHead className="text-xs font-medium tracking-wider text-[#475569] uppercase">Role</TableHead>
                                        <TableHead className="text-xs font-medium tracking-wider text-[#475569] uppercase">Subscription</TableHead>
                                        <TableHead className="text-xs font-medium tracking-wider text-[#475569] uppercase">Status</TableHead>
                                        <TableHead className="text-xs font-medium tracking-wider text-[#475569] uppercase">Registered</TableHead>
                                        <TableHead className="pr-6 text-right text-xs font-medium tracking-wider text-[#475569] uppercase">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentUsers.map((user) => (
                                        <TableRow key={user.id} className="border-[#E2E8F0] transition-colors hover:bg-[#F8FAFC]">
                                            <TableCell className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 border border-[#E2E8F0]">
                                                        {user?.avatar && <AvatarImage src={user?.avatar} alt={user.name} />}
                                                        <AvatarFallback className="bg-[#FFF3EB] text-xs font-semibold text-[#CC5500]">
                                                            {user.initials}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-[#0F172A]">{user.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono text-xs text-[#475569]">{user.email}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`${roleStyles[user.role]} text-xs font-medium`}>
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`${subscriptionStyles[user.subscription]} text-xs font-medium`}>
                                                    {user.subscription}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`${statusStyles[user.status]} text-xs font-medium`}>
                                                    <span
                                                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                                            user.status === 'Active'
                                                                ? 'bg-green-500'
                                                                : user.status === 'Pending'
                                                                  ? 'bg-yellow-500'
                                                                  : 'bg-red-500'
                                                        }`}
                                                    />
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono text-xs text-[#94A3B8]">{user.registered}</span>
                                            </TableCell>
                                            <TableCell className="pr-6 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 hover:bg-[#FFF3EB] hover:text-[#FF6B00]"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40 border-[#E2E8F0]">
                                                        <DropdownMenuItem asChild className="cursor-pointer">
                                                            <Link href={`/admin/users/${user.id}`} className="flex items-center gap-2">
                                                                <Eye className="h-3.5 w-3.5" />
                                                                <span className="text-sm">View</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild className="cursor-pointer">
                                                            <Link href={`/admin/users/${user.id}/edit`} className="flex items-center gap-2">
                                                                <Pencil className="h-3.5 w-3.5" />
                                                                <span className="text-sm">Edit</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
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
                        <div className="divide-y divide-[#E2E8F0] md:hidden">
                            {recentUsers.map((user) => (
                                <div key={user.id} className="p-4 transition-colors hover:bg-[#F8FAFC]">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex min-w-0 flex-1 items-center gap-3">
                                            <Avatar className="h-10 w-10 shrink-0 border border-[#E2E8F0]">
                                                {user?.avatar && <AvatarImage src={user?.avatar} alt={user.name} />}
                                                <AvatarFallback className="bg-[#FFF3EB] text-xs font-semibold text-[#CC5500]">
                                                    {user.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0 flex-1">
                                                <div className="truncate text-sm font-medium text-[#0F172A]">{user.name}</div>
                                                <div className="truncate font-mono text-xs text-[#475569]">{user.email}</div>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 shrink-0 p-0 hover:bg-[#FFF3EB] hover:text-[#FF6B00]"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40 border-[#E2E8F0]">
                                                <DropdownMenuItem asChild className="cursor-pointer">
                                                    <Link href={`/admin/users/${user.id}`} className="flex items-center gap-2">
                                                        <Eye className="h-3.5 w-3.5" />
                                                        <span className="text-sm">View</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="cursor-pointer">
                                                    <Link href={`/admin/users/${user.id}/edit`} className="flex items-center gap-2">
                                                        <Pencil className="h-3.5 w-3.5" />
                                                        <span className="text-sm">Edit</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                                                    <Ban className="mr-2 h-3.5 w-3.5" />
                                                    <span className="text-sm">Suspend</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <Badge variant="outline" className={`${roleStyles[user.role]} text-xs font-medium`}>
                                            {user.role}
                                        </Badge>
                                        <Badge variant="outline" className={`${subscriptionStyles[user.subscription]} text-xs font-medium`}>
                                            {user.subscription}
                                        </Badge>
                                        <Badge variant="outline" className={`${statusStyles[user.status]} text-xs font-medium`}>
                                            <span
                                                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                                    user.status === 'Active'
                                                        ? 'bg-green-500'
                                                        : user.status === 'Pending'
                                                          ? 'bg-yellow-500'
                                                          : 'bg-red-500'
                                                }`}
                                            />
                                            {user.status}
                                        </Badge>
                                        <span className="ml-auto font-mono text-xs text-[#94A3B8]">{user.registered}</span>
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
