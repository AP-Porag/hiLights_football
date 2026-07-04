"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@inertiajs/react");
var AdminLayout_1 = require("@/components/admin/AdminLayout");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var table_1 = require("@/components/ui/table");
var dialog_1 = require("@/components/ui/dialog");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
// TODO: Replace with usePage().props
var ratings = [
    {
        id: 1,
        scout: {
            id: 1,
            name: 'James Robertson',
            avatar: 'https://i.pravatar.cc/150?img=12',
            organization: 'Manchester City FC',
            country: 'England'
        },
        player: {
            id: 101,
            name: 'Lucas Almeida',
            avatar: 'https://i.pravatar.cc/150?img=33',
            position: 'CAM',
            club: 'Santos FC U-20',
            age: 18
        },
        technical: 4.5,
        physical: 4.0,
        mental: 4.5,
        overall: 4.3,
        notes: 'Exceptional vision and ball control under pressure. Showed maturity beyond his years in the final third. Needs to add upper body strength to compete in European leagues. Recommended for follow-up in 6 months. Compares stylistically to a young Bernardo Silva.',
        date: '2026-05-14',
        matchContext: 'Santos vs Palmeiras — Copa Sao Paulo'
    },
    {
        id: 2,
        scout: {
            id: 2,
            name: 'Mateus Carvalho',
            avatar: 'https://i.pravatar.cc/150?img=15',
            organization: 'TransferRoom Network',
            country: 'Portugal'
        },
        player: {
            id: 102,
            name: 'Rafael Mendes',
            avatar: 'https://i.pravatar.cc/150?img=52',
            position: 'CB',
            club: 'Flamengo U-19',
            age: 17
        },
        technical: 3.5,
        physical: 5.0,
        mental: 4.0,
        overall: 4.2,
        notes: 'Dominant physical presence. Aerial duels won at elite percentage. Distribution needs work — short passing solid but range limited. Strong leadership traits.',
        date: '2026-05-13',
        matchContext: 'Flamengo vs Vasco — Carioca U-19'
    },
    {
        id: 3,
        scout: {
            id: 3,
            name: 'Sophie Laurent',
            avatar: 'https://i.pravatar.cc/150?img=44',
            organization: 'AS Monaco',
            country: 'France'
        },
        player: {
            id: 103,
            name: 'Diego Santana',
            avatar: 'https://i.pravatar.cc/150?img=68',
            position: 'LW',
            club: 'Gremio U-20',
            age: 19
        },
        technical: 5.0,
        physical: 3.5,
        mental: 4.0,
        overall: 4.2,
        notes: 'Elite dribbling, two-footed, can play both wings. Defensive work-rate inconsistent. Decision-making in final third top tier. Should be tracked closely.',
        date: '2026-05-12',
        matchContext: 'Gremio vs Internacional — Gauchao U-20'
    },
    {
        id: 4,
        scout: {
            id: 1,
            name: 'James Robertson',
            avatar: 'https://i.pravatar.cc/150?img=12',
            organization: 'Manchester City FC',
            country: 'England'
        },
        player: {
            id: 104,
            name: 'Bruno Oliveira',
            avatar: 'https://i.pravatar.cc/150?img=70',
            position: 'CDM',
            club: 'Sao Paulo U-20',
            age: 18
        },
        technical: 4.0,
        physical: 4.0,
        mental: 4.5,
        overall: 4.2,
        notes: 'Reads the game brilliantly. Tackling timing exceptional. Lacks top-end pace but compensates with positioning.',
        date: '2026-05-11',
        matchContext: 'Sao Paulo vs Corinthians — Paulista U-20'
    },
    {
        id: 5,
        scout: {
            id: 4,
            name: 'Klaus Weber',
            avatar: 'https://i.pravatar.cc/150?img=8',
            organization: 'Wyscout Analytics',
            country: 'Germany'
        },
        player: {
            id: 105,
            name: 'Pedro Costa',
            avatar: 'https://i.pravatar.cc/150?img=53',
            position: 'ST',
            club: 'Atletico MG U-20',
            age: 19
        },
        technical: 4.0,
        physical: 4.5,
        mental: 3.5,
        overall: 4.0,
        notes: 'Clinical finisher inside the box. Off-the-ball movement improving. Mental side needs maturity — overreacts to officials.',
        date: '2026-05-10',
        matchContext: 'Atletico MG vs Cruzeiro — Mineiro U-20'
    },
    {
        id: 6,
        scout: {
            id: 5,
            name: 'Andrea Bianchi',
            avatar: 'https://i.pravatar.cc/150?img=20',
            organization: 'Juventus FC',
            country: 'Italy'
        },
        player: {
            id: 106,
            name: 'Thiago Ferreira',
            avatar: 'https://i.pravatar.cc/150?img=60',
            position: 'RB',
            club: 'Corinthians U-19',
            age: 17
        },
        technical: 3.5,
        physical: 4.0,
        mental: 4.0,
        overall: 3.8,
        notes: 'Modern fullback profile. Strong overlapping runs, decent crossing. Defensive 1v1 needs sharpening.',
        date: '2026-05-09',
        matchContext: 'Corinthians vs Santos — Paulista U-19'
    },
    {
        id: 7,
        scout: {
            id: 2,
            name: 'Mateus Carvalho',
            avatar: 'https://i.pravatar.cc/150?img=15',
            organization: 'TransferRoom Network',
            country: 'Portugal'
        },
        player: {
            id: 107,
            name: 'Gabriel Souza',
            avatar: 'https://i.pravatar.cc/150?img=11',
            position: 'GK',
            club: 'Palmeiras U-20',
            age: 18
        },
        technical: 4.0,
        physical: 4.5,
        mental: 4.0,
        overall: 4.2,
        notes: 'Excellent shot-stopper. Distribution with both feet is a strong asset. Command of box improving with experience.',
        date: '2026-05-08',
        matchContext: 'Palmeiras vs Santos — Paulista U-20'
    },
];
var summary = {
    avgRating: 4.1,
    totalRatings: 1247,
    topScout: {
        name: 'James Robertson',
        organization: 'Manchester City FC',
        count: 184,
        avatar: 'https://i.pravatar.cc/150?img=12'
    }
};
var mostRatedPlayers = [
    { id: 101, name: 'Lucas Almeida', position: 'CAM', club: 'Santos FC U-20', ratings: 42, avg: 4.5, avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: 103, name: 'Diego Santana', position: 'LW', club: 'Gremio U-20', ratings: 38, avg: 4.3, avatar: 'https://i.pravatar.cc/150?img=68' },
    { id: 102, name: 'Rafael Mendes', position: 'CB', club: 'Flamengo U-19', ratings: 34, avg: 4.2, avatar: 'https://i.pravatar.cc/150?img=52' },
    { id: 104, name: 'Bruno Oliveira', position: 'CDM', club: 'Sao Paulo U-20', ratings: 29, avg: 4.1, avatar: 'https://i.pravatar.cc/150?img=70' },
    { id: 105, name: 'Pedro Costa', position: 'ST', club: 'Atletico MG U-20', ratings: 27, avg: 4.0, avatar: 'https://i.pravatar.cc/150?img=53' },
];
var mostActiveScouts = [
    { id: 1, name: 'James Robertson', organization: 'Manchester City FC', country: 'England', ratings: 184, avgGiven: 4.0, avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 2, name: 'Mateus Carvalho', organization: 'TransferRoom Network', country: 'Portugal', ratings: 152, avgGiven: 4.1, avatar: 'https://i.pravatar.cc/150?img=15' },
    { id: 3, name: 'Sophie Laurent', organization: 'AS Monaco', country: 'France', ratings: 138, avgGiven: 4.2, avatar: 'https://i.pravatar.cc/150?img=44' },
    { id: 4, name: 'Klaus Weber', organization: 'Wyscout Analytics', country: 'Germany', ratings: 121, avgGiven: 3.9, avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 5, name: 'Andrea Bianchi', organization: 'Juventus FC', country: 'Italy', ratings: 109, avgGiven: 4.0, avatar: 'https://i.pravatar.cc/150?img=20' },
];
function StarsInline(_a) {
    var value = _a.value, _b = _a.max, max = _b === void 0 ? 5 : _b;
    var filled = Math.round(value);
    return (React.createElement("div", { className: "flex items-center gap-0.5" },
        Array.from({ length: max }).map(function (_, i) { return (React.createElement(lucide_react_1.Star, { key: i, className: "w-3 h-3 " + (i < filled
                ? 'fill-[#FF6B00] text-[#FF6B00]'
                : 'fill-transparent text-[#CBD5E1] dark:text-[#2A2A2A]') })); }),
        React.createElement("span", { className: "ml-1.5 font-mono text-xs text-[#0F172A] dark:text-[#F5F5F5]" }, value.toFixed(1))));
}
function StarsLarge(_a) {
    var value = _a.value, label = _a.label, _b = _a.max, max = _b === void 0 ? 5 : _b;
    var filled = Math.round(value);
    return (React.createElement("div", { className: "rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4" },
        React.createElement("div", { className: "text-xs font-medium uppercase tracking-wider text-[#475569]" }, label),
        React.createElement("div", { className: "mt-2 flex items-center gap-1" }, Array.from({ length: max }).map(function (_, i) { return (React.createElement(lucide_react_1.Star, { key: i, className: "w-5 h-5 " + (i < filled
                ? 'fill-[#FF6B00] text-[#FF6B00]'
                : 'fill-transparent text-[#CBD5E1]') })); })),
        React.createElement("div", { className: "mt-2 font-mono text-2xl font-semibold text-[#0F172A]" }, value.toFixed(1))));
}
function RatingsIndex() {
    var _a = react_1.useState(''), search = _a[0], setSearch = _a[1];
    var _b = react_1.useState('all'), scoutFilter = _b[0], setScoutFilter = _b[1];
    var _c = react_1.useState(null), viewRating = _c[0], setViewRating = _c[1];
    var _d = react_1.useState(null), deleteRating = _d[0], setDeleteRating = _d[1];
    var filtered = ratings.filter(function (r) {
        var q = search.toLowerCase();
        var matchesSearch = !q ||
            r.scout.name.toLowerCase().includes(q) ||
            r.player.name.toLowerCase().includes(q) ||
            r.scout.organization.toLowerCase().includes(q);
        var matchesScout = scoutFilter === 'all' || String(r.scout.id) === scoutFilter;
        return matchesSearch && matchesScout;
    });
    var handleDelete = function () {
        // TODO: router.delete(route('admin.ratings.destroy', deleteRating.id))
        setDeleteRating(null);
    };
    return (React.createElement(AdminLayout_1["default"], { pageTitle: "Scout Ratings" },
        React.createElement("div", { className: "space-y-6" },
            React.createElement("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" },
                React.createElement("div", null,
                    React.createElement("h1", { className: "font-display text-3xl font-bold uppercase tracking-tight text-[#0F172A]" }, "Scout Ratings"),
                    React.createElement("p", { className: "mt-1 text-sm text-[#475569]" }, "Monitor all ratings submitted by scouts across the platform.")),
                React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement(button_1.Button, { variant: "outline", className: "border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]" },
                        React.createElement(lucide_react_1.Download, { className: "mr-2 h-4 w-4" }),
                        "Export CSV"))),
            React.createElement("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3" },
                React.createElement(card_1.Card, { className: "border-[#E2E8F0] bg-white" },
                    React.createElement(card_1.CardContent, { className: "p-6" },
                        React.createElement("div", { className: "flex items-start justify-between" },
                            React.createElement("div", { className: "flex-1" },
                                React.createElement("div", { className: "text-xs font-medium uppercase tracking-wider text-[#475569]" }, "Average Rating"),
                                React.createElement("div", { className: "mt-3 font-mono text-4xl font-bold text-[#0F172A]" }, summary.avgRating.toFixed(1)),
                                React.createElement("div", { className: "mt-2 flex items-center gap-0.5" }, Array.from({ length: 5 }).map(function (_, i) { return (React.createElement(lucide_react_1.Star, { key: i, className: "w-4 h-4 " + (i < Math.round(summary.avgRating)
                                        ? 'fill-[#FF6B00] text-[#FF6B00]'
                                        : 'fill-transparent text-[#CBD5E1]') })); })),
                                React.createElement("div", { className: "mt-3 inline-flex items-center gap-1 text-xs text-[#16A34A]" },
                                    React.createElement(lucide_react_1.TrendingUp, { className: "h-3 w-3" }),
                                    React.createElement("span", { className: "font-mono" }, "+0.2"),
                                    React.createElement("span", { className: "text-[#475569]" }, "vs last month"))),
                            React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF3EB]" },
                                React.createElement(lucide_react_1.Star, { className: "h-5 w-5 fill-[#FF6B00] text-[#FF6B00]" }))))),
                React.createElement(card_1.Card, { className: "border-[#E2E8F0] bg-white" },
                    React.createElement(card_1.CardContent, { className: "p-6" },
                        React.createElement("div", { className: "flex items-start justify-between" },
                            React.createElement("div", { className: "flex-1" },
                                React.createElement("div", { className: "text-xs font-medium uppercase tracking-wider text-[#475569]" }, "Total Ratings"),
                                React.createElement("div", { className: "mt-3 font-mono text-4xl font-bold text-[#0F172A]" }, summary.totalRatings.toLocaleString()),
                                React.createElement("div", { className: "mt-2 text-xs text-[#475569]" },
                                    "Across ",
                                    React.createElement("span", { className: "font-mono text-[#0F172A]" }, "312"),
                                    " players"),
                                React.createElement("div", { className: "mt-3 inline-flex items-center gap-1 text-xs text-[#16A34A]" },
                                    React.createElement(lucide_react_1.TrendingUp, { className: "h-3 w-3" }),
                                    React.createElement("span", { className: "font-mono" }, "+184"),
                                    React.createElement("span", { className: "text-[#475569]" }, "this month"))),
                            React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF3EB]" },
                                React.createElement(lucide_react_1.Users, { className: "h-5 w-5 text-[#FF6B00]" }))))),
                React.createElement(card_1.Card, { className: "border-[#E2E8F0] bg-white" },
                    React.createElement(card_1.CardContent, { className: "p-6" },
                        React.createElement("div", { className: "flex items-start justify-between" },
                            React.createElement("div", { className: "flex-1" },
                                React.createElement("div", { className: "text-xs font-medium uppercase tracking-wider text-[#475569]" }, "Top Scout"),
                                React.createElement("div", { className: "mt-3 flex items-center gap-3" },
                                    React.createElement("img", { src: summary.topScout.avatar, alt: summary.topScout.name, className: "h-10 w-10 rounded-full border border-[#E2E8F0] object-cover" }),
                                    React.createElement("div", { className: "min-w-0 flex-1" },
                                        React.createElement("div", { className: "truncate font-display text-lg font-semibold text-[#0F172A]" }, summary.topScout.name),
                                        React.createElement("div", { className: "truncate text-xs text-[#475569]" }, summary.topScout.organization))),
                                React.createElement("div", { className: "mt-3 inline-flex items-center gap-1.5 rounded-md bg-[#FFF3EB] px-2 py-1" },
                                    React.createElement(lucide_react_1.Award, { className: "h-3 w-3 text-[#FF6B00]" }),
                                    React.createElement("span", { className: "font-mono text-xs font-semibold text-[#CC5500]" }, summary.topScout.count),
                                    React.createElement("span", { className: "text-xs text-[#CC5500]" }, "ratings submitted"))))))),
            React.createElement(card_1.Card, { className: "border-[#E2E8F0] bg-white" },
                React.createElement(card_1.CardHeader, { className: "border-b border-[#E2E8F0] p-6" },
                    React.createElement("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" },
                        React.createElement(card_1.CardTitle, { className: "font-display text-lg font-semibold uppercase tracking-wide text-[#0F172A]" }, "All Ratings"),
                        React.createElement("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center" },
                            React.createElement("div", { className: "relative" },
                                React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" }),
                                React.createElement(input_1.Input, { placeholder: "Search scout or player...", value: search, onChange: function (e) { return setSearch(e.target.value); }, className: "w-full border-[#E2E8F0] bg-white pl-9 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 sm:w-72" })),
                            React.createElement(select_1.Select, { value: scoutFilter, onValueChange: setScoutFilter },
                                React.createElement(select_1.SelectTrigger, { className: "w-full border-[#E2E8F0] bg-white text-sm text-[#0F172A] sm:w-48" },
                                    React.createElement(lucide_react_1.Filter, { className: "mr-2 h-4 w-4 text-[#94A3B8]" }),
                                    React.createElement(select_1.SelectValue, { placeholder: "All scouts" })),
                                React.createElement(select_1.SelectContent, null,
                                    React.createElement(select_1.SelectItem, { value: "all" }, "All Scouts"),
                                    React.createElement(select_1.SelectItem, { value: "1" }, "James Robertson"),
                                    React.createElement(select_1.SelectItem, { value: "2" }, "Mateus Carvalho"),
                                    React.createElement(select_1.SelectItem, { value: "3" }, "Sophie Laurent"),
                                    React.createElement(select_1.SelectItem, { value: "4" }, "Klaus Weber"),
                                    React.createElement(select_1.SelectItem, { value: "5" }, "Andrea Bianchi")))))),
                React.createElement(card_1.CardContent, { className: "p-0" },
                    React.createElement("div", { className: "overflow-x-auto" },
                        React.createElement(table_1.Table, null,
                            React.createElement(table_1.TableHeader, null,
                                React.createElement(table_1.TableRow, { className: "border-[#E2E8F0] hover:bg-transparent" },
                                    React.createElement(table_1.TableHead, { className: "px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]" }, "Scout"),
                                    React.createElement(table_1.TableHead, { className: "py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]" }, "Player"),
                                    React.createElement(table_1.TableHead, { className: "py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]" }, "Technical"),
                                    React.createElement(table_1.TableHead, { className: "py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]" }, "Physical"),
                                    React.createElement(table_1.TableHead, { className: "py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]" }, "Mental"),
                                    React.createElement(table_1.TableHead, { className: "py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]" }, "Overall"),
                                    React.createElement(table_1.TableHead, { className: "py-3 text-xs font-semibold uppercase tracking-wider text-[#475569]" }, "Date"),
                                    React.createElement(table_1.TableHead, { className: "px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#475569]" }, "Actions"))),
                            React.createElement(table_1.TableBody, null, filtered.map(function (rating) { return (React.createElement(table_1.TableRow, { key: rating.id, className: "border-[#E2E8F0] hover:bg-[#F8FAFC]" },
                                React.createElement(table_1.TableCell, { className: "px-6 py-4" },
                                    React.createElement("div", { className: "flex items-center gap-3" },
                                        React.createElement("img", { src: rating.scout.avatar, alt: rating.scout.name, className: "h-9 w-9 rounded-full border border-[#E2E8F0] object-cover" }),
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "text-sm font-semibold text-[#0F172A]" }, rating.scout.name),
                                            React.createElement("div", { className: "text-xs text-[#475569]" }, rating.scout.organization)))),
                                React.createElement(table_1.TableCell, { className: "py-4" },
                                    React.createElement("div", { className: "flex items-center gap-3" },
                                        React.createElement("img", { src: rating.player.avatar, alt: rating.player.name, className: "h-9 w-9 rounded-full border border-[#E2E8F0] object-cover" }),
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "flex items-center gap-2" },
                                                React.createElement("span", { className: "text-sm font-semibold text-[#0F172A]" }, rating.player.name),
                                                React.createElement("span", { className: "rounded border border-[#FF6B00] bg-[#FFF3EB] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#CC5500]" }, rating.player.position)),
                                            React.createElement("div", { className: "text-xs text-[#475569]" }, rating.player.club)))),
                                React.createElement(table_1.TableCell, { className: "py-4" },
                                    React.createElement(StarsInline, { value: rating.technical })),
                                React.createElement(table_1.TableCell, { className: "py-4" },
                                    React.createElement(StarsInline, { value: rating.physical })),
                                React.createElement(table_1.TableCell, { className: "py-4" },
                                    React.createElement(StarsInline, { value: rating.mental })),
                                React.createElement(table_1.TableCell, { className: "py-4" },
                                    React.createElement("div", { className: "inline-flex items-center gap-1.5 rounded-md bg-[#FFF3EB] px-2 py-1" },
                                        React.createElement(lucide_react_1.Star, { className: "h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" }),
                                        React.createElement("span", { className: "font-mono text-sm font-semibold text-[#CC5500]" }, rating.overall.toFixed(1)))),
                                React.createElement(table_1.TableCell, { className: "py-4" },
                                    React.createElement("div", { className: "font-mono text-xs text-[#475569]" }, new Date(rating.date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    }))),
                                React.createElement(table_1.TableCell, { className: "px-6 py-4 text-right" },
                                    React.createElement("div", { className: "flex items-center justify-end gap-1" },
                                        React.createElement(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setViewRating(rating); }, className: "h-8 w-8 p-0 text-[#475569] hover:bg-[#FFF3EB] hover:text-[#FF6B00]" },
                                            React.createElement(lucide_react_1.Eye, { className: "h-4 w-4" })),
                                        React.createElement(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setDeleteRating(rating); }, className: "h-8 w-8 p-0 text-[#475569] hover:bg-red-50 hover:text-[#DC2626]" },
                                            React.createElement(lucide_react_1.Trash2, { className: "h-4 w-4" })))))); })))),
                    React.createElement("div", { className: "flex flex-col items-start gap-3 border-t border-[#E2E8F0] p-6 sm:flex-row sm:items-center sm:justify-between" },
                        React.createElement("div", { className: "text-xs text-[#475569]" },
                            "Showing ",
                            React.createElement("span", { className: "font-mono font-semibold text-[#0F172A]" }, "1-7"),
                            " of",
                            ' ',
                            React.createElement("span", { className: "font-mono font-semibold text-[#0F172A]" }, summary.totalRatings.toLocaleString()),
                            ' ',
                            "ratings"),
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement(button_1.Button, { variant: "outline", size: "sm", className: "border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]" },
                                React.createElement(lucide_react_1.ChevronLeft, { className: "mr-1 h-4 w-4" }),
                                "Previous"),
                            React.createElement("div", { className: "flex items-center gap-1" },
                                React.createElement(button_1.Button, { size: "sm", className: "h-8 w-8 bg-[#FF6B00] p-0 font-mono text-white hover:bg-[#CC5500]" }, "1"),
                                React.createElement(button_1.Button, { variant: "outline", size: "sm", className: "h-8 w-8 border-[#E2E8F0] bg-white p-0 font-mono text-[#0F172A] hover:bg-[#F8FAFC]" }, "2"),
                                React.createElement(button_1.Button, { variant: "outline", size: "sm", className: "h-8 w-8 border-[#E2E8F0] bg-white p-0 font-mono text-[#0F172A] hover:bg-[#F8FAFC]" }, "3")),
                            React.createElement(button_1.Button, { variant: "outline", size: "sm", className: "border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]" },
                                "Next",
                                React.createElement(lucide_react_1.ChevronRight, { className: "ml-1 h-4 w-4" })))))),
            React.createElement("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2" },
                React.createElement(card_1.Card, { className: "border-[#E2E8F0] bg-white" },
                    React.createElement(card_1.CardHeader, { className: "border-b border-[#E2E8F0] p-6" },
                        React.createElement(card_1.CardTitle, { className: "font-display text-lg font-semibold uppercase tracking-wide text-[#0F172A]" }, "Most Rated Players"),
                        React.createElement("p", { className: "mt-1 text-xs text-[#475569]" }, "Players with the highest number of submitted ratings")),
                    React.createElement(card_1.CardContent, { className: "p-0" },
                        React.createElement("div", { className: "divide-y divide-[#E2E8F0]" }, mostRatedPlayers.map(function (player, idx) { return (React.createElement(react_2.Link, { key: player.id, href: "/admin/players/" + player.id, className: "flex items-center gap-4 p-4 transition hover:bg-[#F8FAFC]" },
                            React.createElement("div", { className: "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#F8FAFC] font-mono text-xs font-semibold text-[#475569]" }, idx + 1),
                            React.createElement("img", { src: player.avatar, alt: player.name, className: "h-11 w-11 rounded-full border border-[#E2E8F0] object-cover" }),
                            React.createElement("div", { className: "min-w-0 flex-1" },
                                React.createElement("div", { className: "flex items-center gap-2" },
                                    React.createElement("span", { className: "truncate text-sm font-semibold text-[#0F172A]" }, player.name),
                                    React.createElement("span", { className: "rounded border border-[#FF6B00] bg-[#FFF3EB] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#CC5500]" }, player.position)),
                                React.createElement("div", { className: "truncate text-xs text-[#475569]" }, player.club)),
                            React.createElement("div", { className: "flex flex-col items-end gap-1" },
                                React.createElement("div", { className: "font-mono text-sm font-semibold text-[#0F172A]" }, player.ratings),
                                React.createElement("div", { className: "flex items-center gap-1" },
                                    React.createElement(lucide_react_1.Star, { className: "h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" }),
                                    React.createElement("span", { className: "font-mono text-xs text-[#475569]" }, player.avg.toFixed(1)))))); })))),
                React.createElement(card_1.Card, { className: "border-[#E2E8F0] bg-white" },
                    React.createElement(card_1.CardHeader, { className: "border-b border-[#E2E8F0] p-6" },
                        React.createElement(card_1.CardTitle, { className: "font-display text-lg font-semibold uppercase tracking-wide text-[#0F172A]" }, "Most Active Scouts"),
                        React.createElement("p", { className: "mt-1 text-xs text-[#475569]" }, "Scouts who have submitted the most ratings this period")),
                    React.createElement(card_1.CardContent, { className: "p-0" },
                        React.createElement("div", { className: "divide-y divide-[#E2E8F0]" }, mostActiveScouts.map(function (scout, idx) { return (React.createElement(react_2.Link, { key: scout.id, href: "/admin/scouts/" + scout.id, className: "flex items-center gap-4 p-4 transition hover:bg-[#F8FAFC]" },
                            React.createElement("div", { className: "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#F8FAFC] font-mono text-xs font-semibold text-[#475569]" }, idx + 1),
                            React.createElement("img", { src: scout.avatar, alt: scout.name, className: "h-11 w-11 rounded-full border border-[#E2E8F0] object-cover" }),
                            React.createElement("div", { className: "min-w-0 flex-1" },
                                React.createElement("div", { className: "truncate text-sm font-semibold text-[#0F172A]" }, scout.name),
                                React.createElement("div", { className: "truncate text-xs text-[#475569]" },
                                    scout.organization,
                                    " \u00B7 ",
                                    scout.country)),
                            React.createElement("div", { className: "flex flex-col items-end gap-1" },
                                React.createElement("div", { className: "font-mono text-sm font-semibold text-[#0F172A]" }, scout.ratings),
                                React.createElement("div", { className: "flex items-center gap-1" },
                                    React.createElement(lucide_react_1.Star, { className: "h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" }),
                                    React.createElement("span", { className: "font-mono text-xs text-[#475569]" }, scout.avgGiven.toFixed(1)))))); })))))),
        React.createElement(dialog_1.Dialog, { open: !!viewRating, onOpenChange: function () { return setViewRating(null); } },
            React.createElement(dialog_1.DialogContent, { className: "max-w-3xl border-[#E2E8F0] bg-white" }, viewRating && (React.createElement(React.Fragment, null,
                React.createElement(dialog_1.DialogHeader, null,
                    React.createElement(dialog_1.DialogTitle, { className: "font-display text-2xl font-bold uppercase tracking-tight text-[#0F172A]" }, "Rating Details"),
                    React.createElement(dialog_1.DialogDescription, { className: "text-sm text-[#475569]" },
                        "Submitted on",
                        ' ',
                        new Date(viewRating.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        }))),
                React.createElement("div", { className: "space-y-5" },
                    React.createElement("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2" },
                        React.createElement("div", { className: "rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4" },
                            React.createElement("div", { className: "mb-3 text-xs font-medium uppercase tracking-wider text-[#475569]" }, "Scout"),
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement("img", { src: viewRating.scout.avatar, alt: viewRating.scout.name, className: "h-12 w-12 rounded-full border border-[#E2E8F0] object-cover" }),
                                React.createElement("div", { className: "min-w-0 flex-1" },
                                    React.createElement("div", { className: "truncate font-display text-base font-semibold text-[#0F172A]" }, viewRating.scout.name),
                                    React.createElement("div", { className: "truncate text-xs text-[#475569]" }, viewRating.scout.organization),
                                    React.createElement("div", { className: "text-xs text-[#94A3B8]" }, viewRating.scout.country)))),
                        React.createElement("div", { className: "rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4" },
                            React.createElement("div", { className: "mb-3 text-xs font-medium uppercase tracking-wider text-[#475569]" }, "Player"),
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement("img", { src: viewRating.player.avatar, alt: viewRating.player.name, className: "h-12 w-12 rounded-full border border-[#E2E8F0] object-cover" }),
                                React.createElement("div", { className: "min-w-0 flex-1" },
                                    React.createElement("div", { className: "flex items-center gap-2" },
                                        React.createElement("span", { className: "truncate font-display text-base font-semibold text-[#0F172A]" }, viewRating.player.name),
                                        React.createElement("span", { className: "rounded border border-[#FF6B00] bg-[#FFF3EB] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#CC5500]" }, viewRating.player.position)),
                                    React.createElement("div", { className: "truncate text-xs text-[#475569]" }, viewRating.player.club),
                                    React.createElement("div", { className: "text-xs text-[#94A3B8]" },
                                        "Age ",
                                        React.createElement("span", { className: "font-mono" }, viewRating.player.age)))))),
                    React.createElement("div", null,
                        React.createElement("div", { className: "mb-3 text-xs font-medium uppercase tracking-wider text-[#475569]" }, "Ratings Breakdown"),
                        React.createElement("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-4" },
                            React.createElement(StarsLarge, { value: viewRating.technical, label: "Technical" }),
                            React.createElement(StarsLarge, { value: viewRating.physical, label: "Physical" }),
                            React.createElement(StarsLarge, { value: viewRating.mental, label: "Mental" }),
                            React.createElement("div", { className: "rounded-lg border border-[#FF6B00] bg-[#FFF3EB] p-4" },
                                React.createElement("div", { className: "text-xs font-medium uppercase tracking-wider text-[#CC5500]" }, "Overall"),
                                React.createElement("div", { className: "mt-2 flex items-center gap-1" }, Array.from({ length: 5 }).map(function (_, i) { return (React.createElement(lucide_react_1.Star, { key: i, className: "w-5 h-5 " + (i < Math.round(viewRating.overall)
                                        ? 'fill-[#FF6B00] text-[#FF6B00]'
                                        : 'fill-transparent text-[#FF6B00]/30') })); })),
                                React.createElement("div", { className: "mt-2 font-mono text-2xl font-bold text-[#CC5500]" }, viewRating.overall.toFixed(1))))),
                    React.createElement("div", { className: "rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4" },
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement(lucide_react_1.Calendar, { className: "h-4 w-4 text-[#FF6B00]" }),
                            React.createElement("div", { className: "text-xs font-medium uppercase tracking-wider text-[#475569]" }, "Match Context")),
                        React.createElement("div", { className: "mt-2 text-sm text-[#0F172A]" }, viewRating.matchContext)),
                    React.createElement("div", null,
                        React.createElement("div", { className: "mb-2 text-xs font-medium uppercase tracking-wider text-[#475569]" }, "Scout Notes"),
                        React.createElement("div", { className: "rounded-lg border border-[#E2E8F0] bg-white p-4 text-sm leading-relaxed text-[#0F172A]" }, viewRating.notes))),
                React.createElement(dialog_1.DialogFooter, { className: "gap-2" },
                    React.createElement(button_1.Button, { variant: "outline", onClick: function () { return setViewRating(null); }, className: "border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]" }, "Close"),
                    React.createElement(react_2.Link, { href: "/admin/players/" + viewRating.player.id, className: "inline-flex items-center justify-center rounded-md bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#CC5500]" }, "View Player Profile")))))),
        React.createElement(dialog_1.Dialog, { open: !!deleteRating, onOpenChange: function () { return setDeleteRating(null); } },
            React.createElement(dialog_1.DialogContent, { className: "max-w-md border-[#E2E8F0] bg-white" }, deleteRating && (React.createElement(React.Fragment, null,
                React.createElement(dialog_1.DialogHeader, null,
                    React.createElement(dialog_1.DialogTitle, { className: "font-display text-xl font-bold uppercase tracking-tight text-[#0F172A]" }, "Delete Rating"),
                    React.createElement(dialog_1.DialogDescription, { className: "text-sm text-[#475569]" }, "This action cannot be undone. The rating will be permanently removed from the platform.")),
                React.createElement("div", { className: "rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4" },
                    React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("img", { src: deleteRating.scout.avatar, alt: deleteRating.scout.name, className: "h-10 w-10 rounded-full border border-[#E2E8F0] object-cover" }),
                        React.createElement("div", { className: "min-w-0 flex-1" },
                            React.createElement("div", { className: "truncate text-sm font-semibold text-[#0F172A]" }, deleteRating.scout.name),
                            React.createElement("div", { className: "truncate text-xs text-[#475569]" },
                                "rated ",
                                React.createElement("span", { className: "font-semibold" }, deleteRating.player.name))),
                        React.createElement("div", { className: "inline-flex items-center gap-1 rounded-md bg-[#FFF3EB] px-2 py-1" },
                            React.createElement(lucide_react_1.Star, { className: "h-3 w-3 fill-[#FF6B00] text-[#FF6B00]" }),
                            React.createElement("span", { className: "font-mono text-sm font-semibold text-[#CC5500]" }, deleteRating.overall.toFixed(1))))),
                React.createElement(dialog_1.DialogFooter, { className: "gap-2" },
                    React.createElement(button_1.Button, { variant: "outline", onClick: function () { return setDeleteRating(null); }, className: "border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]" }, "Cancel"),
                    React.createElement(button_1.Button, { onClick: handleDelete, className: "bg-[#DC2626] text-white hover:bg-[#B91C1C]" },
                        React.createElement(lucide_react_1.Trash2, { className: "mr-2 h-4 w-4" }),
                        "Delete Rating"))))))));
}
exports["default"] = RatingsIndex;
