import { Link, usePage, useForm } from '@inertiajs/react';
import ScoutNavbar from '@/components/scout/ScoutNavbar';
import { useState } from 'react';
import {
    ArrowLeft,
    CheckCircle2,
    Target,
    Activity,
    Shield,
    Zap,
    ThumbsUp,
    Eye,
    ThumbsDown,
    FileText,
    Save,
    Send,
    Calendar,
    MapPin,
} from 'lucide-react';
// ── DB shape ──
interface PlayerProfileRow {
    id: number;
    player_id: string | null;
    height: number | null;
    weight: number | null;
    birth_city: string | null;
    current_club: string | null;
    modality: string | null;
    positions: string[] | null;
    foot: string | null;
    photo_url: string | null;
    user?: {
        id: number;
        name: string | null;
        email: string | null;
        dob: string | null;
        nationality: string | null;
    } | null;
}
interface RatingRow {
    technical: number;
    physical: number;
    tactical: number;
    mental: number;
    notes: string | null;
}
interface ReportRow {
    recommendation: string | null;
    match_context: string | null;
    strengths: string | null;
    weaknesses: string | null;
    summary: string | null;
    status: string | null;
    updated_at?: string | null;
}
// ── helpers ──
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
const codeToFlag = (code?: string | string[] | null): string => {
    if (!code) return '🏳️';

    const codes = Array.isArray(code) ? code : [code];

    if (codes.length === 0) return '🏳️';

    return codes
        .map(c => {
            if (typeof c !== 'string' || c.trim().length !== 2) return '🏳️';
            const countryCode = c.trim().toUpperCase();
            return countryCode
                .split('')
                .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
                .join('');
        })
        .join(', '); // একাধিক flag এর মধ্যে কমা
};
const calcAge = (dob?: string | null): number | null => {
    if (!dob) return null;
    const d = new Date(dob);
    if (isNaN(d.getTime())) return null;
    const age = new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970;
    return age >= 0 ? age : null;
};
const initials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
const RECOMMENDATIONS = [
    { value: 'sign', label: 'Sign', desc: 'Ready to recommend for signing', icon: ThumbsUp },
    { value: 'monitor', label: 'Monitor', desc: 'Keep tracking, revisit later', icon: Eye },
    { value: 'pass', label: 'Pass', desc: 'Not a fit at this stage', icon: ThumbsDown },
];
const RATING_CATS = [
    { key: 'technical', label: 'Technical', icon: Target },
    { key: 'physical', label: 'Physical', icon: Activity },
    { key: 'tactical', label: 'Tactical', icon: Shield },
    { key: 'mental', label: 'Mental', icon: Zap },
];
export default function Report() {
    const { player, rating, report } = usePage<{
        player: PlayerProfileRow;
        rating?: RatingRow | null;
        report?: ReportRow | null;
    }>().props;

    const { auth } = usePage<{ auth?: { user?: { role?: string } } }>().props;
    const role = auth?.user?.role ?? 'scout';

    // Role-ভিত্তিক লেবেল
    const roleLabel =
        role === 'agent' ? 'Agent' :
            role === 'club' ? 'Club' :
                'Scout';
    const [toast, setToast] = useState<string | null>(null);
    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };
    const { data, setData, post, processing, errors, transform } = useForm({
        recommendation: report?.recommendation ?? '',
        match_context: report?.match_context ?? '',
        strengths: report?.strengths ?? '',
        weaknesses: report?.weaknesses ?? '',
        summary: report?.summary ?? '',
        status: report?.status ?? 'draft',
    });
    // status set kore saathe saathe submit (setData async, tai transform diye pathacchi)
    const submitWith = (status: 'draft' | 'final') => {
        setData('status', status);
        transform((d) => ({ ...d, status }));
        post(`/scouting/player/${player?.id}/report`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () =>
                showToast(status === 'final' ? 'Report submitted' : 'Draft saved'),
        });
    };
    const fullName = player?.user?.name ?? 'Unnamed player';
    const age = calcAge(player?.user?.dob);
    const positions = Array.isArray(player?.positions) ? player.positions : [];
    const nationality = getCountryName(player?.user?.nationality);
    const averageRating = rating
        ? (rating.technical + rating.physical + rating.tactical + rating.mental) / 4
        : 0;
    const lastUpdated = report?.updated_at
        ? new Date(report.updated_at).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : null;
    return (
        <div className="min-h-screen bg-[#111111] text-[#F5F5F5] font-sans">
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
            {/* HEADER */}
            <section className="bg-[#0F172A] text-white pt-20 pb-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <Link
                        href="/scouting"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to profile
                    </Link>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        {player?.photo_url ? (
                            <img
                                src={player.photo_url}
                                alt={fullName}
                                className="w-20 h-20 rounded-2xl border-2 border-[#FF6B00] object-cover flex-shrink-0"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-2xl border-2 border-[#FF6B00] bg-white/10 flex items-center justify-center font-display text-2xl font-black text-white/70 flex-shrink-0">
                                {initials(fullName)}
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#FF6B00] text-[10px] font-bold uppercase tracking-wider">
                                    <FileText className="w-3 h-3" />
                                    {roleLabel} Report
                                </span>
                                {report?.status === 'final' && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/20 border border-green-400 text-green-300 text-[10px] font-bold uppercase tracking-wider">
                                        Submitted
                                    </span>
                                )}
                                {report?.status === 'draft' && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 border border-white/20 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                                        Draft
                                    </span>
                                )}
                            </div>
                            <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase leading-none mb-2 italic">
                                {fullName}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
                                {positions[0] && <span className="font-mono text-[#FF6B00]">{positions[0]}</span>}
                                {nationality && (
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-base">{codeToFlag(player?.user?.nationality)}</span>
                                        {nationality}
                                    </span>
                                )}
                                {age !== null && (
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {age} years
                                    </span>
                                )}
                                {player?.current_club && (
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {player.current_club}
                                    </span>
                                )}
                            </div>
                        </div>
                        {lastUpdated && (
                            <div className="text-left sm:text-right flex-shrink-0">
                                <div className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Last updated</div>
                                <div className="font-mono text-sm">{lastUpdated}</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {/* BODY */}
            <section className="py-8 sm:py-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
                    {/* SAVED RATING SUMMARY */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                        <div className="flex items-center justify-between gap-3 mb-5">
                            <div>
                                <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-1">From your profile rating</div>
                                <h2 className="font-display text-2xl font-bold uppercase italic">Rating Summary</h2>
                            </div>
                            {averageRating > 0 && (
                                <div className="text-right flex-shrink-0">
                                    <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold">Overall</div>
                                    <div className="font-mono text-3xl font-bold text-[#FF6B00]">{averageRating.toFixed(1)}</div>
                                </div>
                            )}
                        </div>
                        {rating ? (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {RATING_CATS.map((cat) => {
                                        const Icon = cat.icon;
                                        const value = rating[cat.key as keyof RatingRow] as number;
                                        return (
                                            <div key={cat.key} className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl p-4">
                                                <Icon className="w-4 h-4 text-[#FF6B00] mb-2" />
                                                <div className="font-mono text-2xl font-bold">{value || '—'}</div>
                                                <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mt-1">{cat.label}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {rating.notes && (
                                    <div className="mt-4 bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl p-4">
                                        <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-1.5">{roleLabel} Notes</div>
                                        <p className="text-sm text-[#9A9A9A] leading-relaxed whitespace-pre-line">{rating.notes}</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl p-5 text-center">
                                <p className="text-sm text-[#9A9A9A] mb-3">
                                    You haven't rated this player yet.
                                </p>
                                <Link
                                    href={`/scouting/player/${player?.id}`}
                                    className="inline-flex items-center gap-1.5 text-[#FF6B00] hover:text-[#CC5500] text-sm font-semibold"
                                >
                                    Add a rating first
                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                </Link>
                            </div>
                        )}
                    </div>
                    {/* RECOMMENDATION */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                        <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2">Your verdict</div>
                        <h2 className="font-display text-2xl font-bold uppercase mb-5 italic">Recommendation</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {RECOMMENDATIONS.map((rec) => {
                                const Icon = rec.icon;
                                const active = data.recommendation === rec.value;
                                return (
                                    <button
                                        key={rec.value}
                                        type="button"
                                        onClick={() => setData('recommendation', rec.value)}
                                        className={`text-left p-4 rounded-xl border transition-colors ${active
                                            ? 'bg-[rgba(255,107,0,0.12)] border-[#FF6B00]'
                                            : 'bg-[#1F1F1F] border-[#2A2A2A] hover:border-[#FF6B00]'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 mb-2 ${active ? 'text-[#FF6B00]' : 'text-[#9A9A9A]'}`} />
                                        <div className={`font-display text-lg font-bold uppercase ${active ? 'text-[#FF6B00]' : ''}`}>
                                            {rec.label}
                                        </div>
                                        <div className="text-[11px] text-[#9A9A9A] leading-snug mt-0.5">{rec.desc}</div>
                                    </button>
                                );
                            })}
                        </div>
                        {errors.recommendation && (
                            <p className="text-xs text-[#DC2626] mt-2">{errors.recommendation}</p>
                        )}
                        {/* MATCH CONTEXT */}
                        <div className="mt-6">
                            <label className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2 block">
                                Match / Observation Context
                            </label>
                            <input
                                type="text"
                                value={data.match_context}
                                onChange={(e) => setData('match_context', e.target.value)}
                                placeholder="e.g. Santos U-20 vs Palmeiras U-20, 12 Mar 2026 — live"
                                className="w-full h-11 px-4 bg-[#111111] border border-[#2A2A2A] rounded-xl text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-orange-800"
                            />
                            {errors.match_context && (
                                <p className="text-xs text-[#DC2626] mt-1.5">{errors.match_context}</p>
                            )}
                        </div>
                    </div>
                    {/* WRITTEN REPORT */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                        <div className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2">Observations</div>
                        <h2 className="font-display text-2xl font-bold uppercase mb-5 italic">Written Report</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2 block">
                                    Strengths
                                </label>
                                <textarea
                                    value={data.strengths}
                                    onChange={(e) => setData('strengths', e.target.value)}
                                    rows={5}
                                    placeholder="What stands out — technical qualities, decision-making, movement off the ball..."
                                    className="w-full px-4 py-3 bg-[#111111] border border-[#2A2A2A] rounded-xl text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-orange-800 resize-none"
                                />
                                {errors.strengths && (
                                    <p className="text-xs text-[#DC2626] mt-1.5">{errors.strengths}</p>
                                )}
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2 block">
                                    Weaknesses / Development Areas
                                </label>
                                <textarea
                                    value={data.weaknesses}
                                    onChange={(e) => setData('weaknesses', e.target.value)}
                                    rows={5}
                                    placeholder="Where does he need to improve — physicality, consistency, defensive work rate..."
                                    className="w-full px-4 py-3 bg-[#111111] border border-[#2A2A2A] rounded-xl text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-orange-800 resize-none"
                                />
                                {errors.weaknesses && (
                                    <p className="text-xs text-[#DC2626] mt-1.5">{errors.weaknesses}</p>
                                )}
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-wider text-[#9A9A9A] font-bold mb-2 block">
                                    Summary & Conclusion
                                </label>
                                <textarea
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    rows={6}
                                    placeholder="Overall assessment, projected ceiling, and what you'd recommend as next steps..."
                                    className="w-full px-4 py-3 bg-[#111111] border border-[#2A2A2A] rounded-xl text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-orange-800 resize-none"
                                />
                                {errors.summary && (
                                    <p className="text-xs text-[#DC2626] mt-1.5">{errors.summary}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={() => submitWith('draft')}
                                disabled={processing}
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1F1F1F] border border-[#2A2A2A] hover:border-[#FF6B00] disabled:opacity-60 text-[#F5F5F5] px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Saving...' : 'Save Draft'}
                            </button>
                            <button
                                type="button"
                                onClick={() => submitWith('final')}
                                disabled={processing}
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#CC5500] disabled:opacity-60 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                {processing ? 'Submitting...' : 'Submit Report'}
                            </button>
                        </div>
                        <p className="text-[11px] text-[#555555] mt-3 text-center">
                            Drafts stay private to you. Submitted reports are marked final and can still be updated.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
