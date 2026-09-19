import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, KeyRound, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { Link } from '@inertiajs/react';

interface ResetPasswordProps {
    token: string;
    email: string;
}

interface ResetPasswordForm {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<ResetPasswordForm>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6 py-12 font-sans">
            <Head title="Reset password" />

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
                            <KeyRound className="h-6 w-6 text-[#FF6B00]" />
                        </div>
                        <h1 className="font-display font-black text-2xl text-[#F5F5F5]">
                            Reset Your Password
                        </h1>
                        <p className="text-sm text-[#9A9A9A] mt-2 leading-relaxed">
                            Please enter your new password below.
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        {/* Email (readonly) */}
                        <div className="mb-4">
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
                                autoComplete="email"
                                value={data.email}
                                readOnly
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full h-11 px-3.5 rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] text-sm text-[#9A9A9A] cursor-not-allowed"
                            />
                            {errors.email && (
                                <p className="text-xs text-[#DC2626] mt-1.5">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    autoComplete="new-password"
                                    autoFocus
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Minimum 8 characters"
                                    className="w-full h-11 pl-3.5 pr-11 rounded-xl bg-[#111111] border border-[#2A2A2A] text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#F5F5F5]"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-[#DC2626] mt-1.5">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                            >
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={showConfirm ? 'text' : 'password'}
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Re-enter your new password"
                                    className="w-full h-11 pl-3.5 pr-11 rounded-xl bg-[#111111] border border-[#2A2A2A] text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#F5F5F5]"
                                >
                                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="text-xs text-[#DC2626] mt-1.5">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-12 cursor-pointer rounded-xl bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
