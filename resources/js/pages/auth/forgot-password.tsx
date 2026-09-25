import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Link } from '@inertiajs/react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="relative min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6 py-12 font-sans">
            <Head title="Forgot password" />

            <div className="w-full max-w-[440px]">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <img
                            src="/images/logo/final_logo.png"
                            className="h-14 w-auto mx-auto"
                            alt="HiLights Football"
                        />
                    </Link>
                </div>

                <div className="bg-[#161616] rounded-2xl border border-[#2A2A2A] p-8">
                    <div className="text-center mb-6">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,107,0,0.12)]">
                            <Mail className="h-6 w-6 text-[#E53F01]" />
                        </div>
                        <h1 className="font-display font-black text-2xl text-[#F5F5F5]">
                            Forgot your password?
                        </h1>
                        <p className="text-sm text-[#9A9A9A] mt-2 leading-relaxed">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-5 rounded-lg border border-green-900 bg-green-950/30 px-4 py-3 text-center text-sm font-medium text-green-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                                className="w-full h-11 px-3.5 rounded-xl bg-[#111111] border border-[#2A2A2A] text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#E53F01] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition"
                            />
                            {errors.email && (
                                <p className="text-xs text-[#DC2626] mt-1.5">{errors.email}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-12 cursor-pointer rounded-xl bg-[#E53F01] hover:bg-[#E53F01] text-white font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Email Password Reset Link
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-[#9A9A9A] mt-6">
                    <Link
                        href={route('login')}
                        className="inline-flex items-center gap-1.5 text-[#E53F01] hover:underline font-semibold"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
