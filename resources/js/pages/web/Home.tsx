import PublicNavbar from '@/components/public/PublicNavbar';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Link, router } from '@inertiajs/react';
import { Eye, Github, Instagram, Play, Search, TrendingUp, Twitter, User, Video, Youtube } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
        <div className="min-h-screen bg-white text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
            <PublicNavbar />

            <main className="pt-16">
                {/* ━━━ SECTION 1: HERO ━━━ */}
                <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#FF6B00]">
                    {/* Pitch line texture */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-5"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                            backgroundSize: '80px 80px',
                        }}
                    />
                    {/* Center circle decoration */}
                    <div
                        className="pointer-events-none absolute rounded-full border-2 border-white opacity-5"
                        style={{ width: 500, height: 500, right: -180, bottom: -180 }}
                    />

                    <div className="relative mx-auto grid w-full max-w-[1300px] items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_460px]">
                        {/* LEFT */}
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-white">
                                ⚽ Football Discovery Platform — Trusted by 1,200+ Scouts Worldwide
                            </span>

                            <h1 className="font-display mt-6 text-[48px] leading-[0.9] font-black tracking-[-2px] text-white sm:text-[58px] lg:text-[68px]">
                                DISCOVER
                                <br />
                                YOUR NEXT
                                <br />
                                SIGNING.
                            </h1>

                            <p className="mt-4 max-w-md text-lg leading-relaxed font-normal text-white/80 sm:text-xl">
                                The professional scouting database connecting amateur talent with clubs, agents, and scouts across 67 countries.
                            </p>

                            {/* Search bar */}
                            <div className="mt-8 flex h-[60px] max-w-[560px] items-center overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#0D0D0D]">
                                <Search className="ml-4 h-5 w-5 shrink-0 text-[#FF6B00]" />
                                <input
                                    type="text"
                                    placeholder="Search by name, club, position..."
                                    className="min-w-0 flex-1 border-none bg-transparent px-3 text-base text-[#0F172A] outline-none placeholder:text-[#94A3B8] dark:text-[#F5F5F5]"
                                />
                                <div className="mx-2 hidden h-8 w-px bg-[#E2E8F0] sm:block dark:bg-[#2A2A2A]" />
                                <select className="hidden cursor-pointer border-none bg-transparent px-3 text-sm text-[#475569] outline-none sm:block dark:text-[#9A9A9A]">
                                    <option>All Positions</option>
                                    <option>Forward</option>
                                    <option>Midfielder</option>
                                    <option>Defender</option>
                                    <option>Goalkeeper</option>
                                </select>
                                <button className="h-full rounded-r-2xl border-l-2 border-white/20 bg-[#FF6B00] px-5 text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-[#CC5500] sm:px-8">
                                    Search Players
                                </button>
                            </div>

                            {/* Stats row */}
                            <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6">
                                {[
                                    { v: stats.players.toLocaleString(), l: 'PLAYERS' },
                                    { v: stats.scouts.toLocaleString(), l: 'SCOUTS' },
                                    { v: stats.clubs.toLocaleString(), l: 'CLUBS' },
                                    { v: stats.countries.toString(), l: 'COUNTRIES' },
                                ].map((s, i) => (
                                    <React.Fragment key={s.l}>
                                        <div className="flex flex-col">
                                            <span className="font-display text-3xl leading-none font-black text-white">{s.v}</span>
                                            <span className="mt-1 text-xs font-medium tracking-wide text-white/70">{s.l}</span>
                                        </div>
                                        {i < 3 && <div className="hidden h-10 w-px bg-white/25 sm:block" />}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
                                <Link href="/register/player" className="font-medium underline-offset-4 hover:underline">
                                    Register as Player →
                                </Link>
                                <Link href="/register/scout" className="font-medium underline-offset-4 hover:underline">
                                    Join as Scout / Club →
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT — floating cards */}
                        <div className="relative hidden h-[460px] lg:block">
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
                                    className={`absolute ${c.pos} ${c.rot} w-[200px] rounded-2xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all ${c.delay} ${
                                        mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                    }`}
                                >
                                    <div className="mb-3 h-1 w-12 rounded bg-[#FF6B00]" />
                                    <div className="flex h-[80px] items-center justify-center rounded-xl bg-gradient-to-br from-slate-200 to-slate-300">
                                        <User className="h-10 w-10 text-slate-400" />
                                    </div>
                                    <div className="mt-3 text-sm font-bold text-[#0F172A]">{c.name}</div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="rounded-full border border-[#FF6B00] bg-[#FFF3EB] px-2 py-0.5 text-[10px] font-bold text-[#CC5500]">
                                            {c.position}
                                        </span>
                                        <span className="text-sm">{c.flag}</span>
                                    </div>
                                    <div className="mt-2 font-mono text-xs text-[#FF6B00]">{c.views} views</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 2: LEADERBOARD AD ━━━ */}
                <section className="bg-white py-4 dark:bg-[#111111]">
                    <div className="mx-auto max-w-[728px] px-4">
                        <div className="mb-2 text-center text-[10px] tracking-wider text-[#94A3B8] uppercase">Sponsored</div>
                        <div className="relative mx-auto flex h-[90px] items-center gap-4 overflow-hidden rounded-xl bg-[#0F172A] px-6">
                            <span
                                className="pointer-events-none absolute top-[-10px] right-4 text-[120px] leading-none font-black text-white select-none"
                                style={{ opacity: 0.03 }}
                            >
                                W
                            </span>
                            <div className="shrink-0 text-2xl font-black tracking-tight text-white">WYSCOUT</div>
                            <div className="h-10 w-px shrink-0 bg-white/30" />
                            <div className="hidden min-w-0 flex-1 sm:block">
                                <div className="truncate text-sm font-semibold text-white">The #1 professional scouting platform</div>
                                <div className="truncate text-xs text-white/50">4,000+ leagues · 400M+ data points · Used by 4,000 clubs</div>
                            </div>
                            <button
                                onClick={() => router.visit('/register')}
                                className="shrink-0 rounded-lg bg-[#FF6B00] px-4 py-3 text-sm font-bold whitespace-nowrap text-white hover:bg-[#CC5500] sm:px-6"
                            >
                                START FREE TRIAL →
                            </button>
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 3: FEATURED PLAYERS ━━━ */}
                <section className="bg-white py-16 dark:bg-[#0D0D0D]">
                    <div className="mx-auto flex max-w-[1300px] flex-col gap-4 px-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="text-xs font-bold tracking-[0.14em] text-[#FF6B00] uppercase">Featured Players</div>
                            <h2 className="font-display mt-1 text-4xl leading-tight font-black text-[#0F172A] dark:text-[#F5F5F5]">
                                Rising Talent. Global Stage.
                            </h2>
                        </div>
                        <Tabs defaultValue="all">
                            <TabsList className="h-auto flex-wrap gap-1 rounded-none border-b border-[#E2E8F0] bg-transparent p-0 dark:border-[#2A2A2A]">
                                {['All', 'Forwards', 'Midfielders', 'Defenders', 'Goalkeepers'].map((t) => (
                                    <TabsTrigger
                                        key={t}
                                        value={t.toLowerCase()}
                                        className="rounded-none bg-transparent px-3 py-2 text-sm font-medium text-[#475569] data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:bg-transparent data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-none dark:text-[#9A9A9A]"
                                    >
                                        {t}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="mx-auto mt-6 max-w-[1300px]">
                        <div className="scrollbar-none flex gap-4 overflow-x-auto px-6 pb-4" style={{ scrollbarWidth: 'none' }}>
                            {featuredPlayers.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/player/profile/${p.id}`}
                                    className="group w-[240px] shrink-0 cursor-pointer rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-l-4 hover:border-[#FF6B00] hover:shadow-[0_4px_16px_rgba(255,107,0,0.12)] dark:border-[#2A2A2A] dark:bg-[#161616]"
                                >
                                    <div className="relative flex h-[160px] items-center justify-center rounded-xl bg-[#F8FAFC] dark:bg-[#1F1F1F]">
                                        <User className="h-16 w-16 text-[#CBD5E1] dark:text-[#2A2A2A]" />
                                        <span className="absolute top-3 left-3 rounded-full border border-[#FF6B00] bg-[#FFF3EB] px-2 py-0.5 text-[10px] font-bold text-[#CC5500] dark:bg-[rgba(255,107,0,0.12)]">
                                            {p.position}
                                        </span>
                                        {p.premium && (
                                            <span className="absolute top-3 right-3 rounded-full bg-[#FF6B00] px-2 py-0.5 text-[9px] font-bold tracking-wide text-white">
                                                PREMIUM
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <div className="text-sm font-bold text-[#0F172A] dark:text-[#F5F5F5]">{p.name}</div>
                                        <div className="mt-0.5 text-xs text-[#475569] dark:text-[#9A9A9A]">
                                            {p.club} {p.flag}
                                        </div>
                                        <div className="mt-2 font-mono text-xs text-[#94A3B8]">
                                            {p.age}y · {p.height}cm · {p.foot}
                                        </div>
                                        <div className="mt-3 text-xs font-bold text-[#FF6B00] group-hover:underline">VIEW PROFILE →</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 4: HALF-PAGE ADS ━━━ */}
                <section className="bg-[#F8FAFC] py-8 dark:bg-[#111111]">
                    <div className="mx-auto grid max-w-[1300px] gap-6 px-6 lg:grid-cols-2">
                        {/* Nike */}
                        <div
                            className="relative flex h-[260px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#111]"
                            style={{
                                backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.3) 0%, transparent 60%)',
                                backgroundColor: '#111',
                            }}
                        >
                            <span className="absolute top-3 right-3 text-[10px] tracking-wider text-white/30 uppercase">Ad</span>
                            <span
                                className="pointer-events-none absolute -top-4 -right-4 text-[120px] leading-none font-black text-white select-none"
                                style={{ opacity: 0.08 }}
                            >
                                ✓
                            </span>
                            <div className="text-3xl font-black tracking-tight text-white">NIKE FOOTBALL</div>
                            <div className="mt-1 text-sm text-white/60">2025 Season Collection</div>
                            <div className="mt-3 text-sm font-semibold text-white/80 italic">"Just Do It."</div>
                            <button className="mt-6 rounded-xl bg-[#FF6B00] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#CC5500]">
                                SHOP THE COLLECTION →
                            </button>
                        </div>

                        {/* Adidas */}
                        <div className="relative flex h-[260px] flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-8 dark:border-[#2A2A2A] dark:bg-[#161616]">
                            <span className="absolute top-3 right-3 text-[10px] tracking-wider text-[#94A3B8] uppercase">Ad</span>
                            <div className="absolute top-6 right-8 left-8 flex flex-col gap-1">
                                <div className="h-1 w-full bg-[#0F172A] dark:bg-[#F5F5F5]" />
                                <div className="h-1 w-full bg-[#0F172A] dark:bg-[#F5F5F5]" />
                                <div className="h-1 w-full bg-[#0F172A] dark:bg-[#F5F5F5]" />
                            </div>
                            <div className="mt-4 text-3xl font-black tracking-tight text-[#0F172A] dark:text-[#F5F5F5]">adidas</div>
                            <div className="text-sm font-semibold text-[#475569] dark:text-[#9A9A9A]">Predator Elite</div>
                            <div className="mt-2 mb-2 text-5xl">⚽</div>
                            <div className="text-center text-sm font-bold text-[#0F172A] dark:text-[#F5F5F5]">Precision. Power. Control.</div>
                            <button className="mt-4 rounded-lg bg-[#0F172A] px-8 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 dark:bg-[#F5F5F5] dark:text-[#0F172A]">
                                EXPLORE NOW
                            </button>
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 5: HOW IT WORKS ━━━ */}
                <section className="bg-white py-16 dark:bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[1100px] px-6">
                        <div className="text-center">
                            <div className="text-xs font-bold tracking-[0.14em] text-[#FF6B00] uppercase">The Platform</div>
                            <h2 className="font-display mt-1 text-4xl font-black text-[#0F172A] dark:text-[#F5F5F5]">
                                Simple. Professional. Effective.
                            </h2>
                        </div>

                        <div className="mt-10 grid gap-8 lg:grid-cols-3">
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
                                    <div className="font-display text-[80px] leading-none font-black text-[#FF6B00]/10">{s.num}</div>
                                    <s.Icon className="mx-auto -mt-6 mb-3 h-7 w-7 text-[#FF6B00] lg:mx-0" />
                                    <div className="text-lg font-bold text-[#0F172A] dark:text-[#F5F5F5]">{s.title}</div>
                                    <div className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">{s.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 6: STATS BAND ━━━ */}
                <section className="bg-[#FF6B00] py-12">
                    <div className="mx-auto grid max-w-[900px] grid-cols-2 gap-8 px-6 text-center lg:grid-cols-4">
                        {[
                            { v: stats.players.toLocaleString(), l: 'REGISTERED PLAYERS' },
                            { v: stats.scouts.toLocaleString(), l: 'ACTIVE SCOUTS' },
                            { v: stats.clubs.toString(), l: 'PARTNER CLUBS' },
                            { v: stats.countries.toString(), l: 'COUNTRIES' },
                        ].map((s) => (
                            <div key={s.l}>
                                <div className="font-display text-5xl leading-none font-black text-white lg:text-6xl">{s.v}</div>
                                <div className="mt-2 text-sm font-medium tracking-wide text-white/75">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ━━━ SECTION 7: SPONSOR PARTNERS ━━━ */}
                <section className="bg-white py-10 dark:bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[1300px] px-6">
                        <div className="mb-8 text-center text-xs tracking-widest text-[#94A3B8] uppercase">Our Partners</div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['SPORTRADAR', 'TRANSFERROOM', 'WYSCOUT', 'INSTAT', 'FOOTBALL MANAGER'].map((name) => (
                                <div
                                    key={name}
                                    className="flex h-16 w-36 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-black tracking-tight text-[#475569] grayscale transition-all hover:text-[#FF6B00] hover:grayscale-0 dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#9A9A9A] dark:hover:text-[#FF6B00]"
                                >
                                    {name}
                                </div>
                            ))}
                        </div>

                        {/* Hero sponsor banner */}
                        <div className="relative mx-auto mt-8 flex h-[250px] max-w-[970px] items-center gap-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a1a2e] to-[#16213e] px-6 sm:px-12">
                            <span className="absolute top-3 right-3 text-[10px] tracking-wider text-white/30 uppercase">Sponsored</span>
                            {/* Orb decorations */}
                            <div
                                className="pointer-events-none absolute rounded-full bg-[#FF6B00]"
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
                                className="pointer-events-none absolute rounded-full bg-[#3b82f6]"
                                style={{
                                    width: 200,
                                    height: 200,
                                    right: -40,
                                    bottom: -60,
                                    opacity: 0.18,
                                    filter: 'blur(20px)',
                                }}
                            />

                            <div className="relative min-w-0 flex-1">
                                <div className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">ScoutPro Network</div>
                                <div className="font-display mt-2 text-3xl leading-tight font-black text-white sm:text-4xl">
                                    GLOBAL SCOUTING.
                                    <br />
                                    ONE NETWORK.
                                </div>
                                <div className="mt-3 hidden max-w-md text-sm text-white/70 sm:block">
                                    Connecting clubs, agents, and players across 90+ countries with verified intelligence and live match data.
                                </div>
                                <button className="mt-4 rounded-xl bg-[#FF6B00] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#CC5500]">
                                    JOIN THE NETWORK →
                                </button>
                            </div>
                            <div className="relative hidden w-[180px] shrink-0 items-center justify-center md:flex">
                                <div className="flex h-[140px] w-[140px] items-center justify-center rounded-full border-2 border-white/20">
                                    <TrendingUp className="h-14 w-14 text-white/80" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 8: FEATURED VIDEOS ━━━ */}
                <section className="bg-[#F8FAFC] py-16 dark:bg-[#111111]">
                    <div className="mx-auto max-w-[1300px] px-6">
                        <div>
                            <div className="text-xs font-bold tracking-[0.14em] text-[#FF6B00] uppercase">Player Highlights</div>
                            <h2 className="font-display mt-1 text-4xl font-black text-[#0F172A] dark:text-[#F5F5F5]">Watch Them Play</h2>
                        </div>

                        <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                            {/* Large video */}
                            <div className="group relative h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-[#0F172A]">
                                <div
                                    className="pointer-events-none absolute inset-0"
                                    style={{
                                        backgroundImage: 'radial-gradient(ellipse at 30% 30%, rgba(255,107,0,0.25) 0%, transparent 60%)',
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF6B00] shadow-2xl transition-transform group-hover:scale-110">
                                        <Play className="ml-1 h-8 w-8 text-white" fill="white" />
                                    </div>
                                </div>
                                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <span className="rounded-full border border-[#FF6B00] bg-[#FFF3EB] px-2 py-0.5 text-[10px] font-bold text-[#CC5500]">
                                        ST · Santos FC
                                    </span>
                                    <div className="font-display mt-3 text-3xl font-black tracking-tight text-white">LUCAS ALMEIDA</div>
                                    <div className="mt-1 font-mono text-xs text-white/60">Season Highlights · 4:32</div>
                                </div>
                            </div>

                            {/* Two small videos */}
                            <div className="flex flex-col gap-4">
                                {featuredVideos.slice(1).map((v) => (
                                    <div key={v.id} className="group relative h-[140px] cursor-pointer overflow-hidden rounded-2xl bg-[#0F172A]">
                                        <div
                                            className="pointer-events-none absolute inset-0"
                                            style={{
                                                backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.2) 0%, transparent 60%)',
                                            }}
                                        />
                                        <div className="absolute top-1/2 right-5 -translate-y-1/2">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B00] shadow-xl transition-transform group-hover:scale-110">
                                                <Play className="ml-0.5 h-5 w-5 text-white" fill="white" />
                                            </div>
                                        </div>
                                        <div className="absolute right-0 bottom-0 left-0 p-4">
                                            <div className="font-display text-xl font-black tracking-tight text-white">{v.name}</div>
                                            <div className="mt-0.5 text-[11px] text-white/60">{v.position}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ━━━ SECTION 9: CTA BAND ━━━ */}
                <section className="relative overflow-hidden bg-[#FF6B00] py-20 text-center">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-5"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />
                    <div className="relative mx-auto max-w-3xl px-6">
                        <h2 className="font-display text-[40px] leading-tight font-black tracking-tight text-white sm:text-[52px]">
                            ARE YOU THE NEXT GREAT TALENT?
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80 sm:text-xl">
                            Join 12,000+ players already building their professional career on HiLights Football.
                        </p>
                        <Link
                            href="/register"
                            className="mt-8 inline-block rounded-2xl bg-white px-10 py-4 text-base font-black text-[#FF6B00] transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] sm:px-12 sm:py-5 sm:text-lg"
                        >
                            CREATE YOUR FREE PROFILE
                        </Link>
                    </div>
                </section>

                {/* ━━━ FOOTER ━━━ */}
                <footer className="bg-[#0F172A] py-12 text-white">
                    <div className="mx-auto max-w-[1300px] px-6">
                        <div className="grid gap-10 lg:grid-cols-4">
                            <div>
                                <img src="/images/logo/hilights_logo_dark_200.png" className="h-12 w-auto" alt="HiLights Football" />
                                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                                    The professional football discovery platform connecting talent with opportunity worldwide.
                                </p>
                                <div className="mt-5 flex gap-3">
                                    {[Github, Twitter, Instagram, Youtube].map((I, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-[#FF6B00]"
                                        >
                                            <I className="h-4 w-4 text-slate-400 hover:text-white" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="mb-4 text-sm font-bold tracking-wide text-white">PLATFORM</div>
                                <ul className="space-y-2.5">
                                    {['About', 'How It Works', 'Pricing', 'Press', 'Careers'].map((l) => (
                                        <li key={l}>
                                            <Link href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                                                {l}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="mb-4 text-sm font-bold tracking-wide text-white">FOR PLAYERS</div>
                                <ul className="space-y-2.5">
                                    {['Create Profile', 'Upload Highlights', 'Pricing Plans', 'Success Stories', 'Player Support'].map((l) => (
                                        <li key={l}>
                                            <Link href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                                                {l}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="mb-4 text-sm font-bold tracking-wide text-white">FOR SCOUTS</div>
                                <ul className="space-y-2.5">
                                    {['Join as Scout', 'Search Database', 'Scout Tools', 'Club Partnerships', 'API Access'].map((l) => (
                                        <li key={l}>
                                            <Link href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                                                {l}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
                            <div>© 2026 HiLights Football. All rights reserved.</div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="#" className="transition-colors hover:text-white">
                                    Terms
                                </Link>
                                <Link href="#" className="transition-colors hover:text-white">
                                    Privacy
                                </Link>
                                <Link href="#" className="transition-colors hover:text-white">
                                    Cookies
                                </Link>
                                <Link href="#" className="transition-colors hover:text-white">
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
