import React from 'react'
import PublicNavbar from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/PublicFooter';
import ReactCountryFlag from "react-country-flag";
import {
    CirclePlay,
    UserRoundPlus,
    User,
    Play,
    Megaphone,
    Users,
    UserPlus,
    Star,
    Ruler,
    Clock3,
    ArrowRight
} from "lucide-react";
import { Link } from '@inertiajs/react';

const HomeTwo = () => {


    const steps = [
        {
            icon: User,
            step: "01",
            title: "CREATE YOUR PROFILE",
            desc: (
                <>
                    Build an organized, professional profile with your{" "}
                    <span className="text-[#ff6b00]">data</span>,{" "}
                    <span className="text-[#ff6b00]">club history</span>,{" "}
                    <span className="text-[#ff6b00]">
                        physical and technical characteristics
                    </span>
                    , and your{" "}
                    <span className="text-[#ff6b00]">achievements</span>.
                </>
            ),
        },
        {
            icon: Play,
            step: "02",
            title: "UPLOAD YOUR BEST VIDEOS",
            desc: (
                <>
                    Show the world your{" "}
                    <span className="text-[#ff6b00]">best moments</span>. Get{" "}
                    <span className="text-[#ff6b00]">improvement tips</span> to make
                    your videos more attractive to scouts, agents and clubs.
                </>
            ),
        },
        {
            icon: Megaphone,
            step: "03",
            title: "BE SEEN. BE DISCOVERED.",
            desc: (
                <>
                    A platform developed by professionals from various areas of football
                    with{" "}
                    <span className="text-[#ff6b00]">
                        over 20 years of experience worldwide
                    </span>
                    .
                </>
            ),
        },
    ];


    const players = [
        {
            name: "Mahamadou Balde",
            position: "Left winger",
            country: "Senegal",
            code: "SN",
            height: "178 cm",
            age: "20 years",
            image: "/images/img/p-3.jpg",
        },
        {
            name: "Gabriel Gama",
            position: "Attacking Midfielder",
            country: "Brazil",
            code: "BR",
            height: "175 cm",
            age: "21 years",
            image: "/images/img/p-6.png",
        },
        {
            name: "Mady Danfaga",
            position: "Striker",
            country: "Guinea",
            code: "GN",
            height: "185 cm",
            age: "22 years",
            image: "/images/img/p-4.jpg",
        },
        {
            name: "Vinicius Peruchi",
            position: "Goal Keeper",
            country: "Brazil",
            code: "BR",
            height: "188 cm",
            age: "21 years",
            image: "/images/img/p-5.jpg",
        },
    ];


    return (
        <div className="bg-black text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
            <PublicNavbar />

            <main className="pt-16">
                {/* ━━━ SECTION 1: HERO ━━━ */}

                <section
                    className="w-full overflow-hidden py-[-90px] text-white md:py-24"
                    style={{
                        backgroundImage: "url('/images/img/hero.jpg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                    }}
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-10 flex sm:mb-10 md:mb-26 md:grid md:grid-cols-2">
                            {/* Left Content */}
                            <div className="flex px-6 pt-16 sm:px-10 lg:px-16">
                                <div className="max-w-xl">
                                    <h1 className="text-[18px] leading-tight font-extrabold uppercase md:text-2xl lg:text-4xl">
                                        <span className="block text-white">Be Seen.</span>

                                        <span className="block text-orange-500">
                                            Be Discovered <span className="text-white">!</span>
                                        </span>
                                    </h1>

                                    <p className="mt-6 max-w-lg text-[10px] leading-relaxed text-gray-300 sm:text-[12px] md:text-[14px] lg:text-base">
                                        The platform that connects players,
                                        <br className="md:hidden" /> clubs, agents and scouts through <br className="md:hidden" />
                                        videos, statistics and professional
                                        <br className="md:hidden" /> profiles.
                                    </p>

                                    <div className="relative">
                                        <p className="mt-4 max-w-lg border-l-2 border-red-500 pl-2 text-[10px] leading-relaxed text-gray-300 sm:text-[12px] md:text-[14px] lg:text-base">
                                            Show your talent to the world and
                                            <br className="md:hidden" /> increase your opportunities
                                            <br className="md:hidden" /> in football.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Empty Section */}
                            {/* <div className="">
            <img src="/images/img/player-1.png" alt=""
            className="rounded-full mt-10"
            />
          </div> */}
                        </div>
                        <div className="mb-10 flex w-[200%] flex-row gap-4 pl-6 md:top-15 md:pl-16">
                            <button className="flex items-center justify-center rounded-md bg-orange-500 px-3 py-2 text-[10px] font-semibold uppercase transition-all duration-300 hover:bg-orange-600 md:px-6 md:py-4 md:text-sm">
                                <UserRoundPlus className="h-6 w-6" />
                                <span className="pl-2">
                                    Create A Free
                                    <br /> Profile Now
                                </span>
                            </button>

                            <button className="flex items-center justify-center rounded-md border border-gray-600 px-3 py-2 text-[10px] font-semibold uppercase transition-all duration-300 hover:border-white md:px-6 md:py-4 md:text-sm">
                                <CirclePlay className="h-6 w-6" />
                                <span className="pl-2">Learn More</span>
                            </button>
                        </div>
                    </div>
                </section>

                <aside className="space-y-3">
                    <div className="container mx-auto my-6 px-4">
                        <div className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-xl bg-[#464646] px-4 py-8">
                            <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
                        </div>
                    </div>
                </aside>

                <section className="mx-auto max-w-7xl bg-black px-6 pt-10 text-white sm:px-10 lg:px-16">
                    <div className="">
                        {/* Heading */}
                        <h2 className="mb-6 text-[20px] leading-tight font-extrabold uppercase md:text-3xl">
                            A SIMPLE. PROFESSIONAL. <span className="text-[#ff6b00]">EFFECTIVE PLATFORM.</span>
                        </h2>

                        {/* Steps */}
                        <div className="lg:max-w-5xl">
                            {steps.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div className="lg:max-w-5x border-b border-[#1f1f1f]">
                                        <div
                                            key={index}
                                            className="grid grid-cols-[50px_60px_1fr] items-center py-5 md:grid-cols-[70px_90px_1fr] lg:max-w-4xl"
                                        >
                                            {/* Icon */}
                                            <div className="flex justify-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 md:h-14 md:w-14">
                                                    <Icon className="h-4 w-4 text-[#ff6b00] md:h-6 md:w-6" />
                                                </div>
                                            </div>

                                            {/* Step */}
                                            <div>
                                                <p className="text-[10px] font-bold text-[#ff6b00] md:text-sm">STEP</p>
                                                <h3 className="text-3xl leading-none font-extrabold text-[#ff6b00] md:text-5xl">{item.step}</h3>
                                            </div>

                                            {/* Content */}
                                            <div className="border-l-4 border-[#1f1f1f] pl-3 md:pl-5">
                                                <h3 className="mb-1 text-[14px] font-extrabold uppercase sm:text-[16px] md:text-[18px] lg:text-[22px]">
                                                    {item.title}
                                                </h3>

                                                <p className="text-[12px] leading-relaxed text-gray-300 sm:text-[14px] md:text-[16px] lg:text-[18px]">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom CTA */}
                        <div className="flex items-center gap-4 border-b border-[#1f1f1f] py-6 sm:grid sm:grid-cols-[70px_1fr_200px] md:grid-cols-[90px_1fr_400px] lg:grid-cols-[110px_1fr_500px]">
                            {/* Left Icon */}
                            <div className="flex justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff6b00] md:h-20 md:w-20">
                                    <Users className="text-white md:h-12 md:w-12" />
                                </div>
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className="text-[14px] leading-tight font-bold sm:text-[16px] md:text-[18px] lg:text-[22px]">
                                    Not part of the <span className="text-[#ff6b00]">HiLights Football</span>
                                    <br />
                                    community yet?
                                </h3>

                                <p className="mt-3 text-[10px] leading-relaxed text-gray-300 sm:text-[12px] md:text-[14px] lg:text-[16px]">
                                    Create your free profile, share your best moments and become visible to coaches, clubs and recruiters worldwide.
                                </p>
                            </div>

                            {/* Button */}
                            <div className="flex items-end justify-end lg:pr-10">
                                <button className="sm:-w-45 flex items-center gap-2 rounded-xl border border-[#ff6b00] px-4 py-2 transition hover:bg-[#ff6b00]/10 md:gap-4 lg:px-8 lg:py-6">
                                    <UserPlus className="h-6 w-6 text-white md:h-8 md:w-8" />

                                    <span className="text-left text-[10px] font-bold uppercase sm:text-[12px] md:text-[14px] lg:text-[16px]">
                                        Create a Free
                                        <br />
                                        Profile Now
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="space-y-3">
                    <div className="container mx-auto my-6 px-4">
                        <div className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-xl bg-[#464646] px-4 py-8">
                            <p className="text-sm font-medium tracking-widest text-white/50 uppercase">ADVERTISING SPACE</p>
                        </div>
                    </div>
                </aside>

                <section className="mx-auto mb-6 max-w-7xl overflow-x-hidden">
                    <div className="rounded-xl bg-[#f9f9f9] p-3 md:p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3">
                            <div className="flex items-center gap-2">
                                <Star size={18} fill="#ff6b00" className="text-[#ff6b00]" />

                                <h2 className="text-[12px] font-extrabold whitespace-nowrap text-[#222] uppercase md:text-sm">
                                    Community Highlights
                                </h2>
                            </div>

                            <button className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-[10px] font-bold whitespace-nowrap text-gray-700 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:text-xs">
                                View All
                                <ArrowRight size={14} className="text-[#ff6b00]" />
                            </button>
                        </div>

                        {/* Rows */}
                        {players.map((player, index) => (
                            <Link key={index} href={route('profile.public.detail', 1)}>
                                <div
                                    key={index}
                                    className="mb-2 grid grid-cols-[40px_1fr_70px_70px] items-center rounded-[12px] bg-white pr-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:grid-cols-[70px_1fr_80px_120px] md:grid-cols-[150px_1fr_120px_170px]"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative">
                                        <img
                                            src={player.image}
                                            alt={player.name}
                                            className="rounded rounded-tl-[12px] rounded-bl-[12px] object-cover"
                                        />

                                        <button className="absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a00]">
                                            <Play size={12} fill="white" className="text-white" />
                                        </button>
                                    </div>

                                    {/* Info */}
                                    <div className="mr-2 px-1 md:px-6">
                                        <h3 className="text-[12px] font-bold whitespace-nowrap text-[#222] md:text-[15px]">{player.name}</h3>

                                        <p className="text-[10px] whitespace-nowrap text-gray-600 md:text-xs">{player.position}</p>

                                        <div className="mt-1 flex items-center gap-2">
                                            <span className="text-sm">
                                                <ReactCountryFlag countryCode={player.code} svg className="m[1em] mt-[2px] mr-1 md:mt-1" />
                                            </span>

                                            <span className="text-[10px] whitespace-nowrap text-gray-700 md:text-xs">{player.country}</span>
                                        </div>
                                    </div>

                                    {/* Height */}
                                    <div className="mr-3 flex items-center justify-center gap-2 text-[12px] whitespace-nowrap text-[#222] md:text-sm">
                                        <Ruler size={14} />
                                        <p>{player.height}</p>
                                    </div>

                                    {/* Age */}
                                    <div className="flex items-center justify-end gap-2 text-[12px] whitespace-nowrap text-[#222] md:ml-4 md:text-sm">
                                        <Clock3 size={14} />
                                        {player.age}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <PublicFooter />
        </div>
    );
}



export default HomeTwo;
