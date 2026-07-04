"use strict";
exports.__esModule = true;
var react_1 = require("react");
var PublicNavbar_1 = require("@/components/public/PublicNavbar");
var PublicFooter_1 = require("@/components/public/PublicFooter");
var react_country_flag_1 = require("react-country-flag");
var lucide_react_1 = require("lucide-react");
var react_2 = require("@inertiajs/react");
var Scout = function () {
    var steps = [
        {
            icon: lucide_react_1.Binoculars,
            step: "01",
            title: "EARLY ACCESS TO TALENT",
            desc: (react_1["default"].createElement(react_1["default"].Fragment, null,
                "Be the first to discover young players before they become known to the world.",
                " "))
        },
        {
            icon: lucide_react_1.Users,
            step: "02",
            title: "ADVANCED SEARCH AND FILTERS",
            desc: (react_1["default"].createElement(react_1["default"].Fragment, null, "Find players by position, age, country, club, tournament, skills and much more."))
        },
        {
            icon: lucide_react_1.ChartColumn,
            step: "03",
            title: "DETAILED PLAYER PROFILES",
            desc: (react_1["default"].createElement(react_1["default"].Fragment, null, "Watch highlights, check stats, performance and player information all in one place."))
        },
        {
            icon: lucide_react_1.Send,
            step: "04",
            title: "CONTACT TALENTS FOR FREE",
            desc: (react_1["default"].createElement(react_1["default"].Fragment, null, "Get in touch directly with players or their representatives and start real connections."))
        },
        {
            icon: lucide_react_1.Star,
            step: "04",
            title: "FOLLOW AND TRACK",
            desc: (react_1["default"].createElement(react_1["default"].Fragment, null, "Follow your favorite players, receive updates and never miss a new talent."))
        }
    ];
    var players = [
        {
            name: "Mahamadou Balde",
            position: "Left winger",
            country: "Senegal",
            code: "SN",
            height: "178 cm",
            age: "20 years",
            image: "/images/img/p-3.jpg"
        },
        {
            name: "Gabriel Gama",
            position: "Attacking Midfielder",
            country: "Brazil",
            code: "BR",
            height: "175 cm",
            age: "21 years",
            image: "/images/img/p-6.png"
        },
        {
            name: "Mady Danfaga",
            position: "Striker",
            country: "Guinea",
            code: "GN",
            height: "185 cm",
            age: "22 years",
            image: "/images/img/p-4.jpg"
        },
        {
            name: "Vinicius Peruchi",
            position: "Goal Keeper",
            country: "Brazil",
            code: "BR",
            height: "188 cm",
            age: "21 years",
            image: "/images/img/p-5.jpg"
        },
    ];
    return (react_1["default"].createElement("div", { className: "bg-black text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]" },
        react_1["default"].createElement(PublicNavbar_1["default"], null),
        react_1["default"].createElement("main", { className: "pt-16" },
            react_1["default"].createElement("section", { className: "relative h-[100vh] w-full overflow-hidden bg-black text-white", style: {
                    backgroundImage: "url('/images/img/scout_hero.jpeg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                } },
                react_1["default"].createElement("div", { className: "mx-auto max-w-7xl" },
                    react_1["default"].createElement("div", { className: "mb-26 grid grid-cols-[270px_1fr] sm:mb-10 sm:grid-cols-[300px_1fr] md:grid-cols-[380px_1fr] lg:grid-cols-2" },
                        react_1["default"].createElement("div", { className: "flex px-6 pt-16 sm:px-10 lg:px-16" },
                            react_1["default"].createElement("div", { className: "max-w-xl" },
                                react_1["default"].createElement("h1", { className: "text-[18px] leading-tight font-extrabold uppercase md:text-2xl lg:text-4xl" },
                                    react_1["default"].createElement("span", { className: "block text-white" }, "BE THE FIRST"),
                                    react_1["default"].createElement("span", { className: "block text-[#fa5418]" }, "TO SEE A RARE TALENT."),
                                    react_1["default"].createElement("span", { className: "block text-white" }, "BE THE DISCOVERER"),
                                    react_1["default"].createElement("span", { className: "block text-[#fa5418]" }, "OF THE NEXT GREAT FOOTBALL STAR.")),
                                react_1["default"].createElement("div", { className: "relative" },
                                    react_1["default"].createElement("p", { className: "mt-6 text-[12px] leading-relaxed text-[#e8e8e8] md:pr-8 md:text-[14px] lg:w-[300px] lg:text-base" }, "At HiLights Football, you have the opportunity to discover, follow and contact great talents for free."),
                                    react_1["default"].createElement("div", { className: "absolute top-17 left-0 z-0 flex w-[200%] flex-row gap-4 md:top-22 lg:top-25" },
                                        react_1["default"].createElement("button", { className: "flex items-center justify-center rounded-md bg-[#dd3e06] px-3 py-2 text-[10px] font-semibold uppercase transition-all duration-300 hover:bg-orange-600 md:px-6 md:text-sm" },
                                            react_1["default"].createElement(lucide_react_1.UserRoundPlus, { className: "h-6 w-6" }),
                                            react_1["default"].createElement("span", { className: "pl-2" },
                                                "Create A Free",
                                                react_1["default"].createElement("br", null),
                                                " Profile Now")),
                                        react_1["default"].createElement("button", { className: "flex items-center justify-center rounded-md border border-gray-600 bg-black px-3 py-2 text-[10px] font-semibold uppercase transition-all duration-300 hover:border-white md:px-6 md:py-4 md:text-sm" },
                                            react_1["default"].createElement(lucide_react_1.CirclePlay, { className: "h-6 w-6" }),
                                            react_1["default"].createElement("span", { className: "pl-2" }, "Learn More"))))))))),
            react_1["default"].createElement("section", { className: "mx-auto max-w-7xl bg-black px-6 pt-2 text-white sm:px-10 lg:px-16" },
                react_1["default"].createElement("div", { className: "mb-4 bg-[#363636] px-6 py-4 rounded-tl-[10px] rounded-tr-[10px]" },
                    react_1["default"].createElement("p", { className: "text-center text-white text-[12px] sm:text-[14px] md:text-[16px]" }, " WHY SCOUTS, AGENTS AND CLUBS CHOOSE HILIGHTS FOOTBALL ")),
                react_1["default"].createElement("div", { className: "" },
                    react_1["default"].createElement("div", { className: "pr-4 pl-1 sm:pr-27 sm:pl-4 md:pr-30 md:pl-7 lg:max-w-5xl lg:pl-10" }, steps.map(function (item, index) {
                        var Icon = item.icon;
                        return (react_1["default"].createElement("div", { className: "lg:max-w-5x border-b border-[#1f1f1f]" },
                            react_1["default"].createElement("div", { key: index, className: "grid grid-cols-[50px_1fr] items-center py-5 md:grid-cols-[70px_1fr] lg:max-w-4xl" },
                                react_1["default"].createElement("div", { className: "flex justify-center" },
                                    react_1["default"].createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 md:h-14 md:w-14" },
                                        react_1["default"].createElement(Icon, { className: "h-4 w-4 text-[#e03c00] md:h-7 md:w-7" }))),
                                react_1["default"].createElement("div", { className: "border-[#1f1f1f] pl-3 md:pl-5" },
                                    react_1["default"].createElement("h3", { className: "mb-1 text-[14px] font-extrabold text-[#f93f04] uppercase sm:text-[16px] md:text-[18px] lg:text-[22px]" }, item.title),
                                    react_1["default"].createElement("p", { className: "text-[12px] leading-relaxed text-[#eeeeee] sm:text-[14px] md:text-[16px] lg:text-[18px]" }, item.desc)))));
                    })),
                    react_1["default"].createElement("div", { className: "flex items-center gap-2 md:gap-4 border-1 border-[#393939] rounded-2xl py-6 sm:grid sm:grid-cols-[50px_1fr_150px] md:grid-cols-[90px_1fr_250px] lg:grid-cols-[110px_1fr_450px] px-2 md:px-4" },
                        react_1["default"].createElement("div", { className: "flex justify-center" },
                            react_1["default"].createElement("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#dc4108] md:h-20 md:w-20" },
                                react_1["default"].createElement(lucide_react_1.Users, { className: "text-white md:h-12 md:w-12" }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("h3", { className: "text-[13px] leading-tight font-bold text-white sm:text-[14px] md:text-[16px] lg:text-[18px]" }, "JOIN THOUSANDS OF SCOUTS, AGENTS AND CLUBS ALREADY ON HILIGHTS FOOTBALL."),
                            react_1["default"].createElement("p", { className: "mt-1 text-[10px] leading-relaxed text-[#d9d9d9] sm:text-[12px] md:text-[14px] lg:text-[16px]" }, "Register now and start discovering the future of football.")),
                        react_1["default"].createElement("div", { className: "flex items-end justify-end lg:pr-10" },
                            react_1["default"].createElement("button", { className: "sm:-w-45 flex items-center gap-2 rounded-xl bg-[#dc4108] px-4 py-2 transition md:gap-4 lg:px-6 lg:py-2" },
                                react_1["default"].createElement(lucide_react_1.UserPlus, { className: "h-6 w-6 text-white md:h-8 md:w-8" }),
                                react_1["default"].createElement("span", { className: "text-left text-[10px] font-bold uppercase sm:text-[12px] md:text-[14px] lg:text-[16px]" },
                                    "Create a Free",
                                    react_1["default"].createElement("br", null),
                                    "Profile Now")))))),
            react_1["default"].createElement("section", { className: "mx-auto mt-10 mb-6 max-w-7xl overflow-x-hidden" },
                react_1["default"].createElement("div", { className: "mx-auto w-[90%] rounded-xl bg-[#f9f9f9] p-3 md:p-6" },
                    react_1["default"].createElement("div", { className: "flex items-center justify-between pb-3" },
                        react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                            react_1["default"].createElement(lucide_react_1.Star, { size: 18, fill: "#ff6b00", className: "text-[#c45504]" }),
                            react_1["default"].createElement("h2", { className: "text-[12px] font-extrabold whitespace-nowrap text-[#222] uppercase md:text-sm" }, "TOP TALENTS YOU CAN DISCOVER TODAY")),
                        react_1["default"].createElement("button", { className: "flex items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-[10px] font-bold whitespace-nowrap text-gray-700 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:text-xs" },
                            "View All",
                            react_1["default"].createElement(lucide_react_1.ArrowRight, { size: 18, className: "text-[#ff6b00] font-bold" }))),
                    react_1["default"].createElement("div", { className: "flex items-center justify-between overflow-x-auto pb-4" }, players.map(function (player, index) { return (react_1["default"].createElement("div", { key: index, className: "w-[24%] rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.10)]" },
                        react_1["default"].createElement(react_2.Link, { key: index, href: route('profile.public.detail', 1) },
                            react_1["default"].createElement("div", { className: "relative" },
                                react_1["default"].createElement("img", { src: player.image, alt: player.name, className: "h-[150px] w-full rounded object-cover" }),
                                react_1["default"].createElement("button", { className: "absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a00]" },
                                    react_1["default"].createElement(lucide_react_1.Play, { size: 12, fill: "white", className: "text-white" }))),
                            react_1["default"].createElement("div", { className: "mr-2 px-4 md:px-6" },
                                react_1["default"].createElement("h3", { className: "mt-2 text-[12px] font-bold whitespace-nowrap text-[#222] md:text-[15px]" }, player.name),
                                react_1["default"].createElement("p", { className: "mt-1 text-[10px] whitespace-nowrap text-[#1a1a1a] md:text-xs" }, player.position),
                                react_1["default"].createElement("div", { className: "mt-2 flex items-center gap-2" },
                                    react_1["default"].createElement("span", { className: "text-sm" },
                                        react_1["default"].createElement(react_country_flag_1["default"], { countryCode: player.code, svg: true, className: "m[1em] -mt-[2px] mr-1" })),
                                    react_1["default"].createElement("span", { className: "text-[10px] whitespace-nowrap text-[#545454] md:text-xs" }, player.country))),
                            react_1["default"].createElement("div", { className: "mt-5 flex flex-col md:flex-row md:justify-between px-4 pb-5" },
                                react_1["default"].createElement("div", { className: "flex gap-2 text-[12px] whitespace-nowrap text-[#222] md:text-sm" },
                                    react_1["default"].createElement(lucide_react_1.Ruler, { size: 14, className: "mt-1 md:ml-2" }),
                                    react_1["default"].createElement("p", null, player.height)),
                                react_1["default"].createElement("div", { className: "flex gap-2 text-[12px] whitespace-nowrap text-[#222] md:ml-4 md:text-sm" },
                                    react_1["default"].createElement(lucide_react_1.Clock3, { size: 14, className: "mt-[2px]" }),
                                    player.age))))); }))))),
        react_1["default"].createElement(PublicFooter_1.PublicFooter, null)));
};
exports["default"] = Scout;
