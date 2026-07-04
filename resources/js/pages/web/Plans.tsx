import { PublicFooter } from '@/components/public/PublicFooter';
import PublicNavbar from '@/components/public/PublicNavbar';
import { Link } from '@inertiajs/react';
import { BarChart3, Binoculars, CalendarDays, CheckCircle, Smartphone, Flag, Globe, MapPin, ShieldCheck, User, Users, Shield } from 'lucide-react';
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
            'Public player profile page',
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

const freePlan = [
    "Public Profile",
    "Upload 1 Video",
    "Club History",
    "Competitions History",
    "Achievements",
];

const premiumPlan = [
    "Public Profile",
    "Upload 3 Videos",
    "Club History",
    "Competitions History",
    "Achievements",
    "HiLights Member Card with exclusive QR code",
    "Badge of Verified Profile",
    "Priority in Searches",
    "Consultancy for profile and video improvements",
];

const items = [
    {
        icon: Binoculars,
        title: 'MORE VISIBILITY',
        description: 'Get noticed by scouts and clubs worldwide.',
    },
    {
        icon: Users,
        title: 'BUILD YOUR STORY',
        description: 'Show your achievements and evolution as an athlete.',
    },
    {
        icon: BarChart3,
        title: 'ADVANCED STATS',
        description: 'Track your performance and stand out.',
    },
    {
        icon: Globe,
        title: 'CONNECT',
        description: 'Connect with the biggest football network.',
    },
    {
        icon: ShieldCheck,
        title: 'BE VERIFIED',
        description: 'Build credibility and boost your career.',
    },
];

export default function Plans() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

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
                            <h1 className="text-[42px] font-extrabold tracking-wide italic sm:text-[55px] md:text-[65px] lg:text-[80px]">PLANS</h1>
                            <h2 className="-mt-2 text-[14px] font-bold text-[#f54208] uppercase italic sm:text-[18px] md:-mt-3 md:text-[22px] lg:text-[24px]">
                                Choose the plan that drives
                            </h2>
                            <h3 className="text-[16px] font-bold text-white uppercase sm:text-[20px] md:text-[20px] lg:text-[22px]">
                                Your football career.
                            </h3>
                            <div className="mt-6 text-[12px] text-[#feffff] sm:text-[14px] md:text-[16px] lg:text-[18px]">
                                <p>
                                    More visibility. More connections. <br />
                                    More opportunities.
                                </p>
                            </div>
                        </div>

                        {/* ═══════════ MEMBER CARD (fixed, responsive, no stretch) ═══════════ */}
                        <div className="relative mx-auto w-full max-w-[720px] overflow-hidden rounded-2xl border border-gray-700 bg-black text-white">
                            {/* Orange side band */}
                            <div className="absolute top-0 right-0 h-full w-[46px] overflow-hidden sm:w-[54px] lg:w-[64px]">
                                <svg viewBox="0 0 90 520" preserveAspectRatio="none" className="block h-full w-full">
                                    <path
                                        d="M0 520 L0 85 C0 45 20 15 50 0 L72 0 C82 0 90 8 90 18 L90 485 C90 505 75 520 55 520 Z"
                                        fill="#e53f01"
                                    />
                                </svg>
                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[16px] font-bold tracking-[6px] whitespace-nowrap text-white sm:text-[18px] sm:tracking-[8px] pb-2 lg:pb-4">
                                    2024
                                </p>
                                <p className="absolute top-1/2 left-[72%] -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[8px] tracking-wider whitespace-nowrap text-white uppercase sm:text-[10px]">
                                    HIGHLIGHTS FOOTBALL MEMBER
                                </p>
                            </div>

                            {/* Inner content — right padding clears the band */}
                            <div className="p-4 pr-[54px] sm:p-5 sm:pr-[64px] lg:pr-[76px]">
                                {/* TOP ROW: logo + title */}
                                <div className="flex items-start justify-between gap-3">
                                    <img src="/images/logo/final_logo.png" alt="HiLights Football" className="w-[90px] shrink-0 sm:w-[110px] lg:w-[130px]" />
                                    <div className="pt-1 text-center">
                                        <h2 className="text-[11px] font-bold uppercase sm:text-[13px] lg:text-[15px]">MEMBER CARD</h2>
                                        <p className="text-[8px] font-semibold text-[#e24b12] uppercase sm:text-[9px] lg:text-[10px]">Official Member</p>
                                        <svg width="150" height="20" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mt-1 w-[110px] sm:w-[140px]">
                                            <line x1="10" y1="12" x2="70" y2="12" stroke="#6B7280" strokeWidth="1" />
                                            <path d="M90 4L92.35 9.15L98 9.8L94 13.6L95.2 19L90 16L84.8 19L86 13.6L82 9.8L87.65 9.15L90 4Z" fill="#e24b12" />
                                            <line x1="110" y1="12" x2="170" y2="12" stroke="#6B7280" strokeWidth="1" />
                                        </svg>
                                    </div>
                                </div>

                                {/* BODY: photo | details | qr */}
                                <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-start sm:gap-4 md:flex-col md:gap-5 lg:flex-row lg:justify-between lg:items-start lg:gap-4">
                                    {/* Photo */}
                                    <div className="h-[190px] w- shrink-0 sm:h-[190px] sm:w-[150px]
                                     md:h-[190px]] md:w-full lg:h-[210px] lg:w-[170px]">
                                        <img
                                            src="/images/img/p-6.png"
                                            alt="player"
                                            className="h-full w-full rounded-[12px] border border-gray-400 object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="min-w-0 flex-1 sm:pl-2 md:pl-0-10 lg:pl-2">
                                        <h3 className="text-[15px] font-bold uppercase lg:text-[17px]">JOÃO DA SILVA</h3>
                                        <p className="text-[9px] text-[#e24b12] uppercase lg:text-[10px]">ATTACKING MIDFIELDER</p>
                                        <div className="mt-1 h-px w-28 bg-[#e24b12]" />

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-start">
                                                <User size={16} className="mt-[2px] mr-[10px] shrink-0 text-[#e24b12]" />
                                                <p className="text-[10px] text-[#e2e2e2] uppercase">
                                                    ID:
                                                    <br />
                                                    <span className="text-white">HLF-00012345</span>
                                                </p>
                                            </div>
                                            <div className="flex items-start">
                                                <CalendarDays size={16} className="mt-[2px] mr-[10px] shrink-0 text-[#e24b12]" />
                                                <p className="text-[10px] text-[#e2e2e2] uppercase">
                                                    DATE OF BIRTH:
                                                    <br />
                                                    <span className="text-white">15 / 05 / 2006</span>
                                                </p>
                                            </div>
                                            <div className="flex items-start">
                                                <Flag size={16} className="mt-[2px] mr-[10px] shrink-0 text-[#e24b12]" />
                                                <p className="text-[10px] text-[#e2e2e2] uppercase">
                                                    NATIONALITY:
                                                    <br />
                                                    <span className="text-white">Brazil</span>
                                                </p>
                                            </div>
                                            <div className="flex items-start">
                                                <MapPin size={16} className="mt-[2px] mr-[10px] shrink-0 text-[#e24b12]" />
                                                <p className="text-[10px] text-[#e2e2e2] uppercase">
                                                    CITY:
                                                    <br />
                                                    <span className="text-white">RIO DE JANEIRO - RJ</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* QR */}
                                    <div className="flex shrink-0 flex-col items-center sm:pt-6 sm:items-start md:items-center lg:items-start md:mx-auto">
                                        <h4 className="pb-2 text-[8px] font-bold text-[#e24b12] uppercase lg:text-[10px]">Scan To View Profile</h4>
                                        <div className="rounded-[12px] border-[3px] border-[#e24b12] bg-white p-2">
                                            <img src="/images/img/qr.png" alt="QR" className="h-[70px] w-[70px] rounded-md object-cover lg:h-[90px] lg:w-[90px]" />
                                        </div>
                                        <div className="mt-2 flex items-center">
                                            <Smartphone size={20} className="mr-1 shrink-0 text-[#e24b12]" />
                                            <span className="text-left text-[8px] leading-tight text-[#e24b12] uppercase">
                                                VIEW FULL PROFILE,
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
                                    <p className="text-[10px] leading-relaxed text-white uppercase lg:text-[12px]">
                                        This card identifies the holder as an official member of HiLights Football platform.
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
                        <div className="rounded-[20px] border border-gray-700 bg-black p-6 md:relative">
                            <div className="mb-6 flex -translate-y-[85%] justify-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-600 bg-black">
                                    <User size={32} className="text-white" />
                                </div>
                            </div>
                            <h3 className="mb-6 text-center text-2xl font-bold text-white uppercase italic">Free Profile</h3>
                            <div className="mb-8 space-y-3">
                                {freePlan.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle size={18} className="text-green-500" />
                                        <span className="text-[#ececec]">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full rounded-xl border border-gray-500 py-3 font-bold text-white uppercase transition hover:border-orange-500 hover:text-orange-500 md:absolute md:bottom-6 md:left-1/2 md:w-[90%] md:-translate-x-1/2">
                                Create Free Profile
                            </button>
                        </div>

                        {/* Premium Monthly */}
                        <div className="relative rounded-[20px] border border-orange-500 bg-black p-6">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-[#e53f01] px-4 py-1 text-xs font-bold text-white uppercase">
                                Most Popular
                            </div>
                            <div className="mb-4 flex justify-center">
                                <img src="/images/club-logo/hlf_logo.png" alt="logo" className="h-12 w-12" />
                            </div>
                            <h3 className="text-center text-2xl font-bold text-white uppercase italic">HiLights Premium</h3>
                            <p className="mb-6 text-center">
                                <span className="text-[20px] font-semibold text-white">R$ <span className="pl-1 text-[30px] font-bold text-[#e73d00]">47</span></span>
                                <span className="ml-2 text-sm text-white">/month</span>
                                <span className="ml-4 text-xs text-orange-500">(12 months fidelity)</span>
                            </p>
                            <div className="mb-8 space-y-3">
                                {premiumPlan.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle size={18} className="mt-1 shrink-0 text-green-500" />
                                        <span className="text-[#ececec]">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full rounded-xl bg-[#e53f01] py-3 font-bold text-white uppercase transition hover:bg-orange-600">
                                Choose Premium
                            </button>
                        </div>

                        {/* Premium No Fidelity */}
                        <div className="rounded-[20px] border border-orange-500 bg-black p-6">
                            <div className="mb-4 flex justify-center">
                                <img src="/images/club-logo/hlf_logo.png" alt="logo" className="h-12 w-12" />
                            </div>
                            <h3 className="text-center text-2xl font-bold text-white uppercase italic">HiLights Premium</h3>
                            <p className="mb-6 text-center">
                                <span className="text-[20px] font-semibold text-white">R$ <span className="pl-1 text-[30px] font-bold text-[#e73d00]">94</span></span>
                                <span className="ml-2 text-sm text-white">/month</span>
                                <span className="ml-6 text-xs text-orange-500">(no fidelity)</span>
                            </p>
                            <div className="mb-8 space-y-3">
                                {premiumPlan.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle size={18} className="mt-1 shrink-0 text-green-500" />
                                        <span className="text-[#ececec]">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full rounded-xl bg-[#e53f01] py-3 font-bold text-white uppercase transition hover:bg-orange-600">
                                Choose Premium
                            </button>
                        </div>
                    </div>
                </section>

                {/* BENEFITS */}
                <section className="w-full bg-black px-4">
                    <div className="mx-auto max-w-7xl">
                        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#0b0b0b]">
                            <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-5">
                                {items.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`px-6 py-6 text-center transition-all duration-300 hover:bg-[#121212] ${index !== items.length - 1 ? 'border-zinc-800 lg:border-r-2' : ''}`}
                                        >
                                            <div className="flex justify-center">
                                                <Icon size={42} className="text-[#ff3500]" strokeWidth={2} />
                                            </div>
                                            <h3 className="mt-5 text-[18px] font-bold tracking-wide text-white">{item.title}</h3>
                                            <p className="mt-3 text-[14px] leading-6 text-[#d3d3d3]">{item.description}</p>
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
                        className="mx-auto mt-10 flex max-w-7xl items-center gap-2 rounded-3xl border border-zinc-800 p-4 py-6 sm:grid sm:grid-cols-[70px_1fr_150px] sm:gap-4 md:grid-cols-[90px_1fr_250px] lg:grid-cols-[110px_1fr_450px]"
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
                            <h3 className="text-[14px] leading-tight font-bold text-white sm:text-[16px] md:text-[20px] lg:text-[28px]">
                                TAKE YOUR CAREER TO THE <span className="text-[#fa2e00]">NEXT LEVEL.</span>
                            </h3>
                            <p className="mt-3 pr-2 text-[10px] leading-relaxed text-gray-300 sm:pr-16 sm:text-[12px] md:text-[14px] lg:pr-24 lg:text-[18px]">
                                Join thousands of players using HiLights PRO to showcase their talent and stand out in the football world.
                            </p>
                        </div>
                        <div className="flex items-end justify-end lg:pr-10">
                            <Link href="/register" className="flex items-center gap-2 rounded-[10px] bg-[#ea4100] px-4 py-1 text-white transition sm:py-2 md:gap-4 lg:px-8 lg:py-2">
                                <span className="text-left text-[10px] font-bold uppercase sm:text-[12px] md:text-[14px] lg:text-[16px]">
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
