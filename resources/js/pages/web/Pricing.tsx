import PublicNavbar from '@/components/public/PublicNavbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Check, CheckCircle2, Lock, RefreshCcw, ShieldCheck, XCircle } from 'lucide-react';
import { useState } from 'react';

// TODO: Replace with usePage().props
const plans = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        annualPrice: 0,
        badge: null,
        tagline: 'For aspiring players getting started.',
        features: [
            'Public player football identity page',
            'Upload up to 3 highlight videos',
            'Basic performance stats',
            'Browse scout directory',
            'Receive scout messages (limited)',
            'Standard search visibility',
            'Mobile app access',
        ],
        locked: [
            'AI-powered highlight reels',
            'Verified player badge',
            'Priority in scout searches',
            'Advanced analytics dashboard',
            'Direct agent introductions',
        ],
        cta: 'Get Started Free',
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 9.9,
        annualPrice: 7.92,
        badge: 'Most Popular',
        tagline: 'For serious players ready to be discovered.',
        features: [
            'Everything in Free',
            'Unlimited highlight uploads',
            'AI-generated highlight reels',
            'Verified player badge',
            'Priority placement in scout searches',
            'Advanced performance analytics',
            'Direct messaging with scouts',
        ],
        locked: [],
        cta: 'Upgrade Now →',
    },
    {
        id: 'agent',
        name: 'Agent',
        price: 24.9,
        annualPrice: 19.92,
        badge: null,
        tagline: 'For scouts, agents, and clubs scouting talent.',
        features: [
            'Everything in Premium',
            'Multi-player roster management',
            'Advanced filters & scouting reports',
            'Export player data (CSV / PDF)',
            'Bulk messaging tools',
            'Watchlist & shortlists (unlimited)',
            'Priority support & dedicated CSM',
        ],
        locked: [],
        cta: 'Contact Sales',
    },
];

// TODO: Replace with usePage().props
const comparisonRows = [
    { feature: 'Public player football identity', free: true, premium: true, agent: true },
    { feature: 'Highlight video uploads', free: '3 max', premium: 'Unlimited', agent: 'Unlimited' },
    { feature: 'AI highlight reels', free: false, premium: true, agent: true },
    { feature: 'Verified player badge', free: false, premium: true, agent: true },
    { feature: 'Search priority', free: 'Standard', premium: 'High', agent: 'Highest' },
    { feature: 'Advanced analytics', free: false, premium: true, agent: true },
    { feature: 'Direct scout messaging', free: 'Limited', premium: 'Unlimited', agent: 'Unlimited' },
    { feature: 'Multi-player rosters', free: false, premium: false, agent: true },
    { feature: 'Data export (CSV/PDF)', free: false, premium: false, agent: true },
    { feature: 'Bulk messaging tools', free: false, premium: false, agent: true },
    { feature: 'Unlimited watchlists', free: false, premium: false, agent: true },
    { feature: 'Priority support', free: false, premium: false, agent: true },
];

// TODO: Replace with usePage().props
const faqs = [
    {
        q: 'Can I cancel my subscription at any time?',
        a: 'Yes. You can cancel your subscription from your account settings at any time. You will retain access to premium features until the end of your current billing period.',
    },
    {
        q: 'What is the difference between Premium and Agent plans?',
        a: 'Premium is built for individual players to maximize their visibility to scouts. Agent is designed for scouts, agents, and clubs who need to manage multiple players, run advanced searches, and export scouting reports.',
    },
    {
        q: 'Do you offer discounts for clubs or academies?',
        a: 'Yes. We offer custom enterprise pricing for football academies, professional clubs, and federations. Contact our sales team to discuss volume licensing and team rates.',
    },
    {
        q: 'How does the annual billing discount work?',
        a: 'Choosing annual billing saves you 20% compared to paying monthly. You are billed once per year and receive uninterrupted access to all features included in your plan.',
    },
    {
        q: 'Is my payment information secure?',
        a: 'Absolutely. All payments are processed by Stripe, an industry-leading payment processor that is PCI-DSS Level 1 certified. We never store your card details on our servers.',
    },
];

export default function Pricing() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

    return (
        <div className="min-h-screen bg-white dark:bg-[#0D0D0D]">
            <PublicNavbar />

            <main className="pt-16">
                {/* HEADER — orange band */}
                <section className="bg-[#E53F01] px-6 py-20 text-center">
                    <div className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">Pricing</div>
                    <h1 className="font-display mt-3 text-4xl leading-tight font-black text-white sm:text-5xl">Simple, Transparent Pricing</h1>
                    <p className="mx-auto mt-3 max-w-xl text-base text-white/80 sm:text-lg">
                        Choose the plan that fits your ambitions. Cancel anytime, no hidden fees.
                    </p>

                    {/* Billing toggle */}
                    <div className="mt-6 inline-flex items-center rounded-full border border-white/25 bg-white/15 p-1">
                        <button
                            type="button"
                            onClick={() => setBilling('monthly')}
                            className={`rounded-full px-5 py-2 text-sm transition-colors ${
                                billing === 'monthly' ? 'bg-white font-semibold text-[#E53F01]' : 'font-medium text-white'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            type="button"
                            onClick={() => setBilling('annual')}
                            className={`flex items-center rounded-full px-5 py-2 text-sm transition-colors ${
                                billing === 'annual' ? 'bg-white font-semibold text-[#E53F01]' : 'font-medium text-white'
                            }`}
                        >
                            Annual
                            <span className="ml-2 rounded-full bg-green-400 px-2 py-0.5 text-xs font-bold text-green-900">Save 20%</span>
                        </button>
                    </div>
                </section>

                {/* PLANS */}
                <section className="bg-[#F8FAFC] px-6 py-16 dark:bg-[#0D0D0D]">
                    <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-6 lg:grid-cols-3">
                        {plans.map((plan) => {
                            const isPremium = plan.id === 'premium';
                            const displayPrice = billing === 'annual' ? plan.annualPrice : plan.price;

                            return (
                                <div
                                    key={plan.id}
                                    className={
                                        isPremium
                                            ? 'relative rounded-2xl border-2 border-[#E53F01] bg-white p-8 shadow-[0_8px_40px_rgba(255,107,0,0.2)] lg:scale-[1.02] dark:bg-[#161616]'
                                            : 'rounded-2xl border border-[#E2E8F0] bg-white p-8 dark:border-[#2A2A2A] dark:bg-[#161616]'
                                    }
                                >
                                    {plan.badge && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#E53F01] px-5 py-1.5 text-xs font-black tracking-wide text-white uppercase">
                                            {plan.badge}
                                        </div>
                                    )}

                                    {/* Plan name */}
                                    <div className="text-lg font-bold text-[#0F172A] dark:text-[#F5F5F5]">{plan.name}</div>

                                    {/* Price */}
                                    <div className="mt-3 flex items-baseline">
                                        <span
                                            className={`font-display text-5xl font-black ${
                                                isPremium ? 'text-[#E53F01]' : 'text-[#0F172A] dark:text-[#F5F5F5]'
                                            }`}
                                        >
                                            €{displayPrice.toFixed(displayPrice % 1 === 0 ? 0 : 2)}
                                        </span>
                                        <span className="ml-2 text-sm text-[#94A3B8]">/month</span>
                                    </div>

                                    {/* Tagline */}
                                    <p className="mt-2 text-sm text-[#475569] dark:text-[#9A9A9A]">{plan.tagline}</p>

                                    {/* Divider */}
                                    <div className="my-6 border-t border-[#E2E8F0] dark:border-[#2A2A2A]" />

                                    {/* Features */}
                                    <ul className="space-y-3">
                                        {plan.features.map((feat) => (
                                            <li key={feat} className="flex items-start gap-3 text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                                                <CheckCircle2
                                                    className={`mt-0.5 h-4 w-4 shrink-0 ${isPremium ? 'text-[#E53F01]' : 'text-green-500'}`}
                                                />
                                                <span>{feat}</span>
                                            </li>
                                        ))}

                                        {plan.locked.map((feat) => (
                                            <li key={feat} className="flex items-start gap-3 text-sm text-[#94A3B8] dark:text-[#555555]">
                                                <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                                                <span className="line-through decoration-[#94A3B8]/30">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <div className="mt-8">
                                        {isPremium ? (
                                            <Link
                                                href="/register?plan=premium"
                                                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#E53F01] font-bold text-white transition-colors hover:bg-[#E53F01]"
                                            >
                                                {plan.cta}
                                            </Link>
                                        ) : (
                                            <Link
                                                href={plan.id === 'agent' ? '/contact?plan=agent' : '/register'}
                                                className="flex h-12 w-full items-center justify-center rounded-xl border border-[#E2E8F0] bg-white font-semibold text-[#0F172A] transition-colors hover:border-[#E53F01] hover:text-[#E53F01] dark:border-[#2A2A2A] dark:bg-[#161616] dark:text-[#F5F5F5]"
                                            >
                                                {plan.cta}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* COMPARISON TABLE */}
                    <div className="mx-auto mt-12 max-w-[1100px] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white dark:border-[#2A2A2A] dark:bg-[#161616]">
                        <div className="border-b border-[#E2E8F0] p-6 sm:p-8 dark:border-[#2A2A2A]">
                            <h2 className="font-display text-2xl font-black text-[#0F172A] sm:text-3xl dark:text-[#F5F5F5]">Compare All Features</h2>
                            <p className="mt-1 text-sm text-[#475569] dark:text-[#9A9A9A]">Everything you get with each plan, side by side.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F8FAFC] dark:border-[#2A2A2A] dark:bg-[#1F1F1F] dark:hover:bg-[#1F1F1F]">
                                        <TableHead className="py-4 text-sm font-bold text-[#0F172A] dark:text-[#F5F5F5]">Feature</TableHead>
                                        <TableHead className="py-4 text-center text-sm font-bold text-[#0F172A] dark:text-[#F5F5F5]">Free</TableHead>
                                        <TableHead className="py-4 text-center text-sm font-black text-[#E53F01]">Premium</TableHead>
                                        <TableHead className="py-4 text-center text-sm font-bold text-[#0F172A] dark:text-[#F5F5F5]">Agent</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {comparisonRows.map((row, i) => (
                                        <TableRow
                                            key={i}
                                            className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] dark:border-[#2A2A2A] dark:hover:bg-[#1F1F1F]"
                                        >
                                            <TableCell className="py-4 text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
                                                {row.feature}
                                            </TableCell>
                                            <TableCell className="text-center text-sm">{renderCell(row.free)}</TableCell>
                                            <TableCell className="bg-[#FFF3EB]/30 text-center text-sm dark:bg-[rgba(255,107,0,0.04)]">
                                                {renderCell(row.premium, true)}
                                            </TableCell>
                                            <TableCell className="text-center text-sm">{renderCell(row.agent)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </section>

                {/* TRUST SECTION */}
                <section className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-12 text-center dark:border-[#2A2A2A] dark:bg-[#0D0D0D]">
                    <h3 className="font-display text-xl font-bold text-[#0F172A] sm:text-2xl dark:text-[#F5F5F5]">
                        Trusted by scouts and players across 67 countries
                    </h3>

                    {/* Payment icons */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        {['Stripe', 'PayPal', 'Visa', 'Mastercard'].map((p) => (
                            <div
                                key={p}
                                className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 font-mono text-xs font-bold tracking-wider text-[#475569] dark:border-[#2A2A2A] dark:bg-[#161616] dark:text-[#9A9A9A]"
                            >
                                {p.toUpperCase()}
                            </div>
                        ))}
                    </div>

                    {/* Trust badges */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                            <RefreshCcw className="h-4 w-4 text-[#E53F01]" />
                            <span className="font-semibold">Cancel Anytime</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                            <ShieldCheck className="h-4 w-4 text-[#E53F01]" />
                            <span className="font-semibold">Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                            <CheckCircle2 className="h-4 w-4 text-[#E53F01]" />
                            <span className="font-semibold">30-Day Guarantee</span>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="bg-white px-6 py-16 dark:bg-[#111111]">
                    <div className="mx-auto max-w-[800px]">
                        <div className="mb-10 text-center">
                            <div className="text-xs font-bold tracking-[0.2em] text-[#E53F01] uppercase">FAQ</div>
                            <h2 className="font-display mt-2 text-3xl font-black text-[#0F172A] sm:text-4xl dark:text-[#F5F5F5]">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-3">
                            {faqs.map((f, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i}`}
                                    className="rounded-xl border border-[#E2E8F0] bg-white px-6 data-[state=open]:border-[#E53F01]/40 dark:border-[#2A2A2A] dark:bg-[#161616]"
                                >
                                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-[#0F172A] hover:no-underline dark:text-[#F5F5F5]">
                                        {f.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5 text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                                        {f.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-[#0F172A] px-6 py-12">
                    <div className="mx-auto max-w-[1200px]">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            <div className="col-span-2 md:col-span-1">
                                <img src="/images/logo/hilights_logo_dark_200.png" className="h-10 w-auto" alt="HiLights Football" />
                                <p className="mt-4 text-sm text-white/60">The platform where football talent meets opportunity.</p>
                            </div>

                            <div>
                                <div className="mb-3 text-sm font-bold text-white">Platform</div>
                                <ul className="space-y-2 text-sm text-white/60">
                                    <li>
                                        <Link href="/players" className="hover:text-white">
                                            Players
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/scouts" className="hover:text-white">
                                            Scouts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pricing" className="hover:text-white">
                                            Pricing
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <div className="mb-3 text-sm font-bold text-white">Company</div>
                                <ul className="space-y-2 text-sm text-white/60">
                                    <li>
                                        <Link href="/about" className="hover:text-white">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="hover:text-white">
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/careers" className="hover:text-white">
                                            Careers
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <div className="mb-3 text-sm font-bold text-white">Legal</div>
                                <ul className="space-y-2 text-sm text-white/60">
                                    <li>
                                        <Link href="/terms" className="hover:text-white">
                                            Terms
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy" className="hover:text-white">
                                            Privacy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/cookies" className="hover:text-white">
                                            Cookies
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
                            <div className="text-xs text-white/40">© 2026 HiLights Football. All rights reserved.</div>
                            <div className="font-mono text-xs text-white/40">v2.4.1</div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}

function renderCell(value: boolean | string, highlight = false) {
    if (typeof value === 'boolean') {
        return value ? (
            <Check className={`mx-auto h-5 w-5 ${highlight ? 'text-[#E53F01]' : 'text-green-500'}`} />
        ) : (
            <XCircle className="mx-auto h-5 w-5 text-[#94A3B8] dark:text-[#555555]" />
        );
    }
    return <span className={`font-mono text-xs font-semibold ${highlight ? 'text-[#E53F01]' : 'text-[#0F172A] dark:text-[#F5F5F5]'}`}>{value}</span>;
}
