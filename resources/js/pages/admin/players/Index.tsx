import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Components/Admin/AdminLayout';
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Eye,
    Pencil,
    Ban,
    Trash2,
    X,
    Star,
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/components/ui/tabs';

// TODO: Replace with usePage().props
interface Player {
    id: number;
    name: string;
    age: number;
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

const MOCK_PLAYERS: Player[] = [
    {
        id: 1,
        name: 'Lucas Almeida',
        age: 19,
        position: 'Central Midfielder',
        positionShort: 'CM',
        country: 'Brazil',
        countryFlag: '🇧🇷',
        club: 'Santos FC',
        subscription: 'Elite',
        views: 24893,
        featured: true,
        status: 'Published',
        avatar:
            'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&crop=face',
        height: '1.82m',
        weight: '74kg',
        foot: 'Right',
        marketValue: '€2.5M',
        bio: 'Technical midfielder with vision and progressive passing range.',
    },
    {
        id: 2,
        name: 'Mateus Ribeiro',
        age: 21,
        position: 'Right Winger',
        positionShort: 'RW',
        country: 'Brazil',
        countryFlag: '🇧🇷',
        club: 'Flamengo',
        subscription: 'Pro',
        views: 18472,
        featured: true,
        status: 'Published',
        avatar:
            'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&crop=face',
        height: '1.76m',
        weight: '70kg',
        foot: 'Left',
        marketValue: '€1.8M',
        bio: 'Explosive winger known for 1v1 dribbling and end-product.',
    },
    {
        id: 3,
        name: 'Diego Fernández',
        age: 18,
        position: 'Centre-Back',
        positionShort: 'CB',
        country: 'Argentina',
        countryFlag: '🇦🇷',
        club: 'River Plate',
        subscription: 'Pro',
        views: 12056,
        featured: false,
        status: 'Published',
        avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        height: '1.89m',
        weight: '81kg',
        foot: 'Right',
        marketValue: '€1.2M',
        bio: 'Composed ball-playing defender with strong aerial presence.',
    },
    {
        id: 4,
        name: 'Kwame Asante',
        age: 20,
        position: 'Striker',
        positionShort: 'ST',
        country: 'Ghana',
        countryFlag: '🇬🇭',
        club: 'Asante Kotoko',
        subscription: 'Elite',
        views: 31204,
        featured: true,
        status: 'Published',
        avatar:
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face',
        height: '1.85m',
        weight: '78kg',
        foot: 'Right',
        marketValue: '€3.1M',
        bio: 'Clinical finisher with strong off-ball movement and physicality.',
    },
    {
        id: 5,
        name: 'Hiroshi Tanaka',
        age: 22,
        position: 'Goalkeeper',
        positionShort: 'GK',
        country: 'Japan',
        countryFlag: '🇯🇵',
        club: 'Kawasaki Frontale',
        subscription: 'Free',
        views: 4218,
        featured: false,
        status: 'Draft',
        avatar:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face',
        height: '1.91m',
        weight: '85kg',
        foot: 'Right',
        marketValue: '€800K',
        bio: 'Modern sweeper-keeper with excellent distribution.',
    },
    {
        id: 6,
        name: 'Pedro Velázquez',
        age: 19,
        position: 'Left-Back',
        positionShort: 'LB',
        country: 'Mexico',
        countryFlag: '🇲🇽',
        club: 'Club América',
        subscription: 'Pro',
        views: 9847,
        featured: false,
        status: 'Published',
        avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
        height: '1.78m',
        weight: '72kg',
        foot: 'Left',
        marketValue: '€1.5M',
        bio: 'Attack-minded full-back with overlapping runs and crossing.',
    },
];

const FILTER_TABS = ['All', 'Published', 'Featured'] as const;
type FilterTab = (typeof FILTER_TABS)[number];

function SubscriptionBadge({ sub }: { sub: Player['subscription'] }) {
    const styles = {
        Free: 'bg-slate-100 text-slate-700 border-slate-200',
        Pro: 'bg-slate-900 text-white border-slate-900',
        Elite: 'bg-[#FFF3EB] text-[#CC5500] border-[#FF6B00]',
    } as const;
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider ${styles[sub]}`}
        >
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
        <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${styles[status]}`}
        >
      {status}
    </span>
    );
}

export default function PlayersIndex() {
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
    const [players, setPlayers] = useState<Player[]>(MOCK_PLAYERS);
    const [editPlayer, setEditPlayer] = useState<Player | null>(null);

    const filteredPlayers = players.filter((p) => {
        const matchesSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.club.toLowerCase().includes(search.toLowerCase()) ||
            p.country.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
            activeFilter === 'All'
                ? true
                : activeFilter === 'Published'
                    ? p.status === 'Published'
                    : p.featured;
        return matchesSearch && matchesFilter;
    });

    const handleToggleFeatured = (id: number, value: boolean) => {
        setPlayers((prev) =>
            prev.map((p) => (p.id === id ? { ...p, featured: value } : p)),
        );
        // TODO: router.put(route('admin.players.toggle-featured', id), { featured: value })
    };

    const handleSuspend = (id: number) => {
        setPlayers((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: 'Suspended' } : p)),
        );
        // TODO: router.put(route('admin.players.suspend', id))
    };

    const handleDelete = (id: number) => {
        setPlayers((prev) => prev.filter((p) => p.id !== id));
        // TODO: router.delete(route('admin.players.destroy', id))
    };

    const handleExport = () => {
        // TODO: router.get(route('admin.players.export'))
    };

    const formatViews = (n: number) =>
        n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

    return (
        <AdminLayout pageTitle="Player Profiles">
            <div className="space-y-6">
                {/* Page header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-[#0F172A] sm:text-3xl">
                            Player Profiles
                        </h1>
                        <p className="mt-1 text-sm text-[#475569]">
                            Manage published profiles, featured talent, and subscription tiers.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={handleExport}
                            className="border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                        <Link
                            href="/admin/players/create"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-[#FF6B00] px-4 text-sm font-medium text-white transition-colors hover:bg-[#CC5500]"
                        >
                            + New Player
                        </Link>
                    </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                        { label: 'Total Players', value: players.length.toString(), accent: false },
                        {
                            label: 'Published',
                            value: players.filter((p) => p.status === 'Published').length.toString(),
                            accent: false,
                        },
                        {
                            label: 'Featured',
                            value: players.filter((p) => p.featured).length.toString(),
                            accent: true,
                        },
                        {
                            label: 'Total Views',
                            value: formatViews(players.reduce((sum, p) => sum + p.views, 0)),
                            accent: false,
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-lg border border-[#E2E8F0] bg-white p-6"
                        >
                            <div className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                {stat.label}
                            </div>
                            <div
                                className={`mt-2 font-mono text-2xl font-semibold ${
                                    stat.accent ? 'text-[#FF6B00]' : 'text-[#0F172A]'
                                }`}
                            >
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full lg:max-w-md">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                            <Input
                                type="text"
                                placeholder="Search by name, club, or country..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-10 border-[#E2E8F0] bg-white pl-9 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-1">
                                {FILTER_TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setActiveFilter(tab)}
                                        className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                                            activeFilter === tab
                                                ? 'bg-white text-[#0F172A] shadow-sm'
                                                : 'text-[#475569] hover:text-[#0F172A]'
                                        }`}
                                    >
                                        {tab}
                                        <span
                                            className={`ml-1.5 font-mono ${
                                                activeFilter === tab ? 'text-[#FF6B00]' : 'text-[#94A3B8]'
                                            }`}
                                        >
                      {tab === 'All'
                          ? players.length
                          : tab === 'Published'
                              ? players.filter((p) => p.status === 'Published').length
                              : players.filter((p) => p.featured).length}
                    </span>
                                    </button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                className="hidden h-10 border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] sm:inline-flex"
                            >
                                <Filter className="mr-2 h-4 w-4" />
                                More Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table card */}
                <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-white">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F8FAFC]">
                                    <TableHead className="w-[60px] text-xs font-semibold uppercase tracking-wider text-[#475569]"></TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                        Player
                                    </TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                        Position
                                    </TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                        Country
                                    </TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                        Club
                                    </TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                        Subscription
                                    </TableHead>
                                    <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                        Views
                                    </TableHead>
                                    <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                        Featured
                                    </TableHead>
                                    <TableHead className="w-[80px] text-right text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPlayers.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={9}
                                            className="h-32 text-center text-sm text-[#475569]"
                                        >
                                            No players match your filters.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredPlayers.map((player) => (
                                        <TableRow
                                            key={player.id}
                                            className="border-[#E2E8F0] transition-colors hover:bg-[#F8FAFC]"
                                        >
                                            <TableCell className="py-4">
                                                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#E2E8F0] bg-[#F8FAFC]">
                                                    <img
                                                        src={player.avatar}
                                                        alt={player.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </TableCell>

                                            <TableCell className="py-4">
                                                <div className="flex flex-col">
                                                    <Link
                                                        href={`/players/${player.id}`}
                                                        className="font-display text-sm font-semibold text-[#0F172A] hover:text-[#FF6B00]"
                                                    >
                                                        {player.name}
                                                    </Link>
                                                    <div className="mt-0.5 flex items-center gap-2 text-xs text-[#475569]">
                                                        <span className="font-mono">Age {player.age}</span>
                                                        <span className="text-[#CBD5E1]">•</span>
                                                        <StatusBadge status={player.status} />
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="py-4">
                        <span className="inline-flex items-center rounded-md border border-[#FF6B00] bg-[#FFF3EB] px-2 py-1 font-mono text-xs font-semibold text-[#CC5500]">
                          {player.positionShort}
                        </span>
                                            </TableCell>

                                            <TableCell className="py-4">
                                                <div className="flex items-center gap-2 text-sm text-[#0F172A]">
                          <span className="text-base leading-none">
                            {player.countryFlag}
                          </span>
                                                    <span>{player.country}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="py-4 text-sm text-[#475569]">
                                                {player.club}
                                            </TableCell>

                                            <TableCell className="py-4">
                                                <SubscriptionBadge sub={player.subscription} />
                                            </TableCell>

                                            <TableCell className="py-4 text-right font-mono text-sm font-semibold text-[#FF6B00]">
                                                {formatViews(player.views)}
                                            </TableCell>

                                            <TableCell className="py-4 text-center">
                                                <div className="flex justify-center">
                                                    <Switch
                                                        checked={player.featured}
                                                        onCheckedChange={(value) =>
                                                            handleToggleFeatured(player.id, value)
                                                        }
                                                        className="data-[state=checked]:bg-[#FF6B00]"
                                                    />
                                                </div>
                                            </TableCell>

                                            <TableCell className="py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-44 border-[#E2E8F0] bg-white"
                                                    >
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                window.open(`/players/${player.id}`, '_blank')
                                                            }
                                                            className="text-sm text-[#0F172A]"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => setEditPlayer(player)}
                                                            className="text-sm text-[#0F172A]"
                                                        >
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-[#E2E8F0]" />
                                                        <DropdownMenuItem
                                                            onClick={() => handleSuspend(player.id)}
                                                            className="text-sm text-amber-700 focus:bg-amber-50 focus:text-amber-700"
                                                        >
                                                            <Ban className="mr-2 h-4 w-4" />
                                                            Suspend
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(player.id)}
                                                            className="text-sm text-red-600 focus:bg-red-50 focus:text-red-700"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
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

                    <div className="flex flex-col gap-3 border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs text-[#475569]">
                            Showing{' '}
                            <span className="font-mono font-semibold text-[#0F172A]">
                {filteredPlayers.length}
              </span>{' '}
                            of{' '}
                            <span className="font-mono font-semibold text-[#0F172A]">
                {players.length}
              </span>{' '}
                            players
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled
                                className="h-8 border-[#E2E8F0] bg-white text-xs text-[#475569]"
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-[#E2E8F0] bg-white text-xs text-[#0F172A]"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* EDIT SHEET */}
            <Sheet
                open={!!editPlayer}
                onOpenChange={(open) => !open && setEditPlayer(null)}
            >
                <SheetContent
                    side="right"
                    className="flex w-full flex-col gap-0 border-l border-[#E2E8F0] bg-white p-0 sm:max-w-[600px]"
                >
                    {editPlayer && (
                        <EditPlayerForm
                            player={editPlayer}
                            onClose={() => setEditPlayer(null)}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </AdminLayout>
    );
}

/* ------------------------------------------------------------------ */
/* EDIT PLAYER FORM                                                    */
/* ------------------------------------------------------------------ */

function EditPlayerForm({
                            player,
                            onClose,
                        }: {
    player: Player;
    onClose: () => void;
}) {
    const { data, setData, processing } = useForm({
        name: player.name,
        age: player.age,
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
        // TODO: router.put(route('admin.players.update', player.id), data)
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
            {/* Header */}
            <SheetHeader className="shrink-0 border-b border-[#E2E8F0] bg-white px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#E2E8F0]">
                            <img
                                src={player.avatar}
                                alt={player.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <SheetTitle className="font-display text-xl font-bold uppercase tracking-tight text-[#0F172A]">
                                Edit Player
                            </SheetTitle>
                            <SheetDescription className="text-xs text-[#475569]">
                                Profile ID #{player.id.toString().padStart(5, '0')} • Last updated 2 days ago
                            </SheetDescription>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="shrink-0 rounded-md p-1 text-[#475569] transition-colors hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </SheetHeader>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 border border-[#E2E8F0] bg-[#F8FAFC]">
                        <TabsTrigger
                            value="basic"
                            className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#FF6B00]"
                        >
                            Basic Info
                        </TabsTrigger>
                        <TabsTrigger
                            value="physical"
                            className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#FF6B00]"
                        >
                            Physical
                        </TabsTrigger>
                        <TabsTrigger
                            value="status"
                            className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#FF6B00]"
                        >
                            Status
                        </TabsTrigger>
                    </TabsList>

                    {/* BASIC */}
                    <TabsContent value="basic" className="mt-6 space-y-5">
                        <div className="space-y-2">
                            <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                Full Name
                            </Label>
                            <Input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="border-[#E2E8F0] bg-white text-[#0F172A] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                    Age
                                </Label>
                                <Input
                                    type="number"
                                    value={data.age}
                                    onChange={(e) => setData('age', Number(e.target.value))}
                                    className="border-[#E2E8F0] bg-white font-mono text-[#0F172A] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                    Position
                                </Label>
                                <Select
                                    value={data.position}
                                    onValueChange={(v) => setData('position', v)}
                                >
                                    <SelectTrigger className="border-[#E2E8F0] bg-white text-[#0F172A]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {['GK', 'CB', 'LB', 'RB', 'CM', 'CDM', 'CAM', 'LW', 'RW', 'ST'].map(
                                            (pos) => (
                                                <SelectItem key={pos} value={pos}>
                                                    {pos}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                Country
                            </Label>
                            <Input
                                value={data.country}
                                onChange={(e) => setData('country', e.target.value)}
                                className="border-[#E2E8F0] bg-white text-[#0F172A] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                Current Club
                            </Label>
                            <Input
                                value={data.club}
                                onChange={(e) => setData('club', e.target.value)}
                                className="border-[#E2E8F0] bg-white text-[#0F172A] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                Player Bio
                            </Label>
                            <Textarea
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                rows={4}
                                className="resize-none border-[#E2E8F0] bg-white text-sm text-[#0F172A] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                            />
                        </div>
                    </TabsContent>

                    {/* PHYSICAL */}
                    <TabsContent value="physical" className="mt-6 space-y-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                    Height
                                </Label>
                                <Input
                                    value={data.height}
                                    onChange={(e) => setData('height', e.target.value)}
                                    placeholder="1.82m"
                                    className="border-[#E2E8F0] bg-white font-mono text-[#0F172A] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                    Weight
                                </Label>
                                <Input
                                    value={data.weight}
                                    onChange={(e) => setData('weight', e.target.value)}
                                    placeholder="74kg"
                                    className="border-[#E2E8F0] bg-white font-mono text-[#0F172A] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                Preferred Foot
                            </Label>
                            <Select
                                value={data.foot}
                                onValueChange={(v) =>
                                    setData('foot', v as 'Left' | 'Right' | 'Both')
                                }
                            >
                                <SelectTrigger className="border-[#E2E8F0] bg-white text-[#0F172A]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Right">Right</SelectItem>
                                    <SelectItem value="Left">Left</SelectItem>
                                    <SelectItem value="Both">Both</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                Market Value
                            </Label>
                            <Input
                                value={data.marketValue}
                                onChange={(e) => setData('marketValue', e.target.value)}
                                placeholder="€2.5M"
                                className="border-[#E2E8F0] bg-white font-mono text-[#0F172A] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                            />
                        </div>
                    </TabsContent>

                    {/* STATUS */}
                    <TabsContent value="status" className="mt-6 space-y-5">
                        <div className="space-y-2">
                            <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                Subscription Tier
                            </Label>
                            <Select
                                value={data.subscription}
                                onValueChange={(v) =>
                                    setData('subscription', v as Player['subscription'])
                                }
                            >
                                <SelectTrigger className="border-[#E2E8F0] bg-white text-[#0F172A]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Free">Free</SelectItem>
                                    <SelectItem value="Pro">Pro</SelectItem>
                                    <SelectItem value="Elite">Elite</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                Publish Status
                            </Label>
                            <Select
                                value={data.status}
                                onValueChange={(v) => setData('status', v as Player['status'])}
                            >
                                <SelectTrigger className="border-[#E2E8F0] bg-white text-[#0F172A]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Published">Published</SelectItem>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                            <div className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                Profile Statistics
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <div>
                                    <div className="text-[11px] text-[#475569]">Total Views</div>
                                    <div className="font-mono text-lg font-semibold text-[#FF6B00]">
                                        {player.views.toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[11px] text-[#475569]">Profile ID</div>
                                    <div className="font-mono text-lg font-semibold text-[#0F172A]">
                                        #{player.id.toString().padStart(5, '0')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-[#E2E8F0] bg-white px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-[#FF6B00] text-white hover:bg-[#CC5500]"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
