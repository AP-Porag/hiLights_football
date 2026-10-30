import React, { useState, useEffect, useRef } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {
    Search, Filter, Download, MoreHorizontal, Eye, Pencil, Ban, Trash2, X, Star, CheckCircle2, AlertTriangle, FileUser, BadgeCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Breadcrumbs } from '@/components/breadcrumbs';

// ── Types ──
interface Player {
    id: number;
    playerId: string;
    slug: string | null;
    name: string;
    email: string;
    emailVerified: boolean;
    phone: string | null;
    phoneVerified: boolean;
    phoneVerifiedVia: 'whatsapp' | 'sms' | null;
    age: number | null;
    position: string;
    positionShort: string;
    country: string;
    countryFlag: string;
    club: string;
    subscription: 'Free' | 'Pro' | 'Elite';
    views: number;
    featured: boolean;
    status: 'Published' | 'Draft' | 'Suspended';
    avatar: string;
    height?: string;
    weight?: string;
    foot?: 'Left' | 'Right' | 'Both';
    marketValue?: string;
    bio?: string;
}

interface Filters {
    search?: string;
    filter?: string;
    country?: string;
    birth_year?: string;
    birth_city?: string;
    position?: string;
    boot_brand?: string;
    boots_per_year?: string;
    price_range?: string;
    supported_club?: string;
    dream_club?: string;
}

interface FilterOptions {
    countries: { code: string; name: string }[];
    birthYears: number[];
    birthCities: string[];
    positions: string[];
    bootBrands: string[];
    bootsPerYear: string[];
    priceRanges: string[];
}

interface Stats {
    total: number;
    published: number;
    featured: number;
    totalViews: number;
}

const FILTER_TABS = ['All', 'Featured'] as const;
type FilterTab = (typeof FILTER_TABS)[number];

// Advanced filter er khali obostha — "Clear all" eta-i firiye dey
const ADV_EMPTY = {
    country: '',
    birth_year: '',
    birth_city: '',
    position: '',
    boot_brand: '',
    boots_per_year: '',
    price_range: '',
    supported_club: '',
    dream_club: '',
};
type Adv = typeof ADV_EMPTY;

// Radix Select khali string value nite pare na, tai "All" er jonno sentinel
const ALL_OPTION = '__all';

// Controller theke filterOptions na ashle page crash korbe na
const OPTIONS_EMPTY: FilterOptions = {
    countries: [],
    birthYears: [],
    birthCities: [],
    positions: [],
    bootBrands: [],
    bootsPerYear: [],
    priceRanges: [],
};

function FilterSelect({ label, value, options, onChange }: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-1.5">
            <Label className="text-[0.6875rem] font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</Label>
            <Select value={value || ALL_OPTION} onValueChange={(v) => onChange(v === ALL_OPTION ? '' : v)}>
                <SelectTrigger className="h-9 border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#F5F5F5]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-72 border-[#2A2A2A] bg-[#0D0D0D]">
                    <SelectItem value={ALL_OPTION} className="text-xs text-[#94A3B8] hover:bg-[#1A1A1A]">All</SelectItem>
                    {options.map((o) => (
                        <SelectItem key={o.value} value={o.value} className="text-xs text-[#F5F5F5] hover:bg-[#1A1A1A]">
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

// ── Badges ──
function SubscriptionBadge({ sub }: { sub: Player['subscription'] }) {
    const styles = {
        Free: 'bg-[#1F1F1F] text-[#94A3B8] border-[#2A2A2A]',
        Pro: 'bg-[#2A2A2A] text-[#F5F5F5] border-[#3A3A3A]',
        Elite: 'bg-[rgba(255,107,0,0.12)] text-[#E53F01] border-[#E53F01]',
    } as const;
    return (
        <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider ${styles[sub]}`}>
            {sub === 'Elite' && <Star className="h-2.5 w-2.5 fill-current" />}
            {sub}
        </span>
    );
}

function StatusBadge({ status }: { status: Player['status'] }) {
    const styles = {
        Published: 'bg-green-900/30 text-green-400 border-green-700',
        Draft: 'bg-amber-900/30 text-amber-400 border-amber-700',
        Suspended: 'bg-red-900/30 text-red-400 border-red-700',
    } as const;
    return (
        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[0.6875rem] font-medium ${styles[status]}`}>
            {status}
        </span>
    );
}

function VerifyBadge({ verified, label }: { verified: boolean; label: string }) {
    if (!verified) {
        return (
            <span className="mt-1 inline-flex w-fit items-center rounded-md border border-amber-700 bg-amber-900/30 px-1.5 py-0.5 text-[0.6875rem] font-medium text-amber-400">
                Not verified
            </span>
        );
    }
    return (
        <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-md border border-green-700 bg-green-900/30 px-1.5 py-0.5 text-[0.6875rem] font-medium text-green-400">
            <BadgeCheck className="h-3 w-3" /> {label}
        </span>
    );
}

// ── Main Component ──
export default function PlayersIndex() {
    const { players, filters = {}, stats, filterOptions = OPTIONS_EMPTY } = usePage<{
        players: { data: Player[]; current_page: number; last_page: number; total: number };
        filters: Filters;
        stats: Stats;
        filterOptions: FilterOptions;
    }>().props;

    const [search, setSearch] = useState(filters.search || '');
    const [activeFilter, setActiveFilter] = useState<FilterTab>((filters.filter as FilterTab) || 'All');
    const [editPlayer, setEditPlayer] = useState<Player | null>(null);

    // Advanced filters
    const [adv, setAdv] = useState<Adv>({
        country: filters.country || '',
        birth_year: filters.birth_year || '',
        birth_city: filters.birth_city || '',
        position: filters.position || '',
        boot_brand: filters.boot_brand || '',
        boots_per_year: filters.boots_per_year || '',
        price_range: filters.price_range || '',
        supported_club: filters.supported_club || '',
        dream_club: filters.dream_club || '',
    });
    // Kono filter chalu thakle panel ta khola-i thakbe
    const [showAdv, setShowAdv] = useState(() =>
        (Object.keys(ADV_EMPTY) as (keyof Adv)[]).some((k) => !!filters[k]),
    );
    const [revision, setRevision] = useState(0);

    const activeAdvCount = Object.values(adv).filter(Boolean).length;

    // Delete confirmation modal
    const [deleteTarget, setDeleteTarget] = useState<Player | null>(null);
    const [deleting, setDeleting] = useState(false);

    // Suspend / Activate in-progress (per row)
    const [suspendingId, setSuspendingId] = useState<number | null>(null);

    const isInitialMount = useRef(true);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const delayRef = useRef(300);

    const formatViews = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

    // Khali filter gulo URL-e pathai na, tai link porishkar thake
    const queryPayload = (searchVal: string, filterVal: string, advVal: Adv, extra: Record<string, unknown> = {}) => {
        const q: Record<string, unknown> = { search: searchVal, filter: filterVal, ...extra };
        (Object.keys(advVal) as (keyof Adv)[]).forEach((k) => {
            if (advVal[k]) q[k] = advVal[k];
        });
        return q;
    };

    const applyFilters = (searchVal: string, filterVal: string, advVal: Adv = adv) => {
        router.get(route('players.index'), queryPayload(searchVal, filterVal, advVal), { preserveState: true, replace: true });
    };

    // Dropdown — sathe sathe apply (delay 0)
    const setSelectFilter = (key: keyof Adv, val: string) => {
        setAdv((prev) => ({ ...prev, [key]: val }));
        delayRef.current = 0;
        setRevision((r) => r + 1);
    };

    // Text box — type kora sesh hole apply (delay 300)
    const setTextFilter = (key: keyof Adv, val: string) => {
        setAdv((prev) => ({ ...prev, [key]: val }));
        delayRef.current = 300;
        setRevision((r) => r + 1);
    };

    const clearAllFilters = () => {
        setAdv(ADV_EMPTY);
        setSearch('');
        delayRef.current = 0;
        setRevision((r) => r + 1);
    };

    // Live search + filter, debounce diye (initial render skip kore)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            applyFilters(search, activeFilter);
        }, delayRef.current);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [search, revision]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters(search, activeFilter);
    };

    const handleTabChange = (tab: FilterTab) => {
        setActiveFilter(tab);
        applyFilters(search, tab);
    };

    const handleToggleFeatured = (id: number) => {
        router.put(route('players.toggle-featured', id));
    };

    // Suspend ↔ Activate toggle with toast
    const handleSuspend = (player: Player) => {
        const isSuspended = player.status === 'Suspended';
        setSuspendingId(player.id);

        router.put(route('players.suspend', player.id), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                if (isSuspended) {
                    toast.success(`${player.name} has been activated.`);
                } else {
                    toast.success(`${player.name} has been suspended.`);
                }
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
            onFinish: () => setSuspendingId(null),
        });
    };

    // Delete — open confirmation modal
    const handleDelete = (player: Player) => {
        setDeleteTarget(player);
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        const name = deleteTarget.name;
        setDeleting(true);

        router.delete(route('players.destroy', deleteTarget.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`${name} has been deleted.`);
                setDeleteTarget(null);
            },
            onError: () => {
                toast.error('Could not delete the player. Please try again.');
            },
            onFinish: () => setDeleting(false),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Players',
            href: '/admin/dashboard',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen space-y-6 bg-black p-6 text-white">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Total Players', value: stats.total.toString() },
                        { label: 'Featured', value: stats.featured.toString(), accent: true },
                        { label: 'Total Views', value: formatViews(stats.totalViews) },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-[#2A2A2A] bg-[#0D0D0D] p-6">
                            <div className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">{stat.label}</div>
                            <div className={`mt-2 font-mono text-2xl font-semibold ${stat.accent ? 'text-[#E53F01]' : 'text-[#F5F5F5]'}`}>{stat.value}</div>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="rounded-lg border border-[#2A2A2A] bg-[#0D0D0D] p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <form onSubmit={handleSearch} className="relative w-full lg:max-w-md">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                            <Input
                                type="text"
                                placeholder="Search by name, email, phone, club, or country..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    delayRef.current = 300;
                                }}
                                className="h-10 border-[#2A2A2A] bg-[#1A1A1A] pl-9 text-sm text-[#F5F5F5] placeholder:text-[#555555] focus-visible:border-[#E53F01] focus-visible:ring-2 focus-visible:ring-orange-800"
                            />
                        </form>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowAdv((v) => !v)}
                                className={`inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs font-medium transition-colors ${showAdv || activeAdvCount > 0
                                    ? 'border-[#E53F01] bg-[rgba(255,107,0,0.12)] text-[#E53F01]'
                                    : 'border-[#2A2A2A] bg-[#1A1A1A] text-[#94A3B8] hover:text-[#F5F5F5]'
                                    }`}
                            >
                                <Filter className="h-3.5 w-3.5" />
                                Filters
                                {activeAdvCount > 0 && (
                                    <span className="rounded bg-[#E53F01] px-1.5 font-mono text-[0.6875rem] font-semibold text-white">
                                        {activeAdvCount}
                                    </span>
                                )}
                            </button>
                            <div className="inline-flex items-center rounded-md border border-[#2A2A2A] bg-[#1A1A1A] p-1">
                                {FILTER_TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => handleTabChange(tab)}
                                        className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${activeFilter === tab
                                            ? 'bg-[#0D0D0D] text-[#F5F5F5] shadow-sm border border-[#3A3A3A]'
                                            : 'text-[#94A3B8] hover:text-[#F5F5F5]'
                                            }`}
                                    >
                                        {tab}
                                        <span className={`ml-1.5 font-mono ${activeFilter === tab ? 'text-[#E53F01]' : 'text-[#555555]'}`}>
                                            {tab === 'All' ? players.total : tab === 'Published' ? stats.published : stats.featured}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Advanced filters */}
                    {showAdv && (
                        <div className="mt-4 border-t border-[#2A2A2A] pt-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <FilterSelect
                                    label="Country"
                                    value={adv.country}
                                    onChange={(v) => setSelectFilter('country', v)}
                                    options={filterOptions.countries.map((c) => ({ value: c.code, label: c.name }))}
                                />
                                <FilterSelect
                                    label="Year of Birth"
                                    value={adv.birth_year}
                                    onChange={(v) => setSelectFilter('birth_year', v)}
                                    options={filterOptions.birthYears.map((y) => ({ value: String(y), label: String(y) }))}
                                />
                                <FilterSelect
                                    label="Birth City"
                                    value={adv.birth_city}
                                    onChange={(v) => setSelectFilter('birth_city', v)}
                                    options={filterOptions.birthCities.map((c) => ({ value: c, label: c }))}
                                />
                                <FilterSelect
                                    label="Position"
                                    value={adv.position}
                                    onChange={(v) => setSelectFilter('position', v)}
                                    options={filterOptions.positions.map((pos) => ({ value: pos, label: pos }))}
                                />
                                <FilterSelect
                                    label="Preferred Boot Brand"
                                    value={adv.boot_brand}
                                    onChange={(v) => setSelectFilter('boot_brand', v)}
                                    options={filterOptions.bootBrands.map((b) => ({ value: b, label: b }))}
                                />
                                <FilterSelect
                                    label="Boots Per Year"
                                    value={adv.boots_per_year}
                                    onChange={(v) => setSelectFilter('boots_per_year', v)}
                                    options={filterOptions.bootsPerYear.map((b) => ({ value: b, label: b }))}
                                />
                                <FilterSelect
                                    label="Usual Price Range"
                                    value={adv.price_range}
                                    onChange={(v) => setSelectFilter('price_range', v)}
                                    options={filterOptions.priceRanges.map((r) => ({ value: r, label: r }))}
                                />

                                <div className="space-y-1.5">
                                    <Label className="text-[0.6875rem] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                        Supported Club
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="Club of heart..."
                                        value={adv.supported_club}
                                        onChange={(e) => setTextFilter('supported_club', e.target.value)}
                                        className="h-9 border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#F5F5F5] placeholder:text-[#555555] focus-visible:border-[#E53F01] focus-visible:ring-2 focus-visible:ring-orange-800"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-[0.6875rem] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                        Dream Club
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="Dream club..."
                                        value={adv.dream_club}
                                        onChange={(e) => setTextFilter('dream_club', e.target.value)}
                                        className="h-9 border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#F5F5F5] placeholder:text-[#555555] focus-visible:border-[#E53F01] focus-visible:ring-2 focus-visible:ring-orange-800"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-xs text-[#94A3B8]">
                                    <span className="font-mono text-sm font-semibold text-[#E53F01]">{players.total}</span>{' '}
                                    player{players.total === 1 ? '' : 's'} match the current filters
                                </p>
                                {(activeAdvCount > 0 || !!search) && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={clearAllFilters}
                                        className="h-8 border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#F5F5F5] hover:bg-[#2A2A2A]"
                                    >
                                        <X className="mr-1.5 h-3.5 w-3.5" /> Clear all
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#0D0D0D]">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-[#2A2A2A] bg-[#1A1A1A] hover:bg-[#1A1A1A]">
                                    <TableHead className="w-[3.75rem]"></TableHead>
                                    <TableHead className="min-w-[15rem] text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Player</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Email</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Phone</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Position</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Country</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Club</TableHead>
                                    {/* <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Subscription</TableHead> */}
                                    <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Views</TableHead>
                                    <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Featured</TableHead>
                                    <TableHead className="w-[5rem] text-right text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {players.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={11} className="h-32 text-center text-sm text-[#94A3B8]">No players found.</TableCell>
                                    </TableRow>
                                ) : (
                                    players.data.map((player) => {
                                        const isSuspended = player.status === 'Suspended';
                                        return (
                                            <TableRow key={player.id} className="border-[#2A2A2A] hover:bg-[#1A1A1A]">
                                                <TableCell className="py-4">
                                                    {player.avatar ? (
                                                        <div className="h-10 w-10 overflow-hidden rounded-full border border-[#2A2A2A]">
                                                            <img
                                                                src={player.avatar}
                                                                alt={player.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#2A1A0F] text-sm font-semibold text-orange-500">
                                                            {(player.name || '')
                                                                .split(' ')
                                                                .filter(Boolean)
                                                                .slice(0, 2)
                                                                .map(word => word.charAt(0).toUpperCase())
                                                                .join('')}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="min-w-[15rem] py-4">
                                                    <div className="flex flex-col">
                                                        <Link href={`/player/profile/${player.slug}`} className="font-display text-sm font-semibold whitespace-nowrap text-[#F5F5F5] hover:text-[#E53F01]">{player.name}</Link>
                                                        {isSuspended && (
                                                            <div className="mt-1">
                                                                <StatusBadge status={player.status} />
                                                            </div>
                                                        )}
                                                        {/* <div className="mt-0.5 flex items-center gap-2 text-xs text-[#94A3B8]">
                                                            {player.age && <span className="font-mono">Age {player.age}</span>}
                                                            <span className="text-[#2A2A2A]">•</span>
                                                            <StatusBadge status={player.status} />
                                                        </div> */}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    {player.email ? (
                                                        <div className="flex flex-col">
                                                            <a href={`mailto:${player.email}`} className="whitespace-nowrap text-sm text-[#94A3B8] hover:text-[#E53F01]">{player.email}</a>
                                                            <VerifyBadge verified={player.emailVerified} label="Verified" />
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-[#555555]">—</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    {player.phone ? (
                                                        <div className="flex flex-col">
                                                            <a href={`tel:${player.phone}`} className="whitespace-nowrap font-mono text-sm text-[#94A3B8] hover:text-[#E53F01]">{player.phone}</a>
                                                            <VerifyBadge
                                                                verified={player.phoneVerified}
                                                                label={player.phoneVerifiedVia === 'sms' ? 'Phone verified' : 'WhatsApp verified'}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-[#555555]">—</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <span className="inline-flex items-center rounded-md border border-[#E53F01] bg-[rgba(255,107,0,0.12)] px-2 py-1 font-mono text-xs font-semibold text-[#E53F01]">{player.positionShort}</span>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <div className="flex items-center gap-2 text-sm text-[#F5F5F5]">
                                                        <span>{player.country}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4 text-sm text-[#94A3B8]">{player.club}</TableCell>
                                                {/* <TableCell className="py-4"><SubscriptionBadge sub={player.subscription} /></TableCell> */}
                                                <TableCell className="py-4 text-right font-mono text-sm font-semibold text-[#E53F01]">{formatViews(player.views)}</TableCell>
                                                <TableCell className="py-4 text-center">
                                                    <Switch
                                                        checked={player.featured}
                                                        onCheckedChange={() => handleToggleFeatured(player.id)}
                                                        className="data-[state=checked]:bg-[#E53F01] data-[state=unchecked]:bg-[#2A2A2A]"
                                                    />
                                                </TableCell>
                                                <TableCell className="py-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#94A3B8] hover:bg-[#1A1A1A] hover:text-[#F5F5F5]">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-52 border-[#2A2A2A] bg-[#0D0D0D]">
                                                            <DropdownMenuItem asChild className="text-sm text-[#F5F5F5] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A]">
                                                                <Link href={route('players.show', player.id)}>
                                                                    <FileUser className="mr-2 h-4 w-4" /> View Details
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => window.open(`/player/profile/${player.slug}`, '_blank')} className="text-sm text-[#F5F5F5] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A]">
                                                                <Eye className="mr-2 h-4 w-4" /> View Football Identity
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                                                            {isSuspended ? (
                                                                <DropdownMenuItem
                                                                    disabled={suspendingId === player.id}
                                                                    onClick={() => handleSuspend(player)}
                                                                    className="text-sm text-green-400 hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-green-400"
                                                                >
                                                                    <CheckCircle2 className="mr-2 h-4 w-4" /> {suspendingId === player.id ? 'Activating...' : 'Activate'}
                                                                </DropdownMenuItem>
                                                            ) : (
                                                                <DropdownMenuItem
                                                                    disabled={suspendingId === player.id}
                                                                    onClick={() => handleSuspend(player)}
                                                                    className="text-sm text-amber-400 hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-amber-400"
                                                                >
                                                                    <Ban className="mr-2 h-4 w-4" /> {suspendingId === player.id ? 'Suspending...' : 'Suspend'}
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuItem onClick={() => handleDelete(player)} className="text-sm text-red-400 hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-red-400">
                                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col gap-3 border-t border-[#2A2A2A] bg-[#0D0D0D] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs text-[#94A3B8]">
                            Showing <span className="font-mono font-semibold text-[#F5F5F5]">{players.data.length}</span> of <span className="font-mono font-semibold text-[#F5F5F5]">{players.total}</span> players
                        </div>
                        <div className="flex items-center gap-2">
                            {players.current_page > 1 && (
                                <Button variant="outline" size="sm" onClick={() => router.get(route('players.index'), queryPayload(search, activeFilter, adv, { page: players.current_page - 1 }))} className="h-8 border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#F5F5F5] hover:bg-[#2A2A2A]">
                                    Previous
                                </Button>
                            )}
                            {players.current_page < players.last_page && (
                                <Button variant="outline" size="sm" onClick={() => router.get(route('players.index'), queryPayload(search, activeFilter, adv, { page: players.current_page + 1 }))} className="h-8 border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#F5F5F5] hover:bg-[#2A2A2A]">
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && !deleting && setDeleteTarget(null)}>
                <DialogContent className="border border-[#2A2A2A] bg-[#0D0D0D] p-6 text-[#F5F5F5] sm:max-w-md">
                    <DialogHeader>
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/30">
                            <AlertTriangle className="h-6 w-6 text-red-400" />
                        </div>
                        <DialogTitle className="text-lg font-bold text-[#F5F5F5]">Delete player?</DialogTitle>
                        <DialogDescription className="text-sm text-[#94A3B8]">
                            Are you sure you want to delete <span className="font-semibold text-[#F5F5F5]">{deleteTarget?.name}</span>? This football identity will be permanently removed and cannot be recovered.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2 sm:gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={deleting}
                            onClick={() => setDeleteTarget(null)}
                            className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] hover:bg-[#2A2A2A] hover:text-[#F5F5F5]"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            disabled={deleting}
                            onClick={confirmDelete}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {deleting ? 'Deleting...' : 'Yes, Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Sheet (dark themed) */}
            <Sheet open={!!editPlayer} onOpenChange={(open) => !open && setEditPlayer(null)}>
                <SheetContent side="right" className="flex w-full flex-col gap-0 border-l border-[#2A2A2A] bg-[#0D0D0D] p-0 sm:max-w-[37.5rem]">
                    {editPlayer && <EditPlayerForm player={editPlayer} onClose={() => setEditPlayer(null)} />}
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}

// ── Edit Player Form (dark theme) ──
function EditPlayerForm({ player, onClose }: { player: Player; onClose: () => void }) {
    const { data, setData, put, processing } = useForm({
        name: player.name,
        age: player.age ?? '',
        position: player.positionShort,
        country: player.country,
        club: player.club,
        height: player.height ?? '',
        weight: player.weight ?? '',
        foot: player.foot ?? 'Right',
        marketValue: player.marketValue ?? '',
        subscription: player.subscription,
        status: player.status,
        bio: player.bio ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('players.update', player.id), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
            <SheetHeader className="shrink-0 border-b border-[#2A2A2A] bg-[#0D0D0D] px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-full border border-[#2A2A2A]">
                            <img src={player.avatar} alt={player.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <SheetTitle className="font-display text-xl font-bold uppercase tracking-tight text-[#F5F5F5]">Edit Player</SheetTitle>
                            <SheetDescription className="text-xs text-[#94A3B8]">Football Identity ID {player.playerId}</SheetDescription>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="shrink-0 rounded-md p-1 text-[#94A3B8] hover:bg-[#1A1A1A]"><X className="h-4 w-4" /></button>
                </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-6">
                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 border border-[#2A2A2A] bg-[#1A1A1A]">
                        <TabsTrigger value="basic" className="text-xs data-[state=active]:bg-[#0D0D0D] data-[state=active]:text-[#E53F01] text-[#94A3B8]">Basic Info</TabsTrigger>
                        <TabsTrigger value="physical" className="text-xs data-[state=active]:bg-[#0D0D0D] data-[state=active]:text-[#E53F01] text-[#94A3B8]">Physical</TabsTrigger>
                        <TabsTrigger value="status" className="text-xs data-[state=active]:bg-[#0D0D0D] data-[state=active]:text-[#E53F01] text-[#94A3B8]">Status</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="mt-6 space-y-5">
                        <div className="space-y-2"><Label className="text-[#F5F5F5]">Full Name</Label><Input value={data.name} onChange={(e) => setData('name', e.target.value)} className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] placeholder:text-[#555555]" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label className="text-[#F5F5F5]">Age</Label><Input type="number" value={data.age} onChange={(e) => setData('age', Number(e.target.value))} className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] placeholder:text-[#555555]" /></div>
                            <div className="space-y-2">
                                <Label className="text-[#F5F5F5]">Position</Label>
                                <Select value={data.position} onValueChange={(v) => setData('position', v)}>
                                    <SelectTrigger className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5]"><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-[#0D0D0D] border-[#2A2A2A]">
                                        {['GK', 'CB', 'LB', 'RB', 'CM', 'CDM', 'CAM', 'LW', 'RW', 'ST'].map(p => <SelectItem key={p} value={p} className="text-[#F5F5F5] hover:bg-[#1A1A1A]">{p}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2"><Label className="text-[#F5F5F5]">Country</Label><Input value={data.country} onChange={(e) => setData('country', e.target.value)} className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] placeholder:text-[#555555]" /></div>
                        <div className="space-y-2"><Label className="text-[#F5F5F5]">Current Club</Label><Input value={data.club} onChange={(e) => setData('club', e.target.value)} className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] placeholder:text-[#555555]" /></div>
                        <div className="space-y-2"><Label className="text-[#F5F5F5]">Player Bio</Label><Textarea value={data.bio} onChange={(e) => setData('bio', e.target.value)} rows={4} className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] placeholder:text-[#555555]" /></div>
                    </TabsContent>

                    <TabsContent value="physical" className="mt-6 space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label className="text-[#F5F5F5]">Height</Label><Input value={data.height} onChange={(e) => setData('height', e.target.value)} placeholder="1.82m" className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] placeholder:text-[#555555]" /></div>
                            <div className="space-y-2"><Label className="text-[#F5F5F5]">Weight</Label><Input value={data.weight} onChange={(e) => setData('weight', e.target.value)} placeholder="74kg" className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] placeholder:text-[#555555]" /></div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[#F5F5F5]">Preferred Foot</Label>
                            <Select value={data.foot} onValueChange={(v) => setData('foot', v as 'Left' | 'Right' | 'Both')}>
                                <SelectTrigger className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5]"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-[#0D0D0D] border-[#2A2A2A]">
                                    <SelectItem value="Right" className="text-[#F5F5F5] hover:bg-[#1A1A1A]">Right</SelectItem>
                                    <SelectItem value="Left" className="text-[#F5F5F5] hover:bg-[#1A1A1A]">Left</SelectItem>
                                    <SelectItem value="Both" className="text-[#F5F5F5] hover:bg-[#1A1A1A]">Both</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2"><Label className="text-[#F5F5F5]">Market Value</Label><Input value={data.marketValue} onChange={(e) => setData('marketValue', e.target.value)} placeholder="€2.5M" className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] placeholder:text-[#555555]" /></div>
                    </TabsContent>

                    <TabsContent value="status" className="mt-6 space-y-5">
                        <div className="space-y-2">
                            <Label className="text-[#F5F5F5]">Subscription Tier</Label>
                            <Select value={data.subscription} onValueChange={(v) => setData('subscription', v as Player['subscription'])}>
                                <SelectTrigger className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5]"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-[#0D0D0D] border-[#2A2A2A]">
                                    <SelectItem value="Free" className="text-[#F5F5F5] hover:bg-[#1A1A1A]">Free</SelectItem>
                                    <SelectItem value="Pro" className="text-[#F5F5F5] hover:bg-[#1A1A1A]">Pro</SelectItem>
                                    <SelectItem value="Elite" className="text-[#F5F5F5] hover:bg-[#1A1A1A]">Elite</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[#F5F5F5]">Publish Status</Label>
                            <Select value={data.status} onValueChange={(v) => setData('status', v as Player['status'])}>
                                <SelectTrigger className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5]"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-[#0D0D0D] border-[#2A2A2A]">
                                    <SelectItem value="Published" className="text-[#F5F5F5] hover:bg-[#1A1A1A]">Published</SelectItem>
                                    <SelectItem value="Draft" className="text-[#F5F5F5] hover:bg-[#1A1A1A]">Draft</SelectItem>
                                    <SelectItem value="Suspended" className="text-[#F5F5F5] hover:bg-[#1A1A1A]">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="shrink-0 border-t border-[#2A2A2A] bg-[#0D0D0D] px-6 py-4">
                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose} className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] hover:bg-[#2A2A2A]">Cancel</Button>
                    <Button type="submit" disabled={processing} className="bg-[#E53F01] text-white hover:bg-[#E53F01]">
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
