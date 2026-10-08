import ScoutNavbar from '@/components/scout/ScoutNavbar';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowRight,
    Award,
    Calendar,
    CheckCircle2,
    ClipboardList,
    Clock,
    Eye,
    FileText,
    Footprints,
    History,
    Mail,
    MapPin,
    MessageCircle,
    Play,
    Plus,
    Ruler,
    Send,
    Shield,
    Target,
    TrendingUp,
    Trophy,
    Weight,
    Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
// ── DB shape ──
interface VideoRow {
    label?: string | null;
    url?: string | null;
}
interface ClubHistoryRow {
    year?: string | number | null;
    club?: string | null;
}
interface TransferRow {
    year?: string | number | null;
    club?: string | null;
    logo?: string | null;
}
interface AchievementRow {
    year?: string | number | null;
    title?: string | null;
}
interface CompetitionRow {
    name?: string | null;
    year?: string | number | null;
}
interface MatchRow {
    home?: string | null;
    score?: string | null;
    away?: string | null;
    goals?: string | number | null;
    assists?: string | number | null;
    minutes?: string | number | null;
}
interface PlayerProfileRow {
    id: number;
    player_id: string | null;
    nickname: string | null;
    gender: string | null;
    height: number | null;
    weight: number | null;
    birth_city: string | null;
    birth_country: string | null;
    current_club: string | null;
    in_team_since: string | null;
    agent: string | null;
    modality: string | null;
    positions: string[] | null;
    foot: string | null;
    photo_url: string | null;
    video_url: string | null;
    videos: VideoRow[] | null;
    club_history: ClubHistoryRow[] | null;
    transfer_history: TransferRow[] | null;
    achievements: AchievementRow[] | null;
    competitions: CompetitionRow[] | null;
    matches: MatchRow[] | null;
    description: string | null;
    user?: {
        id: number;
        name: string | null;
        email: string | null;
        dob: string | null;
        nationality: string | null;
        whatsapp: string | null;
    } | null;
}
interface ScoutRating {
    technical: number;
    physical: number;
    tactical: number;
    mental: number;
    notes: string;
}
// ── helpers ──
const POSITION_NAMES: Record<string, string> = {
    GK: 'Goalkeeper',
    LB: 'Left Back',
    'CB-L': 'Centre Back (L)',
    'CB-R': 'Centre Back (R)',
    RB: 'Right Back',
    LM: 'Left Midfielder',
    'CM-L': 'Centre Midfielder (L)',
    'CM-R': 'Centre Midfielder (R)',
    RM: 'Right Midfielder',
    CAM: 'Attacking Midfielder',
    LW: 'Left Winger',
    ST: 'Striker',
    RW: 'Right Winger',
    CF: 'Centre Forward',
};
const getCountryName = (code?: string | null): string => {
    if (!code) return '';
    try {
        return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
    } catch {
        return code;
    }
};
const codeToFlag = (code?: string | null): string => {
    if (!code) return '🏳️';

    const countryCode = code.trim().toUpperCase();

    if (!/^[A-Z]{2}$/.test(countryCode)) {
        return '🏳️';
    }

    return countryCode
        .split('')
        .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join('');
};
const calcAge = (dob?: string | null): number | null => {
    if (!dob) return null;
    const d = new Date(dob);
    if (isNaN(d.getTime())) return null;
    const age = new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970;
    return age >= 0 ? age : null;
};
const nonEmpty = (v: any): boolean => v !== null && v !== undefined && String(v).trim() !== '';
const toNum = (v: any): number => {
    const n = Number(v);
    return isNaN(n) ? 0 : n;
};
// YouTube / Vimeo theke thumbnail
const videoThumb = (url?: string | null): string | null => {
    if (!url) return null;
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) return `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`;
    return null;
};
const initials = (name: string) =>
    name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
export default function Detail() {
    const {
        player,
        similarPlayers = [],
        existingRating,
    } = usePage<{
        player: PlayerProfileRow;
        similarPlayers: PlayerProfileRow[];
        existingRating?: ScoutRating | null;
    }>().props;
    const [rating, setRating] = useState<ScoutRating>({
        technical: existingRating?.technical ?? 0,
        physical: existingRating?.physical ?? 0,
        tactical: existingRating?.tactical ?? 0,
        mental: existingRating?.mental ?? 0,
        notes: existingRating?.notes ?? '',
    });
    const [savingRating, setSavingRating] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [isShortlisted, setIsShortlisted] = useState(false);
    // toast dekhao, 3 second por nijei chole jabe
    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };
    // rating save — thakle update, na thakle notun create
    // const handleSaveRating = () => {
    //     setSavingRating(true);
    //     router.post(
    //         `/scouting/player/${player?.id}/rating`,
    //         { ...rating },
    //         {
    //             preserveScroll: true,
    //             onSuccess: () => showToast('Rating submitted'),
    //             onFinish: () => setSavingRating(false),
    //         }
    //     );
    // };
    // rating save — thakle update, na thakle notun create
    // goToReport = true hole save howar por report page-e niye jabe
    const handleSaveRating = (goToReport = false) => {
        setSavingRating(true);
        router.post(
            `/agent/player/${player?.id}/rating`,
            { ...rating },
            {
                preserveScroll: true,
                // preserveState na dile component remount hoy ar toast saathe saathe hariye jay
                preserveState: true,
                onSuccess: () => {
                    if (goToReport) {
                        router.visit(`/scouting/player/${player?.id}/report`);
                    } else {
                        showToast('Rating submitted');
                    }
                },
                onFinish: () => setSavingRating(false),
            },
        );
    };
    const handleRatingChange = (category: keyof Omit<ScoutRating, 'notes'>, value: number) => {
        setRating((prev) => ({ ...prev, [category]: value }));
    };
    const averageRating = (rating.technical + rating.physical + rating.tactical + rating.mental) / 4 || 0;
    // ── derived data ──
    const fullName = player?.user?.name ?? 'Unnamed player';
    const age = calcAge(player?.user?.dob);
    const positions = Array.isArray(player?.positions) ? player.positions : [];
    const mainPosition = positions[0] ?? null;
    const positionDetail = mainPosition ? (POSITION_NAMES[mainPosition] ?? mainPosition) : null;
    const nationality = getCountryName(player?.user?.nationality);
    const nationalityFlag = codeToFlag(player?.user?.nationality);
    const videos = (Array.isArray(player?.videos) ? player.videos : []).filter((v) => nonEmpty(v?.url));
    const clubHistory = (Array.isArray(player?.club_history) ? player.club_history : []).filter((c) => nonEmpty(c?.club));
    const transferHistory = (Array.isArray(player?.transfer_history) ? player.transfer_history : []).filter((c) => nonEmpty(c?.club));
    const achievements = (Array.isArray(player?.achievements) ? player.achievements : []).filter((a) => nonEmpty(a?.title));
    const competitions = (Array.isArray(player?.competitions) ? player.competitions : []).filter((c) => nonEmpty(c?.name));
    const matches = (Array.isArray(player?.matches) ? player.matches : []).filter((m) => nonEmpty(m?.home));
    // matches theke season stats
    const stats = useMemo(() => {
        return matches.reduce(
            (acc, m) => ({
                appearances: acc.appearances + 1,
                goals: acc.goals + toNum(m.goals),
                assists: acc.assists + toNum(m.assists),
                minutes: acc.minutes + toNum(m.minutes),
            }),
            { appearances: 0, goals: 0, assists: 0, minutes: 0 },
        );
    }, [matches]);
    const memberSince = player?.in_team_since
        ? new Date(`${player.in_team_since}-01`).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        })
        : null;
    return (
        <div className="min-h-screen bg-[#0D0D0D] font-sans text-[#F5F5F5]">
            <ScoutNavbar />
            {/* TOAST */}
            {toast && (
                <div className="fixed right-6 bottom-6 z-[100] flex items-center gap-3 rounded-xl border border-white/10 bg-[#0F172A] px-5 py-3.5 shadow-2xl">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-sm font-semibold text-white">{toast}</span>
                </div>
            )}
            {/* LEADERBOARD AD - TOP */}
            <div className="w-full border-b border-[#2A2A2A] bg-[#111111] pt-20 pb-3">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex justify-center">
                        <div className="relative flex h-[90px] w-full max-w-[728px] items-center justify-between overflow-hidden rounded-2xl bg-black px-6">
                            <span className="absolute top-1 right-2 text-[10px] tracking-wider text-white/40 uppercase">Ad</span>
                            <div className="flex items-center gap-4">
                                <div className="font-display text-3xl font-black text-white italic">NIKE</div>
                                <div className="hidden h-12 w-px bg-white/20 sm:block" />
                                <div className="hidden sm:block">
                                    <div className="font-display text-xl leading-tight font-bold text-[#E53F01]">PHANTOM GX 2</div>
                                    <div className="text-xs text-white/70">Just Do It.</div>
                                </div>
                            </div>
                            <button className="rounded-xl bg-[#E53F01] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#E53F01] sm:px-6">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* HERO HEADER */}
            <section className="relative overflow-hidden bg-[#0F172A] text-white">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent" />
                <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
                    <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end">
                        {player?.photo_url ? (
                            <img
                                src={player.photo_url}
                                alt={fullName}
                                className="h-32 w-32 rounded-2xl border-4 border-[#E53F01] object-cover sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                            />
                        ) : (
                            <div className="font-display flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-[#E53F01] bg-white/10 text-5xl font-black text-white/70 sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                                {initials(fullName)}
                            </div>
                        )}
                        <div className="w-full flex-1">
                            <div className="mb-3 flex flex-wrap items-center gap-3">
                                {mainPosition && (
                                    <span className="inline-flex items-center rounded-md border border-[#E53F01] bg-[rgba(255,107,0,0.12)] px-3 py-1 text-xs font-bold tracking-wider text-[#E53F01] uppercase">
                                        {mainPosition}
                                    </span>
                                )}
                                {player?.player_id && (
                                    <span className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/10 px-2 py-1 font-mono text-xs text-white/80">
                                        {player.player_id}
                                    </span>
                                )}
                                {player?.modality && (
                                    <span className="inline-flex items-center gap-1 rounded-md border border-blue-400 bg-blue-500/20 px-2 py-1 text-xs font-semibold text-blue-300">
                                        <Award className="h-3 w-3" />
                                        {player.modality}
                                    </span>
                                )}
                            </div>
                            <h1 className="font-display mb-2 text-4xl leading-none font-bold uppercase sm:text-5xl lg:text-6xl">{fullName}</h1>
                            {positionDetail && <p className="mb-3 text-sm font-semibold tracking-wider text-[#E53F01] uppercase">{positionDetail}</p>}
                            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
                                {nationality && (
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-base">{nationalityFlag}</span>
                                        {nationality}
                                    </span>
                                )}
                                {player?.birth_city && (
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="h-4 w-4" />
                                        {player.birth_city}
                                    </span>
                                )}
                                {age !== null && (
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4" />
                                        {player?.user?.dob
                                            ? (() => {
                                                const birthDate = new Date(player.user.dob);
                                                const today = new Date();

                                                let age = today.getFullYear() - birthDate.getFullYear();

                                                const hasBirthdayPassed =
                                                    today.getMonth() > birthDate.getMonth() ||
                                                    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

                                                if (!hasBirthdayPassed) {
                                                    age--;
                                                }

                                                return age < 18 ? `Birth Year: ${birthDate.getFullYear()}` : `${age} years`;
                                            })()
                                            : '—'}
                                    </span>
                                )}
                                {player?.current_club && (
                                    <span className="flex items-center gap-1.5">
                                        <Shield className="h-4 w-4" />
                                        {player.current_club}
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
                                    <div className="mb-1 text-[10px] tracking-wider text-white/50 uppercase">Goals / Assists</div>
                                    <div className="font-mono text-xl font-bold text-[#E53F01] sm:text-2xl">
                                        {stats.goals}/{stats.assists}
                                    </div>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
                                    <div className="mb-1 text-[10px] tracking-wider text-white/50 uppercase">Appearances</div>
                                    <div className="font-mono text-xl font-bold sm:text-2xl">{stats.appearances}</div>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
                                    <div className="mb-1 text-[10px] tracking-wider text-white/50 uppercase">Videos</div>
                                    <div className="font-mono text-xl font-bold sm:text-2xl">{videos.length}</div>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
                                    <div className="mb-1 text-[10px] tracking-wider text-white/50 uppercase">Trophies</div>
                                    <div className="font-mono text-xl font-bold sm:text-2xl">{achievements.length}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* MAIN CONTENT */}
            <section className="bg-[#111111] py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* LEFT SIDEBAR AD */}
                        <aside className="hidden lg:col-span-3 lg:block">
                            <div className="sticky top-24 space-y-6">
                                <div className="relative mx-auto h-[600px] w-full max-w-[300px] overflow-hidden rounded-2xl bg-[#0B1929]">
                                    <span className="absolute top-2 left-2 z-10 text-[10px] tracking-wider text-white/40 uppercase">Sponsored</span>
                                    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-white">
                                        <div className="pt-6 text-center">
                                            <div className="font-display mb-1 text-3xl font-black tracking-tight">WYSCOUT</div>
                                            <div className="mx-auto mb-4 h-1 w-12 bg-blue-400" />
                                            <div className="text-xs tracking-widest text-blue-300 uppercase">Scouting Intelligence</div>
                                        </div>
                                        <div className="px-2 text-center">
                                            <div className="font-display mb-3 text-2xl leading-tight font-bold">DISCOVER 600,000+ PLAYERS</div>
                                            <p className="mb-6 text-sm text-white/70">
                                                Advanced video analysis, player databases & opposition reports trusted by elite clubs worldwide.
                                            </p>
                                            <div className="mb-6 grid grid-cols-2 gap-2 text-left">
                                                <div className="rounded-lg bg-white/5 p-2">
                                                    <div className="text-[10px] font-bold text-blue-400 uppercase">Players</div>
                                                    <div className="font-mono text-lg font-bold">600K+</div>
                                                </div>
                                                <div className="rounded-lg bg-white/5 p-2">
                                                    <div className="text-[10px] font-bold text-blue-400 uppercase">Clubs</div>
                                                    <div className="font-mono text-lg font-bold">3,200</div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600">
                                            Request a Demo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        {/* MAIN COLUMN */}
                        <main className="min-w-0 space-y-6 lg:col-span-6">
                            {/* SCOUT ACTIONS */}
                            <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="mb-1 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Agent Toolkit</div>
                                        <h2 className="font-display text-2xl font-bold uppercase">Agent Actions</h2>
                                    </div>
                                    <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-md border border-[#E53F01] bg-[rgba(255,107,0,0.12)] px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#E53F01] uppercase">
                                        <Eye className="h-3 w-3" />
                                        Agent View
                                    </span>
                                </div>
                                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2">
                                    {/* <button
                                        onClick={() => setIsShortlisted(!isShortlisted)}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${isShortlisted
                                            ? 'bg-[rgba(255,107,0,0.12)] border-[#E53F01] text-[#E53F01]'
                                            : 'bg-[#1F1F1F] border-[#2A2A2A] hover:border-[#E53F01]'
                                            }`}
                                    >
                                        <Bookmark className={`w-5 h-5 ${isShortlisted ? 'fill-current' : ''}`} />
                                        <span className="text-xs font-semibold text-center">{isShortlisted ? 'Shortlisted' : 'Add to List'}</span>
                                    </button> */}
                                    <Link
                                        href={`/scouting/player/${player?.id}/report`}
                                        className="flex flex-col items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1F1F1F] p-4 transition-colors hover:border-[#E53F01]"
                                    >
                                        <FileText className="h-5 w-5" />
                                        <span className="text-center text-xs font-semibold">Write Report</span>
                                    </Link>
                                    <Link
                                        href={`/scouting/player/${player?.id}/contact`}
                                        className="flex flex-col items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1F1F1F] p-4 transition-colors hover:border-[#E53F01]"
                                    >
                                        <Send className="h-5 w-5" />
                                        <span className="text-center text-xs font-semibold">Contact</span>
                                    </Link>
                                    {/* <Link href={`/scouting/player/${player?.id}/compare`} className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-[#1F1F1F] border-[#2A2A2A] hover:border-[#E53F01] transition-colors">
                                        <BarChart3 className="w-5 h-5" />
                                        <span className="text-xs font-semibold text-center">Compare</span>
                                    </Link> */}
                                </div>
                                {/* RATING WIDGET */}
                                <div className="border-t border-[#2A2A2A] pt-6">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-display text-lg font-bold uppercase">Your Rating</h3>
                                            <p className="mt-0.5 text-xs text-[#9A9A9A]">
                                                {existingRating ? 'You already rated this player — update anytime' : 'Rate on a scale of 1 to 10'}
                                            </p>
                                        </div>
                                        {averageRating > 0 && (
                                            <div className="text-right">
                                                <div className="text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Overall</div>
                                                <div className="font-mono text-2xl font-bold text-[#E53F01]">{averageRating.toFixed(1)}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-5">
                                        {[
                                            { key: 'technical', label: 'Technical', icon: Target, desc: 'Ball control, passing, finishing' },
                                            { key: 'physical', label: 'Physical', icon: Activity, desc: 'Pace, strength, stamina' },
                                            { key: 'tactical', label: 'Tactical', icon: Shield, desc: 'Positioning, awareness, decision-making' },
                                            { key: 'mental', label: 'Mental', icon: Zap, desc: 'Composure, leadership, work rate' },
                                        ].map((cat) => {
                                            const Icon = cat.icon;
                                            const value = rating[cat.key as keyof Omit<ScoutRating, 'notes'>];
                                            return (
                                                <div key={cat.key}>
                                                    <div className="mb-2 flex items-center justify-between gap-3">
                                                        <div className="flex min-w-0 items-center gap-2">
                                                            <Icon className="h-4 w-4 flex-shrink-0 text-[#E53F01]" />
                                                            <div className="min-w-0">
                                                                <div className="text-sm font-semibold">{cat.label}</div>
                                                                <div className="truncate text-[11px] text-[#555555]">{cat.desc}</div>
                                                            </div>
                                                        </div>
                                                        <div className="w-10 flex-shrink-0 text-right font-mono text-lg font-bold text-[#E53F01]">
                                                            {value || '—'}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {Array.from({ length: 10 }).map((_, i) => {
                                                            const score = i + 1;
                                                            return (
                                                                <button
                                                                    key={i}
                                                                    onClick={() =>
                                                                        handleRatingChange(cat.key as keyof Omit<ScoutRating, 'notes'>, score)
                                                                    }
                                                                    className={`h-8 flex-1 rounded-md text-xs font-bold transition-colors ${value >= score
                                                                        ? 'bg-[#E53F01] text-white'
                                                                        : 'bg-[#1F1F1F] text-[#555555] hover:bg-[rgba(255,107,0,0.12)]'
                                                                        }`}
                                                                >
                                                                    {score}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-6">
                                        <label className="mb-2 block text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">
                                            Agent Notes
                                        </label>
                                        <textarea
                                            value={rating.notes}
                                            onChange={(e) => setRating({ ...rating, notes: e.target.value })}
                                            rows={4}
                                            placeholder="Write your observations, strengths, weaknesses, and recommendations..."
                                            className="w-full resize-none rounded-xl border border-[#2A2A2A] bg-[#111111] px-4 py-3 text-sm focus:border-[#E53F01] focus:ring-1 focus:ring-orange-800 focus:outline-none"
                                        />
                                    </div>
                                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                        <button
                                            onClick={() => handleSaveRating(false)}
                                            disabled={savingRating}
                                            className="flex-1 rounded-xl bg-[#E53F01] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E53F01] disabled:opacity-60"
                                        >
                                            {savingRating ? 'Saving...' : existingRating ? 'Update Rating' : 'Save Rating'}
                                        </button>
                                        <button
                                            onClick={() => handleSaveRating(true)}
                                            disabled={savingRating}
                                            className="flex-1 rounded-xl border border-[#2A2A2A] bg-[#1F1F1F] px-6 py-3 text-sm font-semibold text-[#F5F5F5] transition-colors hover:border-[#E53F01] disabled:opacity-60"
                                        >
                                            Save & Add to Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* BIO */}
                            <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                                <div className="mb-2 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">About</div>
                                <h2 className="font-display mb-3 text-2xl font-bold uppercase">Player Football Identity</h2>
                                <p className="mb-6 text-sm leading-relaxed text-[#9A9A9A]">{player?.description || 'No description added yet.'}</p>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    <div>
                                        <div className="mb-1 text-[10px] tracking-wider text-[#555555] uppercase">Height</div>
                                        <div className="flex items-center gap-1.5 font-mono text-base font-bold">
                                            <Ruler className="h-4 w-4 text-[#E53F01]" />
                                            {player?.height ? `${player.height} cm` : '—'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-[10px] tracking-wider text-[#555555] uppercase">Weight</div>
                                        <div className="flex items-center gap-1.5 font-mono text-base font-bold">
                                            <Weight className="h-4 w-4 text-[#E53F01]" />
                                            {player?.weight ? `${player.weight} kg` : '—'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-[10px] tracking-wider text-[#555555] uppercase">Foot</div>
                                        <div className="flex items-center gap-1.5 font-mono text-base font-bold">
                                            <Footprints className="h-4 w-4 text-[#E53F01]" />
                                            {player?.foot || '—'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-[10px] tracking-wider text-[#555555] uppercase">In Team Since</div>
                                        <div className="font-mono text-base font-bold">{memberSince || '—'}</div>
                                    </div>
                                </div>
                                {positions.length > 0 && (
                                    <div className="mt-5 border-t border-[#2A2A2A] pt-5">
                                        <div className="mb-2 text-[10px] tracking-wider text-[#555555] uppercase">Positions</div>
                                        <div className="flex flex-wrap gap-2">
                                            {positions.map((p) => (
                                                <span
                                                    key={p}
                                                    className="inline-flex items-center rounded-md border border-[#E53F01] bg-[rgba(255,107,0,0.12)] px-2.5 py-1 text-xs font-bold tracking-wider text-[#E53F01] uppercase"
                                                >
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* IN-CONTENT AD */}
                            <div className="relative flex h-[100px] w-full items-center justify-between gap-3 overflow-hidden rounded-2xl bg-black px-6">
                                <span className="absolute top-1 right-2 text-[10px] tracking-wider text-white/40 uppercase">Ad</span>
                                <div className="flex min-w-0 items-center gap-4">
                                    <div className="flex flex-shrink-0 flex-col">
                                        <div className="mb-1 h-2 w-12 rounded-sm bg-white" />
                                        <div className="mb-1 h-2 w-12 rounded-sm bg-white" />
                                        <div className="h-2 w-12 rounded-sm bg-white" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-display truncate text-xl font-black tracking-tight text-white">ADIDAS PREDATOR</div>
                                        <div className="text-xs text-white/60">Impossible is Nothing.</div>
                                    </div>
                                </div>
                                <button className="flex-shrink-0 rounded-xl bg-white px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-white/90 sm:px-6">
                                    Discover
                                </button>
                            </div>
                            {/* HIGHLIGHTS */}
                            {videos.length > 0 && (
                                <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div>
                                            <div className="mb-1 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Video Library</div>
                                            <h2 className="font-display text-2xl font-bold uppercase">Highlights</h2>
                                        </div>
                                        <span className="font-mono text-xs text-[#9A9A9A]">{videos.length} videos</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {videos.map((clip, i) => {
                                            const thumb = videoThumb(clip.url);
                                            return (
                                                <a key={i} href={clip.url ?? '#'} target="_blank" rel="noreferrer" className="group block">
                                                    <div className="relative mb-2 aspect-video overflow-hidden rounded-xl bg-[#0F172A]">
                                                        {thumb && (
                                                            <img
                                                                src={thumb}
                                                                alt={clip.label ?? 'Highlight'}
                                                                className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                                                            />
                                                        )}
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E53F01] transition-transform group-hover:scale-110">
                                                                <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h3 className="line-clamp-1 text-sm font-semibold">{clip.label || 'Highlight'}</h3>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {/* SEASON STATS */}
                            {matches.length > 0 && (
                                <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                                    <div className="mb-2 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">From Recent Matches</div>
                                    <h2 className="font-display mb-5 text-2xl font-bold uppercase">Statistics</h2>
                                    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        {[
                                            { label: 'Appearances', value: stats.appearances, icon: Trophy },
                                            { label: 'Goals', value: stats.goals, icon: Target },
                                            { label: 'Assists', value: stats.assists, icon: TrendingUp },
                                            { label: 'Minutes', value: stats.minutes, icon: Clock },
                                        ].map((stat) => {
                                            const Icon = stat.icon;
                                            return (
                                                <div key={stat.label} className="rounded-xl border border-[#2A2A2A] bg-[#1F1F1F] p-4">
                                                    <Icon className="mb-2 h-4 w-4 text-[#E53F01]" />
                                                    <div className="font-mono text-2xl font-bold">{stat.value}</div>
                                                    <div className="mt-1 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* Match list */}
                                    <div className="space-y-2">
                                        {matches.map((m, i) => (
                                            <div
                                                key={i}
                                                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#2A2A2A] bg-[#1F1F1F] px-4 py-3"
                                            >
                                                <div className="flex min-w-0 items-center gap-2 text-sm font-semibold">
                                                    <span className="truncate">{m.home}</span>
                                                    <span className="font-mono text-[#E53F01]">{m.score || 'vs'}</span>
                                                    <span className="truncate">{m.away}</span>
                                                </div>
                                                <div className="flex items-center gap-3 font-mono text-xs text-[#9A9A9A]">
                                                    <span>G {toNum(m.goals)}</span>
                                                    <span>A {toNum(m.assists)}</span>
                                                    <span>{toNum(m.minutes)}'</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* ACHIEVEMENTS */}
                            {achievements.length > 0 && (
                                <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                                    <div className="mb-2 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Honours</div>
                                    <h2 className="font-display mb-5 text-2xl font-bold uppercase">Achievements</h2>
                                    <div className="space-y-3">
                                        {achievements.map((a, i) => (
                                            <div key={i} className="flex items-center gap-4 border-b border-[#2A2A2A] pb-3 last:border-0 last:pb-0">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#E53F01] bg-[rgba(255,107,0,0.12)]">
                                                    <Award className="h-5 w-5 text-[#E53F01]" />
                                                </div>
                                                <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-2">
                                                    <span className="text-sm font-semibold">{a.title}</span>
                                                    <span className="font-mono text-xs text-[#9A9A9A]">{a.year}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* COMPETITIONS */}
                            {competitions.length > 0 && (
                                <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                                    <div className="mb-2 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Experience</div>
                                    <h2 className="font-display mb-5 text-2xl font-bold uppercase">Competitions</h2>
                                    <div className="space-y-3">
                                        {competitions.map((c, i) => (
                                            <div key={i} className="flex items-center gap-4 border-b border-[#2A2A2A] pb-3 last:border-0 last:pb-0">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#E53F01] bg-[rgba(255,107,0,0.12)]">
                                                    <ClipboardList className="h-5 w-5 text-[#E53F01]" />
                                                </div>
                                                <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-2">
                                                    <span className="text-sm font-semibold">{c.name}</span>
                                                    <span className="font-mono text-xs text-[#9A9A9A]">{c.year}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* CAREER — club history */}
                            {clubHistory.length > 0 && (
                                <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                                    <div className="mb-2 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Trajectory</div>
                                    <h2 className="font-display mb-5 text-2xl font-bold uppercase">Career History</h2>
                                    <div className="space-y-4">
                                        {clubHistory.map((entry, i) => (
                                            <div key={i} className="flex items-start gap-4 border-b border-[#2A2A2A] pb-4 last:border-0 last:pb-0">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#E53F01] bg-[rgba(255,107,0,0.12)]">
                                                    <Trophy className="h-5 w-5 text-[#E53F01]" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                        <h3 className="font-display text-lg font-bold uppercase">{entry.club}</h3>
                                                        <span className="font-mono text-xs text-[#9A9A9A]">{entry.year}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* TRANSFER HISTORY */}
                            {transferHistory.length > 0 && (
                                <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                                    <div className="mb-2 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Movements</div>
                                    <h2 className="font-display mb-5 text-2xl font-bold uppercase">Transfer History</h2>
                                    <div className="space-y-4">
                                        {transferHistory.map((entry, i) => (
                                            <div key={i} className="flex items-center gap-4 border-b border-[#2A2A2A] pb-4 last:border-0 last:pb-0">
                                                {entry.logo ? (
                                                    <img
                                                        src={entry.logo}
                                                        alt={entry.club ?? ''}
                                                        className="h-10 w-10 flex-shrink-0 rounded-lg border border-[#2A2A2A] object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#E53F01] bg-[rgba(255,107,0,0.12)]">
                                                        <History className="h-5 w-5 text-[#E53F01]" />
                                                    </div>
                                                )}
                                                <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-2">
                                                    <h3 className="font-display text-lg font-bold uppercase">{entry.club}</h3>
                                                    <span className="font-mono text-xs text-[#9A9A9A]">{entry.year}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </main>
                        {/* RIGHT SIDEBAR */}
                        <aside className="space-y-6 lg:col-span-3">
                            {/* CONTACT INFO */}
                            <div className="relative rounded-2xl border border-green-800 bg-[rgba(22,163,74,0.08)] p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="text-[10px] font-bold tracking-wider text-green-400 uppercase">Player Contact</div>
                                    <span className="inline-flex items-center gap-1 rounded bg-green-600 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                                        Available
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {player?.user?.email && (
                                        <a
                                            href={`mailto:${player.user.email}`}
                                            className="flex items-center gap-3 rounded-xl border border-green-800 bg-[#161616] p-3 transition-colors hover:border-green-400"
                                        >
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-900/30">
                                                <Mail className="h-5 w-5 text-green-400" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Email</div>
                                                <div className="truncate font-mono text-sm font-semibold">{player.user.email}</div>
                                            </div>
                                        </a>
                                    )}

                                    {player?.user?.whatsapp && (
                                        <a
                                            href={`https://wa.me/${player.user.whatsapp.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-3 rounded-xl border border-green-800 bg-[#161616] p-3 transition-colors hover:border-green-400"
                                        >
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-900/30">
                                                <FaWhatsapp className="h-5 w-5 text-green-400" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">WhatsApp</div>
                                                <div className="truncate font-mono text-sm font-semibold">{player.user.whatsapp}</div>
                                            </div>
                                        </a>
                                    )}

                                    {player?.agent && (
                                        <div className="flex items-center gap-3 rounded-xl border border-green-800 bg-[#161616] p-3">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-900/30">
                                                <MessageCircle className="h-5 w-5 text-green-400" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Agent</div>
                                                <div className="truncate font-mono text-sm font-semibold">{player.agent}</div>
                                            </div>
                                        </div>
                                    )}
                                    {!player?.user?.email && !player?.agent && (
                                        <p className="text-xs text-[#9A9A9A]">No contact details added yet.</p>
                                    )}
                                    <div className="px-1 pt-1 text-[11px] leading-relaxed text-green-400">
                                        Please be professional and verify your scouting credentials before reaching out.
                                    </div>
                                </div>
                            </div>
                            {/* RIGHT SIDEBAR AD */}
                            <div className="hidden md:block">
                                <div className="relative mx-auto h-[600px] w-full max-w-[300px] overflow-hidden rounded-2xl bg-[#1A0F0A]">
                                    <span className="absolute top-2 left-2 z-10 text-[10px] tracking-wider text-white/40 uppercase">Sponsored</span>
                                    <div className="absolute inset-0 flex flex-col p-6 text-white">
                                        <div className="mb-6 pt-4 text-center">
                                            <div className="font-display text-3xl font-black tracking-tight italic">
                                                TRANSFER<span className="text-[#E53F01]">ROOM</span>
                                            </div>
                                            <div className="mt-1 text-xs tracking-widest text-white/50 uppercase">The Transfer Network</div>
                                        </div>
                                        <div className="flex flex-1 flex-col justify-center text-center">
                                            <div className="font-display mb-3 text-2xl leading-tight font-bold">
                                                CONNECT WITH 700+ CLUBS WORLDWIDE
                                            </div>
                                            <p className="mb-6 text-sm text-white/70">
                                                The professional network for football's transfer market. Trusted by decision-makers at the world's
                                                biggest clubs.
                                            </p>
                                            <div className="mb-6 space-y-2 text-left">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#E53F01]" />
                                                    <span>Direct club-to-club messaging</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#E53F01]" />
                                                    <span>Verified player availability</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#E53F01]" />
                                                    <span>Live transfer market data</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full rounded-xl bg-[#E53F01] py-3 text-sm font-bold text-white transition-colors hover:bg-[#E53F01]">
                                            Join the Network
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* HALF PAGE AD */}
                            <div className="relative mx-auto h-[250px] w-full max-w-[300px] overflow-hidden rounded-2xl bg-[#001E2E]">
                                <span className="absolute top-2 right-2 z-10 text-[10px] tracking-wider text-white/40 uppercase">Ad</span>
                                <div className="absolute inset-0 flex flex-col items-center justify-between p-5 text-white">
                                    <div className="pt-2 text-center">
                                        <div className="font-display text-2xl font-black tracking-tight">
                                            SPORT<span className="text-[#0091EA]">RADAR</span>
                                        </div>
                                        <div className="mt-1 text-[10px] tracking-widest text-blue-300 uppercase">Data & Analytics</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-display mb-2 text-lg leading-tight font-bold">ELITE FOOTBALL ANALYTICS</div>
                                        <p className="text-xs text-white/60">Real-time data powering the world's top scouting departments.</p>
                                    </div>
                                    <button className="w-full rounded-lg bg-[#0091EA] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0277BD]">
                                        Explore Solutions
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            {/* SIMILAR PLAYERS */}
            {similarPlayers.length > 0 && (
                <section className="border-t border-[#2A2A2A] bg-[#0D0D0D] py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <div className="mb-1 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Discover More Talent</div>
                                <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">Similar Players</h2>
                            </div>
                            <Link
                                href="/scouting/dashboard"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E53F01] hover:text-[#E53F01]"
                            >
                                View all
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {similarPlayers.map((sp) => {
                                console.log('Similar player nationality:', sp.user?.nationality);
                                const spName = sp.user?.name ?? 'Unnamed player';
                                const spAge = calcAge(sp.user?.dob);
                                const spPositions = Array.isArray(sp.positions) ? sp.positions : [];
                                const spMatches = (Array.isArray(sp.matches) ? sp.matches : []).filter((m) => nonEmpty(m?.home));
                                const spGoals = spMatches.reduce((s, m) => s + toNum(m.goals), 0);
                                const spAssists = spMatches.reduce((s, m) => s + toNum(m.assists), 0);
                                return (
                                    <Link
                                        key={sp.id}
                                        href={`/scouting/player/${sp.id}`}
                                        className="group rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 transition-colors hover:border-[#E53F01]"
                                    >
                                        <div className="mb-4 flex items-start gap-4">
                                            {sp.photo_url ? (
                                                <img
                                                    src={sp.photo_url}
                                                    alt={spName}
                                                    className="h-16 w-16 rounded-xl border-2 border-[#2A2A2A] object-cover transition-colors group-hover:border-[#E53F01]"
                                                />
                                            ) : (
                                                <div className="font-display flex h-16 w-16 items-center justify-center rounded-xl border-2 border-[#2A2A2A] bg-[#1F1F1F] text-lg font-black text-[#94A3B8] transition-colors group-hover:border-[#E53F01]">
                                                    {initials(spName)}
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1.5 flex items-center gap-2">
                                                    {spPositions[0] && (
                                                        <span className="inline-flex items-center rounded border border-[#E53F01] bg-[rgba(255,107,0,0.12)] px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#E53F01] uppercase">
                                                            {spPositions[0]}
                                                        </span>
                                                    )}
                                                    <span className="text-xs">{codeToFlag(sp.user?.nationality)}</span>
                                                </div>
                                                <h3 className="font-display truncate text-lg leading-tight font-bold uppercase">{spName}</h3>
                                                <p className="truncate text-xs text-[#9A9A9A]">{sp.current_club || '—'}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 border-t border-[#2A2A2A] pt-4">
                                            <div>
                                                <div className="text-[9px] font-bold tracking-wider text-[#555555] uppercase">Age</div>
                                                <div className="font-mono text-sm font-bold">{spAge ?? '—'}</div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] font-bold tracking-wider text-[#555555] uppercase">G/A</div>
                                                <div className="font-mono text-sm font-bold">
                                                    {spGoals}/{spAssists}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] font-bold tracking-wider text-[#555555] uppercase">Height</div>
                                                <div className="font-mono text-sm font-bold text-[#E53F01]">{sp.height ? `${sp.height}` : '—'}</div>
                                            </div>
                                        </div>
                                        <button className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#1F1F1F] py-2.5 text-xs font-semibold text-[#F5F5F5] transition-colors group-hover:bg-[#E53F01] group-hover:text-white">
                                            <Plus className="h-3.5 w-3.5" />
                                            View Football Identity
                                        </button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
            {/* ORANGE CTA BAND */}
            <section className="bg-[#E53F01] py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="flex flex-col items-center justify-between gap-6 text-white sm:flex-row">
                        <div className="text-center sm:text-left">
                            <h3 className="font-display text-2xl leading-tight font-bold uppercase sm:text-3xl">Build Your Watchlist</h3>
                            <p className="mt-1 text-sm text-white/90">Track players, compare football identities, and export scouting reports.</p>
                        </div>
                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            {/* <Link href="/scout/shortlist" className="bg-white hover:bg-white/90 text-[#E53F01] px-6 py-3 rounded-xl font-bold text-sm text-center transition-colors">Open My Shortlist</Link> */}
                            <Link
                                href="/agent"
                                className="rounded-xl bg-[#0F172A] px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#1F1F1F]"
                            >
                                Browse Players
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* FOOTER */}
            {/* <footer className="bg-[#0F172A] text-white py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-2">
                            <img src="/images/logo/hilights_logo_transparent_200.png" className="h-10 w-auto dark:hidden mb-3" alt="HiLights Football" />
                            <img src="/images/logo/hilights_logo_dark_200.png" className="h-10 w-auto hidden dark:block mb-3" alt="HiLights Football" />
                            <p className="text-sm text-white/60 max-w-sm">The enterprise football scouting platform connecting clubs, agents, and the next generation of talent.</p>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-3">Scout</div>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/scouting/dashboard" className="text-white/70 hover:text-white">Browse Players</Link></li>
                                <li><Link href="/scout/shortlist" className="text-white/70 hover:text-white">My Shortlist</Link></li>
                                <li><Link href="/scout/reports" className="text-white/70 hover:text-white">Reports</Link></li>
                            </ul>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-3">Company</div>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/about" className="text-white/70 hover:text-white">About</Link></li>
                                <li><Link href="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
                                <li><Link href="/privacy" className="text-white/70 hover:text-white">Privacy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-white/10 text-xs text-white/40 text-center sm:text-left">© 2025 HiLights Football. All rights reserved.</div>
                </div>
            </footer> */}
        </div>
    );
}
