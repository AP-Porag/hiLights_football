import PlayerNavbar from '@/Components/Player/PlayerNavbar';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Progress } from '@/Components/ui/progress';
import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, Circle, Crown, Eye, History, Lock, Star, TrendingUp, Video } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// MOCK DATA (realistic)
// TODO: Replace with usePage<PageProps & {player:typeof player, recentViews:typeof recentViews}>().props
const player = {
    name: 'Benjamin',
    profileComplete: 68,
    totalViews: 1247,
    trend: 12,
    scoutInterest: 23,
    avgRating: 4.2,
    subscription: 'free' as 'free' | 'premium',
};

const recentViews = [
    { id: 1, type: 'Scout', org: 'FC Porto Scouting', country: 'Portugal', flag: '🇵🇹', time: '2 hours ago', locked: false },
    { id: 2, type: 'Club', org: 'Sporting Lisboa B', country: 'Portugal', flag: '🇵🇹', time: 'Yesterday', locked: false },
    { id: 3, type: 'Agent', org: 'Top Eleven Agency', country: 'Spain', flag: '🇪🇸', time: '2 days ago', locked: true },
    { id: 4, type: 'Scout', org: 'Anonymous', country: 'France', flag: '🇫🇷', time: '3 days ago', locked: true },
];

const countryData = [
    { country: 'Portugal', views: 412 },
    { country: 'Spain', views: 287 },
    { country: 'Brazil', views: 198 },
    { country: 'France', views: 156 },
    { country: 'England', views: 94 },
];

const sparklineData = [12, 18, 14, 22, 19, 28, 34];

function getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
}

function formatDate(): string {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function PlayerDashboard() {
    const greeting = getGreeting();
    const dateStr = formatDate();
    const circumference = 276.46;
    const dashOffset = circumference - (player.profileComplete / 100) * circumference;

    const checklistOverall = Math.round((3 / 6) * 100);

    // Sparkline path
    const sparkMax = Math.max(...sparklineData);
    const sparkMin = Math.min(...sparklineData);
    const sparkRange = sparkMax - sparkMin || 1;
    const sparkPoints = sparklineData
        .map((v, i) => {
            const x = (i / (sparklineData.length - 1)) * 100;
            const y = 100 - ((v - sparkMin) / sparkRange) * 80 - 10;
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-16 dark:bg-[#0D0D0D]">
            <PlayerNavbar />

            {/* PAGE HEADER */}
            <header className="border-b border-[#E2E8F0] bg-white px-4 py-5 sm:px-8 dark:border-[#2A2A2A] dark:bg-[#0D0D0D]">
                <div className="mx-auto max-w-[1300px]">
                    <h1 className="font-display text-2xl font-bold text-[#0F172A] sm:text-3xl dark:text-[#F5F5F5]">
                        {greeting}, {player.name}
                    </h1>
                    <p className="mt-1 text-sm text-[#475569] dark:text-[#9A9A9A]">{dateStr}</p>
                </div>
            </header>

            <main className="mx-auto max-w-[1300px] space-y-6 px-4 py-6 sm:px-8 sm:py-8">
                {/* WIDGETS ROW */}
                <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {/* [1] Profile Complete */}
                    <div className="flex flex-col items-center rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]">
                        <div className="relative h-[112px] w-[112px]">
                            <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
                                <circle cx="56" cy="56" r="44" fill="none" strokeWidth="10" className="stroke-[#E2E8F0] dark:stroke-[#2A2A2A]" />
                                <circle
                                    cx="56"
                                    cy="56"
                                    r="44"
                                    fill="none"
                                    stroke="#FF6B00"
                                    strokeWidth="10"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={dashOffset}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-display text-3xl font-black text-[#0F172A] dark:text-[#F5F5F5]">{player.profileComplete}%</span>
                            </div>
                        </div>
                        <p className="mt-3 text-xs tracking-wider text-[#94A3B8] uppercase">Profile Complete</p>
                        <p className="mt-2 text-[10px] font-medium text-[#FF6B00]">Add video to reach 80%</p>
                    </div>

                    {/* [2] Profile Views */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-mono text-3xl font-black text-[#0F172A] dark:text-[#F5F5F5]">
                                    {player.totalViews.toLocaleString('en-US')}
                                </p>
                                <p className="mt-1 text-sm text-[#475569] dark:text-[#9A9A9A]">Profile Views</p>
                            </div>
                            <Eye className="h-5 w-5 text-[#FF6B00]" />
                        </div>
                        <div className="mt-2 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500 dark:text-green-400" />
                            <span className="text-xs font-medium text-green-500 dark:text-green-400">{player.trend}% this week</span>
                        </div>
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-2 h-12 w-full">
                            <polyline points={sparkPoints} fill="none" stroke="#FF6B00" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </svg>
                    </div>

                    {/* [3] Scout Interest */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-mono text-3xl font-black text-[#0F172A] dark:text-[#F5F5F5]">{player.scoutInterest}</p>
                                <p className="mt-1 text-sm text-[#475569] dark:text-[#9A9A9A]">Scout Ratings</p>
                            </div>
                            <Star className="h-5 w-5 fill-[#FF6B00] text-[#FF6B00]" />
                        </div>
                        <div className="mt-2 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" />
                            <span className="text-xs font-medium text-[#475569] dark:text-[#9A9A9A]">Average {player.avgRating} / 5.0</span>
                        </div>
                        <Progress value={84} className="mt-3 h-2 bg-[#E2E8F0] dark:bg-[#2A2A2A] [&>div]:bg-[#FF6B00]" />
                    </div>

                    {/* [4] Subscription */}
                    <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]">
                        {player.subscription === 'free' ? (
                            <>
                                <Badge className="w-fit border border-[#FF6B00] bg-[#FFF3EB] text-[10px] font-bold tracking-wider text-[#CC5500] hover:bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                    FREE PLAN
                                </Badge>
                                <p className="mt-3 flex-1 text-sm text-[#475569] dark:text-[#9A9A9A]">Unlock all features and reach more scouts.</p>
                                <Link href="/player/upgrade" className="mt-3">
                                    <Button size="sm" className="w-full bg-[#FF6B00] font-semibold text-white hover:bg-[#CC5500]">
                                        <Crown className="mr-1.5 h-3.5 w-3.5" />
                                        Upgrade to Premium
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Badge className="w-fit border border-green-600 bg-green-100 text-[10px] font-bold tracking-wider text-green-700 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400">
                                    PREMIUM ACTIVE
                                </Badge>
                                <p className="mt-3 flex-1 text-sm text-[#475569] dark:text-[#9A9A9A]">All features unlocked.</p>
                                <p className="mt-3 text-xs text-[#94A3B8]">Renews 01/06/2026</p>
                            </>
                        )}
                    </div>
                </section>

                {/* AD ZONE — 728×90 TransferRoom */}
                <section>
                    <div className="relative flex h-[90px] items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] px-4 sm:gap-4 sm:px-6">
                        <div className="flex flex-shrink-0 items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6B00]">
                                <ArrowRight className="h-5 w-5 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-lg leading-none font-black tracking-tight text-white">TRANSFERROOM</p>
                                <p className="mt-0.5 text-[10px] tracking-wider text-white/50 uppercase">Football Transfer Network</p>
                            </div>
                        </div>
                        <p className="hidden flex-1 text-xs text-white/70 sm:text-sm md:block">
                            The transfer platform trusted by 1,200+ clubs worldwide.
                        </p>
                        <Button size="sm" className="ml-auto flex-shrink-0 bg-[#FF6B00] font-semibold text-white hover:bg-[#CC5500]">
                            Start Free →
                        </Button>
                        <span className="absolute top-1 right-2 text-[10px] text-white/30">Sponsored</span>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* COMPLETION CHECKLIST */}
                    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]">
                        <div className="mb-1 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F5F5F5]">Complete Your Profile</h2>
                            <span className="font-mono text-sm font-bold text-[#FF6B00]">{checklistOverall}%</span>
                        </div>
                        <Progress value={checklistOverall} className="mb-5 h-2 bg-[#E2E8F0] dark:bg-[#2A2A2A] [&>div]:bg-[#FF6B00]" />

                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 py-2">
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" />
                                <span className="flex-1 text-sm text-[#0F172A] dark:text-[#F5F5F5]">Basic information added</span>
                            </li>
                            <li className="flex items-center gap-3 py-2">
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" />
                                <span className="flex-1 text-sm text-[#0F172A] dark:text-[#F5F5F5]">Profile photo uploaded</span>
                            </li>
                            <li className="flex items-center gap-3 py-2">
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" />
                                <span className="flex-1 text-sm text-[#0F172A] dark:text-[#F5F5F5]">Position and modality set</span>
                            </li>
                            <li className="flex items-center gap-3 border-t border-[#E2E8F0] py-2 pt-3 dark:border-[#2A2A2A]">
                                <Circle className="h-5 w-5 flex-shrink-0 text-[#94A3B8] dark:text-[#555555]" />
                                <span className="flex-1 text-sm text-[#475569] dark:text-[#9A9A9A]">Add highlight video</span>
                                <Link href="/player/videos/new">
                                    <Button size="sm" className="h-8 bg-[#FF6B00] text-xs text-white hover:bg-[#CC5500]">
                                        <Video className="mr-1 h-3 w-3" />
                                        Add Video
                                    </Button>
                                </Link>
                            </li>
                            <li className="flex items-center gap-3 py-2">
                                <Circle className="h-5 w-5 flex-shrink-0 text-[#94A3B8] dark:text-[#555555]" />
                                <span className="flex-1 text-sm text-[#475569] dark:text-[#9A9A9A]">Add club history</span>
                                <Link href="/player/history">
                                    <Button size="sm" className="h-8 bg-[#FF6B00] text-xs text-white hover:bg-[#CC5500]">
                                        <History className="mr-1 h-3 w-3" />
                                        Add History
                                    </Button>
                                </Link>
                            </li>
                            <li className="flex items-center gap-3 py-2">
                                <Circle className="h-5 w-5 flex-shrink-0 text-[#94A3B8] dark:text-[#555555]" />
                                <span className="flex-1 text-sm text-[#475569] dark:text-[#9A9A9A]">Upgrade to Premium</span>
                                <Link href="/player/upgrade">
                                    <Button size="sm" className="h-8 bg-[#FF6B00] text-xs text-white hover:bg-[#CC5500]">
                                        Upgrade →
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </section>

                    {/* RECENT VIEWS CARD */}
                    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]">
                        <div className="mb-5 flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F5F5F5]">Recent Profile Views</h2>
                                <p className="mt-1 text-xs text-[#94A3B8]">Who visited your profile</p>
                            </div>
                            <Link href="/player/views" className="text-xs font-semibold text-[#FF6B00] hover:text-[#CC5500]">
                                View all →
                            </Link>
                        </div>

                        <ul className="space-y-3">
                            {recentViews.map((view) => {
                                const initials = view.org
                                    .split(' ')
                                    .slice(0, 2)
                                    .map((w) => w[0])
                                    .join('')
                                    .toUpperCase();
                                return (
                                    <li
                                        key={view.id}
                                        className="relative flex items-center gap-3 rounded-xl border border-[#E2E8F0] p-3 transition-colors hover:border-[#FF6B00] dark:border-[#2A2A2A] dark:hover:border-[#FF6B00]"
                                    >
                                        <div
                                            className={
                                                view.locked ? 'flex flex-1 items-center gap-3 blur-sm filter' : 'flex flex-1 items-center gap-3'
                                            }
                                        >
                                            <Avatar className="h-10 w-10 flex-shrink-0">
                                                <AvatarFallback className="bg-[#FFF3EB] text-xs font-bold text-[#CC5500] dark:bg-[rgba(255,107,0,0.12)]">
                                                    {initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]">
                                                    {view.type} from {view.org}
                                                </p>
                                                <div className="mt-0.5 flex items-center gap-2">
                                                    <span className="text-xs text-[#475569] dark:text-[#9A9A9A]">
                                                        {view.flag} {view.country}
                                                    </span>
                                                    <span className="text-[#94A3B8]">•</span>
                                                    <span className="text-xs text-[#94A3B8]">{view.time}</span>
                                                </div>
                                            </div>
                                            {!view.locked && (
                                                <Link
                                                    href={`/player/views/${view.id}`}
                                                    className="flex-shrink-0 text-xs font-semibold text-[#FF6B00] hover:text-[#CC5500]"
                                                >
                                                    View →
                                                </Link>
                                            )}
                                        </div>

                                        {view.locked && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/60 dark:bg-[#161616]/60">
                                                <div className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 dark:border-[#2A2A2A] dark:bg-[#1F1F1F]">
                                                    <Lock className="h-3.5 w-3.5 text-[#FF6B00]" />
                                                    <span className="text-xs font-medium text-[#475569] dark:text-[#9A9A9A]">
                                                        Upgrade to Premium to unlock
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </div>

                {/* COUNTRY ANALYTICS */}
                <section className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]">
                    <div className="mb-5 flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F5F5F5]">Country Analytics</h2>
                            <p className="mt-1 text-xs text-[#94A3B8]">Where your profile views come from</p>
                        </div>
                        {player.subscription === 'premium' && (
                            <Badge className="border border-[#FF6B00] bg-[#FFF3EB] text-[10px] font-bold tracking-wider text-[#CC5500] hover:bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                PREMIUM
                            </Badge>
                        )}
                    </div>

                    <div className={player.subscription === 'free' ? 'pointer-events-none blur-md filter select-none' : ''}>
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={countryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-[#2A2A2A]" vertical={false} />
                                    <XAxis dataKey="country" stroke="#94A3B8" style={{ fontSize: '12px' }} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#161616',
                                            border: '1px solid #2A2A2A',
                                            borderRadius: '8px',
                                            color: '#F5F5F5',
                                            fontSize: '12px',
                                        }}
                                        cursor={{ fill: 'rgba(255,107,0,0.08)' }}
                                    />
                                    <Bar dataKey="views" fill="#FF6B00" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {player.subscription === 'free' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-[#161616]/40">
                            <div className="mx-4 max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-xl dark:border-[#2A2A2A] dark:bg-[#1F1F1F]">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                    <Lock className="h-6 w-6 text-[#FF6B00]" />
                                </div>
                                <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F5F5F5]">Country Analytics — Premium Feature</h3>
                                <p className="mt-2 text-sm text-[#475569] dark:text-[#9A9A9A]">
                                    See exactly which countries are watching your highlights.
                                </p>
                                <Link href="/player/upgrade" className="mt-4 inline-block">
                                    <Button className="bg-[#FF6B00] font-semibold text-white hover:bg-[#CC5500]">
                                        <Crown className="mr-2 h-4 w-4" />
                                        Upgrade to Premium
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
