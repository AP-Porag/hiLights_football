import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {
    AlertTriangle, ArrowLeft, Ban, BadgeCheck, CheckCircle2, Eye, Footprints, Globe2, Mail,
    MapPin, Phone, Ruler, Shield, Star, Trash2, Trophy, Users, Video, Weight,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// ── Types ──
interface Player {
    id: number;
    playerId: string;
    slug: string | null;
    name: string;
    nickname: string | null;
    avatar: string;
    status: 'Published' | 'Draft' | 'Suspended';
    featured: boolean;
    subscription: 'Free' | 'Pro' | 'Elite';
    views: number;
    registeredAt: string | null;
    updatedAt: string | null;

    email: string | null;
    emailVerifiedAt: string | null;
    phone: string | null;
    phoneVerifiedAt: string | null;

    dob: string | null;
    birthYear: number | null;
    age: number | null;
    gender: string | null;
    nationality: string[];
    nationalityNames: string[];
    birthCity: string | null;
    birthCountry: string | null;
    guardianName: string | null;
    agent: string | null;

    modality: string | null;
    positions: string[];
    foot: string | null;
    height: number | null;
    weight: number | null;
    currentClub: string | null;
    currentClubCountry: string | null;
    inTeamSince: string | null;
    marketValue: string | null;
    description: string | null;

    supportedClub: string | null;
    dreamClub: string | null;
    bootBrands: string[];
    bootBrandOther: string | null;
    bootsPerYear: string | null;
    bootPriceRange: string | null;

    videoUrl: string | null;
    videos: unknown[];
    clubHistory: unknown[];
    transferHistory: unknown[];
    achievements: unknown[];
    competitions: unknown[];
    matches: unknown[];
}

// ── Small helpers ──
const DASH = '—';

function value(v: unknown): string {
    if (v === null || v === undefined || v === '') return DASH;
    if (Array.isArray(v)) return v.length ? v.join(', ') : DASH;
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
}

function label(key: string): string {
    return key
        .replace(/_/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Badges ──
function StatusBadge({ status }: { status: Player['status'] }) {
    const styles: Record<string, string> = {
        Published: 'bg-green-900/30 text-green-400 border-green-700',
        Draft: 'bg-amber-900/30 text-amber-400 border-amber-700',
        Suspended: 'bg-red-900/30 text-red-400 border-red-700',
    };
    return (
        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[0.6875rem] font-medium ${styles[status] ?? styles.Draft}`}>
            {status}
        </span>
    );
}

function SubscriptionBadge({ sub }: { sub: Player['subscription'] }) {
    const styles: Record<string, string> = {
        Free: 'bg-[#1F1F1F] text-[#94A3B8] border-[#2A2A2A]',
        Pro: 'bg-[#2A2A2A] text-[#F5F5F5] border-[#3A3A3A]',
        Elite: 'bg-[rgba(255,107,0,0.12)] text-[#E53F01] border-[#E53F01]',
    };
    return (
        <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider ${styles[sub] ?? styles.Free}`}>
            {sub === 'Elite' && <Star className="h-2.5 w-2.5 fill-current" />}
            {sub}
        </span>
    );
}

// ── Reusable blocks ──
function InfoCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
    return (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#0D0D0D]">
            <div className="flex items-center gap-2 border-b border-[#2A2A2A] px-5 py-4">
                <Icon className="h-4 w-4 text-[#E53F01]" />
                <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F5F5F5]">{title}</h2>
            </div>
            <dl className="divide-y divide-[#1A1A1A]">{children}</dl>
        </div>
    );
}

function Row({ k, v, mono = false }: { k: string; v: React.ReactNode; mono?: boolean }) {
    return (
        <div className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <dt className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">{k}</dt>
            <dd className={`break-words text-sm text-[#F5F5F5] sm:max-w-[60%] sm:text-right ${mono ? 'font-mono' : ''}`}>{v}</dd>
        </div>
    );
}

function StatTile({ label: l, value: v, accent = false }: { label: string; value: string; accent?: boolean }) {
    return (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#0D0D0D] p-4 sm:p-6">
            <div className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">{l}</div>
            <div className={`mt-2 font-mono text-xl font-semibold sm:text-2xl ${accent ? 'text-[#E53F01]' : 'text-[#F5F5F5]'}`}>{v}</div>
        </div>
    );
}

// Generic table — derives its columns from the rows, so any JSON shape renders in full
function JsonTable({ title, icon: Icon, rows }: { title: string; icon: React.ElementType; rows: unknown[] }) {
    const list = Array.isArray(rows) ? rows : [];

    const columns = Array.from(
        new Set(
            list.flatMap((r) => (r && typeof r === 'object' && !Array.isArray(r) ? Object.keys(r as object) : [])),
        ),
    );

    return (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#0D0D0D]">
            <div className="flex items-center justify-between gap-2 border-b border-[#2A2A2A] px-5 py-4">
                <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#E53F01]" />
                    <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F5F5F5]">{title}</h2>
                </div>
                <span className="font-mono text-xs text-[#555555]">{list.length}</span>
            </div>

            {list.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-[#555555]">Nothing added yet.</p>
            ) : columns.length === 0 ? (
                <ul className="divide-y divide-[#1A1A1A]">
                    {list.map((r, i) => (
                        <li key={i} className="break-all px-5 py-3 text-sm text-[#F5F5F5]">{value(r)}</li>
                    ))}
                </ul>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[32rem] text-left">
                        <thead>
                            <tr className="border-b border-[#2A2A2A] bg-[#1A1A1A]">
                                {columns.map((c) => (
                                    <th key={c} className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                                        {label(c)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((r, i) => (
                                <tr key={i} className="border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A]">
                                    {columns.map((c) => (
                                        <td key={c} className="px-5 py-3 text-sm text-[#F5F5F5]">
                                            {value((r as Record<string, unknown>)?.[c])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// ── Main Component ──
export default function PlayerDetail() {
    const { player } = usePage<{ player: Player }>().props;

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [suspending, setSuspending] = useState(false);

    const isSuspended = player.status === 'Suspended';

    const handleSuspend = () => {
        setSuspending(true);
        router.put(route('players.suspend', player.id), {}, {
            preserveScroll: true,
            onSuccess: () => toast.success(isSuspended ? `${player.name} has been activated.` : `${player.name} has been suspended.`),
            onError: () => toast.error('Something went wrong. Please try again.'),
            onFinish: () => setSuspending(false),
        });
    };

    const confirmDelete = () => {
        setDeleting(true);
        router.delete(route('players.destroy', player.id), {
            onSuccess: () => toast.success(`${player.name} has been deleted.`),
            onError: () => toast.error('Could not delete the player. Please try again.'),
            onFinish: () => {
                setDeleting(false);
                setDeleteOpen(false);
            },
        });
    };

    const initials = (player.name || '')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w.charAt(0).toUpperCase())
        .join('');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Players', href: '/admin/players' },
        { title: player.name, href: `/admin/players/${player.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen space-y-6 bg-black p-4 text-white sm:p-6">
                {/* Back */}
                <Link
                    href={route('players.index')}
                    className="inline-flex items-center gap-2 text-sm text-[#94A3B8] transition-colors hover:text-[#E53F01]"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to players
                </Link>

                {/* Header */}
                <div className="rounded-lg border border-[#2A2A2A] bg-[#0D0D0D] p-5 sm:p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            {player.avatar ? (
                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#2A2A2A]">
                                    <img src={player.avatar} alt={player.name} className="h-full w-full object-cover" />
                                </div>
                            ) : (
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#2A1A0F] text-xl font-semibold text-orange-500">
                                    {initials}
                                </div>
                            )}

                            <div className="min-w-0">
                                <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-[#F5F5F5] sm:text-3xl">
                                    {player.name}
                                </h1>
                                {player.nickname && (
                                    <p className="mt-0.5 text-sm text-[#94A3B8]">&ldquo;{player.nickname}&rdquo;</p>
                                )}
                                <p className="mt-1 font-mono text-sm font-semibold text-[#E53F01]">{player.playerId}</p>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    {/* <StatusBadge status={player.status} /> */}
                                    <SubscriptionBadge sub={player.subscription} />
                                    {player.featured && (
                                        <span className="inline-flex items-center gap-1 rounded-md border border-[#E53F01] bg-[rgba(255,107,0,0.12)] px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wider text-[#E53F01]">
                                            <Star className="h-2.5 w-2.5 fill-current" /> Featured
                                        </span>
                                    )}
                                    {player.positions.map((p) => (
                                        <span key={p} className="inline-flex items-center rounded-md border border-[#2A2A2A] bg-[#1A1A1A] px-2 py-0.5 font-mono text-[0.6875rem] font-semibold text-[#F5F5F5]">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2">
                            {player.slug && (
                                <Button
                                    variant="outline"
                                    onClick={() => window.open(`/player/profile/${player.slug}`, '_blank')}
                                    className="h-9 border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#F5F5F5] hover:bg-[#2A2A2A] hover:text-[#F5F5F5]"
                                >
                                    <Eye className="mr-2 h-4 w-4" /> Football Identity
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                disabled={suspending}
                                onClick={handleSuspend}
                                className={`h-9 border-[#2A2A2A] bg-[#1A1A1A] text-xs hover:bg-[#2A2A2A] ${isSuspended ? 'text-green-400 hover:text-green-400' : 'text-amber-400 hover:text-amber-400'}`}
                            >
                                {isSuspended ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Ban className="mr-2 h-4 w-4" />}
                                {suspending ? 'Working...' : isSuspended ? 'Activate' : 'Suspend'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setDeleteOpen(true)}
                                className="h-9 border-[#2A2A2A] bg-[#1A1A1A] text-xs text-red-400 hover:bg-[#2A2A2A] hover:text-red-400"
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatTile label="Profile Views" value={String(player.views)} accent />
                    <StatTile label="Age" value={player.age ? `${player.age}` : DASH} />
                    <StatTile label="Height" value={player.height ? `${player.height} cm` : DASH} />
                    {/* <StatTile label="Weight" value={player.weight ? `${player.weight} kg` : DASH} /> */}
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <InfoCard title="Contact & Account" icon={Mail}>
                        <Row
                            k="Email"
                            v={player.email ? <a href={`mailto:${player.email}`} className="hover:text-[#E53F01]">{player.email}</a> : DASH}
                        />
                        <Row
                            k="Email Verified"
                            v={player.emailVerifiedAt
                                ? <span className="inline-flex items-center gap-1 text-green-400"><BadgeCheck className="h-3.5 w-3.5" /> {player.emailVerifiedAt}</span>
                                : <span className="text-amber-400">Not verified</span>}
                        />
                        <Row
                            k="Phone / WhatsApp"
                            v={player.phone ? <a href={`tel:${player.phone}`} className="font-mono hover:text-[#E53F01]">{player.phone}</a> : DASH}
                        />
                        <Row
                            k="Phone Verified"
                            v={player.phoneVerifiedAt
                                ? <span className="inline-flex items-center gap-1 text-green-400"><BadgeCheck className="h-3.5 w-3.5" /> {player.phoneVerifiedAt}</span>
                                : <span className="text-amber-400">Not verified</span>}
                        />
                        <Row k="Registered" v={value(player.registeredAt)} mono />
                        <Row k="Last Updated" v={value(player.updatedAt)} mono />
                    </InfoCard>

                    <InfoCard title="Personal" icon={Users}>
                        <Row k="Date of Birth" v={value(player.dob)} mono />
                        <Row k="Year of Birth" v={value(player.birthYear)} mono />
                        <Row k="Age" v={player.age ? `${player.age} years` : DASH} />
                        <Row k="Gender" v={value(player.gender)} />
                        <Row k="Nationality" v={player.nationalityNames.length ? player.nationalityNames.join(', ') : value(player.nationality)} />
                        <Row k="Birth City" v={value(player.birthCity)} />
                        <Row k="Birth Country" v={value(player.birthCountry)} />
                        <Row k="Guardian" v={value(player.guardianName)} />
                        <Row k="Agent" v={value(player.agent)} />
                    </InfoCard>

                    <InfoCard title="Football Profile" icon={Shield}>
                        <Row k="Modality" v={value(player.modality)} />
                        <Row k="Positions" v={value(player.positions)} mono />
                        <Row k="Preferred Foot" v={value(player.foot)} />
                        <Row k="Height" v={player.height ? `${player.height} cm` : DASH} mono />
                        {/* <Row k="Weight" v={player.weight ? `${player.weight} kg` : DASH} mono /> */}
                        <Row k="Current Club" v={value(player.currentClub)} />
                        <Row k="Club Country" v={value(player.currentClubCountry)} />
                        <Row k="In Team Since" v={value(player.inTeamSince)} mono />
                        {/* <Row k="Market Value" v={value(player.marketValue)} mono /> */}
                        <Row
                            k="Main Video"
                            v={player.videoUrl
                                ? <a href={player.videoUrl} target="_blank" rel="noreferrer" className="break-all hover:text-[#E53F01]">{player.videoUrl}</a>
                                : DASH}
                        />
                    </InfoCard>

                    <InfoCard title="Player Questionnaire" icon={Footprints}>
                        <Row k="Supported Club" v={value(player.supportedClub)} />
                        <Row k="Dream Club" v={value(player.dreamClub)} />
                        <Row k="Boot Brands" v={value(player.bootBrands)} />
                        {/* <Row k="Other Boot Brand" v={value(player.bootBrandOther)} /> */}
                        <Row k="Boots Per Year" v={value(player.bootsPerYear)} mono />
                        <Row k="Usual Price Range" v={value(player.bootPriceRange)} mono />
                    </InfoCard>
                </div>

                {/* Description */}
                <div className="rounded-lg border border-[#2A2A2A] bg-[#0D0D0D]">
                    <div className="flex items-center gap-2 border-b border-[#2A2A2A] px-5 py-4">
                        <Globe2 className="h-4 w-4 text-[#E53F01]" />
                        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[#F5F5F5]">About The Player</h2>
                    </div>
                    <p className="whitespace-pre-wrap px-5 py-5 text-sm leading-relaxed text-[#94A3B8]">
                        {player.description || 'No description added yet.'}
                    </p>
                </div>

                {/* Data tables */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <JsonTable title="Club History" icon={MapPin} rows={player.clubHistory} />
                    {/* <JsonTable title="Transfer History" icon={Ruler} rows={player.transferHistory} /> */}
                    <JsonTable title="Achievements" icon={Trophy} rows={player.achievements} />
                    <JsonTable title="Competitions" icon={Shield} rows={player.competitions} />
                </div>

                <JsonTable title="Recent Matches" icon={Weight} rows={player.matches} />
                <JsonTable title="Videos" icon={Video} rows={player.videos} />
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={deleteOpen} onOpenChange={(open) => !open && !deleting && setDeleteOpen(false)}>
                <DialogContent className="border border-[#2A2A2A] bg-[#0D0D0D] p-6 text-[#F5F5F5] sm:max-w-md">
                    <DialogHeader>
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/30">
                            <AlertTriangle className="h-6 w-6 text-red-400" />
                        </div>
                        <DialogTitle className="text-lg font-bold text-[#F5F5F5]">Delete player?</DialogTitle>
                        <DialogDescription className="text-sm text-[#94A3B8]">
                            Are you sure you want to delete <span className="font-semibold text-[#F5F5F5]">{player.name}</span>? This football identity will be permanently removed and cannot be recovered.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2 sm:gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={deleting}
                            onClick={() => setDeleteOpen(false)}
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
        </AppLayout>
    );
}
