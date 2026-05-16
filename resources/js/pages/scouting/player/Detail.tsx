import { Link } from '@inertiajs/react';
import ScoutNavbar from '@/Components/Scout/ScoutNavbar';
import { useState } from 'react';
import {
    MapPin,
    Calendar,
    Ruler,
    Weight,
    Trophy,
    TrendingUp,
    Play,
    Bookmark,
    Flag,
    Eye,
    Award,
    Target,
    Activity,
    Shield,
    Zap,
    Mail,
    MessageCircle,
    Lock,
    CheckCircle2,
    BarChart3,
    Clock,
    ArrowRight,
    Plus,
    Send,
    FileText,
} from 'lucide-react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
} from 'recharts';

interface Player {
    id: number;
    slug: string;
    fullName: string;
    position: string;
    positionDetail: string;
    age: number;
    birthDate: string;
    nationality: string;
    nationalityFlag: string;
    city: string;
    height: number;
    weight: number;
    preferredFoot: string;
    currentClub: string;
    clubLogo: string;
    marketValue: string;
    contractUntil: string;
    isPremium: boolean;
    isVerified: boolean;
    profileImage: string;
    coverImage: string;
    bio: string;
    stats: {
        appearances: number;
        goals: number;
        assists: number;
        minutesPlayed: number;
        yellowCards: number;
        redCards: number;
    };
    attributes: {
        pace: number;
        shooting: number;
        passing: number;
        dribbling: number;
        defending: number;
        physical: number;
    };
    highlightCount: number;
    profileViews: number;
}

interface ScoutRating {
    technical: number;
    physical: number;
    tactical: number;
    mental: number;
    notes: string;
}

const player: Player = {
    id: 1,
    slug: 'lucas-silva',
    fullName: 'Lucas Silva',
    position: 'CAM',
    positionDetail: 'Attacking Midfielder',
    age: 19,
    birthDate: '2006-03-14',
    nationality: 'Brazil',
    nationalityFlag: '🇧🇷',
    city: 'São Paulo',
    height: 178,
    weight: 72,
    preferredFoot: 'Right',
    currentClub: 'Santos FC U-20',
    clubLogo: 'https://placehold.co/40x40/000/fff?text=SFC',
    marketValue: '€450K',
    contractUntil: 'Jun 2026',
    isPremium: true,
    isVerified: true,
    profileImage: 'https://placehold.co/400x400/FF6B00/ffffff?text=LS',
    coverImage: 'https://placehold.co/1920x600/0F172A/FF6B00?text=Stadium',
    bio: 'Creative attacking midfielder with excellent vision and dribbling ability. Currently captaining Santos FC U-20 squad with 12 goals and 18 assists this season.',
    stats: {
        appearances: 28,
        goals: 12,
        assists: 18,
        minutesPlayed: 2340,
        yellowCards: 3,
        redCards: 0,
    },
    attributes: {
        pace: 82,
        shooting: 78,
        passing: 88,
        dribbling: 91,
        defending: 54,
        physical: 71,
    },
    highlightCount: 24,
    profileViews: 14820,
};

const existingRating: ScoutRating | undefined = undefined;

const similarPlayers: Player[] = [
    {
        ...player,
        id: 2,
        slug: 'rafael-costa',
        fullName: 'Rafael Costa',
        age: 18,
        currentClub: 'Palmeiras U-20',
        marketValue: '€380K',
        profileImage: 'https://placehold.co/200x200/FF6B00/ffffff?text=RC',
    },
    {
        ...player,
        id: 3,
        slug: 'pedro-almeida',
        fullName: 'Pedro Almeida',
        age: 19,
        currentClub: 'Flamengo U-20',
        marketValue: '€520K',
        profileImage: 'https://placehold.co/200x200/FF6B00/ffffff?text=PA',
    },
    {
        ...player,
        id: 4,
        slug: 'gabriel-santos',
        fullName: 'Gabriel Santos',
        age: 18,
        currentClub: 'Corinthians U-20',
        marketValue: '€340K',
        profileImage: 'https://placehold.co/200x200/FF6B00/ffffff?text=GS',
    },
];

const highlights = [
    { id: 1, title: 'Hat-trick vs Palmeiras U-20', date: '2 weeks ago', views: 4820, duration: '2:34', thumbnail: 'https://placehold.co/400x225/0F172A/FF6B00?text=GOAL' },
    { id: 2, title: 'Assist Compilation - October 2025', date: '1 month ago', views: 3120, duration: '3:12', thumbnail: 'https://placehold.co/400x225/0F172A/FF6B00?text=ASSIST' },
    { id: 3, title: 'Free Kick Goal vs Flamengo', date: '1 month ago', views: 5640, duration: '0:48', thumbnail: 'https://placehold.co/400x225/0F172A/FF6B00?text=FK' },
    { id: 4, title: 'Solo Run & Finish vs Corinthians', date: '2 months ago', views: 2890, duration: '1:22', thumbnail: 'https://placehold.co/400x225/0F172A/FF6B00?text=SOLO' },
];

const radarData = [
    { attribute: 'PAC', value: player.attributes.pace, fullMark: 100 },
    { attribute: 'SHO', value: player.attributes.shooting, fullMark: 100 },
    { attribute: 'PAS', value: player.attributes.passing, fullMark: 100 },
    { attribute: 'DRI', value: player.attributes.dribbling, fullMark: 100 },
    { attribute: 'DEF', value: player.attributes.defending, fullMark: 100 },
    { attribute: 'PHY', value: player.attributes.physical, fullMark: 100 },
];

const careerHistory = [
    { club: 'Santos FC U-20', period: '2023 — Present', role: 'Captain', achievement: 'Top scorer 2024' },
    { club: 'Santos FC U-17', period: '2021 — 2023', role: 'Starter', achievement: 'State Champion' },
    { club: 'Santos FC Academy', period: '2018 — 2021', role: 'Youth', achievement: 'Joined at age 12' },
];

export default function Detail() {
    // TODO: usePage<PageProps & {player:Player, existingRating?:ScoutRating, similarPlayers:Player[]}>().props

    const [rating, setRating] = useState<ScoutRating>({
        technical: existingRating?.technical ?? 0,
        physical: existingRating?.physical ?? 0,
        tactical: existingRating?.tactical ?? 0,
        mental: existingRating?.mental ?? 0,
        notes: existingRating?.notes ?? '',
    });

    const [isShortlisted, setIsShortlisted] = useState(false);

    const handleRatingChange = (category: keyof Omit<ScoutRating, 'notes'>, value: number) => {
        setRating((prev) => ({ ...prev, [category]: value }));
    };

    const averageRating =
        (rating.technical + rating.physical + rating.tactical + rating.mental) / 4 || 0;

    return (
        <div className="min-h-screen bg-white dark:bg-[#0D0D0D] text-[#0F172A] dark:text-[#F5F5F5] font-sans">
            <ScoutNavbar />

            {/* LEADERBOARD AD - TOP */}
            {/* LEADERBOARD AD - TOP */}
            <div className="w-full bg-[#F8FAFC] dark:bg-[#111111] border-b border-[#E2E8F0] dark:border-[#2A2A2A] pt-20 pb-3">
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
                <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${player.coverImage})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end">
                        <img src={player.profileImage} alt={player.fullName} className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl border-4 border-[#FF6B00] object-cover" />
                        <div className="flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-md bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#FF6B00] text-xs font-bold uppercase tracking-wider">{player.position}</span>
                                {player.isVerified && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/20 border border-blue-400 text-blue-300 text-xs font-semibold">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Verified
                                    </span>
                                )}
                                {player.isPremium && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-semibold">
                                        <Award className="w-3 h-3" />
                                        Premium
                                    </span>
                                )}
                            </div>
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-none mb-2">{player.fullName}</h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70 mb-4">
                                <span className="flex items-center gap-1.5"><span className="text-base">{player.nationalityFlag}</span>{player.nationality}</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{player.city}</span>
                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{player.age} years</span>
                                <span className="flex items-center gap-1.5"><img src={player.clubLogo} alt="" className="w-4 h-4 rounded" />{player.currentClub}</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                                    <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Market Value</div>
                                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#FF6B00]">{player.marketValue}</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                                    <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Goals / Assists</div>
                                    <div className="font-mono text-xl sm:text-2xl font-bold">{player.stats.goals}/{player.stats.assists}</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                                    <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Appearances</div>
                                    <div className="font-mono text-xl sm:text-2xl font-bold">{player.stats.appearances}</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                                    <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Profile Views</div>
                                    <div className="font-mono text-xl sm:text-2xl font-bold">{(player.profileViews / 1000).toFixed(1)}K</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-[#F8FAFC] dark:bg-[#111111] py-8 sm:py-12">
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
                            <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6">
                                <div className="flex items-center justify-between gap-3 mb-5">
                                    <div className="min-w-0">
                                        <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold mb-1">Scout Toolkit</div>
                                        <h2 className="font-display text-2xl font-bold uppercase">Scout Actions</h2>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] uppercase font-bold tracking-wider flex-shrink-0">
                                        <Eye className="w-3 h-3" />
                                        Scout View
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                    <button
                                        onClick={() => setIsShortlisted(!isShortlisted)}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                                            isShortlisted
                                                ? 'bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border-[#FF6B00] text-[#CC5500]'
                                                : 'bg-[#F8FAFC] dark:bg-[#1F1F1F] border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#FF6B00]'
                                        }`}
                                    >
                                        <Bookmark className={`w-5 h-5 ${isShortlisted ? 'fill-current' : ''}`} />
                                        <span className="text-xs font-semibold text-center">{isShortlisted ? 'Shortlisted' : 'Add to List'}</span>
                                    </button>
                                    <Link href={`/scout/players/${player.slug}/report`} className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-[#F8FAFC] dark:bg-[#1F1F1F] border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#FF6B00] transition-colors">
                                        <FileText className="w-5 h-5" />
                                        <span className="text-xs font-semibold text-center">Write Report</span>
                                    </Link>
                                    <Link href={`/scout/players/${player.slug}/contact`} className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-[#F8FAFC] dark:bg-[#1F1F1F] border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#FF6B00] transition-colors">
                                        <Send className="w-5 h-5" />
                                        <span className="text-xs font-semibold text-center">Contact</span>
                                    </Link>
                                    <Link href={`/scout/players/${player.slug}/compare`} className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-[#F8FAFC] dark:bg-[#1F1F1F] border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#FF6B00] transition-colors">
                                        <BarChart3 className="w-5 h-5" />
                                        <span className="text-xs font-semibold text-center">Compare</span>
                                    </Link>
                                </div>

                                {/* RATING WIDGET */}
                                <div className="border-t border-[#E2E8F0] dark:border-[#2A2A2A] pt-6">
                                    <div className="flex items-center justify-between mb-5">
                                        <div>
                                            <h3 className="font-display text-lg font-bold uppercase">Your Rating</h3>
                                            <p className="text-xs text-[#475569] dark:text-[#9A9A9A] mt-0.5">Rate on a scale of 1 to 10</p>
                                        </div>
                                        {averageRating > 0 && (
                                            <div className="text-right">
                                                <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold">Overall</div>
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
                                                                <div className="text-[11px] text-[#94A3B8] dark:text-[#555555] truncate">{cat.desc}</div>
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
                                                                    className={`flex-1 h-8 rounded-md text-xs font-bold transition-colors ${
                                                                        value >= score
                                                                            ? 'bg-[#FF6B00] text-white'
                                                                            : 'bg-[#F8FAFC] dark:bg-[#1F1F1F] text-[#94A3B8] dark:text-[#555555] hover:bg-[#FFF3EB] dark:hover:bg-[rgba(255,107,0,0.12)]'
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
                                        <label className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold mb-2 block">Scout Notes</label>
                                        <textarea
                                            value={rating.notes}
                                            onChange={(e) => setRating({ ...rating, notes: e.target.value })}
                                            rows={4}
                                            placeholder="Write your observations, strengths, weaknesses, and recommendations..."
                                            className="w-full px-4 py-3 bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-orange-800 resize-none"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 mt-5">
                                        <button className="flex-1 bg-[#FF6B00] hover:bg-[#CC5500] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">Save Rating</button>
                                        <button className="flex-1 bg-white dark:bg-[#1F1F1F] border border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#FF6B00] text-[#0F172A] dark:text-[#F5F5F5] px-6 py-3 rounded-xl font-semibold text-sm transition-colors">Save & Add to Report</button>
                                    </div>
                                </div>
                            </div>

                            {/* BIO */}
                            <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6">
                                <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold mb-2">About</div>
                                <h2 className="font-display text-2xl font-bold uppercase mb-3">Player Profile</h2>
                                <p className="text-sm text-[#475569] dark:text-[#9A9A9A] leading-relaxed mb-6">{player.bio}</p>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555] mb-1">Height</div>
                                        <div className="font-mono text-base font-bold flex items-center gap-1.5">
                                            <Ruler className="w-4 h-4 text-[#FF6B00]" />
                                            {player.height} cm
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555] mb-1">Weight</div>
                                        <div className="font-mono text-base font-bold flex items-center gap-1.5">
                                            <Weight className="w-4 h-4 text-[#FF6B00]" />
                                            {player.weight} kg
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555] mb-1">Foot</div>
                                        <div className="font-mono text-base font-bold">{player.preferredFoot}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555] mb-1">Contract</div>
                                        <div className="font-mono text-base font-bold">{player.contractUntil}</div>
                                    </div>
                                </div>
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

                            {/* ATTRIBUTES */}
                            <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6">
                                <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold mb-2">Performance Profile</div>
                                <h2 className="font-display text-2xl font-bold uppercase mb-6">Player Attributes</h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart data={radarData}>
                                                <PolarGrid stroke="#CBD5E1" strokeOpacity={0.3} />
                                                <PolarAngleAxis dataKey="attribute" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                                                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                                                <Radar name="Attributes" dataKey="value" stroke="#FF6B00" fill="#FF6B00" fillOpacity={0.3} strokeWidth={2} />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="space-y-3">
                                        {Object.entries(player.attributes).map(([key, value]) => (
                                            <div key={key}>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-xs uppercase tracking-wider font-semibold text-[#475569] dark:text-[#9A9A9A]">{key}</span>
                                                    <span className="font-mono text-sm font-bold">{value}</span>
                                                </div>
                                                <div className="h-2 bg-[#F8FAFC] dark:bg-[#1F1F1F] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#FF6B00]" style={{ width: `${value}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* HIGHLIGHTS */}
                            <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold mb-1">Video Library</div>
                                        <h2 className="font-display text-2xl font-bold uppercase">Highlights</h2>
                                    </div>
                                    <span className="font-mono text-xs text-[#475569] dark:text-[#9A9A9A]">{player.highlightCount} videos</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {highlights.map((clip) => (
                                        <Link key={clip.id} href={`/scout/highlights/${clip.id}`} className="group block">
                                            <div className="relative aspect-video bg-[#0F172A] rounded-xl overflow-hidden mb-2">
                                                <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                                    </div>
                                                </div>
                                                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-mono px-2 py-0.5 rounded">{clip.duration}</span>
                                            </div>
                                            <h3 className="text-sm font-semibold line-clamp-1 mb-1">{clip.title}</h3>
                                            <div className="flex items-center gap-3 text-xs text-[#94A3B8] dark:text-[#555555]">
                                                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{clip.views.toLocaleString()}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{clip.date}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* SEASON STATS */}
                            <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6">
                                <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold mb-2">2024/25 Season</div>
                                <h2 className="font-display text-2xl font-bold uppercase mb-5">Statistics</h2>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[
                                        { label: 'Appearances', value: player.stats.appearances, icon: Trophy },
                                        { label: 'Goals', value: player.stats.goals, icon: Target },
                                        { label: 'Assists', value: player.stats.assists, icon: TrendingUp },
                                        { label: 'Minutes', value: player.stats.minutesPlayed, icon: Clock },
                                        { label: 'Yellow Cards', value: player.stats.yellowCards, icon: Flag },
                                        { label: 'Red Cards', value: player.stats.redCards, icon: Flag },
                                    ].map((stat) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div key={stat.label} className="bg-[#F8FAFC] dark:bg-[#1F1F1F] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl p-4">
                                                <Icon className="w-4 h-4 text-[#FF6B00] mb-2" />
                                                <div className="font-mono text-2xl font-bold">{stat.value}</div>
                                                <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold mt-1">{stat.label}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* CAREER */}
                            <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6">
                                <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold mb-2">Trajectory</div>
                                <h2 className="font-display text-2xl font-bold uppercase mb-5">Career History</h2>
                                <div className="space-y-4">
                                    {careerHistory.map((entry, i) => (
                                        <div key={i} className="flex items-start gap-4 pb-4 border-b border-[#E2E8F0] dark:border-[#2A2A2A] last:border-0 last:pb-0">
                                            <div className="w-10 h-10 rounded-lg bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] flex items-center justify-center flex-shrink-0">
                                                <Trophy className="w-5 h-5 text-[#FF6B00]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                                                    <h3 className="font-display text-lg font-bold uppercase">{entry.club}</h3>
                                                    <span className="font-mono text-xs text-[#475569] dark:text-[#9A9A9A]">{entry.period}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-[#475569] dark:text-[#9A9A9A]">
                                                    <span>{entry.role}</span>
                                                    <span className="text-[#FF6B00]">•</span>
                                                    <span>{entry.achievement}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </main>

                        {/* RIGHT SIDEBAR */}
                        <aside className="lg:col-span-3 space-y-6">

                            {/* CONTACT INFO */}
                            <div className={`relative ${player.isPremium ? 'bg-[#F0FDF4] dark:bg-[rgba(22,163,74,0.08)] border border-green-200 dark:border-green-800' : 'bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A]'} rounded-2xl p-6`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-[10px] uppercase font-bold tracking-wider text-green-700 dark:text-green-400">Player Contact</div>
                                    {player.isPremium && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider">Unlocked</span>
                                    )}
                                </div>

                                {player.isPremium ? (
                                    <div className="space-y-3">
                                        <a href="mailto:agent@talentos.com.br" className="flex items-center gap-3 p-3 bg-white dark:bg-[#161616] border border-green-200 dark:border-green-800 rounded-xl hover:border-green-400 transition-colors">
                                            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold">Email</div>
                                                <div className="font-mono text-sm font-semibold truncate">agent@talentos.com.br</div>
                                            </div>
                                        </a>

                                        <a href="https://wa.me/5511999990000" className="flex items-center gap-3 p-3 bg-white dark:bg-[#161616] border border-green-200 dark:border-green-800 rounded-xl hover:border-green-400 transition-colors">
                                            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                                <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold">WhatsApp</div>
                                                <div className="font-mono text-sm font-semibold">+55 11 99999-0000</div>
                                            </div>
                                        </a>

                                        <div className="text-[11px] text-green-700 dark:text-green-400 px-1 pt-1 leading-relaxed">Direct line to player's agent. Please be professional and verify your scouting credentials.</div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="space-y-3 blur-sm pointer-events-none select-none">
                                            <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl">
                                                <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] dark:bg-[#1F1F1F]" />
                                                <div className="flex-1">
                                                    <div className="h-2 bg-[#E2E8F0] dark:bg-[#2A2A2A] rounded w-1/3 mb-1.5" />
                                                    <div className="h-3 bg-[#E2E8F0] dark:bg-[#2A2A2A] rounded w-2/3" />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl">
                                                <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] dark:bg-[#1F1F1F]" />
                                                <div className="flex-1">
                                                    <div className="h-2 bg-[#E2E8F0] dark:bg-[#2A2A2A] rounded w-1/3 mb-1.5" />
                                                    <div className="h-3 bg-[#E2E8F0] dark:bg-[#2A2A2A] rounded w-2/3" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                                            <div className="w-12 h-12 rounded-full bg-[#F8FAFC] dark:bg-[#1F1F1F] border border-[#E2E8F0] dark:border-[#2A2A2A] flex items-center justify-center mb-3">
                                                <Lock className="w-5 h-5 text-[#475569] dark:text-[#9A9A9A]" />
                                            </div>
                                            <p className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-1">Player needs Premium to show contact info</p>
                                            <p className="text-[11px] text-[#475569] dark:text-[#9A9A9A]">Use the Contact Player button to send a scouting inquiry.</p>
                                        </div>
                                    </div>
                                )}
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
            <section className="bg-white dark:bg-[#0D0D0D] py-12 border-t border-[#E2E8F0] dark:border-[#2A2A2A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                        <div>
                            <div className="text-[10px] uppercase tracking-wider text-[#475569] dark:text-[#9A9A9A] font-bold mb-1">Discover More Talent</div>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase">Similar Players</h2>
                        </div>
                        <Link href="/scout/players" className="inline-flex items-center gap-1.5 text-[#FF6B00] hover:text-[#CC5500] text-sm font-semibold">
                            View all
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {similarPlayers.map((sp) => (
                            <Link key={sp.id} href={`/scout/players/${sp.slug}`} className="group bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 hover:border-[#FF6B00] transition-colors">
                                <div className="flex items-start gap-4 mb-4">
                                    <img src={sp.profileImage} alt={sp.fullName} className="w-16 h-16 rounded-xl border-2 border-[#E2E8F0] dark:border-[#2A2A2A] group-hover:border-[#FF6B00] transition-colors object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] font-bold uppercase tracking-wider">{sp.position}</span>
                                            <span className="text-xs">{sp.nationalityFlag}</span>
                                        </div>
                                        <h3 className="font-display text-lg font-bold uppercase leading-tight truncate">{sp.fullName}</h3>
                                        <p className="text-xs text-[#475569] dark:text-[#9A9A9A] truncate">{sp.currentClub}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E2E8F0] dark:border-[#2A2A2A]">
                                    <div>
                                        <div className="text-[9px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555] font-bold">Age</div>
                                        <div className="font-mono text-sm font-bold">{sp.age}</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555] font-bold">G/A</div>
                                        <div className="font-mono text-sm font-bold">{sp.stats.goals}/{sp.stats.assists}</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] uppercase tracking-wider text-[#94A3B8] dark:text-[#555555] font-bold">Value</div>
                                        <div className="font-mono text-sm font-bold text-[#FF6B00]">{sp.marketValue}</div>
                                    </div>
                                </div>

                                <button className="w-full mt-4 inline-flex items-center justify-center gap-1.5 bg-[#F8FAFC] dark:bg-[#1F1F1F] group-hover:bg-[#FF6B00] group-hover:text-white text-[#0F172A] dark:text-[#F5F5F5] py-2.5 rounded-xl text-xs font-semibold transition-colors">
                                    <Plus className="w-3.5 h-3.5" />
                                    View Profile
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ORANGE CTA BAND */}
            <section className="bg-[#FF6B00] py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
                        <div className="text-center sm:text-left">
                            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase leading-tight">Build Your Watchlist</h3>
                            <p className="text-sm text-white/90 mt-1">Track players, compare profiles, and export scouting reports.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <Link href="/scout/shortlist" className="bg-white hover:bg-white/90 text-[#FF6B00] px-6 py-3 rounded-xl font-bold text-sm text-center transition-colors">Open My Shortlist</Link>
                            <Link href="/scout/players" className="bg-[#0F172A] hover:bg-[#1F1F1F] text-white px-6 py-3 rounded-xl font-bold text-sm text-center transition-colors">Browse Players</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#0F172A] text-white py-10">
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
                                <li><Link href="/scout/players" className="text-white/70 hover:text-white">Browse Players</Link></li>
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
            </footer>
        </div>
    );
}
