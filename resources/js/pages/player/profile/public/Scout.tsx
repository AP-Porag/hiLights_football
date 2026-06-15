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
    <div className=" bg-white text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
            <PublicNavbar />

            <main className="pt-16">
                {/* ━━━ SECTION 1: HERO ━━━ */}


    <section className="relative w-full bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className=" grid grid-cols-[270px_1fr] sm:grid-cols-[300px_1fr] md:grid-cols-[380px_1fr] lg:grid-cols-2 mb-26 sm:mb-10">
          
          {/* Left Content */}
          <div className="flex px-6 sm:px-10 lg:px-16 pt-16">
            <div className="max-w-xl">
              
              <h1 className="text-[18px] md:text-2xl lg:text-4xl font-extrabold uppercase leading-tight">
                <span className="block text-white">
                  BE THE FIRST
                </span>
 
                <span className="block text-orange-500">
                  TO SEE A RARE TALENT.
                </span>

                 <span className="block text-white">
                   BE THE DISCOVERER
                </span>
                
                <span className="block text-orange-500">
                  OF THE NEXT GREAT FOOTBALL STAR.
                </span>
              </h1>

              <div className="relative">
                <p className="mt-6 text-gray-300 text-[12px] md:text-[14px] lg:text-base leading-relaxed md:pr-8 lg:w-[300px]">
                At HiLights Football, you have the opportunity to discover, follow and contact great talents for free.
              </p>
              <div className="flex absolute top-17 md:top-22 lg:top-25 left-0 z-0 flex-row gap-4 w-[200%]">
                <button className="flex justify-center items-center bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-3 py-2 md:px-6 md:py-4 rounded-md font-semibold uppercase text-[10px] md:text-sm">
                    <UserRoundPlus className="w-6 h-6"/>
                    <span className="pl-2">Create A Free<br/> Profile Now</span>
                </button>

                <button className="border flex justify-center items-center border-gray-600 hover:border-white transition-all duration-300 px-3 py-2 md:px-6 md:py-4 rounded-md font-semibold uppercase text-[10px] md:text-sm">
                    <CirclePlay className="w-6 h-6"/>
                  <span className="pl-2">Learn More</span>
                </button>
              </div>
              </div>
              
            </div>
          </div>

          {/* Right Empty Section */}
          <div className="">
            <img src="/images/img/player-1.png" alt="" 
            className="rounded-full mt-10"
            />
          </div>
        </div>
      </div>
    </section>

  


<section className="max-w-7xl mx-auto bg-black text-white px-6 sm:px-10 lg:px-16 pt-2">

  <div className="bg-[#353535] px-6 py-4 mb-4">
    <p className="text-center text-[12px] sm:text-[14px] md:text-[16px]"> WHY SCOUTS, AGENTS AND CLUBS CHOOSE HILIGHTS FOOTBALL </p>
  </div>


      <div className="">

        {/* Steps */}
        <div className="lg:max-w-5xl pl-1 pr-4 sm:pl-4 sm:pr-27 md:pl-7 md:pr-30  lg:pl-10">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="border-b border-[#1f1f1f] lg:max-w-5x">
              <div
                key={index}
                className="lg:max-w-4xl grid grid-cols-[50px_1fr] md:grid-cols-[70px_1fr] items-center py-5"
              >
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="flex h-9 w-9 md:h-14 md:w-14 items-center justify-center rounded-full border border-gray-500">
                    <Icon className="text-[#ff6b00] w-4 h-4 md:w-6 md:h-6" />
                  </div>
                </div>

               

                {/* Content */}
                <div className=" border-[#1f1f1f] pl-3 md:pl-5">
                  <h3 className="mb-1 text-[#ff6b00] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-extrabold uppercase">
                    {item.title}
                  </h3>

                  <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed text-gray-300">
                    {item.desc}
                  </p>
                </div>
              </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex gap-4 sm:grid sm:grid-cols-[70px_1fr_200px] md:grid-cols-[90px_1fr_250px] lg:grid-cols-[110px_1fr_350px] items-center border-b border-[#1f1f1f] py-6">
          {/* Left Icon */}
          <div className="flex justify-center">
            <div className="flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-full bg-[#ff6b00]">
              <Users className="text-white md:w-12 md:h-12" />
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold leading-tight text-white">
              JOIN THOUSANDS OF SCOUTS, AGENTS AND CLUBS ALREADY ON HILIGHTS FOOTBALL.
            </h3>

            <p className="mt-1 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed text-gray-300">
              Register now and start discovering the future of football.
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-end items-end lg:pr-10">
            <button className="flex items-center gap-2 md:gap-4 rounded-xl sm:-w-45 border border-[#ff6b00] px-4 py-2 lg:px-8 lg:py-6 transition hover:bg-[#ff6b00]/10">
              <UserPlus
                
                className="text-white w-6 h-6 md:w-8 md:h-8"
              />

              <span className="text-left text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-bold uppercase">
                Create a Free
                <br />
                Profile Now
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
         


    <section className="overflow-x-hidden mt-10 mb-6 max-w-7xl mx-auto">
      <div className="w-[90%] mx-auto rounded-xl p-3 md:p-6 bg-[#f9f9f9]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2 ">
            <Star
              size={18}
              fill="#ff6b00"
              className="text-[#ff6b00]"
            />

            <h2 className="whitespace-nowrap text-[12px] md:text-sm font-extrabold uppercase text-[#222]">
              TOP TALENTS YOU CAN DISCOVER TODAY
            </h2>
          </div>

          <button className="flex items-center gap-2 whitespace-nowrap text-[10px] md:text-xs font-bold uppercase text-gray-700 bg-white px-4 py-2 rounded-[10px]">
            View All
            <ArrowRight size={14} className="text-[#ff6b00]" />
          </button>
        </div>

        {/* Rows */}
        <div className="flex justify-between items-center overflow-x-auto pb-4">
        {players.map((player, index) => (
          <div
            key={index}
            className="shadow-[0_4px_12px_rgba(0,0,0,0.12)] rounded-[8px] w-[24%]" 
          >
            {/* Thumbnail */}
            <div className="relative ">
              <img
                src={player.image}
                alt={player.name}
                className="h-[150px] w-full rounded object-cover "
              />

              <button className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a00]">
                <Play
                  size={12}
                  fill="white"
                  className="text-white"
                />
              </button>
            </div>

            {/* Info */}
            <div className="px-4 md:px-6 mr-2">
              <h3 className="whitespace-nowrap text-[12px] mt-2 md:text-[15px] font-bold text-[#222]">
                {player.name}
              </h3>

              <p className="whitespace-nowrap mt-1 text-[10px] md:text-xs text-gray-600">
                {player.position}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm">
                  <ReactCountryFlag
                    countryCode={player.code}
                      svg
                      className="mr-1 -mt-[2px] m[1em]"
                    />
                </span>

                <span className="whitespace-nowrap text-[10px] md:text-xs text-gray-700">
                  {player.country}
                </span>
              </div>
            </div>

            {/* Height */}
            <div className="flex justify-between mt-5 pb-5 px-4">
            <div className="flex gap-2 whitespace-nowrap text-[12px] md:text-sm text-[#222]">
              <Ruler size={14} className="mt-1 ml-2"/>
              <p>{player.height}</p>
            </div>

            {/* Age */}
            <div className="flex md:ml-4 gap-2 whitespace-nowrap text-[12px] md:text-sm text-[#222]">
              <Clock3 size={14} className="mt-[2px]"/>
              {player.age}
            </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>

            </main>

            <PublicFooter/>
        </div>
  )
}



export default Scout;