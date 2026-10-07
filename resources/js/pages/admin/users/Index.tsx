import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GlobalConstant } from '@/utils/GlobalConstant';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { AlertTriangle, Ban, Edit, Eye, MoreHorizontal, Search, Trash2, UserPlus } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select';

// ডাটাবেজ থেকে আসা ইউজারের টাইপ
interface User {
    id: number;
    name: string;
    email: string;
    country: string;
    country_flag: string;
    role: string;
    subscription: string;
    status: string;
    joined: string;
}

// কান্ট্রি টাইপ (ব্যাকএন্ড থেকে আসা)
interface Country {
    code: string;
    name: string;
}

const getInitials = (name: string) =>
    name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

const roleBadgeClasses: Record<string, string> = {
    Player: 'border-blue-400 text-blue-300 bg-blue-900/30',
    Scout: 'border-purple-400 text-purple-300 bg-purple-900/30',
    Agent: 'border-indigo-400 text-indigo-300 bg-indigo-900/30',
    Club: 'border-green-400 text-green-300 bg-green-900/30',
    Admin: 'border-[#E53F01] text-[#E53F01] bg-orange-900/20',
};

const subBadgeClasses: Record<string, string> = {
    Free: 'border-gray-500 text-gray-300 bg-gray-800',
    Premium: 'bg-[#E53F01] text-white border-[#E53F01]',
    Agent: 'bg-amber-600 text-white border-amber-600',
};

const statusClasses: Record<string, string> = {
    Active: 'bg-green-600 text-white',
    Suspended: 'bg-red-600 text-white',
    Pending: 'bg-yellow-600 text-white',
};

export default function UsersIndex() {
    const {
        users,
        filters,
        total,
        countries = [],
    } = usePage<{
        users: { data: User[]; current_page: number; last_page: number };
        filters: { search?: string; role?: string };
        total: number;
        countries: Country[];
    }>().props;

    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [activeTab, setActiveTab] = useState(filters.role || 'all');
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

    // -------- Create User Modal ----------
    const [showCreateModal, setShowCreateModal] = useState(false);
    const {
        data: newUser,
        setData: setNewUser,
        post,
        processing: creating,
        errors,
        reset,
        clearErrors,
    } = useForm({
        name: '',
        email: '',
        role: GlobalConstant.ROLE_PLAYER,
        nationality: '',
    });

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // react-select-এর জন্য কান্ট্রি অপশন
    const countryOptions = useMemo(
        () =>
            countries.map((c) => ({
                value: c.code,
                label: `${c.name} (${c.code})`,
            })),
        [countries],
    );

    const roleMapping: Record<string, string> = {
        all: 'all',
        players: 'Player',
        scouts: 'Scout',
        agents: 'Agent',
        clubs: 'Club',
    };

    const applyFilters = (search: string, role: string) => {
        const mappedRole = roleMapping[role] || 'all';
        router.get(route('users.index'), { search, role: mappedRole }, { preserveState: true, replace: true });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            applyFilters(value, activeTab);
        }, 300);
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        applyFilters(searchQuery, value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters(searchQuery, activeTab);
    };

    const handleDelete = () => {
        if (deleteTarget) {
            router.delete(route('users.destroy', deleteTarget.id), {
                onSuccess: () => setDeleteTarget(null),
            });
        }
    };

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('users.store'), {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
                router.visit(route('users.index'), { preserveState: false });
            },
            onError: () => {
                // errors অটো-populate হবে useForm-এ
            },
        });
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    // react-select-এর ডার্ক থিম স্টাইল (রেজিস্টার পেজের মতো)
    const selectStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: '#1A1A1A',
            borderColor: '#2A2A2A',
            color: '#F5F5F5',
            minHeight: '36px',
            borderRadius: '12px',
            boxShadow: 'none',
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: '#1F1F1F',
            borderColor: '#2A2A2A',
            borderRadius: '12px',
            marginTop: '8px',
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected ? '#E53F01' : state.isFocused ? '#2A2A2A' : '#1F1F1F',
            color: state.isSelected ? '#0D0D0D' : '#F5F5F5',
            fontWeight: state.isSelected ? 600 : 400,
        }),
        singleValue: (base: any) => ({
            ...base,
            color: '#F5F5F5',
        }),
        input: (base: any) => ({
            ...base,
            color: '#F5F5F5',
        }),
    };
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="overflow-x-hidden">
                {/* TOP ACTIONS BAR */}
                <div className="-mx-8 mb-6 flex flex-col gap-3 border-b border-[#2A2A2A] bg-[#0f0f0f] px-8 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                            <Input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="h-9 border-[#2A2A2A] bg-[#1A1A1A] pl-9 text-[#F5F5F5] placeholder:text-[#64748B] focus-visible:border-[#E53F01] focus-visible:ring-1 focus-visible:ring-[#E53F01]"
                            />
                        </form>
                        {/* <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
                            <TabsList className="bg-[#1A1A1A] border border-[#2A2A2A] h-9 p-0.5">
                                <TabsTrigger value="all" className="text-xs px-3 h-8 data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-[#E53F01] data-[state=active]:shadow-sm font-medium text-[#94A3B8]">All</TabsTrigger>
                                <TabsTrigger value="players" className="text-xs px-3 h-8 data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-[#E53F01] data-[state=active]:shadow-sm font-medium text-[#94A3B8]">Players</TabsTrigger>
                                <TabsTrigger value="scouts" className="text-xs px-3 h-8 data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-[#E53F01] data-[state=active]:shadow-sm font-medium text-[#94A3B8]">Scouts</TabsTrigger>
                                <TabsTrigger value="agents" className="text-xs px-3 h-8 data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-[#E53F01] data-[state=active]:shadow-sm font-medium text-[#94A3B8]">Agents</TabsTrigger>
                                <TabsTrigger value="clubs" className="text-xs px-3 h-8 data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-[#E53F01] data-[state=active]:shadow-sm font-medium text-[#94A3B8]">Clubs</TabsTrigger>
                            </TabsList>
                        </Tabs> */}
                    </div>

                    <div className="flex gap-2">
                        {/* <Button variant="outline" className="h-9 border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] font-medium text-sm">
                            <Download className="h-4 w-4 mr-2" /> Export CSV
                        </Button> */}
                        <Button
                            onClick={() => {
                                clearErrors();
                                setShowCreateModal(true);
                            }}
                            className="h-9 bg-[#E53F01] text-sm font-medium text-white hover:bg-[#E53F01]"
                        >
                            <UserPlus className="mr-2 h-4 w-4" /> Add User
                        </Button>
                    </div>
                </div>

                {/* RESULTS COUNT */}
                <p className="mb-4 font-sans text-sm text-[#94A3B8]">
                    Showing <span className="font-semibold text-[#F5F5F5]">{users.data.length}</span> of{' '}
                    <span className="font-semibold text-[#F5F5F5]">{total}</span> users
                </p>

                {/* USERS TABLE CARD */}
                <Card className="overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#0f0f0f] shadow-sm">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="sticky top-0 bg-[#1A1A1A]">
                                <TableRow className="border-b border-[#2A2A2A] hover:bg-[#1A1A1A]">
                                    <TableHead className="w-12 px-6 py-4 text-xs font-semibold tracking-wide text-[#94A3B8] uppercase">#</TableHead>
                                    <TableHead className="py-4 text-xs font-semibold tracking-wide text-[#94A3B8] uppercase">User</TableHead>
                                    <TableHead className="hidden py-4 text-xs font-semibold tracking-wide text-[#94A3B8] uppercase md:table-cell">
                                        Email
                                    </TableHead>
                                    {/* <TableHead className="text-xs uppercase text-[#94A3B8] tracking-wide font-semibold py-4">Role</TableHead> */}
                                    {/* <TableHead className="text-xs uppercase text-[#94A3B8] tracking-wide font-semibold py-4 hidden lg:table-cell">Subscription</TableHead> */}
                                    <TableHead className="hidden py-4 text-xs font-semibold tracking-wide text-[#94A3B8] uppercase sm:table-cell">
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden py-4 text-xs font-semibold tracking-wide text-[#94A3B8] uppercase xl:table-cell">
                                        Joined
                                    </TableHead>
                                    <TableHead className="py-4 pr-6 text-right text-xs font-semibold tracking-wide text-[#94A3B8] uppercase">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user, idx) => (
                                    <TableRow key={user.id} className="border-b border-[#2A2A2A] transition-colors hover:bg-[#1A1A1A]">
                                        <TableCell className="px-6 py-4 font-mono text-sm text-[#94A3B8]">
                                            {String((users.current_page - 1) * 15 + idx + 1).padStart(2, '0')}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback className="bg-orange-900/30 text-xs font-semibold text-[#E53F01]">
                                                        {getInitials(user.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-semibold text-[#F5F5F5]">{user.name}</div>
                                                    <div className="mt-0.5 flex items-center gap-1 text-xs text-[#94A3B8]">
                                                        <span>{user.country_flag}</span>
                                                        <span>{user.country}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden py-4 text-sm text-[#94A3B8] md:table-cell">{user.email}</TableCell>
                                        {/* <TableCell className="py-4">
                                            <Badge variant="outline" className={`${roleBadgeClasses[user.role] || 'border-gray-500 text-gray-300 bg-gray-800'} text-xs font-medium px-2.5 py-0.5 rounded-md`}>
                                                {user.role}
                                            </Badge>
                                        </TableCell> */}
                                        {/* <TableCell className="py-4 hidden lg:table-cell">
                                            <Badge className={`${subBadgeClasses[user.subscription] || 'border-gray-500 text-gray-300 bg-gray-800'} text-xs font-medium px-2.5 py-0.5 rounded-md`}>
                                                {user.subscription}
                                            </Badge>
                                        </TableCell> */}
                                        <TableCell className="hidden py-4 sm:table-cell">
                                            <Badge
                                                className={`${statusClasses[user.status] || 'bg-gray-600 text-white'} rounded-md px-2.5 py-0.5 text-xs font-medium`}
                                            >
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden py-4 xl:table-cell">
                                            <span className="font-mono text-sm text-[#94A3B8]">{user.joined}</span>
                                        </TableCell>
                                        <TableCell className="py-4 pr-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#94A3B8] hover:bg-[#2A2A2A]">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-48 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-lg"
                                                >
                                                    <Link href={route('users.show', user.id)}>
                                                        <DropdownMenuItem className="cursor-pointer py-2 text-sm text-[#F5F5F5] hover:bg-[#2A2A2A] focus:bg-[#2A2A2A]">
                                                            <Eye className="mr-2 h-4 w-4 text-[#94A3B8]" /> View Football Identity
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <Link href={route('users.edit', user.id)}>
                                                        <DropdownMenuItem className="cursor-pointer py-2 text-sm text-[#F5F5F5] hover:bg-[#2A2A2A] focus:bg-[#2A2A2A]">
                                                            <Edit className="mr-2 h-4 w-4 text-[#94A3B8]" /> Edit User
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                                                    <DropdownMenuItem
                                                        onClick={() => router.post(route('users.suspend', user.id))}
                                                        className="cursor-pointer py-2 text-sm text-amber-400 hover:bg-amber-900/20 focus:bg-amber-900/20"
                                                    >
                                                        <Ban className="mr-2 h-4 w-4" />
                                                        {user.status === 'Suspended' ? 'Reactivate Account' : 'Suspend Account'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => setDeleteTarget(user)}
                                                        className="cursor-pointer py-2 text-sm text-red-400 hover:bg-red-900/20 focus:bg-red-900/20"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete User
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
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-[#94A3B8]">
                        Page <span className="font-semibold text-[#F5F5F5]">{users.current_page}</span> of{' '}
                        <span className="font-semibold text-[#F5F5F5]">{users.last_page}</span>
                    </p>
                    <Pagination className="mx-0 justify-end">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={
                                        users.current_page > 1
                                            ? route('users.index', { page: users.current_page - 1, search: searchQuery, role: activeTab })
                                            : '#'
                                    }
                                    className="h-9 border border-[#2A2A2A] text-sm text-[#F5F5F5] hover:bg-[#1A1A1A] hover:text-[#E53F01]"
                                />
                            </PaginationItem>
                            {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href={route('users.index', { page, search: searchQuery, role: activeTab })}
                                        isActive={page === users.current_page}
                                        className={
                                            page === users.current_page
                                                ? 'h-9 w-9 border-[#E53F01] bg-[#E53F01] text-sm text-white hover:bg-[#E53F01] hover:text-white'
                                                : 'h-9 w-9 border border-[#2A2A2A] text-sm text-[#F5F5F5] hover:bg-[#1A1A1A] hover:text-[#E53F01]'
                                        }
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href={
                                        users.current_page < users.last_page
                                            ? route('users.index', { page: users.current_page + 1, search: searchQuery, role: activeTab })
                                            : '#'
                                    }
                                    className="h-9 border border-[#2A2A2A] text-sm text-[#F5F5F5] hover:bg-[#1A1A1A] hover:text-[#E53F01]"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

                {/* DELETE CONFIRMATION DIALOG */}
                <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                    <DialogContent className="max-w-md rounded-2xl border border-[#2A2A2A] bg-[#0f0f0f] p-6">
                        <DialogHeader>
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-900/30">
                                    <AlertTriangle className="h-5 w-5 text-[#DC2626]" />
                                </div>
                                <div className="flex-1">
                                    <DialogTitle className="text-lg font-semibold text-[#F5F5F5]">Delete User</DialogTitle>
                                    <DialogDescription className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                                        Are you sure you want to permanently delete{' '}
                                        <span className="font-semibold text-[#F5F5F5]">{deleteTarget?.name}</span>? This action cannot be undone.
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>
                        <DialogFooter className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setDeleteTarget(null)}
                                className="h-9 border-[#2A2A2A] text-sm font-medium text-[#F5F5F5] hover:bg-[#1A1A1A]"
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} className="h-9 bg-[#DC2626] text-sm font-medium text-white hover:bg-red-700">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Permanently
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* ====== CREATE USER MODAL ====== */}
                <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                    <DialogContent className="max-w-md rounded-2xl border border-[#2A2A2A] bg-[#0f0f0f] p-6">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold text-[#F5F5F5]">Create New User</DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-[#94A3B8]">
                                Fill in the user details below. The new user will appear immediately.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateUser}>
                            <div className="grid gap-4 py-4">
                                <div>
                                    <label className="mb-1 block text-xs tracking-wide text-[#94A3B8] uppercase">Full Name</label>
                                    <Input
                                        type="text"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        className="h-9 border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] focus-visible:border-[#E53F01] focus-visible:ring-1 focus-visible:ring-[#E53F01]"
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs tracking-wide text-[#94A3B8] uppercase">Email</label>
                                    <Input
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        className="h-9 border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] focus-visible:border-[#E53F01] focus-visible:ring-1 focus-visible:ring-[#E53F01]"
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                                </div>
                                {/* <div>
                                    <label className="text-xs uppercase tracking-wide text-[#94A3B8] block mb-1">Password</label>
                                    <Input
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        required
                                        className="h-9 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5] focus-visible:border-[#E53F01] focus-visible:ring-1 focus-visible:ring-[#E53F01]"
                                    />
                                </div> */}
                                <div>
                                    <label className="mb-1 block text-xs tracking-wide text-[#94A3B8] uppercase">Role</label>
                                    <select
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                        className="h-9 w-full rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-2 text-sm text-[#F5F5F5] focus:border-[#E53F01] focus:outline-none"
                                    >
                                        {/* <option value={GlobalConstant.ROLE_PLAYER}>Player</option>
                                        <option value={GlobalConstant.ROLE_SCOUT}>Scout</option>
                                        <option value={GlobalConstant.ROLE_AGENT}>Agent</option>
                                        <option value={GlobalConstant.ROLE_CLUB}>Club</option> */}
                                        <option value={GlobalConstant.ROLE_ADMIN}>Admin</option>
                                        <option value={GlobalConstant.ROLE_USER}>User</option>
                                    </select>
                                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.role}</p>}
                                </div>
                                {/* ── Nationality Dropdown (react‑select) ── */}
                                <div>
                                    <label className="mb-1 block text-xs tracking-wide text-[#94A3B8] uppercase">Nationality</label>
                                    <Select
                                        options={countryOptions}
                                        value={countryOptions.find((o) => o.value === newUser.nationality) || null}
                                        onChange={(selected) => setNewUser({ ...newUser, nationality: selected?.value || '' })}
                                        placeholder="Select country..."
                                        isSearchable
                                        className="text-sm"
                                        styles={selectStyles}
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.nationality}</p>}
                                </div>
                            </div>
                            <DialogFooter className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowCreateModal(false)}
                                    className="h-9 border-[#2A2A2A] text-sm font-medium text-[#F5F5F5] hover:bg-[#1A1A1A]"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={creating}
                                    className="h-9 bg-[#E53F01] text-sm font-medium text-white hover:bg-[#E53F01]"
                                >
                                    {creating ? 'Creating...' : 'Create User'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
