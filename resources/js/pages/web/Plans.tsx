import { PublicFooter } from '@/components/public/PublicFooter';
import PublicNavbar from '@/components/public/PublicNavbar';
import { Link } from '@inertiajs/react';
import { CalendarDays, CheckCircle2, Flag, Lock, MapPin, User } from 'lucide-react';
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

export default function Plans() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

    return (
        <div className="min-h-screen bg-white dark:bg-[#0D0D0D]">
            <PublicNavbar />

            <main className="pt-16">
                {/* HEADER — orange band */}
                <section className="min-h-screen bg-black px-6 py-10 text-white">
                    <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:px-16">
                        {/* Left Side */}
                        <div className="">
                            <h1 className="text-[62px] font-extrabold tracking-wide italic md:text-[100px]">PLANS</h1>

                            <h2 className="text-[32px] -mt-5 italic font-bold text-orange-500 uppercase">Choose the plan that drives</h2>

                            <h3 className="text-[32px] font-bold text-white uppercase">Your football career.</h3>

                            <div className="mt-4 text-[22px] text-gray-300">
                                <p>More visibility. More connections. More opportunities.</p>
                            </div>
                        </div>

                        {/* Member Card */}
                        <div className=" rounded-[16px] border-1 border-gray-600">
                            <div className="overflow-hidden text-white">
                                {/* Left Section */}
                                <div className="flex items-center justify-between">
                                    {/* Logo */}
                                    <div className="pl-4">
                                        <img src="/images/img/new_logo.png" alt="new-logo" className="w-[130px]" />
                                    </div>

                                    <div className="-translate-x-[30%] translate-y-[20%]">
                                        <h2 className="text-center text-[14px] font-bold uppercase">MEMBER CARD</h2>

                                        <p className="text-center text-[10px] font-semibold text-orange-500 uppercase">Official Member</p>

                                        <svg width="130" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="10" y1="12" x2="70" y2="12" stroke="#6B7280" strokeWidth="1" />

                                            <path
                                                d="M90 4L92.35 9.15L98 9.8L94 13.6L95.2 19L90 16L84.8 19L86 13.6L82 9.8L87.65 9.15L90 4Z"
                                                fill="#F97316"
                                            />

                                            <line x1="110" y1="12" x2="170" y2="12" stroke="#6B7280" strokeWidth="1" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="relative flex gap-4 border-b-1 border-gray-400 pt-2 pl-4">
                                    {/* Image */}
                                    <div className="mb-3 h-[210px] w-[130px]">
                                        <img
                                            src="/images/img/p-6.png"
                                            alt="player"
                                            className="h-full w-full rounded-[12px] border-1 border-gray-400 object-cover"
                                        />
                                    </div>

                                    <div>
                                        <div className="relative z-10">
                                            <h3 className="mt-4 text-[16px] font-bold uppercase">JOÃO DA SILVA</h3>

                                            <p className="text-[10px] text-orange-500 uppercase">ATTACKING MIDFIELDER</p>

                                            <div className="absolute mt-2 h-[1px] w-[110%] bg-orange-500"></div>
                                        </div>

                                        <div className="mt-6 space-y-1">
                                            <div className="flex items-center">
                                                <User size={16} className="mr-[10px] text-orange-500" />
                                                <p className="z-10 text-[10px] text-gray-400 uppercase">
                                                    ID:
                                                    <br />
                                                    <span className="text-white">HLF-00012345</span>
                                                </p>
                                            </div>

                                            <div className="flex items-center">
                                                <CalendarDays size={16} className="mr-[10px] text-orange-500" />
                                                <p className="z-10 text-[10px] text-gray-400 uppercase">
                                                    DATE OF BIRTH:
                                                    <br />
                                                    <span className="text-white">15 / 05 / 2006</span>
                                                </p>
                                            </div>

                                            <div className="flex items-center">
                                                <Flag size={16} className="mr-[10px] text-orange-500" />
                                                <p className="z-10 text-[10px] text-gray-400 uppercase">
                                                    NATIONALITY:
                                                    <br />
                                                    <span className="text-white">Brazil</span>
                                                </p>
                                            </div>

                                            <div className="flex items-center">
                                                <MapPin size={16} className="mr-[10px] text-orange-500" />
                                                <p className="z-10 text-[10px] text-gray-400 uppercase">
                                                    CITY:
                                                    <br />
                                                    <span className="text-white">RIO DE JANEIRO - RJ</span>
                                                </p>
                                            </div>
                                        </div>


                                        <div className="absolute right-0 bottom-0 z-0">
                                            <img src="/images/img/orange-img.png" alt="" className="w-[60px]" />
                                        </div>
                                    </div>


                                     {/* QR Area */}
                                         <div className="pl-8 mt-10 pb-4">
                                                <h2 className="text-[10px] font-bold text-[#ff6600] uppercase">Scan To View Profile</h2>

                                                {/* QR Area */}
                                                <div className="w-fit rounded-3xl border-[3px] border-[#ff6600] bg-white p-3">
                                                    <img src="/images/img/qr.png" alt="QR" className="h-[90px] w-[90px] rounded-xl object-cover" />
                                                </div>

                                                {/* Button */}
                                                <button className="mt-2 flex items-center rounded-xl  px-2 py-2 font-bold text-black uppercase">
                                                    <span className="text-[20px] text-[#ff6600]">📱</span>

                                                    <span className="text-left text-[#ff6600] text-[8px] leading-tight">
                                                        VIEW FULL PROFILE,<br />
                                                        VIDEOS, STATS AND<br />
                                                        ACHIEVEMENTS
                                                    </span>
                                                </button>
                                            </div>
                                </div>
                            </div>
                            
                        </div>
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
                                            ? 'relative rounded-2xl border-2 border-[#FF6B00] bg-white p-8 shadow-[0_8px_40px_rgba(255,107,0,0.2)] lg:scale-[1.02] dark:bg-[#161616]'
                                            : 'rounded-2xl border border-[#E2E8F0] bg-white p-8 dark:border-[#2A2A2A] dark:bg-[#161616]'
                                    }
                                >
                                    {plan.badge && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#FF6B00] px-5 py-1.5 text-xs font-black tracking-wide text-white uppercase">
                                            {plan.badge}
                                        </div>
                                    )}

                                    {/* Plan name */}
                                    <div className="text-lg font-bold text-[#0F172A] dark:text-[#F5F5F5]">{plan.name}</div>

                                    {/* Price */}
                                    <div className="mt-3 flex items-baseline">
                                        <span
                                            className={`font-display text-5xl font-black ${
                                                isPremium ? 'text-[#FF6B00]' : 'text-[#0F172A] dark:text-[#F5F5F5]'
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
                                                    className={`mt-0.5 h-4 w-4 shrink-0 ${isPremium ? 'text-[#FF6B00]' : 'text-green-500'}`}
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
                                                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#FF6B00] font-bold text-white transition-colors hover:bg-[#CC5500]"
                                            >
                                                {plan.cta}
                                            </Link>
                                        ) : (
                                            <Link
                                                href={plan.id === 'agent' ? '/contact?plan=agent' : '/register'}
                                                className="flex h-12 w-full items-center justify-center rounded-xl border border-[#E2E8F0] bg-white font-semibold text-[#0F172A] transition-colors hover:border-[#FF6B00] hover:text-[#FF6B00] dark:border-[#2A2A2A] dark:bg-[#161616] dark:text-[#F5F5F5]"
                                            >
                                                {plan.cta}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* FOOTER */}
                <PublicFooter />
            </main>
        </div>
    );
}
