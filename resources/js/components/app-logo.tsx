// import AppLogoIcon from './app-logo-icon';

// export default function AppLogo() {
//     return (
//         <>
//             <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
//                 <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
//             </div>
//             <div className="ml-1 grid flex-1 text-left text-sm">
//                 <span className="mb-0.5 truncate leading-none font-semibold">Laravel Starter Kit</span>
//             </div>
//         </>
//     );
// }

import { adminTheme } from "@/lib/adminTheme";

export default function AppLogo() {
    return (
        <>
            <div className="flex items-center gap-2">
                {/* First Logo (icon) */}
                <div className="flex aspect-square size-8 items-center justify-center rounded-md">
                    <img src="/images/logo/hilights_logo_transparent_200.png" alt="Highlights" className="size-8 object-contain" />

                </div>
                {/* Second Logo (text/logo image) */}
                {/* <img src="/images/logo/text.png" alt="TRPMS Logo" className="h-6 object-contain" /> */}
                <div className="hidden items-end gap-0.5 leading-none sm:flex" bis_skin_checked="1"><span style={{color: adminTheme.colors.text.sidebar}} className="text-xl font-black tracking-tight">Hi</span><span className="text-xl font-black tracking-tight text-[#FF6B00] italic">Lights</span><span className="mb-0.5 ml-1 self-end text-[10px] font-bold tracking-[0.12em] text-[#94A3B8]">FOOTBALL</span></div>
            </div>
        </>
    );
}
