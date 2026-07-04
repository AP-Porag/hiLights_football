"use strict";

exports.__esModule = true;

var react_1 = require("react");

var PublicNavbar_1 = require("@/components/public/PublicNavbar");

var PublicFooter_1 = require("@/components/public/PublicFooter");

var react_country_flag_1 = require("react-country-flag");

var lucide_react_1 = require("lucide-react");

var react_2 = require("@inertiajs/react");

var HomeTwo = function HomeTwo() {
  var steps = [{
    icon: lucide_react_1.User,
    step: "01",
    title: "CREATE YOUR PROFILE",
    desc: react_1["default"].createElement(react_1["default"].Fragment, null, "Build an organized, professional profile with your", " ", react_1["default"].createElement("span", {
      className: "text-[#ff6b00]"
    }, "data"), ",", " ", react_1["default"].createElement("span", {
      className: "text-[#ff6b00]"
    }, "club history"), ",", " ", react_1["default"].createElement("span", {
      className: "text-[#ff6b00]"
    }, "physical and technical characteristics"), ", and your", " ", react_1["default"].createElement("span", {
      className: "text-[#ff6b00]"
    }, "achievements"), ".")
  }, {
    icon: lucide_react_1.Play,
    step: "02",
    title: "UPLOAD YOUR BEST VIDEOS",
    desc: react_1["default"].createElement(react_1["default"].Fragment, null, "Show the world your", " ", react_1["default"].createElement("span", {
      className: "text-[#ff6b00]"
    }, "best moments"), ". Get", " ", react_1["default"].createElement("span", {
      className: "text-[#ff6b00]"
    }, "improvement tips"), " to make your videos more attractive to scouts, agents and clubs.")
  }, {
    icon: lucide_react_1.Megaphone,
    step: "03",
    title: "BE SEEN. BE DISCOVERED.",
    desc: react_1["default"].createElement(react_1["default"].Fragment, null, "A platform developed by professionals from various areas of football with", " ", react_1["default"].createElement("span", {
      className: "text-[#ff6b00]"
    }, "over 20 years of experience worldwide"), ".")
  }];
  var players = [{
    name: "Mahamadou Balde",
    position: "Left winger",
    country: "Senegal",
    code: "SN",
    height: "178 cm",
    age: "20 years",
    image: "/images/img/p-3.jpg"
  }, {
    name: "Gabriel Gama",
    position: "Attacking Midfielder",
    country: "Brazil",
    code: "BR",
    height: "175 cm",
    age: "21 years",
    image: "/images/img/p-6.png"
  }, {
    name: "Mady Danfaga",
    position: "Striker",
    country: "Guinea",
    code: "GN",
    height: "185 cm",
    age: "22 years",
    image: "/images/img/p-4.jpg"
  }, {
    name: "Vinicius Peruchi",
    position: "Goal Keeper",
    country: "Brazil",
    code: "BR",
    height: "188 cm",
    age: "21 years",
    image: "/images/img/p-5.jpg"
  }];
  return react_1["default"].createElement("div", {
    className: "bg-black text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]"
  }, react_1["default"].createElement(PublicNavbar_1["default"], null), react_1["default"].createElement("main", {
    className: "pt-16 w-full max-w-7xl mx-auto"
  }, react_1["default"].createElement("section", {
    className: "w-full overflow-hidden py-[-90px] text-white md:py-24",
    style: {
      backgroundImage: "url('/images/img/hero.jpg')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain'
    }
  }, react_1["default"].createElement("div", {
    className: "mx-auto"
  }, react_1["default"].createElement("div", {
    className: "mb-10 flex sm:mb-10 lg:mb-5 md:grid md:grid-cols-2"
  }, react_1["default"].createElement("div", {
    className: "flex px-6 pt-16 sm:px-10 lg:px-16"
  }, react_1["default"].createElement("div", {
    className: "max-w-xl"
  }, react_1["default"].createElement("h1", {
    className: "sm:text-3xl leading-tight font-extrabold uppercase md:text-4xl lg:text-4xl"
  }, react_1["default"].createElement("span", {
    className: "block text-white"
  }, "Be Seen."), react_1["default"].createElement("span", {
    className: "block text-[#ee5e00]"
  }, "Be Discovered ", react_1["default"].createElement("span", {
    className: "text-white"
  }, "!"))), react_1["default"].createElement("p", {
    className: "mt-6 max-w-lg text-[10px] leading-relaxed text-[#f4f4f4] sm:text-[12px] md:text-[14px] lg:text-base"
  }, "The platform that connects players,", react_1["default"].createElement("br", {
    className: "md:hidden"
  }), " clubs, agents and scouts through ", react_1["default"].createElement("br", {
    className: "md:hidden"
  }), "videos, statistics and professional", react_1["default"].createElement("br", {
    className: "md:hidden"
  }), " profiles."), react_1["default"].createElement("div", {
    className: "relative"
  }, react_1["default"].createElement("p", {
    className: "mt-4 max-w-lg border-l-2 border-[#b2300e] pl-2 text-[10px] leading-relaxed text-[#f4f4f4] sm:text-[12px] md:text-[14px] lg:text-base"
  }, "Show your talent to the world and", react_1["default"].createElement("br", {
    className: "md:hidden"
  }), " increase your opportunities", react_1["default"].createElement("br", {
    className: "md:hidden"
  }), " in football."))))), react_1["default"].createElement("div", {
    className: "mb-10 flex w-[200%] flex-row gap-4 pl-6 sm:pl-10 lg:pl-16"
  }, react_1["default"].createElement("button", {
    className: "flex items-center justify-center cursor-pointer rounded-md bg-[#ea3905] px-3 py-2 text-[10px] font-semibold uppercase transition-all duration-300 hover:bg-orange-600 md:px-6 md:py-2 md:text-sm"
  }, react_1["default"].createElement(lucide_react_1.UserRoundPlus, {
    className: "h-6 w-6"
  }), react_1["default"].createElement("span", {
    className: "pl-2"
  }, "Create A Free", react_1["default"].createElement("br", null), " Profile Now")), react_1["default"].createElement("button", {
    className: "flex items-center cursor-pointer justify-center rounded-md border border-gray-600 px-3 py-2 text-[10px] font-semibold uppercase transition-all duration-300 hover:border-white md:px-6 md:py-4 md:text-sm"
  }, react_1["default"].createElement(lucide_react_1.CirclePlay, {
    className: "h-6 w-6"
  }), react_1["default"].createElement("span", {
    className: "pl-2"
  }, "Learn More"))))), react_1["default"].createElement("aside", {
    className: "space-y-3 lg:px-10"
  }, react_1["default"].createElement("div", {
    className: "container mx-auto my-6 px-4"
  }, react_1["default"].createElement("div", {
    className: "mx-auto flex w-full max-w-7xl items-center justify-center rounded-xl bg-[#464646] px-4 py-8"
  }, react_1["default"].createElement("p", {
    className: "text-sm font-medium tracking-widest text-white/50 uppercase"
  }, "ADVERTISING SPACE")))), react_1["default"].createElement("section", {
    className: "mx-auto max-w-7xl bg-black px-6 pt-10 text-white sm:px-10 lg:px-16"
  }, react_1["default"].createElement("div", {
    className: ""
  }, react_1["default"].createElement("h2", {
    className: "mb-6 text-[20px] leading-tight font-extrabold uppercase md:text-3xl"
  }, "A SIMPLE. PROFESSIONAL. ", react_1["default"].createElement("span", {
    className: "text-[#df5f18]"
  }, "EFFECTIVE PLATFORM.")), react_1["default"].createElement("div", {
    className: "lg:max-w-5xl"
  }, steps.map(function (item, index) {
    var Icon = item.icon;
    return react_1["default"].createElement("div", {
      className: "lg:max-w-5x border-b border-[#1f1f1f]"
    }, react_1["default"].createElement("div", {
      key: index,
      className: "grid grid-cols-[50px_60px_1fr] items-center py-5 md:grid-cols-[70px_90px_1fr] lg:max-w-4xl"
    }, react_1["default"].createElement("div", {
      className: "flex justify-center"
    }, react_1["default"].createElement("div", {
      className: "flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 md:h-14 md:w-14"
    }, react_1["default"].createElement(Icon, {
      className: "h-5 w-5 text-[#ff6100] md:h-8 md:w-8"
    }))), react_1["default"].createElement("div", null, react_1["default"].createElement("p", {
      className: "text-[10px] font-bold text-[#ff6b00] md:text-sm"
    }, "STEP"), react_1["default"].createElement("h3", {
      className: "text-3xl leading-none font-extrabold text-[#ff6b00] md:text-5xl"
    }, item.step)), react_1["default"].createElement("div", {
      className: "border-l-4 border-[#1f1f1f] pl-3 md:pl-5"
    }, react_1["default"].createElement("h3", {
      className: "mb-1 text-[14px] font-extrabold uppercase sm:text-[16px] md:text-[18px] lg:text-[22px]"
    }, item.title), react_1["default"].createElement("p", {
      className: "text-[12px] leading-relaxed text-gray-300 sm:text-[14px] md:text-[16px] lg:text-[18px]"
    }, item.desc))));
  })), react_1["default"].createElement("div", {
    className: "flex items-center gap-4 border-b border-[#1f1f1f] py-6 sm:grid sm:grid-cols-[70px_1fr_200px] md:grid-cols-[90px_1fr_400px] lg:grid-cols-[110px_1fr_500px]"
  }, react_1["default"].createElement("div", {
    className: "flex justify-center"
  }, react_1["default"].createElement("div", {
    className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#e63e00] md:h-20 md:w-20"
  }, react_1["default"].createElement(lucide_react_1.Users, {
    className: "text-white md:h-12 md:w-12"
  }))), react_1["default"].createElement("div", null, react_1["default"].createElement("h3", {
    className: "text-[14px] leading-tight font-bold sm:text-[16px] md:text-[18px] lg:text-[22px]"
  }, "Not part of the ", react_1["default"].createElement("span", {
    className: "text-[#ff6100]"
  }, "HiLights Football"), react_1["default"].createElement("br", null), "community yet?"), react_1["default"].createElement("p", {
    className: "mt-3 text-[10px] leading-relaxed text-[#efefef] sm:text-[12px] md:text-[14px] lg:text-[16px]"
  }, "Create your free profile, share your best moments and become visible to coaches, clubs and recruiters worldwide.")), react_1["default"].createElement("div", {
    className: "flex items-end justify-end lg:pr-10"
  }, react_1["default"].createElement("button", {
    className: "sm:-w-45 flex cursor-pointer items-center gap-2 rounded-xl border border-[#773a0c] px-4 py-2 transition hover:bg-[#ff6b00]/10 md:gap-4 lg:px-8 lg:py-4"
  }, react_1["default"].createElement(lucide_react_1.UserPlus, {
    className: "h-6 w-6 text-white md:h-8 md:w-8"
  }), react_1["default"].createElement("span", {
    className: "text-left text-[10px] font-bold uppercase sm:text-[12px] md:text-[14px] lg:text-[16px]"
  }, react_1["default"].createElement("span", {
    className: "text-[#dc7936]"
  }, "Create a Free"), react_1["default"].createElement("br", null), "Profile Now")))))), react_1["default"].createElement("aside", {
    className: "space-y-3 lg:px-10"
  }, react_1["default"].createElement("div", {
    className: "container mx-auto my-6 px-4"
  }, react_1["default"].createElement("div", {
    className: "mx-auto flex w-full max-w-7xl items-center justify-center rounded-xl bg-[#464646] px-4 py-8"
  }, react_1["default"].createElement("p", {
    className: "text-sm font-medium tracking-widest text-white/50 uppercase"
  }, "ADVERTISING SPACE")))), react_1["default"].createElement("section", {
    className: "mx-auto px-4 mb-6 max-w-7xl overflow-x-hidden lg:px-13"
  }, react_1["default"].createElement("div", {
    className: "rounded-xl bg-[#f9f9f9] p-3 md:p-6"
  }, react_1["default"].createElement("div", {
    className: "flex items-center justify-between pb-3"
  }, react_1["default"].createElement("div", {
    className: "flex items-center gap-2"
  }, react_1["default"].createElement(lucide_react_1.Star, {
    size: 18,
    fill: "#ff6b00",
    className: "text-[#f25704]"
  }), react_1["default"].createElement("h2", {
    className: "text-[12px] font-extrabold whitespace-nowrap text-[#222] uppercase md:text-sm"
  }, "Community Highlights")), react_1["default"].createElement("button", {
    className: "flex cursor-pointer items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-[10px] font-bold whitespace-nowrap text-gray-700 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:text-xs"
  }, "View All", react_1["default"].createElement(lucide_react_1.ArrowRight, {
    size: 14,
    className: "text-[#ff6b00]"
  }))), players.map(function (player, index) {
    return react_1["default"].createElement(react_2.Link, {
      key: index,
      href: route('profile.public.detail', 1)
    }, react_1["default"].createElement("div", {
      key: index,
      className: "mb-2 grid grid-cols-[40px_1fr_70px_70px] items-center rounded-[12px] bg-white pr-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:grid-cols-[70px_1fr_80px_120px] md:grid-cols-[150px_1fr_120px_170px]"
    }, react_1["default"].createElement("div", {
      className: "relative"
    }, react_1["default"].createElement("img", {
      src: player.image,
      alt: player.name,
      className: "rounded rounded-tl-[12px] rounded-bl-[12px] object-cover"
    }), react_1["default"].createElement("button", {
      className: "absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a00]"
    }, react_1["default"].createElement(lucide_react_1.Play, {
      size: 12,
      fill: "white",
      className: "text-white"
    }))), react_1["default"].createElement("div", {
      className: "mr-2 px-1 md:px-6"
    }, react_1["default"].createElement("h3", {
      className: "text-[12px] font-bold whitespace-nowrap text-[#222] md:text-[15px]"
    }, player.name), react_1["default"].createElement("p", {
      className: "text-[10px] whitespace-nowrap text-gray-600 md:text-xs"
    }, player.position), react_1["default"].createElement("div", {
      className: "mt-1 flex items-center gap-2"
    }, react_1["default"].createElement("span", {
      className: "text-sm"
    }, react_1["default"].createElement(react_country_flag_1["default"], {
      countryCode: player.code,
      svg: true,
      className: "m[1em] mt-[2px] mr-1 md:mt-1"
    })), react_1["default"].createElement("span", {
      className: "text-[10px] whitespace-nowrap text-gray-700 md:text-xs"
    }, player.country))), react_1["default"].createElement("div", {
      className: "mr-3 flex items-center justify-center gap-2 text-[12px] whitespace-nowrap text-[#222] md:text-sm"
    }, react_1["default"].createElement(lucide_react_1.Ruler, {
      size: 14
    }), react_1["default"].createElement("p", null, player.height)), react_1["default"].createElement("div", {
      className: "flex items-center justify-end gap-2 text-[12px] whitespace-nowrap text-[#222] md:ml-4 md:text-sm"
    }, react_1["default"].createElement(lucide_react_1.Clock3, {
      size: 14
    }), player.age)));
  })))), react_1["default"].createElement(PublicFooter_1.PublicFooter, null));
};

exports["default"] = HomeTwo;