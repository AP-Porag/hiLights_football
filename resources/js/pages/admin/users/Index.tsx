import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
// import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Download,
    UserPlus,
    Search,
    MoreHorizontal,
    Eye,
    Edit,
    Ban,
    Trash2,
    AlertTriangle,
} from 'lucide-react';

// TODO: Replace with usePage().props — { users, total, filters }
type Role = 'Player' | 'Scout' | 'Agent' | 'Club' | 'Admin';
type Subscription = 'Free' | 'Premium' | 'Agent';
type Status = 'Active' | 'Suspended' | 'Pending';

interface User {
    id: number;
    name: string;
    email: string;
    country: string;
    countryFlag: string;
    role: Role;
    subscription: Subscription;
    status: Status;
    joined: string;
}

const MOCK_USERS: User[] = [
    { id: 1,  name: 'Lucas Oliveira',     email: 'lucas.oliveira@hilights.com',  country: 'Brazil',       countryFlag: '🇧🇷', role: 'Player', subscription: 'Premium', status: 'Active',    joined: '2024-03-12' },
    { id: 2,  name: 'James Whitfield',    email: 'j.whitfield@scoutpro.co.uk',   country: 'England',      countryFlag: '🇬🇧', role: 'Scout',  subscription: 'Premium', status: 'Active',    joined: '2024-02-08' },
    { id: 3,  name: 'Mateo Rodríguez',    email: 'mateo.r@playersfc.es',         country: 'Spain',        countryFlag: '🇪🇸', role: 'Agent',  subscription: 'Agent',   status: 'Active',    joined: '2024-01-22' },
    { id: 4,  name: 'FC Santos Academy',  email: 'admin@santosfc.com.br',        country: 'Brazil',       countryFlag: '🇧🇷', role: 'Club',   subscription: 'Premium', status: 'Active',    joined: '2023-11-30' },
    { id: 5,  name: 'Sophie Laurent',     email: 'sophie.laurent@hilights.com',  country: 'France',       countryFlag: '🇫🇷', role: 'Admin',  subscription: 'Premium', status: 'Active',    joined: '2023-08-14' },
    { id: 6,  name: 'Diego Fernández',    email: 'diego.fer@gmail.com',          country: 'Argentina',    countryFlag: '🇦🇷', role: 'Player', subscription: 'Free',    status: 'Active',    joined: '2024-04-18' },
    { id: 7,  name: 'Henrik Andersen',    email: 'henrik.a@nordicscout.dk',      country: 'Denmark',      countryFlag: '🇩🇰', role: 'Scout',  subscription: 'Premium', status: 'Active',    joined: '2024-03-05' },
    { id: 8,  name: 'Akira Tanaka',       email: 'akira.tanaka@yahoo.co.jp',     country: 'Japan',        countryFlag: '🇯🇵', role: 'Player', subscription: 'Free',    status: 'Pending',   joined: '2024-05-01' },
    { id: 9,  name: 'Vasco da Gama U23',  email: 'youth@vasco.com.br',           country: 'Brazil',       countryFlag: '🇧🇷', role: 'Club',   subscription: 'Premium', status: 'Active',    joined: '2024-01-10' },
    { id: 10, name: 'Marco Bellini',      email: 'marco.bellini@hotmail.it',     country: 'Italy',        countryFlag: '🇮🇹', role: 'Agent',  subscription: 'Agent',   status: 'Active',    joined: '2023-12-19' },
    { id: 11, name: 'Kwame Asante',       email: 'kwame.asante@ghana-fa.gh',     country: 'Ghana',        countryFlag: '🇬🇭', role: 'Player', subscription: 'Premium', status: 'Active',    joined: '2024-02-14' },
    { id: 12, name: 'Olivia Bennett',     email: 'olivia.b@premierscout.co.uk',  country: 'England',      countryFlag: '🇬🇧', role: 'Scout',  subscription: 'Free',    status: 'Active',    joined: '2024-04-22' },
    { id: 13, name: 'Pablo Morales',      email: 'pablo.morales@gmail.com',      country: 'Mexico',       countryFlag: '🇲🇽', role: 'Player', subscription: 'Free',    status: 'Suspended', joined: '2024-03-28' },
    { id: 14, name: 'Hans Müller',        email: 'hans.muller@bundesagent.de',   country: 'Germany',      countryFlag: '🇩🇪', role: 'Agent',  subscription: 'Agent',   status: 'Active',    joined: '2023-10-07' },
    { id: 15, name: 'Cruzeiro Esporte',   email: 'recruitment@cruzeiro.com.br',  country: 'Brazil',       countryFlag: '🇧🇷', role: 'Club',   subscription: 'Premium', status: 'Active',    joined: '2024-01-15' },
    { id: 16, name: 'Yusuf Demir',        email: 'yusuf.demir@outlook.com',      country: 'Turkey',       countryFlag: '🇹🇷', role: 'Player', subscription: 'Premium', status: 'Active',    joined: '2024-02-26' },
    { id: 17, name: 'Charlotte Davies',   email: 'c.davies@hilights.com',        country: 'England',      countryFlag: '🇬🇧', role: 'Admin',  subscription: 'Premium', status: 'Active',    joined: '2023-09-03' },
    { id: 18, name: 'Rafael Costa',       email: 'rafael.costa@protonmail.com',  country: 'Portugal',     countryFlag: '🇵🇹', role: 'Scout',  subscription: 'Premium', status: 'Active',    joined: '2024-03-19' },
    { id: 19, name: 'Ibrahim Sow',        email: 'ibrahim.sow@gmail.com',        country: 'Senegal',      countryFlag: '🇸🇳', role: 'Player', subscription: 'Free',    status: 'Pending',   joined: '2024-05-09' },
    { id: 20, name: 'Liam O\'Sullivan',   email: 'liam.osullivan@irisha.ie',     country: 'Ireland',      countryFlag: '🇮🇪', role: 'Agent',  subscription: 'Agent',   status: 'Active',    joined: '2024-01-04' },
];

const getInitials = (name: string) =>
    name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

const roleBadgeClasses: Record<Role, string> = {
    Player: 'border border-blue-300 text-blue-700 bg-blue-50',
    Scout:  'border border-purple-300 text-purple-700 bg-purple-50',
    Agent:  'border border-indigo-300 text-indigo-700 bg-indigo-50',
    Club:   'border border-green-300 text-green-700 bg-green-50',
    Admin:  'border border-[#FF6B00] text-[#CC5500] bg-[#FFF3EB]',
};

const subBadgeClasses: Record<Subscription, string> = {
    Free:    'border border-slate-300 text-slate-700 bg-white',
    Premium: 'bg-[#FF6B00] text-white border border-[#FF6B00]',
    Agent:   'bg-amber-500 text-white border border-amber-500',
};

const statusClasses: Record<Status, string> = {
    Active:    'bg-green-600 text-white',
    Suspended: 'bg-red-600 text-white',
    Pending:   'bg-yellow-500 text-white',
};

export default function UsersIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

    const handleDelete = () => {
        // TODO: router.delete(route('admin.users.destroy', deleteTarget.id))
        setDeleteTarget(null);
    };

    return (
        <AppLayout>
            {/* TOP ACTIONS BAR */}
            <div className="bg-white border-b border-[#E2E8F0] -mx-8 -mt-8 px-8 py-4 mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-1">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                        <Input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9 bg-white border-[#E2E8F0] text-sm focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-100"
                        />
                    </div>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                        <TabsList className="bg-[#F8FAFC] border border-[#E2E8F0] h-9 p-0.5">
                            <TabsTrigger
                                value="all"
                                className="text-xs px-3 h-8 data-[state=active]:bg-white data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-sm font-medium"
                            >
                                All
                            </TabsTrigger>
                            <TabsTrigger
                                value="players"
                                className="text-xs px-3 h-8 data-[state=active]:bg-white data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-sm font-medium"
                            >
                                Players
                            </TabsTrigger>
                            <TabsTrigger
                                value="scouts"
                                className="text-xs px-3 h-8 data-[state=active]:bg-white data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-sm font-medium"
                            >
                                Scouts
                            </TabsTrigger>
                            <TabsTrigger
                                value="agents"
                                className="text-xs px-3 h-8 data-[state=active]:bg-white data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-sm font-medium"
                            >
                                Agents
                            </TabsTrigger>
                            <TabsTrigger
                                value="clubs"
                                className="text-xs px-3 h-8 data-[state=active]:bg-white data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-sm font-medium"
                            >
                                Clubs
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="h-9 border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] font-medium text-sm"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                    </Button>
                    <Link href="/admin/users/create">
                        <Button className="h-9 bg-[#FF6B00] text-white hover:bg-[#CC5500] font-medium text-sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add User
                        </Button>
                    </Link>
                </div>
            </div>

            {/* RESULTS COUNT */}
            <p className="text-sm text-[#64748B] mb-4 font-sans">
                Showing <span className="font-semibold text-[#0F172A]">1–20</span> of{' '}
                <span className="font-semibold text-[#0F172A]">347</span> users
            </p>

            {/* USERS TABLE CARD */}
            <Card className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-[#F8FAFC]">
                            <TableRow className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                                <TableHead className="text-xs uppercase text-[#64748B] tracking-wide font-semibold w-12 py-4 px-6">
                                    #
                                </TableHead>
                                <TableHead className="text-xs uppercase text-[#64748B] tracking-wide font-semibold py-4">
                                    User
                                </TableHead>
                                <TableHead className="text-xs uppercase text-[#64748B] tracking-wide font-semibold py-4 hidden md:table-cell">
                                    Email
                                </TableHead>
                                <TableHead className="text-xs uppercase text-[#64748B] tracking-wide font-semibold py-4">
                                    Role
                                </TableHead>
                                <TableHead className="text-xs uppercase text-[#64748B] tracking-wide font-semibold py-4 hidden lg:table-cell">
                                    Subscription
                                </TableHead>
                                <TableHead className="text-xs uppercase text-[#64748B] tracking-wide font-semibold py-4 hidden sm:table-cell">
                                    Status
                                </TableHead>
                                <TableHead className="text-xs uppercase text-[#64748B] tracking-wide font-semibold py-4 hidden xl:table-cell">
                                    Joined
                                </TableHead>
                                <TableHead className="text-xs uppercase text-[#64748B] tracking-wide font-semibold py-4 text-right pr-6">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_USERS.map((user, idx) => (
                                <TableRow
                                    key={user.id}
                                    className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
                                >
                                    <TableCell className="text-sm text-[#94A3B8] font-mono px-6 py-4">
                                        {String(idx + 1).padStart(2, '0')}
                                    </TableCell>

                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback className="bg-orange-50 text-[#FF6B00] text-xs font-semibold">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0">
                                                <div className="font-semibold text-[#0F172A] text-sm truncate">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                                                    <span>{user.countryFlag}</span>
                                                    <span>{user.country}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-sm text-[#64748B] py-4 hidden md:table-cell">
                                        {user.email}
                                    </TableCell>

                                    <TableCell className="py-4">
                                        <Badge
                                            variant="outline"
                                            className={`${roleBadgeClasses[user.role]} text-xs font-medium px-2.5 py-0.5 rounded-md`}
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="py-4 hidden lg:table-cell">
                                        <Badge
                                            className={`${subBadgeClasses[user.subscription]} text-xs font-medium px-2.5 py-0.5 rounded-md`}
                                        >
                                            {user.subscription}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="py-4 hidden sm:table-cell">
                                        <Badge
                                            className={`${statusClasses[user.status]} text-xs font-medium px-2.5 py-0.5 rounded-md`}
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="py-4 hidden xl:table-cell">
                    <span className="text-sm text-[#94A3B8] font-mono">
                      {user.joined}
                    </span>
                                    </TableCell>

                                    <TableCell className="py-4 pr-6 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-[#F8FAFC] text-[#64748B]"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="bg-white border border-[#E2E8F0] rounded-xl shadow-lg w-48"
                                            >
                                                <Link href={`/admin/users/${user.id}`}>
                                                    <DropdownMenuItem className="text-sm text-[#0F172A] cursor-pointer hover:bg-[#F8FAFC] focus:bg-[#F8FAFC] py-2">
                                                        <Eye className="h-4 w-4 mr-2 text-[#64748B]" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href={`/admin/users/${user.id}/edit`}>
                                                    <DropdownMenuItem className="text-sm text-[#0F172A] cursor-pointer hover:bg-[#F8FAFC] focus:bg-[#F8FAFC] py-2">
                                                        <Edit className="h-4 w-4 mr-2 text-[#64748B]" />
                                                        Edit User
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator className="bg-[#E2E8F0]" />
                                                <DropdownMenuItem className="text-sm text-amber-600 cursor-pointer hover:bg-amber-50 focus:bg-amber-50 py-2">
                                                    <Ban className="h-4 w-4 mr-2" />
                                                    Suspend Account
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => setDeleteTarget(user)}
                                                    className="text-sm text-red-600 cursor-pointer hover:bg-red-50 focus:bg-red-50 py-2"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete User
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* PAGINATION */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-sm text-[#64748B]">
                    Page <span className="font-semibold text-[#0F172A]">1</span> of{' '}
                    <span className="font-semibold text-[#0F172A]">18</span>
                </p>
                <Pagination className="mx-0 justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                className="border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#FF6B00] text-sm h-9"
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                isActive
                                className="bg-[#FF6B00] text-white border-[#FF6B00] hover:bg-[#CC5500] hover:text-white text-sm h-9 w-9"
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                className="border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#FF6B00] text-sm h-9 w-9"
                            >
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                className="border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#FF6B00] text-sm h-9 w-9"
                            >
                                3
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis className="text-[#94A3B8]" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                className="border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#FF6B00] text-sm h-9 w-9"
                            >
                                18
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                className="border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#FF6B00] text-sm h-9"
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* DELETE CONFIRMATION DIALOG */}
            <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent className="bg-white rounded-2xl p-6 border border-[#E2E8F0] max-w-md">
                    <DialogHeader>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                <AlertTriangle className="h-5 w-5 text-[#DC2626]" />
                            </div>
                            <div className="flex-1">
                                <DialogTitle className="text-lg font-semibold text-[#0F172A]">
                                    Delete User
                                </DialogTitle>
                                <DialogDescription className="text-sm text-[#64748B] mt-2 leading-relaxed">
                                    Are you sure you want to permanently delete{' '}
                                    <span className="font-semibold text-[#0F172A]">
                    {deleteTarget?.name}
                  </span>
                                    ? This action cannot be undone. All user data, content, and
                                    associated records will be removed from the platform.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteTarget(null)}
                            className="h-9 border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] font-medium text-sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="h-9 bg-[#DC2626] text-white hover:bg-red-700 font-medium text-sm"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Permanently
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
