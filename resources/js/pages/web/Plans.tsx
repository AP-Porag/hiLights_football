import { PublicFooter } from '@/components/public/PublicFooter';
import PublicNavbar from '@/components/public/PublicNavbar';
import { Link, router, usePage } from '@inertiajs/react';
import { Binoculars, CalendarDays, CheckCircle, Flag, Globe, MapPin, Shield, ShieldCheck, Smartphone, User, Users } from 'lucide-react';
import { useState } from 'react';

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

const freePlan = ['Public Football Identity', 'Upload 1 Video', 'Club History', 'Competitions History', 'Achievements'];

const premiumPlan = [
    'Public Football Identity',
    'Upload 3 Videos',
    'Club History',
    'Competitions History',
    'Achievements',
    'HiLights Member Card with exclusive QR code',
    'Badge of Verified Football Identity',
    'Priority in Searches',
    'Consultancy for Football Identity and video improvements',
];

const items = [
    {
        icon: Binoculars,
        title: 'More Visibility',
        description: 'Get noticed by scouts and clubs worldwide.',
    },
    {
        icon: Users,
        title: 'Build Your Story',
        description: 'Show your achievements and evolution as an athlete.',
    },
    // {
    //     icon: BarChart3,
    //     title: 'ADVANCED STATS',
    //     description: 'Track your performance and stand out.',
    // },
    {
        icon: Globe,
        title: 'Connect',
        description: 'Connect with the biggest football network.',
    },
    {
        icon: ShieldCheck,
        title: 'Be Verified',
        description: 'Build credibility and boost your career.',
    },
];

export default function Plans() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
    // const { plan, on_grace_period, is_active } = usePage().props;
    // const isSubscribed = is_active || on_grace_period;
    const { current_plan } = usePage<{
        current_plan: string | null;
    }>().props;

    const disablePlanOne = current_plan === 'price_1TsfD5HKtXG9R7bGyzR4H6C9' || current_plan === 'price_1TsfDtHKtXG9R7bGVsNxRTT6';

    const disablePlanTwo = current_plan === 'price_1TsfDtHKtXG9R7bGVsNxRTT6';

    const handleCheckout = async (planName: string) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        const response = await fetch(
            route('subscription.checkout', {
                name: planName,
            }),
            {
                method: 'POST',
                credentials: 'same-origin', // <-- এটা যোগ করুন
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken ?? '',
                },
            },
        );

        const data = await response.json();

        if (data.url) {
            window.location.href = data.url;
        }
    };

    return (
        <div className="min-h-screen bg-black dark:bg-[#0D0D0D]">
            <PublicNavbar />
            <main className="pt-16 xl:pt-20 2xl:pt-24">
                {/* HEADER */}
                <section
                    className="bg-black px-6 pt-10 pb-8 text-white"
                    style={{
                        backgroundImage: "url('/images/img/plan_hero.jpeg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[38%_1fr] lg:px-16">
                        {/* Left Side */}
                        <div>
                            <h1 className="text-[2.625rem] font-extrabold tracking-wide italic sm:text-[3.4375rem] md:text-[4.0625rem] lg:text-[5rem]">
                                PLANS
                            </h1>
                            <h2 className="-mt-2 text-[0.875rem] font-bold text-[#E53F01] uppercase italic sm:text-[1.125rem] md:-mt-3 md:text-[1.375rem] lg:text-[1.5rem]">
                                Choose the plan that drives
                            </h2>
                            <h3 className="text-[1rem] font-bold text-white uppercase sm:text-[1.25rem] md:text-[1.25rem] lg:text-[1.375rem]">
                                Your football career.
                            </h3>
                            <div className="mt-6 text-[0.75rem] text-[#feffff] sm:text-[0.875rem] md:text-[1rem] lg:text-[1.125rem]">
                                <p>
                                    More visibility. More connections. <br />
                                    More opportunities.
                                </p>
                            </div>
                        </div>

                        {/* ═══════════ MEMBER CARD (fixed, responsive, no stretch) ═══════════ */}
                        <div className="relative mx-auto w-full max-w-[45rem] overflow-hidden rounded-2xl border border-gray-700 bg-black text-white">
                            {/* Orange side band */}
                            <div className="absolute top-0 right-0 h-full w-[2.875rem] overflow-hidden sm:w-[3.375rem] lg:w-[4rem]">
                                <svg viewBox="0 0 90 520" preserveAspectRatio="none" className="block h-full w-full">
                                    <path d="M0 520 L0 85 C0 45 20 15 50 0 L72 0 C82 0 90 8 90 18 L90 485 C90 505 75 520 55 520 Z" fill="#e53f01" />
                                </svg>
                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 pb-2 text-[1rem] font-bold tracking-[0.375rem] whitespace-nowrap text-white sm:text-[1.125rem] sm:tracking-[0.5rem] lg:pb-4">
                                    2024
                                </p>
                                <p className="absolute top-1/2 left-[72%] -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[0.5rem] tracking-wider whitespace-nowrap text-white uppercase sm:text-[0.625rem]">
                                    HIGHLIGHTS FOOTBALL MEMBER
                                </p>
                            </div>

                            {/* Inner content — right padding clears the band */}
                            <div className="p-3 pr-[3.375rem] sm:p-5 sm:pr-[4rem] lg:pr-[4.75rem]">
                                {/* TOP ROW: logo + title */}
                                <div className="flex flex-col items-center gap-1 min-[360px]:flex-row min-[360px]:items-start min-[360px]:justify-between min-[360px]:gap-3">
                                    <img
                                        src="/images/logo/final_logo.png"
                                        alt="HiLights Football"
                                        className="mt-3 w-[6.875rem] shrink-0 sm:w-[11.25rem] lg:w-[12.5rem]"
                                    />

                                    <div className="min-w-0 pt-1 text-center">
                                        <h2 className="text-[0.6875rem] font-bold uppercase sm:text-[0.8125rem] lg:text-[0.9375rem]">MEMBER CARD</h2>
                                        <p className="text-[0.5rem] font-semibold text-[#e24b12] uppercase sm:text-[0.5625rem] lg:text-[0.625rem]">
                                            Official Member
                                        </p>
                                        <svg
                                            width="150"
                                            height="20"
                                            viewBox="0 0 180 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mx-auto mt-1 w-[6.875rem] sm:w-[8.75rem]"
                                        >
                                            <line x1="10" y1="12" x2="70" y2="12" stroke="#6B7280" strokeWidth="1" />
                                            <path
                                                d="M90 4L92.35 9.15L98 9.8L94 13.6L95.2 19L90 16L84.8 19L86 13.6L82 9.8L87.65 9.15L90 4Z"
                                                fill="#e24b12"
                                            />
                                            <line x1="110" y1="12" x2="170" y2="12" stroke="#6B7280" strokeWidth="1" />
                                        </svg>
                                    </div>
                                </div>

                                {/* BODY: photo | details | qr */}
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4 md:flex-col md:gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
                                    {/* Photo */}
                                    <div className="mt-4 h-[11.875rem] w-full shrink-0 sm:mt-1 sm:h-[11.875rem] sm:w-[9.375rem] md:mt-4 md:h-[11.875rem]] md:w-full lg:mt-1 lg:h-[13.125rem] lg:w-[10.625rem]">
                                        <img
                                            src="/images/img/p-6.png"
                                            alt="player"
                                            className="h-full w-full rounded-[0.75rem] border border-gray-400 object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="md:pl-0-10 min-w-0 flex-1 sm:pl-2 lg:pl-2">
                                        <h3 className="text-[0.9375rem] font-bold uppercase lg:text-[1.0625rem]">JOÃO DA SILVA</h3>
                                        <p className="text-[0.5625rem] text-[#e24b12] uppercase lg:text-[0.625rem]">ATTACKING MIDFIELDER</p>
                                        <div className="mt-1 h-px w-28 bg-[#e24b12]" />

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-start">
                                                <User className="mt-[0.125rem] mr-[0.625rem] size-[1rem] shrink-0 text-[#e24b12]" />
                                                <p className="text-[0.625rem] text-[#e2e2e2] uppercase">
                                                    ID:
                                                    <br />
                                                    <span className="text-white">HLF-00012345</span>
                                                </p>
                                            </div>
                                            <div className="flex items-start">
                                                <CalendarDays className="mt-[0.125rem] mr-[0.625rem] size-[1rem] shrink-0 text-[#e24b12]" />
                                                <p className="text-[0.625rem] text-[#e2e2e2] uppercase">
                                                    DATE OF BIRTH:
                                                    <br />
                                                    <span className="text-white">15 / 05 / 2006</span>
                                                </p>
                                            </div>
                                            <div className="flex items-start">
                                                <Flag className="mt-[0.125rem] mr-[0.625rem] size-[1rem] shrink-0 text-[#e24b12]" />
                                                <p className="text-[0.625rem] text-[#e2e2e2] uppercase">
                                                    NATIONALITY:
                                                    <br />
                                                    <span className="text-white">Brazil</span>
                                                </p>
                                            </div>
                                            <div className="flex items-start">
                                                <MapPin className="mt-[0.125rem] mr-[0.625rem] size-[1rem] shrink-0 text-[#e24b12]" />
                                                <p className="text-[0.625rem] text-[#e2e2e2] uppercase">
                                                    CITY:
                                                    <br />
                                                    <span className="text-white">RIO DE JANEIRO - RJ</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* QR */}
                                    <div className="flex shrink-0 flex-col items-center sm:items-start sm:pt-6 md:mx-auto md:items-center lg:items-start">
                                        <h4 className="pb-2 text-[0.5rem] font-bold text-[#e24b12] uppercase lg:text-[0.625rem]">
                                            Scan To View Football Identity
                                        </h4>
                                        <div className="rounded-[0.75rem] border-[3px] border-[#e24b12] bg-white p-2">
                                            <img
                                                src="/images/img/qr.png"
                                                alt="QR"
                                                className="h-[4.375rem] w-[4.375rem] rounded-md object-cover lg:h-[5.625rem] lg:w-[5.625rem]"
                                            />
                                        </div>
                                        <div className="mt-2 flex items-center">
                                            <Smartphone className="mr-1 size-[1.25rem] shrink-0 text-[#e24b12]" />
                                            <span className="text-left text-[0.5rem] leading-tight text-[#e24b12] uppercase">
                                                VIEW FULL FOOTBALL IDENTITY,
                                                <br />
                                                VIDEOS, STATS AND
                                                <br />
                                                ACHIEVEMENTS
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* BOTTOM: shield text */}
                                <div className="mt-5 flex items-center gap-2">
                                    <Shield className="h-6 w-6 shrink-0 text-white" />
                                    <p className="text-[0.625rem] leading-relaxed text-white uppercase lg:text-[0.75rem]">
                                        This card identifies the holder as an official
                                        <br className="hidden sm:block lg:block" /> member of HiLights Football platform.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* ═══════════ /MEMBER CARD ═══════════ */}
                    </div>
                </section>

                {/* PLANS */}
                <section className="bg-black px-4 py-12">
                    <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Free Profile */}
                        <div className="rounded-[1.25rem] border border-gray-700 bg-black p-6 md:relative">
                            <div className="mb-6 flex -translate-y-[85%] justify-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-600 bg-black">
                                    <User className="size-[2rem] text-white" />
                                </div>
                            </div>
                            <h3 className="mb-6 text-center text-2xl font-bold text-white uppercase italic">Free Football Identity</h3>
                            <div className="mb-8 space-y-3">
                                {freePlan.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle className="size-[1.125rem] text-green-500" />
                                        <span className="text-[#ececec]">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/register"
                                className="block w-full rounded-xl border border-gray-500 py-3 text-center font-bold text-white uppercase transition hover:border-orange-500 hover:text-orange-500 md:absolute md:bottom-6 md:left-1/2 md:w-[90%] md:-translate-x-1/2"
                            >
                                Create Free Football Identity
                            </Link>
                        </div>

                        {/* Premium Monthly */}
                        <div className="relative rounded-[1.25rem] border border-orange-500 bg-black p-6">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-[#E53F01] px-4 py-1 text-xs font-bold text-white uppercase">
                                Most Popular
                            </div>
                            <div className="mb-4 flex justify-center">
                                <img src="/images/club-logo/hlf_logo.png" alt="logo" className="h-12 w-12" />
                            </div>
                            <h3 className="text-center text-2xl font-bold text-white uppercase italic">HiLights Premium</h3>
                            <p className="mb-6 text-center">
                                <span className="text-[1.25rem] font-semibold text-white">
                                    R$ <span className="pl-1 text-[1.875rem] font-bold text-[#E53F01]">47</span>
                                </span>
                                <span className="ml-2 text-sm text-white">/month</span>
                                <span className="ml-4 text-xs text-orange-500">(12 months fidelity)</span>
                            </p>
                            <div className="mb-8 space-y-3">
                                {premiumPlan.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle className="mt-1 size-[1.125rem] shrink-0 text-green-500" />
                                        <span className="text-[#ececec]">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => router.visit(route('subscription'))}
                                disabled={disablePlanOne}
                                className={`w-full rounded-xl py-3 font-bold text-white uppercase transition ${
                                    disablePlanOne ? 'cursor-not-allowed bg-gray-600 opacity-50' : 'bg-[#E53F01] hover:bg-[#E53F01]'
                                }`}
                            >
                                Choose Prmium
                            </button>
                        </div>

                        {/* Premium No Fidelity */}
                        <div className="rounded-[1.25rem] border border-orange-500 bg-black p-6">
                            <div className="mb-4 flex justify-center">
                                <img src="/images/club-logo/hlf_logo.png" alt="logo" className="h-12 w-12" />
                            </div>
                            <h3 className="text-center text-2xl font-bold text-white uppercase italic">HiLights Premium</h3>
                            <p className="mb-6 text-center">
                                <span className="text-[1.25rem] font-semibold text-white">
                                    R$ <span className="pl-1 text-[1.875rem] font-bold text-[#E53F01]">94</span>
                                </span>
                                <span className="ml-2 text-sm text-white">/month</span>
                                <span className="ml-6 text-xs text-orange-500">(no fidelity)</span>
                            </p>
                            <div className="mb-8 space-y-3">
                                {premiumPlan.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle className="mt-1 size-[1.125rem] shrink-0 text-green-500" />
                                        <span className="text-[#ececec]">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => router.visit(route('subscription'))}
                                disabled={disablePlanTwo}
                                className={`w-full rounded-xl py-3 font-bold text-white uppercase transition ${
                                    disablePlanTwo ? 'cursor-not-allowed bg-gray-600 opacity-50' : 'bg-[#E53F01] hover:bg-[#E53F01]'
                                }`}
                            >
                                {disablePlanTwo ? 'Already Subscribed' : 'Choose Premium'}
                            </button>
                        </div>
                    </div>
                </section>

                {/* BENEFITS */}
                <section className="w-full bg-black px-4">
                    <div className="mx-auto max-w-7xl">
                        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#0b0b0b]">
                            <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-4">
                                {items.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`px-6 py-6 text-center transition-all duration-300 hover:bg-[#121212] ${index !== items.length - 1 ? 'border-zinc-800 lg:border-r-2' : ''}`}
                                        >
                                            <div className="flex justify-center">
                                                <Icon className="size-[2.625rem] text-[#ff3500]" strokeWidth={2} />
                                            </div>
                                            <h3 className="mt-5 text-[1.125rem] font-bold tracking-wide text-white">{item.title}</h3>
                                            <p className="mt-3 text-[0.875rem] leading-6 text-[#d3d3d3]">{item.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="w-full px-4">
                    <div
                        className="mx-auto mt-10 flex max-w-7xl items-center gap-2 rounded-3xl border border-zinc-800 p-4 py-6 sm:grid sm:grid-cols-[4.375rem_1fr_9.375rem] sm:gap-4 md:grid-cols-[5.625rem_1fr_15.625rem] lg:grid-cols-[6.875rem_1fr_28.125rem]"
                        style={{
                            backgroundImage: "url('/images/img/plan_cta_bg.jpeg')",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    >
                        <div className="flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#de4400] md:h-20 md:w-20">
                                <Users className="text-white md:h-12 md:w-12" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[0.875rem] leading-tight font-bold text-white sm:text-[1rem] md:text-[1.25rem] lg:text-[1.75rem]">
                                Take Your Career To The <span className="text-[#fa2e00]">Next Level.</span>
                            </h3>
                            <p className="mt-3 pr-2 text-[0.625rem] leading-relaxed text-gray-300 sm:pr-16 sm:text-[0.75rem] md:text-[0.875rem] lg:pr-24 lg:text-[1.125rem]">
                                Join thousands of players using HiLights PRO to showcase their talent and stand out in the football world.
                            </p>
                        </div>
                        <div className="flex items-end justify-end lg:pr-10">
                            <Link
                                href="/register"
                                className="flex items-center gap-2 rounded-[0.625rem] bg-[#E53F01] px-4 py-1 text-white transition sm:py-2 md:gap-4 lg:px-8 lg:py-2"
                            >
                                <span className="text-left text-[0.625rem] font-bold uppercase sm:text-[0.75rem] md:text-[0.875rem] lg:text-[1rem]">
                                    UPGRADE NOW
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <PublicFooter />
            </main>
        </div>
    );
}
