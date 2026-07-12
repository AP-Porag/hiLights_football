import PlayerNavbar from '@/components/player/PlayerNavbar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPositionName } from '@/utils/helper';
import { Progress } from '@/components/ui/progress';
import { Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
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
// MOCK DATA (realistic)
const player = {
    name: 'Benjamin',
    totalViews: 1247,
    trend: 12,
    scoutInterest: 23,
    avgRating: 4.2,
    subscription: 'free' as 'free' | 'premium',
};
const recentViews = [
    { id: 1, type: 'Scout', org: 'FC Porto Scouting', country: 'Portugal', flag: '🇵🇹', time: '2 hours ago', locked: false },
    { id: 2, type: 'Club', org: 'Sporting Lisboa B', country: 'Portugal', flag: '🇵🇹', time: 'Yesterday', locked: false },
    { id: 3, type: 'Agent', org: 'Top Eleven Agency', country: 'Spain', flag: '🇪🇸', time: '2 days ago', locked: true },
    { id: 4, type: 'Scout', org: 'Anonymous', country: 'France', flag: '🇫🇷', time: '3 days ago', locked: true },
];
const countryData = [
    { country: 'Portugal', views: 412 },
    { country: 'Spain', views: 287 },
    { country: 'Brazil', views: 198 },
    { country: 'France', views: 156 },
    { country: 'England', views: 94 },
];
const getCountryName = (code?: string) => {
    if (!code) return '';
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
};
const sparklineData = [12, 18, 14, 22, 19, 28, 34];
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
const nonEmpty = (v: any): boolean =>
    v !== null && v !== undefined && String(v).trim() !== '';
const COUNTRY_CODES = [
    'AF', 'AL', 'DZ', 'AD', 'AO', 'AG', 'AR', 'AM', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BT',
    'BO', 'BA', 'BW', 'BR', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'CF', 'TD', 'CL', 'CN', 'CO', 'KM', 'CG', 'CD',
    'CR', 'CI', 'HR', 'CU', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FJ', 'FI',
    'FR', 'GA', 'GM', 'GE', 'DE', 'GH', 'GR', 'GD', 'GT', 'GN', 'GW', 'GY', 'HT', 'HN', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ',
    'IE', 'IL', 'IT', 'JM', 'JP', 'JO', 'KZ', 'KE', 'KI', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU',
    'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MR', 'MU', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MA', 'MZ', 'MM', 'NA', 'NR',
    'NP', 'NL', 'NZ', 'NI', 'NE', 'NG', 'KP', 'MK', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PL', 'PT',
    'QA', 'RO', 'RU', 'RW', 'KN', 'LC', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO',
    'ZA', 'KR', 'SS', 'ES', 'LK', 'SD', 'SR', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TO', 'TT', 'TN', 'TR',
    'TM', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VE', 'VN', 'YE', 'ZM', 'ZW',
];
const ALL_POSITIONS = ['GK', 'LB', 'CB-L', 'CB-R', 'RB', 'LM', 'CM-L', 'CM-R', 'RM', 'CAM', 'LW', 'ST', 'RW', 'CF'];
// ════════ LIST MODAL CONFIG (repeatable rows) ════════
type FieldDef = { name: string; label: string; type: 'text' | 'number' };
type ListConfig = {
    title: string;
    storageKey: string;
    primary: string;
    fields: FieldDef[];
    empty: Record<string, any>;
    firstFixed?: boolean;                 // first row remove kora jabe na
    defaultRows?: Record<string, any>[];  // khali thakle ei default row gula dekhabe
};
const LIST_CONFIGS: Record<string, ListConfig> = {
    videos: {
        title: 'Videos',
        storageKey: 'videos',
        primary: 'url',
        firstFixed: true,
        defaultRows: [
            { label: 'Highlight', url: '' },
            { label: 'Goal', url: '' },
            { label: 'Assist', url: '' },
            { label: 'Dribble', url: '' },
        ],
        fields: [
            { name: 'label', label: 'Label', type: 'text' },
            { name: 'url', label: 'Video URL (YouTube / Vimeo)', type: 'text' },
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
        ],
        empty: { year: '', club: '' },
    },
    transfer_history: {
        title: 'Transfer History',
        storageKey: 'transfer_history',
        primary: 'club',
        fields: [
            { name: 'year', label: 'Year', type: 'number' },
            { name: 'club', label: 'Club', type: 'text' },
        ],
        empty: { year: '', club: '' },
    },
    achievements: {
        title: 'Achievements',
        storageKey: 'achievements',
        primary: 'title',
        fields: [
            { name: 'year', label: 'Year', type: 'text' },
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
            { name: 'year', label: 'Year', type: 'text' },
        ],
        empty: { name: '', year: '' },
    },
    matches: {
        title: 'Recent Matches',
        storageKey: 'matches',
        primary: 'home',
        fields: [
            { name: 'home', label: 'Home', type: 'text' },
            { name: 'score', label: 'Score', type: 'text' },
            { name: 'away', label: 'Away', type: 'text' },
            { name: 'goals', label: 'Goals', type: 'number' },
            { name: 'assists', label: 'Assists', type: 'number' },
            { name: 'minutes', label: 'Minutes', type: 'text' },
        ],
        empty: { home: '', score: '', away: '', goals: '', assists: '', minutes: '' },
    },
};
// ════════ FORM MODAL CONFIG (single record) ════════
type FormFieldType = 'text' | 'number' | 'date' | 'select' | 'country' | 'positions' | 'file';
type FormField = { name: string; label: string; type: FormFieldType; options?: string[] };
type FormConfig = { title: string; fields: FormField[] };
const FORM_CONFIGS: Record<string, FormConfig> = {
    basic_info: {
        title: 'Basic Information',
        fields: [
            { name: 'full_name', label: 'Full Name', type: 'text' },
            { name: 'dob', label: 'Date of Birth', type: 'date' },
            { name: 'gender', label: 'Gender', type: 'select', options: ['M', 'F', 'Other'] },
            { name: 'nationality', label: 'Nationality', type: 'country' },
            { name: 'height', label: 'Height (cm)', type: 'number' },
            { name: 'weight', label: 'Weight (kg)', type: 'number' },
            { name: 'birth_city', label: 'Birth City', type: 'text' },
            { name: 'birth_country', label: 'Birth Country', type: 'country' },
            { name: 'current_club', label: 'Current Club', type: 'text' },
            { name: 'in_team_since', label: 'In Team Since (YYYY-MM)', type: 'text' },
            { name: 'agent', label: 'Agent', type: 'text' },
        ],
    },
    photo: {
        title: 'Profile Photo',
        fields: [{ name: 'photo', label: 'Profile Photo (JPG/PNG)', type: 'file' }],
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
const inputClass =
    'h-9 w-full rounded-lg border border-[#2A2A2A] bg-[#0D0D0D] px-2 text-sm text-[#F5F5F5] focus:border-[#FF6B00] focus:outline-none';
// ── Generic list modal (repeatable rows) ──
function ListModal({
    configKey,
    initialRows,
    onClose,
}: {
    configKey: string;
    initialRows: any[];
    onClose: () => void;
}) {
    const cfg = LIST_CONFIGS[configKey];
    const [rows, setRows] = useState<any[]>(() => {
        if (initialRows.length) return initialRows.map((r) => ({ ...cfg.empty, ...r }));
        if (cfg.defaultRows) return cfg.defaultRows.map((r) => ({ ...cfg.empty, ...r }));
        return [{ ...cfg.empty }];
    });
    const [saving, setSaving] = useState(false);
    const update = (i: number, name: string, val: string) => {
        const copy = [...rows];
        copy[i] = { ...copy[i], [name]: val };
        setRows(copy);
    };
    const addRow = () => setRows([...rows, { ...cfg.empty }]);
    const removeRow = (i: number) => {
        if (cfg.firstFixed && i === 0) return; // first row fixed
        setRows(rows.filter((_, idx) => idx !== i));
    };
    const save = () => {
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
                className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#F5F5F5]">{cfg.title}</h3>
                    <button type="button" onClick={onClose} className="text-[#94A3B8] hover:text-[#F5F5F5]" aria-label="Close">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="space-y-3">
                    {rows.map((row, i) => (
                        <div key={i} className="flex flex-wrap items-end gap-2 rounded-xl border border-[#2A2A2A] bg-[#111111] p-3">
                            {cfg.fields.map((f) => (
                                <div key={f.name} className="flex-1 min-w-[90px]">
                                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                        {f.label}
                                    </label>
                                    <input
                                        type={f.type}
                                        value={row[f.name] ?? ''}
                                        onChange={(e) => update(i, f.name, e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            ))}
                            {cfg.firstFixed && i === 0 ? (
                                <div className="h-9 w-9 flex-shrink-0" />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => removeRow(i)}
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[#2A2A2A] text-[#94A3B8] hover:border-red-400 hover:text-red-500"
                                    aria-label="Remove"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addRow}
                    className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#FF6B00] hover:text-[#CC5500]"
                >
                    <Plus className="h-4 w-4" /> Add row
                </button>
                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={onClose} className="text-[#9A9A9A] hover:bg-[#1F1F1F] hover:text-[#F5F5F5]">
                        Cancel
                    </Button>
                    <Button type="button" onClick={save} disabled={saving} className="bg-[#FF6B00] text-white hover:bg-[#CC5500]">
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>

        </div>
    );
}
// ── Generic form modal (single record) ──
function FormModal({
    configKey,
    user,
    pp,
    onClose,
}: {
    configKey: string;
    user: any;
    pp: any;
    onClose: () => void;
}) {
    const cfg = FORM_CONFIGS[configKey];
    const [values, setValues] = useState<Record<string, any>>(() => {
        const init: Record<string, any> = {};
        cfg.fields.forEach((f) => {
            if (f.name === 'full_name') init[f.name] = user?.name ?? '';
            else if (f.name === 'dob' || f.name === 'nationality') init[f.name] = user?.[f.name] ?? '';
            else if (f.name === 'positions') init[f.name] = Array.isArray(pp?.positions) ? pp.positions : [];
            else if (f.name === 'photo') init[f.name] = null;
            else init[f.name] = pp?.[f.name] ?? '';
        });
        return init;
    });
    const [preview, setPreview] = useState<string>(pp?.photo_url ?? '');
    const [saving, setSaving] = useState(false);
    const setField = (name: string, val: any) => setValues((prev) => ({ ...prev, [name]: val }));
    const togglePos = (id: string) => {
        const cur: string[] = values.positions || [];
        if (cur.includes(id)) setField('positions', cur.filter((p) => p !== id));
        else if (cur.length < 3) setField('positions', [...cur, id]);
    };
    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setField('photo', file);
            const r = new FileReader();
            r.onload = (ev) => setPreview(ev.target?.result as string);
            r.readAsDataURL(file);
        }
    };
    const save = () => {
        const payload: Record<string, any> = { ...values };
        if (!payload.photo) delete payload.photo;
        setSaving(true);
        router.post('/player/profile/fields', payload, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => onClose(),
            onFinish: () => setSaving(false),
        });
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
            <div
                className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#F5F5F5]">{cfg.title}</h3>
                    <button type="button" onClick={onClose} className="text-[#94A3B8] hover:text-[#F5F5F5]" aria-label="Close">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cfg.fields.map((f) => (
                        <div key={f.name} className={f.type === 'positions' || f.type === 'file' ? 'sm:col-span-2' : ''}>
                            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                {f.label}
                            </label>
                            {f.type === 'text' && (
                                <input type="text" value={values[f.name] ?? ''} onChange={(e) => setField(f.name, e.target.value)} className={inputClass} />
                            )}
                            {f.type === 'number' && (
                                <input type="number" value={values[f.name] ?? ''} onChange={(e) => setField(f.name, e.target.value)} className={inputClass} />
                            )}
                            {f.type === 'date' && (
                                <input type="date" value={values[f.name] ?? ''} onChange={(e) => setField(f.name, e.target.value)} className={inputClass} />
                            )}
                            {f.type === 'select' && (
                                <select value={values[f.name] ?? ''} onChange={(e) => setField(f.name, e.target.value)} className={inputClass}>
                                    <option value="">Select...</option>
                                    {f.options!.map((o) => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </select>
                            )}
                            {f.type === 'country' && (
                                <select value={values[f.name] ?? ''} onChange={(e) => setField(f.name, e.target.value)} className={inputClass}>
                                    <option value="">Select country...</option>
                                    {COUNTRY_CODES.map((c) => (
                                        <option key={c} value={c}>{getCountryName(c)}</option>
                                    ))}
                                </select>
                            )}
                            {f.type === 'positions' && (
                                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                                    {ALL_POSITIONS.map((id) => {
                                        const on = (values.positions || []).includes(id);
                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                onClick={() => togglePos(id)}
                                                className={`rounded-lg border px-2 py-1.5 text-xs font-semibold ${on ? 'border-[#FF6B00] bg-[rgba(255,107,0,0.12)] text-[#FF6B00]' : 'border-[#2A2A2A] bg-[#111111] text-[#9A9A9A]'}`}
                                            >
                                                {id}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            {f.type === 'file' && (
                                <div className="flex items-center gap-4">
                                    {preview && <img src={preview} alt="preview" className="h-16 w-16 rounded-full border-2 border-[#FF6B00] object-cover" />}
                                    <input type="file" accept="image/jpeg,image/png" onChange={onFile} className="text-sm text-[#9A9A9A]" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={onClose} className="text-[#9A9A9A] hover:bg-[#1F1F1F] hover:text-[#F5F5F5]">
                        Cancel
                    </Button>
                    <Button type="button" onClick={save} disabled={saving} className="bg-[#FF6B00] text-white hover:bg-[#CC5500]">
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default function PlayerDashboard() {
    const { auth } = usePage().props as any;
    const pp = auth?.user?.player_profile ?? {};
    const greeting = getGreeting();
    const dateStr = formatDate();
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const [shareOpen, setShareOpen] = useState(false);
    // Replace the old profileUrl with this one that uses actual user data
    // Replace the old profileUrl with this one that uses actual user data
    const profileUrl = `${window.location.origin}/player/profile/${auth?.user?.player_profile?.id}`;
    const [copied, setCopied] = useState(false);

    const copyProfileLink = async () => {
        // Use the actual user's profile URL
        const actualProfileUrl = `${window.location.origin}/player/profile/${auth?.user?.player_profile?.id}`;

        try {
            await navigator.clipboard.writeText(actualProfileUrl);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2500);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };



    // video: video_url (Edit page) OR videos list (dashboard modal) — dutor jekono ekta thakle done
    const videoDone =
        nonEmpty(pp.video_url) ||
        (Array.isArray(pp.videos) && pp.videos.some((v: any) => nonEmpty(v?.url)));
    // ── PROFILE COMPLETION (registration theke shuru kore sob — 21 check) ──
    const completionChecks: boolean[] = [
        nonEmpty(auth?.user?.name),          // registration
        nonEmpty(auth?.user?.dob),           // registration
        nonEmpty(auth?.user?.nationality),   // registration
        nonEmpty(pp.gender),
        nonEmpty(pp.height),
        nonEmpty(pp.weight),
        nonEmpty(pp.birth_city),
        nonEmpty(pp.birth_country),
        nonEmpty(pp.current_club),
        nonEmpty(pp.in_team_since),
        nonEmpty(pp.modality),
        nonEmpty(pp.foot),
        nonEmpty(pp.photo_path),
        videoDone,
        nonEmpty(pp.description),
        Array.isArray(pp.positions) && pp.positions.length > 0,
        Array.isArray(pp.club_history) && pp.club_history.some((r: any) => nonEmpty(r?.club)),
        Array.isArray(pp.transfer_history) && pp.transfer_history.some((r: any) => nonEmpty(r?.club)),
        Array.isArray(pp.achievements) && pp.achievements.some((r: any) => nonEmpty(r?.title)),
        Array.isArray(pp.competitions) && pp.competitions.some((r: any) => nonEmpty(r?.name)),
        Array.isArray(pp.matches) && pp.matches.some((r: any) => nonEmpty(r?.home)),
    ];
    const profileComplete = Math.round(
        (completionChecks.filter(Boolean).length / completionChecks.length) * 100
    );
    // ── CHECKLIST ──
    const checklist: {
        label: string;
        done: boolean;
        href?: string;
        modal?: string;
        cta: string;
        icon?: typeof Video;
        alwaysShow?: boolean;   // done howar por-o button dekhabe (video-r jonno)
    }[] = [
            {
                label: 'Basic information added',
                done: nonEmpty(auth?.user?.name) && nonEmpty(auth?.user?.dob) && nonEmpty(auth?.user?.nationality),
                modal: 'basic_info',
                cta: 'Edit',
                icon: UserPen,
                alwaysShow: true,
            },
            {
                label: 'Profile photo uploaded',
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
                cta: videoDone ? 'Edit' : 'Edit',
                icon: Video,
                alwaysShow: true,
            },
            {
                label: 'Add club history',
                done: Array.isArray(pp.club_history) && pp.club_history.some((r: any) => nonEmpty(r?.club)),
                modal: 'club_history',
                cta: 'Edit',
                icon: History,
                alwaysShow: true,
            },
            {
                label: 'Add transfer history',
                done: Array.isArray(pp.transfer_history) && pp.transfer_history.some((r: any) => nonEmpty(r?.club)),
                modal: 'transfer_history',
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
            {
                label: 'Upgrade to Premium',
                done: player.subscription === 'premium',
                href: '/player/upgrade',
                cta: 'Upgrade →',
                icon: Crown,
            },
        ];
    const circumference = 276.46;
    const dashOffset = circumference - (profileComplete / 100) * circumference;
    const sparkMax = Math.max(...sparklineData);
    const sparkMin = Math.min(...sparklineData);
    const sparkRange = sparkMax - sparkMin || 1;
    const sparkPoints = sparklineData
        .map((v, i) => {
            const x = (i / (sparklineData.length - 1)) * 100;
            const y = 100 - ((v - sparkMin) / sparkRange) * 80 - 10;
            return `${x},${y}`;
        })
        .join(' ');
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
            icon: <Weight className="w-4 h-4 text-gray-300" />,
            label: 'WEIGHT',
            value: pp?.weight ? `${pp.weight} kg` : 'Not specified',
        },
        {
            icon: <Shield className="w-4 h-4 text-gray-300" />,
            label: 'CLUB',
            value: pp?.current_club ? `${pp.current_club}` : 'Not specified',
        },
        {
            icon: <CalendarDays className="w-4 h-4 text-gray-300" />,
            label: 'MEMBER SINCE',
            value: pp?.in_team_since
                ? new Date(pp.in_team_since).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : 'Not specified',
        },
    ];
    const shareProfile = async () => {
        const profileUrl = `${window.location.origin}/player/profile/${player.id}`;

        const shareData = {
            title: `${player.user?.name} — HiLights Football`,
            text: `Check out ${player.user?.name}'s player profile on HiLights Football`,
            url: profileUrl,
        };

        // Native share (Mobile browsers)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (error) {
                // user cancel করলে কিছু করবেন না
                if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }
            }
        }

        // Copy link fallback
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(profileUrl);
                alert('Profile link copied!');
                return;
            } catch (error) {
                console.log(error);
            }
        }

        // Old browser fallback
        try {
            const textarea = document.createElement('textarea');
            textarea.value = profileUrl;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';

            document.body.appendChild(textarea);
            textarea.select();

            document.execCommand('copy');

            document.body.removeChild(textarea);

            alert('Profile link copied!');
        } catch {
            prompt('Copy this profile link:', profileUrl);
        }
    };
    const cardRef = useRef<HTMLDivElement>(null);
    const downloadCard = async () => {
        if (!cardRef.current) return;
        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `${auth?.user?.name ?? 'member'}-card.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Card download failed:', err);
            alert('Could not download card. Please try again.');
        }
    };
    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-16">
            <PlayerNavbar />
            {/* PAGE HEADER */}
            <header className="border-b border-[#2A2A2A] bg-[#0D0D0D] px-4 py-5 sm:px-8">
                <div className="mx-auto max-w-[1300px]">
                    <h1 className="font-display text-2xl font-bold text-[#F5F5F5] sm:text-3xl">
                        {greeting}, {auth?.user?.name}
                    </h1>
                    <p className="mt-1 text-sm text-[#9A9A9A]">{dateStr}</p>
                </div>
            </header>
            <main className="mx-auto max-w-[1300px] space-y-6 px-4 py-6 sm:px-8 sm:py-8">
                {/* WIDGETS ROW */}
                <section className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_450px]">
                    {/* [1] Profile Complete */}
                    <div className="grid grid-cols-2 gap-4 h-[500px]">
                        <div className="flex flex-col items-center rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                            <div className="relative h-[112px] w-[112px]">
                                <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
                                    <circle cx="56" cy="56" r="44" fill="none" strokeWidth="10" className="stroke-[#2A2A2A]" />
                                    <circle cx="56" cy="56" r="44" fill="none" stroke="#FF6B00" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-display text-3xl font-black text-[#F5F5F5]">{profileComplete}%</span>
                                </div>
                            </div>
                            <p className="mt-3 text-xs tracking-wider text-[#94A3B8] uppercase">Profile Complete</p>
                            <p className="mt-2 text-[10px] font-medium text-[#FF6B00]">
                                {profileComplete < 100 ? `${100 - profileComplete}% left to complete your profile` : 'Your profile is complete'}
                            </p>
                        </div>
                        {/* [2] Profile Views */}
                        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-mono text-3xl font-black text-[#F5F5F5]">{player.totalViews.toLocaleString('en-US')}</p>
                                    <p className="mt-1 text-sm text-[#9A9A9A]">Profile Views</p>
                                </div>
                                <Eye className="h-5 w-5 text-[#FF6B00]" />
                            </div>
                            <div className="mt-2 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3 text-green-400" />
                                <span className="text-xs font-medium text-green-400">{player.trend}% this week</span>
                            </div>
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-2 h-12 w-full">
                                <polyline points={sparkPoints} fill="none" stroke="#FF6B00" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            </svg>
                        </div>
                        {/* [3] Scout Interest */}
                        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-mono text-3xl font-black text-[#F5F5F5]">{player.scoutInterest}</p>
                                    <p className="mt-1 text-sm text-[#9A9A9A]">Scout Ratings</p>
                                </div>
                                <Star className="h-5 w-5 fill-[#FF6B00] text-[#FF6B00]" />
                            </div>
                            <div className="mt-2 flex items-center gap-1">
                                <Star className="h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" />
                                <span className="text-xs font-medium text-[#9A9A9A]">Average {player.avgRating} / 5.0</span>
                            </div>
                            <Progress value={84} className="mt-3 h-2 bg-[#2A2A2A] [&>div]:bg-[#FF6B00]" />
                        </div>
                        {/* [4] Subscription */}
                        <div className="flex flex-col rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                            {player.subscription === 'free' ? (
                                <>
                                    <Badge className="w-fit border border-[#FF6B00] bg-[rgba(255,107,0,0.12)] text-[10px] font-bold tracking-wider text-[#FF6B00] hover:bg-[rgba(255,107,0,0.12)]">FREE PLAN</Badge>
                                    <p className="mt-3 flex-1 text-sm text-[#9A9A9A]">Unlock all features and reach more scouts.</p>
                                    <Link href="/player/upgrade" className="mt-3">
                                        <Button className="w-full bg-[#FF6B00] p-3 font-semibold text-white hover:bg-[#CC5500]">
                                            <Crown className="mr-1.5 h-3.5 w-3.5" />
                                            <span className="text-[12px]">Upgrade to <br className="block" /> Premium</span>
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Badge className="w-fit border border-green-600 bg-green-950/30 text-[10px] font-bold tracking-wider text-green-400 hover:bg-green-950/30">PREMIUM ACTIVE</Badge>
                                    <p className="mt-3 flex-1 text-sm text-[#9A9A9A]">All features unlocked.</p>
                                    <p className="mt-3 text-xs text-[#94A3B8]">Renews 01/06/2026</p>
                                </>
                            )}
                        </div>
                    </div>
                    {/* right side */}
                    <div className="mx-auto mb-16">
                        <div ref={cardRef} className="w-[300px] sm:w-[420px] border-1 border-gray-600 rounded-[16px] bg-black">
                            <div className="overflow-hidden text-white">
                                <div className="flex items-center justify-between">
                                    <div className="pl-3 sm:pl-4">
                                        <img src="/images/logo/final_logo.png" alt="new-logo" className="w-[125px] sm:w-[170px]" />
                                    </div>
                                    <div className="-translate-x-[15%] sm:-translate-x-[30%] translate-y-[20%]">
                                        <h2 className="text-center font-bold uppercase text-[11px] sm:text-[14px]">MEMBER CARD</h2>
                                        <p className="text-center text-[8px] sm:text-[10px] font-semibold text-orange-500 uppercase">Official Member</p>
                                        <svg width="130" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="10" y1="12" x2="70" y2="12" stroke="#6B7280" strokeWidth="1" />
                                            <path d="M90 4L92.35 9.15L98 9.8L94 13.6L95.2 19L90 16L84.8 19L86 13.6L82 9.8L87.65 9.15L90 4Z" fill="#F97316" />
                                            <line x1="110" y1="12" x2="170" y2="12" stroke="#6B7280" strokeWidth="1" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative flex gap-2 sm:gap-4 pl-4 pt-2 border-b-1 border-gray-400">
                                    <div className="h-[160px] w-[95px] sm:h-[210px] sm:w-[130px] mb-3">
                                        <img src={auth?.user?.player_profile?.photo_url || '/images/img/placeholder.webp'} alt="player" className="h-full w-full rounded-[10px] sm:rounded-[12px] border-1 border-gray-400 object-cover" />
                                    </div>
                                    <div>
                                        <div className="relative z-10">
                                            <h3 className="mt-2 text-[12px] sm:mt-4 sm:text-[16px] font-bold uppercase">{auth?.user?.name}</h3>
                                            <p className="text-[8px] sm:text-[10px] text-[#f05300] uppercase">{getPositionName(auth?.user?.player_profile?.positions)}</p>
                                            <div className="absolute mt-2 h-[1px] bg-orange-500 w-[80%] sm:w-[110%]"></div>
                                        </div>
                                        <div className="mt-6 space-y-1">
                                            <div className="flex items-center">
                                                <User className="mr-[5px] sm:mr-[10px] w-4 h-4 sm:w-5 sm:h-5 text-[#f06200]" />
                                                <p className="z-10 text-[8px] md:text-[10px] text-[#c7c7c7] uppercase">ID:<br /><span className="text-white">{auth?.user?.player_profile?.player_id}</span></p>
                                            </div>
                                            <div className="flex items-center">
                                                <CalendarDays className="mr-[5px] sm:mr-[10px] w-4 h-4 sm:w-5 sm:h-5 text-[#f06200]" />
                                                <p className="z-10 text-[8px] md:text-[10px] text-[#c7c7c7] uppercase">DATE OF BIRTH:<br /><span className="text-white">{auth?.user?.dob && new Date(auth?.user?.dob).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                                            </div>
                                            <div className="flex items-center">
                                                <Flag className="mr-[5px] sm:mr-[10px] w-4 h-4 sm:w-5 sm:h-5 text-[#f06200]" />
                                                <p className="z-10 text-[8px] md:text-[10px] text-[#c7c7c7] uppercase">NATIONALITY:<br /><span className="text-white">{getCountryName(auth?.user?.nationality)}</span></p>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="mr-[5px] sm:mr-[10px] w-4 h-4 sm:w-5 sm:h-5 text-[#f06200]" />
                                                <p className="z-10 text-[8px] md:text-[10px] text-[#c7c7c7] uppercase">CITY:<br /><span className="text-white">{auth?.user?.player_profile?.birth_city || 'N/A'}</span></p>
                                            </div>
                                        </div>
                                        <div className="absolute right-0 bottom-0 z-0">
                                            <img src="/images/img/orange-img.png" alt="" className="w-[50px] sm:w-[60px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#191917] p-4 sm:p-6 text-white">
                                <div className="grid gap-3 sm:gap-6 grid-cols-2">
                                    <div className="relative">
                                        <div className="absolute top-0 -right-4 w-[1px] h-full border-r border-white/10"></div>
                                        <h2 className="mb-2 text-[10px] font-bold text-[#f4620c] uppercase">Player Info</h2>
                                        <div className="space-y-2">
                                            {playerInfo.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-b-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[#d2d2d2]">{item.icon}</span>
                                                        <span className="text-[8px] pr-2 text-[#d2d2d2] uppercase">{item.label}</span>
                                                    </div>
                                                    <span className="text-[7px] sm:text-[8px] font-medium text-white uppercase">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pl-4 sm:pl-3">
                                        <h2 className="text-[10px] font-bold text-[#f4620c] uppercase">Scan To View Profile</h2>
                                        <p className="mt-1 mb-6 text-[8px] text-[#f1f1f1] uppercase">Open Your Camera And Scan</p>
                                        <div className="w-fit rounded-[8px] sm:rounded-xl border-2 sm:border-[3px] border-[#ff6600] bg-white sm:p-3 p-2">
                                            <QRCodeSVG
                                                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/player/profile/${auth?.user?.player_profile?.id}`}
                                                size={90}
                                                level="M"
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                                className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px]"
                                            />
                                        </div>
                                        <button className="mt-2 flex items-center rounded-xl bg-[#ff6600] px-1.5 py-1.5 sm:px-2 sm:py-2 font-bold text-black uppercase transition-all hover:bg-[#ff7a1a]">
                                            <span className=" text-black pr-1"><Smartphone className="h-6 w-4" /></span>
                                            <span className="text-left text-[6px] sm:text-[8px] leading-tight">VIEW FULL PROFILE, VIDEOS,<br />STATS AND ACHIEVEMENTS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center relative w-full -mt-2  border-t-1 border-gray-600 p-3 sm:p-6 bg-[url('/images/img/layer.png')] bg-cover bg-center bg-no-repeat rounded-bl-[16px] rounded-br-[16px]">
                                <p className=" flex justify-between items-center text-[7px] sm:text-[8px] -ml-3 text-gray-300 pl-1">
                                    <Shield className="w-6 h-6 " />
                                    <span className="pl-2">THIS CARD IDENTIFIES THE HOLDER AS AN OFFICIAL<br className="hidden sm:block" />MEMBER OF HILIGHTS FOOTBALL PLATFORM.</span>
                                </p>
                                <p className="text-[6px] sm:text-[8px] text-black font-bold translate-x-[5px] sm:translate-x-[10%]">WWW.HILIGHTSFOOTBALL.COM</p>
                                <div className="absolute -bottom-16 left-0 flex justify-between w-full">
                                    <button className="capitalize flex items-center rounded-xl bg-[#e75502] px-1.5 py-1.5 sm:px-2 sm:py-2 font-bold text-white sm:text-[16px] cursor-pointer text-[10px] transition-all hover:bg-[#ff7a1a]" onClick={() => setShareOpen(true)}>
                                        <Share2 className="mr-2 w-[10px] h-[10px] sm:h-[12px]" /> Share full profile
                                    </button>
                                    <button onClick={downloadCard} className="capitalize cursor-pointer flex items-center rounded-xl bg-black px-1.5 py-1.5 sm:px-2 sm:py-2 font-bold border-1  text-white text-[10px] transition-all">
                                        <Download className="mr-2 w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]" /> download member card
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* AD ZONE */}
                <section>
                    <div className="relative flex h-[90px] items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] px-4 sm:gap-4 sm:px-6">
                        <div className="flex flex-shrink-0 items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6B00]"><ArrowRight className="h-5 w-5 text-white" /></div>
                            <div className="hidden sm:block">
                                <p className="text-lg leading-none font-black tracking-tight text-white">TRANSFERROOM</p>
                                <p className="mt-0.5 text-[10px] tracking-wider text-white/50 uppercase">Football Transfer Network</p>
                            </div>
                        </div>
                        <p className="hidden flex-1 text-xs text-white/70 sm:text-sm md:block">The transfer platform trusted by 1,200+ clubs worldwide.</p>
                        <Button size="sm" className="ml-auto flex-shrink-0 bg-[#FF6B00] font-semibold text-white hover:bg-[#CC5500]">Start Free →</Button>
                        <span className="absolute top-1 right-2 text-[10px] text-white/30">Sponsored</span>
                    </div>
                </section>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* COMPLETION CHECKLIST */}
                    <section className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                        <div className="mb-1 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[#F5F5F5]">Complete Your Profile</h2>
                            <span className="font-mono text-sm font-bold text-[#FF6B00]">{profileComplete}%</span>
                        </div>
                        <Progress value={profileComplete} className="mb-5 h-2 bg-[#2A2A2A] [&>div]:bg-[#FF6B00]" />
                        <ul className="space-y-3">
                            {checklist.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <li key={i} className="flex items-center gap-3 py-2">
                                        {item.done ? (
                                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-400" />
                                        ) : (
                                            <Circle className="h-5 w-5 flex-shrink-0 text-[#555555]" />
                                        )}
                                        <span className={`flex-1 text-sm ${item.done ? 'text-[#F5F5F5]' : 'text-[#9A9A9A]'}`}>{item.label}</span>
                                        {(item.alwaysShow || !item.done) && item.modal && (
                                            <Button size="sm" onClick={() => setActiveModal(item.modal!)} className="h-8 bg-[#FF6B00] text-xs text-white hover:bg-[#CC5500]">
                                                {Icon && <Icon className="mr-1 h-3 w-3" />}{item.cta}
                                            </Button>
                                        )}
                                        {!item.done && !item.modal && item.href && (
                                            <Link href={item.href}>
                                                <Button size="sm" className="h-8 bg-[#FF6B00] text-xs text-white hover:bg-[#CC5500]">
                                                    {Icon && <Icon className="mr-1 h-3 w-3" />}{item.cta}
                                                </Button>
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                    {/* RECENT VIEWS CARD */}
                    <section className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                        <div className="mb-5 flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-[#F5F5F5]">Recent Profile Views</h2>
                                <p className="mt-1 text-xs text-[#94A3B8]">Who visited your profile</p>
                            </div>
                            <Link href="/player/views" className="text-xs font-semibold text-[#FF6B00] hover:text-[#CC5500]">View all →</Link>
                        </div>
                        <ul className="space-y-3">
                            {recentViews.map((view) => {
                                const initials = view.org.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
                                return (
                                    <li key={view.id} className="relative flex items-center gap-3 rounded-xl border border-[#2A2A2A] p-3 transition-colors hover:border-[#FF6B00]">
                                        <div className={view.locked ? 'flex flex-1 items-center gap-3 blur-sm filter' : 'flex flex-1 items-center gap-3'}>
                                            <Avatar className="h-10 w-10 flex-shrink-0">
                                                <AvatarFallback className="bg-[rgba(255,107,0,0.12)] text-xs font-bold text-[#FF6B00]">{initials}</AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold text-[#F5F5F5]">{view.type} from {view.org}</p>
                                                <div className="mt-0.5 flex items-center gap-2">
                                                    <span className="text-xs text-[#9A9A9A]">{view.flag} {view.country}</span>
                                                    <span className="text-[#94A3B8]">•</span>
                                                    <span className="text-xs text-[#94A3B8]">{view.time}</span>
                                                </div>
                                            </div>
                                            {!view.locked && (
                                                <Link href={`/player/views/${view.id}`} className="flex-shrink-0 text-xs font-semibold text-[#FF6B00] hover:text-[#CC5500]">View →</Link>
                                            )}
                                        </div>
                                        {view.locked && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#161616]/60">
                                                <div className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1F1F1F] px-3 py-1.5">
                                                    <Lock className="h-3.5 w-3.5 text-[#FF6B00]" />
                                                    <span className="text-xs font-medium text-[#9A9A9A]">Upgrade to Premium to unlock</span>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </div>
                {/* COUNTRY ANALYTICS */}
                <section className="relative overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
                    <div className="mb-5 flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-[#F5F5F5]">Country Analytics</h2>
                            <p className="mt-1 text-xs text-[#94A3B8]">Where your profile views come from</p>
                        </div>
                        {player.subscription === 'premium' && (
                            <Badge className="border border-[#FF6B00] bg-[rgba(255,107,0,0.12)] text-[10px] font-bold tracking-wider text-[#FF6B00] hover:bg-[rgba(255,107,0,0.12)]">PREMIUM</Badge>
                        )}
                    </div>
                    <div className={player.subscription === 'free' ? 'pointer-events-none blur-md filter select-none' : ''}>
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={countryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                                    <XAxis dataKey="country" stroke="#94A3B8" style={{ fontSize: '12px' }} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: '#161616', border: '1px solid #2A2A2A', borderRadius: '8px', color: '#F5F5F5', fontSize: '12px' }} cursor={{ fill: 'rgba(255,107,0,0.08)' }} />
                                    <Bar dataKey="views" fill="#FF6B00" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {player.subscription === 'free' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D]/40">
                            <div className="mx-4 max-w-md rounded-2xl border border-[#2A2A2A] bg-[#1F1F1F] p-8 text-center shadow-xl">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,107,0,0.12)]"><Lock className="h-6 w-6 text-[#FF6B00]" /></div>
                                <h3 className="text-base font-bold text-[#F5F5F5]">Country Analytics — Premium Feature</h3>
                                <p className="mt-2 text-sm text-[#9A9A9A]">See exactly which countries are watching your highlights.</p>
                                <Link href="/player/upgrade" className="mt-4 inline-block">
                                    <Button className="bg-[#FF6B00] font-semibold text-white hover:bg-[#CC5500]"><Crown className="mr-2 h-4 w-4" /> Upgrade to Premium</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </section>
            </main>
            {/* MODALS — list vs form auto-select */}
            {
                activeModal && (
                    LIST_CONFIGS[activeModal] ? (
                        <ListModal configKey={activeModal} initialRows={pp[activeModal] ?? []} onClose={() => setActiveModal(null)} />
                    ) : (
                        <FormModal configKey={activeModal} user={auth?.user} pp={pp} onClose={() => setActiveModal(null)} />
                    )
                )
            }
            {/* MODAL - SHARE */}
            {/* Profile Share Modal */}
            {/* Profile Share Modal */}
            {shareOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Share Profile
                            </h2>
                            <button
                                onClick={() => setShareOpen(false)}
                                className="rounded-full p-1 hover:bg-gray-100"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Social Icons */}
                        <div className="mt-6 grid grid-cols-4 gap-5">
                            {/* WhatsApp */}
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(profileUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-center"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
                                    <MessageCircle />
                                </div>
                                <span className="mt-2 block text-xs">WhatsApp</span>
                            </a>

                            {/* Facebook */}
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-center"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
                                    <Facebook />
                                </div>
                                <span className="mt-2 block text-xs">Facebook</span>
                            </a>

                            {/* X */}
                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-center"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                                    X
                                </div>
                                <span className="mt-2 block text-xs">Twitter</span>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-center"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-white">
                                    <Linkedin />
                                </div>
                                <span className="mt-2 block text-xs">LinkedIn</span>
                            </a>

                            {/* Telegram */}
                            <a
                                href={`https://t.me/share/url?url=${encodeURIComponent(profileUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-center"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white">
                                    <Send />
                                </div>
                                <span className="mt-2 block text-xs">Telegram</span>
                            </a>

                            {/* Email */}
                            <a
                                href={`mailto:?body=${encodeURIComponent(profileUrl)}`}
                                className="text-center"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-700 text-white">
                                    <Mail />
                                </div>
                                <span className="mt-2 block text-xs">Email</span>
                            </a>

                            {/* Copy */}
                            <button
                                onClick={copyProfileLink}
                                className="text-center"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gray-300">
                                    <Copy />
                                </div>
                                <span className="mt-2 block text-xs">Copy</span>
                            </button>
                        </div>

                        {/* URL Box */}
                        <div className="mt-7 flex items-center gap-2 rounded-xl border bg-gray-50 p-3">
                            <input
                                readOnly
                                value={profileUrl}
                                className="flex-1 bg-transparent text-sm outline-none"
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(profileUrl).then(() => {
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2500);
                                    });
                                }}
                                className="rounded-lg bg-black px-4 py-2 text-sm text-white"
                            >
                                Copy
                            </button>
                        </div>
                    </div>

                    {copied && (
                        <div className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-black px-5 py-3 text-sm text-white shadow-lg transition-all">
                            Link copied
                        </div>
                    )}
                </div>
            )}
        </div >
    );
}
