import ScoutNavbar from '@/components/scout/ScoutNavbar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Bookmark, BookmarkX, ExternalLink, LayoutGrid, List, Play, Star, StickyNote } from 'lucide-react';
import { useState } from 'react';

// ── ইন্টারফেস ──
interface Player {
    id: number;
    name: string;
    nickname: string | null;
    age: number | null;
    dob: string | null;
    nationality: string;
    flag: string;
    currentClub: string;
    positions: string[];
    foot: string;
    height: number | null;
    modalities: string[];
    profileViews: number;
    isPremium: boolean;
    avgRating: number;
    ratingCount: number;
    videoUrl: string;
    photoUrl: string | null;
}

interface SavedPlayer {
    id: number;
    savedAt: string;
    notes: string;
    player: Player;
}

interface PageProps {
    savedPlayers: SavedPlayer[];
}

const filterPills = [
    { id: 'all', label: 'All' },
    { id: 'forwards', label: 'Forwards' },
    { id: 'midfielders', label: 'Midfielders' },
    { id: 'defenders', label: 'Defenders' },
    { id: 'goalkeepers', label: 'Goalkeepers' },
    { id: 'premium', label: 'Premium Only' },
    { id: 'video', label: 'Has Video' },
    { id: 'rating', label: 'Has Rating' },
];

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function getPositionGroup(positions: string[]): string {
    const map: Record<string, string> = {
        GK: 'Goalkeeper',
        LB: 'Defender',
        'CB-L': 'Defender',
        'CB-R': 'Defender',
        RB: 'Defender',
        LM: 'Midfielder',
        'CM-L': 'Midfielder',
        'CM-R': 'Midfielder',
        RM: 'Midfielder',
        CAM: 'Midfielder',
        LW: 'Forward',
        ST: 'Forward',
        RW: 'Forward',
        CF: 'Forward',
    };
    const first = positions.find((p) => map[p]);
    return first ? map[first] : '—';
}

export default function SavedPlayers() {
    const { savedPlayers: initialSaved } = usePage<PageProps>().props;
    const [savedPlayers, setSavedPlayers] = useState<SavedPlayer[]>(initialSaved);
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [sort, setSort] = useState<string>('date_desc');
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [notesOpen, setNotesOpen] = useState<boolean>(false);
    const [removeOpen, setRemoveOpen] = useState<boolean>(false);
    const [activeSaved, setActiveSaved] = useState<SavedPlayer | null>(null);
    const [notesDraft, setNotesDraft] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const openNotes = (sp: SavedPlayer) => {
        setActiveSaved(sp);
        setNotesDraft(sp.notes || '');
        setNotesOpen(true);
    };

    const openRemove = (sp: SavedPlayer) => {
        setActiveSaved(sp);
        setRemoveOpen(true);
    };

    const handleSaveNotes = async () => {
        if (!activeSaved) return;
        setLoading(true);
        try {
            await axios.put(route('scout.saved.update', activeSaved.id), {
                notes: notesDraft,
            });
            // Local update
            setSavedPlayers((prev) => prev.map((sp) => (sp.id === activeSaved.id ? { ...sp, notes: notesDraft } : sp)));
            setNotesOpen(false);
        } catch (error) {
            console.error('Error saving notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async () => {
        if (!activeSaved) return;
        setLoading(true);
        try {
            await axios.delete(route('scout.saved.destroy', activeSaved.id));
            setSavedPlayers((prev) => prev.filter((sp) => sp.id !== activeSaved.id));
            setRemoveOpen(false);
        } catch (error) {
            console.error('Error removing saved player:', error);
        } finally {
            setLoading(false);
        }
    };

    // ── ফিল্টার ও সর্ট ──
    let filtered = savedPlayers;
    if (activeFilter !== 'all') {
        switch (activeFilter) {
            case 'forwards':
                filtered = filtered.filter((sp) => sp.player.positions.some((p) => ['LW', 'ST', 'RW', 'CF'].includes(p)));
                break;
            case 'midfielders':
                filtered = filtered.filter((sp) => sp.player.positions.some((p) => ['LM', 'CM-L', 'CM-R', 'RM', 'CAM'].includes(p)));
                break;
            case 'defenders':
                filtered = filtered.filter((sp) => sp.player.positions.some((p) => ['LB', 'CB-L', 'CB-R', 'RB'].includes(p)));
                break;
            case 'goalkeepers':
                filtered = filtered.filter((sp) => sp.player.positions.some((p) => ['GK'].includes(p)));
                break;
            case 'premium':
                filtered = filtered.filter((sp) => sp.player.isPremium);
                break;
            case 'video':
                filtered = filtered.filter((sp) => sp.player.videoUrl);
                break;
            case 'rating':
                filtered = filtered.filter((sp) => sp.player.ratingCount > 0);
                break;
            default:
                break;
        }
    }

    // সর্ট
    const sorted = [...filtered].sort((a, b) => {
        switch (sort) {
            case 'name_asc':
                return a.player.name.localeCompare(b.player.name);
            case 'age_asc':
                return (a.player.age ?? 0) - (b.player.age ?? 0);
            case 'rating_desc':
                return b.player.avgRating - a.player.avgRating;
            default: // date_desc
                return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
        }
    });

    const isEmpty = sorted.length === 0;

    // ── পেজ রেন্ডার ──
    return (
        <>
            <ScoutNavbar />

            <div className="min-h-screen bg-[#F8FAFC] pt-16 dark:bg-[#0D0D0D]">
                {/* HEADER */}
                <div className="border-b border-[#E2E8F0] bg-white dark:border-[#2A2A2A] dark:bg-[#0D0D0D]">
                    <div className="flex flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                        <div>
                            <h1 className="font-display text-2xl font-bold text-[#0F172A] dark:text-[#F5F5F5]">Saved Players</h1>
                            <p className="mt-0.5 text-sm text-[#475569] dark:text-[#9A9A9A]">{savedPlayers.length} players on your shortlist</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {/* View Toggle */}
                            <div className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-1 dark:border-[#2A2A2A] dark:bg-[#111111]">
                                <button
                                    onClick={() => setView('grid')}
                                    className={`rounded-md p-1.5 transition-colors ${
                                        view === 'grid'
                                            ? 'bg-[#FFF3EB] text-[#E53F01] dark:bg-[rgba(255,107,0,0.12)]'
                                            : 'text-[#94A3B8] hover:text-[#475569] dark:hover:text-[#9A9A9A]'
                                    }`}
                                    aria-label="Grid view"
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setView('list')}
                                    className={`rounded-md p-1.5 transition-colors ${
                                        view === 'list'
                                            ? 'bg-[#FFF3EB] text-[#E53F01] dark:bg-[rgba(255,107,0,0.12)]'
                                            : 'text-[#94A3B8] hover:text-[#475569] dark:hover:text-[#9A9A9A]'
                                    }`}
                                    aria-label="List view"
                                >
                                    <List className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Sort */}
                            <Select value={sort} onValueChange={setSort}>
                                <SelectTrigger className="w-[170px] border-[#E2E8F0] bg-white text-sm text-[#0F172A] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F5F5F5]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="border-[#E2E8F0] bg-white dark:border-[#2A2A2A] dark:bg-[#161616]">
                                    <SelectItem value="date_desc">Date Saved ↓</SelectItem>
                                    <SelectItem value="name_asc">Name A–Z</SelectItem>
                                    <SelectItem value="age_asc">Age ↑</SelectItem>
                                    <SelectItem value="rating_desc">Rating ↓</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Export (optional) */}
                            {/* <Button
                                variant="outline"
                                size="sm"
                                className="border-[#E2E8F0] dark:border-[#2A2A2A] bg-white dark:bg-[#111111] text-[#475569] dark:text-[#9A9A9A] hover:text-[#E53F01] hover:border-[#E53F01]"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export List
                            </Button> */}
                        </div>
                    </div>
                </div>

                {/* FILTER STRIP */}
                {/* <div className="bg-white dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#2A2A2A]">
                    <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 overflow-x-auto">
                        <span className="text-xs text-[#94A3B8] shrink-0 font-semibold uppercase tracking-wider">
                            Filter:
                        </span>
                        {filterPills.map((pill) => (
                            <button
                                key={pill.id}
                                onClick={() => setActiveFilter(pill.id)}
                                className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${activeFilter === pill.id
                                    ? 'bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border-[#E53F01] text-[#E53F01] font-semibold'
                                    : 'bg-[#F8FAFC] dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#475569] dark:text-[#9A9A9A] hover:border-[#CBD5E1] dark:hover:border-[#3A3A3A]'
                                    }`}
                            >
                                {pill.label}
                            </button>
                        ))}
                    </div>
                </div> */}

                {/* MAIN CONTENT */}
                <div className="mx-auto max-w-[1300px] px-4 py-6 sm:px-6 lg:px-8">
                    {isEmpty ? (
                        <div className="py-24 text-center">
                            <Bookmark className="mx-auto h-16 w-16 text-[#E2E8F0] dark:text-[#2A2A2A]" />
                            <h2 className="font-display mt-4 text-xl font-bold text-[#0F172A] dark:text-[#F5F5F5]">No saved players yet</h2>
                            <p className="mx-auto mt-2 max-w-sm text-sm text-[#475569] dark:text-[#9A9A9A]">
                                Start browsing players and save the ones you're interested in.
                            </p>
                            <Link href="/scouting" className="mt-6 inline-block">
                                <Button className="bg-[#E53F01] text-white hover:bg-[#E53F01]">Browse Players →</Button>
                            </Link>
                        </div>
                    ) : view === 'grid' ? (
                        // ── GRID VIEW ──
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {sorted.map((sp) => (
                                <div
                                    key={sp.id}
                                    className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-[#2A2A2A] dark:bg-[#161616]"
                                >
                                    {/* TOP — Photo area */}
                                    <div className="relative flex h-70 items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] dark:from-[#1F1F1F] dark:to-[#161616]">
                                        {/* Position badges */}
                                        <div className="absolute top-2 left-2 flex gap-1">
                                            {sp.player.positions.slice(0, 2).map((pos) => (
                                                <span
                                                    key={pos}
                                                    className="rounded-full border border-[#E53F01] bg-[#FFF3EB] px-2 py-0.5 text-[10px] font-bold text-[#E53F01] dark:bg-[rgba(255,107,0,0.12)]"
                                                >
                                                    {pos}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action buttons */}
                                        <div className="absolute top-2 right-2 flex gap-1 rounded-lg bg-white/80 p-1 dark:bg-[#0D0D0D]/80">
                                            <button
                                                onClick={() => openRemove(sp)}
                                                className="rounded p-1 text-[#94A3B8] transition-colors hover:text-red-500"
                                                aria-label="Remove from saved"
                                            >
                                                <BookmarkX className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => openNotes(sp)}
                                                className="rounded p-1 text-[#94A3B8] transition-colors hover:text-[#E53F01]"
                                                aria-label="Edit notes"
                                            >
                                                <StickyNote className="h-4 w-4" />
                                            </button>
                                            <Link
                                                href={`/scouting/player/${sp.player.id}`}
                                                className="rounded p-1 text-[#94A3B8] transition-colors hover:text-[#E53F01]"
                                                aria-label="View full football identity"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </div>

                                        {/* Photo or initials */}
                                        {sp.player.photoUrl ? (
                                            <img
                                                src={sp.player.photoUrl}
                                                alt={sp.player.name}
                                                className="absolute inset-0 h-full w-full object-cover object-top"
                                            />
                                        ) : (
                                            <span className="font-display text-3xl font-black text-[#CBD5E1] dark:text-[#2A2A2A]">
                                                {getInitials(sp.player.name)}
                                            </span>
                                        )}

                                        {/* Premium badge */}
                                        {sp.player.isPremium && (
                                            <span className="absolute bottom-2 left-2 rounded-full bg-[#E53F01] px-2 py-0.5 text-[9px] font-black tracking-wider text-white uppercase">
                                                Premium
                                            </span>
                                        )}

                                        {/* Video indicator */}
                                        {sp.player.videoUrl && (
                                            <div className="absolute right-2 bottom-2 rounded-full bg-[#0F172A] p-1 text-white">
                                                <Play className="h-3 w-3" fill="currentColor" />
                                            </div>
                                        )}
                                    </div>

                                    {/* BOTTOM — Info */}
                                    <div className="p-5">
                                        <div className="flex flex-wrap items-baseline gap-2">
                                            <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F5F5F5]">{sp.player.name}</h3>
                                            {sp.player.nickname && <span className="text-sm text-[#94A3B8]">({sp.player.nickname})</span>}
                                        </div>

                                        <p className="mt-0.5 text-sm text-[#475569] dark:text-[#9A9A9A]">
                                            {/* <span className="mr-1">{sp.player.flag || '🏳️'}</span> */}
                                            {sp.player.currentClub}
                                        </p>

                                        {/* Modalities */}
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {sp.player.modalities.map((m) => (
                                                <span
                                                    key={m}
                                                    className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-0.5 text-[10px] text-[#475569] dark:border-[#2A2A2A] dark:bg-[#1F1F1F] dark:text-[#9A9A9A]"
                                                >
                                                    {m}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Stats row */}
                                        <div className="mt-3 grid grid-cols-3 border-t border-[#F1F5F9] pt-3 text-center dark:border-[#1F1F1F]">
                                            <div>
                                                <div className="font-mono text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]">
                                                    {sp.player.dob
                                                        ? (() => {
                                                              const birthDate = new Date(sp.player.dob);
                                                              const today = new Date();

                                                              let age = today.getFullYear() - birthDate.getFullYear();

                                                              const hasBirthdayPassed =
                                                                  today.getMonth() > birthDate.getMonth() ||
                                                                  (today.getMonth() === birthDate.getMonth() &&
                                                                      today.getDate() >= birthDate.getDate());

                                                              if (!hasBirthdayPassed) {
                                                                  age--;
                                                              }

                                                              return age < 18 ? birthDate.getFullYear() : age;
                                                          })()
                                                        : '—'}
                                                </div>
                                                <div className="mt-0.5 text-[9px] tracking-wider text-[#94A3B8] uppercase">Age</div>
                                            </div>
                                            <div className="border-x border-[#F1F5F9] dark:border-[#1F1F1F]">
                                                <div className="font-mono text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]">
                                                    {sp.player.height ? `${sp.player.height}cm` : '—'}
                                                </div>
                                                <div className="mt-0.5 text-[9px] tracking-wider text-[#94A3B8] uppercase">Height</div>
                                            </div>
                                            <div>
                                                <div className="font-mono text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]">
                                                    {sp.player.foot}
                                                </div>
                                                <div className="mt-0.5 text-[9px] tracking-wider text-[#94A3B8] uppercase">Foot</div>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="mt-3 flex items-center justify-between">
                                            {sp.player.ratingCount > 0 ? (
                                                <>
                                                    <div className="flex items-center gap-1">
                                                        {[1, 2, 3, 4, 5].map((i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-3.5 w-3.5 ${
                                                                    i <= Math.round(sp.player.avgRating)
                                                                        ? 'fill-[#E53F01] text-[#E53F01]'
                                                                        : 'fill-[#E2E8F0] text-[#E2E8F0] dark:fill-[#2A2A2A] dark:text-[#2A2A2A]'
                                                                }`}
                                                            />
                                                        ))}
                                                        <span className="ml-1 font-mono text-sm font-bold text-[#E53F01]">
                                                            {sp.player.avgRating.toFixed(1)}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-[#94A3B8]">({sp.player.ratingCount} ratings)</span>
                                                </>
                                            ) : (
                                                <span className="text-xs text-[#94A3B8] italic">Not yet rated</span>
                                            )}
                                        </div>

                                        {/* Saved date */}
                                        <p className="mt-2 font-mono text-[10px] text-[#94A3B8]">Saved {sp.savedAt}</p>

                                        {/* Notes */}
                                        {sp.notes && (
                                            <div className="mt-3 rounded-xl border border-[#FFD4AA] bg-[#FFF3EB] px-3 py-2 dark:border-[rgba(255,107,0,0.2)] dark:bg-[rgba(255,107,0,0.08)]">
                                                <div className="flex gap-1.5">
                                                    <StickyNote className="mt-0.5 h-3 w-3 shrink-0 text-[#E53F01]" />
                                                    <p className="text-xs leading-relaxed text-[#92400E] italic dark:text-[#E53F01]">{sp.notes}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* CTA buttons */}
                                        <div className="mt-4 flex gap-2">
                                            <Link href={`/agent/player/${sp.player.id}`} className="flex-1">
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-[#E2E8F0] bg-white text-sm text-[#475569] hover:border-[#E53F01] hover:text-[#E53F01] dark:border-[#2A2A2A] dark:bg-[#161616] dark:text-[#9A9A9A]"
                                                >
                                                    View Football Identity
                                                </Button>
                                            </Link>
                                            {sp.player.isPremium && (
                                                <Button className="flex-1 bg-[#E53F01] text-sm text-white hover:bg-[#E53F01]">Rate Player</Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // ── LIST VIEW ──
                        <div className="flex flex-col gap-4">
                            {sorted.map((sp) => (
                                <div
                                    key={sp.id}
                                    className="flex flex-col items-start gap-5 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-colors hover:border-[#E53F01] md:flex-row dark:border-[#2A2A2A] dark:bg-[#161616]"
                                >
                                    {/* LEFT — Photo */}
                                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] dark:from-[#1F1F1F] dark:to-[#161616]">
                                        {sp.player.photoUrl ? (
                                            <img src={sp.player.photoUrl} alt={sp.player.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="font-display text-lg font-black text-[#CBD5E1] dark:text-[#2A2A2A]">
                                                {getInitials(sp.player.name)}
                                            </span>
                                        )}
                                        {sp.player.isPremium && (
                                            <span className="absolute -top-1 -right-1 rounded-full bg-[#E53F01] px-1.5 py-0.5 text-[8px] font-black text-white">
                                                PRO
                                            </span>
                                        )}
                                    </div>

                                    {/* CENTER — Info */}
                                    <div className="w-full min-w-0 flex-1">
                                        {/* Row 1: Name + positions + badges */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F5F5F5]">{sp.player.name}</h3>
                                            {sp.player.nickname && <span className="text-sm text-[#94A3B8]">({sp.player.nickname})</span>}
                                            {sp.player.positions.slice(0, 2).map((pos) => (
                                                <span
                                                    key={pos}
                                                    className="rounded-full border border-[#E53F01] bg-[#FFF3EB] px-2 py-0.5 text-[10px] font-bold text-[#E53F01] dark:bg-[rgba(255,107,0,0.12)]"
                                                >
                                                    {pos}
                                                </span>
                                            ))}
                                            {sp.player.videoUrl && (
                                                <div className="rounded-full bg-[#0F172A] p-1 text-white">
                                                    <Play className="h-2.5 w-2.5" fill="currentColor" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Row 2: Club + stats */}
                                        <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-[#475569] dark:text-[#9A9A9A]">
                                            <span>
                                                {sp.player.flag} {sp.player.currentClub}
                                            </span>
                                            <span className="font-mono">Age {sp.player.age ?? '—'}</span>
                                            <span className="font-mono">{sp.player.height ? `${sp.player.height}cm` : '—'}</span>
                                            <span className="font-mono">{sp.player.foot}</span>
                                        </div>

                                        {/* Row 3: Rating + saved date + modalities */}
                                        <div className="mt-2 flex flex-wrap items-center gap-4">
                                            {sp.player.ratingCount > 0 ? (
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-3 w-3 ${
                                                                i <= Math.round(sp.player.avgRating)
                                                                    ? 'fill-[#E53F01] text-[#E53F01]'
                                                                    : 'fill-[#E2E8F0] text-[#E2E8F0] dark:fill-[#2A2A2A] dark:text-[#2A2A2A]'
                                                            }`}
                                                        />
                                                    ))}
                                                    <span className="ml-1 font-mono text-xs font-bold text-[#E53F01]">
                                                        {sp.player.avgRating.toFixed(1)}
                                                    </span>
                                                    <span className="ml-1 text-xs text-[#94A3B8]">({sp.player.ratingCount})</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-[#94A3B8] italic">Not yet rated</span>
                                            )}
                                            <span className="font-mono text-[10px] text-[#94A3B8]">Saved {sp.savedAt}</span>
                                            <div className="flex flex-wrap gap-1">
                                                {sp.player.modalities.map((m) => (
                                                    <span
                                                        key={m}
                                                        className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-0.5 text-[10px] text-[#475569] dark:border-[#2A2A2A] dark:bg-[#1F1F1F] dark:text-[#9A9A9A]"
                                                    >
                                                        {m}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Row 4: Notes */}
                                        {sp.notes && (
                                            <div className="mt-3 rounded-xl border border-[#FFD4AA] bg-[#FFF3EB] px-3 py-2 dark:border-[rgba(255,107,0,0.2)] dark:bg-[rgba(255,107,0,0.08)]">
                                                <div className="flex gap-1.5">
                                                    <StickyNote className="mt-0.5 h-3 w-3 shrink-0 text-[#E53F01]" />
                                                    <p className="text-xs leading-relaxed text-[#92400E] italic dark:text-[#E53F01]">{sp.notes}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Mobile actions */}
                                        <div className="mt-4 flex flex-wrap gap-2 md:hidden">
                                            <Link href={`/scouting/player/${sp.player.id}`} className="min-w-[120px] flex-1">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full border-[#E2E8F0] text-[#475569] hover:border-[#E53F01] hover:text-[#E53F01] dark:border-[#2A2A2A] dark:text-[#9A9A9A]"
                                                >
                                                    View Football Identity
                                                </Button>
                                            </Link>
                                            {sp.player.isPremium && (
                                                <Button size="sm" className="min-w-[120px] flex-1 bg-[#E53F01] text-white hover:bg-[#E53F01]">
                                                    Rate
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openRemove(sp)}
                                                className="text-[#94A3B8] hover:text-red-500"
                                            >
                                                <BookmarkX className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* RIGHT — Actions (desktop) */}
                                    <div className="ml-4 hidden shrink-0 flex-col items-end gap-2 md:flex">
                                        <Link href={`/scouting/player/${sp.player.id}`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-[120px] border-[#E2E8F0] text-[#475569] hover:border-[#E53F01] hover:text-[#E53F01] dark:border-[#2A2A2A] dark:text-[#9A9A9A]"
                                            >
                                                View Football Identity
                                            </Button>
                                        </Link>
                                        {sp.player.isPremium && (
                                            <Button size="sm" className="w-[120px] bg-[#E53F01] text-white hover:bg-[#E53F01]">
                                                Rate Player
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openRemove(sp)}
                                            className="text-[#94A3B8] hover:text-red-500"
                                        >
                                            <BookmarkX className="mr-1 h-4 w-4" />
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sponsored Ad */}
                    {!isEmpty && (
                        <div className="mx-auto mt-8 max-w-[728px]">
                            {/* <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2 text-center">
                                Sponsored
                            </p> */}
                            <div className="mx-auto flex h-[80px] items-center gap-4 rounded-xl border border-[#334155] bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-6">
                                {/* <div className="font-display font-black text-lg text-white shrink-0">
                                    TRANSFERROOM
                                </div>
                                <p className="text-white/70 text-xs sm:text-sm flex-1 hidden sm:block">
                                    Connect with 1,200+ clubs on the professional transfer network.
                                </p>
                                <button className="bg-[#E53F01] hover:bg-[#E53F01] text-white font-bold px-5 py-2 rounded-lg text-sm shrink-0 transition-colors">
                                    Start Free →
                                </button> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── NOTES DIALOG ─── */}
            <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
                <DialogContent className="border-[#E2E8F0] bg-white sm:max-w-lg dark:border-[#2A2A2A] dark:bg-[#161616]">
                    <DialogHeader>
                        <DialogTitle className="font-display text-xl text-[#0F172A] dark:text-[#F5F5F5]">
                            Scouting Notes — {activeSaved?.player.name}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-[#475569] dark:text-[#9A9A9A]">
                            Private notes visible only to you
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-2">
                        <Textarea
                            value={notesDraft}
                            onChange={(e) => setNotesDraft(e.target.value.slice(0, 500))}
                            placeholder="Add your scouting observations, next steps, or reminders..."
                            className="h-32 resize-none border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:border-[#E53F01] focus-visible:ring-2 focus-visible:ring-orange-100 dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F5F5F5] dark:focus-visible:ring-orange-800"
                        />
                        <div className="mt-1 text-right font-mono text-xs text-[#94A3B8]">{notesDraft.length}/500</div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setNotesOpen(false)}
                            className="border-[#E2E8F0] text-[#475569] dark:border-[#2A2A2A] dark:text-[#9A9A9A]"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSaveNotes} className="bg-[#E53F01] text-white hover:bg-[#E53F01]" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Notes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ─── REMOVE CONFIRMATION ─── */}
            <Dialog open={removeOpen} onOpenChange={setRemoveOpen}>
                <DialogContent className="border-[#E2E8F0] bg-white sm:max-w-md dark:border-[#2A2A2A] dark:bg-[#161616]">
                    <DialogHeader>
                        <DialogTitle className="font-display text-xl text-[#0F172A] dark:text-[#F5F5F5]">Remove from Saved?</DialogTitle>
                        <DialogDescription className="pt-2 text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                            <strong className="text-[#0F172A] dark:text-[#F5F5F5]">{activeSaved?.player.name}</strong> will be removed from your
                            shortlist. Your scouting notes for this player will also be deleted.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setRemoveOpen(false)}
                            className="border-[#E2E8F0] text-[#475569] dark:border-[#2A2A2A] dark:text-[#9A9A9A]"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleRemove} className="bg-red-500 text-white hover:bg-red-600" disabled={loading}>
                            <BookmarkX className="mr-2 h-4 w-4" />
                            {loading ? 'Removing...' : 'Remove Player'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
