import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
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
    Admin: 'border-[#FF6B00] text-[#FF6B00] bg-orange-900/20',
};

const subBadgeClasses: Record<string, string> = {
    Free: 'border-gray-500 text-gray-300 bg-gray-800',
    Premium: 'bg-[#FF6B00] text-white border-[#FF6B00]',
    Agent: 'bg-amber-600 text-white border-amber-600',
};

const statusClasses: Record<string, string> = {
    Active: 'bg-green-600 text-white',
    Suspended: 'bg-red-600 text-white',
    Pending: 'bg-yellow-600 text-white',
};

export default function UsersIndex() {
    const { users, filters, total, countries = [] } = usePage<{
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
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Player',
        nationality: '',
    });
    const [creating, setCreating] = useState(false);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // react-select-এর জন্য কান্ট্রি অপশন
    const countryOptions = useMemo(
        () =>
            countries.map((c) => ({
                value: c.code,
                label: `${c.name} (${c.code})`,
            })),
        [countries]
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
        router.get(
            route('users.index'),
            { search, role: mappedRole },
            { preserveState: true, replace: true }
        );
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
        setCreating(true);
        router.post(route('users.store'), newUser, {
            onSuccess: () => {
                setShowCreateModal(false);
                setNewUser({ name: '', email: '', password: '', role: 'Player', nationality: '' });
                router.visit(route('users.index'), { preserveState: false });
            },
            onError: (errors) => {
                console.error(errors);
            },
            onFinish: () => setCreating(false),
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
            backgroundColor: state.isSelected
                ? '#FF6B00'
                : state.isFocused
                    ? '#2A2A2A'
                    : '#1F1F1F',
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

    return (
        <AppLayout>
            <div className="overflow-x-hidden">
                {/* TOP ACTIONS BAR */}
                <div className="bg-[#0f0f0f] border-b border-[#2A2A2A] -mx-8 px-8 py-4 mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-1">
                        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                            <Input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="pl-9 h-9 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#64748B] focus-visible:border-[#FF6B00] focus-visible:ring-1 focus-visible:ring-[#FF6B00]"
                            />
                        </form>
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
                            <TabsList className="bg-[#1A1A1A] border border-[#2A2A2A] h-9 p-0.5">
                                <TabsTrigger value="all" className="text-xs px-3 h-8 data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-sm font-medium text-[#94A3B8]">All</TabsTrigger>
                                <TabsTrigger value="players" className="text-xs px-3 h-8 data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-sm font-medium text-[#94A3B8]">Players</TabsTrigger>
                                <TabsTrigger value="scouts" className="text-xs px-3 h-8 data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-sm font-medium text-[#94A3B8]">Scouts</TabsTrigger>
                                <TabsTrigger value="agents" className="text-xs px-3 h-8 data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-sm font-medium text-[#94A3B8]">Agents</TabsTrigger>
                                <TabsTrigger value="clubs" className="text-xs px-3 h-8 data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-[#FF6B00] data-[state=active]:shadow-sm font-medium text-[#94A3B8]">Clubs</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="flex gap-2">
                        {/* <Button variant="outline" className="h-9 border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] font-medium text-sm">
                            <Download className="h-4 w-4 mr-2" /> Export CSV
                        </Button> */}
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            className="h-9 bg-[#FF6B00] text-white hover:bg-[#CC5500] font-medium text-sm"
                        >
                            <UserPlus className="h-4 w-4 mr-2" /> Add User
                        </Button>
                    </div>
                </div>

                {/* RESULTS COUNT */}
                <p className="text-sm text-[#94A3B8] mb-4 font-sans">
                    Showing <span className="font-semibold text-[#F5F5F5]">{users.data.length}</span> of{' '}
                    <span className="font-semibold text-[#F5F5F5]">{total}</span> users
                </p>

                {/* USERS TABLE CARD */}
                <Card className="bg-[#0f0f0f] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="sticky top-0 bg-[#1A1A1A]">
                                <TableRow className="border-b border-[#2A2A2A] hover:bg-[#1A1A1A]">
                                    <TableHead className="text-xs uppercase text-[#94A3B8] tracking-wide font-semibold w-12 py-4 px-6">#</TableHead>
                                    <TableHead className="text-xs uppercase text-[#94A3B8] tracking-wide font-semibold py-4">User</TableHead>
                                    <TableHead className="text-xs uppercase text-[#94A3B8] tracking-wide font-semibold py-4 hidden md:table-cell">Email</TableHead>
                                    <TableHead className="text-xs uppercase text-[#94A3B8] tracking-wide font-semibold py-4">Role</TableHead>
                                    <TableHead className="text-xs uppercase text-[#94A3B8] tracking-wide font-semibold py-4 hidden lg:table-cell">Subscription</TableHead>
                                    <TableHead className="text-xs uppercase text-[#94A3B8] tracking-wide font-semibold py-4 hidden sm:table-cell">Status</TableHead>
                                    <TableHead className="text-xs uppercase text-[#94A3B8] tracking-wide font-semibold py-4 hidden xl:table-cell">Joined</TableHead>
                                    <TableHead className="text-xs uppercase text-[#94A3B8] tracking-wide font-semibold py-4 text-right pr-6">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user, idx) => (
                                    <TableRow key={user.id} className="border-b border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors">
                                        <TableCell className="text-sm text-[#94A3B8] font-mono px-6 py-4">
                                            {String((users.current_page - 1) * 15 + idx + 1).padStart(2, '0')}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback className="bg-orange-900/30 text-[#FF6B00] text-xs font-semibold">
                                                        {getInitials(user.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <div className="font-semibold text-[#F5F5F5] text-sm truncate">{user.name}</div>
                                                    <div className="text-xs text-[#94A3B8] flex items-center gap-1 mt-0.5">
                                                        <span>{user.country_flag}</span>
                                                        <span>{user.country}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-[#94A3B8] py-4 hidden md:table-cell">{user.email}</TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant="outline" className={`${roleBadgeClasses[user.role] || 'border-gray-500 text-gray-300 bg-gray-800'} text-xs font-medium px-2.5 py-0.5 rounded-md`}>
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-4 hidden lg:table-cell">
                                            <Badge className={`${subBadgeClasses[user.subscription] || 'border-gray-500 text-gray-300 bg-gray-800'} text-xs font-medium px-2.5 py-0.5 rounded-md`}>
                                                {user.subscription}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-4 hidden sm:table-cell">
                                            <Badge className={`${statusClasses[user.status] || 'bg-gray-600 text-white'} text-xs font-medium px-2.5 py-0.5 rounded-md`}>
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-4 hidden xl:table-cell">
                                            <span className="text-sm text-[#94A3B8] font-mono">{user.joined}</span>
                                        </TableCell>
                                        <TableCell className="py-4 pr-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#2A2A2A] text-[#94A3B8]">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-lg w-48">
                                                    <Link href={route('users.show', user.id)}>
                                                        <DropdownMenuItem className="text-sm text-[#F5F5F5] cursor-pointer hover:bg-[#2A2A2A] focus:bg-[#2A2A2A] py-2">
                                                            <Eye className="h-4 w-4 mr-2 text-[#94A3B8]" /> View Profile
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <Link href={route('users.edit', user.id)}>
                                                        <DropdownMenuItem className="text-sm text-[#F5F5F5] cursor-pointer hover:bg-[#2A2A2A] focus:bg-[#2A2A2A] py-2">
                                                            <Edit className="h-4 w-4 mr-2 text-[#94A3B8]" /> Edit User
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                                                    <DropdownMenuItem
                                                        onClick={() => router.post(route('users.suspend', user.id))}
                                                        className="text-sm text-amber-400 cursor-pointer hover:bg-amber-900/20 focus:bg-amber-900/20 py-2"
                                                    >
                                                        <Ban className="h-4 w-4 mr-2" />
                                                        {user.status === 'Suspended' ? 'Reactivate Account' : 'Suspend Account'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => setDeleteTarget(user)}
                                                        className="text-sm text-red-400 cursor-pointer hover:bg-red-900/20 focus:bg-red-900/20 py-2"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" /> Delete User
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
                    <p className="text-sm text-[#94A3B8]">
                        Page <span className="font-semibold text-[#F5F5F5]">{users.current_page}</span> of{' '}
                        <span className="font-semibold text-[#F5F5F5]">{users.last_page}</span>
                    </p>
                    <Pagination className="mx-0 justify-end">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={users.current_page > 1 ? route('users.index', { page: users.current_page - 1, search: searchQuery, role: activeTab }) : '#'}
                                    className="border border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] hover:text-[#FF6B00] text-sm h-9"
                                />
                            </PaginationItem>
                            {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href={route('users.index', { page, search: searchQuery, role: activeTab })}
                                        isActive={page === users.current_page}
                                        className={
                                            page === users.current_page
                                                ? 'bg-[#FF6B00] text-white border-[#FF6B00] hover:bg-[#CC5500] hover:text-white text-sm h-9 w-9'
                                                : 'border border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] hover:text-[#FF6B00] text-sm h-9 w-9'
                                        }
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href={users.current_page < users.last_page ? route('users.index', { page: users.current_page + 1, search: searchQuery, role: activeTab }) : '#'}
                                    className="border border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] hover:text-[#FF6B00] text-sm h-9"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

                {/* DELETE CONFIRMATION DIALOG */}
                <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                    <DialogContent className="bg-[#0f0f0f] rounded-2xl p-6 border border-[#2A2A2A] max-w-md">
                        <DialogHeader>
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center shrink-0">
                                    <AlertTriangle className="h-5 w-5 text-[#DC2626]" />
                                </div>
                                <div className="flex-1">
                                    <DialogTitle className="text-lg font-semibold text-[#F5F5F5]">Delete User</DialogTitle>
                                    <DialogDescription className="text-sm text-[#94A3B8] mt-2 leading-relaxed">
                                        Are you sure you want to permanently delete{' '}
                                        <span className="font-semibold text-[#F5F5F5]">{deleteTarget?.name}</span>?
                                        This action cannot be undone.
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>
                        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                            <Button variant="outline" onClick={() => setDeleteTarget(null)} className="h-9 border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] font-medium text-sm">Cancel</Button>
                            <Button onClick={handleDelete} className="h-9 bg-[#DC2626] text-white hover:bg-red-700 font-medium text-sm">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete Permanently
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* ====== CREATE USER MODAL ====== */}
                <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                    <DialogContent className="bg-[#0f0f0f] rounded-2xl p-6 border border-[#2A2A2A] max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold text-[#F5F5F5]">
                                Create New User
                            </DialogTitle>
                            <DialogDescription className="text-sm text-[#94A3B8] mt-2">
                                Fill in the user details below. The new user will appear immediately.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateUser}>
                            <div className="grid gap-4 py-4">
                                <div>
                                    <label className="text-xs uppercase tracking-wide text-[#94A3B8] block mb-1">Full Name</label>
                                    <Input
                                        type="text"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        required
                                        className="h-9 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5] focus-visible:border-[#FF6B00] focus-visible:ring-1 focus-visible:ring-[#FF6B00]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wide text-[#94A3B8] block mb-1">Email</label>
                                    <Input
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        required
                                        className="h-9 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5] focus-visible:border-[#FF6B00] focus-visible:ring-1 focus-visible:ring-[#FF6B00]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wide text-[#94A3B8] block mb-1">Password</label>
                                    <Input
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        required
                                        className="h-9 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5] focus-visible:border-[#FF6B00] focus-visible:ring-1 focus-visible:ring-[#FF6B00]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wide text-[#94A3B8] block mb-1">Role</label>
                                    <select
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                        className="h-9 w-full rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-2 text-sm text-[#F5F5F5] focus:border-[#FF6B00] focus:outline-none"
                                    >
                                        <option value="Player">Player</option>
                                        <option value="Scout">Scout</option>
                                        <option value="Agent">Agent</option>
                                        <option value="Club">Club</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                {/* ── Nationality Dropdown (react‑select) ── */}
                                <div>
                                    <label className="text-xs uppercase tracking-wide text-[#94A3B8] block mb-1">
                                        Nationality
                                    </label>
                                    <Select
                                        options={countryOptions}
                                        value={countryOptions.find((o) => o.value === newUser.nationality) || null}
                                        onChange={(selected) =>
                                            setNewUser({ ...newUser, nationality: selected?.value || '' })
                                        }
                                        placeholder="Select country..."
                                        isSearchable
                                        className="text-sm"
                                        styles={selectStyles}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)} className="h-9 border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] font-medium text-sm">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={creating} className="h-9 bg-[#FF6B00] text-white hover:bg-[#CC5500] font-medium text-sm">
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
