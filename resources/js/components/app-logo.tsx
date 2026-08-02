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

export default function AppLogo() {
    return (
        <>
            <div className="flex items-center gap-2">
                {/* First Logo (icon) */}
                <div className="flex aspect-square size-15 items-center justify-center rounded-md">
                    <img src="/images/logo/final_logo_icon.png" alt="Highlights" className="size-15 object-contain" />

                </div>

                {/* Second Logo (text/logo image) */}
                {/* <img src="/images/logo/text.png" alt="TRPMS Logo" className="h-6 object-contain" /> */}
                <div className="hidden items-end gap-0.5 leading-none sm:flex size-15" bis_skin_checked="1">
                    <img src="/images/logo/final_logo_text.png" alt="Highlights" className="size-15 object-contain" />
                </div>
            </div>
        </>
    );
}
