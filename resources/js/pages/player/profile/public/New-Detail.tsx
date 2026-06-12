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
        { year: 2024, club: "São Cristóvão - RJ" },
        { year: 2023, club: "Bangu - RJ" },
        { year: 2022, club: "Portuguesa RJ - RJ" },
        { year: 2021, club: "Madureira - RJ" },
        { year: 2020, club: "Flamengo U-17 - RJ" },
        { year: 2019, club: "Fluminense U-15 - RJ" },
        { year: 2018, club: "Nova Iguaçu - RJ" },
        { year: 2017, club: "Boa Vista - RJ" },
        { year: 2016, club: "Serrano - RJ" },
        { year: 2015, club: "Macaé - RJ" },
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
        <div className="min-h-screen bg-[#F4F6F9] dark:bg-[#0D0D0D] pt-16">
            <PublicNavbar />

            {/* BREADCRUMB */}
            <div className="bg-white dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#2A2A2A] py-3 px-4 sm:px-6">
                <nav className="max-w-[1400px] mx-auto flex items-center gap-1.5 text-sm text-[#475569] dark:text-[#9A9A9A] overflow-x-auto">
                    <Link
                        href="/"
                        className="hover:text-[#FF6B00] dark:hover:text-[#FF6B00] whitespace-nowrap"
                    >
                        Home
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1] dark:text-[#555]" />
                    <Link
                        href="/players"
                        className="hover:text-[#FF6B00] dark:hover:text-[#FF6B00] whitespace-nowrap"
                    >
                        Players
                    </Link>
                   
                    <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1] dark:text-[#555]" />
                    <span className="text-[#0F172A] dark:text-[#F5F5F5] font-medium whitespace-nowrap">
            Joao da Silva
          </span>
                </nav>
            </div>

            {/* 3-COLUMN LAYOUT */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">

                {/* CENTER COLUMN */}
                <main className="min-w-0 space-y-4 overflow-x-hidden">
                    {/* IDENTITY CARD */}
                    {/* <section className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8"> */}
                    
                        <div className="w-full max-w-7xl text-white overflow-hidden">
            <div className="flex">
                
                {/* Left Image Section */}
                <div className="md:w-[320px] p-2">
                    <div className="border border-[#233247] rounded-md overflow-hidden">
                        <img
                            src="/images/img/player-1.png"
                            alt="Player"
                            className="w-[100] h-[130px] md:w-full md:h-auto object-cover"
                        />
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 px-3 sm:px-8">
                    <h1 className="text-[18px] font-bold md:text-3xl md:font-extrabold uppercase tracking-wide">
                        JOÃO DA SILVA
                    </h1>

                    <h3 className="text-[#ff7a00] text-[14px] md:text-[16px] uppercase mt-2">
                        Right Winger
                    </h3>

                    <div className="mt-3 space-y-3 text-[10px] md:text-[16px]">
                        {/* Row */}
                        <div className="flex">
                            <CalendarDays className="w-3 h-3 md:w-5 md:h-5 text-orange-500 mr-1 md:mr-2" />
                            <span className="text-gray-300">
                                Date of Birth / Age:
                            </span>
                            <span className="text-gray-300 pl-2">Jan 30, 2007 (19)</span>
                        </div>

                        {/* Row */}
                        <div className="flex">
                            <Users className="w-3 h-3 md:w-5 md:h-5 text-orange-500 mr-1 md:mr-2" />
                            <span className="text-gray-300 pr-3">
                                Nationality:
                            </span>
                            <ReactCountryFlag
                              countryCode="BR"
                              svg
                              className="mr-1 mt-[2px] md:mt-1 md:w-[1em] md:h-[1em]"
                            />
                            <span className="">Brazil</span>
                            <span className="px-1">/</span>
                             <ReactCountryFlag
                                countryCode="IT"
                                  svg
                                 className="mr-1 mt-[2px] md:mt-1 md:w-[1em] md:h-[1em]"
                                />
                            <span>Italy III</span>
                        </div>

                        {/* Row */}
                        <div className="flex">
                            <Ruler className="w-3 h-3 md:w-5 md:h-5 text-orange-500 mr-1 md:mr-2"  />
                            <span className="text-gray-300">Height:</span>
                            <span className="text-gray-100 pl-2">1.84 m</span>
                        </div>

                        {/* Row */}
                        <div className="flex">
                            <Crosshair className="w-3 h-3 md:w-5 md:h-5 text-orange-500 mr-1 md:mr-2"  />
                            <span className="text-gray-300">Position:</span>
                            <span className="text-gray-100 pl-2">Right Winger</span>
                        </div>

                        {/* Row */}
                        <div className="flex">
                            <Footprints className="w-3 h-3 md:w-5 md:h-5 text-orange-500 mr-1 md:mr-2"  />
                            <span className="text-gray-300">
                                Dominant Foot:
                            </span>
                            <span className="text-gray-100 pl-2">Right</span>
                        </div>

                        {/* Row */}
                        <div className="flex">
                            <Shield className="w-3 h-3 md:w-5 md:h-5 text-orange-500 mr-1 md:mr-2"  />
                            <span className="text-gray-300">
                                Current Club:
                            </span>
                            <span className="text-gray-100 pl-2">São Cristovão</span>
                        </div>

                        {/* Row */}
                        <div className="flex">
                            <Shirt className="w-3 h-3 md:w-5 md:h-5 text-orange-500 mr-1 md:mr-2"  />
                            <span className="text-gray-300">
                                Previous Club:
                            </span>
                            <span className="text-gray-100 pl-2">Bangu</span>
                        </div>
                    </div>
                </div>



                 {/* RIGHT AD COLUMN */}
                <aside className="hidden lg:block space-y-3">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                        Sponsored
                    </p>


                     <div className="bg-[#111] rounded-2xl border border-[#222] p-5 flex flex-col items-center justify-center relative overflow-hidden text-center w-[320px] h-[350px]">
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                background:
                                    'radial-gradient(circle at 50% 0%, #FF6B00 0%, transparent 60%)',
                            }}
                        />
                        <span className="text-white/10 font-black text-[100px] leading-none absolute -top-4 select-none">
              ✓
            </span>
                        <div className="relative z-10 flex flex-col items-center">
              <span className="text-white font-black text-2xl tracking-tight">
                NIKE FC
              </span>
                            <div className="bg-[#FF6B00] w-8 h-0.5 mx-auto my-2" />
                            <span className="text-white/70 text-sm">2025 Season Boots</span>
                            <span className="text-white/60 text-xs tracking-widest mt-2">
                MERCURIAL VAPOR
              </span>
                            <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold px-6 py-2 rounded-lg text-sm mt-3 transition-colors">
                                SHOP NOW →
                            </button>
                        </div>
                    </div>
                    
                </aside>
            </div>
        </div>



                    {/* VIDEO SECTION */}
                    <section className="mt-6">
                        <p className="pb-8 font-bold text-xl">HIGHLIGHTS VIDEO</p>
                    <div className=" overflow-hidden relative">
                        <div className="aspect-video w-full relative">
                            {player.videoUrl ? (
                                <>
                                    <iframe
                                        src={player.videoUrl}
                                        // title={`${player.name} highlights`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full bg-gray-500 rounded-2xl"
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
                                    <Video className="text-white/30 w-12 h-12 mb-2" />
                                    <p className="text-white/40 text-sm">
                                        No highlights uploaded yet
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center py-2 text-[16px]">
                            <h3>João da Silva - Best Moments 2024/2025</h3>
                            <span>07:32</span>
                        </div>
                    </div>

                    <div className="mt-12 overflow-hidden relative grid grid-cols-3 gap-5">

                        {/* sub video 1 */}
                        <div>
                        <div className="aspect-video w-full relative rounded-[16px]">
                            {player.videoUrl ? (
                                <>
                                    <iframe
                                        src={player.videoUrl}
                                        // title={`${player.name} highlights`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full rounded-[12px] bg-gray-500"
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
                                    <Video className="text-white/30 w-12 h-12 mb-2" />
                                    <p className="text-white/40 text-sm">
                                        No highlights uploaded yet
                                    </p>
                                </div>
                            )}

                            </div>
                            <p className="bold text-[16px] text-center py-2">Goals</p>
                        </div>

                        {/* sub video 2 */}
                        <div>
                         <div className="aspect-video w-full relative">
                            {player.videoUrl ? (
                                <>
                                    <iframe
                                        src={player.videoUrl}
                                        // title={`${player.name} highlights`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full rounded-[12px] bg-gray-500"
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
                                    <Video className="text-white/30 w-12 h-12 mb-2" />
                                    <p className="text-white/40 text-sm">
                                        No highlights uploaded yet
                                    </p>
                                </div>
                            )}


                            </div>
                            <p className="bold text-[16px] text-center py-2">Assists</p>
                        </div>


                        {/* sub video 3 */}
                        <div>
                         <div className="aspect-video w-full relative rounded-[16px]">
                            {player.videoUrl ? (
                                <>
                                    <iframe
                                        src={player.videoUrl}
                                        // title={`${player.name} highlights`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full rounded-[12px] bg-gray-500"
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
                                    <Video className="text-white/30 w-12 h-12 mb-2" />
                                    <p className="text-white/40 text-sm">
                                        No highlights uploaded yet
                                    </p>
                                </div>
                            )}

                            
                        </div>
                        <p className="bold text-[16px] text-center py-2">Dribbles</p>
                        </div>


                    </div>
                    </section>


{/* IN-CONTENT AD */}
 <aside className="block lg:hidden space-y-3">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                        Sponsored
                    </p>


                     <div className="bg-[#111] rounded-2xl border border-[#222] p-5 flex flex-col items-center justify-center relative overflow-hidden text-center min-h-[280px]">
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                background:
                                    'radial-gradient(circle at 50% 0%, #FF6B00 0%, transparent 60%)',
                            }}
                        />
                        <span className="text-white/10 font-black text-[100px] leading-none absolute -top-4 select-none">
              ✓
            </span>
                        <div className="relative z-10 flex flex-col items-center">
              <span className="text-white font-black text-2xl tracking-tight">
                NIKE FC
              </span>
                            <div className="bg-[#FF6B00] w-8 h-0.5 mx-auto my-2" />
                            <span className="text-white/70 text-sm">2025 Season Boots</span>
                            <span className="text-white/60 text-xs tracking-widest mt-2">
                MERCURIAL VAPOR
              </span>
                            <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold px-6 py-2 rounded-lg text-sm mt-3 transition-colors">
                                SHOP NOW →
                            </button>
                        </div>
                    </div>
                    
                </aside>

                    

              
                    {/* CLUB HISTORY */}
                    <section className="overflow-hidden">
                     <div className="flex gap-4 md:gap-6 md:grid md:grid-cols-2">
            {/* Transfer History */}
            <div className="bg-[#06111d] border border-slate-800 rounded-xl p-6">
                <h2 className="text-white text-[13px] md:text-[18px] font-bold uppercase mb-6">
                    Transfer History{" "}
                    <span className="text-slate-400 font-medium">
                        (Last 10 Years)
                    </span>
                </h2>

                <div className="space-y-3">
                    {transferHistory.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 md:gap-4"
                        >
                            <span className="text-slate-300 font-medium w-8 md:w-12 text-[10px] sm:text-[13px] md:text-[16px]">
                                {item.year}
                            </span>

                            {/* Club Logo */}
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-700 border border-slate-600 flex-shrink-0" />

                            <span className="text-white text-[10px] sm:text-[13px] md:text-base">
                                {item.club}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Positions */}
            <div className="bg-[#06111d] border border-slate-800 rounded-xl p-5">
                <h2 className="text-white text-[13px] md:text-[18px] font-bold uppercase mb-6">
                    Positions On The Pitch
                </h2>

                {/* Football Field */}
                {/* <div>
                    <img src="/images/img/football_field.png" alt=""
                     className="bg-cover bg-center bg-no-repeat w-full overflow-hidden"
                      />
                </div> */}


                <Pitch/>
               

                {/* Position Info */}
                <div className="mt-6 space-y-2 text-white text-[11px] md:text-[16px] font-bold uppercase">
                    <p>
                        <span className="text-white-400 text-[13px] md:text-[18px] font-bold uppercase mb-3">
                            Main Position:
                        </span>{" "}
                        Right Winger
                    </p>

                    <p>
                        <span className="text-white text-[13px] md:text-[18px] font-bold uppercase">
                            Secondary:
                        </span>{" "}
                        Attacking Midfielder, Central Midfielder
                    </p>
                </div>
            </div>
        </div>
                    </section>



                     {/* <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4"> */}
                     <div className="flex md:grid md:grid-cols-[400px_1fr] gap-4">
      {/* Achievements */}
      <div className="bg-[#0b1523] border border-[#1b2a3d] rounded-lg p-5">
        <h2 className="text-white text-[12px] md:text-sm font-semibold uppercase mb-5">
          Achievements
        </h2>

        <div className="space-y-2 md:space-y-4">
          {achievements.map((item, index) => (
            <div key={index} className="flex items-start gap-1 md:gap-3">
              <span className="text-yellow-500 text-[12px] md:text-sm">🏆</span>

              <div className="flex gap-3 md:grid md:grid-cols-[100px_1fr]">
                <p className="text-orange-500 text-[12px] md:text-sm font-medium">
                  {item.year}
                </p>
                <p className="text-gray-300 text-[10px] md:text-sm leading-relaxed">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 text-orange-500 text-[12px] md:text-sm font-medium hover:text-orange-400 transition">
          View all achievements →
        </button>
      </div>

      {/* Player Description */}
      <div className="bg-[#0b1523] border border-[#1b2a3d] rounded-lg p-5">
        <h2 className="text-white text-[12px] md:text-sm font-semibold uppercase mb-4">
          Player Description{" "}
          <span className="text-gray-500 font-normal">
            (UP TO 500 WORDS)
          </span>
        </h2>

        <div className="w-full">
          <p className="w-full h-48 bg-[#08111d] border border-[#1b2a3d] rounded-lg p-2 md:p-4 text-gray-300 placeholder:text-gray-500 resize-none outline-none focus:border-orange-500">
            Write a detailed description of the player's qualities, strengths, style of play, mentality, and other relevant information...
          </p>

          <span className="absolute bottom-3 right-4 text-xs text-gray-500">
            {/* 0 / 500 words */}
          </span>
        </div>
      </div>
    </div>


{/* IN-CONTENT AD */}
    <aside className="block lg:hidden space-y-3">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                        Sponsored
                    </p>


                     <div className="bg-[#111] rounded-2xl border border-[#222] p-5 flex flex-col items-center justify-center relative overflow-hidden text-center min-h-[280px]">
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                background:
                                    'radial-gradient(circle at 50% 0%, #FF6B00 0%, transparent 60%)',
                            }}
                        />
                        <span className="text-white/10 font-black text-[100px] leading-none absolute -top-4 select-none">
              ✓
            </span>
                        <div className="relative z-10 flex flex-col items-center">
              <span className="text-white font-black text-2xl tracking-tight">
                NIKE FC
              </span>
                            <div className="bg-[#FF6B00] w-8 h-0.5 mx-auto my-2" />
                            <span className="text-white/70 text-sm">2025 Season Boots</span>
                            <span className="text-white/60 text-xs tracking-widest mt-2">
                MERCURIAL VAPOR
              </span>
                            <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold px-6 py-2 rounded-lg text-sm mt-3 transition-colors">
                                SHOP NOW →
                            </button>
                        </div>
                    </div>
                    
                </aside>




    <div className="grid gap-4 grid-cols-[1fr_1.25fr]">
      {/* Competition History */}
      <div className="rounded-lg border border-[#152538] bg-[#07111d] p-4 md:p-6">
        <h2 className="mb-6 text-[14px] md:text-xl font-bold uppercase text-white">
          Competition History
        </h2>

        <div className="md:space-y-4 space-y-2">
          {competitions.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-2 md:gap-4"
            >
              <div className="flex items-start gap-1 md:gap-3">
                <Trophy
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 text-gray-300"
                />

                <span className="text-[10px] md:text-sm text-gray-200">
                  {item.name}
                </span>
              </div>

              <span className="text-[10px] md:text-sm text-[#f97316]">
                {item.year}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 text-[13px] md:text-[18px] text-[#f97316] transition hover:text-orange-400">
            View all competitions
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="rounded-lg border border-[#152538] bg-[#07111d] p-6 overflow-hidden">
        <h2 className="mb-6 text-[14px] md:text-xl font-bold uppercase text-white">
          Recent Matches
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[12px] md:text-sm uppercase text-gray-300 border-b-1 border-gray-300/10">
                <th className="pb-4">Match</th>
                <th className="pb-4 text-center">Goals</th>
                <th className="pb-4 text-center px-2">Assists</th>
                <th className="pb-4 text-center">Minutes</th>
              </tr>
            </thead>

            <tbody>
              {matches.map((match, index) => (
                <tr
                  key={index}
                  className="text-gray-200 border-b-1 text-[10px] md:text-[14px] border-gray-300/10"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2 md:gap-4">
                      <span>{match.home}</span>

                      <span className="font-semibold">
                        {match.score}
                      </span>

                      <span>{match.away}</span>
                    </div>
                  </td>

                  <td className="py-3 text-center ">
                    {match.goals}
                  </td>

                  <td className="py-3 text-center">
                    {match.assists}
                  </td>

                  <td className="py-3 text-center">
                    {match.minutes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 text-[14px] md:text-[18px] text-[#f97316] transition hover:text-orange-400">
            View all matches
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>

                </main>
                

            </div>

            {/* FOOTER SPACING */}
            <PublicFooter/>
        </div>
    );
}
