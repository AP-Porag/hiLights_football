import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

import { usePage } from '@inertiajs/react';
import type { User } from '@/types';

interface PageProps {
    auth: {
        user: User | null;
    };
}

export function UserInfo({ showEmail = false }: { showEmail?: boolean }) {
    const getInitials = useInitials();

    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    console.log(user);

    if (!user) return null;

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar ?? ''} alt={user.name} />
                <AvatarFallback>
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                    {user.name}
                </span>

                {showEmail && (
                    <span className="text-muted-foreground truncate text-xs">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
