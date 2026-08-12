import React from 'react'
import { Link } from '@inertiajs/react';
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Instagram, Facebook, Youtube, Music2 } from 'lucide-react';

export const PublicFooter = () => {
    return (
        <>
            <section className="">
                <div className="bg-black pl-6 text-white">
                    <div className="mx-auto max-w-7xl py-4">
                        <div className="grid grid-cols-4 gap-4">
                            {/* Logo & Description */}
                            <div className="min-w-0">
                                <img src="/images/logo/final_logo.png" className="h-8 w-auto sm:h-10 lg:h-14 md:mt-2 lg:mt-3" alt="HiLights Football" />

                                <p className="mt-5 text-[10px] leading-[1.5] break-words sm:text-[12px] md:text-[16px]">
                                    The platform dedicated <br className="md:hidden" /> to promoting and discovering <br className="md:hidden" /> football
                                    talent.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div className="min-w-0 sm:pl-8 md:pl-10 lg:pl-14">
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
            </section>

            {/* ─── ফ্লোটিং হোয়াটসঅ্যাপ আইকন (নিচ-বাম কোণে) ─── */}
            <a
                href="https://wa.me/8801234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF0000] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl md:h-16 md:w-16"
                aria-label="Contact on WhatsApp"
            >
                <FaWhatsapp className="h-8 w-8 text-white md:h-9 md:w-9" />
            </a>
        </>
    );
};
