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
  Binoculars,
  ChartColumn,
  Send,
  ArrowRight
 } from "lucide-react";
import { Link } from '@inertiajs/react';

const Scout = () => {


   const steps = [
    {
      icon: Binoculars,
      step: "01",
      title: "EARLY ACCESS TO TALENT",
      desc: (
        <>
          Be the first to discover young players before they become known to the world.{" "}
          {/* <span className="text-[#ff6b00]">data</span>,{" "} */}
        </>
      ),
    },
    {
      icon: Users,
      step: "02",
      title: "ADVANCED SEARCH AND FILTERS",
      desc: (
        <>
          Find players by position, age, country, club, tournament, skills and much more.
        </>
      ),
    },
    {
      icon: ChartColumn,
      step: "03",
      title: "DETAILED PLAYER PROFILES",
      desc: (
        <>
          Watch highlights, check stats, performance and player information all in one place.
        </>
      ),
    },
    {
      icon: Send,
      step: "04",
      title: "CONTACT TALENTS FOR FREE",
      desc: (
        <>
          Get in touch directly with players or their representatives and start real connections.
        </>
      ),
    },
     {
      icon: Star,
      step: "04",
      title: "FOLLOW AND TRACK",
      desc: (
        <>
          Follow your favorite players, receive updates and never miss a new talent.
        </>
      ),
    }
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
      image:"/images/img/p-6.png",
    },
    {
      name: "Mady Danfaga",
      position: "Striker",
      country: "Guinea",
      code: "GN",
      height: "185 cm",
      age: "22 years",
      image:"/images/img/p-4.jpg",
    },
    {
      name: "Vinicius Peruchi",
      position: "Goal Keeper",
      country: "Brazil",
      code: "BR",
      height: "188 cm",
      age: "21 years",
      image:"/images/img/p-5.jpg",
    },
  ];


  return (
      <div className="bg-black text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
          <PublicNavbar />

          <main className="pt-16">
              {/* ━━━ SECTION 1: HERO ━━━ */}

              <section
                  className="relative h-[100vh] w-full overflow-hidden bg-black text-white"
                  style={{
                      backgroundImage: "url('/images/img/scout_hero.jpeg')",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                  }}
              >
                  <div className="mx-auto max-w-7xl">
                      <div className="mb-26 grid grid-cols-[270px_1fr] sm:mb-10 sm:grid-cols-[300px_1fr] md:grid-cols-[380px_1fr] lg:grid-cols-2">
                          {/* Left Content */}
                          <div className="flex px-6 pt-16 sm:px-10 lg:px-16">
                              <div className="max-w-xl">
                                  <h1 className="text-[18px] leading-tight font-extrabold uppercase md:text-2xl lg:text-4xl">
                                      <span className="block text-white">BE THE FIRST</span>

                                      <span className="block text-orange-500">TO SEE A RARE TALENT.</span>

                                      <span className="block text-white">BE THE DISCOVERER</span>

                                      <span className="block text-orange-500">OF THE NEXT GREAT FOOTBALL STAR.</span>
                                  </h1>

                                  <div className="relative">
                                      <p className="mt-6 text-[12px] leading-relaxed text-gray-300 md:pr-8 md:text-[14px] lg:w-[300px] lg:text-base">
                                          At HiLights Football, you have the opportunity to discover, follow and contact great talents for free.
                                      </p>
                                      <div className="absolute top-17 left-0 z-0 flex w-[200%] flex-row gap-4 md:top-22 lg:top-25">
                                          <button className="flex items-center justify-center rounded-md bg-orange-500 px-3 py-2 text-[10px] font-semibold uppercase transition-all duration-300 hover:bg-orange-600 md:px-6 md:py-4 md:text-sm">
                                              <UserRoundPlus className="h-6 w-6" />
                                              <span className="pl-2">
                                                  Create A Free
                                                  <br /> Profile Now
                                              </span>
                                          </button>

                                          <button className="flex items-center justify-center rounded-md border border-gray-600 bg-black px-3 py-2 text-[10px] font-semibold uppercase transition-all duration-300 hover:border-white md:px-6 md:py-4 md:text-sm">
                                              <CirclePlay className="h-6 w-6" />
                                              <span className="pl-2">Learn More</span>
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Right Empty Section */}
                      </div>
                  </div>
              </section>

              <section className="mx-auto max-w-7xl bg-black px-6 pt-2 text-white sm:px-10 lg:px-16">
                  <div className="mb-4 bg-[#353535] px-6 py-4">
                      <p className="text-center text-[12px] sm:text-[14px] md:text-[16px]"> WHY SCOUTS, AGENTS AND CLUBS CHOOSE HILIGHTS FOOTBALL </p>
                  </div>

                  <div className="">
                      {/* Steps */}
                      <div className="pr-4 pl-1 sm:pr-27 sm:pl-4 md:pr-30 md:pl-7 lg:max-w-5xl lg:pl-10">
                          {steps.map((item, index) => {
                              const Icon = item.icon;

                              return (
                                  <div className="lg:max-w-5x border-b border-[#1f1f1f]">
                                      <div key={index} className="grid grid-cols-[50px_1fr] items-center py-5 md:grid-cols-[70px_1fr] lg:max-w-4xl">
                                          {/* Icon */}
                                          <div className="flex justify-center">
                                              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 md:h-14 md:w-14">
                                                  <Icon className="h-4 w-4 text-[#ff6b00] md:h-6 md:w-6" />
                                              </div>
                                          </div>

                                          {/* Content */}
                                          <div className="border-[#1f1f1f] pl-3 md:pl-5">
                                              <h3 className="mb-1 text-[14px] font-extrabold text-[#ff6b00] uppercase sm:text-[16px] md:text-[18px] lg:text-[22px]">
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
                      <div className="flex items-center gap-4 border-b border-[#1f1f1f] py-6 sm:grid sm:grid-cols-[70px_1fr_200px] md:grid-cols-[90px_1fr_250px] lg:grid-cols-[110px_1fr_350px]">
                          {/* Left Icon */}
                          <div className="flex justify-center">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff6b00] md:h-20 md:w-20">
                                  <Users className="text-white md:h-12 md:w-12" />
                              </div>
                          </div>

                          {/* Text */}
                          <div>
                              <h3 className="text-[13px] leading-tight font-bold text-white sm:text-[14px] md:text-[16px] lg:text-[18px]">
                                  JOIN THOUSANDS OF SCOUTS, AGENTS AND CLUBS ALREADY ON HILIGHTS FOOTBALL.
                              </h3>

                              <p className="mt-1 text-[10px] leading-relaxed text-gray-300 sm:text-[12px] md:text-[14px] lg:text-[16px]">
                                  Register now and start discovering the future of football.
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

              <section className="mx-auto mt-10 mb-6 max-w-7xl overflow-x-hidden">
                  <div className="mx-auto w-[90%] rounded-xl bg-[#f9f9f9] p-3 md:p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-3">
                          <div className="flex items-center gap-2">
                              <Star size={18} fill="#ff6b00" className="text-[#ff6b00]" />

                              <h2 className="text-[12px] font-extrabold whitespace-nowrap text-[#222] uppercase md:text-sm">
                                  TOP TALENTS YOU CAN DISCOVER TODAY
                              </h2>
                          </div>

                          <button className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-[10px] font-bold whitespace-nowrap text-gray-700 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.06)] md:text-xs">
                              View All
                              <ArrowRight size={14} className="text-[#ff6b00]" />
                          </button>
                      </div>

                      {/* Rows */}
                      <div className="flex items-center justify-between overflow-x-auto pb-4">
                          {players.map((player, index) => (
                              <div key={index} className="w-[24%] rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                                  <Link key={index} href={route('profile.public.detail', 1)}>
                                      {/* Thumbnail */}
                                      <div className="relative">
                                          <img src={player.image} alt={player.name} className="h-[150px] w-full rounded object-cover" />

                                          <button className="absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a00]">
                                              <Play size={12} fill="white" className="text-white" />
                                          </button>
                                      </div>

                                      {/* Info */}
                                      <div className="mr-2 px-4 md:px-6">
                                          <h3 className="mt-2 text-[12px] font-bold whitespace-nowrap text-[#222] md:text-[15px]">{player.name}</h3>

                                          <p className="mt-1 text-[10px] whitespace-nowrap text-gray-600 md:text-xs">{player.position}</p>

                                          <div className="mt-2 flex items-center gap-2">
                                              <span className="text-sm">
                                                  <ReactCountryFlag countryCode={player.code} svg className="m[1em] -mt-[2px] mr-1" />
                                              </span>

                                              <span className="text-[10px] whitespace-nowrap text-gray-700 md:text-xs">{player.country}</span>
                                          </div>
                                      </div>

                                      {/* Height */}
                                      <div className="mt-5 flex flex-col md:flex-row md:justify-between px-4 pb-5">
                                          <div className="flex gap-2 text-[12px] whitespace-nowrap text-[#222] md:text-sm">
                                              <Ruler size={14} className="mt-1 md:ml-2" />
                                              <p>{player.height}</p>
                                          </div>

                                          {/* Age */}
                                          <div className="flex gap-2 text-[12px] whitespace-nowrap text-[#222] md:ml-4 md:text-sm">
                                              <Clock3 size={14} className="mt-[2px]" />
                                              {player.age}
                                          </div>
                                      </div>
                                  </Link>
                              </div>
                          ))}
                      </div>
                  </div>
              </section>
          </main>

          <PublicFooter />
      </div>
  );
}



export default Scout;
