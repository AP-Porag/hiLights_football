import { useState, FormEvent } from 'react';
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
    Sun,
    Moon,
    ArrowLeft,
    Check,
} from 'lucide-react';

// TODO: Replace with shared ThemeToggle component
function ThemeToggle() {
    const [isDark, setIsDark] = useState<boolean>(
        typeof document !== 'undefined' &&
        document.documentElement.classList.contains('dark')
    );

    const toggle = () => {
        const root = document.documentElement;
        if (root.classList.contains('dark')) {
            root.classList.remove('dark');
            setIsDark(false);
        } else {
            root.classList.add('dark');
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="absolute top-4 right-4 h-10 w-10 inline-flex items-center justify-center rounded-xl border border-[#E2E8F0] dark:border-[#2A2A2A] bg-white dark:bg-[#161616] text-[#0F172A] dark:text-[#F5F5F5] hover:border-[#FF6B00] dark:hover:border-[#FF6B00] transition-colors z-50"
        >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    );
}

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
        description:
            'Build your profile, upload highlights, and get discovered by scouts and clubs worldwide.',
        Icon: Zap,
    },
    {
        id: 'scout',
        title: 'Scout',
        description:
            'Access advanced player search, performance data, and recruitment tools to find talent.',
        Icon: Search,
    },
    {
        id: 'agent',
        title: 'Agent',
        description:
            'Manage your roster, track market value, and connect with clubs to negotiate transfers.',
        Icon: Briefcase,
    },
    {
        id: 'club',
        title: 'Club',
        description:
            'Scout players, run recruitment campaigns, and integrate with your existing scouting workflow.',
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
    nationality: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, {
        message: 'You must accept terms',
    }),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
});

export default function Register( { countries = [] }: Props) {
    const [step, setStep] = useState<0 | 1>(0);
    const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

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

    // Countries
     const options = countries.map((c) => ({
        value: c.code,
        label: `${c.name} ${c.code ?? ''}`,
    }));


    // TODO: Replace with usePage().props for any server-provided defaults / errors
  const { data, setData, post, processing, errors } = useForm({
        role: '' as RoleId | '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        dob: '',
        nationality: '',
        terms: false as boolean,
    });

    const handleSelectRole = (role: RoleId) => {
        setSelectedRole(role);
        setData('role', role);
        setStep(1);
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

    return (
        <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#0D0D0D] font-sans antialiased">
            <ThemeToggle />

            {/* TOP — Logo + heading */}
            <div className="py-10 text-center px-6">
                <Link href="/" className="inline-block">
                    <img
                        src="/images/logo/hilights_logo_transparent_200.png"
                        className="h-14 w-auto mx-auto dark:hidden"
                        alt="HiLights Football"
                    />
                    <img
                        src="/images/logo/hilights_logo_dark_200.png"
                        className="h-14 w-auto mx-auto hidden dark:block"
                        alt="HiLights Football"
                    />
                </Link>

                <h1 className="font-display font-black text-3xl sm:text-4xl text-[#0F172A] dark:text-[#F5F5F5] mt-6 tracking-tight">
                    Join HiLights Football
                </h1>
                <p className="text-[#475569] dark:text-[#9A9A9A] text-sm sm:text-base mt-2 max-w-md mx-auto">
                    Build your profile, get discovered, and unlock the world's
                    leading football talent network.
                </p>

                {/* Step dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    <span
                        className={
                            'h-2.5 rounded-full transition-all duration-300 ' +
                            (step === 0
                                ? 'w-8 bg-[#FF6B00]'
                                : 'w-2.5 bg-[#FF6B00]')
                        }
                    />
                    <span
                        className={
                            'h-2.5 rounded-full transition-all duration-300 ' +
                            (step === 1
                                ? 'w-8 bg-[#FF6B00]'
                                : 'w-2.5 bg-[#CBD5E1] dark:bg-[#2A2A2A]')
                        }
                    />
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] dark:text-[#555555] mt-3">
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
                                            ? 'border-[#FF6B00] bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.08)] shadow-[0_0_0_4px_rgba(255,107,0,0.15)]'
                                            : 'border-[#E2E8F0] dark:border-[#2A2A2A] bg-white dark:bg-[#161616] hover:border-[#FF6B00] hover:shadow-[0_0_0_4px_rgba(255,107,0,0.08)] hover:-translate-y-1')
                                    }
                                >
                                    <div className="mx-auto inline-flex items-center justify-center bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.15)] rounded-full p-3">
                                        <Icon
                                            className="h-[44px] w-[44px] text-[#FF6B00]"
                                            strokeWidth={2}
                                        />
                                    </div>
                                    <h3 className="font-bold text-lg text-[#0F172A] dark:text-[#F5F5F5] mt-4">
                                        {role.title}
                                    </h3>
                                    <p className="text-xs text-[#475569] dark:text-[#9A9A9A] mt-2 leading-relaxed">
                                        {role.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    <p className="text-center text-sm text-[#475569] dark:text-[#9A9A9A] mt-10">
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
                        className="bg-white dark:bg-[#161616] rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] p-8"
                    >
                        {/* Selected role badge */}
                        <div className="flex items-center justify-between gap-3 mb-6 pb-6 border-b border-[#E2E8F0] dark:border-[#2A2A2A]">
                            <div className="inline-flex items-center gap-2.5 bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] rounded-full pl-2.5 pr-3.5 py-1.5">
                                <selectedRoleObj.Icon className="h-4 w-4 text-[#CC5500] dark:text-[#FF6B00]" />
                                <span className="text-xs font-semibold text-[#CC5500] dark:text-[#FF6B00] uppercase tracking-wider">
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
                                className="block text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] uppercase tracking-wider mb-1.5"
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
                                className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] text-sm text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-orange-800 transition"

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
                                className="block text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] uppercase tracking-wider mb-1.5"
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
                                className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] text-sm text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-orange-800 transition"
                            />
                           {(clientErrors.name || errors.name) && (
    <p className="text-xs text-[#DC2626] mt-1.5">
        {clientErrors.name || errors.name}
    </p>
)}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] uppercase tracking-wider mb-1.5"
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
                                    className="w-full h-11 pl-3.5 pr-11 rounded-xl bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] text-sm text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-orange-800 transition"

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
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] dark:text-[#9A9A9A] hover:text-[#0F172A] dark:hover:text-[#F5F5F5]"
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
                                className="block text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] uppercase tracking-wider mb-1.5"
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
                                    className="w-full h-11 pl-3.5 pr-11 rounded-xl bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] text-sm text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-orange-800 transition"

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
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] dark:text-[#9A9A9A] hover:text-[#0F172A] dark:hover:text-[#F5F5F5]"
                                >
                                    {showConfirm ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {(clientErrors.password_confirmation || errors.password_confirmation) && (
    <p className="text-xs text-[#DC2626] mt-1.5">
        {clientErrors.password_confirmation || errors.password_confirmation}
    </p>
)}
                        </div>

                        {/* Player-specific fields */}
                        {selectedRole === 'player' && (
                            <>
                                <div className="mb-4">
                                    <label
                                        htmlFor="dob"
                                        className="block text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                                    >
                                        Date of Birth
                                        {age !== null && (
                                            <span className="ml-2 font-mono normal-case tracking-normal text-[#FF6B00]">
                                                · Age {age}
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        id="dob"
                                        type="date"
                                        value={data.dob}
                                        onChange={(e) =>
                                            setData('dob', e.target.value)
                                        }
                                        className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] text-sm text-[#0F172A] dark:text-[#F5F5F5] focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-orange-800 transition"


                                    />
                                    {(clientErrors.dob || errors.dob) && (
    <p className="text-xs text-[#DC2626] mt-1.5">
        {clientErrors.dob || errors.dob}
    </p>
)}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="nationality"
                                        className="block text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] uppercase tracking-wider mb-1.5"
                                    >
                                        Nationality
                                    </label>
                                     <Select
            options={options}
            value={options.find((o) => o.value === data.nationality)}
            onChange={(selected) =>
                setData('nationality', selected?.value)
            }
            placeholder="Select your country"
            isSearchable
            className="text-sm"
        />
                                     {(clientErrors.nationality || errors.nationality) && (
    <p className="text-xs text-[#DC2626] mt-1.5">
        {clientErrors.nationality || errors.nationality}
    </p>
)}
                                </div>
                            </>
                        )}

                        {/* Terms */}
                        <label className="flex items-start gap-3 mt-5 mb-6 cursor-pointer group">
                            <span className="relative flex-shrink-0 mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={data.terms}
                                    onChange={(e) =>
                                        setData('terms', e.target.checked ? true : false)
                                    }
                                    className="peer appearance-none h-5 w-5 rounded-md border-2 border-[#CBD5E1] dark:border-[#2A2A2A] bg-white dark:bg-[#111111] checked:bg-[#FF6B00] checked:border-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-orange-100 dark:focus:ring-1 dark:focus:ring-orange-800 transition cursor-pointer"

                                />
                                <Check className="h-3.5 w-3.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </span>
                            <span className="text-xs text-[#475569] dark:text-[#9A9A9A] leading-relaxed">
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
                            {processing
                                ? 'Creating account…'
                                : 'Create my account'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#475569] dark:text-[#9A9A9A] mt-4">
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
