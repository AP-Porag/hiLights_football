import { Link } from '@inertiajs/react';
import PublicNavbar from '@/components/public/PublicNavbar';
import {
    Target,
    Globe,
    BarChart3,
    Eye,
    Shield,
    Zap,
    CheckCircle2,
    ArrowRight,
    Users,
    Video,
    TrendingUp,
    Search,
    Database,
    Award,
} from 'lucide-react';
import { PublicFooter } from '@/components/public/PublicFooter';

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
            'Every player profile is backed by verified match footage, performance metrics, and standardised position-based analytics scouts can trust.',
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
            'Maintain the highest standard of data verification in football. Every clip is timestamped, every stat is sourced, every profile is reviewed.',
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
    'Own and control your career profile and data',
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
        <div className="min-h-screen bg-white dark:bg-[#0D0D0D] font-sans">
            <PublicNavbar />

            <main className="pt-16">
                {/* HERO */}
                <section className="bg-[#FF5E24] py-24 px-6">
                    <div className="max-w-[1100px] mx-auto text-center">
                        <div className="text-white/70 text-xs tracking-[0.2em] uppercase font-semibold mb-6">
                            About HiLights Football
                        </div>
                        <h1 className="font-display font-black text-white leading-[1.05] text-4xl sm:text-5xl lg:text-[56px]">
                            We Exist to Make Talent Visible
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed">
                            The world is full of footballers who never get seen. We built the data and video
                            infrastructure to change that — for every player, in every league, on every continent.
                        </p>
                    </div>
                </section>

                {/* MISSION */}
                <section className="bg-white dark:bg-[#0D0D0D] py-16 lg:py-20 px-6">
                    <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* LEFT */}
                        <div className="relative">
                            <span
                                aria-hidden="true"
                                className="absolute -top-12 -left-4 font-display font-black text-[120px] lg:text-[140px] text-[#FF5E24] opacity-[0.08] leading-none select-none pointer-events-none"
                            >
                                01
                            </span>
                            <div className="relative">
                                <div className="text-[#FF5E24] text-xs tracking-[0.2em] uppercase font-bold">
                                    Our Mission
                                </div>
                                <h2 className="font-display text-3xl sm:text-4xl text-[#0F172A] dark:text-[#F5F5F5] font-black mt-3 leading-tight">
                                    Connect every talented player with their right opportunity
                                </h2>
                                <div className="mt-6 space-y-4 text-[#475569] dark:text-[#9A9A9A] text-base leading-relaxed">
                                    <p>
                                        Football's talent market is broken. Scouts can't be everywhere. Players in
                                        overlooked leagues stay overlooked. Clubs sign the wrong players because they
                                        couldn't see the right ones. The result is wasted careers, wasted budgets, and
                                        a sport that fails to reach its full competitive potential.
                                    </p>
                                    <p>
                                        HiLights Football is the infrastructure layer that fixes this. We give every
                                        player — from a Serie B reserve in Brazil to a Championship loanee in England —
                                        a verified, data-rich profile that puts them in front of the people who decide
                                        careers.
                                    </p>
                                    <p>
                                        We don't replace scouts. We give them better tools. We don't promise players
                                        fame. We promise them a fair shot at being seen by someone who can change their
                                        life.
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
                                        className="flex gap-5 p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] bg-white dark:bg-[#161616]"
                                    >
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-[#FF5E24]" strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-[#0F172A] dark:text-[#F5F5F5] mb-1.5">
                                                {point.title}
                                            </h3>
                                            <p className="text-sm text-[#475569] dark:text-[#9A9A9A] leading-relaxed">
                                                {point.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* STATS BAND */}
                <section className="bg-[#FF5E24] py-14 px-6">
                    <div className="max-w-[1100px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="font-mono font-bold text-white text-4xl sm:text-5xl tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-white/80 text-xs tracking-[0.2em] uppercase font-semibold mt-2">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* VISION */}
                <section className="bg-[#F8FAFC] dark:bg-[#111111] py-16 lg:py-20 px-6">
                    <div className="max-w-[1100px] mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
                            <div className="text-[#FF5E24] text-xs tracking-[0.2em] uppercase font-bold">
                                Our Vision
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl text-[#0F172A] dark:text-[#F5F5F5] font-black mt-3 leading-tight">
                                The principles that shape every decision we make
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {visionCards.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={card.title}
                                        className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-8 border-t-4 border-t-[#FF5E24]"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] flex items-center justify-center mb-5">
                                            <Icon className="w-6 h-6 text-[#FF5E24]" strokeWidth={2} />
                                        </div>
                                        <h3 className="font-bold text-xl text-[#0F172A] dark:text-[#F5F5F5] mb-3">
                                            {card.title}
                                        </h3>
                                        <p className="text-[#475569] dark:text-[#9A9A9A] text-sm leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FOR WHOM */}
                <section className="bg-white dark:bg-[#0D0D0D] py-16 lg:py-20 px-6">
                    <div className="max-w-[1100px] mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
                            <div className="text-[#FF5E24] text-xs tracking-[0.2em] uppercase font-bold">
                                Built For Both Sides Of The Pitch
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl text-[#0F172A] dark:text-[#F5F5F5] font-black mt-3 leading-tight">
                                One platform. Two purposes.
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* For Players */}
                            <div className="bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.08)] border-2 border-[#FF5E24] rounded-2xl p-8 lg:p-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-[#FF5E24] flex items-center justify-center">
                                        <Users className="w-5 h-5 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div className="text-[##FF5E24] dark:text-[##FF5E24] text-xs tracking-[0.2em] uppercase font-bold">
                                        For Players
                                    </div>
                                </div>
                                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0F172A] dark:text-[#F5F5F5] mb-3 leading-tight">
                                    Take ownership of your career
                                </h3>
                                <p className="text-sm text-[#475569] dark:text-[#9A9A9A] leading-relaxed mb-6">
                                    Stop waiting to be discovered. Build the profile that puts you in front of the
                                    scouts and clubs already searching for someone like you.
                                </p>
                                <ul className="space-y-3.5">
                                    {playerBenefits.map((benefit) => (
                                        <li key={benefit} className="flex gap-3 items-start">
                                            <CheckCircle2
                                                className="w-5 h-5 text-[#FF5E24] shrink-0 mt-0.5"
                                                strokeWidth={2}
                                            />
                                            <span className="text-sm text-[#0F172A] dark:text-[#F5F5F5] leading-relaxed">
                                                {benefit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#FF5E24] text-white font-semibold text-sm rounded-lg hover:bg-[#CC5500] transition-colors"
                                >
                                    Create Player Profile
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* For Scouts & Clubs */}
                            <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-8 lg:p-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-[#0F172A] dark:bg-[#1F1F1F] flex items-center justify-center">
                                        <Search className="w-5 h-5 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div className="text-[#0F172A] dark:text-[#F5F5F5] text-xs tracking-[0.2em] uppercase font-bold">
                                        For Scouts &amp; Clubs
                                    </div>
                                </div>
                                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0F172A] dark:text-[#F5F5F5] mb-3 leading-tight">
                                    Find the player you've been missing
                                </h3>
                                <p className="text-sm text-[#475569] dark:text-[#9A9A9A] leading-relaxed mb-6">
                                    Search, filter, and shortlist verified players across 67 countries. Watch the
                                    footage, read the data, build the case — all in one workflow.
                                </p>
                                <ul className="space-y-3.5">
                                    {scoutBenefits.map((benefit) => (
                                        <li key={benefit} className="flex gap-3 items-start">
                                            <CheckCircle2
                                                className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5"
                                                strokeWidth={2}
                                            />
                                            <span className="text-sm text-[#0F172A] dark:text-[#F5F5F5] leading-relaxed">
                                                {benefit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register?role=scout"
                                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#0F172A] dark:bg-[#1F1F1F] text-white font-semibold text-sm rounded-lg hover:bg-[#1F1F1F] dark:hover:bg-[#2A2A2A] transition-colors"
                                >
                                    Request Scout Access
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA BAND */}
                <section className="bg-[#FF5E24] py-16 lg:py-20 px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-white/70 text-xs tracking-[0.2em] uppercase font-bold mb-4">
                            Ready When You Are
                        </div>
                        <h2 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
                            Talent is everywhere.
                            <br />
                            Opportunity should be too.
                        </h2>
                        <p className="text-white/80 text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
                            Join 12,000+ players and 1,200+ scouts already using HiLights Football to reshape how
                            the game discovers its next generation.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#FF5E24] font-bold text-sm rounded-lg hover:bg-white/90 transition-colors"
                            >
                                Get Started Free
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent border-2 border-white/40 text-white font-bold text-sm rounded-lg hover:bg-white/10 transition-colors"
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
