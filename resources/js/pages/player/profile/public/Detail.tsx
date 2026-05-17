import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
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
} from 'lucide-react';
import PublicNavbar from '@/components/public/PublicNavbar';

// MOCK DATA
const player = {
    id: 247,
    name: 'BENJAMIN SILVA',
    nickname: 'Benja',
    profileId: '#00247',
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

export default function Detail() {
    // const { player, viewerRole } = usePage<any>().props;
    const [technical, setTechnical] = useState(4);
    const [physical, setPhysical] = useState(4);
    const [mental, setMental] = useState(5);
    const [overall, setOverall] = useState(4);
    const [notes, setNotes] = useState('');

    const initials = player.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2);

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
                    <Link
                        href="/players?country=brazil"
                        className="hover:text-[#FF6B00] dark:hover:text-[#FF6B00] whitespace-nowrap"
                    >
                        Brazil
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1] dark:text-[#555]" />
                    <span className="text-[#0F172A] dark:text-[#F5F5F5] font-medium whitespace-nowrap">
            Benjamin Silva
          </span>
                </nav>
            </div>

            {/* LEADERBOARD AD */}
            <div className="bg-[#F4F6F9] dark:bg-[#0D0D0D] py-3 px-4 sm:px-6">
                <div className="max-w-[1400px] mx-auto">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2">
                        Sponsored
                    </p>
                    <div className="bg-[#111] rounded-xl h-[90px] max-w-[728px] mx-auto flex items-center px-4 sm:px-6 gap-3 sm:gap-4 relative overflow-hidden">
            <span className="text-white/5 absolute -right-4 top-1/2 -translate-y-1/2 font-black text-[100px] leading-none select-none">
              ✓
            </span>
                        <span className="text-white font-black text-2xl sm:text-4xl relative z-10">
              NIKE
            </span>
                        <div className="w-px h-10 bg-white/20 relative z-10" />
                        <span className="text-white font-semibold text-xs sm:text-sm flex-1 relative z-10 line-clamp-2">
              Just Play. New Season 2025-26 Collection
            </span>
                        <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg relative z-10 whitespace-nowrap transition-colors">
                            Shop Now →
                        </button>
                    </div>
                </div>
            </div>

            {/* 3-COLUMN LAYOUT */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5">
                {/* LEFT AD COLUMN */}
                <aside className="hidden lg:block sticky top-20 self-start space-y-3">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                        Sponsored
                    </p>

                    {/* NIKE AD */}
                    <div className="h-[350px] bg-[#111] rounded-2xl border border-[#222] p-5 flex flex-col items-center justify-center relative overflow-hidden text-center">
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
                            <div className="w-20 h-20 bg-[#FF6B00]/20 rounded-full flex items-center justify-center text-4xl my-3">
                                👟
                            </div>
                            <span className="text-white/60 text-xs tracking-widest">
                MERCURIAL VAPOR
              </span>
                            <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold px-6 py-2 rounded-lg text-sm mt-2 transition-colors">
                                SHOP NOW →
                            </button>
                        </div>
                    </div>

                    {/* ADIDAS AD */}
                    <div className="h-[280px] bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col gap-1 pt-3">
                            <div className="w-12 h-0.5 bg-[#0F172A] dark:bg-[#F5F5F5]" />
                            <div className="w-12 h-0.5 bg-[#0F172A] dark:bg-[#F5F5F5]" />
                            <div className="w-12 h-0.5 bg-[#0F172A] dark:bg-[#F5F5F5]" />
                        </div>
                        <span className="text-[#0F172A] dark:text-[#F5F5F5] font-black text-2xl mt-4">
              adidas
            </span>
                        <span className="text-[#475569] dark:text-[#9A9A9A] text-sm mt-1">
              Predator Elite FG
            </span>
                        <span className="text-5xl my-3">⚽</span>
                        <span className="text-[#0F172A] dark:text-[#F5F5F5] font-bold text-sm">
              Precision. Control.
            </span>
                        <button className="bg-[#0F172A] dark:bg-[#F5F5F5] text-white dark:text-[#0F172A] font-bold px-6 py-2 rounded-lg text-sm mt-3 hover:opacity-90 transition-opacity">
                            EXPLORE
                        </button>
                    </div>

                    {/* PUMA AD */}
                    <div className="h-[100px] bg-gradient-to-r from-[#CC0000] to-[#990000] rounded-2xl flex items-center justify-center flex-col gap-1 px-4">
            <span className="text-white font-black text-sm tracking-wide">
              PUMA FOOTBALL
            </span>
                        <span className="text-white/70 text-xs">Future 8 Pro</span>
                        <button className="bg-white text-[#CC0000] font-bold text-xs px-4 py-1 rounded-md hover:bg-white/90 transition-colors">
                            View Boot
                        </button>
                    </div>
                </aside>

                {/* CENTER COLUMN */}
                <main className="min-w-0 space-y-4">
                    {/* IDENTITY CARD */}
                    <section className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                            {/* PHOTO */}
                            <div className="shrink-0 mx-auto sm:mx-0">
                                <div className="w-[200px] h-[200px] rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#334155] border-2 border-[#E2E8F0] dark:border-[#2A2A2A] relative flex items-center justify-center">
                  <span className="text-white font-display font-black text-5xl tracking-tight">
                    {initials}
                  </span>
                                    {player.isPremium && (
                                        <span className="absolute top-2 right-2 bg-gradient-to-r from-[#FF6B00] to-[#CC5500] text-white text-[10px] font-black px-3 py-1 rounded-full tracking-wider">
                      PREMIUM
                    </span>
                                    )}
                                    {player.isVerified && (
                                        <div className="absolute bottom-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow">
                                            <BadgeCheck className="w-5 h-5 text-[#FF6B00] fill-white" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* INFO */}
                            <div className="flex-1 min-w-0">
                                <p className="font-mono text-[#94A3B8] text-xs mb-1">
                                    {player.profileId}
                                </p>
                                <h1 className="font-display font-black text-[42px] leading-none text-[#0F172A] dark:text-[#F5F5F5] tracking-tight">
                                    {player.name}
                                </h1>
                                <p className="text-[#94A3B8] text-sm mt-1">
                                    ({player.nickname})
                                </p>

                                {player.isMinor && (
                                    <div className="inline-flex items-center gap-1.5 mt-3 bg-amber-50 border border-amber-300 text-amber-700 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-400 text-xs font-semibold px-3 py-1 rounded-md">
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                        Under 18 — Guardian Managed
                                    </div>
                                )}

                                {/* Info grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-5">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                                        <span className="text-xs text-[#94A3B8]">Birthplace:</span>
                                        <span className="text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5] truncate">
                      Rio de Janeiro
                    </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Flag className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                                        <span className="text-xs text-[#94A3B8]">Nationality:</span>
                                        <span className="text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
                      {player.flag} {player.nationality}
                    </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                                        <span className="text-xs text-[#94A3B8]">Club:</span>
                                        <span className="text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5] truncate">
                      {player.currentClub}
                    </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                                        <span className="text-xs text-[#94A3B8]">Since:</span>
                                        <span className="text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
                      {player.teamSince}
                    </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                                        <span className="text-xs text-[#94A3B8]">DOB:</span>
                                        <span className="text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
                      {player.dob} · {player.age} yrs
                    </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Ruler className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                                        <span className="text-xs text-[#94A3B8]">Physical:</span>
                                        <span className="text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
                      {player.height} cm · {player.foot}
                    </span>
                                    </div>
                                    <div className="flex items-center gap-2 sm:col-span-2">
                                        <User className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                                        <span className="text-xs text-[#94A3B8]">Agent:</span>
                                        <span className="text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
                      {player.agent}
                    </span>
                                    </div>
                                </div>

                                {/* Positions */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {player.positions.map((pos) => (
                                        <span
                                            key={pos}
                                            className="bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-sm font-black px-4 py-1.5 rounded-lg tracking-wide"
                                        >
                      {pos}
                    </span>
                                    ))}
                                </div>

                                {/* Modalities */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {player.modalities.map((m) => (
                                        <span
                                            key={m}
                                            className="bg-[#F8FAFC] dark:bg-[#1F1F1F] border border-[#E2E8F0] dark:border-[#2A2A2A] text-[#475569] dark:text-[#9A9A9A] text-xs px-3 py-1 rounded-full"
                                        >
                      {m}
                    </span>
                                    ))}
                                </div>

                                {/* Stats strip */}
                                <div className="border-t border-[#E2E8F0] dark:border-[#2A2A2A] mt-5 pt-5 grid grid-cols-3 text-center">
                                    <div>
                                        <p className="font-mono font-black text-xl text-[#FF6B00]">
                                            {player.profileViews.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-[#94A3B8] mt-0.5 flex items-center justify-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            Views
                                        </p>
                                    </div>
                                    <div className="border-x border-[#E2E8F0] dark:border-[#2A2A2A]">
                                        <p className="font-mono font-black text-xl text-[#FF6B00]">
                                            {player.countriesCount}
                                        </p>
                                        <p className="text-xs text-[#94A3B8] mt-0.5 flex items-center justify-center gap-1">
                                            <Globe2 className="w-3 h-3" />
                                            Countries
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-mono font-black text-xl text-[#FF6B00]">
                                            ★ {player.avgRating}
                                        </p>
                                        <p className="text-xs text-[#94A3B8] mt-0.5">Avg Rating</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* VIDEO SECTION */}
                    <section className="bg-[#0F172A] rounded-2xl overflow-hidden relative">
                        <div className="aspect-video w-full relative">
                            {player.videoUrl ? (
                                <>
                                    <iframe
                                        src={player.videoUrl}
                                        title={`${player.name} highlights`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 pointer-events-none">
                                        <p className="text-[#FF6B00] text-xs font-bold tracking-widest">
                                            STRIKER · HIGHLIGHT REEL 2025
                                        </p>
                                        <h2 className="font-display font-black text-2xl text-white">
                                            {player.name}
                                        </h2>
                                    </div>
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
                    </section>

                    {/* IN-CONTENT AD */}
                    <div>
                        <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider mb-1">
                            Sponsored
                        </p>
                        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-xl min-h-[80px] flex flex-col sm:flex-row items-center px-4 sm:px-6 py-3 sm:py-0 gap-3 sm:gap-4">
              <span className="text-white font-black text-base tracking-wide shrink-0">
                TRANSFERROOM
              </span>
                            <span className="text-white/70 text-xs sm:text-sm flex-1 text-center sm:text-left">
                Join 1,200+ clubs on the professional transfer network
              </span>
                            <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                                Start Free Trial →
                            </button>
                        </div>
                    </div>

                    {/* STRUCTURED DATA CARD */}
                    <section className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="md:border-r border-[#E2E8F0] dark:border-[#2A2A2A]">
                                <div className="bg-[#F8FAFC] dark:bg-[#1F1F1F] px-5 py-3 text-[10px] font-bold text-[#94A3B8] tracking-[0.14em] uppercase border-b border-[#E2E8F0] dark:border-[#2A2A2A]">
                                    Player Details
                                </div>
                                {[
                                    { k: 'Position', v: player.positions.join(' / ') },
                                    { k: 'Preferred Foot', v: player.foot },
                                    { k: 'Modality', v: player.modalities[0] },
                                    { k: 'Nationality', v: `${player.flag} ${player.nationality}` },
                                    { k: 'Birthplace', v: player.birthplace },
                                    { k: 'Agent', v: player.agent },
                                ].map((row) => (
                                    <div
                                        key={row.k}
                                        className="px-5 py-3 border-b border-[#F1F5F9] dark:border-[#1F1F1F] flex justify-between items-center last:border-b-0 md:last:border-b"
                                    >
                                        <span className="text-xs text-[#94A3B8]">{row.k}</span>
                                        <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] text-right ml-2">
                      {row.v}
                    </span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="bg-[#F8FAFC] dark:bg-[#1F1F1F] px-5 py-3 text-[10px] font-bold text-[#94A3B8] tracking-[0.14em] uppercase border-b border-[#E2E8F0] dark:border-[#2A2A2A]">
                                    Physical Profile
                                </div>
                                {[
                                    { k: 'Height', v: `${player.height} cm` },
                                    { k: 'Age', v: `${player.age} years` },
                                    { k: 'Profile Type', v: 'Premium · Verified' },
                                    { k: 'Registered Since', v: player.teamSince },
                                ].map((row) => (
                                    <div
                                        key={row.k}
                                        className="px-5 py-3 border-b border-[#F1F5F9] dark:border-[#1F1F1F] flex justify-between items-center last:border-b-0"
                                    >
                                        <span className="text-xs text-[#94A3B8]">{row.k}</span>
                                        <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] text-right ml-2">
                      {row.v}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CLUB HISTORY */}
                    <section className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl overflow-hidden">
                        <div className="bg-[#F8FAFC] dark:bg-[#1F1F1F] px-5 py-3 border-b border-[#E2E8F0] dark:border-[#2A2A2A] flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#94A3B8] tracking-[0.14em] uppercase">
                Club History
              </span>
                            <span className="text-[10px] text-[#94A3B8] font-mono">
                2020 — 2026
              </span>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] px-5 py-2 border-b border-[#E2E8F0] dark:border-[#2A2A2A] bg-[#FAFBFC] dark:bg-[#161616]">
              <span className="text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold">
                Year
              </span>
                            <span className="text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold">
                Club
              </span>
                        </div>
                        {player.clubHistory.map((entry) => (
                            <div
                                key={entry.year}
                                className="grid grid-cols-[80px_1fr] px-5 py-3 border-b border-[#F1F5F9] dark:border-[#1F1F1F] hover:bg-[#FAFBFC] dark:hover:bg-[#1A1A1A] transition-colors last:border-b-0"
                            >
                <span className="font-mono font-semibold text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                  {entry.year}
                </span>
                                {entry.club ? (
                                    <span className="text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                    {entry.club}
                  </span>
                                ) : (
                                    <span className="text-sm text-[#CBD5E1] dark:text-[#333]">
                    —
                  </span>
                                )}
                            </div>
                        ))}
                    </section>

                    {/* ABOUT */}
                    <section className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl overflow-hidden">
                        <div className="bg-[#F8FAFC] dark:bg-[#1F1F1F] px-5 py-3 border-b border-[#E2E8F0] dark:border-[#2A2A2A]">
              <span className="text-[10px] font-bold text-[#94A3B8] tracking-[0.14em] uppercase">
                About This Player
              </span>
                        </div>
                        <div className="p-6">
                            <p className="text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                                {player.description}
                            </p>
                        </div>
                    </section>

                    {/* SCOUT ACTIONS PANEL */}
                    {viewerRole && (
                        <section className="bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.08)] border-2 border-[#FF6B00] rounded-2xl overflow-hidden">
                            <div className="bg-[#FF6B00] px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <h2 className="font-display font-black text-lg text-white tracking-wide">
                                    SCOUT ACTIONS
                                </h2>
                                <span className="text-white/80 text-sm font-medium">
                  ★ {player.avgRating} avg from {player.scoutRatings} ratings
                </span>
                            </div>
                            <div className="px-6 py-5 space-y-4">
                                {[
                                    { label: 'Technical', value: technical, set: setTechnical },
                                    { label: 'Physical', value: physical, set: setPhysical },
                                    { label: 'Mental', value: mental, set: setMental },
                                    { label: 'Overall', value: overall, set: setOverall },
                                ].map((cat) => (
                                    <div
                                        key={cat.label}
                                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                                    >
                                        <label className="text-sm font-semibold text-[#92400E] dark:text-[#FF6B00]">
                                            {cat.label}
                                        </label>
                                        <StarRating value={cat.value} onChange={cat.set} />
                                    </div>
                                ))}

                                <div>
                  <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add scouting notes (optional)..."
                      className="w-full h-20 bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] placeholder-[#94A3B8] dark:placeholder-[#555] text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-800 resize-none"
                  />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                                    <button
                                        type="button"
                                        className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold text-sm flex-1 px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Star className="w-4 h-4 fill-white" />
                                        Submit Rating
                                    </button>
                                    <button
                                        type="button"
                                        className="border-2 border-[#FF6B00] text-[#FF6B00] hover:bg-[#FFF3EB] dark:hover:bg-[rgba(255,107,0,0.12)] font-bold text-sm flex-1 px-5 py-2.5 rounded-lg bg-transparent flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Bookmark className="w-4 h-4" />
                                        Save Player
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                {/* RIGHT AD COLUMN */}
                <aside className="hidden lg:block sticky top-20 self-start space-y-3">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                        Sponsored
                    </p>

                    {/* SCOUTPRO AD */}
                    <div className="h-[280px] bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl border border-[#334155] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#FF6B00] rounded-full blur-2xl opacity-15" />
                        <Search className="w-10 h-10 text-[#FF6B00] mb-3 relative z-10" />
                        <span className="text-white font-black text-lg relative z-10">
              ScoutPro Network
            </span>
                        <p className="text-white/60 text-xs leading-relaxed mt-2 relative z-10">
                            Discover players across 67 countries. Join 4,000+ professional
                            scouts.
                        </p>
                        <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold px-6 py-2 rounded-lg mt-4 text-sm relative z-10 transition-colors">
                            Join Free →
                        </button>
                    </div>

                    {/* ADIDAS X CRAZYFAST */}
                    <div className="h-[250px] bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col gap-1 pt-3">
                            <div className="w-12 h-0.5 bg-[#0F172A] dark:bg-[#F5F5F5]" />
                            <div className="w-12 h-0.5 bg-[#0F172A] dark:bg-[#F5F5F5]" />
                            <div className="w-12 h-0.5 bg-[#0F172A] dark:bg-[#F5F5F5]" />
                        </div>
                        <span className="text-[#0F172A] dark:text-[#F5F5F5] font-black text-2xl mt-4">
              adidas
            </span>
                        <span className="text-[#475569] dark:text-[#9A9A9A] text-sm mt-1">
              X Crazyfast
            </span>
                        <span className="text-4xl my-2">⚡</span>
                        <span className="text-[#0F172A] dark:text-[#F5F5F5] font-bold text-sm">
              Speed Unleashed.
            </span>
                        <button className="bg-[#0F172A] dark:bg-[#F5F5F5] text-white dark:text-[#0F172A] font-bold px-6 py-2 rounded-lg text-sm mt-3 hover:opacity-90 transition-opacity">
                            EXPLORE
                        </button>
                    </div>

                    {/* WYSCOUT AD */}
                    <div className="h-[150px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl border border-[#334155] flex flex-col items-center justify-center px-4">
            <span className="text-[#4FC3F7] font-black text-xl tracking-wide">
              WYSCOUT
            </span>
                        <p className="text-white/60 text-xs mt-1 text-center">
                            Professional scouting platform
                        </p>
                        <button className="bg-[#4FC3F7] hover:bg-[#29B6F6] text-[#1a1a2e] font-bold text-xs px-5 py-2 rounded-lg mt-3 transition-colors">
                            Try 14 days free
                        </button>
                    </div>
                </aside>

                {/* MOBILE ADS (below content) */}
                <div className="lg:hidden space-y-3">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                        Sponsored
                    </p>

                    {/* Mobile Nike */}
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

                    {/* Mobile ScoutPro */}
                    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl border border-[#334155] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[220px]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#FF6B00] rounded-full blur-2xl opacity-15" />
                        <Search className="w-10 h-10 text-[#FF6B00] mb-3 relative z-10" />
                        <span className="text-white font-black text-lg relative z-10">
              ScoutPro Network
            </span>
                        <p className="text-white/60 text-xs leading-relaxed mt-2 relative z-10">
                            Discover players across 67 countries.
                        </p>
                        <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold px-6 py-2 rounded-lg mt-4 text-sm relative z-10 transition-colors">
                            Join Free →
                        </button>
                    </div>

                    {/* Mobile Puma banner (sticky-style) */}
                    <div className="bg-gradient-to-r from-[#CC0000] to-[#990000] rounded-2xl flex items-center justify-center flex-col gap-1 px-4 py-4">
            <span className="text-white font-black text-sm tracking-wide">
              PUMA FOOTBALL
            </span>
                        <span className="text-white/70 text-xs">Future 8 Pro</span>
                        <button className="bg-white text-[#CC0000] font-bold text-xs px-4 py-1 rounded-md mt-1 hover:bg-white/90 transition-colors">
                            View Boot
                        </button>
                    </div>
                </div>
            </div>

            {/* FOOTER SPACING */}
            <div className="h-12" />
        </div>
    );
}
