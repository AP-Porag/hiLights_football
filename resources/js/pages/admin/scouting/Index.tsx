import { useState } from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
    Filter,
    Download,
} from 'lucide-react';

// TODO: Replace with usePage().props
const ratings = [
    {
        id: 1,
        scout: {
            id: 1,
            name: 'James Robertson',
            avatar: 'https://i.pravatar.cc/150?img=12',
            organization: 'Manchester City FC',
            country: 'England',
        },
        player: {
            id: 101,
            name: 'Lucas Almeida',
            avatar: 'https://i.pravatar.cc/150?img=33',
            position: 'CAM',
            club: 'Santos FC U-20',
            age: 18,
        },
        technical: 4.5,
        physical: 4.0,
        mental: 4.5,
        overall: 4.3,
        notes:
            'Exceptional vision and ball control under pressure. Showed maturity beyond his years in the final third. Needs to add upper body strength to compete in European leagues. Recommended for follow-up in 6 months. Compares stylistically to a young Bernardo Silva.',
        date: '2026-05-14',
        matchContext: 'Santos vs Palmeiras — Copa Sao Paulo',
    },
    {
        id: 2,
        scout: {
            id: 2,
            name: 'Mateus Carvalho',
            avatar: 'https://i.pravatar.cc/150?img=15',
            organization: 'TransferRoom Network',
            country: 'Portugal',
        },
        player: {
            id: 102,
            name: 'Rafael Mendes',
            avatar: 'https://i.pravatar.cc/150?img=52',
            position: 'CB',
            club: 'Flamengo U-19',
            age: 17,
        },
        technical: 3.5,
        physical: 5.0,
        mental: 4.0,
        overall: 4.2,
        notes:
            'Dominant physical presence. Aerial duels won at elite percentage. Distribution needs work — short passing solid but range limited. Strong leadership traits.',
        date: '2026-05-13',
        matchContext: 'Flamengo vs Vasco — Carioca U-19',
    },
    {
        id: 3,
        scout: {
            id: 3,
            name: 'Sophie Laurent',
            avatar: 'https://i.pravatar.cc/150?img=44',
            organization: 'AS Monaco',
            country: 'France',
        },
        player: {
            id: 103,
            name: 'Diego Santana',
            avatar: 'https://i.pravatar.cc/150?img=68',
            position: 'LW',
            club: 'Gremio U-20',
            age: 19,
        },
        technical: 5.0,
        physical: 3.5,
        mental: 4.0,
        overall: 4.2,
        notes:
            'Elite dribbling, two-footed, can play both wings. Defensive work-rate inconsistent. Decision-making in final third top tier. Should be tracked closely.',
        date: '2026-05-12',
        matchContext: 'Gremio vs Internacional — Gauchao U-20',
    },
    {
        id: 4,
        scout: {
            id: 1,
            name: 'James Robertson',
            avatar: 'https://i.pravatar.cc/150?img=12',
            organization: 'Manchester City FC',
            country: 'England',
        },
        player: {
            id: 104,
            name: 'Bruno Oliveira',
            avatar: 'https://i.pravatar.cc/150?img=70',
            position: 'CDM',
            club: 'Sao Paulo U-20',
            age: 18,
        },
        technical: 4.0,
        physical: 4.0,
        mental: 4.5,
        overall: 4.2,
        notes:
            'Reads the game brilliantly. Tackling timing exceptional. Lacks top-end pace but compensates with positioning.',
        date: '2026-05-11',
        matchContext: 'Sao Paulo vs Corinthians — Paulista U-20',
    },
    {
        id: 5,
        scout: {
            id: 4,
            name: 'Klaus Weber',
            avatar: 'https://i.pravatar.cc/150?img=8',
            organization: 'Wyscout Analytics',
            country: 'Germany',
        },
        player: {
            id: 105,
            name: 'Pedro Costa',
            avatar: 'https://i.pravatar.cc/150?img=53',
            position: 'ST',
            club: 'Atletico MG U-20',
            age: 19,
        },
        technical: 4.0,
        physical: 4.5,
        mental: 3.5,
        overall: 4.0,
        notes:
            'Clinical finisher inside the box. Off-the-ball movement improving. Mental side needs maturity — overreacts to officials.',
        date: '2026-05-10',
        matchContext: 'Atletico MG vs Cruzeiro — Mineiro U-20',
    },
    {
        id: 6,
        scout: {
            id: 5,
            name: 'Andrea Bianchi',
            avatar: 'https://i.pravatar.cc/150?img=20',
            organization: 'Juventus FC',
            country: 'Italy',
        },
        player: {
            id: 106,
            name: 'Thiago Ferreira',
            avatar: 'https://i.pravatar.cc/150?img=60',
            position: 'RB',
            club: 'Corinthians U-19',
            age: 17,
        },
        technical: 3.5,
        physical: 4.0,
        mental: 4.0,
        overall: 3.8,
        notes:
            'Modern fullback profile. Strong overlapping runs, decent crossing. Defensive 1v1 needs sharpening.',
        date: '2026-05-09',
        matchContext: 'Corinthians vs Santos — Paulista U-19',
    },
    {
        id: 7,
        scout: {
            id: 2,
            name: 'Mateus Carvalho',
            avatar: 'https://i.pravatar.cc/150?img=15',
            organization: 'TransferRoom Network',
            country: 'Portugal',
        },
        player: {
            id: 107,
            name: 'Gabriel Souza',
            avatar: 'https://i.pravatar.cc/150?img=11',
            position: 'GK',
            club: 'Palmeiras U-20',
            age: 18,
        },
        technical: 4.0,
        physical: 4.5,
        mental: 4.0,
        overall: 4.2,
        notes:
            'Excellent shot-stopper. Distribution with both feet is a strong asset. Command of box improving with experience.',
        date: '2026-05-08',
        matchContext: 'Palmeiras vs Santos — Paulista U-20',
    },
];

const summary = {
    avgRating: 4.1,
    totalRatings: 1247,
    topScout: {
        name: 'James Robertson',
        organization: 'Manchester City FC',
        count: 184,
        avatar: 'https://i.pravatar.cc/150?img=12',
    },
};

const mostRatedPlayers = [
    { id: 101, name: 'Lucas Almeida', position: 'CAM', club: 'Santos FC U-20', ratings: 42, avg: 4.5, avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: 103, name: 'Diego Santana', position: 'LW', club: 'Gremio U-20', ratings: 38, avg: 4.3, avatar: 'https://i.pravatar.cc/150?img=68' },
    { id: 102, name: 'Rafael Mendes', position: 'CB', club: 'Flamengo U-19', ratings: 34, avg: 4.2, avatar: 'https://i.pravatar.cc/150?img=52' },
    { id: 104, name: 'Bruno Oliveira', position: 'CDM', club: 'Sao Paulo U-20', ratings: 29, avg: 4.1, avatar: 'https://i.pravatar.cc/150?img=70' },
    { id: 105, name: 'Pedro Costa', position: 'ST', club: 'Atletico MG U-20', ratings: 27, avg: 4.0, avatar: 'https://i.pravatar.cc/150?img=53' },
];

const mostActiveScouts = [
    { id: 1, name: 'James Robertson', organization: 'Manchester City FC', country: 'England', ratings: 184, avgGiven: 4.0, avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 2, name: 'Mateus Carvalho', organization: 'TransferRoom Network', country: 'Portugal', ratings: 152, avgGiven: 4.1, avatar: 'https://i.pravatar.cc/150?img=15' },
    { id: 3, name: 'Sophie Laurent', organization: 'AS Monaco', country: 'France', ratings: 138, avgGiven: 4.2, avatar: 'https://i.pravatar.cc/150?img=44' },
    { id: 4, name: 'Klaus Weber', organization: 'Wyscout Analytics', country: 'Germany', ratings: 121, avgGiven: 3.9, avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 5, name: 'Andrea Bianchi', organization: 'Juventus FC', country: 'Italy', ratings: 109, avgGiven: 4.0, avatar: 'https://i.pravatar.cc/150?img=20' },
];

type Rating = (typeof ratings)[number];

function StarsInline({ value, max = 5 }: { value: number; max?: number }) {
    const filled = Math.round(value);
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3 h-3 ${
                        i < filled
                            ? 'fill-[#FF6B00] text-[#FF6B00]'
                            : 'fill-transparent text-[#CBD5E1] dark:text-[#2A2A2A]'
                    }`}
                />
            ))}
            <span className="ml-1.5 font-mono text-xs text-[#0F172A] dark:text-[#F5F5F5]">
        {value.toFixed(1)}
      </span>
        </div>
    );
}

function StarsLarge({ value, label, max = 5 }: { value: number; label: string; max?: number }) {
    const filled = Math.round(value);
    return (
        <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="text-xs font-medium uppercase tracking-wider text-[#475569]">{label}</div>
            <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: max }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${
                            i < filled
                                ? 'fill-[#FF6B00] text-[#FF6B00]'
                                : 'fill-transparent text-[#CBD5E1]'
                        }`}
                    />
                ))}
            </div>
            <div className="mt-2 font-mono text-2xl font-semibold text-[#0F172A]">
                {value.toFixed(1)}
            </div>
        </div>
    );
}

export default function RatingsIndex() {
    const [search, setSearch] = useState('');
    const [scoutFilter, setScoutFilter] = useState('all');
    const [viewRating, setViewRating] = useState<Rating | null>(null);
    const [deleteRating, setDeleteRating] = useState<Rating | null>(null);

    const filtered = ratings.filter((r) => {
        const q = search.toLowerCase();
        const matchesSearch =
            !q ||
            r.scout.name.toLowerCase().includes(q) ||
            r.player.name.toLowerCase().includes(q) ||
            r.scout.organization.toLowerCase().includes(q);
        const matchesScout = scoutFilter === 'all' || String(r.scout.id) === scoutFilter;
        return matchesSearch && matchesScout;
    });

    const handleDelete = () => {
        // TODO: router.delete(route('admin.ratings.destroy', deleteRating.id))
        setDeleteRating(null);
    };

    return (
        <AdminLayout pageTitle="Scout Ratings">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-[#0F172A]">
                            Scout Ratings
                        </h1>
                        <p className="mt-1 text-sm text-[#475569]">
                            Monitor all ratings submitted by scouts across the platform.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                    </div>
                </div>

                {/* Summary Widgets */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Avg Rating */}
                    <Card className="border-[#E2E8F0] bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                        Average Rating
                                    </div>
                                    <div className="mt-3 font-mono text-4xl font-bold text-[#0F172A]">
                                        {summary.avgRating.toFixed(1)}
                                    </div>
                                    <div className="mt-2 flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < Math.round(summary.avgRating)
                                                        ? 'fill-[#FF6B00] text-[#FF6B00]'
                                                        : 'fill-transparent text-[#CBD5E1]'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-[#16A34A]">
                                        <TrendingUp className="h-3 w-3" />
                                        <span className="font-mono">+0.2</span>
                                        <span className="text-[#475569]">vs last month</span>
                                    </div>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF3EB]">
                                    <Star className="h-5 w-5 fill-[#FF6B00] text-[#FF6B00]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Total Ratings */}
                    <Card className="border-[#E2E8F0] bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                        Total Ratings
                                    </div>
                                    <div className="mt-3 font-mono text-4xl font-bold text-[#0F172A]">
                                        {summary.totalRatings.toLocaleString()}
                                    </div>
                                    <div className="mt-2 text-xs text-[#475569]">
                                        Across <span className="font-mono text-[#0F172A]">312</span> players
                                    </div>
                                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-[#16A34A]">
                                        <TrendingUp className="h-3 w-3" />
                                        <span className="font-mono">+184</span>
                                        <span className="text-[#475569]">this month</span>
                                    </div>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF3EB]">
                                    <Users className="h-5 w-5 text-[#FF6B00]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Scout */}
                    <Card className="border-[#E2E8F0] bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                        Top Scout
                                    </div>
                                    <div className="mt-3 flex items-center gap-3">
                                        <img
                                            src={summary.topScout.avatar}
                                            alt={summary.topScout.name}
                                            className="h-10 w-10 rounded-full border border-[#E2E8F0] object-cover"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate font-display text-lg font-semibold text-[#0F172A]">
                                                {summary.topScout.name}
                                            </div>
                                            <div className="truncate text-xs text-[#475569]">
                                                {summary.topScout.organization}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[#FFF3EB] px-2 py-1">
                                        <Award className="h-3 w-3 text-[#FF6B00]" />
                                        <span className="font-mono text-xs font-semibold text-[#CC5500]">
                      {summary.topScout.count}
                    </span>
                                        <span className="text-xs text-[#CC5500]">ratings submitted</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters + Table */}
                <Card className="border-[#E2E8F0] bg-white">
                    <CardHeader className="border-b border-[#E2E8F0] p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <CardTitle className="font-display text-lg font-semibold uppercase tracking-wide text-[#0F172A]">
                                All Ratings
                            </CardTitle>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                                    <Input
                                        placeholder="Search scout or player..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full border-[#E2E8F0] bg-white pl-9 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 sm:w-72"
                                    />
                                </div>
                                <Select value={scoutFilter} onValueChange={setScoutFilter}>
                                    <SelectTrigger className="w-full border-[#E2E8F0] bg-white text-sm text-[#0F172A] sm:w-48">
                                        <Filter className="mr-2 h-4 w-4 text-[#94A3B8]" />
                                        <SelectValue placeholder="All scouts" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Scouts</SelectItem>
                                        <SelectItem value="1">James Robertson</SelectItem>
                                        <SelectItem value="2">Mateus Carvalho</SelectItem>
                                        <SelectItem value="3">Sophie Laurent</SelectItem>
                                        <SelectItem value="4">Klaus Weber</SelectItem>
                                        <SelectItem value="5">Andrea Bianchi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-[#E2E8F0] hover:bg-transparent">
                                        <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                            Scout
                                        </TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                            Player
                                        </TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                            Technical
                                        </TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                            Physical
                                        </TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                            Mental
                                        </TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                            Overall
                                        </TableHead>
                                        <TableHead className="py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                            Date
                                        </TableHead>
                                        <TableHead className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filtered.map((rating) => (
                                        <TableRow
                                            key={rating.id}
                                            className="border-[#E2E8F0] hover:bg-[#F8FAFC]"
                                        >
                                            <TableCell className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={rating.scout.avatar}
                                                        alt={rating.scout.name}
                                                        className="h-9 w-9 rounded-full border border-[#E2E8F0] object-cover"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-semibold text-[#0F172A]">
                                                            {rating.scout.name}
                                                        </div>
                                                        <div className="text-xs text-[#475569]">
                                                            {rating.scout.organization}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={rating.player.avatar}
                                                        alt={rating.player.name}
                                                        className="h-9 w-9 rounded-full border border-[#E2E8F0] object-cover"
                                                    />
                                                    <div>
                                                        <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#0F172A]">
                                {rating.player.name}
                              </span>
                                                            <span className="rounded border border-[#FF6B00] bg-[#FFF3EB] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#CC5500]">
                                {rating.player.position}
                              </span>
                                                        </div>
                                                        <div className="text-xs text-[#475569]">
                                                            {rating.player.club}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <StarsInline value={rating.technical} />
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <StarsInline value={rating.physical} />
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <StarsInline value={rating.mental} />
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="inline-flex items-center gap-1.5 rounded-md bg-[#FFF3EB] px-2 py-1">
                                                    <Star className="h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" />
                                                    <span className="font-mono text-sm font-semibold text-[#CC5500]">
                            {rating.overall.toFixed(1)}
                          </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="font-mono text-xs text-[#475569]">
                                                    {new Date(rating.date).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setViewRating(rating)}
                                                        className="h-8 w-8 p-0 text-[#475569] hover:bg-[#FFF3EB] hover:text-[#FF6B00]"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setDeleteRating(rating)}
                                                        className="h-8 w-8 p-0 text-[#475569] hover:bg-red-50 hover:text-[#DC2626]"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col items-start gap-3 border-t border-[#E2E8F0] p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-xs text-[#475569]">
                                Showing <span className="font-mono font-semibold text-[#0F172A]">1-7</span> of{' '}
                                <span className="font-mono font-semibold text-[#0F172A]">
                  {summary.totalRatings.toLocaleString()}
                </span>{' '}
                                ratings
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
                                >
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    <Button
                                        size="sm"
                                        className="h-8 w-8 bg-[#FF6B00] p-0 font-mono text-white hover:bg-[#CC5500]"
                                    >
                                        1
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 w-8 border-[#E2E8F0] bg-white p-0 font-mono text-[#0F172A] hover:bg-[#F8FAFC]"
                                    >
                                        2
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 w-8 border-[#E2E8F0] bg-white p-0 font-mono text-[#0F172A] hover:bg-[#F8FAFC]"
                                    >
                                        3
                                    </Button>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
                                >
                                    Next
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bottom 2-col */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Most Rated Players */}
                    <Card className="border-[#E2E8F0] bg-white">
                        <CardHeader className="border-b border-[#E2E8F0] p-6">
                            <CardTitle className="font-display text-lg font-semibold uppercase tracking-wide text-[#0F172A]">
                                Most Rated Players
                            </CardTitle>
                            <p className="mt-1 text-xs text-[#475569]">
                                Players with the highest number of submitted ratings
                            </p>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-[#E2E8F0]">
                                {mostRatedPlayers.map((player, idx) => (
                                    <Link
                                        key={player.id}
                                        href={`/admin/players/${player.id}`}
                                        className="flex items-center gap-4 p-4 transition hover:bg-[#F8FAFC]"
                                    >
                                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#F8FAFC] font-mono text-xs font-semibold text-[#475569]">
                                            {idx + 1}
                                        </div>
                                        <img
                                            src={player.avatar}
                                            alt={player.name}
                                            className="h-11 w-11 rounded-full border border-[#E2E8F0] object-cover"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-[#0F172A]">
                          {player.name}
                        </span>
                                                <span className="rounded border border-[#FF6B00] bg-[#FFF3EB] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#CC5500]">
                          {player.position}
                        </span>
                                            </div>
                                            <div className="truncate text-xs text-[#475569]">{player.club}</div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="font-mono text-sm font-semibold text-[#0F172A]">
                                                {player.ratings}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" />
                                                <span className="font-mono text-xs text-[#475569]">
                          {player.avg.toFixed(1)}
                        </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Most Active Scouts */}
                    <Card className="border-[#E2E8F0] bg-white">
                        <CardHeader className="border-b border-[#E2E8F0] p-6">
                            <CardTitle className="font-display text-lg font-semibold uppercase tracking-wide text-[#0F172A]">
                                Most Active Scouts
                            </CardTitle>
                            <p className="mt-1 text-xs text-[#475569]">
                                Scouts who have submitted the most ratings this period
                            </p>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-[#E2E8F0]">
                                {mostActiveScouts.map((scout, idx) => (
                                    <Link
                                        key={scout.id}
                                        href={`/admin/scouts/${scout.id}`}
                                        className="flex items-center gap-4 p-4 transition hover:bg-[#F8FAFC]"
                                    >
                                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#F8FAFC] font-mono text-xs font-semibold text-[#475569]">
                                            {idx + 1}
                                        </div>
                                        <img
                                            src={scout.avatar}
                                            alt={scout.name}
                                            className="h-11 w-11 rounded-full border border-[#E2E8F0] object-cover"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate text-sm font-semibold text-[#0F172A]">
                                                {scout.name}
                                            </div>
                                            <div className="truncate text-xs text-[#475569]">
                                                {scout.organization} · {scout.country}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="font-mono text-sm font-semibold text-[#0F172A]">
                                                {scout.ratings}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" />
                                                <span className="font-mono text-xs text-[#475569]">
                          {scout.avgGiven.toFixed(1)}
                        </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* VIEW DIALOG */}
            <Dialog open={!!viewRating} onOpenChange={() => setViewRating(null)}>
                <DialogContent className="max-w-3xl border-[#E2E8F0] bg-white">
                    {viewRating && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="font-display text-2xl font-bold uppercase tracking-tight text-[#0F172A]">
                                    Rating Details
                                </DialogTitle>
                                <DialogDescription className="text-sm text-[#475569]">
                                    Submitted on{' '}
                                    {new Date(viewRating.date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-5">
                                {/* Profiles */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {/* Scout */}
                                    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                                        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-[#475569]">
                                            Scout
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={viewRating.scout.avatar}
                                                alt={viewRating.scout.name}
                                                className="h-12 w-12 rounded-full border border-[#E2E8F0] object-cover"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <div className="truncate font-display text-base font-semibold text-[#0F172A]">
                                                    {viewRating.scout.name}
                                                </div>
                                                <div className="truncate text-xs text-[#475569]">
                                                    {viewRating.scout.organization}
                                                </div>
                                                <div className="text-xs text-[#94A3B8]">
                                                    {viewRating.scout.country}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Player */}
                                    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                                        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-[#475569]">
                                            Player
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={viewRating.player.avatar}
                                                alt={viewRating.player.name}
                                                className="h-12 w-12 rounded-full border border-[#E2E8F0] object-cover"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                          <span className="truncate font-display text-base font-semibold text-[#0F172A]">
                            {viewRating.player.name}
                          </span>
                                                    <span className="rounded border border-[#FF6B00] bg-[#FFF3EB] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#CC5500]">
                            {viewRating.player.position}
                          </span>
                                                </div>
                                                <div className="truncate text-xs text-[#475569]">
                                                    {viewRating.player.club}
                                                </div>
                                                <div className="text-xs text-[#94A3B8]">
                                                    Age <span className="font-mono">{viewRating.player.age}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ratings Grid */}
                                <div>
                                    <div className="mb-3 text-xs font-medium uppercase tracking-wider text-[#475569]">
                                        Ratings Breakdown
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                        <StarsLarge value={viewRating.technical} label="Technical" />
                                        <StarsLarge value={viewRating.physical} label="Physical" />
                                        <StarsLarge value={viewRating.mental} label="Mental" />
                                        <div className="rounded-lg border border-[#FF6B00] bg-[#FFF3EB] p-4">
                                            <div className="text-xs font-medium uppercase tracking-wider text-[#CC5500]">
                                                Overall
                                            </div>
                                            <div className="mt-2 flex items-center gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-5 h-5 ${
                                                            i < Math.round(viewRating.overall)
                                                                ? 'fill-[#FF6B00] text-[#FF6B00]'
                                                                : 'fill-transparent text-[#FF6B00]/30'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="mt-2 font-mono text-2xl font-bold text-[#CC5500]">
                                                {viewRating.overall.toFixed(1)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Match Context */}
                                <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-[#FF6B00]" />
                                        <div className="text-xs font-medium uppercase tracking-wider text-[#475569]">
                                            Match Context
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-[#0F172A]">{viewRating.matchContext}</div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[#475569]">
                                        Scout Notes
                                    </div>
                                    <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-sm leading-relaxed text-[#0F172A]">
                                        {viewRating.notes}
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setViewRating(null)}
                                    className="border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
                                >
                                    Close
                                </Button>
                                <Link
                                    href={`/admin/players/${viewRating.player.id}`}
                                    className="inline-flex items-center justify-center rounded-md bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#CC5500]"
                                >
                                    View Player Profile
                                </Link>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* DELETE DIALOG */}
            <Dialog open={!!deleteRating} onOpenChange={() => setDeleteRating(null)}>
                <DialogContent className="max-w-md border-[#E2E8F0] bg-white">
                    {deleteRating && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="font-display text-xl font-bold uppercase tracking-tight text-[#0F172A]">
                                    Delete Rating
                                </DialogTitle>
                                <DialogDescription className="text-sm text-[#475569]">
                                    This action cannot be undone. The rating will be permanently removed from the
                                    platform.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={deleteRating.scout.avatar}
                                        alt={deleteRating.scout.name}
                                        className="h-10 w-10 rounded-full border border-[#E2E8F0] object-cover"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-sm font-semibold text-[#0F172A]">
                                            {deleteRating.scout.name}
                                        </div>
                                        <div className="truncate text-xs text-[#475569]">
                                            rated <span className="font-semibold">{deleteRating.player.name}</span>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center gap-1 rounded-md bg-[#FFF3EB] px-2 py-1">
                                        <Star className="h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" />
                                        <span className="font-mono text-sm font-semibold text-[#CC5500]">
                      {deleteRating.overall.toFixed(1)}
                    </span>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setDeleteRating(null)}
                                    className="border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    className="bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Rating
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
