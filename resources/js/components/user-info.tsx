// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useInitials } from '@/hooks/use-initials';
// import { type User } from '@/types';

// export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
//     const getInitials = useInitials();

//     return (
//         <>
//             <Avatar className="h-8 w-8 overflow-hidden rounded-full">
//                 <AvatarImage src={user.avatar} alt={user.name} />
//                 <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
//                     {getInitials(user.name)}
//                 </AvatarFallback>
//             </Avatar>
//             <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-medium">{user.name}</span>
//                 {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
//             </div>
//         </>
//     );
// }

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user?: User | null;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();


    // if (!user) return null;
    if (!user){
        user = {
            id: 1,
            name: 'Luna Parker',
            email: 'luna.parker@app.com',
            avatar: 'https://i.pravatar.cc/150?img=28',
            email_verified_at: '2026-05-17T10:00:00.000000Z',
            created_at: '2026-05-01T08:30:00.000000Z',
            updated_at: '2026-05-17T10:00:00.000000Z',
        };
    }

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar ?? ''} alt={user.name ?? 'User'} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name ?? 'U')}
                </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>

                {showEmail && user.email && (
                    <span className="text-muted-foreground truncate text-xs">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
