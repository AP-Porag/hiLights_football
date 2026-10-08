import AdminLayout from '@/components/admin/AdminLayout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    BadgeCheck,
    Ban,
    CheckCircle2,
    ChevronDown,
    Edit,
    ExternalLink,
    Eye,
    Globe2,
    MoreHorizontal,
    Star,
    Trash2,
    Users,
    Video,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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
            <span className="w-16 text-[0.5625rem] font-medium tracking-widest text-[#94A3B8] uppercase">{label}</span>
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                        key={i}
                        className={`h-3 w-3 ${i <= value ? 'fill-[#E53F01] text-[#E53F01]' : 'fill-transparent text-[#E2E8F0]'}`}
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
            <span className="text-xs font-medium tracking-wide text-[#94A3B8] uppercase">{label}</span>
            <span className="text-sm font-medium text-[#0F172A]">{value}</span>
        </div>
    );
}

export default function PlayerDetail() {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
    const [adminNote, setAdminNote] = useState('');
    // Root font-size in px (16 by default, larger on big screens) so chart axis width scales with the rem layout
    const [rootFontPx, setRootFontPx] = useState(16);

    useEffect(() => {
        const update = () => setRootFontPx(parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

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
        <AdminLayout pageTitle="Player Football Identity — Benjamin Silva">
            {/* ━━━ TOP ACTION BAR ━━━ */}
            <div className="-mx-4 -mt-4 mb-6 border-b border-[#E2E8F0] bg-white px-4 py-4 sm:-mx-6 sm:-mt-6 sm:px-6 lg:-mx-8 lg:-mt-8 lg:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link href={route('admin.players')}>
                        <Button variant="ghost" className="-ml-2 gap-2 text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-sm font-medium">Back to Players</span>
                        </Button>
                    </Link>

                    <div className="flex flex-wrap items-center gap-2">
                        <a href={route('player.profile.show', player.id)} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="gap-2 border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]">
                                <ExternalLink className="h-4 w-4" />
                                <span className="text-sm">View Public Football Identity</span>
                            </Button>
                        </a>

                        <Link href={route('admin.players.edit', player.id)}>
                            <Button variant="outline" className="gap-2 border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]">
                                <Edit className="h-4 w-4" />
                                <span className="text-sm">Edit Football Identity</span>
                            </Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`gap-2 ${player.status === 'active'
                                        ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800'
                                        : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800'
                                        }`}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                    <span className="text-sm font-semibold tracking-wide uppercase">{player.status}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52 rounded-xl">
                                <DropdownMenuItem onClick={() => handleStatusChange('active')} className="cursor-pointer gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">Set Active</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSuspendDialogOpen(true)} className="cursor-pointer gap-2">
                                    <Ban className="h-4 w-4 text-amber-600" />
                                    <span className="text-sm">Suspend Football Identity</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setDeleteDialogOpen(true)}
                                    className="cursor-pointer gap-2 text-red-600 focus:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="text-sm">Delete Football Identity</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* ━━━ LAYOUT ━━━ */}
            <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
                {/* ━━━ LEFT COLUMN ━━━ */}
                <div className="min-w-0 space-y-5">
                    {/* ▶ IDENTITY CARD */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                            <span className="text-[0.625rem] font-bold tracking-[0.14em] text-[#E53F01] uppercase">Player Football Identity</span>
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-[0.625rem] font-bold tracking-wide text-green-700 uppercase hover:bg-green-50">
                                    Active
                                </Badge>
                                <Badge className="rounded-md bg-[#E53F01] px-2 py-0.5 text-[0.625rem] font-bold tracking-wide text-white uppercase hover:bg-[#E53F01]">
                                    Premium
                                </Badge>
                                {player.isFeatured && (
                                    <Badge className="gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[0.625rem] font-bold tracking-wide text-amber-700 uppercase hover:bg-amber-50">
                                        Featured <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6">
                            {/* Photo */}
                            <div className="relative shrink-0">
                                <div className="font-display flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#334155] text-2xl font-black text-white sm:h-24 sm:w-24 sm:text-3xl">
                                    BS
                                </div>
                                <span className="absolute -top-2 -right-2 rounded-full bg-[#E53F01] px-2 py-0.5 text-[0.5625rem] font-black text-white">
                                    PRO
                                </span>
                                {player.isVerified && (
                                    <BadgeCheck className="absolute -right-2 -bottom-2 h-5 w-5 rounded-full bg-white text-[#E53F01]" />
                                )}
                            </div>

                            {/* Info */}
                            <div className="min-w-0">
                                <h1 className="font-display text-2xl leading-none font-black tracking-tight text-[#0F172A]">{player.name}</h1>
                                <div className="mt-1 flex items-center gap-2">
                                    <span className="font-mono text-xs text-[#94A3B8]">{player.profileId}</span>
                                    <span className="text-xs text-[#94A3B8]">·</span>
                                    <span className="text-xs text-[#475569]">"{player.nickname}"</span>
                                </div>

                                {player.isMinor && (
                                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-700">
                                        <AlertTriangle className="h-3 w-3" />
                                        <span className="font-medium">Under 18 — Guardian: {player.guardian}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#F1F5F9] pt-5 sm:grid-cols-4">
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

                        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#F1F5F9] pt-5">
                            <span className="mr-2 text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Positions:</span>
                            {player.positions.map((pos) => (
                                <span
                                    key={pos}
                                    className="inline-flex items-center rounded-lg border border-[#E53F01] bg-[#FFF3EB] px-2.5 py-1 text-xs font-bold text-[#E53F01]"
                                >
                                    {pos}
                                </span>
                            ))}
                            <span className="mx-2 text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase sm:ml-4">Modalities:</span>
                            {player.modalities.map((mod) => (
                                <span
                                    key={mod}
                                    className="inline-flex items-center rounded-lg bg-[#F1F5F9] px-2.5 py-1 text-xs font-medium text-[#475569]"
                                >
                                    {mod}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ━━━ FOOTBALL DETAILS CARD ━━━ */}
                    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
                        <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-3">
                            <h2 className="text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Football Details</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6 px-6 py-5 sm:grid-cols-3">
                            <div>
                                <span className="mb-3 block text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Positions</span>
                                <div className="flex flex-wrap gap-2">
                                    {player.positions.map((pos) => (
                                        <span
                                            key={pos}
                                            className="inline-flex items-center rounded-lg border border-[#E53F01] bg-[#FFF3EB] px-2.5 py-1 text-xs font-bold text-[#E53F01]"
                                        >
                                            {pos}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="mb-3 block text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Modalities</span>
                                <div className="flex flex-wrap gap-2">
                                    {player.modalities.map((mod) => (
                                        <span
                                            key={mod}
                                            className="inline-flex items-center rounded-lg bg-[#F1F5F9] px-2.5 py-1 text-xs font-medium text-[#475569]"
                                        >
                                            {mod}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="mb-3 block text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">
                                    Pitch Position · {player.foot} Foot
                                </span>
                                {/* Simplified pitch SVG top-down */}
                                <svg viewBox="0 0 120 80" className="h-[5rem] w-[7.5rem] rounded-md" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="120" height="80" fill="#1a3a1a" />
                                    <line x1="60" y1="0" x2="60" y2="80" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
                                    <circle cx="60" cy="40" r="8" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
                                    <rect x="0" y="20" width="12" height="40" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
                                    <rect x="108" y="20" width="12" height="40" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
                                    {/* ST zone — central forward */}
                                    <circle cx="100" cy="40" r="5" fill="#E53F01" />
                                    <text x="100" y="42" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">
                                        ST
                                    </text>
                                    {/* LW zone */}
                                    <circle cx="92" cy="18" r="5" fill="#E53F01" />
                                    <text x="92" y="20" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">
                                        LW
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* ━━━ VIDEO CARD ━━━ */}
                    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-3">
                            <h2 className="text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Highlight Video</h2>
                            <Link
                                href={route('admin.players.edit', player.id)}
                                className="cursor-pointer text-xs font-semibold text-[#E53F01] hover:underline"
                            >
                                Edit URL
                            </Link>
                        </div>
                        <div className="relative aspect-video bg-[#0F172A]">
                            <iframe
                                src={player.videoUrl}
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={`${player.name} highlights`}
                            />
                            <div className="pointer-events-none absolute bottom-3 left-4">
                                <span className="font-display text-xl font-black tracking-tight text-white drop-shadow-lg">{player.name}</span>
                            </div>
                            <div className="pointer-events-none absolute top-3 right-3">
                                <Video className="h-4 w-4 text-white/60" />
                            </div>
                        </div>
                        <div className="border-t border-[#F1F5F9] px-6 py-3">
                            <p className="truncate font-mono text-xs text-[#475569]">{player.videoUrl}</p>
                        </div>
                    </div>

                    {/* ━━━ CLUB HISTORY CARD ━━━ */}
                    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
                        <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-3">
                            <h2 className="text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Club History</h2>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F8FAFC]">
                                    <TableHead className="w-32 px-6 text-[0.5625rem] font-bold tracking-widest text-[#94A3B8] uppercase">
                                        Year
                                    </TableHead>
                                    <TableHead className="px-6 text-[0.5625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Club</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {player.clubHistory.map((entry, idx) => (
                                    <TableRow
                                        key={entry.year}
                                        className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] ${idx === player.clubHistory.length - 1 ? 'border-b-0' : ''
                                            }`}
                                    >
                                        <TableCell className="px-6 py-3 font-mono text-sm font-semibold text-[#0F172A]">{entry.year}</TableCell>
                                        <TableCell className={`px-6 py-3 text-sm ${entry.club ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}>
                                            {entry.club || '—'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* ━━━ DESCRIPTION CARD ━━━ */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                        <h2 className="mb-3 text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Player Description</h2>
                        <p className="text-sm leading-relaxed text-[#475569]">{player.description}</p>
                    </div>

                    {/* ━━━ SCOUT RATINGS CARD ━━━ */}
                    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-3">
                            <h2 className="text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Scout Ratings</h2>
                            <div className="flex items-center gap-1.5">
                                <Star className="h-4 w-4 fill-[#E53F01] text-[#E53F01]" />
                                <span className="text-sm font-semibold text-[#0F172A]">{player.avgRating.toFixed(1)} avg</span>
                                <span className="text-xs text-[#94A3B8]">from {player.scoutRatingsCount} ratings</span>
                            </div>
                        </div>

                        {/* Summary row */}
                        <div className="grid grid-cols-4 border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4 text-center">
                            <div>
                                <div className="font-mono text-xl font-bold text-[#E53F01]">{summaryAverages.technical.toFixed(1)}</div>
                                <div className="mt-1 text-[0.5625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Technical</div>
                            </div>
                            <div>
                                <div className="font-mono text-xl font-bold text-[#E53F01]">{summaryAverages.physical.toFixed(1)}</div>
                                <div className="mt-1 text-[0.5625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Physical</div>
                            </div>
                            <div>
                                <div className="font-mono text-xl font-bold text-[#E53F01]">{summaryAverages.mental.toFixed(1)}</div>
                                <div className="mt-1 text-[0.5625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Mental</div>
                            </div>
                            <div>
                                <div className="font-mono text-xl font-bold text-[#E53F01]">{summaryAverages.overall.toFixed(1)}</div>
                                <div className="mt-1 text-[0.5625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Overall</div>
                            </div>
                        </div>

                        {/* Rating rows */}
                        <div>
                            {player.ratings.map((rating, idx) => (
                                <div key={rating.id} className={`px-6 py-4 ${idx !== player.ratings.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-10 w-10 shrink-0">
                                            <AvatarFallback className="bg-orange-50 text-xs font-bold text-[#E53F01]">
                                                {rating.scout
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-sm font-semibold text-[#0F172A]">{rating.scout}</span>
                                            </div>
                                            <div className="mt-1 flex items-center gap-2">
                                                <Badge
                                                    variant="outline"
                                                    className="h-5 border-[#E2E8F0] bg-[#F8FAFC] px-2 py-0 text-[0.625rem] font-bold tracking-wide text-[#475569] uppercase"
                                                >
                                                    {rating.role}
                                                </Badge>
                                                <span className="inline-flex items-center gap-1 text-xs text-[#475569]">
                                                    <span>{rating.flag}</span>
                                                    <span>{rating.country}</span>
                                                </span>
                                            </div>
                                            <div className="mt-1 font-mono text-xs text-[#94A3B8]">{rating.date}</div>
                                        </div>

                                        <div className="hidden shrink-0 flex-col gap-1.5 sm:flex">
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
                                                    className="h-8 w-8 shrink-0 text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-xl">
                                                <DropdownMenuItem className="cursor-pointer text-sm">View Full</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer text-sm text-red-600 focus:text-red-700">
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Mobile stars */}
                                    <div className="mt-3 grid grid-cols-2 gap-2 pl-14 sm:hidden">
                                        <StarRow value={rating.technical} label="Tech" />
                                        <StarRow value={rating.physical} label="Phys" />
                                        <StarRow value={rating.mental} label="Mental" />
                                        <StarRow value={rating.overall} label="Overall" />
                                    </div>

                                    {rating.notes && (
                                        <div className="mt-3 rounded-lg border border-[#F1F5F9] bg-[#F8FAFC] px-3 py-2 text-xs text-[#475569] italic">
                                            "{rating.notes}"
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ━━━ RIGHT COLUMN ━━━ */}
                <aside className="min-w-0 space-y-4">
                    {/* ▶ QUICK STATS */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
                        <h3 className="mb-3 text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Analytics Overview</h3>
                        <div className="divide-y divide-[#F1F5F9]">
                            <div className="flex items-center justify-between py-3 first:pt-0">
                                <span className="inline-flex items-center gap-2 text-sm text-[#475569]">
                                    <Eye className="h-3.5 w-3.5 text-[#94A3B8]" />
                                    Football Identity Views
                                </span>
                                <span className="font-mono text-sm font-bold text-[#E53F01]">{player.profileViews.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span className="inline-flex items-center gap-2 text-sm text-[#475569]">
                                    <Globe2 className="h-3.5 w-3.5 text-[#94A3B8]" />
                                    Countries Reached
                                </span>
                                <span className="font-mono text-sm font-bold text-[#E53F01]">{player.countriesReached}</span>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span className="inline-flex items-center gap-2 text-sm text-[#475569]">
                                    <Users className="h-3.5 w-3.5 text-[#94A3B8]" />
                                    Scout Ratings
                                </span>
                                <span className="font-mono text-sm font-bold text-[#E53F01]">{player.scoutRatingsCount}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 last:pb-0">
                                <span className="inline-flex items-center gap-2 text-sm text-[#475569]">
                                    <Star className="h-3.5 w-3.5 text-[#94A3B8]" />
                                    Average Rating
                                </span>
                                <span className="inline-flex items-center gap-1 font-mono text-sm font-bold text-[#E53F01]">
                                    <Star className="h-3 w-3 fill-[#E53F01] text-[#E53F01]" />
                                    {player.avgRating.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ▶ VIEW BY COUNTRY */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
                        <h3 className="mb-4 text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Views by Country</h3>
                        <div className="space-y-2.5">
                            {player.viewsByCountry.map((entry) => {
                                const pct = (entry.count / maxCountryViews) * 100;
                                return (
                                    <div key={entry.country}>
                                        <div className="mb-1 flex items-center justify-between">
                                            <span className="text-xs font-medium text-[#0F172A]">{entry.country}</span>
                                            <span className="font-mono text-xs font-bold text-[#E53F01]">{entry.count}</span>
                                        </div>
                                        <div className="h-1.5 overflow-hidden rounded-full bg-[#FFF3EB]">
                                            <div className="h-full rounded-full bg-[#E53F01] transition-all" style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Separator className="my-4 bg-[#F1F5F9]" />

                        <div className="-mx-2 h-[8.75rem]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={player.viewsByCountry} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                                    <XAxis type="number" hide />
                                    <YAxis
                                        type="category"
                                        dataKey="country"
                                        tick={{ fontSize: '0.625rem', fill: '#94A3B8' }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={(60 * rootFontPx) / 16}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#FFF3EB' }}
                                        contentStyle={{
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                        }}
                                    />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                        {player.viewsByCountry.map((_, idx) => (
                                            <Cell key={idx} fill="#E53F01" />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ▶ RECENT VIEWS */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
                        <h3 className="mb-3 text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Recent Views</h3>
                        <div className="space-y-3">
                            {player.recentViews.map((view) => (
                                <div key={view.id} className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 shrink-0">
                                        <AvatarFallback className="bg-[#F1F5F9] text-[0.625rem] font-bold text-[#475569]">
                                            {view.viewer
                                                .split(' ')
                                                .slice(0, 2)
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-sm font-medium text-[#0F172A]">{view.viewer}</div>
                                        <div className="mt-0.5 flex items-center gap-1.5">
                                            <Badge
                                                variant="outline"
                                                className="h-4 border-[#E2E8F0] bg-[#F8FAFC] px-1.5 py-0 text-[0.5625rem] font-bold tracking-wide text-[#475569] uppercase"
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
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
                        <h3 className="mb-3 text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Subscription</h3>
                        <div className="mb-3 flex items-center justify-between">
                            <Badge className="rounded-md bg-[#E53F01] px-2.5 py-1 text-xs font-bold tracking-wide text-white uppercase hover:bg-[#E53F01]">
                                Premium
                            </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[#94A3B8]">Renews</span>
                                <span className="font-mono text-[#475569]">{player.subscriptionRenews}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#94A3B8]">Joined</span>
                                <span className="font-mono text-[#475569]">{player.registeredAt}</span>
                            </div>
                        </div>

                        <Separator className="my-4 bg-[#F1F5F9]" />

                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-center border-[#E2E8F0] text-sm text-[#475569] hover:bg-[#F8FAFC]">
                                Change Plan
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-center border-red-200 text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                                Revoke Subscription
                            </Button>
                        </div>
                    </div>

                    {/* ▶ ADMIN NOTES */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
                        <h3 className="mb-3 text-[0.625rem] font-bold tracking-widest text-[#94A3B8] uppercase">Admin Notes</h3>
                        <textarea
                            value={adminNote}
                            onChange={(e) => setAdminNote(e.target.value)}
                            placeholder="Add internal notes about this player..."
                            className="h-24 w-full resize-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#E53F01] focus:ring-2 focus:ring-orange-100 focus:outline-none"
                        />
                        <Button onClick={handleSaveNote} className="mt-3 w-full bg-[#E53F01] text-sm font-semibold text-white hover:bg-[#E53F01]">
                            Save Note
                        </Button>
                    </div>

                    {/* ▶ DANGER ZONE */}
                    <div className="rounded-2xl border border-red-100 bg-white p-5">
                        <h3 className="mb-3 text-[0.625rem] font-bold tracking-widest text-red-600 uppercase">Danger Zone</h3>
                        <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-center rounded-xl border border-amber-200 bg-amber-50 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                                >
                                    <Ban className="mr-2 h-4 w-4" />
                                    Suspend Football Identity
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-2xl">
                                <DialogHeader>
                                    <DialogTitle className="font-display text-xl text-[#0F172A]">Suspend this football identity?</DialogTitle>
                                    <DialogDescription className="text-sm text-[#475569]">
                                        {player.name}'s football identity will be hidden from public discovery and search results. Scouts and agents
                                        will not be able to view or contact this player. You can reactivate at any time.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                                    <Button variant="outline" onClick={() => setSuspendDialogOpen(false)} className="border-[#E2E8F0] text-[#475569]">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSuspend} className="bg-amber-600 text-white hover:bg-amber-700">
                                        Suspend football identity
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="mt-2 w-full justify-center rounded-xl border border-red-200 bg-red-50 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 hover:text-red-700"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Player
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-2xl">
                                <DialogHeader>
                                    <DialogTitle className="font-display text-xl text-[#0F172A]">Delete {player.name}?</DialogTitle>
                                    <DialogDescription className="text-sm text-[#475569]">
                                        This action is permanent. All football identity data, scout ratings, view history, and subscription records
                                        will be permanently deleted. This cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                                    <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="border-[#E2E8F0] text-[#475569]">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700">
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
