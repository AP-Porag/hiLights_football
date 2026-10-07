import ScoutNavbar from '@/components/scout/ScoutNavbar';
import { Link, useForm, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Eye,
    FileText,
    MapPin,
    Save,
    Send,
    Shield,
    Target,
    ThumbsDown,
    ThumbsUp,
    Zap,
} from 'lucide-react';
import { useState } from 'react';
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
const getCountryName = (code?: string | null): string => {
    if (!code) return '';
    try {
        return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
    } catch {
        return code;
    }
};
const codeToFlag = (code?: string | null): string => {
    if (!code || code.length !== 2) return '🏳️';
    return String.fromCodePoint(
        ...code
            .toUpperCase()
            .split('')
            .map((c) => 0x1f1a5 + c.charCodeAt(0)),
    );
};
const calcAge = (dob?: string | null): number | null => {
    if (!dob) return null;
    const d = new Date(dob);
    if (isNaN(d.getTime())) return null;
    const age = new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970;
    return age >= 0 ? age : null;
};
const initials = (name: string) =>
    name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
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
            onSuccess: () => showToast(status === 'final' ? 'Report submitted' : 'Draft saved'),
        });
    };
    const fullName = player?.user?.name ?? 'Unnamed player';
    const age = calcAge(player?.user?.dob);
    const positions = Array.isArray(player?.positions) ? player.positions : [];
    const nationality = getCountryName(player?.user?.nationality);
    const averageRating = rating ? (rating.technical + rating.physical + rating.tactical + rating.mental) / 4 : 0;
    const lastUpdated = report?.updated_at
        ? new Date(report.updated_at).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
          })
        : null;
    return (
        <div className="min-h-screen bg-[#111111] font-sans text-[#F5F5F5]">
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
            {/* HEADER */}
            <section className="bg-[#0F172A] pt-20 pb-8 text-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <Link href="/agent" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Football Identity
                    </Link>
                    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                        {player?.photo_url ? (
                            <img
                                src={player.photo_url}
                                alt={fullName}
                                className="h-20 w-20 flex-shrink-0 rounded-2xl border-2 border-[#E53F01] object-cover"
                            />
                        ) : (
                            <div className="font-display flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-[#E53F01] bg-white/10 text-2xl font-black text-white/70">
                                {initials(fullName)}
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-md border border-[#E53F01] bg-[rgba(255,107,0,0.12)] px-3 py-1 text-[10px] font-bold tracking-wider text-[#E53F01] uppercase">
                                    <FileText className="h-3 w-3" />
                                    Agent Report
                                </span>
                                {report?.status === 'final' && (
                                    <span className="inline-flex items-center gap-1 rounded-md border border-green-400 bg-green-500/20 px-2 py-1 text-[10px] font-bold tracking-wider text-green-300 uppercase">
                                        Submitted
                                    </span>
                                )}
                                {report?.status === 'draft' && (
                                    <span className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-bold tracking-wider text-white/70 uppercase">
                                        Draft
                                    </span>
                                )}
                            </div>
                            <h1 className="font-display mb-2 text-3xl leading-none font-bold uppercase sm:text-4xl">{fullName}</h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
                                {positions[0] && <span className="font-mono text-[#E53F01]">{positions[0]}</span>}
                                {nationality && (
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-base">{codeToFlag(player?.user?.nationality)}</span>
                                        {nationality}
                                    </span>
                                )}
                                {age !== null && (
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {age} years
                                    </span>
                                )}
                                {player?.current_club && (
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {player.current_club}
                                    </span>
                                )}
                            </div>
                        </div>
                        {lastUpdated && (
                            <div className="flex-shrink-0 text-left sm:text-right">
                                <div className="text-[10px] font-bold tracking-wider text-white/40 uppercase">Last updated</div>
                                <div className="font-mono text-sm">{lastUpdated}</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {/* BODY */}
            <section className="py-8 sm:py-10">
                <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6">
                    {/* SAVED RATING SUMMARY */}
                    <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                                <div className="mb-1 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">From your profile rating</div>
                                <h2 className="font-display text-2xl font-bold uppercase">Rating Summary</h2>
                            </div>
                            {averageRating > 0 && (
                                <div className="flex-shrink-0 text-right">
                                    <div className="text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Overall</div>
                                    <div className="font-mono text-3xl font-bold text-[#E53F01]">{averageRating.toFixed(1)}</div>
                                </div>
                            )}
                        </div>
                        {rating ? (
                            <>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {RATING_CATS.map((cat) => {
                                        const Icon = cat.icon;
                                        const value = rating[cat.key as keyof RatingRow] as number;
                                        return (
                                            <div key={cat.key} className="rounded-xl border border-[#2A2A2A] bg-[#1F1F1F] p-4">
                                                <Icon className="mb-2 h-4 w-4 text-[#E53F01]" />
                                                <div className="font-mono text-2xl font-bold">{value || '—'}</div>
                                                <div className="mt-1 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">{cat.label}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {rating.notes && (
                                    <div className="mt-4 rounded-xl border border-[#2A2A2A] bg-[#1F1F1F] p-4">
                                        <div className="mb-1.5 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Scout Notes</div>
                                        <p className="text-sm leading-relaxed whitespace-pre-line text-[#9A9A9A]">{rating.notes}</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="rounded-xl border border-[#2A2A2A] bg-[#1F1F1F] p-5 text-center">
                                <p className="mb-3 text-sm text-[#9A9A9A]">You haven't rated this player yet.</p>
                                <Link
                                    href={`/scouting/player/${player?.id}`}
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E53F01] hover:text-[#E53F01]"
                                >
                                    Add a rating first
                                    <ArrowLeft className="h-4 w-4 rotate-180" />
                                </Link>
                            </div>
                        )}
                    </div>
                    {/* RECOMMENDATION */}
                    <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                        <div className="mb-2 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Your verdict</div>
                        <h2 className="font-display mb-5 text-2xl font-bold uppercase">Recommendation</h2>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {RECOMMENDATIONS.map((rec) => {
                                const Icon = rec.icon;
                                const active = data.recommendation === rec.value;
                                return (
                                    <button
                                        key={rec.value}
                                        type="button"
                                        onClick={() => setData('recommendation', rec.value)}
                                        className={`rounded-xl border p-4 text-left transition-colors ${
                                            active
                                                ? 'border-[#E53F01] bg-[rgba(255,107,0,0.12)]'
                                                : 'border-[#2A2A2A] bg-[#1F1F1F] hover:border-[#E53F01]'
                                        }`}
                                    >
                                        <Icon className={`mb-2 h-5 w-5 ${active ? 'text-[#E53F01]' : 'text-[#9A9A9A]'}`} />
                                        <div className={`font-display text-lg font-bold uppercase ${active ? 'text-[#E53F01]' : ''}`}>
                                            {rec.label}
                                        </div>
                                        <div className="mt-0.5 text-[11px] leading-snug text-[#9A9A9A]">{rec.desc}</div>
                                    </button>
                                );
                            })}
                        </div>
                        {errors.recommendation && <p className="mt-2 text-xs text-[#DC2626]">{errors.recommendation}</p>}
                        {/* MATCH CONTEXT */}
                        <div className="mt-6">
                            <label className="mb-2 block text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">
                                Match / Observation Context
                            </label>
                            <input
                                type="text"
                                value={data.match_context}
                                onChange={(e) => setData('match_context', e.target.value)}
                                placeholder="e.g. Santos U-20 vs Palmeiras U-20, 12 Mar 2026 — live"
                                className="h-11 w-full rounded-xl border border-[#2A2A2A] bg-[#111111] px-4 text-sm focus:border-[#E53F01] focus:ring-1 focus:ring-orange-800 focus:outline-none"
                            />
                            {errors.match_context && <p className="mt-1.5 text-xs text-[#DC2626]">{errors.match_context}</p>}
                        </div>
                    </div>
                    {/* WRITTEN REPORT */}
                    <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                        <div className="mb-2 text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Observations</div>
                        <h2 className="font-display mb-5 text-2xl font-bold uppercase">Written Report</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">Strengths</label>
                                <textarea
                                    value={data.strengths}
                                    onChange={(e) => setData('strengths', e.target.value)}
                                    rows={5}
                                    placeholder="What stands out — technical qualities, decision-making, movement off the ball..."
                                    className="w-full resize-none rounded-xl border border-[#2A2A2A] bg-[#111111] px-4 py-3 text-sm focus:border-[#E53F01] focus:ring-1 focus:ring-orange-800 focus:outline-none"
                                />
                                {errors.strengths && <p className="mt-1.5 text-xs text-[#DC2626]">{errors.strengths}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">
                                    Weaknesses / Development Areas
                                </label>
                                <textarea
                                    value={data.weaknesses}
                                    onChange={(e) => setData('weaknesses', e.target.value)}
                                    rows={5}
                                    placeholder="Where does he need to improve — physicality, consistency, defensive work rate..."
                                    className="w-full resize-none rounded-xl border border-[#2A2A2A] bg-[#111111] px-4 py-3 text-sm focus:border-[#E53F01] focus:ring-1 focus:ring-orange-800 focus:outline-none"
                                />
                                {errors.weaknesses && <p className="mt-1.5 text-xs text-[#DC2626]">{errors.weaknesses}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block text-[10px] font-bold tracking-wider text-[#9A9A9A] uppercase">
                                    Summary & Conclusion
                                </label>
                                <textarea
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    rows={6}
                                    placeholder="Overall assessment, projected ceiling, and what you'd recommend as next steps..."
                                    className="w-full resize-none rounded-xl border border-[#2A2A2A] bg-[#111111] px-4 py-3 text-sm focus:border-[#E53F01] focus:ring-1 focus:ring-orange-800 focus:outline-none"
                                />
                                {errors.summary && <p className="mt-1.5 text-xs text-[#DC2626]">{errors.summary}</p>}
                            </div>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => submitWith('draft')}
                                disabled={processing}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1F1F1F] px-6 py-3 text-sm font-semibold text-[#F5F5F5] transition-colors hover:border-[#E53F01] disabled:opacity-60"
                            >
                                <Save className="h-4 w-4" />
                                {processing ? 'Saving...' : 'Save Draft'}
                            </button>
                            <button
                                type="button"
                                onClick={() => submitWith('final')}
                                disabled={processing}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E53F01] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E53F01] disabled:opacity-60"
                            >
                                <Send className="h-4 w-4" />
                                {processing ? 'Submitting...' : 'Submit Report'}
                            </button>
                        </div>
                        <p className="mt-3 text-center text-[11px] text-[#555555]">
                            Drafts stay private to you. Submitted reports are marked final and can still be updated.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
