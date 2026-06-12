import React from 'react'
import { Link } from '@inertiajs/react';
export const PublicFooter = () => {
  return (
    <section className="bg-[#0F172A] py-12 px-6">
                    <div className="max-w-[1200px] mx-auto">
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
                    </div>
                </section>
  )
}
