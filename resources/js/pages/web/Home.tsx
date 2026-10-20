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
    ArrowRight,
    Users2
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
                    Share your football identity and make your talent accessible to{" "}
                    <span className="text-[#E53F01]">scouts, agents and clubs</span> around the
                    world.
                </>
            ),
        },
    ];
    const [activeVideo, setActiveVideo] = React.useState<string | null>(null);

    const { players } = usePage<{ players: PlayerItem[] }>().props;

    return (
        <div className="bg-black text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
            <PublicNavbar />
            <main className="w-full space-y-16 pt-16 pb-16 sm:space-y-20 sm:pb-20 lg:space-y-24 lg:pb-24 xl:pt-20 2xl:space-y-28 2xl:pt-24 2xl:pb-28">

                {/* SECTION 1: HERO — full-bleed image with the headline over it */}
                <section className="relative w-full overflow-hidden bg-black text-white">
                    {/* Backdrop */}
                    <img
                        src="/images/img/hero.jpeg"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    {/*
                      Feathered black pool behind the copy only — the photo itself stays
                      at full brightness. Percentage stops keep the shape in proportion at
                      every width; it sits wider and lower on small screens, where the text
                      runs the full column, and tucks into the left half from lg.
                    */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 lg:hidden"
                        style={{
                            background:
                                'radial-gradient(ellipse 110% 55% at 50% 78%, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.18) 80%, rgba(0,0,0,0) 100%)',
                        }}
                    />
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 hidden lg:block"
                        style={{
                            background:
                                'radial-gradient(ellipse 58% 62% at 26% 68%, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.86) 34%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0) 100%)',
                        }}
                    />

                    <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pt-32 pb-10 sm:px-10 sm:pt-40 lg:min-h-[calc(100vh-4rem)] lg:px-16 lg:pt-48 lg:pb-14 xl:min-h-[calc(100vh-5rem)] 2xl:min-h-[calc(100vh-6rem)]">
                        <div className="max-w-xl 2xl:max-w-2xl">
                            <h1 className="text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl 2xl:text-7xl">
                                <span className="block text-white">Be Seen.</span>
                                <span className="block text-[#E53F01]">
                                    Be Discovered<span className="text-white">!</span>
                                </span>
                            </h1>

                            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#f4f4f4] sm:text-lg xl:text-xl 2xl:mt-7 2xl:max-w-xl 2xl:text-2xl">
                                The global platform connecting football talent with scouts, agents and clubs through
                                professional profiles, videos and statistics.
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
                </section>

                {/* SECTION 1.5: PLATFORM PREVIEW — the three phones, middle one raised */}
                <section className="w-full bg-black">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-10 lg:px-16">
                        <div className="flex items-end justify-center gap-2 sm:gap-4 lg:gap-6">
                            <img
                                src="/images/img/phone-positions.png"
                                alt="Player positions on the pitch and achievements, shown on a phone"
                                loading="lazy"
                                className="w-[31%] max-w-[20rem] shrink-0"
                            />
                            <img
                                src="/images/img/phone-identity.png"
                                alt="A player football identity with photo, details and highlight video, shown on a phone"
                                loading="lazy"
                                className="w-[34%] max-w-[22rem] shrink-0"
                            />
                            <img
                                src="/images/img/phone-stats.png"
                                alt="Competition history and recent match statistics, shown on a phone"
                                loading="lazy"
                                className="w-[31%] max-w-[20rem] shrink-0"
                            />
                        </div>
                    </div>
                </section>

                {/* ADVERTISING */}
                {/*<aside className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">*/}
                {/*    <div>*/}
                {/*        <div className="flex w-full items-center justify-center rounded-xl bg-[#464646] px-4 py-8 2xl:py-10">*/}
                {/*            <p className="text-sm font-medium tracking-widest text-white/50 2xl:text-base">ADVERTISING SPACE</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</aside>*/}

                {/* SECTION 2: STEPS */}
                <section className="mx-auto w-full max-w-7xl bg-black px-6 text-white sm:px-10 lg:px-16">
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
                        <div className="mt-10 rounded-2xl border border-[#2a2a2a] p-5 sm:p-6 lg:p-8 2xl:p-10">
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
                                {/* Icon + text */}
                                <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E53F01] sm:h-16 sm:w-16 2xl:h-20 2xl:w-20">
                                        <Users2 className="h-6 w-6 text-white sm:h-8 sm:w-8 2xl:h-10 2xl:w-10" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-base leading-tight font-bold sm:text-lg lg:text-xl 2xl:text-2xl">
                                            Not part of the <span className="text-[#E53F01]">HiLights Football</span>
                                            <br className="hidden sm:block" /> community yet?
                                        </h3>
                                        <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#bdbdbd] sm:text-sm 2xl:text-base">
                                            Create your free football identity, share your best moments and become visible to coaches,
                                            clubs and recruiters worldwide.
                                        </p>
                                    </div>
                                </div>

                                {/* Divider — only where the row is side by side */}
                                <span aria-hidden="true" className="hidden w-px self-stretch bg-[#2a2a2a] lg:block" />

                                {/* Button */}
                                <div className="shrink-0">
                                    <Link href={isLoggedIn ? dashboardHref : "/register"}>
                                        <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#E53F01] px-5 py-4 transition hover:bg-[#E53F01] lg:w-auto lg:px-8 2xl:px-10">
                                            <UserPlus className="h-6 w-6 shrink-0 text-white 2xl:h-8 2xl:w-8" />
                                            <span className="text-left text-xs font-bold tracking-wide text-white uppercase sm:text-sm 2xl:text-base">
                                                {isLoggedIn ? (
                                                    "Dashboard"
                                                ) : (
                                                    <>
                                                        Create your free
                                                        <br />
                                                        football identity now
                                                    </>
                                                )}
                                            </span>
                                            <ArrowRight className="h-5 w-5 shrink-0 text-white 2xl:h-6 2xl:w-6" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2.5: BUILT BY FOOTBALL PROFESSIONALS */}
                <section className="relative w-full overflow-hidden bg-black text-white">
                    {/* Collage sits behind the copy on small screens, beside it from lg */}
                    <img
                        src="/images/img/professionals.jpeg"
                        alt="Coaches, scouts and agents at work around the game"
                        loading="lazy"
                        className="absolute inset-y-0 right-0 h-full w-full object-cover object-right lg:w-3/5 lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.35)_18%,black_45%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.35)_18%,black_45%)]"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-black/60 lg:hidden" />

                    <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 2xl:py-28">
                        <div className="max-w-md 2xl:max-w-lg">
                            <h2 className="text-2xl leading-tight font-extrabold sm:text-3xl lg:text-4xl 2xl:text-5xl">
                                Built by Football <span className="block text-[#E53F01]">Professionals.</span>
                            </h2>
                            <p className="mt-5 text-sm leading-relaxed text-[#e9e9e9] sm:text-base lg:text-lg 2xl:text-xl">
                                A platform developed by professionals from various areas of football, with{" "}
                                <span className="text-[#E53F01]">over 20 years of experience</span> worldwide.
                            </p>
                            <span aria-hidden="true" className="mt-6 block h-1 w-14 rounded-full bg-[#E53F01]" />
                            <p className="mt-6 text-sm leading-relaxed text-[#e9e9e9] sm:text-base lg:text-lg 2xl:text-xl">
                                Responsible for the development, growth and transfers of hundreds of players around the world.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ADVERTISING */}
                {/*<aside className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">*/}
                {/*    <div>*/}
                {/*        <div className="flex w-full items-center justify-center rounded-xl bg-[#464646] px-4 py-8 2xl:py-10">*/}
                {/*            <p className="text-sm font-medium tracking-widest text-white/50 2xl:text-base">ADVERTISING SPACE</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</aside>*/}

                {/* SECTION 3: COMMUNITY HIGHLIGHTS */}
                <section className="mx-auto w-full max-w-7xl overflow-x-hidden px-6 sm:px-10 lg:px-16">
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
