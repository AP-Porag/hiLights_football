import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Activity, ArrowRight, Cookie, FileText, Languages, Mail, RotateCcw, ShieldCheck, type LucideIcon } from 'lucide-react';

export type LocaleCode = 'en' | 'pt' | 'es' | 'fr';

export type DocumentIcon = 'privacy' | 'terms' | 'cookies' | 'refund';

export interface LocaleOption {
    code: LocaleCode;
    label: string;
    flag: string;
    intl: string;
}

export interface LegalUi {
    legal_center: string;
    index_title: string;
    index_subtitle: string;
    last_updated: string;
    effective_date: string;
    version: string;
    on_this_page: string;
    read_time: string;
    read_document: string;
    language: string;
    questions_title: string;
    questions_body: string;
    contact_us: string;
    or_email: string;
    related: string;
    print: string;
    sections_count: string;
    sponsored: string;
    translation_notice: string;
}

export interface LegalDocumentMeta {
    slug: string;
    title: string;
    summary: string;
    icon: DocumentIcon;
    version: string;
    effectiveDate: string;
    lastUpdated: string;
    readTime: string;
    sectionsCount: number;
}

export interface LegalSection {
    id: string;
    heading: string;
    paragraphs: string[];
    items?: string[];
    closing?: string[];
}

export interface LegalDocument extends LegalDocumentMeta {
    sections: LegalSection[];
}

export interface LegalContact {
    legal: string;
    privacy: string;
    support: string;
}

export interface LegalPageProps {
    locale: LocaleCode;
    locales: LocaleOption[];
    ui: LegalUi;
    contact: LegalContact;
}

export const DOCUMENT_ICONS: Record<DocumentIcon, LucideIcon> = {
    privacy: ShieldCheck,
    terms: FileText,
    cookies: Cookie,
    refund: RotateCcw,
};

export function withLocale(path: string, locale: LocaleCode): string {
    return `${path}?lang=${locale}`;
}

export function resolveIntl(locales: LocaleOption[], locale: LocaleCode): string {
    return locales.find((item) => item.code === locale)?.intl ?? 'en-GB';
}

export function formatLegalDate(date: string, intl: string): string {
    const parsed = new Date(`${date}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return date;
    return new Intl.DateTimeFormat(intl, { day: 'numeric', month: 'long', year: 'numeric' }).format(parsed);
}

interface LanguageSwitcherProps {
    locales: LocaleOption[];
    current: LocaleCode;
    path: string;
    label: string;
}

export function LanguageSwitcher({ locales, current, path, label }: LanguageSwitcherProps) {
    return (
        <div className="print:hidden">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                <Languages className="h-3.5 w-3.5" />
                {label}
            </p>
            <div role="group" aria-label={label} className="flex flex-wrap gap-2">
                {locales.map((item) => {
                    const active = item.code === current;
                    return (
                        <Link
                            key={item.code}
                            href={withLocale(path, item.code)}
                            preserveScroll
                            aria-current={active ? 'true' : undefined}
                            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${active
                                ? 'border-white bg-white text-[#CC5500]'
                                : 'border-white/40 text-white hover:border-white hover:bg-white/10'
                                }`}
                        >
                            <span aria-hidden="true">{item.flag}</span>
                            <span className="hidden sm:inline">{item.label}</span>
                            <span className="font-mono uppercase sm:hidden">{item.code}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

interface LegalHeroProps {
    eyebrow: string;
    title: string;
    summary: string;
    breadcrumb?: ReactNode;
    aside?: ReactNode;
    children?: ReactNode;
}

export function LegalHero({ eyebrow, title, summary, breadcrumb, aside, children }: LegalHeroProps) {
    return (
        <section className="bg-[#FF6B00] pt-20">
            <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
                {breadcrumb && <div className="mb-6 print:hidden">{breadcrumb}</div>}
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{eyebrow}</p>
                        <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none tracking-tight text-white">
                            {title}
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90">{summary}</p>
                    </div>
                    {aside && <div className="shrink-0">{aside}</div>}
                </div>
                {children && <div className="mt-8 border-t border-white/25 pt-6">{children}</div>}
            </div>
        </section>
    );
}

export function TranslationNotice({ text }: { text: string }) {
    return (
        <div className="border-b border-[#FFD9BF] bg-[#FFF3EB] dark:border-[#3A2414] dark:bg-[rgba(255,107,0,0.12)]">
            <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs font-medium text-[#CC5500] sm:px-6 lg:px-8 dark:text-[#FF6B00]">
                <Languages className="h-4 w-4 shrink-0" />
                {text}
            </div>
        </div>
    );
}

interface LegalContactCardProps {
    ui: LegalUi;
    email: string;
}

export function LegalContactCard({ ui, email }: LegalContactCardProps) {
    return (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 print:hidden dark:border-[#2A2A2A] dark:bg-[#161616]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                        <Mail className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#0F172A] dark:text-[#F5F5F5]">
                            {ui.questions_title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">{ui.questions_body}</p>
                        <p className="mt-2 text-xs text-[#94A3B8] dark:text-[#555555]">
                            {ui.or_email}{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    window.location.href = `mailto:${email}`;
                                }}
                                className="break-all font-mono text-[#CC5500] underline-offset-4 hover:underline dark:text-[#FF6B00]"
                            >
                                {email}
                            </button>
                        </p>
                    </div>
                </div>
                <Link
                    href="/contact"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#FF6B00] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#CC5500]"
                >
                    {ui.contact_us}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}

export function WyscoutSidebarAd({ label }: { label: string }) {
    return (
        <div className="w-full max-w-[300px] print:hidden">
            <p className="mb-2 text-right text-xs uppercase tracking-[0.16em] text-[#94A3B8] dark:text-[#555555]">{label}</p>
            <div className="relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A1630] via-[#0E2148] to-[#123067] p-6">
                {/* <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#2F80ED]/25" />
                <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full border border-[#2F80ED]/20" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 bg-[#2F80ED]/20" /> */}
                <div className="relative">
                    {/* <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2F80ED] font-display text-sm font-bold text-white">
                            W
                        </span>
                        <span className="font-display text-lg font-bold uppercase tracking-[0.2em] text-white">Wyscout</span>
                    </div>
                    <p className="mt-5 font-display text-lg font-bold uppercase leading-tight text-white">
                        Every match. Every player. One scouting platform.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#B6C8E8]">
                        Video, data and reports trusted by professional clubs worldwide.
                    </p> */}
                </div>
                {/* <button
                    type="button"
                    onClick={() => window.open('https://wyscout.com', '_blank', 'noopener,noreferrer')}
                    className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2F80ED] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1F6BD1]"
                >
                    Start free trial
                    <ArrowRight className="h-4 w-4" />
                </button> */}
            </div>
        </div>
    );
}

export function SportRadarBannerAd({ label }: { label: string }) {
    return (
        <div className="w-full max-w-[640px] print:hidden">
            <p className="mb-2 text-right text-xs uppercase tracking-[0.16em] text-[#94A3B8] dark:text-[#555555]">{label}</p>
            <div className="relative flex min-h-[100px] flex-col gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#08152F] via-[#0B2554] to-[#0D3A86] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="pointer-events-none absolute -right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-[#00A3FF]/25" />
                <div className="relative flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00A3FF]">
                        <Activity className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-display text-lg font-bold tracking-wide text-white">sportradar</p>
                        <p className="text-sm text-[#B9CCF0]">Official football data that powers smarter recruitment decisions.</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => window.open('https://sportradar.com', '_blank', 'noopener,noreferrer')}
                    className="relative shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0B2554] transition-colors hover:bg-[#E6EEFB]"
                >
                    Explore data
                </button>
            </div>
        </div>
    );
}
