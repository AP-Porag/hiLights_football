"use strict";
exports.__esModule = true;
var ThemeToggle_1 = require("@/components/shared/ThemeToggle");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var sheet_1 = require("@/components/ui/sheet");
var react_1 = require("@inertiajs/react");
var lucide_react_1 = require("lucide-react");
var react_2 = require("react");
var NAV_LINKS = [
    { label: 'Home', href: '/', routeName: 'home' },
    { label: 'About', href: '/about', routeName: 'about' },
    { label: 'Pricing', href: '/pricing', routeName: 'pricing' },
    { label: 'Contact', href: '/contact', routeName: 'contact' },
];
function PublicNavbar() {
    var url = react_1.usePage().url;
    var _a = react_2.useState(false), scrolled = _a[0], setScrolled = _a[1];
    var _b = react_2.useState(false), mobileOpen = _b[0], setMobileOpen = _b[1];
    react_2.useEffect(function () {
        var onScroll = function () { return setScrolled(window.scrollY > 8); };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return function () { return window.removeEventListener('scroll', onScroll); };
    }, []);
    var isActive = function (href) {
        if (href === '/')
            return url === '/' || url === '';
        return url.startsWith(href);
    };
    return (React.createElement("header", { className: [
            'fixed top-0 right-0 left-0 z-50 h-16',
            'bg-white dark:bg-[#0D0D0D]',
            'border-b border-[#E2E8F0] dark:border-[#2A2A2A]',
            scrolled ? 'shadow-md' : 'shadow-[0_1px_0_rgba(0,0,0,0.05)] dark:shadow-none',
            'transition-shadow duration-200',
        ].join(' ') },
        React.createElement("div", { className: "mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-6" },
            React.createElement(react_1.Link, { href: "/", className: "flex shrink-0 items-center gap-2", "aria-label": "HiLights Football home" },
                React.createElement("img", { src: "/images/logo/hilights_logo_transparent_200.png", className: "h-9 w-auto dark:hidden", alt: "HiLights Football" }),
                React.createElement("img", { src: "/images/logo/hilights_logo_dark_200.png", className: "hidden h-9 w-auto dark:block", alt: "HiLights Football" }),
                React.createElement("div", { className: "hidden items-end gap-0.5 leading-none sm:flex" },
                    React.createElement("span", { className: "text-xl font-black tracking-tight text-[#0F172A] dark:text-[#F5F5F5]" }, "Hi"),
                    React.createElement("span", { className: "text-xl font-black tracking-tight text-[#FF6B00] italic" }, "Lights"),
                    React.createElement("span", { className: "mb-0.5 ml-1 self-end text-[10px] font-bold tracking-[0.12em] text-[#94A3B8]" }, "FOOTBALL"))),
            React.createElement("nav", { className: "hidden items-center gap-8 md:flex" }, NAV_LINKS.map(function (link) {
                var active = isActive(link.href);
                return (React.createElement(react_1.Link, { key: link.href, href: link.href, className: [
                        'relative text-sm font-medium transition-colors',
                        active
                            ? 'text-[#FF6B00] after:absolute after:right-0 after:bottom-[-22px] after:left-0 after:h-[2px] after:bg-[#FF6B00]'
                            : 'text-[#475569] hover:text-[#FF6B00] dark:text-[#9A9A9A]',
                    ].join(' ') }, link.label));
            })),
            React.createElement("div", { className: "relative hidden w-56 lg:block" },
                React.createElement(lucide_react_1.Search, { className: "pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" }),
                React.createElement(input_1.Input, { type: "search", placeholder: "Search players...", className: "h-9 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pr-3 pl-8 text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 focus-visible:ring-offset-0 dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F5F5F5] dark:focus-visible:ring-[rgba(255,107,0,0.15)]" })),
            React.createElement("div", { className: "hidden shrink-0 items-center gap-2 md:flex" },
                React.createElement(ThemeToggle_1["default"], null),
                React.createElement(react_1.Link, { href: "/login" },
                    React.createElement(button_1.Button, { variant: "outline", size: "sm", className: "border-[#E2E8F0] bg-transparent text-sm font-medium text-[#0F172A] hover:border-[#FF6B00] hover:bg-transparent hover:text-[#FF6B00] dark:border-[#2A2A2A] dark:text-[#F5F5F5] dark:hover:bg-transparent" }, "Login")),
                React.createElement(react_1.Link, { href: "/register" },
                    React.createElement(button_1.Button, { size: "sm", className: "bg-[#FF6B00] px-4 text-sm font-semibold text-white hover:bg-[#CC5500]" }, "Register"))),
            React.createElement("div", { className: "flex items-center gap-1 md:hidden" },
                React.createElement(ThemeToggle_1["default"], null),
                React.createElement(sheet_1.Sheet, { open: mobileOpen, onOpenChange: setMobileOpen },
                    React.createElement(sheet_1.SheetTrigger, { asChild: true },
                        React.createElement(button_1.Button, { variant: "ghost", size: "icon", "aria-label": "Open menu", className: "h-9 w-9 text-[#0F172A] hover:bg-[#F8FAFC] dark:text-[#F5F5F5] dark:hover:bg-[#1F1F1F]" },
                            React.createElement(lucide_react_1.Menu, { className: "h-5 w-5" }))),
                    React.createElement(sheet_1.SheetContent, { side: "left", className: "flex w-[300px] flex-col border-r border-[#E2E8F0] bg-white p-0 dark:border-[#2A2A2A] dark:bg-[#0D0D0D]" },
                        React.createElement(sheet_1.SheetHeader, { className: "border-b border-[#E2E8F0] px-6 py-4 dark:border-[#2A2A2A]" },
                            React.createElement(sheet_1.SheetTitle, { className: "flex items-center gap-2" },
                                React.createElement("img", { src: "/images/logo/hilights_logo_transparent_200.png", className: "h-9 w-auto dark:hidden", alt: "HiLights Football" }),
                                React.createElement("img", { src: "/images/logo/hilights_logo_dark_200.png", className: "hidden h-9 w-auto dark:block", alt: "HiLights Football" }),
                                React.createElement("div", { className: "flex items-end gap-0.5 leading-none" },
                                    React.createElement("span", { className: "text-xl font-black tracking-tight text-[#0F172A] dark:text-[#F5F5F5]" }, "Hi"),
                                    React.createElement("span", { className: "text-xl font-black tracking-tight text-[#FF6B00] italic" }, "Lights"),
                                    React.createElement("span", { className: "mb-0.5 ml-1 self-end text-[10px] font-bold tracking-[0.12em] text-[#94A3B8]" }, "FOOTBALL")))),
                        React.createElement("div", { className: "px-6 py-4" },
                            React.createElement("div", { className: "relative" },
                                React.createElement(lucide_react_1.Search, { className: "pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" }),
                                React.createElement(input_1.Input, { type: "search", placeholder: "Search players...", className: "h-10 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pr-3 pl-8 text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 focus-visible:ring-offset-0 dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F5F5F5] dark:focus-visible:ring-[rgba(255,107,0,0.15)]" }))),
                        React.createElement("nav", { className: "flex-1 px-6" }, NAV_LINKS.map(function (link) {
                            var active = isActive(link.href);
                            return (React.createElement(react_1.Link, { key: link.href, href: link.href, onClick: function () { return setMobileOpen(false); }, className: [
                                    'block border-b border-[#F1F5F9] py-3 text-base font-medium transition-colors dark:border-[#1F1F1F]',
                                    active ? 'text-[#FF6B00]' : 'text-[#0F172A] hover:text-[#FF6B00] dark:text-[#F5F5F5]',
                                ].join(' ') }, link.label));
                        })),
                        React.createElement("div", { className: "mt-4 flex flex-col gap-2 border-t border-[#E2E8F0] px-6 py-4 dark:border-[#2A2A2A]" },
                            React.createElement(react_1.Link, { href: "/login", onClick: function () { return setMobileOpen(false); } },
                                React.createElement(button_1.Button, { variant: "outline", className: "w-full border-[#E2E8F0] bg-transparent text-sm font-medium text-[#0F172A] hover:border-[#FF6B00] hover:bg-transparent hover:text-[#FF6B00] dark:border-[#2A2A2A] dark:text-[#F5F5F5] dark:hover:bg-transparent" }, "Login")),
                            React.createElement(react_1.Link, { href: "/register", onClick: function () { return setMobileOpen(false); } },
                                React.createElement(button_1.Button, { className: "w-full bg-[#FF6B00] text-sm font-semibold text-white hover:bg-[#CC5500]" }, "Register")))))))));
}
exports["default"] = PublicNavbar;
