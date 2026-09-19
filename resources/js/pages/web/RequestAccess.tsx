import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import PublicNavbar from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/PublicFooter';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Send, Users, Building2, Briefcase } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface Country {
    code: string;
    name: string;
}

interface Props {
    countries: Country[];
}

const ROLE_OPTIONS = [
    { value: 'scout', label: 'Scout' },
    { value: 'club', label: 'Club' },
    { value: 'agent', label: 'Agent' },
    { value: 'other', label: 'Other' },
];

// ── Dark/light theme-aware styling for react-phone-number-input ─────────────
function PhoneStyles() {
    return (
        <style>{`
            .PhoneInput {
                display: flex;
                align-items: center;
                gap: 8px;
                height: 44px;
                background-color: #ffffff;
                border: 1px solid #E2E8F0;
                border-radius: 12px;
                padding: 0 12px;
                transition: border-color 0.15s, box-shadow 0.15s;
            }
            .dark .PhoneInput {
                background-color: #111111;
                border-color: #2A2A2A;
            }
            .PhoneInput--focus {
                border-color: #FF6B00;
                box-shadow: 0 0 0 2px rgba(255,107,0,0.15);
            }
            .PhoneInputCountry {
                display: flex;
                align-items: center;
                gap: 6px;
                padding-right: 8px;
                border-right: 1px solid #E2E8F0;
                flex-shrink: 0;
            }
            .dark .PhoneInputCountry {
                border-right-color: #2A2A2A;
            }
            .PhoneInputCountryIcon {
                width: 22px;
                height: 16px;
                border-radius: 2px;
                overflow: hidden;
            }
            .PhoneInputCountrySelect {
                background: transparent;
                color: #0F172A;
                border: none;
                outline: none;
                font-size: 13px;
                cursor: pointer;
            }
            .dark .PhoneInputCountrySelect {
                color: #F5F5F5;
            }
            .PhoneInputCountrySelect option {
                background-color: #ffffff;
                color: #0F172A;
            }
            .dark .PhoneInputCountrySelect option {
                background-color: #1F1F1F;
                color: #F5F5F5;
            }
            .PhoneInputCountrySelectArrow {
                border-color: #94A3B8 transparent transparent;
                opacity: 0.8;
            }
            .PhoneInputInput {
                flex: 1;
                background: transparent;
                border: none;
                outline: none;
                color: #0F172A;
                font-size: 14px;
                height: 100%;
            }
            .dark .PhoneInputInput {
                color: #F5F5F5;
            }
            .PhoneInputInput::placeholder {
                color: #94A3B8;
            }
            .dark .PhoneInputInput::placeholder {
                color: #555555;
            }
        `}</style>
    );
}

export default function RequestAccess({ countries = [] }: Props) {
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        organization: '',
        role: '',
        email: '',
        country: '',
        phone: '',
        interest: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('request-access.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    const inputClasses =
        'w-full bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl h-11 px-4 text-sm text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-[rgba(255,107,0,0.15)] transition-colors';

    const labelClasses = 'block text-sm font-medium text-[#0F172A] dark:text-[#F5F5F5] mb-2 font-sans';

    return (
        <div className="min-h-screen bg-white dark:bg-[#0D0D0D]">
            <PhoneStyles />
            <PublicNavbar />

            <main className="pt-16">
                {/* HEADER BAND */}
                <section className="bg-[#FF6B00] py-16">
                    <div className="max-w-[900px] mx-auto px-6 text-center">
                        <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                            Request Access
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-sans">
                            Scouts, clubs, and agents — tell us who you are and what you're looking for. Our team will reach out to set up your access.
                        </p>
                    </div>
                </section>

                {/* WHO IS THIS FOR */}
                <section className="bg-[#F8FAFC] dark:bg-[#0D0D0D] py-10">
                    <div className="max-w-[720px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { Icon: Users, label: 'Scouts', desc: 'Discover and track talent' },
                            { Icon: Building2, label: 'Clubs', desc: 'Recruit for your academy' },
                            { Icon: Briefcase, label: 'Agents', desc: 'Represent and connect players' },
                        ].map(({ Icon, label, desc }) => (
                            <div
                                key={label}
                                className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-5 text-center"
                            >
                                <div className="mx-auto mb-3 w-11 h-11 rounded-xl bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] flex items-center justify-center">
                                    <Icon className="h-5 w-5 text-[#FF6B00]" />
                                </div>
                                <p className="font-semibold text-sm text-[#0F172A] dark:text-[#F5F5F5]">{label}</p>
                                <p className="text-xs text-[#475569] dark:text-[#9A9A9A] mt-1">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FORM */}
                <section className="bg-[#F8FAFC] dark:bg-[#0D0D0D] pb-16">
                    <div className="max-w-[720px] mx-auto px-6">
                        <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-10">
                            <h2 className="font-display font-bold text-2xl text-[#0F172A] dark:text-[#F5F5F5] tracking-tight">
                                Tell us about yourself
                            </h2>
                            <p className="mt-2 text-sm text-[#475569] dark:text-[#9A9A9A] font-sans">
                                Fill out the form below — we'll review your request and follow up by email.
                            </p>

                            {submitted && (
                                <Alert className="mt-6 bg-green-50 dark:bg-[rgba(22,163,74,0.10)] border-[#16A34A] text-[#15803D] dark:text-[#4ADE80]">
                                    <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                                    <AlertDescription className="text-sm font-medium">
                                        Request submitted! Our team will get back to you soon.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                {/* Name + Role */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className={labelClasses}>Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="John Anderson"
                                            className={inputClasses}
                                            required
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-[#FF6B00]">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="role" className={labelClasses}>I am a…</label>
                                        <select
                                            id="role"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            className={inputClasses}
                                            required
                                        >
                                            <option value="">Select role</option>
                                            {ROLE_OPTIONS.map((r) => (
                                                <option key={r.value} value={r.value}>{r.label}</option>
                                            ))}
                                        </select>
                                        {errors.role && <p className="mt-1 text-xs text-[#FF6B00]">{errors.role}</p>}
                                    </div>
                                </div>

                                {/* Organization */}
                                <div>
                                    <label htmlFor="organization" className={labelClasses}>
                                        Organization / Club / Agency <span className="text-[#94A3B8] dark:text-[#555555] font-normal">(optional)</span>
                                    </label>
                                    <input
                                        id="organization"
                                        type="text"
                                        value={data.organization}
                                        onChange={(e) => setData('organization', e.target.value)}
                                        placeholder="e.g. FC Porto Scouting"
                                        className={inputClasses}
                                    />
                                    {errors.organization && <p className="mt-1 text-xs text-[#FF6B00]">{errors.organization}</p>}
                                </div>

                                {/* Email + Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="email" className={labelClasses}>Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="you@club.com"
                                            className={inputClasses}
                                            required
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-[#FF6B00]">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className={labelClasses}>
                                            Phone Number <span className="text-[#94A3B8] dark:text-[#555555] font-normal">(optional)</span>
                                        </label>
                                        <PhoneInput
                                            id="phone"
                                            international
                                            defaultCountry="BD"
                                            limitMaxLength
                                            value={data.phone}
                                            onChange={(value) => setData('phone', value || '')}
                                            placeholder="Enter phone number"
                                        />
                                        {errors.phone && <p className="mt-1 text-xs text-[#FF6B00]">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Country */}
                                <div>
                                    <label htmlFor="country" className={labelClasses}>Country / Location</label>
                                    <select
                                        id="country"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className={inputClasses}
                                    >
                                        <option value="">Select country</option>
                                        {countries.map((c) => (
                                            <option key={c.code} value={c.code}>{c.name}</option>
                                        ))}
                                    </select>
                                    {errors.country && <p className="mt-1 text-xs text-[#FF6B00]">{errors.country}</p>}
                                </div>

                                {/* Interest */}
                                <div>
                                    <label htmlFor="interest" className={labelClasses}>What are you interested in?</label>
                                    <input
                                        id="interest"
                                        type="text"
                                        value={data.interest}
                                        onChange={(e) => setData('interest', e.target.value)}
                                        placeholder="e.g. Finding U-18 strikers in South America"
                                        className={inputClasses}
                                    />
                                    {errors.interest && <p className="mt-1 text-xs text-[#FF6B00]">{errors.interest}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className={labelClasses}>
                                        Additional Message <span className="text-[#94A3B8] dark:text-[#555555] font-normal">(optional)</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tell us more about your requirements…"
                                        className="w-full bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl h-32 px-4 py-3 text-sm text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-[rgba(255,107,0,0.15)] transition-colors resize-none"
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-[#FF6B00]">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-12 bg-[#FF6B00] hover:bg-[#CC5500] text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <Send className="h-4 w-4" />
                                    {processing ? 'Submitting…' : 'Submit Request'}
                                </button>

                                <p className="text-xs text-[#94A3B8] dark:text-[#555555] text-center font-sans">
                                    By submitting, you agree to our{' '}
                                    <Link href="/privacy" className="text-[#FF6B00] hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <PublicFooter />
        </div>
    );
}
