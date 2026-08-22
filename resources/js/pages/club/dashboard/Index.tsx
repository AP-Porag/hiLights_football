import React, { useState, useMemo } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import ScoutNavbar from '@/components/scout/ScoutNavbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import {
    Search as SearchIcon,
    LayoutGrid,
    List,
    SlidersHorizontal,
    Network,
    ChevronRight,
    X,
    Heart,
} from 'lucide-react';

// ── DB থেকে আসা PlayerProfile (with user) ──
interface PlayerProfileRow {
    id: number;
    user_id: number;
    player_id: string | null;
    height: number | string | null;
    weight: number | string | null;
    current_club: string | null;
    modality: string | null;
    positions: string[] | string | null;
    foot: string | null;
    photo_url: string | null;
    user?: {
        id: number;
        name: string | null;
        dob: string | null;
        nationality: string | null;
    } | null;
}

// UI-তে যে shape লাগে
interface Player {
    id: number;
    name: string;
    club: string;
    position: 'GK' | 'DEF' | 'MID' | 'FWD' | '—';
    age: number | null;
    dob: string | null;
    height: number | null;
    foot: 'R' | 'L' | 'B' | '—';
    country: string;
    flag: string;
    modality: string;
    photoUrl: string | null;
}

// positions[] থেকে main group বের করা
const POSITION_GROUP: Record<string, 'GK' | 'DEF' | 'MID' | 'FWD'> = {
    GK: 'GK',
    LB: 'DEF',
    'CB-L': 'DEF',
    'CB-R': 'DEF',
    RB: 'DEF',
    LM: 'MID',
    'CM-L': 'MID',
    'CM-R': 'MID',
    RM: 'MID',
    CAM: 'MID',
    LW: 'FWD',
    ST: 'FWD',
    RW: 'FWD',
    CF: 'FWD',
};

const FOOT_MAP: Record<string, 'R' | 'L' | 'B'> = {
    Right: 'R',
    Left: 'L',
    Ambidextrous: 'B',
};

// positions column যদি model‑এ 'array' cast না থাকে, Inertia JSON string পাঠায় — দুটোই handle করছি
const toArray = (v: unknown): string[] => {
    if (Array.isArray(v)) return v as string[];
    if (typeof v === 'string' && v.trim() !== '') {
        try {
            const parsed = JSON.parse(v);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    return [];
};

const toNumOrNull = (v: unknown): number | null => {
    if (v === null || v === undefined || v === '') return null;
    const n = Number(v);
    return isNaN(n) ? null : n;
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
        .join(', '); // ← কমা দিয়ে আলাদা
};

const codeToFlag = (code?: string | string[] | null): string => {
    if (!code) return '🏳️';

    const codes = Array.isArray(code) ? code : [code];

    if (codes.length === 0) return '🏳️';

    return codes
        .map(c => {
            if (typeof c !== 'string' || c.length !== 2) return '🏳️';
            return String.fromCodePoint(
                ...c.toUpperCase().split('').map((ch) => 0x1f1a5 + ch.charCodeAt(0))
            );
        })
        .join(', '); // ← কমা ও স্পেস দিয়ে আলাদা
};

const calcAge = (dob?: string | null): number | null => {
    if (!dob) return null;
    const d = new Date(dob);
    if (isNaN(d.getTime())) return null;
    const age = new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970;
    return age >= 0 ? age : null;
};

// DB row → UI Player
const normalizePlayer = (p: PlayerProfileRow): Player => {
    const positions = toArray(p.positions);
    const firstPos = positions.find((x) => POSITION_GROUP[x]);
    return {
        id: p.id,
        name: p.user?.name ?? 'Unnamed player',
        club: p.current_club ?? '—',
        position: firstPos ? POSITION_GROUP[firstPos] : '—',
        age: calcAge(p.user?.dob),
        dob: p.user?.dob ?? null,
        height: toNumOrNull(p.height),
        foot: p.foot ? (FOOT_MAP[p.foot] ?? '—') : '—',
        country: getCountryName(p.user?.nationality),
        flag: codeToFlag(p.user?.nationality),
        modality: p.modality ?? 'Football',
        photoUrl: p.photo_url ?? null,
    };
};
const getAgeDisplay = (
    age: number | null,
    dob: string | null
): { label: string; value: string } => {
    if (!dob || age === null) {
        return {
            label: 'Age',
            value: '—',
        };
    }

    if (age < 18) {
        const birthDate = new Date(dob);

        return {
            label: 'Birth Year',
            value: birthDate.getFullYear().toString(),
        };
    }

    return {
        label: 'Age',
        value: age.toString(),
    };
};

function positionGradient(position: string): string {
    switch (position) {
        case 'GK':
            return 'bg-gradient-to-br from-amber-400/30 to-orange-600/30';
        case 'DEF':
            return 'bg-gradient-to-br from-blue-500/25 to-slate-700/30';
        case 'MID':
            return 'bg-gradient-to-br from-emerald-500/25 to-teal-700/30';
        case 'FWD':
            return 'bg-gradient-to-br from-[#FF6B00]/30 to-red-700/30';
        default:
            return 'bg-gradient-to-br from-slate-400/20 to-slate-700/20';
    }
}

const POSITION_LABELS: Record<string, string> = {
    GK: 'Goalkeeper',
    DEF: 'Defender',
    MID: 'Midfielder',
    FWD: 'Forward',
};

const PER_PAGE = 24;
const AGE_FLOOR = 16;
const AGE_CEIL = 40;

interface FilterPanelProps {
    positionOptions: { code: string; label: string; count: number }[];
    countryOptions: { name: string; flag: string; count: number }[];
    modalityOptions: { name: string; count: number }[];
    selectedPositions: string[];
    togglePosition: (code: string) => void;
    selectedCountries: string[];
    toggleCountry: (name: string) => void;
    selectedModalities: string[];
    toggleModality: (m: string) => void;
    ageMin: number;
    ageMax: number;
    setAgeMin: (n: number) => void;
    setAgeMax: (n: number) => void;
    ageActive: boolean;
    heightMin: string;
    setHeightMin: (s: string) => void;
    heightMax: string;
    setHeightMax: (s: string) => void;
    preferredFoot: string;
    setPreferredFoot: (s: string) => void;
    countrySearch: string;
    setCountrySearch: (s: string) => void;
    clearAll: () => void;
    activeFilterCount: number;
}

function FilterPanel({
    positionOptions,
    countryOptions,
    modalityOptions,
    selectedPositions,
    togglePosition,
    selectedCountries,
    toggleCountry,
    selectedModalities,
    toggleModality,
    ageMin,
    ageMax,
    setAgeMin,
    setAgeMax,
    ageActive,
    heightMin,
    setHeightMin,
    heightMax,
    setHeightMax,
    preferredFoot,
    setPreferredFoot,
    countrySearch,
    setCountrySearch,
    clearAll,
    activeFilterCount,
}: FilterPanelProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#F5F5F5] tracking-widest uppercase">
                    Filters
                    {activeFilterCount > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center rounded-full bg-[#FF6B00] px-1.5 py-0.5 text-[9px] font-black text-white">
                            {activeFilterCount}
                        </span>
                    )}
                </h3>
                <button
                    onClick={clearAll}
                    disabled={activeFilterCount === 0}
                    className="text-[#FF6B00] text-xs hover:underline font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline"
                >
                    Clear All
                </button>
            </div>
            <Separator className="bg-[#2A2A2A]" />

            {/* POSITION */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#9A9A9A] tracking-widest uppercase">Position</h4>
                <div className="space-y-2.5">
                    {positionOptions.map((p) => (
                        <div key={p.code} className="flex items-center gap-2.5">
                            <Checkbox
                                id={`pos-${p.code}`}
                                checked={selectedPositions.includes(p.code)}
                                onCheckedChange={() => togglePosition(p.code)}
                                className="border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]"
                            />
                            <Label
                                htmlFor={`pos-${p.code}`}
                                className="flex-1 flex items-center justify-between text-sm font-normal text-[#F5F5F5] cursor-pointer"
                            >
                                <span>
                                    <span className="font-mono font-bold text-[#FF6B00]">{p.code}</span>
                                    <span className="text-[#9A9A9A]"> — {p.label}</span>
                                </span>
                                <span className="text-[10px] font-mono text-[#555555]">{p.count}</span>
                            </Label>
                        </div>
                    ))}
                    {positionOptions.length === 0 && <p className="text-xs text-[#555555]">No data yet</p>}
                </div>
            </div>
            <Separator className="bg-[#2A2A2A]" />

            {/* AGE RANGE */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold text-[#9A9A9A] tracking-widest uppercase">Age Range</h4>
                    <span className="font-mono text-[#FF6B00] text-sm font-semibold">
                        {ageActive ? `${ageMin} – ${ageMax}` : 'Any'}
                    </span>
                </div>
                <div className="space-y-2 pt-1">
                    <input
                        type="range"
                        min={AGE_FLOOR}
                        max={AGE_CEIL}
                        value={ageMin}
                        onChange={(e) => setAgeMin(Math.min(Number(e.target.value), ageMax))}
                        className="w-full h-1.5 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                    />
                    <input
                        type="range"
                        min={AGE_FLOOR}
                        max={AGE_CEIL}
                        value={ageMax}
                        onChange={(e) => setAgeMax(Math.max(Number(e.target.value), ageMin))}
                        className="w-full h-1.5 bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                    />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#555555]">
                    <span>{AGE_FLOOR}</span>
                    <span>{AGE_CEIL}</span>
                </div>
            </div>
            <Separator className="bg-[#2A2A2A]" />

            {/* NATIONALITY */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#9A9A9A] tracking-widest uppercase">Nationality</h4>
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
                    <Input
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country..."
                        className="pl-9 h-9 text-sm bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:border-[#FF6B00] focus-visible:ring-1 focus-visible:ring-orange-800"
                    />
                </div>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {countryOptions
                        .filter((c) => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
                        .map((c) => (
                            <div key={c.name} className="flex items-center gap-2.5">
                                <Checkbox
                                    id={`country-${c.name}`}
                                    checked={selectedCountries.includes(c.name)}
                                    onCheckedChange={() => toggleCountry(c.name)}
                                    className="border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]"
                                />
                                <Label
                                    htmlFor={`country-${c.name}`}
                                    className="flex-1 flex items-center justify-between text-sm font-normal text-[#F5F5F5] cursor-pointer"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-base leading-none">{c.flag}</span>
                                        <span>{c.name}</span>
                                    </span>
                                    <span className="text-[10px] font-mono text-[#555555]">{c.count}</span>
                                </Label>
                            </div>
                        ))}
                    {countryOptions.length === 0 && <p className="text-xs text-[#555555]">No data yet</p>}
                    {countryOptions.length > 0 &&
                        countryOptions.filter((c) =>
                            c.name.toLowerCase().includes(countrySearch.toLowerCase())
                        ).length === 0 && <p className="text-xs text-[#555555]">No country matched</p>}
                </div>
            </div>
            <Separator className="bg-[#2A2A2A]" />

            {/* PREFERRED FOOT */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#9A9A9A] tracking-widest uppercase">Preferred Foot</h4>
                <RadioGroup value={preferredFoot} onValueChange={setPreferredFoot} className="space-y-2">
                    {['any', 'right', 'left', 'both'].map((foot) => (
                        <div key={foot} className="flex items-center gap-2.5">
                            <RadioGroupItem
                                id={`foot-${foot}`}
                                value={foot}
                                className="border-[#2A2A2A] text-[#FF6B00]"
                            />
                            <Label htmlFor={`foot-${foot}`} className="text-sm font-normal text-[#F5F5F5] capitalize cursor-pointer">
                                {foot}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <Separator className="bg-[#2A2A2A]" />

            {/* MODALITY */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#9A9A9A] tracking-widest uppercase">Modality</h4>
                <div className="space-y-2.5">
                    {modalityOptions.map((m) => (
                        <div key={m.name} className="flex items-center gap-2.5">
                            <Checkbox
                                id={`mod-${m.name}`}
                                checked={selectedModalities.includes(m.name)}
                                onCheckedChange={() => toggleModality(m.name)}
                                className="border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]"
                            />
                            <Label
                                htmlFor={`mod-${m.name}`}
                                className="flex-1 flex items-center justify-between text-sm font-normal text-[#F5F5F5] cursor-pointer"
                            >
                                <span>{m.name}</span>
                                <span className="text-[10px] font-mono text-[#555555]">{m.count}</span>
                            </Label>
                        </div>
                    ))}
                    {modalityOptions.length === 0 && <p className="text-xs text-[#555555]">No data yet</p>}
                </div>
            </div>
            <Separator className="bg-[#2A2A2A]" />

            {/* HEIGHT */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#9A9A9A] tracking-widest uppercase">Height (cm)</h4>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={heightMin}
                        onChange={(e) => setHeightMin(e.target.value)}
                        placeholder="Min"
                        className="h-9 text-sm font-mono bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:border-[#FF6B00] focus-visible:ring-1 focus-visible:ring-orange-800"
                    />
                    <span className="text-[#94A3B8] text-sm">–</span>
                    <Input
                        type="number"
                        value={heightMax}
                        onChange={(e) => setHeightMax(e.target.value)}
                        placeholder="Max"
                        className="h-9 text-sm font-mono bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:border-[#FF6B00] focus-visible:ring-1 focus-visible:ring-orange-800"
                    />
                </div>
            </div>

            {/* AD ZONE - ScoutPro */}
            <div className="space-y-2 pt-2">
                <p className="text-[10px] uppercase tracking-widest text-[#555555] text-center">Sponsored</p>
                <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-xl h-[240px] p-5 flex flex-col items-center justify-center text-center border border-[#334155] relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-[9px] text-white/30 uppercase tracking-widest">Ad</div>
                    <div className="w-14 h-14 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center mb-3">
                        <Network className="w-7 h-7 text-[#FF6B00]" strokeWidth={2.2} />
                    </div>
                    <h4 className="font-display text-xl font-bold text-white tracking-tight">ScoutPro Network</h4>
                    <p className="text-xs text-white/60 leading-snug mt-2 mb-4 px-2">
                        Connect with 12,000+ verified scouts. Direct messaging, market insights, and exclusive reports.
                    </p>
                    <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-lg transition-colors">
                        Join Free
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────────
export default function Index({
    players: playersProp,
    savedIds: savedIdsProp,
}: {
    players?: PlayerProfileRow[];
    savedIds?: number[];
}) {
    const pageProps = usePage<{
        players?: PlayerProfileRow[];
        savedIds?: number[];
    }>().props;

    const rawPlayers: PlayerProfileRow[] = Array.isArray(playersProp)
        ? playersProp
        : Array.isArray(pageProps.players)
            ? pageProps.players
            : [];

    const initialSavedIds = Array.isArray(savedIdsProp)
        ? savedIdsProp
        : Array.isArray(pageProps.savedIds)
            ? pageProps.savedIds
            : [];

    // ── State ──
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [ageMin, setAgeMinRaw] = useState(AGE_FLOOR);
    const [ageMax, setAgeMaxRaw] = useState(AGE_CEIL);
    const [ageActive, setAgeActive] = useState(false);
    const [heightMin, setHeightMinRaw] = useState('');
    const [heightMax, setHeightMaxRaw] = useState('');
    const [preferredFoot, setPreferredFootRaw] = useState('any');
    const [countrySearch, setCountrySearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('newest');
    const [page, setPage] = useState(1);

    // ── Saved players state ──
    const [savedIds, setSavedIds] = useState<number[]>(initialSavedIds);

    // ── Filter state setters (that also reset page) ──
    const setAgeMin = (n: number) => {
        setAgeActive(true);
        setPage(1);
        setAgeMinRaw(n);
    };
    const setAgeMax = (n: number) => {
        setAgeActive(true);
        setPage(1);
        setAgeMaxRaw(n);
    };
    const setHeightMin = (s: string) => {
        setPage(1);
        setHeightMinRaw(s);
    };
    const setHeightMax = (s: string) => {
        setPage(1);
        setHeightMaxRaw(s);
    };
    const setPreferredFoot = (s: string) => {
        setPage(1);
        setPreferredFootRaw(s);
    };

    // ── Normalize players ──
    const allPlayers: Player[] = useMemo(() => rawPlayers.map(normalizePlayer), [rawPlayers]);

    // ── Filter options ──
    const positionOptions = useMemo(() => {
        return (['GK', 'DEF', 'MID', 'FWD'] as const)
            .map((code) => ({
                code,
                label: POSITION_LABELS[code],
                count: allPlayers.filter((p) => p.position === code).length,
            }))
            .filter((o) => o.count > 0);
    }, [allPlayers]);

    const countryOptions = useMemo(() => {
        const map = new Map<string, { name: string; flag: string; count: number }>();
        allPlayers.forEach((p) => {
            if (!p.country) return;
            const existing = map.get(p.country);
            if (existing) existing.count += 1;
            else map.set(p.country, { name: p.country, flag: p.flag, count: 1 });
        });
        return Array.from(map.values()).sort((a, b) => b.count - a.count);
    }, [allPlayers]);

    const modalityOptions = useMemo(() => {
        const map = new Map<string, number>();
        allPlayers.forEach((p) => {
            if (!p.modality) return;
            map.set(p.modality, (map.get(p.modality) ?? 0) + 1);
        });
        return Array.from(map.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [allPlayers]);

    // ── Toggle functions ──
    const togglePosition = (code: string) => {
        setPage(1);
        setSelectedPositions((prev) =>
            prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]
        );
    };
    const toggleCountry = (name: string) => {
        setPage(1);
        setSelectedCountries((prev) =>
            prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
        );
    };
    const toggleModality = (m: string) => {
        setPage(1);
        setSelectedModalities((prev) =>
            prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
        );
    };

    const clearAll = () => {
        setSelectedPositions([]);
        setSelectedCountries([]);
        setSelectedModalities([]);
        setAgeMinRaw(AGE_FLOOR);
        setAgeMaxRaw(AGE_CEIL);
        setAgeActive(false);
        setHeightMinRaw('');
        setHeightMaxRaw('');
        setPreferredFootRaw('any');
        setCountrySearch('');
        setSearchQuery('');
        setPage(1);
    };

    // ── Active filter count ──
    const activeFilterCount =
        selectedPositions.length +
        selectedCountries.length +
        selectedModalities.length +
        (ageActive ? 1 : 0) +
        (heightMin ? 1 : 0) +
        (heightMax ? 1 : 0) +
        (preferredFoot !== 'any' ? 1 : 0) +
        (searchQuery.trim() ? 1 : 0);

    // ── Filtering ──
    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const hMin = heightMin ? Number(heightMin) : null;
        const hMax = heightMax ? Number(heightMax) : null;
        const footWanted =
            preferredFoot === 'right' ? 'R' :
                preferredFoot === 'left' ? 'L' :
                    preferredFoot === 'both' ? 'B' : null;

        return allPlayers.filter((p) => {
            if (q) {
                const haystack = `${p.name} ${p.club} ${p.country}`.toLowerCase();
                if (!haystack.includes(q)) return false;
            }
            if (selectedPositions.length && !selectedPositions.includes(p.position)) return false;
            if (selectedCountries.length && !selectedCountries.includes(p.country)) return false;
            if (selectedModalities.length && !selectedModalities.includes(p.modality)) return false;
            if (ageActive && p.age !== null && (p.age < ageMin || p.age > ageMax)) return false;
            if (hMin !== null && (p.height === null || p.height < hMin)) return false;
            if (hMax !== null && (p.height === null || p.height > hMax)) return false;
            if (footWanted && p.foot !== footWanted) return false;
            return true;
        });
    }, [
        allPlayers,
        searchQuery,
        selectedPositions,
        selectedCountries,
        selectedModalities,
        ageActive,
        ageMin,
        ageMax,
        heightMin,
        heightMax,
        preferredFoot,
    ]);

    // ── Sorting ──
    const sorted = useMemo(() => {
        const arr = [...filtered];
        switch (sortBy) {
            case 'age-asc':
                return arr.sort((a, b) => (a.age ?? 999) - (b.age ?? 999));
            case 'age-desc':
                return arr.sort((a, b) => (b.age ?? -1) - (a.age ?? -1));
            case 'name':
                return arr.sort((a, b) => a.name.localeCompare(b.name));
            case 'height-desc':
                return arr.sort((a, b) => (b.height ?? -1) - (a.height ?? -1));
            default:
                return arr.sort((a, b) => b.id - a.id);
        }
    }, [filtered, sortBy]);

    const totalPlayers = sorted.length;
    const totalPages = Math.max(1, Math.ceil(totalPlayers / PER_PAGE));
    const currentPage = Math.min(page, totalPages);
    const players = sorted.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
    const rangeStart = totalPlayers === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1;
    const rangeEnd = Math.min(currentPage * PER_PAGE, totalPlayers);

    // ── Page numbers ──
    const pageNumbers = useMemo(() => {
        const nums: number[] = [];
        const start = Math.max(1, Math.min(currentPage - 1, totalPages - 2));
        const end = Math.min(totalPages, start + 2);
        for (let i = Math.max(1, start); i <= end; i++) nums.push(i);
        return nums;
    }, [currentPage, totalPages]);

    // ── Toggle save ──
    const toggleSave = async (playerProfileId: number) => {
        try {
            const response = await axios.post(
                route('club.player.save', playerProfileId),
                {}, // খালি বডি (প্রয়োজন হলে ডেটা পাঠাতে পারেন)
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = response.data;
            if (data.saved) {
                setSavedIds((prev) => [...prev, playerProfileId]);
            } else {
                setSavedIds((prev) => prev.filter((id) => id !== playerProfileId));
            }
        } catch (error) {
            console.error('Error toggling save:', error);
            // অপশনাল: ইউজারকে নোটিফিকেশন দেখান
        }
    };
    // ── Helpers ──
    const initials = (name: string) =>
        name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

    // ── Active filter chips ──
    const chips: { label: string; onRemove: () => void }[] = [
        ...selectedPositions.map((c) => ({
            label: POSITION_LABELS[c] ?? c,
            onRemove: () => togglePosition(c),
        })),
        ...selectedCountries.map((c) => ({ label: c, onRemove: () => toggleCountry(c) })),
        ...selectedModalities.map((m) => ({ label: m, onRemove: () => toggleModality(m) })),
        ...(ageActive
            ? [
                {
                    label: `Age ${ageMin}–${ageMax}`,
                    onRemove: () => {
                        setAgeActive(false);
                        setAgeMinRaw(AGE_FLOOR);
                        setAgeMaxRaw(AGE_CEIL);
                        setPage(1);
                    },
                },
            ]
            : []),
        ...(heightMin ? [{ label: `Min ${heightMin} cm`, onRemove: () => setHeightMin('') }] : []),
        ...(heightMax ? [{ label: `Max ${heightMax} cm`, onRemove: () => setHeightMax('') }] : []),
        ...(preferredFoot !== 'any'
            ? [{ label: `${preferredFoot} foot`, onRemove: () => setPreferredFoot('any') }]
            : []),
    ];

    const filterProps: FilterPanelProps = {
        positionOptions,
        countryOptions,
        modalityOptions,
        selectedPositions,
        togglePosition,
        selectedCountries,
        toggleCountry,
        selectedModalities,
        toggleModality,
        ageMin,
        ageMax,
        setAgeMin,
        setAgeMax,
        ageActive,
        heightMin,
        setHeightMin,
        heightMax,
        setHeightMax,
        preferredFoot,
        setPreferredFoot,
        countrySearch,
        setCountrySearch,
        clearAll,
        activeFilterCount,
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D]">
            <ScoutNavbar />
            <div className="pt-16 flex min-h-screen">
                {/* DESKTOP FILTER PANEL */}
                <aside className="hidden lg:block w-72 shrink-0 bg-[#0D0D0D] border-r border-[#2A2A2A] px-6 py-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
                    <FilterPanel {...filterProps} />
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 min-w-0 p-4 sm:p-6">
                    {/* TOP BAR */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-4 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1">
                            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search by name, club, or nationality..."
                                className="pl-10 pr-10 h-11 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#555555] focus-visible:border-[#FF6B00] focus-visible:ring-1 focus-visible:ring-orange-800"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setPage(1);
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#FF6B00]"
                                    aria-label="Clear search"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Mobile filter trigger */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="lg:hidden h-10 border-[#2A2A2A] text-[#F5F5F5] bg-[#111111]"
                                    >
                                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                                        Filters
                                        {activeFilterCount > 0 && (
                                            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-[#FF6B00] px-1.5 py-0.5 text-[10px] font-black text-white">
                                                {activeFilterCount}
                                            </span>
                                        )}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="left"
                                    className="w-[300px] sm:w-[340px] bg-[#0D0D0D] border-r border-[#2A2A2A] overflow-y-auto p-6"
                                >
                                    <SheetHeader className="mb-4">
                                        <SheetTitle className="text-[#F5F5F5] font-display text-xl">
                                            Refine Search
                                        </SheetTitle>
                                    </SheetHeader>
                                    <FilterPanel {...filterProps} />
                                </SheetContent>
                            </Sheet>

                            <p className="hidden sm:block text-sm text-[#9A9A9A] font-mono whitespace-nowrap">
                                <span className="font-bold text-[#F5F5F5]">{totalPlayers.toLocaleString()}</span> players
                                found
                            </p>

                            {/* View toggle */}
                            <div className="flex items-center gap-1 bg-[#111111] border border-[#2A2A2A] rounded-lg p-1">
                                <button
                                    onClick={() => setView('grid')}
                                    className={`p-1.5 rounded-md transition-colors ${view === 'grid'
                                        ? 'text-[#FF6B00] bg-[rgba(255,107,0,0.12)]'
                                        : 'text-[#555555] hover:text-[#9A9A9A]'
                                        }`}
                                    aria-label="Grid view"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setView('list')}
                                    className={`p-1.5 rounded-md transition-colors ${view === 'list'
                                        ? 'text-[#FF6B00] bg-[rgba(255,107,0,0.12)]'
                                        : 'text-[#555555] hover:text-[#9A9A9A]'
                                        }`}
                                    aria-label="List view"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Sort */}
                            <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setPage(1); }}>
                                <SelectTrigger className="h-10 w-[140px] bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#161616] border-[#2A2A2A]">
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="name">Name A–Z</SelectItem>
                                    <SelectItem value="age-asc">Age ↑</SelectItem>
                                    <SelectItem value="age-desc">Age ↓</SelectItem>
                                    <SelectItem value="height-desc">Tallest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* ACTIVE FILTER CHIPS */}
                    {chips.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            {chips.map((chip, i) => (
                                <button
                                    key={`${chip.label}-${i}`}
                                    onClick={chip.onRemove}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-[#FF6B00] bg-[rgba(255,107,0,0.12)] px-3 py-1 text-xs font-semibold text-[#CC5500] hover:bg-[#FF6B00] hover:text-white transition-colors"
                                >
                                    {chip.label}
                                    <X className="w-3 h-3" />
                                </button>
                            ))}
                            <button
                                onClick={clearAll}
                                className="text-xs font-bold text-[#9A9A9A] hover:text-[#FF6B00] hover:underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}

                    {/* Mobile count display */}
                    <p className="sm:hidden mb-3 text-sm text-[#9A9A9A] font-mono px-1">
                        <span className="font-bold text-[#F5F5F5]">{totalPlayers.toLocaleString()}</span> players found
                    </p>

                    {/* AD ZONE - TransferRoom Leaderboard */}
                    <div className="mb-4">
                        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-xl min-h-[80px] flex flex-col sm:flex-row items-center px-6 py-3 sm:py-0 gap-3 sm:gap-4 border border-[#334155] relative overflow-hidden">
                            <div className="absolute top-1.5 right-2.5 text-[10px] text-white/30 uppercase tracking-widest">
                                Sponsored
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#CC5500] flex items-center justify-center font-display font-black text-white text-lg">
                                    TR
                                </div>
                                <div className="text-white">
                                    <p className="font-display text-lg font-bold leading-tight">TransferRoom</p>
                                    <p className="text-[10px] text-white/50 uppercase tracking-widest">
                                        Global Transfer Network
                                    </p>
                                </div>
                            </div>
                            <p className="flex-1 text-sm text-white/80 text-center sm:text-left sm:px-4">
                                Direct club-to-club deals. No agents. 800+ clubs trust TransferRoom for the transfer
                                window.
                            </p>
                            <button className="bg-white text-[#0F172A] hover:bg-white/90 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors shrink-0">
                                Request Demo
                            </button>
                        </div>
                    </div>

                    {/* EMPTY STATE */}
                    {totalPlayers === 0 && (
                        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-12 text-center">
                            {rawPlayers.length === 0 ? (
                                <p className="text-sm text-[#9A9A9A]">No players in the directory yet.</p>
                            ) : (
                                <>
                                    <p className="text-sm text-[#9A9A9A]">No players match your filters.</p>
                                    <button onClick={clearAll} className="mt-3 text-[#FF6B00] text-xs font-bold hover:underline">
                                        Clear all filters
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {/* GRID VIEW */}
                    {totalPlayers > 0 && view === 'grid' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {players.map((p) => {
                                const isSaved = savedIds.includes(p.id);
                                return (
                                    <div
                                        key={p.id}
                                        className="bg-[#161616] border border-[#2A2A2A] rounded-2xl overflow-hidden cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,107,0,0.08)] hover:border-[#FF6B00] relative"
                                    >
                                        <Link href={`/club/player/${p.id}`} className="block">
                                            {/* Photo area */}
                                            <div
                                                className={`h-48 ${positionGradient(
                                                    p.position
                                                )} bg-[#1F1F1F] relative flex items-center justify-center`}
                                            >
                                                {p.photoUrl ? (
                                                    <img
                                                        src={p.photoUrl}
                                                        alt={p.name}
                                                        className="absolute inset-0 h-full w-full object-cover object-top"
                                                    />
                                                ) : (
                                                    <img
                                                        src={'/images/img/placeholder.webp'}
                                                        alt={p.name}
                                                        className="absolute inset-0 h-full w-full object-cover"
                                                    />
                                                )}
                                                {/* Position badge */}
                                                <span className="absolute top-3 left-3 bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-wider">
                                                    {p.position}
                                                </span>
                                                {/* Flag */}
                                                <span className="absolute bottom-3 left-3 text-lg leading-none">{p.flag}</span>
                                            </div>

                                            {/* Info */}
                                            <div className="p-5">
                                                <h3 className="font-bold text-base text-[#F5F5F5] leading-tight truncate">
                                                    {p.name}
                                                </h3>
                                                <p className="text-sm text-[#9A9A9A] mt-0.5 truncate">{p.club}</p>

                                                {/* Stats */}
                                                <div className="grid grid-cols-3 mt-3 text-center border-t border-[#1F1F1F] pt-3">
                                                    <div>
                                                        <p className="text-[9px] text-[#555555] uppercase tracking-wider">
                                                            {getAgeDisplay(p.age, p.dob).label}
                                                        </p>

                                                        <p className="text-xs font-semibold font-mono text-[#F5F5F5] mt-0.5">
                                                            {getAgeDisplay(p.age, p.dob).value}
                                                        </p>
                                                    </div>
                                                    <div className="border-x border-[#1F1F1F]">
                                                        <p className="text-[9px] text-[#555555] uppercase tracking-wider">
                                                            Height
                                                        </p>
                                                        <p className="text-xs font-semibold font-mono text-[#F5F5F5] mt-0.5">
                                                            {p.height ?? '—'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] text-[#555555] uppercase tracking-wider">
                                                            Foot
                                                        </p>
                                                        <p className="text-xs font-semibold font-mono text-[#F5F5F5] mt-0.5">
                                                            {p.foot}
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="mt-3 text-[#FF6B00] text-xs font-bold tracking-wider group-hover:underline flex items-center gap-1">
                                                    VIEW PROFILE
                                                    <ChevronRight className="w-3 h-3" />
                                                </p>
                                            </div>
                                        </Link>

                                        {/* ─── Save button ─── */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleSave(p.id);
                                            }}
                                            className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
                                            aria-label={isSaved ? 'Unsave player' : 'Save player'}
                                        >
                                            {isSaved ? (
                                                <Heart className="w-5 h-5 fill-[#FF6B00] text-[#FF6B00]" />
                                            ) : (
                                                <Heart className="w-5 h-5 text-white" />
                                            )}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* LIST VIEW */}
                    {totalPlayers > 0 && view === 'list' && (
                        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b border-[#2A2A2A] hover:bg-transparent">
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#9A9A9A] py-4">
                                                Player
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#9A9A9A]">
                                                Position
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#9A9A9A]">
                                                Age
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#9A9A9A]">
                                                Country
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#9A9A9A]">
                                                Height
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#9A9A9A]">
                                                Foot
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#9A9A9A]">
                                                Modality
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#9A9A9A] text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {players.map((p) => {
                                            const isSaved = savedIds.includes(p.id);
                                            return (
                                                <TableRow
                                                    key={p.id}
                                                    className="border-b border-[#1F1F1F] hover:bg-[#1A1A1A] transition-colors"
                                                >
                                                    <TableCell className="py-3">
                                                        <div className="flex items-center gap-3">
                                                            {p.photoUrl ? (
                                                                <img
                                                                    src={p.photoUrl}
                                                                    alt={p.name}
                                                                    className="w-10 h-10 rounded-full object-cover shrink-0"
                                                                />
                                                            ) : (
                                                                <div
                                                                    className={`w-10 h-10 rounded-full ${positionGradient(
                                                                        p.position
                                                                    )} flex items-center justify-center font-display font-black text-white text-xs shrink-0`}
                                                                >
                                                                    {initials(p.name)}
                                                                </div>
                                                            )}
                                                            <div className="min-w-0">
                                                                <p className="font-bold text-sm text-[#F5F5F5] truncate">
                                                                    {p.name}
                                                                </p>
                                                                <p className="text-xs text-[#9A9A9A] truncate">
                                                                    {p.club}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider">
                                                            {p.position}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-sm text-[#F5F5F5]">
                                                        {p.age ?? '—'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1.5 text-sm text-[#F5F5F5]">
                                                            <span className="text-base leading-none">{p.flag}</span>
                                                            <span className="hidden md:inline">{p.country || '—'}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-sm text-[#F5F5F5]">
                                                        {p.height ?? '—'}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-sm text-[#F5F5F5]">
                                                        {p.foot}
                                                    </TableCell>
                                                    <TableCell className="text-sm text-[#9A9A9A]">
                                                        {p.modality}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {/* Save button */}
                                                            <button
                                                                onClick={() => toggleSave(p.id)}
                                                                className="p-1 rounded-full hover:bg-[#2A2A2A] transition-colors"
                                                                aria-label={isSaved ? 'Unsave player' : 'Save player'}
                                                            >
                                                                {isSaved ? (
                                                                    <Heart className="w-5 h-5 fill-[#FF6B00] text-[#FF6B00]" />
                                                                ) : (
                                                                    <Heart className="w-5 h-5 text-[#9A9A9A] hover:text-white" />
                                                                )}
                                                            </button>
                                                            <Link
                                                                href={`/scouting/player/${p.id}`}
                                                                className="inline-flex items-center gap-1 text-[#FF6B00] text-xs font-bold tracking-wider hover:underline"
                                                            >
                                                                VIEW
                                                                <ChevronRight className="w-3 h-3" />
                                                            </Link>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {/* PAGINATION */}
                    {totalPlayers > 0 && totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 gap-3">
                            <p className="text-sm text-[#9A9A9A] font-mono">
                                Showing{' '}
                                <span className="font-bold text-[#F5F5F5]">{rangeStart}–{rangeEnd}</span> of{' '}
                                <span className="font-bold text-[#F5F5F5]">{totalPlayers.toLocaleString()}</span>
                            </p>
                            <Pagination className="mx-0 w-auto justify-end">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPage(Math.max(1, currentPage - 1));
                                            }}
                                            className={`text-[#9A9A9A] hover:bg-[#1A1A1A] hover:text-[#F5F5F5] border-[#2A2A2A] ${currentPage === 1 ? 'pointer-events-none opacity-40' : ''
                                                }`}
                                        />
                                    </PaginationItem>
                                    {pageNumbers.map((n) => (
                                        <PaginationItem key={n}>
                                            <PaginationLink
                                                href="#"
                                                isActive={n === currentPage}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setPage(n);
                                                }}
                                                className={
                                                    n === currentPage
                                                        ? 'bg-[#FF6B00] text-white border-[#FF6B00] hover:bg-[#CC5500] hover:text-white'
                                                        : 'text-[#9A9A9A] hover:bg-[#1A1A1A] border-[#2A2A2A]'
                                                }
                                            >
                                                {n}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    {totalPages > pageNumbers[pageNumbers.length - 1] && (
                                        <>
                                            <PaginationItem className="hidden sm:list-item">
                                                <PaginationEllipsis className="text-[#94A3B8]" />
                                            </PaginationItem>
                                            <PaginationItem className="hidden sm:list-item">
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setPage(totalPages);
                                                    }}
                                                    className="text-[#9A9A9A] hover:bg-[#1A1A1A] border-[#2A2A2A]"
                                                >
                                                    {totalPages}
                                                </PaginationLink>
                                            </PaginationItem>
                                        </>
                                    )}
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPage(Math.min(totalPages, currentPage + 1));
                                            }}
                                            className={`text-[#9A9A9A] hover:bg-[#1A1A1A] hover:text-[#F5F5F5] border-[#2A2A2A] ${currentPage === totalPages ? 'pointer-events-none opacity-40' : ''
                                                }`}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
