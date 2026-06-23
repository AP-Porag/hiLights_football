import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ReactCountryFlag from "react-country-flag";
import {
    MapPin,
    Flag,
    Building2,
    Calendar,
    Ruler,
    User,
    BadgeCheck,
    AlertTriangle,
    Video,
    Play,
    Search,
    Star,
    Bookmark,
    ChevronRight,
    Footprints,
    Eye,
    Globe2,
    Trophy,
    CalendarDays,
  Users,
  Crosshair,
  Shield,
  Shirt
} from 'lucide-react';
import PublicNavbar from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/PublicFooter';
import { Pitch } from '@/components/ui/pitch';
// MOCK DATA
const player = {
    id: 247,
    name: 'BENJAMIN SILVA',
    nickname: 'Benja',
    profileId: '#00247 rrrr',
    isMinor: true,
    dob: '30/01/2009',
    age: 17,
    height: 178,
    nationality: 'Brazil',
    flag: '🇧🇷',
    birthplace: 'Rio de Janeiro, Brazil',
    currentClub: 'Anápolis Sub-15',
    teamSince: '03/2025',
    agent: 'Talentos S/A',
    foot: 'Right',
    positions: ['ST', 'LW'],
    modalities: ['Football', 'Futsal', 'Beach Soccer'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    profileViews: 1247,
    countriesCount: 23,
    scoutRatings: 8,
    avgRating: 4.2,
    description:
        'Fast, focused player with exceptional game vision and strong ball control. Comfortable in tight spaces, confident in 1v1 situations and excellent at creating chances from wide positions.',
    clubHistory: [
        { year: 2026, club: 'Anápolis Sub-15' },
        { year: 2025, club: '' },
        { year: 2024, club: '' },
        { year: 2023, club: 'Flamengo Base' },
        { year: 2022, club: '' },
        { year: 2021, club: '' },
        { year: 2020, club: '' },
    ],
    isPremium: true,
    isVerified: true,
};

  const transferHistory = [
        {
            year: 2024,
            club: "São Cristóvão - RJ",
            img: "/images/club-logo/cl-1.png",
        },
        {
            year: 2023,
            club: "Bangu - RJ",
            img: "/images/club-logo/cl-2.png",

        },
        {
            year: 2022,
            club: "Portuguesa RJ - RJ",
            img: "/images/club-logo/cl-3.png",

        },
        {
            year: 2021,
            club: "Madureira - RJ",
            img: "/images/club-logo/cl-4.png",

        },
        {
            year: 2020,
            club: "Flamengo U-17 - RJ",
            img: "/images/club-logo/cl-5.png",

        },
        {
            year: 2019,
            club: "Fluminense U-15 - RJ",
            img: "/images/club-logo/cl-6.png",

        },
        {
            year: 2018,
            club: "Nova Iguaçu - RJ",
            img: "/images/club-logo/cl-7.png",

        },
        {
            year: 2017,
            club: "Boa Vista - RJ",
            img: "/images/club-logo/cl-8.png",

        },
        {
            year: 2016,
            club: "Serrano - RJ",
            img: "/images/club-logo/cl-9.png",

        },
        {
            year: 2015,
            club: "Macaé - RJ",
            img: "/images/club-logo/cl-10.png",

        },
    ];

 const achievements = [
    { year: "2024", title: "Copinha" },
    { year: "2025", title: "Gaúcho U-20" },
    { year: "2025", title: "BH Cup" },
    { year: "2019", title: "Gazetinha Cup" },
    { year: "2019", title: "Rio Grande do Sul State Championship U11" },
  ];


    const competitions = [
    { name: "Copinha", year: "2024" },
    { name: "Gaúcho U-20", year: "2025" },
    { name: "BH Cup", year: "2025" },
    { name: "Gazetinha Cup", year: "2019" },
    { name: "Rio Grande do Sul State Championship U11", year: "2019" },
  ];

  const matches = [
    {
      home: "São Cristóvão",
      score: "3 x 1",
      away: "Juventude",
      goals: 1,
      assists: 0,
      minutes: "90'",
    },
    {
      home: "São Cristóvão",
      score: "2 x 2",
      away: "Grêmio",
      goals: 0,
      assists: 1,
      minutes: "90'",
    },
    {
      home: "São Cristóvão",
      score: "4 x 0",
      away: "Internacional",
      goals: 2,
      assists: 0,
      minutes: "90'",
    },
  ];



// TODO: Replace with usePage<PageProps & { player: typeof player, viewerRole?: string, existingRating?: ScoutRating }>().props

const viewerRole = 'scout'; // TODO: usePage().props.viewerRole

interface StarRatingProps {
    value: number;
    onChange: (v: number) => void;
}

function StarRating({ value, onChange }: StarRatingProps) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                    key={n}
                    type="button"
                    onClick={() => onChange(n)}
                    className="transition-transform hover:scale-110"
                    aria-label={`Rate ${n} stars`}
                >
                    <Star
                        className={`w-5 h-5 ${
                            n <= value
                                ? 'fill-[#FF6B00] text-[#FF6B00]'
                                : 'text-[#FCD9BD] dark:text-[#2A2A2A]'
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}

export default function NewDetail() {




    return (
        <div className="min-h-screen bg-black pt-16 dark:bg-[#0D0D0D]">
            <PublicNavbar />

            {/* BREADCRUMB */}
            <div className="bg-black px-4 py-3 sm:px-6 dark:border-[#2A2A2A] dark:bg-[#0D0D0D]">
                <nav className="mx-auto flex max-w-[1400px] items-center gap-1.5 overflow-x-auto text-sm text-[#475569] dark:text-[#9A9A9A]">
                    <Link href="/" className="whitespace-nowrap hover:text-[#FF6B00] dark:hover:text-[#FF6B00]">
                        Home
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 text-[#CBD5E1] dark:text-[#555]" />
                    <Link href="/players" className="whitespace-nowrap hover:text-[#FF6B00] dark:hover:text-[#FF6B00]">
                        Players
                    </Link>

                    <ChevronRight className="h-3.5 w-3.5 text-[#CBD5E1] dark:text-[#555]" />
                    <span className="font-medium whitespace-nowrap text-[#FF6B00] dark:text-[#F5F5F5]">Joao da Silva</span>
                </nav>
            </div>

            {/* 3-COLUMN LAYOUT */}
            <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
                {/* CENTER COLUMN */}
                <main className="min-w-0 space-y-4 overflow-x-hidden">
                    {/* IDENTITY CARD */}
                    {/* <section className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8"> */}

                    <div className="w-full max-w-7xl overflow-hidden text-white">
                        <div className="flex flex-row gap-3 md:gap-6">
                            {/* Left Image Section */}
                                <div className="w-[40%] overflow-hidden rounded-md border border-[#233247] md:w-auto">
                                    <img
                                        src="/images/img/player-1.png"
                                        alt="Player"
                                        className="object-cover sm:h-[220px] sm:w-[180px] md:h-auto md:w-[320px]"
                                    />
                                </div>

                            {/* Right Content */}
                            <div className="w-[60%] flex-1 md:w-auto">
                                <h1 className="text-[18px] font-bold tracking-wide uppercase md:text-3xl md:font-extrabold">JOÃO DA SILVA</h1>

                                <h3 className="mt-2 text-[14px] text-[#eb6c0d] uppercase md:text-[16px]">Right Winger</h3>

                                <div className="mt-3 space-y-3 text-[10px] md:text-[16px]">
                                    {/* Row */}
                                    <div className="flex">
                                        <CalendarDays className="mr-1 h-3 w-3 text-[#ff6100] md:mr-2 md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Date of Birth / Age:</span>
                                        <span className="pl-2 text-gray-300">Jan 30, 2007 (19)</span>
                                    </div>

                                    {/* Row */}
                                    <div className="flex">
                                        <Users className="mr-1 h-3 w-3 text-[#ff6100] md:mr-2 md:h-5 md:w-5" />
                                        <span className="pr-3 text-[#e1e2e6]">Nationality:</span>
                                        <ReactCountryFlag countryCode="BR" svg className="mt-[2px] mr-1 md:mt-1 md:h-[1em] md:w-[1em]" />
                                        <span className="">Brazil</span>
                                        <span className="px-1">/</span>
                                        <ReactCountryFlag countryCode="IT" svg className="mt-[2px] mr-1 md:mt-1 md:h-[1em] md:w-[1em]" />
                                        <span>Italy III</span>
                                    </div>

                                    {/* Row */}
                                    <div className="flex">
                                        <Ruler className="mr-1 h-3 w-3 text-[#ff6100] md:mr-2 md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Height:</span>
                                        <span className="pl-2 text-gray-100">1.84 m</span>
                                    </div>

                                    {/* Row */}
                                    <div className="flex">
                                        <Crosshair className="mr-1 h-3 w-3 text-[#ff600d] md:mr-2 md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Position:</span>
                                        <span className="pl-2 text-gray-100">Right Winger</span>
                                    </div>

                                    {/* Row */}
                                    <div className="flex">
                                        <Footprints className="mr-1 h-3 w-3 text-[#ff600d] md:mr-2 md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Dominant Foot:</span>
                                        <span className="pl-2 text-gray-100">Right</span>
                                    </div>

                                    {/* Row */}
                                    <div className="flex">
                                        <Shield className="mr-1 h-3 w-3 text-[#ff600d] md:mr-2 md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Current Club:</span>
                                        <span className="pl-2 text-gray-100">São Cristovão</span>
                                    </div>

                                    {/* Row */}
                                    <div className="flex">
                                        <Shirt className="mr-1 h-3 w-3 text-[#ff600d] md:mr-2 md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Previous Club:</span>
                                        <span className="pl-2 text-gray-100">Bangu</span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT AD COLUMN */}
                            <aside className="hidden lg:block">
                                <p className="text-[10px] tracking-wider text-[#94A3B8] uppercase">Sponsored</p>

                                <div className="relative flex h-[350px] w-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#222] bg-[#464646] p-5 text-center">
                                    <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
                                    {/*            <div*/}
                                    {/*                className="absolute inset-0 opacity-20"*/}
                                    {/*                style={{*/}
                                    {/*                    background:*/}
                                    {/*                        'radial-gradient(circle at 50% 0%, #FF6B00 0%, transparent 60%)',*/}
                                    {/*                }}*/}
                                    {/*            />*/}
                                    {/*            <span className="text-white/10 font-black text-[100px] leading-none absolute -top-4 select-none">*/}
                                    {/*  ✓*/}
                                    {/*</span>*/}
                                    {/*            <div className="relative z-10 flex flex-col items-center">*/}
                                    {/*              <span className="text-white font-black text-2xl tracking-tight">*/}
                                    {/*                NIKE FC*/}
                                    {/*              </span>*/}
                                    {/*                            <div className="bg-[#FF6B00] w-8 h-0.5 mx-auto my-2" />*/}
                                    {/*                            <span className="text-white/70 text-sm">2025 Season Boots</span>*/}
                                    {/*                            <span className="text-white/60 text-xs tracking-widest mt-2">*/}
                                    {/*                MERCURIAL VAPOR*/}
                                    {/*              </span>*/}
                                    {/*                <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold px-6 py-2 rounded-lg text-sm mt-3 transition-colors">*/}
                                    {/*                    SHOP NOW →*/}
                                    {/*                </button>*/}
                                    {/*            </div>*/}
                                </div>
                            </aside>
                        </div>
                    </div>

                    {/* VIDEO SECTION */}
                    <section className="mt-6">
                        <p className="pb-8 text-xl font-bold text-white">HIGHLIGHTS VIDEO</p>
                        <div className="relative overflow-hidden">
                            <div className="relative aspect-video w-full">
                                {player.videoUrl ? (
                                    <>
                                        <iframe
                                            src={player.videoUrl}
                                            // title={`${player.name} highlights`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="h-full w-full rounded-2xl bg-gray-500"
                                        />
                                        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 pointer-events-none"> */}
                                        {/* <p className="text-[#FF6B00] text-xs font-bold tracking-widest">
                                            STRIKER · HIGHLIGHT REEL 2025
                                        </p> */}
                                        {/* <h2 className="font-display font-black text-2xl text-white">
                                            {player.name}
                                        </h2> */}
                                        {/* </div> */}
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <Video className="mb-2 h-12 w-12 text-white/30" />
                                        <p className="text-sm text-white/40">No highlights uploaded yet</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between py-2 text-[16px] text-white">
                                <h3 className="mt-4">João da Silva - Best Moments 2024/2025</h3>
                                <span>07:32</span>
                            </div>
                        </div>

                        <div className="relative mt-12 grid grid-cols-3 gap-5 overflow-hidden">
                            {/* sub video 1 */}
                            <div>
                                <div className="relative aspect-video w-full rounded-[16px]">
                                    {player.videoUrl ? (
                                        <>
                                            <iframe
                                                src={player.videoUrl}
                                                // title={`${player.name} highlights`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="h-full w-full rounded-[12px] bg-gray-500"
                                            />
                                            {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 pointer-events-none">
                                        <p className="text-[#FF6B00] text-xs font-bold tracking-widest">
                                            STRIKER · HIGHLIGHT REEL 2025
                                        </p>
                                        <h2 className="font-display font-black text-2xl text-white">
                                            {player.name}
                                        </h2>
                                    </div> */}
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <Video className="mb-2 h-12 w-12 text-white/30" />
                                            <p className="text-sm text-white/40">No highlights uploaded yet</p>
                                        </div>
                                    )}
                                </div>
                                <p className="bold py-2 text-center text-[16px]">Goals</p>
                            </div>

                            {/* sub video 2 */}
                            <div>
                                <div className="relative aspect-video w-full">
                                    {player.videoUrl ? (
                                        <>
                                            <iframe
                                                src={player.videoUrl}
                                                // title={`${player.name} highlights`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="h-full w-full rounded-[12px] bg-gray-500"
                                            />
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <Video className="mb-2 h-12 w-12 text-white/30" />
                                            <p className="text-sm text-white/40">No highlights uploaded yet</p>
                                        </div>
                                    )}
                                </div>
                                <p className="bold py-2 text-center text-[16px]">Assists</p>
                            </div>

                            {/* sub video 3 */}
                            <div>
                                <div className="relative aspect-video w-full rounded-[16px]">
                                    {player.videoUrl ? (
                                        <>
                                            <iframe
                                                src={player.videoUrl}
                                                // title={`${player.name} highlights`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="h-full w-full rounded-[12px] bg-gray-500"
                                            />
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <Video className="mb-2 h-12 w-12 text-white/30" />
                                            <p className="text-sm text-white/40">No highlights uploaded yet</p>
                                        </div>
                                    )}
                                </div>
                                <p className="bold py-2 text-center text-[16px]">Dribbles</p>
                            </div>
                        </div>
                    </section>

                    {/* IN-CONTENT AD */}
                    <aside className="block space-y-3 md:hidden">
                        <p className="text-[10px] tracking-wider text-[#94A3B8] uppercase">Sponsored</p>

                        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#222] bg-[#464646] p-5 py-12 text-center">
                            <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
                            {/*<div*/}
                            {/*    className="absolute inset-0 opacity-20"*/}
                            {/*    style={{*/}
                            {/*        background: 'radial-gradient(circle at 50% 0%, #FF6B00 0%, transparent 60%)',*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<span className="absolute -top-4 text-[100px] leading-none font-black text-white/10 select-none">✓</span>*/}
                            {/*<div className="relative z-10 flex flex-col items-center">*/}
                            {/*    <span className="text-2xl font-black tracking-tight text-white">NIKE FC</span>*/}
                            {/*    <div className="mx-auto my-2 h-0.5 w-8 bg-[#FF6B00]" />*/}
                            {/*    <span className="text-sm text-white/70">2025 Season Boots</span>*/}
                            {/*    <span className="mt-2 text-xs tracking-widest text-white/60">MERCURIAL VAPOR</span>*/}
                            {/*    <button className="mt-3 rounded-lg bg-[#FF6B00] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#CC5500]">*/}
                            {/*        SHOP NOW →*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </aside>

                    {/* CLUB HISTORY */}
                    <section className="overflow-hidden">
                        <div className="flex gap-4 md:grid md:grid-cols-2 md:gap-6">
                            {/* Transfer History */}
                            <div className="rounded-xl border border-slate-800 bg-[#06111d] p-6">
                                <h2 className="mb-6 text-[13px] font-bold text-white uppercase md:text-[18px]">
                                    Transfer History <span className="font-medium text-slate-400">(Last 10 Years)</span>
                                </h2>

                                <div className="space-y-3">
                                    {transferHistory.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 md:gap-4">
                                            <span className="w-8 text-[10px] font-medium text-slate-300 sm:text-[13px] md:w-12 md:text-[16px]">
                                                {item.year}
                                            </span>

                                            {/* Club Logo */}
                                            <div className="h-6 w-6 flex-shrink-0 rounded-full border border-slate-600 bg-slate-700 md:h-8 md:w-8">
                                                <img src={item.img} alt="" />
                                            </div>

                                            <span className="text-[10px] text-white sm:text-[13px] md:text-base">{item.club}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Positions */}
                            <div className="rounded-xl border border-slate-800 bg-[#06111d] p-5">
                                <h2 className="mb-6 text-[13px] font-bold text-white uppercase md:text-[18px]">Positions On The Pitch</h2>

                                <Pitch />

                                {/* Position Info */}
                                <div className="mt-6 space-y-2 text-[11px] font-bold text-white uppercase md:text-[16px]">
                                    <p>
                                        <span className="text-white-400 mb-3 text-[13px] font-bold uppercase md:text-[18px]">Main Position:</span>{' '}
                                        Right Winger
                                    </p>

                                    <p>
                                        <span className="text-[13px] font-bold text-white uppercase md:text-[18px]">Secondary:</span> Attacking
                                        Midfielder, Central Midfielder
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4"> */}
                    <div className="flex gap-4 md:grid md:grid-cols-[400px_1fr]">
                        {/* Achievements */}
                        <div className="rounded-lg border border-[#1b2a3d] bg-[#0b1523] p-5">
                            <h2 className="mb-5 text-[12px] font-semibold text-white uppercase md:text-sm">Achievements</h2>

                            <div className="space-y-2 md:space-y-4">
                                {achievements.map((item, index) => (
                                    <div key={index} className="flex items-start gap-1 md:gap-3">
                                        <span className="text-[12px] text-yellow-500 md:text-sm">🏆</span>

                                        <div className="flex gap-3 md:grid md:grid-cols-[100px_1fr]">
                                            <p className="text-[12px] font-medium text-orange-500 md:text-sm">{item.year}</p>
                                            <p className="text-[10px] leading-relaxed text-gray-300 md:text-sm">{item.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="mt-6 text-[12px] font-medium text-orange-500 transition hover:text-orange-400 md:text-sm">
                                View all achievements →
                            </button>
                        </div>

                        {/* Player Description */}
                        <div className="rounded-lg border border-[#1b2a3d] bg-[#0b1523] p-5">
                            <h2 className="mb-4 text-[12px] font-semibold text-white uppercase md:text-sm">
                                Player Description <span className="font-normal text-gray-500">(UP TO 500 WORDS)</span>
                            </h2>

                            <div className="w-full">
                                <p className="h-48 w-full resize-none rounded-lg border border-[#1b2a3d] bg-[#08111d] p-2 text-gray-300 outline-none placeholder:text-gray-500 focus:border-orange-500 md:p-4">
                                    Write a detailed description of the player's qualities, strengths, style of play, mentality, and other relevant
                                    information...
                                </p>

                                <span className="absolute right-4 bottom-3 text-xs text-gray-500">{/* 0 / 500 words */}</span>
                            </div>
                        </div>
                    </div>

                    {/* IN-CONTENT AD */}
                    <aside className="block space-y-3 lg:hidden">
                        <p className="text-[10px] tracking-wider text-[#94A3B8] uppercase">Sponsored</p>

                        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#222] bg-[#464646] p-5 py-12 text-center">
                            <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
                            {/*<div*/}
                            {/*    className="absolute inset-0 opacity-20"*/}
                            {/*    style={{*/}
                            {/*        background: 'radial-gradient(circle at 50% 0%, #FF6B00 0%, transparent 60%)',*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<span className="absolute -top-4 text-[100px] leading-none font-black text-white/10 select-none">✓</span>*/}
                            {/*<div className="relative z-10 flex flex-col items-center">*/}
                            {/*    <span className="text-2xl font-black tracking-tight text-white">NIKE FC</span>*/}
                            {/*    <div className="mx-auto my-2 h-0.5 w-8 bg-[#FF6B00]" />*/}
                            {/*    <span className="text-sm text-white/70">2025 Season Boots</span>*/}
                            {/*    <span className="mt-2 text-xs tracking-widest text-white/60">MERCURIAL VAPOR</span>*/}
                            {/*    <button className="mt-3 rounded-lg bg-[#FF6B00] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#CC5500]">*/}
                            {/*        SHOP NOW →*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </aside>

                    <div className="grid grid-cols-[1fr_1.25fr] gap-4">
                        {/* Competition History */}
                        <div className="rounded-lg border border-[#152538] bg-[#07111d] p-4 md:p-6">
                            <h2 className="mb-6 text-[14px] font-bold text-white uppercase md:text-xl">Competition History</h2>

                            <div className="space-y-2 md:space-y-4">
                                {competitions.map((item, index) => (
                                    <div key={index} className="flex items-start justify-between gap-2 md:gap-4">
                                        <div className="flex items-start gap-1 md:gap-3">
                                            <Trophy size={18} strokeWidth={1.5} className="mt-0.5 text-gray-300" />

                                            <span className="text-[10px] text-gray-200 md:text-sm">{item.name}</span>
                                        </div>

                                        <span className="text-[10px] text-[#f97316] md:text-sm">{item.year}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="flex items-center gap-2 text-[13px] text-[#f97316] transition hover:text-orange-400 md:text-[18px]">
                                    View all competitions
                                    <ChevronRight size={22} />
                                </button>
                            </div>
                        </div>

                        {/* Recent Matches */}
                        <div className="overflow-hidden rounded-lg border border-[#152538] bg-[#07111d] p-6">
                            <h2 className="mb-6 text-[14px] font-bold text-white uppercase md:text-xl">Recent Matches</h2>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-1 border-gray-300/10 text-left text-[12px] text-gray-300 uppercase md:text-sm">
                                            <th className="pb-4">Match</th>
                                            <th className="pb-4 text-center">Goals</th>
                                            <th className="px-2 pb-4 text-center">Assists</th>
                                            <th className="pb-4 text-center">Minutes</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {matches.map((match, index) => (
                                            <tr key={index} className="border-b-1 border-gray-300/10 text-[10px] text-gray-200 md:text-[14px]">
                                                <td className="py-3">
                                                    <div className="flex items-center gap-2 md:gap-4">
                                                        <span>{match.home}</span>

                                                        <span className="font-semibold">{match.score}</span>

                                                        <span>{match.away}</span>
                                                    </div>
                                                </td>

                                                <td className="py-3 text-center">{match.goals}</td>

                                                <td className="py-3 text-center">{match.assists}</td>

                                                <td className="py-3 text-center">{match.minutes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="flex items-center gap-2 text-[14px] text-[#f97316] transition hover:text-orange-400 md:text-[18px]">
                                    View all matches
                                    <ChevronRight size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* FOOTER SPACING */}
            <PublicFooter />
        </div>
    );
}
