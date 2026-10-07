import { PublicFooter } from '@/components/public/PublicFooter';
import PublicNavbar from '@/components/public/PublicNavbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link, useForm } from '@inertiajs/react';
import { CheckCircle2, Clock, Instagram, Linkedin, Mail, Send, Twitter, Youtube } from 'lucide-react';
import React, { useState } from 'react';

// TODO: Replace with usePage().props for any server-driven content
const faqs = [
    {
        q: 'How do scouts discover players on HiLights Football?',
        a: 'Verified scouts and clubs use our advanced search filters — position, age, nationality, performance metrics, and video tags — to identify players that match their recruitment criteria. Players with complete football Identities and recent highlight uploads appear higher in scout search results.',
    },
    {
        q: 'Is HiLights Football free for players to use?',
        a: 'Yes. Player accounts are free to create and maintain. We offer optional premium tiers for players who want enhanced football Identities visibility, advanced analytics, and priority placement in scout searches.',
    },
    {
        q: 'How do I become a verified scout or club on the platform?',
        a: 'Submit a verification request through your scout portal account. Our team reviews club affiliations, credentials, and references within 3–5 business days. Verified accounts receive a badge and unlock full access to the player database.',
    },
    {
        q: 'Can I advertise my football academy or brand on HiLights?',
        a: 'Absolutely. We offer placement across player football identities, search results, video pages, and editorial content. Select "Advertising" in the subject dropdown above and our partnerships team will share our media kit and rate card.',
    },
    {
        q: 'What video formats and file sizes do you support?',
        a: 'We accept MP4, MOV, and AVI files up to 2 GB per clip. Videos are automatically transcoded to multiple resolutions for adaptive streaming. We recommend uploading in 1080p or higher for the best presentation in scout reviews.',
    },
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    const inputClasses =
        'w-full bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl h-11 px-4 text-sm text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus:outline-none focus:border-[#E53F01] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-[rgba(255,107,0,0.15)] transition-colors';

    return (
        <div className="min-h-screen bg-white dark:bg-[#0D0D0D]">
            <PublicNavbar />

            <main className="pt-16">
                {/* ============ HEADER BAND ============ */}
                <section className="bg-[#E53F01] py-16">
                    <div className="mx-auto max-w-[68.75rem] px-6 text-center">
                        <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Contact HiLights Football
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-white/90 sm:text-lg">
                            Questions, partnerships, or press inquiries — our team responds within 24 hours.
                        </p>
                    </div>
                </section>

                {/* ============ FORM + INFO SIDEBAR ============ */}
                <section className="bg-[#F8FAFC] py-16 dark:bg-[#0D0D0D]">
                    <div className="mx-auto grid max-w-[68.75rem] grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_25rem]">
                        {/* -------- FORM CARD -------- */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-10 dark:border-[#2A2A2A] dark:bg-[#161616]">
                            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl dark:text-[#F5F5F5]">
                                Send us a message
                            </h2>
                            <p className="mt-2 font-sans text-sm text-[#475569] dark:text-[#9A9A9A]">
                                Fill out the form and the right team will get back to you.
                            </p>

                            {submitted && (
                                <Alert className="mt-6 border-[#16A34A] bg-green-50 text-[#15803D] dark:bg-[rgba(22,163,74,0.10)] dark:text-[#4ADE80]">
                                    <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                                    <AlertDescription className="text-sm font-medium">Message sent! We'll reply within 24 hours.</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="name" className="mb-2 block font-sans text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
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
                                    {errors.name && <p className="mt-1 text-xs text-[#E53F01]">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="mb-2 block font-sans text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
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
                                    {errors.email && <p className="mt-1 text-xs text-[#E53F01]">{errors.email}</p>}
                                </div>

                                {/* Subject */}
                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="mb-2 block font-sans text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
                                        Subject
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="What's this about?"
                                        className={inputClasses}
                                        required
                                    />
                                    {errors.subject && <p className="mt-1 text-xs text-[#E53F01]">{errors.subject}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="mb-2 block font-sans text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tell us how we can help…"
                                        className="h-36 w-full resize-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] transition-colors placeholder:text-[#94A3B8] focus:border-[#E53F01] focus:ring-2 focus:ring-orange-100 focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F5F5F5] dark:placeholder:text-[#555555] dark:focus:ring-1 dark:focus:ring-[rgba(255,107,0,0.15)]"
                                        required
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-[#E53F01]">{errors.message}</p>}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#E53F01] text-sm font-semibold text-white transition-colors hover:bg-[#E53F01] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Send className="h-4 w-4" />
                                    {processing ? 'Sending…' : 'Send Message →'}
                                </button>

                                <p className="text-center font-sans text-xs text-[#94A3B8] dark:text-[#555555]">
                                    By submitting, you agree to our{' '}
                                    <Link href="/privacy" className="text-[#E53F01] hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </form>
                        </div>

                        {/* -------- SIDEBAR -------- */}
                        <aside className="space-y-4">
                            {/* Get in Touch card */}
                            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]">
                                <h3 className="font-sans text-xl font-bold text-[#0F172A] dark:text-[#F5F5F5]">Get in Touch</h3>
                                <p className="mt-1 text-sm text-[#475569] dark:text-[#9A9A9A]">Reach our team through any of the channels below.</p>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                            <Mail className="h-5 w-5 text-[#E53F01]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold tracking-wider text-[#94A3B8] uppercase dark:text-[#555555]">Email</p>
                                            <a
                                                href="mailto:hello@hilightsfootball.com"
                                                className="text-sm font-medium break-all text-[#0F172A] transition-colors hover:text-[#E53F01] dark:text-[#F5F5F5] dark:hover:text-[#E53F01]"
                                            >
                                                hello@hilightsfootball.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                            <Clock className="h-5 w-5 text-[#E53F01]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold tracking-wider text-[#94A3B8] uppercase dark:text-[#555555]">
                                                Response Time
                                            </p>
                                            <p className="text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5]">We reply within 24 hours</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social row */}
                                <div className="mt-6 border-t border-[#E2E8F0] pt-6 dark:border-[#2A2A2A]">
                                    <p className="mb-3 text-xs font-semibold tracking-wider text-[#94A3B8] uppercase dark:text-[#555555]">
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
                                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#475569] transition-colors hover:border-[#E53F01] hover:text-[#E53F01] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#9A9A9A] dark:hover:border-[#E53F01] dark:hover:text-[#E53F01]"
                                            >
                                                <Icon className="h-4 w-4" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* AD — ScoutPro */}
                            <div className="relative h-[17.5rem] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white dark:border-[#2A2A2A] dark:bg-[#161616]">
                                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-[#0A1628] via-[#0F2347] to-[#0A1628] p-6">
                                    {/* Brand top */}
                                    <div></div>

                                    {/* Stats + CTA */}
                                    <div></div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* ============ FAQ ============ */}
                <section className="bg-white py-12 sm:py-16 dark:bg-[#111111]">
                    <div className="mx-auto max-w-[68.75rem] px-6">
                        <div className="mb-10 text-center">
                            <h2 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl dark:text-[#F5F5F5]">
                                Frequently Asked Questions
                            </h2>
                            <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-[#475569] dark:text-[#9A9A9A]">
                                Quick answers to the questions we hear most often. Still stuck? Send us a message above.
                            </p>
                        </div>

                        <Accordion type="single" collapsible className="space-y-3">
                            {faqs.map((item, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i}`}
                                    className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-6 transition-colors data-[state=open]:border-[#E53F01] dark:border-[#2A2A2A] dark:bg-[#161616] dark:data-[state=open]:border-[#E53F01]"
                                >
                                    <AccordionTrigger className="py-5 text-left font-sans text-sm font-semibold text-[#0F172A] hover:text-[#E53F01] hover:no-underline sm:text-base dark:text-[#F5F5F5] dark:hover:text-[#E53F01] [&[data-state=open]]:text-[#E53F01] dark:[&[data-state=open]]:text-[#E53F01]">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5 font-sans text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* ============ FOOTER ============ */}
                <PublicFooter />
            </main>
        </div>
    );
}
