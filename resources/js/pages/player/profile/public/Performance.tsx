import { PublicFooter } from '@/components/public/PublicFooter';
import PublicNavbar from '@/components/public/PublicNavbar';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, CalendarDays, ChevronRight, Crosshair, Ruler, Shield, Target, Timer, Trophy, Users } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

// Position code → full form name
const POSITION_FULL_NAMES: Record<string, string> = {
    GK: 'Goalkeeper',
    LB: 'Left Back',
    'CB-L': 'Centre Back (Left)',
    'CB-R': 'Centre Back (Right)',
    RB: 'Right Back',
    LM: 'Left Midfielder',
    'CM-L': 'Central Midfielder (Left)',
    'CM-R': 'Central Midfielder (Right)',
    RM: 'Right Midfielder',
    CAM: 'Central Attacking Midfielder',
    LW: 'Left Winger',
    ST: 'Striker',
    RW: 'Right Winger',
    CF: 'Centre Forward',
};

const getPositionFullName = (codes?: string | string[] | null): string => {
    if (!codes) return 'Not specified';
    const arr = Array.isArray(codes) ? codes : [codes];
    return arr
        .map((c) => {
            const key = String(c).trim().toUpperCase();
            return POSITION_FULL_NAMES[key] ?? c;
        })
        .join(', ');
};

const getCountryName = (code?: string | string[] | null): string => {
    if (!code) return '';
    const codes = Array.isArray(code) ? code : [code];
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return codes
        .map((c) => {
            try {
                return regionNames.of(c) || c;
            } catch {
                return c;
            }
        })
        .join(', ');
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

// Accepts "YYYY-MM-DD", "DD/MM/YYYY" and "DD/MM/YY"
const parseMatchDate = (v?: string | null): Date | null => {
    if (!v) return null;
    const raw = String(v).trim();
    const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    const dmy = raw.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/);
    if (dmy) {
        const year = Number(dmy[3]);
        return new Date(year < 100 ? 2000 + year : year, Number(dmy[2]) - 1, Number(dmy[1]));
    }
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
};

const formatMatchDate = (v?: string | null): string => {
    const d = parseMatchDate(v);
    if (!d) return '—';
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const toInt = (v: any): number => Number(String(v ?? '').replace(/\D/g, '')) || 0;

export default function Performance() {
    const { player } = usePage<{ player: any }>().props;

    // Main position GK → Saves. GK er sathe onno position thakle Goals + Assists-o.
    const positions: string[] = Array.isArray(player?.positions) ? player.positions : [];
    const isGoalkeeper = positions.length > 0 && String(positions[0]).trim().toUpperCase() === 'GK';
    const isGoalkeeperOnly = isGoalkeeper && positions.length === 1;
    const showSaves = isGoalkeeper;
    const showGoals = !isGoalkeeperOnly;
    const showAssists = !isGoalkeeperOnly;
    const matchColSpan = 3 + Number(showSaves) + Number(showGoals) + Number(showAssists);

    // Minor check — Detail page er moto, users.dob theke
    const playerAge = calcAge(player?.user?.dob);
    const isMinor = playerAge !== null && playerAge < 18;

    const allMatches = useMemo(() => {
        const rows = (player?.matches ?? []).filter((m: any) => m?.home);
        // Newest first when a date is present; undated rows keep their order at the end
        return [...rows].sort((a: any, b: any) => {
            const da = parseMatchDate(a?.date);
            const db = parseMatchDate(b?.date);
            if (da && db) return db.getTime() - da.getTime();
            if (da) return -1;
            if (db) return 1;
            return 0;
        });
    }, [player?.matches]);

    // Season filter, built from the years actually present in the data
    const seasons = useMemo(() => {
        const years = new Set<string>();
        allMatches.forEach((m: any) => {
            const d = parseMatchDate(m?.date);
            if (d) years.add(String(d.getFullYear()));
        });
        return [...years].sort((a, b) => Number(b) - Number(a));
    }, [allMatches]);

    const [season, setSeason] = useState<string>('all');

    const matches = useMemo(() => {
        if (season === 'all') return allMatches;
        return allMatches.filter((m: any) => {
            const d = parseMatchDate(m?.date);
            return d ? String(d.getFullYear()) === season : false;
        });
    }, [allMatches, season]);

    const totals = useMemo(
        () =>
            matches.reduce(
                (acc: any, m: any) => ({
                    games: acc.games + 1,
                    goals: acc.goals + toInt(m.goals),
                    saves: acc.saves + toInt(m.saves),
                    assists: acc.assists + toInt(m.assists),
                    minutes: acc.minutes + toInt(m.minutes),
                }),
                { games: 0, goals: 0, saves: 0, assists: 0, minutes: 0 },
            ),
        [matches],
    );

    const perGame = (v: number) => (totals.games ? (v / totals.games).toFixed(2) : '0.00');

    const statCards = [
        { icon: Users, label: 'Games', value: totals.games, sub: 'Matches played' },
        ...(showSaves ? [{ icon: Shield, label: 'Saves', value: totals.saves, sub: `${perGame(totals.saves)} per game` }] : []),
        ...(showGoals ? [{ icon: Target, label: 'Goals', value: totals.goals, sub: `${perGame(totals.goals)} per game` }] : []),
        ...(showAssists ? [{ icon: Crosshair, label: 'Assists', value: totals.assists, sub: `${perGame(totals.assists)} per game` }] : []),
        { icon: Timer, label: 'Minutes', value: totals.minutes, sub: `${perGame(totals.minutes)} per game` },
    ];

    // 2 / 3 / 4 / 5 card — tai column count card shonkha theke
    const statGridClass =
        statCards.length >= 5 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
            : statCards.length === 4 ? 'grid-cols-2 lg:grid-cols-4'
                : 'grid-cols-2 lg:grid-cols-3';

    const competitions = useMemo(
        () =>
            (player?.competitions ?? [])
                .filter((c: any) => c?.name)
                .sort((a: any, b: any) => (Number(b.year) || 0) - (Number(a.year) || 0)),
        [player?.competitions],
    );

    const achievements = useMemo(
        () =>
            (player?.achievements ?? [])
                .filter((a: any) => a?.title)
                .sort((a: any, b: any) => (Number(b.year) || 0) - (Number(a.year) || 0)),
        [player?.achievements],
    );

    const playerName = player?.user?.name ?? 'Player';
    const backHref = `/player/profile/${player?.slug ?? player?.user?.slug}`;

    return (
        <div className="min-h-screen bg-black pt-16 xl:pt-20 2xl:pt-24 dark:bg-[#0D0D0D]">
            <PublicNavbar />

            {/* BREADCRUMB */}
            <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6">
                <nav className="flex min-w-0 items-center gap-1.5 text-sm text-[#475569] dark:text-[#9A9A9A]">
                    <Link href="/" className="whitespace-nowrap hover:text-[#E53F01]">
                        Home
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#CBD5E1] dark:text-[#555]" />
                    <Link href={backHref} className="min-w-0 truncate whitespace-nowrap hover:text-[#E53F01]">
                        {playerName}
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#CBD5E1] dark:text-[#555]" />
                    <span className="shrink-0 font-medium whitespace-nowrap text-[#E53F01] dark:text-[#F5F5F5]">Performance</span>
                </nav>
            </div>

            <main className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-12 sm:px-6">
                {/* MINOR NOTICE — Detail page er moto */}
                {isMinor && (
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E53F01]/60 bg-[#E53F01]/10 px-3 py-1 text-xs font-semibold text-[#ff8a4c]">
                            <Users className="h-3.5 w-3.5 shrink-0" />
                            Football identity managed by parents
                        </span>
                    </div>
                )}

                {/* PLAYER HEADER */}
                <section className="rounded-xl border border-[#152538] bg-[#07111d] p-4 sm:p-6">
                    <div className="flex flex-col gap-4 min-[420px]:flex-row sm:gap-6">
                        <img
                            src={player?.photo_url || '/images/img/placeholder.webp'}
                            alt={playerName}
                            className="h-[7.5rem] w-[5.625rem] shrink-0 rounded-md border border-[#233247] object-cover sm:h-[9rem] sm:w-[6.75rem]"
                        />

                        <div className="min-w-0 flex-1">
                            <h1 className="text-xl font-bold tracking-wide break-words text-white uppercase sm:text-2xl md:text-3xl">
                                {playerName}
                            </h1>
                            <p className="mt-1 text-sm text-[#9A9A9A] sm:text-base">Full performance data</p>

                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#e1e2e6] sm:text-sm">
                                <span className="flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4 shrink-0 text-[#E53F01]" />
                                    {player?.user?.dob
                                        ? calcAge(player.user.dob) !== null && calcAge(player.user.dob)! < 18
                                            ? new Date(player.user.dob).getFullYear()
                                            : `${calcAge(player.user.dob)} years`
                                        : '—'}
                                </span>
                                <span className="flex min-w-0 items-center gap-1.5">
                                    <Users className="h-4 w-4 shrink-0 text-[#E53F01]" />
                                    {Array.isArray(player?.user?.nationality) && player.user.nationality.length > 0 ? (
                                        player.user.nationality.map((code: string, idx: number) => (
                                            <span key={`${code}-${idx}`} className="inline-flex items-center gap-1">
                                                <ReactCountryFlag countryCode={code} svg style={{ width: '1.1em', height: '1.1em' }} />
                                                <span>{getCountryName(code)}</span>
                                                {idx < player.user.nationality.length - 1 && <span>,</span>}
                                            </span>
                                        ))
                                    ) : (
                                        <span>—</span>
                                    )}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Ruler className="h-4 w-4 shrink-0 text-[#E53F01]" />
                                    {player?.height ? `${player.height} cm` : '—'}
                                </span>
                                <span className="flex min-w-0 items-center gap-1.5">
                                    <Crosshair className="h-4 w-4 shrink-0 text-[#E53F01]" />
                                    <span className="min-w-0 break-words">{getPositionFullName(player?.positions ?? [])}</span>
                                </span>
                                <span className="flex min-w-0 items-center gap-1.5">
                                    <Shield className="h-4 w-4 shrink-0 text-[#E53F01]" />
                                    <span className="min-w-0 break-words">{player?.current_club ?? '—'}</span>
                                </span>
                            </div>
                        </div>

                        <Link href={backHref} className="shrink-0 self-start">
                            <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#2A2A2A] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-[#E53F01] hover:text-[#E53F01] sm:text-sm">
                                <ArrowLeft className="h-4 w-4 shrink-0" />
                                Back to profile
                            </button>
                        </Link>
                    </div>
                </section>

                {/* SEASON FILTER */}
                {seasons.length > 0 && (
                    <section className="flex flex-wrap items-center gap-2">
                        <span className="text-[0.625rem] tracking-wider text-gray-400 uppercase sm:text-xs">Season</span>
                        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[#152538] bg-[#0b1523] p-1">
                            <button
                                type="button"
                                onClick={() => setSeason('all')}
                                className={`cursor-pointer rounded-md px-3 py-1.5 text-[0.625rem] font-semibold transition-colors sm:text-xs ${season === 'all' ? 'bg-[#E53F01] text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                All
                            </button>
                            {seasons.map((y) => (
                                <button
                                    key={y}
                                    type="button"
                                    onClick={() => setSeason(y)}
                                    className={`cursor-pointer rounded-md px-3 py-1.5 text-[0.625rem] font-semibold transition-colors sm:text-xs ${season === y ? 'bg-[#E53F01] text-white' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* SUMMARY CARDS */}
                <section className={`grid gap-3 sm:gap-4 ${statGridClass}`}>
                    {statCards.map((c) => {
                        const Icon = c.icon;
                        return (
                            <div key={c.label} className="rounded-xl border border-[#152538] bg-[#07111d] p-4 sm:p-5">
                                <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4 shrink-0 text-[#E53F01]" />
                                    <span className="text-[0.625rem] tracking-wider text-gray-400 uppercase sm:text-xs">{c.label}</span>
                                </div>
                                <p className="mt-2 font-mono text-2xl font-bold text-white sm:text-3xl">{c.value}</p>
                                <p className="mt-1 text-[0.625rem] text-gray-500 sm:text-xs">{c.sub}</p>
                            </div>
                        );
                    })}
                </section>

                {/* ALL MATCHES */}
                <section className="overflow-hidden rounded-xl border border-[#152538] bg-[#07111d] p-4 sm:p-6">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-[0.875rem] font-bold text-white uppercase md:text-xl">All Matches</h2>
                        <span className="font-mono text-xs text-gray-400 sm:text-sm">
                            {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[22rem]">
                            <thead>
                                <tr className="border-b border-gray-300/10 text-left text-[0.75rem] text-gray-300 uppercase md:text-sm">
                                    <th className="pb-4 whitespace-nowrap">Date</th>
                                    <th className="pb-4">Match</th>
                                    {showSaves && <th className="pb-4 text-center">Saves</th>}
                                    {showGoals && <th className="pb-4 text-center">Goals</th>}
                                    {showAssists && <th className="px-2 pb-4 text-center">Assists</th>}
                                    <th className="pb-4 text-center">Minutes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matches.map((match: any, index: number) => (
                                    <tr key={index} className="border-b border-gray-300/10 text-[0.625rem] text-gray-200 md:text-[0.875rem]">
                                        <td className="py-3 whitespace-nowrap text-gray-400">{formatMatchDate(match.date)}</td>
                                        <td className="py-3">
                                            <div className="flex items-center gap-2 md:gap-4">
                                                <span>{match.home}</span>
                                                <span className="font-semibold whitespace-nowrap">{match.score}</span>
                                                <span>{match.away}</span>
                                            </div>
                                        </td>
                                        {showSaves && <td className="py-3 text-center">{match.saves}</td>}
                                        {showGoals && <td className="py-3 text-center">{match.goals}</td>}
                                        {showAssists && <td className="py-3 text-center">{match.assists}</td>}
                                        <td className="py-3 text-center">{match.minutes}</td>
                                    </tr>
                                ))}
                                {matches.length === 0 && (
                                    <tr>
                                        <td colSpan={matchColSpan} className="py-8 text-center text-sm text-gray-400">
                                            No matches for this season.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    {matches.length > 0 && (
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#E53F01]/50 bg-[#E53F01]/10 px-4 py-3">
                            <div className="shrink-0">
                                <p className="text-[0.75rem] font-bold text-[#E53F01] uppercase md:text-sm">Total</p>
                                <p className="font-mono text-[0.625rem] text-gray-400 md:text-xs">
                                    {totals.games} {totals.games === 1 ? 'game' : 'games'}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-5 md:gap-8">
                                {[
                                    ...(showSaves ? [{ label: 'Saves', value: totals.saves }] : []),
                                    ...(showGoals ? [{ label: 'Goals', value: totals.goals }] : []),
                                    ...(showAssists ? [{ label: 'Assists', value: totals.assists }] : []),
                                    { label: 'Minutes', value: totals.minutes },
                                ].map((c) => (
                                    <div key={c.label} className="text-center">
                                        <p className="font-mono text-base font-bold text-white md:text-xl">{c.value}</p>
                                        <p className="text-[0.625rem] tracking-wider text-gray-400 uppercase md:text-xs">{c.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* COMPETITIONS + ACHIEVEMENTS */}
                <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-[#152538] bg-[#07111d] p-4 sm:p-6">
                        <h2 className="mb-5 text-[0.875rem] font-bold text-white uppercase md:text-xl">Competition History</h2>
                        <div className="space-y-3">
                            {competitions.map((item: any, index: number) => (
                                <div key={index} className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-start gap-2">
                                        {item.country && (
                                            <ReactCountryFlag
                                                countryCode={item.country}
                                                svg
                                                style={{ width: '1.1em', height: '1.1em' }}
                                                className="mt-0.5 shrink-0"
                                            />
                                        )}
                                        <span className="min-w-0 text-[0.75rem] break-words text-gray-200 md:text-sm">{item.name}</span>
                                    </div>
                                    <span className="shrink-0 text-[0.75rem] whitespace-nowrap text-[#E53F01] md:text-sm">{item.year}</span>
                                </div>
                            ))}
                            {competitions.length === 0 && <p className="text-sm text-gray-400">No competitions added yet.</p>}
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#152538] bg-[#07111d] p-4 sm:p-6">
                        <h2 className="mb-5 text-[0.875rem] font-bold text-white uppercase md:text-xl">Achievements</h2>
                        <div className="space-y-3">
                            {achievements.map((item: any, index: number) => (
                                <div key={index} className="flex items-start gap-2 md:gap-3">
                                    <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-[#E53F01]" />
                                    <span className="shrink-0 text-[0.75rem] font-bold text-[#E53F01] md:text-sm">{item.year}</span>
                                    <span className="min-w-0 text-[0.75rem] break-words text-gray-300 md:text-sm">{item.title}</span>
                                </div>
                            ))}
                            {achievements.length === 0 && <p className="text-sm text-gray-400">No achievements added yet.</p>}
                        </div>
                    </div>
                </section>
            </main>

            <PublicFooter />
        </div>
    );
}
