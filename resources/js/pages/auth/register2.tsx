import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Check, ChevronLeft, ChevronRight, Eye, EyeOff, Zap } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Select from 'react-select';
import { z } from 'zod';

type RoleId = 'player' | 'scout' | 'agent' | 'club';

interface RoleOption {
    id: RoleId;
    title: string;
    description: string;
    Icon: typeof Zap;
}

const ROLES: RoleOption[] = [
    {
        id: 'player',
        title: 'Player',
        description: 'Build your football identity, upload highlights, and get discovered by scouts and clubs worldwide.',
        Icon: Zap,
    },
];

interface Country {
    code: string;
    name: string;
}

type Props = {
    countries: Country[];
};

const registerSchema = z
    .object({
        role: z.enum(['player', 'scout', 'agent', 'club']),
        name: z.string().min(2, 'Name is required'),
        email: z.string().email('Invalid email'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        password_confirmation: z.string(),
        dob: z.string().optional(),
        gender: z.string().optional(),
        nationality: z.array(z.string()).optional(),
        country: z.string().optional(),
        organization_name: z.string().optional(),
        whatsapp: z
            .string()
            .min(1, 'WhatsApp number is required')
            .refine((val) => isValidPhoneNumber(val), { message: 'Enter a valid WhatsApp number for the selected country' }),
        terms: z.boolean().refine((val) => val === true, {
            message: 'You must accept terms',
        }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ['password_confirmation'],
    })
    .refine((data) => data.role !== 'player' || (data.gender && data.gender.length > 0), {
        message: 'Gender is required',
        path: ['gender'],
    });

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// ── Custom professional date-of-birth calendar ──────────────────────────
function DobCalendar({ value, onSelect }: { value?: Date; onSelect: (d: Date) => void }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date(1950, 0, 1);
    const [viewDate, setViewDate] = useState<Date>(value ?? new Date(2005, 0, 1));
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const years: number[] = [];
    for (let y = today.getFullYear(); y >= 1950; y--) years.push(y);
    const firstDayOffset = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstDayOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    const isDisabled = (d: Date) => d > today || d < minDate;
    const isSelected = (d: Date) => (value ? d.toDateString() === value.toDateString() : false);
    const isToday = (d: Date) => d.toDateString() === today.toDateString();
    const goPrev = () => setViewDate(new Date(year, month - 1, 1));
    const goNext = () => setViewDate(new Date(year, month + 1, 1));
    const nextMonthStart = new Date(year, month + 1, 1);
    const canGoNext = nextMonthStart <= today;
    const canGoPrev = new Date(year, month, 1) > minDate;
    return (
        <div className="w-[320px] p-4">
            {/* Header — month/year dropdowns + arrows */}
            <div className="mb-4 flex items-center justify-between gap-2">
                <button
                    type="button"
                    onClick={goPrev}
                    disabled={!canGoPrev}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2A2A2A] text-[#F5F5F5] transition-colors hover:border-[#E53F01] hover:bg-[rgba(255,107,0,0.12)] hover:text-[#E53F01] disabled:pointer-events-none disabled:opacity-30"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                    <select
                        value={month}
                        onChange={(e) => setViewDate(new Date(year, Number(e.target.value), 1))}
                        className="h-8 cursor-pointer rounded-lg border border-[#2A2A2A] bg-[#111111] px-2 text-[13px] font-medium text-[#F5F5F5] transition-colors hover:border-[#3A3A3A] focus:border-[#E53F01] focus:outline-none"
                    >
                        {MONTHS.map((m, i) => (
                            <option key={m} value={i} className="bg-[#1F1F1F]">
                                {m}
                            </option>
                        ))}
                    </select>
                    <select
                        value={year}
                        onChange={(e) => setViewDate(new Date(Number(e.target.value), month, 1))}
                        className="h-8 cursor-pointer rounded-lg border border-[#2A2A2A] bg-[#111111] px-2 text-[13px] font-medium text-[#F5F5F5] transition-colors hover:border-[#3A3A3A] focus:border-[#E53F01] focus:outline-none"
                    >
                        {years.map((y) => (
                            <option key={y} value={y} className="bg-[#1F1F1F]">
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoNext}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2A2A2A] text-[#F5F5F5] transition-colors hover:border-[#E53F01] hover:bg-[rgba(255,107,0,0.12)] hover:text-[#E53F01] disabled:pointer-events-none disabled:opacity-30"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
            {/* Weekday header */}
            <div className="mb-2 grid grid-cols-7">
                {WEEKDAYS.map((w) => (
                    <div key={w} className="flex h-8 items-center justify-center text-[11px] font-semibold text-[#9A9A9A] uppercase">
                        {w}
                    </div>
                ))}
            </div>
            {/* Day grid */}
            <div className="grid grid-cols-7 gap-1">
                {cells.map((d, i) => {
                    if (!d) return <div key={`empty-${i}`} className="h-9" />;
                    const disabled = isDisabled(d);
                    const selected = isSelected(d);
                    const todayCell = isToday(d);
                    return (
                        <button
                            key={d.toISOString()}
                            type="button"
                            disabled={disabled}
                            onClick={() => onSelect(d)}
                            className={[
                                'mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-[13px] font-medium transition-colors',
                                selected
                                    ? 'bg-[#E53F01] font-semibold text-[#0D0D0D]'
                                    : disabled
                                      ? 'pointer-events-none text-[#3A3A3A]'
                                      : todayCell
                                        ? 'font-semibold text-[#E53F01] hover:bg-[rgba(255,107,0,0.12)]'
                                        : 'text-[#F5F5F5] hover:bg-[rgba(255,107,0,0.12)] hover:text-[#E53F01]',
                            ].join(' ')}
                        >
                            {d.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ── Dark-theme styling for react-phone-number-input ─────────────────────
// PhoneInput renders: .PhoneInput > .PhoneInputCountry (flag + select) + .PhoneInputInput (number field)
// libphonenumber-js metadata automatically restricts max digit count per selected country.
function PhoneDarkStyles() {
    return (
        <style>{`
            .PhoneInput {
                display: flex;
                align-items: center;
                gap: 8px;
                height: 44px;
                background-color: #111111;
                border: 1px solid #2A2A2A;
                border-radius: 12px;
                padding: 0 12px;
                transition: border-color 0.15s, box-shadow 0.15s;
            }
            .PhoneInput--focus {
                border-color: #E53F01;
                box-shadow: 0 0 0 2px rgba(255,107,0,0.15);
            }
            .PhoneInputCountry {
                display: flex;
                align-items: center;
                gap: 6px;
                padding-right: 8px;
                border-right: 1px solid #2A2A2A;
                flex-shrink: 0;
            }
            .PhoneInputCountryIcon {
                width: 22px;
                height: 16px;
                border-radius: 2px;
                overflow: hidden;
            }
            .PhoneInputCountrySelect {
                background: transparent;
                color: #F5F5F5;
                border: none;
                outline: none;
                font-size: 13px;
                cursor: pointer;
            }
            .PhoneInputCountrySelect option {
                background-color: #1F1F1F;
                color: #F5F5F5;
            }
            .PhoneInputCountrySelectArrow {
                border-color: #9A9A9A transparent transparent;
                opacity: 0.8;
            }
            .PhoneInputInput {
                flex: 1;
                background: transparent;
                border: none;
                outline: none;
                color: #F5F5F5;
                font-size: 14px;
                height: 100%;
            }
            .PhoneInputInput::placeholder {
                color: #555555;
            }
        `}</style>
    );
}

// ────────────────────────────────────────────────────────────────────────
export default function Register({ countries = [] }: Props) {
    const [step, setStep] = useState<0 | 1>(0);
    const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
    const [openCalendar, setOpenCalendar] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        role: '' as RoleId | '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        dob: '',
        gender: '',
        nationality: [] as string[],
        country: '',
        organization_name: '',
        whatsapp: '', // E.164 format e.g. +8801700000000 — Twilio OTP-er jonno ready
        terms: false as boolean,
    });

    const handleSelectRole = (role: RoleId) => {
        setSelectedRole(role);
        setData('role', role);
        setStep(1);
    };

    // URL-e ?role=scout thakle direct oi role-e step 1-e jao
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const roleParam = params.get('role');
        if (roleParam && ['player', 'scout', 'agent', 'club'].includes(roleParam)) {
            const r = roleParam as RoleId;
            setSelectedRole(r);
            setData('role', r);
            setStep(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!data.role) {
            setClientErrors((prev) => ({
                ...prev,
                role: 'Please select a role',
            }));
            return;
        }
        const result = registerSchema.safeParse(data);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((err) => {
                const path = err.path?.[0];
                if (typeof path === 'string') {
                    fieldErrors[path] = err.message;
                }
            });
            setClientErrors(fieldErrors);
            return;
        }
        setClientErrors({});
        post('/register');
    };
    const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));

    const options = sortedCountries.map((c) => ({
        value: c.code,
        label: `${c.name} (${c.code})`, // optional
    }));

    // react-select dark theme styles (nationality ar country dutoi te use hobe)
    const selectStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: '#111111',
            borderColor: '#2A2A2A',
            color: '#F5F5F5',
            minHeight: '44px',
            borderRadius: '12px',
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: '#1F1F1F',
            borderColor: '#2A2A2A',
            borderRadius: '12px',
            marginTop: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected ? '#E53F01' : state.isFocused ? '#2A2A2A' : '#1F1F1F',
            color: state.isSelected ? '#0D0D0D' : '#F5F5F5',
            fontWeight: state.isSelected ? '600' : '400',
            padding: '10px 12px',
        }),
        input: (base: any) => ({
            ...base,
            color: '#F5F5F5',
        }),
        singleValue: (base: any) => ({
            ...base,
            color: '#F5F5F5',
        }),
    };

    const calcAge = (dob: string): number | null => {
        if (!dob) return null;
        const d = new Date(dob);
        if (isNaN(d.getTime())) return null;
        const diff = Date.now() - d.getTime();
        const age = new Date(diff).getUTCFullYear() - 1970;
        return age >= 0 ? age : null;
    };
    const age = calcAge(data.dob);

    const selectedRoleObj = ROLES.find((r) => r.id === selectedRole);
    const dobDate = data.dob ? new Date(data.dob) : undefined;

    return (
        <div className="relative min-h-screen bg-[#0D0D0D] font-sans antialiased">
            <PhoneDarkStyles />
            {/* TOP — Logo + heading */}
            <div className="px-6 py-10 text-center">
                <Link href="/" className="inline-block">
                    <img src="/images/logo/final_logo.png" className="mx-auto h-14 w-auto" alt="HiLights Football" />
                </Link>
                <h1 className="font-display mt-6 text-3xl font-black tracking-tight text-[#F5F5F5] sm:text-4xl">Join HiLights Football</h1>
                <p className="mx-auto mt-2 max-w-md text-sm text-[#9A9A9A] sm:text-base">
                    Build your football identity, get discovered, and unlock the world's leading football talent network.
                </p>
                {/* Step dots */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    <span className={'h-2.5 rounded-full transition-all duration-300 ' + (step === 0 ? 'w-8 bg-[#E53F01]' : 'w-2.5 bg-[#E53F01]')} />
                    <span className={'h-2.5 rounded-full transition-all duration-300 ' + (step === 1 ? 'w-8 bg-[#E53F01]' : 'w-2.5 bg-[#2A2A2A]')} />
                </div>
                <p className="mt-3 font-mono text-xs tracking-wider text-[#555555] uppercase">
                    Step {step + 1} of 2 — {step === 0 ? 'Choose your role' : 'Your details'}
                </p>
            </div>
            {clientErrors.role && <p className="mt-2 text-center text-xs text-[#E53F01]">{clientErrors.role}</p>}
            {/* STEP 1 — ROLE CARDS */}
            {step === 0 && (
                <div className="mx-auto max-w-[860px] px-6 pb-16">
                    <div className="mt-2 flex flex-wrap justify-center gap-4">
                        {ROLES.map((role) => {
                            const isSelected = selectedRole === role.id;
                            const Icon = role.Icon;
                            return (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => handleSelectRole(role.id)}
                                    className={
                                        'group w-full cursor-pointer rounded-2xl border-2 p-7 text-center transition-all duration-200 sm:w-[280px] ' +
                                        (isSelected
                                            ? 'border-[#E53F01] bg-[rgba(255,107,0,0.08)] shadow-[0_0_0_4px_rgba(255,107,0,0.15)]'
                                            : 'border-[#2A2A2A] bg-[#161616] hover:-translate-y-1 hover:border-[#E53F01] hover:shadow-[0_0_0_4px_rgba(255,107,0,0.08)]')
                                    }
                                >
                                    <div className="mx-auto inline-flex items-center justify-center rounded-full bg-[rgba(255,107,0,0.15)] p-3">
                                        <Icon className="h-[44px] w-[44px] text-[#E53F01]" strokeWidth={2} />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-[#F5F5F5]">{role.title}</h3>
                                    <p className="mt-2 text-xs leading-relaxed text-[#9A9A9A]">{role.description}</p>
                                </button>
                            );
                        })}
                    </div>
                    <p className="mt-10 text-center text-sm text-[#9A9A9A]">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-[#E53F01] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            )}
            {/* STEP 2 — FORM */}
            {step === 1 && selectedRoleObj && (
                <div className="mx-auto max-w-[440px] px-6 pb-16">
                    <form onSubmit={handleSubmit} className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-8">
                        {/* Selected role badge */}
                        <div className="mb-6 flex items-center justify-between gap-3 border-b border-[#2A2A2A] pb-6">
                            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E53F01] bg-[rgba(255,107,0,0.12)] py-1.5 pr-3.5 pl-2.5">
                                <selectedRoleObj.Icon className="h-4 w-4 text-[#E53F01]" />
                                <span className="text-xs font-semibold tracking-wider text-[#E53F01] uppercase">
                                    Registering as {selectedRoleObj.title}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep(0)}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#E53F01] hover:underline"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Change
                            </button>
                        </div>
                        {/* Full Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="mb-1.5 block text-xs font-semibold tracking-wider text-[#F5F5F5] uppercase">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Lucas Martinez"
                                className="h-11 w-full rounded-xl border border-[#2A2A2A] bg-[#111111] px-3.5 text-sm text-[#F5F5F5] transition placeholder:text-[#555555] focus:border-[#E53F01] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] focus:outline-none"
                            />
                            {(clientErrors.name || errors.name) && (
                                <p className="mt-1.5 text-xs text-[#E53F01]">{clientErrors.name || errors.name}</p>
                            )}
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold tracking-wider text-[#F5F5F5] uppercase">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                                className="h-11 w-full rounded-xl border border-[#2A2A2A] bg-[#111111] px-3.5 text-sm text-[#F5F5F5] transition placeholder:text-[#555555] focus:border-[#E53F01] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] focus:outline-none"
                            />
                            <p className="mt-1.5 text-[11px] text-[#94A3B8]">
                                We'll send a verification code to this email. You must verify it before accessing your account.
                            </p>
                            {(clientErrors.email || errors.email) && (
                                <p className="mt-1.5 text-xs text-[#E53F01]">{clientErrors.email || errors.email}</p>
                            )}
                        </div>
                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="mb-1.5 block text-xs font-semibold tracking-wider text-[#F5F5F5] uppercase">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Minimum 8 characters"
                                    className="h-11 w-full rounded-xl border border-[#2A2A2A] bg-[#111111] pr-11 pl-3.5 text-sm text-[#F5F5F5] transition placeholder:text-[#555555] focus:border-[#E53F01] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[#9A9A9A] hover:text-[#F5F5F5]"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {(clientErrors.password || errors.password) && (
                                <p className="mt-1.5 text-xs text-[#DC2626]">{clientErrors.password || errors.password}</p>
                            )}
                        </div>
                        {/* Confirm Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password_confirmation"
                                className="mb-1.5 block text-xs font-semibold tracking-wider text-[#F5F5F5] uppercase"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={showConfirm ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Re-enter your password"
                                    className="h-11 w-full rounded-xl border border-[#2A2A2A] bg-[#111111] pr-11 pl-3.5 text-sm text-[#F5F5F5] transition placeholder:text-[#555555] focus:border-[#E53F01] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[#9A9A9A] hover:text-[#F5F5F5]"
                                >
                                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {(clientErrors.password_confirmation || errors.password_confirmation) && (
                                <p className="mt-1.5 text-xs text-[#E53F01]">{clientErrors.password_confirmation || errors.password_confirmation}</p>
                            )}
                        </div>

                        {/* ── WhatsApp Number (country code + number split, digit-restricted per country) ── */}
                        <div className="mb-4">
                            <label htmlFor="whatsapp" className="mb-1.5 block text-xs font-semibold tracking-wider text-[#F5F5F5] uppercase">
                                WhatsApp Number
                            </label>
                            <PhoneInput
                                id="whatsapp"
                                international
                                defaultCountry="BD"
                                limitMaxLength
                                value={data.whatsapp}
                                onChange={(value) => setData('whatsapp', value || '')}
                                placeholder="Enter WhatsApp number"
                            />
                            <p className="mt-1.5 text-[11px] text-[#94A3B8]">
                                We'll verify this via a WhatsApp OTP (or SMS if WhatsApp isn't available on this number).
                            </p>
                            {(clientErrors.whatsapp || errors.whatsapp) && (
                                <p className="mt-1.5 text-xs text-[#E53F01]">{clientErrors.whatsapp || errors.whatsapp}</p>
                            )}
                        </div>

                        {/* Player-specific fields */}
                        {selectedRole === 'player' && (
                            <>
                                <div className="mb-4">
                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-[#F5F5F5] uppercase">
                                        Date of Birth
                                        {age !== null && (
                                            <span className="ml-2 font-mono tracking-normal text-[#E53F01] normal-case">· Age {age}</span>
                                        )}
                                    </label>
                                    <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className="group flex h-11 w-full items-center justify-between rounded-xl border border-[#2A2A2A] bg-[#111111] px-3.5 text-sm text-[#F5F5F5] transition hover:border-[#3A3A3A] focus:border-[#E53F01] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] focus:outline-none"
                                            >
                                                <span className={data.dob ? 'text-[#F5F5F5]' : 'text-[#555555]'}>
                                                    {data.dob ? format(new Date(data.dob), 'MMMM dd, yyyy') : 'Select your date of birth'}
                                                </span>
                                                <Calendar className="h-4 w-4 text-[#E53F01] transition group-hover:text-[#E53F01]" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto rounded-2xl border border-[#2A2A2A] bg-[#1F1F1F] p-0 shadow-2xl"
                                            align="start"
                                        >
                                            <DobCalendar
                                                value={dobDate}
                                                onSelect={(date) => {
                                                    setData('dob', format(date, 'yyyy-MM-dd'));
                                                    setOpenCalendar(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {(clientErrors.dob || errors.dob) && (
                                        <p className="mt-1.5 text-xs text-[#E53F01]">{clientErrors.dob || errors.dob}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-[#F5F5F5] uppercase">Gender</label>
                                    <div className="flex gap-3">
                                        {[
                                            { v: 'M', l: 'Male' },
                                            { v: 'F', l: 'Female' },
                                            { v: 'Other', l: 'Other' },
                                        ].map((g) => {
                                            const selected = data.gender === g.v;
                                            return (
                                                <button
                                                    key={g.v}
                                                    type="button"
                                                    onClick={() => setData('gender', g.v)}
                                                    className={
                                                        'h-11 flex-1 rounded-xl border text-sm font-semibold transition-colors ' +
                                                        (selected
                                                            ? 'border-[#E53F01] bg-[rgba(255,107,0,0.12)] text-[#E53F01]'
                                                            : 'border-[#2A2A2A] bg-[#111111] text-[#9A9A9A] hover:border-[#E53F01]')
                                                    }
                                                >
                                                    {g.l}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {(clientErrors.gender || errors.gender) && (
                                        <p className="mt-1.5 text-xs text-[#E53F01]">{clientErrors.gender || errors.gender}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="nationality"
                                        className="mb-1.5 block text-xs font-semibold tracking-wider text-[#F5F5F5] uppercase"
                                    >
                                        Nationality
                                    </label>
                                    <Select
                                        options={options}
                                        value={options.filter((o) => data.nationality.includes(o.value))}
                                        onChange={(selected) => setData('nationality', selected ? selected.map((o) => o.value) : [])}
                                        isMulti
                                        placeholder="Select one or more nationalities"
                                        isSearchable
                                        className="text-sm"
                                        styles={selectStyles}
                                    />
                                    {(clientErrors.nationality || errors.nationality) && (
                                        <p className="mt-1.5 text-xs text-[#E53F01]">{clientErrors.nationality || errors.nationality}</p>
                                    )}
                                </div>
                            </>
                        )}
                        {/* Scout-specific fields */}
                        {selectedRole === 'scout' && (
                            <>
                                <div className="mb-4">
                                    <label
                                        htmlFor="nationality"
                                        className="mb-1.5 block text-xs font-semibold tracking-wider text-[#F5F5F5] uppercase"
                                    >
                                        Country
                                    </label>
                                    <Select
                                        options={options}
                                        value={options.find((o) => o.value === data.country)}
                                        onChange={(selected) => setData('country', selected?.value || '')}
                                        placeholder="Select your country"
                                        isSearchable
                                        className="text-sm"
                                        styles={selectStyles}
                                    />
                                    {(clientErrors.nationality || errors.nationality) && (
                                        <p className="mt-1.5 text-xs text-[#E53F01]">{clientErrors.country || errors.country}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="organization_name"
                                        className="mb-1.5 block text-xs font-semibold tracking-wider text-[#F5F5F5] uppercase"
                                    >
                                        Organization Name
                                    </label>
                                    <input
                                        id="organization_name"
                                        type="text"
                                        value={data.organization_name}
                                        onChange={(e) => setData('organization_name', e.target.value)}
                                        placeholder="e.g. FC Porto Scouting"
                                        className="h-11 w-full rounded-xl border border-[#2A2A2A] bg-[#111111] px-3.5 text-sm text-[#F5F5F5] transition placeholder:text-[#555555] focus:border-[#E53F01] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] focus:outline-none"
                                    />
                                    {(clientErrors.organization_name || errors.organization_name) && (
                                        <p className="mt-1.5 text-xs text-[#E53F01]">{clientErrors.organization_name || errors.organization_name}</p>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Agent / Club have no extra fields for now, only WhatsApp shown above */}

                        {/* Terms */}
                        <label className="group mt-5 mb-6 flex cursor-pointer items-start gap-3">
                            <span className="relative mt-0.5 flex-shrink-0">
                                <input
                                    type="checkbox"
                                    checked={data.terms}
                                    onChange={(e) => setData('terms', e.target.checked)}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-[#2A2A2A] bg-[#111111] transition checked:border-[#E53F01] checked:bg-[#E53F01] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] focus:outline-none"
                                />
                                <Check className="pointer-events-none absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-[#0D0D0D] opacity-0 peer-checked:opacity-100" />
                            </span>
                            <span className="text-xs leading-relaxed text-[#9A9A9A]">
                                I agree to the{' '}
                                <Link href="/terms" className="font-semibold text-[#E53F01] hover:underline">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="font-semibold text-[#E53F01] hover:underline">
                                    Privacy Policy
                                </Link>
                                .
                            </span>
                        </label>
                        <div>
                            {(clientErrors.terms || errors.terms) && (
                                <p className="mt-1.5 text-xs text-[#E53F01]">{clientErrors.terms || errors.terms}</p>
                            )}
                        </div>
                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="h-12 w-full cursor-pointer rounded-xl bg-[#E53F01] text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#E53F01] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Creating account…' : 'Create my account'}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-[#9A9A9A]">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-[#E53F01] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}
