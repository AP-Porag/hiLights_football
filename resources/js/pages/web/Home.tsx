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
    slug: string;
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
            title: "Create Your Football Identity.",
            desc: (
                <>
                    Build an organized, professional football identity with your{" "}
                    <span className="text-[#E53F01]">data</span>,{" "}
                    <span className="text-[#E53F01]">club history</span>,{" "}
                    <span className="text-[#E53F01]">
                        physical and technical characteristics
                    </span>
                    , and your{" "}
                    <span className="text-[#E53F01]">achievements</span>.
                </>
            ),
        },
        {
            icon: Play,
            step: "02",
            title: "Upload Your Best Videos.",
            desc: (
                <>
                    Show the world your{" "}
                    <span className="text-[#E53F01]">best moments</span>. Get{" "}
                    <span className="text-[#E53F01]">improvement tips</span> to make
                    your videos more attractive to scouts, agents and clubs.
                </>
            ),
        },
        {
            icon: Megaphone,
            step: "03",
            title: "Be Seen. Be Discovered.",
            desc: (
                <>
                    A platform developed by professionals from various areas of football
                    with{" "}
                    <span className="text-[#E53F01]">
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
            <main className="w-full pt-16 xl:pt-20 2xl:pt-24">

                {/* SECTION 1: HERO */}
                <section className="relative w-full overflow-hidden bg-black text-white">
                    {/* Text sits in the same wrapper every other section uses, so all headings share one left edge */}
                    <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
                        <div className="py-14 md:py-20 lg:flex lg:min-h-[calc(100vh-4rem)] lg:w-1/2 lg:flex-col lg:justify-center xl:min-h-[calc(100vh-5rem)] 2xl:min-h-[calc(100vh-6rem)]">
                            <div className="max-w-xl 2xl:max-w-2xl">
                                <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-[2.625rem] lg:text-5xl xl:text-6xl 2xl:text-7xl">
                                    <span className="block text-white">Be Seen.</span>
                                    <span className="block text-[#E53F01]">
                                        Be Discovered <span className="text-white">!</span>
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#f4f4f4] sm:text-base xl:text-lg 2xl:mt-8 2xl:max-w-xl 2xl:text-xl">
                                    The platform that connects players, clubs, agents and
                                    scouts through videos, statistics and professional
                                    football identities.
                                </p>

                                <p className="mt-4 max-w-lg border-l-2 border-[#b2300e] pl-3 text-sm leading-relaxed text-[#f4f4f4] sm:text-base xl:text-lg 2xl:max-w-xl 2xl:text-xl">
                                    Show your talent to the world and increase your
                                    opportunities in football.
                                </p>

                                {/* Buttons */}
                                <div className="mt-8 flex flex-wrap items-center gap-4 2xl:mt-10">
                                    <Link href={isLoggedIn ? dashboardHref : "/register"}>
                                        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#E53F01] px-4 py-3 text-xs font-semibold  transition-all duration-300 hover:bg-[#E53F01] sm:text-sm lg:px-6 lg:py-3 lg:text-base 2xl:px-8 2xl:py-4 2xl:text-lg">
                                            <UserRoundPlus className="h-5 w-5 shrink-0 lg:h-6 lg:w-6 2xl:h-7 2xl:w-7" />
                                            <span className="text-left leading-tight">

                                                {isLoggedIn ? (
                                                    "Dashboard"
                                                ) : (
                                                    <>
                                                        Create A Free
                                                        <br />
                                                        Football Identity Now
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </Link>
                                    <Link href="/about">
                                        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-600 px-4 py-3 text-xs font-semibold transition-all duration-300 hover:border-white sm:text-sm lg:px-6 lg:py-4 lg:text-base 2xl:px-8 2xl:text-lg">
                                            <CirclePlay className="h-5 w-5 shrink-0 lg:h-6 lg:w-6 2xl:h-7 2xl:w-7" />
                                            <span>Learn More</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right side visual — bleeds to the screen edge on lg+, stacks below the text on tablet and mobile */}
                    <div className="w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full bg-black">
                        <img
                            src="/images/img/hero.jpeg"
                            alt=""
                            aria-hidden="true"
                            className="w-full h-auto object-cover lg:h-full lg:w-full lg:object-contain"
                        />
                    </div>
                </section>

                {/* ADVERTISING */}
                <aside className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="my-6">
                        <div className="flex w-full items-center justify-center rounded-xl bg-[#464646] px-4 py-8 2xl:py-10">
                            <p className="text-sm font-medium tracking-widest text-white/50 2xl:text-base">ADVERTISING SPACE</p>
                        </div>
                    </div>
                </aside>

                {/* SECTION 2: STEPS */}
                <section className="mx-auto w-full max-w-7xl bg-black px-6 pt-10 text-white sm:px-10 lg:px-16 2xl:pt-14">
                    <div>
                        {/* Heading */}
                        <h2 className="mb-6 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl 2xl:mb-8 2xl:text-5xl">
                            A Simple. Professional. <span className="text-[#E53F01]">Effective Platform.</span>
                        </h2>

                        {/* Steps */}
                        <div className="lg:max-w-5xl 2xl:max-w-6xl">
                            {steps.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="border-b border-[#1f1f1f]">
                                        <div className="grid grid-cols-[3.125rem_3.75rem_1fr] items-center py-5 md:grid-cols-[4.375rem_5.625rem_1fr] lg:max-w-4xl 2xl:max-w-5xl 2xl:py-7">
                                            {/* Icon */}
                                            <div className="flex justify-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 md:h-14 md:w-14 2xl:h-16 2xl:w-16">
                                                    <Icon className="h-5 w-5 text-[#E53F01] md:h-8 md:w-8 2xl:h-9 2xl:w-9" />
                                                </div>
                                            </div>
                                            {/* Step */}
                                            <div>
                                                <p className="text-[0.625rem] font-bold text-[#E53F01] md:text-sm 2xl:text-base">STEP</p>
                                                <h3 className="text-3xl leading-none font-extrabold text-[#E53F01] md:text-5xl 2xl:text-6xl">{item.step}</h3>
                                            </div>
                                            {/* Content */}
                                            <div className="border-l-4 border-[#1f1f1f] pl-3 md:pl-5">
                                                <h3 className="mb-1 text-base font-extrabold sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
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
                        <div className="flex flex-wrap items-center gap-4 border-b border-[#1f1f1f] py-6 sm:grid sm:grid-cols-[4.375rem_1fr_12.5rem] md:grid-cols-[5.625rem_1fr_18.75rem] lg:grid-cols-[6.875rem_1fr_20rem] 2xl:grid-cols-[8.125rem_1fr_22.5rem] 2xl:py-8">
                            {/* Left Icon */}
                            <div className="flex justify-center">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E53F01] md:h-20 md:w-20 2xl:h-24 2xl:w-24">
                                    <Users className="text-white md:h-12 md:w-12 2xl:h-14 2xl:w-14" />
                                </div>
                            </div>
                            {/* Text */}
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base leading-tight font-bold sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
                                    Not part of the <span className="text-[#E53F01]">HiLights Football</span>
                                    <br />
                                    community yet?
                                </h3>
                                <p className="mt-3 max-w-xl text-xs leading-relaxed text-[#efefef] sm:text-sm md:text-base 2xl:text-lg">
                                    Create your free football identity, share your best moments and become visible to coaches, clubs and recruiters worldwide.
                                </p>
                            </div>
                            {/* Button */}
                            <div className="flex w-full items-end justify-end sm:w-auto lg:pr-4">
                                <Link href={isLoggedIn ? dashboardHref : "/register"}>
                                    <button className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#E53F01] px-4 py-2 transition hover:bg-[#E53F01]/10 md:gap-4 lg:px-8 lg:py-4 2xl:px-10">
                                        <UserPlus className="h-6 w-6 shrink-0 text-white md:h-8 md:w-8 2xl:h-9 2xl:w-9" />
                                        <span className="text-left text-xs font-bold  sm:text-sm lg:text-base 2xl:text-lg">
                                            {isLoggedIn ? (
                                                "Dashboard"
                                            ) : (
                                                <>
                                                    Create A Free
                                                    <br />
                                                    Football Identity Now
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
                <aside className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="my-6">
                        <div className="flex w-full items-center justify-center rounded-xl bg-[#464646] px-4 py-8 2xl:py-10">
                            <p className="text-sm font-medium tracking-widest text-white/50 2xl:text-base">ADVERTISING SPACE</p>
                        </div>
                    </div>
                </aside>

                {/* SECTION 3: COMMUNITY HIGHLIGHTS */}
                <section className="mx-auto mb-6 w-full max-w-7xl overflow-x-hidden px-6 sm:px-10 lg:px-16">
                    <div className="rounded-xl bg-[#f9f9f9] p-3 md:p-6 2xl:p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2 pb-3">
                            <div className="flex min-w-0 items-center gap-2">
                                <Star fill="#E53F01" className="size-[1.125rem] shrink-0 text-[#f25704]" />
                                <h2 className="truncate text-xs font-extrabold whitespace-nowrap text-[#222] md:text-sm lg:text-base 2xl:text-lg">
                                    Community Highlights
                                </h2>
                            </div>
                            <Link href="/request-access" > <button className="flex shrink-0 items-center gap-1 rounded-[0.625rem] bg-white px-3 py-2 text-[0.625rem] font-bold whitespace-nowrap text-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:gap-2 sm:px-4 md:text-xs"> View All <ArrowRight className="size-[1.125rem] text-[#E53F01] font-bold" /> </button> </Link>
                        </div>

                        {/* Rows */}
                        {players.slice(0, 5).map((player, index) => (
                            // <Link key={player.id} href={auth?.user
                            //     ? `/player/profile/${player.id}`
                            //     : "/register?role=scout"}>
                            <Link key={player.slug} href={`/player/profile/${player.slug}`}>
                                <div className="mb-2 grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center rounded-[0.75rem] bg-white pr-3 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:grid-cols-[4.375rem_minmax(0,1fr)_5rem_7.5rem] sm:pr-4 md:grid-cols-[9.375rem_minmax(0,1fr)_7.5rem_10.625rem] 2xl:grid-cols-[11.25rem_minmax(0,1fr)_9.375rem_12.5rem]">
                                    {/* Thumbnail */}
                                    <div className="relative row-span-2 sm:row-span-1">
                                        <img
                                            src={player.photo_url || '/images/img/placeholder.webp'}
                                            alt={player.name ?? ''}
                                            className="rounded rounded-tl-[0.75rem] rounded-bl-[0.75rem] object-cover"
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
                                                <Play fill="white" className="size-[0.75rem] text-white" />
                                            </button>
                                        )}
                                    </div>
                                    {/* Info */}
                                    <div className="row-span-2 mr-2 min-w-0 px-2 sm:row-span-1 md:px-6">
                                        <h3 className="truncate text-sm font-bold whitespace-nowrap text-[#222] md:text-[0.9375rem] lg:text-base 2xl:text-lg">{player.name}</h3>
                                        <p className="truncate text-xs whitespace-nowrap text-gray-600 md:text-sm 2xl:text-base">
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
                                    <div className="col-start-3 flex items-center justify-end gap-2 text-xs whitespace-nowrap text-[#222] sm:col-start-auto sm:mr-3 sm:justify-center md:text-sm lg:text-base 2xl:text-lg">
                                        <Ruler className="size-[0.875rem]" />
                                        <p>{player.height} cm</p>
                                    </div>
                                    {/* Age */}
                                    <div className="col-start-3 flex items-center justify-end gap-2 text-xs whitespace-nowrap text-[#222] sm:col-start-auto md:ml-4 md:text-sm lg:text-base 2xl:text-lg">
                                        <Clock3 className="size-[0.875rem]" />
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
                                    className="absolute -top-10 right-0 text-white text-3xl leading-none hover:text-[#E53F01]"
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
