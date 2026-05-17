import React, { useState, useMemo } from 'react';
import { Link, useForm } from '@inertiajs/react';
import PlayerNavbar from '@/components/player/PlayerNavbar';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import {
    Upload,
    Youtube,
    CheckCircle2,
    Trash2,
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    Plus,
} from 'lucide-react';

// TODO: Replace with usePage().props
const COUNTRIES = [
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'GB', name: 'England', flag: '🇬🇧' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
];

const STEPS = [
    { id: 0, label: 'Basic Info' },
    { id: 1, label: 'Football' },
    { id: 2, label: 'Media' },
    { id: 3, label: 'History' },
    { id: 4, label: 'About' },
];

const MODALITIES = ['Football', 'Futsal', 'Beach Soccer'];

const POSITION_ZONES = [
    { id: 'GK',    label: 'GK',    cx: 30,  cy: 100 },
    { id: 'LB',    label: 'LB',    cx: 75,  cy: 40  },
    { id: 'CB-L',  label: 'CB',    cx: 80,  cy: 80  },
    { id: 'CB-R',  label: 'CB',    cx: 80,  cy: 120 },
    { id: 'RB',    label: 'RB',    cx: 75,  cy: 160 },
    { id: 'LM',    label: 'LM',    cx: 145, cy: 40  },
    { id: 'CM-L',  label: 'CM',    cx: 145, cy: 80  },
    { id: 'CM-R',  label: 'CM',    cx: 145, cy: 120 },
    { id: 'RM',    label: 'RM',    cx: 145, cy: 160 },
    { id: 'CAM',   label: 'CAM',   cx: 200, cy: 100 },
    { id: 'LW',    label: 'LW',    cx: 235, cy: 50  },
    { id: 'ST',    label: 'ST',    cx: 260, cy: 100 },
    { id: 'RW',    label: 'RW',    cx: 235, cy: 150 },
    { id: 'CF',    label: 'CF',    cx: 245, cy: 100 },
];

const ALL_POSITIONS = ['GK','LB','CB-L','CB-R','RB','LM','CM-L','CM-R','RM','CAM','LW','ST','RW','CF'];

const calculateAge = (dob: string): number | null => {
    if (!dob) return null;
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
};

const isValidVideoUrl = (url: string): boolean => {
    if (!url) return false;
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+/i.test(url);
};

const getEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
    return null;
};

export default function Edit() {
    const [step, setStep] = useState<number>(0);
    const currentYear = new Date().getFullYear();

    // TODO: Replace with usePage().props for initial data
    const { data, setData, processing } = useForm({
        full_name: 'Lucas Henrique Silva',
        nickname: 'Luquinhas',
        dob: '2008-03-14',
        gender: 'M',
        height: '178',
        birth_city: 'São Paulo',
        birth_country: 'BR',
        nationality: 'BR',
        current_club: 'Santos FC U-17',
        in_team_since: '2024-01',
        agent: '',
        guardian_name: '',
        modality: 'Football',
        positions: ['CAM', 'ST'] as string[],
        foot: 'Right',
        photo: null as File | null,
        photo_preview: '',
        video_url: '',
        club_history: Array.from({ length: currentYear - 2020 + 1 }, (_, i) => ({
            year: 2020 + i,
            club: i === 0 ? 'Portuguesa Santista U-13' : i === 1 ? 'Portuguesa Santista U-14' : i === 2 ? 'Santos FC U-15' : i === 3 ? 'Santos FC U-15' : i === 4 ? 'Santos FC U-16' : 'Santos FC U-17',
        })),
        description: '',
    });

    const age = useMemo(() => calculateAge(data.dob), [data.dob]);
    const isMinor = age !== null && age < 18;
    const descCount = data.description.length;
    const videoValid = isValidVideoUrl(data.video_url);
    const embedUrl = useMemo(() => getEmbedUrl(data.video_url), [data.video_url]);

    const togglePosition = (id: string) => {
        if (data.positions.includes(id)) {
            setData('positions', data.positions.filter(p => p !== id));
        } else if (data.positions.length < 3) {
            setData('positions', [...data.positions, id]);
        }
    };

    const updateClubHistory = (idx: number, club: string) => {
        const copy = [...data.club_history];
        copy[idx] = { ...copy[idx], club };
        setData('club_history', copy);
    };

    const clearClubHistory = (idx: number) => {
        const copy = [...data.club_history];
        copy[idx] = { ...copy[idx], club: '' };
        setData('club_history', copy);
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onload = (ev) => setData('photo_preview', ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const goNext = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
    const goBack = () => setStep(s => Math.max(s - 1, 0));

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0D0D0D] pt-16 pb-32">
            <PlayerNavbar />

            {/* STICKY PROGRESS HEADER */}
            <div className="bg-white dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#2A2A2A] sticky top-16 z-20 px-4 sm:px-8 py-4">
                <div className="max-w-[720px] mx-auto">
                    <div className="flex items-center">
                        {STEPS.map((s, idx) => {
                            const completed = idx < step;
                            const active = idx === step;
                            return (
                                <React.Fragment key={s.id}>
                                    <button
                                        onClick={() => setStep(idx)}
                                        className="flex-shrink-0 focus:outline-none"
                                        type="button"
                                    >
                                        {completed || active ? (
                                            <div className="w-7 h-7 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-xs font-bold font-sans">
                                                {completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                                            </div>
                                        ) : (
                                            <div className="w-7 h-7 border-2 border-[#E2E8F0] dark:border-[#2A2A2A] text-[#94A3B8] rounded-full flex items-center justify-center text-xs font-bold font-sans">
                                                {idx + 1}
                                            </div>
                                        )}
                                    </button>
                                    {idx < STEPS.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-1 sm:mx-2 ${idx < step ? 'bg-[#FF6B00]' : 'bg-[#E2E8F0] dark:bg-[#2A2A2A]'}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <div className="hidden sm:flex items-center justify-between mt-3">
                        {STEPS.map((s, idx) => (
                            <div
                                key={s.id}
                                className={`text-[10px] uppercase tracking-widest font-semibold font-sans ${
                                    idx === step ? 'text-[#FF6B00]' : 'text-[#94A3B8]'
                                }`}
                                style={{ width: `${100 / STEPS.length}%`, textAlign: idx === 0 ? 'left' : idx === STEPS.length - 1 ? 'right' : 'center' }}
                            >
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

            {/* FORM CONTENT */}
            <div className="max-w-[720px] mx-auto px-4 py-8">

                {/* SECTION A — BASIC INFO */}
                {step === 0 && (
                    <section>
                        <div className="text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans">
                            01 / Basic Information
                        </div>
                        <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">

                                <div>
                                    <Label htmlFor="full_name" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        Full Name <span className="text-[#FF6B00]">*</span>
                                    </Label>
                                    <Input
                                        id="full_name"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        placeholder="John Smith"
                                        className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="nickname" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        Nickname
                                    </Label>
                                    <Input
                                        id="nickname"
                                        value={data.nickname}
                                        onChange={(e) => setData('nickname', e.target.value)}
                                        placeholder="Optional"
                                        className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="dob" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        Date of Birth <span className="text-[#FF6B00]">*</span>
                                    </Label>
                                    <div className="flex items-center gap-3">
                                        <Input
                                            id="dob"
                                            type="date"
                                            value={data.dob}
                                            onChange={(e) => setData('dob', e.target.value)}
                                            className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00] [color-scheme:light] dark:[color-scheme:dark]"
                                        />
                                        {age !== null && (
                                            <div className="flex-shrink-0 bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] rounded-full px-3 py-1 text-xs font-bold font-mono whitespace-nowrap">
                                                {age} yrs
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        Gender
                                    </Label>
                                    <RadioGroup
                                        value={data.gender}
                                        onValueChange={(v) => setData('gender', v)}
                                        className="flex gap-4 h-10 items-center"
                                    >
                                        {['M', 'F', 'Other'].map((g) => (
                                            <div key={g} className="flex items-center gap-2">
                                                <RadioGroupItem value={g} id={`gender-${g}`} className="border-[#CBD5E1] dark:border-[#2A2A2A] text-[#FF6B00]" />
                                                <Label htmlFor={`gender-${g}`} className="text-sm text-[#0F172A] dark:text-[#F5F5F5] font-sans cursor-pointer">
                                                    {g}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label htmlFor="height" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        Height (cm)
                                    </Label>
                                    <Input
                                        id="height"
                                        type="number"
                                        value={data.height}
                                        onChange={(e) => setData('height', e.target.value)}
                                        placeholder="178"
                                        className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] font-mono focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="birth_city" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        Birthplace City
                                    </Label>
                                    <Input
                                        id="birth_city"
                                        value={data.birth_city}
                                        onChange={(e) => setData('birth_city', e.target.value)}
                                        placeholder="City"
                                        className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        Birthplace Country
                                    </Label>
                                    <Select value={data.birth_country} onValueChange={(v) => setData('birth_country', v)}>
                                        <SelectTrigger className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-[#161616] border-[#E2E8F0] dark:border-[#2A2A2A]">
                                            {COUNTRIES.map((c) => (
                                                <SelectItem key={c.code} value={c.code} className="text-[#0F172A] dark:text-[#F5F5F5]">
                                                    <span className="mr-2">{c.flag}</span> {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        Nationality <span className="text-[#FF6B00]">*</span>
                                    </Label>
                                    <Select value={data.nationality} onValueChange={(v) => setData('nationality', v)}>
                                        <SelectTrigger className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-[#161616] border-[#E2E8F0] dark:border-[#2A2A2A]">
                                            {COUNTRIES.map((c) => (
                                                <SelectItem key={c.code} value={c.code} className="text-[#0F172A] dark:text-[#F5F5F5]">
                                                    <span className="mr-2">{c.flag}</span> {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="current_club" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        Current Club
                                    </Label>
                                    <Input
                                        id="current_club"
                                        value={data.current_club}
                                        onChange={(e) => setData('current_club', e.target.value)}
                                        placeholder="Club name"
                                        className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="in_team_since" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        In Team Since (MM/YYYY)
                                    </Label>
                                    <Input
                                        id="in_team_since"
                                        type="month"
                                        value={data.in_team_since}
                                        onChange={(e) => setData('in_team_since', e.target.value)}
                                        className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] font-mono focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00] [color-scheme:light] dark:[color-scheme:dark]"
                                    />
                                </div>

                                <div className="lg:col-span-2">
                                    <Label htmlFor="agent" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                        Agent / Representative <span className="text-[#94A3B8] font-normal">(optional)</span>
                                    </Label>
                                    <Input
                                        id="agent"
                                        value={data.agent}
                                        onChange={(e) => setData('agent', e.target.value)}
                                        placeholder="Agent or agency name"
                                        className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                    />
                                </div>
                            </div>

                            {isMinor && (
                                <div className="mt-6">
                                    <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-700">
                                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                        <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm font-sans">
                                            Player is under 18. This profile must be managed by a parent or legal guardian.
                                        </AlertDescription>
                                    </Alert>
                                    <div className="mt-4">
                                        <Label htmlFor="guardian_name" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans">
                                            Guardian Name <span className="text-[#FF6B00]">*</span>
                                        </Label>
                                        <Input
                                            id="guardian_name"
                                            value={data.guardian_name}
                                            onChange={(e) => setData('guardian_name', e.target.value)}
                                            placeholder="Parent or legal guardian's full name"
                                            className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* SECTION B — FOOTBALL DETAILS */}
                {step === 1 && (
                    <section>
                        <div className="text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans">
                            02 / Football Details
                        </div>
                        <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8">

                            <div className="mb-8">
                                <Label className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans">
                                    Modality
                                </Label>
                                <div className="flex flex-wrap gap-3">
                                    {MODALITIES.map((m) => {
                                        const selected = data.modality === m;
                                        return (
                                            <button
                                                key={m}
                                                type="button"
                                                onClick={() => setData('modality', m)}
                                                className={`px-5 py-2.5 rounded-full text-sm font-semibold font-sans transition-colors ${
                                                    selected
                                                        ? 'bg-[#FF6B00] text-white border-0'
                                                        : 'bg-white dark:bg-[#1F1F1F] border border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] hover:border-[#FF6B00]'
                                                }`}
                                            >
                                                {m}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mb-8">
                                <Label className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans">
                                    Position <span className="text-[#94A3B8] font-normal">(up to 3)</span>
                                </Label>

                                {/* SVG pitch — hidden on mobile */}
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
                                                    <g
                                                        key={p.id}
                                                        onClick={() => togglePosition(p.id)}
                                                        style={{ cursor: 'pointer' }}
                                                        className="group"
                                                    >
                                                        <circle
                                                            cx={p.cx}
                                                            cy={p.cy}
                                                            r="14"
                                                            fill={selected ? 'rgba(255,107,0,0.85)' : 'transparent'}
                                                            stroke={selected ? '#FF6B00' : 'rgba(255,255,255,0.4)'}
                                                            strokeWidth="1.5"
                                                            className="group-hover:fill-[rgba(255,107,0,0.3)] transition-colors"
                                                        />
                                                        <text
                                                            x={p.cx}
                                                            y={p.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="central"
                                                            fontSize="8"
                                                            fontWeight="700"
                                                            fill={selected ? '#FFFFFF' : 'rgba(255,255,255,0.7)'}
                                                            style={{ pointerEvents: 'none' }}
                                                        >
                                                            {p.label}
                                                        </text>
                                                    </g>
                                                );
                                            })}
                                        </svg>
                                    </div>
                                </div>

                                {/* Mobile fallback — checkboxes */}
                                <div className="md:hidden grid grid-cols-3 gap-3">
                                    {ALL_POSITIONS.map((id) => {
                                        const selected = data.positions.includes(id);
                                        const label = POSITION_ZONES.find(p => p.id === id)?.label || id;
                                        return (
                                            <label
                                                key={id}
                                                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                                                    selected
                                                        ? 'bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border-[#FF6B00]'
                                                        : 'bg-white dark:bg-[#1F1F1F] border-[#E2E8F0] dark:border-[#2A2A2A]'
                                                }`}
                                            >
                                                <Checkbox
                                                    checked={selected}
                                                    onCheckedChange={() => togglePosition(id)}
                                                    className="border-[#CBD5E1] dark:border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]"
                                                />
                                                <span className={`text-xs font-semibold font-sans ${selected ? 'text-[#CC5500]' : 'text-[#0F172A] dark:text-[#F5F5F5]'}`}>
                          {id}
                        </span>
                                            </label>
                                        );
                                    })}
                                </div>

                                {/* Selected position pills */}
                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans mr-1">Selected:</span>
                                    {data.positions.length === 0 && (
                                        <span className="text-xs text-[#94A3B8] italic font-sans">None — up to 3 positions</span>
                                    )}
                                    {data.positions.map((id) => (
                                        <span
                                            key={id}
                                            className="inline-flex items-center gap-1.5 bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] rounded-full px-3 py-1 text-xs font-bold font-mono"
                                        >
                      {id}
                                            <button type="button" onClick={() => togglePosition(id)} className="hover:opacity-70">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans">
                                    Dominant Foot
                                </Label>
                                <RadioGroup
                                    value={data.foot}
                                    onValueChange={(v) => setData('foot', v)}
                                    className="flex flex-col sm:flex-row gap-4"
                                >
                                    {['Right', 'Left', 'Ambidextrous'].map((f) => (
                                        <div key={f} className="flex items-center gap-2">
                                            <RadioGroupItem value={f} id={`foot-${f}`} className="border-[#CBD5E1] dark:border-[#2A2A2A] text-[#FF6B00]" />
                                            <Label htmlFor={`foot-${f}`} className="text-sm text-[#0F172A] dark:text-[#F5F5F5] font-sans cursor-pointer">
                                                {f}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                    </section>
                )}

                {/* SECTION C — MEDIA */}
                {step === 2 && (
                    <section>
                        <div className="text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans">
                            03 / Media
                        </div>
                        <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8 space-y-8">

                            <div>
                                <Label className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans">
                                    Profile Photo
                                </Label>

                                {data.photo_preview ? (
                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <img
                                            src={data.photo_preview}
                                            alt="Preview"
                                            className="w-24 h-24 rounded-full object-cover border-2 border-[#FF6B00]"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <label className="cursor-pointer">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] hover:border-[#FF6B00] hover:text-[#FF6B00] bg-white dark:bg-[#1F1F1F]"
                                                    onClick={() => document.getElementById('photo-input')?.click()}
                                                >
                                                    Change Photo
                                                </Button>
                                                <input
                                                    id="photo-input"
                                                    type="file"
                                                    accept="image/jpeg,image/png"
                                                    onChange={handlePhotoUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => { setData('photo', null); setData('photo_preview', ''); }}
                                                className="text-xs text-[#94A3B8] hover:text-red-500 font-sans"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="block cursor-pointer">
                                        <div className="border-2 border-dashed border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#FF6B00] rounded-2xl p-12 text-center transition-colors">
                                            <Upload className="w-8 h-8 text-[#94A3B8] mx-auto mb-3" />
                                            <div className="font-semibold text-[#0F172A] dark:text-[#F5F5F5] font-sans mb-1">
                                                Upload Profile Photo
                                            </div>
                                            <div className="text-xs text-[#94A3B8] font-sans">
                                                JPG, PNG up to 5MB
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png"
                                            onChange={handlePhotoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="video_url" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans">
                                    Highlight Video URL
                                </Label>
                                <div className="relative">
                                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6B00] pointer-events-none" />
                                    <Input
                                        id="video_url"
                                        value={data.video_url}
                                        onChange={(e) => setData('video_url', e.target.value)}
                                        placeholder="YouTube or Vimeo URL"
                                        className="pl-10 pr-10 bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]"
                                    />
                                    {videoValid && (
                                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                                    )}
                                </div>

                                {videoValid && embedUrl && (
                                    <div className="mt-4 aspect-video bg-[#0F172A] rounded-xl overflow-hidden">
                                        <iframe
                                            src={embedUrl}
                                            title="Highlight preview"
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    </div>
                                )}
                                {!videoValid && data.video_url.length > 0 && (
                                    <div className="mt-2 text-xs text-red-500 font-sans">
                                        Please enter a valid YouTube or Vimeo URL.
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* SECTION D — CLUB HISTORY */}
                {step === 3 && (
                    <section>
                        <div className="text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans">
                            04 / Club History
                        </div>
                        <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8">

                            <div className="overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2A2A]">
                                <table className="table-auto w-full">
                                    <thead>
                                    <tr className="bg-[#F8FAFC] dark:bg-[#1F1F1F]">
                                        <th className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold py-3 px-4 text-left font-sans w-20">
                                            Year
                                        </th>
                                        <th className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold py-3 px-4 text-left font-sans">
                                            Club Name
                                        </th>
                                        <th className="w-12"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.club_history.map((row, idx) => (
                                        <tr
                                            key={row.year}
                                            className="border-t border-[#E2E8F0] dark:border-[#2A2A2A]"
                                        >
                                            <td className="py-2 px-4">
                          <span className="font-mono text-[#475569] dark:text-[#9A9A9A] font-semibold text-sm">
                            {row.year}
                          </span>
                                            </td>
                                            <td className="py-2 px-4">
                                                <Input
                                                    value={row.club}
                                                    onChange={(e) => updateClubHistory(idx, e.target.value)}
                                                    placeholder="Club name (optional)"
                                                    className="w-full bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00] h-9"
                                                />
                                            </td>
                                            <td className="py-2 px-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => clearClubHistory(idx)}
                                                    disabled={!row.club}
                                                    className="disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    <Trash2 className="w-4 h-4 text-[#94A3B8] hover:text-red-500 transition-colors" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-[10px] text-[#94A3B8] mt-3 font-sans">
                                Note: Up to 2 clubs per year. Add multiple entries for the same year if needed.
                            </div>
                        </div>
                    </section>
                )}

                {/* SECTION E — DESCRIPTION */}
                {step === 4 && (
                    <section>
                        <div className="text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans">
                            05 / About You
                        </div>
                        <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                            <Label htmlFor="description" className="text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                rows={5}
                                maxLength={500}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Describe your playing style, strengths, and football journey..."
                                className="bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00] resize-none"
                            />
                            <div className="flex justify-end mt-2">
                <span className={`text-xs font-mono ${descCount > 450 ? 'text-[#FF6B00] font-bold' : 'text-[#94A3B8]'}`}>
                  {descCount} / 500
                </span>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* STICKY BOTTOM */}
            <div className="bg-white dark:bg-[#0D0D0D] border-t border-[#E2E8F0] dark:border-[#2A2A2A] fixed bottom-0 left-0 right-0 z-20 h-[68px] px-4 sm:px-8 flex items-center justify-between">
                <div className="hidden sm:flex items-center gap-2">
                    <CheckCircle2 className="text-green-500 w-4 h-4" />
                    <span className="text-xs text-[#94A3B8] font-sans">Draft saved 2 min ago</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={goBack}
                        disabled={step === 0}
                        className="text-[#475569] dark:text-[#9A9A9A] hover:text-[#0F172A] dark:hover:text-[#F5F5F5] hover:bg-[#F8FAFC] dark:hover:bg-[#1F1F1F] disabled:opacity-30"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] hover:border-[#FF6B00] hover:text-[#FF6B00] bg-white dark:bg-[#1F1F1F]"
                    >
                        Save Draft
                    </Button>

                    {step < STEPS.length - 1 ? (
                        <Button
                            type="button"
                            onClick={goNext}
                            className="bg-[#FF6B00] text-white hover:bg-[#CC5500]"
                        >
                            Next
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            disabled={processing}
                            className="bg-[#FF6B00] text-white hover:bg-[#CC5500]"
                        >
                            Save & Publish
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
