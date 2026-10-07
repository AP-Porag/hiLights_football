import { PublicFooter } from '@/components/public/PublicFooter';
import PublicNavbar from '@/components/public/PublicNavbar';
import { Link } from '@inertiajs/react';
import { ArrowRight, BarChart3, CheckCircle2, Eye, Globe, Search, Shield, Target, Users, Zap } from 'lucide-react';

// TODO: Replace with usePage().props
const stats = [
    { value: '12,847', label: 'Players' },
    { value: '67', label: 'Countries' },
    { value: '1,243', label: 'Scouts' },
    { value: '387', label: 'Clubs' },
];

const missionPoints = [
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
    'Build a verified video portfolio scouts actually watch',
    'Track your performance metrics across every match',
    'Get discovered by 1,200+ accredited scouts and clubs',
    'Receive direct opportunities from interested clubs',
    'Own and control your career football identity and data',
];

const scoutBenefits = [
    'Search 12,000+ players by position, age, foot, and metrics',
    'Watch verified match footage with synchronised stats',
    'Build private shortlists and team scouting reports',
    'Filter by league, region, contract status, and transfer fee',
    'Export comprehensive scouting dossiers to PDF',
];

export default function About() {
    return (
        <div className="min-h-screen bg-white font-sans dark:bg-[#0D0D0D]">
            <PublicNavbar />

            <main className="pt-16">
                {/* HERO */}
                <section className="bg-[#E53F01] px-6 py-24">
                    <div className="mx-auto max-w-[68.75rem] text-center">
                        <div className="mb-6 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">About HiLights Football</div>
                        <h1 className="font-display text-4xl leading-[1.05] font-black text-white sm:text-5xl lg:text-[3.5rem]">
                            We Exist to Make Talent Visible
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
                            The world is full of footballers who never get seen. We built the data and video infrastructure to change that — for every
                            player, in every league, on every continent.
                        </p>
                    </div>
                </section>

                {/* MISSION */}
                <section className="bg-white px-6 py-16 lg:py-20 dark:bg-[#0D0D0D]">
                    <div className="mx-auto grid max-w-[68.75rem] items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* LEFT */}
                        <div className="relative">
                            <span
                                aria-hidden="true"
                                className="font-display pointer-events-none absolute -top-12 -left-4 text-[7.5rem] leading-none font-black text-[#E53F01] opacity-[0.08] select-none lg:text-[8.75rem]"
                            >
                                01
                            </span>
                            <div className="relative">
                                <div className="text-xs font-bold tracking-[0.2em] text-[#E53F01] uppercase">Our Mission</div>
                                <h2 className="font-display mt-3 text-3xl leading-tight font-black text-[#0F172A] sm:text-4xl dark:text-[#F5F5F5]">
                                    Connect every talented player with their right opportunity
                                </h2>
                                <div className="mt-6 space-y-4 text-base leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                                    <p>
                                        Football's talent market is broken. Scouts can't be everywhere. Players in overlooked leagues stay overlooked.
                                        Clubs sign the wrong players because they couldn't see the right ones. The result is wasted careers, wasted
                                        budgets, and a sport that fails to reach its full competitive potential.
                                    </p>
                                    <p>
                                        HiLights Football is the infrastructure layer that fixes this. We give every player — from a Serie B reserve
                                        in Brazil to a Championship loanee in England — a verified, data-rich football identity that puts them in
                                        front of the people who decide careers.
                                    </p>
                                    <p>
                                        We don't replace scouts. We give them better tools. We don't promise players fame. We promise them a fair shot
                                        at being seen by someone who can change their life.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-5">
                            {missionPoints.map((point) => {
                                const Icon = point.icon;
                                return (
                                    <div
                                        key={point.title}
                                        className="flex gap-5 rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]"
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                            <Icon className="h-6 w-6 text-[#E53F01]" strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h3 className="mb-1.5 text-lg font-bold text-[#0F172A] dark:text-[#F5F5F5]">{point.title}</h3>
                                            <p className="text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">{point.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* STATS BAND */}
                <section className="bg-[#E53F01] px-6 py-14">
                    <div className="mx-auto grid max-w-[68.75rem] grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">{stat.value}</div>
                                <div className="mt-2 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">{stat.label}</div>
                            </div>
                        ))}
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
                <section className="bg-white px-6 py-16 lg:py-20 dark:bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[68.75rem]">
                        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
                            <div className="text-xs font-bold tracking-[0.2em] text-[#E53F01] uppercase">Built For Both Sides Of The Pitch</div>
                            <h2 className="font-display mt-3 text-3xl leading-tight font-black text-[#0F172A] sm:text-4xl dark:text-[#F5F5F5]">
                                One platform. Two purposes.
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* For Players */}
                            <div className="rounded-2xl border-2 border-[#E53F01] bg-[#FFF3EB] p-8 lg:p-10 dark:bg-[rgba(255,107,0,0.08)]">
                                <div className="mb-2 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E53F01]">
                                        <Users className="h-5 w-5 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div className="text-xs font-bold tracking-[0.2em] text-[##E53F01] uppercase dark:text-[##E53F01]">
                                        For Players
                                    </div>
                                </div>
                                <h3 className="font-display mb-3 text-2xl leading-tight font-black text-[#0F172A] sm:text-3xl dark:text-[#F5F5F5]">
                                    Take ownership of your career
                                </h3>
                                <p className="mb-6 text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                                    Stop waiting to be discovered. Build the football identity that puts you in front of the scouts and clubs already
                                    searching for someone like you.
                                </p>
                                <ul className="space-y-3.5">
                                    {playerBenefits.map((benefit) => (
                                        <li key={benefit} className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E53F01]" strokeWidth={2} />
                                            <span className="text-sm leading-relaxed text-[#0F172A] dark:text-[#F5F5F5]">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#E53F01] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E53F01]"
                                >
                                    Create Player Football Identity
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {/* For Scouts & Clubs */}
                            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 lg:p-10 dark:border-[#2A2A2A] dark:bg-[#161616]">
                                <div className="mb-2 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F172A] dark:bg-[#1F1F1F]">
                                        <Search className="h-5 w-5 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div className="text-xs font-bold tracking-[0.2em] text-[#0F172A] uppercase dark:text-[#F5F5F5]">
                                        For Scouts &amp; Clubs
                                    </div>
                                </div>
                                <h3 className="font-display mb-3 text-2xl leading-tight font-black text-[#0F172A] sm:text-3xl dark:text-[#F5F5F5]">
                                    Find the player you've been missing
                                </h3>
                                <p className="mb-6 text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                                    Search, filter, and shortlist verified players across 67 countries. Watch the footage, read the data, build the
                                    case — all in one workflow.
                                </p>
                                <ul className="space-y-3.5">
                                    {scoutBenefits.map((benefit) => (
                                        <li key={benefit} className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E53F01]" strokeWidth={2} />
                                            <span className="text-sm leading-relaxed text-[#0F172A] dark:text-[#F5F5F5]">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/request-access"
                                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1F1F1F] dark:bg-[#1F1F1F] dark:hover:bg-[#2A2A2A]"
                                >
                                    Request Scout Access
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA BAND */}
                <section className="bg-[#E53F01] px-6 py-16 text-center lg:py-20">
                    <div className="mx-auto max-w-2xl">
                        <div className="mb-4 text-xs font-bold tracking-[0.2em] text-white/70 uppercase">Ready When You Are</div>
                        <h2 className="font-display text-3xl leading-tight font-black text-white sm:text-4xl lg:text-5xl">
                            Talent is everywhere.
                            <br />
                            Opportunity should be too.
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                            Join 12,000+ players and 1,200+ scouts already using HiLights Football to reshape how the game discovers its next
                            generation.
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-[#E53F01] transition-colors hover:bg-white/90"
                            >
                                Get Started Free
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/40 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                            >
                                Talk to Sales
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
