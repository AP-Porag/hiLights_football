"use strict";
exports.__esModule = true;
var react_1 = require("react");
var PublicNavbar_1 = require("@/components/public/PublicNavbar");
var PublicFooter_1 = require("@/components/public/PublicFooter");
var react_country_flag_1 = require("react-country-flag");
var lucide_react_1 = require("lucide-react");
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
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43f?w=400"
        },
        {
            name: "Gabriel Gama",
            position: "Attacking Midfielder",
            country: "Brazil",
            code: "BR",
            height: "175 cm",
            age: "21 years",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400"
        },
        {
            name: "Mady Danfaga",
            position: "Striker",
            country: "Guinea",
            code: "GN",
            height: "185 cm",
            age: "22 years",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43f?w=400"
        },
        {
            name: "Vinicius Peruchi",
            position: "Goal Keeper",
            country: "Brazil",
            code: "BR",
            height: "188 cm",
            age: "21 years",
            image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400"
        },
    ];
    return (react_1["default"].createElement("div", { className: " bg-white text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]" },
        react_1["default"].createElement(PublicNavbar_1["default"], null),
        react_1["default"].createElement("main", { className: "pt-16" },
            react_1["default"].createElement("section", { className: "relative w-full bg-black text-white overflow-hidden" },
                react_1["default"].createElement("div", { className: "max-w-7xl mx-auto" },
                    react_1["default"].createElement("div", { className: " grid grid-cols-[270px_1fr] sm:grid-cols-[300px_1fr] md:grid-cols-[380px_1fr] lg:grid-cols-2 mb-26 sm:mb-10" },
                        react_1["default"].createElement("div", { className: "flex px-6 sm:px-10 lg:px-16 pt-16" },
                            react_1["default"].createElement("div", { className: "max-w-xl" },
                                react_1["default"].createElement("h1", { className: "text-[18px] md:text-2xl lg:text-4xl font-extrabold uppercase leading-tight" },
                                    react_1["default"].createElement("span", { className: "block text-white" }, "BE THE FIRST"),
                                    react_1["default"].createElement("span", { className: "block text-orange-500" }, "TO SEE A RARE TALENT."),
                                    react_1["default"].createElement("span", { className: "block text-white" }, "BE THE DISCOVERER"),
                                    react_1["default"].createElement("span", { className: "block text-orange-500" }, "OF THE NEXT GREAT FOOTBALL STAR.")),
                                react_1["default"].createElement("div", { className: "relative" },
                                    react_1["default"].createElement("p", { className: "mt-6 text-gray-300 text-[12px] md:text-[14px] lg:text-base leading-relaxed md:pr-8 lg:w-[300px]" }, "At HiLights Football, you have the opportunity to discover, follow and contact great talents for free."),
                                    react_1["default"].createElement("div", { className: "flex absolute top-17 md:top-22 lg:top-25 left-0 z-0 flex-row gap-4 w-[200%]" },
                                        react_1["default"].createElement("button", { className: "flex justify-center items-center bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-3 py-2 md:px-6 md:py-4 rounded-md font-semibold uppercase text-[10px] md:text-sm" },
                                            react_1["default"].createElement(lucide_react_1.UserRoundPlus, { className: "w-6 h-6" }),
                                            react_1["default"].createElement("span", { className: "pl-2" },
                                                "Create A Free",
                                                react_1["default"].createElement("br", null),
                                                " Profile Now")),
                                        react_1["default"].createElement("button", { className: "border flex justify-center items-center border-gray-600 hover:border-white transition-all duration-300 px-3 py-2 md:px-6 md:py-4 rounded-md font-semibold uppercase text-[10px] md:text-sm" },
                                            react_1["default"].createElement(lucide_react_1.CirclePlay, { className: "w-6 h-6" }),
                                            react_1["default"].createElement("span", { className: "pl-2" }, "Learn More")))))),
                        react_1["default"].createElement("div", { className: "" },
                            react_1["default"].createElement("img", { src: "/images/img/player-1.png", alt: "", className: "rounded-full mt-10" }))))),
            react_1["default"].createElement("section", { className: "max-w-7xl mx-auto bg-black text-white px-6 sm:px-10 lg:px-16 pt-2" },
                react_1["default"].createElement("div", { className: "bg-[#353535] px-6 py-4 mb-4" },
                    react_1["default"].createElement("p", { className: "text-center text-[12px] sm:text-[14px] md:text-[16px]" }, " WHY SCOUTS, AGENTS AND CLUBS CHOOSE HILIGHTS FOOTBALL ")),
                react_1["default"].createElement("div", { className: "" },
                    react_1["default"].createElement("div", { className: "lg:max-w-5xl pl-1 pr-4 sm:pl-4 sm:pr-27 md:pl-7 md:pr-30  lg:pl-10" }, steps.map(function (item, index) {
                        var Icon = item.icon;
                        return (react_1["default"].createElement("div", { className: "border-b border-[#1f1f1f] lg:max-w-5x" },
                            react_1["default"].createElement("div", { key: index, className: "lg:max-w-4xl grid grid-cols-[50px_1fr] md:grid-cols-[70px_1fr] items-center py-5" },
                                react_1["default"].createElement("div", { className: "flex justify-center" },
                                    react_1["default"].createElement("div", { className: "flex h-9 w-9 md:h-14 md:w-14 items-center justify-center rounded-full border border-gray-500" },
                                        react_1["default"].createElement(Icon, { className: "text-[#ff6b00] w-4 h-4 md:w-6 md:h-6" }))),
                                react_1["default"].createElement("div", { className: " border-[#1f1f1f] pl-3 md:pl-5" },
                                    react_1["default"].createElement("h3", { className: "mb-1 text-[#ff6b00] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-extrabold uppercase" }, item.title),
                                    react_1["default"].createElement("p", { className: "text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed text-gray-300" }, item.desc)))));
                    })),
                    react_1["default"].createElement("div", { className: "flex gap-4 sm:grid sm:grid-cols-[70px_1fr_200px] md:grid-cols-[90px_1fr_250px] lg:grid-cols-[110px_1fr_350px] items-center border-b border-[#1f1f1f] py-6" },
                        react_1["default"].createElement("div", { className: "flex justify-center" },
                            react_1["default"].createElement("div", { className: "flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-full bg-[#ff6b00]" },
                                react_1["default"].createElement(lucide_react_1.Users, { className: "text-white md:w-12 md:h-12" }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("h3", { className: "text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold leading-tight text-white" }, "JOIN THOUSANDS OF SCOUTS, AGENTS AND CLUBS ALREADY ON HILIGHTS FOOTBALL."),
                            react_1["default"].createElement("p", { className: "mt-1 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed text-gray-300" }, "Register now and start discovering the future of football.")),
                        react_1["default"].createElement("div", { className: "flex justify-end items-end lg:pr-10" },
                            react_1["default"].createElement("button", { className: "flex items-center gap-2 md:gap-4 rounded-xl sm:-w-45 border border-[#ff6b00] px-4 py-2 lg:px-8 lg:py-6 transition hover:bg-[#ff6b00]/10" },
                                react_1["default"].createElement(lucide_react_1.UserPlus, { className: "text-white w-6 h-6 md:w-8 md:h-8" }),
                                react_1["default"].createElement("span", { className: "text-left text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-bold uppercase" },
                                    "Create a Free",
                                    react_1["default"].createElement("br", null),
                                    "Profile Now")))))),
            react_1["default"].createElement("section", { className: "overflow-x-hidden mb-6 max-w-7xl mx-auto" },
                react_1["default"].createElement("div", { className: "w-[90%] mx-auto rounded-xl p-3 md:p-6 bg-[#f9f9f9]" },
                    react_1["default"].createElement("div", { className: "flex items-center justify-between pb-3" },
                        react_1["default"].createElement("div", { className: "flex items-center gap-2 " },
                            react_1["default"].createElement(lucide_react_1.Star, { size: 18, fill: "#ff6b00", className: "text-[#ff6b00]" }),
                            react_1["default"].createElement("h2", { className: "whitespace-nowrap text-[12px] md:text-sm font-extrabold uppercase text-[#222]" }, "Community Highlights")),
                        react_1["default"].createElement("button", { className: "flex items-center gap-2 whitespace-nowrap text-[10px] md:text-xs font-bold uppercase text-gray-700 bg-white px-4 py-2 rounded-[10px]" },
                            "View All",
                            react_1["default"].createElement(lucide_react_1.ArrowRight, { size: 14, className: "text-[#ff6b00]" }))),
                    players.map(function (player, index) { return (react_1["default"].createElement("div", { key: index, className: "grid grid-cols-[40px_1fr_70px_70px] sm:grid-cols-[70px_1fr_80px_120px] md:grid-cols-[150px_1fr_120px_170px] items-center p-2 sm:p-4 md:p-6 rounded-[8px] bg-white mb-2" },
                        react_1["default"].createElement("div", { className: "relative p-1 md:p-2" },
                            react_1["default"].createElement("img", { src: player.image, alt: player.name, className: "h-[60px] w-[90px] rounded object-cover" }),
                            react_1["default"].createElement("button", { className: "absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a00]" },
                                react_1["default"].createElement(lucide_react_1.Play, { size: 12, fill: "white", className: "text-white" }))),
                        react_1["default"].createElement("div", { className: "px-1 md:px-2 mr-2" },
                            react_1["default"].createElement("h3", { className: "whitespace-nowrap text-[12px] md:text-[15px] font-bold text-[#222]" }, player.name),
                            react_1["default"].createElement("p", { className: "whitespace-nowrap text-[10px] md:text-xs text-gray-600" }, player.position),
                            react_1["default"].createElement("div", { className: "mt-1 flex items-center gap-2" },
                                react_1["default"].createElement("span", { className: "text-sm" },
                                    react_1["default"].createElement(react_country_flag_1["default"], { countryCode: player.code, svg: true, className: "mr-1 mt-[2px] md:mt-1 m[1em]" })),
                                react_1["default"].createElement("span", { className: "whitespace-nowrap text-[10px] md:text-xs text-gray-700" }, player.country))),
                        react_1["default"].createElement("div", { className: "flex mr-3 items-center justify-center gap-2 whitespace-nowrap text-[12px] md:text-sm text-[#222]" },
                            react_1["default"].createElement(lucide_react_1.Ruler, { size: 14 }),
                            react_1["default"].createElement("p", null, player.height)),
                        react_1["default"].createElement("div", { className: "flex items-center md:ml-4 justify-end gap-2 whitespace-nowrap text-[12px] md:text-sm text-[#222]" },
                            react_1["default"].createElement(lucide_react_1.Clock3, { size: 14 }),
                            player.age))); })))),
        react_1["default"].createElement(PublicFooter_1.PublicFooter, null)));
};
exports["default"] = Scout;
