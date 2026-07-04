"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@inertiajs/react");
var PublicNavbar_1 = require("@/components/public/PublicNavbar");
var table_1 = require("@/components/ui/table");
var accordion_1 = require("@/components/ui/accordion");
var lucide_react_1 = require("lucide-react");
// TODO: Replace with usePage().props
var plans = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        annualPrice: 0,
        badge: null,
        tagline: 'For aspiring players getting started.',
        features: [
            'Public player profile page',
            'Upload up to 3 highlight videos',
            'Basic performance stats',
            'Browse scout directory',
            'Receive scout messages (limited)',
            'Standard search visibility',
            'Mobile app access',
        ],
        locked: [
            'AI-powered highlight reels',
            'Verified player badge',
            'Priority in scout searches',
            'Advanced analytics dashboard',
            'Direct agent introductions',
        ],
        cta: 'Get Started Free'
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 9.9,
        annualPrice: 7.92,
        badge: 'Most Popular',
        tagline: 'For serious players ready to be discovered.',
        features: [
            'Everything in Free',
            'Unlimited highlight uploads',
            'AI-generated highlight reels',
            'Verified player badge',
            'Priority placement in scout searches',
            'Advanced performance analytics',
            'Direct messaging with scouts',
        ],
        locked: [],
        cta: 'Upgrade Now →'
    },
    {
        id: 'agent',
        name: 'Agent',
        price: 24.9,
        annualPrice: 19.92,
        badge: null,
        tagline: 'For scouts, agents, and clubs scouting talent.',
        features: [
            'Everything in Premium',
            'Multi-player roster management',
            'Advanced filters & scouting reports',
            'Export player data (CSV / PDF)',
            'Bulk messaging tools',
            'Watchlist & shortlists (unlimited)',
            'Priority support & dedicated CSM',
        ],
        locked: [],
        cta: 'Contact Sales'
    },
];
// TODO: Replace with usePage().props
var comparisonRows = [
    { feature: 'Public player profile', free: true, premium: true, agent: true },
    { feature: 'Highlight video uploads', free: '3 max', premium: 'Unlimited', agent: 'Unlimited' },
    { feature: 'AI highlight reels', free: false, premium: true, agent: true },
    { feature: 'Verified player badge', free: false, premium: true, agent: true },
    { feature: 'Search priority', free: 'Standard', premium: 'High', agent: 'Highest' },
    { feature: 'Advanced analytics', free: false, premium: true, agent: true },
    { feature: 'Direct scout messaging', free: 'Limited', premium: 'Unlimited', agent: 'Unlimited' },
    { feature: 'Multi-player rosters', free: false, premium: false, agent: true },
    { feature: 'Data export (CSV/PDF)', free: false, premium: false, agent: true },
    { feature: 'Bulk messaging tools', free: false, premium: false, agent: true },
    { feature: 'Unlimited watchlists', free: false, premium: false, agent: true },
    { feature: 'Priority support', free: false, premium: false, agent: true },
];
// TODO: Replace with usePage().props
var faqs = [
    {
        q: 'Can I cancel my subscription at any time?',
        a: 'Yes. You can cancel your subscription from your account settings at any time. You will retain access to premium features until the end of your current billing period.'
    },
    {
        q: 'What is the difference between Premium and Agent plans?',
        a: 'Premium is built for individual players to maximize their visibility to scouts. Agent is designed for scouts, agents, and clubs who need to manage multiple players, run advanced searches, and export scouting reports.'
    },
    {
        q: 'Do you offer discounts for clubs or academies?',
        a: 'Yes. We offer custom enterprise pricing for football academies, professional clubs, and federations. Contact our sales team to discuss volume licensing and team rates.'
    },
    {
        q: 'How does the annual billing discount work?',
        a: 'Choosing annual billing saves you 20% compared to paying monthly. You are billed once per year and receive uninterrupted access to all features included in your plan.'
    },
    {
        q: 'Is my payment information secure?',
        a: 'Absolutely. All payments are processed by Stripe, an industry-leading payment processor that is PCI-DSS Level 1 certified. We never store your card details on our servers.'
    },
];
function Pricing() {
    var _a = react_1.useState('monthly'), billing = _a[0], setBilling = _a[1];
    return (React.createElement("div", { className: "min-h-screen bg-white dark:bg-[#0D0D0D]" },
        React.createElement(PublicNavbar_1["default"], null),
        React.createElement("main", { className: "pt-16" },
            React.createElement("section", { className: "bg-[#FF6B00] py-20 text-center px-6" },
                React.createElement("div", { className: "text-white/80 text-xs font-bold tracking-[0.2em] uppercase" }, "Pricing"),
                React.createElement("h1", { className: "font-display font-black text-4xl sm:text-5xl text-white mt-3 leading-tight" }, "Simple, Transparent Pricing"),
                React.createElement("p", { className: "text-white/80 text-base sm:text-lg max-w-xl mx-auto mt-3" }, "Choose the plan that fits your ambitions. Cancel anytime, no hidden fees."),
                React.createElement("div", { className: "bg-white/15 border border-white/25 rounded-full p-1 inline-flex mt-6 items-center" },
                    React.createElement("button", { type: "button", onClick: function () { return setBilling('monthly'); }, className: "px-5 py-2 rounded-full text-sm transition-colors " + (billing === 'monthly'
                            ? 'bg-white text-[#FF6B00] font-semibold'
                            : 'text-white font-medium') }, "Monthly"),
                    React.createElement("button", { type: "button", onClick: function () { return setBilling('annual'); }, className: "px-5 py-2 rounded-full text-sm transition-colors flex items-center " + (billing === 'annual'
                            ? 'bg-white text-[#FF6B00] font-semibold'
                            : 'text-white font-medium') },
                        "Annual",
                        React.createElement("span", { className: "bg-green-400 text-green-900 text-xs font-bold px-2 py-0.5 rounded-full ml-2" }, "Save 20%")))),
            React.createElement("section", { className: "bg-[#F8FAFC] dark:bg-[#0D0D0D] py-16 px-6" },
                React.createElement("div", { className: "max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start" }, plans.map(function (plan) {
                    var isPremium = plan.id === 'premium';
                    var displayPrice = billing === 'annual' ? plan.annualPrice : plan.price;
                    return (React.createElement("div", { key: plan.id, className: isPremium
                            ? 'bg-white dark:bg-[#161616] border-2 border-[#FF6B00] rounded-2xl p-8 shadow-[0_8px_40px_rgba(255,107,0,0.2)] relative lg:scale-[1.02]'
                            : 'bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl p-8' },
                        plan.badge && (React.createElement("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white text-xs font-black px-5 py-1.5 rounded-full tracking-wide uppercase" }, plan.badge)),
                        React.createElement("div", { className: "font-bold text-lg text-[#0F172A] dark:text-[#F5F5F5]" }, plan.name),
                        React.createElement("div", { className: "mt-3 flex items-baseline" },
                            React.createElement("span", { className: "font-display text-5xl font-black " + (isPremium
                                    ? 'text-[#FF6B00]'
                                    : 'text-[#0F172A] dark:text-[#F5F5F5]') },
                                "\u20AC",
                                displayPrice.toFixed(displayPrice % 1 === 0 ? 0 : 2)),
                            React.createElement("span", { className: "text-[#94A3B8] text-sm ml-2" }, "/month")),
                        React.createElement("p", { className: "text-sm text-[#475569] dark:text-[#9A9A9A] mt-2" }, plan.tagline),
                        React.createElement("div", { className: "border-t border-[#E2E8F0] dark:border-[#2A2A2A] my-6" }),
                        React.createElement("ul", { className: "space-y-3" },
                            plan.features.map(function (feat) { return (React.createElement("li", { key: feat, className: "flex items-start gap-3 text-sm text-[#0F172A] dark:text-[#F5F5F5]" },
                                React.createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4 mt-0.5 shrink-0 " + (isPremium ? 'text-[#FF6B00]' : 'text-green-500') }),
                                React.createElement("span", null, feat))); }),
                            plan.locked.map(function (feat) { return (React.createElement("li", { key: feat, className: "flex items-start gap-3 text-sm text-[#94A3B8] dark:text-[#555555]" },
                                React.createElement(lucide_react_1.Lock, { className: "w-4 h-4 mt-0.5 shrink-0" }),
                                React.createElement("span", { className: "line-through decoration-[#94A3B8]/30" }, feat))); })),
                        React.createElement("div", { className: "mt-8" }, isPremium ? (React.createElement(react_2.Link, { href: "/register?plan=premium", className: "bg-[#FF6B00] text-white w-full h-12 font-bold rounded-xl hover:bg-[#CC5500] flex items-center justify-center transition-colors" }, plan.cta)) : (React.createElement(react_2.Link, { href: plan.id === 'agent' ? '/contact?plan=agent' : '/register', className: "w-full h-12 border border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#FF6B00] hover:text-[#FF6B00] font-semibold rounded-xl flex items-center justify-center text-[#0F172A] dark:text-[#F5F5F5] transition-colors bg-white dark:bg-[#161616]" }, plan.cta)))));
                })),
                React.createElement("div", { className: "bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-2xl overflow-hidden mt-12 max-w-[1100px] mx-auto" },
                    React.createElement("div", { className: "p-6 sm:p-8 border-b border-[#E2E8F0] dark:border-[#2A2A2A]" },
                        React.createElement("h2", { className: "font-display font-black text-2xl sm:text-3xl text-[#0F172A] dark:text-[#F5F5F5]" }, "Compare All Features"),
                        React.createElement("p", { className: "text-sm text-[#475569] dark:text-[#9A9A9A] mt-1" }, "Everything you get with each plan, side by side.")),
                    React.createElement("div", { className: "overflow-x-auto" },
                        React.createElement(table_1.Table, null,
                            React.createElement(table_1.TableHeader, null,
                                React.createElement(table_1.TableRow, { className: "bg-[#F8FAFC] dark:bg-[#1F1F1F] hover:bg-[#F8FAFC] dark:hover:bg-[#1F1F1F] border-b border-[#E2E8F0] dark:border-[#2A2A2A]" },
                                    React.createElement(table_1.TableHead, { className: "text-[#0F172A] dark:text-[#F5F5F5] font-bold text-sm py-4" }, "Feature"),
                                    React.createElement(table_1.TableHead, { className: "text-[#0F172A] dark:text-[#F5F5F5] font-bold text-sm text-center py-4" }, "Free"),
                                    React.createElement(table_1.TableHead, { className: "text-[#FF6B00] font-black text-sm text-center py-4" }, "Premium"),
                                    React.createElement(table_1.TableHead, { className: "text-[#0F172A] dark:text-[#F5F5F5] font-bold text-sm text-center py-4" }, "Agent"))),
                            React.createElement(table_1.TableBody, null, comparisonRows.map(function (row, i) { return (React.createElement(table_1.TableRow, { key: i, className: "border-b border-[#E2E8F0] dark:border-[#2A2A2A] hover:bg-[#F8FAFC] dark:hover:bg-[#1F1F1F]" },
                                React.createElement(table_1.TableCell, { className: "text-sm text-[#0F172A] dark:text-[#F5F5F5] font-medium py-4" }, row.feature),
                                React.createElement(table_1.TableCell, { className: "text-center text-sm" }, renderCell(row.free)),
                                React.createElement(table_1.TableCell, { className: "text-center text-sm bg-[#FFF3EB]/30 dark:bg-[rgba(255,107,0,0.04)]" }, renderCell(row.premium, true)),
                                React.createElement(table_1.TableCell, { className: "text-center text-sm" }, renderCell(row.agent)))); })))))),
            React.createElement("section", { className: "bg-[#F8FAFC] dark:bg-[#0D0D0D] py-12 text-center px-6 border-t border-[#E2E8F0] dark:border-[#2A2A2A]" },
                React.createElement("h3", { className: "font-display font-bold text-xl sm:text-2xl text-[#0F172A] dark:text-[#F5F5F5]" }, "Trusted by scouts and players across 67 countries"),
                React.createElement("div", { className: "flex flex-wrap justify-center items-center gap-3 mt-6" }, ['Stripe', 'PayPal', 'Visa', 'Mastercard'].map(function (p) { return (React.createElement("div", { key: p, className: "px-4 py-2 bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-lg text-xs font-mono font-bold text-[#475569] dark:text-[#9A9A9A] tracking-wider" }, p.toUpperCase())); })),
                React.createElement("div", { className: "flex flex-wrap justify-center items-center gap-6 mt-8" },
                    React.createElement("div", { className: "flex items-center gap-2 text-sm text-[#0F172A] dark:text-[#F5F5F5]" },
                        React.createElement(lucide_react_1.RefreshCcw, { className: "w-4 h-4 text-[#FF6B00]" }),
                        React.createElement("span", { className: "font-semibold" }, "Cancel Anytime")),
                    React.createElement("div", { className: "flex items-center gap-2 text-sm text-[#0F172A] dark:text-[#F5F5F5]" },
                        React.createElement(lucide_react_1.ShieldCheck, { className: "w-4 h-4 text-[#FF6B00]" }),
                        React.createElement("span", { className: "font-semibold" }, "Secure Payment")),
                    React.createElement("div", { className: "flex items-center gap-2 text-sm text-[#0F172A] dark:text-[#F5F5F5]" },
                        React.createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4 text-[#FF6B00]" }),
                        React.createElement("span", { className: "font-semibold" }, "30-Day Guarantee")))),
            React.createElement("section", { className: "bg-white dark:bg-[#111111] py-16 px-6" },
                React.createElement("div", { className: "max-w-[800px] mx-auto" },
                    React.createElement("div", { className: "text-center mb-10" },
                        React.createElement("div", { className: "text-[#FF6B00] text-xs font-bold tracking-[0.2em] uppercase" }, "FAQ"),
                        React.createElement("h2", { className: "font-display font-black text-3xl sm:text-4xl text-[#0F172A] dark:text-[#F5F5F5] mt-2" }, "Frequently Asked Questions")),
                    React.createElement(accordion_1.Accordion, { type: "single", collapsible: true, className: "w-full space-y-3" }, faqs.map(function (f, i) { return (React.createElement(accordion_1.AccordionItem, { key: i, value: "item-" + i, className: "bg-white dark:bg-[#161616] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-xl px-6 data-[state=open]:border-[#FF6B00]/40" },
                        React.createElement(accordion_1.AccordionTrigger, { className: "text-left font-semibold text-[#0F172A] dark:text-[#F5F5F5] hover:no-underline py-5 text-base" }, f.q),
                        React.createElement(accordion_1.AccordionContent, { className: "text-[#475569] dark:text-[#9A9A9A] text-sm leading-relaxed pb-5" }, f.a))); })))),
            React.createElement("footer", { className: "bg-[#0F172A] py-12 px-6" },
                React.createElement("div", { className: "max-w-[1200px] mx-auto" },
                    React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8" },
                        React.createElement("div", { className: "col-span-2 md:col-span-1" },
                            React.createElement("img", { src: "/images/logo/hilights_logo_dark_200.png", className: "h-10 w-auto", alt: "HiLights Football" }),
                            React.createElement("p", { className: "text-white/60 text-sm mt-4" }, "The platform where football talent meets opportunity.")),
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-white font-bold text-sm mb-3" }, "Platform"),
                            React.createElement("ul", { className: "space-y-2 text-white/60 text-sm" },
                                React.createElement("li", null,
                                    React.createElement(react_2.Link, { href: "/players", className: "hover:text-white" }, "Players")),
                                React.createElement("li", null,
                                    React.createElement(react_2.Link, { href: "/scouts", className: "hover:text-white" }, "Scouts")),
                                React.createElement("li", null,
                                    React.createElement(react_2.Link, { href: "/pricing", className: "hover:text-white" }, "Pricing")))),
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-white font-bold text-sm mb-3" }, "Company"),
                            React.createElement("ul", { className: "space-y-2 text-white/60 text-sm" },
                                React.createElement("li", null,
                                    React.createElement(react_2.Link, { href: "/about", className: "hover:text-white" }, "About")),
                                React.createElement("li", null,
                                    React.createElement(react_2.Link, { href: "/contact", className: "hover:text-white" }, "Contact")),
                                React.createElement("li", null,
                                    React.createElement(react_2.Link, { href: "/careers", className: "hover:text-white" }, "Careers")))),
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-white font-bold text-sm mb-3" }, "Legal"),
                            React.createElement("ul", { className: "space-y-2 text-white/60 text-sm" },
                                React.createElement("li", null,
                                    React.createElement(react_2.Link, { href: "/terms", className: "hover:text-white" }, "Terms")),
                                React.createElement("li", null,
                                    React.createElement(react_2.Link, { href: "/privacy", className: "hover:text-white" }, "Privacy")),
                                React.createElement("li", null,
                                    React.createElement(react_2.Link, { href: "/cookies", className: "hover:text-white" }, "Cookies"))))),
                    React.createElement("div", { className: "border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" },
                        React.createElement("div", { className: "text-white/40 text-xs" }, "\u00A9 2026 HiLights Football. All rights reserved."),
                        React.createElement("div", { className: "text-white/40 text-xs font-mono" }, "v2.4.1")))))));
}
exports["default"] = Pricing;
function renderCell(value, highlight) {
    if (highlight === void 0) { highlight = false; }
    if (typeof value === 'boolean') {
        return value ? (React.createElement(lucide_react_1.Check, { className: "w-5 h-5 mx-auto " + (highlight ? 'text-[#FF6B00]' : 'text-green-500') })) : (React.createElement(lucide_react_1.XCircle, { className: "w-5 h-5 mx-auto text-[#94A3B8] dark:text-[#555555]" }));
    }
    return (React.createElement("span", { className: "font-mono text-xs font-semibold " + (highlight
            ? 'text-[#FF6B00]'
            : 'text-[#0F172A] dark:text-[#F5F5F5]') }, value));
}
