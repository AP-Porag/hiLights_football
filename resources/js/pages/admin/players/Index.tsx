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
        Free: 'bg-slate-100 text-slate-700 border-slate-200',
        Pro: 'bg-slate-900 text-white border-slate-900',
        Elite: 'bg-[#FFF3EB] text-[#CC5500] border-[#FF6B00]',
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
        Published: 'bg-green-50 text-green-700 border-green-200',
        Draft: 'bg-amber-50 text-amber-700 border-amber-200',
        Suspended: 'bg-red-50 text-red-700 border-red-200',
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
        // immediate search on Enter
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
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* <div>
                        <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">Player Profiles</h1>
                        <p className="mt-1 text-sm text-white">Manage published profiles, featured talent, and subscription tiers.</p>
                    </div> */}
                    {/* <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" className="border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]">
                            <Download className="mr-2 h-4 w-4" /> Export CSV
                        </Button>
                        <Link href="/admin/players/create" className="inline-flex h-10 items-center justify-center rounded-md bg-[#FF6B00] px-4 text-sm font-medium text-white transition-colors hover:bg-[#CC5500]">
                            + New Player
                        </Link>
                    </div> */}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Total Players', value: stats.total.toString() },

                        { label: 'Featured', value: stats.featured.toString(), accent: true },
                        { label: 'Total Views', value: formatViews(stats.totalViews) },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-[#E2E8F0] bg-white p-6">
                            <div className="text-xs font-medium uppercase tracking-wider text-[#475569]">{stat.label}</div>
                            <div className={`mt-2 font-mono text-2xl font-semibold ${stat.accent ? 'text-[#FF6B00]' : 'text-[#0F172A]'}`}>{stat.value}</div>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <form onSubmit={handleSearch} className="relative w-full lg:max-w-md">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                            <Input
                                type="text"
                                placeholder="Search by name, club, or country..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-10 border-[#E2E8F0] bg-white pl-9 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                            />
                        </form>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-1">
                                {FILTER_TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => handleTabChange(tab)}
                                        className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${activeFilter === tab ? 'bg-white text-[#0F172A] shadow-sm' : 'text-[#475569] hover:text-[#0F172A]'
                                            }`}
                                    >
                                        {tab}
                                        <span className={`ml-1.5 font-mono ${activeFilter === tab ? 'text-[#FF6B00]' : 'text-[#94A3B8]'}`}>
                                            {tab === 'All' ? players.total : tab === 'Published' ? stats.published : stats.featured}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            {/* <Button variant="outline" className="hidden h-10 border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] sm:inline-flex">
                                <Filter className="mr-2 h-4 w-4" /> More Filters
                            </Button> */}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-white">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F8FAFC]">
                                    <TableHead className="w-[60px]"></TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#475569]">Player</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#475569]">Position</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#475569]">Country</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#475569]">Club</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#475569]">Subscription</TableHead>
                                    <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-[#475569]">Views</TableHead>
                                    <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-[#475569]">Featured</TableHead>
                                    <TableHead className="w-[80px] text-right text-xs font-semibold uppercase tracking-wider text-[#475569]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {players.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="h-32 text-center text-sm text-[#475569]">No players found.</TableCell>
                                    </TableRow>
                                ) : (
                                    players.data.map((player) => (
                                        <TableRow key={player.id} className="border-[#E2E8F0] hover:bg-[#F8FAFC]">
                                            <TableCell className="py-4">
                                                <div className="h-10 w-10 overflow-hidden rounded-full border border-[#E2E8F0]">
                                                    <img src={player.avatar} alt={player.name} className="h-full w-full object-cover" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col">
                                                    <Link href={`/players/${player.id}`} className="font-display text-sm font-semibold text-[#0F172A] hover:text-[#FF6B00]">{player.name}</Link>
                                                    <div className="mt-0.5 flex items-center gap-2 text-xs text-[#475569]">
                                                        {player.age && <span className="font-mono">Age {player.age}</span>}
                                                        <span className="text-[#CBD5E1]">•</span>
                                                        <StatusBadge status={player.status} />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className="inline-flex items-center rounded-md border border-[#FF6B00] bg-[#FFF3EB] px-2 py-1 font-mono text-xs font-semibold text-[#CC5500]">{player.positionShort}</span>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex items-center gap-2 text-sm text-[#0F172A]">
                                                    {/* <span className="text-base">{player.countryFlag}</span> */}
                                                    <span>{player.country}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 text-sm text-[#475569]">{player.club}</TableCell>
                                            <TableCell className="py-4"><SubscriptionBadge sub={player.subscription} /></TableCell>
                                            <TableCell className="py-4 text-right font-mono text-sm font-semibold text-[#FF6B00]">{formatViews(player.views)}</TableCell>
                                            <TableCell className="py-4 text-center">
                                                <Switch
                                                    checked={player.featured}
                                                    onCheckedChange={() => handleToggleFeatured(player.id)}
                                                    className="data-[state=checked]:bg-[#FF6B00] data-[state=unchecked]:bg-[#FF6B00]/30"
                                                />
                                            </TableCell>
                                            <TableCell className="py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-44 border-[#E2E8F0] bg-white">
                                                        <DropdownMenuItem onClick={() => window.open(`/player/profile/${player.id}`, '_blank')} className="text-sm text-[#0F172A]">
                                                            <Eye className="mr-2 h-4 w-4" /> View Profile
                                                        </DropdownMenuItem>
                                                        {/* <DropdownMenuItem onClick={() => setEditPlayer(player)} className="text-sm text-[#0F172A]">
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem> */}
                                                        <DropdownMenuSeparator className="bg-[#E2E8F0]" />
                                                        <DropdownMenuItem onClick={() => handleSuspend(player.id)} className="text-sm text-amber-700 focus:bg-amber-50 focus:text-amber-700">
                                                            <Ban className="mr-2 h-4 w-4" /> Suspend
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(player.id)} className="text-sm text-red-600 focus:bg-red-50 focus:text-red-700">
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
                    <div className="flex flex-col gap-3 border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs text-[#475569]">
                            Showing <span className="font-mono font-semibold text-[#0F172A]">{players.data.length}</span> of <span className="font-mono font-semibold text-[#0F172A]">{players.total}</span> players
                        </div>
                        <div className="flex items-center gap-2">
                            {players.current_page > 1 && (
                                <Button variant="outline" size="sm" onClick={() => router.get(route('players.index', { page: players.current_page - 1, search, filter: activeFilter }))} className="h-8 border-[#E2E8F0] bg-white text-xs text-[#0F172A]">
                                    Previous
                                </Button>
                            )}
                            {players.current_page < players.last_page && (
                                <Button variant="outline" size="sm" onClick={() => router.get(route('players.index', { page: players.current_page + 1, search, filter: activeFilter }))} className="h-8 border-[#E2E8F0] bg-white text-xs text-[#0F172A]">
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Sheet */}
            <Sheet open={!!editPlayer} onOpenChange={(open) => !open && setEditPlayer(null)}>
                <SheetContent side="right" className="flex w-full flex-col gap-0 border-l border-[#E2E8F0] bg-white p-0 sm:max-w-[600px]">
                    {editPlayer && <EditPlayerForm player={editPlayer} onClose={() => setEditPlayer(null)} />}
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}

// ── Edit Player Form (unchanged) ──
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
            <SheetHeader className="shrink-0 border-b border-[#E2E8F0] bg-white px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-full border border-[#E2E8F0]">
                            <img src={player.avatar} alt={player.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <SheetTitle className="font-display text-xl font-bold uppercase tracking-tight text-[#0F172A]">Edit Player</SheetTitle>
                            <SheetDescription className="text-xs text-[#475569]">Profile ID #{player.id}</SheetDescription>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="shrink-0 rounded-md p-1 text-[#475569] hover:bg-[#F8FAFC]"><X className="h-4 w-4" /></button>
                </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-6">
                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 border border-[#E2E8F0] bg-[#F8FAFC]">
                        <TabsTrigger value="basic" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#FF6B00]">Basic Info</TabsTrigger>
                        <TabsTrigger value="physical" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#FF6B00]">Physical</TabsTrigger>
                        <TabsTrigger value="status" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#FF6B00]">Status</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="mt-6 space-y-5">
                        <div className="space-y-2"><Label>Full Name</Label><Input value={data.name} onChange={(e) => setData('name', e.target.value)} /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Age</Label><Input type="number" value={data.age} onChange={(e) => setData('age', Number(e.target.value))} /></div>
                            <div className="space-y-2">
                                <Label>Position</Label>
                                <Select value={data.position} onValueChange={(v) => setData('position', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {['GK', 'CB', 'LB', 'RB', 'CM', 'CDM', 'CAM', 'LW', 'RW', 'ST'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2"><Label>Country</Label><Input value={data.country} onChange={(e) => setData('country', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Current Club</Label><Input value={data.club} onChange={(e) => setData('club', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Player Bio</Label><Textarea value={data.bio} onChange={(e) => setData('bio', e.target.value)} rows={4} /></div>
                    </TabsContent>

                    <TabsContent value="physical" className="mt-6 space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Height</Label><Input value={data.height} onChange={(e) => setData('height', e.target.value)} placeholder="1.82m" /></div>
                            <div className="space-y-2"><Label>Weight</Label><Input value={data.weight} onChange={(e) => setData('weight', e.target.value)} placeholder="74kg" /></div>
                        </div>
                        <div className="space-y-2">
                            <Label>Preferred Foot</Label>
                            <Select value={data.foot} onValueChange={(v) => setData('foot', v as 'Left' | 'Right' | 'Both')}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Right">Right</SelectItem>
                                    <SelectItem value="Left">Left</SelectItem>
                                    <SelectItem value="Both">Both</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2"><Label>Market Value</Label><Input value={data.marketValue} onChange={(e) => setData('marketValue', e.target.value)} placeholder="€2.5M" /></div>
                    </TabsContent>

                    <TabsContent value="status" className="mt-6 space-y-5">
                        <div className="space-y-2">
                            <Label>Subscription Tier</Label>
                            <Select value={data.subscription} onValueChange={(v) => setData('subscription', v as Player['subscription'])}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Free">Free</SelectItem>
                                    <SelectItem value="Pro">Pro</SelectItem>
                                    <SelectItem value="Elite">Elite</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Publish Status</Label>
                            <Select value={data.status} onValueChange={(v) => setData('status', v as Player['status'])}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Published">Published</SelectItem>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="shrink-0 border-t border-[#E2E8F0] bg-white px-6 py-4">
                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={processing} className="bg-[#FF6B00] text-white hover:bg-[#CC5500]">
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
