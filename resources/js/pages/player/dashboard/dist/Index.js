"use strict";
exports.__esModule = true;
var PlayerNavbar_1 = require("@/components/player/PlayerNavbar");
var avatar_1 = require("@/components/ui/avatar");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var progress_1 = require("@/components/ui/progress");
var react_1 = require("@inertiajs/react");
var lucide_react_1 = require("lucide-react");
var recharts_1 = require("recharts");
// MOCK DATA (realistic)
// TODO: Replace with usePage<PageProps & {player:typeof player, recentViews:typeof recentViews}>().props
var player = {
    name: 'Benjamin',
    profileComplete: 68,
    totalViews: 1247,
    trend: 12,
    scoutInterest: 23,
    avgRating: 4.2,
    subscription: 'free'
};
var recentViews = [
    { id: 1, type: 'Scout', org: 'FC Porto Scouting', country: 'Portugal', flag: '🇵🇹', time: '2 hours ago', locked: false },
    { id: 2, type: 'Club', org: 'Sporting Lisboa B', country: 'Portugal', flag: '🇵🇹', time: 'Yesterday', locked: false },
    { id: 3, type: 'Agent', org: 'Top Eleven Agency', country: 'Spain', flag: '🇪🇸', time: '2 days ago', locked: true },
    { id: 4, type: 'Scout', org: 'Anonymous', country: 'France', flag: '🇫🇷', time: '3 days ago', locked: true },
];
var countryData = [
    { country: 'Portugal', views: 412 },
    { country: 'Spain', views: 287 },
    { country: 'Brazil', views: 198 },
    { country: 'France', views: 156 },
    { country: 'England', views: 94 },
];
var sparklineData = [12, 18, 14, 22, 19, 28, 34];
function getGreeting() {
    var h = new Date().getHours();
    if (h < 12)
        return 'Good morning';
    if (h < 18)
        return 'Good afternoon';
    return 'Good evening';
}
function formatDate() {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function PlayerDashboard() {
    var greeting = getGreeting();
    var dateStr = formatDate();
    var circumference = 276.46;
    var dashOffset = circumference - (player.profileComplete / 100) * circumference;
    var checklistOverall = Math.round((3 / 6) * 100);
    // Sparkline path
    var sparkMax = Math.max.apply(Math, sparklineData);
    var sparkMin = Math.min.apply(Math, sparklineData);
    var sparkRange = sparkMax - sparkMin || 1;
    var sparkPoints = sparklineData
        .map(function (v, i) {
        var x = (i / (sparklineData.length - 1)) * 100;
        var y = 100 - ((v - sparkMin) / sparkRange) * 80 - 10;
        return x + "," + y;
    })
        .join(' ');
    return (React.createElement("div", { className: "min-h-screen bg-[#F8FAFC] pt-16 dark:bg-[#0D0D0D]" },
        React.createElement(PlayerNavbar_1["default"], null),
        React.createElement("header", { className: "border-b border-[#E2E8F0] bg-white px-4 py-5 sm:px-8 dark:border-[#2A2A2A] dark:bg-[#0D0D0D]" },
            React.createElement("div", { className: "mx-auto max-w-[1300px]" },
                React.createElement("h1", { className: "font-display text-2xl font-bold text-[#0F172A] sm:text-3xl dark:text-[#F5F5F5]" },
                    greeting,
                    ", ",
                    player.name),
                React.createElement("p", { className: "mt-1 text-sm text-[#475569] dark:text-[#9A9A9A]" }, dateStr))),
        React.createElement("main", { className: "mx-auto max-w-[1300px] space-y-6 px-4 py-6 sm:px-8 sm:py-8" },
            React.createElement("section", { className: "grid grid-cols-[320px_1fr] gap-4" },
                React.createElement("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2" },
                    React.createElement("div", { className: "flex flex-col items-center rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]" },
                        React.createElement("div", { className: "relative h-[112px] w-[112px]" },
                            React.createElement("svg", { width: "112", height: "112", viewBox: "0 0 112 112", className: "-rotate-90" },
                                React.createElement("circle", { cx: "56", cy: "56", r: "44", fill: "none", strokeWidth: "10", className: "stroke-[#E2E8F0] dark:stroke-[#2A2A2A]" }),
                                React.createElement("circle", { cx: "56", cy: "56", r: "44", fill: "none", stroke: "#FF6B00", strokeWidth: "10", strokeDasharray: circumference, strokeDashoffset: dashOffset, strokeLinecap: "round" })),
                            React.createElement("div", { className: "absolute inset-0 flex items-center justify-center" },
                                React.createElement("span", { className: "font-display text-3xl font-black text-[#0F172A] dark:text-[#F5F5F5]" },
                                    player.profileComplete,
                                    "%"))),
                        React.createElement("p", { className: "mt-3 text-xs tracking-wider text-[#94A3B8] uppercase" }, "Profile Complete"),
                        React.createElement("p", { className: "mt-2 text-[10px] font-medium text-[#FF6B00]" }, "Add video to reach 80%")),
                    React.createElement("div", { className: "rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]" },
                        React.createElement("div", { className: "flex items-start justify-between" },
                            React.createElement("div", null,
                                React.createElement("p", { className: "font-mono text-3xl font-black text-[#0F172A] dark:text-[#F5F5F5]" }, player.totalViews.toLocaleString('en-US')),
                                React.createElement("p", { className: "mt-1 text-sm text-[#475569] dark:text-[#9A9A9A]" }, "Profile Views")),
                            React.createElement(lucide_react_1.Eye, { className: "h-5 w-5 text-[#FF6B00]" })),
                        React.createElement("div", { className: "mt-2 flex items-center gap-1" },
                            React.createElement(lucide_react_1.TrendingUp, { className: "h-3 w-3 text-green-500 dark:text-green-400" }),
                            React.createElement("span", { className: "text-xs font-medium text-green-500 dark:text-green-400" },
                                player.trend,
                                "% this week")),
                        React.createElement("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "mt-2 h-12 w-full" },
                            React.createElement("polyline", { points: sparkPoints, fill: "none", stroke: "#FF6B00", strokeWidth: "2", vectorEffect: "non-scaling-stroke" }))),
                    React.createElement("div", { className: "rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]" },
                        React.createElement("div", { className: "flex items-start justify-between" },
                            React.createElement("div", null,
                                React.createElement("p", { className: "font-mono text-3xl font-black text-[#0F172A] dark:text-[#F5F5F5]" }, player.scoutInterest),
                                React.createElement("p", { className: "mt-1 text-sm text-[#475569] dark:text-[#9A9A9A]" }, "Scout Ratings")),
                            React.createElement(lucide_react_1.Star, { className: "h-5 w-5 fill-[#FF6B00] text-[#FF6B00]" })),
                        React.createElement("div", { className: "mt-2 flex items-center gap-1" },
                            React.createElement(lucide_react_1.Star, { className: "h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" }),
                            React.createElement("span", { className: "text-xs font-medium text-[#475569] dark:text-[#9A9A9A]" },
                                "Average ",
                                player.avgRating,
                                " / 5.0")),
                        React.createElement(progress_1.Progress, { value: 84, className: "mt-3 h-2 bg-[#E2E8F0] dark:bg-[#2A2A2A] [&>div]:bg-[#FF6B00]" })),
                    React.createElement("div", { className: "flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]" }, player.subscription === 'free' ? (React.createElement(React.Fragment, null,
                        React.createElement(badge_1.Badge, { className: "w-fit border border-[#FF6B00] bg-[#FFF3EB] text-[10px] font-bold tracking-wider text-[#CC5500] hover:bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]" }, "FREE PLAN"),
                        React.createElement("p", { className: "mt-3 flex-1 text-sm text-[#475569] dark:text-[#9A9A9A]" }, "Unlock all features and reach more scouts."),
                        React.createElement(react_1.Link, { href: "/player/upgrade", className: "mt-3" },
                            React.createElement(button_1.Button, { className: "w-full bg-[#FF6B00] p-3 font-semibold text-white hover:bg-[#CC5500]" },
                                React.createElement(lucide_react_1.Crown, { className: "mr-1.5 h-3.5 w-3.5" }),
                                React.createElement("span", { className: "text-[12px]" },
                                    "Upgrade to ",
                                    React.createElement("br", { className: "block" }),
                                    " Premium"))))) : (React.createElement(React.Fragment, null,
                        React.createElement(badge_1.Badge, { className: "w-fit border border-green-600 bg-green-100 text-[10px] font-bold tracking-wider text-green-700 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400" }, "PREMIUM ACTIVE"),
                        React.createElement("p", { className: "mt-3 flex-1 text-sm text-[#475569] dark:text-[#9A9A9A]" }, "All features unlocked."),
                        React.createElement("p", { className: "mt-3 text-xs text-[#94A3B8]" }, "Renews 01/06/2026"))))),
                React.createElement("div", null,
                    React.createElement("div", { className: "overflow-hidden border-1 border-red-500 text-white" },
                        React.createElement("div", { className: "flex justify-between" },
                            React.createElement("div", { className: "mb-10" },
                                React.createElement("img", { src: "/images/img/new_logo.png", alt: "new-logo" })),
                            React.createElement("div", null,
                                React.createElement("h2", { className: "text-[14px] sm:text-[16px] md:text-[20px] lg:text-[22px] font-bold uppercase" }, "MEMBER CARD"),
                                React.createElement("p", { className: "mt-2 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-semibold text-orange-500 uppercase" }, "Official Member"),
                                React.createElement("svg", { width: "180", height: "24", viewBox: "0 0 180 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                    React.createElement("line", { x1: "10", y1: "12", x2: "70", y2: "12", stroke: "#6B7280", strokeWidth: "1" }),
                                    React.createElement("path", { d: "M90 4L92.35 9.15L98 9.8L94 13.6L95.2 19L90 16L84.8 19L86 13.6L82 9.8L87.65 9.15L90 4Z", fill: "#F97316" }),
                                    React.createElement("line", { x1: "110", y1: "12", x2: "170", y2: "12", stroke: "#6B7280", strokeWidth: "1" })))),
                        React.createElement("div", { className: "flex gap-6 px-2 pt-6" },
                            React.createElement("div", { className: "h-[320px] w-[240px] border-2 border-gray-500 rounded-[20px]" },
                                React.createElement("img", { src: "/images/img/p-6.png", alt: "player", className: "h-full w-full object-cover" })),
                            React.createElement("div", null,
                                React.createElement("h3", { className: "mt-8 text-[16px] sm:text-[22px] md:text-[30px] lg:text-[38px] font-bold uppercase" }, "JO\u00C3O DA SILVA"),
                                React.createElement("p", { className: "mt-2 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-orange-500 uppercase" }, "ATTACKING MIDFIELDER"),
                                React.createElement("div", { className: "mt-5 h-[2px] w-[100px] bg-orange-500" }),
                                React.createElement("div", { className: "mt-8 space-y-7" },
                                    React.createElement("div", { className: "flex" },
                                        React.createElement(lucide_react_1.User, { size: 20, className: "text-orange-500" }),
                                        React.createElement("p", { className: "text-[10px] text-gray-400 uppercase" },
                                            "ID:",
                                            React.createElement("br", null),
                                            React.createElement("span", { className: "text-[12px] text-white" }, "HLF-00012345"))),
                                    React.createElement("div", { className: "flex" },
                                        React.createElement(lucide_react_1.CalendarDays, { size: 20, className: "text-orange-500" }),
                                        React.createElement("p", { className: "text-[10px] text-gray-400 uppercase" },
                                            "DATE OF BIRTH:",
                                            React.createElement("br", null),
                                            React.createElement("span", { className: "text-[12px] text-white" }, "15 / 05 / 2006"))),
                                    React.createElement("div", { className: "flex" },
                                        React.createElement(lucide_react_1.Flag, { size: 20, className: "text-orange-500" }),
                                        React.createElement("p", { className: "text-[10px] text-gray-400 uppercase" },
                                            "NATIONALITY:",
                                            React.createElement("br", null),
                                            React.createElement("span", { className: "text-[12px] text-white" }, "Brazil"))),
                                    React.createElement("div", { className: "flex items-center" },
                                        React.createElement(lucide_react_1.MapPin, { size: 20, className: "text-orange-500" }),
                                        React.createElement("p", { className: "text-[10px] text-gray-400 uppercase" },
                                            "CITY:",
                                            React.createElement("br", null),
                                            React.createElement("span", { className: "text-[12px] text-white" }, "RIO DE JANEIRO - RJ")))))),
                        React.createElement("div", { className: "" })))),
            React.createElement("section", null,
                React.createElement("div", { className: "relative flex h-[90px] items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] px-4 sm:gap-4 sm:px-6" },
                    React.createElement("div", { className: "flex flex-shrink-0 items-center gap-3" },
                        React.createElement("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6B00]" },
                            React.createElement(lucide_react_1.ArrowRight, { className: "h-5 w-5 text-white" })),
                        React.createElement("div", { className: "hidden sm:block" },
                            React.createElement("p", { className: "text-lg leading-none font-black tracking-tight text-white" }, "TRANSFERROOM"),
                            React.createElement("p", { className: "mt-0.5 text-[10px] tracking-wider text-white/50 uppercase" }, "Football Transfer Network"))),
                    React.createElement("p", { className: "hidden flex-1 text-xs text-white/70 sm:text-sm md:block" }, "The transfer platform trusted by 1,200+ clubs worldwide."),
                    React.createElement(button_1.Button, { size: "sm", className: "ml-auto flex-shrink-0 bg-[#FF6B00] font-semibold text-white hover:bg-[#CC5500]" }, "Start Free \u2192"),
                    React.createElement("span", { className: "absolute top-1 right-2 text-[10px] text-white/30" }, "Sponsored"))),
            React.createElement("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2" },
                React.createElement("section", { className: "rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]" },
                    React.createElement("div", { className: "mb-1 flex items-center justify-between" },
                        React.createElement("h2", { className: "text-lg font-bold text-[#0F172A] dark:text-[#F5F5F5]" }, "Complete Your Profile"),
                        React.createElement("span", { className: "font-mono text-sm font-bold text-[#FF6B00]" },
                            checklistOverall,
                            "%")),
                    React.createElement(progress_1.Progress, { value: checklistOverall, className: "mb-5 h-2 bg-[#E2E8F0] dark:bg-[#2A2A2A] [&>div]:bg-[#FF6B00]" }),
                    React.createElement("ul", { className: "space-y-3" },
                        React.createElement("li", { className: "flex items-center gap-3 py-2" },
                            React.createElement(lucide_react_1.CheckCircle2, { className: "h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" }),
                            React.createElement("span", { className: "flex-1 text-sm text-[#0F172A] dark:text-[#F5F5F5]" }, "Basic information added")),
                        React.createElement("li", { className: "flex items-center gap-3 py-2" },
                            React.createElement(lucide_react_1.CheckCircle2, { className: "h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" }),
                            React.createElement("span", { className: "flex-1 text-sm text-[#0F172A] dark:text-[#F5F5F5]" }, "Profile photo uploaded")),
                        React.createElement("li", { className: "flex items-center gap-3 py-2" },
                            React.createElement(lucide_react_1.CheckCircle2, { className: "h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" }),
                            React.createElement("span", { className: "flex-1 text-sm text-[#0F172A] dark:text-[#F5F5F5]" }, "Position and modality set")),
                        React.createElement("li", { className: "flex items-center gap-3 border-t border-[#E2E8F0] py-2 pt-3 dark:border-[#2A2A2A]" },
                            React.createElement(lucide_react_1.Circle, { className: "h-5 w-5 flex-shrink-0 text-[#94A3B8] dark:text-[#555555]" }),
                            React.createElement("span", { className: "flex-1 text-sm text-[#475569] dark:text-[#9A9A9A]" }, "Add highlight video"),
                            React.createElement(react_1.Link, { href: "/player/videos/new" },
                                React.createElement(button_1.Button, { size: "sm", className: "h-8 bg-[#FF6B00] text-xs text-white hover:bg-[#CC5500]" },
                                    React.createElement(lucide_react_1.Video, { className: "mr-1 h-3 w-3" }),
                                    "Add Video"))),
                        React.createElement("li", { className: "flex items-center gap-3 py-2" },
                            React.createElement(lucide_react_1.Circle, { className: "h-5 w-5 flex-shrink-0 text-[#94A3B8] dark:text-[#555555]" }),
                            React.createElement("span", { className: "flex-1 text-sm text-[#475569] dark:text-[#9A9A9A]" }, "Add club history"),
                            React.createElement(react_1.Link, { href: "/player/history" },
                                React.createElement(button_1.Button, { size: "sm", className: "h-8 bg-[#FF6B00] text-xs text-white hover:bg-[#CC5500]" },
                                    React.createElement(lucide_react_1.History, { className: "mr-1 h-3 w-3" }),
                                    "Add History"))),
                        React.createElement("li", { className: "flex items-center gap-3 py-2" },
                            React.createElement(lucide_react_1.Circle, { className: "h-5 w-5 flex-shrink-0 text-[#94A3B8] dark:text-[#555555]" }),
                            React.createElement("span", { className: "flex-1 text-sm text-[#475569] dark:text-[#9A9A9A]" }, "Upgrade to Premium"),
                            React.createElement(react_1.Link, { href: "/player/upgrade" },
                                React.createElement(button_1.Button, { size: "sm", className: "h-8 bg-[#FF6B00] text-xs text-white hover:bg-[#CC5500]" }, "Upgrade \u2192"))))),
                React.createElement("section", { className: "rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]" },
                    React.createElement("div", { className: "mb-5 flex items-start justify-between" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-lg font-bold text-[#0F172A] dark:text-[#F5F5F5]" }, "Recent Profile Views"),
                            React.createElement("p", { className: "mt-1 text-xs text-[#94A3B8]" }, "Who visited your profile")),
                        React.createElement(react_1.Link, { href: "/player/views", className: "text-xs font-semibold text-[#FF6B00] hover:text-[#CC5500]" }, "View all \u2192")),
                    React.createElement("ul", { className: "space-y-3" }, recentViews.map(function (view) {
                        var initials = view.org
                            .split(' ')
                            .slice(0, 2)
                            .map(function (w) { return w[0]; })
                            .join('')
                            .toUpperCase();
                        return (React.createElement("li", { key: view.id, className: "relative flex items-center gap-3 rounded-xl border border-[#E2E8F0] p-3 transition-colors hover:border-[#FF6B00] dark:border-[#2A2A2A] dark:hover:border-[#FF6B00]" },
                            React.createElement("div", { className: view.locked ? 'flex flex-1 items-center gap-3 blur-sm filter' : 'flex flex-1 items-center gap-3' },
                                React.createElement(avatar_1.Avatar, { className: "h-10 w-10 flex-shrink-0" },
                                    React.createElement(avatar_1.AvatarFallback, { className: "bg-[#FFF3EB] text-xs font-bold text-[#CC5500] dark:bg-[rgba(255,107,0,0.12)]" }, initials)),
                                React.createElement("div", { className: "min-w-0 flex-1" },
                                    React.createElement("p", { className: "truncate text-sm font-semibold text-[#0F172A] dark:text-[#F5F5F5]" },
                                        view.type,
                                        " from ",
                                        view.org),
                                    React.createElement("div", { className: "mt-0.5 flex items-center gap-2" },
                                        React.createElement("span", { className: "text-xs text-[#475569] dark:text-[#9A9A9A]" },
                                            view.flag,
                                            " ",
                                            view.country),
                                        React.createElement("span", { className: "text-[#94A3B8]" }, "\u2022"),
                                        React.createElement("span", { className: "text-xs text-[#94A3B8]" }, view.time))),
                                !view.locked && (React.createElement(react_1.Link, { href: "/player/views/" + view.id, className: "flex-shrink-0 text-xs font-semibold text-[#FF6B00] hover:text-[#CC5500]" }, "View \u2192"))),
                            view.locked && (React.createElement("div", { className: "absolute inset-0 flex items-center justify-center rounded-xl bg-white/60 dark:bg-[#161616]/60" },
                                React.createElement("div", { className: "flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 dark:border-[#2A2A2A] dark:bg-[#1F1F1F]" },
                                    React.createElement(lucide_react_1.Lock, { className: "h-3.5 w-3.5 text-[#FF6B00]" }),
                                    React.createElement("span", { className: "text-xs font-medium text-[#475569] dark:text-[#9A9A9A]" }, "Upgrade to Premium to unlock"))))));
                    })))),
            React.createElement("section", { className: "relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#161616]" },
                React.createElement("div", { className: "mb-5 flex items-start justify-between" },
                    React.createElement("div", null,
                        React.createElement("h2", { className: "text-lg font-bold text-[#0F172A] dark:text-[#F5F5F5]" }, "Country Analytics"),
                        React.createElement("p", { className: "mt-1 text-xs text-[#94A3B8]" }, "Where your profile views come from")),
                    player.subscription === 'premium' && (React.createElement(badge_1.Badge, { className: "border border-[#FF6B00] bg-[#FFF3EB] text-[10px] font-bold tracking-wider text-[#CC5500] hover:bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]" }, "PREMIUM"))),
                React.createElement("div", { className: player.subscription === 'free' ? 'pointer-events-none blur-md filter select-none' : '' },
                    React.createElement("div", { className: "h-[280px] w-full" },
                        React.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: "100%" },
                            React.createElement(recharts_1.BarChart, { data: countryData, margin: { top: 10, right: 10, left: 0, bottom: 0 } },
                                React.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3", stroke: "#E2E8F0", className: "dark:stroke-[#2A2A2A]", vertical: false }),
                                React.createElement(recharts_1.XAxis, { dataKey: "country", stroke: "#94A3B8", style: { fontSize: '12px' }, tickLine: false, axisLine: false }),
                                React.createElement(recharts_1.YAxis, { stroke: "#94A3B8", style: { fontSize: '12px' }, tickLine: false, axisLine: false }),
                                React.createElement(recharts_1.Tooltip, { contentStyle: {
                                        background: '#161616',
                                        border: '1px solid #2A2A2A',
                                        borderRadius: '8px',
                                        color: '#F5F5F5',
                                        fontSize: '12px'
                                    }, cursor: { fill: 'rgba(255,107,0,0.08)' } }),
                                React.createElement(recharts_1.Bar, { dataKey: "views", fill: "#FF6B00", radius: [6, 6, 0, 0] }))))),
                player.subscription === 'free' && (React.createElement("div", { className: "absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-[#161616]/40" },
                    React.createElement("div", { className: "mx-4 max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-xl dark:border-[#2A2A2A] dark:bg-[#1F1F1F]" },
                        React.createElement("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF3EB] dark:bg-[rgba(255,107,0,0.12)]" },
                            React.createElement(lucide_react_1.Lock, { className: "h-6 w-6 text-[#FF6B00]" })),
                        React.createElement("h3", { className: "text-base font-bold text-[#0F172A] dark:text-[#F5F5F5]" }, "Country Analytics \u2014 Premium Feature"),
                        React.createElement("p", { className: "mt-2 text-sm text-[#475569] dark:text-[#9A9A9A]" }, "See exactly which countries are watching your highlights."),
                        React.createElement(react_1.Link, { href: "/player/upgrade", className: "mt-4 inline-block" },
                            React.createElement(button_1.Button, { className: "bg-[#FF6B00] font-semibold text-white hover:bg-[#CC5500]" },
                                React.createElement(lucide_react_1.Crown, { className: "mr-2 h-4 w-4" }),
                                "Upgrade to Premium")))))))));
}
exports["default"] = PlayerDashboard;
