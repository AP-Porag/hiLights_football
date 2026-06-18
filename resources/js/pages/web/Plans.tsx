import { PublicFooter } from '@/components/public/PublicFooter';
import PublicNavbar from '@/components/public/PublicNavbar';
import { Link } from '@inertiajs/react';
import { BarChart3, Binoculars, CalendarDays,CheckCircle, CheckCircle2, Flag, Globe, Lock, MapPin, ShieldCheck, User, Users } from 'lucide-react';
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
        <div className="min-h-screen bg-white dark:bg-[#0D0D0D]">

            <PublicNavbar />

            <main className="pt-16">
                {/* HEADER — orange band */}
          <section
                    className="bg-black px-6 pt-10 pb-8 text-white"
                    style={{
                        backgroundImage: "url('/images/img/plan_hero.jpeg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[40%_1fr] lg:px-16">
                        {/* Left Side */}
                        <div className="">
                            <h1 className="font-extrabold tracking-wide italic text-[42px] sm:text-[55px] md:text-[65px] lg:text-[80px]">PLANS</h1>

                            <h2 className="-mt-2 md:-mt-3 font-bold text-orange-500 uppercase italic text-[14px] sm:text-[18px] md:text-[22px] lg:text-[24px]">
                                Choose the plan that drives
                            </h2>

                            <h3 className="font-bold text-white uppercase text-[16px] sm:text-[20px] md:text-[20px] lg:text-[22px]">Your football career.</h3>

                            <div className="mt-3 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-gray-300">
                                <p>
                                    More visibility. More connections. <br />
                                    More opportunities.
                                </p>
                            </div>
                        </div>

                        {/* Member Card */}
                        <div className="relative overflow-hidden rounded-[16px] border border-gray-600 bg-black">

                                <div className="absolute top-0 right-0 h-full w-[40px] sm:w-[48px] lg:w-[60px] overflow-hidden">
  <svg
    viewBox="0 0 90 520"
    preserveAspectRatio="none"
    className="block w-full h-full"
  >
    <path
      d="
        M0 520
        L0 85
        C0 45 20 15 50 0
        L72 0
        C82 0 90 8 90 18
        L90 485
        C90 505 75 520 55 520
        Z
      "
      fill="#F54A00"
    />
  </svg>

   {/* 2024 */}
  <p
    className="
      absolute
      -left-[20px]
      top-[45%]
      -rotate-90
      text-white
      text-[18px]
      font-bold
      tracking-[8px]
      whitespace-nowrap
    "
  >
    2024
  </p>

  {/* Text */}
  <p
    className="
      absolute
      left-[70%]
      top-[45%]
      -translate-x-1/2
      -translate-y-1/2
      -rotate-90
      text-white
      text-[10px]
      uppercase
      tracking-wider
      whitespace-nowrap
    "
  >
    HIGHLIGHTS FOOTBALL MEMBER
  </p>
</div>
                            <div className="overflow-hidden text-white">
                                {/* Left Section */}
                                <div className="flex items-center justify-between">
                                    {/* Logo */}
                                    <div className="pl-4">
                                        <img src="/images/img/new_logo.png" alt="new-logo" className="w-[90px] sm:w-[110px] lg:w-[130px]" />
                                    </div>

                                    <div className="-translate-x-[20%] sm:-translate-x-[40%] md:-translate-x-[60%] lg:-translate-x-[120%] translate-y-[30%]">
                                        <h2 className="text-center text-[10px] sm:text-[12px] lg:text-[14px] font-bold uppercase">MEMBER CARD</h2>

                                        <p className="text-center text-[8px] sm:text-[9px] lg:text-[10px] font-semibold text-orange-500 uppercase">Official Member</p>

                                        <svg width="110" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="10" y1="12" x2="70" y2="12" stroke="#6B7280" strokeWidth="1" />

                                            <path
                                                d="M90 4L92.35 9.15L98 9.8L94 13.6L95.2 19L90 16L84.8 19L86 13.6L82 9.8L87.65 9.15L90 4Z"
                                                fill="#F97316"
                                            />

                                            <line x1="110" y1="12" x2="170" y2="12" stroke="#6B7280" strokeWidth="1" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 pt-2 px-4">
                                    {/* Image */}
                                    <div className="mt-4 lg:mx-0 h-[170px] w-[150px] sm:h-[190px] sm:w-[160px] lg:h-[210px] lg:w-[170px]">
                                        <img
                                            src="/images/img/p-6.png"
                                            alt="player"
                                            className="h-full w-full rounded-[12px] border-1 border-gray-400 object-cover"
                                        />
                                    </div>

                                    <div className="sm:grid sm:grid-cols-[50%_40%_1fr] lg:flex">
                                        <div>
                                        <div className="relative z-10">
                                            <h3 className="mt-4 text-[14px] lg:text-[16px] font-bold uppercase">JOÃO DA SILVA</h3>

                                            <p className="text-[8px] lg:text-[10px] text-orange-500 uppercase">ATTACKING MIDFIELDER</p>

                                            <div className="absolute mt-2 h-[1px] w-[32%] md:w-[60%] lg:w-[110%] bg-orange-500"></div>
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
                                        </div>



                                        {/* QR Area */}
                                    <div className="mt-10 lg:mt-4 pb-2 flex lg:pl-[80px] flex-col items-center lg:items-start">
                                    
                                        <h2 className="text-[8px] lg:text-[10px] pb-2 font-bold text-[#ff6600] uppercase">Scan To View Profile</h2>

                                        {/* QR Area */}
                                        <div className="rounded-2xl lg:rounded-3xl border-[3px] border-[#ff6600] bg-white p-2 lg:p-3">

                                            <img src="/images/img/qr.png" alt="QR" className="h-[70px] w-[70px] lg:h-[90px] lg:w-[90px] rounded-xl object-cover" />
                                        </div>

                                        {/* Button */}
                                        <button className="mt-2 flex items-center justify-center lg:justify-start rounded-xl px-2 py-2 font-bold uppercase">
                                            <span className="text-[20px] text-[#ff6600]">📱</span>

                                            <span className="text-left text-[8px] leading-tight text-[#ff6600]">
                                                VIEW FULL PROFILE,
                                                <br />
                                                VIDEOS, STATS AND
                                                <br />
                                                ACHIEVEMENTS
                                            </span>
                                        </button>
                                    </div>
                                    </div>

                                    
                                </div>
                                <div className="">
                                    <p className="px-4 sm:px-6 pb-3 pt-4 text-[10px] lg:text-[12px] leading-relaxed text-white uppercase">
                                        This card identifies the holder as an official
                                        <br /> member of HiLights Football platform.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PLANS */}


                <section className="bg-black px-4 py-12">
            <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Free Profile */}
                <div className="rounded-[20px] border border-gray-700 bg-black p-6">
                    <div className="mb-6 flex justify-center -translate-y-[85%]">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-600 bg-black ">
                            <User size={28} />
                        </div>
                    </div>

                    <h3 className="mb-6 text-center text-2xl font-bold uppercase italic text-white">
                        Free Profile
                    </h3>

                    <div className="mb-8 space-y-3">
                        {freePlan.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle size={18} className="text-green-500" />
                                <span className="text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full rounded-xl border border-gray-500 py-3 font-bold uppercase text-white transition hover:border-orange-500 hover:text-orange-500">
                        Create Free Profile
                    </button>
                </div>

                {/* Premium Monthly */}
                <div className="relative rounded-[20px] border border-orange-500 bg-black p-6">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-orange-500 px-4 py-1 text-xs font-bold uppercase text-white">
                        Most Popular
                    </div>

                    <div className="mb-4 flex justify-center">
                        <img
                            src="/images/club-logo/hlf_logo.png"
                            alt="logo"
                            className="h-12 w-12"
                        />
                    </div>

                    <h3 className="text-center text-2xl font-bold uppercase italic text-white">
                        HiLights Premium
                    </h3>

                    <p className="mb-6 text-center">
                        <span className="text-3xl font-bold text-orange-500">
                            R$ 47
                        </span>
                        <span className="ml-2 text-sm text-orange-400">
                            /month
                        </span>
                        <span className="ml-2 text-xs text-orange-500">
                            (12 months fidelity)
                        </span>
                    </p>

                    <div className="mb-8 space-y-3">
                        {premiumPlan.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle
                                    size={18}
                                    className="mt-1 shrink-0 text-green-500"
                                />
                                <span className="text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full rounded-xl bg-orange-500 py-3 font-bold uppercase text-white transition hover:bg-orange-600">
                        Choose Premium
                    </button>
                </div>

                {/* Premium No Fidelity */}
                <div className="rounded-[20px] border border-orange-500 bg-black p-6">
                    <div className="mb-4 flex justify-center">
                        <img
                            src="/images/club-logo/hlf_logo.png"
                            alt="logo"
                            className="h-12 w-12"
                        />
                    </div>

                    <h3 className="text-center text-2xl font-bold uppercase italic text-white">
                        HiLights Premium
                    </h3>

                    <p className="mb-6 text-center">
                        <span className="text-3xl font-bold text-orange-500">
                            R$ 94
                        </span>
                        <span className="ml-2 text-sm text-orange-400">
                            /month
                        </span>
                        <span className="ml-2 text-xs text-orange-500">
                            (no fidelity)
                        </span>
                    </p>

                    <div className="mb-8 space-y-3">
                        {premiumPlan.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle
                                    size={18}
                                    className="mt-1 shrink-0 text-green-500"
                                />
                                <span className="text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full rounded-xl bg-orange-500 py-3 font-bold uppercase text-white transition hover:bg-orange-600">
                        Choose Premium
                    </button>
                </div>
            </div>
        </section>



                <section className="w-full bg-black px-4 py-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#0b0b0b]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                                {items.map((item, index) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={index}
                                            className={`px-6 py-8 text-center transition-all duration-300 hover:bg-[#121212] ${index !== items.length - 1 ? 'border-zinc-800 lg:border-r' : ''} `}
                                        >
                                            {/* Icon */}
                                            <div className="flex justify-center">
                                                <Icon size={42} className="text-orange-500" strokeWidth={2} />
                                            </div>

                                            {/* Title */}
                                            <h3 className="mt-5 text-[18px] font-bold tracking-wide text-white">{item.title}</h3>

                                            {/* Description */}
                                            <p className="mt-3 text-[14px] leading-6 text-zinc-400">{item.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-4 border-b border-[#1f1f1f] py-6 sm:grid sm:grid-cols-[70px_1fr_200px] md:grid-cols-[90px_1fr_400px] lg:grid-cols-[110px_1fr_500px] p-4">

                        <div className="flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff6b00] md:h-20 md:w-20">
                                <Users className="text-white md:h-12 md:w-12" />
                            </div>
                        </div>

                        {/* Text */}
                        <div>
                            <h3 className="text-[14px] leading-tight font-bold sm:text-[16px] md:text-[18px] lg:text-[22px]">
                                TAKE YOUR CAREER TO THE NEXT LEVEL.
                            </h3>

                            <p className="mt-3 text-[10px] leading-relaxed text-gray-300 sm:text-[12px] md:text-[14px] lg:text-[16px]">
                                Join thousands of players using HiLights PRO to showcase their talent and stand out in the football world.
                            </p>
                        </div>

                        {/* Button */}
                        <div className="flex items-end justify-end lg:pr-10">
                            <button className="sm:-w-45 flex items-center gap-2 rounded-xl border border-[#ff6b00] bg-[#ff6b00] px-4 py-2 transition hover:bg-[#ff6b00]/10 md:gap-4 lg:px-8 lg:py-6">
                                <span className="text-left text-[10px] font-bold uppercase sm:text-[12px] md:text-[14px] lg:text-[16px]">
                                    UPGRADE NOW
                                </span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <PublicFooter />
            </main>
        </div>
    );
}
