import { Head, Link } from '@inertiajs/react';
import { Fragment, useEffect, useState } from 'react';
import { ArrowRight, Calendar, ChevronDown, ChevronRight, Clock, FileCheck2, Printer } from 'lucide-react';
import PublicNavbar from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/PublicFooter';
import {
    DOCUMENT_ICONS,
    LanguageSwitcher,
    LegalContactCard,
    LegalHero,
    TranslationNotice,
    WyscoutSidebarAd,
    formatLegalDate,
    resolveIntl,
    withLocale,
    type LegalDocument,
    type LegalDocumentMeta,
    type LegalPageProps,
    type LegalSection,
    type LegalUi,
    type LocaleCode,
} from '@/Components/Web/Legal/LegalShared';

type ItemStyle = 'bullet' | 'checkbox';

interface Section extends LegalSection {
    number?: string | null;
    part?: string | null;
    part_intro?: string[];
    item_style?: ItemStyle;
}

interface ShowDocument extends LegalDocument {
    intro?: string[];
    sections: Section[];
}

interface ShowProps extends LegalPageProps {
    document: ShowDocument;
    related: LegalDocumentMeta[];
}

function sectionNumber(section: Section, index: number): string {
    const n = section.number?.trim();
    if (!n) return String(index + 1).padStart(2, '0');
    return /^\d+$/.test(n) ? n.padStart(2, '0') : n;
}

export default function Show({ locale, locales, ui, contact, document: doc, related }: ShowProps) {
    const intl = resolveIntl(locales, locale);
    const [activeId, setActiveId] = useState<string>(doc.sections[0]?.id ?? '');

    const contactEmail =
        {
            'privacy-policy': contact.privacy,
            'cookie-policy': contact.privacy,
            'refund-policy': contact.support,
        }[doc.slug] ?? contact.legal;

    useEffect(() => {
        window.document.documentElement.lang = locale;
    }, [locale]);

    useEffect(() => {
        setActiveId(doc.sections[0]?.id ?? '');

        const elements = doc.sections
            .map((section) => window.document.getElementById(section.id))
            .filter((element): element is HTMLElement => element !== null);

        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActiveId(visible[0].target.id);
            },
            { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
        );

        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, [doc.slug, doc.sections]);

    const scrollToSection = (id: string) => {
        window.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveId(id);
    };

    return (
        <div className="bg-white text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
            <Head title={`${doc.title} — HiLights Football`} />
            <PublicNavbar />

            <main className="w-full">
                <LegalHero
                    eyebrow={`HiLights Football · ${ui.legal_center}`}
                    title={doc.title}
                    summary={doc.summary}
                    breadcrumb={
                        <nav className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/80">
                            <Link href={withLocale('/legal', locale)} className="transition-colors hover:text-white">
                                {ui.legal_center}
                            </Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-white">{doc.title}</span>
                        </nav>
                    }
                    aside={
                        <LanguageSwitcher locales={locales} current={locale} path={`/legal/${doc.slug}`} label={ui.language} />
                    }
                >
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-white/75">
                        <span className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {ui.last_updated}
                            <span className="font-mono font-semibold text-white">{formatLegalDate(doc.lastUpdated, intl)}</span>
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <FileCheck2 className="h-4 w-4" />
                            {ui.effective_date}
                            <span className="font-mono font-semibold text-white">{formatLegalDate(doc.effectiveDate, intl)}</span>
                        </span>
                        <span className="inline-flex items-center gap-2">
                            {ui.version}
                            <span className="font-mono font-semibold text-white">v{doc.version}</span>
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="font-semibold text-white">{doc.readTime}</span>
                        </span>
                    </div>
                </LegalHero>

                {locale !== 'en' && <TranslationNotice text={ui.translation_notice} />}

                <section className="bg-[#F8FAFC] dark:bg-[#111111]">
                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_300px]">
                            <aside className="min-w-0 print:hidden lg:sticky lg:top-24 lg:self-start">
                                <TableOfContents
                                    title={ui.on_this_page}
                                    sections={doc.sections}
                                    activeId={activeId}
                                    onSelect={scrollToSection}
                                />
                            </aside>

                            <div className="min-w-0 space-y-8">
                                <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-10 dark:border-[#2A2A2A] dark:bg-[#161616]">
                                    <div className="mb-8 flex items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6 dark:border-[#2A2A2A]">
                                        <span className="font-mono text-xs text-[#94A3B8] dark:text-[#555555]">
                                            {ui.sections_count.replace(':count', String(doc.sectionsCount))} · {doc.readTime}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => window.print()}
                                            className="inline-flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#475569] transition-colors hover:border-[#FF6B00] hover:text-[#FF6B00] print:hidden dark:border-[#2A2A2A] dark:text-[#9A9A9A] dark:hover:border-[#FF6B00] dark:hover:text-[#FF6B00]"
                                        >
                                            <Printer className="h-3.5 w-3.5" />
                                            {ui.print}
                                        </button>
                                    </div>

                                    {doc.intro && doc.intro.length > 0 && (
                                        <div className="mb-8 space-y-4 border-b border-[#E2E8F0] pb-8 dark:border-[#2A2A2A]">
                                            {doc.intro.map((paragraph, i) => (
                                                <p key={i} className="text-sm leading-7 text-[#0F172A] dark:text-[#F5F5F5]">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    )}

                                    <div className="space-y-8">
                                        {doc.sections.map((section, index) => (
                                            <DocumentSection key={section.id} section={section} index={index} />
                                        ))}
                                    </div>
                                </article>

                                <div className="flex justify-center xl:hidden">
                                    <WyscoutSidebarAd label={ui.sponsored} />
                                </div>

                                <LegalContactCard ui={ui} email={contactEmail} />

                                {/* <RelatedDocuments documents={related} ui={ui} locale={locale} /> */}
                            </div>

                            <aside className="hidden min-w-0 print:hidden xl:block">
                                <div className="sticky top-24">
                                    <WyscoutSidebarAd label={ui.sponsored} />
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>

            <PublicFooter />
        </div>
    );
}

interface TableOfContentsProps {
    title: string;
    sections: Section[];
    activeId: string;
    onSelect: (id: string) => void;
}

function TableOfContents({ title, sections, activeId, onSelect }: TableOfContentsProps) {
    const [open, setOpen] = useState(false);

    return (
        <nav
            aria-label={title}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto dark:border-[#2A2A2A] dark:bg-[#161616]"
        >
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                className="flex w-full items-center justify-between lg:pointer-events-none"
            >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#94A3B8] dark:text-[#555555]">
                    {title}
                </span>
                <ChevronDown
                    className={`h-4 w-4 text-[#94A3B8] transition-transform lg:hidden dark:text-[#555555] ${open ? 'rotate-180' : ''}`}
                />
            </button>

            <ol className={`${open ? 'mt-4 block' : 'hidden'} space-y-1 lg:mt-4 lg:block`}>
                {sections.map((section, index) => {
                    const active = section.id === activeId;
                    return (
                        <Fragment key={section.id}>
                            {section.part && (
                                <li className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-[#94A3B8] first:pt-0 dark:text-[#555555]">
                                    {section.part}
                                </li>
                            )}
                            <li>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onSelect(section.id);
                                        setOpen(false);
                                    }}
                                    className={`flex w-full items-start gap-3 rounded-r-lg border-l-2 px-3 py-2 text-left text-sm transition-colors ${active
                                        ? 'border-[#FF6B00] bg-[#FFF3EB] font-semibold text-[#CC5500] dark:bg-[rgba(255,107,0,0.12)] dark:text-[#FF6B00]'
                                        : 'border-transparent text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A] dark:text-[#9A9A9A] dark:hover:bg-[#1F1F1F] dark:hover:text-[#F5F5F5]'
                                        }`}
                                >
                                    <span
                                        className={`shrink-0 font-mono text-xs leading-5 ${active ? 'text-[#FF6B00]' : 'text-[#94A3B8] dark:text-[#555555]'
                                            }`}
                                    >
                                        {sectionNumber(section, index)}
                                    </span>
                                    <span className="leading-5">{section.heading}</span>
                                </button>
                            </li>
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}

function splitLabel(item: string): [string | null, string] {
    const index = item.indexOf(':');
    if (index > 0 && index <= 48) return [item.slice(0, index + 1), item.slice(index + 1)];
    return [null, item];
}

interface DocumentSectionProps {
    section: Section;
    index: number;
}

function DocumentSection({ section, index }: DocumentSectionProps) {
    const isCheckbox = section.item_style === 'checkbox';

    return (
        <section
            id={section.id}
            className="scroll-mt-28 border-t border-[#E2E8F0] pt-8 first:border-t-0 first:pt-0 dark:border-[#2A2A2A]"
        >
            {section.part && (
                <div className="mb-8 rounded-xl border-l-4 border-[#FF6B00] bg-[#FFF3EB] px-5 py-4 dark:bg-[rgba(255,107,0,0.12)]">
                    <p className="font-display text-xl font-bold uppercase tracking-wide text-[#CC5500] dark:text-[#FF6B00]">
                        {section.part}
                    </p>
                    {section.part_intro?.map((paragraph, i) => (
                        <p key={`pi-${i}`} className="mt-2 text-sm leading-7 text-[#475569] dark:text-[#9A9A9A]">
                            {paragraph}
                        </p>
                    ))}
                </div>
            )}

            <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-semibold text-[#FF6B00]">{sectionNumber(section, index)}</span>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[#0F172A] dark:text-[#F5F5F5]">
                    {section.heading}
                </h2>
            </div>

            <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, i) => (
                    <p key={`p-${i}`} className="text-sm leading-7 text-[#475569] dark:text-[#9A9A9A]">
                        {paragraph}
                    </p>
                ))}

                {section.items && section.items.length > 0 && (
                    <ul className="space-y-3">
                        {section.items.map((item, i) => {
                            const [label, body] = splitLabel(item);
                            return (
                                <li key={`i-${i}`} className="flex gap-3 text-sm leading-7 text-[#475569] dark:text-[#9A9A9A]">
                                    {isCheckbox ? (
                                        <span
                                            className="mt-[7px] h-3.5 w-3.5 shrink-0 rounded-[3px] border-2 border-[#FF6B00]"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-sm bg-[#FF6B00]" aria-hidden="true" />
                                    )}
                                    <span>
                                        {label && (
                                            <strong className="font-semibold text-[#0F172A] dark:text-[#F5F5F5]">{label}</strong>
                                        )}
                                        {body}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {section.closing?.map((paragraph, i) => (
                    <p key={`c-${i}`} className="text-sm leading-7 text-[#475569] dark:text-[#9A9A9A]">
                        {paragraph}
                    </p>
                ))}
            </div>
        </section>
    );
}

interface RelatedDocumentsProps {
    documents: LegalDocumentMeta[];
    ui: LegalUi;
    locale: LocaleCode;
}

function RelatedDocuments({ documents, ui, locale }: RelatedDocumentsProps) {
    return (
        <div className="print:hidden">
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#0F172A] dark:text-[#F5F5F5]">
                {ui.related}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {documents.map((document) => {
                    const Icon = DOCUMENT_ICONS[document.icon];
                    if (!Icon) return null;
                    return (
                        <Link
                            key={document.slug}
                            href={withLocale(`/legal/${document.slug}`, locale)}
                            className="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-colors hover:border-[#FF6B00] dark:border-[#2A2A2A] dark:bg-[#161616] dark:hover:border-[#FF6B00]"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                                <Icon className="h-5 w-5 text-[#FF6B00]" />
                            </div>
                            <p className="mt-4 flex-1 text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]">{document.title}</p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="font-mono text-xs text-[#94A3B8] dark:text-[#555555]">{document.readTime}</span>
                                <ArrowRight className="h-4 w-4 text-[#FF6B00] transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
