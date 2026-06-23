import React from 'react'
import { Link } from '@inertiajs/react';
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { Instagram, Facebook, Youtube, Music2 } from 'lucide-react';
export const PublicFooter = () => {
    return (
        <section className="">
            <div className="bg-black pl-6 text-white">
                <div className="mx-auto max-w-7xl py-4">
                    <div className="grid grid-cols-4 gap-4">
                        {/* Logo & Description */}
                        <div className="min-w-0">
                            <img src="/images/logo/logo_version_2.png" className="h-20 w-auto" alt="HiLights Football" />

                            <p className="mt-5 text-[10px] leading-[1.5] break-words sm:text-[12px] md:text-[16px]">
                                The platform dedicated <br className="md:hidden" /> to promoting and discovering <br className="md:hidden" /> football
                                talent.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="min-w-0">
                            <h3 className="mb-3 text-[12px] font-bold text-[#FF6A00] uppercase md:text-[14px] lg:text-[16px]">Quick Links</h3>

                            <ul className="space-y-1 text-[10px] sm:text-[12px] md:text-[14px]">
                                <li>
                                    <Link href="/about" className="flex items-center gap-2 hover:text-white">
                                        <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#" className="flex items-center gap-2 hover:text-white">
                                        <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
                                        How It Works
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#" className="flex items-center gap-2 hover:text-white">
                                        <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
                                        Plans
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="flex items-center gap-2 hover:text-white">
                                        <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#" className="flex items-center gap-2 hover:text-white">
                                        <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
                                        Terms of Use
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#" className="flex items-center gap-2 hover:text-white">
                                        <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Social Links */}
                        {/* <div className="min-w-0">
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
                        </div> */}

                        <div className="min-w-0">
                            <h3 className="mb-3 text-[12px] font-bold text-[#FF6A00] uppercase md:text-[14px] lg:text-[16px]">Follow Us</h3>

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-lg md:h-12 md:w-12"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                                </a>

                                <a
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1877F2] text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-lg md:h-12 md:w-12"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-5 w-5 md:h-6 md:w-6" />
                                </a>

                                <a
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF0000] text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-lg md:h-12 md:w-12"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="h-5 w-5 md:h-6 md:w-6" />
                                </a>

                                <a
                                    href="#"
                                    className="flex h-10 w-10 border-2 border-[#221f27] items-center justify-center rounded-lg bg-[#010101] text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-lg md:h-12 md:w-12"
                                    aria-label="TikTok"
                                >
                                    <Music2 className="h-5 w-5 md:h-6 md:w-6" />
                                </a>
                            </div>
                        </div>
                        {/* Football Player */}
                        <div className="flex items-center justify-start">
                            <img
                                src="/images/img/dummy-player.png"
                                alt="Football Player"
                                className="h-auto w-full max-w-[140px] object-contain md:max-w-[180px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-[#2B2B2B]">
                <div className="mx-auto max-w-7xl px-3 py-3 text-center">
                    <p className="text-[12px] break-words text-[#BFBFBF] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                        © 2024 HiLights Football. All rights reserved.
                    </p>
                </div>
            </div>
            <div></div>

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
    );
}
