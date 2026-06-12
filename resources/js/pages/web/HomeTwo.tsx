import React from 'react'
import PublicNavbar from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/PublicFooter';
import { CircleUserRound, UserRoundPlus } from "lucide-react";

const HomeTwo = () => {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] dark:bg-[#0D0D0D] dark:text-[#F5F5F5]">
            <PublicNavbar />

            <main className="pt-16">
                {/* ━━━ SECTION 1: HERO ━━━ */}


    <section className="relative bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto min-h-screen">
        <div className="flex md:grid md:grid-cols-2 min-h-screen">
          
          {/* Left Content */}
          <div className="flex items-center px-6 sm:px-10 lg:px-16 py-16">
            <div className="max-w-xl">
              
              <h1 className="text-[18px] md:text-2xl lg:text-4xl font-extrabold uppercase leading-tight">
                <span className="block text-white">
                  Be Seen.
                </span>

                <span className="block text-orange-500">
                  Be Discovered <span className="text-white">!</span>
                </span>
              </h1>

              <p className="mt-6 text-gray-300 text-[14px] md:text-base leading-relaxed max-w-lg">
                The platform that connects players, clubs, agents and
                scouts through videos, statistics and professional
                profiles.
              </p>

              <p className="border-l-2 border-red-500 mt-4 pl-2 text-gray-300 text-[14px] md:text-base leading-relaxed max-w-lg">
                Show your talent to the world and 
                increase your opportunities 
                in football.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className=" flex bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-6 py-4 rounded-md font-semibold uppercase text-sm">
                    <UserRoundPlus className="w-4 h-4"/>
                    <span className="pl-2">Create A Free<br/> Profile Now</span>
                </button>

                <button className="border flex border-gray-600 hover:border-white transition-all duration-300 px-6 py-4 rounded-md font-semibold uppercase text-sm">
                    <CircleUserRound className="w-4 h-4"/>
                  <span className="pl-2">Learn More</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Empty Section */}
          <div className="flex justify-center items-center">
            <img src="/images/img/player-1.png" alt="" 
            className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>


            </main>

            <PublicFooter/>
        </div>
  )
}



export default HomeTwo;