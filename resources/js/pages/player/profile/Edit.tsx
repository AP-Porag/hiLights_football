import React, { useState, useMemo } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import PlayerNavbar from '@/components/player/PlayerNavbar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Upload,
    Youtube,
    CheckCircle2,
    Trash2,
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    CalendarIcon,
    Check,
    ChevronsUpDown,
    Plus,
    X,
} from 'lucide-react';

const STEPS = [
    { id: 0, label: 'Basic Info' },
    { id: 1, label: 'Football' },
    { id: 2, label: 'Media' },
    { id: 3, label: 'Career History' },  // renamed
    { id: 4, label: 'About' },
];
const MODALITIES = ['Football', 'Futsal', 'Beach Soccer'];
const POSITION_ZONES = [
    { id: 'GK', label: 'GK', cx: 30, cy: 100 },
    { id: 'LB', label: 'LB', cx: 75, cy: 40 },
    { id: 'CB-L', label: 'CB', cx: 80, cy: 80 },
    { id: 'CB-R', label: 'CB', cx: 80, cy: 120 },
    { id: 'RB', label: 'RB', cx: 75, cy: 160 },
    { id: 'LM', label: 'LM', cx: 145, cy: 40 },
    { id: 'CM-L', label: 'CM', cx: 145, cy: 80 },
    { id: 'CM-R', label: 'CM', cx: 145, cy: 120 },
    { id: 'RM', label: 'RM', cx: 145, cy: 160 },
    { id: 'CAM', label: 'CAM', cx: 200, cy: 100 },
    { id: 'LW', label: 'LW', cx: 235, cy: 50 },
    { id: 'ST', label: 'ST', cx: 260, cy: 100 },
    { id: 'RW', label: 'RW', cx: 235, cy: 150 },
    { id: 'CF', label: 'CF', cx: 245, cy: 100 },
];
const ALL_POSITIONS = ['GK', 'LB', 'CB-L', 'CB-R', 'RB', 'LM', 'CM-L', 'CM-R', 'RM', 'CAM', 'LW', 'ST', 'RW', 'CF'];

const MONTHS = [
    { v: '01', l: 'January' }, { v: '02', l: 'February' }, { v: '03', l: 'March' },
    { v: '04', l: 'April' }, { v: '05', l: 'May' }, { v: '06', l: 'June' },
    { v: '07', l: 'July' }, { v: '08', l: 'August' }, { v: '09', l: 'September' },
    { v: '10', l: 'October' }, { v: '11', l: 'November' }, { v: '12', l: 'December' },
];

const FIELD_STEP: Record<string, number> = {
    full_name: 0, nickname: 0, dob: 0, gender: 0, height: 0,
    birth_city: 0, birth_country: 0, nationality: 0, current_club: 0,
    current_club_country: 0, in_team_since: 0, agent: 0, guardian_name: 0,
    weight: 0, whatsapp: 0,
    modality: 1, positions: 1, foot: 1,
    photo: 2, video_url: 2,
    club_history: 3, transfer_history: 3, achievements: 3, competitions: 3, matches: 3,
    description: 4,
};

const parseYmd = (s?: string | null): Date | undefined => {
    if (!s) return undefined;
    const [y, m, d] = s.split('-').map(Number);
    if (!y || !m || !d) return undefined;
    return new Date(y, m - 1, d);
};
const calculateAge = (dob: string): number | null => {
    if (!dob) return null;
    const birth = parseYmd(dob);
    if (!birth || isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const mo = today.getMonth() - birth.getMonth();
    if (mo < 0 || (mo === 0 && today.getDate() < birth.getDate())) age--;
    return age;
};
const isValidVideoUrl = (url: string): boolean => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+/i.test(url);
const getEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
    return null;
};

interface PageProps {
    user: { name: string; dob: string | null; nationality: string | null; whatsapp: string | null };
    profile: Record<string, any> | null;
    countries?: { code: string; name: string; flag?: string }[];
}

const FieldError = ({ msg }: { msg?: string }) =>
    msg ? <p className="mt-1 text-xs text-red-500 font-sans">{msg}</p> : null;

function CountryCombobox({
    value,
    onChange,
    countries,
    placeholder = 'Select country',
}: {
    value: string;
    onChange: (v: string) => void;
    countries: { code: string; name: string; flag?: string }[];
    placeholder?: string;
}) {
    const [open, setOpen] = useState(false);
    const selected = countries.find((c) => c.code === value);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`group w-full h-11 justify-between rounded-xl font-normal bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#FF6B00] hover:bg-white dark:hover:bg-[#111111] transition-colors ${selected ? 'text-[#0F172A] dark:text-[#F5F5F5]' : 'text-[#94A3B8]'}`}
                >
                    <span className="flex items-center gap-2 truncate">
                        {selected ? (
                            <>
                                <span>{selected.flag ?? ''}</span>
                                <span className="truncate font-medium">{selected.name}</span>
                            </>
                        ) : (
                            placeholder
                        )}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-[#94A3B8] group-hover:text-[#FF6B00] transition-colors" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[--radix-popover-trigger-width] p-0 rounded-2xl border-[#E2E8F0] dark:border-[#2A2A2A] bg-white dark:bg-[#161616] shadow-xl shadow-black/5 dark:shadow-black/40 overflow-hidden"
                align="start"
                sideOffset={8}
            >
                <Command className="bg-transparent">
                    <CommandInput placeholder="Search country..." className="h-11" />
                    <CommandList className="max-h-64">
                        <CommandEmpty className="py-6 text-center text-sm text-[#94A3B8] font-sans">
                            No country found.
                        </CommandEmpty>
                        <CommandGroup>
                            {countries.map((c) => (
                                <CommandItem
                                    key={c.code}
                                    value={c.name}
                                    onSelect={() => { onChange(c.code); setOpen(false); }}
                                    className="cursor-pointer rounded-lg text-[#0F172A] dark:text-[#F5F5F5] aria-selected:bg-[#FFF3EB] dark:aria-selected:bg-[rgba(255,107,0,0.12)] aria-selected:text-[#0F172A] dark:aria-selected:text-[#F5F5F5]"
                                >
                                    <span className="mr-2">{c.flag ?? ''}</span>
                                    <span className="truncate">{c.name}</span>
                                    <Check className={`ml-auto h-4 w-4 text-[#FF6B00] ${value === c.code ? 'opacity-100' : 'opacity-0'}`} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

function DobCalendar({ value, onChange, onClose }: { value: string; onChange: (v: string) => void }) {
    const selectedDate = parseYmd(value);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const [viewMonth, setViewMonth] = useState<number>(selectedDate ? selectedDate.getMonth() : 0);
    const [viewYear, setViewYear] = useState<number>(selectedDate ? selectedDate.getFullYear() : 2005);
    const years = useMemo(() => {
        const arr: number[] = [];
        for (let y = today.getFullYear(); y >= 1950; y--) arr.push(y);
        return arr;
    }, []);
    const startWeekday = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    const isSelected = (d: number) => !!selectedDate && selectedDate.getFullYear() === viewYear && selectedDate.getMonth() === viewMonth && selectedDate.getDate() === d;
    const isToday = (d: number) => today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === d;
    const isFuture = (d: number) => new Date(viewYear, viewMonth, d) > today;
    const pick = (d: number) => { const mm = String(viewMonth + 1).padStart(2, '0'); const dd = String(d).padStart(2, '0'); onChange(`${viewYear}-${mm}-${dd}`); onClose(); };
    const selectClass = 'flex-1 rounded-lg border border-[#E2E8F0] dark:border-[#2A2A2A] bg-white dark:bg-[#111111] text-[#0F172A] dark:text-[#F5F5F5] text-sm font-medium px-2 py-2 focus:outline-none focus:ring-2 focus:ring-orange-100 dark:focus-ring-orange-800 focus:border-[#FF6B00] [color-scheme:light] dark:[color-scheme:dark] cursor-pointer';
    return (
        <div className="p-4 w-[320px]">
            <div className="flex items-center gap-2 mb-4">
                <select value={viewMonth} onChange={(e) => setViewMonth(Number(e.target.value))} className={selectClass}>
                    {MONTHS.map((m, i) => <option key={m.v} value={i}>{m.l}</option>)}
                </select>
                <select value={viewYear} onChange={(e) => setViewYear(Number(e.target.value))} className={`${selectClass} font-mono max-w-[90px]`}>
                    {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(w => (
                    <div key={w} className="text-center text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold py-1">{w}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {cells.map((d, i) => d === null ? <div key={`e-${i}`} /> : (
                    <button key={d} type="button" disabled={isFuture(d)} onClick={() => pick(d)}
                        className={`h-9 w-9 mx-auto flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                            ${isSelected(d) ? 'bg-[#FF6B00] text-white hover:bg-[#CC5500]' : isToday(d) ? 'text-[#FF6B00] font-bold  hover:bg-[#FFF3EB] dark:hover:bg-[rgba(255,107,0,0.12)]' : 'text-white dark:text-[#F5F5F5] hover:bg-[#FFF3EB] dark:hover:bg-[rgba(255,107,0,0.12)] hover:text-black dark:hover:text-black'}
                            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
                    >{d}</button>
                ))}
            </div>
        </div>
    );
}

export default function Edit() {
    const [step, setStep] = useState<number>(0);
    const currentYear = new Date().getFullYear();
    const page = usePage<PageProps>().props;
    const user = page.user ?? { name: '', dob: null, nationality: null };
    const profile = page.profile ?? null;
    const countries = page.countries ?? [];
    const [dobOpen, setDobOpen] = useState(false);
    // Club history year validation error state
    const [yearErrors, setYearErrors] = useState<{ [key: number]: string }>({});

    // Year format validation function
    const validateYearFormat = (idx: number, value: string, format: 'european' | 'brazilian') => {
        if (!value) {
            setYearErrors((prev) => ({ ...prev, [idx]: '' })); // empty hole error nei
            return;
        }

        if (format === 'european') {
            const regex = /^\d{2}\/\d{2}$/;
            if (!regex.test(value)) {
                setYearErrors((prev) => ({ ...prev, [idx]: 'Format must be: 26/27' }));
            } else {
                setYearErrors((prev) => ({ ...prev, [idx]: '' }));
            }
        } else if (format === 'brazilian') {
            const regex = /^\d{4}$/;
            if (!regex.test(value)) {
                setYearErrors((prev) => ({ ...prev, [idx]: 'Format must be: 2026' }));
            } else {
                setYearErrors((prev) => ({ ...prev, [idx]: '' }));
            }
        }
    };

    const { data, setData, post, processing, errors, transform } = useForm({
        full_name: profile?.full_name ?? user.name ?? '',
        dob: profile?.dob ?? user.dob ?? '',
        nationality: profile?.nationality ?? user.nationality ?? '',
        nickname: profile?.nickname ?? '',
        gender: profile?.gender ?? 'M',
        height: profile?.height != null ? String(profile.height) : '',
        weight: profile?.weight != null ? String(profile.weight) : '',
        birth_city: profile?.birth_city ?? '',
        birth_country: profile?.birth_country ?? '',
        current_club: profile?.current_club ?? '',
        current_club_country: profile?.current_club_country ?? '',
        in_team_since: profile?.in_team_since ?? '',
        agent: profile?.agent ?? '',
        guardian_name: profile?.guardian_name ?? '',
        whatsapp: user?.whatsapp ?? profile?.whatsapp ?? '',
        modality: profile?.modality ?? 'Football',
        positions: (profile?.positions ?? []) as string[],
        foot: profile?.foot ?? 'Right',
        photo: null as File | null,
        photo_preview: profile?.photo_url ?? '',
        video_url: profile?.video_url ?? '',
        club_history: (profile?.club_history?.length ? profile.club_history.map((h: any) => ({ year: h.year ?? '', club: h.club ?? '', country: h.country ?? '' })) : [{ year: new Date().getFullYear(), club: '', country: '' }]) as any[],
        transfer_history: (profile?.transfer_history?.length ? profile.transfer_history.map((h: any) => ({ year: h.year ?? '', club: h.club ?? '', country: h.country ?? '' })) : []) as any[],
        achievements: (profile?.achievements?.length ? profile.achievements.map((a: any) => ({ year: a.year ?? '', title: a.title ?? '' })) : []) as any[],
        competitions: (profile?.competitions?.length ? profile.competitions.map((c: any) => ({ name: c.name ?? '', year: c.year ?? '' })) : []) as any[],
        matches: (profile?.matches?.length ? profile.matches.map((m: any) => ({ home: m.home ?? '', score: m.score ?? '', away: m.away ?? '', goals: m.goals ?? '', assists: m.assists ?? '', minutes: m.minutes ?? '' })) : []) as any[],
        description: profile?.description ?? '',
    });

    transform((d) => { const { photo_preview, ...rest } = d as any; return rest; });

    const age = useMemo(() => calculateAge(data.dob), [data.dob]);
    const isMinor = age !== null && age < 18;
    const descCount = data.description.length;
    const videoValid = isValidVideoUrl(data.video_url);
    const embedUrl = useMemo(() => getEmbedUrl(data.video_url), [data.video_url]);

    const itsInit = (profile?.in_team_since ?? '').split('-');
    const [itsYear, setItsYear] = useState<string>(itsInit[0] || '');
    const [itsMonth, setItsMonth] = useState<string>(itsInit[1] || '');
    const yearOptions = useMemo(() => Array.from({ length: currentYear - 1990 + 1 }, (_, i) => String(currentYear - i)), [currentYear]);
    const setInTeamSince = (year: string, month: string) => { setItsYear(year); setItsMonth(month); setData('in_team_since', year && month ? `${year}-${month}` : ''); };

    const togglePosition = (id: string) => {
        if (data.positions.includes(id)) setData('positions', data.positions.filter(p => p !== id));
        else if (data.positions.length < 3) setData('positions', [...data.positions, id]);
    };

    // generic updaters for each list
    const updateClubHistory = (idx: number, field: string, value: string) => { const copy = [...data.club_history]; copy[idx] = { ...copy[idx], [field]: value }; setData('club_history', copy); };
    const addClubRow = () => {
        setData(prev => ({
            ...prev,
            club_history: [
                ...prev.club_history,
                { year: '', club: '', country: '', year_type: 'european' }
            ]
        }));
        // নতুন row-এর জন্য error clear
        setYearErrors(prev => ({ ...prev, [prev.club_history.length]: '' }));
    };
    const removeClubRow = (idx: number) => setData('club_history', data.club_history.filter((_, i) => i !== idx));

    const updateTransferHistory = (idx: number, field: string, value: string) => { const copy = [...data.transfer_history]; copy[idx] = { ...copy[idx], [field]: value }; setData('transfer_history', copy); };
    const addTransferRow = () => setData('transfer_history', [...data.transfer_history, { year: '', club: '', country: '' }]);
    const removeTransferRow = (idx: number) => setData('transfer_history', data.transfer_history.filter((_, i) => i !== idx));

    const updateAchievement = (idx: number, field: string, value: string) => { const copy = [...data.achievements]; copy[idx] = { ...copy[idx], [field]: value }; setData('achievements', copy); };
    const addAchievementRow = () => setData('achievements', [...data.achievements, { year: '', title: '' }]);
    const removeAchievementRow = (idx: number) => setData('achievements', data.achievements.filter((_, i) => i !== idx));

    const updateCompetition = (idx: number, field: string, value: string) => { const copy = [...data.competitions]; copy[idx] = { ...copy[idx], [field]: value }; setData('competitions', copy); };
    const addCompetitionRow = () => setData('competitions', [...data.competitions, { name: '', year: '' }]);
    const removeCompetitionRow = (idx: number) => setData('competitions', data.competitions.filter((_, i) => i !== idx));

    const updateMatch = (idx: number, field: string, value: string) => { const copy = [...data.matches]; copy[idx] = { ...copy[idx], [field]: value }; setData('matches', copy); };
    const addMatchRow = () => setData('matches', [...data.matches, { home: '', score: '', away: '', goals: '', assists: '', minutes: '' }]);
    const removeMatchRow = (idx: number) => setData('matches', data.matches.filter((_, i) => i !== idx));

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { setData('photo', file); const reader = new FileReader(); reader.onload = (ev) => setData('photo_preview', ev.target?.result as string); reader.readAsDataURL(file); }
    };

    const goNext = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
    const goBack = () => setStep(s => Math.max(s - 1, 0));

    const submit = () => {
        post(route('player.profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onError: (errs) => {
                const steps = Object.keys(errs).map((k) => FIELD_STEP[k.split('.')[0]] ?? 99).filter((n) => n !== 99);
                if (steps.length) setStep(Math.min(...steps));
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] pt-16 pb-32">
            <PlayerNavbar />
            <div className="bg-[#0D0D0D] border-b border-[#2A2A2A] sticky top-16 z-20 px-4 sm:px-8 py-4">
                <div className="max-w-[720px] mx-auto">
                    <div className="flex items-center">
                        {STEPS.map((s, idx) => {
                            const completed = idx < step;
                            const active = idx === step;
                            return (
                                <React.Fragment key={s.id}>
                                    <button onClick={() => setStep(idx)} className="flex-shrink-0 focus:outline-none" type="button">
                                        {completed || active ? (
                                            <div className="w-7 h-7 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-xs font-bold font-sans">
                                                {completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                                            </div>
                                        ) : (
                                            <div className="w-7 h-7 border-2 border-[#2A2A2A] text-[#94A3B8] rounded-full flex items-center justify-center text-xs font-bold font-sans">{idx + 1}</div>
                                        )}
                                    </button>
                                    {idx < STEPS.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-1 sm:mx-2 ${idx < step ? 'bg-[#FF6B00]' : 'bg-[#2A2A2A]'}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <div className="hidden sm:flex items-center justify-between mt-3">
                        {STEPS.map((s, idx) => (
                            <div key={s.id} className={`text-[10px] uppercase tracking-widest font-semibold font-sans ${idx === step ? 'text-[#FF6B00]' : 'text-[#94A3B8]'}`}
                                style={{ width: `${100 / STEPS.length}%`, textAlign: idx === 0 ? 'left' : idx === STEPS.length - 1 ? 'right' : 'center' }}>
                                {s.label}
                            </div>
                        ))}
                    </div>
                    <div className="sm:hidden mt-3 text-center">
                        <div className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#FF6B00]">
                            Step {step + 1} of {STEPS.length} — {STEPS[step].label}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[720px] mx-auto px-4 py-8">
                {step === 0 && (
                    <section>
                        <div className="text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans">01 / Basic Information</div>
                        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
                                <div>
                                    <Label htmlFor="full_name" className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Full Name <span className="text-[#FF6B00]">*</span></Label>
                                    <Input id="full_name" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} placeholder="John Smith" className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" />
                                    <FieldError msg={errors.full_name} />
                                </div>
                                <div>
                                    <Label htmlFor="nickname" className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Nickname</Label>
                                    <Input id="nickname" value={data.nickname} onChange={(e) => setData('nickname', e.target.value)} placeholder="Optional" className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Date of Birth <span className="text-[#FF6B00]">*</span></Label>
                                    <div className="flex items-center gap-3">
                                        <Popover open={dobOpen} onOpenChange={setDobOpen}>
                                            <PopoverTrigger asChild>
                                                <Button type="button" variant="outline" className={`group flex-1 h-11 justify-start text-left font-normal rounded-xl bg-[#111111] border-[#2A2A2A] text-white`}>
                                                    <CalendarIcon className="mr-2.5 h-4 w-4 text-[#94A3B8] group-hover:text-[#FF6B00] transition-colors" />
                                                    <span className={data.dob ? 'font-medium' : ''}>{data.dob ? format(parseYmd(data.dob)!, 'MMMM d, yyyy') : 'Select date of birth'}</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 rounded-2xl border-[#2A2A2A] bg-[#1e1e1e] shadow-xl shadow-black/40 overflow-hidden" align="start" sideOffset={8}>
                                                <DobCalendar value={data.dob} onChange={(v) => setData('dob', v)} onClose={() => setDobOpen(false)} />
                                            </PopoverContent>
                                        </Popover>
                                        {age !== null && <div className="flex-shrink-0 bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] rounded-full px-3 py-1 text-xs font-bold font-mono whitespace-nowrap">{age} yrs</div>}
                                    </div>
                                    <FieldError msg={errors.dob} />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Gender</Label>
                                    <RadioGroup value={data.gender} onValueChange={(v) => setData('gender', v)} className="flex gap-4 h-10 items-center">
                                        {['M', 'F', 'Other'].map((g) => (
                                            <div key={g} className="flex items-center gap-2">
                                                <RadioGroupItem value={g} id={`gender-${g}`} className="border-[#2A2A2A] text-[#FF6B00]" />
                                                <Label htmlFor={`gender-${g}`} className="text-sm text-[#F5F5F5] font-sans cursor-pointer">{g}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <FieldError msg={errors.gender} />
                                </div>
                                <div>
                                    <Label htmlFor="height" className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Height (cm)</Label>
                                    <Input id="height" type="number" value={data.height} onChange={(e) => setData('height', e.target.value)} placeholder="178" className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] font-mono focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" />
                                    <FieldError msg={errors.height} />
                                </div>
                                <div>
                                    <Label htmlFor="weight" className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Weight (kg)</Label>
                                    <Input id="weight" type="number" value={data.weight} onChange={(e) => setData('weight', e.target.value)} placeholder="67" className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] font-mono focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" />
                                    <FieldError msg={errors.weight} />
                                </div>
                                <div>
                                    <Label htmlFor="birth_city" className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Birthplace City</Label>
                                    <Input id="birth_city" value={data.birth_city} onChange={(e) => setData('birth_city', e.target.value)} placeholder="City" className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Birthplace Country</Label>
                                    <CountryCombobox value={data.birth_country} onChange={(v) => setData('birth_country', v)} countries={countries} placeholder="Select country" />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Nationality <span className="text-[#FF6B00]">*</span></Label>
                                    <CountryCombobox value={data.nationality} onChange={(v) => setData('nationality', v)} countries={countries} placeholder="Select nationality" />
                                    <FieldError msg={errors.nationality} />
                                </div>
                                <div>
                                    <Label htmlFor="current_club" className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Current Club</Label>
                                    <Input id="current_club" value={data.current_club} onChange={(e) => setData('current_club', e.target.value)} placeholder="Club name" className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Club Country</Label>
                                    <CountryCombobox value={data.current_club_country} onChange={(v) => setData('current_club_country', v)} countries={countries} placeholder="Select country" />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">In Team Since (MM/YYYY)</Label>
                                    <div className="flex gap-3">
                                        <Select value={itsMonth || undefined} onValueChange={(v) => setInTeamSince(itsYear, v)}>
                                            <SelectTrigger className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]"><SelectValue placeholder="Month" /></SelectTrigger>
                                            <SelectContent className="bg-[#161616] border-[#2A2A2A] max-h-72">
                                                {MONTHS.map((m) => <SelectItem key={m.v} value={m.v} className="text-[#F5F5F5]">{m.l}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <Select value={itsYear || undefined} onValueChange={(v) => setInTeamSince(v, itsMonth)}>
                                            <SelectTrigger className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] font-mono w-28"><SelectValue placeholder="Year" /></SelectTrigger>
                                            <SelectContent className="bg-[#161616] border-[#2A2A2A] max-h-72">
                                                {yearOptions.map((y) => <SelectItem key={y} value={y} className="text-[#F5F5F5] font-mono">{y}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <FieldError msg={errors.in_team_since} />
                                </div>
                                <div>
                                    <Label htmlFor="whatsapp" className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">WhatsApp Number</Label>
                                    <Input id="whatsapp" value={data.whatsapp} onChange={(e) => setData('whatsapp', e.target.value)} placeholder="+8801700000000" className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] font-mono focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" />
                                </div>
                                <div className="lg:col-span-2">
                                    <Label htmlFor="agent" className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Agent / Representative <span className="text-[#94A3B8] font-normal">(optional)</span></Label>
                                    <Input id="agent" value={data.agent} onChange={(e) => setData('agent', e.target.value)} placeholder="Agent or agency name" className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" />
                                </div>
                            </div>
                            {isMinor && (
                                <div className="mt-6">
                                    <Alert className="bg-amber-950 border-amber-700"><AlertTriangle className="h-4 w-4 text-amber-400" /><AlertDescription className="text-amber-200 text-sm font-sans">Player is under 18. This profile must be managed by a parent or legal guardian.</AlertDescription></Alert>
                                    <div className="mt-4">
                                        <Label htmlFor="guardian_name" className="text-xs font-semibold text-[#F5F5F5] mb-2 block font-sans">Guardian Name <span className="text-[#FF6B00]">*</span></Label>
                                        <Input id="guardian_name" value={data.guardian_name} onChange={(e) => setData('guardian_name', e.target.value)} placeholder="Parent or legal guardian's full name" className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" />
                                        <FieldError msg={errors.guardian_name} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {step === 1 && (
                    <section>
                        <div className="text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans">02 / Football Details</div>
                        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                            <div className="mb-8">
                                <Label className="text-xs font-semibold text-[#F5F5F5] mb-3 block font-sans">Modality</Label>
                                <div className="flex flex-wrap gap-3">
                                    {MODALITIES.map((m) => {
                                        const selected = data.modality === m;
                                        return (
                                            <button key={m} type="button" onClick={() => setData('modality', m)}
                                                className={`px-5 py-2.5 rounded-full text-sm font-semibold font-sans transition-colors ${selected ? 'bg-[#FF6B00] text-white border-0' : 'bg-[#1F1F1F] border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#FF6B00]'}`}>
                                                {m}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="mb-8">
                                <Label className="text-xs font-semibold text-[#F5F5F5] mb-3 block font-sans">Position <span className="text-[#94A3B8] font-normal">(up to 3)</span></Label>
                                {/* pitch SVG same as before */}
                                <div className="hidden md:block">
                                    <div className="flex justify-center bg-[#0F172A] rounded-2xl p-4">
                                        <svg viewBox="0 0 300 200" className="w-full max-w-[400px] h-auto">
                                            <rect x="0" y="0" width="300" height="200" fill="#1a3a1a" />
                                            <rect x="2" y="2" width="296" height="196" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                            <line x1="150" y1="2" x2="150" y2="198" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                            <circle cx="150" cy="100" r="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                            <rect x="2" y="55" width="40" height="90" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                            <rect x="258" y="55" width="40" height="90" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                            <rect x="2" y="75" width="15" height="50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                            <rect x="283" y="75" width="15" height="50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                            {POSITION_ZONES.map((p) => {
                                                const selected = data.positions.includes(p.id);
                                                return (
                                                    <g key={p.id} onClick={() => togglePosition(p.id)} style={{ cursor: 'pointer' }} className="group">
                                                        <circle cx={p.cx} cy={p.cy} r="14" fill={selected ? 'rgba(255,107,0,0.85)' : 'transparent'} stroke={selected ? '#FF6B00' : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" className="group-hover:fill-[rgba(255,107,0,0.3)] transition-colors" />
                                                        <text x={p.cx} y={p.cy} textAnchor="middle" dominantBaseline="central" fontSize="8" fontWeight="700" fill={selected ? '#FFFFFF' : 'rgba(255,255,255,0.7)'} style={{ pointerEvents: 'none' }}>{p.label}</text>
                                                    </g>
                                                );
                                            })}
                                        </svg>
                                    </div>
                                </div>
                                <div className="md:hidden grid grid-cols-3 gap-3">
                                    {ALL_POSITIONS.map((id) => {
                                        const selected = data.positions.includes(id);
                                        return (
                                            <label key={id} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${selected ? 'bg-[rgba(255,107,0,0.12)] border-[#FF6B00]' : 'bg-[#1F1F1F] border-[#2A2A2A]'}`}>
                                                <Checkbox checked={selected} onCheckedChange={() => togglePosition(id)} className="border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]" />
                                                <span className={`text-xs font-semibold font-sans ${selected ? 'text-[#CC5500]' : 'text-[#F5F5F5]'}`}>{id}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans mr-1">Selected:</span>
                                    {data.positions.length === 0 && <span className="text-xs text-[#94A3B8] italic font-sans">None — up to 3 positions</span>}
                                    {data.positions.map((id) => (
                                        <span key={id} className="inline-flex items-center gap-1.5 bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] rounded-full px-3 py-1 text-xs font-bold font-mono">
                                            {id}
                                            <button type="button" onClick={() => togglePosition(id)} className="hover:opacity-70"><Trash2 className="w-3 h-3" /></button>
                                        </span>
                                    ))}
                                </div>
                                <FieldError msg={errors.positions} />
                            </div>
                            <div>
                                <Label className="text-xs font-semibold text-[#F5F5F5] mb-3 block font-sans">Dominant Foot</Label>
                                <RadioGroup value={data.foot} onValueChange={(v) => setData('foot', v)} className="flex flex-col sm:flex-row gap-4">
                                    {['Right', 'Left', 'Ambidextrous'].map((f) => (
                                        <div key={f} className="flex items-center gap-2">
                                            <RadioGroupItem value={f} id={`foot-${f}`} className="border-[#2A2A2A] text-[#FF6B00]" />
                                            <Label htmlFor={`foot-${f}`} className="text-sm text-[#F5F5F5] font-sans cursor-pointer">{f}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <div className="text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans">03 / Media</div>
                        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 space-y-8">
                            <div>
                                <Label className="text-xs font-semibold text-[#F5F5F5] mb-3 block font-sans">Profile Photo</Label>
                                {data.photo_preview ? (
                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <img src={data.photo_preview} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-[#FF6B00]" />
                                        <div className="flex flex-col gap-2">
                                            <label className="cursor-pointer">
                                                <Button type="button" variant="outline" className="border-[#2A2A2A] text-[#F5F5F5] hover:border-[#FF6B00] hover:text-[#FF6B00] bg-[#1F1F1F]" onClick={() => document.getElementById('photo-input')?.click()}>Change Photo</Button>
                                                <input id="photo-input" type="file" accept="image/jpeg,image/png" onChange={handlePhotoUpload} className="hidden" />
                                            </label>
                                            <button type="button" onClick={() => { setData('photo', null); setData('photo_preview', ''); }} className="text-xs text-[#94A3B8] hover:text-red-500 font-sans">Remove</button>
                                        </div>

                                    </div>
                                ) : (
                                    <label className="block cursor-pointer">
                                        <div className="border-2 border-dashed border-[#2A2A2A] hover:border-[#FF6B00] rounded-2xl p-12 text-center transition-colors">
                                            <Upload className="w-8 h-8 text-[#94A3B8] mx-auto mb-3" />
                                            <div className="font-semibold text-[#F5F5F5] font-sans mb-1">Upload Profile Photo</div>
                                            <div className="text-xs text-[#94A3B8] font-sans">JPG, PNG up to 5MB</div>
                                            <span className='text-white'>Recommended Image Size: 200 × 300 px </span>
                                        </div>
                                        <input type="file" accept="image/jpeg,image/png" onChange={handlePhotoUpload} className="hidden" />
                                    </label>
                                )}
                                <FieldError msg={errors.photo} />
                            </div>
                            <div>
                                <Label htmlFor="video_url" className="text-xs font-semibold text-[#F5F5F5] mb-3 block font-sans">Highlight Video URL</Label>
                                <div className="relative">
                                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6B00] pointer-events-none" />
                                    <Input id="video_url" value={data.video_url} onChange={(e) => setData('video_url', e.target.value)} placeholder="YouTube or Vimeo URL"
                                        className="pl-10 pr-10 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" />
                                    {videoValid && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
                                </div>
                                {videoValid && embedUrl && (
                                    <div className="mt-4 aspect-video bg-[#0F172A] rounded-xl overflow-hidden">
                                        <iframe src={embedUrl} title="Highlight preview" className="w-full h-full" allowFullScreen />
                                    </div>
                                )}
                                {!videoValid && data.video_url.length > 0 && (
                                    <div className="mt-2 text-xs text-red-500 font-sans">Please enter a valid YouTube or Vimeo URL.</div>
                                )}
                                <FieldError msg={errors.video_url} />
                            </div>
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <div className="text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans">04 / Career History</div>
                        <div className="space-y-8">
                            {/* Club History */}
                            {/* Club History */}
                            <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                                <h3 className="text-sm font-bold text-[#F5F5F5] mb-4 font-sans">Club History</h3>

                                {/* Header Row */}
                                <div className="grid grid-cols-[110px_80px_minmax(0,1fr)_130px_40px] gap-3 items-center mb-2">
                                    <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">
                                        Format
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">
                                        Year
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">
                                        Club Name
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">
                                        Country
                                    </span>
                                    <span className="w-10" />
                                </div>

                                {data.club_history.map((row: any, idx: number) => {
                                    const yearType = row.year_type || 'european';
                                    const yearError = yearErrors[idx] || '';

                                    return (
                                        <div key={idx} className="mb-3">
                                            <div className="grid grid-cols-[110px_80px_minmax(0,1fr)_130px_40px] gap-3 items-start">
                                                {/* Year Format Dropdown */}
                                                <select
                                                    value={yearType}
                                                    onChange={(e) => {
                                                        const newType = e.target.value;
                                                        updateClubHistory(idx, 'year_type', newType);
                                                        setYearErrors((prev) => ({ ...prev, [idx]: '' }));
                                                    }}
                                                    className="h-10 w-full rounded-lg border border-[#2A2A2A] bg-[#111111] px-2 text-xs text-[#F5F5F5] focus:border-[#FF6B00] focus:outline-none font-sans"
                                                >
                                                    <option value="european">European (26/27)</option>
                                                    <option value="brazilian">Brazilian (2026)</option>
                                                </select>

                                                {/* Year Input */}
                                                {yearType === 'european' ? (
                                                    <Input
                                                        type="text"
                                                        value={row.year ?? ''}
                                                        onChange={(e) => {
                                                            updateClubHistory(idx, 'year', e.target.value);
                                                            validateYearFormat(idx, e.target.value, 'european');
                                                        }}
                                                        placeholder="26/27"
                                                        className="h-10 w-full bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] font-mono focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                                    />
                                                ) : (
                                                    <Input
                                                        type="number"
                                                        value={row.year ?? ''}
                                                        onChange={(e) => {
                                                            updateClubHistory(idx, 'year', e.target.value);
                                                            validateYearFormat(idx, e.target.value, 'brazilian');
                                                        }}
                                                        placeholder="2026"
                                                        className="h-10 w-full bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] font-mono focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                                    />
                                                )}

                                                {/* Club Name */}
                                                <Input
                                                    value={row.club}
                                                    onChange={(e) => updateClubHistory(idx, 'club', e.target.value)}
                                                    placeholder="Club name"
                                                    className="h-10 w-full bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                                />

                                                {/* Country */}
                                                <select
                                                    value={row.country ?? ''}
                                                    onChange={(e) => updateClubHistory(idx, 'country', e.target.value)}
                                                    className="h-10 w-full rounded-lg border border-[#2A2A2A] bg-[#111111] px-2 text-sm text-[#F5F5F5] focus:border-[#FF6B00] focus:outline-none font-sans"
                                                >
                                                    <option value="">Country...</option>
                                                    {countries.map((c) => (
                                                        <option key={c.code} value={c.code}>
                                                            {c.flag ?? ''} {c.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* Add / Remove Button */}
                                                {idx === 0 ? (
                                                    <button
                                                        type="button"
                                                        onClick={addClubRow}
                                                        className="h-10 w-10 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#FF6B00] hover:border-[#FF6B00] hover:bg-[rgba(255,107,0,0.12)]"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeClubRow(idx)}
                                                        className="h-10 w-10 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#94A3B8] hover:border-red-400 hover:text-red-500"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Year format error message */}
                                            {yearError && (
                                                <p className="mt-1 ml-[198px] text-xs text-red-400">
                                                    ⚠️ {yearError}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Transfer History */}
                            {/* <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                                <h3 className="text-sm font-bold text-[#F5F5F5] mb-4 font-sans">Transfer History</h3>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-24 flex-shrink-0 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Year</span>
                                    <span className="flex-1 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Club</span>
                                    <span className="flex-1 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Country</span>
                                    <span className="w-10 flex-shrink-0" />
                                </div>
                                {data.transfer_history.map((row: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 mb-2">
                                        <Input type="number" value={row.year ?? ''} onChange={(e) => updateTransferHistory(idx, 'year', e.target.value)} placeholder="Year" className="w-24 flex-shrink-0 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] font-mono" />
                                        <Input value={row.club} onChange={(e) => updateTransferHistory(idx, 'club', e.target.value)} placeholder="Club" className="flex-1 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <select value={row.country ?? ''} onChange={(e) => updateTransferHistory(idx, 'country', e.target.value)} className="flex-1 h-10 rounded-lg border border-[#2A2A2A] bg-[#111111] px-2 text-sm text-[#F5F5F5] focus:border-[#FF6B00] focus:outline-none">
                                            <option value="">Country...</option>
                                            {countries.map((c) => <option key={c.code} value={c.code}>{c.flag ?? ''} {c.name}</option>)}
                                        </select>
                                        <button type="button" onClick={() => removeTransferRow(idx)} className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#94A3B8] hover:border-red-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={addTransferRow} className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#FF6B00] hover:text-[#CC5500]"><Plus className="w-4 h-4" /> Add row</button>
                            </div> */}

                            {/* Achievements */}
                            <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                                <h3 className="text-sm font-bold text-[#F5F5F5] mb-4 font-sans">Achievements</h3>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-24 flex-shrink-0 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Year</span>
                                    <span className="flex-1 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Title</span>
                                    <span className="w-10 flex-shrink-0" />
                                </div>
                                {data.achievements.map((row: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 mb-2">
                                        <Input value={row.year ?? ''} onChange={(e) => updateAchievement(idx, 'year', e.target.value)} placeholder="Year" className="w-24 flex-shrink-0 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <Input value={row.title ?? ''} onChange={(e) => updateAchievement(idx, 'title', e.target.value)} placeholder="Title" className="flex-1 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <button type="button" onClick={() => removeAchievementRow(idx)} className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#94A3B8] hover:border-red-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={addAchievementRow} className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#FF6B00] hover:text-[#CC5500]"><Plus className="w-4 h-4" /> Add row</button>
                            </div>

                            {/* Competition History */}
                            <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                                <h3 className="text-sm font-bold text-[#F5F5F5] mb-4 font-sans">Competition History</h3>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-24 flex-shrink-0 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Year</span>
                                    <span className="flex-1 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Competition</span>
                                    <span className="w-10 flex-shrink-0" />
                                </div>
                                {data.competitions.map((row: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 mb-2">
                                        <Input value={row.year ?? ''} onChange={(e) => updateCompetition(idx, 'year', e.target.value)} placeholder="Year" className="w-24 flex-shrink-0 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <Input value={row.name ?? ''} onChange={(e) => updateCompetition(idx, 'name', e.target.value)} placeholder="Competition" className="flex-1 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <button type="button" onClick={() => removeCompetitionRow(idx)} className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#94A3B8] hover:border-red-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={addCompetitionRow} className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#FF6B00] hover:text-[#CC5500]"><Plus className="w-4 h-4" /> Add row</button>
                            </div>

                            {/* Recent Matches */}
                            <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                                <h3 className="text-sm font-bold text-[#F5F5F5] mb-4 font-sans">Recent Matches</h3>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-24 flex-shrink-0 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Home</span>
                                    <span className="w-20 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Score</span>
                                    <span className="w-24 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Away</span>
                                    <span className="w-14 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">G</span>
                                    <span className="w-14 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">A</span>
                                    <span className="w-20 text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans">Min</span>
                                    <span className="w-6" />
                                </div>
                                {data.matches.map((row: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2 mb-2">
                                        <Input value={row.home ?? ''} onChange={(e) => updateMatch(idx, 'home', e.target.value)} placeholder="Home" className="w-24 flex-shrink-0 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <Input value={row.score ?? ''} onChange={(e) => updateMatch(idx, 'score', e.target.value)} placeholder="0-0" className="w-20 flex-shrink-0 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <Input value={row.away ?? ''} onChange={(e) => updateMatch(idx, 'away', e.target.value)} placeholder="Away" className="w-24 flex-shrink-0 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <Input value={row.goals ?? ''} onChange={(e) => updateMatch(idx, 'goals', e.target.value)} placeholder="0" type="number" className="w-14 flex-shrink-0 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <Input value={row.assists ?? ''} onChange={(e) => updateMatch(idx, 'assists', e.target.value)} placeholder="0" type="number" className="w-14 flex-shrink-0 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <Input value={row.minutes ?? ''} onChange={(e) => updateMatch(idx, 'minutes', e.target.value)} placeholder="90'" className="w-16 flex-shrink-0 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]" />
                                        <button type="button" onClick={() => removeMatchRow(idx)} className="flex-shrink-0 h-10 w-6 flex items-center justify-center text-[#94A3B8] hover:text-red-500"><X className="w-3 h-3" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={addMatchRow} className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#FF6B00] hover:text-[#CC5500]"><Plus className="w-4 h-4" /> Add match</button>
                            </div>
                        </div>
                    </section>
                )}

                {step === 4 && (
                    <section>
                        <div className="text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans">05 / About You</div>
                        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                            <Label htmlFor="description" className="text-xs font-semibold text-[#F5F5F5] mb-3 block font-sans">Description</Label>
                            <Textarea id="description" rows={5} maxLength={500} value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Describe your playing style, strengths, and football journey..." className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00] resize-none" />
                            <div className="flex justify-between mt-2">
                                <FieldError msg={errors.description} />
                                <span className={`text-xs font-mono ${descCount > 450 ? 'text-[#FF6B00] font-bold' : 'text-[#94A3B8]'}`}>{descCount} / 500</span>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Sticky Bottom */}
            <div className="bg-[#0D0D0D] border-t border-[#2A2A2A] fixed bottom-0 left-0 right-0 z-20 h-[68px] px-4 sm:px-8 flex items-center justify-between">
                <div className="hidden sm:flex items-center gap-2">
                    {/* <CheckCircle2 className="text-green-500 w-4 h-4" />
                    <span className="text-xs text-[#94A3B8] font-sans">Draft saved 2 min ago</span> */}
                </div>
                <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                    <Button type="button" variant="ghost" onClick={goBack} disabled={step === 0} className="text-[#9A9A9A] hover:text-[#F5F5F5] hover:bg-[#1F1F1F] disabled:opacity-30"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
                    <Button type="button" variant="outline" className="border-[#2A2A2A] text-[#F5F5F5] hover:border-[#FF6B00] hover:text-[#FF6B00] bg-[#1F1F1F]">Save Draft</Button>
                    {step < STEPS.length - 1 ? (
                        <Button type="button" onClick={goNext} className="bg-[#FF6B00] text-white hover:bg-[#CC5500]">Next <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    ) : (
                        <Button type="button" disabled={processing} onClick={submit} className="bg-[#FF6B00] text-white hover:bg-[#CC5500]">Save & Publish <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    )}
                </div>
            </div>
        </div>
    );
}
