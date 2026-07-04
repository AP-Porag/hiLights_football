"use strict";
// import React, { useState } from 'react';
// import { Link, usePage } from '@inertiajs/react';
// import ReactCountryFlag from "react-country-flag";
// import {
//     MapPin,
//     Flag,
//     Building2,
//     Calendar,
//     Ruler,
//     User,
//     BadgeCheck,
//     AlertTriangle,
//     Video,
//     Play,
//     Search,
//     Star,
//     Bookmark,
//     ChevronRight,
//     Footprints,
//     Eye,
//     Globe2,
//     Trophy,
//     CalendarDays,
//     Users,
//     Crosshair,
//     Shield,
//     Shirt
// } from 'lucide-react';
// import PublicNavbar from '@/components/public/PublicNavbar';
// import { PublicFooter } from '@/components/public/PublicFooter';
// import { Pitch } from '@/components/ui/pitch';
exports.__esModule = true;
// // MOCK DATA
// const player = {
//     id: 247,
//     name: 'BENJAMIN SILVA',
//     nickname: 'Benja',
//     profileId: '#00247 rrrr',
//     isMinor: true,
//     dob: '30/01/2009',
//     age: 17,
//     height: 178,
//     nationality: 'Brazil',
//     flag: '🇧🇷',
//     birthplace: 'Rio de Janeiro, Brazil',
//     currentClub: 'Anápolis Sub-15',
//     teamSince: '03/2025',
//     agent: 'Talentos S/A',
//     foot: 'Right',
//     positions: ['ST', 'LW'],
//     modalities: ['Football', 'Futsal', 'Beach Soccer'],
//     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
//     profileViews: 1247,
//     countriesCount: 23,
//     scoutRatings: 8,
//     avgRating: 4.2,
//     description:
//         'Fast, focused player with exceptional game vision and strong ball control. Comfortable in tight spaces, confident in 1v1 situations and excellent at creating chances from wide positions.',
//     clubHistory: [
//         { year: 2026, club: 'Anápolis Sub-15' },
//         { year: 2025, club: '' },
//         { year: 2024, club: '' },
//         { year: 2023, club: 'Flamengo Base' },
//         { year: 2022, club: '' },
//         { year: 2021, club: '' },
//         { year: 2020, club: '' },
//     ],
//     isPremium: true,
//     isVerified: true,
// };
// const transferHistory = [
//     { year: 2024, club: "São Cristóvão - RJ", img: "/images/club-logo/cl-1.png" },
//     { year: 2023, club: "Bangu - RJ", img: "/images/club-logo/cl-2.png" },
//     { year: 2022, club: "Portuguesa RJ - RJ", img: "/images/club-logo/cl-3.png" },
//     { year: 2021, club: "Madureira - RJ", img: "/images/club-logo/cl-4.png" },
//     { year: 2020, club: "Flamengo U-17 - RJ", img: "/images/club-logo/cl-5.png" },
//     { year: 2019, club: "Fluminense U-15 - RJ", img: "/images/club-logo/cl-6.png" },
//     { year: 2018, club: "Nova Iguaçu - RJ", img: "/images/club-logo/cl-7.png" },
//     { year: 2017, club: "Boa Vista - RJ", img: "/images/club-logo/cl-8.png" },
//     { year: 2016, club: "Serrano - RJ", img: "/images/club-logo/cl-9.png" },
//     { year: 2015, club: "Macaé - RJ", img: "/images/club-logo/cl-10.png" },
// ];
// const achievements = [
//     { year: "2024", title: "Copinha" },
//     { year: "2025", title: "Gaúcho U-20" },
//     { year: "2025", title: "BH Cup" },
//     { year: "2019", title: "Gazetinha Cup" },
//     { year: "2019", title: "Rio Grande do Sul State Championship U11" },
// ];
// const competitions = [
//     { name: "Copinha", year: "2024" },
//     { name: "Gaúcho U-20", year: "2025" },
//     { name: "BH Cup", year: "2025" },
//     { name: "Gazetinha Cup", year: "2019" },
//     { name: "Rio Grande do Sul State Championship U11", year: "2019" },
// ];
// const matches = [
//     { home: "São Cristóvão", score: "3 x 1", away: "Juventude", goals: 1, assists: 0, minutes: "90'" },
//     { home: "São Cristóvão", score: "2 x 2", away: "Grêmio", goals: 0, assists: 1, minutes: "90'" },
//     { home: "São Cristóvão", score: "4 x 0", away: "Internacional", goals: 2, assists: 0, minutes: "90'" },
// ];
// const viewerRole = 'scout';
// interface StarRatingProps {
//     value: number;
//     onChange: (v: number) => void;
// }
// function StarRating({ value, onChange }: StarRatingProps) {
//     return (
//         <div className="flex gap-1">
//             {[1, 2, 3, 4, 5].map((n) => (
//                 <button
//                     key={n}
//                     type="button"
//                     onClick={() => onChange(n)}
//                     className="transition-transform hover:scale-110"
//                     aria-label={`Rate ${n} stars`}
//                 >
//                     <Star className={`h-5 w-5 ${n <= value ? 'fill-[#FF6B00] text-[#FF6B00]' : 'text-[#FCD9BD] dark:text-[#2A2A2A]'}`} />
//                 </button>
//             ))}
//         </div>
//     );
// }
// export default function NewDetail() {
//     return (
//         <div className="min-h-screen bg-black pt-16 xl:pt-20 2xl:pt-24 dark:bg-[#0D0D0D]">
//             <PublicNavbar />
//             {/* BREADCRUMB */}
//             <div className="mx-auto max-w-7xl bg-black px-4 py-3 sm:px-6 dark:border-[#2A2A2A] dark:bg-[#0D0D0D]">
//                 <nav className="flex items-center gap-1.5 text-sm text-[#475569] dark:text-[#9A9A9A]">
//                     <Link href="/" className="whitespace-nowrap hover:text-[#FF6B00]">Home</Link>
//                     <ChevronRight className="h-3.5 w-3.5 text-[#CBD5E1] dark:text-[#555]" />
//                     <Link href="/players" className="whitespace-nowrap hover:text-[#FF6B00]">Players</Link>
//                     <ChevronRight className="h-3.5 w-3.5 text-[#CBD5E1] dark:text-[#555]" />
//                     <span className="font-medium whitespace-nowrap text-[#FF6B00] dark:text-[#F5F5F5]">Joao da Silva</span>
//                 </nav>
//             </div>
//             <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
//                 <main className="min-w-0 space-y-6 overflow-x-hidden">
//                     {/* ═══════════ TOP: player info (left) + main video (right) ═══════════ */}
//                     <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
//                         {/* Player info */}
//                         <div className="flex gap-4 text-white sm:gap-6">
//                             {/* Smaller photo */}
//                             <div className="shrink-0">
//                                 <img
//                                     src="/images/img/player-1.png"
//                                     alt="Player"
//                                     className="h-[160px] w-[120px] rounded-md border border-[#233247] object-cover sm:h-[190px] sm:w-[145px] lg:h-[210px] lg:w-[160px]"
//                                 />
//                             </div>
//                             {/* Bigger info text */}
//                             <div className="min-w-0 flex-1">
//                                 <h1 className="text-2xl font-bold tracking-wide uppercase md:text-3xl">JOÃO DA SILVA</h1>
//                                 <h3 className="mt-1 text-base font-semibold text-[#eb6c0d] uppercase md:text-lg">Right Winger</h3>
//                                 <div className="mt-3 space-y-1.5 text-sm md:text-base">
//                                     <div className="flex items-center">
//                                         <CalendarDays className="mr-2 h-4 w-4 shrink-0 text-[#ff6100] md:h-5 md:w-5" />
//                                         <span className="text-[#e1e2e6]">Date of Birth / Age:</span>
//                                         <span className="pl-2 text-gray-300">Jan 30, 2007 (19)</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Users className="mr-2 h-4 w-4 shrink-0 text-[#ff6100] md:h-5 md:w-5" />
//                                         <span className="pr-3 text-[#e1e2e6]">Nationality:</span>
//                                         <ReactCountryFlag countryCode="BR" svg className="mr-1" />
//                                         <span>Brazil</span>
//                                         <span className="px-1">/</span>
//                                         <ReactCountryFlag countryCode="IT" svg className="mr-1" />
//                                         <span>Italy III</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Ruler className="mr-2 h-4 w-4 shrink-0 text-[#ff6100] md:h-5 md:w-5" />
//                                         <span className="text-[#e1e2e6]">Height:</span>
//                                         <span className="pl-2 text-gray-100">1.84 m</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Crosshair className="mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" />
//                                         <span className="text-[#e1e2e6]">Position:</span>
//                                         <span className="pl-2 text-gray-100">Right Winger</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Footprints className="mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" />
//                                         <span className="text-[#e1e2e6]">Dominant Foot:</span>
//                                         <span className="pl-2 text-gray-100">Right</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Shield className="mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" />
//                                         <span className="text-[#e1e2e6]">Current Club:</span>
//                                         <span className="pl-2 text-gray-100">São Cristovão</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Shirt className="mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" />
//                                         <span className="text-[#e1e2e6]">Previous Club:</span>
//                                         <span className="pl-2 text-gray-100">Bangu</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* Main video — visible on first view, no scroll needed */}
//                         <div className="w-full">
//                             <p className="mb-3 text-[16px] font-bold text-white">HIGHLIGHTS VIDEO</p>
//                             <div className="overflow-hidden rounded-2xl">
//                                 {player.videoUrl ? (
//                                     <iframe
//                                         src={player.videoUrl}
//                                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                         allowFullScreen
//                                         className="aspect-video w-full rounded-2xl bg-gray-800"
//                                     />
//                                 ) : (
//                                     <div className="flex aspect-video w-full flex-col items-center justify-center rounded-2xl bg-gray-800">
//                                         <Video className="mb-2 h-12 w-12 text-white/30" />
//                                         <p className="text-sm text-white/40">No highlights uploaded yet</p>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="mt-2 flex items-center justify-between text-[14px] text-white">
//                                 <h3>João da Silva - Best Moments 2024/2025</h3>
//                                 <span>07:32</span>
//                             </div>
//                         </div>
//                     </section>
//                     {/* SUB VIDEOS */}
//                     <section>
//                         <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
//                             {[
//                                 { label: 'Goals' },
//                                 { label: 'Assists' },
//                                 { label: 'Dribbles' },
//                             ].map((v, i) => (
//                                 <div key={i}>
//                                     <div className="overflow-hidden rounded-[12px]">
//                                         {player.videoUrl ? (
//                                             <iframe
//                                                 src={player.videoUrl}
//                                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                                 allowFullScreen
//                                                 className="aspect-video w-full rounded-[12px] bg-gray-800"
//                                             />
//                                         ) : (
//                                             <div className="flex aspect-video w-full flex-col items-center justify-center rounded-[12px] bg-gray-800">
//                                                 <Video className="mb-2 h-10 w-10 text-white/30" />
//                                                 <p className="text-sm text-white/40">No video yet</p>
//                                             </div>
//                                         )}
//                                     </div>
//                                     <p className="py-2 text-center text-[16px] font-bold text-white">{v.label}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                     {/* IN-CONTENT AD (mobile only) */}
//                     <aside className="block space-y-3 lg:hidden">
//                         <p className="text-[10px] tracking-wider text-[#94A3B8] uppercase">Sponsored</p>
//                         <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#222] bg-[#464646] p-5 py-12 text-center">
//                             <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
//                         </div>
//                     </aside>
//                     {/* CLUB HISTORY */}
//                     <section className="overflow-hidden">
//                         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
//                             {/* Transfer History */}
//                             <div className="rounded-xl border border-slate-800 bg-[#06111d] p-6">
//                                 <h2 className="mb-6 text-[13px] font-bold text-white uppercase md:text-[18px]">
//                                     Transfer History <span className="font-medium text-slate-400">(Last 10 Years)</span>
//                                 </h2>
//                                 <div className="space-y-3">
//                                     {transferHistory.map((item, index) => (
//                                         <div key={index} className="flex items-center gap-2 md:gap-4">
//                                             <span className="w-8 text-[10px] font-medium text-slate-300 sm:text-[13px] md:w-12 md:text-[16px]">{item.year}</span>
//                                             <div className="h-6 w-6 flex-shrink-0 rounded-full border border-slate-600 bg-slate-700 md:h-8 md:w-8">
//                                                 <img src={item.img} alt="" />
//                                             </div>
//                                             <span className="text-[10px] text-white sm:text-[13px] md:text-base">{item.club}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             {/* Positions */}
//                             <div className="rounded-xl border border-slate-800 bg-[#06111d] p-5">
//                                 <h2 className="mb-6 text-[13px] font-bold text-white uppercase md:text-[18px]">Positions On The Pitch</h2>
//                                 <Pitch />
//                                 <div className="mt-6 space-y-2 text-[11px] font-bold text-white uppercase md:text-[16px]">
//                                     <p>
//                                         <span className="mb-3 text-[13px] font-bold text-white uppercase md:text-[18px]">Main Position:</span> Right Winger
//                                     </p>
//                                     <p>
//                                         <span className="text-[13px] font-bold text-white uppercase md:text-[18px]">Secondary:</span> Attacking Midfielder, Central Midfielder
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                     {/* ACHIEVEMENTS + DESCRIPTION */}
//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-[400px_1fr]">
//                         {/* Achievements */}
//                         <div className="rounded-lg border border-[#1b2a3d] bg-[#0b1523] p-5">
//                             <h2 className="mb-5 text-[12px] font-semibold text-white uppercase md:text-sm">Achievements</h2>
//                             <div className="space-y-2 md:space-y-4">
//                                 {achievements.map((item, index) => (
//                                     <div key={index} className="flex items-start gap-1 md:gap-3">
//                                         <span className="text-[12px] text-yellow-500 md:text-sm">🏆</span>
//                                         <div className="flex gap-3 md:grid md:grid-cols-[100px_1fr]">
//                                             <p className="text-[12px] font-medium text-orange-500 md:text-sm">{item.year}</p>
//                                             <p className="text-[10px] leading-relaxed text-gray-300 md:text-sm">{item.title}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <button className="mt-6 text-[12px] font-medium text-orange-500 transition hover:text-orange-400 md:text-sm">
//                                 View all achievements →
//                             </button>
//                         </div>
//                         {/* Player Description */}
//                         <div className="rounded-lg border border-[#1b2a3d] bg-[#0b1523] p-5">
//                             <h2 className="mb-4 text-[12px] font-semibold text-white uppercase md:text-sm">
//                                 Player Description <span className="font-normal text-gray-500">(UP TO 500 WORDS)</span>
//                             </h2>
//                             <div className="w-full">
//                                 <p className="min-h-48 w-full rounded-lg border border-[#1b2a3d] bg-[#08111d] p-2 text-gray-300 md:p-4">
//                                     Write a detailed description of the player's qualities, strengths, style of play, mentality, and other relevant information...
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     {/* IN-CONTENT AD (mobile only) */}
//                     <aside className="block space-y-3 lg:hidden">
//                         <p className="text-[10px] tracking-wider text-[#94A3B8] uppercase">Sponsored</p>
//                         <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#222] bg-[#464646] p-5 py-12 text-center">
//                             <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
//                         </div>
//                     </aside>
//                     {/* COMPETITIONS + RECENT MATCHES */}
//                     <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.25fr]">
//                         {/* Competition History */}
//                         <div className="rounded-lg border border-[#152538] bg-[#07111d] p-4 md:p-6">
//                             <h2 className="mb-6 text-[14px] font-bold text-white uppercase md:text-xl">Competition History</h2>
//                             <div className="space-y-2 md:space-y-4">
//                                 {competitions.map((item, index) => (
//                                     <div key={index} className="flex items-start justify-between gap-2 md:gap-4">
//                                         <div className="flex items-start gap-1 md:gap-3">
//                                             <Trophy size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gray-300" />
//                                             <span className="text-[10px] text-gray-200 md:text-sm">{item.name}</span>
//                                         </div>
//                                         <span className="text-[10px] whitespace-nowrap text-[#f97316] md:text-sm">{item.year}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="mt-8 flex justify-end">
//                                 <button className="flex items-center gap-2 text-[13px] text-[#f97316] transition hover:text-orange-400 md:text-[18px]">
//                                     View all competitions
//                                     <ChevronRight size={22} />
//                                 </button>
//                             </div>
//                         </div>
//                         {/* Recent Matches */}
//                         <div className="overflow-hidden rounded-lg border border-[#152538] bg-[#07111d] p-6">
//                             <h2 className="mb-6 text-[14px] font-bold text-white uppercase md:text-xl">Recent Matches</h2>
//                             <div className="overflow-x-auto">
//                                 <table className="w-full">
//                                     <thead>
//                                         <tr className="border-b border-gray-300/10 text-left text-[12px] text-gray-300 uppercase md:text-sm">
//                                             <th className="pb-4">Match</th>
//                                             <th className="pb-4 text-center">Goals</th>
//                                             <th className="px-2 pb-4 text-center">Assists</th>
//                                             <th className="pb-4 text-center">Minutes</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {matches.map((match, index) => (
//                                             <tr key={index} className="border-b border-gray-300/10 text-[10px] text-gray-200 md:text-[14px]">
//                                                 <td className="py-3">
//                                                     <div className="flex items-center gap-2 md:gap-4">
//                                                         <span>{match.home}</span>
//                                                         <span className="font-semibold">{match.score}</span>
//                                                         <span>{match.away}</span>
//                                                     </div>
//                                                 </td>
//                                                 <td className="py-3 text-center">{match.goals}</td>
//                                                 <td className="py-3 text-center">{match.assists}</td>
//                                                 <td className="py-3 text-center">{match.minutes}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <div className="mt-8 flex justify-end">
//                                 <button className="flex items-center gap-2 text-[14px] text-[#f97316] transition hover:text-orange-400 md:text-[18px]">
//                                     View all matches
//                                     <ChevronRight size={22} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//             <PublicFooter />
//         </div>
//     );
// }
var react_1 = require("react");
var react_2 = require("@inertiajs/react");
var react_country_flag_1 = require("react-country-flag");
var lucide_react_1 = require("lucide-react");
var PublicNavbar_1 = require("@/components/public/PublicNavbar");
var PublicFooter_1 = require("@/components/public/PublicFooter");
var pitch_1 = require("@/components/ui/pitch");
// MOCK DATA
var player = {
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
    description: 'Fast, focused player with exceptional game vision and strong ball control. Comfortable in tight spaces, confident in 1v1 situations and excellent at creating chances from wide positions.',
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
    isVerified: true
};
var transferHistory = [
    { year: 2024, club: "São Cristóvão - RJ", img: "/images/club-logo/cl-1.png" },
    { year: 2023, club: "Bangu - RJ", img: "/images/club-logo/cl-2.png" },
    { year: 2022, club: "Portuguesa RJ - RJ", img: "/images/club-logo/cl-3.png" },
    { year: 2021, club: "Madureira - RJ", img: "/images/club-logo/cl-4.png" },
    { year: 2020, club: "Flamengo U-17 - RJ", img: "/images/club-logo/cl-5.png" },
    { year: 2019, club: "Fluminense U-15 - RJ", img: "/images/club-logo/cl-6.png" },
    { year: 2018, club: "Nova Iguaçu - RJ", img: "/images/club-logo/cl-7.png" },
    { year: 2017, club: "Boa Vista - RJ", img: "/images/club-logo/cl-8.png" },
    { year: 2016, club: "Serrano - RJ", img: "/images/club-logo/cl-9.png" },
    { year: 2015, club: "Macaé - RJ", img: "/images/club-logo/cl-10.png" },
];
var achievements = [
    { year: "2024", title: "Copinha" },
    { year: "2025", title: "Gaúcho U-20" },
    { year: "2025", title: "BH Cup" },
    { year: "2019", title: "Gazetinha Cup" },
    { year: "2019", title: "Rio Grande do Sul State Championship U11" },
];
var competitions = [
    { name: "Copinha", year: "2024" },
    { name: "Gaúcho U-20", year: "2025" },
    { name: "BH Cup", year: "2025" },
    { name: "Gazetinha Cup", year: "2019" },
    { name: "Rio Grande do Sul State Championship U11", year: "2019" },
];
var matches = [
    { home: "São Cristóvão", score: "3 x 1", away: "Juventude", goals: 1, assists: 0, minutes: "90'" },
    { home: "São Cristóvão", score: "2 x 2", away: "Grêmio", goals: 0, assists: 1, minutes: "90'" },
    { home: "São Cristóvão", score: "4 x 0", away: "Internacional", goals: 2, assists: 0, minutes: "90'" },
];
var viewerRole = 'scout';
function StarRating(_a) {
    var value = _a.value, onChange = _a.onChange;
    return (react_1["default"].createElement("div", { className: "flex gap-1" }, [1, 2, 3, 4, 5].map(function (n) { return (react_1["default"].createElement("button", { key: n, type: "button", onClick: function () { return onChange(n); }, className: "transition-transform hover:scale-110", "aria-label": "Rate " + n + " stars" },
        react_1["default"].createElement(lucide_react_1.Star, { className: "h-5 w-5 " + (n <= value ? 'fill-[#FF6B00] text-[#FF6B00]' : 'text-[#FCD9BD] dark:text-[#2A2A2A]') }))); })));
}
function NewDetail() {
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-black pt-16 xl:pt-20 2xl:pt-24 dark:bg-[#0D0D0D]" },
        react_1["default"].createElement(PublicNavbar_1["default"], null),
        react_1["default"].createElement("div", { className: "mx-auto max-w-7xl bg-black px-4 py-3 sm:px-6 dark:border-[#2A2A2A] dark:bg-[#0D0D0D]" },
            react_1["default"].createElement("nav", { className: "flex items-center gap-1.5 text-sm text-[#475569] dark:text-[#9A9A9A]" },
                react_1["default"].createElement(react_2.Link, { href: "/", className: "whitespace-nowrap hover:text-[#FF6B00]" }, "Home"),
                react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "h-3.5 w-3.5 text-[#CBD5E1] dark:text-[#555]" }),
                react_1["default"].createElement(react_2.Link, { href: "/players", className: "whitespace-nowrap hover:text-[#FF6B00]" }, "Players"),
                react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "h-3.5 w-3.5 text-[#CBD5E1] dark:text-[#555]" }),
                react_1["default"].createElement("span", { className: "font-medium whitespace-nowrap text-[#FF6B00] dark:text-[#F5F5F5]" }, "Joao da Silva"))),
        react_1["default"].createElement("div", { className: "mx-auto max-w-7xl px-4 py-2 sm:px-6" },
            react_1["default"].createElement("main", { className: "min-w-0 space-y-6 overflow-x-hidden" },
                react_1["default"].createElement("section", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start" },
                    react_1["default"].createElement("div", { className: "flex gap-4 text-white sm:gap-6 " },
                        react_1["default"].createElement("div", { className: "shrink-0" },
                            react_1["default"].createElement("img", { src: "/images/img/player-1.png", alt: "Player", className: "h-[160px] w-[120px] rounded-md border border-[#233247] object-cover sm:h-[190px] sm:w-[145px] lg:h-[210px] lg:w-[160px]" })),
                        react_1["default"].createElement("div", { className: "min-w-0 flex-1" },
                            react_1["default"].createElement("h1", { className: "text-2xl font-bold tracking-wide uppercase md:text-3xl" }, "JO\u00C3O DA SILVA"),
                            react_1["default"].createElement("h3", { className: "mt-1 text-base font-semibold text-[#eb6c0d] uppercase md:text-lg" }, "Right Winger"),
                            react_1["default"].createElement("div", { className: "mt-3 space-y-1.25 text-sm md:text-base" },
                                react_1["default"].createElement("div", { className: "flex items-center" },
                                    react_1["default"].createElement(lucide_react_1.CalendarDays, { className: "mr-2 h-4 w-4 shrink-0 text-[#ff6100] md:h-5 md:w-5" }),
                                    react_1["default"].createElement("span", { className: "text-[#e1e2e6]" }, "Date of Birth / Age:"),
                                    react_1["default"].createElement("span", { className: "pl-2 text-gray-300" }, "Jan 30, 2007 (19)")),
                                react_1["default"].createElement("div", { className: "flex items-center" },
                                    react_1["default"].createElement(lucide_react_1.Users, { className: "mr-2 h-4 w-4 shrink-0 text-[#ff6100] md:h-5 md:w-5" }),
                                    react_1["default"].createElement("span", { className: "pr-3 text-[#e1e2e6]" }, "Nationality:"),
                                    react_1["default"].createElement(react_country_flag_1["default"], { countryCode: "BR", svg: true, className: "mr-1" }),
                                    react_1["default"].createElement("span", null, "Brazil"),
                                    react_1["default"].createElement("span", { className: "px-1" }, "/"),
                                    react_1["default"].createElement(react_country_flag_1["default"], { countryCode: "IT", svg: true, className: "mr-1" }),
                                    react_1["default"].createElement("span", null, "Italy III")),
                                react_1["default"].createElement("div", { className: "flex items-center" },
                                    react_1["default"].createElement(lucide_react_1.Ruler, { className: "mr-2 h-4 w-4 shrink-0 text-[#ff6100] md:h-5 md:w-5" }),
                                    react_1["default"].createElement("span", { className: "text-[#e1e2e6]" }, "Height:"),
                                    react_1["default"].createElement("span", { className: "pl-2 text-gray-100" }, "1.84 m")),
                                react_1["default"].createElement("div", { className: "flex items-center" },
                                    react_1["default"].createElement(lucide_react_1.Crosshair, { className: "mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" }),
                                    react_1["default"].createElement("span", { className: "text-[#e1e2e6]" }, "Position:"),
                                    react_1["default"].createElement("span", { className: "pl-2 text-gray-100" }, "Right Winger")),
                                react_1["default"].createElement("div", { className: "flex items-center" },
                                    react_1["default"].createElement(lucide_react_1.Footprints, { className: "mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" }),
                                    react_1["default"].createElement("span", { className: "text-[#e1e2e6]" }, "Dominant Foot:"),
                                    react_1["default"].createElement("span", { className: "pl-2 text-gray-100" }, "Right")),
                                react_1["default"].createElement("div", { className: "flex items-center" },
                                    react_1["default"].createElement(lucide_react_1.Shield, { className: "mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" }),
                                    react_1["default"].createElement("span", { className: "text-[#e1e2e6]" }, "Current Club:"),
                                    react_1["default"].createElement("span", { className: "pl-2 text-gray-100" }, "S\u00E3o Cristov\u00E3o")),
                                react_1["default"].createElement("div", { className: "flex items-center" },
                                    react_1["default"].createElement(lucide_react_1.Shirt, { className: "mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" }),
                                    react_1["default"].createElement("span", { className: "text-[#e1e2e6]" }, "Previous Club:"),
                                    react_1["default"].createElement("span", { className: "pl-2 text-gray-100" }, "Bangu"))))),
                    react_1["default"].createElement("div", { className: "w-full" },
                        react_1["default"].createElement("p", { className: "mb-2 text-[16px] font-bold text-white" }, "HIGHLIGHTS VIDEO"),
                        react_1["default"].createElement("div", { className: "overflow-hidden rounded-2xl" }, player.videoUrl ? (react_1["default"].createElement("iframe", { src: player.videoUrl, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, className: "aspect-video w-full rounded-2xl bg-gray-800" })) : (react_1["default"].createElement("div", { className: "flex aspect-video w-full flex-col items-center justify-center rounded-2xl bg-gray-800" },
                            react_1["default"].createElement(lucide_react_1.Video, { className: "mb-2 h-12 w-12 text-white/30" }),
                            react_1["default"].createElement("p", { className: "text-sm text-white/40" }, "No highlights uploaded yet")))),
                        react_1["default"].createElement("div", { className: "mt-2 flex items-center justify-between text-[14px] text-white" },
                            react_1["default"].createElement("h3", null, "Jo\u00E3o da Silva - Best Moments 2024/2025"),
                            react_1["default"].createElement("span", null, "07:32")))),
                react_1["default"].createElement("section", null,
                    react_1["default"].createElement("div", { className: "grid gap-5 grid-cols-3" }, [
                        { label: 'Goals' },
                        { label: 'Assists' },
                        { label: 'Dribbles' },
                    ].map(function (v, i) { return (react_1["default"].createElement("div", { key: i },
                        react_1["default"].createElement("div", { className: "overflow-hidden rounded-[12px] " }, player.videoUrl ? (react_1["default"].createElement("iframe", { src: player.videoUrl, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, className: "aspect-video w-full rounded-[12px] bg-gray-800" })) : (react_1["default"].createElement("div", { className: "flex aspect-video w-full flex-col items-center justify-center rounded-[12px] bg-gray-800" },
                            react_1["default"].createElement(lucide_react_1.Video, { className: "mb-2 h-10 w-10 text-white/30" }),
                            react_1["default"].createElement("p", { className: "text-sm text-white/40" }, "No video yet")))),
                        react_1["default"].createElement("p", { className: "py-2 text-center text-[16px] font-bold text-white" }, v.label))); }))),
                react_1["default"].createElement("aside", { className: "block space-y-3 lg:hidden" },
                    react_1["default"].createElement("p", { className: "text-[10px] tracking-wider text-[#94A3B8] uppercase" }, "Sponsored"),
                    react_1["default"].createElement("div", { className: "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#222] bg-[#464646] p-5 py-12 text-center" },
                        react_1["default"].createElement("p", { className: "text-sm font-medium tracking-widest text-white/50 uppercase" }, "ADVERTISING SPACE"))),
                react_1["default"].createElement("section", { className: "overflow-hidden" },
                    react_1["default"].createElement("div", { className: "grid gap-2 grid-cols-2 md:gap-4" },
                        react_1["default"].createElement("div", { className: "rounded-xl border border-slate-800 bg-[#06111d] p-6" },
                            react_1["default"].createElement("h2", { className: "mb-6 text-[13px] font-bold text-white uppercase md:text-[18px]" },
                                "Transfer History ",
                                react_1["default"].createElement("span", { className: "font-medium text-slate-400" }, "(Last 10 Years)")),
                            react_1["default"].createElement("div", { className: "space-y-3" }, transferHistory.map(function (item, index) { return (react_1["default"].createElement("div", { key: index, className: "flex items-center gap-2 md:gap-4" },
                                react_1["default"].createElement("span", { className: "w-8 text-[10px] font-medium text-slate-300 sm:text-[13px] md:w-12 md:text-[16px]" }, item.year),
                                react_1["default"].createElement("div", { className: "h-6 w-6 flex-shrink-0 rounded-full border border-slate-600 bg-slate-700 md:h-8 md:w-8" },
                                    react_1["default"].createElement("img", { src: item.img, alt: "" })),
                                react_1["default"].createElement("span", { className: "text-[10px] text-white sm:text-[13px] md:text-base" }, item.club))); }))),
                        react_1["default"].createElement("div", { className: "rounded-xl border border-slate-800 bg-[#06111d] p-5" },
                            react_1["default"].createElement("h2", { className: "mb-6 text-[13px] font-bold text-white uppercase md:text-[18px]" }, "Positions On The Pitch"),
                            react_1["default"].createElement(pitch_1.Pitch, null),
                            react_1["default"].createElement("div", { className: "mt-6 space-y-2 text-[11px] font-bold text-white uppercase md:text-[16px]" },
                                react_1["default"].createElement("p", null,
                                    react_1["default"].createElement("span", { className: "mb-3 text-[13px] font-bold text-white uppercase md:text-[18px]" }, "Main Position:"),
                                    " Right Winger"),
                                react_1["default"].createElement("p", null,
                                    react_1["default"].createElement("span", { className: "text-[13px] font-bold text-white uppercase md:text-[18px]" }, "Secondary:"),
                                    " Attacking Midfielder, Central Midfielder"))))),
                react_1["default"].createElement("div", { className: "grid grid-cols-2 sm:grid-cols-[250px_1fr] gap-2 md:gap-4 md:grid-cols-[400px_1fr]" },
                    react_1["default"].createElement("div", { className: "rounded-lg border border-[#1b2a3d] bg-[#0b1523] p-5" },
                        react_1["default"].createElement("h2", { className: "mb-5 text-[12px] font-semibold text-white uppercase md:text-sm" }, "Achievements"),
                        react_1["default"].createElement("div", { className: "space-y-2 md:space-y-4" }, achievements.map(function (item, index) { return (react_1["default"].createElement("div", { key: index, className: "flex items-start gap-1 md:gap-3" },
                            react_1["default"].createElement("span", { className: "text-[12px] text-yellow-500 md:text-sm" }, "\uD83C\uDFC6"),
                            react_1["default"].createElement("div", { className: "flex gap-3 md:grid md:grid-cols-[100px_1fr]" },
                                react_1["default"].createElement("p", { className: "text-[12px] font-medium text-orange-500 md:text-sm" }, item.year),
                                react_1["default"].createElement("p", { className: "text-[10px] leading-relaxed text-gray-300 md:text-sm" }, item.title)))); })),
                        react_1["default"].createElement("button", { className: "mt-6 text-[12px] font-medium text-orange-500 transition hover:text-orange-400 md:text-sm" }, "View all achievements \u2192")),
                    react_1["default"].createElement("div", { className: "rounded-lg border border-[#1b2a3d] bg-[#0b1523] p-5" },
                        react_1["default"].createElement("h2", { className: "mb-4 text-[12px] font-semibold text-white uppercase md:text-sm" },
                            "Player Description ",
                            react_1["default"].createElement("span", { className: "font-normal text-gray-500" }, "(UP TO 500 WORDS)")),
                        react_1["default"].createElement("div", { className: "w-full" },
                            react_1["default"].createElement("p", { className: "min-h-48 w-full rounded-lg border border-[#1b2a3d] bg-[#08111d] p-2 text-gray-300 md:p-4" }, "Write a detailed description of the player's qualities, strengths, style of play, mentality, and other relevant information...")))),
                react_1["default"].createElement("aside", { className: "block space-y-3 lg:hidden" },
                    react_1["default"].createElement("p", { className: "text-[10px] tracking-wider text-[#94A3B8] uppercase" }, "Sponsored"),
                    react_1["default"].createElement("div", { className: "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#222] bg-[#464646] p-5 py-12 text-center" },
                        react_1["default"].createElement("p", { className: "text-sm font-medium tracking-widest text-white/50 uppercase" }, "ADVERTISING SPACE"))),
                react_1["default"].createElement("div", { className: "grid grid-cols-2 sm:grid-cols-[1fr_1.50fr] gap-2 md:gap-4 lg:grid-cols-[1fr_1.25fr]" },
                    react_1["default"].createElement("div", { className: "rounded-lg border border-[#152538] bg-[#07111d] p-4 md:p-6" },
                        react_1["default"].createElement("h2", { className: "mb-6 text-[14px] font-bold text-white uppercase md:text-xl" }, "Competition History"),
                        react_1["default"].createElement("div", { className: "space-y-2 md:space-y-4" }, competitions.map(function (item, index) { return (react_1["default"].createElement("div", { key: index, className: "flex items-start justify-between gap-2 md:gap-4" },
                            react_1["default"].createElement("div", { className: "flex items-start gap-1 md:gap-3" },
                                react_1["default"].createElement(lucide_react_1.Trophy, { size: 18, strokeWidth: 1.5, className: "mt-0.5 shrink-0 text-gray-300" }),
                                react_1["default"].createElement("span", { className: "text-[10px] text-gray-200 md:text-sm" }, item.name)),
                            react_1["default"].createElement("span", { className: "text-[10px] whitespace-nowrap text-[#f97316] md:text-sm" }, item.year))); })),
                        react_1["default"].createElement("div", { className: "mt-8 flex justify-end" },
                            react_1["default"].createElement("button", { className: "flex items-center gap-2 text-[13px] text-[#f97316] transition hover:text-orange-400 md:text-[18px]" },
                                "View all competitions",
                                react_1["default"].createElement(lucide_react_1.ChevronRight, { size: 22 })))),
                    react_1["default"].createElement("div", { className: "overflow-hidden rounded-lg border border-[#152538] bg-[#07111d] p-6" },
                        react_1["default"].createElement("h2", { className: "mb-6 text-[14px] font-bold text-white uppercase md:text-xl" }, "Recent Matches"),
                        react_1["default"].createElement("div", { className: "overflow-x-auto" },
                            react_1["default"].createElement("table", { className: "w-full" },
                                react_1["default"].createElement("thead", null,
                                    react_1["default"].createElement("tr", { className: "border-b border-gray-300/10 text-left text-[12px] text-gray-300 uppercase md:text-sm" },
                                        react_1["default"].createElement("th", { className: "pb-4" }, "Match"),
                                        react_1["default"].createElement("th", { className: "pb-4 text-center" }, "Goals"),
                                        react_1["default"].createElement("th", { className: "px-2 pb-4 text-center" }, "Assists"),
                                        react_1["default"].createElement("th", { className: "pb-4 text-center" }, "Minutes"))),
                                react_1["default"].createElement("tbody", null, matches.map(function (match, index) { return (react_1["default"].createElement("tr", { key: index, className: "border-b border-gray-300/10 text-[10px] text-gray-200 md:text-[14px]" },
                                    react_1["default"].createElement("td", { className: "py-3" },
                                        react_1["default"].createElement("div", { className: "flex items-center gap-2 md:gap-4" },
                                            react_1["default"].createElement("span", null, match.home),
                                            react_1["default"].createElement("span", { className: "font-semibold" }, match.score),
                                            react_1["default"].createElement("span", null, match.away))),
                                    react_1["default"].createElement("td", { className: "py-3 text-center" }, match.goals),
                                    react_1["default"].createElement("td", { className: "py-3 text-center" }, match.assists),
                                    react_1["default"].createElement("td", { className: "py-3 text-center" }, match.minutes))); })))),
                        react_1["default"].createElement("div", { className: "mt-8 flex justify-end" },
                            react_1["default"].createElement("button", { className: "flex items-center gap-2 text-[14px] text-[#f97316] transition hover:text-orange-400 md:text-[18px]" },
                                "View all matches",
                                react_1["default"].createElement(lucide_react_1.ChevronRight, { size: 22 }))))))),
        react_1["default"].createElement(PublicFooter_1.PublicFooter, null)));
}
exports["default"] = NewDetail;
