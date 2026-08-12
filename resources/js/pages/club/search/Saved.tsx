import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import ScoutNavbar from '@/components/scout/ScoutNavbar';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
    LayoutGrid,
    List,
    Download,
    Bookmark,
    BookmarkX,
    StickyNote,
    ExternalLink,
    Play,
    Star,
    User,
} from 'lucide-react';

// ── ইন্টারফেস ──
interface Player {
    id: number;
    name: string;
    nickname: string | null;
    age: number | null;
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
            setSavedPlayers((prev) =>
                prev.map((sp) =>
                    sp.id === activeSaved.id ? { ...sp, notes: notesDraft } : sp
                )
            );
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
                filtered = filtered.filter((sp) =>
                    sp.player.positions.some((p) => ['LW', 'ST', 'RW', 'CF'].includes(p))
                );
                break;
            case 'midfielders':
                filtered = filtered.filter((sp) =>
                    sp.player.positions.some((p) => ['LM', 'CM-L', 'CM-R', 'RM', 'CAM'].includes(p))
                );
                break;
            case 'defenders':
                filtered = filtered.filter((sp) =>
                    sp.player.positions.some((p) => ['LB', 'CB-L', 'CB-R', 'RB'].includes(p))
                );
                break;
            case 'goalkeepers':
                filtered = filtered.filter((sp) =>
                    sp.player.positions.some((p) => ['GK'].includes(p))
                );
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

            <div className="pt-16 bg-[#F8FAFC] dark:bg-[#0D0D0D] min-h-screen">
                {/* HEADER */}
                <div className="bg-white dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#2A2A2A]">
                    <div className="px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="font-display font-bold text-2xl text-[#0F172A] dark:text-[#F5F5F5]">
                                Saved Players
                            </h1>
                            <p className="text-sm text-[#475569] dark:text-[#9A9A9A] mt-0.5">
                                {savedPlayers.length} players on your shortlist
                            </p>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {/* View Toggle */}
                            <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-lg p-1">
                                <button
                                    onClick={() => setView('grid')}
                                    className={`rounded-md p-1.5 transition-colors ${view === 'grid'
                                        ? 'text-[#FF6B00] bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]'
                                        : 'text-[#94A3B8] hover:text-[#475569] dark:hover:text-[#9A9A9A]'
                                        }`}
                                    aria-label="Grid view"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setView('list')}
                                    className={`rounded-md p-1.5 transition-colors ${view === 'list'
                                        ? 'text-[#FF6B00] bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]'
                                        : 'text-[#94A3B8] hover:text-[#475569] dark:hover:text-[#9A9A9A]'
                                        }`}
                                    aria-label="List view"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Sort */}
                            <Select value={sort} onValueChange={setSort}>
                                <SelectTrigger className="w-[170px] bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] text-sm">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-[#161616] border-[#E2E8F0] dark:border-[#2A2A2A]">
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
                                className="border-[#E2E8F0] dark:border-[#2A2A2A] bg-white dark:bg-[#111111] text-[#475569] dark:text-[#9A9A9A] hover:text-[#FF6B00] hover:border-[#FF6B00]"
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
                                    ? 'bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border-[#FF6B00] text-[#CC5500] font-semibold'
                                    : 'bg-[#F8FAFC] dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#475569] dark:text-[#9A9A9A] hover:border-[#CBD5E1] dark:hover:border-[#3A3A3A]'
                                    }`}
                            >
                                {pill.label}
                            </button>
                        ))}
                    </div>
                </div> */}

                {/* MAIN CONTENT */}
                <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {isEmpty ? (
                        <div className="py-24 text-center">
                            <Bookmark className="w-16 h-16 text-[#E2E8F0] dark:text-[#2A2A2A] mx-auto" />
                            <h2 className="font-display font-bold text-xl text-[#0F172A] dark:text-[#F5F5F5] mt-4">
                                No saved players yet
                            </h2>
                            <p className="text-[#475569] dark:text-[#9A9A9A] text-sm mt-2 max-w-sm mx-auto">
                                Start browsing players and save the ones you're interested in.
                            </p>
                            <Link href="/scouting" className="inline-block mt-6">
                                <Button className="bg-[#FF6B00] text-white hover:bg-[#CC5500]">
                                    Browse Players →
                                </Button>
                            </Link>
                        </div>
                    ) : view === 'grid' ? (
                        // ── GRID VIEW ──
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {sorted.map((sp) => (
                                <div
                                    key={sp.id}
                                    className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
                                >
                                    {/* TOP — Photo area */}
                                    <div className="h-70 relative bg-gradient-to-br from-[#F8FAFC] dark:from-[#1F1F1F] to-[#E2E8F0] dark:to-[#161616] flex items-center justify-center">
                                        {/* Position badges */}
                                        <div className="absolute top-2 left-2 flex gap-1">
                                            {sp.player.positions.slice(0, 2).map((pos) => (
                                                <span
                                                    key={pos}
                                                    className="bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] font-bold px-2 py-0.5 rounded-full"
                                                >
                                                    {pos}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action buttons */}
                                        <div className="absolute top-2 right-2 flex gap-1 bg-white/80 dark:bg-[#0D0D0D]/80 rounded-lg p-1">
                                            <button
                                                onClick={() => openRemove(sp)}
                                                className="p-1 rounded text-[#94A3B8] hover:text-red-500 transition-colors"
                                                aria-label="Remove from saved"
                                            >
                                                <BookmarkX className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => openNotes(sp)}
                                                className="p-1 rounded text-[#94A3B8] hover:text-[#FF6B00] transition-colors"
                                                aria-label="Edit notes"
                                            >
                                                <StickyNote className="w-4 h-4" />
                                            </button>
                                            <Link
                                                href={`/scouting/player/${sp.player.id}`}
                                                className="p-1 rounded text-[#94A3B8] hover:text-[#FF6B00] transition-colors"
                                                aria-label="View full profile"
                                            >
                                                <ExternalLink className="w-4 h-4" />
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
                                            <span className="font-display font-black text-3xl text-[#CBD5E1] dark:text-[#2A2A2A]">
                                                {getInitials(sp.player.name)}
                                            </span>
                                        )}

                                        {/* Premium badge */}
                                        {sp.player.isPremium && (
                                            <span className="absolute bottom-2 left-2 bg-[#FF6B00] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                Premium
                                            </span>
                                        )}

                                        {/* Video indicator */}
                                        {sp.player.videoUrl && (
                                            <div className="absolute bottom-2 right-2 bg-[#0F172A] text-white rounded-full p-1">
                                                <Play className="w-3 h-3" fill="currentColor" />
                                            </div>
                                        )}
                                    </div>

                                    {/* BOTTOM — Info */}
                                    <div className="p-5">
                                        <div className="flex items-baseline gap-2 flex-wrap">
                                            <h3 className="font-bold text-base text-[#0F172A] dark:text-[#F5F5F5]">
                                                {sp.player.name}
                                            </h3>
                                            {sp.player.nickname && (
                                                <span className="text-[#94A3B8] text-sm">
                                                    ({sp.player.nickname})
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-[#475569] dark:text-[#9A9A9A] mt-0.5">
                                            {/* <span className="mr-1">{sp.player.flag || '🏳️'}</span> */}
                                            {sp.player.currentClub}
                                        </p>

                                        {/* Modalities */}
                                        <div className="flex gap-1 mt-2 flex-wrap">
                                            {sp.player.modalities.map((m) => (
                                                <span
                                                    key={m}
                                                    className="text-[10px] bg-[#F8FAFC] dark:bg-[#1F1F1F] border border-[#E2E8F0] dark:border-[#2A2A2A] text-[#475569] dark:text-[#9A9A9A] px-2 py-0.5 rounded-full"
                                                >
                                                    {m}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Stats row */}
                                        <div className="grid grid-cols-3 mt-3 pt-3 border-t border-[#F1F5F9] dark:border-[#1F1F1F] text-center">
                                            <div>
                                                <div className="font-mono font-semibold text-sm text-[#0F172A] dark:text-[#F5F5F5]">
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
                                                <div className="text-[9px] text-[#94A3B8] uppercase tracking-wider mt-0.5">Age</div>
                                            </div>
                                            <div className="border-x border-[#F1F5F9] dark:border-[#1F1F1F]">
                                                <div className="font-mono font-semibold text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                                                    {sp.player.height ? `${sp.player.height}cm` : '—'}
                                                </div>
                                                <div className="text-[9px] text-[#94A3B8] uppercase tracking-wider mt-0.5">Height</div>
                                            </div>
                                            <div>
                                                <div className="font-mono font-semibold text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                                                    {sp.player.foot}
                                                </div>
                                                <div className="text-[9px] text-[#94A3B8] uppercase tracking-wider mt-0.5">Foot</div>
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
                                                                className={`w-3.5 h-3.5 ${i <= Math.round(sp.player.avgRating)
                                                                    ? 'text-[#FF6B00] fill-[#FF6B00]'
                                                                    : 'text-[#E2E8F0] dark:text-[#2A2A2A] fill-[#E2E8F0] dark:fill-[#2A2A2A]'
                                                                    }`}
                                                            />
                                                        ))}
                                                        <span className="font-mono text-[#FF6B00] text-sm font-bold ml-1">
                                                            {sp.player.avgRating.toFixed(1)}
                                                        </span>
                                                    </div>
                                                    <span className="text-[#94A3B8] text-xs">
                                                        ({sp.player.ratingCount} ratings)
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-[#94A3B8] text-xs italic">Not yet rated</span>
                                            )}
                                        </div>

                                        {/* Saved date */}
                                        <p className="text-[10px] text-[#94A3B8] font-mono mt-2">
                                            Saved {sp.savedAt}
                                        </p>

                                        {/* Notes */}
                                        {sp.notes && (
                                            <div className="bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.08)] border border-[#FFD4AA] dark:border-[rgba(255,107,0,0.2)] rounded-xl px-3 py-2 mt-3">
                                                <div className="flex gap-1.5">
                                                    <StickyNote className="w-3 h-3 text-[#FF6B00] shrink-0 mt-0.5" />
                                                    <p className="text-xs text-[#92400E] dark:text-[#FF6B00] italic leading-relaxed">
                                                        {sp.notes}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* CTA buttons */}
                                        <div className="mt-4 flex gap-2">
                                            <Link href={`/club/player/${sp.player.id}`} className="flex-1">
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-sm border-[#E2E8F0] dark:border-[#2A2A2A] text-[#475569] dark:text-[#9A9A9A] hover:border-[#FF6B00] hover:text-[#FF6B00] bg-white dark:bg-[#161616]"
                                                >
                                                    View Profile
                                                </Button>
                                            </Link>
                                            {sp.player.isPremium && (
                                                <Button className="flex-1 text-sm bg-[#FF6B00] text-white hover:bg-[#CC5500]">
                                                    Rate Player
                                                </Button>
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
                                    className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-5 flex flex-col md:flex-row items-start gap-5 hover:border-[#FF6B00] transition-colors"
                                >
                                    {/* LEFT — Photo */}
                                    <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-[#F8FAFC] dark:from-[#1F1F1F] to-[#E2E8F0] dark:to-[#161616] flex items-center justify-center">
                                        {sp.player.photoUrl ? (
                                            <img src={sp.player.photoUrl} alt={sp.player.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="font-display font-black text-lg text-[#CBD5E1] dark:text-[#2A2A2A]">
                                                {getInitials(sp.player.name)}
                                            </span>
                                        )}
                                        {sp.player.isPremium && (
                                            <span className="absolute -top-1 -right-1 bg-[#FF6B00] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">
                                                PRO
                                            </span>
                                        )}
                                    </div>

                                    {/* CENTER — Info */}
                                    <div className="flex-1 min-w-0 w-full">
                                        {/* Row 1: Name + positions + badges */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-bold text-base text-[#0F172A] dark:text-[#F5F5F5]">
                                                {sp.player.name}
                                            </h3>
                                            {sp.player.nickname && (
                                                <span className="text-[#94A3B8] text-sm">
                                                    ({sp.player.nickname})
                                                </span>
                                            )}
                                            {sp.player.positions.slice(0, 2).map((pos) => (
                                                <span
                                                    key={pos}
                                                    className="bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] font-bold px-2 py-0.5 rounded-full"
                                                >
                                                    {pos}
                                                </span>
                                            ))}
                                            {sp.player.videoUrl && (
                                                <div className="bg-[#0F172A] text-white rounded-full p-1">
                                                    <Play className="w-2.5 h-2.5" fill="currentColor" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Row 2: Club + stats */}
                                        <div className="flex items-center gap-4 mt-1 flex-wrap text-sm text-[#475569] dark:text-[#9A9A9A]">
                                            <span>
                                                {sp.player.flag} {sp.player.currentClub}
                                            </span>
                                            <span className="font-mono">Age {sp.player.age ?? '—'}</span>
                                            <span className="font-mono">{sp.player.height ? `${sp.player.height}cm` : '—'}</span>
                                            <span className="font-mono">{sp.player.foot}</span>
                                        </div>

                                        {/* Row 3: Rating + saved date + modalities */}
                                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                                            {sp.player.ratingCount > 0 ? (
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-3 h-3 ${i <= Math.round(sp.player.avgRating)
                                                                ? 'text-[#FF6B00] fill-[#FF6B00]'
                                                                : 'text-[#E2E8F0] dark:text-[#2A2A2A] fill-[#E2E8F0] dark:fill-[#2A2A2A]'
                                                                }`}
                                                        />
                                                    ))}
                                                    <span className="font-mono text-[#FF6B00] text-xs font-bold ml-1">
                                                        {sp.player.avgRating.toFixed(1)}
                                                    </span>
                                                    <span className="text-[#94A3B8] text-xs ml-1">
                                                        ({sp.player.ratingCount})
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-[#94A3B8] text-xs italic">Not yet rated</span>
                                            )}
                                            <span className="text-[10px] text-[#94A3B8] font-mono">
                                                Saved {sp.savedAt}
                                            </span>
                                            <div className="flex gap-1 flex-wrap">
                                                {sp.player.modalities.map((m) => (
                                                    <span
                                                        key={m}
                                                        className="text-[10px] bg-[#F8FAFC] dark:bg-[#1F1F1F] border border-[#E2E8F0] dark:border-[#2A2A2A] text-[#475569] dark:text-[#9A9A9A] px-2 py-0.5 rounded-full"
                                                    >
                                                        {m}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Row 4: Notes */}
                                        {sp.notes && (
                                            <div className="bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.08)] border border-[#FFD4AA] dark:border-[rgba(255,107,0,0.2)] rounded-xl px-3 py-2 mt-3">
                                                <div className="flex gap-1.5">
                                                    <StickyNote className="w-3 h-3 text-[#FF6B00] shrink-0 mt-0.5" />
                                                    <p className="text-xs text-[#92400E] dark:text-[#FF6B00] italic leading-relaxed">
                                                        {sp.notes}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Mobile actions */}
                                        <div className="flex md:hidden gap-2 mt-4 flex-wrap">
                                            <Link href={`/scouting/player/${sp.player.id}`} className="flex-1 min-w-[120px]">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full border-[#E2E8F0] dark:border-[#2A2A2A] text-[#475569] dark:text-[#9A9A9A] hover:border-[#FF6B00] hover:text-[#FF6B00]"
                                                >
                                                    View Profile
                                                </Button>
                                            </Link>
                                            {sp.player.isPremium && (
                                                <Button
                                                    size="sm"
                                                    className="flex-1 min-w-[120px] bg-[#FF6B00] text-white hover:bg-[#CC5500]"
                                                >
                                                    Rate
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openRemove(sp)}
                                                className="text-[#94A3B8] hover:text-red-500"
                                            >
                                                <BookmarkX className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* RIGHT — Actions (desktop) */}
                                    <div className="hidden md:flex shrink-0 flex-col items-end gap-2 ml-4">
                                        <Link href={`/scouting/player/${sp.player.id}`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-[#E2E8F0] dark:border-[#2A2A2A] text-[#475569] dark:text-[#9A9A9A] hover:border-[#FF6B00] hover:text-[#FF6B00] w-[120px]"
                                            >
                                                View Profile
                                            </Button>
                                        </Link>
                                        {sp.player.isPremium && (
                                            <Button
                                                size="sm"
                                                className="bg-[#FF6B00] text-white hover:bg-[#CC5500] w-[120px]"
                                            >
                                                Rate Player
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openRemove(sp)}
                                            className="text-[#94A3B8] hover:text-red-500"
                                        >
                                            <BookmarkX className="w-4 h-4 mr-1" />
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sponsored Ad */}
                    {!isEmpty && (
                        <div className="max-w-[728px] mx-auto mt-8">
                            <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2 text-center">
                                Sponsored
                            </p>
                            <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-xl h-[80px] flex items-center px-6 gap-4 border border-[#334155] mx-auto">
                                <div className="font-display font-black text-lg text-white shrink-0">
                                    TRANSFERROOM
                                </div>
                                <p className="text-white/70 text-xs sm:text-sm flex-1 hidden sm:block">
                                    Connect with 1,200+ clubs on the professional transfer network.
                                </p>
                                <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold px-5 py-2 rounded-lg text-sm shrink-0 transition-colors">
                                    Start Free →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── NOTES DIALOG ─── */}
            <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
                <DialogContent className="bg-white dark:bg-[#161616] border-[#E2E8F0] dark:border-[#2A2A2A] sm:max-w-lg">
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
                            className="h-32 bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00] resize-none"
                        />
                        <div className="text-xs text-[#94A3B8] text-right mt-1 font-mono">
                            {notesDraft.length}/500
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setNotesOpen(false)}
                            className="border-[#E2E8F0] dark:border-[#2A2A2A] text-[#475569] dark:text-[#9A9A9A]"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveNotes}
                            className="bg-[#FF6B00] text-white hover:bg-[#CC5500]"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Notes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ─── REMOVE CONFIRMATION ─── */}
            <Dialog open={removeOpen} onOpenChange={setRemoveOpen}>
                <DialogContent className="bg-white dark:bg-[#161616] border-[#E2E8F0] dark:border-[#2A2A2A] sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-display text-xl text-[#0F172A] dark:text-[#F5F5F5]">
                            Remove from Saved?
                        </DialogTitle>
                        <DialogDescription className="text-sm text-[#475569] dark:text-[#9A9A9A] leading-relaxed pt-2">
                            <strong className="text-[#0F172A] dark:text-[#F5F5F5]">
                                {activeSaved?.player.name}
                            </strong>{' '}
                            will be removed from your shortlist. Your scouting notes for this
                            player will also be deleted.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setRemoveOpen(false)}
                            className="border-[#E2E8F0] dark:border-[#2A2A2A] text-[#475569] dark:text-[#9A9A9A]"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleRemove}
                            className="bg-red-500 text-white hover:bg-red-600"
                            disabled={loading}
                        >
                            <BookmarkX className="w-4 h-4 mr-2" />
                            {loading ? 'Removing...' : 'Remove Player'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
