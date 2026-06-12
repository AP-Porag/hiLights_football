"use strict";
exports.__esModule = true;
exports.PublicFooter = void 0;
var react_1 = require("react");
var react_2 = require("@inertiajs/react");
exports.PublicFooter = function () {
    return (react_1["default"].createElement("section", { className: "bg-[#0F172A] py-12 px-6" },
        react_1["default"].createElement("div", { className: "max-w-[1200px] mx-auto" },
            react_1["default"].createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8" },
                react_1["default"].createElement("div", { className: "col-span-2 md:col-span-1" },
                    react_1["default"].createElement("img", { src: "/images/logo/hilights_logo_dark_200.png", className: "h-10 w-auto", alt: "HiLights Football" }),
                    react_1["default"].createElement("p", { className: "text-white/60 text-sm mt-4" }, "The platform where football talent meets opportunity.")),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { className: "text-white font-bold text-sm mb-3" }, "Platform"),
                    react_1["default"].createElement("ul", { className: "space-y-2 text-white/60 text-sm" },
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(react_2.Link, { href: "/players", className: "hover:text-white" }, "Players")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(react_2.Link, { href: "/scouts", className: "hover:text-white" }, "Scouts")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(react_2.Link, { href: "/pricing", className: "hover:text-white" }, "Pricing")))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { className: "text-white font-bold text-sm mb-3" }, "Company"),
                    react_1["default"].createElement("ul", { className: "space-y-2 text-white/60 text-sm" },
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(react_2.Link, { href: "/about", className: "hover:text-white" }, "About")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(react_2.Link, { href: "/contact", className: "hover:text-white" }, "Contact")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(react_2.Link, { href: "/careers", className: "hover:text-white" }, "Careers")))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { className: "text-white font-bold text-sm mb-3" }, "Legal"),
                    react_1["default"].createElement("ul", { className: "space-y-2 text-white/60 text-sm" },
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(react_2.Link, { href: "/terms", className: "hover:text-white" }, "Terms")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(react_2.Link, { href: "/privacy", className: "hover:text-white" }, "Privacy")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(react_2.Link, { href: "/cookies", className: "hover:text-white" }, "Cookies"))))),
            react_1["default"].createElement("div", { className: "border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" },
                react_1["default"].createElement("div", { className: "text-white/40 text-xs" }, "\u00A9 2026 HiLights Football. All rights reserved."),
                react_1["default"].createElement("div", { className: "text-white/40 text-xs font-mono" }, "v2.4.1")))));
};
