import { useState, FormEvent, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Select from 'react-select';
import { z } from 'zod';
import {
    Zap,
    Search,
    Briefcase,
    Building2,
    Eye,
    EyeOff,
    ArrowLeft,
    Check,
    Calendar,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { FaWhatsapp } from 'react-icons/fa';

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
        description: 'Build your profile, upload highlights, and get discovered by scouts and clubs worldwide.',
        Icon: Zap,
    },
    {
        id: 'scout',
        title: 'Scout',
        description: 'Access advanced player search, performance data, and recruitment tools to find talent.',
        Icon: Search,
    },
    {
        id: 'agent',
        title: 'Agent',
        description: 'Manage your roster, track market value, and connect with clubs to negotiate transfers.',
        Icon: Briefcase,
    },
    {
        id: 'club',
        title: 'Club',
        description: 'Scout players, run recruitment campaigns, and integrate with your existing scouting workflow.',
        Icon: Building2,
    },
];

interface Country {
    code: string;
    name: string;
}

type Props = {
    countries: Country[];
};

const registerSchema = z.object({
    role: z.enum(['player', 'scout', 'agent', 'club']),
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string(),
    dob: z.string().optional(),
    nationality: z.array(z.string()).optional(),
    country: z.string().optional(),
    organization_name: z.string().optional(),
    whatsapp: z.string().min(8, "Whatsapp number is required"),  // added
    terms: z.boolean().refine((val) => val === true, {
        message: 'You must accept terms',
    }),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
});

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// ── Custom professional date-of-birth calendar ──────────────────────────
function DobCalendar({
    value,
    onSelect,
}: {
    value?: Date;
    onSelect: (d: Date) => void;
}) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date(1950, 0, 1);
    const [viewDate, setViewDate] = useState<Date>(
        value ?? new Date(2005, 0, 1)
    );
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
    const isSelected = (d: Date) =>
        value ? d.toDateString() === value.toDateString() : false;
    const isToday = (d: Date) => d.toDateString() === today.toDateString();
    const goPrev = () => setViewDate(new Date(year, month - 1, 1));
    const goNext = () => setViewDate(new Date(year, month + 1, 1));
    const nextMonthStart = new Date(year, month + 1, 1);
    const canGoNext = nextMonthStart <= today;
    const canGoPrev = new Date(year, month, 1) > minDate;
    return (
        <div className="w-[320px] p-4">
            {/* Header — month/year dropdowns + arrows */}
            <div className="flex items-center justify-between gap-2 mb-4">
                <button
                    type="button"
                    onClick={goPrev}
                    disabled={!canGoPrev}
                    className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#FF6B00] hover:bg-[rgba(255,107,0,0.12)] hover:text-[#FF6B00] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                    <select
                        value={month}
                        onChange={(e) =>
                            setViewDate(new Date(year, Number(e.target.value), 1))
                        }
                        className="h-8 rounded-lg border border-[#2A2A2A] bg-[#111111] px-2 text-[13px] font-medium text-[#F5F5F5] cursor-pointer focus:outline-none focus:border-[#FF6B00] hover:border-[#3A3A3A] transition-colors"
                    >
                        {MONTHS.map((m, i) => (
                            <option key={m} value={i} className="bg-[#1F1F1F]">
                                {m}
                            </option>
                        ))}
                    </select>
                    <select
                        value={year}
                        onChange={(e) =>
                            setViewDate(new Date(Number(e.target.value), month, 1))
                        }
                        className="h-8 rounded-lg border border-[#2A2A2A] bg-[#111111] px-2 text-[13px] font-medium text-[#F5F5F5] cursor-pointer focus:outline-none focus:border-[#FF6B00] hover:border-[#3A3A3A] transition-colors"
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
                    className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#FF6B00] hover:bg-[rgba(255,107,0,0.12)] hover:text-[#FF6B00] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
            {/* Weekday header */}
            <div className="grid grid-cols-7 mb-2">
                {WEEKDAYS.map((w) => (
                    <div
                        key={w}
                        className="h-8 flex items-center justify-center text-[11px] font-semibold uppercase text-[#9A9A9A]"
                    >
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
                                'h-9 w-9 mx-auto flex items-center justify-center rounded-lg text-[13px] font-medium transition-colors',
                                selected
                                    ? 'bg-[#FF6B00] text-[#0D0D0D] font-semibold'
                                    : disabled
                                        ? 'text-[#3A3A3A] pointer-events-none'
                                        : todayCell
                                            ? 'text-[#FF6B00] font-semibold hover:bg-[rgba(255,107,0,0.12)]'
                                            : 'text-[#F5F5F5] hover:bg-[rgba(255,107,0,0.12)] hover:text-[#FF6B00]',
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
        nationality: [] as string[],
        country: '',
        organization_name: '',
        whatsapp: '',   // added WhatsApp field
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
        console.log('SUBMIT CLICKED', data);
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
    const sortedCountries = [...countries].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

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
            backgroundColor: state.isSelected
                ? '#FF6B00'
                : state.isFocused
                    ? '#2A2A2A'
                    : '#1F1F1F',
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
            {/* TOP — Logo + heading */}
            <div className="py-10 text-center px-6">
                <Link href="/" className="inline-block">
                    <img
                        src="/images/logo/final_logo.png"
                        className="h-14 w-auto mx-auto"
                        alt="HiLights Football"
                    />
                </Link>
                <h1 className="font-display font-black text-3xl sm:text-4xl text-[#F5F5F5] mt-6 tracking-tight">
                    Join HiLights Football
                </h1>
                <p className="text-[#9A9A9A] text-sm sm:text-base mt-2 max-w-md mx-auto">
                    Build your profile, get discovered, and unlock the world's leading football talent network.
                </p>
                {/* Step dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    <span
                        className={
                            'h-2.5 rounded-full transition-all duration-300 ' +
                            (step === 0 ? 'w-8 bg-[#FF6B00]' : 'w-2.5 bg-[#FF6B00]')
                        }
                    />
                    <span
                        className={
                            'h-2.5 rounded-full transition-all duration-300 ' +
                            (step === 1 ? 'w-8 bg-[#FF6B00]' : 'w-2.5 bg-[#2A2A2A]')
                        }
                    />
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#555555] mt-3">
                    Step {step + 1} of 2 —{' '}
                    {step === 0 ? 'Choose your role' : 'Your details'}
                </p>
            </div>
            {clientErrors.role && (
                <p className="text-xs text-red-500 mt-2 text-center">
                    {clientErrors.role}
                </p>
            )}
            {/* STEP 1 — ROLE CARDS */}
            {step === 0 && (
                <div className="max-w-[860px] mx-auto px-6 pb-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                        {ROLES.map((role) => {
                            const isSelected = selectedRole === role.id;
                            const Icon = role.Icon;
                            return (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => handleSelectRole(role.id)}
                                    className={
                                        'group text-center cursor-pointer rounded-2xl border-2 p-7 transition-all duration-200 ' +
                                        (isSelected
                                            ? 'border-[#FF6B00] bg-[rgba(255,107,0,0.08)] shadow-[0_0_0_4px_rgba(255,107,0,0.15)]'
                                            : 'border-[#2A2A2A] bg-[#161616] hover:border-[#FF6B00] hover:shadow-[0_0_0_4px_rgba(255,107,0,0.08)] hover:-translate-y-1')
                                    }
                                >
                                    <div className="mx-auto inline-flex items-center justify-center bg-[rgba(255,107,0,0.15)] rounded-full p-3">
                                        <Icon
                                            className="h-[44px] w-[44px] text-[#FF6B00]"
                                            strokeWidth={2}
                                        />
                                    </div>
                                    <h3 className="font-bold text-lg text-[#F5F5F5] mt-4">
                                        {role.title}
                                    </h3>
                                    <p className="text-xs text-[#9A9A9A] mt-2 leading-relaxed">
                                        {role.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-center text-sm text-[#9A9A9A] mt-10">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="text-[#FF6B00] hover:underline font-semibold"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            )}
            {/* STEP 2 — FORM */}
            {step === 1 && selectedRoleObj && (
                <div className="max-w-[440px] mx-auto px-6 pb-16">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-[#161616] rounded-2xl border border-[#2A2A2A] p-8"
                    >
                        {/* Selected role badge */}
                        <div className="flex items-center justify-between gap-3 mb-6 pb-6 border-b border-[#2A2A2A]">
                            <div className="inline-flex items-center gap-2.5 bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] rounded-full pl-2.5 pr-3.5 py-1.5">
                                <selectedRoleObj.Icon className="h-4 w-4 text-[#FF6B00]" />
                                <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider">
                                    Registering as {selectedRoleObj.title}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep(0)}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF6B00] hover:underline"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Change
                            </button>
                        </div>
                        {/* Full Name */}
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="e.g. Lucas Martinez"
                                className="w-full h-11 px-3.5 rounded-xl bg-[#111111] border border-[#2A2A2A] text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition"
                            />
                            {(clientErrors.name || errors.name) && (
                                <p className="text-xs text-[#DC2626] mt-1.5">
                                    {clientErrors.name || errors.name}
                                </p>
                            )}
                        </div>
                        {/* Email */}
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
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="you@example.com"
                                className="w-full h-11 px-3.5 rounded-xl bg-[#111111] border border-[#2A2A2A] text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition"
                            />
                            {(clientErrors.email || errors.email) && (
                                <p className="text-xs text-[#DC2626] mt-1.5">
                                    {clientErrors.email || errors.email}
                                </p>
                            )}
                        </div>
                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="Minimum 8 characters"
                                    className="w-full h-11 pl-3.5 pr-11 rounded-xl bg-[#111111] border border-[#2A2A2A] text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#F5F5F5]"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {(clientErrors.password || errors.password) && (
                                <p className="text-xs text-[#DC2626] mt-1.5">
                                    {clientErrors.password || errors.password}
                                </p>
                            )}
                        </div>
                        {/* Confirm Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={showConfirm ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Re-enter your password"
                                    className="w-full h-11 pl-3.5 pr-11 rounded-xl bg-[#111111] border border-[#2A2A2A] text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirm(!showConfirm)
                                    }
                                    aria-label={
                                        showConfirm
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#F5F5F5]"
                                >
                                    {showConfirm ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {(clientErrors.password_confirmation ||
                                errors.password_confirmation) && (
                                    <p className="text-xs text-[#DC2626] mt-1.5">
                                        {clientErrors.password_confirmation ||
                                            errors.password_confirmation}
                                    </p>
                                )}
                        </div>

                        {/* ── WhatsApp Number (all roles) ── */}
                        <div className="mb-4">
                            <label
                                htmlFor="whatsapp"
                                className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                            >
                                WhatsApp Number
                            </label>
                            <input
                                id="whatsapp"
                                type="text"
                                value={data.whatsapp}
                                onChange={(e) =>
                                    setData('whatsapp', e.target.value)
                                }
                                placeholder="+8801700000000"
                                className="w-full h-11 px-3.5 rounded-xl bg-[#111111] border border-[#2A2A2A] text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition"
                            />
                            {(clientErrors.whatsapp || errors.whatsapp) && (
                                <p className="text-xs text-[#DC2626] mt-1.5">
                                    {clientErrors.whatsapp || errors.whatsapp}
                                </p>
                            )}
                        </div>

                        {/* Player-specific fields */}
                        {selectedRole === 'player' && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5">
                                        Date of Birth
                                        {age !== null && (
                                            <span className="ml-2 font-mono normal-case tracking-normal text-[#FF6B00]">
                                                · Age {age}
                                            </span>
                                        )}
                                    </label>
                                    <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className="w-full h-11 px-3.5 rounded-xl bg-[#111111] border border-[#2A2A2A] text-sm text-[#F5F5F5] hover:border-[#3A3A3A] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition flex items-center justify-between group"
                                            >
                                                <span className={data.dob ? 'text-[#F5F5F5]' : 'text-[#555555]'}>
                                                    {data.dob
                                                        ? format(new Date(data.dob), 'MMMM dd, yyyy')
                                                        : 'Select your date of birth'}
                                                </span>
                                                <Calendar className="h-4 w-4 text-[#FF6B00] group-hover:text-[#FF8533] transition" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0 bg-[#1F1F1F] border border-[#2A2A2A] shadow-2xl rounded-2xl"
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
                                        <p className="text-xs text-[#DC2626] mt-1.5">
                                            {clientErrors.dob || errors.dob}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="nationality"
                                        className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                                    >
                                        Nationality
                                    </label>
                                    <Select
                                        options={options}
                                        value={options.filter((o) => data.nationality.includes(o.value))}
                                        onChange={(selected) =>
                                            setData(
                                                'nationality',
                                                selected ? selected.map((o) => o.value) : []
                                            )
                                        }
                                        isMulti
                                        placeholder="Select one or more nationalities"
                                        isSearchable
                                        className="text-sm"
                                        styles={selectStyles}
                                    />
                                    {(clientErrors.nationality || errors.nationality) && (
                                        <p className="text-xs text-[#DC2626] mt-1.5">
                                            {clientErrors.nationality || errors.nationality}
                                        </p>
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
                                        className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                                    >
                                        Country
                                    </label>
                                    <Select
                                        options={options}
                                        value={options.find((o) => o.value === data.country)}
                                        onChange={(selected) =>
                                            setData('country', selected?.value || '')
                                        }
                                        placeholder="Select your country"
                                        isSearchable
                                        className="text-sm"
                                        styles={selectStyles}
                                    />
                                    {(clientErrors.nationality || errors.nationality) && (
                                        <p className="text-xs text-[#DC2626] mt-1.5">
                                            {clientErrors.country || errors.country}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="organization_name"
                                        className="block text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                                    >
                                        Organization Name
                                    </label>
                                    <input
                                        id="organization_name"
                                        type="text"
                                        value={data.organization_name}
                                        onChange={(e) =>
                                            setData('organization_name', e.target.value)
                                        }
                                        placeholder="e.g. FC Porto Scouting"
                                        className="w-full h-11 px-3.5 rounded-xl bg-[#111111] border border-[#2A2A2A] text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition"
                                    />
                                    {(clientErrors.organization_name || errors.organization_name) && (
                                        <p className="text-xs text-[#DC2626] mt-1.5">
                                            {clientErrors.organization_name || errors.organization_name}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Agent / Club have no extra fields for now, only WhatsApp shown above */}

                        {/* Terms */}
                        <label className="flex items-start gap-3 mt-5 mb-6 cursor-pointer group">
                            <span className="relative flex-shrink-0 mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={data.terms}
                                    onChange={(e) =>
                                        setData('terms', e.target.checked)
                                    }
                                    className="peer appearance-none h-5 w-5 rounded-md border-2 border-[#2A2A2A] bg-[#111111] checked:bg-[#FF6B00] checked:border-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-[rgba(255,107,0,0.15)] transition cursor-pointer"
                                />
                                <Check className="h-3.5 w-3.5 text-[#0D0D0D] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </span>
                            <span className="text-xs text-[#9A9A9A] leading-relaxed">
                                I agree to the{' '}
                                <Link
                                    href="/terms"
                                    className="text-[#FF6B00] hover:underline font-semibold"
                                >
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link
                                    href="/privacy"
                                    className="text-[#FF6B00] hover:underline font-semibold"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </span>
                        </label>
                        <div>
                            {(clientErrors.terms || errors.terms) && (
                                <p className="text-xs text-[#DC2626] mt-1.5">
                                    {clientErrors.terms || errors.terms}
                                </p>
                            )}
                        </div>
                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-12 cursor-pointer rounded-xl bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Creating account…' : 'Create my account'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-[#9A9A9A] mt-4">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="text-[#FF6B00] hover:underline font-semibold"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}
