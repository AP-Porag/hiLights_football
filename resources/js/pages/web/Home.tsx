import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    Search,
    User,
    Video,
    Eye,
    Github,
    Twitter,
    Instagram,
    Youtube,
    Play,
    MapPin,
    TrendingUp,
} from 'lucide-react';
import PublicNavbar from '@/Components/Public/PublicNavbar';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';

// TODO: Replace with usePage<Props>().props
const stats = { players: 12847, scouts: 1243, clubs: 387, countries: 67 };

// TODO: Replace with usePage<Props>().props
const featuredPlayers = [
    {
        id: 1,
        name: 'Lucas Almeida',
        position: 'ST',
        club: 'Santos FC',
        country: 'Brazil',
        flag: '🇧🇷',
        age: 19,
        height: 184,
        foot: 'Right',
        views: '14.2K',
        premium: true,
    },
    {
        id: 2,
        name: 'Rafael Costa',
        position: 'CM',
        club: 'Sporting CP B',
        country: 'Portugal',
        flag: '🇵🇹',
        age: 21,
        height: 178,
        foot: 'Left',
        views: '9.8K',
        premium: false,
    },
    {
        id: 3,
        name: 'Mathys Dubois',
        position: 'CB',
        club: 'Lyon Académie',
        country: 'France',
        flag: '🇫🇷',
        age: 18,
        height: 191,
        foot: 'Right',
        views: '11.5K',
        premium: true,
    },
    {
        id: 4,
        name: 'João Pereira',
        position: 'RW',
        club: 'Flamengo Sub-20',
        country: 'Brazil',
        flag: '🇧🇷',
        age: 20,
        height: 175,
        foot: 'Right',
        views: '22.1K',
        premium: true,
    },
    {
        id: 5,
        name: 'Théo Laurent',
        position: 'GK',
        club: 'Stade Rennais',
        country: 'France',
        flag: '🇫🇷',
        age: 22,
        height: 193,
        foot: 'Right',
        views: '7.4K',
        premium: false,
    },
    {
        id: 6,
        name: 'Diogo Ferreira',
        position: 'LB',
        club: 'FC Porto B',
        country: 'Portugal',
        flag: '🇵🇹',
        age: 19,
        height: 180,
        foot: 'Left',
        views: '13.6K',
        premium: false,
    },
];

// TODO: Replace with usePage<Props>().props
const featuredVideos = [
    { id: 1, name: 'LUCAS ALMEIDA', position: 'ST · Santos FC' },
    { id: 2, name: 'JOÃO PEREIRA', position: 'RW · Flamengo' },
    { id: 3, name: 'MATHYS DUBOIS', position: 'CB · Lyon' },
];

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0D0D0D] text-[#0F172A] dark:text-[#F5F5F5]">
            <PublicNavbar />

            <main className="pt-16">
                {/* ━━━ SECTION 1: HERO ━━━ */}
                <section className="relative overflow-hidden bg-[#FF6B00] min-h-[88vh] flex items-center">
                    {/* Pitch line texture */}
                    <div
                        className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                            backgroundSize: '80px 80px',
                        }}
                    />
                    {/* Center circle decoration */}
                    <div
                        className="absolute opacity-5 pointer-events-none rounded-full border-2 border-white"
                        style={{ width: 500, height: 500, right: -180, bottom: -180 }}
                    />

                    <div className="relative w-full max-w-[1300px] mx-auto px-6 py-20 grid lg:grid-cols-[1fr_460px] gap-12 items-center">
                        {/* LEFT */}
                        <div>
              <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide">
                ⚽ Football Discovery Platform — Trusted by 1,200+ Scouts Worldwide
              </span>

                            <h1 className="font-display font-black text-[48px] sm:text-[58px] lg:text-[68px] leading-[0.9] tracking-[-2px] text-white mt-6">
                                DISCOVER
                                <br />
                                YOUR NEXT
                                <br />
                                SIGNING.
                            </h1>

                            <p className="text-lg sm:text-xl text-white/80 font-normal max-w-md mt-4 leading-relaxed">
                                The professional scouting database connecting amateur talent with clubs, agents, and scouts across 67 countries.
                            </p>

                            {/* Search bar */}
                            <div className="mt-8 bg-white dark:bg-[#0D0D0D] rounded-2xl shadow-2xl flex items-center h-[60px] overflow-hidden max-w-[560px]">
                                <Search className="w-5 h-5 text-[#FF6B00] ml-4 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search by name, club, position..."
                                    className="flex-1 text-base text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] px-3 border-none outline-none bg-transparent min-w-0"
                                />
                                <div className="w-px h-8 bg-[#E2E8F0] dark:bg-[#2A2A2A] mx-2 hidden sm:block" />
                                <select className="hidden sm:block text-sm text-[#475569] dark:text-[#9A9A9A] px-3 border-none outline-none bg-transparent cursor-pointer">
                                    <option>All Positions</option>
                                    <option>Forward</option>
                                    <option>Midfielder</option>
                                    <option>Defender</option>
                                    <option>Goalkeeper</option>
                                </select>
                                <button className="bg-[#FF6B00] text-white font-bold px-5 sm:px-8 h-full text-sm rounded-r-2xl hover:bg-[#CC5500] border-l-2 border-white/20 transition-colors whitespace-nowrap">
                                    Search Players
                                </button>
                            </div>

                            {/* Stats row */}
                            <div className="mt-8 grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-6">
                                {[
                                    { v: stats.players.toLocaleString(), l: 'PLAYERS' },
                                    { v: stats.scouts.toLocaleString(), l: 'SCOUTS' },
                                    { v: stats.clubs.toLocaleString(), l: 'CLUBS' },
                                    { v: stats.countries.toString(), l: 'COUNTRIES' },
                                ].map((s, i) => (
                                    <React.Fragment key={s.l}>
                                        <div className="flex flex-col">
                      <span className="font-display font-black text-3xl text-white leading-none">
                        {s.v}
                      </span>
                                            <span className="text-white/70 text-xs font-medium tracking-wide mt-1">
                        {s.l}
                      </span>
                                        </div>
                                        {i < 3 && (
                                            <div className="hidden sm:block w-px h-10 bg-white/25" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="text-sm text-white/75 mt-6 flex flex-wrap gap-x-6 gap-y-2">
                                <Link
                                    href="/register/player"
                                    className="hover:underline underline-offset-4 font-medium"
                                >
                                    Register as Player →
                                </Link>
                                <Link
                                    href="/register/scout"
                                    className="hover:underline underline-offset-4 font-medium"
                                >
                                    Join as Scout / Club →
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT — floating cards */}
                        <div className="hidden lg:block relative h-[460px]">
                            {[
                                {
                                    pos: 'top-0 left-0',
                                    rot: 'rotate-[-4deg]',
                                    name: 'Lucas Almeida',
                                    position: 'ST',
                                    flag: '🇧🇷',
                                    views: '14,247',
                                    delay: 'duration-700 delay-100',
                                },
                                {
                                    pos: 'top-[110px] left-[150px] z-10',
                                    rot: 'rotate-[2deg]',
                                    name: 'Mathys Dubois',
                                    position: 'CB',
                                    flag: '🇫🇷',
                                    views: '11,512',
                                    delay: 'duration-700 delay-300',
                                },
                                {
                                    pos: 'top-[230px] left-[40px]',
                                    rot: 'rotate-[-3deg]',
                                    name: 'Rafael Costa',
                                    position: 'CM',
                                    flag: '🇵🇹',
                                    views: '9,803',
                                    delay: 'duration-700 delay-500',
                                },
                            ].map((c, i) => (
                                <div
                                    key={i}
                                    className={`absolute ${c.pos} ${c.rot} bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-5 w-[200px] transition-all ${c.delay} ${
                                        mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                    }`}
                                >
                                    <div className="h-1 w-12 bg-[#FF6B00] rounded mb-3" />
                                    <div className="h-[80px] rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                        <User className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <div className="font-bold text-[#0F172A] text-sm mt-3">{c.name}</div>
                                    <div className="flex items-center gap-2 mt-1">
                    <span className="bg-[#FFF3EB] border border-[#FF6B00] text-[#CC5500] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {c.position}
                    </span>
                                        <span className="text-sm">{c.flag}</span>
                                    </div>
                                    <div className="font-mono text-[#FF6B00] text-xs mt-2">
                                        {c.views} views
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 2: LEADERBOARD AD ━━━ */}
                <section className="bg-white dark:bg-[#111111] py-4">
                    <div className="max-w-[728px] mx-auto px-4">
                        <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider text-center mb-2">
                            Sponsored
                        </div>
                        <div className="bg-[#0F172A] rounded-xl flex items-center px-6 gap-4 h-[90px] mx-auto overflow-hidden relative">
              <span
                  className="absolute right-4 top-[-10px] font-black text-[120px] text-white leading-none pointer-events-none select-none"
                  style={{ opacity: 0.03 }}
              >
                W
              </span>
                            <div className="text-white font-black text-2xl tracking-tight shrink-0">
                                WYSCOUT
                            </div>
                            <div className="w-px h-10 bg-white/30 shrink-0" />
                            <div className="flex-1 min-w-0 hidden sm:block">
                                <div className="text-white font-semibold text-sm truncate">
                                    The #1 professional scouting platform
                                </div>
                                <div className="text-white/50 text-xs truncate">
                                    4,000+ leagues · 400M+ data points · Used by 4,000 clubs
                                </div>
                            </div>
                            <button className="bg-[#FF6B00] text-white font-bold text-sm px-4 sm:px-6 py-3 rounded-lg hover:bg-[#CC5500] shrink-0 whitespace-nowrap">
                                START FREE TRIAL →
                            </button>
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 3: FEATURED PLAYERS ━━━ */}
                <section className="bg-white dark:bg-[#0D0D0D] py-16">
                    <div className="max-w-[1300px] mx-auto px-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <div className="text-[#FF6B00] text-xs font-bold tracking-[0.14em] uppercase">
                                Featured Players
                            </div>
                            <h2 className="font-display text-4xl text-[#0F172A] dark:text-[#F5F5F5] font-black mt-1 leading-tight">
                                Rising Talent. Global Stage.
                            </h2>
                        </div>
                        <Tabs defaultValue="all">
                            <TabsList className="bg-transparent border-b border-[#E2E8F0] dark:border-[#2A2A2A] rounded-none h-auto p-0 gap-1 flex-wrap">
                                {['All', 'Forwards', 'Midfielders', 'Defenders', 'Goalkeepers'].map(
                                    (t) => (
                                        <TabsTrigger
                                            key={t}
                                            value={t.toLowerCase()}
                                            className="text-sm font-medium text-[#475569] dark:text-[#9A9A9A] data-[state=active]:text-[#FF6B00] data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] rounded-none px-3 py-2 data-[state=active]:shadow-none bg-transparent data-[state=active]:bg-transparent"
                                        >
                                            {t}
                                        </TabsTrigger>
                                    ),
                                )}
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="mt-6 max-w-[1300px] mx-auto">
                        <div
                            className="flex gap-4 overflow-x-auto pb-4 px-6 scrollbar-none"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {featuredPlayers.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/players/${p.id}`}
                                    className="group bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-5 w-[240px] shrink-0 cursor-pointer hover:border-[#FF6B00] hover:border-l-4 hover:shadow-[0_4px_16px_rgba(255,107,0,0.12)] hover:-translate-y-1 transition-all duration-200"
                                >
                                    <div className="h-[160px] rounded-xl bg-[#F8FAFC] dark:bg-[#1F1F1F] relative flex items-center justify-center">
                                        <User className="w-16 h-16 text-[#CBD5E1] dark:text-[#2A2A2A]" />
                                        <span className="absolute top-3 left-3 bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {p.position}
                    </span>
                                        {p.premium && (
                                            <span className="absolute top-3 right-3 bg-[#FF6B00] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                        PREMIUM
                      </span>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <div className="font-bold text-[#0F172A] dark:text-[#F5F5F5] text-sm">
                                            {p.name}
                                        </div>
                                        <div className="text-xs text-[#475569] dark:text-[#9A9A9A] mt-0.5">
                                            {p.club} {p.flag}
                                        </div>
                                        <div className="text-xs text-[#94A3B8] mt-2 font-mono">
                                            {p.age}y · {p.height}cm · {p.foot}
                                        </div>
                                        <div className="text-[#FF6B00] text-xs font-bold mt-3 group-hover:underline">
                                            VIEW PROFILE →
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 4: HALF-PAGE ADS ━━━ */}
                <section className="bg-[#F8FAFC] dark:bg-[#111111] py-8">
                    <div className="max-w-[1300px] mx-auto px-6 grid lg:grid-cols-2 gap-6">
                        {/* Nike */}
                        <div
                            className="relative bg-[#111] rounded-2xl h-[260px] flex flex-col items-center justify-center overflow-hidden"
                            style={{
                                backgroundImage:
                                    'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.3) 0%, transparent 60%)',
                                backgroundColor: '#111',
                            }}
                        >
              <span className="absolute top-3 right-3 text-white/30 text-[10px] uppercase tracking-wider">
                Ad
              </span>
                            <span
                                className="absolute -right-4 -top-4 font-black text-[120px] text-white leading-none pointer-events-none select-none"
                                style={{ opacity: 0.08 }}
                            >
                ✓
              </span>
                            <div className="text-white font-black text-3xl tracking-tight">
                                NIKE FOOTBALL
                            </div>
                            <div className="text-white/60 text-sm mt-1">2025 Season Collection</div>
                            <div className="text-white/80 font-semibold text-sm mt-3 italic">
                                "Just Do It."
                            </div>
                            <button className="bg-[#FF6B00] text-white font-bold px-8 py-3 rounded-xl mt-6 text-sm hover:bg-[#CC5500] transition-colors">
                                SHOP THE COLLECTION →
                            </button>
                        </div>

                        {/* Adidas */}
                        <div className="relative bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl h-[260px] flex flex-col items-center justify-center p-8">
              <span className="absolute top-3 right-3 text-[#94A3B8] text-[10px] uppercase tracking-wider">
                Ad
              </span>
                            <div className="absolute top-6 left-8 right-8 flex flex-col gap-1">
                                <div className="h-1 w-full bg-[#0F172A] dark:bg-[#F5F5F5]" />
                                <div className="h-1 w-full bg-[#0F172A] dark:bg-[#F5F5F5]" />
                                <div className="h-1 w-full bg-[#0F172A] dark:bg-[#F5F5F5]" />
                            </div>
                            <div className="text-[#0F172A] dark:text-[#F5F5F5] font-black text-3xl tracking-tight mt-4">
                                adidas
                            </div>
                            <div className="text-[#475569] dark:text-[#9A9A9A] font-semibold text-sm">
                                Predator Elite
                            </div>
                            <div className="text-5xl mt-2 mb-2">⚽</div>
                            <div className="text-[#0F172A] dark:text-[#F5F5F5] font-bold text-sm text-center">
                                Precision. Power. Control.
                            </div>
                            <button className="bg-[#0F172A] dark:bg-[#F5F5F5] text-white dark:text-[#0F172A] font-bold px-8 py-2.5 rounded-lg mt-4 text-sm hover:opacity-90 transition-opacity">
                                EXPLORE NOW
                            </button>
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 5: HOW IT WORKS ━━━ */}
                <section className="bg-white dark:bg-[#0D0D0D] py-16">
                    <div className="max-w-[1100px] mx-auto px-6">
                        <div className="text-center">
                            <div className="text-[#FF6B00] text-xs font-bold tracking-[0.14em] uppercase">
                                The Platform
                            </div>
                            <h2 className="font-display text-4xl text-[#0F172A] dark:text-[#F5F5F5] font-black mt-1">
                                Simple. Professional. Effective.
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 mt-10">
                            {[
                                {
                                    num: '01',
                                    Icon: User,
                                    title: 'Create Profile',
                                    desc: 'Build a complete professional profile with stats, position data, club history, physical attributes, and verified credentials.',
                                },
                                {
                                    num: '02',
                                    Icon: Video,
                                    title: 'Upload Highlights',
                                    desc: 'Showcase your best matches with HD video reels, tactical clips, and skill demonstrations reviewed by our scouting team.',
                                },
                                {
                                    num: '03',
                                    Icon: Eye,
                                    title: 'Get Discovered',
                                    desc: 'Be seen by 1,200+ verified scouts and 387 professional clubs actively searching for talent across 67 countries.',
                                },
                            ].map((s) => (
                                <div key={s.num} className="text-center lg:text-left">
                                    <div className="font-display font-black text-[80px] text-[#FF6B00]/10 leading-none">
                                        {s.num}
                                    </div>
                                    <s.Icon className="w-7 h-7 text-[#FF6B00] -mt-6 mb-3 mx-auto lg:mx-0" />
                                    <div className="font-bold text-[#0F172A] dark:text-[#F5F5F5] text-lg">
                                        {s.title}
                                    </div>
                                    <div className="text-[#475569] dark:text-[#9A9A9A] text-sm leading-relaxed mt-2">
                                        {s.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 6: STATS BAND ━━━ */}
                <section className="bg-[#FF6B00] py-12">
                    <div className="max-w-[900px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { v: stats.players.toLocaleString(), l: 'REGISTERED PLAYERS' },
                            { v: stats.scouts.toLocaleString(), l: 'ACTIVE SCOUTS' },
                            { v: stats.clubs.toString(), l: 'PARTNER CLUBS' },
                            { v: stats.countries.toString(), l: 'COUNTRIES' },
                        ].map((s) => (
                            <div key={s.l}>
                                <div className="font-display font-black text-5xl lg:text-6xl text-white leading-none">
                                    {s.v}
                                </div>
                                <div className="text-white/75 text-sm font-medium tracking-wide mt-2">
                                    {s.l}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ━━━ SECTION 7: SPONSOR PARTNERS ━━━ */}
                <section className="bg-white dark:bg-[#0D0D0D] py-10">
                    <div className="max-w-[1300px] mx-auto px-6">
                        <div className="text-[#94A3B8] text-xs uppercase tracking-widest text-center mb-8">
                            Our Partners
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {['SPORTRADAR', 'TRANSFERROOM', 'WYSCOUT', 'INSTAT', 'FOOTBALL MANAGER'].map(
                                (name) => (
                                    <div
                                        key={name}
                                        className="bg-[#F8FAFC] dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl h-16 w-36 flex items-center justify-center text-[#475569] dark:text-[#9A9A9A] font-black text-xs tracking-tight grayscale hover:grayscale-0 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-all"
                                    >
                                        {name}
                                    </div>
                                ),
                            )}
                        </div>

                        {/* Hero sponsor banner */}
                        <div className="relative max-w-[970px] mx-auto mt-8 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-2xl h-[250px] flex items-center px-6 sm:px-12 gap-6 overflow-hidden">
              <span className="absolute top-3 right-3 text-white/30 text-[10px] uppercase tracking-wider">
                Sponsored
              </span>
                            {/* Orb decorations */}
                            <div
                                className="absolute pointer-events-none rounded-full bg-[#FF6B00]"
                                style={{
                                    width: 260,
                                    height: 260,
                                    left: -80,
                                    top: -80,
                                    opacity: 0.15,
                                    filter: 'blur(20px)',
                                }}
                            />
                            <div
                                className="absolute pointer-events-none rounded-full bg-[#3b82f6]"
                                style={{
                                    width: 200,
                                    height: 200,
                                    right: -40,
                                    bottom: -60,
                                    opacity: 0.18,
                                    filter: 'blur(20px)',
                                }}
                            />

                            <div className="relative flex-1 min-w-0">
                                <div className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase">
                                    ScoutPro Network
                                </div>
                                <div className="font-display font-black text-white text-3xl sm:text-4xl mt-2 leading-tight">
                                    GLOBAL SCOUTING.
                                    <br />
                                    ONE NETWORK.
                                </div>
                                <div className="text-white/70 text-sm mt-3 max-w-md hidden sm:block">
                                    Connecting clubs, agents, and players across 90+ countries with verified intelligence and live match data.
                                </div>
                                <button className="bg-[#FF6B00] text-white font-bold px-6 py-3 rounded-xl mt-4 text-sm hover:bg-[#CC5500] transition-colors">
                                    JOIN THE NETWORK →
                                </button>
                            </div>
                            <div className="relative hidden md:flex items-center justify-center w-[180px] shrink-0">
                                <div className="w-[140px] h-[140px] rounded-full border-2 border-white/20 flex items-center justify-center">
                                    <TrendingUp className="w-14 h-14 text-white/80" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 8: FEATURED VIDEOS ━━━ */}
                <section className="bg-[#F8FAFC] dark:bg-[#111111] py-16">
                    <div className="max-w-[1300px] mx-auto px-6">
                        <div>
                            <div className="text-[#FF6B00] text-xs font-bold tracking-[0.14em] uppercase">
                                Player Highlights
                            </div>
                            <h2 className="font-display text-4xl text-[#0F172A] dark:text-[#F5F5F5] font-black mt-1">
                                Watch Them Play
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4 mt-8">
                            {/* Large video */}
                            <div className="relative bg-[#0F172A] rounded-2xl h-[300px] overflow-hidden group cursor-pointer">
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        backgroundImage:
                                            'radial-gradient(ellipse at 30% 30%, rgba(255,107,0,0.25) 0%, transparent 60%)',
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-[#FF6B00] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="bg-[#FFF3EB] border border-[#FF6B00] text-[#CC5500] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ST · Santos FC
                  </span>
                                    <div className="font-display font-black text-white text-3xl tracking-tight mt-3">
                                        LUCAS ALMEIDA
                                    </div>
                                    <div className="text-white/60 text-xs font-mono mt-1">
                                        Season Highlights · 4:32
                                    </div>
                                </div>
                            </div>

                            {/* Two small videos */}
                            <div className="flex flex-col gap-4">
                                {featuredVideos.slice(1).map((v) => (
                                    <div
                                        key={v.id}
                                        className="relative bg-[#0F172A] rounded-2xl h-[140px] overflow-hidden group cursor-pointer"
                                    >
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                backgroundImage:
                                                    'radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.2) 0%, transparent 60%)',
                                            }}
                                        />
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                            <div className="w-12 h-12 rounded-full bg-[#FF6B00] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="font-display font-black text-white text-xl tracking-tight">
                                                {v.name}
                                            </div>
                                            <div className="text-white/60 text-[11px] mt-0.5">{v.position}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 9: CTA BAND ━━━ */}
                <section className="bg-[#FF6B00] py-20 text-center relative overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />
                    <div className="relative max-w-3xl mx-auto px-6">
                        <h2 className="font-display font-black text-[40px] sm:text-[52px] text-white leading-tight tracking-tight">
                            ARE YOU THE NEXT GREAT TALENT?
                        </h2>
                        <p className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto mt-4">
                            Join 12,000+ players already building their professional career on HiLights Football.
                        </p>
                        <Link
                            href="/register/player"
                            className="inline-block bg-white text-[#FF6B00] font-black text-base sm:text-lg px-10 sm:px-12 py-4 sm:py-5 rounded-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:scale-105 transition-all mt-8"
                        >
                            CREATE YOUR FREE PROFILE
                        </Link>
                    </div>
                </section>

                {/* ━━━ FOOTER ━━━ */}
                <footer className="bg-[#0F172A] text-white py-12">
                    <div className="max-w-[1300px] mx-auto px-6">
                        <div className="grid lg:grid-cols-4 gap-10">
                            <div>
                                <img
                                    src="/images/logo/hilights_logo_dark_200.png"
                                    className="h-12 w-auto"
                                    alt="HiLights Football"
                                />
                                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                                    The professional football discovery platform connecting talent with opportunity worldwide.
                                </p>
                                <div className="flex gap-3 mt-5">
                                    {[Github, Twitter, Instagram, Youtube].map((I, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#FF6B00] flex items-center justify-center transition-colors"
                                        >
                                            <I className="w-4 h-4 text-slate-400 hover:text-white" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="font-bold text-white text-sm tracking-wide mb-4">
                                    PLATFORM
                                </div>
                                <ul className="space-y-2.5">
                                    {['About', 'How It Works', 'Pricing', 'Press', 'Careers'].map((l) => (
                                        <li key={l}>
                                            <Link
                                                href="#"
                                                className="text-slate-400 hover:text-white text-sm transition-colors"
                                            >
                                                {l}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="font-bold text-white text-sm tracking-wide mb-4">
                                    FOR PLAYERS
                                </div>
                                <ul className="space-y-2.5">
                                    {[
                                        'Create Profile',
                                        'Upload Highlights',
                                        'Pricing Plans',
                                        'Success Stories',
                                        'Player Support',
                                    ].map((l) => (
                                        <li key={l}>
                                            <Link
                                                href="#"
                                                className="text-slate-400 hover:text-white text-sm transition-colors"
                                            >
                                                {l}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="font-bold text-white text-sm tracking-wide mb-4">
                                    FOR SCOUTS
                                </div>
                                <ul className="space-y-2.5">
                                    {[
                                        'Join as Scout',
                                        'Search Database',
                                        'Scout Tools',
                                        'Club Partnerships',
                                        'API Access',
                                    ].map((l) => (
                                        <li key={l}>
                                            <Link
                                                href="#"
                                                className="text-slate-400 hover:text-white text-sm transition-colors"
                                            >
                                                {l}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-slate-500 text-xs">
                            <div>© 2026 HiLights Football. All rights reserved.</div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="#" className="hover:text-white transition-colors">
                                    Terms
                                </Link>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Privacy
                                </Link>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Cookies
                                </Link>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
