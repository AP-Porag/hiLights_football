import React, { useState, useEffect, useRef } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Search, Filter, Download, MoreHorizontal, Eye, Pencil, Ban, Trash2, X, Star,
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
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
    name: string;
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
}

interface Stats {
    total: number;
    published: number;
    featured: number;
    totalViews: number;
}

const FILTER_TABS = ['All', 'Featured'] as const;
type FilterTab = (typeof FILTER_TABS)[number];

// ── Badges ──
function SubscriptionBadge({ sub }: { sub: Player['subscription'] }) {
    const styles = {
        Free: 'bg-[#1F1F1F] text-[#94A3B8] border-[#2A2A2A]',
        Pro: 'bg-[#2A2A2A] text-[#F5F5F5] border-[#3A3A3A]',
        Elite: 'bg-[rgba(255,107,0,0.12)] text-[#FF6B00] border-[#FF6B00]',
    } as const;
    return (
        <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider ${styles[sub]}`}>
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
        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${styles[status]}`}>
            {status}
        </span>
    );
}

// ── Main Component ──
export default function PlayersIndex() {
    const { players, filters = {}, stats } = usePage<{
        players: { data: Player[]; current_page: number; last_page: number; total: number };
        filters: Filters;
        stats: Stats;
    }>().props;

    const [search, setSearch] = useState(filters.search || '');
    const [activeFilter, setActiveFilter] = useState<FilterTab>((filters.filter as FilterTab) || 'All');
    const [editPlayer, setEditPlayer] = useState<Player | null>(null);

    const isInitialMount = useRef(true);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const formatViews = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

    const applyFilters = (searchVal: string, filterVal: string) => {
        router.get(route('players.index'), { search: searchVal, filter: filterVal }, { preserveState: true, replace: true });
    };

    // Live search with debounce (skips initial render)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            applyFilters(search, activeFilter);
        }, 300);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [search]);

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

    const handleSuspend = (id: number) => {
        router.put(route('players.suspend', id));
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this player permanently?')) {
            router.delete(route('players.destroy', id));
        }
    };
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Players',
            href: '/admin/dashboard',
        },
    ];
    return (
        <AppLayout pageTitle="Player Profiles" breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Total Players', value: stats.total.toString() },
                        { label: 'Featured', value: stats.featured.toString(), accent: true },
                        { label: 'Total Views', value: formatViews(stats.totalViews) },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-[#2A2A2A] bg-[#0D0D0D] p-6">
                            <div className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">{stat.label}</div>
                            <div className={`mt-2 font-mono text-2xl font-semibold ${stat.accent ? 'text-[#FF6B00]' : 'text-[#F5F5F5]'}`}>{stat.value}</div>
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
                                placeholder="Search by name, club, or country..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-10 border-[#2A2A2A] bg-[#1A1A1A] pl-9 text-sm text-[#F5F5F5] placeholder:text-[#555555] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-800"
                            />
                        </form>
                        <div className="flex flex-wrap items-center gap-3">
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
                                        <span className={`ml-1.5 font-mono ${activeFilter === tab ? 'text-[#FF6B00]' : 'text-[#555555]'}`}>
                                            {tab === 'All' ? players.total : tab === 'Published' ? stats.published : stats.featured}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#0D0D0D]">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-[#2A2A2A] bg-[#1A1A1A] hover:bg-[#1A1A1A]">
                                    <TableHead className="w-[60px]"></TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Player</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Position</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Country</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Club</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Subscription</TableHead>
                                    <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Views</TableHead>
                                    <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Featured</TableHead>
                                    <TableHead className="w-[80px] text-right text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {players.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="h-32 text-center text-sm text-[#94A3B8]">No players found.</TableCell>
                                    </TableRow>
                                ) : (
                                    players.data.map((player) => (
                                        <TableRow key={player.id} className="border-[#2A2A2A] hover:bg-[#1A1A1A]">
                                            <TableCell className="py-4">
                                                <div className="h-10 w-10 overflow-hidden rounded-full border border-[#2A2A2A]">
                                                    <img src={player.avatar} alt={player.name} className="h-full w-full object-cover" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col">
                                                    <Link href={`/players/${player.id}`} className="font-display text-sm font-semibold text-[#F5F5F5] hover:text-[#FF6B00]">{player.name}</Link>
                                                    {/* <div className="mt-0.5 flex items-center gap-2 text-xs text-[#94A3B8]">
                                                        {player.age && <span className="font-mono">Age {player.age}</span>}
                                                        <span className="text-[#2A2A2A]">•</span>
                                                        <StatusBadge status={player.status} />
                                                    </div> */}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className="inline-flex items-center rounded-md border border-[#FF6B00] bg-[rgba(255,107,0,0.12)] px-2 py-1 font-mono text-xs font-semibold text-[#CC5500]">{player.positionShort}</span>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex items-center gap-2 text-sm text-[#F5F5F5]">
                                                    <span>{player.country}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 text-sm text-[#94A3B8]">{player.club}</TableCell>
                                            <TableCell className="py-4"><SubscriptionBadge sub={player.subscription} /></TableCell>
                                            <TableCell className="py-4 text-right font-mono text-sm font-semibold text-[#FF6B00]">{formatViews(player.views)}</TableCell>
                                            <TableCell className="py-4 text-center">
                                                <Switch
                                                    checked={player.featured}
                                                    onCheckedChange={() => handleToggleFeatured(player.id)}
                                                    className="data-[state=checked]:bg-[#FF6B00] data-[state=unchecked]:bg-[#2A2A2A]"
                                                />
                                            </TableCell>
                                            <TableCell className="py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#94A3B8] hover:bg-[#1A1A1A] hover:text-[#F5F5F5]">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-44 border-[#2A2A2A] bg-[#0D0D0D]">
                                                        <DropdownMenuItem onClick={() => window.open(`/player/profile/${player.id}`, '_blank')} className="text-sm text-[#F5F5F5] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A]">
                                                            <Eye className="mr-2 h-4 w-4" /> View Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                                                        <DropdownMenuItem onClick={() => handleSuspend(player.id)} className="text-sm text-amber-400 hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-amber-400">
                                                            <Ban className="mr-2 h-4 w-4" /> Suspend
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(player.id)} className="text-sm text-red-400 hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-red-400">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
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
                                <Button variant="outline" size="sm" onClick={() => router.get(route('players.index', { page: players.current_page - 1, search, filter: activeFilter }))} className="h-8 border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#F5F5F5] hover:bg-[#2A2A2A]">
                                    Previous
                                </Button>
                            )}
                            {players.current_page < players.last_page && (
                                <Button variant="outline" size="sm" onClick={() => router.get(route('players.index', { page: players.current_page + 1, search, filter: activeFilter }))} className="h-8 border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#F5F5F5] hover:bg-[#2A2A2A]">
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Sheet (dark themed) */}
            <Sheet open={!!editPlayer} onOpenChange={(open) => !open && setEditPlayer(null)}>
                <SheetContent side="right" className="flex w-full flex-col gap-0 border-l border-[#2A2A2A] bg-[#0D0D0D] p-0 sm:max-w-[600px]">
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
                            <SheetDescription className="text-xs text-[#94A3B8]">Profile ID #{player.id}</SheetDescription>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="shrink-0 rounded-md p-1 text-[#94A3B8] hover:bg-[#1A1A1A]"><X className="h-4 w-4" /></button>
                </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-6">
                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 border border-[#2A2A2A] bg-[#1A1A1A]">
                        <TabsTrigger value="basic" className="text-xs data-[state=active]:bg-[#0D0D0D] data-[state=active]:text-[#FF6B00] text-[#94A3B8]">Basic Info</TabsTrigger>
                        <TabsTrigger value="physical" className="text-xs data-[state=active]:bg-[#0D0D0D] data-[state=active]:text-[#FF6B00] text-[#94A3B8]">Physical</TabsTrigger>
                        <TabsTrigger value="status" className="text-xs data-[state=active]:bg-[#0D0D0D] data-[state=active]:text-[#FF6B00] text-[#94A3B8]">Status</TabsTrigger>
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
                    <Button type="submit" disabled={processing} className="bg-[#FF6B00] text-white hover:bg-[#CC5500]">
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
