// Full updated PlayerDashboard component with added completion checks
import PlayerNavbar from '@/components/player/PlayerNavbar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPositionName } from '@/utils/helper';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Upload } from "lucide-react";
import { useEffect } from 'react';
import ReactCountryFlag from "react-country-flag";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Select from 'react-select';
import {
    Share2,
    Download,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Smartphone,
    Circle,
    Crown,
    Eye,
    Flag,
    History,
    Lock,
    MapPin,
    Star,
    TrendingUp,
    User,
    Video,
    Shirt,
    Footprints,
    ShieldCheck,
    Ruler,
    Weight,
    Shield,
    UserPen,
    Image as ImageIcon,
    MapPinned,
    Trophy,
    ClipboardList,
    Plus,
    X,
    Facebook,
    Linkedin,
    Send,
    Mail,
    Copy,
    MessageCircle,
    ArrowUp,
    ArrowDown,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Save,
    Clock,
    Stethoscope,
    Trash2
} from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

// MOCK DATA (realistic) – subscription সরানো হয়েছে
const player = {
    name: 'Benjamin',
    totalViews: 1247,
    trend: 12,
    scoutInterest: 23,
    avgRating: 4.2,
};

const getCountryName = (code?: string | string[]) => {
    if (!code) return '';
    const codes = Array.isArray(code) ? code : [code];
    return codes
        .map((c) => {
            try {
                return new Intl.DisplayNames(['en'], { type: 'region' }).of(c) || c;
            } catch {
                return c;
            }
        })
        .join(', ');
};

// alpha-2 code theke flag emoji
const codeToFlag = (code?: string): string => {
    if (!code || code.length !== 2) return '';
    return String.fromCodePoint(
        ...code.toUpperCase().split('').map((c) => 0x1f1a5 + c.charCodeAt(0))
    );
};

// CSRF cookie theke token (logo file upload er jonno fetch-e lagbe)
const getCookie = (name: string): string => {
    const row = document.cookie.split('; ').find((r) => r.startsWith(name + '='));
    return row ? decodeURIComponent(row.split('=')[1]) : '';
};

function getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
}

function formatDate(): string {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

const nonEmpty = (v: any): boolean => {
    if (v === null || v === undefined) return false;
    if (Array.isArray(v)) return v.length > 0;
    return String(v).trim() !== '';
};

// ── Input sanitizers (Edit page er moto) — typing er somoy-i number chara baki sob baad ──
const onlyDigits = (v: string, max?: number): string => {
    const d = String(v ?? '').replace(/\D/g, '');
    return max ? d.slice(0, max) : d;
};
// European season: "2627" → "26/27" (auto slash)
const formatSeason = (v: string): string => {
    const d = onlyDigits(v, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};
// Score: shudhu "0-0" format (dui pashe max 2 digit, ekta dash)
const formatScore = (v: string): string => {
    const clean = String(v ?? '').replace(/[^\d-]/g, '');
    const [home = '', ...rest] = clean.split('-');
    const h = home.slice(0, 2);
    if (!clean.includes('-')) return h;
    return `${h}-${rest.join('').slice(0, 2)}`;
};
const isValidScore = (v: string): boolean => !v || /^\d{1,2}-\d{1,2}$/.test(v);

// ── Dark-theme styling for react-phone-number-input (modal input er sathe match) ──
function PhoneDarkStyles() {
    return (
        <style>{`
            .PhoneInput {
                display: flex;
                align-items: center;
                gap: 8px;
                height: 36px;
                background-color: #0D0D0D;
                border: 1px solid #2A2A2A;
                border-radius: 8px;
                padding: 0 8px;
                transition: border-color 0.15s;
            }
            .PhoneInput--focus {
                border-color: #E53F01;
            }
            .phone-error .PhoneInput {
                border-color: #ef4444;
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
                min-width: 0;
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

const MONTHS = [
    { v: '01', l: 'January' }, { v: '02', l: 'February' }, { v: '03', l: 'March' },
    { v: '04', l: 'April' }, { v: '05', l: 'May' }, { v: '06', l: 'June' },
    { v: '07', l: 'July' }, { v: '08', l: 'August' }, { v: '09', l: 'September' },
    { v: '10', l: 'October' }, { v: '11', l: 'November' }, { v: '12', l: 'December' },
];

// in_team_since — "YYYY-MM" (new) ba "MM-YYYY" (old data) duitai pore
const parseInTeamSince = (v?: string | null): { year: string; month: string } => {
    if (!v) return { year: '', month: '' };
    const parts = String(v).trim().split(/[-/]/);
    if (parts.length < 2) return { year: '', month: '' };
    const [a, b] = parts;
    if (a.length === 4) return { year: a, month: b.padStart(2, '0') }; // 2025-02
    if (b.length === 4) return { year: b, month: a.padStart(2, '0') }; // 02-2025
    return { year: '', month: '' };
};

// Member card er jonno: "Feb 2025"
const formatInTeamSince = (v?: string | null): string => {
    const p = parseInTeamSince(v);
    if (!p.year || !p.month) return 'Not specified';
    return new Date(Number(p.year), Number(p.month) - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Instant validation — month/year duitai lagbe, future hobe na
const validateInTeamSince = (year: string, month: string): string => {
    if (!year && !month) return '';
    if (!year || !month) return 'Please select both month and year.';
    const now = new Date();
    const selected = Number(year) * 12 + (Number(month) - 1);
    const current = now.getFullYear() * 12 + now.getMonth();
    if (selected > current) return 'In Team Since cannot be a future date.';
    return '';
};

const ALL_POSITIONS = ['GK', 'LB', 'CB-L', 'CB-R', 'RB', 'LM', 'CM-L', 'CM-R', 'RM', 'CAM', 'LW', 'ST', 'RW', 'CF'];

// Position code → full form name
const POSITION_FULL_NAMES: Record<string, string> = {
    'GK': 'Goalkeeper',
    'LB': 'Left Back',
    'CB-L': 'Centre Back (Left)',
    'CB-R': 'Centre Back (Right)',
    'RB': 'Right Back',
    'LM': 'Left Midfielder',
    'CM-L': 'Central Midfielder (Left)',
    'CM-R': 'Central Midfielder (Right)',
    'RM': 'Right Midfielder',
    'CAM': 'Central Attacking Midfielder',
    'LW': 'Left Winger',
    'ST': 'Striker',
    'RW': 'Right Winger',
    'CF': 'Centre Forward',
};
const PRIORITY_LABELS = ['Main Position', 'Secondary Position', 'Third Position'];

// ════════ DATE OF BIRTH (Register page er moto — 18 er niche-o allowed) ════════
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// "YYYY-MM-DD" ba ISO string ("2010-05-12T00:00:00Z") → local Date (timezone shift chara)
const parseYmd = (v?: string | null): Date | undefined => {
    if (!v) return undefined;
    const m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return undefined;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
};

// Exact age (birthday ashe nai hole 1 kom)
const calcAge = (v?: string | null): number | null => {
    const d = parseYmd(v);
    if (!d) return null;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return age >= 0 ? age : null;
};

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
    const canGoNext = new Date(year, month + 1, 1) <= today;
    const canGoPrev = new Date(year, month, 1) > minDate;
    return (
        <div className="w-[20rem] p-4">
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
                        className="h-8 cursor-pointer rounded-lg border border-[#2A2A2A] bg-[#111111] px-2 text-[0.8125rem] font-medium text-[#F5F5F5] focus:border-[#E53F01] focus:outline-none"
                    >
                        {MONTHS.map((m, i) => (
                            <option key={m.v} value={i} className="bg-[#1F1F1F]">{m.l}</option>
                        ))}
                    </select>
                    <select
                        value={year}
                        onChange={(e) => setViewDate(new Date(Number(e.target.value), month, 1))}
                        className="h-8 cursor-pointer rounded-lg border border-[#2A2A2A] bg-[#111111] px-2 text-[0.8125rem] font-medium text-[#F5F5F5] focus:border-[#E53F01] focus:outline-none"
                    >
                        {years.map((y) => (
                            <option key={y} value={y} className="bg-[#1F1F1F]">{y}</option>
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
            <div className="mb-2 grid grid-cols-7">
                {WEEKDAYS.map((w) => (
                    <div key={w} className="flex h-8 items-center justify-center text-[0.6875rem] font-semibold uppercase text-[#9A9A9A]">
                        {w}
                    </div>
                ))}
            </div>
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
                                'mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-[0.8125rem] font-medium transition-colors',
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

// ════════ LIST MODAL CONFIG (repeatable rows) ════════
type FieldDef = {
    name: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'file' | 'country',
    placeholder?: string;
    numeric?: boolean;                    // mobile-e number keyboard
    sanitize?: (v: string) => string;     // typing er somoy value filter
};
type ListConfig = {
    title: string;
    storageKey: string;
    primary: string;
    fields: FieldDef[];
    empty: Record<string, any>;
    firstFixed?: boolean;
    defaultRows?: Record<string, any>[];
};

const LIST_CONFIGS: Record<string, ListConfig> = {
    videos: {
        title: 'Videos',
        storageKey: 'videos',
        primary: 'url',
        firstFixed: true,
        defaultRows: [
            { label: '', url: '' },   // আগে ছিল { label: 'Highlight', url: '' }
            { label: '', url: '' },   // আগে ছিল { label: 'Goal', url: '' }
            { label: '', url: '' },   // আগে ছিল { label: 'Assist', url: '' }
            { label: '', url: '' },   // আগে ছিল { label: 'Dribble', url: '' }
        ],
        fields: [
            { name: 'label', label: 'Label', type: 'text', placeholder: 'Enter Your Label' },
            { name: 'url', label: 'Video URL (YouTube / Vimeo)', type: 'text', placeholder: 'Enter video URL' },
        ],
        empty: { label: '', url: '' },
    },
    club_history: {
        title: 'Club History',
        storageKey: 'club_history',
        primary: 'club',
        fields: [
            { name: 'year', label: 'Year', type: 'number' },
            { name: 'club', label: 'Club', type: 'text' },
            { name: 'country', label: 'Country', type: 'country' },
        ],
        empty: { year: '', club: '', country: '', year_type: 'european' }, // ← year_type default
    },
    transfer_history: {
        title: 'Transfer History',
        storageKey: 'transfer_history',
        primary: 'club',
        fields: [
            { name: 'year', label: 'Year', type: 'number' },
            { name: 'club', label: 'Club', type: 'text' },
            { name: 'country', label: 'Country', type: 'country' },
            { name: 'logo', label: 'Club Logo', type: 'file' },
        ],
        empty: { year: '', club: '', country: '', logo: '' },
    },
    achievements: {
        title: 'Achievements',
        storageKey: 'achievements',
        primary: 'title',
        fields: [
            { name: 'year', label: 'Year', type: 'text', placeholder: 'YYYY', numeric: true, sanitize: (v) => onlyDigits(v, 4) },
            { name: 'title', label: 'Title', type: 'text' },
        ],
        empty: { year: '', title: '' },
    },
    competitions: {
        title: 'Competition History',
        storageKey: 'competitions',
        primary: 'name',
        fields: [
            { name: 'name', label: 'Competition', type: 'text' },
            { name: 'year', label: 'Year', type: 'text', placeholder: 'YYYY', numeric: true, sanitize: (v) => onlyDigits(v, 4) },
            { name: 'country', label: 'Country', type: 'country' },
        ],
        empty: { name: '', year: '', country: '' },
    },
    matches: {
        title: 'Recent Matches',
        storageKey: 'matches',
        primary: 'home',
        fields: [
            { name: 'date', label: 'Date', type: 'date' },
            { name: 'home', label: 'Home', type: 'text' },
            { name: 'score', label: 'Score', type: 'text', placeholder: '0-0', sanitize: formatScore },
            { name: 'away', label: 'Away', type: 'text' },
            { name: 'goals', label: 'Goals', type: 'text', placeholder: '0', numeric: true, sanitize: (v) => onlyDigits(v, 2) },
            { name: 'assists', label: 'Assists', type: 'text', placeholder: '0', numeric: true, sanitize: (v) => onlyDigits(v, 2) },
            { name: 'minutes', label: 'Minutes', type: 'text', placeholder: '90', numeric: true, sanitize: (v) => onlyDigits(v, 3) },
        ],
        empty: { date: '', home: '', score: '', away: '', goals: '', assists: '', minutes: '' },
    },
};

// ════════ FORM MODAL CONFIG (single record) ════════
type FormFieldType = 'text' | 'number' | 'date' | 'select' | 'country' | 'positions' | 'multi_country' | 'file' | 'textarea' | 'month_year' | 'phone';
type FormField = { name: string; label: string; type: FormFieldType; options?: string[] };
type FormConfig = { title: string; fields: FormField[] };

const FORM_CONFIGS: Record<string, FormConfig> = {
    basic_info: {
        title: 'Basic Information',
        fields: [
            { name: 'full_name', label: 'Full Name', type: 'text' },
            { name: 'dob', label: 'Date of Birth', type: 'date' },
            { name: 'guardian_name', label: 'Parent / Guardian Name', type: 'text' }, // ← shudhu 18 er niche hole dekhabe
            { name: 'gender', label: 'Gender', type: 'select', options: ['M', 'F'] },
            { name: 'nationality', label: 'Nationality', type: 'multi_country' }, // ← multi-select nationality
            { name: 'height', label: 'Height (cm)', type: 'number' },
            { name: 'birth_city', label: 'Birth City', type: 'text' },
            { name: 'birth_country', label: 'Birth Country', type: 'country' },
            { name: 'current_club', label: 'Current Club', type: 'text' },
            { name: 'current_club_country', label: 'Club Country', type: 'country' },
            { name: 'in_team_since', label: 'In Team Since (MM/YYYY)', type: 'month_year' },
            // { name: 'agent', label: 'Agent', type: 'text' },
            { name: 'whatsapp', label: 'WhatsApp Number', type: 'phone' }, // ← Register er moto flag + country code
            { name: 'description', label: 'About / Bio', type: 'textarea' },
        ],
    },
    photo: {
        title: 'Football Identity Photo',
        fields: [{ name: 'photo', label: '', type: 'file' }],
    },
    position_modality: {
        title: 'Position & Modality',
        fields: [
            { name: 'modality', label: 'Modality', type: 'select', options: ['Football', 'Futsal', 'Beach Soccer'] },
            { name: 'positions', label: 'Positions (up to 3)', type: 'positions' },
            { name: 'foot', label: 'Dominant Foot', type: 'select', options: ['Right', 'Left', 'Ambidextrous'] },
        ],
    },
};

// Ei modality gulo ekhono chalu hoyni — select korle "Coming soon" modal dekhabe
const COMING_SOON_MODALITIES = ['Futsal', 'Beach Soccer'];

// Recent Matches-er stat field gulo
const MATCH_STAT_KEYS = ['goals', 'saves'];
const MATCH_STAT_LABELS: Record<string, string> = { goals: 'Goals', saves: 'Saves' };

const inputClass =
    'h-9 w-full rounded-lg border border-[#2A2A2A] bg-[#0D0D0D] px-2 text-sm text-[#F5F5F5] focus:border-[#E53F01] focus:outline-none';

// Register page-er moto searchable country dropdown
const countrySelectStyles = (height: string) => ({
    control: (base: any) => ({
        ...base, backgroundColor: '#111111', borderColor: '#2A2A2A', color: '#F5F5F5',
        minHeight: height, height, borderRadius: '0.5rem', boxShadow: 'none',
    }),
    valueContainer: (base: any) => ({ ...base, padding: '0 0.5rem' }),
    indicatorsContainer: (base: any) => ({ ...base, height }),
    menu: (base: any) => ({ ...base, backgroundColor: '#1F1F1F', borderColor: '#2A2A2A', borderRadius: '0.75rem', marginTop: '0.5rem' }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected ? '#E53F01' : state.isFocused ? '#2A2A2A' : '#1F1F1F',
        color: state.isSelected ? '#0D0D0D' : '#F5F5F5',
        fontWeight: state.isSelected ? 600 : 400,
        padding: '0.625rem 0.75rem',
    }),
    input: (base: any) => ({ ...base, color: '#F5F5F5', margin: 0 }),
    singleValue: (base: any) => ({ ...base, color: '#F5F5F5' }),
    placeholder: (base: any) => ({ ...base, color: '#555555' }),
});

// Modal-er bhitore dropdown kete jay, tai menu body-te portal kore dekhai
const MENU_PORTAL = typeof document !== 'undefined' ? document.body : undefined;

// ── Generic list modal (repeatable rows) ──
function ListModal({
    configKey,
    initialRows,
    onClose,
    countries,
    maxVideos = 1,
    statFields = ['goals'],
}: {
    configKey: string;
    initialRows: any[];
    onClose: () => void;
    countries?: any[];
    maxVideos?: number;
    statFields?: string[];
}) {
    const cfg = LIST_CONFIGS[configKey];
    const countryOptions = (countries ?? []).map((c: any) => ({ value: c.code, label: c.name }));

    // Recent Matches-e kon stat field dekhabe — statFields decide kore (['goals'] / ['saves'] / ['saves','goals'])
    const isMatches = configKey === 'matches';
    const fields: FieldDef[] = isMatches
        ? cfg.fields.flatMap((f) =>
            f.name === 'goals' ? statFields.map((n) => ({ ...f, name: n, label: MATCH_STAT_LABELS[n] ?? n })) : [f],
        )
        : cfg.fields;
    const rowEmpty: Record<string, any> = isMatches
        ? (() => {
            const { goals, ...rest } = cfg.empty as any;
            return { ...rest, ...Object.fromEntries(statFields.map((n) => [n, ''])) };
        })()
        : cfg.empty;

    // Je stat field ta ei player-er jonno dekhano hoy na, ta row theke baad — JSON porishkar thake
    const normalizeRow = (r: any) => {
        const merged: Record<string, any> = { ...rowEmpty, ...r };
        if (isMatches) {
            MATCH_STAT_KEYS.forEach((k) => {
                if (!statFields.includes(k)) delete merged[k];
            });
        }
        return merged;
    };

    const [rows, setRows] = useState<any[]>(() => {
        if (configKey === 'videos') {
            const existing = initialRows.length
                ? initialRows.map(normalizeRow)
                : [];
            const total = maxVideos;
            const result = [...existing].slice(0, total);
            while (result.length < total) {
                result.push({ ...rowEmpty });
            }
            return result;
        }
        if (initialRows.length) return initialRows.map(normalizeRow);
        if (cfg.defaultRows) return cfg.defaultRows.map(normalizeRow);
        return [{ ...rowEmpty }];
    });
    const [saving, setSaving] = useState(false);
    const [uploadingKey, setUploadingKey] = useState<string | null>(null);
    const [yearErrors, setYearErrors] = useState<{ [key: number]: string }>({});

    // Bhul format thakle save hobe na (Edit page er moto)
    const hasYearError = Object.values(yearErrors).some(Boolean);
    const hasInvalidScore = configKey === 'matches' && rows.some((r) => !isValidScore(String(r.score ?? '')));

    const update = (i: number, name: string, val: string) => {
        setRows((prev) => {
            const copy = [...prev];
            copy[i] = { ...copy[i], [name]: val };
            return copy;
        });
    };

    const validateYearFormat = (idx: number, value: string, format: 'european' | 'brazilian') => {
        if (!value) {
            setYearErrors((prev) => ({ ...prev, [idx]: '' }));
            return;
        }

        if (format === 'european') {
            const regex = /^\d{2}\/\d{2}$/;
            if (!regex.test(value)) {
                setYearErrors((prev) => ({ ...prev, [idx]: 'Format must be: 26/27' }));
            } else {
                setYearErrors((prev) => ({ ...prev, [idx]: '' }));
            }
        } else {
            const regex = /^\d{4}$/;
            if (!regex.test(value)) {
                setYearErrors((prev) => ({ ...prev, [idx]: 'Format must be: 2026' }));
            } else {
                setYearErrors((prev) => ({ ...prev, [idx]: '' }));
            }
        }
    };

    const uploadFile = async (i: number, name: string, file: File) => {
        const key = `${i}-${name}`;
        setUploadingKey(key);
        try {
            const fd = new FormData();
            fd.append('logo', file);
            const res = await fetch('/player/profile/upload-logo', {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                body: fd,
            });
            const data = await res.json();
            if (data?.url) update(i, name, data.url);
            else alert('Logo upload failed. Please try again.');
        } catch (e) {
            console.error('Logo upload failed', e);
            alert('Logo upload failed. Please try again.');
        } finally {
            setUploadingKey(null);
        }
    };

    const addRow = () => setRows([...rows, { ...rowEmpty }]);
    const removeRow = (i: number) => {
        if (configKey === 'videos') return;
        if (cfg.firstFixed && i === 0) return;
        setRows(rows.filter((_, idx) => idx !== i));
    };

    const save = () => {
        if (hasYearError || hasInvalidScore) return;
        const cleaned = rows.filter((r) => nonEmpty(r[cfg.primary]));
        setSaving(true);
        router.post(
            '/player/profile/lists',
            { [cfg.storageKey]: cleaned },
            {
                preserveScroll: true,
                onSuccess: () => onClose(),
                onFinish: () => setSaving(false),
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
            <div
                className={`w-full ${configKey === 'club_history' ? 'max-w-2xl' : configKey === 'competitions' ? 'max-w-xl' : 'max-w-lg'} max-h-[85vh] overflow-y-auto rounded-2xl border border-[#2A2A2A] bg-[#161616] p-4 sm:p-6`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#F5F5F5]">{cfg.title}</h3>
                    <button type="button" onClick={onClose} className="text-[#94A3B8] hover:text-[#F5F5F5]" aria-label="Close">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-3">
                    {configKey === 'club_history' ? (
                        // Custom club history layout — mobile/tablet: stacked card, md+: single-row grid
                        rows.map((row, i) => {
                            const yearType = row.year_type || 'european';
                            const yearError = yearErrors[i] || '';
                            return (
                                <div
                                    key={i}
                                    className="mb-3 rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] p-3 md:rounded-none md:border-0 md:bg-transparent md:p-0"
                                >
                                    {/* Mobile/tablet row label */}
                                    <span className="mb-2 block text-[0.625rem] font-semibold uppercase tracking-wider text-[#94A3B8] md:hidden">
                                        Club #{i + 1}
                                    </span>

                                    <div className="grid grid-cols-2 gap-2 md:grid-cols-[6.875rem_5rem_minmax(0,1fr)_8.125rem_2.5rem] md:items-start md:gap-3">
                                        {/* Year Format Dropdown */}
                                        <select
                                            value={yearType}
                                            onChange={(e) => {
                                                update(i, 'year_type', e.target.value);
                                                // Format bodlale age lekha year ta onno format-e invalid — tai clear kore dao
                                                update(i, 'year', '');
                                                setYearErrors((prev) => ({ ...prev, [i]: '' }));
                                            }}
                                            className="h-10 w-full min-w-0 rounded-lg border border-[#2A2A2A] bg-[#111111] px-2 text-xs text-[#F5F5F5] focus:border-[#E53F01] focus:outline-none font-sans"
                                        >
                                            <option value="european">European (26/27)</option>
                                            <option value="brazilian">Brazilian (2026)</option>
                                        </select>

                                        {/* Year Input */}
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={row.year ?? ''}
                                            onChange={(e) => {
                                                // European: auto "26/27" | Brazilian: shudhu 4 digit
                                                const v = yearType === 'brazilian'
                                                    ? onlyDigits(e.target.value, 4)
                                                    : formatSeason(e.target.value);
                                                update(i, 'year', v);
                                                validateYearFormat(i, v, yearType);
                                            }}
                                            placeholder={yearType === 'brazilian' ? '2026' : '26/27'}
                                            className="h-10 w-full min-w-0 bg-[#111111] border border-[#2A2A2A] rounded-lg px-2 text-sm text-[#F5F5F5] font-mono focus:border-[#E53F01] focus:outline-none"
                                        />

                                        {/* Club Name — mobile-e full width */}
                                        <input
                                            value={row.club}
                                            onChange={(e) => update(i, 'club', e.target.value)}
                                            placeholder="Club"
                                            className="col-span-2 h-10 w-full min-w-0 bg-[#111111] border border-[#2A2A2A] rounded-lg px-2 text-sm text-[#F5F5F5] focus:border-[#E53F01] focus:outline-none md:col-span-1"
                                        />

                                        {/* Country + Button — mobile-e ek line, md+ e grid cell (contents) */}
                                        <div className="col-span-2 flex items-center gap-2 md:contents">
                                            <div className="min-w-0 flex-1 md:w-full">
                                                <Select
                                                    options={countryOptions}
                                                    value={countryOptions.find((o) => o.value === row.country) ?? null}
                                                    onChange={(opt: any) => update(i, 'country', opt?.value ?? '')}
                                                    placeholder="Country..."
                                                    isSearchable
                                                    isClearable
                                                    className="text-sm"
                                                    styles={countrySelectStyles('2.5rem')}
                                                    menuPortalTarget={MENU_PORTAL}
                                                />
                                            </div>

                                            {/* Add / Remove Button */}
                                            {i === 0 ? (
                                                <button
                                                    type="button"
                                                    onClick={addRow}
                                                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#E53F01] hover:border-[#E53F01] hover:bg-[rgba(255,107,0,0.12)]"
                                                    aria-label="Add row"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => removeRow(i)}
                                                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#94A3B8] hover:border-[#E53F01] hover:text-[#E53F01]"
                                                    aria-label="Delete row"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4 text-[#E53F01]" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Year format error message */}
                                    {yearError && (
                                        <p className="mt-1 text-xs text-red-400 md:ml-[13.375rem]">
                                            ⚠️ {yearError}
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        // Generic layout for other lists
                        rows.map((row, i) => (
                            <div key={i} className="flex flex-wrap items-end gap-2 rounded-xl border border-[#2A2A2A] bg-[#111111] p-3">
                                {fields.map((f) => (
                                    <div key={f.name} className={f.type === 'date' ? 'basis-full min-w-0' : 'flex-1 min-w-[5.625rem]'}>
                                        <label className="mb-1 block text-[0.625rem] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                            {f.label}
                                        </label>
                                        {f.type === 'file' ? (
                                            <div className="flex items-center gap-2">
                                                {nonEmpty(row[f.name]) && (
                                                    <img
                                                        src={row[f.name]}
                                                        alt="logo"
                                                        className="h-9 w-9 flex-shrink-0 rounded-md border border-[#2A2A2A] object-cover"
                                                    />
                                                )}
                                                <label className="flex h-9 flex-1 cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#2A2A2A] bg-[#0D0D0D] px-2 text-xs text-[#94A3B8] hover:border-[#E53F01] hover:text-[#E53F01]">
                                                    {uploadingKey === `${i}-${f.name}`
                                                        ? 'Uploading...'
                                                        : nonEmpty(row[f.name])
                                                            ? 'Change'
                                                            : 'Upload'}
                                                    <input
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/webp"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) uploadFile(i, f.name, file);
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        ) : f.type === 'country' ? (
                                            <div className="flex items-center gap-2 w-full">
                                                <div className="min-w-0 flex-1">
                                                    <Select
                                                        options={countryOptions}
                                                        value={countryOptions.find((o) => o.value === row[f.name]) ?? null}
                                                        onChange={(opt: any) => update(i, f.name, opt?.value ?? '')}
                                                        placeholder="Country..."
                                                        isSearchable
                                                        isClearable
                                                        className="text-sm"
                                                        styles={countrySelectStyles('2.25rem')}
                                                        menuPortalTarget={MENU_PORTAL}
                                                    />
                                                </div>

                                                {row[f.name] && (
                                                    <span className="text-xl leading-none whitespace-nowrap">
                                                        {codeToFlag(row[f.name])}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <input
                                                type={f.type}
                                                inputMode={f.numeric ? 'numeric' : undefined}
                                                placeholder={f.placeholder}
                                                value={row[f.name] ?? ''}
                                                onChange={(e) => update(i, f.name, f.sanitize ? f.sanitize(e.target.value) : e.target.value)}
                                                className={
                                                    configKey === 'matches' && f.name === 'score' && !isValidScore(String(row[f.name] ?? ''))
                                                        ? inputClass.replace('border-[#2A2A2A]', 'border-red-500')
                                                        : inputClass
                                                }
                                            />
                                        )}
                                    </div>
                                ))}
                                {configKey === 'videos' ? (
                                    <div className="h-9 w-9 flex-shrink-0" />
                                ) : cfg.firstFixed && i === 0 ? (
                                    <div className="h-9 w-9 flex-shrink-0" />
                                ) : i === 0 ? (
                                    <button
                                        type="button"
                                        onClick={addRow}
                                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[#2A2A2A] text-[#E53F01] hover:border-[#E53F01] hover:bg-[rgba(255,107,0,0.12)]"
                                        aria-label="Add row"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => removeRow(i)}
                                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[#2A2A2A] text-[#94A3B8] hover:border-[#E53F01] hover:text-[#E53F01]"
                                        aria-label="Delete row"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4 text-[#E53F01]" />
                                    </button>
                                )}

                                {/* Score format error (Recent Matches) */}
                                {configKey === 'matches' && !isValidScore(String(row.score ?? '')) && (
                                    <p className="basis-full text-xs text-red-400">⚠️ Score format must be: 0-0</p>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {configKey !== 'videos' && (
                    <button
                        type="button"
                        onClick={addRow}
                        className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#E53F01] hover:text-[#E53F01]"
                    >
                        <Plus className="h-4 w-4" /> Add row
                    </button>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={onClose} className="text-[#9A9A9A] hover:bg-[#1F1F1F] hover:text-[#F5F5F5]">
                        Cancel
                    </Button>
                    <Button type="button" onClick={save} disabled={saving || hasYearError || hasInvalidScore} className="bg-[#E53F01] text-white hover:bg-[#E53F01] disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ── Generic form modal (single record) ──
// ── Generic form modal (single record) ──
function FormModal({
    configKey,
    user,
    pp,
    onClose,
    countries,
}: {
    configKey: string;
    user: any;
    pp: any;
    onClose: () => void;
    countries: { code: string; name: string; flag?: string }[];
}) {
    const cfg = FORM_CONFIGS[configKey];
    const countryOptions = (countries ?? []).map((c: any) => ({ value: c.code, label: c.name }));
    const [values, setValues] = useState<Record<string, any>>(() => {
        const init: Record<string, any> = {};
        cfg.fields.forEach((f) => {
            if (f.name === 'full_name') init[f.name] = user?.name ?? '';
            else if (f.name === 'whatsapp') init[f.name] = String(user?.whatsapp ?? '').replace(/[^\d+]/g, ''); // PhoneInput E.164 chay
            else if (f.name === 'dob') init[f.name] = user?.dob ? String(user.dob).slice(0, 10) : ''; // ISO hole "YYYY-MM-DD" e kete nao
            else if (f.name === 'guardian_name') init[f.name] = pp?.guardian_name ?? user?.guardian_name ?? '';
            else if (f.name === 'nationality') {
                // ✅ Robust nationality parsing: array / JSON string / comma-separated
                const nat = user?.nationality;
                if (Array.isArray(nat)) {
                    init[f.name] = nat;
                } else if (typeof nat === 'string' && nat.trim() !== '') {
                    try {
                        const parsed = JSON.parse(nat);
                        init[f.name] = Array.isArray(parsed) ? parsed : [];
                    } catch {
                        init[f.name] = nat.split(',').map((s: string) => s.trim()).filter(Boolean);
                    }
                } else {
                    init[f.name] = [];
                }
            }
            else if (f.name === 'in_team_since') {
                // Old "MM-YYYY" ba new "YYYY-MM" → always "YYYY-MM"
                const p = parseInTeamSince(pp?.in_team_since);
                init[f.name] = p.year && p.month ? `${p.year}-${p.month}` : '';
            }
            else if (f.name === 'positions') init[f.name] = Array.isArray(pp?.positions) ? pp.positions : [];
            else if (f.name === 'photo') init[f.name] = null;
            else init[f.name] = pp?.[f.name] ?? '';
        });
        return init;
    });
    const [preview, setPreview] = useState<string>(pp?.photo_url ?? '');
    const [photoError, setPhotoError] = useState<string>('');
    const [saving, setSaving] = useState(false);
    const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
    const [openDob, setOpenDob] = useState(false);
    const [comingSoon, setComingSoon] = useState<string | null>(null); // Futsal / Beach Soccer
    const setField = (name: string, val: any) => setValues((prev) => ({ ...prev, [name]: val }));

    // ── In Team Since (Month + Year) ──
    const itsInit = parseInTeamSince(pp?.in_team_since);
    const [itsMonth, setItsMonth] = useState<string>(itsInit.month);
    const [itsYear, setItsYear] = useState<string>(itsInit.year);
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => String(currentYear - i));
    const hasMonthYear = cfg.fields.some((f) => f.type === 'month_year');
    const itsError = hasMonthYear ? validateInTeamSince(itsYear, itsMonth) : '';

    // ── Minor check (backend-er withValidator er sathe mil rekhe) ──
    const dobAge = calcAge(values.dob);
    const isMinor = dobAge !== null && dobAge < 18;

    // ── WhatsApp number valid kina (selected country onujayi) ──
    const whatsappInvalid =
        cfg.fields.some((f) => f.name === 'whatsapp') &&
        nonEmpty(values.whatsapp) &&
        !isValidPhoneNumber(values.whatsapp);

    const setInTeamSince = (year: string, month: string) => {
        setItsYear(year);
        setItsMonth(month);
        setField('in_team_since', year && month ? `${year}-${month}` : '');
        setServerErrors((prev) => ({ ...prev, in_team_since: '' }));
    };

    // Error hole border lal
    const fieldClass = (hasError: boolean) =>
        hasError ? inputClass.replace('border-[#2A2A2A]', 'border-red-500') : inputClass;

    const togglePos = (id: string) => {
        const cur: string[] = values.positions || [];
        if (cur.includes(id)) setField('positions', cur.filter((p) => p !== id));
        else if (cur.length < 3) setField('positions', [...cur, id]);
    };

    // Selected positions reorder koro (dir: -1 = Main-er dike, +1 = Third-er dike)
    const movePosition = (idx: number, dir: number) => {
        const cur: string[] = values.positions || [];
        const target = idx + dir;
        if (target < 0 || target >= cur.length) return;
        const copy = [...cur];
        [copy[idx], copy[target]] = [copy[target], copy[idx]];
        setField('positions', copy);
    };

    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // type check
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
            setPhotoError('Only JPG, PNG or WEBP images are allowed.');
            e.target.value = '';
            return;
        }

        // size check — 5MB
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
            setPhotoError(`Image is ${sizeMb}MB — maximum allowed size is 5MB. Please choose a smaller image.`);
            e.target.value = '';
            return;
        }

        // valid
        setPhotoError('');
        setField('photo', file);
        const r = new FileReader();
        r.onload = (ev) => setPreview(ev.target?.result as string);
        r.readAsDataURL(file);
    };
    const fileInputRef = useRef<HTMLInputElement>(null);
    const save = () => {
        // In Team Since bhul thakle save hobe na
        if (itsError) return;

        // 18 er niche hole guardian name lagbe (backend-o eta check kore)
        if (cfg.fields.some((f) => f.name === 'guardian_name') && isMinor && !nonEmpty(values.guardian_name)) {
            setServerErrors({ guardian_name: 'Guardian name is required for players under 18.' });
            return;
        }

        // WhatsApp number bhul thakle save hobe na
        if (whatsappInvalid) return;

        const payload: Record<string, any> = { ...values };
        if (!payload.photo) delete payload.photo;

        // ✅ Basic Info modal-এ user table-এর ফিল্ড আছে, তাই আলাদা endpoint
        const endpoint = configKey === 'basic_info'
            ? '/player/profile'   // User + player_profile উভয় handle করে (nationality array allowed)
            : '/player/profile/fields';  // শুধু player_profile ফিল্ড

        const hasFile = Object.values(payload).some((v) => v instanceof File);

        setSaving(true);
        setServerErrors({});
        router.post(endpoint, payload, {
            ...(hasFile ? { forceFormData: true } : {}),
            preserveScroll: true,
            onSuccess: () => onClose(),
            onError: (errs) => setServerErrors(errs as Record<string, string>),
            onFinish: () => setSaving(false),
        });
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
            <div
                className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-[#2A2A2A] bg-[#161616] p-4 sm:p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <PhoneDarkStyles />
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#F5F5F5]">{cfg.title}</h3>
                    <button type="button" onClick={onClose} className="text-[#94A3B8] hover:text-[#F5F5F5]" aria-label="Close">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cfg.fields.map((f) => {
                        // Guardian field shudhu minor-der jonno
                        if (f.name === 'guardian_name' && !isMinor) return null;
                        const fieldError = f.type === 'month_year'
                            ? (itsError || serverErrors[f.name])
                            : f.type === 'phone'
                                ? (whatsappInvalid ? 'Enter a valid WhatsApp number for the selected country' : serverErrors[f.name])
                                : serverErrors[f.name];
                        return (
                            <div key={f.name} className={f.type === 'positions' || f.type === 'file' || f.type === 'textarea' || f.type === 'multi_country' ? 'sm:col-span-2' : ''}>
                                <label className="mb-1.5 block text-[0.6875rem] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                    {f.label}
                                    {f.type === 'date' && calcAge(values[f.name]) !== null && (
                                        <span className="ml-2 font-mono normal-case tracking-normal text-[#E53F01]">· Age {calcAge(values[f.name])}</span>
                                    )}
                                </label>
                                {f.type === 'text' && (
                                    <input
                                        type="text"
                                        value={values[f.name] ?? ''}
                                        onChange={(e) => {
                                            setField(f.name, e.target.value);
                                            if (serverErrors[f.name]) setServerErrors((prev) => ({ ...prev, [f.name]: '' }));
                                        }}
                                        className={fieldClass(!!fieldError)}
                                    />
                                )}
                                {f.name === 'guardian_name' && !fieldError && (
                                    <p className="mt-1 text-xs text-[#9A9A9A]">Required because the player is under 18.</p>
                                )}
                                {f.type === 'phone' && (
                                    <div className={fieldError ? 'phone-error' : ''}>
                                        <PhoneInput
                                            international
                                            defaultCountry="BD"
                                            limitMaxLength
                                            value={values[f.name] || undefined}
                                            onChange={(v) => {
                                                setField(f.name, v || '');
                                                if (serverErrors[f.name]) setServerErrors((prev) => ({ ...prev, [f.name]: '' }));
                                            }}
                                            placeholder="Enter WhatsApp number"
                                        />
                                    </div>
                                )}
                                {f.type === 'textarea' && (
                                    <textarea value={values[f.name] ?? ''} onChange={(e) => setField(f.name, e.target.value)} rows={4} className="w-full rounded-lg border border-[#2A2A2A] bg-[#0D0D0D] px-2 py-2 text-sm text-[#F5F5F5] focus:border-[#E53F01] focus:outline-none resize-none" />
                                )}
                                {f.type === 'number' && (
                                    <input type="number" value={values[f.name] ?? ''} onChange={(e) => setField(f.name, e.target.value)} className={inputClass} />
                                )}
                                {f.type === 'date' && (
                                    <Popover open={openDob} onOpenChange={setOpenDob}>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className={`${fieldClass(!!fieldError)} flex items-center justify-between text-left`}
                                            >
                                                <span className={values[f.name] ? 'text-[#F5F5F5]' : 'text-[#555555]'}>
                                                    {parseYmd(values[f.name])
                                                        ? format(parseYmd(values[f.name])!, 'MMMM dd, yyyy')
                                                        : 'Select date of birth'}
                                                </span>
                                                <Calendar className="h-4 w-4 shrink-0 text-[#E53F01]" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto rounded-2xl border border-[#2A2A2A] bg-[#1F1F1F] p-0 shadow-2xl"
                                            align="start"
                                        >
                                            <DobCalendar
                                                value={parseYmd(values[f.name])}
                                                onSelect={(date) => {
                                                    setField(f.name, format(date, 'yyyy-MM-dd'));
                                                    setServerErrors((prev) => ({ ...prev, [f.name]: '' }));
                                                    setOpenDob(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                                {f.type === 'month_year' && (
                                    <div className="flex gap-2">
                                        <div className="min-w-0 flex-1">
                                            <select
                                                value={itsMonth}
                                                onChange={(e) => setInTeamSince(itsYear, e.target.value)}
                                                className={fieldClass(!!fieldError)}
                                            >
                                                <option value="">Month</option>
                                                {MONTHS.map((m) => (
                                                    <option key={m.v} value={m.v}>{m.l}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-28 shrink-0">
                                            <select
                                                value={itsYear}
                                                onChange={(e) => setInTeamSince(e.target.value, itsMonth)}
                                                className={`${fieldClass(!!fieldError)} font-mono`}
                                            >
                                                <option value="">Year</option>
                                                {yearOptions.map((y) => (
                                                    <option key={y} value={y}>{y}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                                {f.type === 'select' && (
                                    <select
                                        value={values[f.name] ?? ''}
                                        onChange={(e) => {
                                            const v = e.target.value;
                                            // Futsal / Beach Soccer ekhono chalu hoyni — modal dekhao, value bodlio na
                                            if (f.name === 'modality' && COMING_SOON_MODALITIES.includes(v)) {
                                                setComingSoon(v);
                                                return;
                                            }
                                            setField(f.name, v);
                                        }}
                                        className={inputClass}
                                    >
                                        <option value="">Select...</option>
                                        {f.options!.map((o) => (
                                            <option key={o} value={o}>{o}</option>
                                        ))}
                                    </select>
                                )}
                                {f.type === 'country' && (
                                    <div className="flex items-center gap-2">
                                        <div className="min-w-0 flex-1">
                                            <Select
                                                options={countryOptions}
                                                value={countryOptions.find((o) => o.value === values[f.name]) ?? null}
                                                onChange={(opt: any) => setField(f.name, opt?.value ?? '')}
                                                placeholder="Select country..."
                                                isSearchable
                                                isClearable
                                                className="text-sm"
                                                styles={countrySelectStyles('2.25rem')}
                                                menuPortalTarget={MENU_PORTAL}
                                            />
                                        </div>
                                        {nonEmpty(values[f.name]) && (
                                            <span className="shrink-0 text-2xl leading-none">{codeToFlag(values[f.name])}</span>
                                        )}
                                    </div>
                                )}
                                {f.type === 'multi_country' && (
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap gap-2">
                                            {Array.isArray(values[f.name]) && values[f.name].map((code: string) => (
                                                <span key={code} className="inline-flex items-center gap-1 rounded-full bg-[#1F1F1F] border border-[#2A2A2A] px-2 py-1 text-xs text-[#F5F5F5]">
                                                    {codeToFlag(code)} {getCountryName(code)}
                                                    <button
                                                        type="button"
                                                        onClick={() => setField(f.name, values[f.name].filter((c: string) => c !== code))}
                                                        className="ml-1 text-[#9A9A9A] hover:text-[#E53F01]"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <Select
                                            options={countryOptions.filter((o) => !(values[f.name] || []).includes(o.value))}
                                            value={null}
                                            onChange={(opt: any) => {
                                                const code = opt?.value;
                                                if (code && !values[f.name].includes(code)) {
                                                    setField(f.name, [...(values[f.name] || []), code]);
                                                }
                                            }}
                                            placeholder="Add country..."
                                            isSearchable
                                            className="text-sm"
                                            styles={countrySelectStyles('2.25rem')}
                                            menuPortalTarget={MENU_PORTAL}
                                        />
                                    </div>
                                )}

                                {f.type === 'positions' && (
                                    <div>
                                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                            {ALL_POSITIONS.map((id) => {
                                                const on = (values.positions || []).includes(id);
                                                return (
                                                    <button
                                                        key={id}
                                                        type="button"
                                                        onClick={() => togglePos(id)}
                                                        className={`flex flex-col items-start rounded-lg border px-2.5 py-2 text-left ${on ? 'border-[#E53F01] bg-[rgba(255,107,0,0.12)] text-[#E53F01]' : 'border-[#2A2A2A] bg-[#111111] text-[#9A9A9A]'}`}
                                                    >
                                                        <span className="text-xs font-bold">{id}</span>
                                                        <span className="text-[0.625rem] leading-tight opacity-80">{POSITION_FULL_NAMES[id]}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Selected positions — priority order (Main / Secondary / Third) */}
                                        {(values.positions || []).length > 1 && (
                                            <div className="mt-3 space-y-2">
                                                <span className="text-[0.625rem] uppercase tracking-widest text-[#94A3B8] font-semibold">
                                                    Reorder to set priority
                                                </span>
                                                {(values.positions || []).map((id: string, idx: number) => (
                                                    <div key={id} className="flex flex-wrap items-center gap-2 rounded-lg border border-[#E53F01] bg-[rgba(255,107,0,0.08)] px-3 py-2 sm:flex-nowrap sm:gap-3">
                                                        <span className="flex-shrink-0 rounded-md bg-[#E53F01] px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-white">
                                                            {PRIORITY_LABELS[idx] ?? `#${idx + 1}`}
                                                        </span>
                                                        <span className="min-w-0 flex-1 text-sm font-semibold text-[#F5F5F5]">
                                                            {POSITION_FULL_NAMES[id]}
                                                            <span className="ml-2 text-xs text-[#94A3B8] font-mono">({id})</span>
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => movePosition(idx, -1)}
                                                                disabled={idx === 0}
                                                                className="h-7 w-7 flex items-center justify-center rounded-md border border-[#2A2A2A] text-[#94A3B8] hover:border-[#E53F01] hover:text-[#E53F01] disabled:opacity-30 disabled:cursor-not-allowed"
                                                                aria-label="Move up"
                                                            >
                                                                <ArrowUp className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => movePosition(idx, 1)}
                                                                disabled={idx === (values.positions || []).length - 1}
                                                                className="h-7 w-7 flex items-center justify-center rounded-md border border-[#2A2A2A] text-[#94A3B8] hover:border-[#E53F01] hover:text-[#E53F01] disabled:opacity-30 disabled:cursor-not-allowed"
                                                                aria-label="Move down"
                                                            >
                                                                <ArrowDown className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {f.type === 'file' && (
                                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#E53F01] bg-[#111111]">
                                            <img
                                                src={preview || "/images/img/placeholder.webp"}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={onFile}
                                            className="hidden"
                                        />
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#E53F01] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#E53F01]"
                                            >
                                                <Upload className="h-4 w-4" />
                                                {preview ? "Change Photo" : "Upload Photo"}
                                            </button>
                                            <p className="mt-2 text-xs text-[#9A9A9A]">
                                                Recommended size: <span className="text-white">200 × 300 px</span>
                                                <br />
                                                JPG, PNG or WEBP
                                            </p>
                                            {photoError && (
                                                <p className="mt-2 text-xs text-[#E53F01]">{photoError}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {fieldError && (
                                    <p className="mt-1 text-xs text-red-400">{fieldError}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
                {/* Je error-er kono field modal-e nei, segulo ekhane dekhao (silent fail bondho) */}
                {Object.entries(serverErrors).some(([k, v]) => v && !cfg.fields.some((f) => f.name === k)) && (
                    <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2">
                        {Object.entries(serverErrors)
                            .filter(([k, v]) => v && !cfg.fields.some((f) => f.name === k))
                            .map(([k, v]) => (
                                <p key={k} className="text-xs text-red-400">{v}</p>
                            ))}
                    </div>
                )}
                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={onClose} className="text-[#9A9A9A] hover:bg-[#1F1F1F] hover:text-[#F5F5F5]">
                        Cancel
                    </Button>
                    <Button type="button" onClick={save} disabled={saving || !!itsError || whatsappInvalid} className="bg-[#E53F01] text-white hover:bg-[#E53F01] disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>

            {/* COMING SOON — Futsal / Beach Soccer */}
            {comingSoon && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
                    onClick={(e) => {
                        e.stopPropagation();
                        setComingSoon(null);
                    }}
                >
                    <div
                        className="w-full max-w-sm rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 text-center sm:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,107,0,0.12)]">
                            <Clock className="h-7 w-7 text-[#E53F01]" />
                        </div>
                        <h3 className="mt-5 text-lg font-bold text-[#F5F5F5]">Coming soon</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#9A9A9A]">
                            {comingSoon} is not available yet. We are working on it — for now you can continue with Football.
                        </p>
                        <Button
                            type="button"
                            onClick={() => setComingSoon(null)}
                            className="mt-6 h-10 w-full bg-[#E53F01] text-sm font-semibold text-white hover:bg-[#E53F01]"
                        >
                            Got it
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

const BOOT_BRANDS = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Umbro', 'Mizuno', 'Other'];

export default function PlayerDashboard() {
    const { auth } = usePage().props as any;
    const { flash } = usePage().props as any;
    const {
        recentViews = [],
        subscription,
        viewsTrend = 0,
        viewsThisWeek = 0,
        viewsDaily = [],
        countries = [],
        countryAnalytics = []
    } = usePage().props as any;
    const countryData = countryAnalytics ?? [];

    const sparklineData: number[] = (viewsDaily ?? []).map((v: any) => Number(v) || 0);
    const totalViews = countryData.reduce(
        (sum: number, item: any) => sum + Number(item.views),
        0
    );
    const hasCountryData = countryData.length > 0;
    const pp = auth?.user?.player_profile ?? {};
    const greeting = getGreeting();
    const hasSubscription = !!subscription?.current_plan;
    const dateStr = formatDate();
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [healthOpen, setHealthOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    // About You + Player Questionnaire — saved straight to player_profile
    const [aboutData, setAboutData] = useState({
        // description: pp?.description ?? '',
        supported_club: pp?.supported_club ?? '',
        dream_club: pp?.dream_club ?? '',
        boot_brands: Array.isArray(pp?.boot_brands) ? pp.boot_brands : [],
        boot_brand_other: pp?.boot_brand_other ?? '',
    });
    const [aboutSaving, setAboutSaving] = useState(false);
    const [aboutSaved, setAboutSaved] = useState(false);
    const [aboutErrors, setAboutErrors] = useState<Record<string, string>>({});

    const setAboutField = (key: string, value: any) => {
        setAboutData((prev) => ({ ...prev, [key]: value }));
        setAboutSaved(false);
    };

    const toggleBootBrand = (brand: string) => {
        setAboutData((prev) => ({
            ...prev,
            boot_brands: prev.boot_brands.includes(brand)
                ? prev.boot_brands.filter((b: string) => b !== brand)
                : [...prev.boot_brands, brand],
        }));
        setAboutSaved(false);
    };

    const saveAbout = () => {
        setAboutSaving(true);
        setAboutErrors({});
        // 'Other' unchecked hole free-text ta o clear kore pathai, na hole purono value DB te theke jay
        const payload = {
            ...aboutData,
            boot_brand_other: aboutData.boot_brands.includes('Other') ? aboutData.boot_brand_other : '',
        };
        router.post('/player/profile/fields', payload, {
            preserveScroll: true,
            onSuccess: () => setAboutSaved(true),
            onError: (errs) => setAboutErrors(errs as Record<string, string>),
            onFinish: () => setAboutSaving(false),
        });
    };

    const descCount = (aboutData.description ?? '').length;
    // Country analytics time range (URL param diye backend-e jabe)
    const [countryRange, setCountryRange] = useState<'7d' | '30d' | '90d' | 'all'>('all');

    const changeCountryRange = (range: '7d' | '30d' | '90d' | 'all') => {
        setCountryRange(range);
        router.get(
            window.location.pathname,
            { country_range: range },
            {
                only: ['countryAnalytics'],   // shudhu ei prop ta refetch — page reload na
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    };

    const RANGE_OPTIONS: { key: '7d' | '30d' | '90d' | 'all'; label: string }[] = [
        { key: '7d', label: '7D' },
        { key: '30d', label: '30D' },
        { key: '90d', label: '90D' },
        { key: 'all', label: 'All' },
    ];
    const profileUrl = `${window.location.origin}/player/profile/${auth?.user?.slug}`;
    const [copied, setCopied] = useState(false);

    const copyProfileLink = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            setTimeout(() => { setCopied(false); }, 2500);
        } catch (error) {
            console.error('Failed to copy:', error);
            try {
                const textarea = document.createElement('textarea');
                textarea.value = profileUrl;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
            } catch (fallbackError) {
                console.error('Fallback copy failed:', fallbackError);
                alert('Failed to copy the link. Please copy it manually.');
            }
        }
    };

    const videoDone =
        nonEmpty(pp.video_url) ||
        (Array.isArray(pp.videos) && pp.videos.some((v: any) => nonEmpty(v?.url)));

    // ✅ Transfer history আলাদা check বাদ দেওয়া হয়েছে, এবং club history-র সাথে যুক্ত হয়েছে
    const clubHistoryDone =
        (Array.isArray(pp.club_history) && pp.club_history.some((r: any) => nonEmpty(r?.club))) ||
        (Array.isArray(pp.transfer_history) && pp.transfer_history.some((r: any) => nonEmpty(r?.club)));

    // Main position GK kina — public Detail/Performance page-er same niyom
    const playerPositions: string[] = Array.isArray(pp.positions) ? pp.positions : [];
    const isGoalkeeper = playerPositions.length > 0 && String(playerPositions[0]).trim().toUpperCase() === 'GK';
    const isGoalkeeperOnly = isGoalkeeper && playerPositions.length === 1;

    // Shudhu GK → Saves | GK er sathe onno position → Saves + Goals | GK na → Goals
    const matchStatFields: string[] = isGoalkeeperOnly ? ['saves'] : isGoalkeeper ? ['saves', 'goals'] : ['goals'];

    // Profile health — ekhane label + check ek jaygay, tai modal ar % kokhono alada hobe na
    const healthItems: { group: string; label: string; done: boolean; modal: string }[] = [
        { group: 'Basic information', label: 'Full name', done: nonEmpty(auth?.user?.name), modal: 'basic_info' },
        { group: 'Basic information', label: 'Date of birth', done: nonEmpty(auth?.user?.dob), modal: 'basic_info' },
        { group: 'Basic information', label: 'Nationality', done: nonEmpty(auth?.user?.nationality), modal: 'basic_info' },
        { group: 'Basic information', label: 'Gender', done: nonEmpty(pp.gender), modal: 'basic_info' },
        { group: 'Basic information', label: 'Height', done: nonEmpty(pp.height), modal: 'basic_info' },
        { group: 'Basic information', label: 'Birth city', done: nonEmpty(pp.birth_city), modal: 'basic_info' },
        { group: 'Basic information', label: 'Birth country', done: nonEmpty(pp.birth_country), modal: 'basic_info' },
        { group: 'Basic information', label: 'Current club', done: nonEmpty(pp.current_club), modal: 'basic_info' },
        { group: 'Basic information', label: 'Club country', done: nonEmpty(pp.current_club_country), modal: 'basic_info' },
        { group: 'Basic information', label: 'In team since', done: nonEmpty(pp.in_team_since), modal: 'basic_info' },
        // { group: 'Basic information', label: 'Agent', done: nonEmpty(pp.agent), modal: 'basic_info' },
        { group: 'Basic information', label: 'WhatsApp number', done: nonEmpty(auth?.user?.whatsapp), modal: 'basic_info' },
        { group: 'Basic information', label: 'About / bio', done: nonEmpty(pp.description), modal: 'basic_info' },
        { group: 'Position & modality', label: 'Modality', done: nonEmpty(pp.modality), modal: 'position_modality' },
        { group: 'Position & modality', label: 'Positions', done: Array.isArray(pp.positions) && pp.positions.length > 0, modal: 'position_modality' },
        { group: 'Position & modality', label: 'Dominant foot', done: nonEmpty(pp.foot), modal: 'position_modality' },
        { group: 'Media', label: 'Football identity photo', done: nonEmpty(pp.photo_path), modal: 'photo' },
        { group: 'Media', label: 'Highlight video', done: videoDone, modal: 'videos' },
        { group: 'Career', label: 'Club history', done: clubHistoryDone, modal: 'club_history' },
        { group: 'Career', label: 'Achievements', done: Array.isArray(pp.achievements) && pp.achievements.some((r: any) => nonEmpty(r?.title)), modal: 'achievements' },
        { group: 'Career', label: 'Competition history', done: Array.isArray(pp.competitions) && pp.competitions.some((r: any) => nonEmpty(r?.name)), modal: 'competitions' },
        { group: 'Career', label: 'Recent matches', done: Array.isArray(pp.matches) && pp.matches.some((r: any) => nonEmpty(r?.home)), modal: 'matches' },
        {
            group: 'Career',
            label: `${matchStatFields.map((n) => MATCH_STAT_LABELS[n]).join(' / ')} recorded in matches`,
            done: Array.isArray(pp.matches) && pp.matches.some((r: any) => matchStatFields.some((n) => nonEmpty(r?.[n]))),
            modal: 'matches',
        },
    ];

    const completionChecks: boolean[] = healthItems.map((h) => h.done);

    const profileComplete = Math.round(
        (completionChecks.filter(Boolean).length / completionChecks.length) * 100
    );

    const checklist: {
        label: string;
        done: boolean;
        href?: string;
        modal?: string;
        cta: string;
        icon?: typeof Video;
        alwaysShow?: boolean;
    }[] = [
            {
                label: 'Basic information added',
                done: nonEmpty(auth?.user?.name) && nonEmpty(auth?.user?.dob) && nonEmpty(auth?.user?.nationality)
                    && nonEmpty(pp.gender) && nonEmpty(pp.height)
                    && nonEmpty(pp.birth_city) && nonEmpty(pp.birth_country)
                    && nonEmpty(pp.current_club) && nonEmpty(pp.current_club_country)
                    && nonEmpty(pp.in_team_since) && nonEmpty(auth?.user?.whatsapp)
                    && nonEmpty(pp.description),
                modal: 'basic_info',
                cta: 'Edit',
                icon: UserPen,
                alwaysShow: true,
            },
            {
                label: 'Football identity photo uploaded',
                done: nonEmpty(pp.photo_path),
                modal: 'photo',
                cta: 'Edit',
                icon: ImageIcon,
                alwaysShow: true,
            },
            {
                label: 'Position and modality set',
                done: Array.isArray(pp.positions) && pp.positions.length > 0 && nonEmpty(pp.modality),
                modal: 'position_modality',
                cta: 'Edit',
                icon: MapPinned,
                alwaysShow: true,
            },
            {
                label: 'Add highlight videos',
                done: videoDone,
                modal: 'videos',
                cta: 'Edit',
                icon: Video,
                alwaysShow: true,
            },
            {
                label: 'Add club history',
                done: clubHistoryDone, // ✅ club history + transfer history একত্রে
                modal: 'club_history',
                cta: 'Edit',
                icon: History,
                alwaysShow: true,
            },
            {
                label: 'Add achievements',
                done: Array.isArray(pp.achievements) && pp.achievements.some((r: any) => nonEmpty(r?.title)),
                modal: 'achievements',
                cta: 'Edit',
                icon: Trophy,
                alwaysShow: true,
            },
            {
                label: 'Add competition history',
                done: Array.isArray(pp.competitions) && pp.competitions.some((r: any) => nonEmpty(r?.name)),
                modal: 'competitions',
                cta: 'Edit',
                icon: ClipboardList,
                alwaysShow: true,
            },
            {
                label: 'Add recent matches',
                done: Array.isArray(pp.matches) && pp.matches.some((r: any) => nonEmpty(r?.home)),
                modal: 'matches',
                cta: 'Edit',
                icon: ClipboardList,
                alwaysShow: true,
            },
            // {
            //     label: 'Upgrade to Premium',
            //     done: hasSubscription,
            //     href: '/player/subscription',
            //     cta: 'Upgrade →',
            //     icon: Crown,
            // },
        ];

    const circumference = 276.46;
    const dashOffset = circumference - (profileComplete / 100) * circumference;
    const sparkMax = Math.max(...sparklineData, 1);
    const sparkMin = Math.min(...sparklineData, 0);
    const sparkRange = sparkMax - sparkMin || 1;
    const sparkPoints =
        sparklineData.length <= 1
            ? "0,50 100,50"
            : sparklineData
                .map((v, i) => {
                    const x = (i / (sparklineData.length - 1)) * 100;
                    const y =
                        100 - ((v - sparkMin) / sparkRange) * 80 - 10;
                    return `${x},${y}`;
                })
                .join(" ");

    // ── MEMBER CARD PLAYER INFO (existing + basic_info fields) ──
    const playerInfo = [
        {
            icon: <Shirt className="w-4 h-4 text-gray-300" />,
            label: 'POSITION',
            value: getPositionName(auth?.user?.player_profile?.positions),
        },
        {
            icon: <Footprints className="w-4 h-4 text-gray-300" />,
            label: 'PREFERRED FOOT',
            value: pp?.foot ? pp.foot : 'Not specified',
        },
        {
            icon: <Ruler className="w-4 h-4 text-gray-300" />,
            label: 'HEIGHT',
            value: pp?.height ? `${pp.height} cm` : 'Not specified',
        },
        {
            icon: <Shield className="w-4 h-4 text-gray-300" />,
            label: 'CLUB',
            value: pp?.current_club ? (
                <span className="inline-flex items-center gap-1.5">
                    {pp.current_club_country && (
                        <ReactCountryFlag
                            countryCode={pp.current_club_country}
                            svg
                            style={{ width: '1.2em', height: '1.2em' }}
                        />
                    )}
                    <span>{pp.current_club}</span>
                </span>
            ) : (
                'Not specified'
            ),
        },
        {
            icon: <CalendarDays className="w-4 h-4 text-gray-300" />,
            label: 'MEMBER SINCE',
            value: formatInTeamSince(pp?.in_team_since),
        },
    ];

    const shareProfile = async () => {
        const shareData = {
            title: `${auth?.user?.name || 'Player'} — HiLights Football`,
            text: `Check out ${auth?.user?.name || 'this player'}'s Football Identity on HiLights Football`,
            url: profileUrl,
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }
            }
        }
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(profileUrl);
                alert('Football Identity link copied!');
                return;
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const textarea = document.createElement('textarea');
            textarea.value = profileUrl;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Football Identity link copied!');
        } catch {
            prompt('Copy this football identity link:', profileUrl);
        }
    };

    const cardRef = useRef<HTMLDivElement>(null);
    const downloadCard = async () => {
        if (!cardRef.current) return;
        try {
            const currentWidth = cardRef.current.offsetWidth;
            const targetWidth = 1054;
            const ratio = targetWidth / currentWidth;

            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                pixelRatio: ratio,
            });
            const link = document.createElement('a');
            link.download = `${auth?.user?.name ?? 'member'}-card.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Card download failed:', err);
            alert('Could not download card. Please try again.');
        }
    };

    useEffect(() => {
        if (flash?.scrollTo) {
            const el = document.getElementById(flash.scrollTo);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-16 lg:pt-18 2xl:pt-24">
            <PlayerNavbar />
            {/* PAGE HEADER */}
            <header className="border-b border-[#2A2A2A] bg-[#0D0D0D] px-4 py-5 sm:px-8 lg:px-10 lg:py-7 2xl:px-14 2xl:py-9">
                <div className="mx-auto max-w-[81.25rem] 2xl:max-w-[100rem]">
                    <h1 className="font-display text-2xl font-bold text-[#F5F5F5] sm:text-3xl lg:text-4xl 2xl:text-5xl">
                        {greeting}, {auth?.user?.name}
                    </h1>
                    <p className="mt-1 text-sm text-[#9A9A9A] lg:text-base 2xl:text-lg">{dateStr}</p>
                </div>
            </header>
            <main className="mx-auto max-w-[81.25rem] space-y-6 px-4 py-6 sm:px-8 sm:py-8 lg:space-y-8 lg:px-10 lg:py-10 2xl:max-w-[100rem] 2xl:space-y-10 2xl:px-14 2xl:py-12">
                {/* WIDGETS ROW */}
                <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_28.125rem] lg:gap-6 2xl:grid-cols-[1fr_31.25rem] 2xl:gap-8">
                    {/* [1] Profile Complete */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 lg:p-7 2xl:p-9">
                            <div className="relative h-[7rem] w-[7rem]">
                                <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
                                    <circle cx="56" cy="56" r="44" fill="none" strokeWidth="10" className="stroke-[#2A2A2A]" />
                                    <circle cx="56" cy="56" r="44" fill="none" stroke="#E53F01" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-display text-3xl font-black text-[#F5F5F5]">{profileComplete}%</span>
                                </div>
                            </div>
                            <p className="mt-3 text-xs tracking-wider text-[#94A3B8] uppercase">Fooball Identity Complete</p>
                            <p className="mt-2 text-[0.625rem] font-medium text-[#E53F01]">
                                {profileComplete < 100 ? `${100 - profileComplete}% left to complete your football identity` : 'Your football identity is complete'}
                            </p>
                        </div>
                        {/* [2] Profile Views */}
                        {/* <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 lg:p-7 2xl:p-9">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-mono text-3xl font-black text-[#F5F5F5]"> {totalViews}</p>
                                    <p className="mt-1 text-sm text-[#9A9A9A]">Fooball Identity Views</p>
                                </div>
                                <Eye className="h-5 w-5 text-[#E53F01]" />
                            </div>
                            <div className="mt-2 flex items-center gap-1">
                                <TrendingUp
                                    className={`h-3 w-3 ${viewsTrend < 0 ? 'rotate-180 text-[#E53F01]' : 'text-green-400'}`}
                                />
                                <span
                                    className={`text-xs font-medium ${viewsTrend < 0 ? 'text-[#E53F01]' : viewsTrend > 0 ? 'text-green-400' : 'text-[#9A9A9A]'}`}
                                >
                                    {viewsTrend > 0 ? '+' : ''}{viewsTrend}% this week
                                </span>
                            </div>
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-2 h-12 w-full">
                                <polyline points={sparkPoints} fill="none" stroke="#E53F01" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            </svg>
                        </div> */}
                        {/* [4] Subscription */}
                        {/* <div className="flex flex-col rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 lg:p-7 2xl:p-9 ">
                            {!hasSubscription ? (
                                <>
                                    <Badge className="w-fit border border-[#E53F01] bg-[rgba(255,107,0,0.12)] text-[0.625rem] font-bold tracking-wider text-[#E53F01] hover:bg-[rgba(255,107,0,0.12)]">FREE PLAN</Badge>
                                    <p className="mt-3 flex-1 text-sm text-[#9A9A9A]">Unlock all features and reach more scouts.</p>
                                    <Link href="/player/subscription" className="mt-3">
                                        <Button className="w-full bg-[#E53F01] p-3 font-semibold text-white hover:bg-[#E53F01]">
                                            <Crown className="mr-1.5 h-3.5 w-3.5" />
                                            <span className="text-[0.75rem]">Upgrade to <br className="block" /> Premium</span>
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Badge className="w-fit border border-green-600 bg-green-950/30 text-[0.625rem] font-bold tracking-wider text-green-400 hover:bg-green-950/30">PREMIUM ACTIVE</Badge>
                                    <p className="mt-3 flex-1 text-sm text-[#9A9A9A]">All features unlocked.</p>
                                </>
                            )}
                        </div> */}
                    </div>
                    {/* right side */}
                    {/* <div className="mx-auto w-full max-w-[26.25rem] mb-20 lg:mb-16">
                        <div ref={cardRef} className="w-full border border-gray-600 rounded-[1rem] bg-black">
                            <div className="overflow-hidden text-white">
                                <div className="flex items-center justify-between">
                                    <div className="pl-3 sm:pl-4">
                                        <img src="/images/logo/final_logo.png" alt="new-logo" className="w-[7.8125rem] sm:w-[10.625rem]" />
                                    </div>
                                    <div className="-translate-x-[15%] sm:-translate-x-[30%] translate-y-[20%]">
                                        <h2 className="text-center font-bold uppercase text-[0.6875rem] sm:text-[0.875rem]">MEMBER CARD</h2>
                                        <p className="text-center text-[0.5rem] sm:text-[0.625rem] font-semibold text-[#E53F01] uppercase">Official Member</p>
                                        <svg width="130" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="10" y1="12" x2="70" y2="12" stroke="#6B7280" strokeWidth="1" />
                                            <path d="M90 4L92.35 9.15L98 9.8L94 13.6L95.2 19L90 16L84.8 19L86 13.6L82 9.8L87.65 9.15L90 4Z" fill="#F97316" />
                                            <line x1="110" y1="12" x2="170" y2="12" stroke="#6B7280" strokeWidth="1" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative flex gap-2 sm:gap-4 pl-4 pt-2 border-b-1 border-gray-400">
                                    <div className="h-[10rem] w-[5.9375rem] sm:h-[13.125rem] sm:w-[8.125rem] mb-3">
                                        <img src={auth?.user?.player_profile?.photo_url || '/images/img/placeholder.webp'} alt="player" className="h-full w-full rounded-[0.625rem] sm:rounded-[0.75rem] border-1 border-gray-400" />
                                    </div>
                                    <div>
                                        <div className="relative z-10">
                                            <h3 className="mt-2 text-[0.75rem] sm:mt-4 sm:text-[1rem] font-bold uppercase">{auth?.user?.name}</h3>
                                            <div className="absolute mt-2 h-[0.0625rem] bg-[#E53F01] w-[80%] sm:w-[110%]"></div>
                                        </div>
                                        <div className="mt-6 space-y-1">
                                            <div className="flex items-center">
                                                <User className="mr-[0.3125rem] sm:mr-[0.625rem] w-4 h-4 sm:w-5 sm:h-5 text-[#E53F01]" />
                                                <p className="z-10 text-[0.5rem] md:text-[0.625rem] text-[#c7c7c7] uppercase">ID:<br /><span className="text-white">{auth?.user?.player_profile?.player_id}</span></p>
                                            </div>
                                            <div className="flex items-center">
                                                <CalendarDays className="mr-[0.3125rem] sm:mr-[0.625rem] w-4 h-4 sm:w-5 sm:h-5 text-[#E53F01]" />
                                                <p className="z-10 text-[0.5rem] md:text-[0.625rem] text-[#c7c7c7] uppercase">DATE OF BIRTH:<br /><span className="text-white">{auth?.user?.dob && new Date(auth?.user?.dob).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                                            </div>

                                            <div className="flex items-center">
                                                <Flag className="mr-[0.3125rem] sm:mr-[0.625rem] w-4 h-4 sm:w-5 sm:h-5 text-[#E53F01]" />
                                                <p className="z-10 text-[0.5rem] md:text-[0.625rem] text-[#c7c7c7] uppercase">NATIONALITY:<br />
                                                    <span className="text-white inline-flex flex-wrap items-center gap-1">
                                                        {Array.isArray(auth?.user?.nationality) && auth?.user?.nationality.length > 0
                                                            ? auth.user.nationality.map((code: string, idx: number) => (
                                                                <span key={code} className="inline-flex items-center gap-1">
                                                                    <ReactCountryFlag countryCode={code} svg style={{ width: '1em', height: '1em' }} />
                                                                    <span>{getCountryName(code)}</span>
                                                                    {idx < auth.user.nationality.length - 1 && <span>,</span>}
                                                                </span>
                                                            ))
                                                            : 'Not specified'}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="mr-[0.3125rem] sm:mr-[0.625rem] w-4 h-4 sm:w-5 sm:h-5 text-[#E53F01]" />
                                                <p className="z-10 text-[0.5rem] md:text-[0.625rem] text-[#c7c7c7] uppercase">CITY:<br /><span className="text-white">{auth?.user?.player_profile?.birth_city || 'N/A'}</span></p>
                                            </div>
                                        </div>
                                        <div className="absolute right-0 bottom-0 z-0">
                                            <img src="/images/img/orange-img.png" alt="" className="w-[3.125rem] sm:w-[3.75rem]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#191917] p-4 sm:p-6 text-white">
                                <div className="grid gap-3 sm:gap-6 grid-cols-2">
                                    <div className="relative">
                                        <div className="absolute top-0 -right-4 w-[0.0625rem] h-full border-r border-white/10"></div>
                                        <h2 className="mb-2 text-[0.625rem] font-bold text-[#f4620c] uppercase">Player Info</h2>
                                        <div className="space-y-2">
                                            {playerInfo.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-b-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[#d2d2d2]">{item.icon}</span>
                                                        <span className="text-[0.5rem] pr-2 text-[#d2d2d2] uppercase">{item.label}</span>
                                                    </div>
                                                    <span className="text-[0.4375rem] sm:text-[0.5rem] font-medium text-white uppercase">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pl-4 sm:pl-3">
                                        <h2 className="text-[0.625rem] font-bold text-[#E53F01] uppercase">Scan To View Football Identity</h2>
                                        <p className="mt-1 mb-6 text-[0.5rem] text-[#f1f1f1] uppercase">Open Your Camera And Scan</p>
                                        <div className="w-fit rounded-[0.5rem] sm:rounded-xl border-2 sm:border-[3px] border-[#E53F01] bg-white sm:p-3 p-2">
                                            <QRCodeSVG
                                                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/player/profile/${auth?.user?.slug}`}
                                                size={90}
                                                level="M"
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                                className="h-[4.375rem] w-[4.375rem] sm:h-[5.625rem] sm:w-[5.625rem]"
                                            />
                                        </div>
                                        <button className="mt-2 flex items-center rounded-xl bg-[#E53F01] px-1.5 py-1.5 sm:px-2 sm:py-2 font-bold text-black uppercase transition-all hover:bg-[#E53F01]">
                                            <span className=" text-black pr-1"><Smartphone className="h-6 w-4" /></span>
                                            <span className="text-left text-[0.375rem] sm:text-[0.5rem] leading-tight">VIEW FULL IDENTITY, VIDEOS,<br />STATS AND ACHIEVEMENTS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center relative w-full -mt-2  border-t-1 border-gray-600 p-3 sm:p-6 bg-[url('/images/img/layer.png')] bg-cover bg-center bg-no-repeat rounded-bl-[1rem] rounded-br-[1rem]">
                                <p className=" flex justify-between items-center text-[0.4375rem] sm:text-[0.5rem] -ml-3 text-gray-300 pl-1">
                                    <Shield className="w-6 h-6 " />
                                    <span className="pl-2">THIS CARD IDENTIFIES THE HOLDER AS AN OFFICIAL<br className="hidden sm:block" />MEMBER OF HILIGHTS FOOTBALL PLATFORM.</span>
                                </p>
                                <p className="text-[0.375rem] sm:text-[0.5rem] text-white font-bold translate-x-[0.3125rem] sm:translate-x-[10%]">WWW.HILIGHTSFOOTBALL.COM</p>
                                <div className="absolute -bottom-16 left-0 flex justify-between w-full">
                                    <button className="capitalize flex items-center rounded-xl bg-[#E53F01] px-1.5 py-1.5 sm:px-2 sm:py-2 font-bold text-white sm:text-[1rem] cursor-pointer text-[0.625rem] transition-all hover:bg-[#E53F01]" onClick={() => setShareOpen(true)}>
                                        <Share2 className="mr-2 w-[0.625rem] h-[0.625rem] sm:h-[0.75rem]" /> Share full football identity
                                    </button>
                                    <button onClick={downloadCard} className="capitalize cursor-pointer flex items-center rounded-xl bg-black px-1.5 py-1.5 sm:px-2 sm:py-2 font-bold border-1  text-white text-[0.625rem] transition-all">
                                        <Download className="mr-2 w-[0.625rem] h-[0.625rem] sm:w-[0.75rem] sm:h-[0.75rem]" /> download member card
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </section>
                {/* AD ZONE */}
                {/* <section>
                    <div className="relative flex h-[5.625rem] items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] px-4 sm:gap-4 sm:px-6">
                        <div className="flex flex-shrink-0 items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E53F01]"><ArrowRight className="h-5 w-5 text-white" /></div>
                            <div className="hidden sm:block">
                                <p className="text-lg leading-none font-black tracking-tight text-white">TRANSFERROOM</p>
                                <p className="mt-0.5 text-[0.625rem] tracking-wider text-white/50 uppercase">Football Transfer Network</p>
                            </div>
                        </div>
                        <p className="hidden flex-1 text-xs text-white/70 sm:text-sm md:block">The transfer platform trusted by 1,200+ clubs worldwide.</p>
                        <Button size="sm" className="ml-auto flex-shrink-0 bg-[#E53F01] font-semibold text-white hover:bg-[#E53F01]">Start Free →</Button>
                        <span className="absolute top-1 right-2 text-[0.625rem] text-white/30">Sponsored</span>
                    </div>
                </section> */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
                    {/* COMPLETION CHECKLIST — no outer card, each row is its own card */}
                    <section>
                        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                                <h2 className="text-lg font-bold text-[#F5F5F5]">Complete Your Football Identity</h2>

                            </div>
                            <button
                                type="button"
                                onClick={() => setHealthOpen(true)}
                                className="inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold border-[#E53F01] text-[#E53F01] transition-colors hover:border-[#E53F01] hover:text-[#E53F01]"
                            >
                                <Stethoscope className="h-3.5 w-3.5 shrink-0" />
                                Football identity health
                                <span className="font-mono text-sm font-bold text-[#E53F01]">{profileComplete}%</span>

                            </button>

                        </div>
                        <Progress value={profileComplete} className="mb-5 h-2 bg-[#2A2A2A] [&>div]:bg-[#E53F01]" />
                        <ul className="space-y-3">
                            {checklist.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <li
                                        id={i === 0 ? 'basic-info-item' : undefined}
                                        key={i}
                                        className={`flex items-center gap-3 rounded-xl border bg-[#161616] px-4 py-3 transition-colors hover:border-[#E53F01]/60 sm:px-5 sm:py-4 ${item.done ? 'border-[#2A2A2A]' : 'border-[#2A2A2A]'}`}
                                    >
                                        {item.done ? (
                                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-400" />
                                        ) : (
                                            <Circle className="h-5 w-5 flex-shrink-0 text-[#555555]" />
                                        )}
                                        <span className={`min-w-0 flex-1 text-sm ${item.done ? 'text-[#F5F5F5]' : 'text-[#9A9A9A]'}`}>{item.label}</span>
                                        {(item.alwaysShow || !item.done) && item.modal && (
                                            <Button size="sm" onClick={() => setActiveModal(item.modal!)} className="h-8 shrink-0 bg-[#E53F01] text-xs text-white hover:bg-[#E53F01]">
                                                {Icon && <Icon className="mr-1 h-3 w-3" />}{item.cta}
                                            </Button>
                                        )}
                                        {!item.done && !item.modal && item.href && (
                                            <Link href={item.href} className="shrink-0">
                                                <Button size="sm" className="h-8 bg-[#E53F01] text-xs text-white hover:bg-[#E53F01]">
                                                    {Icon && <Icon className="mr-1 h-3 w-3" />}{item.cta}
                                                </Button>
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </div>

                {/* ABOUT YOU + PLAYER QUESTIONNAIRE — saves to player_profile */}
                <section>
                    {/* <div className="mb-4 text-[0.625rem] font-bold tracking-[0.14em] text-[#E53F01] uppercase">About You</div>

                    <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 lg:p-7 2xl:p-9 sm:p-8">
                        <Label htmlFor="description" className="mb-3 block text-xs font-semibold text-[#F5F5F5]">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            rows={5}
                            maxLength={500}
                            value={aboutData.description}
                            onChange={(e) => setAboutField('description', e.target.value)}
                            placeholder="Describe your playing style, strengths, and football journey..."
                            className="resize-none border-[#2A2A2A] bg-[#111111] text-[#F5F5F5] focus-visible:border-[#E53F01] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800"
                        />
                        <div className="mt-2 flex justify-between gap-3">
                            <span className="text-xs text-red-400">{aboutErrors.description}</span>
                            <span className={`font-mono text-xs ${descCount > 450 ? 'font-bold text-[#E53F01]' : 'text-[#94A3B8]'}`}>
                                {descCount} / 500
                            </span>
                        </div>
                    </div> */}

                    {/* Player Questionnaire — private, not shown on public profile */}
                    <div className="mt-6 rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 lg:p-7 2xl:p-9 sm:p-8">
                        <h3 className="mb-1 text-sm font-bold text-[#F5F5F5]">Player Questionnaire</h3>
                        <p className="mb-6 text-xs text-[#94A3B8]">
                            The answers to these questions will not appear on your public football identity.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="supported_club" className="mb-2 block text-xs font-semibold text-[#F5F5F5]">
                                    1. Which football club do you support?
                                </Label>
                                <Input
                                    id="supported_club"
                                    value={aboutData.supported_club}
                                    onChange={(e) => setAboutField('supported_club', e.target.value)}
                                    placeholder="e.g. Manchester United"
                                    className="border-[#2A2A2A] bg-[#111111] text-[#F5F5F5] focus-visible:border-[#E53F01] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800"
                                />
                                <span className="text-xs text-red-400">{aboutErrors.supported_club}</span>
                            </div>

                            <div>
                                <Label htmlFor="dream_club" className="mb-2 block text-xs font-semibold text-[#F5F5F5]">
                                    2. Besides the club you support, which club do you dream of playing for?
                                </Label>
                                <Input
                                    id="dream_club"
                                    value={aboutData.dream_club}
                                    onChange={(e) => setAboutField('dream_club', e.target.value)}
                                    placeholder="e.g. Real Madrid"
                                    className="border-[#2A2A2A] bg-[#111111] text-[#F5F5F5] focus-visible:border-[#E53F01] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800"
                                />
                                <span className="text-xs text-red-400">{aboutErrors.dream_club}</span>
                            </div>

                            <div>
                                <Label className="mb-2 block text-xs font-semibold text-[#F5F5F5]">
                                    3. Which football boot brand do you prefer and would most like to be sponsored by?
                                    <span className="ml-1 font-normal text-[#94A3B8]">(select all that apply)</span>
                                </Label>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {BOOT_BRANDS.map((brand) => {
                                        const selected = aboutData.boot_brands.includes(brand);
                                        return (
                                            <label
                                                key={brand}
                                                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors ${selected ? 'border-[#E53F01] bg-[rgba(255,107,0,0.12)]' : 'border-[#2A2A2A] bg-[#1F1F1F]'}`}
                                            >
                                                <Checkbox
                                                    checked={selected}
                                                    onCheckedChange={() => toggleBootBrand(brand)}
                                                    className="border-[#2A2A2A] data-[state=checked]:border-[#E53F01] data-[state=checked]:bg-[#E53F01]"
                                                />
                                                <span className={`text-sm ${selected ? 'font-semibold text-[#E53F01]' : 'text-[#F5F5F5]'}`}>
                                                    {brand}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>

                                {aboutData.boot_brands.includes('Other') && (
                                    <div className="mt-3">
                                        <Input
                                            value={aboutData.boot_brand_other}
                                            onChange={(e) => setAboutField('boot_brand_other', e.target.value)}
                                            placeholder="Please specify the brand"
                                            className="border-[#2A2A2A] bg-[#111111] text-[#F5F5F5] focus-visible:border-[#E53F01] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800"
                                        />
                                    </div>
                                )}
                                <span className="text-xs text-red-400">{aboutErrors.boot_brands}</span>
                            </div>
                        </div>

                        {/* Save */}
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Button
                                onClick={saveAbout}
                                disabled={aboutSaving}
                                className="bg-[#E53F01] text-white hover:bg-[#CC5500] disabled:opacity-60"
                            >
                                <Save className="mr-2 h-4 w-4 shrink-0" />
                                {aboutSaving ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </div>
                </section>

                {/* COUNTRY ANALYTICS */}
                {/* <section className="relative overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 lg:p-7 2xl:p-9">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-[#F5F5F5]">Country Analytics</h2>
                            <p className="mt-1 text-xs text-[#94A3B8]">Where your profile views come from</p>
                        </div>

                        <div className="flex items-center gap-3">

                            {hasSubscription && (
                                <div className="flex items-center gap-1 rounded-lg border border-[#2A2A2A] bg-[#111111] p-1">
                                    {RANGE_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.key}
                                            type="button"
                                            onClick={() => changeCountryRange(opt.key)}
                                            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${countryRange === opt.key
                                                ? 'bg-[#E53F01] text-white'
                                                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {hasSubscription && (
                                <Badge className="border border-[#E53F01] bg-[rgba(255,107,0,0.12)] text-[0.625rem] font-bold tracking-wider text-[#E53F01] hover:bg-[rgba(255,107,0,0.12)]">
                                    PREMIUM
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className={!hasSubscription ? 'pointer-events-none blur-md filter select-none' : ''}>
                        {hasCountryData ? (
                            <div className="h-[17.5rem] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={countryData}
                                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                                        <XAxis
                                            dataKey="country"
                                            stroke="#94A3B8"
                                            style={{ fontSize: '0.75rem' }}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#94A3B8"
                                            style={{ fontSize: '0.75rem' }}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                background: '#161616',
                                                border: '1px solid #2A2A2A',
                                                borderRadius: '8px',
                                                color: '#F5F5F5',
                                                fontSize: '0.75rem',
                                            }}
                                            cursor={{ fill: 'rgba(255,107,0,0.08)' }}
                                        />
                                        <Bar dataKey="views" fill="#E53F01" radius={[6, 6, 0, 0]} maxBarSize={80} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="flex h-[17.5rem] items-center justify-center text-sm text-[#9A9A9A]">
                                No country data available yet.
                            </div>
                        )}
                    </div>

                    {!hasSubscription && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D]/40">
                            <div className="mx-4 max-w-md rounded-2xl border border-[#2A2A2A] bg-[#1F1F1F] p-8 text-center shadow-xl">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,107,0,0.12)]"><Lock className="h-6 w-6 text-[#E53F01]" /></div>
                                <h3 className="text-base font-bold text-[#F5F5F5]">Country Analytics — Premium Feature</h3>
                                <p className="mt-2 text-sm text-[#9A9A9A]">See exactly which countries are watching your highlights.</p>
                                <Link href="/player/subscription" className="mt-4 inline-block">
                                    <Button className="bg-[#E53F01] font-semibold text-white hover:bg-[#E53F01]"><Crown className="mr-2 h-4 w-4" /> Upgrade to Premium</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </section> */}
            </main>
            {/* MODALS */}
            {
                activeModal && (
                    LIST_CONFIGS[activeModal] ? (
                        <ListModal
                            configKey={activeModal}
                            initialRows={
                                activeModal === 'videos'
                                    ? (() => {
                                        // pp.videos-e already sob video (label + url) thake
                                        // video_url shudhu tokhon add koro jokhon setā videos-e nei
                                        const vids = Array.isArray(pp.videos) ? pp.videos : [];
                                        const hasUrl = (u: string) => vids.some((v: any) => v?.url === u);
                                        const merged = [...vids];
                                        if (nonEmpty(pp.video_url) && !hasUrl(pp.video_url)) {
                                            merged.unshift({ label: '', url: pp.video_url });
                                        }
                                        return merged;
                                    })()
                                    : pp[activeModal] ?? []
                            }
                            onClose={() => setActiveModal(null)}
                            countries={countries}
                            maxVideos={hasSubscription ? 4 : 1}
                            statFields={matchStatFields}
                        />
                    ) : (
                        <FormModal configKey={activeModal} user={auth?.user} pp={pp} onClose={() => setActiveModal(null)} countries={countries} />
                    )
                )
            }
            {/* MODAL - WELCOME (Player Questionnaire save er por) */}
            {aboutSaved && !aboutSaving && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setAboutSaved(false)}>
                    <div
                        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 text-center sm:p-8 [@media(max-height:34rem)]:p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* <button
                            type="button"
                            onClick={() => setAboutSaved(false)}
                            className="ml-auto block cursor-pointer text-[#94A3B8] hover:text-[#F5F5F5]"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button> */}

                        {/* Landscape phone-e jaiga kom — icon ta tokhon lukiye rakhi */}
                        <div className="mx-auto -mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,107,0,0.12)] [@media(max-height:34rem)]:hidden">
                            <CheckCircle2 className="h-7 w-7 text-[#E53F01]" />
                        </div>

                        <p className="mt-5 font-mono text-4xl font-black text-[#E53F01] [@media(max-height:34rem)]:mt-0 [@media(max-height:34rem)]:text-3xl">
                            {profileComplete}%
                        </p>
                        <p className="mt-1 text-xs font-semibold tracking-wider text-[#94A3B8] uppercase">Football Identity health</p>

                        <div className="mt-4 flex items-center gap-3 [@media(max-height:34rem)]:mt-3">
                            <Progress value={profileComplete} className="h-2 flex-1 bg-[#2A2A2A] [&>div]:bg-[#E53F01]" />
                            <span className="shrink-0 font-mono text-xs text-[#9A9A9A]">
                                {completionChecks.filter(Boolean).length}/{completionChecks.length}
                            </span>
                        </div>

                        <h3 className="mt-6 uppercase text-lg font-bold text-[#F5F5F5] [@media(max-height:34rem)]:mt-4 [@media(max-height:34rem)]:text-base">
                            WELCOME TO HILIGHTS FOOTBALL! WHAT ABOUT INVITING YOUR TEAMMATES TO OUR COMMUNITY?
                        </h3>

                        <Button
                            type="button"
                            onClick={() => {
                                setAboutSaved(false);
                                router.visit(`/player/profile/${auth?.user?.slug}`);
                            }}
                            className="mt-6 h-11 w-full bg-[#E53F01] text-sm font-semibold text-white hover:bg-[#CC5500] [@media(max-height:34rem)]:mt-4"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
            {/* MODAL - PROFILE HEALTH */}
            {healthOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setHealthOpen(false)}>
                    <div
                        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#2A2A2A] bg-[#161616] p-4 sm:p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-5 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h3 className="text-lg font-bold text-[#F5F5F5]">Profile health</h3>
                                <p className="mt-1 text-xs text-[#9A9A9A]">
                                    {completionChecks.filter(Boolean).length} of {completionChecks.length} complete
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setHealthOpen(false)}
                                className="shrink-0 text-[#94A3B8] hover:text-[#F5F5F5]"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-5 flex items-center gap-3">
                            <Progress value={profileComplete} className="h-2 flex-1 bg-[#2A2A2A] [&>div]:bg-[#E53F01]" />
                            <span className="shrink-0 font-mono text-sm font-bold text-[#E53F01]">{profileComplete}%</span>
                        </div>

                        <div className="space-y-5">
                            {[...new Set(healthItems.map((h) => h.group))].map((group) => (
                                <div key={group}>
                                    <p className="mb-2 text-[0.625rem] font-bold tracking-[0.14em] text-[#94A3B8] uppercase">{group}</p>
                                    <ul className="space-y-1.5">
                                        {healthItems
                                            .filter((h) => h.group === group)
                                            .map((h) => (
                                                <li
                                                    key={h.label}
                                                    className="flex items-center gap-3 rounded-lg border border-[#2A2A2A] bg-[#111111] px-3 py-2.5"
                                                >
                                                    {h.done ? (
                                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
                                                    ) : (
                                                        <Circle className="h-4 w-4 shrink-0 text-[#555555]" />
                                                    )}
                                                    <span className={`min-w-0 flex-1 text-sm ${h.done ? 'text-[#F5F5F5]' : 'text-[#9A9A9A]'}`}>
                                                        {h.label}
                                                    </span>
                                                    {!h.done && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setHealthOpen(false);
                                                                setActiveModal(h.modal);
                                                            }}
                                                            className="shrink-0 cursor-pointer text-xs font-semibold text-[#E53F01] hover:underline"
                                                        >
                                                            Add
                                                        </button>
                                                    )}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button
                                type="button"
                                onClick={() => setHealthOpen(false)}
                                className="bg-[#E53F01] text-white hover:bg-[#E53F01]"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* MODAL - SHARE */}
            {shareOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-4 sm:p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Share Profile</h2>
                            <button onClick={() => setShareOpen(false)} className="rounded-full p-1 hover:bg-gray-100">
                                <X className="h-6 w-6 text-black" />
                            </button>
                        </div>
                        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-5">
                            <a href={`https://wa.me/?text=${encodeURIComponent(profileUrl)}`} target="_blank" rel="noreferrer" className="text-center">
                                <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-green-500 text-white"><MessageCircle /></div>
                                <span className="mt-2 block text-xs">WhatsApp</span>
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`} target="_blank" rel="noreferrer" className="text-center">
                                <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-blue-600 text-white"><Facebook /></div>
                                <span className="mt-2 block text-xs">Facebook</span>
                            </a>
                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`} target="_blank" rel="noreferrer" className="text-center">
                                <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black text-white"><span className="font-bold">X</span></div>
                                <span className="mt-2 block text-xs">Twitter</span>
                            </a>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`} target="_blank" rel="noreferrer" className="text-center">
                                <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-blue-700 text-white"><Linkedin /></div>
                                <span className="mt-2 block text-xs">LinkedIn</span>
                            </a>
                            <a href={`https://t.me/share/url?url=${encodeURIComponent(profileUrl)}`} target="_blank" rel="noreferrer" className="text-center">
                                <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-sky-500 text-white"><Send /></div>
                                <span className="mt-2 block text-xs">Telegram</span>
                            </a>
                            <a href={`mailto:?body=${encodeURIComponent(profileUrl)}`} className="text-center">
                                <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gray-700 text-white"><Mail /></div>
                                <span className="mt-2 block text-xs">Email</span>
                            </a>
                        </div>
                        <div className="mt-7 flex items-center gap-2 rounded-xl border bg-gray-50 p-3">
                            <input readOnly value={profileUrl} className="min-w-0 flex-1 bg-transparent text-sm outline-none text-black" />
                            <button onClick={copyProfileLink} className="shrink-0 rounded-lg cursor-pointer bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors">
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                    {copied && (
                        <div className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-black px-5 py-3 text-sm text-white shadow-lg transition-all">
                            ✅ Link Copied
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
