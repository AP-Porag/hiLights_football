"use strict";
exports.__esModule = true;
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var sheet_1 = require("@/components/ui/sheet");
var react_1 = require("@inertiajs/react");
var lucide_react_1 = require("lucide-react");
var react_2 = require("react");
var NAV_LINKS = [
    { label: 'Home', href: '/', routeName: 'home' },
    { label: 'About', href: '/about', routeName: 'about' },
    { label: 'Scout', href: '/scout', routeName: 'scout' },
    // { label: 'Pricing', href: '/pricing', routeName: 'pricing' },
    { label: 'Plans', href: '/plans', routeName: 'plans' },
    { label: 'Contact', href: '/contact', routeName: 'contact' },
];
var NAV_LINKS_MOBILE = [
    { label: 'Search', href: '#', routeName: '', icon: react_2["default"].createElement(lucide_react_1.Search, null) },
    { label: 'Plans', href: '/plans', routeName: 'plans', icon: react_2["default"].createElement(lucide_react_1.Shield, null) },
    { label: 'Login', href: '/login', routeName: 'login', icon: react_2["default"].createElement(lucide_react_1.User, null) },
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
    return (react_2["default"].createElement("header", { className: [
            'fixed top-0 right-0 left-0 z-50 h-16 xl:h-20 2xl:h-24',
            'bg-black dark:bg-[#0D0D0D]',
            scrolled ? 'shadow-md' : 'shadow-[0_1px_0_rgba(0,0,0,0.05)] dark:shadow-none',
            'transition-shadow duration-200',
        ].join(' ') },
        react_2["default"].createElement("div", { className: "mx-auto flex h-full max-w-7xl 2xl:max-w-[90rem] items-center justify-between gap-4 px-2 sm:px-4 md:px-6 xl:px-8" },
            react_2["default"].createElement(react_1.Link, { href: "/", className: "flex shrink-0 items-center gap-2", "aria-label": "HiLights Football home" },
                react_2["default"].createElement("img", { src: "/images/logo/final_logo.png", className: "h-6 w-auto sm:h-8 lg:h-10 xl:h-12 2xl:h-14 md:mt-2 lg:mt-3 dark:hidden", alt: "HiLights Football" })),
            react_2["default"].createElement("nav", { className: "hidden items-center gap-8 lg:flex xl:gap-10 2xl:gap-12" }, NAV_LINKS.map(function (link) {
                var active = isActive(link.href);
                return (react_2["default"].createElement(react_1.Link, { key: link.href, href: link.href, className: [
                        'relative text-sm font-medium transition-colors xl:text-base 2xl:text-lg',
                        active
                            ? 'text-[#FF6B00] after:absolute after:right-0 after:bottom-[-22px] after:left-0 after:h-[2px] after:bg-[#FF6B00]'
                            : 'text-white hover:text-[#FF6B00] dark:text-[#9A9A9A]',
                    ].join(' ') }, link.label));
            })),
            react_2["default"].createElement("div", { className: "relative hidden w-56 lg:block xl:w-64 2xl:w-80" },
                react_2["default"].createElement(lucide_react_1.Search, { className: "pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#94A3B8] 2xl:h-5 2xl:w-5" }),
                react_2["default"].createElement(input_1.Input, { type: "search", placeholder: "Search players...", className: "h-9 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pr-3 pl-8 text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 focus-visible:ring-offset-0 xl:h-10 xl:text-base 2xl:h-12 2xl:pl-10 2xl:text-lg dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F5F5F5] dark:focus-visible:ring-[rgba(255,107,0,0.15)]" })),
            react_2["default"].createElement("div", { className: "hidden shrink-0 items-center gap-2 lg:flex xl:gap-3" },
                react_2["default"].createElement(react_1.Link, { href: "/login" },
                    react_2["default"].createElement(button_1.Button, { variant: "outline", size: "sm", className: "cursor-pointer border-[#E2E8F0] bg-gray-50 text-sm font-medium text-[#0F172A] hover:border-[#FF6B00] hover:bg-transparent hover:text-[#FF6B00] xl:h-10 xl:text-base 2xl:h-12 2xl:px-6 2xl:text-lg dark:border-[#2A2A2A] dark:text-[#F5F5F5] dark:hover:bg-transparent" }, "Login")),
                react_2["default"].createElement(react_1.Link, { href: "/register" },
                    react_2["default"].createElement(button_1.Button, { size: "sm", className: "cursor-pointer bg-[#e53f01] px-4 text-sm font-semibold text-white hover:bg-[#ff5e24] xl:h-10 xl:text-base 2xl:h-12 2xl:px-6 2xl:text-lg" }, "Create A Free Profile Now"))),
            react_2["default"].createElement("div", { className: "flex items-center gap-1 lg:hidden" },
                react_2["default"].createElement("div", { className: "flex items-center gap-0.5" }, NAV_LINKS_MOBILE.map(function (link) {
                    var active = isActive(link.href);
                    return (react_2["default"].createElement(react_1.Link, { key: link.href, href: link.href, className: "flex w-7 flex-col items-center justify-center sm:w-12" },
                        react_2["default"].createElement("div", { className: ['mb-1 transition-colors', active ? 'text-[#FF6B00]' : 'text-white'].join(' ') }, react_2["default"].cloneElement(link.icon, {
                            className: 'h-4 w-4 sm:h-5 sm:w-5'
                        })),
                        react_2["default"].createElement("span", { className: ['text-[8px] font-medium whitespace-nowrap sm:text-[12px]', active ? 'text-[#FF6B00]' : 'text-white'].join(' ') }, link.label)));
                })),
                react_2["default"].createElement(react_1.Link, { href: "/register" },
                    react_2["default"].createElement(button_1.Button, { className: "h-9 rounded-md bg-[#FF6B00] px-2 text-[8px] leading-tight font-bold text-white uppercase hover:bg-[#e65c00] sm:h-11 sm:px-4 sm:text-[11px]" },
                        "Create A Free",
                        react_2["default"].createElement("br", null),
                        "Profile Now")),
                react_2["default"].createElement(sheet_1.Sheet, { open: mobileOpen, onOpenChange: setMobileOpen },
                    react_2["default"].createElement(sheet_1.SheetTrigger, { asChild: true },
                        react_2["default"].createElement(button_1.Button, { variant: "secondary", size: "icon", "aria-label": "Open menu", className: "h-7 w-7 text-[#0F172A] hover:bg-[#F8FAFC] sm:h-9 sm:w-9 dark:text-[#F5F5F5] dark:hover:bg-[#1F1F1F]" },
                            react_2["default"].createElement(lucide_react_1.Menu, { className: "h-5 w-5" }))),
                    react_2["default"].createElement(sheet_1.SheetContent, { side: "left", className: "flex w-[300px] flex-col border-r border-[#E2E8F0] bg-white p-0 dark:border-[#2A2A2A] dark:bg-[#0D0D0D]" },
                        react_2["default"].createElement(sheet_1.SheetHeader, { className: "border-b border-[#E2E8F0] px-6 py-4 dark:border-[#2A2A2A]" },
                            react_2["default"].createElement(sheet_1.SheetTitle, { className: "flex items-center gap-2" },
                                react_2["default"].createElement("img", { src: "/images/logo/mobile-nav-logo.png", className: "h-10 w-auto dark:hidden", alt: "HiLights Football" }))),
                        react_2["default"].createElement("div", { className: "px-6 py-4" },
                            react_2["default"].createElement("div", { className: "relative" },
                                react_2["default"].createElement(lucide_react_1.Search, { className: "pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" }),
                                react_2["default"].createElement(input_1.Input, { type: "search", placeholder: "Search players...", className: "h-10 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pr-3 pl-8 text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100 focus-visible:ring-offset-0 dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F5F5F5] dark:focus-visible:ring-[rgba(255,107,0,0.15)]" }))),
                        react_2["default"].createElement("nav", { className: "flex-1 px-6" }, NAV_LINKS.map(function (link) {
                            var active = isActive(link.href);
                            return (react_2["default"].createElement(react_1.Link, { key: link.href, href: link.href, onClick: function () { return setMobileOpen(false); }, className: [
                                    'block border-b border-[#F1F5F9] py-3 text-base font-medium transition-colors dark:border-[#1F1F1F]',
                                    active ? 'text-[#FF6B00]' : 'text-[#0F172A] hover:text-[#FF6B00] dark:text-[#F5F5F5]',
                                ].join(' ') }, link.label));
                        })),
                        react_2["default"].createElement("div", { className: "mt-4 flex flex-col gap-2 border-t border-[#E2E8F0] px-6 py-4 dark:border-[#2A2A2A]" },
                            react_2["default"].createElement(react_1.Link, { href: "/login", onClick: function () { return setMobileOpen(false); } },
                                react_2["default"].createElement(button_1.Button, { variant: "outline", className: "w-full border-[#E2E8F0] bg-transparent text-sm font-medium text-[#0F172A] hover:border-[#FF6B00] hover:bg-transparent hover:text-[#FF6B00] dark:border-[#2A2A2A] dark:text-[#F5F5F5] dark:hover:bg-transparent" }, "Login")),
                            react_2["default"].createElement(react_1.Link, { href: "/register", onClick: function () { return setMobileOpen(false); } },
                                react_2["default"].createElement(button_1.Button, { className: "w-full bg-[#FF6B00] text-sm font-semibold text-white hover:bg-[#CC5500]" }, "Create A Free Profile Now")))))))));
}
exports["default"] = PublicNavbar;
