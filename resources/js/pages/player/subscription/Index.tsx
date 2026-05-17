import React from 'react';
import { Link } from '@inertiajs/react';
import {
    Check,
    X,
    Lock,
    Shield,
    CreditCard,
    Sparkles,
    Crown,
    Zap,
    Star,
    Award,
    Users,
    BarChart3,
    Video,
    Eye,
    MessageSquare,
    Globe,
    Headphones,
    TrendingUp,
} from 'lucide-react';
import PlayerNavbar from '@/components/player/PlayerNavbar';

// TODO: Replace with usePage().props — { subscription, plans, auth }
const player = {
    name: 'Benjamin',
    currentPlan: 'free',
};

type PlanFeature = {
    label: string;
    included: boolean;
    highlight?: boolean;
};

type Plan = {
    id: 'free' | 'premium' | 'elite';
    name: string;
    tagline: string;
    price: number;
    period: string;
    badge?: string;
    badgeColor?: string;
    icon: React.ReactNode;
    highlighted?: boolean;
    features: PlanFeature[];
    cta: string;
};

const plans: Plan[] = [
    {
        id: 'free',
        name: 'Free',
        tagline: 'Get discovered. Build your basic profile.',
        price: 0,
        period: 'forever',
        icon: <Sparkles className="h-5 w-5" />,
        features: [
            { label: 'Basic player profile', included: true },
            { label: 'Upload up to 3 highlight clips', included: true },
            { label: 'Standard search visibility', included: true },
            { label: 'View public scout directory', included: true },
            { label: 'Advanced performance analytics', included: false },
            { label: 'Featured profile placement', included: false },
            { label: 'Direct scout messaging', included: false },
            { label: 'Unlimited highlight uploads', included: false },
            { label: 'Verified athlete badge', included: false },
        ],
        cta: 'Current Plan',
    },
    {
        id: 'premium',
        name: 'Premium',
        tagline: 'Stand out. Get seen by professional scouts.',
        price: 14.99,
        period: 'month',
        badge: 'MOST POPULAR',
        badgeColor: 'bg-[#FF6B00] text-white',
        icon: <Zap className="h-5 w-5" />,
        highlighted: true,
        features: [
            { label: 'Everything in Free', included: true },
            { label: 'Unlimited highlight uploads', included: true, highlight: true },
            { label: 'Advanced performance analytics', included: true, highlight: true },
            { label: 'Direct scout messaging (50/mo)', included: true, highlight: true },
            { label: 'Featured profile placement', included: true },
            { label: 'Verified athlete badge', included: true },
            { label: 'Profile view insights', included: true },
            { label: 'Priority search ranking', included: true },
            { label: 'Dedicated account manager', included: false },
        ],
        cta: 'Upgrade to Premium',
    },
    {
        id: 'elite',
        name: 'Elite',
        tagline: 'Maximum exposure. White-glove career management.',
        price: 39.99,
        period: 'month',
        badge: 'PRO ATHLETES',
        badgeColor: 'bg-[#0F172A] text-white',
        icon: <Crown className="h-5 w-5" />,
        features: [
            { label: 'Everything in Premium', included: true },
            { label: 'Unlimited scout messaging', included: true, highlight: true },
            { label: 'Top-of-search placement', included: true, highlight: true },
            { label: 'Dedicated account manager', included: true, highlight: true },
            { label: 'Pro-level video analysis', included: true },
            { label: 'Agent network introductions', included: true },
            { label: 'Multi-language profile (EN/ES/PT)', included: true },
            { label: 'Combine event invitations', included: true },
            { label: '24/7 priority support', included: true },
        ],
        cta: 'Upgrade to Elite',
    },
];

type ComparisonRow = {
    category: string;
    feature: string;
    icon: React.ReactNode;
    free: string | boolean;
    premium: string | boolean;
    elite: string | boolean;
};

const comparisonRows: ComparisonRow[] = [
    {
        category: 'Profile',
        feature: 'Highlight clip uploads',
        icon: <Video className="h-4 w-4" />,
        free: '3 clips',
        premium: 'Unlimited',
        elite: 'Unlimited + HD',
    },
    {
        category: 'Profile',
        feature: 'Verified athlete badge',
        icon: <Award className="h-4 w-4" />,
        free: false,
        premium: true,
        elite: true,
    },
    {
        category: 'Profile',
        feature: 'Featured placement',
        icon: <Star className="h-4 w-4" />,
        free: false,
        premium: 'Standard',
        elite: 'Top of search',
    },
    {
        category: 'Profile',
        feature: 'Multi-language profile',
        icon: <Globe className="h-4 w-4" />,
        free: false,
        premium: false,
        elite: 'EN / ES / PT',
    },
    {
        category: 'Analytics',
        feature: 'Performance analytics',
        icon: <BarChart3 className="h-4 w-4" />,
        free: 'Basic',
        premium: 'Advanced',
        elite: 'Pro-level',
    },
    {
        category: 'Analytics',
        feature: 'Profile view insights',
        icon: <Eye className="h-4 w-4" />,
        free: false,
        premium: true,
        elite: true,
    },
    {
        category: 'Analytics',
        feature: 'Video performance breakdown',
        icon: <TrendingUp className="h-4 w-4" />,
        free: false,
        premium: 'Monthly',
        elite: 'Weekly + AI',
    },
    {
        category: 'Network',
        feature: 'Direct scout messaging',
        icon: <MessageSquare className="h-4 w-4" />,
        free: false,
        premium: '50 / month',
        elite: 'Unlimited',
    },
    {
        category: 'Network',
        feature: 'Scout directory access',
        icon: <Users className="h-4 w-4" />,
        free: 'Public only',
        premium: 'Full directory',
        elite: 'Agent network',
    },
    {
        category: 'Network',
        feature: 'Combine event invitations',
        icon: <Award className="h-4 w-4" />,
        free: false,
        premium: false,
        elite: true,
    },
    {
        category: 'Support',
        feature: 'Customer support',
        icon: <Headphones className="h-4 w-4" />,
        free: 'Email only',
        premium: 'Email + Chat',
        elite: '24/7 Priority',
    },
    {
        category: 'Support',
        feature: 'Dedicated account manager',
        icon: <Shield className="h-4 w-4" />,
        free: false,
        premium: false,
        elite: true,
    },
];

const groupedRows = comparisonRows.reduce<Record<string, ComparisonRow[]>>(
    (acc, row) => {
        if (!acc[row.category]) acc[row.category] = [];
        acc[row.category].push(row);
        return acc;
    },
    {}
);

function renderCell(value: string | boolean) {
    if (value === true) {
        return (
            <div className="flex items-center justify-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B00]/10 dark:bg-[#FF6B00]/20">
                    <Check className="h-3.5 w-3.5 text-[#FF6B00]" strokeWidth={3} />
                </div>
            </div>
        );
    }
    if (value === false) {
        return (
            <div className="flex items-center justify-center">
                <X className="h-4 w-4 text-[#94A3B8] dark:text-[#555555]" />
            </div>
        );
    }
    return (
        <span className="block text-center font-mono text-xs font-medium text-[#0F172A] dark:text-[#F5F5F5]">
      {value}
    </span>
    );
}

export default function SubscriptionIndex() {
    const handleUpgrade = (planId: string) => {
        // TODO: router.get(route('subscription.checkout', { plan: planId }))
        console.log('Upgrade to', planId);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0D0D0D]">
            <PlayerNavbar />

            <main className="pt-16">
                {/* ====================== HERO HEADER ====================== */}
                <section className="bg-[#FF6B00] py-12 sm:py-16">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm">
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-white">
                Welcome back, {player.name}
              </span>
                        </div>
                        <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Your Subscription
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl font-sans text-base text-white/95 sm:text-lg lg:text-xl">
                            You're currently on the{' '}
                            <span className="font-bold underline decoration-white/40 underline-offset-4">
                Free plan
              </span>
                            . Upgrade to unlock your full potential.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-xs text-white/90 sm:text-sm">
                            <div className="flex items-center gap-1.5">
                                <Check className="h-4 w-4" strokeWidth={3} />
                                <span>Cancel anytime</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Check className="h-4 w-4" strokeWidth={3} />
                                <span>14-day money-back guarantee</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Check className="h-4 w-4" strokeWidth={3} />
                                <span>Secure checkout</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====================== PRICING CARDS ====================== */}
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-10 text-center sm:mb-12">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#FF6B00]">
                Choose your plan
              </span>
                            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-[#0F172A] dark:text-[#F5F5F5] sm:text-4xl">
                                Built for serious athletes
                            </h2>
                            <p className="mx-auto mt-3 max-w-2xl font-sans text-sm text-[#475569] dark:text-[#9A9A9A] sm:text-base">
                                Compare features and pick the plan that matches your ambition.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
                            {plans.map((plan) => {
                                const isCurrent = plan.id === player.currentPlan;
                                return (
                                    <div
                                        key={plan.id}
                                        className={`relative flex flex-col rounded-2xl border bg-white p-6 dark:bg-[#161616] sm:p-7 ${
                                            plan.highlighted
                                                ? 'border-[#FF6B00] shadow-xl ring-1 ring-[#FF6B00] md:scale-[1.02]'
                                                : 'border-[#E2E8F0] shadow-sm dark:border-[#2A2A2A]'
                                        }`}
                                    >
                                        {/* CURRENT PLAN badge */}
                                        {isCurrent && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#475569] px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white dark:bg-[#1F1F1F]">
                          <Check className="h-3 w-3" strokeWidth={3} />
                          Current Plan
                        </span>
                                            </div>
                                        )}

                                        {/* Most popular / Pro badge */}
                                        {plan.badge && !isCurrent && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span
                            className={`inline-block rounded-full px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest ${plan.badgeColor}`}
                        >
                          {plan.badge}
                        </span>
                                            </div>
                                        )}

                                        {/* Plan icon + name */}
                                        <div className="mb-4 flex items-center gap-2.5">
                                            <div
                                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                                    plan.highlighted
                                                        ? 'bg-[#FF6B00] text-white'
                                                        : 'bg-[#FFF3EB] text-[#FF6B00] dark:bg-[rgba(255,107,0,0.12)]'
                                                }`}
                                            >
                                                {plan.icon}
                                            </div>
                                            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#0F172A] dark:text-[#F5F5F5]">
                                                {plan.name}
                                            </h3>
                                        </div>

                                        <p className="mb-5 min-h-[40px] font-sans text-sm text-[#475569] dark:text-[#9A9A9A]">
                                            {plan.tagline}
                                        </p>

                                        {/* Price */}
                                        <div className="mb-6 border-b border-[#E2E8F0] pb-6 dark:border-[#2A2A2A]">
                                            <div className="flex items-baseline gap-1.5">
                        <span className="font-mono text-2xl font-medium text-[#94A3B8] dark:text-[#555555]">
                          $
                        </span>
                                                <span className="font-display text-5xl font-bold text-[#0F172A] dark:text-[#F5F5F5]">
                          {plan.price}
                        </span>
                                                <span className="font-sans text-sm text-[#475569] dark:text-[#9A9A9A]">
                          / {plan.period}
                        </span>
                                            </div>
                                            {plan.price > 0 && (
                                                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555]">
                                                    Billed monthly · Cancel anytime
                                                </p>
                                            )}
                                        </div>

                                        {/* Features list */}
                                        <ul className="mb-7 flex-1 space-y-3">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5">
                                                    {feature.included ? (
                                                        <div
                                                            className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                                                                feature.highlight
                                                                    ? 'bg-[#FF6B00]'
                                                                    : 'bg-[#16A34A]/10 dark:bg-[#16A34A]/20'
                                                            }`}
                                                        >
                                                            <Check
                                                                className={`h-2.5 w-2.5 ${
                                                                    feature.highlight ? 'text-white' : 'text-[#16A34A]'
                                                                }`}
                                                                strokeWidth={3.5}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="group relative mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#F8FAFC] dark:bg-[#1F1F1F]"
                                                            title="Available in Premium"
                                                        >
                                                            <Lock className="h-2.5 w-2.5 text-[#94A3B8] dark:text-[#555555]" />
                                                            <span
                                                                role="tooltip"
                                                                className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0F172A] px-2 py-1 font-sans text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-[#1F1F1F]"
                                                            >
                                Available in Premium
                              </span>
                                                        </div>
                                                    )}
                                                    <span
                                                        className={`font-sans text-sm leading-tight ${
                                                            feature.included
                                                                ? feature.highlight
                                                                    ? 'font-semibold text-[#0F172A] dark:text-[#F5F5F5]'
                                                                    : 'text-[#0F172A] dark:text-[#F5F5F5]'
                                                                : 'text-[#94A3B8] line-through dark:text-[#555555]'
                                                        }`}
                                                    >
                            {feature.label}
                          </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA */}
                                        {isCurrent ? (
                                            <button
                                                disabled
                                                className="w-full cursor-not-allowed rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-3 font-sans text-sm font-semibold text-[#94A3B8] dark:border-[#2A2A2A] dark:bg-[#1F1F1F] dark:text-[#555555]"
                                            >
                                                Current Plan
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleUpgrade(plan.id)}
                                                className={`w-full rounded-lg px-5 py-3 font-sans text-sm font-semibold transition-colors ${
                                                    plan.highlighted
                                                        ? 'bg-[#FF6B00] text-white hover:bg-[#CC5500]'
                                                        : 'border border-[#0F172A] bg-white text-[#0F172A] hover:bg-[#0F172A] hover:text-white dark:border-[#F5F5F5] dark:bg-transparent dark:text-[#F5F5F5] dark:hover:bg-[#F5F5F5] dark:hover:text-[#0F172A]'
                                                }`}
                                            >
                                                {plan.cta}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ====================== COMPARISON TABLE ====================== */}
                <section className="border-t border-[#E2E8F0] bg-white py-12 dark:border-[#2A2A2A] dark:bg-[#111111] sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-10 text-center sm:mb-12">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#FF6B00]">
                Full feature breakdown
              </span>
                            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-[#0F172A] dark:text-[#F5F5F5] sm:text-4xl">
                                Compare all features
                            </h2>
                            <p className="mx-auto mt-3 max-w-2xl font-sans text-sm text-[#475569] dark:text-[#9A9A9A] sm:text-base">
                                Every detail of what each plan includes — no fine print.
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white dark:border-[#2A2A2A] dark:bg-[#161616]">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[640px] border-collapse">
                                    {/* Sticky header */}
                                    <thead className="bg-[#F8FAFC] dark:bg-[#1F1F1F]">
                                    <tr>
                                        <th className="w-[40%] px-6 py-5 text-left font-mono text-[11px] font-semibold uppercase tracking-widest text-[#475569] dark:text-[#9A9A9A]">
                                            Feature
                                        </th>
                                        <th className="px-4 py-5 text-center">
                                            <div className="font-display text-base font-bold uppercase tracking-tight text-[#0F172A] dark:text-[#F5F5F5]">
                                                Free
                                            </div>
                                            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555]">
                                                $0
                                            </div>
                                        </th>
                                        <th className="bg-[#FFF3EB] px-4 py-5 text-center dark:bg-[rgba(255,107,0,0.08)]">
                                            <div className="font-display text-base font-bold uppercase tracking-tight text-[#FF6B00]">
                                                Premium
                                            </div>
                                            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-[#CC5500] dark:text-[#FF6B00]">
                                                $14.99 / mo
                                            </div>
                                        </th>
                                        <th className="px-4 py-5 text-center">
                                            <div className="font-display text-base font-bold uppercase tracking-tight text-[#0F172A] dark:text-[#F5F5F5]">
                                                Elite
                                            </div>
                                            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555]">
                                                $39.99 / mo
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {Object.entries(groupedRows).map(([category, rows]) => (
                                        <React.Fragment key={category}>
                                            {/* Category header */}
                                            <tr className="bg-[#F8FAFC]/50 dark:bg-[#1F1F1F]/50">
                                                <td
                                                    colSpan={4}
                                                    className="px-6 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#FF6B00]"
                                                >
                                                    {category}
                                                </td>
                                            </tr>
                                            {rows.map((row, idx) => (
                                                <tr
                                                    key={`${category}-${idx}`}
                                                    className="border-t border-[#E2E8F0] dark:border-[#2A2A2A]"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2.5">
                                <span className="text-[#94A3B8] dark:text-[#555555]">
                                  {row.icon}
                                </span>
                                                            <span className="font-sans text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                                  {row.feature}
                                </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">{renderCell(row.free)}</td>
                                                    <td className="bg-[#FFF3EB]/40 px-4 py-4 dark:bg-[rgba(255,107,0,0.04)]">
                                                        {renderCell(row.premium)}
                                                    </td>
                                                    <td className="px-4 py-4">{renderCell(row.elite)}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}

                                    {/* Final row — upgrade CTAs */}
                                    <tr className="border-t-2 border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#2A2A2A] dark:bg-[#1F1F1F]">
                                        <td className="px-6 py-5"></td>
                                        <td className="px-4 py-5 text-center">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555]">
                          Current
                        </span>
                                        </td>
                                        <td className="bg-[#FFF3EB] px-4 py-5 text-center dark:bg-[rgba(255,107,0,0.08)]">
                                            <button
                                                onClick={() => handleUpgrade('premium')}
                                                className="w-full rounded-lg bg-[#FF6B00] px-3 py-2.5 font-sans text-xs font-semibold text-white hover:bg-[#CC5500]"
                                            >
                                                Upgrade
                                            </button>
                                        </td>
                                        <td className="px-4 py-5 text-center">
                                            <button
                                                onClick={() => handleUpgrade('elite')}
                                                className="w-full rounded-lg border border-[#0F172A] bg-white px-3 py-2.5 font-sans text-xs font-semibold text-[#0F172A] hover:bg-[#0F172A] hover:text-white dark:border-[#F5F5F5] dark:bg-transparent dark:text-[#F5F5F5] dark:hover:bg-[#F5F5F5] dark:hover:text-[#0F172A]"
                                            >
                                                Upgrade
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====================== TRUST / SECURITY SECTION ====================== */}
                <section className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-12 dark:border-[#2A2A2A] dark:bg-[#0D0D0D] sm:py-16">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616] sm:p-10">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
                                {/* Trust badge: Secure payment */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                        <Shield className="h-5 w-5 text-[#FF6B00]" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#0F172A] dark:text-[#F5F5F5]">
                                            Bank-level security
                                        </h3>
                                        <p className="mt-1.5 font-sans text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                                            256-bit SSL encryption. PCI-DSS Level 1 compliant. Your payment details are never stored on our servers.
                                        </p>
                                    </div>
                                </div>

                                {/* Trust badge: Cancel anytime */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                        <CreditCard className="h-5 w-5 text-[#FF6B00]" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#0F172A] dark:text-[#F5F5F5]">
                                            Cancel anytime
                                        </h3>
                                        <p className="mt-1.5 font-sans text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                                            No contracts, no commitments. Cancel from your dashboard in one click — keep access until your billing period ends.
                                        </p>
                                    </div>
                                </div>

                                {/* Trust badge: Money-back guarantee */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                        <Award className="h-5 w-5 text-[#FF6B00]" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#0F172A] dark:text-[#F5F5F5]">
                                            14-day guarantee
                                        </h3>
                                        <p className="mt-1.5 font-sans text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                                            Not happy? Get a full refund within 14 days of upgrading. No questions asked, no hassle.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment provider logos */}
                            <div className="mt-10 border-t border-[#E2E8F0] pt-8 dark:border-[#2A2A2A]">
                                <p className="text-center font-mono text-[11px] font-medium uppercase tracking-widest text-[#94A3B8] dark:text-[#555555]">
                                    Secure payments powered by
                                </p>
                                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
                                    {/* Stripe */}
                                    <div className="flex items-center gap-2 rounded-md border border-[#E2E8F0] bg-white px-4 py-2.5 dark:border-[#2A2A2A] dark:bg-[#1F1F1F]">
                    <span className="font-display text-lg font-bold italic tracking-tight text-[#635BFF]">
                      stripe
                    </span>
                                    </div>

                                    {/* PayPal */}
                                    <div className="flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-white px-4 py-2.5 dark:border-[#2A2A2A] dark:bg-[#1F1F1F]">
                    <span className="font-display text-lg font-bold italic tracking-tight text-[#003087]">
                      Pay
                    </span>
                                        <span className="font-display text-lg font-bold italic tracking-tight text-[#0070BA]">
                      Pal
                    </span>
                                    </div>

                                    {/* Visa */}
                                    <div className="flex items-center justify-center rounded-md border border-[#E2E8F0] bg-white px-4 py-2.5 dark:border-[#2A2A2A] dark:bg-[#1F1F1F]">
                    <span className="font-display text-base font-bold italic tracking-wider text-[#1A1F71]">
                      VISA
                    </span>
                                    </div>

                                    {/* Mastercard */}
                                    <div className="flex items-center gap-0 rounded-md border border-[#E2E8F0] bg-white px-3 py-2.5 dark:border-[#2A2A2A] dark:bg-[#1F1F1F]">
                                        <div className="h-5 w-5 rounded-full bg-[#EB001B]" />
                                        <div className="-ml-2 h-5 w-5 rounded-full bg-[#F79E1B] opacity-90" />
                                        <span className="ml-2 font-sans text-[10px] font-bold uppercase tracking-wider text-[#0F172A]">
                      Mastercard
                    </span>
                                    </div>

                                    {/* Amex */}
                                    <div className="flex items-center justify-center rounded-md bg-[#006FCF] px-4 py-2.5">
                    <span className="font-display text-xs font-bold uppercase tracking-widest text-white">
                      Amex
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* Final reassurance */}
                            <p className="mt-8 text-center font-sans text-xs text-[#94A3B8] dark:text-[#555555]">
                                Questions about billing?{' '}
                                <Link
                                    href="/support"
                                    className="font-semibold text-[#FF6B00] hover:text-[#CC5500] hover:underline"
                                >
                                    Contact our support team
                                </Link>{' '}
                                — we typically respond within 2 hours.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
