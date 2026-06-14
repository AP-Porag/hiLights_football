import React from 'react'
import { Link } from '@inertiajs/react';
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
export const PublicFooter = () => {
  return (
    <section className="py-12 px-6">

        <div className="bg-black text-white">
    <div className="max-w-7xl mx-auto py-4">
        <div className="grid grid-cols-4 gap-4">

            {/* Logo & Description */}
            <div className="min-w-0">
                <img
                   src="/images/logo/hilights_logo_dark_200.png"
                   className="h-10 w-auto"
                   alt="HiLights Football"
                />

                <p className="text-[10px] sm:text-[12px] md:text-[14px] leading-[1.5] break-words">
                    The platform dedicated to promoting and discovering
                    football talent.
                </p>
            </div>

            {/* Quick Links */}
            <div className="min-w-0">
                <h3 className="text-[#FF6A00] font-bold uppercase mb-3 text-[12px] md:text-[14px] lg:text-[16px]">
                    Quick Links
                </h3>

                <ul className="space-y-1 text-[10px] sm:text-[12px] md:text-[14px] ">
                    <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                    <li><Link href="/#" className="hover:text-white">How It Works</Link></li>
                    <li><Link href="/#" className="hover:text-white">Plans</Link></li>
                    <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                    <li><Link href="/#" className="hover:text-white">Terms of Use</Link></li>
                    <li><Link href="/#" className="hover:text-white">Privacy Policy</Link></li>
                </ul>
            </div>

            {/* Social Links */}
            <div className="min-w-0">
                <h3 className="text-[#FF6A00] font-bold uppercase mb-3 text-[12px] md:text-[14px] lg:text-[16px]">
                    Follow Us
                </h3>

                 <div className="flex flex-wrap gap-3">
                    <a
                        href="#"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden"
                    >
                        <img
                            src="/images/img/Insta.png"
                            alt="Instagram"
                            className="w-full h-full object-cover"
                        />
                    </a>

                    <a
                        href="#"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden"
                    >
                        <img
                            src="/images/img/Facebook.png"
                            alt="Facebook"
                            className="w-full h-full object-cover"
                        />
                    </a>

                    <a
                        href="#"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden"
                    >
                        <img
                            src="/images/img/Youtube.png"
                            alt="YouTube"
                            className="w-full h-full object-cover"
                        />
                    </a>

                    <a
                        href="#"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden"
                    >
                        <img
                            src="/images/img/Tiktok.png"
                            alt="TikTok"
                            className="w-full h-full object-cover"
                        />
                    </a>
                </div>
            </div>
              {/* Football Player */}
            <div className="flex justify-start items-center">
                <img
                    src="/images/img/dummy-player.png"
                    alt="Football Player"
                    className="w-full max-w-[140px] md:max-w-[180px] h-auto object-contain"
                />
            </div>
            </div>

        </div>
    </div>

    {/* Copyright */}
    <div className="border-t border-[#2B2B2B]">
        <div className="max-w-7xl mx-auto px-3 py-3 text-center">
            <p className="text-[#BFBFBF] text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] break-words">
                © 2024 HiLights Football. All rights reserved.
            </p>
        </div>
    </div>
    <div>
</div>


                    {/* <div className="max-w-[1200px] mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="col-span-2 md:col-span-1">
                                <img
                                    src="/images/logo/hilights_logo_dark_200.png"
                                    className="h-10 w-auto"
                                    alt="HiLights Football"
                                />
                                <p className="text-white/60 text-sm mt-4">
                                    The platform where football talent meets opportunity.
                                </p>
                            </div>

                            <div>
                                <div className="text-white font-bold text-sm mb-3">Platform</div>
                                <ul className="space-y-2 text-white/60 text-sm">
                                    <li><Link href="/players" className="hover:text-white">Players</Link></li>
                                    <li><Link href="/scouts" className="hover:text-white">Scouts</Link></li>
                                    <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                                </ul>
                            </div>

                            <div>
                                <div className="text-white font-bold text-sm mb-3">Company</div>
                                <ul className="space-y-2 text-white/60 text-sm">
                                    <li><Link href="/about" className="hover:text-white">About</Link></li>
                                    <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                                    <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                                </ul>
                            </div>

                            <div>
                                <div className="text-white font-bold text-sm mb-3">Legal</div>
                                <ul className="space-y-2 text-white/60 text-sm">
                                    <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                                    <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                                    <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                            <div className="text-white/40 text-xs">
                                © 2026 HiLights Football. All rights reserved.
                            </div>
                            <div className="text-white/40 text-xs font-mono">
                                v2.4.1
                            </div>
                        </div>
                    </div> */}
                </section>
  )
}
