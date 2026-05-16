import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ScoutNavbar from '@/components/Scout/ScoutNavbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import {
    Search as SearchIcon,
    LayoutGrid,
    List,
    Star,
    SlidersHorizontal,
    Network,
    ChevronRight,
    Eye,
} from 'lucide-react';

// TODO: Replace with usePage<PageProps & {players:Player[], total:number, filters:object}>().props

interface Player {
    id: number;
    name: string;
    club: string;
    position: 'GK' | 'DEF' | 'MID' | 'FWD';
    age: number;
    height: number;
    foot: 'R' | 'L' | 'B';
    country: string;
    flag: string;
    subscription: 'Premium' | 'Free';
    rating: number;
    views: number;
}

const MOCK_PLAYERS: Player[] = [
    { id: 1, name: 'Lucas Pereira', club: 'Santos FC U-20', position: 'FWD', age: 19, height: 178, foot: 'R', country: 'Brazil', flag: '🇧🇷', subscription: 'Premium', rating: 8.4, views: 12480 },
    { id: 2, name: 'Mateo Álvarez', club: 'River Plate Reserves', position: 'MID', age: 21, height: 182, foot: 'L', country: 'Argentina', flag: '🇦🇷', subscription: 'Premium', rating: 8.1, views: 9870 },
    { id: 3, name: 'Diego Fernández', club: 'Atlético Madrid B', position: 'DEF', age: 23, height: 188, foot: 'R', country: 'Spain', flag: '🇪🇸', subscription: 'Free', rating: 7.6, views: 5210 },
    { id: 4, name: 'Kwame Asante', club: 'Hearts of Oak', position: 'FWD', age: 20, height: 181, foot: 'R', country: 'Ghana', flag: '🇬🇭', subscription: 'Premium', rating: 8.2, views: 11240 },
    { id: 5, name: 'Yuki Tanaka', club: 'Kashima Antlers U-23', position: 'MID', age: 22, height: 175, foot: 'B', country: 'Japan', flag: '🇯🇵', subscription: 'Premium', rating: 7.9, views: 7430 },
    { id: 6, name: 'Oliver Schmidt', club: 'Bayern Munich II', position: 'GK', age: 24, height: 192, foot: 'R', country: 'Germany', flag: '🇩🇪', subscription: 'Premium', rating: 8.0, views: 8120 },
    { id: 7, name: 'Rafael Costa', club: 'Palmeiras U-20', position: 'MID', age: 18, height: 176, foot: 'L', country: 'Brazil', flag: '🇧🇷', subscription: 'Premium', rating: 8.6, views: 15670 },
    { id: 8, name: 'Adama Diallo', club: 'Stade Rennais B', position: 'DEF', age: 22, height: 186, foot: 'R', country: 'Senegal', flag: '🇸🇳', subscription: 'Free', rating: 7.4, views: 4320 },
    { id: 9, name: 'Mason Whitfield', club: 'Manchester City EDS', position: 'FWD', age: 19, height: 179, foot: 'R', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', subscription: 'Premium', rating: 8.5, views: 18920 },
    { id: 10, name: 'Carlos Ramírez', club: 'Club América Sub-20', position: 'FWD', age: 20, height: 180, foot: 'R', country: 'Mexico', flag: '🇲🇽', subscription: 'Premium', rating: 7.8, views: 6890 },
    { id: 11, name: 'Tomáš Novák', club: 'Slavia Praha B', position: 'MID', age: 23, height: 184, foot: 'R', country: 'Czechia', flag: '🇨🇿', subscription: 'Free', rating: 7.5, views: 3210 },
    { id: 12, name: 'João Silva', club: 'Benfica B', position: 'DEF', age: 21, height: 187, foot: 'L', country: 'Portugal', flag: '🇵🇹', subscription: 'Premium', rating: 8.0, views: 9450 },
    { id: 13, name: 'Khalid Al-Rashid', club: 'Al-Hilal U-23', position: 'GK', age: 22, height: 190, foot: 'R', country: 'Saudi Arabia', flag: '🇸🇦', subscription: 'Free', rating: 7.3, views: 2870 },
    { id: 14, name: 'Marco Bianchi', club: 'Juventus Next Gen', position: 'FWD', age: 21, height: 183, foot: 'L', country: 'Italy', flag: '🇮🇹', subscription: 'Premium', rating: 8.3, views: 13240 },
    { id: 15, name: 'Erik Lindqvist', club: 'AIK U-21', position: 'MID', age: 19, height: 181, foot: 'R', country: 'Sweden', flag: '🇸🇪', subscription: 'Free', rating: 7.6, views: 4180 },
    { id: 16, name: 'Hugo Martín', club: 'Real Sociedad B', position: 'DEF', age: 24, height: 189, foot: 'R', country: 'Spain', flag: '🇪🇸', subscription: 'Premium', rating: 7.9, views: 7620 },
    { id: 17, name: 'Tariq Mohammed', club: 'Wydad AC', position: 'MID', age: 22, height: 177, foot: 'B', country: 'Morocco', flag: '🇲🇦', subscription: 'Premium', rating: 8.1, views: 10340 },
    { id: 18, name: 'Bruno Cardoso', club: 'Flamengo Sub-20', position: 'FWD', age: 18, height: 175, foot: 'R', country: 'Brazil', flag: '🇧🇷', subscription: 'Premium', rating: 8.7, views: 19850 },
    { id: 19, name: 'Daniel Petrović', club: 'Red Star Belgrade II', position: 'GK', age: 25, height: 193, foot: 'R', country: 'Serbia', flag: '🇷🇸', subscription: 'Free', rating: 7.5, views: 3540 },
    { id: 20, name: 'Pierre Lefèvre', club: 'Lyon Reserves', position: 'MID', age: 20, height: 178, foot: 'L', country: 'France', flag: '🇫🇷', subscription: 'Premium', rating: 8.2, views: 11680 },
    { id: 21, name: 'Antonio López', club: 'Boca Juniors Reserves', position: 'DEF', age: 23, height: 185, foot: 'R', country: 'Argentina', flag: '🇦🇷', subscription: 'Premium', rating: 7.8, views: 6740 },
    { id: 22, name: 'Felix Müller', club: 'Borussia Dortmund II', position: 'FWD', age: 22, height: 182, foot: 'R', country: 'Germany', flag: '🇩🇪', subscription: 'Premium', rating: 8.4, views: 14210 },
    { id: 23, name: 'Sergei Ivanov', club: 'CSKA Moscow II', position: 'MID', age: 24, height: 180, foot: 'L', country: 'Russia', flag: '🇷🇺', subscription: 'Free', rating: 7.4, views: 2980 },
    { id: 24, name: 'Idris Bello', club: 'Enyimba FC', position: 'FWD', age: 21, height: 184, foot: 'R', country: 'Nigeria', flag: '🇳🇬', subscription: 'Premium', rating: 8.0, views: 8930 },
];

const POSITIONS = [
    { code: 'GK', label: 'Goalkeeper', count: 142 },
    { code: 'DEF', label: 'Defender', count: 387 },
    { code: 'MID', label: 'Midfielder', count: 421 },
    { code: 'FWD', label: 'Forward', count: 297 },
];

const COUNTRIES = [
    { name: 'Brazil', flag: '🇧🇷', count: 184 },
    { name: 'Argentina', flag: '🇦🇷', count: 142 },
    { name: 'Spain', flag: '🇪🇸', count: 98 },
    { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', count: 87 },
    { name: 'Germany', flag: '🇩🇪', count: 76 },
    { name: 'France', flag: '🇫🇷', count: 71 },
];

function positionGradient(position: string): string {
    switch (position) {
        case 'GK':
            return 'bg-gradient-to-br from-amber-400/30 to-orange-600/30';
        case 'DEF':
            return 'bg-gradient-to-br from-blue-500/25 to-slate-700/30';
        case 'MID':
            return 'bg-gradient-to-br from-emerald-500/25 to-teal-700/30';
        case 'FWD':
            return 'bg-gradient-to-br from-[#FF6B00]/30 to-red-700/30';
        default:
            return 'bg-gradient-to-br from-slate-400/20 to-slate-700/20';
    }
}

function FilterPanel({
                         ageMin,
                         ageMax,
                         setAgeMin,
                         setAgeMax,
                         heightMin,
                         setHeightMin,
                         heightMax,
                         setHeightMax,
                         preferredFoot,
                         setPreferredFoot,
                         countrySearch,
                         setCountrySearch,
                     }: {
    ageMin: number;
    ageMax: number;
    setAgeMin: (n: number) => void;
    setAgeMax: (n: number) => void;
    heightMin: string;
    setHeightMin: (s: string) => void;
    heightMax: string;
    setHeightMax: (s: string) => void;
    preferredFoot: string;
    setPreferredFoot: (s: string) => void;
    countrySearch: string;
    setCountrySearch: (s: string) => void;
}) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-[#F5F5F5] tracking-widest uppercase">
                    Filters
                </h3>
                <button className="text-[#FF6B00] text-xs hover:underline font-semibold">
                    Clear All
                </button>
            </div>

            <Separator className="bg-[#E2E8F0] dark:bg-[#2A2A2A]" />

            {/* POSITION */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#475569] dark:text-[#9A9A9A] tracking-widest uppercase">
                    Position
                </h4>
                <div className="space-y-2.5">
                    {POSITIONS.map((p) => (
                        <div key={p.code} className="flex items-center gap-2.5">
                            <Checkbox
                                id={`pos-${p.code}`}
                                className="border-[#CBD5E1] dark:border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]"
                            />
                            <Label
                                htmlFor={`pos-${p.code}`}
                                className="flex-1 flex items-center justify-between text-sm font-normal text-[#0F172A] dark:text-[#F5F5F5] cursor-pointer"
                            >
                <span>
                  <span className="font-mono font-bold text-[#FF6B00]">{p.code}</span>
                  <span className="text-[#475569] dark:text-[#9A9A9A]"> — {p.label}</span>
                </span>
                                <span className="text-[10px] font-mono text-[#94A3B8] dark:text-[#555555]">
                  {p.count}
                </span>
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="bg-[#E2E8F0] dark:bg-[#2A2A2A]" />

            {/* AGE RANGE */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold text-[#475569] dark:text-[#9A9A9A] tracking-widest uppercase">
                        Age Range
                    </h4>
                    <span className="font-mono text-[#FF6B00] text-sm font-semibold">
            {ageMin} – {ageMax}
          </span>
                </div>
                <div className="space-y-2 pt-1">
                    <input
                        type="range"
                        min={16}
                        max={40}
                        value={ageMin}
                        onChange={(e) => setAgeMin(Math.min(Number(e.target.value), ageMax))}
                        className="w-full h-1.5 bg-[#E2E8F0] dark:bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                    />
                    <input
                        type="range"
                        min={16}
                        max={40}
                        value={ageMax}
                        onChange={(e) => setAgeMax(Math.max(Number(e.target.value), ageMin))}
                        className="w-full h-1.5 bg-[#E2E8F0] dark:bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                    />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#94A3B8] dark:text-[#555555]">
                    <span>16</span>
                    <span>40</span>
                </div>
            </div>

            <Separator className="bg-[#E2E8F0] dark:bg-[#2A2A2A]" />

            {/* NATIONALITY */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#475569] dark:text-[#9A9A9A] tracking-widest uppercase">
                    Nationality
                </h4>
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
                    <Input
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country..."
                        className="pl-9 h-9 text-sm bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 dark:focus-visible:ring-1"
                    />
                </div>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {COUNTRIES.filter((c) =>
                        c.name.toLowerCase().includes(countrySearch.toLowerCase())
                    ).map((c) => (
                        <div key={c.name} className="flex items-center gap-2.5">
                            <Checkbox
                                id={`country-${c.name}`}
                                className="border-[#CBD5E1] dark:border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]"
                            />
                            <Label
                                htmlFor={`country-${c.name}`}
                                className="flex-1 flex items-center justify-between text-sm font-normal text-[#0F172A] dark:text-[#F5F5F5] cursor-pointer"
                            >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{c.flag}</span>
                  <span>{c.name}</span>
                </span>
                                <span className="text-[10px] font-mono text-[#94A3B8] dark:text-[#555555]">
                  {c.count}
                </span>
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="bg-[#E2E8F0] dark:bg-[#2A2A2A]" />

            {/* PREFERRED FOOT */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#475569] dark:text-[#9A9A9A] tracking-widest uppercase">
                    Preferred Foot
                </h4>
                <RadioGroup value={preferredFoot} onValueChange={setPreferredFoot} className="space-y-2">
                    {['any', 'right', 'left', 'both'].map((foot) => (
                        <div key={foot} className="flex items-center gap-2.5">
                            <RadioGroupItem
                                id={`foot-${foot}`}
                                value={foot}
                                className="border-[#CBD5E1] dark:border-[#2A2A2A] text-[#FF6B00]"
                            />
                            <Label
                                htmlFor={`foot-${foot}`}
                                className="text-sm font-normal text-[#0F172A] dark:text-[#F5F5F5] capitalize cursor-pointer"
                            >
                                {foot}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <Separator className="bg-[#E2E8F0] dark:bg-[#2A2A2A]" />

            {/* MODALITY */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#475569] dark:text-[#9A9A9A] tracking-widest uppercase">
                    Modality
                </h4>
                <div className="space-y-2.5">
                    {['Football', 'Futsal', 'Beach Soccer'].map((m) => (
                        <div key={m} className="flex items-center gap-2.5">
                            <Checkbox
                                id={`mod-${m}`}
                                defaultChecked={m === 'Football'}
                                className="border-[#CBD5E1] dark:border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]"
                            />
                            <Label
                                htmlFor={`mod-${m}`}
                                className="text-sm font-normal text-[#0F172A] dark:text-[#F5F5F5] cursor-pointer"
                            >
                                {m}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="bg-[#E2E8F0] dark:bg-[#2A2A2A]" />

            {/* HEIGHT */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#475569] dark:text-[#9A9A9A] tracking-widest uppercase">
                    Height (cm)
                </h4>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={heightMin}
                        onChange={(e) => setHeightMin(e.target.value)}
                        placeholder="Min"
                        className="h-9 text-sm font-mono bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 dark:focus-visible:ring-1"
                    />
                    <span className="text-[#94A3B8] text-sm">–</span>
                    <Input
                        type="number"
                        value={heightMax}
                        onChange={(e) => setHeightMax(e.target.value)}
                        placeholder="Max"
                        className="h-9 text-sm font-mono bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 dark:focus-visible:ring-1"
                    />
                </div>
            </div>

            <Separator className="bg-[#E2E8F0] dark:bg-[#2A2A2A]" />

            {/* SUBSCRIPTION */}
            <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#475569] dark:text-[#9A9A9A] tracking-widest uppercase">
                    Subscription
                </h4>
                <div className="flex items-center gap-2.5">
                    <Checkbox
                        id="premium-only"
                        className="border-[#CBD5E1] dark:border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]"
                    />
                    <Label
                        htmlFor="premium-only"
                        className="text-sm font-normal text-[#0F172A] dark:text-[#F5F5F5] cursor-pointer flex items-center gap-1.5"
                    >
                        <Star className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]" />
                        Premium players only
                    </Label>
                </div>
            </div>

            <Button className="w-full h-11 bg-[#FF6B00] hover:bg-[#CC5500] text-white rounded-xl font-semibold mt-2">
                Apply Filters
            </Button>

            {/* AD ZONE - ScoutPro */}
            <div className="space-y-2 pt-2">
                <p className="text-[10px] uppercase tracking-widest text-[#94A3B8] dark:text-[#555555] text-center">
                    Sponsored
                </p>
                <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-xl h-[240px] p-5 flex flex-col items-center justify-center text-center border border-[#334155] relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-[9px] text-white/30 uppercase tracking-widest">
                        Ad
                    </div>
                    <div className="w-14 h-14 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center mb-3">
                        <Network className="w-7 h-7 text-[#FF6B00]" strokeWidth={2.2} />
                    </div>
                    <h4 className="font-display text-xl font-bold text-white tracking-tight">
                        ScoutPro Network
                    </h4>
                    <p className="text-xs text-white/60 leading-snug mt-2 mb-4 px-2">
                        Connect with 12,000+ verified scouts. Direct messaging, market insights, and exclusive
                        reports.
                    </p>
                    <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-lg transition-colors">
                        Join Free
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Index() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [ageMin, setAgeMin] = useState(16);
    const [ageMax, setAgeMax] = useState(30);
    const [heightMin, setHeightMin] = useState('');
    const [heightMax, setHeightMax] = useState('');
    const [preferredFoot, setPreferredFoot] = useState('any');
    const [countrySearch, setCountrySearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const totalPlayers = 1247;
    const players = MOCK_PLAYERS;

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0D0D0D]">
            <ScoutNavbar />

            <div className="pt-16 flex min-h-screen">
                {/* DESKTOP FILTER PANEL */}
                <aside className="hidden lg:block w-72 shrink-0 bg-white dark:bg-[#0D0D0D] border-r border-[#E2E8F0] dark:border-[#2A2A2A] px-6 py-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
                    <FilterPanel
                        ageMin={ageMin}
                        ageMax={ageMax}
                        setAgeMin={setAgeMin}
                        setAgeMax={setAgeMax}
                        heightMin={heightMin}
                        setHeightMin={setHeightMin}
                        heightMax={heightMax}
                        setHeightMax={setHeightMax}
                        preferredFoot={preferredFoot}
                        setPreferredFoot={setPreferredFoot}
                        countrySearch={countrySearch}
                        setCountrySearch={setCountrySearch}
                    />
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 min-w-0 p-4 sm:p-6">
                    {/* TOP BAR */}
                    <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-4 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1">
                            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, club, or nationality..."
                                className="pl-10 h-11 bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] placeholder:text-[#94A3B8] dark:placeholder:text-[#555555] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 dark:focus-visible:ring-1"
                            />
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Mobile filter trigger */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="lg:hidden h-10 border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] bg-white dark:bg-[#111111]"
                                    >
                                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                                        Filters
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="left"
                                    className="w-[300px] sm:w-[340px] bg-white dark:bg-[#0D0D0D] border-r border-[#E2E8F0] dark:border-[#2A2A2A] overflow-y-auto p-6"
                                >
                                    <SheetHeader className="mb-4">
                                        <SheetTitle className="text-[#0F172A] dark:text-[#F5F5F5] font-display text-xl">
                                            Refine Search
                                        </SheetTitle>
                                    </SheetHeader>
                                    <FilterPanel
                                        ageMin={ageMin}
                                        ageMax={ageMax}
                                        setAgeMin={setAgeMin}
                                        setAgeMax={setAgeMax}
                                        heightMin={heightMin}
                                        setHeightMin={setHeightMin}
                                        heightMax={heightMax}
                                        setHeightMax={setHeightMax}
                                        preferredFoot={preferredFoot}
                                        setPreferredFoot={setPreferredFoot}
                                        countrySearch={countrySearch}
                                        setCountrySearch={setCountrySearch}
                                    />
                                </SheetContent>
                            </Sheet>

                            <p className="hidden sm:block text-sm text-[#475569] dark:text-[#9A9A9A] font-mono whitespace-nowrap">
                <span className="font-bold text-[#0F172A] dark:text-[#F5F5F5]">
                  {totalPlayers.toLocaleString()}
                </span>{' '}
                                players found
                            </p>

                            {/* View toggle */}
                            <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-[#111111] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-lg p-1">
                                <button
                                    onClick={() => setView('grid')}
                                    className={`p-1.5 rounded-md transition-colors ${
                                        view === 'grid'
                                            ? 'text-[#FF6B00] bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]'
                                            : 'text-[#94A3B8] dark:text-[#555555] hover:text-[#475569]'
                                    }`}
                                    aria-label="Grid view"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setView('list')}
                                    className={`p-1.5 rounded-md transition-colors ${
                                        view === 'list'
                                            ? 'text-[#FF6B00] bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]'
                                            : 'text-[#94A3B8] dark:text-[#555555] hover:text-[#475569]'
                                    }`}
                                    aria-label="List view"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Sort */}
                            <Select defaultValue="newest">
                                <SelectTrigger className="h-10 w-[140px] bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-[#161616] border-[#E2E8F0] dark:border-[#2A2A2A]">
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="viewed">Most Viewed</SelectItem>
                                    <SelectItem value="age-asc">Age ↑</SelectItem>
                                    <SelectItem value="age-desc">Age ↓</SelectItem>
                                    <SelectItem value="rating-asc">Rating ↑</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Mobile count display */}
                    <p className="sm:hidden mb-3 text-sm text-[#475569] dark:text-[#9A9A9A] font-mono px-1">
            <span className="font-bold text-[#0F172A] dark:text-[#F5F5F5]">
              {totalPlayers.toLocaleString()}
            </span>{' '}
                        players found
                    </p>

                    {/* AD ZONE - TransferRoom Leaderboard */}
                    <div className="mb-4">
                        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-xl min-h-[80px] flex flex-col sm:flex-row items-center px-6 py-3 sm:py-0 gap-3 sm:gap-4 border border-[#334155] relative overflow-hidden">
                            <div className="absolute top-1.5 right-2.5 text-[10px] text-white/30 uppercase tracking-widest">
                                Sponsored
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#CC5500] flex items-center justify-center font-display font-black text-white text-lg">
                                    TR
                                </div>
                                <div className="text-white">
                                    <p className="font-display text-lg font-bold leading-tight">TransferRoom</p>
                                    <p className="text-[10px] text-white/50 uppercase tracking-widest">
                                        Global Transfer Network
                                    </p>
                                </div>
                            </div>
                            <p className="flex-1 text-sm text-white/80 text-center sm:text-left sm:px-4">
                                Direct club-to-club deals. No agents. 800+ clubs trust TransferRoom for the
                                transfer window.
                            </p>
                            <button className="bg-white text-[#0F172A] hover:bg-white/90 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors shrink-0">
                                Request Demo
                            </button>
                        </div>
                    </div>

                    {/* GRID VIEW */}
                    {view === 'grid' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {players.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/scout/players/${p.id}`}
                                    className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl overflow-hidden cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_20px_rgba(255,107,0,0.08)] hover:border-[#FF6B00]"
                                >
                                    {/* Photo area */}
                                    <div
                                        className={`h-48 ${positionGradient(
                                            p.position
                                        )} bg-[#F8FAFC] dark:bg-[#1F1F1F] relative flex items-center justify-center`}
                                    >
                                        {/* Silhouette placeholder */}
                                        <div className="w-24 h-24 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center font-display text-3xl font-black text-white/70">
                                            {p.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')
                                                .slice(0, 2)}
                                        </div>

                                        {/* Position badge */}
                                        <span className="absolute top-3 left-3 bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-wider">
                      {p.position}
                    </span>

                                        {/* Premium badge */}
                                        {p.subscription === 'Premium' && (
                                            <span className="absolute top-3 right-3 bg-[#FF6B00] text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-white" />
                        PREMIUM
                      </span>
                                        )}

                                        {/* Flag */}
                                        <span className="absolute bottom-3 left-3 text-lg leading-none">{p.flag}</span>

                                        {/* Views */}
                                        <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-[2px] text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                      <Eye className="w-2.5 h-2.5" />
                                            {p.views > 1000 ? `${(p.views / 1000).toFixed(1)}k` : p.views}
                    </span>
                                    </div>

                                    {/* Info */}
                                    <div className="p-5">
                                        <h3 className="font-bold text-base text-[#0F172A] dark:text-[#F5F5F5] leading-tight truncate">
                                            {p.name}
                                        </h3>
                                        <p className="text-sm text-[#475569] dark:text-[#9A9A9A] mt-0.5 truncate">
                                            {p.club}
                                        </p>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 mt-3 text-center border-t border-[#F1F5F9] dark:border-[#1F1F1F] pt-3">
                                            <div>
                                                <p className="text-[9px] text-[#94A3B8] dark:text-[#555555] uppercase tracking-wider">
                                                    Age
                                                </p>
                                                <p className="text-xs font-semibold font-mono text-[#0F172A] dark:text-[#F5F5F5] mt-0.5">
                                                    {p.age}
                                                </p>
                                            </div>
                                            <div className="border-x border-[#F1F5F9] dark:border-[#1F1F1F]">
                                                <p className="text-[9px] text-[#94A3B8] dark:text-[#555555] uppercase tracking-wider">
                                                    Height
                                                </p>
                                                <p className="text-xs font-semibold font-mono text-[#0F172A] dark:text-[#F5F5F5] mt-0.5">
                                                    {p.height}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-[#94A3B8] dark:text-[#555555] uppercase tracking-wider">
                                                    Foot
                                                </p>
                                                <p className="text-xs font-semibold font-mono text-[#0F172A] dark:text-[#F5F5F5] mt-0.5">
                                                    {p.foot}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="mt-3 text-[#FF6B00] text-xs font-bold tracking-wider group-hover:underline flex items-center gap-1">
                                            VIEW PROFILE
                                            <ChevronRight className="w-3 h-3" />
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* LIST VIEW */}
                    {view === 'list' && (
                        <div className="bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b border-[#E2E8F0] dark:border-[#2A2A2A] hover:bg-transparent">
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#475569] dark:text-[#9A9A9A] py-4">
                                                Player
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#475569] dark:text-[#9A9A9A]">
                                                Position
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#475569] dark:text-[#9A9A9A]">
                                                Age
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#475569] dark:text-[#9A9A9A]">
                                                Country
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#475569] dark:text-[#9A9A9A]">
                                                Height
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#475569] dark:text-[#9A9A9A]">
                                                Foot
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#475569] dark:text-[#9A9A9A]">
                                                Plan
                                            </TableHead>
                                            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-[#475569] dark:text-[#9A9A9A] text-right">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {players.map((p) => (
                                            <TableRow
                                                key={p.id}
                                                className="border-b border-[#F1F5F9] dark:border-[#1F1F1F] hover:bg-[#F8FAFC] dark:hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                                            >
                                                <TableCell className="py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-10 h-10 rounded-full ${positionGradient(
                                                                p.position
                                                            )} flex items-center justify-center font-display font-black text-white text-xs shrink-0`}
                                                        >
                                                            {p.name
                                                                .split(' ')
                                                                .map((n) => n[0])
                                                                .join('')
                                                                .slice(0, 2)}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-sm text-[#0F172A] dark:text-[#F5F5F5] truncate">
                                                                {p.name}
                                                            </p>
                                                            <p className="text-xs text-[#475569] dark:text-[#9A9A9A] truncate">
                                                                {p.club}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                          <span className="bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider">
                            {p.position}
                          </span>
                                                </TableCell>
                                                <TableCell className="font-mono text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                                                    {p.age}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1.5 text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                                                        <span className="text-base leading-none">{p.flag}</span>
                                                        <span className="hidden md:inline">{p.country}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-mono text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                                                    {p.height}
                                                </TableCell>
                                                <TableCell className="font-mono text-sm text-[#0F172A] dark:text-[#F5F5F5]">
                                                    {p.foot}
                                                </TableCell>
                                                <TableCell>
                                                    {p.subscription === 'Premium' ? (
                                                        <span className="inline-flex items-center gap-1 bg-[#FF6B00] text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider">
                              <Star className="w-2.5 h-2.5 fill-white" />
                              PRO
                            </span>
                                                    ) : (
                                                        <span className="text-[10px] text-[#94A3B8] dark:text-[#555555] uppercase tracking-wider font-bold">
                              Free
                            </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Link
                                                        href={`/scout/players/${p.id}`}
                                                        className="inline-flex items-center gap-1 text-[#FF6B00] text-xs font-bold tracking-wider hover:underline"
                                                    >
                                                        VIEW
                                                        <ChevronRight className="w-3 h-3" />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {/* PAGINATION */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 gap-3">
                        <p className="text-sm text-[#475569] dark:text-[#9A9A9A] font-mono">
                            Showing{' '}
                            <span className="font-bold text-[#0F172A] dark:text-[#F5F5F5]">1–24</span> of{' '}
                            <span className="font-bold text-[#0F172A] dark:text-[#F5F5F5]">
                {totalPlayers.toLocaleString()}
              </span>
                        </p>

                        <Pagination className="mx-0 w-auto justify-end">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        className="text-[#475569] dark:text-[#9A9A9A] hover:bg-[#F8FAFC] dark:hover:bg-[#1A1A1A] hover:text-[#0F172A] dark:hover:text-[#F5F5F5] border-[#E2E8F0] dark:border-[#2A2A2A]"
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        isActive
                                        className="bg-[#FF6B00] text-white border-[#FF6B00] hover:bg-[#CC5500] hover:text-white"
                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        className="text-[#475569] dark:text-[#9A9A9A] hover:bg-[#F8FAFC] dark:hover:bg-[#1A1A1A] border-[#E2E8F0] dark:border-[#2A2A2A]"
                                    >
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        className="text-[#475569] dark:text-[#9A9A9A] hover:bg-[#F8FAFC] dark:hover:bg-[#1A1A1A] border-[#E2E8F0] dark:border-[#2A2A2A]"
                                    >
                                        3
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem className="hidden sm:list-item">
                                    <PaginationEllipsis className="text-[#94A3B8]" />
                                </PaginationItem>
                                <PaginationItem className="hidden sm:list-item">
                                    <PaginationLink
                                        href="#"
                                        className="text-[#475569] dark:text-[#9A9A9A] hover:bg-[#F8FAFC] dark:hover:bg-[#1A1A1A] border-[#E2E8F0] dark:border-[#2A2A2A]"
                                    >
                                        52
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        className="text-[#475569] dark:text-[#9A9A9A] hover:bg-[#F8FAFC] dark:hover:bg-[#1A1A1A] hover:text-[#0F172A] dark:hover:text-[#F5F5F5] border-[#E2E8F0] dark:border-[#2A2A2A]"
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </main>
            </div>
        </div>
    );
}
