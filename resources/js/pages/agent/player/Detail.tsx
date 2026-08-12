import { Link, usePage, router } from '@inertiajs/react';
import ScoutNavbar from '@/components/scout/ScoutNavbar';
import { useState, useMemo } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import {
    MapPin,
    Calendar,
    Ruler,
    Weight,
    Trophy,
    TrendingUp,
    Play,
    Bookmark,
    Eye,
    Award,
    Target,
    Activity,
    Shield,
    Zap,
    Mail,
    MessageCircle,
    CheckCircle2,
    BarChart3,
    Clock,
    ArrowRight,
    Plus,
    Send,
    FileText,
    ClipboardList,
    History,
    Footprints,
} from 'lucide-react';
// ── DB shape ──
interface VideoRow { label?: string | null; url?: string | null }
interface ClubHistoryRow { year?: string | number | null; club?: string | null }
interface TransferRow { year?: string | number | null; club?: string | null; logo?: string | null }
interface AchievementRow { year?: string | number | null; title?: string | null }
interface CompetitionRow { name?: string | null; year?: string | number | null }
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
    LB: 'Left Back', 'CB-L': 'Centre Back (L)', 'CB-R': 'Centre Back (R)', RB: 'Right Back',
    LM: 'Left Midfielder', 'CM-L': 'Centre Midfielder (L)', 'CM-R': 'Centre Midfielder (R)',
    RM: 'Right Midfielder', CAM: 'Attacking Midfielder',
    LW: 'Left Winger', ST: 'Striker', RW: 'Right Winger', CF: 'Centre Forward',
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
        .map(char =>
            String.fromCodePoint(127397 + char.charCodeAt(0))
        )
        .join('');
};
const calcAge = (dob?: string | null): number | null => {
    if (!dob) return null;
    const d = new Date(dob);
    if (isNaN(d.getTime())) return null;
    const age = new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970;
    return age >= 0 ? age : null;
};
const nonEmpty = (v: any): boolean =>
    v !== null && v !== undefined && String(v).trim() !== '';
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
    name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
export default function Detail() {
    const { player, similarPlayers = [], existingRating } = usePage<{
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
            }
        );
    };
    const handleRatingChange = (category: keyof Omit<ScoutRating, 'notes'>, value: number) => {
        setRating((prev) => ({ ...prev, [category]: value }));
    };
    const averageRating =
        (rating.technical + rating.physical + rating.tactical + rating.mental) / 4 || 0;
    // ── derived data ──
    const fullName = player?.user?.name ?? 'Unnamed player';
    const age = calcAge(player?.user?.dob);
    const positions = Array.isArray(player?.positions) ? player.positions : [];
    const mainPosition = positions[0] ?? null;
    const positionDetail = mainPosition ? POSITION_NAMES[mainPosition] ?? mainPosition : null;
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
            { appearances: 0, goals: 0, assists: 0, minutes: 0 }
        );
    }, [matches]);
    const memberSince = player?.in_team_since
        ? new Date(`${player.in_team_since}-01`).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        })
        : null;
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] font-sans">
            <ScoutNavbar />
            {/* TOAST */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl bg-[#0F172A] px-5 py-3.5 shadow-2xl border border-white/10">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/20 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-sm font-semibold text-white">{toast}</span>
                </div>
            )}
            {/* LEADERBOARD AD - TOP */}
            <div className="w-full bg-[#111111] border-b border-[#2A2A2A] pt-20 pb-3">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-[728px] h-[90px] bg-black rounded-2xl overflow-hidden flex items-center justify-between px-6">
                            <span className="absolute top-1 right-2 text-[10px] text-white/40 uppercase tracking-wider">Ad</span>
                            <div className="flex items-center gap-4">
                                <div className="text-white font-display text-3xl font-black italic">NIKE</div>
                                <div className="hidden sm:block h-12 w-px bg-white/20" />
                                <div className="hidden sm:block">
                                    <div className="text-[#FF6B00] font-display text-xl font-bold leading-tight">PHANTOM GX 2</div>
                                    <div className="text-white/70 text-xs">Just Do It.</div>
                                </div>
                            </div>
                            <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white px-4 sm:px-6 py-2 rounded-xl font-semibold text-sm transition-colors">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* HERO HEADER */}
            <section className="relative bg-[#0F172A] text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end">
                        {player?.photo_url ? (
                            <img
                                src={player.photo_url}
                                alt={fullName}
                                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl border-4 border-[#FF6B00] object-cover"
                            />
                        ) : (
                            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl border-4 border-[#FF6B00] bg-white/10 flex items-center justify-center font-display text-5xl font-black text-white/70">
                                {initials(fullName)}
                            </div>
                        )}
                        <div className="flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                {mainPosition && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-md bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#FF6B00] text-xs font-bold uppercase tracking-wider">
                                        {mainPosition}
                                    </span>
                                )}
                                {player?.player_id && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 border border-white/20 text-white/80 text-xs font-mono">
                                        {player.player_id}
                                    </span>
                                )}
                                {player?.modality && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/20 border border-blue-400 text-blue-300 text-xs font-semibold">
                                        <Award className="w-3 h-3" />
                                        {player.modality}
                                    </span>
                                )}
                            </div>
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-none mb-2">{fullName}</h1>
                            {positionDetail && (
                                <p className="text-sm text-[#FF6B00] uppercase tracking-wider font-semibold mb-3">{positionDetail}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70 mb-4">
                                {nationality && (
                                    <span className="flex items-center gap-1.5"><span className="text-base">{nationalityFlag}</span>{nationality}</span>
                                )}
                                {player?.birth_city && (
                                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{player.birth_city}</span>
                                )}
                                {age !== null && (
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{player?.user?.dob
                                        ? (() => {
                                            const birthDate = new Date(player.user.dob);
                                            const today = new Date();

                                            let age = today.getFullYear() - birthDate.getFullYear();

                                            const hasBirthdayPassed =
                                                today.getMonth() > birthDate.getMonth() ||
                                                (today.getMonth() === birthDate.getMonth() &&
                                                    today.getDate() >= birthDate.getDate());

                                            if (!hasBirthdayPassed) {
                                                age--;
                                            }

                                            return age < 18
                                                ? `Birth Year: ${birthDate.getFullYear()}`
                                                : `${age} years`;
                                        })()
                                        : '—'}</span>
                                )}
                                {player?.current_club && (
                                    <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" />{player.current_club}</span>
                                )}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                                    <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Goals / Assists</div>
                                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#FF6B00]">{stats.goals}/{stats.assists}</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                                    <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Appearances</div>
                                    <div className="font-mono text-xl sm:text-2xl font-bold">{stats.appearances}</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                                    <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Videos</div>
                                    <div className="font-mono text-xl sm:text-2xl font-bold">{videos.length}</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                                    <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Trophies</div>
                                    <div className="font-mono text-xl sm:text-2xl font-bold">{achievements.length}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* MAIN CONTENT */}
            <section className="bg-[#111111] py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* LEFT SIDEBAR AD */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-24 space-y-6">
                                <div className="relative w-full max-w-[300px] mx-auto h-[600px] bg-[#0B1929] rounded-2xl overflow-hidden">
                                    <span className="absolute top-2 left-2 text-[10px] text-white/40 uppercase tracking-wider z-10">Sponsored</span>
                                    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-white">
                                        <div className="text-center pt-6">
                                            <div className="font-display text-3xl font-black tracking-tight mb-1">WYSCOUT</div>
                                            <div className="h-1 w-12 bg-blue-400 mx-auto mb-4" />
                                            <div className="text-xs uppercase tracking-widest text-blue-300">Scouting Intelligence</div>
                                        </div>
                                        <div className="text-center px-2">
                                            <div className="font-display text-2xl font-bold leading-tight mb-3">DISCOVER 600,000+ PLAYERS</div>
                                            <p className="text-sm text-white/70 mb-6">Advanced video analysis, player databases & opposition reports trusted by elite clubs worldwide.</p>
                                            <div className="grid grid-cols-2 gap-2 mb-6 text-left">
                                                <div className="bg-white/5 rounded-lg p-2">
                                                    <div className="text-blue-400 text-[10px] uppercase font-bold">Players</div>
                                                    <div className="font-mono text-lg font-bold">600K+</div>
                                                </div>
                                                <div className="bg-white/5 rounded-lg p-2">
                                                    <div className="text-blue-400 text-[10px] uppercase font-bold">Clubs</div>
                                                    <div className="font-mono text-lg font-bold">3,200</div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm transition-colors">Request a Demo</button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        {/* MAIN COLUMN */}
                        <main className="lg:col-span-6 space-y-6 min-w-0">
                            {/* SCOUT ACTIONS */}
                            <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                                <div className="flex items-center justify-between gap-3 mb-5">
                                    <div className="min-w-0">
                                        <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-1">Agent Toolkit</div>
                                        <h2 className="font-display text-2xl font-bold uppercase">Agent Actions</h2>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] uppercase font-bold tracking-wider flex-shrink-0">
                                        <Eye className="w-3 h-3" />
                                        Agent View
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
                                    {/* <button
                                        onClick={() => setIsShortlisted(!isShortlisted)}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${isShortlisted
                                            ? 'bg-[rgba(255,107,0,0.12)] border-[#FF6B00] text-[#CC5500]'
                                            : 'bg-[#1F1F1F] border-[#2A2A2A] hover:border-[#FF6B00]'
                                            }`}
                                    >
                                        <Bookmark className={`w-5 h-5 ${isShortlisted ? 'fill-current' : ''}`} />
                                        <span className="text-xs font-semibold text-center">{isShortlisted ? 'Shortlisted' : 'Add to List'}</span>
                                    </button> */}
                                    <Link href={`/scouting/player/${player?.id}/report`} className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-[#1F1F1F] border-[#2A2A2A] hover:border-[#FF6B00] transition-colors">
                                        <FileText className="w-5 h-5" />
                                        <span className="text-xs font-semibold text-center">Write Report</span>
                                    </Link>
                                    <Link href={`/scouting/player/${player?.id}/contact`} className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-[#1F1F1F] border-[#2A2A2A] hover:border-[#FF6B00] transition-colors">
                                        <Send className="w-5 h-5" />
                                        <span className="text-xs font-semibold text-center">Contact</span>
                                    </Link>
                                    {/* <Link href={`/scouting/player/${player?.id}/compare`} className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-[#1F1F1F] border-[#2A2A2A] hover:border-[#FF6B00] transition-colors">
                                        <BarChart3 className="w-5 h-5" />
                                        <span className="text-xs font-semibold text-center">Compare</span>
                                    </Link> */}
                                </div>
                                {/* RATING WIDGET */}
                                <div className="border-t border-[#2A2A2A] pt-6">
                                    <div className="flex items-center justify-between mb-5">
                                        <div>
                                            <h3 className="font-display text-lg font-bold uppercase">Your Rating</h3>
                                            <p className="text-xs text-[#9A9A9A] mt-0.5">
                                                {existingRating ? 'You already rated this player — update anytime' : 'Rate on a scale of 1 to 10'}
                                            </p>
                                        </div>
                                        {averageRating > 0 && (
                                            <div className="text-right">
                                                <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold">Overall</div>
                                                <div className="font-mono text-2xl font-bold text-[#FF6B00]">{averageRating.toFixed(1)}</div>
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
                                                    <div className="flex items-center justify-between gap-3 mb-2">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <Icon className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                                                            <div className="min-w-0">
                                                                <div className="text-sm font-semibold">{cat.label}</div>
                                                                <div className="text-[11px] text-[#555555] truncate">{cat.desc}</div>
                                                            </div>
                                                        </div>
                                                        <div className="font-mono text-lg font-bold text-[#FF6B00] w-10 text-right flex-shrink-0">{value || '—'}</div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {Array.from({ length: 10 }).map((_, i) => {
                                                            const score = i + 1;
                                                            return (
                                                                <button
                                                                    key={i}
                                                                    onClick={() => handleRatingChange(cat.key as keyof Omit<ScoutRating, 'notes'>, score)}
                                                                    className={`flex-1 h-8 rounded-md text-xs font-bold transition-colors ${value >= score
                                                                        ? 'bg-[#FF6B00] text-white'
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
                                        <label className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2 block">Agent Notes</label>
                                        <textarea
                                            value={rating.notes}
                                            onChange={(e) => setRating({ ...rating, notes: e.target.value })}
                                            rows={4}
                                            placeholder="Write your observations, strengths, weaknesses, and recommendations..."
                                            className="w-full px-4 py-3 bg-[#111111] border border-[#2A2A2A] rounded-xl text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-orange-800 resize-none"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 mt-5">
                                        <button
                                            onClick={() => handleSaveRating(false)}
                                            disabled={savingRating}
                                            className="flex-1 bg-[#FF6B00] hover:bg-[#CC5500] disabled:opacity-60 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                                        >
                                            {savingRating ? 'Saving...' : existingRating ? 'Update Rating' : 'Save Rating'}
                                        </button>
                                        <button
                                            onClick={() => handleSaveRating(true)}
                                            disabled={savingRating}
                                            className="flex-1 bg-[#1F1F1F] border border-[#2A2A2A] hover:border-[#FF6B00] disabled:opacity-60 text-[#F5F5F5] px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                                        >
                                            Save & Add to Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* BIO */}
                            <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                                <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2">About</div>
                                <h2 className="font-display text-2xl font-bold uppercase mb-3">Player Profile</h2>
                                <p className="text-sm text-[#9A9A9A] leading-relaxed mb-6">
                                    {player?.description || 'No description added yet.'}
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-[#555555] mb-1">Height</div>
                                        <div className="font-mono text-base font-bold flex items-center gap-1.5">
                                            <Ruler className="w-4 h-4 text-[#FF6B00]" />
                                            {player?.height ? `${player.height} cm` : '—'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-[#555555] mb-1">Weight</div>
                                        <div className="font-mono text-base font-bold flex items-center gap-1.5">
                                            <Weight className="w-4 h-4 text-[#FF6B00]" />
                                            {player?.weight ? `${player.weight} kg` : '—'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-[#555555] mb-1">Foot</div>
                                        <div className="font-mono text-base font-bold flex items-center gap-1.5">
                                            <Footprints className="w-4 h-4 text-[#FF6B00]" />
                                            {player?.foot || '—'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-[#555555] mb-1">In Team Since</div>
                                        <div className="font-mono text-base font-bold">{memberSince || '—'}</div>
                                    </div>
                                </div>
                                {positions.length > 0 && (
                                    <div className="mt-5 pt-5 border-t border-[#2A2A2A]">
                                        <div className="text-[10px] uppercase tracking-wider text-[#555555] mb-2">Positions</div>
                                        <div className="flex flex-wrap gap-2">
                                            {positions.map((p) => (
                                                <span key={p} className="inline-flex items-center px-2.5 py-1 rounded-md bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-xs font-bold uppercase tracking-wider">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* IN-CONTENT AD */}
                            <div className="relative w-full h-[100px] bg-black rounded-2xl overflow-hidden flex items-center justify-between gap-3 px-6">
                                <span className="absolute top-1 right-2 text-[10px] text-white/40 uppercase tracking-wider">Ad</span>
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="flex flex-col flex-shrink-0">
                                        <div className="w-12 h-2 bg-white rounded-sm mb-1" />
                                        <div className="w-12 h-2 bg-white rounded-sm mb-1" />
                                        <div className="w-12 h-2 bg-white rounded-sm" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-white font-display text-xl font-black tracking-tight truncate">ADIDAS PREDATOR</div>
                                        <div className="text-white/60 text-xs">Impossible is Nothing.</div>
                                    </div>
                                </div>
                                <button className="bg-white hover:bg-white/90 text-black px-4 sm:px-6 py-2 rounded-xl font-bold text-sm transition-colors flex-shrink-0">Discover</button>
                            </div>
                            {/* HIGHLIGHTS */}
                            {videos.length > 0 && (
                                <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-5">
                                        <div>
                                            <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-1">Video Library</div>
                                            <h2 className="font-display text-2xl font-bold uppercase">Highlights</h2>
                                        </div>
                                        <span className="font-mono text-xs text-[#9A9A9A]">{videos.length} videos</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {videos.map((clip, i) => {
                                            const thumb = videoThumb(clip.url);
                                            return (
                                                <a
                                                    key={i}
                                                    href={clip.url ?? '#'}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="group block"
                                                >
                                                    <div className="relative aspect-video bg-[#0F172A] rounded-xl overflow-hidden mb-2">
                                                        {thumb && (
                                                            <img src={thumb} alt={clip.label ?? 'Highlight'} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                        )}
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h3 className="text-sm font-semibold line-clamp-1">{clip.label || 'Highlight'}</h3>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {/* SEASON STATS */}
                            {matches.length > 0 && (
                                <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                                    <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2">From Recent Matches</div>
                                    <h2 className="font-display text-2xl font-bold uppercase mb-5">Statistics</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                        {[
                                            { label: 'Appearances', value: stats.appearances, icon: Trophy },
                                            { label: 'Goals', value: stats.goals, icon: Target },
                                            { label: 'Assists', value: stats.assists, icon: TrendingUp },
                                            { label: 'Minutes', value: stats.minutes, icon: Clock },
                                        ].map((stat) => {
                                            const Icon = stat.icon;
                                            return (
                                                <div key={stat.label} className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl p-4">
                                                    <Icon className="w-4 h-4 text-[#FF6B00] mb-2" />
                                                    <div className="font-mono text-2xl font-bold">{stat.value}</div>
                                                    <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mt-1">{stat.label}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* Match list */}
                                    <div className="space-y-2">
                                        {matches.map((m, i) => (
                                            <div key={i} className="flex flex-wrap items-center justify-between gap-2 bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl px-4 py-3">
                                                <div className="flex items-center gap-2 text-sm font-semibold min-w-0">
                                                    <span className="truncate">{m.home}</span>
                                                    <span className="font-mono text-[#FF6B00]">{m.score || 'vs'}</span>
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
                                <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                                    <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2">Honours</div>
                                    <h2 className="font-display text-2xl font-bold uppercase mb-5">Achievements</h2>
                                    <div className="space-y-3">
                                        {achievements.map((a, i) => (
                                            <div key={i} className="flex items-center gap-4 pb-3 border-b border-[#2A2A2A] last:border-0 last:pb-0">
                                                <div className="w-10 h-10 rounded-lg bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] flex items-center justify-center flex-shrink-0">
                                                    <Award className="w-5 h-5 text-[#FF6B00]" />
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-wrap items-baseline justify-between gap-2">
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
                                <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                                    <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2">Experience</div>
                                    <h2 className="font-display text-2xl font-bold uppercase mb-5">Competitions</h2>
                                    <div className="space-y-3">
                                        {competitions.map((c, i) => (
                                            <div key={i} className="flex items-center gap-4 pb-3 border-b border-[#2A2A2A] last:border-0 last:pb-0">
                                                <div className="w-10 h-10 rounded-lg bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] flex items-center justify-center flex-shrink-0">
                                                    <ClipboardList className="w-5 h-5 text-[#FF6B00]" />
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-wrap items-baseline justify-between gap-2">
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
                                <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                                    <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2">Trajectory</div>
                                    <h2 className="font-display text-2xl font-bold uppercase mb-5">Career History</h2>
                                    <div className="space-y-4">
                                        {clubHistory.map((entry, i) => (
                                            <div key={i} className="flex items-start gap-4 pb-4 border-b border-[#2A2A2A] last:border-0 last:pb-0">
                                                <div className="w-10 h-10 rounded-lg bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] flex items-center justify-center flex-shrink-0">
                                                    <Trophy className="w-5 h-5 text-[#FF6B00]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
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
                                <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                                    <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2">Movements</div>
                                    <h2 className="font-display text-2xl font-bold uppercase mb-5">Transfer History</h2>
                                    <div className="space-y-4">
                                        {transferHistory.map((entry, i) => (
                                            <div key={i} className="flex items-center gap-4 pb-4 border-b border-[#2A2A2A] last:border-0 last:pb-0">
                                                {entry.logo ? (
                                                    <img src={entry.logo} alt={entry.club ?? ''} className="w-10 h-10 rounded-lg object-cover border border-[#2A2A2A] flex-shrink-0" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] flex items-center justify-center flex-shrink-0">
                                                        <History className="w-5 h-5 text-[#FF6B00]" />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0 flex flex-wrap items-baseline justify-between gap-2">
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
                        <aside className="lg:col-span-3 space-y-6">
                            {/* CONTACT INFO */}
                            <div className="relative bg-[rgba(22,163,74,0.08)] border border-green-800 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-[10px] uppercase font-bold tracking-wider text-green-400">Player Contact</div>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider">Available</span>
                                </div>
                                <div className="space-y-3">

                                    {player?.user?.email && (
                                        <a
                                            href={`mailto:${player.user.email}`}
                                            className="flex items-center gap-3 p-3 bg-[#161616] border border-green-800 rounded-xl hover:border-green-400 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-green-400" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold">
                                                    Email
                                                </div>
                                                <div className="font-mono text-sm font-semibold truncate">
                                                    {player.user.email}
                                                </div>
                                            </div>
                                        </a>
                                    )}

                                    {player?.user?.whatsapp && (
                                        <a
                                            href={`https://wa.me/${player.user.whatsapp.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-3 p-3 bg-[#161616] border border-green-800 rounded-xl hover:border-green-400 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                                <FaWhatsapp className="w-5 h-5 text-green-400" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold">
                                                    WhatsApp
                                                </div>
                                                <div className="font-mono text-sm font-semibold truncate">
                                                    {player.user.whatsapp}
                                                </div>
                                            </div>
                                        </a>
                                    )}


                                    {player?.agent && (
                                        <div className="flex items-center gap-3 p-3 bg-[#161616] border border-green-800 rounded-xl">
                                            <div className="w-10 h-10 rounded-lg bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                                <MessageCircle className="w-5 h-5 text-green-400" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold">Agent</div>
                                                <div className="font-mono text-sm font-semibold truncate">{player.agent}</div>
                                            </div>
                                        </div>
                                    )}
                                    {!player?.user?.email && !player?.agent && (
                                        <p className="text-xs text-[#9A9A9A]">No contact details added yet.</p>
                                    )}
                                    <div className="text-[11px] text-green-400 px-1 pt-1 leading-relaxed">Please be professional and verify your scouting credentials before reaching out.</div>
                                </div>
                            </div>
                            {/* RIGHT SIDEBAR AD */}
                            <div className="hidden md:block">
                                <div className="relative w-full max-w-[300px] mx-auto h-[600px] bg-[#1A0F0A] rounded-2xl overflow-hidden">
                                    <span className="absolute top-2 left-2 text-[10px] text-white/40 uppercase tracking-wider z-10">Sponsored</span>
                                    <div className="absolute inset-0 flex flex-col p-6 text-white">
                                        <div className="text-center pt-4 mb-6">
                                            <div className="font-display text-3xl font-black italic tracking-tight">TRANSFER<span className="text-[#FF6B00]">ROOM</span></div>
                                            <div className="text-xs uppercase tracking-widest text-white/50 mt-1">The Transfer Network</div>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center text-center">
                                            <div className="font-display text-2xl font-bold leading-tight mb-3">CONNECT WITH 700+ CLUBS WORLDWIDE</div>
                                            <p className="text-sm text-white/70 mb-6">The professional network for football's transfer market. Trusted by decision-makers at the world's biggest clubs.</p>
                                            <div className="space-y-2 mb-6 text-left">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                                                    <span>Direct club-to-club messaging</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                                                    <span>Verified player availability</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                                                    <span>Live transfer market data</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full bg-[#FF6B00] hover:bg-[#CC5500] text-white py-3 rounded-xl font-bold text-sm transition-colors">Join the Network</button>
                                    </div>
                                </div>
                            </div>
                            {/* HALF PAGE AD */}
                            <div className="relative w-full max-w-[300px] mx-auto h-[250px] bg-[#001E2E] rounded-2xl overflow-hidden">
                                <span className="absolute top-2 right-2 text-[10px] text-white/40 uppercase tracking-wider z-10">Ad</span>
                                <div className="absolute inset-0 flex flex-col items-center justify-between p-5 text-white">
                                    <div className="text-center pt-2">
                                        <div className="font-display text-2xl font-black tracking-tight">SPORT<span className="text-[#0091EA]">RADAR</span></div>
                                        <div className="text-[10px] uppercase tracking-widest text-blue-300 mt-1">Data & Analytics</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-display text-lg font-bold leading-tight mb-2">ELITE FOOTBALL ANALYTICS</div>
                                        <p className="text-xs text-white/60">Real-time data powering the world's top scouting departments.</p>
                                    </div>
                                    <button className="w-full bg-[#0091EA] hover:bg-[#0277BD] text-white py-2.5 rounded-lg font-semibold text-xs transition-colors">Explore Solutions</button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            {/* SIMILAR PLAYERS */}
            {similarPlayers.length > 0 && (
                <section className="bg-[#0D0D0D] py-12 border-t border-[#2A2A2A]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                            <div>
                                <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-1">Discover More Talent</div>
                                <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase">Similar Players</h2>
                            </div>
                            <Link href="/scouting/dashboard" className="inline-flex items-center gap-1.5 text-[#FF6B00] hover:text-[#CC5500] text-sm font-semibold">
                                View all
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {similarPlayers.map((sp) => {

                                console.log('Similar player nationality:', sp.user?.nationality);
                                const spName = sp.user?.name ?? 'Unnamed player';
                                const spAge = calcAge(sp.user?.dob);
                                const spPositions = Array.isArray(sp.positions) ? sp.positions : [];
                                const spMatches = (Array.isArray(sp.matches) ? sp.matches : []).filter((m) => nonEmpty(m?.home));
                                const spGoals = spMatches.reduce((s, m) => s + toNum(m.goals), 0);
                                const spAssists = spMatches.reduce((s, m) => s + toNum(m.assists), 0);
                                return (
                                    <Link key={sp.id} href={`/scouting/player/${sp.id}`} className="group bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#FF6B00] transition-colors">
                                        <div className="flex items-start gap-4 mb-4">
                                            {sp.photo_url ? (
                                                <img src={sp.photo_url} alt={spName} className="w-16 h-16 rounded-xl border-2 border-[#2A2A2A] group-hover:border-[#FF6B00] transition-colors object-cover" />
                                            ) : (
                                                <div className="w-16 h-16 rounded-xl border-2 border-[#2A2A2A] group-hover:border-[#FF6B00] transition-colors bg-[#1F1F1F] flex items-center justify-center font-display text-lg font-black text-[#94A3B8]">
                                                    {initials(spName)}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    {spPositions[0] && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] font-bold uppercase tracking-wider">
                                                            {spPositions[0]}
                                                        </span>
                                                    )}
                                                    <span className="text-xs">{codeToFlag(sp.user?.nationality)}</span>
                                                </div>
                                                <h3 className="font-display text-lg font-bold uppercase leading-tight truncate">{spName}</h3>
                                                <p className="text-xs text-[#9A9A9A] truncate">{sp.current_club || '—'}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#2A2A2A]">
                                            <div>
                                                <div className="text-[9px] uppercase tracking-wider text-[#555555] font-bold">Age</div>
                                                <div className="font-mono text-sm font-bold">{spAge ?? '—'}</div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] uppercase tracking-wider text-[#555555] font-bold">G/A</div>
                                                <div className="font-mono text-sm font-bold">{spGoals}/{spAssists}</div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] uppercase tracking-wider text-[#555555] font-bold">Height</div>
                                                <div className="font-mono text-sm font-bold text-[#FF6B00]">{sp.height ? `${sp.height}` : '—'}</div>
                                            </div>
                                        </div>
                                        <button className="w-full mt-4 inline-flex items-center justify-center gap-1.5 bg-[#1F1F1F] group-hover:bg-[#FF6B00] group-hover:text-white text-[#F5F5F5] py-2.5 rounded-xl text-xs font-semibold transition-colors">
                                            <Plus className="w-3.5 h-3.5" />
                                            View Profile
                                        </button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
            {/* ORANGE CTA BAND */}
            <section className="bg-[#FF6B00] py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
                        <div className="text-center sm:text-left">
                            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase leading-tight">Build Your Watchlist</h3>
                            <p className="text-sm text-white/90 mt-1">Track players, compare profiles, and export scouting reports.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            {/* <Link href="/scout/shortlist" className="bg-white hover:bg-white/90 text-[#FF6B00] px-6 py-3 rounded-xl font-bold text-sm text-center transition-colors">Open My Shortlist</Link> */}
                            <Link href="/agent" className="bg-[#0F172A] hover:bg-[#1F1F1F] text-white px-6 py-3 rounded-xl font-bold text-sm text-center transition-colors">Browse Players</Link>
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
