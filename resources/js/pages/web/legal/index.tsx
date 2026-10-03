import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { ArrowRight, Calendar, Clock, Layers } from 'lucide-react';
import PublicNavbar from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/PublicFooter';
import {
    DOCUMENT_ICONS,
    LanguageSwitcher,
    LegalContactCard,
    LegalHero,
    SportRadarBannerAd,
    TranslationNotice,
    formatLegalDate,
    resolveIntl,
    withLocale,
    type LegalDocumentMeta,
    type LegalPageProps,
    type LegalUi,
    type LocaleCode,
} from '@/Components/Web/Legal/LegalShared';

interface IndexProps extends LegalPageProps {
    documents: LegalDocumentMeta[];
}

export default function Index({ locale, locales, ui, contact, documents }: IndexProps) {
    const intl = resolveIntl(locales, locale);

    useEffect(() => {
        window.document.documentElement.lang = locale;
    }, [locale]);

    return (
        <div className="bg-white text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
            <Head title={`${ui.index_title} — HiLights Football`} />
            <PublicNavbar />

            <main className="w-full">
                <LegalHero
                    eyebrow={`HiLights Football · ${ui.legal_center}`}
                    title={ui.index_title}
                    summary={ui.index_subtitle}
                    aside={<LanguageSwitcher locales={locales} current={locale} path="/legal" label={ui.language} />}
                />

                {locale !== 'en' && <TranslationNotice text={ui.translation_notice} />}

                <section className="bg-[#F8FAFC] dark:bg-[#111111]">
                    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {documents.map((document) => (
                                <DocumentCard key={document.slug} document={document} ui={ui} intl={intl} locale={locale} />
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <SportRadarBannerAd label={ui.sponsored} />
                        </div>

                        <LegalContactCard ui={ui} email={contact.legal} />
                    </div>
                </section>
            </main>

            <PublicFooter />
        </div>
    );
}

interface DocumentCardProps {
    document: LegalDocumentMeta;
    ui: LegalUi;
    intl: string;
    locale: LocaleCode;
}

function DocumentCard({ document, ui, intl, locale }: DocumentCardProps) {
    const Icon = DOCUMENT_ICONS[document.icon];

    return (
        <Link
            href={withLocale(`/legal/${document.slug}`, locale)}
            className="group flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-colors hover:border-[#FF6B00] sm:p-8 dark:border-[#2A2A2A] dark:bg-[#161616] dark:hover:border-[#FF6B00]"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]">
                    <Icon className="h-6 w-6 text-[#FF6B00]" />
                </div>
                <span className="rounded-md border border-[#E2E8F0] px-2 py-1 font-mono text-xs text-[#475569] dark:border-[#2A2A2A] dark:text-[#9A9A9A]">
                    v{document.version}
                </span>
            </div>

            <h2 className="mt-6 font-display text-2xl font-bold uppercase tracking-wide text-[#0F172A] dark:text-[#F5F5F5]">
                {document.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569] dark:text-[#9A9A9A]">{document.summary}</p>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#94A3B8] dark:text-[#555555]">
                <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {ui.last_updated}
                    <span className="font-mono text-[#475569] dark:text-[#9A9A9A]">
                        {formatLegalDate(document.lastUpdated, intl)}
                    </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {document.readTime}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" />
                    {ui.sections_count.replace(':count', String(document.sectionsCount))}
                </span>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-5 dark:border-[#2A2A2A]">
                <span className="text-sm font-semibold text-[#FF6B00]">{ui.read_document}</span>
                <ArrowRight className="h-4 w-4 text-[#FF6B00] transition-transform group-hover:translate-x-1" />
            </div>
        </Link>
    );
}
