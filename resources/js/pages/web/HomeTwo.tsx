import React from 'react'
import PublicNavbar from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/PublicFooter';
import ReactCountryFlag from "react-country-flag";
import { usePage } from '@inertiajs/react';
import { getPositionName } from '@/utils/helper';
import {
    CirclePlay,
    UserRoundPlus,
    User,
    Play,
    Megaphone,
    Users,
    UserPlus,
    Star,
    Ruler,
    Clock3,
    ArrowRight
} from "lucide-react";
import { Link } from '@inertiajs/react';

const getCountryName = (code?: string | string[] | null): string => {
    if (!code) return '';

    const codes = Array.isArray(code) ? code : [code];

    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    return codes
        .map(c => {
            try {
                return regionNames.of(c) || c;
            } catch {
                return c; // invalid code fallback
            }
        })
        .join(', ');
};

interface PlayerItem {
    id: number;
    name: string | null;
    nationality: string[] | null;  // ✅ array of ISO country codes
    positions: string[] | null;
    current_club: string | null;
    photo_url: string | null;
    birth_city: string | null;
    height: string | null;
    dob: string | null;
    video_url: string | null;
}

const getEmbedUrl = (url?: string | null): string | null => {
    if (!url) return null;
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
    return null;
};

const HomeTwo = () => {
    const { url, props } = usePage();
    const auth = props.auth as {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string
        } | null;
    };
    const isLoggedIn = !!auth?.user;
    const dashboardHref =
        auth?.user?.role === 'player'
            ? '/player'
            : auth?.user?.role === 'agent'
                ? '/agent'
                : auth?.user?.role === 'club'
                    ? '/club'
                    : auth?.user?.role === 'admin'
                        ? '/admin'
                        : '/scouting';

    const steps = [
        {
            icon: User,
            step: "01",
            title: "CREATE YOUR PROFILE",
            desc: (
                <>
                    Build an organized, professional profile with your{" "}
                    <span className="text-[#ff6b00]">data</span>,{" "}
                    <span className="text-[#ff6b00]">club history</span>,{" "}
                    <span className="text-[#ff6b00]">
                        physical and technical characteristics
                    </span>
                    , and your{" "}
                    <span className="text-[#ff6b00]">achievements</span>.
                </>
            ),
        },
        {
            icon: Play,
            step: "02",
            title: "UPLOAD YOUR BEST VIDEOS",
            desc: (
                <>
                    Show the world your{" "}
                    <span className="text-[#ff6b00]">best moments</span>. Get{" "}
                    <span className="text-[#ff6b00]">improvement tips</span> to make
                    your videos more attractive to scouts, agents and clubs.
                </>
            ),
        },
        {
            icon: Megaphone,
            step: "03",
            title: "BE SEEN. BE DISCOVERED.",
            desc: (
                <>
                    A platform developed by professionals from various areas of football
                    with{" "}
                    <span className="text-[#ff6b00]">
                        over 20 years of experience worldwide
                    </span>
                    .
                </>
            ),
        },
    ];
    const [activeVideo, setActiveVideo] = React.useState<string | null>(null);

    const { players } = usePage<{ players: PlayerItem[] }>().props;

    return (
        <div className="bg-black text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
            <PublicNavbar />
            <main className="w-full max-w-screen-2xl mx-auto pt-16 xl:pt-20 2xl:pt-24">

                {/* SECTION 1: HERO */}
                <section
                    className="relative w-full overflow-hidden text-white"
                    style={{
                        backgroundImage: "url('/images/img/hero.jpg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right center',
                        backgroundSize: 'contain',
                    }}
                >
                    <div className="grid min-h-[380px] grid-cols-1 items-center sm:min-h-[440px] md:min-h-[520px] md:grid-cols-2 lg:min-h-[600px] xl:min-h-[680px] 2xl:min-h-[760px]">
                        {/* Left Content */}
                        <div className="px-6 py-14 sm:px-10 md:py-20 lg:px-16 2xl:px-20">
                            <div className="max-w-xl 2xl:max-w-2xl">
                                <h1 className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl md:text-[42px] lg:text-5xl xl:text-6xl 2xl:text-7xl">
                                    <span className="block text-white">Be Seen.</span>
                                    <span className="block text-[#ee5e00]">
                                        Be Discovered <span className="text-white">!</span>
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#f4f4f4] sm:text-base xl:text-lg 2xl:mt-8 2xl:max-w-xl 2xl:text-xl">
                                    The platform that connects players, clubs, agents and
                                    scouts through videos, statistics and professional
                                    profiles.
                                </p>

                                <p className="mt-4 max-w-lg border-l-2 border-[#b2300e] pl-3 text-sm leading-relaxed text-[#f4f4f4] sm:text-base xl:text-lg 2xl:max-w-xl 2xl:text-xl">
                                    Show your talent to the world and increase your
                                    opportunities in football.
                                </p>

                                {/* Buttons */}
                                <div className="mt-8 flex flex-wrap items-center gap-4 2xl:mt-10">
                                    <Link href={isLoggedIn ? dashboardHref : "/register"}>
                                        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#ea3905] px-4 py-3 text-xs font-semibold uppercase transition-all duration-300 hover:bg-orange-600 sm:text-sm lg:px-6 lg:py-3 lg:text-base 2xl:px-8 2xl:py-4 2xl:text-lg">
                                            <UserRoundPlus className="h-5 w-5 shrink-0 lg:h-6 lg:w-6 2xl:h-7 2xl:w-7" />
                                            <span className="text-left leading-tight">

                                                {isLoggedIn ? (
                                                    "Dashboard"
                                                ) : (
                                                    <>
                                                        Create A Free
                                                        <br />
                                                        Profile Now
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </Link>
                                    <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-600 px-4 py-3 text-xs font-semibold uppercase transition-all duration-300 hover:border-white sm:text-sm lg:px-6 lg:py-4 lg:text-base 2xl:px-8 2xl:text-lg">
                                        <CirclePlay className="h-5 w-5 shrink-0 lg:h-6 lg:w-6 2xl:h-7 2xl:w-7" />
                                        <span>Learn More</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right side is filled by the background image */}
                        <div className="hidden md:block" aria-hidden="true" />
                    </div>
                </section>

                {/* ADVERTISING */}
                <aside className="space-y-3 lg:px-10">
                    <div className="container mx-auto my-6 px-4">
                        <div className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-xl bg-[#464646] px-4 py-8 2xl:py-10">
                            <p className="text-sm font-medium tracking-widest text-white/50 uppercase 2xl:text-base">ADVERTISING SPACE</p>
                        </div>
                    </div>
                </aside>

                {/* SECTION 2: STEPS */}
                <section className="mx-auto max-w-7xl bg-black px-6 pt-10 text-white sm:px-10 lg:px-16 2xl:pt-14">
                    <div>
                        {/* Heading */}
                        <h2 className="mb-6 text-2xl font-extrabold uppercase leading-tight sm:text-3xl lg:text-4xl 2xl:mb-8 2xl:text-5xl">
                            A SIMPLE. PROFESSIONAL. <span className="text-[#df5f18]">EFFECTIVE PLATFORM.</span>
                        </h2>

                        {/* Steps */}
                        <div className="lg:max-w-5xl 2xl:max-w-6xl">
                            {steps.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="border-b border-[#1f1f1f]">
                                        <div className="grid grid-cols-[50px_60px_1fr] items-center py-5 md:grid-cols-[70px_90px_1fr] lg:max-w-4xl 2xl:max-w-5xl 2xl:py-7">
                                            {/* Icon */}
                                            <div className="flex justify-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 md:h-14 md:w-14 2xl:h-16 2xl:w-16">
                                                    <Icon className="h-5 w-5 text-[#ff6100] md:h-8 md:w-8 2xl:h-9 2xl:w-9" />
                                                </div>
                                            </div>
                                            {/* Step */}
                                            <div>
                                                <p className="text-[10px] font-bold text-[#ff6b00] md:text-sm 2xl:text-base">STEP</p>
                                                <h3 className="text-3xl leading-none font-extrabold text-[#ff6b00] md:text-5xl 2xl:text-6xl">{item.step}</h3>
                                            </div>
                                            {/* Content */}
                                            <div className="border-l-4 border-[#1f1f1f] pl-3 md:pl-5">
                                                <h3 className="mb-1 text-base font-extrabold uppercase sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg 2xl:text-xl">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom CTA */}
                        <div className="flex items-center gap-4 border-b border-[#1f1f1f] py-6 sm:grid sm:grid-cols-[70px_1fr_200px] md:grid-cols-[90px_1fr_300px] lg:grid-cols-[110px_1fr_320px] 2xl:grid-cols-[130px_1fr_360px] 2xl:py-8">
                            {/* Left Icon */}
                            <div className="flex justify-center">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e63e00] md:h-20 md:w-20 2xl:h-24 2xl:w-24">
                                    <Users className="text-white md:h-12 md:w-12 2xl:h-14 2xl:w-14" />
                                </div>
                            </div>
                            {/* Text */}
                            <div>
                                <h3 className="text-base leading-tight font-bold sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
                                    Not part of the <span className="text-[#ff6100]">HiLights Football</span>
                                    <br />
                                    community yet?
                                </h3>
                                <p className="mt-3 max-w-xl text-xs leading-relaxed text-[#efefef] sm:text-sm md:text-base 2xl:text-lg">
                                    Create your free profile, share your best moments and become visible to coaches, clubs and recruiters worldwide.
                                </p>
                            </div>
                            {/* Button */}
                            <div className="flex items-end justify-end lg:pr-4">
                                <Link href={isLoggedIn ? dashboardHref : "/register"}>
                                    <button className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#773a0c] px-4 py-2 transition hover:bg-[#ff6b00]/10 md:gap-4 lg:px-8 lg:py-4 2xl:px-10">
                                        <UserPlus className="h-6 w-6 shrink-0 text-white md:h-8 md:w-8 2xl:h-9 2xl:w-9" />
                                        <span className="text-left text-xs font-bold uppercase sm:text-sm lg:text-base 2xl:text-lg">
                                            {isLoggedIn ? (
                                                "Dashboard"
                                            ) : (
                                                <>
                                                    Create A Free
                                                    <br />
                                                    Profile Now
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ADVERTISING */}
                <aside className="space-y-3 lg:px-10">
                    <div className="container mx-auto my-6 px-4">
                        <div className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-xl bg-[#464646] px-4 py-8 2xl:py-10">
                            <p className="text-sm font-medium tracking-widest text-white/50 uppercase 2xl:text-base">ADVERTISING SPACE</p>
                        </div>
                    </div>
                </aside>

                {/* SECTION 3: COMMUNITY HIGHLIGHTS */}
                <section className="mx-auto mb-6 max-w-7xl overflow-x-hidden px-4 lg:px-13">
                    <div className="rounded-xl bg-[#f9f9f9] p-3 md:p-6 2xl:p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3">
                            <div className="flex items-center gap-2">
                                <Star size={18} fill="#ff6b00" className="text-[#f25704]" />
                                <h2 className="text-xs font-extrabold whitespace-nowrap text-[#222] uppercase md:text-sm lg:text-base 2xl:text-lg">
                                    Community Highlights
                                </h2>
                            </div>
                            <Link href={auth?.user ? auth.user.role === "player" ? "/player" : auth.user.role === "admin" ? "/admin" : auth.user.role === "agent" ? "/agent" : auth.user.role === "club" ? "/club" : "/scout" : "/register?role=scout"} > <button className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-[10px] font-bold whitespace-nowrap text-gray-700 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:text-xs"> View All <ArrowRight size={18} className="text-[#ff6b00] font-bold" /> </button> </Link>
                        </div>

                        {/* Rows */}
                        {players.map((player, index) => (
                            <Link key={player.id} href={auth?.user
                                ? `/player/profile/${player.id}`
                                : "/register?role=scout"}>
                                <div className="mb-2 grid grid-cols-[40px_1fr_70px_70px] items-center rounded-[12px] bg-white pr-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:grid-cols-[70px_1fr_80px_120px] md:grid-cols-[150px_1fr_120px_170px] 2xl:grid-cols-[180px_1fr_150px_200px]">
                                    {/* Thumbnail */}
                                    <div className="relative">
                                        <img
                                            src={player.photo_url || '/images/img/placeholder.webp'}
                                            alt={player.name ?? ''}
                                            className="rounded rounded-tl-[12px] rounded-bl-[12px] object-cover"
                                        />
                                        {player.video_url && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setActiveVideo(player.video_url);
                                                }}
                                                className="absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a00] cursor-pointer"
                                            >
                                                <Play size={12} fill="white" className="text-white" />
                                            </button>
                                        )}
                                    </div>
                                    {/* Info */}
                                    <div className="mr-2 px-1 md:px-6">
                                        <h3 className="text-sm font-bold whitespace-nowrap text-[#222] md:text-[15px] lg:text-base 2xl:text-lg">{player.name}</h3>
                                        <p className="text-xs whitespace-nowrap text-gray-600 md:text-sm 2xl:text-base">
                                            {getPositionName(player.positions ?? [])}
                                        </p>
                                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                                            {player?.nationality && player.nationality.length > 0 ? (
                                                player.nationality.map((code, idx) => (
                                                    <span key={`${code}-${idx}`} className="inline-flex items-center gap-1 text-xs whitespace-nowrap text-gray-700 md:text-sm 2xl:text-base">
                                                        <ReactCountryFlag
                                                            countryCode={code}
                                                            svg
                                                            style={{ width: '1.2em', height: '1.2em' }}
                                                        />
                                                        <span>{getCountryName(code)}</span>
                                                        {idx < player.nationality.length - 1 && <span>,</span>}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs text-gray-700">—</span>
                                            )}
                                        </div>
                                    </div>
                                    {/* Height */}
                                    <div className="mr-3 flex items-center justify-center gap-2 text-xs whitespace-nowrap text-[#222] md:text-sm lg:text-base 2xl:text-lg">
                                        <Ruler size={14} />
                                        <p>{player.height} cm</p>
                                    </div>
                                    {/* Age */}
                                    <div className="flex items-center justify-end gap-2 text-xs whitespace-nowrap text-[#222] md:ml-4 md:text-sm lg:text-base 2xl:text-lg">
                                        <Clock3 size={14} />
                                        {player?.dob && (() => {
                                            const dob = new Date(player.dob);
                                            const today = new Date();

                                            let age = today.getFullYear() - dob.getFullYear();

                                            const hasBirthdayPassed =
                                                today.getMonth() > dob.getMonth() ||
                                                (today.getMonth() === dob.getMonth() &&
                                                    today.getDate() >= dob.getDate());

                                            if (!hasBirthdayPassed) {
                                                age--;
                                            }

                                            return age < 18
                                                ? dob.getFullYear()
                                                : `${age} years`;
                                        })()}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {activeVideo && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                            onClick={() => setActiveVideo(null)}
                        >
                            <div
                                className="relative w-full max-w-3xl aspect-video"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setActiveVideo(null)}
                                    className="absolute -top-10 right-0 text-white text-3xl leading-none hover:text-[#ff6b00]"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                                {getEmbedUrl(activeVideo) ? (
                                    <iframe
                                        src={getEmbedUrl(activeVideo)!}
                                        title="Player video"
                                        className="w-full h-full rounded-xl"
                                        allow="autoplay; fullscreen"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center rounded-xl bg-[#161616] text-white">
                                        Invalid video URL
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <PublicFooter />
        </div>
    );
}

export default HomeTwo;
