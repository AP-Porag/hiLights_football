import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ReactCountryFlag from "react-country-flag";
import { getPositionName } from '@/utils/helper';
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
import { PitchPriority } from '@/components/ui/pitch-priority';

// MOCK DATA

const transferHistory = [
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
    { home: "São Cristóvão", score: "3 x 1", away: "Juventude", goals: 1, assists: 0, minutes: "90'" },
    { home: "São Cristóvão", score: "2 x 2", away: "Grêmio", goals: 0, assists: 1, minutes: "90'" },
    { home: "São Cristóvão", score: "4 x 0", away: "Internacional", goals: 2, assists: 0, minutes: "90'" },
];

const viewerRole = 'scout';

// Position code → full form name
const POSITION_FULL_NAMES: Record<string, string> = {
    'GK': 'Goalkeeper',
    'LB': 'Left Back',
    'CB-L': 'Centre Back (Left)',
    'CB-R': 'Centre Back (Right)',
    'RB': 'Right Back',
    'LM': 'Left Midfielder',
    'CM-L': 'Central Midfielder (Left)',
    'CM-R': 'Central Midfielder (Right)',
    'RM': 'Right Midfielder',
    'CAM': 'Central Attacking Midfielder',
    'LW': 'Left Winger',
    'ST': 'Striker',
    'RW': 'Right Winger',
    'CF': 'Centre Forward',
};

const getPositionFullName = (codes?: string | string[] | null): string => {
    if (!codes) return 'Not specified';
    const arr = Array.isArray(codes) ? codes : [codes];
    return arr
        .map((c) => {
            const key = String(c).trim().toUpperCase(); // normalize: gk / Gk / " GK " → GK
            return POSITION_FULL_NAMES[key] ?? c;
        })
        .join(', ');
};

const getCountryName = (code?: string | string[] | null): string => {
    if (!code) return '';

    const codes = Array.isArray(code) ? code : [code];

    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    return codes
        .map(c => {
            try {
                return regionNames.of(c) || c;
            } catch {
                return c;
            }
        })
        .join(', ');
};

const getEmbedUrl = (url?: string | null): string | null => {
    if (!url) return null;
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
    return null;
};

// Same pattern as backend YouTubeService::extractVideoId
const getYouTubeVideoId = (url?: string | null): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
};

const calcAge = (dob?: string | null): number | null => {
    if (!dob) return null;
    const b = new Date(dob);
    if (isNaN(b.getTime())) return null;
    const t = new Date();
    let age = t.getFullYear() - b.getFullYear();
    const m = t.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
    return age;
};

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
                    <Star className={`h-5 w-5 ${n <= value ? 'fill-[#E53F01] text-[#E53F01]' : 'text-[#FCD9BD] dark:text-[#2A2A2A]'}`} />
                </button>
            ))}
        </div>
    );
}

export default function NewDetail() {
    const { player } = usePage<{ player: any }>().props;

    // Minor check — based on users.dob
    const playerAge = calcAge(player?.user?.dob);
    const isMinor = playerAge !== null && playerAge < 18;

    const [videoDuration, setVideoDuration] = useState<string>('');

    React.useEffect(() => {
        const videoUrl: string | undefined = player?.video_url;

        if (!videoUrl) {
            setVideoDuration('');
            return;
        }

        const videoId = getYouTubeVideoId(videoUrl);

        if (!videoId) {
            setVideoDuration('');
            return;
        }

        const controller = new AbortController();
        const params = new URLSearchParams();
        params.append('urls[]', videoUrl);

        fetch(`/youtube/durations?${params.toString()}`, {
            headers: { Accept: 'application/json' },
            signal: controller.signal,
        })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => setVideoDuration(data?.durations?.[videoId] ?? ''))
            .catch((err) => {
                if (err?.name !== 'AbortError') {
                    console.error('Error fetching video duration:', err);
                    setVideoDuration('');
                }
            });

        return () => controller.abort();
    }, [player?.video_url]);
    return (
        <div className="min-h-screen bg-black pt-16 xl:pt-20 2xl:pt-24 dark:bg-[#0D0D0D]">
            <PublicNavbar />

            {/* BREADCRUMB */}
            <div className="mx-auto max-w-7xl bg-black px-4 py-3 sm:px-6 dark:border-[#2A2A2A] dark:bg-[#0D0D0D]">
                <nav className="flex min-w-0 items-center gap-1.5 text-sm text-[#475569] dark:text-[#9A9A9A]">
                    <Link href="/" className="whitespace-nowrap hover:text-[#E53F01]">Home</Link>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#CBD5E1] dark:text-[#555]" />
                    <Link href="/players" className="whitespace-nowrap hover:text-[#E53F01]">Players</Link>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#CBD5E1] dark:text-[#555]" />
                    <span className="min-w-0 truncate font-medium whitespace-nowrap text-[#E53F01] dark:text-[#F5F5F5]">{
                        player?.user?.name}</span>
                </nav>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
                <main className="min-w-0 space-y-6 overflow-x-hidden">

                    {/* ═══════════ MINOR NOTICE — own row above player info + video ═══════════ */}

                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E53F01]/60 bg-[#E53F01]/10 px-3 py-1 text-xs font-semibold text-[#ff8a4c]">
                            <Users className="h-3.5 w-3.5 shrink-0" />
                            Profile managed by parents
                        </span>
                    </div>

                    {/* ═══════════ TOP: player info (left) + main video (right) ═══════════ */}
                    <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">

                        {/* Player info */}
                        <div className="flex min-w-0 flex-col gap-4 text-white min-[420px]:flex-row sm:gap-6">
                            {/* Smaller photo */}
                            <div className="shrink-0">
                                <img
                                    src={player.photo_url || '/images/img/placeholder.webp'}
                                    alt={player.user?.name ?? ''}
                                    className="h-[10rem] w-[7.5rem] rounded-md border border-[#233247] object-cover sm:h-[11.875rem] sm:w-[9.0625rem] xl:h-[13.125rem] xl:w-[10rem]"
                                />

                            </div>

                            {/* Bigger info text */}
                            <div className="min-w-0 flex-1">
                                <h1 className="text-2xl font-bold tracking-wide break-words uppercase md:text-3xl">
                                    {player.user?.name}
                                </h1>
                                {/* <h3 className="mt-1 text-base font-semibold text-[#eb6c0d] uppercase md:text-lg">
                                    {getPositionName(player.positions ?? [])}
                                </h3> */}

                                <div className="mt-3 space-y-1.25 text-sm md:text-base">
                                    <div className="flex flex-wrap items-center gap-y-1">
                                        <CalendarDays className="mr-2 h-4 w-4 shrink-0 text-[#E53F01] md:h-5 md:w-5" />
                                        <span className="">
                                            <span className=" text-white">Date of Birth:</span>{' '}
                                            {player.user?.dob
                                                ? calcAge(player.user.dob) < 18
                                                    ? new Date(player.user.dob).getFullYear()
                                                    : `${new Date(player.user.dob).toLocaleDateString('en-US', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })} (${calcAge(player.user.dob)})`
                                                : '—'}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-1">
                                        <Users className="mr-2 h-4 w-4 shrink-0 text-[#E53F01] md:h-5 md:w-5" />
                                        <span className="pr-3 text-[#e1e2e6]">Nationality:</span>
                                        {Array.isArray(player.user?.nationality) && player.user.nationality.length > 0 ? (
                                            player.user.nationality.map((code, idx) => (
                                                <span key={code} className="mr-1 inline-flex items-center">
                                                    <ReactCountryFlag countryCode={code} svg style={{ width: '1.2em', height: '1.2em' }} />
                                                    <span className="ml-1">{getCountryName(code)}</span>
                                                    {idx < player.user.nationality.length - 1 && <span className="mr-1">,</span>}
                                                </span>
                                            ))
                                        ) : (
                                            <span>{getCountryName(player.user?.nationality)}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-1">
                                        <Ruler className="mr-2 h-4 w-4 shrink-0 text-[#E53F01] md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Height:</span>
                                        <span className="pl-2 text-gray-100">{player.height ? `${player.height} cm` : '—'}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-1">
                                        <Crosshair className="mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Position:</span>
                                        <span className="pl-2 text-gray-100">{getPositionFullName(player.positions ?? [])}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-1">
                                        <Footprints className="mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Dominant Foot:</span>
                                        <span className="pl-2 text-gray-100">{player.foot ?? '—'}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-1">
                                        <Shield className="mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Current Club:</span>

                                        <span className="pl-2 text-gray-100">{player.user?.nationality && (
                                            <ReactCountryFlag countryCode={player.current_club_country} svg className="mr-1" />
                                        )}{player.current_club ?? '—'}</span>
                                    </div>
                                    {/* <div className="flex flex-wrap items-center gap-y-1">
                                        <Shirt className="mr-2 h-4 w-4 shrink-0 text-[#ff600d] md:h-5 md:w-5" />
                                        <span className="text-[#e1e2e6]">Previous Club:</span>
                                        <span className="pl-2 text-gray-100">Bangu</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Main video — inside card */}
                        <div className="w-full rounded-lg border border-[#1b2a3d] bg-[#0b1523] p-3 sm:p-4">
                            {/* <p className="mb-2 text-[1rem] font-bold text-white">HIGHLIGHTS VIDEO</p> */}
                            <div className="overflow-hidden rounded-md">
                                {getEmbedUrl(player.video_url) ? (
                                    <iframe
                                        src={getEmbedUrl(player.video_url)!}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="aspect-video w-full rounded-md bg-gray-800"
                                    />
                                ) : (
                                    <div className="flex aspect-video w-full flex-col items-center justify-center rounded-md bg-gray-800">
                                        <Video className="mb-2 h-12 w-12 text-white/30" />
                                        <p className="text-sm text-white/40">No highlights uploaded yet</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 flex items-center justify-between text-[0.875rem] text-white">
                                {player?.video_url ? (
                                    <>
                                        <h3 className="min-w-0 truncate pr-2 font-medium">
                                            {player?.videos?.[0]?.label
                                                || player?.video_label
                                                || `${player?.user?.name} - Best Moments`}
                                        </h3>
                                        <span className="shrink-0 text-gray-300">
                                            {videoDuration}
                                        </span>
                                    </>
                                ) : (
                                    <h3 className="italic text-gray-400">No video uploaded yet</h3>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* SUB VIDEOS — each inside card */}
                    <section>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
                            {(player.videos ?? [])
                                .filter((v: any) => v?.url)
                                .slice(1) // Skip first video (already shown as main)
                                .map((v: any, i: number) => (
                                    <div key={i} className="flex flex-col rounded-lg border border-[#1b2a3d] bg-[#0b1523] p-3 sm:p-4">
                                        <div className="overflow-hidden rounded-md">
                                            {getEmbedUrl(v.url) ? (
                                                <iframe
                                                    src={getEmbedUrl(v.url)!}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className="aspect-video w-full rounded-md bg-gray-800"
                                                />
                                            ) : (
                                                <div className="flex aspect-video w-full flex-col items-center justify-center rounded-md bg-gray-800">
                                                    <Video className="mb-2 h-10 w-10 text-white/30" />
                                                    <p className="text-sm text-white/40">Invalid video</p>
                                                </div>
                                            )}
                                        </div>
                                        {v.label && (
                                            <p className="pt-3 text-center text-[1rem] font-bold text-white">{v.label}</p>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </section>

                    {/* IN-CONTENT AD (mobile only) */}
                    <aside className="block space-y-3 lg:hidden">
                        <p className="text-[0.625rem] tracking-wider text-[#94A3B8] uppercase">Sponsored</p>
                        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#222] bg-[#464646] p-5 py-12 text-center">
                            <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
                        </div>
                    </aside>

                    {/* CLUB HISTORY */}
                    <section className="overflow-hidden">
                        <div className="grid gap-2 grid-cols-1 md:gap-4">
                            {/* Positions */}
                            <div className="rounded-xl border border-slate-800 bg-[#06111d] p-5">
                                <h2 className="mb-4 text-[0.8125rem] font-bold text-white uppercase md:text-[1.125rem]">Positions On The Pitch</h2>

                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
                                    {/* Pitch (left) — full width of the column */}
                                    <div className="min-w-0 w-full">
                                        {/* Direction arrow — field positions start from the left */}
                                        <div
                                            className="mb-3 flex items-center"
                                            role="img"
                                            aria-label="Field direction: left to right"
                                        >
                                            <span className="h-[0.1875rem] flex-1 rounded-full bg-[#E53F01]" />
                                            <svg
                                                viewBox="0 0 12 12"
                                                fill="currentColor"
                                                className="-ml-px h-3 w-3 shrink-0 text-[#E53F01] md:h-4 md:w-4"
                                                aria-hidden="true"
                                            >
                                                <path d="M0 0 L12 6 L0 12 Z" />
                                            </svg>
                                        </div>
                                        <PitchPriority selected={player.positions ?? []} />
                                    </div>

                                    {/* Positions list (right, top-aligned) */}
                                    <div className="divide-y divide-[#1b2a3d] overflow-hidden rounded-lg border border-[#1b2a3d] bg-[#0b1523]">
                                        <div className="flex items-center justify-between gap-4 px-4 py-3">
                                            <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-gray-400 md:text-sm">
                                                <span className="h-2 w-2 rounded-full bg-[#E53F01]" />
                                                Main Position
                                            </span>
                                            <span className="min-w-0 truncate text-right text-sm font-semibold text-white md:text-base">
                                                {player.positions?.[0] ? getPositionFullName([player.positions[0]]) : 'Not specified'}
                                            </span>
                                        </div>
                                        {player.positions?.[1] && (
                                            <div className="flex items-center justify-between gap-4 px-4 py-3">
                                                <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-gray-400 md:text-sm">
                                                    <span className="h-2 w-2 rounded-full bg-gray-500" />
                                                    Secondary Position
                                                </span>
                                                <span className="min-w-0 truncate text-right text-sm font-semibold text-white md:text-base">
                                                    {getPositionFullName([player.positions[1]])}
                                                </span>
                                            </div>
                                        )}
                                        {player.positions?.[2] && (
                                            <div className="flex items-center justify-between gap-4 px-4 py-3">
                                                <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-gray-400 md:text-sm">
                                                    <span className="h-2 w-2 rounded-full bg-gray-500" />
                                                    Third Position
                                                </span>
                                                <span className="min-w-0 truncate text-right text-sm font-semibold text-white md:text-base">
                                                    {getPositionFullName([player.positions[2]])}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ACHIEVEMENTS + DESCRIPTION */}
                    <div className="grid grid-cols-1 sm:grid-cols-[15.625rem_1fr] gap-2 md:gap-4 md:grid-cols-[25rem_1fr]">
                        {/* Achievements */}
                        <div className="rounded-lg border border-[#1b2a3d] bg-[#0b1523] p-5">
                            <h2 className="mb-5 text-[0.75rem] font-semibold text-white uppercase md:text-sm">Achievements</h2>
                            <div className="space-y-2 md:space-y-4">
                                {(player.achievements ?? []).filter((item: any) => item?.title).map((item: any, index: number) => (
                                    <div key={index} className="flex items-start gap-1 md:gap-3">
                                        <span className="text-[0.75rem] text-yellow-500 md:text-sm">🏆</span>
                                        <div className="flex gap-3 md:grid md:grid-cols-[6.25rem_1fr]">
                                            <p className="text-[0.75rem] font-medium text-orange-500 md:text-sm">{item.year}</p>
                                            <p className="text-[0.625rem] leading-relaxed text-gray-300 md:text-sm">{item.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* <button className="mt-6 text-[0.75rem] font-medium text-orange-500 transition hover:text-orange-400 md:text-sm">
                                View all achievements →
                            </button> */}
                        </div>
                        {/* Player Description */}
                        <div className="rounded-lg border border-[#1b2a3d] bg-[#0b1523] p-5">
                            <h2 className="mb-4 text-[0.75rem] font-semibold text-white uppercase md:text-sm">
                                Player Description
                            </h2>
                            <div className="w-full">
                                <p className="min-h-48 w-full rounded-lg border border-[#1b2a3d] bg-[#08111d] p-2 text-gray-300 md:p-4">
                                    {player?.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* IN-CONTENT AD (mobile only) */}
                    <aside className="block space-y-3 lg:hidden">
                        <p className="text-[0.625rem] tracking-wider text-[#94A3B8] uppercase">Sponsored</p>
                        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#222] bg-[#464646] p-5 py-12 text-center">
                            <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
                        </div>
                    </aside>

                    {/* COMPETITIONS + RECENT MATCHES */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.50fr] gap-2 md:gap-4 lg:grid-cols-[1fr_1.25fr]">
                        {/* Competition History */}
                        <div className="rounded-lg border border-[#152538] bg-[#07111d] p-4 md:p-6">
                            <h2 className="mb-6 text-[0.875rem] font-bold text-white uppercase md:text-xl">Competition History</h2>
                            <div className="space-y-2 md:space-y-4">
                                {(player.competitions ?? [])
                                    .filter((item: any) => item?.name)
                                    .sort((a: any, b: any) => (Number(b.year) || 0) - (Number(a.year) || 0)) // recent year আগে
                                    .map((item: any, index: number) => (
                                        <div key={index} className="flex items-start justify-between gap-2 md:gap-4">
                                            <div className="flex items-start gap-1 md:gap-3">
                                                {item.country && (
                                                    <ReactCountryFlag countryCode={item.country} svg style={{ width: '1.1em', height: '1.1em' }} className="shrink-0" />
                                                )}
                                                <span className="text-[0.625rem] text-gray-200 md:text-sm">{item.name}</span>
                                            </div>
                                            <span className="text-[0.625rem] whitespace-nowrap text-[#f97316] md:text-sm">{item.year}</span>
                                        </div>
                                    ))}
                            </div>
                            {/* <div className="mt-8 flex justify-end">
                                <button className="flex items-center gap-2 text-[0.8125rem] text-[#f97316] transition hover:text-orange-400 md:text-[1.125rem]">
                                    View all competitions
                                    <ChevronRight className="size-[1.375rem]" />
                                </button>
                            </div>*/}
                        </div>
                        {/* Recent Matches */}
                        {(() => {
                            // Only goalkeeper (e.g. ["GK"]) → hide Goals & Assists
                            const isGoalkeeperOnly =
                                Array.isArray(player?.positions) &&
                                player.positions.length === 1 &&
                                String(player.positions[0]).trim().toUpperCase() === 'GK';

                            return (
                                <div className="overflow-hidden rounded-lg border border-[#152538] bg-[#07111d] p-6">
                                    <h2 className="mb-6 text-[0.875rem] font-bold text-white uppercase md:text-xl">Recent Matches</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-300/10 text-left text-[0.75rem] text-gray-300 uppercase md:text-sm">
                                                    <th className="pb-4">Match</th>
                                                    {!isGoalkeeperOnly && <th className="pb-4 text-center">Goals</th>}
                                                    {!isGoalkeeperOnly && <th className="px-2 pb-4 text-center">Assists</th>}
                                                    <th className="pb-4 text-center">Minutes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(player.matches ?? []).filter((match: any) => match?.home).map((match: any, index: number) => (
                                                    <tr key={index} className="border-b border-gray-300/10 text-[0.625rem] text-gray-200 md:text-[0.875rem]">
                                                        <td className="py-3">
                                                            <div className="flex items-center gap-2 md:gap-4">
                                                                <span>{match.home}</span>
                                                                <span className="font-semibold">{match.score}</span>
                                                                <span>{match.away}</span>
                                                            </div>
                                                        </td>
                                                        {!isGoalkeeperOnly && <td className="py-3 text-center">{match.goals}</td>}
                                                        {!isGoalkeeperOnly && <td className="py-3 text-center">{match.assists}</td>}
                                                        <td className="py-3 text-center">{match.minutes}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </main>
            </div>

            <PublicFooter />
        </div>
    );
}
