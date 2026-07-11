import PlayerNavbar from '@/components/player/PlayerNavbar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPositionName } from '@/utils/helper';
import { Progress } from '@/components/ui/progress';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import {
    Share2,
    Download,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Smartphone,
    Circle,
    Crown,
    Eye,
    Flag,
    History,
    Lock,
    MapPin,
    Star,
    TrendingUp,
    User,
    Video,
    Shirt,
    Footprints,
    ShieldCheck,
    Ruler,
    Weight,
    Shield,
    UserPen,
    Image as ImageIcon,
    MapPinned,
} from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
// MOCK DATA (realistic)
// TODO: Replace with usePage<PageProps & {player:typeof player, recentViews:typeof recentViews}>().props
const player = {
    name: 'Benjamin',
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
const getCountryName = (code?: string) => {
    if (!code) return '';
    return new Intl.DisplayNames(['en'], {
        type: 'region',
    }).of(code) || code;
};
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
// ekta value "filled" kina — null/undefined/khali string na hole true
const nonEmpty = (v: any): boolean =>
    v !== null && v !== undefined && String(v).trim() !== '';
// player profile edit page — sob "add" button ekhane niye jabe
const EDIT_HREF = '/player/profile/edit';
export default function PlayerDashboard() {

    const { auth } = usePage().props as any;
    const pp = auth?.user?.player_profile ?? {};
    const greeting = getGreeting();
    const dateStr = formatDate();


    // ── PROFILE COMPLETION ────────────────────────────────────────────
    // Registration theke: name, dob, nationality. Baki gula profile edit theke.
    const completionChecks: boolean[] = [
        nonEmpty(auth?.user?.name),          // registration
        nonEmpty(auth?.user?.dob),           // registration
        nonEmpty(auth?.user?.nationality),   // registration
        nonEmpty(pp.gender),
        nonEmpty(pp.height),
        nonEmpty(pp.weight),
        nonEmpty(pp.birth_city),
        nonEmpty(pp.birth_country),
        nonEmpty(pp.current_club),
        nonEmpty(pp.in_team_since),
        nonEmpty(pp.modality),
        nonEmpty(pp.foot),
        nonEmpty(pp.photo_path),
        nonEmpty(pp.video_url),
        nonEmpty(pp.description),
        Array.isArray(pp.positions) && pp.positions.length > 0,
        Array.isArray(pp.club_history) && pp.club_history.some((r: any) => nonEmpty(r?.club)),
    ];
    const profileComplete = Math.round(
        (completionChecks.filter(Boolean).length / completionChecks.length) * 100
    );
    // ── COMPLETE-YOUR-PROFILE CHECKLIST (dynamic) ─────────────────────
    // Protiti incomplete item-e "add" button ache — click korle edit page-e giye
    // field bhorle, save-er por % barbe.
    const checklist: {
        label: string;
        done: boolean;
        href: string;
        cta: string;
        icon?: typeof Video;
    }[] = [
            {
                label: 'Basic information added',
                done: nonEmpty(auth?.user?.name) && nonEmpty(auth?.user?.dob) && nonEmpty(auth?.user?.nationality),
                href: EDIT_HREF,
                cta: 'Complete',
                icon: UserPen,
            },
            {
                label: 'Profile photo uploaded',
                done: nonEmpty(pp.photo_path),
                href: EDIT_HREF,
                cta: 'Upload Photo',
                icon: ImageIcon,
            },
            {
                label: 'Position and modality set',
                done: Array.isArray(pp.positions) && pp.positions.length > 0 && nonEmpty(pp.modality),
                href: EDIT_HREF,
                cta: 'Set Position',
                icon: MapPinned,
            },
            {
                label: 'Add highlight video',
                done: nonEmpty(pp.video_url),
                href: EDIT_HREF,
                cta: 'Add Video',
                icon: Video,
            },
            {
                label: 'Add club history',
                done: Array.isArray(pp.club_history) && pp.club_history.some((r: any) => nonEmpty(r?.club)),
                href: EDIT_HREF,
                cta: 'Add History',
                icon: History,
            },
            {
                label: 'Upgrade to Premium',
                done: player.subscription === 'premium',
                href: '/player/upgrade',
                cta: 'Upgrade →',
                icon: Crown,
            },
        ];
    const circumference = 276.46;
    const dashOffset = circumference - (profileComplete / 100) * circumference;
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
    const playerInfo = [
        {
            icon: <Shirt className="w-4 h-4 text-gray-300" />,
            label: 'POSITION',
            value: getPositionName(auth?.user?.player_profile?.positions),
        },
        {
            icon: <Footprints className="w-4 h-4 text-gray-300" />,
            label: 'PREFERRED FOOT',
            value: pp?.foot ? pp.foot : 'Not specified',
        },
        {
            icon: <Ruler className="w-4 h-4 text-gray-300" />,
            label: 'HEIGHT',
            value: pp?.height ? `${pp.height} cm` : 'Not specified',
        },
        {
            icon: <Weight className="w-4 h-4 text-gray-300" />,
            label: 'WEIGHT',
            value: pp?.weight ? `${pp.weight} kg` : 'Not specified',
        },
        {
            icon: <Shield className="w-4 h-4 text-gray-300" />,
            label: 'CLUB',
            value: pp?.current_club ? `${pp.current_club}` : 'Not specified',
        },
        {
            icon: <CalendarDays className="w-4 h-4 text-gray-300" />,
            label: 'MEMBER SINCE',
            value: pp?.in_team_since
                ? new Date(pp.in_team_since).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : 'Not specified',
        },
    ];

    const shareProfile = async () => {
        // const profileUrl = `${window.location.origin}/players/${auth?.user?.id}`;
        const profileUrl = `${window.location.origin}/player`;
        const shareData = {
            title: `${auth?.user?.name} — HiLights Football`,
            text: `Check out ${auth?.user?.name}'s player profile on HiLights Football`,
            url: profileUrl,
        };

        // 1) Native share (mobile / HTTPS)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch {
                return; // user cancel korle thamo
            }
        }

        // 2) Modern clipboard — SHUDHU secure context-e (nahole undefined)
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(profileUrl);
                alert('Profile link copied to clipboard!');
                return;
            } catch {
                // niche fallback-e jabe
            }
        }

        // 3) Fallback — HTTP .test-e-o kaj kore (purano execCommand)
        try {
            const ta = document.createElement('textarea');
            ta.value = profileUrl;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            alert('Profile link copied to clipboard!');
        } catch {
            prompt('Copy this profile link:', profileUrl); // sesheও na hole
        }
    };

    const cardRef = useRef<HTMLDivElement>(null);

    const downloadCard = async () => {
        if (!cardRef.current) return;
        try {
            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                pixelRatio: 2, // HD quality
            });
            const link = document.createElement('a');
            link.download = `${auth?.user?.name ?? 'member'}-card.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Card download failed:', err);
            alert('Could not download card. Please try again.');
        }
    };
    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-16">
            <PlayerNavbar />
            {/* PAGE HEADER */}
            <header className="border-b border-[#2A2A2A] bg-[#0D0D0D] px-4 py-5 sm:px-8">
                <div className="mx-auto max-w-[1300px]">
                    <h1 className="font-display text-2xl font-bold text-[#F5F5F5] sm:text-3xl">
                        {greeting}, {auth?.user?.name}
                    </h1>
                    <p className="mt-1 text-sm text-[#9A9A9A]">{dateStr}</p>
                </div>
            </header>
            <main className="mx-auto max-w-[1300px] space-y-6 px-4 py-6 sm:px-8 sm:py-8">
                {/* WIDGETS ROW */}
                <section className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_450px]">
                    {/* [1] Profile Complete */}
                    <div className="grid grid-cols-2 gap-4 h-[500px]">
                        <div className="flex flex-col items-center rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                            <div className="relative h-[112px] w-[112px]">
                                <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
                                    <circle cx="56" cy="56" r="44" fill="none" strokeWidth="10" className="stroke-[#2A2A2A]" />
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
                                    <span className="font-display text-3xl font-black text-[#F5F5F5]">
                                        {profileComplete}%
                                    </span>
                                </div>
                            </div>
                            <p className="mt-3 text-xs tracking-wider text-[#94A3B8] uppercase">Profile Complete</p>
                            <p className="mt-2 text-[10px] font-medium text-[#FF6B00]">
                                {profileComplete < 100
                                    ? `${100 - profileComplete}% left to complete your profile`
                                    : 'Your profile is complete'}
                            </p>
                        </div>
                        {/* [2] Profile Views */}
                        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-mono text-3xl font-black text-[#F5F5F5]">
                                        {player.totalViews.toLocaleString('en-US')}
                                    </p>
                                    <p className="mt-1 text-sm text-[#9A9A9A]">Profile Views</p>
                                </div>
                                <Eye className="h-5 w-5 text-[#FF6B00]" />
                            </div>
                            <div className="mt-2 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3 text-green-400" />
                                <span className="text-xs font-medium text-green-400">{player.trend}% this week</span>
                            </div>
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-2 h-12 w-full">
                                <polyline points={sparkPoints} fill="none" stroke="#FF6B00" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            </svg>
                        </div>
                        {/* [3] Scout Interest */}
                        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-mono text-3xl font-black text-[#F5F5F5]">{player.scoutInterest}</p>
                                    <p className="mt-1 text-sm text-[#9A9A9A]">Scout Ratings</p>
                                </div>
                                <Star className="h-5 w-5 fill-[#FF6B00] text-[#FF6B00]" />
                            </div>
                            <div className="mt-2 flex items-center gap-1">
                                <Star className="h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" />
                                <span className="text-xs font-medium text-[#9A9A9A]">Average {player.avgRating} / 5.0</span>
                            </div>
                            <Progress value={84} className="mt-3 h-2 bg-[#2A2A2A] [&>div]:bg-[#FF6B00]" />
                        </div>
                        {/* [4] Subscription */}
                        <div className="flex flex-col rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                            {player.subscription === 'free' ? (
                                <>
                                    <Badge className="w-fit border border-[#FF6B00] bg-[rgba(255,107,0,0.12)] text-[10px] font-bold tracking-wider text-[#FF6B00] hover:bg-[rgba(255,107,0,0.12)]">
                                        FREE PLAN
                                    </Badge>
                                    <p className="mt-3 flex-1 text-sm text-[#9A9A9A]">
                                        Unlock all features and reach more scouts.
                                    </p>
                                    <Link href="/player/upgrade" className="mt-3">
                                        <Button className="w-full bg-[#FF6B00] p-3 font-semibold text-white hover:bg-[#CC5500]">
                                            <Crown className="mr-1.5 h-3.5 w-3.5" />
                                            <span className="text-[12px]">
                                                Upgrade to <br className="block" /> Premium
                                            </span>
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Badge className="w-fit border border-green-600 bg-green-950/30 text-[10px] font-bold tracking-wider text-green-400 hover:bg-green-950/30">
                                        PREMIUM ACTIVE
                                    </Badge>
                                    <p className="mt-3 flex-1 text-sm text-[#9A9A9A]">All features unlocked.</p>
                                    <p className="mt-3 text-xs text-[#94A3B8]">Renews 01/06/2026</p>
                                </>
                            )}
                        </div>
                    </div>
                    {/* right side */}
                    <div className="mx-auto mb-16">
                        <div ref={cardRef} className="w-[300px] sm:w-[420px] border-1 border-gray-600 rounded-[16px] bg-black">
                            <div className="overflow-hidden text-white">
                                {/* Left Section */}
                                <div className="flex items-center justify-between">
                                    {/* Logo */}
                                    <div className="pl-3 sm:pl-4">
                                        <img src="/images/logo/final_logo.png" alt="new-logo" className="w-[125px] sm:w-[170px]" />
                                    </div>
                                    <div className="-translate-x-[15%] sm:-translate-x-[30%] translate-y-[20%]">
                                        <h2 className="text-center font-bold uppercase text-[11px] sm:text-[14px]">
                                            MEMBER CARD
                                        </h2>
                                        <p className="text-center text-[8px] sm:text-[10px] font-semibold text-orange-500 uppercase">Official Member</p>
                                        <svg width="130" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="10" y1="12" x2="70" y2="12" stroke="#6B7280" strokeWidth="1" />
                                            <path
                                                d="M90 4L92.35 9.15L98 9.8L94 13.6L95.2 19L90 16L84.8 19L86 13.6L82 9.8L87.65 9.15L90 4Z"
                                                fill="#F97316"
                                            />
                                            <line x1="110" y1="12" x2="170" y2="12" stroke="#6B7280" strokeWidth="1" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative flex gap-2 sm:gap-4 pl-4 pt-2 border-b-1 border-gray-400">
                                    {/* Image */}
                                    <div className="h-[160px] w-[95px] sm:h-[210px] sm:w-[130px] mb-3">
                                        <img
                                            src={auth?.user?.player_profile?.photo_url || '/images/img/placeholder.webp'}
                                            alt="player"
                                            className="h-full w-full rounded-[10px] sm:rounded-[12px] border-1 border-gray-400 object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="relative z-10">
                                            <h3 className="mt-2 text-[12px] sm:mt-4 sm:text-[16px] font-bold uppercase">
                                                {auth?.user?.name}
                                            </h3>
                                            <p className="text-[8px] sm:text-[10px] text-[#f05300] uppercase">
                                                {getPositionName(auth?.user?.player_profile?.positions)}
                                            </p>
                                            <div className="absolute mt-2 h-[1px] bg-orange-500 w-[80%] sm:w-[110%]"></div>
                                        </div>
                                        <div className="mt-6 space-y-1">
                                            <div className="flex items-center">
                                                <User className="mr-[5px] sm:mr-[10px] w-4 h-4 sm:w-5 sm:h-5 text-[#f06200]" />
                                                <p className="z-10 text-[8px] md:text-[10px] text-[#c7c7c7] uppercase">
                                                    ID:
                                                    <br />
                                                    <span className="text-white">HLF-00012345</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <CalendarDays className="mr-[5px] sm:mr-[10px] w-4 h-4 sm:w-5 sm:h-5 text-[#f06200]" />
                                                <p className="z-10 text-[8px] md:text-[10px] text-[#c7c7c7] uppercase">
                                                    DATE OF BIRTH:
                                                    <br />
                                                    <span className="text-white">{auth?.user?.dob &&
                                                        new Date(auth?.user?.dob).toLocaleDateString('en-US', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })
                                                    }</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <Flag className="mr-[5px] sm:mr-[10px] w-4 h-4 sm:w-5 sm:h-5 text-[#f06200]" />
                                                <p className="z-10 text-[8px] md:text-[10px] text-[#c7c7c7] uppercase">
                                                    NATIONALITY:
                                                    <br />
                                                    <span className="text-white">{getCountryName(auth?.user?.nationality)}</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="mr-[5px] sm:mr-[10px] w-4 h-4 sm:w-5 sm:h-5 text-[#f06200]" />
                                                <p className="z-10 text-[8px] md:text-[10px] text-[#c7c7c7] uppercase">
                                                    CITY:
                                                    <br />
                                                    <span className="text-white">{auth?.user?.player_profile?.birth_city || 'N/A'}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="absolute right-0 bottom-0 z-0">
                                            <img src="/images/img/orange-img.png" alt="" className="w-[50px] sm:w-[60px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#191917] p-4 sm:p-6 text-white">
                                <div className="grid gap-3 sm:gap-6 grid-cols-2">
                                    {/* Left Side */}
                                    <div className="relative">
                                        <div className="absolute top-0 -right-4 w-[1px] h-full border-r border-white/10"></div>
                                        <h2 className="mb-2 text-[10px] font-bold text-[#f4620c] uppercase">Player Info</h2>
                                        <div className="space-y-2">
                                            {playerInfo.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-b-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[#d2d2d2]">{item.icon}</span>
                                                        <span className="text-[8px] pr-2 text-[#d2d2d2] uppercase">{item.label}</span>
                                                    </div>
                                                    <span className="text-[7px] sm:text-[8px] font-medium text-white uppercase">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Right Side */}
                                    <div className="pl-4 sm:pl-3">
                                        <h2 className="text-[10px] font-bold text-[#f4620c] uppercase">Scan To View Profile</h2>
                                        <p className="mt-1 mb-6 text-[8px] text-[#f1f1f1] uppercase">Open Your Camera And Scan</p>
                                        {/* QR Area */}
                                        <div className="w-fit rounded-[8px] sm:rounded-xl border-2 sm:border-[3px] border-[#ff6600] bg-white sm:p-3 p-2">
                                            <QRCodeSVG
                                                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/player`}
                                                size={90}
                                                level="M"
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                                className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px]"
                                            />
                                        </div>
                                        {/* Button */}
                                        <button className="mt-2 flex items-center rounded-xl bg-[#ff6600] px-1.5 py-1.5 sm:px-2 sm:py-2 font-bold text-black uppercase transition-all hover:bg-[#ff7a1a]">
                                            <span className=" text-black pr-1">
                                                <Smartphone className="h-6 w-4" />
                                            </span>
                                            <span className="text-left text-[6px] sm:text-[8px] leading-tight">
                                                VIEW FULL PROFILE, VIDEOS,
                                                <br />
                                                STATS AND ACHIEVEMENTS
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center relative w-full -mt-2  border-t-1 border-gray-600 p-3 sm:p-6 bg-[url('/images/img/layer.png')] bg-cover bg-center bg-no-repeat rounded-bl-[16px] rounded-br-[16px]">
                                <p className=" flex justify-between items-center text-[7px] sm:text-[8px] -ml-3 text-gray-300 pl-1">
                                    <Shield className="w-6 h-6 " />
                                    <span className="pl-2">THIS CARD IDENTIFIES THE HOLDER AS AN OFFICIAL<br className="hidden sm:block" />
                                        MEMBER OF HILIGHTS FOOTBALL PLATFORM.</span>
                                </p>
                                <p className="text-[6px] sm:text-[8px] text-black font-bold translate-x-[5px] sm:translate-x-[10%]">WWW.HILIGHTSFOOTBALL.COM</p>
                                <div className="absolute -bottom-10 left-0 flex justify-between w-full">
                                    <button className="capitalize flex items-center rounded-xl bg-[#e75502] px-1.5 py-1.5 sm:px-2 sm:py-2 font-bold text-white sm:text-[16px] text-[10px] transition-all hover:bg-[#ff7a1a]" onClick={shareProfile}>
                                        <Share2 className="mr-2 w-[10px] h-[10px] sm:h-[12px]" />
                                        Share full profile
                                    </button>
                                    <button
                                        onClick={downloadCard}
                                        className="capitalize flex items-center rounded-xl bg-black px-1.5 py-1.5 sm:px-2 sm:py-2 font-bold border-1  text-white text-[10px] transition-all"
                                    >
                                        <Download className="mr-2 w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]" />
                                        download member card
                                    </button>
                                </div>
                            </div>
                        </div>
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
                    <section className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                        <div className="mb-1 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[#F5F5F5]">Complete Your Profile</h2>
                            <span className="font-mono text-sm font-bold text-[#FF6B00]">{profileComplete}%</span>
                        </div>
                        <Progress value={profileComplete} className="mb-5 h-2 bg-[#2A2A2A] [&>div]:bg-[#FF6B00]" />
                        <ul className="space-y-3">
                            {checklist.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <li key={i} className="flex items-center gap-3 py-2">
                                        {item.done ? (
                                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-400" />
                                        ) : (
                                            <Circle className="h-5 w-5 flex-shrink-0 text-[#555555]" />
                                        )}
                                        <span className={`flex-1 text-sm ${item.done ? 'text-[#F5F5F5]' : 'text-[#9A9A9A]'}`}>
                                            {item.label}
                                        </span>
                                        {!item.done && (
                                            <Link href={item.href}>
                                                <Button size="sm" className="h-8 bg-[#FF6B00] text-xs text-white hover:bg-[#CC5500]">
                                                    {Icon && <Icon className="mr-1 h-3 w-3" />}
                                                    {item.cta}
                                                </Button>
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                    {/* RECENT VIEWS CARD */}
                    <section className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                        <div className="mb-5 flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-[#F5F5F5]">Recent Profile Views</h2>
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
                                        className="relative flex items-center gap-3 rounded-xl border border-[#2A2A2A] p-3 transition-colors hover:border-[#FF6B00]"
                                    >
                                        <div
                                            className={
                                                view.locked ? 'flex flex-1 items-center gap-3 blur-sm filter' : 'flex flex-1 items-center gap-3'
                                            }
                                        >
                                            <Avatar className="h-10 w-10 flex-shrink-0">
                                                <AvatarFallback className="bg-[rgba(255,107,0,0.12)] text-xs font-bold text-[#FF6B00]">
                                                    {initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold text-[#F5F5F5]">
                                                    {view.type} from {view.org}
                                                </p>
                                                <div className="mt-0.5 flex items-center gap-2">
                                                    <span className="text-xs text-[#9A9A9A]">
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
                                            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#161616]/60">
                                                <div className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1F1F1F] px-3 py-1.5">
                                                    <Lock className="h-3.5 w-3.5 text-[#FF6B00]" />
                                                    <span className="text-xs font-medium text-[#9A9A9A]">
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
                <section className="relative overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                    <div className="mb-5 flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-[#F5F5F5]">Country Analytics</h2>
                            <p className="mt-1 text-xs text-[#94A3B8]">Where your profile views come from</p>
                        </div>
                        {player.subscription === 'premium' && (
                            <Badge className="border border-[#FF6B00] bg-[rgba(255,107,0,0.12)] text-[10px] font-bold tracking-wider text-[#FF6B00] hover:bg-[rgba(255,107,0,0.12)]">
                                PREMIUM
                            </Badge>
                        )}
                    </div>
                    <div className={player.subscription === 'free' ? 'pointer-events-none blur-md filter select-none' : ''}>
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={countryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
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
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D]/40">
                            <div className="mx-4 max-w-md rounded-2xl border border-[#2A2A2A] bg-[#1F1F1F] p-8 text-center shadow-xl">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,107,0,0.12)]">
                                    <Lock className="h-6 w-6 text-[#FF6B00]" />
                                </div>
                                <h3 className="text-base font-bold text-[#F5F5F5]">Country Analytics — Premium Feature</h3>
                                <p className="mt-2 text-sm text-[#9A9A9A]">
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
        </div >
    );
}
