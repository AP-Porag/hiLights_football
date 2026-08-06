import { Link } from '@inertiajs/react';
import { Search, X, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface PlayerResult {
    id: number;
    name: string | null;
    club: string | null;
    photo_url: string | null;
    country: string | null;
    position: string | null;
}

// alpha-2 code -> flag emoji
const codeToFlag = (code?: string | null): string => {
    if (!code || code.length !== 2) return '';
    return String.fromCodePoint(
        ...code.toUpperCase().split('').map((c) => 0x1f1a5 + c.charCodeAt(0))
    );
};

export default function PlayerSearchModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [q, setQ] = useState('');
    const [players, setPlayers] = useState<PlayerResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // open hole autofocus, close hole sob reset
    useEffect(() => {
        if (open) {
            const t = setTimeout(() => inputRef.current?.focus(), 50);
            return () => clearTimeout(t);
        }
        setQ('');
        setPlayers([]);
        setSearched(false);
    }, [open]);

    // Esc diye close
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    // debounced fetch (300ms) — 2+ char hole search kore
    useEffect(() => {
        if (!open) return;
        const term = q.trim();
        if (term.length < 2) {
            setPlayers([]);
            setSearched(false);
            setLoading(false);
            return;
        }
        setLoading(true);
        const ctrl = new AbortController();
        const t = setTimeout(async () => {
            try {
                const res = await fetch(`/players/search?q=${encodeURIComponent(term)}`, {
                    headers: { Accept: 'application/json' },
                    signal: ctrl.signal,
                });
                const data = await res.json();
                setPlayers(data.players ?? []);
                setSearched(true);
            } catch (e) {
                if ((e as any)?.name !== 'AbortError') {
                    setPlayers([]);
                    setSearched(true);
                }
            } finally {
                setLoading(false);
            }
        }, 300);
        return () => {
            clearTimeout(t);
            ctrl.abort();
        };
    }, [q, open]);

    if (!open) return null;

    const term = q.trim();

    return (
        <div
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 p-4 pt-[10vh]"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#161616] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search bar */}
                <div className="flex items-center gap-3 border-b border-[#2A2A2A] px-4">
                    <Search className="h-5 w-5 shrink-0 text-[#9A9A9A]" />
                    <input
                        ref={inputRef}
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search players by name or club..."
                        className="h-14 w-full bg-transparent text-sm text-[#F5F5F5] outline-none placeholder:text-[#555555]"
                    />
                    {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#FF6B00]" />}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="shrink-0 text-[#9A9A9A] hover:text-[#F5F5F5]"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto p-2">
                    {term.length < 2 && (
                        <p className="px-3 py-8 text-center text-sm text-[#555555]">
                            Type at least 2 characters to search.
                        </p>
                    )}
                    {term.length >= 2 && searched && players.length === 0 && !loading && (
                        <p className="px-3 py-8 text-center text-sm text-[#9A9A9A]">
                            No players found for "{term}".
                        </p>
                    )}
                    {players.map((p) => (
                        <Link
                            key={p.id}
                            href={`/player/profile/${p.id}`}
                            onClick={onClose}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#1F1F1F]"
                        >
                            <img
                                src={p.photo_url || '/images/img/placeholder.webp'}
                                alt={p.name ?? 'player'}
                                className="h-10 w-10 shrink-0 rounded-lg border border-[#2A2A2A] object-cover"
                            />
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-semibold text-[#F5F5F5]">{p.name}</div>
                                <div className="truncate text-xs text-[#9A9A9A]">
                                    {p.position ? p.position : 'Player'}
                                    {p.club ? ` · ${p.club}` : ''}
                                </div>
                            </div>
                            {p.country && <span className="shrink-0 text-lg leading-none">{codeToFlag(p.country)}</span>}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
