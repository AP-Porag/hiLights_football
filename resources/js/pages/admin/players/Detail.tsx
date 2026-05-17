import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    ArrowLeft,
    ExternalLink,
    Edit,
    ChevronDown,
    CheckCircle2,
    Ban,
    Trash2,
    BadgeCheck,
    AlertTriangle,
    Video,
    Star,
    MoreHorizontal,
    Eye,
    Globe2,
    Users,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

// TODO: Replace with usePage<PageProps & { player: typeof player }>().props
const player = {
    id: 247,
    name: 'Benjamin Silva',
    nickname: 'Benja',
    profileId: '#00247',
    status: 'active' as const,
    isMinor: true,
    dob: '30/01/2009',
    age: 17,
    gender: 'Male',
    height: 178,
    birthplace: 'Rio de Janeiro',
    birthplaceCountry: 'Brazil',
    nationality: 'Brazil',
    flag: '🇧🇷',
    currentClub: 'Anápolis Sub-15',
    teamSince: '03/2025',
    agent: 'Talentos S/A',
    foot: 'Right',
    positions: ['ST', 'LW'],
    modalities: ['Football', 'Futsal', 'Beach Soccer'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description:
        'Fast, focused player with exceptional game vision. Demonstrates excellent off-the-ball movement and consistently makes intelligent runs into space. Strong technical foundation with both feet, though clearly favours the right. Mature decision-making for his age group and a natural leader on the pitch.',
    isPremium: true,
    subscriptionPlan: 'premium',
    subscriptionRenews: '01/06/2026',
    profileViews: 1247,
    countriesReached: 23,
    scoutRatingsCount: 8,
    avgRating: 4.2,
    isFeatured: true,
    isVerified: true,
    registeredAt: '15/01/2026',
    lastActive: '2 hours ago',
    guardian: 'Carlos Silva (Father)',
    clubHistory: [
        { year: 2026, club: 'Anápolis Sub-15' },
        { year: 2025, club: '' },
        { year: 2024, club: '' },
        { year: 2023, club: 'Flamengo Base' },
        { year: 2022, club: '' },
        { year: 2021, club: '' },
        { year: 2020, club: '' },
    ],
    recentViews: [
        {
            id: 1,
            viewer: 'FC Porto Scout',
            country: 'Portugal',
            flag: '🇵🇹',
            role: 'Scout',
            time: '2 hours ago',
        },
        {
            id: 2,
            viewer: 'Sporting Lisboa B',
            country: 'Portugal',
            flag: '🇵🇹',
            role: 'Club',
            time: 'Yesterday',
        },
        {
            id: 3,
            viewer: 'Top Eleven Agency',
            country: 'Spain',
            flag: '🇪🇸',
            role: 'Agent',
            time: '2 days ago',
        },
    ],
    ratings: [
        {
            id: 1,
            scout: 'João Ferreira',
            role: 'Scout',
            country: 'Portugal',
            flag: '🇵🇹',
            technical: 4,
            physical: 3,
            mental: 5,
            overall: 4,
            notes: 'Excellent positioning and work rate. Reads the game well and consistently shows up in dangerous areas.',
            date: '12/05/2026',
        },
        {
            id: 2,
            scout: 'Maria Costa',
            role: 'Agent',
            country: 'Brazil',
            flag: '🇧🇷',
            technical: 5,
            physical: 4,
            mental: 4,
            overall: 4,
            notes: 'Outstanding technical ability for his age. Composed under pressure.',
            date: '10/05/2026',
        },
        {
            id: 3,
            scout: 'Carlos Mendez',
            role: 'Club',
            country: 'Spain',
            flag: '🇪🇸',
            technical: 4,
            physical: 4,
            mental: 4,
            overall: 4,
            notes: '',
            date: '08/05/2026',
        },
    ],
    viewsByCountry: [
        { country: 'Portugal', count: 423 },
        { country: 'Brazil', count: 318 },
        { country: 'Spain', count: 201 },
        { country: 'France', count: 187 },
        { country: 'Germany', count: 118 },
    ],
};

const summaryAverages = {
    technical: 4.1,
    physical: 3.8,
    mental: 4.5,
    overall: 4.2,
};

function StarRow({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex items-center justify-between gap-3">
      <span className="text-[9px] uppercase tracking-widest text-[#94A3B8] font-medium w-16">
        {label}
      </span>
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                        key={i}
                        className={`w-3 h-3 ${
                            i <= value
                                ? 'fill-[#FF6B00] text-[#FF6B00]'
                                : 'fill-transparent text-[#E2E8F0]'
                        }`}
                        strokeWidth={1.5}
                    />
                ))}
            </div>
        </div>
    );
}

function InfoCell({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-0.5">
      <span className="text-xs text-[#94A3B8] uppercase tracking-wide font-medium">
        {label}
      </span>
            <span className="text-sm font-medium text-[#0F172A]">{value}</span>
        </div>
    );
}

export default function PlayerDetail() {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
    const [adminNote, setAdminNote] = useState('');

    const maxCountryViews = Math.max(...player.viewsByCountry.map((v) => v.count));

    const handleStatusChange = (newStatus: string) => {
        // TODO: router.put(route('admin.players.status', player.id), { status: newStatus })
        console.log('Status change:', newStatus);
    };

    const handleDelete = () => {
        // TODO: router.delete(route('admin.players.destroy', player.id))
        console.log('Delete player');
        setDeleteDialogOpen(false);
    };

    const handleSuspend = () => {
        // TODO: router.put(route('admin.players.suspend', player.id))
        console.log('Suspend player');
        setSuspendDialogOpen(false);
    };

    const handleSaveNote = () => {
        // TODO: router.post(route('admin.players.notes', player.id), { note: adminNote })
        console.log('Save note:', adminNote);
    };

    return (
        <AdminLayout pageTitle="Player Profile — Benjamin Silva">
            {/* ━━━ TOP ACTION BAR ━━━ */}
            <div className="bg-white border-b border-[#E2E8F0] -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 px-4 sm:px-6 lg:px-8 py-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Link href={route('admin.players')}>
                        <Button
                            variant="ghost"
                            className="text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] gap-2 -ml-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back to Players</span>
                        </Button>
                    </Link>

                    <div className="flex flex-wrap items-center gap-2">
                        <a
                            href={route('player.profile.show', player.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                className="border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A] gap-2"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span className="text-sm">View Public Profile</span>
                            </Button>
                        </a>

                        <Link href={route('admin.players.edit', player.id)}>
                            <Button
                                variant="outline"
                                className="border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A] gap-2"
                            >
                                <Edit className="w-4 h-4" />
                                <span className="text-sm">Edit Profile</span>
                            </Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`gap-2 ${
                                        player.status === 'active'
                                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800'
                                            : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800'
                                    }`}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                    <span className="text-sm font-semibold uppercase tracking-wide">
                    {player.status}
                  </span>
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52 rounded-xl">
                                <DropdownMenuItem
                                    onClick={() => handleStatusChange('active')}
                                    className="gap-2 cursor-pointer"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    <span className="text-sm">Set Active</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setSuspendDialogOpen(true)}
                                    className="gap-2 cursor-pointer"
                                >
                                    <Ban className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm">Suspend Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setDeleteDialogOpen(true)}
                                    className="gap-2 cursor-pointer text-red-600 focus:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="text-sm">Delete Profile</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* ━━━ LAYOUT ━━━ */}
            <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                {/* ━━━ LEFT COLUMN ━━━ */}
                <div className="space-y-5 min-w-0">
                    {/* ▶ IDENTITY CARD */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-[0.14em]">
                Player Profile
              </span>
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50 text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-md">
                                    Active
                                </Badge>
                                <Badge className="bg-[#FF6B00] text-white hover:bg-[#FF6B00] text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-md">
                                    Premium
                                </Badge>
                                {player.isFeatured && (
                                    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-md gap-1">
                                        Featured <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6">
                            {/* Photo */}
                            <div className="shrink-0 relative">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#334155] flex items-center justify-center font-display font-black text-white text-2xl sm:text-3xl">
                                    BS
                                </div>
                                <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                  PRO
                </span>
                                {player.isVerified && (
                                    <BadgeCheck className="absolute -bottom-2 -right-2 text-[#FF6B00] bg-white rounded-full w-5 h-5" />
                                )}
                            </div>

                            {/* Info */}
                            <div className="min-w-0">
                                <h1 className="font-display font-black text-2xl text-[#0F172A] tracking-tight leading-none">
                                    {player.name}
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[#94A3B8] text-xs">
                    {player.profileId}
                  </span>
                                    <span className="text-xs text-[#94A3B8]">·</span>
                                    <span className="text-xs text-[#475569]">"{player.nickname}"</span>
                                </div>

                                {player.isMinor && (
                                    <div className="inline-flex items-center gap-1.5 mt-3 bg-amber-50 border border-amber-200 text-amber-700 text-xs px-2 py-1 rounded-lg">
                                        <AlertTriangle className="w-3 h-3" />
                                        <span className="font-medium">Under 18 — Guardian: {player.guardian}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mt-6 pt-5 border-t border-[#F1F5F9]">
                            <InfoCell label="DOB" value={player.dob} />
                            <InfoCell label="Age" value={`${player.age} yrs`} />
                            <InfoCell label="Gender" value={player.gender} />
                            <InfoCell label="Height" value={`${player.height} cm`} />
                            <InfoCell
                                label="Nationality"
                                value={
                                    <span className="inline-flex items-center gap-1.5">
                    <span>{player.flag}</span>
                    <span>{player.nationality}</span>
                  </span>
                                }
                            />
                            <InfoCell label="Birthplace" value={player.birthplace} />
                            <InfoCell label="Foot" value={player.foot} />
                            <InfoCell label="Agent" value={player.agent} />
                            <InfoCell label="Club" value={player.currentClub} />
                            <InfoCell label="Since" value={player.teamSince} />
                            <InfoCell label="Registered" value={player.registeredAt} />
                            <InfoCell label="Last Active" value={player.lastActive} />
                        </div>

                        <div className="mt-5 pt-5 border-t border-[#F1F5F9] flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-bold mr-2">
                Positions:
              </span>
                            {player.positions.map((pos) => (
                                <span
                                    key={pos}
                                    className="inline-flex items-center bg-[#FFF3EB] border border-[#FF6B00] text-[#CC5500] text-xs font-bold px-2.5 py-1 rounded-lg"
                                >
                  {pos}
                </span>
                            ))}
                            <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-bold mx-2 sm:ml-4">
                Modalities:
              </span>
                            {player.modalities.map((mod) => (
                                <span
                                    key={mod}
                                    className="inline-flex items-center bg-[#F1F5F9] text-[#475569] text-xs font-medium px-2.5 py-1 rounded-lg"
                                >
                  {mod}
                </span>
                            ))}
                        </div>
                    </div>

                    {/* ━━━ FOOTBALL DETAILS CARD ━━━ */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                        <div className="bg-[#F8FAFC] px-6 py-3 border-b border-[#E2E8F0]">
                            <h2 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold">
                                Football Details
                            </h2>
                        </div>
                        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold block mb-3">
                  Positions
                </span>
                                <div className="flex flex-wrap gap-2">
                                    {player.positions.map((pos) => (
                                        <span
                                            key={pos}
                                            className="inline-flex items-center bg-[#FFF3EB] border border-[#FF6B00] text-[#CC5500] text-xs font-bold px-2.5 py-1 rounded-lg"
                                        >
                      {pos}
                    </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold block mb-3">
                  Modalities
                </span>
                                <div className="flex flex-wrap gap-2">
                                    {player.modalities.map((mod) => (
                                        <span
                                            key={mod}
                                            className="inline-flex items-center bg-[#F1F5F9] text-[#475569] text-xs font-medium px-2.5 py-1 rounded-lg"
                                        >
                      {mod}
                    </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold block mb-3">
                  Pitch Position · {player.foot} Foot
                </span>
                                {/* Simplified pitch SVG top-down */}
                                <svg
                                    viewBox="0 0 120 80"
                                    className="w-[120px] h-[80px] rounded-md"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect width="120" height="80" fill="#1a3a1a" />
                                    <line x1="60" y1="0" x2="60" y2="80" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
                                    <circle cx="60" cy="40" r="8" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
                                    <rect x="0" y="20" width="12" height="40" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
                                    <rect x="108" y="20" width="12" height="40" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
                                    {/* ST zone — central forward */}
                                    <circle cx="100" cy="40" r="5" fill="#FF6B00" />
                                    <text x="100" y="42" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">
                                        ST
                                    </text>
                                    {/* LW zone */}
                                    <circle cx="92" cy="18" r="5" fill="#FF6B00" />
                                    <text x="92" y="20" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">
                                        LW
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* ━━━ VIDEO CARD ━━━ */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                        <div className="bg-[#F8FAFC] px-6 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
                            <h2 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold">
                                Highlight Video
                            </h2>
                            <Link
                                href={route('admin.players.edit', player.id)}
                                className="text-[#FF6B00] text-xs font-semibold hover:underline cursor-pointer"
                            >
                                Edit URL
                            </Link>
                        </div>
                        <div className="bg-[#0F172A] aspect-video relative">
                            <iframe
                                src={player.videoUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={`${player.name} highlights`}
                            />
                            <div className="absolute bottom-3 left-4 pointer-events-none">
                <span className="font-display font-black text-white text-xl tracking-tight drop-shadow-lg">
                  {player.name}
                </span>
                            </div>
                            <div className="absolute top-3 right-3 pointer-events-none">
                                <Video className="w-4 h-4 text-white/60" />
                            </div>
                        </div>
                        <div className="px-6 py-3 border-t border-[#F1F5F9]">
                            <p className="font-mono text-xs text-[#475569] truncate">
                                {player.videoUrl}
                            </p>
                        </div>
                    </div>

                    {/* ━━━ CLUB HISTORY CARD ━━━ */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                        <div className="bg-[#F8FAFC] px-6 py-3 border-b border-[#E2E8F0]">
                            <h2 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold">
                                Club History
                            </h2>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                    <TableHead className="text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold w-32 px-6">
                                        Year
                                    </TableHead>
                                    <TableHead className="text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold px-6">
                                        Club
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {player.clubHistory.map((entry, idx) => (
                                    <TableRow
                                        key={entry.year}
                                        className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] ${
                                            idx === player.clubHistory.length - 1 ? 'border-b-0' : ''
                                        }`}
                                    >
                                        <TableCell className="font-mono text-[#0F172A] font-semibold text-sm px-6 py-3">
                                            {entry.year}
                                        </TableCell>
                                        <TableCell
                                            className={`text-sm px-6 py-3 ${
                                                entry.club ? 'text-[#0F172A]' : 'text-[#94A3B8]'
                                            }`}
                                        >
                                            {entry.club || '—'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* ━━━ DESCRIPTION CARD ━━━ */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                        <h2 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold mb-3">
                            Player Description
                        </h2>
                        <p className="text-sm text-[#475569] leading-relaxed">
                            {player.description}
                        </p>
                    </div>

                    {/* ━━━ SCOUT RATINGS CARD ━━━ */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                        <div className="bg-[#F8FAFC] px-6 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
                            <h2 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold">
                                Scout Ratings
                            </h2>
                            <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />
                                <span className="text-sm font-semibold text-[#0F172A]">
                  {player.avgRating.toFixed(1)} avg
                </span>
                                <span className="text-xs text-[#94A3B8]">
                  from {player.scoutRatingsCount} ratings
                </span>
                            </div>
                        </div>

                        {/* Summary row */}
                        <div className="bg-[#F8FAFC] px-6 py-4 border-b border-[#E2E8F0] grid grid-cols-4 text-center">
                            <div>
                                <div className="font-mono font-bold text-xl text-[#FF6B00]">
                                    {summaryAverages.technical.toFixed(1)}
                                </div>
                                <div className="text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold mt-1">
                                    Technical
                                </div>
                            </div>
                            <div>
                                <div className="font-mono font-bold text-xl text-[#FF6B00]">
                                    {summaryAverages.physical.toFixed(1)}
                                </div>
                                <div className="text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold mt-1">
                                    Physical
                                </div>
                            </div>
                            <div>
                                <div className="font-mono font-bold text-xl text-[#FF6B00]">
                                    {summaryAverages.mental.toFixed(1)}
                                </div>
                                <div className="text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold mt-1">
                                    Mental
                                </div>
                            </div>
                            <div>
                                <div className="font-mono font-bold text-xl text-[#FF6B00]">
                                    {summaryAverages.overall.toFixed(1)}
                                </div>
                                <div className="text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold mt-1">
                                    Overall
                                </div>
                            </div>
                        </div>

                        {/* Rating rows */}
                        <div>
                            {player.ratings.map((rating, idx) => (
                                <div
                                    key={rating.id}
                                    className={`px-6 py-4 ${
                                        idx !== player.ratings.length - 1
                                            ? 'border-b border-[#F1F5F9]'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <Avatar className="w-10 h-10 shrink-0">
                                            <AvatarFallback className="bg-orange-50 text-[#FF6B00] font-bold text-xs">
                                                {rating.scout
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-[#0F172A]">
                          {rating.scout}
                        </span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge
                                                    variant="outline"
                                                    className="text-[10px] uppercase tracking-wide font-bold px-2 py-0 h-5 border-[#E2E8F0] text-[#475569] bg-[#F8FAFC]"
                                                >
                                                    {rating.role}
                                                </Badge>
                                                <span className="text-xs text-[#475569] inline-flex items-center gap-1">
                          <span>{rating.flag}</span>
                          <span>{rating.country}</span>
                        </span>
                                            </div>
                                            <div className="text-xs text-[#94A3B8] mt-1 font-mono">
                                                {rating.date}
                                            </div>
                                        </div>

                                        <div className="hidden sm:flex flex-col gap-1.5 shrink-0">
                                            <StarRow value={rating.technical} label="Tech" />
                                            <StarRow value={rating.physical} label="Phys" />
                                            <StarRow value={rating.mental} label="Mental" />
                                            <StarRow value={rating.overall} label="Overall" />
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] shrink-0 w-8 h-8"
                                                >
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-xl">
                                                <DropdownMenuItem className="text-sm cursor-pointer">
                                                    View Full
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-sm text-red-600 focus:text-red-700 cursor-pointer">
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Mobile stars */}
                                    <div className="sm:hidden grid grid-cols-2 gap-2 mt-3 pl-14">
                                        <StarRow value={rating.technical} label="Tech" />
                                        <StarRow value={rating.physical} label="Phys" />
                                        <StarRow value={rating.mental} label="Mental" />
                                        <StarRow value={rating.overall} label="Overall" />
                                    </div>

                                    {rating.notes && (
                                        <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-lg px-3 py-2 text-xs text-[#475569] italic mt-3">
                                            "{rating.notes}"
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ━━━ RIGHT COLUMN ━━━ */}
                <aside className="space-y-4 min-w-0">
                    {/* ▶ QUICK STATS */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
                        <h3 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold mb-3">
                            Analytics Overview
                        </h3>
                        <div className="divide-y divide-[#F1F5F9]">
                            <div className="py-3 flex items-center justify-between first:pt-0">
                <span className="text-sm text-[#475569] inline-flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-[#94A3B8]" />
                  Profile Views
                </span>
                                <span className="font-mono font-bold text-[#FF6B00] text-sm">
                  {player.profileViews.toLocaleString()}
                </span>
                            </div>
                            <div className="py-3 flex items-center justify-between">
                <span className="text-sm text-[#475569] inline-flex items-center gap-2">
                  <Globe2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                  Countries Reached
                </span>
                                <span className="font-mono font-bold text-[#FF6B00] text-sm">
                  {player.countriesReached}
                </span>
                            </div>
                            <div className="py-3 flex items-center justify-between">
                <span className="text-sm text-[#475569] inline-flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#94A3B8]" />
                  Scout Ratings
                </span>
                                <span className="font-mono font-bold text-[#FF6B00] text-sm">
                  {player.scoutRatingsCount}
                </span>
                            </div>
                            <div className="py-3 flex items-center justify-between last:pb-0">
                <span className="text-sm text-[#475569] inline-flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-[#94A3B8]" />
                  Average Rating
                </span>
                                <span className="font-mono font-bold text-[#FF6B00] text-sm inline-flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#FF6B00] text-[#FF6B00]" />
                                    {player.avgRating.toFixed(1)}
                </span>
                            </div>
                        </div>
                    </div>

                    {/* ▶ VIEW BY COUNTRY */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
                        <h3 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold mb-4">
                            Views by Country
                        </h3>
                        <div className="space-y-2.5">
                            {player.viewsByCountry.map((entry) => {
                                const pct = (entry.count / maxCountryViews) * 100;
                                return (
                                    <div key={entry.country}>
                                        <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#0F172A] font-medium">
                        {entry.country}
                      </span>
                                            <span className="font-mono font-bold text-[#FF6B00] text-xs">
                        {entry.count}
                      </span>
                                        </div>
                                        <div className="h-1.5 bg-[#FFF3EB] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#FF6B00] rounded-full transition-all"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Separator className="my-4 bg-[#F1F5F9]" />

                        <div className="h-[140px] -mx-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={player.viewsByCountry}
                                    layout="vertical"
                                    margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
                                >
                                    <XAxis type="number" hide />
                                    <YAxis
                                        type="category"
                                        dataKey="country"
                                        tick={{ fontSize: 10, fill: '#94A3B8' }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={60}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#FFF3EB' }}
                                        contentStyle={{
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                        }}
                                    />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                        {player.viewsByCountry.map((_, idx) => (
                                            <Cell key={idx} fill="#FF6B00" />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ▶ RECENT VIEWS */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
                        <h3 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold mb-3">
                            Recent Views
                        </h3>
                        <div className="space-y-3">
                            {player.recentViews.map((view) => (
                                <div key={view.id} className="flex items-center gap-3">
                                    <Avatar className="w-9 h-9 shrink-0">
                                        <AvatarFallback className="bg-[#F1F5F9] text-[#475569] font-bold text-[10px]">
                                            {view.viewer
                                                .split(' ')
                                                .slice(0, 2)
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-[#0F172A] truncate">
                                            {view.viewer}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <Badge
                                                variant="outline"
                                                className="text-[9px] uppercase tracking-wide font-bold px-1.5 py-0 h-4 border-[#E2E8F0] text-[#475569] bg-[#F8FAFC]"
                                            >
                                                {view.role}
                                            </Badge>
                                            <span className="text-xs text-[#94A3B8]">
                        {view.flag} · {view.time}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ▶ SUBSCRIPTION */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
                        <h3 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold mb-3">
                            Subscription
                        </h3>
                        <div className="flex items-center justify-between mb-3">
                            <Badge className="bg-[#FF6B00] text-white hover:bg-[#FF6B00] text-xs uppercase tracking-wide font-bold px-2.5 py-1 rounded-md">
                                Premium
                            </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[#94A3B8]">Renews</span>
                                <span className="text-[#475569] font-mono">{player.subscriptionRenews}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#94A3B8]">Joined</span>
                                <span className="text-[#475569] font-mono">{player.registeredAt}</span>
                            </div>
                        </div>

                        <Separator className="my-4 bg-[#F1F5F9]" />

                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] text-sm justify-center"
                            >
                                Change Plan
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 text-sm justify-center"
                            >
                                Revoke Subscription
                            </Button>
                        </div>
                    </div>

                    {/* ▶ ADMIN NOTES */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
                        <h3 className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold mb-3">
                            Admin Notes
                        </h3>
                        <textarea
                            value={adminNote}
                            onChange={(e) => setAdminNote(e.target.value)}
                            placeholder="Add internal notes about this player..."
                            className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl w-full h-24 text-sm px-3 py-2 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 resize-none"
                        />
                        <Button
                            onClick={handleSaveNote}
                            className="bg-[#FF6B00] text-white hover:bg-[#CC5500] text-sm w-full mt-3 font-semibold"
                        >
                            Save Note
                        </Button>
                    </div>

                    {/* ▶ DANGER ZONE */}
                    <div className="bg-white border border-red-100 rounded-2xl p-5">
                        <h3 className="text-red-600 text-[10px] uppercase tracking-widest font-bold mb-3">
                            Danger Zone
                        </h3>
                        <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:text-amber-800 text-sm w-full rounded-xl py-2 justify-center font-semibold"
                                >
                                    <Ban className="w-4 h-4 mr-2" />
                                    Suspend Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-2xl">
                                <DialogHeader>
                                    <DialogTitle className="font-display text-xl text-[#0F172A]">
                                        Suspend this profile?
                                    </DialogTitle>
                                    <DialogDescription className="text-sm text-[#475569]">
                                        {player.name}'s profile will be hidden from public discovery
                                        and search results. Scouts and agents will not be able to
                                        view or contact this player. You can reactivate at any time.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setSuspendDialogOpen(false)}
                                        className="border-[#E2E8F0] text-[#475569]"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSuspend}
                                        className="bg-amber-600 text-white hover:bg-amber-700"
                                    >
                                        Suspend Profile
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:text-red-700 text-sm w-full rounded-xl py-2 mt-2 justify-center font-semibold"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Player
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-2xl">
                                <DialogHeader>
                                    <DialogTitle className="font-display text-xl text-[#0F172A]">
                                        Delete {player.name}?
                                    </DialogTitle>
                                    <DialogDescription className="text-sm text-[#475569]">
                                        This action is permanent. All profile data, scout ratings,
                                        view history, and subscription records will be permanently
                                        deleted. This cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setDeleteDialogOpen(false)}
                                        className="border-[#E2E8F0] text-[#475569]"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleDelete}
                                        className="bg-red-600 text-white hover:bg-red-700"
                                    >
                                        Delete Permanently
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </aside>
            </div>
        </AdminLayout>
    );
}
