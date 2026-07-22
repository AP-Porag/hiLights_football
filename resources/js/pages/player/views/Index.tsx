import PlayerNavbar from '@/components/player/PlayerNavbar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

// টাইপ ডিফাইনেশন (views এখন অ্যারে অথবা অবজেক্ট হতে পারে)
interface View {
    id: number;
    name: string;
    role?: string;
    viewed_at: string;
    player_profile_id?: number | null;
}

interface Props {
    views: View[] | { data: View[]; links?: string };
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ views, pagination }: Props) {
    const { auth } = usePage().props as any;
    const [loading, setLoading] = useState(false);

    // নিশ্চিত করি views একটি অ্যারে
    const viewsData = Array.isArray(views) ? views : views?.data || [];

    const goToPage = (page: number) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        router.get(`/player/views?page=${page}`, {}, {
            preserveState: true,
            onFinish: () => setLoading(false),
        });
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-16">
            <PlayerNavbar />

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
                <div className="flex items-center gap-3 border-b border-[#2A2A2A] pb-4">
                    <Eye className="h-6 w-6 text-[#FF6B00]" />
                    <h1 className="text-2xl font-bold text-[#F5F5F5]">Profile Views</h1>
                    <span className="ml-auto text-sm text-[#94A3B8]">
                        {pagination.total} views total
                    </span>
                </div>

                {viewsData.length === 0 ? (
                    <div className="mt-10 rounded-xl border border-[#2A2A2A] p-12 text-center text-sm text-[#9A9A9A]">
                        No one has viewed your profile yet.
                    </div>
                ) : (
                    <>
                        <ul className="mt-6 space-y-3">
                            {viewsData.map((view) => {
                                const initials = view.name
                                    .split(' ')
                                    .slice(0, 2)
                                    .map((w) => w[0])
                                    .join('')
                                    .toUpperCase();

                                return (
                                    <li
                                        key={view.id}
                                        className="flex items-center gap-3 rounded-xl border border-[#2A2A2A] bg-[#161616] p-4 transition hover:border-[#FF6B00]"
                                    >
                                        <Avatar className="h-10 w-10 flex-shrink-0">
                                            <AvatarFallback className="bg-[rgba(255,107,0,0.12)] text-xs font-bold text-[#FF6B00]">
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-[#F5F5F5]">
                                                {view.name}
                                            </p>
                                            <p className="text-xs text-[#94A3B8]">
                                                {view.role ? `(${view.role})` : ''}
                                            </p>
                                        </div>

                                        <p className="text-xs text-[#9A9A9A]">{view.viewed_at}</p>

                                        {/* View Profile Button - New */}
                                        {view.player_profile_id ? (
                                            <Link
                                                href={`/player/profile/${view.player_profile_id}`}
                                                className="flex-shrink-0 rounded-lg bg-[#FF6B00] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#CC5500]"
                                            >
                                                View Profile
                                            </Link>
                                        ) : (
                                            <span className="text-xs text-[#94A3B8]">Not a player</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* পেজিনেশন কন্ট্রোল */}
                        <div className="mt-8 flex items-center justify-between">
                            <p className="text-sm text-[#94A3B8]">
                                Showing {viewsData.length} of {pagination.total}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => goToPage(pagination.current_page - 1)}
                                    disabled={pagination.current_page === 1 || loading}
                                    className="border-[#2A2A2A] bg-transparent text-[#F5F5F5] hover:bg-[#1F1F1F]"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="flex items-center text-sm text-[#94A3B8]">
                                    Page {pagination.current_page} of {pagination.last_page}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => goToPage(pagination.current_page + 1)}
                                    disabled={pagination.current_page === pagination.last_page || loading}
                                    className="border-[#2A2A2A] bg-transparent text-[#F5F5F5] hover:bg-[#1F1F1F]"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
