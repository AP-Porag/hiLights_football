import { useState, useRef, useEffect, FormEvent, KeyboardEvent, ClipboardEvent } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';

interface Props {
    whatsapp: string;
    status?: string | null;
}

export default function VerifyWhatsapp({ whatsapp, status }: Props) {
    const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { processing, errors, setError, clearErrors } = useForm({});
    const [resending, setResending] = useState(false);
    const [resendStatus, setResendStatus] = useState<string | null>(null);
    const [autoSent, setAutoSent] = useState(false);

    const code = digits.join('');

    // Page load hole ekbar automatically code pathao
    useEffect(() => {
        if (autoSent) return;

        setAutoSent(true);

        const timer = setTimeout(() => {
            router.post(route('verification.whatsapp.send'), {}, { preserveScroll: true });
        }, 100);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (idx: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const next = [...digits];
        next[idx] = value;
        setDigits(next);
        clearErrors('code');
        if (value && idx < 5) inputRefs.current[idx + 1]?.focus();
    };

    const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (!pasted) return;
        const next = Array(6).fill('');
        pasted.split('').forEach((d, i) => (next[i] = d));
        setDigits(next);
        const lastIdx = Math.min(pasted.length, 6) - 1;
        inputRefs.current[lastIdx >= 0 ? lastIdx : 0]?.focus();
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (code.length !== 6) {
            setError('code', 'Please enter the 6-digit code.');
            return;
        }
        router.post(
            route('verification.whatsapp.verify'),
            { code },
            {
                preserveScroll: true,
                onError: (errs) => {
                    if (errs.code) {
                        setDigits(Array(6).fill(''));
                        inputRefs.current[0]?.focus();
                    }
                },
            }
        );
    };

    const handleResend = () => {
        setResending(true);
        setResendStatus(null);
        router.post(
            route('verification.whatsapp.send'),
            {},
            {
                preserveScroll: true,
                onSuccess: () => setResendStatus('A new code has been sent to your WhatsApp number.'),
                onFinish: () => setResending(false),
            }
        );
    };

    return (
        <div className="relative min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6 py-12 font-sans">
            <div className="w-full max-w-[440px]">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <img
                            src="/images/logo/final_logo.png"
                            className="h-14 w-auto mx-auto"
                            alt="HiLights Football"
                        />
                    </Link>
                </div>

                <div className="bg-[#161616] rounded-2xl border border-[#2A2A2A] p-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(37,211,102,0.12)]">
                        <MessageCircle className="h-6 w-6 text-[#25D366]" />
                    </div>

                    <h1 className="font-display font-black text-2xl text-[#F5F5F5]">
                        Verify your WhatsApp number
                    </h1>
                    <p className="text-sm text-[#9A9A9A] mt-2 leading-relaxed">
                        We've sent a 6-digit code to <span className="text-[#F5F5F5] font-medium">{whatsapp}</span> via WhatsApp
                        (or SMS if WhatsApp isn't available). Enter it below.
                    </p>

                    {resendStatus && (
                        <p className="mt-4 text-xs font-medium text-green-400 bg-green-950/30 border border-green-900 rounded-lg py-2 px-3">
                            {resendStatus}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="flex items-center justify-center gap-2">
                            {digits.map((d, idx) => (
                                <input
                                    key={idx}
                                    ref={(el) => (inputRefs.current[idx] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={d}
                                    onChange={(e) => handleChange(idx, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(idx, e)}
                                    onPaste={handlePaste}
                                    className="h-14 w-12 text-center text-xl font-bold rounded-xl bg-[#111111] border border-[#2A2A2A] text-[#F5F5F5] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition"
                                />
                            ))}
                        </div>

                        {errors.code && (
                            <p className="text-xs text-[#DC2626] mt-3">{errors.code}</p>
                        )}

                        <button
                            type="submit"
                            disabled={processing || code.length !== 6}
                            className="w-full h-12 mt-6 cursor-pointer rounded-xl bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Verifying…' : 'Verify WhatsApp'}
                        </button>
                    </form>

                    <p className="text-sm text-[#9A9A9A] mt-6">
                        Didn't receive the code?{' '}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                            className="text-[#FF6B00] hover:underline font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {resending ? 'Sending…' : 'Resend code'}
                        </button>
                    </p>

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="inline-block text-xs text-[#94A3B8] hover:text-[#F5F5F5] mt-5"
                    >
                        Log out
                    </Link>
                </div>
            </div>
        </div>
    );
}
