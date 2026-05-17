import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ThemeToggle from '@/components/shared/ThemeToggle';

interface LoginErrors {
    email?: string;
    password?: string;
    general?: string;
}

export default function Login() {
    // TODO: Replace with usePage().props.errors
    const { errors } = usePage().props as unknown as { errors: LoginErrors };

    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: POST route('login'), redirect by role after auth
        post(route('login'));
    };

    const hasError = errors?.email || errors?.password || errors?.general;

    return (
        <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#0D0D0D] lg:grid lg:grid-cols-2">
            {/* Theme Toggle - top right absolute */}
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            {/* LEFT PANEL — Orange brand panel (hidden on mobile) */}
            <div className="relative hidden lg:flex flex-col items-center justify-center bg-[#FF6B00] p-16 overflow-hidden">
                {/* Decorative floating player card silhouettes */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-16 left-12 w-40 h-56 rounded-2xl bg-white/10 border border-white/10 rotate-[-8deg]" />
                    <div className="absolute top-40 right-10 w-32 h-44 rounded-2xl bg-white/10 border border-white/10 rotate-[12deg]" />
                    <div className="absolute bottom-24 left-20 w-36 h-48 rounded-2xl bg-white/10 border border-white/10 rotate-[6deg]" />
                    <div className="absolute bottom-12 right-16 w-28 h-40 rounded-2xl bg-white/10 border border-white/10 rotate-[-14deg]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 rounded-2xl bg-white/5 border border-white/10 rotate-[3deg]" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center max-w-md">
                    {/* Logo */}
                    <Link href="/" className="inline-flex items-center gap-3 mb-10">
                        <img
                            src="/images/logo/hilights_logo_dark_200.png"
                            alt="HiLights Football"
                            className="h-14 w-auto"
                        />
                        <span className="font-display font-black text-5xl text-white italic tracking-tight">
              HiLights
            </span>
                    </Link>

                    {/* Tagline */}
                    <h2 className="font-display font-black text-3xl text-white leading-tight">
                        Welcome back to the world's football discovery platform
                    </h2>
                    <p className="text-white/80 text-xl mt-4 max-w-sm leading-relaxed">
                        Where talent meets opportunity. Trusted by scouts, clubs, and agents in 100+ countries.
                    </p>

                    {/* Stats Row */}
                    <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-md">
                        <div className="text-center">
                            <div className="font-mono font-black text-3xl text-white">240K+</div>
                            <div className="text-white/70 text-xs uppercase tracking-widest mt-1 font-semibold">
                                Players
                            </div>
                        </div>
                        <div className="text-center border-x border-white/20">
                            <div className="font-mono font-black text-3xl text-white">8,500+</div>
                            <div className="text-white/70 text-xs uppercase tracking-widest mt-1 font-semibold">
                                Scouts
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="font-mono font-black text-3xl text-white">120+</div>
                            <div className="text-white/70 text-xs uppercase tracking-widest mt-1 font-semibold">
                                Countries
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL — Login form */}
            <div className="flex items-center justify-center p-6 sm:p-8 bg-[#F8FAFC] dark:bg-[#0D0D0D] min-h-screen lg:min-h-0">
                <div className="w-full max-w-md">
                    {/* Mobile-only logo (shown above card on small screens) */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <Link href="/">
                            <img
                                src="/images/logo/hilights_logo_transparent_200.png"
                                alt="HiLights Football"
                                className="h-12 w-auto dark:hidden"
                            />
                            <img
                                src="/images/logo/hilights_logo_dark_200.png"
                                alt="HiLights Football"
                                className="h-12 w-auto hidden dark:block"
                            />
                        </Link>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-8 sm:p-10 w-full shadow-sm">
                        {/* Header */}
                        <div>
                            <h1 className="font-display font-black text-3xl text-[#0F172A] dark:text-[#F5F5F5] tracking-tight">
                                Sign In
                            </h1>
                            <p className="text-sm text-[#475569] dark:text-[#9A9A9A] mt-2">
                                Access your HiLights Football account
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[#E2E8F0] dark:border-[#2A2A2A] mt-6 mb-6" />

                        {/* Error Alert */}
                        {hasError && (
                            <Alert className="mb-5 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400">
                                <AlertCircle className="h-4 w-4 !text-red-600 dark:!text-red-400" />
                                <AlertDescription className="text-sm text-red-700 dark:text-red-400">
                                    {errors?.email ||
                                        errors?.password ||
                                        errors?.general ||
                                        'Invalid credentials. Please check your email and password.'}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]"
                                >
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="you@club.com"
                                    className="h-11 bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-1 dark:focus-visible:ring-orange-800 rounded-xl"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="h-11 pr-11 bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-1 dark:focus-visible:ring-orange-800 rounded-xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] dark:text-[#9A9A9A] hover:text-[#0F172A] dark:hover:text-[#F5F5F5] transition-colors"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between pt-1">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) =>
                                            setData('remember', Boolean(checked))
                                        }
                                        className="border-[#CBD5E1] dark:border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00] data-[state=checked]:text-white"
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm text-[#475569] dark:text-[#9A9A9A] cursor-pointer font-normal"
                                    >
                                        Remember me
                                    </Label>
                                </div>

                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-[#FF6B00] hover:text-[#CC5500] hover:underline font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full h-12 mt-6 bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold rounded-xl text-sm tracking-wide flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                            >
                                {processing ? (
                                    'SIGNING IN...'
                                ) : (
                                    <>
                                        SIGN IN
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-7">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#E2E8F0] dark:border-[#2A2A2A]" />
                            </div>
                            <div className="relative flex justify-center">
                <span className="bg-white dark:bg-[#161616] px-3 text-xs text-[#94A3B8] dark:text-[#555555] uppercase tracking-widest font-semibold">
                  or
                </span>
                            </div>
                        </div>

                        {/* Signup CTA */}
                        <div className="text-center space-y-1">
                            <p className="text-sm text-[#475569] dark:text-[#9A9A9A]">
                                Don't have an account?
                            </p>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center gap-1 text-sm text-[#FF6B00] font-semibold hover:text-[#CC5500] hover:underline"
                            >
                                Create your free account
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Footer — Trust line */}
                    <p className="text-center text-xs text-[#94A3B8] dark:text-[#555555] mt-6">
                        By signing in, you agree to our{' '}
                        <Link
                            href="/terms"
                            className="text-[#475569] dark:text-[#9A9A9A] hover:text-[#FF6B00] dark:hover:text-[#FF6B00] underline underline-offset-2"
                        >
                            Terms
                        </Link>{' '}
                        and{' '}
                        <Link
                            href="/privacy"
                            className="text-[#475569] dark:text-[#9A9A9A] hover:text-[#FF6B00] dark:hover:text-[#FF6B00] underline underline-offset-2"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
