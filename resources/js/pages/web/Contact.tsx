import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import PublicNavbar from '@/components/public/PublicNavbar';
import {
    Mail,
    Clock,
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
    CheckCircle2,
    Send,
    Target,
    TrendingUp,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

// TODO: Replace with usePage().props for any server-driven content
const faqs = [
    {
        q: 'How do scouts discover players on HiLights Football?',
        a: 'Verified scouts and clubs use our advanced search filters — position, age, nationality, performance metrics, and video tags — to identify players that match their recruitment criteria. Players with complete profiles and recent highlight uploads appear higher in scout search results.',
    },
    {
        q: 'Is HiLights Football free for players to use?',
        a: 'Yes. Player accounts are free to create and maintain. We offer optional premium tiers for players who want enhanced profile visibility, advanced analytics, and priority placement in scout searches.',
    },
    {
        q: 'How do I become a verified scout or club on the platform?',
        a: 'Submit a verification request through your scout portal account. Our team reviews club affiliations, credentials, and references within 3–5 business days. Verified accounts receive a badge and unlock full access to the player database.',
    },
    {
        q: 'Can I advertise my football academy or brand on HiLights?',
        a: 'Absolutely. We offer placement across player profiles, search results, video pages, and editorial content. Select "Advertising" in the subject dropdown above and our partnerships team will share our media kit and rate card.',
    },
    {
        q: 'What video formats and file sizes do you support?',
        a: 'We accept MP4, MOV, and AVI files up to 2 GB per clip. Videos are automatically transcoded to multiple resolutions for adaptive streaming. We recommend uploading in 1080p or higher for the best presentation in scout reviews.',
    },
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Wire to Inertia post() route once backend endpoint is ready
        // post(route('contact.store'), { onSuccess: () => { setSubmitted(true); reset(); } })
        setTimeout(() => {
            setSubmitted(true);
            reset();
        }, 400);
    };

    const inputClasses =
        'w-full bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl h-11 px-4 text-sm text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-[rgba(255,107,0,0.15)] transition-colors';

    return (
        <div className="min-h-screen bg-white dark:bg-[#0D0D0D]">
            <PublicNavbar />

            <main className="pt-16">
                {/* ============ HEADER BAND ============ */}
                <section className="bg-[#FF6B00] py-16">
                    <div className="max-w-[1100px] mx-auto px-6 text-center">
                        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
                            Contact HiLights Football
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-sans">
                            Questions, partnerships, or press inquiries — our team responds
                            within 24 hours.
                        </p>
                    </div>
                </section>

                {/* ============ FORM + INFO SIDEBAR ============ */}
                <section className="bg-[#F8FAFC] dark:bg-[#0D0D0D] py-16">
                    <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
                        {/* -------- FORM CARD -------- */}
                        <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-10">
                            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A] dark:text-[#F5F5F5] uppercase tracking-tight">
                                Send us a message
                            </h2>
                            <p className="mt-2 text-sm text-[#475569] dark:text-[#9A9A9A] font-sans">
                                Fill out the form and the right team will get back to you.
                            </p>

                            {submitted && (
                                <Alert className="mt-6 bg-green-50 dark:bg-[rgba(22,163,74,0.10)] border-[#16A34A] text-[#15803D] dark:text-[#4ADE80]">
                                    <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                                    <AlertDescription className="text-sm font-medium">
                                        Message sent! We'll reply within 24 hours.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                {/* Full Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5] mb-2 font-sans"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="John Anderson"
                                        className={inputClasses}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-[#DC2626]">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5] mb-2 font-sans"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@club.com"
                                        className={inputClasses}
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-[#DC2626]">{errors.email}</p>
                                    )}
                                </div>

                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5] mb-2 font-sans"
                                    >
                                        Subject
                                    </label>
                                    <Select
                                        value={data.subject}
                                        onValueChange={(v) => setData('subject', v)}
                                    >
                                        <SelectTrigger
                                            id="subject"
                                            className="w-full bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl h-11 px-4 text-sm text-[#0F172A] dark:text-[#F5F5F5] focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-[rgba(255,107,0,0.15)]"
                                        >
                                            <SelectValue placeholder="Select a topic" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5]">
                                            <SelectItem value="general">General Inquiry</SelectItem>
                                            <SelectItem value="support">Technical Support</SelectItem>
                                            <SelectItem value="partnership">Partnership</SelectItem>
                                            <SelectItem value="advertising">Advertising</SelectItem>
                                            <SelectItem value="press">Press</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.subject && (
                                        <p className="mt-1 text-xs text-[#DC2626]">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5] mb-2 font-sans"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tell us how we can help…"
                                        className="w-full bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl h-36 px-4 py-3 text-sm text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-[rgba(255,107,0,0.15)] transition-colors resize-none"
                                        required
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-[#DC2626]">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-12 bg-[#FF6B00] hover:bg-[#CC5500] text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <Send className="h-4 w-4" />
                                    {processing ? 'Sending…' : 'Send Message →'}
                                </button>

                                <p className="text-xs text-[#94A3B8] dark:text-[#555555] text-center font-sans">
                                    By submitting, you agree to our{' '}
                                    <Link
                                        href="/privacy"
                                        className="text-[#FF6B00] hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </form>
                        </div>

                        {/* -------- SIDEBAR -------- */}
                        <aside className="space-y-4">
                            {/* Get in Touch card */}
                            <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6">
                                <h3 className="font-bold text-xl text-[#0F172A] dark:text-[#F5F5F5] font-sans">
                                    Get in Touch
                                </h3>
                                <p className="mt-1 text-sm text-[#475569] dark:text-[#9A9A9A]">
                                    Reach our team through any of the channels below.
                                </p>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] flex items-center justify-center">
                                            <Mail className="h-5 w-5 text-[#FF6B00]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#94A3B8] dark:text-[#555555] uppercase tracking-wider font-semibold">
                                                Email
                                            </p>
                                            <a
                                                href="mailto:contact@highlightsfootball.com"
                                                className="text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5] hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-colors break-all"
                                            >
                                                contact@highlightsfootball.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] flex items-center justify-center">
                                            <Clock className="h-5 w-5 text-[#FF6B00]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#94A3B8] dark:text-[#555555] uppercase tracking-wider font-semibold">
                                                Response Time
                                            </p>
                                            <p className="text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
                                                We reply within 24 hours
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social row */}
                                <div className="mt-6 pt-6 border-t border-[#E2E8F0] dark:border-[#2A2A2A]">
                                    <p className="text-xs text-[#94A3B8] dark:text-[#555555] uppercase tracking-wider font-semibold mb-3">
                                        Follow Us
                                    </p>
                                    <div className="flex gap-2">
                                        {[
                                            { Icon: Instagram, label: 'Instagram', href: '#' },
                                            { Icon: Twitter, label: 'Twitter', href: '#' },
                                            { Icon: Youtube, label: 'YouTube', href: '#' },
                                            { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                                        ].map(({ Icon, label, href }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                                className="w-10 h-10 rounded-xl border border-[#E2E8F0] dark:border-[#2A2A2A] bg-white dark:bg-[#111111] flex items-center justify-center text-[#475569] dark:text-[#9A9A9A] hover:text-[#FF6B00] dark:hover:text-[#FF6B00] hover:border-[#FF6B00] dark:hover:border-[#FF6B00] transition-colors"
                                            >
                                                <Icon className="h-4 w-4" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* AD — ScoutPro */}
                            <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl overflow-hidden h-[280px] relative">
                <span className="absolute top-2 right-2 text-[10px] text-[#94A3B8] dark:text-[#555555] font-sans z-10">
                  Sponsored
                </span>
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0F2347] to-[#0A1628] p-6 flex flex-col justify-between">
                                    {/* Brand top */}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
                                                <Target className="h-4 w-4 text-white" strokeWidth={2.5} />
                                            </div>
                                            <span className="font-display font-bold text-white text-lg tracking-tight uppercase">
                        ScoutPro
                      </span>
                                        </div>
                                        <p className="mt-4 font-display font-bold text-white text-2xl uppercase tracking-tight leading-tight">
                                            Find the next<br />
                                            <span className="text-[#3B82F6]">Generation</span> first.
                                        </p>
                                        <p className="mt-2 text-xs text-[#94A3B8] font-sans leading-relaxed">
                                            Professional scouting tools used by 400+ clubs across Europe and South America.
                                        </p>
                                    </div>

                                    {/* Stats + CTA */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <TrendingUp className="h-3.5 w-3.5 text-[#3B82F6]" />
                                            <span className="font-mono text-[11px] text-[#94A3B8] tracking-wider">
                        240K+ PLAYERS · 92 LEAGUES
                      </span>
                                        </div>
                                        <button className="w-full h-9 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-semibold text-xs transition-colors">
                                            Start Free Trial →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* ============ FAQ ============ */}
                <section className="bg-white dark:bg-[#111111] py-12 sm:py-16">
                    <div className="max-w-[1100px] mx-auto px-6">
                        <div className="text-center mb-10">
                            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0F172A] dark:text-[#F5F5F5] uppercase tracking-tight">
                                Frequently Asked Questions
                            </h2>
                            <p className="mt-3 text-sm text-[#475569] dark:text-[#9A9A9A] font-sans max-w-xl mx-auto">
                                Quick answers to the questions we hear most often. Still stuck?
                                Send us a message above.
                            </p>
                        </div>

                        <Accordion type="single" collapsible className="space-y-3">
                            {faqs.map((item, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i}`}
                                    className="bg-[#F8FAFC] dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl px-6 data-[state=open]:border-[#FF6B00] dark:data-[state=open]:border-[#FF6B00] transition-colors"
                                >
                                    <AccordionTrigger className="text-left font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#F5F5F5] hover:no-underline py-5 font-sans hover:text-[#FF6B00] dark:hover:text-[#FF6B00] [&[data-state=open]]:text-[#FF6B00] dark:[&[data-state=open]]:text-[#FF6B00]">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-[#475569] dark:text-[#9A9A9A] pb-5 leading-relaxed font-sans">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* ============ FOOTER ============ */}
                <footer className="bg-[#0F172A] text-white">
                    <div className="max-w-[1280px] mx-auto px-6 py-14">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {/* Brand col */}
                            <div className="lg:col-span-1">
                                <img
                                    src="/images/logo/hilights_logo_dark_200.png"
                                    className="h-12 w-auto"
                                    alt="HiLights Football"
                                />
                                <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed">
                                    The enterprise discovery platform connecting football players
                                    with scouts, clubs, and agents worldwide.
                                </p>
                            </div>

                            {/* Platform */}
                            <div>
                                <h4 className="font-display font-bold text-white uppercase tracking-tight text-sm mb-4">
                                    Platform
                                </h4>
                                <ul className="space-y-2.5 text-sm text-[#94A3B8]">
                                    <li>
                                        <Link href="/players" className="hover:text-[#FF6B00] transition-colors">
                                            Players
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/scouts" className="hover:text-[#FF6B00] transition-colors">
                                            Scouts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/clubs" className="hover:text-[#FF6B00] transition-colors">
                                            Clubs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pricing" className="hover:text-[#FF6B00] transition-colors">
                                            Pricing
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Company */}
                            <div>
                                <h4 className="font-display font-bold text-white uppercase tracking-tight text-sm mb-4">
                                    Company
                                </h4>
                                <ul className="space-y-2.5 text-sm text-[#94A3B8]">
                                    <li>
                                        <Link href="/about" className="hover:text-[#FF6B00] transition-colors">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/careers" className="hover:text-[#FF6B00] transition-colors">
                                            Careers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/press" className="hover:text-[#FF6B00] transition-colors">
                                            Press
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="hover:text-[#FF6B00] transition-colors">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h4 className="font-display font-bold text-white uppercase tracking-tight text-sm mb-4">
                                    Legal
                                </h4>
                                <ul className="space-y-2.5 text-sm text-[#94A3B8]">
                                    <li>
                                        <Link href="/terms" className="hover:text-[#FF6B00] transition-colors">
                                            Terms of Service
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy" className="hover:text-[#FF6B00] transition-colors">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/cookies" className="hover:text-[#FF6B00] transition-colors">
                                            Cookies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/dmca" className="hover:text-[#FF6B00] transition-colors">
                                            DMCA
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                            <p className="text-xs text-[#94A3B8]">
                                © 2026 HiLights Football. All rights reserved.
                            </p>
                            <p className="text-xs text-[#94A3B8] font-mono">
                                Built for the global football community.
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
