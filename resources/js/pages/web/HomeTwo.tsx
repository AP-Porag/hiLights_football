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
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43f?w=400",
    },
    {
      name: "Gabriel Gama",
      position: "Attacking Midfielder",
      country: "Brazil",
      code: "BR",
      height: "175 cm",
      age: "21 years",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    },
    {
      name: "Mady Danfaga",
      position: "Striker",
      country: "Guinea",
      code: "GN",
      height: "185 cm",
      age: "22 years",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43f?w=400",
    },
    {
      name: "Vinicius Peruchi",
      position: "Goal Keeper",
      country: "Brazil",
      code: "BR",
      height: "188 cm",
      age: "21 years",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400",
    },
  ];


  return (
    <div className=" bg-white text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
            <PublicNavbar />

            <main className="pt-16">
                {/* ━━━ SECTION 1: HERO ━━━ */}


    <section className="w-full h-[100vh] text-white overflow-hidden"

     style={{
    backgroundImage: "url('/images/img/hero.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex md:grid md:grid-cols-2 mb-26 sm:mb-10 "
        >
          
          {/* Left Content */}
          <div className="flex px-6 sm:px-10 lg:px-16 pt-16">
            <div className="max-w-xl">
              
              <h1 className="text-[18px] md:text-2xl lg:text-4xl font-extrabold uppercase leading-tight">
                <span className="block text-white">
                  Be Seen.
                </span>

                <span className="block text-orange-500">
                  Be Discovered <span className="text-white">!</span>
                </span>
              </h1>

              <p className="mt-6 text-gray-300 text-[10px] sm:text-[12px] md:text-[14px] lg:text-base leading-relaxed max-w-lg">
                The platform that connects players, clubs, agents and
                scouts through videos, statistics and professional
                profiles.
              </p>

              <div className="relative">
              <p className="border-l-2 border-red-500 mt-4 pl-2 text-gray-300 text-[10px] sm:text-[12px] md:text-[14px] lg:text-base leading-relaxed max-w-lg">
                Show your talent to the world and 
                increase your opportunities 
                in football.
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
        <div className="flex top-15 pl-16 flex-row gap-4 w-[200%] mb-10">
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

    </section>

    <aside className="space-y-3 ">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                        Sponsored
                    </p>


                     <div className="bg-[#111] rounded-2xl border border-[#222] p-5 flex flex-col items-center justify-center relative overflow-hidden text-center min-h-[280px]">
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                background:
                                    'radial-gradient(circle at 50% 0%, #FF6B00 0%, transparent 60%)',
                            }}
                        />
                        <span className="text-white/10 font-black text-[100px] leading-none absolute -top-4 select-none">
              ✓
            </span>
                        <div className="relative z-10 flex flex-col items-center">
              <span className="text-white font-black text-2xl tracking-tight">
                NIKE FC
              </span>
                            <div className="bg-[#FF6B00] w-8 h-0.5 mx-auto my-2" />
                            <span className="text-white/70 text-sm">2025 Season Boots</span>
                            <span className="text-white/60 text-xs tracking-widest mt-2">
                MERCURIAL VAPOR
              </span>
                            <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold px-6 py-2 rounded-lg text-sm mt-3 transition-colors">
                                SHOP NOW →
                            </button>
                        </div>
                    </div>
                    
                </aside>


<section className="max-w-7xl mx-auto bg-black text-white px-6 sm:px-10 lg:px-16 pt-10">
      <div className="">
        {/* Heading */}
        <h2 className="mb-6 text-[20px] md:text-3xl font-extrabold uppercase leading-tight">
          A SIMPLE. PROFESSIONAL.{" "}
          <span className="text-[#ff6b00]">EFFECTIVE PLATFORM.</span>
        </h2>

        {/* Steps */}
        <div className="lg:max-w-5xl">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="border-b border-[#1f1f1f] lg:max-w-5x">
              <div
                key={index}
                className="lg:max-w-4xl grid grid-cols-[50px_60px_1fr] md:grid-cols-[70px_90px_1fr] items-center py-5"
              >
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="flex h-9 w-9 md:h-14 md:w-14 items-center justify-center rounded-full border border-gray-500">
                    <Icon className="text-[#ff6b00] w-4 h-4 md:w-6 md:h-6" />
                  </div>
                </div>

                {/* Step */}
                <div>
                  <p className="text-[10px] md:text-sm font-bold text-[#ff6b00]">
                    STEP
                  </p>
                  <h3 className="text-3xl md:text-5xl font-extrabold leading-none text-[#ff6b00]">
                    {item.step}
                  </h3>
                </div>

                {/* Content */}
                <div className="border-l-4 border-[#1f1f1f] pl-3 md:pl-5">
                  <h3 className="mb-1 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-extrabold uppercase">
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
        <div className="flex gap-4 sm:grid sm:grid-cols-[70px_1fr_200px] md:grid-cols-[90px_1fr_400px] lg:grid-cols-[110px_1fr_500px] items-center border-b border-[#1f1f1f] py-6">
          {/* Left Icon */}
          <div className="flex justify-center">
            <div className="flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-full bg-[#ff6b00]">
              <Users className="text-white md:w-12 md:h-12" />
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-bold leading-tight">
              Not part of the{" "}
              <span className="text-[#ff6b00]">
                HiLights Football
              </span>
              <br />
              community yet?
            </h3>

            <p className="mt-3 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed text-gray-300">
              Create your free profile, share your best moments
              and become visible to coaches, clubs and
              recruiters worldwide.
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


    
          <aside className="mb-6 space-y-3">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                        Sponsored
                    </p>


                     <div className="bg-[#111] rounded-2xl border border-[#222] p-5 flex flex-col items-center justify-center relative overflow-hidden text-center min-h-[280px]">
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                background:
                                    'radial-gradient(circle at 50% 0%, #FF6B00 0%, transparent 60%)',
                            }}
                        />
                        <span className="text-white/10 font-black text-[100px] leading-none absolute -top-4 select-none">
              ✓
            </span>
                        <div className="relative z-10 flex flex-col items-center">
              <span className="text-white font-black text-2xl tracking-tight">
                NIKE FC
              </span>
                            <div className="bg-[#FF6B00] w-8 h-0.5 mx-auto my-2" />
                            <span className="text-white/70 text-sm">2025 Season Boots</span>
                            <span className="text-white/60 text-xs tracking-widest mt-2">
                MERCURIAL VAPOR
              </span>
                            <button className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-bold px-6 py-2 rounded-lg text-sm mt-3 transition-colors">
                                SHOP NOW →
                            </button>
                        </div>
                    </div>
                    
                </aside>



    <section className="overflow-x-hidden mb-6">
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
              Community Highlights
            </h2>
          </div>

          <button className="flex items-center gap-2 whitespace-nowrap text-[10px] md:text-xs font-bold uppercase text-gray-700 bg-white px-4 py-2 rounded-[10px]">
            View All
            <ArrowRight size={14} className="text-[#ff6b00]" />
          </button>
        </div>

        {/* Rows */}
        {players.map((player, index) => (
          <div
            key={index}
            className="grid grid-cols-[40px_1fr_70px_70px] sm:grid-cols-[70px_1fr_80px_120px] md:grid-cols-[150px_1fr_120px_170px] items-center p-2 sm:p-4 md:p-6 rounded-[8px] bg-white mb-2"
          >
            {/* Thumbnail */}
            <div className="relative p-1 md:p-2">
              <img
                src={player.image}
                alt={player.name}
                className="h-[60px] w-[90px] rounded object-cover"
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
            <div className="px-1 md:px-2 mr-2">
              <h3 className="whitespace-nowrap text-[12px] md:text-[15px] font-bold text-[#222]">
                {player.name}
              </h3>

              <p className="whitespace-nowrap text-[10px] md:text-xs text-gray-600">
                {player.position}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm">
                  <ReactCountryFlag
                    countryCode={player.code}
                      svg
                      className="mr-1 mt-[2px] md:mt-1 m[1em]"
                    />
                </span>

                <span className="whitespace-nowrap text-[10px] md:text-xs text-gray-700">
                  {player.country}
                </span>
              </div>
            </div>

            {/* Height */}
            <div className="flex mr-3 items-center justify-center gap-2 whitespace-nowrap text-[12px] md:text-sm text-[#222]">
              <Ruler size={14} />
              <p>{player.height}</p>
              
            </div>

            {/* Age */}
            <div className="flex items-center md:ml-4 justify-end gap-2 whitespace-nowrap text-[12px] md:text-sm text-[#222]">
              <Clock3 size={14} />
              {player.age}
            </div>
          </div>
        ))}
      </div>
    </section>

            </main>

            <PublicFooter/>
        </div>
  )
}



export default HomeTwo;