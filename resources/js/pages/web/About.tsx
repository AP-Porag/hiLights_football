import { PublicFooter } from '@/components/public/PublicFooter';
import PublicNavbar from '@/components/public/PublicNavbar';
import { Link } from '@inertiajs/react';
import { ArrowRight, BarChart3, CheckCircle2, Eye, Globe, Shield, Search, Target, Users, Zap } from 'lucide-react';

const discoveryCards = [
    {
        icon: Target,
        title: 'Data-Driven Discovery',
        description:
            'Every player football identity is backed by verified match footage, performance metrics, and standardised position-based analytics scouts can trust.',
    },
    {
        icon: Globe,
        title: 'Global Reach, Local Roots',
        description:
            'From São Paulo academies to Lagos training grounds, we surface talent from leagues and regions that traditional scouting networks routinely overlook.',
    },
    {
        icon: BarChart3,
        title: 'Transparent Performance',
        description:
            'No agents inflating numbers. No coaches overselling. Just match-verified data, video evidence, and the player’s own development journey.',
    },
];

const visionCards = [
    {
        icon: Eye,
        title: 'Visibility',
        paragraphs: [
            'Create a space where all players who are committed to football — regardless of their geographic location, their club’s budget, or whether they have professional representation — can be seen by the right decision-makers in football.',
        ],
    },
    {
        icon: Shield,
        title: 'Integrity',
        paragraphs: [
            'Every user is responsible for the accuracy and authenticity of the information they share in their football identity.',
            'HiLights Football values transparency, authenticity and individual responsibility, promoting a trustworthy environment for everyone in the football ecosystem.',
        ],
    },
    {
        icon: Zap,
        title: 'Speed',
        paragraphs: [
            'Reduce the time between talent identification and signing, turning processes that can take years into opportunities that can happen in weeks.',
            'To achieve this, we provide recruitment professionals with powerful search and filtering tools that make it easier to identify and evaluate players.',
        ],
    },
];

const playerBenefits = [
    {
        title: 'Your profile in the format the market knows',
        description: 'Have your football identity exactly in the format that the market is already used to seeing.',
    },
    {
        title: 'Statistics and progress',
        description: 'Have your statistical data in your hands and track your development match after match.',
    },
    {
        title: 'Greater visibility',
        description: 'Be seen through our network of contacts, which is growing every day.',
    },
    {
        title: 'HiLights Football community',
        description: 'Be part of the HiLights Football community and stay up to date with our news, opportunities and benefits.',
    },
];

const scoutBenefits = [
    {
        title: 'Athletes from all continents',
        description:
            'Athletes from all continents are looking for opportunities to be seen and discovered. Be the first to discover the next football stars of the world.',
    },
    {
        title: 'Videos and statistics',
        description: 'Watch the videos, check the statistics and access relevant information you need in one place.',
    },
    {
        title: 'Personalized lists and reports',
        description: 'Create your private lists and send scouting reports to your team, including the profiles of your preferred players.',
    },
    {
        title: 'Advanced search filters',
        description: 'Find the athlete profile you are looking for with advanced filters by age, club, region and much more.',
    },
];

export default function About() {
    return (
        <div className="min-h-screen bg-white font-sans dark:bg-[#0D0D0D]">
            <PublicNavbar />

            <main className="pt-16 lg:pt-20 2xl:pt-24">
                {/* HERO — orange band removed at the client's request */}
                <section
                    className="relative overflow-hidden bg-black px-6 py-20 sm:px-10 lg:px-16 lg:py-24 2xl:py-28 dark:bg-[#0D0D0D]"
                    style={{
                        backgroundImage: "url('/images/img/about-1.jpeg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div aria-hidden="true" className="absolute inset-0 bg-black/75 lg:bg-black/70" />
                    <div className="relative z-10 mx-auto max-w-[68.75rem] text-center 2xl:max-w-[81.25rem]">
                        <div className="mb-6 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase 2xl:text-sm">
                            About HiLights Football
                        </div>
                        <h1 className="font-display text-4xl leading-[1.05] font-black text-white sm:text-5xl lg:text-[3.5rem] 2xl:text-[4.25rem]">
                            We Exist to Make Talent Visible
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl 2xl:max-w-3xl 2xl:text-2xl">
                            We are the infrastructure needed and accessible to everyone who lives in the football ecosystem. Our purpose is to give
                            visibility to players at all levels, in every league, in every country.
                        </p>
                        <span aria-hidden="true" className="mx-auto mt-8 block h-px w-16 bg-white/25 2xl:mt-10 2xl:w-20" />
                        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg 2xl:mt-10 2xl:max-w-3xl 2xl:text-xl">
                            Don’t wait for your name to appear in traditional databases. Be the one responsible for adding your data and achievements,
                            and send the link to your football identity directly to coaches, scouts, agents and clubs.
                        </p>
                        <p className="mx-auto mt-6 max-w-2xl text-base font-bold text-white sm:text-lg 2xl:max-w-3xl 2xl:text-xl">
                            Be part of the HiLights Football community!
                        </p>
                    </div>
                </section>

                {/* MISSION */}
                <section className="bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-20 2xl:py-24 dark:bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[50rem] text-center 2xl:max-w-[62.5rem]">
                        <div className="text-xs font-bold tracking-[0.2em] text-[#E53F01] uppercase 2xl:text-sm">Our Mission</div>
                        <h2 className="font-display mt-3 text-3xl leading-tight font-black text-[#0F172A] sm:text-4xl 2xl:text-5xl dark:text-[#F5F5F5]">
                            Connect talents to new opportunities in football.
                        </h2>

                        <div className="mt-6 space-y-4 text-base leading-relaxed text-[#475569] sm:text-lg 2xl:mt-8 2xl:space-y-6 2xl:text-xl dark:text-[#9A9A9A]">
                            <p>
                                Football is a universe of talent, stories and opportunities. In every league, country and level of competition, there
                                are players who seek recognition and the chance to show their potential.
                            </p>
                            <p>
                                We know that following so many athletes around the world is a challenge for coaches, scouts, agents and clubs. That’s
                                why we believe that technology can bring people closer together, make information more accessible and create new
                                possibilities for everyone who is part of football.
                            </p>

                            <span aria-hidden="true" className="mx-auto block h-px w-12 bg-[#E2E8F0] 2xl:w-16 dark:bg-[#2A2A2A]" />

                            <p>HiLights Football was born with the purpose of making talent more visible and accessible.</p>
                            <p>
                                Our platform allows players of all levels to build their own football identity, bringing together information, videos,
                                statistics and achievements in one place, which can be shared directly with professionals and organizations in
                                football.
                            </p>
                            <p>
                                At the same time, we provide coaches, scouts, agents and clubs with a tool to discover, follow and evaluate players
                                from different leagues and countries.
                            </p>
                            <p>
                                We do not aim to replace the human relationships that make football happen. We want to strengthen them through
                                technology.
                            </p>
                            <p>
                                We believe that every player deserves the opportunity to present their journey, demonstrate their potential and be
                                discovered.
                            </p>
                            <p className="font-bold text-[#0F172A] dark:text-[#F5F5F5]">
                                HiLights Football — Connecting talents, people and opportunities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* WHY HILIGHTS */}
                <section className="bg-white px-6 pb-16 sm:px-10 lg:px-16 lg:pb-20 2xl:pb-24 dark:bg-[#0D0D0D]">
                    <div className="mx-auto grid max-w-[68.75rem] gap-6 lg:grid-cols-3 2xl:max-w-[81.25rem] 2xl:gap-8">
                        {discoveryCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.title}
                                    className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 2xl:p-10 dark:border-[#2A2A2A] dark:bg-[#161616]"
                                >
                                    <div className="flex items-start gap-4 2xl:gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF3EB] 2xl:h-14 2xl:w-14 dark:bg-[rgba(255,107,0,0.12)]">
                                            <Icon className="h-6 w-6 text-[#E53F01] 2xl:h-7 2xl:w-7" strokeWidth={2} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-xl font-bold text-[#0F172A] 2xl:text-2xl dark:text-[#F5F5F5]">{card.title}</h3>
                                            <p className="mt-3 text-sm leading-relaxed text-[#475569] lg:text-base 2xl:text-lg dark:text-[#9A9A9A]">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* VISION */}
                <section className="bg-[#F8FAFC] px-6 py-16 sm:px-10 lg:px-16 lg:py-20 2xl:py-24 dark:bg-[#111111]">
                    <div className="mx-auto max-w-[68.75rem] 2xl:max-w-[81.25rem]">
                        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14 2xl:max-w-3xl">
                            <div className="text-xs font-bold tracking-[0.2em] text-[#E53F01] uppercase 2xl:text-sm">Our Vision</div>
                            <h2 className="font-display mt-3 text-3xl leading-tight font-black text-[#0F172A] sm:text-4xl 2xl:text-5xl dark:text-[#F5F5F5]">
                                The principles that shape every decision we make
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3 2xl:gap-8">
                            {visionCards.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={card.title}
                                        className="rounded-2xl border border-t-4 border-[#E2E8F0] border-t-[#E53F01] bg-white p-8 2xl:p-10 dark:border-[#2A2A2A] dark:bg-[#161616]"
                                    >
                                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3EB] 2xl:h-14 2xl:w-14 dark:bg-[rgba(255,107,0,0.12)]">
                                            <Icon className="h-6 w-6 text-[#E53F01] 2xl:h-7 2xl:w-7" strokeWidth={2} />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#0F172A] 2xl:text-2xl dark:text-[#F5F5F5]">{card.title}</h3>
                                        <div className="space-y-4 text-sm leading-relaxed text-[#475569] lg:text-base 2xl:text-lg dark:text-[#9A9A9A]">
                                            {card.paragraphs.map((p) => (
                                                <p key={p}>{p}</p>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FOR WHOM */}
                <section className="bg-black px-6 py-16 sm:px-10 lg:px-16 lg:py-20 2xl:py-24 dark:bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[68.75rem] 2xl:max-w-[81.25rem]">
                        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14 2xl:max-w-3xl">
                            <h2 className="font-display text-3xl leading-tight font-black text-white sm:text-4xl 2xl:text-5xl">
                                One platform. Two purposes.
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 2xl:gap-8">
                            {/* For Players */}
                            <div className="rounded-2xl border-2 border-[#E53F01] bg-[#161616] p-6 sm:p-8 lg:p-10 2xl:p-12">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E53F01] 2xl:h-12 2xl:w-12">
                                        <Users className="h-5 w-5 text-white 2xl:h-6 2xl:w-6" strokeWidth={2.5} />
                                    </div>
                                    <div className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase 2xl:text-sm">For Players</div>
                                </div>
                                <h3 className="font-display mb-3 text-2xl leading-tight font-black text-white sm:text-3xl 2xl:text-4xl">
                                    Take control of your career
                                </h3>
                                <p className="mb-6 text-sm leading-relaxed text-[#9A9A9A] lg:text-base 2xl:text-lg">
                                    Don’t wait to be discovered. Create your football identity, showcase your talent and connect to a universe of
                                    opportunities in football.
                                </p>
                                <ul className="space-y-4 2xl:space-y-5">
                                    {playerBenefits.map((benefit) => (
                                        <li key={benefit.title} className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E53F01] 2xl:h-6 2xl:w-6" strokeWidth={2} />
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-white lg:text-base 2xl:text-lg">{benefit.title}</p>
                                                <p className="mt-1 text-sm leading-relaxed text-[#9A9A9A] lg:text-base 2xl:text-lg">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E53F01] px-6 py-3.5 text-center text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#CC5500] 2xl:py-4 2xl:text-base"
                                >
                                    Create your football identity for free
                                    <ArrowRight className="h-4 w-4 shrink-0 2xl:h-5 2xl:w-5" />
                                </Link>
                            </div>

                            {/* For Scouts, Agents & Clubs */}
                            <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 sm:p-8 lg:p-10 2xl:p-12">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E53F01] 2xl:h-12 2xl:w-12">
                                        <Search className="h-5 w-5 text-white 2xl:h-6 2xl:w-6" strokeWidth={2.5} />
                                    </div>
                                    <div className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase 2xl:text-sm">
                                        For Scouts, Agents and Clubs
                                    </div>
                                </div>
                                <h3 className="font-display mb-3 text-2xl leading-tight font-black text-white sm:text-3xl 2xl:text-4xl">
                                    Find the player you are looking for
                                </h3>
                                <p className="mb-6 text-sm leading-relaxed text-[#9A9A9A] lg:text-base 2xl:text-lg">
                                    Search, filter and select the players from our community. Watch the videos, analyze the data and gather all the
                                    information you need to support your evaluations — all in one platform.
                                </p>
                                <ul className="space-y-4 2xl:space-y-5">
                                    {scoutBenefits.map((benefit) => (
                                        <li key={benefit.title} className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E53F01] 2xl:h-6 2xl:w-6" strokeWidth={2} />
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-white lg:text-base 2xl:text-lg">{benefit.title}</p>
                                                <p className="mt-1 text-sm leading-relaxed text-[#9A9A9A] lg:text-base 2xl:text-lg">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/request-access"
                                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E53F01] px-6 py-3.5 text-center text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#CC5500] 2xl:py-4 2xl:text-base"
                                >
                                    Request access for scouts, agents or clubs
                                    <ArrowRight className="h-4 w-4 shrink-0 2xl:h-5 2xl:w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA BAND — orange band removed at the client's request */}
                <section className="bg-black px-6 py-16 text-center sm:px-10 lg:px-16 lg:py-20 2xl:py-24 dark:bg-[#0D0D0D]">
                    <div className="mx-auto max-w-2xl 2xl:max-w-3xl">
                        <h2 className="font-display text-3xl leading-tight font-black text-white sm:text-4xl lg:text-5xl 2xl:text-6xl">
                            Talent is everywhere and opportunities will be too, starting now.
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg 2xl:mt-7 2xl:max-w-2xl 2xl:text-xl">
                            Join our community, strengthening the ecosystem of everyone who lives football and help transform the way the next
                            generations of talent are discovered.
                        </p>
                        <div className="mt-8 2xl:mt-10">
                            <Link
                                href="/register"
                                className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#E53F01] px-7 py-4 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#CC5500] sm:w-auto sm:px-12 2xl:py-5 2xl:text-base"
                            >
                                Get started for free
                                <ArrowRight className="h-4 w-4 shrink-0 2xl:h-5 2xl:w-5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <PublicFooter />
            </main>
        </div>
    );
}
