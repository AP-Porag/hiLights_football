"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@inertiajs/react");
var PlayerNavbar_1 = require("@/components/player/PlayerNavbar");
var alert_1 = require("@/components/ui/alert");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var button_1 = require("@/components/ui/button");
var radio_group_1 = require("@/components/ui/radio-group");
var checkbox_1 = require("@/components/ui/checkbox");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
// TODO: Replace with usePage().props
var COUNTRIES = [
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
var STEPS = [
    { id: 0, label: 'Basic Info' },
    { id: 1, label: 'Football' },
    { id: 2, label: 'Media' },
    { id: 3, label: 'History' },
    { id: 4, label: 'About' },
];
var MODALITIES = ['Football', 'Futsal', 'Beach Soccer'];
var POSITION_ZONES = [
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
var ALL_POSITIONS = ['GK', 'LB', 'CB-L', 'CB-R', 'RB', 'LM', 'CM-L', 'CM-R', 'RM', 'CAM', 'LW', 'ST', 'RW', 'CF'];
var calculateAge = function (dob) {
    if (!dob)
        return null;
    var birth = new Date(dob);
    if (isNaN(birth.getTime()))
        return null;
    var today = new Date();
    var age = today.getFullYear() - birth.getFullYear();
    var m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate()))
        age--;
    return age;
};
var isValidVideoUrl = function (url) {
    if (!url)
        return false;
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+/i.test(url);
};
var getEmbedUrl = function (url) {
    if (!url)
        return null;
    var yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (yt)
        return "https://www.youtube.com/embed/" + yt[1];
    var vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm)
        return "https://player.vimeo.com/video/" + vm[1];
    return null;
};
function Edit() {
    var _a = react_1.useState(0), step = _a[0], setStep = _a[1];
    var currentYear = new Date().getFullYear();
    // TODO: Replace with usePage().props for initial data
    var _b = react_2.useForm({
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
        positions: ['CAM', 'ST'],
        foot: 'Right',
        photo: null,
        photo_preview: '',
        video_url: '',
        club_history: Array.from({ length: currentYear - 2020 + 1 }, function (_, i) { return ({
            year: 2020 + i,
            club: i === 0 ? 'Portuguesa Santista U-13' : i === 1 ? 'Portuguesa Santista U-14' : i === 2 ? 'Santos FC U-15' : i === 3 ? 'Santos FC U-15' : i === 4 ? 'Santos FC U-16' : 'Santos FC U-17'
        }); }),
        description: ''
    }), data = _b.data, setData = _b.setData, processing = _b.processing;
    var age = react_1.useMemo(function () { return calculateAge(data.dob); }, [data.dob]);
    var isMinor = age !== null && age < 18;
    var descCount = data.description.length;
    var videoValid = isValidVideoUrl(data.video_url);
    var embedUrl = react_1.useMemo(function () { return getEmbedUrl(data.video_url); }, [data.video_url]);
    var togglePosition = function (id) {
        if (data.positions.includes(id)) {
            setData('positions', data.positions.filter(function (p) { return p !== id; }));
        }
        else if (data.positions.length < 3) {
            setData('positions', __spreadArrays(data.positions, [id]));
        }
    };
    var updateClubHistory = function (idx, club) {
        var copy = __spreadArrays(data.club_history);
        copy[idx] = __assign(__assign({}, copy[idx]), { club: club });
        setData('club_history', copy);
    };
    var clearClubHistory = function (idx) {
        var copy = __spreadArrays(data.club_history);
        copy[idx] = __assign(__assign({}, copy[idx]), { club: '' });
        setData('club_history', copy);
    };
    var handlePhotoUpload = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setData('photo', file);
            var reader = new FileReader();
            reader.onload = function (ev) { var _a; return setData('photo_preview', (_a = ev.target) === null || _a === void 0 ? void 0 : _a.result); };
            reader.readAsDataURL(file);
        }
    };
    var goNext = function () { return setStep(function (s) { return Math.min(s + 1, STEPS.length - 1); }); };
    var goBack = function () { return setStep(function (s) { return Math.max(s - 1, 0); }); };
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-[#F8FAFC] dark:bg-[#0D0D0D] pt-16 pb-32" },
        react_1["default"].createElement(PlayerNavbar_1["default"], null),
        react_1["default"].createElement("div", { className: "bg-white dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#2A2A2A] sticky top-16 z-20 px-4 sm:px-8 py-4" },
            react_1["default"].createElement("div", { className: "max-w-[720px] mx-auto" },
                react_1["default"].createElement("div", { className: "flex items-center" }, STEPS.map(function (s, idx) {
                    var completed = idx < step;
                    var active = idx === step;
                    return (react_1["default"].createElement(react_1["default"].Fragment, { key: s.id },
                        react_1["default"].createElement("button", { onClick: function () { return setStep(idx); }, className: "flex-shrink-0 focus:outline-none", type: "button" }, completed || active ? (react_1["default"].createElement("div", { className: "w-7 h-7 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-xs font-bold font-sans" }, completed ? react_1["default"].createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4" }) : idx + 1)) : (react_1["default"].createElement("div", { className: "w-7 h-7 border-2 border-[#E2E8F0] dark:border-[#2A2A2A] text-[#94A3B8] rounded-full flex items-center justify-center text-xs font-bold font-sans" }, idx + 1))),
                        idx < STEPS.length - 1 && (react_1["default"].createElement("div", { className: "flex-1 h-0.5 mx-1 sm:mx-2 " + (idx < step ? 'bg-[#FF6B00]' : 'bg-[#E2E8F0] dark:bg-[#2A2A2A]') }))));
                })),
                react_1["default"].createElement("div", { className: "hidden sm:flex items-center justify-between mt-3" }, STEPS.map(function (s, idx) { return (react_1["default"].createElement("div", { key: s.id, className: "text-[10px] uppercase tracking-widest font-semibold font-sans " + (idx === step ? 'text-[#FF6B00]' : 'text-[#94A3B8]'), style: { width: 100 / STEPS.length + "%", textAlign: idx === 0 ? 'left' : idx === STEPS.length - 1 ? 'right' : 'center' } }, s.label)); })),
                react_1["default"].createElement("div", { className: "sm:hidden mt-3 text-center" },
                    react_1["default"].createElement("div", { className: "text-[10px] uppercase tracking-widest font-semibold font-sans text-[#FF6B00]" },
                        "Step ",
                        step + 1,
                        " of ",
                        STEPS.length,
                        " \u2014 ",
                        STEPS[step].label)))),
        react_1["default"].createElement("div", { className: "max-w-[720px] mx-auto px-4 py-8" },
            step === 0 && (react_1["default"].createElement("section", null,
                react_1["default"].createElement("div", { className: "text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans" }, "01 / Basic Information"),
                react_1["default"].createElement("div", { className: "bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8" },
                    react_1["default"].createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(label_1.Label, { htmlFor: "full_name", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" },
                                "Full Name ",
                                react_1["default"].createElement("span", { className: "text-[#FF6B00]" }, "*")),
                            react_1["default"].createElement(input_1.Input, { id: "full_name", value: data.full_name, onChange: function (e) { return setData('full_name', e.target.value); }, placeholder: "John Smith", className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(label_1.Label, { htmlFor: "nickname", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" }, "Nickname"),
                            react_1["default"].createElement(input_1.Input, { id: "nickname", value: data.nickname, onChange: function (e) { return setData('nickname', e.target.value); }, placeholder: "Optional", className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(label_1.Label, { htmlFor: "dob", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" },
                                "Date of Birth ",
                                react_1["default"].createElement("span", { className: "text-[#FF6B00]" }, "*")),
                            react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                                react_1["default"].createElement(input_1.Input, { id: "dob", type: "date", value: data.dob, onChange: function (e) { return setData('dob', e.target.value); }, className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00] [color-scheme:light] dark:[color-scheme:dark]" }),
                                age !== null && (react_1["default"].createElement("div", { className: "flex-shrink-0 bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] rounded-full px-3 py-1 text-xs font-bold font-mono whitespace-nowrap" },
                                    age,
                                    " yrs")))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(label_1.Label, { className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" }, "Gender"),
                            react_1["default"].createElement(radio_group_1.RadioGroup, { value: data.gender, onValueChange: function (v) { return setData('gender', v); }, className: "flex gap-4 h-10 items-center" }, ['M', 'F', 'Other'].map(function (g) { return (react_1["default"].createElement("div", { key: g, className: "flex items-center gap-2" },
                                react_1["default"].createElement(radio_group_1.RadioGroupItem, { value: g, id: "gender-" + g, className: "border-[#CBD5E1] dark:border-[#2A2A2A] text-[#FF6B00]" }),
                                react_1["default"].createElement(label_1.Label, { htmlFor: "gender-" + g, className: "text-sm text-[#0F172A] dark:text-[#F5F5F5] font-sans cursor-pointer" }, g))); }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(label_1.Label, { htmlFor: "height", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" }, "Height (cm)"),
                            react_1["default"].createElement(input_1.Input, { id: "height", type: "number", value: data.height, onChange: function (e) { return setData('height', e.target.value); }, placeholder: "178", className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] font-mono focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(label_1.Label, { htmlFor: "birth_city", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" }, "Birthplace City"),
                            react_1["default"].createElement(input_1.Input, { id: "birth_city", value: data.birth_city, onChange: function (e) { return setData('birth_city', e.target.value); }, placeholder: "City", className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(label_1.Label, { className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" }, "Birthplace Country"),
                            react_1["default"].createElement(select_1.Select, { value: data.birth_country, onValueChange: function (v) { return setData('birth_country', v); } },
                                react_1["default"].createElement(select_1.SelectTrigger, { className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5]" },
                                    react_1["default"].createElement(select_1.SelectValue, null)),
                                react_1["default"].createElement(select_1.SelectContent, { className: "bg-white dark:bg-[#161616] border-[#E2E8F0] dark:border-[#2A2A2A]" }, COUNTRIES.map(function (c) { return (react_1["default"].createElement(select_1.SelectItem, { key: c.code, value: c.code, className: "text-[#0F172A] dark:text-[#F5F5F5]" },
                                    react_1["default"].createElement("span", { className: "mr-2" }, c.flag),
                                    " ",
                                    c.name)); })))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(label_1.Label, { className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" },
                                "Nationality ",
                                react_1["default"].createElement("span", { className: "text-[#FF6B00]" }, "*")),
                            react_1["default"].createElement(select_1.Select, { value: data.nationality, onValueChange: function (v) { return setData('nationality', v); } },
                                react_1["default"].createElement(select_1.SelectTrigger, { className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5]" },
                                    react_1["default"].createElement(select_1.SelectValue, null)),
                                react_1["default"].createElement(select_1.SelectContent, { className: "bg-white dark:bg-[#161616] border-[#E2E8F0] dark:border-[#2A2A2A]" }, COUNTRIES.map(function (c) { return (react_1["default"].createElement(select_1.SelectItem, { key: c.code, value: c.code, className: "text-[#0F172A] dark:text-[#F5F5F5]" },
                                    react_1["default"].createElement("span", { className: "mr-2" }, c.flag),
                                    " ",
                                    c.name)); })))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(label_1.Label, { htmlFor: "current_club", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" }, "Current Club"),
                            react_1["default"].createElement(input_1.Input, { id: "current_club", value: data.current_club, onChange: function (e) { return setData('current_club', e.target.value); }, placeholder: "Club name", className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(label_1.Label, { htmlFor: "in_team_since", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" }, "In Team Since (MM/YYYY)"),
                            react_1["default"].createElement(input_1.Input, { id: "in_team_since", type: "month", value: data.in_team_since, onChange: function (e) { return setData('in_team_since', e.target.value); }, className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] font-mono focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00] [color-scheme:light] dark:[color-scheme:dark]" })),
                        react_1["default"].createElement("div", { className: "lg:col-span-2" },
                            react_1["default"].createElement(label_1.Label, { htmlFor: "agent", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" },
                                "Agent / Representative ",
                                react_1["default"].createElement("span", { className: "text-[#94A3B8] font-normal" }, "(optional)")),
                            react_1["default"].createElement(input_1.Input, { id: "agent", value: data.agent, onChange: function (e) { return setData('agent', e.target.value); }, placeholder: "Agent or agency name", className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" }))),
                    isMinor && (react_1["default"].createElement("div", { className: "mt-6" },
                        react_1["default"].createElement(alert_1.Alert, { className: "bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-700" },
                            react_1["default"].createElement(lucide_react_1.AlertTriangle, { className: "h-4 w-4 text-amber-600 dark:text-amber-400" }),
                            react_1["default"].createElement(alert_1.AlertDescription, { className: "text-amber-800 dark:text-amber-200 text-sm font-sans" }, "Player is under 18. This profile must be managed by a parent or legal guardian.")),
                        react_1["default"].createElement("div", { className: "mt-4" },
                            react_1["default"].createElement(label_1.Label, { htmlFor: "guardian_name", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-2 block font-sans" },
                                "Guardian Name ",
                                react_1["default"].createElement("span", { className: "text-[#FF6B00]" }, "*")),
                            react_1["default"].createElement(input_1.Input, { id: "guardian_name", value: data.guardian_name, onChange: function (e) { return setData('guardian_name', e.target.value); }, placeholder: "Parent or legal guardian's full name", className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" }))))))),
            step === 1 && (react_1["default"].createElement("section", null,
                react_1["default"].createElement("div", { className: "text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans" }, "02 / Football Details"),
                react_1["default"].createElement("div", { className: "bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8" },
                    react_1["default"].createElement("div", { className: "mb-8" },
                        react_1["default"].createElement(label_1.Label, { className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans" }, "Modality"),
                        react_1["default"].createElement("div", { className: "flex flex-wrap gap-3" }, MODALITIES.map(function (m) {
                            var selected = data.modality === m;
                            return (react_1["default"].createElement("button", { key: m, type: "button", onClick: function () { return setData('modality', m); }, className: "px-5 py-2.5 rounded-full text-sm font-semibold font-sans transition-colors " + (selected
                                    ? 'bg-[#FF6B00] text-white border-0'
                                    : 'bg-white dark:bg-[#1F1F1F] border border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] hover:border-[#FF6B00]') }, m));
                        }))),
                    react_1["default"].createElement("div", { className: "mb-8" },
                        react_1["default"].createElement(label_1.Label, { className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans" },
                            "Position ",
                            react_1["default"].createElement("span", { className: "text-[#94A3B8] font-normal" }, "(up to 3)")),
                        react_1["default"].createElement("div", { className: "hidden md:block" },
                            react_1["default"].createElement("div", { className: "flex justify-center bg-[#0F172A] rounded-2xl p-4" },
                                react_1["default"].createElement("svg", { viewBox: "0 0 300 200", className: "w-full max-w-[400px] h-auto" },
                                    react_1["default"].createElement("rect", { x: "0", y: "0", width: "300", height: "200", fill: "#1a3a1a" }),
                                    react_1["default"].createElement("rect", { x: "2", y: "2", width: "296", height: "196", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                                    react_1["default"].createElement("line", { x1: "150", y1: "2", x2: "150", y2: "198", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                                    react_1["default"].createElement("circle", { cx: "150", cy: "100", r: "22", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                                    react_1["default"].createElement("rect", { x: "2", y: "55", width: "40", height: "90", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                                    react_1["default"].createElement("rect", { x: "258", y: "55", width: "40", height: "90", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                                    react_1["default"].createElement("rect", { x: "2", y: "75", width: "15", height: "50", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                                    react_1["default"].createElement("rect", { x: "283", y: "75", width: "15", height: "50", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                                    POSITION_ZONES.map(function (p) {
                                        var selected = data.positions.includes(p.id);
                                        return (react_1["default"].createElement("g", { key: p.id, onClick: function () { return togglePosition(p.id); }, style: { cursor: 'pointer' }, className: "group" },
                                            react_1["default"].createElement("circle", { cx: p.cx, cy: p.cy, r: "14", fill: selected ? 'rgba(255,107,0,0.85)' : 'transparent', stroke: selected ? '#FF6B00' : 'rgba(255,255,255,0.4)', strokeWidth: "1.5", className: "group-hover:fill-[rgba(255,107,0,0.3)] transition-colors" }),
                                            react_1["default"].createElement("text", { x: p.cx, y: p.cy, textAnchor: "middle", dominantBaseline: "central", fontSize: "8", fontWeight: "700", fill: selected ? '#FFFFFF' : 'rgba(255,255,255,0.7)', style: { pointerEvents: 'none' } }, p.label)));
                                    })))),
                        react_1["default"].createElement("div", { className: "md:hidden grid grid-cols-3 gap-3" }, ALL_POSITIONS.map(function (id) {
                            var _a;
                            var selected = data.positions.includes(id);
                            var label = ((_a = POSITION_ZONES.find(function (p) { return p.id === id; })) === null || _a === void 0 ? void 0 : _a.label) || id;
                            return (react_1["default"].createElement("label", { key: id, className: "flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors " + (selected
                                    ? 'bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border-[#FF6B00]'
                                    : 'bg-white dark:bg-[#1F1F1F] border-[#E2E8F0] dark:border-[#2A2A2A]') },
                                react_1["default"].createElement(checkbox_1.Checkbox, { checked: selected, onCheckedChange: function () { return togglePosition(id); }, className: "border-[#CBD5E1] dark:border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]" }),
                                react_1["default"].createElement("span", { className: "text-xs font-semibold font-sans " + (selected ? 'text-[#CC5500]' : 'text-[#0F172A] dark:text-[#F5F5F5]') }, id)));
                        })),
                        react_1["default"].createElement("div", { className: "mt-4 flex flex-wrap items-center gap-2" },
                            react_1["default"].createElement("span", { className: "text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold font-sans mr-1" }, "Selected:"),
                            data.positions.length === 0 && (react_1["default"].createElement("span", { className: "text-xs text-[#94A3B8] italic font-sans" }, "None \u2014 up to 3 positions")),
                            data.positions.map(function (id) { return (react_1["default"].createElement("span", { key: id, className: "inline-flex items-center gap-1.5 bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)] border border-[#FF6B00] text-[#CC5500] rounded-full px-3 py-1 text-xs font-bold font-mono" },
                                id,
                                react_1["default"].createElement("button", { type: "button", onClick: function () { return togglePosition(id); }, className: "hover:opacity-70" },
                                    react_1["default"].createElement(lucide_react_1.Trash2, { className: "w-3 h-3" })))); }))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(label_1.Label, { className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans" }, "Dominant Foot"),
                        react_1["default"].createElement(radio_group_1.RadioGroup, { value: data.foot, onValueChange: function (v) { return setData('foot', v); }, className: "flex flex-col sm:flex-row gap-4" }, ['Right', 'Left', 'Ambidextrous'].map(function (f) { return (react_1["default"].createElement("div", { key: f, className: "flex items-center gap-2" },
                            react_1["default"].createElement(radio_group_1.RadioGroupItem, { value: f, id: "foot-" + f, className: "border-[#CBD5E1] dark:border-[#2A2A2A] text-[#FF6B00]" }),
                            react_1["default"].createElement(label_1.Label, { htmlFor: "foot-" + f, className: "text-sm text-[#0F172A] dark:text-[#F5F5F5] font-sans cursor-pointer" }, f))); })))))),
            step === 2 && (react_1["default"].createElement("section", null,
                react_1["default"].createElement("div", { className: "text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans" }, "03 / Media"),
                react_1["default"].createElement("div", { className: "bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8 space-y-8" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(label_1.Label, { className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans" }, "Profile Photo"),
                        data.photo_preview ? (react_1["default"].createElement("div", { className: "flex flex-col sm:flex-row items-center gap-6" },
                            react_1["default"].createElement("img", { src: data.photo_preview, alt: "Preview", className: "w-24 h-24 rounded-full object-cover border-2 border-[#FF6B00]" }),
                            react_1["default"].createElement("div", { className: "flex flex-col gap-2" },
                                react_1["default"].createElement("label", { className: "cursor-pointer" },
                                    react_1["default"].createElement(button_1.Button, { type: "button", variant: "outline", className: "border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] hover:border-[#FF6B00] hover:text-[#FF6B00] bg-white dark:bg-[#1F1F1F]", onClick: function () { var _a; return (_a = document.getElementById('photo-input')) === null || _a === void 0 ? void 0 : _a.click(); } }, "Change Photo"),
                                    react_1["default"].createElement("input", { id: "photo-input", type: "file", accept: "image/jpeg,image/png", onChange: handlePhotoUpload, className: "hidden" })),
                                react_1["default"].createElement("button", { type: "button", onClick: function () { setData('photo', null); setData('photo_preview', ''); }, className: "text-xs text-[#94A3B8] hover:text-red-500 font-sans" }, "Remove")))) : (react_1["default"].createElement("label", { className: "block cursor-pointer" },
                            react_1["default"].createElement("div", { className: "border-2 border-dashed border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#FF6B00] rounded-2xl p-12 text-center transition-colors" },
                                react_1["default"].createElement(lucide_react_1.Upload, { className: "w-8 h-8 text-[#94A3B8] mx-auto mb-3" }),
                                react_1["default"].createElement("div", { className: "font-semibold text-[#0F172A] dark:text-[#F5F5F5] font-sans mb-1" }, "Upload Profile Photo"),
                                react_1["default"].createElement("div", { className: "text-xs text-[#94A3B8] font-sans" }, "JPG, PNG up to 5MB")),
                            react_1["default"].createElement("input", { type: "file", accept: "image/jpeg,image/png", onChange: handlePhotoUpload, className: "hidden" })))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(label_1.Label, { htmlFor: "video_url", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans" }, "Highlight Video URL"),
                        react_1["default"].createElement("div", { className: "relative" },
                            react_1["default"].createElement(lucide_react_1.Youtube, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6B00] pointer-events-none" }),
                            react_1["default"].createElement(input_1.Input, { id: "video_url", value: data.video_url, onChange: function (e) { return setData('video_url', e.target.value); }, placeholder: "YouTube or Vimeo URL", className: "pl-10 pr-10 bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00]" }),
                            videoValid && (react_1["default"].createElement(lucide_react_1.CheckCircle2, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" }))),
                        videoValid && embedUrl && (react_1["default"].createElement("div", { className: "mt-4 aspect-video bg-[#0F172A] rounded-xl overflow-hidden" },
                            react_1["default"].createElement("iframe", { src: embedUrl, title: "Highlight preview", className: "w-full h-full", allowFullScreen: true }))),
                        !videoValid && data.video_url.length > 0 && (react_1["default"].createElement("div", { className: "mt-2 text-xs text-red-500 font-sans" }, "Please enter a valid YouTube or Vimeo URL.")))))),
            step === 3 && (react_1["default"].createElement("section", null,
                react_1["default"].createElement("div", { className: "text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans" }, "04 / Club History"),
                react_1["default"].createElement("div", { className: "bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8" },
                    react_1["default"].createElement("div", { className: "overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#2A2A2A]" },
                        react_1["default"].createElement("table", { className: "table-auto w-full" },
                            react_1["default"].createElement("thead", null,
                                react_1["default"].createElement("tr", { className: "bg-[#F8FAFC] dark:bg-[#1F1F1F]" },
                                    react_1["default"].createElement("th", { className: "text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold py-3 px-4 text-left font-sans w-20" }, "Year"),
                                    react_1["default"].createElement("th", { className: "text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold py-3 px-4 text-left font-sans" }, "Club Name"),
                                    react_1["default"].createElement("th", { className: "w-12" }))),
                            react_1["default"].createElement("tbody", null, data.club_history.map(function (row, idx) { return (react_1["default"].createElement("tr", { key: row.year, className: "border-t border-[#E2E8F0] dark:border-[#2A2A2A]" },
                                react_1["default"].createElement("td", { className: "py-2 px-4" },
                                    react_1["default"].createElement("span", { className: "font-mono text-[#475569] dark:text-[#9A9A9A] font-semibold text-sm" }, row.year)),
                                react_1["default"].createElement("td", { className: "py-2 px-4" },
                                    react_1["default"].createElement(input_1.Input, { value: row.club, onChange: function (e) { return updateClubHistory(idx, e.target.value); }, placeholder: "Club name (optional)", className: "w-full bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00] h-9" })),
                                react_1["default"].createElement("td", { className: "py-2 px-4 text-right" },
                                    react_1["default"].createElement("button", { type: "button", onClick: function () { return clearClubHistory(idx); }, disabled: !row.club, className: "disabled:opacity-30 disabled:cursor-not-allowed" },
                                        react_1["default"].createElement(lucide_react_1.Trash2, { className: "w-4 h-4 text-[#94A3B8] hover:text-red-500 transition-colors" }))))); })))),
                    react_1["default"].createElement("div", { className: "text-[10px] text-[#94A3B8] mt-3 font-sans" }, "Note: Up to 2 clubs per year. Add multiple entries for the same year if needed.")))),
            step === 4 && (react_1["default"].createElement("section", null,
                react_1["default"].createElement("div", { className: "text-[#FF6B00] text-[10px] font-bold tracking-[0.14em] uppercase mb-4 font-sans" }, "05 / About You"),
                react_1["default"].createElement("div", { className: "bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8" },
                    react_1["default"].createElement(label_1.Label, { htmlFor: "description", className: "text-xs font-semibold text-[#0F172A] dark:text-[#F5F5F5] mb-3 block font-sans" }, "Description"),
                    react_1["default"].createElement(textarea_1.Textarea, { id: "description", rows: 5, maxLength: 500, value: data.description, onChange: function (e) { return setData('description', e.target.value); }, placeholder: "Describe your playing style, strengths, and football journey...", className: "bg-white dark:bg-[#111111] border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-800 focus-visible:border-[#FF6B00] resize-none" }),
                    react_1["default"].createElement("div", { className: "flex justify-end mt-2" },
                        react_1["default"].createElement("span", { className: "text-xs font-mono " + (descCount > 450 ? 'text-[#FF6B00] font-bold' : 'text-[#94A3B8]') },
                            descCount,
                            " / 500")))))),
        react_1["default"].createElement("div", { className: "bg-white dark:bg-[#0D0D0D] border-t border-[#E2E8F0] dark:border-[#2A2A2A] fixed bottom-0 left-0 right-0 z-20 h-[68px] px-4 sm:px-8 flex items-center justify-between" },
            react_1["default"].createElement("div", { className: "hidden sm:flex items-center gap-2" },
                react_1["default"].createElement(lucide_react_1.CheckCircle2, { className: "text-green-500 w-4 h-4" }),
                react_1["default"].createElement("span", { className: "text-xs text-[#94A3B8] font-sans" }, "Draft saved 2 min ago")),
            react_1["default"].createElement("div", { className: "flex items-center gap-2 sm:gap-3 ml-auto" },
                react_1["default"].createElement(button_1.Button, { type: "button", variant: "ghost", onClick: goBack, disabled: step === 0, className: "text-[#475569] dark:text-[#9A9A9A] hover:text-[#0F172A] dark:hover:text-[#F5F5F5] hover:bg-[#F8FAFC] dark:hover:bg-[#1F1F1F] disabled:opacity-30" },
                    react_1["default"].createElement(lucide_react_1.ArrowLeft, { className: "w-4 h-4 mr-1" }),
                    "Back"),
                react_1["default"].createElement(button_1.Button, { type: "button", variant: "outline", className: "border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0F172A] dark:text-[#F5F5F5] hover:border-[#FF6B00] hover:text-[#FF6B00] bg-white dark:bg-[#1F1F1F]" }, "Save Draft"),
                step < STEPS.length - 1 ? (react_1["default"].createElement(button_1.Button, { type: "button", onClick: goNext, className: "bg-[#FF6B00] text-white hover:bg-[#CC5500]" },
                    "Next",
                    react_1["default"].createElement(lucide_react_1.ArrowRight, { className: "w-4 h-4 ml-1" }))) : (react_1["default"].createElement(button_1.Button, { type: "button", disabled: processing, className: "bg-[#FF6B00] text-white hover:bg-[#CC5500]" },
                    "Save & Publish",
                    react_1["default"].createElement(lucide_react_1.ArrowRight, { className: "w-4 h-4 ml-1" })))))));
}
exports["default"] = Edit;
