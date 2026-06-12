"use strict";
exports.__esModule = true;
var react_1 = require("react");
var PublicNavbar_1 = require("@/components/public/PublicNavbar");
var PublicFooter_1 = require("@/components/public/PublicFooter");
var lucide_react_1 = require("lucide-react");
var HomeTwo = function () {
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-white text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]" },
        react_1["default"].createElement(PublicNavbar_1["default"], null),
        react_1["default"].createElement("main", { className: "pt-16" },
            react_1["default"].createElement("section", { className: "relative bg-black text-white overflow-hidden" },
                react_1["default"].createElement("div", { className: "max-w-7xl mx-auto min-h-screen" },
                    react_1["default"].createElement("div", { className: "flex md:grid md:grid-cols-2 min-h-screen" },
                        react_1["default"].createElement("div", { className: "flex items-center px-6 sm:px-10 lg:px-16 py-16" },
                            react_1["default"].createElement("div", { className: "max-w-xl" },
                                react_1["default"].createElement("h1", { className: "text-[18px] md:text-2xl lg:text-4xl font-extrabold uppercase leading-tight" },
                                    react_1["default"].createElement("span", { className: "block text-white" }, "Be Seen."),
                                    react_1["default"].createElement("span", { className: "block text-orange-500" },
                                        "Be Discovered ",
                                        react_1["default"].createElement("span", { className: "text-white" }, "!"))),
                                react_1["default"].createElement("p", { className: "mt-6 text-gray-300 text-[14px] md:text-base leading-relaxed max-w-lg" }, "The platform that connects players, clubs, agents and scouts through videos, statistics and professional profiles."),
                                react_1["default"].createElement("p", { className: "border-l-2 border-red-500 mt-4 pl-2 text-gray-300 text-[14px] md:text-base leading-relaxed max-w-lg" }, "Show your talent to the world and increase your opportunities in football."),
                                react_1["default"].createElement("div", { className: "mt-8 flex flex-col sm:flex-row gap-4" },
                                    react_1["default"].createElement("button", { className: " flex bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-6 py-4 rounded-md font-semibold uppercase text-sm" },
                                        react_1["default"].createElement(lucide_react_1.UserRoundPlus, { className: "w-4 h-4" }),
                                        react_1["default"].createElement("span", { className: "pl-2" },
                                            "Create A Free",
                                            react_1["default"].createElement("br", null),
                                            " Profile Now")),
                                    react_1["default"].createElement("button", { className: "border flex border-gray-600 hover:border-white transition-all duration-300 px-6 py-4 rounded-md font-semibold uppercase text-sm" },
                                        react_1["default"].createElement(lucide_react_1.CircleUserRound, { className: "w-4 h-4" }),
                                        react_1["default"].createElement("span", { className: "pl-2" }, "Learn More"))))),
                        react_1["default"].createElement("div", { className: "flex justify-center items-center" },
                            react_1["default"].createElement("img", { src: "/images/img/player-1.png", alt: "", className: "rounded-full" })))))),
        react_1["default"].createElement(PublicFooter_1.PublicFooter, null)));
};
exports["default"] = HomeTwo;
