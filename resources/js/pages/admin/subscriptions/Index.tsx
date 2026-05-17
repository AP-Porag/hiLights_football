import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Users,
    DollarSign,
    TrendingUp,
    UserMinus,
    MoreHorizontal,
    Eye,
    XCircle,
    RefreshCcw,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    Download,
    CreditCard,
    Check,
    X,
} from 'lucide-react';

// TODO: Replace with usePage().props
const metrics = {
    totalSubscribers: { value: 12847, change: 8.4, trend: 'up' as const },
    mrr: { value: 184320, change: 12.7, trend: 'up' as const },
    newThisMonth: { value: 482, change: 23.1, trend: 'up' as const },
    churned: { value: 67, change: -4.2, trend: 'down' as const },
};

// TODO: Replace with usePage().props.subscriptions
const subscriptions = [
    {
        id: 1,
        user: {
            name: 'Lucas Henrique Oliveira',
            email: 'lucas.oliveira@hilights.com',
            avatar: 'LO',
            role: 'Scout',
        },
        plan: 'Pro Scout',
        started: 'Jan 14, 2026',
        renews: 'Jun 14, 2026',
        amount: 49.0,
        status: 'paid',
    },
    {
        id: 2,
        user: {
            name: 'Marcus Thompson',
            email: 'm.thompson@cityfc.co.uk',
            avatar: 'MT',
            role: 'Club Manager',
        },
        plan: 'Enterprise',
        started: 'Nov 02, 2025',
        renews: 'Nov 02, 2026',
        amount: 299.0,
        status: 'paid',
    },
    {
        id: 3,
        user: {
            name: 'Rafael Santos Costa',
            email: 'rafael.costa@scoutbr.com',
            avatar: 'RC',
            role: 'Scout',
        },
        plan: 'Pro Scout',
        started: 'Feb 21, 2026',
        renews: 'May 21, 2026',
        amount: 49.0,
        status: 'overdue',
    },
    {
        id: 4,
        user: {
            name: 'Aisha Mbeki',
            email: 'aisha.m@africafootball.co',
            avatar: 'AM',
            role: 'Player',
        },
        plan: 'Player Pro',
        started: 'May 09, 2026',
        renews: 'Jun 09, 2026',
        amount: 19.0,
        status: 'trial',
    },
    {
        id: 5,
        user: {
            name: 'João Pedro Almeida',
            email: 'joao.almeida@samba.fc',
            avatar: 'JA',
            role: 'Player',
        },
        plan: 'Player Pro',
        started: 'Aug 17, 2025',
        renews: 'May 17, 2026',
        amount: 19.0,
        status: 'paid',
    },
    {
        id: 6,
        user: {
            name: 'Elena Vasquez Romero',
            email: 'e.vasquez@laligascout.es',
            avatar: 'EV',
            role: 'Scout',
        },
        plan: 'Pro Scout',
        started: 'Dec 03, 2025',
        renews: 'Cancelled',
        amount: 49.0,
        status: 'cancelled',
    },
    {
        id: 7,
        user: {
            name: 'Tobias Müller',
            email: 'tobias.m@bundesliga-talent.de',
            avatar: 'TM',
            role: 'Club Manager',
        },
        plan: 'Enterprise',
        started: 'Mar 28, 2026',
        renews: 'Mar 28, 2027',
        amount: 299.0,
        status: 'paid',
    },
    {
        id: 8,
        user: {
            name: 'Kwame Asante',
            email: 'k.asante@ghanafootball.org',
            avatar: 'KA',
            role: 'Player',
        },
        plan: 'Player Pro',
        started: 'Apr 11, 2026',
        renews: 'May 11, 2026',
        amount: 19.0,
        status: 'overdue',
    },
];

// TODO: Replace with usePage().props.plans
const plansData = [
    {
        id: 'player-pro',
        name: 'Player Pro',
        price: 19,
        currency: 'USD',
        billing: 'monthly',
        subscribers: 8421,
        revenue: 159999,
        color: 'orange',
        features: [
            { id: 'highlights', label: 'Unlimited highlight uploads', enabled: true },
            { id: 'analytics', label: 'Advanced performance analytics', enabled: true },
            { id: 'visibility', label: 'Priority scout visibility', enabled: true },
            { id: 'directMessage', label: 'Direct message scouts', enabled: true },
            { id: 'comparison', label: 'Player comparison tools', enabled: false },
            { id: 'apiAccess', label: 'API access', enabled: false },
        ],
    },
    {
        id: 'pro-scout',
        name: 'Pro Scout',
        price: 49,
        currency: 'USD',
        billing: 'monthly',
        subscribers: 3204,
        revenue: 156996,
        color: 'orange',
        features: [
            { id: 'unlimitedSearch', label: 'Unlimited player searches', enabled: true },
            { id: 'reports', label: 'Custom scouting reports', enabled: true },
            { id: 'shortlist', label: 'Unlimited shortlists', enabled: true },
            { id: 'exportData', label: 'Export to PDF / Excel', enabled: true },
            { id: 'comparison', label: 'Side-by-side comparisons', enabled: true },
            { id: 'apiAccess', label: 'API access (read-only)', enabled: false },
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 299,
        currency: 'USD',
        billing: 'monthly',
        subscribers: 1222,
        revenue: 365178,
        color: 'orange',
        features: [
            { id: 'teamSeats', label: 'Up to 25 team seats', enabled: true },
            { id: 'apiAccess', label: 'Full API access', enabled: true },
            { id: 'whiteLabel', label: 'White-label reports', enabled: true },
            { id: 'dedicatedManager', label: 'Dedicated account manager', enabled: true },
            { id: 'customIntegration', label: 'Custom CRM integration', enabled: true },
            { id: 'priorityData', label: 'Priority data feeds', enabled: true },
        ],
    },
];

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        paid: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-900',
        overdue: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900',
        trial: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900',
        cancelled: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-700',
    };
    const labels: Record<string, string> = {
        paid: 'Paid',
        overdue: 'Overdue',
        trial: 'Trial',
        cancelled: 'Cancelled',
    };
    return (
        <Badge
            variant="outline"
            className={`${styles[status]} font-medium text-xs px-2.5 py-0.5 rounded-md`}
        >
            {labels[status]}
        </Badge>
    );
}

function MetricCard({
                        label,
                        value,
                        change,
                        trend,
                        icon: Icon,
                        prefix = '',
                        suffix = '',
                    }: {
    label: string;
    value: number;
    change: number;
    trend: 'up' | 'down';
    icon: React.ElementType;
    prefix?: string;
    suffix?: string;
}) {
    const isPositive = trend === 'up';
    return (
        <Card className="bg-white border-[#E2E8F0] rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-[#FFF3EB] flex items-center justify-center">
                        <Icon className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div
                        className={`flex items-center gap-1 text-xs font-medium font-mono px-2 py-1 rounded-md ${
                            isPositive
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
                        }`}
                    >
                        {isPositive ? (
                            <ArrowUpRight className="h-3 w-3" />
                        ) : (
                            <ArrowDownRight className="h-3 w-3" />
                        )}
                        {Math.abs(change)}%
                    </div>
                </div>
                <p className="text-sm font-medium text-[#475569] mb-2">{label}</p>
                <p className="font-display text-3xl font-bold text-[#0F172A] tabular-nums">
                    {prefix}
                    {value.toLocaleString()}
                    {suffix}
                </p>
            </CardContent>
        </Card>
    );
}

function PlanEditCard({ plan }: { plan: (typeof plansData)[0] }) {
    const { data, setData, processing } = useForm({
        price: plan.price,
        features: plan.features.reduce(
            (acc, f) => ({ ...acc, [f.id]: f.enabled }),
            {} as Record<string, boolean>,
        ),
    });

    const handleSave = () => {
        // TODO: post(`/admin/subscriptions/plans/${plan.id}`)
        console.log('Saving plan:', plan.id, data);
    };

    return (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#E2E8F0]">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-xl font-bold text-[#0F172A]">
                            {plan.name}
                        </h3>
                        <Badge className="bg-[#FFF3EB] text-[#CC5500] border border-[#FF6B00] hover:bg-[#FFF3EB] text-xs px-2 py-0.5 rounded-md">
                            Active
                        </Badge>
                    </div>
                    <p className="text-sm text-[#475569]">
                        Manage pricing, features, and access tiers
                    </p>
                </div>
                <div className="text-right">
                    <p className="font-mono text-2xl font-bold text-[#FF6B00] tabular-nums">
                        {plan.subscribers.toLocaleString()}
                    </p>
                    <p className="text-xs text-[#475569] mt-0.5">Active subscribers</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label
                        htmlFor={`price-${plan.id}`}
                        className="text-sm font-medium text-[#0F172A] mb-2 block"
                    >
                        Monthly Price ({plan.currency})
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] font-mono text-sm">
                            $
                        </span>
                        <Input
                            id={`price-${plan.id}`}
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', Number(e.target.value))}
                            className="pl-7 font-mono bg-white border-[#E2E8F0] focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                        />
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-2">
                        Billed {plan.billing} • USD only
                    </p>
                </div>

                <div>
                    <Label className="text-sm font-medium text-[#0F172A] mb-2 block">
                        Monthly Revenue
                    </Label>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-3 py-2 h-10 flex items-center">
                        <span className="font-mono text-sm text-[#0F172A] tabular-nums">
                            ${plan.revenue.toLocaleString()}.00
                        </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-2">
                        {plan.subscribers.toLocaleString()} × ${plan.price}
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <Label className="text-sm font-medium text-[#0F172A] mb-3 block">
                    Plan Features
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {plan.features.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg"
                        >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                {data.features[feature.id] ? (
                                    <Check className="h-4 w-4 text-green-600 shrink-0" />
                                ) : (
                                    <X className="h-4 w-4 text-[#94A3B8] shrink-0" />
                                )}
                                <span className="text-sm text-[#0F172A] truncate">
                                    {feature.label}
                                </span>
                            </div>
                            <Switch
                                checked={data.features[feature.id]}
                                onCheckedChange={(checked) =>
                                    setData('features', {
                                        ...data.features,
                                        [feature.id]: checked,
                                    })
                                }
                                className="data-[state=checked]:bg-[#FF6B00]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 pt-6 border-t border-[#E2E8F0]">
                <Button
                    variant="outline"
                    className="border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    disabled={processing}
                    className="bg-[#FF6B00] text-white hover:bg-[#CC5500]"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}

export default function SubscriptionsIndex() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <AdminLayout pageTitle="Subscriptions Management">
            <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-[#0F172A] mb-1">
                            Subscriptions Management
                        </h1>
                        <p className="text-sm text-[#475569]">
                            Monitor recurring revenue, manage subscribers and plan tiers
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="border-[#E2E8F0] text-[#475569] hover:bg-white"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button className="bg-[#FF6B00] text-white hover:bg-[#CC5500]">
                            <CreditCard className="h-4 w-4 mr-2" />
                            New Subscription
                        </Button>
                    </div>
                </div>

                {/* Top Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <MetricCard
                        label="Total Subscribers"
                        value={metrics.totalSubscribers.value}
                        change={metrics.totalSubscribers.change}
                        trend={metrics.totalSubscribers.trend}
                        icon={Users}
                    />
                    <MetricCard
                        label="Monthly Recurring Revenue"
                        value={metrics.mrr.value}
                        change={metrics.mrr.change}
                        trend={metrics.mrr.trend}
                        icon={DollarSign}
                        prefix="$"
                    />
                    <MetricCard
                        label="New This Month"
                        value={metrics.newThisMonth.value}
                        change={metrics.newThisMonth.change}
                        trend={metrics.newThisMonth.trend}
                        icon={TrendingUp}
                    />
                    <MetricCard
                        label="Churned"
                        value={metrics.churned.value}
                        change={metrics.churned.change}
                        trend={metrics.churned.trend}
                        icon={UserMinus}
                    />
                </div>

                {/* Subscriptions Table */}
                <Card className="bg-white border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
                    <CardHeader className="border-b border-[#E2E8F0] p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle className="font-display text-xl font-bold text-[#0F172A]">
                                    Active Subscribers
                                </CardTitle>
                                <p className="text-sm text-[#475569] mt-1">
                                    {subscriptions.length} subscriptions shown
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                                    <Input
                                        placeholder="Search users..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 bg-white border-[#E2E8F0] focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] shrink-0"
                                >
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b border-[#E2E8F0] hover:bg-transparent bg-[#F8FAFC]">
                                        <TableHead className="text-xs font-semibold text-[#475569] uppercase tracking-wider py-3 px-6">
                                            User
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-[#475569] uppercase tracking-wider py-3">
                                            Plan
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-[#475569] uppercase tracking-wider py-3">
                                            Started
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-[#475569] uppercase tracking-wider py-3">
                                            Renews
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-[#475569] uppercase tracking-wider py-3 text-right">
                                            Amount
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-[#475569] uppercase tracking-wider py-3">
                                            Payment Status
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-[#475569] uppercase tracking-wider py-3 text-right pr-6">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {subscriptions.map((sub) => (
                                        <TableRow
                                            key={sub.id}
                                            className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
                                        >
                                            <TableCell className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#CC5500] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                                        {sub.user.avatar}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-sm text-[#0F172A] truncate">
                                                            {sub.user.name}
                                                        </p>
                                                        <p className="text-xs text-[#475569] truncate">
                                                            {sub.user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-[#0F172A]">
                                                        {sub.plan}
                                                    </span>
                                                    <span className="text-xs text-[#94A3B8]">
                                                        {sub.user.role}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className="text-sm text-[#475569] font-mono tabular-nums">
                                                    {sub.started}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span
                                                    className={`text-sm font-mono tabular-nums ${
                                                        sub.renews === 'Cancelled'
                                                            ? 'text-[#94A3B8] italic'
                                                            : 'text-[#475569]'
                                                    }`}
                                                >
                                                    {sub.renews}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4 text-right">
                                                <span className="text-sm font-mono font-semibold text-[#0F172A] tabular-nums">
                                                    ${sub.amount.toFixed(2)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <StatusBadge status={sub.status} />
                                            </TableCell>
                                            <TableCell className="py-4 pr-6 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-[#475569] hover:bg-[#F8FAFC]"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-44 bg-white border-[#E2E8F0]"
                                                    >
                                                        <DropdownMenuItem asChild>
                                                            <Link
                                                                href={`/admin/users/${sub.id}`}
                                                                className="flex items-center cursor-pointer text-[#0F172A]"
                                                            >
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View User
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-[#E2E8F0]" />
                                                        <DropdownMenuItem className="text-amber-600 focus:text-amber-700 focus:bg-amber-50 cursor-pointer">
                                                            <RefreshCcw className="h-4 w-4 mr-2" />
                                                            Refund
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                                                            <XCircle className="h-4 w-4 mr-2" />
                                                            Cancel
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-between p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
                            <p className="text-xs text-[#475569] font-mono">
                                Showing 1–{subscriptions.length} of 12,847
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#E2E8F0] text-[#475569] hover:bg-white"
                                    disabled
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#E2E8F0] text-[#475569] hover:bg-white"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Plans Accordion */}
                <div className="mt-6">
                    <Card className="bg-white border-[#E2E8F0] rounded-xl shadow-sm">
                        <CardHeader className="border-b border-[#E2E8F0] p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="font-display text-xl font-bold text-[#0F172A]">
                                        Plan Management
                                    </CardTitle>
                                    <p className="text-sm text-[#475569] mt-1">
                                        Configure pricing tiers, features, and access for
                                        each subscription level
                                    </p>
                                </div>
                                <Badge className="bg-[#FFF3EB] text-[#CC5500] border border-[#FF6B00] hover:bg-[#FFF3EB] font-mono">
                                    {plansData.length} plans
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Accordion
                                type="single"
                                collapsible
                                defaultValue="player-pro"
                                className="space-y-3"
                            >
                                {plansData.map((plan) => (
                                    <AccordionItem
                                        key={plan.id}
                                        value={plan.id}
                                        className="border border-[#E2E8F0] rounded-xl px-2 bg-white overflow-hidden"
                                    >
                                        <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-[#F8FAFC] rounded-lg group">
                                            <div className="flex items-center justify-between w-full pr-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-lg bg-[#FFF3EB] flex items-center justify-center shrink-0">
                                                        <CreditCard className="h-5 w-5 text-[#FF6B00]" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-display text-lg font-bold text-[#0F172A]">
                                                            {plan.name}
                                                        </p>
                                                        <p className="text-xs text-[#475569]">
                                                            {plan.subscribers.toLocaleString()}{' '}
                                                            subscribers •{' '}
                                                            {
                                                                plan.features.filter(
                                                                    (f) => f.enabled,
                                                                ).length
                                                            }{' '}
                                                            features enabled
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:flex items-baseline gap-1">
                                                    <span className="font-mono text-2xl font-bold text-[#FF6B00] tabular-nums">
                                                        ${plan.price}
                                                    </span>
                                                    <span className="text-xs text-[#475569] font-mono">
                                                        /mo
                                                    </span>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-2 pb-2 pt-2">
                                            <PlanEditCard plan={plan} />
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
