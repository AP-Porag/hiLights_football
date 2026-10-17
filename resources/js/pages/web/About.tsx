import { PublicFooter } from '@/components/public/PublicFooter';
import PublicNavbar from '@/components/public/PublicNavbar';
import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, Eye, Shield, Search, Users, Zap } from 'lucide-react';



const visionCards = [
    {
        icon: Eye,
        title: 'Visibility',
        description:
            'Build a stage where every serious player — regardless of geography, club budget, or representation — can be seen by the right decision-makers.',
    },
    {
        icon: Shield,
        title: 'Integrity',
        description:
            'Maintain the highest standard of data verification in football. Every clip is timestamped, every stat is sourced, every football identity is reviewed.',
    },
    {
        icon: Zap,
        title: 'Speed',
        description:
            'Reduce the time from "talent exists" to "talent signed" from years to weeks by giving recruiters the search and filtering tools they have always lacked.',
    },
];

const playerBenefits = [
    {
        title: 'Your profile in the format the market knows',
        description: 'Have your football identity read in the format the market is already used to seeing.',
    },
    {
        title: 'Statistics and progress',
        description: 'Have your statistics directly in your hands and track your development match after match.',
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
        description: 'Athletes from all continents are looking for opportunities to be seen and discovered. Be the first to find the next football stars of the world.',
    },
    {
        title: 'Videos and statistics',
        description: 'Watch the videos, check the statistics and access the relevant information you need, all in one place.',
    },
    {
        title: 'Personalised lists and reports',
        description: 'Create your private lists and send scouting reports to your team, including the profiles of your preferred players.',
    },
    {
        title: 'Advanced search filters',
        description: 'Find the athlete profile you are looking for with advanced filters by age, club, region and more.',
    },
];

export default function About() {
    return (
        <div className="min-h-screen bg-white font-sans dark:bg-[#0D0D0D]">
            <PublicNavbar />

            <main className="pt-16">
                {/* HERO — orange band removed at the client's request */}
                <section className="bg-black px-6 py-20 lg:py-24 dark:bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[68.75rem] text-center">
                        <div className="mb-6 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">About HiLights Football</div>
                        <h1 className="font-display text-4xl leading-[1.05] font-black text-white sm:text-5xl lg:text-[3.5rem]">
                            We Exist to Make Talent Visible
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
                            We are the infrastructure needed and accessible to everyone who lives in the football ecosystem. Our purpose is to give
                            visibility to players at all levels, in every league, in every country.
                        </p>
                        <span aria-hidden="true" className="mx-auto mt-8 block h-px w-16 bg-white/25" />
                        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                            Don't wait for your name to appear in traditional databases. Be the one responsible for adding your data and achievements,
                            and send the link to your football identity directly to coaches, scouts, agents and clubs.
                        </p>
                        <p className="mx-auto mt-6 max-w-2xl text-base font-bold text-white sm:text-lg">
                            Be part of the HiLights Football community!
                        </p>
                    </div>
                </section>

                {/* MISSION */}
                <section className="bg-white px-6 py-16 lg:py-20 dark:bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[50rem] text-center">
                        <div className="text-xs font-bold tracking-[0.2em] text-[#E53F01] uppercase">Our Mission</div>
                        <h2 className="font-display mt-3 text-3xl leading-tight font-black text-[#0F172A] sm:text-4xl dark:text-[#F5F5F5]">
                            Connecting talent with new opportunities in football
                        </h2>
                        {/* TODO: Replace with the client's final mission copy — the text in the
                            reference screenshot was too low-resolution to transcribe reliably. */}
                        <div className="mt-6 space-y-4 text-base leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                            <p>
                                Football is a world of talent, but opportunity does not reach every corner of it. Many deserving players are never
                                seen simply because nobody was watching on the right day.
                            </p>
                            <p>
                                We created HiLights Football so that every player can present themselves directly to coaches, scouts, agents and
                                clubs — with their data, their videos and their achievements gathered in one place.
                            </p>
                            <span aria-hidden="true" className="mx-auto block h-px w-12 bg-[#E2E8F0] dark:bg-[#2A2A2A]" />
                            <p>
                                HiLights Football was born with the purpose of making talent more visible and more reachable, bringing information,
                                statistics and achievements together so a player can be evaluated fairly.
                            </p>
                            <p>
                                In the same way, scouts, agents and clubs gain a faster, clearer path to the players they are looking for.
                            </p>
                        </div>
                    </div>
                </section>

                {/* VISION */}
                <section className="bg-[#F8FAFC] px-6 py-16 lg:py-20 dark:bg-[#111111]">
                    <div className="mx-auto max-w-[68.75rem]">
                        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
                            <div className="text-xs font-bold tracking-[0.2em] text-[#E53F01] uppercase">Our Vision</div>
                            <h2 className="font-display mt-3 text-3xl leading-tight font-black text-[#0F172A] sm:text-4xl dark:text-[#F5F5F5]">
                                The principles that shape every decision we make
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {visionCards.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={card.title}
                                        className="rounded-2xl border border-t-4 border-[#E2E8F0] border-t-[#E53F01] bg-white p-8 dark:border-[#2A2A2A] dark:bg-[#161616]"
                                    >
                                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                            <Icon className="h-6 w-6 text-[#E53F01]" strokeWidth={2} />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#0F172A] dark:text-[#F5F5F5]">{card.title}</h3>
                                        <p className="text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">{card.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FOR WHOM */}
                <section className="bg-black px-6 py-16 lg:py-20 dark:bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[68.75rem]">
                        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
                            <h2 className="font-display text-3xl leading-tight font-black text-white sm:text-4xl">
                                One platform. Two purposes.
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* For Players */}
                            <div className="rounded-2xl border-2 border-[#E53F01] bg-[#161616] p-6 sm:p-8 lg:p-10">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E53F01]">
                                        <Users className="h-5 w-5 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">For Players</div>
                                </div>
                                <h3 className="font-display mb-3 text-2xl leading-tight font-black text-white sm:text-3xl">
                                    Take control of your career
                                </h3>
                                <p className="mb-6 text-sm leading-relaxed text-[#9A9A9A]">
                                    Don't wait to be discovered. Create your football identity, showcase your talent and increase your chances of
                                    opportunities in football.
                                </p>
                                <ul className="space-y-4">
                                    {playerBenefits.map((benefit) => (
                                        <li key={benefit.title} className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E53F01]" strokeWidth={2} />
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-white">{benefit.title}</p>
                                                <p className="mt-1 text-sm leading-relaxed text-[#9A9A9A]">{benefit.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#E53F01] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#CC5500]"
                                >
                                    Create Player Football Identity
                                    <ArrowRight className="h-4 w-4 shrink-0" />
                                </Link>
                            </div>

                            {/* For Scouts, Agents & Clubs */}
                            <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 sm:p-8 lg:p-10">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E53F01]">
                                        <Search className="h-5 w-5 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
                                        For Scouts, Agents &amp; Clubs
                                    </div>
                                </div>
                                <h3 className="font-display mb-3 text-2xl leading-tight font-black text-white sm:text-3xl">
                                    Find the player you are looking for
                                </h3>
                                <p className="mb-6 text-sm leading-relaxed text-[#9A9A9A]">
                                    Search, filter and select players from our community. Watch the videos, analyse the data and gather all the
                                    information you need to support your evaluations — all on one platform.
                                </p>
                                <ul className="space-y-4">
                                    {scoutBenefits.map((benefit) => (
                                        <li key={benefit.title} className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E53F01]" strokeWidth={2} />
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-white">{benefit.title}</p>
                                                <p className="mt-1 text-sm leading-relaxed text-[#9A9A9A]">{benefit.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/request-access"
                                    className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1F1F1F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#E53F01] hover:text-[#E53F01]"
                                >
                                    Request Scout Access
                                    <ArrowRight className="h-4 w-4 shrink-0" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA BAND — orange band removed at the client's request */}
                <section className="bg-black px-6 py-16 text-center lg:py-20 dark:bg-[#0D0D0D]">
                    <div className="mx-auto max-w-2xl">
                        <h2 className="font-display text-3xl leading-tight font-black text-white sm:text-4xl lg:text-5xl">
                            Talent is everywhere and opportunities will be too, starting now.
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                            Join our community, strengthen the ecosystem of everyone who lives football and help transform the way the next
                            generations of talent are discovered.
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E53F01] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#CC5500]"
                            >
                                Create A Free Football Identity
                                <ArrowRight className="h-4 w-4 shrink-0" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1F1F1F] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-[#E53F01] hover:text-[#E53F01]"
                            >
                                Talk to Us
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
