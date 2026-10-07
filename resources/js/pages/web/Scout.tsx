import { PublicFooter } from '@/components/public/PublicFooter';
import PublicNavbar from '@/components/public/PublicNavbar';
import { getPositionName } from '@/utils/helper';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Binoculars, ChartColumn, CirclePlay, Clock3, Play, Ruler, Send, Star, UserRoundPlus, Users } from 'lucide-react';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';
const getCountryName = (code?: string | string[] | null): string => {
    if (!code) return '';

    const codes = Array.isArray(code) ? code : [code];

    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    return codes
        .map((c) => {
            try {
                return regionNames.of(c) || c;
            } catch {
                return c;
            }
        })
        .join(', ');
};

const Scout = () => {
    const steps = [
        {
            icon: Binoculars,
            step: '01',
            title: 'Early Access to Talent',
            desc: (
                <>
                    Be the first to discover young players before they become known to the world.{' '}
                    {/* <span className="text-[#E53F01]">data</span>,{" "} */}
                </>
            ),
        },
        {
            icon: Users,
            step: '02',
            title: 'Advanced Search and Filters',
            desc: <>Find players by position, age, country, club, tournament, skills and much more.</>,
        },
        {
            icon: ChartColumn,
            step: '03',
            title: 'Detailed Player Football Identities',
            desc: <>Watch highlights, check stats, performance and player information all in one place.</>,
        },
        {
            icon: Send,
            step: '04',
            title: 'Contact Talents for Free',
            desc: <>Get in touch directly with players or their representatives and start real connections.</>,
        },
        {
            icon: Star,
            step: '04',
            title: 'Follow and Track',
            desc: <>Follow your favorite players, receive updates and never miss a new talent.</>,
        },
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
                        <div className="mb-26 grid grid-cols-[16.875rem_1fr] sm:mb-10 sm:grid-cols-[18.75rem_1fr] md:grid-cols-[23.75rem_1fr] lg:grid-cols-2">
                            {/* Left Content */}
                            <div className="flex px-6 pt-16 sm:px-10 lg:px-16">
                                <div className="max-w-xl">
                                    <h1 className="text-[1.125rem] leading-tight font-extrabold md:text-2xl lg:text-4xl">
                                        <span className="block text-white">Be the First</span>

                                        <span className="block text-[#fa5418]">To See a Rare Talent.</span>

                                        <span className="block text-white">Be the Discoverer</span>

                                        <span className="block text-[#fa5418]">Of the Next Great Football Star.</span>
                                    </h1>

                                    <div className="relative">
                                        <p className="mt-6 text-[0.75rem] leading-relaxed text-[#e8e8e8] md:pr-8 md:text-[0.875rem] lg:w-[18.75rem] lg:text-base">
                                            At HiLights Football, you have the opportunity to discover, follow and contact great talents for free.
                                        </p>
                                        <div className="absolute top-17 left-0 z-0 flex w-[200%] flex-row gap-4 md:top-22 lg:top-25">
                                            <button className="flex items-center justify-center rounded-md bg-[#dd3e06] px-3 py-2 text-[0.625rem] font-semibold transition-all duration-300 hover:bg-[#E53F01] md:px-6 md:text-sm">
                                                <Link
                                                    href={
                                                        auth?.user
                                                            ? auth.user.role === 'player'
                                                                ? '/player'
                                                                : auth.user.role === 'admin'
                                                                  ? '/admin'
                                                                  : auth.user.role === 'agent'
                                                                    ? '/agent'
                                                                    : auth.user.role === 'club'
                                                                      ? '/club'
                                                                      : '/scouting'
                                                            : '/register?role=scout'
                                                    }
                                                >
                                                    <span className="inline-flex items-center gap-2 pl-2">
                                                        {auth?.user ? (
                                                            'Dashboard'
                                                        ) : (
                                                            <>
                                                                <UserRoundPlus className="h-5 w-5 shrink-0" />
                                                                <span>
                                                                    Create A Free
                                                                    <br />
                                                                    Football Identity Now
                                                                </span>
                                                            </>
                                                        )}
                                                    </span>
                                                </Link>
                                            </button>

                                            <button className="flex items-center justify-center rounded-md border border-gray-600 bg-black px-3 py-2 text-[0.625rem] font-semibold transition-all duration-300 hover:border-white md:px-6 md:py-4 md:text-sm">
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
                    <div className="mb-4 rounded-tl-[0.625rem] rounded-tr-[0.625rem] bg-[#363636] px-6 py-8">
                        <p className="text-center text-[0.75rem] text-white sm:text-[0.875rem] md:text-[1rem]"> </p>
                    </div>

                    <div className="">
                        {/* Steps */}
                        <div className="pr-4 pl-1 sm:pr-27 sm:pl-4 md:pr-30 md:pl-7 lg:max-w-5xl lg:pl-10">
                            {steps.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div className="lg:max-w-5x border-b border-[#1f1f1f]">
                                        <div
                                            key={index}
                                            className="grid grid-cols-[3.125rem_1fr] items-center py-5 md:grid-cols-[4.375rem_1fr] lg:max-w-4xl"
                                        >
                                            {/* Icon */}
                                            <div className="flex justify-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 md:h-14 md:w-14">
                                                    <Icon className="h-4 w-4 text-[#e03c00] md:h-7 md:w-7" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="border-[#1f1f1f] pl-3 md:pl-5">
                                                <h3 className="mb-1 text-[0.875rem] font-extrabold text-[#f93f04] sm:text-[1rem] md:text-[1.125rem] lg:text-[1.375rem]">
                                                    {item.title}
                                                </h3>

                                                <p className="text-[0.75rem] leading-relaxed text-[#eeeeee] sm:text-[0.875rem] md:text-[1rem] lg:text-[1.125rem]">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom CTA */}
                        <div className="flex flex-wrap items-center gap-2 rounded-2xl border-1 border-[#393939] px-2 py-6 sm:grid sm:grid-cols-[3.125rem_1fr_9.375rem] md:grid-cols-[5.625rem_1fr_15.625rem] md:gap-4 md:px-4 lg:grid-cols-[6.875rem_1fr_28.125rem]">
                            {/* Left Icon */}
                            <div className="flex justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dc4108] md:h-20 md:w-20">
                                    <Users className="text-white md:h-12 md:w-12" />
                                </div>
                            </div>

                            {/* Text */}
                            <div className="min-w-0 flex-1">
                                <h3 className="text-[0.8125rem] leading-tight font-bold text-white sm:text-[0.875rem] md:text-[1rem] lg:text-[1.125rem]">
                                    Join Thousands of Scouts, Agents and Clubs Already on HiLights Football.
                                </h3>

                                <p className="mt-1 text-[0.625rem] leading-relaxed text-[#d9d9d9] sm:text-[0.75rem] md:text-[0.875rem] lg:text-[1rem]">
                                    Register now and start discovering the future of football.
                                </p>
                            </div>

                            {/* Button */}
                            <div className="flex w-full items-end justify-end sm:w-auto lg:pr-10">
                                <button className="sm:-w-45 flex items-center gap-2 rounded-xl bg-[#dc4108] px-4 py-2 transition md:gap-4 lg:px-6 lg:py-2">
                                    <Link
                                        href={
                                            auth?.user
                                                ? auth.user.role === 'player'
                                                    ? '/player'
                                                    : auth.user.role === 'admin'
                                                      ? '/admin'
                                                      : auth.user.role === 'agent'
                                                        ? '/agent'
                                                        : auth.user.role === 'club'
                                                          ? '/club'
                                                          : '/scouting'
                                                : '/register?role=scout'
                                        }
                                    >
                                        <span className="inline-flex items-center gap-2 pl-2">
                                            {auth?.user ? (
                                                'Dashboard'
                                            ) : (
                                                <>
                                                    <UserRoundPlus className="h-5 w-5 shrink-0" />
                                                    <span>
                                                        Create A Free
                                                        <br />
                                                        Football Identity Now
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
                        <div className="flex items-center justify-between gap-2 pb-3">
                            <div className="flex min-w-0 items-center gap-2">
                                <Star fill="#E53F01" className="size-[1.125rem] shrink-0 text-[#c45504]" />

                                <h2 className="text-[0.75rem] font-extrabold text-[#222] uppercase sm:whitespace-nowrap md:text-sm">
                                    TOP TALENTS YOU CAN DISCOVER TODAY
                                </h2>
                            </div>
                            {/* Desktop/tablet-e header-e thakbe, mobile-e hide */}
                            <Link
                                href={
                                    auth?.user
                                        ? auth.user.role === 'player'
                                            ? '/player'
                                            : auth.user.role === 'admin'
                                              ? '/admin'
                                              : auth.user.role === 'agent'
                                                ? '/agent'
                                                : auth.user.role === 'club'
                                                  ? '/club'
                                                  : '/scout'
                                        : '/register?role=scout'
                                }
                                className="hidden sm:block"
                            >
                                <button className="flex items-center gap-2 rounded-[0.625rem] bg-white px-4 py-2 text-[0.625rem] font-bold whitespace-nowrap text-gray-700 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:text-xs">
                                    View All <ArrowRight className="size-[1.125rem] font-bold text-[#E53F01]" />
                                </button>
                            </Link>
                        </div>

                        {/* Rows */}
                        <div className="flex snap-x snap-mandatory items-center gap-5 overflow-x-auto pb-4 sm:snap-none">
                            {players.map((player: any, index: number) => (
                                <div
                                    key={index}
                                    className="w-[85%] flex-shrink-0 snap-center rounded-[0.5rem] shadow-[0_4px_12px_rgba(0,0,0,0.10)] sm:w-[48%] sm:snap-align-none md:w-[32%] lg:w-[24%]"
                                >
                                    <Link href={`/player/profile/${player.id}`}>
                                        {/* Thumbnail */}
                                        <div className="relative">
                                            <img
                                                src={player.photo_url || '/images/img/placeholder.webp'}
                                                className="h-[18.75rem] w-full rounded object-cover"
                                            />

                                            {player.video_url && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Link navigate bondho koro
                                                        e.stopPropagation();
                                                        setActiveVideo(player.video_url);
                                                    }}
                                                    className="absolute right-3 bottom-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#ff5a00]"
                                                >
                                                    <Play fill="white" className="size-[0.75rem] text-white" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="mr-2 px-4 md:px-6">
                                            <h3 className="mt-2 text-[0.75rem] font-bold whitespace-nowrap text-[#222] md:text-[0.9375rem]">
                                                {player.name}
                                            </h3>

                                            <p className="mt-1 text-[0.625rem] whitespace-nowrap text-[#1a1a1a] md:text-xs">
                                                {getPositionName(player.positions ?? [])}
                                            </p>

                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-gray-700 md:text-sm 2xl:text-base">
                                                    {Array.isArray(player?.nationality) && player.nationality.length > 0 ? (
                                                        player.nationality.map((code, idx) => (
                                                            <span key={code} className="inline-flex items-center gap-1">
                                                                <ReactCountryFlag
                                                                    countryCode={code}
                                                                    svg
                                                                    style={{ width: '1.2em', height: '1.2em' }}
                                                                />
                                                                <span>{getCountryName(code)}</span>
                                                                {idx < player.nationality.length - 1 && <span className="mr-1">,</span>}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span>{getCountryName(player?.nationality)}</span>
                                                    )}
                                                </span>

                                                <span className="text-[0.625rem] whitespace-nowrap text-[#545454] md:text-xs">{player.country}</span>
                                            </div>
                                        </div>

                                        {/* Height */}
                                        <div className="mt-5 flex flex-col px-4 pb-5 md:flex-row md:justify-between">
                                            <div className="flex gap-2 text-[0.75rem] whitespace-nowrap text-[#222] md:text-sm">
                                                <Ruler className="mt-1 size-[0.875rem] md:ml-2" />
                                                <p>{player.height}</p>
                                            </div>

                                            {/* Age */}
                                            <div className="flex gap-2 text-[0.75rem] whitespace-nowrap text-[#222] md:ml-4 md:text-sm">
                                                <Clock3 className="mt-[0.125rem] size-[0.875rem]" />
                                                {player?.dob &&
                                                    (() => {
                                                        const dob = new Date(player.dob);
                                                        const today = new Date();

                                                        let age = today.getFullYear() - dob.getFullYear();

                                                        const monthDiff = today.getMonth() - dob.getMonth();
                                                        const dayDiff = today.getDate() - dob.getDate();

                                                        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                                                            age--;
                                                        }

                                                        return age < 18 ? dob.getFullYear() : `${age} years`;
                                                    })()}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Mobile-only View All — player cards-er niche, full width */}
                        <Link
                            href={
                                auth?.user
                                    ? auth.user.role === 'player'
                                        ? '/player'
                                        : auth.user.role === 'admin'
                                          ? '/admin'
                                          : auth.user.role === 'agent'
                                            ? '/agent'
                                            : auth.user.role === 'club'
                                              ? '/club'
                                              : '/scout'
                                    : '/register?role=scout'
                            }
                            className="block sm:hidden"
                        >
                            <button className="flex w-full items-center justify-center gap-2 rounded-[0.625rem] bg-white px-4 py-3 text-xs font-bold text-gray-700 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                                View All <ArrowRight className="size-[1.125rem] font-bold text-[#E53F01]" />
                            </button>
                        </Link>
                    </div>
                    {activeVideo && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setActiveVideo(null)}>
                            <div className="relative aspect-video w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() => setActiveVideo(null)}
                                    className="absolute -top-10 right-0 text-3xl leading-none text-white hover:text-[#E53F01]"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                                {getEmbedUrl(activeVideo) ? (
                                    <iframe
                                        src={getEmbedUrl(activeVideo)!}
                                        title="Player video"
                                        className="h-full w-full rounded-xl"
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
};
export default Scout;
