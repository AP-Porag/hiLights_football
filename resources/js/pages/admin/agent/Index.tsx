import { useEffect, useRef, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Star,
    Search,
    Eye,
    Trash2,
    TrendingUp,
    Users,
    Award,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Download,
    User,
} from 'lucide-react';

const PLACEHOLDER = '/images/img/placeholder.webp';

interface ScoutRef {
    id: number | null;
    name: string;
    avatar: string | null;
    organization: string | null;
    country: string | null;
    role?: string;
}
interface PlayerRef {
    id: number | null;
    name: string;
    avatar: string | null;
    position: string | null;
    club: string | null;
    age: number | null;
}
interface RatingRow {
    id: number;
    scout: ScoutRef;
    player: PlayerRef;
    technical: number;
    physical: number;
    mental: number;
    overall: number;
    notes: string | null;
    date: string | null;
    matchContext: string | null;
}
interface Paginator<T> {
    data: T[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
}
interface Summary {
    avgRating: number;
    totalRatings: number;
    totalPlayers: number;
    ratingsThisMonth: number;
    topAgent: { name: string; organization: string | null; count: number; avatar: string | null } | null;
}
interface RatedPlayer {
    id: number;
    name: string;
    position: string | null;
    club: string | null;
    ratings: number;
    avg: number;
    avatar: string | null;
}
interface ActiveAgent {
    id: number;
    name: string;
    organization: string | null;
    country: string | null;
    ratings: number;
    avgGiven: number;
    avatar: string | null;
}
interface AgentListItem {
    id: number;
    name: string;
    email: string;
    organization: string | null;
    country: string | null;
    total_ratings: number;
    avg_rating: number;
}
interface PageProps {
    ratings: Paginator<RatingRow>;
    summary: Summary;
    mostRatedPlayers: RatedPlayer[];
    mostActiveAgents: ActiveAgent[];
    allAgents: Paginator<AgentListItem>;
    agentSearch: string;
    filters: { search: string };
    [key: string]: any;
}

function StarsInline({ value, max = 5 }: { value: number; max?: number }) {
    const filled = Math.round(value);
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3 h-3 ${i < filled
                        ? 'fill-[#FF6B00] text-[#FF6B00]'
                        : 'fill-transparent text-[#CBD5E1] dark:text-[#2A2A2A]'
                        }`}
                />
            ))}
            <span className="ml-1.5 font-mono text-xs text-white">
                {value.toFixed(1)}
            </span>
        </div>
    );
}
function StarsLarge({ value, label, max = 5 }: { value: number; label: string; max?: number }) {
    const filled = Math.round(value);
    return (
        <div className="rounded-lg border border-[#E2E8F0] bg-[#1A1A1A] p-4">
            <div className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">{label}</div>
            <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: max }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < filled
                            ? 'fill-[#FF6B00] text-[#FF6B00]'
                            : 'fill-transparent text-[#CBD5E1]'
                            }`}
                    />
                ))}
            </div>
            <div className="mt-2 font-mono text-2xl font-semibold text-white">
                {value.toFixed(1)}
            </div>
        </div>
    );
}

export default function AgentIndex() {
    const page = usePage<PageProps>().props;
    const ratings = page.ratings ?? { data: [], current_page: 1, last_page: 1, from: 0, to: 0, total: 0 };
    const summary = page.summary ?? { avgRating: 0, totalRatings: 0, totalPlayers: 0, ratingsThisMonth: 0, topAgent: null };
    const mostRatedPlayers = page.mostRatedPlayers ?? [];
    const mostActiveAgents = page.mostActiveAgents ?? [];
    const allAgents = page.allAgents ?? { data: [], current_page: 1, last_page: 1, from: 0, to: 0, total: 0 };
    const agentSearchInitial = page.agentSearch ?? '';
    const filters = page.filters ?? { search: '' };

    const [search, setSearch] = useState(filters?.search ?? '');
    const [viewRating, setViewRating] = useState<RatingRow | null>(null);
    const [deleteRating, setDeleteRating] = useState<RatingRow | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [agentSearch, setAgentSearch] = useState(agentSearchInitial);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Agents',
            href: '/admin/dashboard',
        },
    ];

    const first = useRef(true);
    useEffect(() => {
        if (first.current) {
            first.current = false;
            return;
        }
        const t = setTimeout(() => {
            router.get(
                route('agents.index'),
                {
                    search: search || undefined,
                    agent_search: agentSearch || undefined,
                },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 350);
        return () => clearTimeout(t);
    }, [search, agentSearch]);

    const goToPage = (page: number) => {
        router.get(
            route('agents.index'),
            {
                page,
                search: search || undefined,
                agent_search: agentSearch || undefined,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const goToAgentPage = (page: number) => {
        router.get(
            route('agents.index'),
            {
                agent_page: page,
                search: search || undefined,
                agent_search: agentSearch || undefined,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleDelete = () => {
        if (!deleteRating) return;
        setDeleting(true);
        router.delete(route('agents.destroy', deleteRating.id), {
            preserveScroll: true,
            onFinish: () => {
                setDeleting(false);
                setDeleteRating(null);
            },
        });
    };

    const pageWindow: number[] = [];
    {
        const start = Math.max(1, ratings.current_page - 1);
        const end = Math.min(ratings.last_page, ratings.current_page + 1);
        for (let i = start; i <= end; i++) pageWindow.push(i);
    }

    const agentPageWindow: number[] = [];
    {
        const start = Math.max(1, allAgents.current_page - 1);
        const end = Math.min(allAgents.last_page, allAgents.current_page + 1);
        for (let i = start; i <= end; i++) agentPageWindow.push(i);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6 bg-black text-white min-h-screen p-6">
                {/* ──── AGENT LIST TABLE ──── */}
                <Card className="border-[#2A2A2A] bg-[#0F0F0F]">
                    <CardHeader className="border-b border-[#2A2A2A] p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <CardTitle className="font-display text-lg font-semibold uppercase tracking-wide text-white">
                                All Agents
                            </CardTitle>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                                <Input
                                    placeholder="Search agents..."
                                    value={agentSearch}
                                    onChange={(e) => setAgentSearch(e.target.value)}
                                    className="w-full border-[#2A2A2A] bg-[#1A1A1A] pl-9 text-sm text-white placeholder:text-[#94A3B8] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 sm:w-72"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-[#2A2A2A] hover:bg-transparent">
                                        <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Name</TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Email</TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Total Ratings</TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Avg Rating</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allAgents.data.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="px-6 py-10 text-center text-sm text-[#94A3B8]">
                                                No agents found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {allAgents.data.map((agent) => (
                                        <TableRow key={agent.id} className="border-[#2A2A2A] hover:bg-[#1A1A1A]">
                                            <TableCell className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                                                        <User className="h-5 w-5 text-[#94A3B8]" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-white">{agent.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 text-sm text-[#E2E8F0]">{agent.email}</TableCell>
                                            <TableCell className="py-4 text-sm text-[#E2E8F0]">{agent.total_ratings}</TableCell>
                                            <TableCell className="py-4 text-sm text-[#E2E8F0]">
                                                {agent.avg_rating > 0 ? (
                                                    <div className="flex items-center gap-2">
                                                        <span>{agent.avg_rating.toFixed(1)}</span>
                                                        <Star className="h-4 w-4 fill-[#FF6B00] text-[#FF6B00]" />
                                                    </div>
                                                ) : (
                                                    '—'
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        {/* Agent Pagination */}
                        <div className="flex flex-col items-start gap-3 border-t border-[#2A2A2A] p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-xs text-[#94A3B8]">
                                Showing{' '}
                                <span className="font-mono font-semibold text-white">
                                    {allAgents.from ?? 0}-{allAgents.to ?? 0}
                                </span>{' '}
                                of{' '}
                                <span className="font-mono font-semibold text-white">
                                    {allAgents.total.toLocaleString()}
                                </span>{' '}
                                agents
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={allAgents.current_page <= 1}
                                    onClick={() => goToAgentPage(allAgents.current_page - 1)}
                                    className="border-[#2A2A2A] bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] disabled:opacity-50"
                                >
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    {agentPageWindow.map((p) =>
                                        p === allAgents.current_page ? (
                                            <Button
                                                key={p}
                                                size="sm"
                                                className="h-8 w-8 bg-[#FF6B00] p-0 font-mono text-white hover:bg-[#CC5500]"
                                            >
                                                {p}
                                            </Button>
                                        ) : (
                                            <Button
                                                key={p}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => goToAgentPage(p)}
                                                className="h-8 w-8 border-[#2A2A2A] bg-[#1A1A1A] p-0 font-mono text-white hover:bg-[#2A2A2A]"
                                            >
                                                {p}
                                            </Button>
                                        )
                                    )}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={allAgents.current_page >= allAgents.last_page}
                                    onClick={() => goToAgentPage(allAgents.current_page + 1)}
                                    className="border-[#2A2A2A] bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] disabled:opacity-50"
                                >
                                    Next
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ──── SUMMARY WIDGETS ──── */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="border-[#2A2A2A] bg-[#0F0F0F]">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Average Rating</div>
                                    <div className="mt-3 font-mono text-4xl font-bold text-white">{summary.avgRating.toFixed(1)}</div>
                                    <div className="mt-2 flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < Math.round(summary.avgRating) ? 'fill-[#FF6B00] text-[#FF6B00]' : 'fill-transparent text-[#CBD5E1]'}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF3EB]">
                                    <Star className="h-5 w-5 fill-[#FF6B00] text-[#FF6B00]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-[#2A2A2A] bg-[#0F0F0F]">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Total Ratings</div>
                                    <div className="mt-3 font-mono text-4xl font-bold text-white">{summary.totalRatings.toLocaleString()}</div>
                                    <div className="mt-2 text-xs text-[#94A3B8]">Across <span className="font-mono text-white">{summary.totalPlayers}</span> players</div>
                                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-[#16A34A]">
                                        <TrendingUp className="h-3 w-3" />
                                        <span className="font-mono">+{summary.ratingsThisMonth}</span>
                                        <span className="text-[#94A3B8]">this month</span>
                                    </div>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF3EB]">
                                    <Users className="h-5 w-5 text-[#FF6B00]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-[#2A2A2A] bg-[#0F0F0F]">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Top Agent</div>
                                    {summary.topAgent ? (
                                        <>
                                            <div className="mt-3 flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                                                    <User className="h-5 w-5 text-[#94A3B8]" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="truncate font-display text-lg font-semibold text-white">{summary.topAgent.name}</div>
                                                    <div className="truncate text-xs text-[#94A3B8]">{summary.topAgent.organization ?? '—'}</div>
                                                </div>
                                            </div>
                                            <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[#FFF3EB] px-2 py-1">
                                                <Award className="h-3 w-3 text-[#FF6B00]" />
                                                <span className="font-mono text-xs font-semibold text-[#CC5500]">{summary.topAgent.count}</span>
                                                <span className="text-xs text-[#CC5500]">ratings submitted</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mt-3 text-sm text-[#94A3B8]">No ratings yet.</div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ──── RATINGS TABLE ──── */}
                <Card className="border-[#2A2A2A] bg-[#0F0F0F]">
                    <CardHeader className="border-b border-[#2A2A2A] p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <CardTitle className="font-display text-lg font-semibold uppercase tracking-wide text-white">All Ratings</CardTitle>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                                <Input
                                    placeholder="Search agent or player..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full border-[#2A2A2A] bg-[#1A1A1A] pl-9 text-sm text-white placeholder:text-[#94A3B8] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 sm:w-72"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-[#2A2A2A] hover:bg-transparent">
                                        <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Agent</TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Player</TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Technical</TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Physical</TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Mental</TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Overall</TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Date</TableHead>
                                        <TableHead className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ratings.data.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={8} className="px-6 py-10 text-center text-sm text-[#94A3B8]">No ratings found.</TableCell>
                                        </TableRow>
                                    )}
                                    {ratings.data.map((rating) => {
                                        if (rating.scout.role !== 'agent') return null;
                                        return (
                                            <TableRow key={rating.id} className="border-[#2A2A2A] hover:bg-[#1A1A1A]">
                                                <TableCell className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                                                            <User className="h-4 w-4 text-[#94A3B8]" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-white">{rating.scout.name}</div>
                                                            <div className="text-xs text-[#94A3B8]">{rating.scout.organization ?? '—'}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={rating.player.avatar || PLACEHOLDER} alt={rating.player.name} className="h-9 w-9 rounded-full border border-[#2A2A2A] object-cover" />
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-semibold text-white">{rating.player.name}</span>
                                                                {rating.player.position && (
                                                                    <span className="rounded border border-[#FF6B00] bg-[#FFF3EB] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#CC5500]">
                                                                        {rating.player.position}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-[#94A3B8]">{rating.player.club ?? '—'}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4"><StarsInline value={rating.technical} /></TableCell>
                                                <TableCell className="py-4"><StarsInline value={rating.physical} /></TableCell>
                                                <TableCell className="py-4"><StarsInline value={rating.mental} /></TableCell>
                                                <TableCell className="py-4">
                                                    <div className="inline-flex items-center gap-1.5 rounded-md bg-[#FFF3EB] px-2 py-1">
                                                        <Star className="h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" />
                                                        <span className="font-mono text-sm font-semibold text-[#CC5500]">{rating.overall.toFixed(1)}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <div className="font-mono text-xs text-[#94A3B8]">
                                                        {rating.date ? new Date(rating.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button variant="ghost" size="sm" onClick={() => setViewRating(rating)} className="h-8 w-8 p-0 text-[#94A3B8] hover:bg-[#2A2A2A] hover:text-[#FF6B00]">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => setDeleteRating(rating)} className="h-8 w-8 p-0 text-[#94A3B8] hover:bg-red-50 hover:text-[#DC2626]">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex flex-col items-start gap-3 border-t border-[#2A2A2A] p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-xs text-[#94A3B8]">
                                Showing <span className="font-mono font-semibold text-white">{ratings.from ?? 0}-{ratings.to ?? 0}</span> of{' '}
                                <span className="font-mono font-semibold text-white">{ratings.total.toLocaleString()}</span> ratings
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" disabled={ratings.current_page <= 1} onClick={() => goToPage(ratings.current_page - 1)} className="border-[#2A2A2A] bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] disabled:opacity-50">
                                    <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    {pageWindow.map((p) =>
                                        p === ratings.current_page ? (
                                            <Button key={p} size="sm" className="h-8 w-8 bg-[#FF6B00] p-0 font-mono text-white hover:bg-[#CC5500]">{p}</Button>
                                        ) : (
                                            <Button key={p} variant="outline" size="sm" onClick={() => goToPage(p)} className="h-8 w-8 border-[#2A2A2A] bg-[#1A1A1A] p-0 font-mono text-white hover:bg-[#2A2A2A]">{p}</Button>
                                        )
                                    )}
                                </div>
                                <Button variant="outline" size="sm" disabled={ratings.current_page >= ratings.last_page} onClick={() => goToPage(ratings.current_page + 1)} className="border-[#2A2A2A] bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] disabled:opacity-50">
                                    Next <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ──── MOST RATED PLAYERS ──── */}
                <div className="grid grid-cols-1 gap-6">
                    <Card className="border-[#2A2A2A] bg-[#0F0F0F]">
                        <CardHeader className="border-b border-[#2A2A2A] p-6">
                            <CardTitle className="font-display text-lg font-semibold uppercase tracking-wide text-white">Most Rated Players</CardTitle>
                            <p className="mt-1 text-xs text-[#94A3B8]">Players with the highest number of submitted ratings by agents</p>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-[#2A2A2A]">
                                {mostRatedPlayers.map((player, idx) => (
                                    <Link key={player.id} href={`/players/${player.id}`} className="flex items-center gap-4 p-4 transition hover:bg-[#1A1A1A]">
                                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#1A1A1A] font-mono text-xs font-semibold text-[#94A3B8]">{idx + 1}</div>
                                        <img src={player.avatar || PLACEHOLDER} alt={player.name} className="h-11 w-11 rounded-full border border-[#2A2A2A] object-cover" />
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="truncate text-sm font-semibold text-white">{player.name}</span>
                                                {player.position && <span className="rounded border border-[#FF6B00] bg-[#FFF3EB] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#CC5500]">{player.position}</span>}
                                            </div>
                                            <div className="truncate text-xs text-[#94A3B8]">{player.club ?? '—'}</div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="font-mono text-sm font-semibold text-white">{player.ratings}</div>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" />
                                                <span className="font-mono text-xs text-[#94A3B8]">{player.avg.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {mostRatedPlayers.length === 0 && <div className="p-6 text-center text-sm text-[#94A3B8]">No data yet.</div>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* ──── VIEW DIALOG ──── */}
            <Dialog open={!!viewRating} onOpenChange={() => setViewRating(null)}>
                <DialogContent className="max-w-3xl border-[#2A2A2A] bg-[#0F0F0F] text-white">
                    {viewRating && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="font-display text-2xl font-bold uppercase tracking-tight text-white">Rating Details</DialogTitle>
                                <DialogDescription className="text-sm text-[#94A3B8]">
                                    Submitted on {viewRating.date ? new Date(viewRating.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-4">
                                        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Agent</div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-full bg-[#2A2A2A] flex items-center justify-center"><User className="h-6 w-6 text-[#94A3B8]" /></div>
                                            <div className="min-w-0 flex-1">
                                                <div className="truncate font-display text-base font-semibold text-white">{viewRating.scout.name}</div>
                                                <div className="truncate text-xs text-[#94A3B8]">{viewRating.scout.organization ?? '—'}</div>
                                                <div className="text-xs text-[#94A3B8]">{viewRating.scout.country ?? ''}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-4">
                                        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Player</div>
                                        <div className="flex items-center gap-3">
                                            <img src={viewRating.player.avatar || PLACEHOLDER} alt={viewRating.player.name} className="h-12 w-12 rounded-full border border-[#2A2A2A] object-cover" />
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="truncate font-display text-base font-semibold text-white">{viewRating.player.name}</span>
                                                    {viewRating.player.position && <span className="rounded border border-[#FF6B00] bg-[#FFF3EB] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#CC5500]">{viewRating.player.position}</span>}
                                                </div>
                                                <div className="truncate text-xs text-[#94A3B8]">{viewRating.player.club ?? '—'}</div>
                                                {viewRating.player.age !== null && <div className="text-xs text-[#94A3B8]">Age <span className="font-mono">{viewRating.player.age}</span></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-3 text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Ratings Breakdown</div>
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                        <StarsLarge value={viewRating.technical} label="Technical" />
                                        <StarsLarge value={viewRating.physical} label="Physical" />
                                        <StarsLarge value={viewRating.mental} label="Mental" />
                                        <div className="rounded-lg border border-[#FF6B00] bg-[#FFF3EB] p-4">
                                            <div className="text-xs font-medium uppercase tracking-wider text-[#CC5500]">Overall</div>
                                            <div className="mt-2 flex items-center gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.round(viewRating.overall) ? 'fill-[#FF6B00] text-[#FF6B00]' : 'fill-transparent text-[#FF6B00]/30'}`} />)}
                                            </div>
                                            <div className="mt-2 font-mono text-2xl font-bold text-[#CC5500]">{viewRating.overall.toFixed(1)}</div>
                                        </div>
                                    </div>
                                </div>
                                {viewRating.matchContext && (
                                    <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-4">
                                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#FF6B00]" /><div className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Match Context</div></div>
                                        <div className="mt-2 text-sm text-white">{viewRating.matchContext}</div>
                                    </div>
                                )}
                                {viewRating.notes && (
                                    <div>
                                        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Agent Notes</div>
                                        <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-4 text-sm leading-relaxed text-white">{viewRating.notes}</div>
                                    </div>
                                )}
                            </div>
                            <DialogFooter className="gap-2">
                                <Button variant="outline" onClick={() => setViewRating(null)} className="border-[#2A2A2A] bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]">Close</Button>
                                <Link href={`/ admin / players / ${viewRating.player.id}`} className="inline-flex items-center justify-center rounded-md bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#CC5500]">View Player Profile</Link>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* ──── DELETE DIALOG ──── */}
            <Dialog open={!!deleteRating} onOpenChange={() => setDeleteRating(null)}>
                <DialogContent className="max-w-md border-[#2A2A2A] bg-[#0F0F0F] text-white">
                    {deleteRating && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="font-display text-xl font-bold uppercase tracking-tight text-white">Delete Rating</DialogTitle>
                                <DialogDescription className="text-sm text-[#94A3B8]">This action cannot be undone. The rating will be permanently removed from the platform.</DialogDescription>
                            </DialogHeader>
                            <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#2A2A2A] flex items-center justify-center"><User className="h-5 w-5 text-[#94A3B8]" /></div>
                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-sm font-semibold text-white">{deleteRating.scout.name}</div>
                                        <div className="truncate text-xs text-[#94A3B8]">rated <span className="font-semibold">{deleteRating.player.name}</span></div>
                                    </div>
                                    <div className="inline-flex items-center gap-1 rounded-md bg-[#FFF3EB] px-2 py-1">
                                        <Star className="h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" />
                                        <span className="font-mono text-sm font-semibold text-[#CC5500]">{deleteRating.overall.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="gap-2">
                                <Button variant="outline" onClick={() => setDeleteRating(null)} disabled={deleting} className="border-[#2A2A2A] bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]">Cancel</Button>
                                <Button onClick={handleDelete} disabled={deleting} className="bg-[#DC2626] text-white hover:bg-[#B91C1C]"><Trash2 className="mr-2 h-4 w-4" />{deleting ? 'Deleting...' : 'Delete Rating'}</Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
