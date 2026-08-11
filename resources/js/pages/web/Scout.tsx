import React from 'react'
import PublicNavbar from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/PublicFooter';
import ReactCountryFlag from "react-country-flag";
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
    Binoculars,
    ChartColumn,
    Send,
    ArrowRight
} from "lucide-react";
import { Link, usePage } from '@inertiajs/react';
const getCountryName = (code?: string | null) => {
    if (!code) return '';
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
};

const Scout = () => {


    const steps = [
        {
            icon: Binoculars,
            step: "01",
            title: "EARLY ACCESS TO TALENT",
            desc: (
                <>
                    Be the first to discover young players before they become known to the world.{" "}
                    {/* <span className="text-[#ff6b00]">data</span>,{" "} */}
                </>
            ),
        },
        {
            icon: Users,
            step: "02",
            title: "ADVANCED SEARCH AND FILTERS",
            desc: (
                <>
                    Find players by position, age, country, club, tournament, skills and much more.
                </>
            ),
        },
        {
            icon: ChartColumn,
            step: "03",
            title: "DETAILED PLAYER PROFILES",
            desc: (
                <>
                    Watch highlights, check stats, performance and player information all in one place.
                </>
            ),
        },
        {
            icon: Send,
            step: "04",
            title: "CONTACT TALENTS FOR FREE",
            desc: (
                <>
                    Get in touch directly with players or their representatives and start real connections.
                </>
            ),
        },
        {
            icon: Star,
            step: "04",
            title: "FOLLOW AND TRACK",
            desc: (
                <>
                    Follow your favorite players, receive updates and never miss a new talent.
                </>
            ),
        }
    ];
    const { auth, players } = usePage().props as any;
    const [activeVideo, setActiveVideo] = React.useState<string | null>(null);
    const getEmbedUrl = (url?: string | null): string | null => {
        if (!url) return null;
        const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
        const vm = url.match(/vimeo\.com\/(\d+)/);
        if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
        return null;
    };


    return (
        <div className="bg-black text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
            <PublicNavbar />

            <main className="pt-16">
                {/* ━━━ SECTION 1: HERO ━━━ */}

                <section
                    className="relative h-[100vh] w-full overflow-hidden bg-black text-white"
                    style={{
                        backgroundImage: "url('/images/img/scout_hero.jpeg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-26 grid grid-cols-[270px_1fr] sm:mb-10 sm:grid-cols-[300px_1fr] md:grid-cols-[380px_1fr] lg:grid-cols-2">
                            {/* Left Content */}
                            <div className="flex px-6 pt-16 sm:px-10 lg:px-16">
                                <div className="max-w-xl">
                                    <h1 className="text-[18px] leading-tight font-extrabold uppercase md:text-2xl lg:text-4xl">
                                        <span className="block text-white">BE THE FIRST</span>

                                        <span className="block text-[#fa5418]">TO SEE A RARE TALENT.</span>

                                        <span className="block text-white">BE THE DISCOVERER</span>

                                        <span className="block text-[#fa5418]">OF THE NEXT GREAT FOOTBALL STAR.</span>
                                    </h1>

                                    <div className="relative">
                                        <p className="mt-6 text-[12px] leading-relaxed text-[#e8e8e8] md:pr-8 md:text-[14px] lg:w-[300px] lg:text-base">
                                            At HiLights Football, you have the opportunity to discover, follow and contact great talents for free.
                                        </p>
                                        <div className="absolute top-17 left-0 z-0 flex w-[200%] flex-row gap-4 md:top-22 lg:top-25">
                                            <button className="flex items-center justify-center rounded-md bg-[#dd3e06] px-3 py-2 text-[10px] font-semibold uppercase transition-all duration-300 hover:bg-orange-600 md:px-6 md:text-sm">

                                                <Link
                                                    href={
                                                        auth?.user
                                                            ? auth.user.role === "player"
                                                                ? "/player"
                                                                : auth.user.role === "admin"
                                                                    ? "/admin"
                                                                    : auth.user.role === "agent"
                                                                        ? "/agent"
                                                                        : auth.user.role === "club"
                                                                            ? "/club"
                                                                            : "/scouting"
                                                            : "/register?role=scout"
                                                    }
                                                >
                                                    <span className="pl-2 inline-flex items-center gap-2">
                                                        {auth?.user ? (
                                                            "Dashboard"
                                                        ) : (
                                                            <>
                                                                <UserRoundPlus className="h-5 w-5 shrink-0" />
                                                                <span>
                                                                    Create A Free
                                                                    <br />
                                                                    Profile Now
                                                                </span>
                                                            </>
                                                        )}
                                                    </span>
                                                </Link>


                                            </button>

                                            <button className="flex items-center justify-center rounded-md border border-gray-600 bg-black px-3 py-2 text-[10px] font-semibold uppercase transition-all duration-300 hover:border-white md:px-6 md:py-4 md:text-sm">
                                                <CirclePlay className="h-6 w-6" />
                                                <span className="pl-2">Learn More</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Empty Section */}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl bg-black px-6 pt-2 text-white sm:px-10 lg:px-16">
                    <div className="mb-4 bg-[#363636] px-6 py-4 rounded-tl-[10px] rounded-tr-[10px]">
                        <p className="text-center text-white text-[12px] sm:text-[14px] md:text-[16px]"> WHY SCOUTS, AGENTS AND CLUBS CHOOSE HILIGHTS FOOTBALL </p>
                    </div>

                    <div className="">
                        {/* Steps */}
                        <div className="pr-4 pl-1 sm:pr-27 sm:pl-4 md:pr-30 md:pl-7 lg:max-w-5xl lg:pl-10">
                            {steps.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div className="lg:max-w-5x border-b border-[#1f1f1f]">
                                        <div key={index} className="grid grid-cols-[50px_1fr] items-center py-5 md:grid-cols-[70px_1fr] lg:max-w-4xl">
                                            {/* Icon */}
                                            <div className="flex justify-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 md:h-14 md:w-14">
                                                    <Icon className="h-4 w-4 text-[#e03c00] md:h-7 md:w-7" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="border-[#1f1f1f] pl-3 md:pl-5">
                                                <h3 className="mb-1 text-[14px] font-extrabold text-[#f93f04] uppercase sm:text-[16px] md:text-[18px] lg:text-[22px]">
                                                    {item.title}
                                                </h3>

                                                <p className="text-[12px] leading-relaxed text-[#eeeeee] sm:text-[14px] md:text-[16px] lg:text-[18px]">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom CTA */}
                        <div className="flex items-center gap-2 md:gap-4 border-1 border-[#393939] rounded-2xl py-6 sm:grid sm:grid-cols-[50px_1fr_150px] md:grid-cols-[90px_1fr_250px] lg:grid-cols-[110px_1fr_450px] px-2 md:px-4">
                            {/* Left Icon */}
                            <div className="flex justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dc4108] md:h-20 md:w-20">
                                    <Users className="text-white md:h-12 md:w-12" />
                                </div>
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className="text-[13px] leading-tight font-bold text-white sm:text-[14px] md:text-[16px] lg:text-[18px]">
                                    JOIN THOUSANDS OF SCOUTS, AGENTS AND CLUBS ALREADY ON HILIGHTS FOOTBALL.
                                </h3>

                                <p className="mt-1 text-[10px] leading-relaxed text-[#d9d9d9] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                                    Register now and start discovering the future of football.
                                </p>
                            </div>

                            {/* Button */}
                            <div className="flex items-end justify-end lg:pr-10">
                                <button className="sm:-w-45 flex items-center gap-2 rounded-xl bg-[#dc4108] px-4 py-2 transition md:gap-4 lg:px-6 lg:py-2">



                                    <Link
                                        href={
                                            auth?.user
                                                ? auth.user.role === "player"
                                                    ? "/player"
                                                    : auth.user.role === "admin"
                                                        ? "/admin"
                                                        : auth.user.role === "agent"
                                                            ? "/agent"
                                                            : auth.user.role === "club"
                                                                ? "/club"
                                                                : "/scouting"
                                                : "/register?role=scout"
                                        }
                                    >
                                        <span className="pl-2 inline-flex items-center gap-2">
                                            {auth?.user ? (
                                                "Dashboard"
                                            ) : (
                                                <>
                                                    <UserRoundPlus className="h-5 w-5 shrink-0" />
                                                    <span>
                                                        Create A Free
                                                        <br />
                                                        Profile Now
                                                    </span>
                                                </>
                                            )}
                                        </span>
                                    </Link>

                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto mt-10 mb-6 max-w-7xl overflow-x-hidden">
                    <div className="mx-auto w-[90%] rounded-xl bg-[#f9f9f9] p-3 md:p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3">
                            <div className="flex items-center gap-2">
                                <Star size={18} fill="#ff6b00" className="text-[#c45504]" />

                                <h2 className="text-[12px] font-extrabold whitespace-nowrap text-[#222] uppercase md:text-sm">
                                    TOP TALENTS YOU CAN DISCOVER TODAY
                                </h2>
                            </div>
                            <Link href={auth?.user ? auth.user.role === "player" ? "/player" : auth.user.role === "admin" ? "/admin" : auth.user.role === "agent" ? "/agent" : auth.user.role === "club" ? "/club" : "/scout" : "/register?role=scout"} > <button className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-[10px] font-bold whitespace-nowrap text-gray-700 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:text-xs"> View All <ArrowRight size={18} className="text-[#ff6b00] font-bold" /> </button> </Link>
                        </div>

                        {/* Rows */}
                        <div className="flex items-center justify-between overflow-x-auto pb-4">
                            {players.map((player: any, index: number) => (
                                <div key={index} className="w-[24%] rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                                    <Link key={index} href={auth?.user
                                        ? `/player/profile/${player.id}`
                                        : "/register?role=scout"}>
                                        {/* Thumbnail */}
                                        <div className="relative">
                                            <img src={player.photo_url || '/images/img/placeholder.webp'} className="h-[150px] w-full rounded object-cover" />

                                            {/* <button className="absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a00]">
                                                <Play size={12} fill="white" className="text-white" />
                                            </button> */}
                                            {player.video_url && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();          // Link navigate bondho koro
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
                                        <div className="mr-2 px-4 md:px-6">
                                            <h3 className="mt-2 text-[12px] font-bold whitespace-nowrap text-[#222] md:text-[15px]">{player.name}</h3>

                                            <p className="mt-1 text-[10px] whitespace-nowrap text-[#1a1a1a] md:text-xs">{getPositionName(player.positions ?? [])}</p>

                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-gray-700 md:text-sm 2xl:text-base">
                                                    {player?.nationality && (
                                                        <ReactCountryFlag
                                                            countryCode={player.nationality}
                                                            svg
                                                            style={{ width: '1.2em', height: '1.2em' }}
                                                        />
                                                    )}
                                                    <span>{getCountryName(player?.nationality)}</span>
                                                </span>

                                                <span className="text-[10px] whitespace-nowrap text-[#545454] md:text-xs">{player.country}</span>
                                            </div>
                                        </div>

                                        {/* Height */}
                                        <div className="mt-5 flex flex-col md:flex-row md:justify-between px-4 pb-5">
                                            <div className="flex gap-2 text-[12px] whitespace-nowrap text-[#222] md:text-sm">
                                                <Ruler size={14} className="mt-1 md:ml-2" />
                                                <p>{player.height}</p>
                                            </div>

                                            {/* Age */}
                                            <div className="flex gap-2 text-[12px] whitespace-nowrap text-[#222] md:ml-4 md:text-sm">
                                                <Clock3 size={14} className="mt-[2px]" />
                                                {player.dob && new Date().getFullYear() - new Date(player.dob).getFullYear()} years
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
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
export default Scout;
