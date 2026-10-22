import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, ShieldAlert } from 'lucide-react';

interface SuspendedProps {
    supportEmail: string;
}

export default function Suspended({ supportEmail }: SuspendedProps) {
    const subject = encodeURIComponent('Suspended account — review request');

    return (
        <div className="flex min-h-screen flex-col bg-[#0D0D0D] font-sans antialiased">
            <Head title="Account suspended — HiLights Football" />

            {/* Logo */}
            <header className="px-6 pt-8 sm:px-10 2xl:pt-12">
                <Link href="/" className="inline-block">
                    <img src="/images/logo/final_logo.png" className="h-10 w-auto sm:h-12 2xl:h-14" alt="HiLights Football" />
                </Link>
            </header>

            <main className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 2xl:py-16">
                <div className="w-full max-w-[34rem] 2xl:max-w-[40rem]">
                    <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 sm:p-10 2xl:p-12">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(255,107,0,0.12)] 2xl:h-16 2xl:w-16">
                            <ShieldAlert className="h-7 w-7 text-[#E53F01] 2xl:h-8 2xl:w-8" strokeWidth={2} />
                        </div>

                        <h1 className="font-display mt-6 text-2xl leading-tight font-black tracking-tight text-[#F5F5F5] sm:text-3xl 2xl:text-4xl">
                            Your account has been suspended
                        </h1>

                        <p className="mt-4 text-sm leading-relaxed text-[#9A9A9A] sm:text-base 2xl:text-lg">
                            You cannot sign in while the suspension is active, and your football identity is not visible to scouts, agents or clubs.
                        </p>

                        <p className="mt-4 text-sm leading-relaxed text-[#9A9A9A] sm:text-base 2xl:text-lg">
                            If you believe this was a mistake, contact our support team and we will review your account.
                        </p>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href={`mailto:${supportEmail}?subject=${subject}`}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E53F01] px-5 text-sm font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90 sm:flex-1 2xl:h-14 2xl:text-base"
                            >
                                <Mail className="h-4 w-4 shrink-0 2xl:h-5 2xl:w-5" />
                                Contact support
                            </a>
                            <Link
                                href="/"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#2A2A2A] px-5 text-sm font-semibold text-[#9A9A9A] transition-colors hover:border-[#E53F01] hover:text-[#E53F01] 2xl:h-14 2xl:text-base"
                            >
                                <ArrowLeft className="h-4 w-4 shrink-0 2xl:h-5 2xl:w-5" />
                                Back to home
                            </Link>
                        </div>
                    </div>

                    {/* Support line */}
                    <p className="mt-6 text-center text-xs text-[#555555] 2xl:text-sm">
                        Need help? Write to{' '}
                        <a href={`mailto:${supportEmail}`} className="font-semibold break-all text-[#9A9A9A] hover:text-[#E53F01]">
                            {supportEmail}
                        </a>
                    </p>
                </div>
            </main>
        </div>
    );
}
