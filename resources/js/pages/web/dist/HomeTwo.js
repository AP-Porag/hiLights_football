"use strict";
// import React from 'react'
// import PublicNavbar from '@/components/public/PublicNavbar';
// import { PublicFooter } from '@/components/public/PublicFooter';
// import ReactCountryFlag from "react-country-flag";
// import {
//     CirclePlay,
//     UserRoundPlus,
//     User,
//     Play,
//     Megaphone,
//     Users,
//     UserPlus,
//     Star,
//     Ruler,
//     Clock3,
//     ArrowRight
// } from "lucide-react";
// import { Link } from '@inertiajs/react';
exports.__esModule = true;
// const HomeTwo = () => {
//     const steps = [
//         {
//             icon: User,
//             step: "01",
//             title: "CREATE YOUR PROFILE",
//             desc: (
//                 <>
//                     Build an organized, professional profile with your{" "}
//                     <span className="text-[#ff6b00]">data</span>,{" "}
//                     <span className="text-[#ff6b00]">club history</span>,{" "}
//                     <span className="text-[#ff6b00]">
//                         physical and technical characteristics
//                     </span>
//                     , and your{" "}
//                     <span className="text-[#ff6b00]">achievements</span>.
//                 </>
//             ),
//         },
//         {
//             icon: Play,
//             step: "02",
//             title: "UPLOAD YOUR BEST VIDEOS",
//             desc: (
//                 <>
//                     Show the world your{" "}
//                     <span className="text-[#ff6b00]">best moments</span>. Get{" "}
//                     <span className="text-[#ff6b00]">improvement tips</span> to make
//                     your videos more attractive to scouts, agents and clubs.
//                 </>
//             ),
//         },
//         {
//             icon: Megaphone,
//             step: "03",
//             title: "BE SEEN. BE DISCOVERED.",
//             desc: (
//                 <>
//                     A platform developed by professionals from various areas of football
//                     with{" "}
//                     <span className="text-[#ff6b00]">
//                         over 20 years of experience worldwide
//                     </span>
//                     .
//                 </>
//             ),
//         },
//     ];
//     const players = [
//         {
//             name: "Mahamadou Balde",
//             position: "Left winger",
//             country: "Senegal",
//             code: "SN",
//             height: "178 cm",
//             age: "20 years",
//             image: "/images/img/p-3.jpg",
//         },
//         {
//             name: "Gabriel Gama",
//             position: "Attacking Midfielder",
//             country: "Brazil",
//             code: "BR",
//             height: "175 cm",
//             age: "21 years",
//             image: "/images/img/p-6.png",
//         },
//         {
//             name: "Mady Danfaga",
//             position: "Striker",
//             country: "Guinea",
//             code: "GN",
//             height: "185 cm",
//             age: "22 years",
//             image: "/images/img/p-4.jpg",
//         },
//         {
//             name: "Vinicius Peruchi",
//             position: "Goal Keeper",
//             country: "Brazil",
//             code: "BR",
//             height: "188 cm",
//             age: "21 years",
//             image: "/images/img/p-5.jpg",
//         },
//     ];
//     return (
//         <div className="bg-black text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
//             <PublicNavbar />
//             <main className="pt-16 w-full max-w-7xl mx-auto">
//                 {/* ━━━ SECTION 1: HERO ━━━ */}
//                 <section
//                     className="w-full overflow-hidden py-[-90px] text-white md:py-24"
//                     style={{
//                         backgroundImage: "url('/images/img/hero.jpg')",
//                         backgroundRepeat: 'no-repeat',
//                         backgroundPosition: 'center',
//                         backgroundSize: 'contain',
//                     }}
//                 >
//                     <div className="mx-auto">
//                         <div className="mb-10 flex sm:mb-10 lg:mb-5 md:grid md:grid-cols-2">
//                             {/* Left Content */}
//                             <div className="flex px-6 pt-16 sm:pl-10 lg:pl-16 lg:pr-10">
//                                 <div className="max-w-7xl">
//                                     {/* <h1 className="text-red-700 md:text-blue-600 min-[]:text-yellow-500 text-2xl">hello i am aongkon</h1> */}
//                                     <h1 className="text-3xl leading-tight font-extrabold uppercase sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
//                                         <span className="block text-white">Be Seen.</span>
//                                         <span className="block text-[#ee5e00]">
//                                             Be Discovered <span className="text-white">!</span>
//                                         </span>
//                                     </h1>
//                                     <p className="mt-6 sm:pr-10 lg:pr-20 max-w-xl text-xs leading-relaxed text-[#f4f4f4] sm:text-sm md:text-base lg:text-lg xl:text-xl">
//                                         The platform that connects players,
//                                         <br className="md:hidden" /> clubs, agents and scouts through <br className="md:hidden" />
//                                         videos, statistics and professional
//                                         <br className="md:hidden" /> profiles.
//                                     </p>
//                                     <div className="relative">
//                                         <p className="mt-4 max-w-xl border-l-2 border-[#b2300e] pl-3 text-xs leading-relaxed text-[#f4f4f4] sm:text-sm md:text-base lg:text-lg xl:text-xl">
//                                             Show your talent to the world and
//                                             <br className="md:hidden" /> increase your opportunities
//                                             <br className="md:hidden" /> in football.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mb-10 flex flex-wrap gap-4 pl-6 sm:pl-10 lg:pl-16">
//                             <button className="flex items-center justify-center cursor-pointer rounded-md bg-[#ea3905] px-3 py-2 text-xs md:text-base lg:text-lg font-semibold uppercase transition-all duration-300 hover:bg-orange-600 md:px-6 md:py-2">
//                                 <UserRoundPlus className="h-6 w-6" />
//                                 <span className="pl-2">
//                                     Create A Free
//                                     <br /> Profile Now
//                                 </span>
//                             </button>
//                             <button className="flex items-center cursor-pointer justify-center rounded-md border border-gray-600 px-3 py-2 text-xs md:text-base lg:text-lg font-semibold uppercase transition-all duration-300 hover:border-white md:px-6 md:py-4">
//                                 <CirclePlay className="h-6 w-6" />
//                                 <span className="pl-2">Learn More</span>
//                             </button>
//                         </div>
//                     </div>
//                 </section>
//                 <aside className="space-y-3 lg:px-10">
//                     <div className="container mx-auto my-6 px-4">
//                         <div className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-xl bg-[#464646] px-4 py-8">
//                             <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
//                         </div>
//                     </div>
//                 </aside>
//                 <section className="mx-auto max-w-7xl bg-black px-6 pt-10 text-white sm:px-10 lg:px-16 xl:px-20">
//                     <div className="">
//                         {/* Heading */}
//                         <h2 className="mb-6 text-base leading-tight font-extrabold uppercase sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
//                             A SIMPLE. PROFESSIONAL. <span className="text-[#df5f18]">EFFECTIVE PLATFORM.</span>
//                         </h2>
//                         {/* Steps */}
//                         <div className="lg:max-w-5xl">
//                             {steps.map((item, index) => {
//                                 const Icon = item.icon;
//                                 return (
//                                     <div className="lg:max-w-5x border-b border-[#1f1f1f]">
//                                         <div
//                                             key={index}
//                                             className="grid grid-cols-[50px_60px_1fr] items-center py-5 md:grid-cols-[70px_90px_1fr] lg:max-w-4xl"
//                                         >
//                                             {/* Icon */}
//                                             <div className="flex justify-center">
//                                                 <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 md:h-14 md:w-14">
//                                                     <Icon className="h-5 w-5 text-[#ff6100] md:h-8 md:w-8" />
//                                                 </div>
//                                             </div>
//                                             {/* Step */}
//                                             <div>
//                                                 <p className="text-[10px] font-bold text-[#ff6b00] md:text-sm">STEP</p>
//                                                 <h3 className="text-3xl leading-none font-extrabold text-[#ff6b00] md:text-5xl">{item.step}</h3>
//                                             </div>
//                                             {/* Content */}
//                                             <div className="border-l-4 border-[#1f1f1f] pl-3 md:pl-5">
//                                                 <h3 className="mb-1 text-base font-extrabold uppercase sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
//                                                     {item.title}
//                                                 </h3>
//                                                 <p className="text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg lg:text-xl">
//                                                     {item.desc}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                         {/* Bottom CTA */}
//                         <div className="flex items-center gap-4 border-b border-[#1f1f1f] py-6 sm:grid sm:grid-cols-[70px_1fr_200px] md:grid-cols-[90px_1fr_400px] lg:grid-cols-[110px_1fr_500px]">
//                             {/* Left Icon */}
//                             <div className="flex justify-center">
//                                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e63e00] md:h-20 md:w-20">
//                                     <Users className="text-white md:h-12 md:w-12" />
//                                 </div>
//                             </div>
//                             {/* Text */}
//                             <div>
//                                 <h3 className="text-base leading-tight font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
//                                     Not part of the <span className="text-[#ff6100]">HiLights Football</span>
//                                     <br />
//                                     community yet?
//                                 </h3>
//                                 <p className="mt-3 text-xs leading-relaxed text-[#efefef] sm:text-sm md:text-base lg:text-lg xl:text-xl">
//                                     Create your free profile, share your best moments and become visible to coaches, clubs and recruiters worldwide.
//                                 </p>
//                             </div>
//                             {/* Button */}
//                             <div className="flex items-end justify-end lg:pr-10">
//                                 <button className="sm:-w-45 flex cursor-pointer items-center gap-2 rounded-xl border border-[#773a0c] px-4 py-2 transition hover:bg-[#ff6b00]/10 md:gap-4 lg:px-8 lg:py-4">
//                                     <UserPlus className="h-6 w-6 text-white md:h-8 md:w-8" />
//                                     <span className="text-left text-xs font-bold uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl">
//                                         <span className="text-[#dc7936]">Create a Free</span>
//                                         <br />
//                                         Profile Now
//                                     </span>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 <aside className="space-y-3 lg:px-10">
//                     <div className="container mx-auto my-6 px-4">
//                         <div className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-xl bg-[#464646] px-4 py-8">
//                             <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
//                         </div>
//                     </div>
//                 </aside>
//                 <section className="mx-auto px-4 mb-6 max-w-7xl overflow-x-hidden lg:px-13">
//                     <div className="rounded-xl bg-[#f9f9f9] p-3 md:p-6">
//                         {/* Header */}
//                         <div className="flex items-center justify-between pb-3">
//                             <div className="flex items-center gap-2">
//                                 <Star size={18} fill="#ff6b00" className="text-[#f25704]" />
//                                 <h2 className="text-sm font-extrabold whitespace-nowrap text-[#222] uppercase md:text-base lg:text-lg">
//                                     Community Highlights
//                                 </h2>
//                             </div>
//                             <button className="flex cursor-pointer items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-[10px] font-bold whitespace-nowrap text-gray-700 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:text-xs">
//                                 View All
//                                 <ArrowRight size={14} className="text-[#ff6b00]" />
//                             </button>
//                         </div>
//                         {/* Rows */}
//                         {players.map((player, index) => (
//                             <Link key={index} href={route('profile.public.detail', 1)}>
//                                 <div
//                                     key={index}
//                                     className="mb-2 grid grid-cols-[40px_1fr_70px_70px] items-center rounded-[12px] bg-white pr-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:grid-cols-[70px_1fr_80px_120px] md:grid-cols-[150px_1fr_120px_170px]"
//                                 >
//                                     {/* Thumbnail */}
//                                     <div className="relative">
//                                         <img
//                                             src={player.image}
//                                             alt={player.name}
//                                             className="rounded rounded-tl-[12px] rounded-bl-[12px] object-cover"
//                                         />
//                                         <button className="absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a00]">
//                                             <Play size={12} fill="white" className="text-white" />
//                                         </button>
//                                     </div>
//                                     {/* Info */}
//                                     <div className="mr-2 px-1 md:px-6">
//                                         <h3 className="text-sm font-bold whitespace-nowrap text-[#222] md:text-base lg:text-lg">{player.name}</h3>
//                                         <p className="text-xs whitespace-nowrap text-gray-600 md:text-sm lg:text-base">{player.position}</p>
//                                         <div className="mt-1 flex items-center gap-2">
//                                             <span className="text-sm">
//                                                 <ReactCountryFlag countryCode={player.code} svg className="m[1em] mt-[2px] mr-1 md:mt-1" />
//                                             </span>
//                                             <span className="text-xs whitespace-nowrap text-gray-700 md:text-sm lg:text-base">{player.country}</span>
//                                         </div>
//                                     </div>
//                                     {/* Height */}
//                                     <div className="mr-3 flex items-center justify-center gap-2 text-sm whitespace-nowrap text-[#222] md:text-base lg:text-lg">
//                                         <Ruler size={14} />
//                                         <p>{player.height}</p>
//                                     </div>
//                                     {/* Age */}
//                                     <div className="flex items-center justify-end gap-2 text-sm whitespace-nowrap text-[#222] md:text-base lg:text-lg">
//                                         <Clock3 size={14} />
//                                         {player.age}
//                                     </div>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 </section>
//             </main>
//             <PublicFooter />
//         </div>
//     );
// }
// export default HomeTwo;
var react_1 = require("react");
var PublicNavbar_1 = require("@/components/public/PublicNavbar");
var PublicFooter_1 = require("@/components/public/PublicFooter");
var react_country_flag_1 = require("react-country-flag");
var lucide_react_1 = require("lucide-react");
var react_2 = require("@inertiajs/react");
var HomeTwo = function () {
    var steps = [
        {
            icon: lucide_react_1.User,
            step: "01",
            title: "CREATE YOUR PROFILE",
            desc: (react_1["default"].createElement(react_1["default"].Fragment, null,
                "Build an organized, professional profile with your",
                " ",
                react_1["default"].createElement("span", { className: "text-[#ff6b00]" }, "data"),
                ",",
                " ",
                react_1["default"].createElement("span", { className: "text-[#ff6b00]" }, "club history"),
                ",",
                " ",
                react_1["default"].createElement("span", { className: "text-[#ff6b00]" }, "physical and technical characteristics"),
                ", and your",
                " ",
                react_1["default"].createElement("span", { className: "text-[#ff6b00]" }, "achievements"),
                "."))
        },
        {
            icon: lucide_react_1.Play,
            step: "02",
            title: "UPLOAD YOUR BEST VIDEOS",
            desc: (react_1["default"].createElement(react_1["default"].Fragment, null,
                "Show the world your",
                " ",
                react_1["default"].createElement("span", { className: "text-[#ff6b00]" }, "best moments"),
                ". Get",
                " ",
                react_1["default"].createElement("span", { className: "text-[#ff6b00]" }, "improvement tips"),
                " to make your videos more attractive to scouts, agents and clubs."))
        },
        {
            icon: lucide_react_1.Megaphone,
            step: "03",
            title: "BE SEEN. BE DISCOVERED.",
            desc: (react_1["default"].createElement(react_1["default"].Fragment, null,
                "A platform developed by professionals from various areas of football with",
                " ",
                react_1["default"].createElement("span", { className: "text-[#ff6b00]" }, "over 20 years of experience worldwide"),
                "."))
        },
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
        react_1["default"].createElement("main", { className: "w-full max-w-screen-2xl mx-auto pt-16" },
            react_1["default"].createElement("section", { className: "relative w-full overflow-hidden text-white", style: {
                    backgroundImage: "url('/images/img/hero.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                    backgroundSize: 'contain'
                } },
                react_1["default"].createElement("div", { className: "grid min-h-[380px] grid-cols-1 items-center sm:min-h-[440px] md:min-h-[520px] md:grid-cols-2 lg:min-h-[600px] xl:min-h-[660px]" },
                    react_1["default"].createElement("div", { className: "px-6 py-14 sm:px-10 md:py-20 lg:px-16" },
                        react_1["default"].createElement("div", { className: "max-w-xl" },
                            react_1["default"].createElement("h1", { className: "text-3xl font-extrabold uppercase leading-tight sm:text-4xl md:text-[42px] lg:text-5xl xl:text-6xl" },
                                react_1["default"].createElement("span", { className: "block text-white" }, "Be Seen."),
                                react_1["default"].createElement("span", { className: "block text-[#ee5e00]" },
                                    "Be Discovered ",
                                    react_1["default"].createElement("span", { className: "text-white" }, "!"))),
                            react_1["default"].createElement("p", { className: "mt-6 max-w-lg text-sm leading-relaxed text-[#f4f4f4] sm:text-base xl:text-lg" }, "The platform that connects players, clubs, agents and scouts through videos, statistics and professional profiles."),
                            react_1["default"].createElement("p", { className: "mt-4 max-w-lg border-l-2 border-[#b2300e] pl-3 text-sm leading-relaxed text-[#f4f4f4] sm:text-base xl:text-lg" }, "Show your talent to the world and increase your opportunities in football."),
                            react_1["default"].createElement("div", { className: "mt-8 flex flex-wrap items-center gap-4" },
                                react_1["default"].createElement("button", { className: "flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#ea3905] px-4 py-3 text-xs font-semibold uppercase transition-all duration-300 hover:bg-orange-600 sm:text-sm lg:px-6 lg:py-3 lg:text-base" },
                                    react_1["default"].createElement(lucide_react_1.UserRoundPlus, { className: "h-5 w-5 shrink-0 lg:h-6 lg:w-6" }),
                                    react_1["default"].createElement("span", { className: "text-left leading-tight" },
                                        "Create A Free",
                                        react_1["default"].createElement("br", null),
                                        " Profile Now")),
                                react_1["default"].createElement("button", { className: "flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-600 px-4 py-3 text-xs font-semibold uppercase transition-all duration-300 hover:border-white sm:text-sm lg:px-6 lg:py-4 lg:text-base" },
                                    react_1["default"].createElement(lucide_react_1.CirclePlay, { className: "h-5 w-5 shrink-0 lg:h-6 lg:w-6" }),
                                    react_1["default"].createElement("span", null, "Learn More"))))),
                    react_1["default"].createElement("div", { className: "hidden md:block", "aria-hidden": "true" }))),
            react_1["default"].createElement("aside", { className: "space-y-3 lg:px-10" },
                react_1["default"].createElement("div", { className: "container mx-auto my-6 px-4" },
                    react_1["default"].createElement("div", { className: "mx-auto flex w-full max-w-7xl items-center justify-center rounded-xl bg-[#464646] px-4 py-8" },
                        react_1["default"].createElement("p", { className: "text-sm font-medium tracking-widest text-white/50 uppercase" }, "ADVERTISING SPACE")))),
            react_1["default"].createElement("section", { className: "mx-auto max-w-7xl bg-black px-6 pt-10 text-white sm:px-10 lg:px-16" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("h2", { className: "mb-6 text-2xl font-extrabold uppercase leading-tight sm:text-3xl lg:text-4xl" },
                        "A SIMPLE. PROFESSIONAL. ",
                        react_1["default"].createElement("span", { className: "text-[#df5f18]" }, "EFFECTIVE PLATFORM.")),
                    react_1["default"].createElement("div", { className: "lg:max-w-5xl" }, steps.map(function (item, index) {
                        var Icon = item.icon;
                        return (react_1["default"].createElement("div", { key: index, className: "border-b border-[#1f1f1f]" },
                            react_1["default"].createElement("div", { className: "grid grid-cols-[50px_60px_1fr] items-center py-5 md:grid-cols-[70px_90px_1fr] lg:max-w-4xl" },
                                react_1["default"].createElement("div", { className: "flex justify-center" },
                                    react_1["default"].createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 md:h-14 md:w-14" },
                                        react_1["default"].createElement(Icon, { className: "h-5 w-5 text-[#ff6100] md:h-8 md:w-8" }))),
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("p", { className: "text-[10px] font-bold text-[#ff6b00] md:text-sm" }, "STEP"),
                                    react_1["default"].createElement("h3", { className: "text-3xl leading-none font-extrabold text-[#ff6b00] md:text-5xl" }, item.step)),
                                react_1["default"].createElement("div", { className: "border-l-4 border-[#1f1f1f] pl-3 md:pl-5" },
                                    react_1["default"].createElement("h3", { className: "mb-1 text-base font-extrabold uppercase sm:text-lg md:text-xl lg:text-2xl" }, item.title),
                                    react_1["default"].createElement("p", { className: "text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg" }, item.desc)))));
                    })),
                    react_1["default"].createElement("div", { className: "flex items-center gap-4 border-b border-[#1f1f1f] py-6 sm:grid sm:grid-cols-[70px_1fr_200px] md:grid-cols-[90px_1fr_300px] lg:grid-cols-[110px_1fr_320px]" },
                        react_1["default"].createElement("div", { className: "flex justify-center" },
                            react_1["default"].createElement("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e63e00] md:h-20 md:w-20" },
                                react_1["default"].createElement(lucide_react_1.Users, { className: "text-white md:h-12 md:w-12" }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("h3", { className: "text-base leading-tight font-bold sm:text-lg md:text-xl lg:text-2xl" },
                                "Not part of the ",
                                react_1["default"].createElement("span", { className: "text-[#ff6100]" }, "HiLights Football"),
                                react_1["default"].createElement("br", null),
                                "community yet?"),
                            react_1["default"].createElement("p", { className: "mt-3 max-w-xl text-xs leading-relaxed text-[#efefef] sm:text-sm md:text-base" }, "Create your free profile, share your best moments and become visible to coaches, clubs and recruiters worldwide.")),
                        react_1["default"].createElement("div", { className: "flex items-end justify-end lg:pr-4" },
                            react_1["default"].createElement("button", { className: "flex cursor-pointer items-center gap-2 rounded-xl border border-[#773a0c] px-4 py-2 transition hover:bg-[#ff6b00]/10 md:gap-4 lg:px-8 lg:py-4" },
                                react_1["default"].createElement(lucide_react_1.UserPlus, { className: "h-6 w-6 shrink-0 text-white md:h-8 md:w-8" }),
                                react_1["default"].createElement("span", { className: "text-left text-xs font-bold uppercase sm:text-sm lg:text-base" },
                                    react_1["default"].createElement("span", { className: "text-[#dc7936]" }, "Create a Free"),
                                    react_1["default"].createElement("br", null),
                                    "Profile Now")))))),
            react_1["default"].createElement("aside", { className: "space-y-3 lg:px-10" },
                react_1["default"].createElement("div", { className: "container mx-auto my-6 px-4" },
                    react_1["default"].createElement("div", { className: "mx-auto flex w-full max-w-7xl items-center justify-center rounded-xl bg-[#464646] px-4 py-8" },
                        react_1["default"].createElement("p", { className: "text-sm font-medium tracking-widest text-white/50 uppercase" }, "ADVERTISING SPACE")))),
            react_1["default"].createElement("section", { className: "mx-auto mb-6 max-w-7xl overflow-x-hidden px-4 lg:px-13" },
                react_1["default"].createElement("div", { className: "rounded-xl bg-[#f9f9f9] p-3 md:p-6" },
                    react_1["default"].createElement("div", { className: "flex items-center justify-between pb-3" },
                        react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                            react_1["default"].createElement(lucide_react_1.Star, { size: 18, fill: "#ff6b00", className: "text-[#f25704]" }),
                            react_1["default"].createElement("h2", { className: "text-xs font-extrabold whitespace-nowrap text-[#222] uppercase md:text-sm lg:text-base" }, "Community Highlights")),
                        react_1["default"].createElement("button", { className: "flex cursor-pointer items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-[10px] font-bold whitespace-nowrap text-gray-700 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:text-xs lg:text-sm" },
                            "View All",
                            react_1["default"].createElement(lucide_react_1.ArrowRight, { size: 14, className: "text-[#ff6b00]" }))),
                    players.map(function (player, index) { return (react_1["default"].createElement(react_2.Link, { key: index, href: route('profile.public.detail', 1) },
                        react_1["default"].createElement("div", { className: "mb-2 grid grid-cols-[40px_1fr_70px_70px] items-center rounded-[12px] bg-white pr-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:grid-cols-[70px_1fr_80px_120px] md:grid-cols-[150px_1fr_120px_170px]" },
                            react_1["default"].createElement("div", { className: "relative" },
                                react_1["default"].createElement("img", { src: player.image, alt: player.name, className: "rounded rounded-tl-[12px] rounded-bl-[12px] object-cover" }),
                                react_1["default"].createElement("button", { className: "absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a00]" },
                                    react_1["default"].createElement(lucide_react_1.Play, { size: 12, fill: "white", className: "text-white" }))),
                            react_1["default"].createElement("div", { className: "mr-2 px-1 md:px-6" },
                                react_1["default"].createElement("h3", { className: "text-sm font-bold whitespace-nowrap text-[#222] md:text-[15px] lg:text-base" }, player.name),
                                react_1["default"].createElement("p", { className: "text-xs whitespace-nowrap text-gray-600 md:text-sm" }, player.position),
                                react_1["default"].createElement("div", { className: "mt-1 flex items-center gap-2" },
                                    react_1["default"].createElement("span", { className: "text-sm" },
                                        react_1["default"].createElement(react_country_flag_1["default"], { countryCode: player.code, svg: true, className: "mt-[2px] mr-1 md:mt-1" })),
                                    react_1["default"].createElement("span", { className: "text-xs whitespace-nowrap text-gray-700 md:text-sm" }, player.country))),
                            react_1["default"].createElement("div", { className: "mr-3 flex items-center justify-center gap-2 text-xs whitespace-nowrap text-[#222] md:text-sm lg:text-base" },
                                react_1["default"].createElement(lucide_react_1.Ruler, { size: 14 }),
                                react_1["default"].createElement("p", null, player.height)),
                            react_1["default"].createElement("div", { className: "flex items-center justify-end gap-2 text-xs whitespace-nowrap text-[#222] md:ml-4 md:text-sm lg:text-base" },
                                react_1["default"].createElement(lucide_react_1.Clock3, { size: 14 }),
                                player.age)))); })))),
        react_1["default"].createElement(PublicFooter_1.PublicFooter, null)));
};
exports["default"] = HomeTwo;
