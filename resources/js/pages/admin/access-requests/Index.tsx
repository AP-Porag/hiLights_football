import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePage, router, Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Search, Trash2, Mail, Phone, Building2, Eye, X, MapPin, Briefcase, MessageSquare, Calendar, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface AccessRequestRow {
    id: number;
    name: string;
    organization: string | null;
    role: string;
    email: string;
    country: string | null;
    phone: string | null;
    interest: string | null;
    message: string | null;
    status: string;
    created_at: string;
}
interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
}
interface PageProps {
    requests: Paginated<AccessRequestRow>;
    filters: { status?: string; search?: string };
    counts: { all: number; pending: number; contacted: number; approved: number; rejected: number };
    [key: string]: any;
}

const statusStyles: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    contacted: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    approved: 'bg-green-500/10 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/10 text-red-400 border-red-500/30',
};
const roleStyles: Record<string, string> = {
    scout: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    club: 'bg-green-500/10 text-green-400 border-green-500/30',
    agent: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    other: 'bg-[#1F1F1F] text-[#9A9A9A] border-[#2A2A2A]',
};

const STATUS_TABS = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'contacted', label: 'Contacted' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
];

export default function Index() {
    const { requests, filters, counts } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search ?? '');
    const [viewRequest, setViewRequest] = useState<AccessRequestRow | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<AccessRequestRow | null>(null);
    const [deleting, setDeleting] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Access Requests', href: '/admin/access-requests' },
    ];

    const applyFilter = (status: string) => {
        router.get('/admin/access-requests', { status, search: filters.search }, { preserveState: true, replace: true });
    };

    const applySearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/access-requests', { status: filters.status, search }, { preserveState: true, replace: true });
    };

    const changeStatus = (id: number, status: string) => {
        router.put(`/admin/access-requests/${id}/status`, { status }, { preserveScroll: true });
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setDeleting(true);
        router.delete(`/admin/access-requests/${deleteTarget.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteTarget(null),
            onFinish: () => setDeleting(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="grid min-h-screen grid-cols-[minmax(0,1fr)] gap-6 bg-[#0D0D0D] p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-[#F5F5F5] sm:text-4xl">Access Requests</h1>
                    <p className="mt-1 text-sm text-[#9A9A9A]">Scouts, clubs, and agents requesting platform access.</p>
                </div>

                {/* Status tabs */}
                <div className="flex flex-wrap items-center gap-2">
                    {STATUS_TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => applyFilter(tab.key)}
                            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${(filters.status ?? 'all') === tab.key
                                ? 'border-[#E53F01] bg-[rgba(255,107,0,0.12)] text-[#E53F01]'
                                : 'border-[#2A2A2A] bg-[#161616] text-[#9A9A9A] hover:text-[#F5F5F5]'
                                }`}
                        >
                            {tab.label}
                            <span className="ml-1.5 font-mono opacity-70">
                                {tab.key === 'all' ? counts.all : counts[tab.key as keyof typeof counts]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <form onSubmit={applySearch} className="flex gap-2 max-w-md">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-5 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name, email, organization…"
                            className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#161616] border border-[#2A2A2A] text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#E53F01]"
                        />
                    </div>
                    <Button type="submit" className="bg-[#E53F01] hover:bg-[#E53F01] text-white">Search</Button>
                </form>

                {/* Table */}
                <div className="w-full overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#161616] shadow-sm">
                    <div className="max-h-[65vh] w-full overflow-auto">
                        <table className="w-full min-w-[1000px] caption-bottom text-sm">
                            <thead className="sticky top-0 z-10 bg-[#161616]">
                                <tr className="border-b border-[#2A2A2A]">
                                    <th className="h-12 whitespace-nowrap px-6 text-left align-middle text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Name</th>
                                    <th className="h-12 whitespace-nowrap px-4 text-left align-middle text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Contact</th>
                                    <th className="h-12 whitespace-nowrap px-4 text-left align-middle text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Role</th>
                                    <th className="h-12 whitespace-nowrap px-4 text-left align-middle text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Organization</th>
                                    <th className="h-12 whitespace-nowrap px-4 text-left align-middle text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Interest</th>
                                    <th className="h-12 whitespace-nowrap px-4 text-left align-middle text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Status</th>
                                    <th className="h-12 whitespace-nowrap px-4 text-left align-middle text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Received</th>
                                    <th className="h-12 whitespace-nowrap pr-6 pl-4 text-right align-middle text-xs font-medium tracking-wider text-[#9A9A9A] uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.data.map((r) => (
                                    <tr key={r.id} className="border-b border-[#2A2A2A] transition-colors hover:bg-[#1F1F1F]">
                                        <td className="whitespace-nowrap px-6 py-4 align-middle">
                                            <span className="text-sm font-medium text-[#F5F5F5]">{r.name}</span>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 align-middle">
                                            <div className="flex flex-col gap-1">
                                                <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1 text-xs text-[#9A9A9A] hover:text-[#E53F01]">
                                                    <Mail className="h-3 w-3 shrink-0" /> {r.email}
                                                </a>
                                                {r.phone && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-[#555555]">
                                                        <Phone className="h-3 w-3 shrink-0" /> {r.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 align-middle">
                                            <Badge variant="outline" className={`${roleStyles[r.role] ?? roleStyles.other} text-xs font-medium capitalize`}>
                                                {r.role}
                                            </Badge>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 align-middle">
                                            <span className="inline-flex items-center gap-1 text-xs text-[#9A9A9A]">
                                                {r.organization && <Building2 className="h-3 w-3 shrink-0" />}
                                                {r.organization || '—'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 align-middle">
                                            <span className="block max-w-[200px] truncate text-xs text-[#9A9A9A]" title={r.interest ?? ''}>
                                                {r.interest || '—'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 align-middle">
                                            <select
                                                value={r.status}
                                                onChange={(e) => changeStatus(r.id, e.target.value)}
                                                className={`cursor-pointer rounded-lg border bg-transparent px-2 py-1.5 text-xs font-semibold ${statusStyles[r.status] ?? statusStyles.pending}`}
                                            >
                                                <option value="pending" className="bg-[#161616] text-[#F5F5F5]">Pending</option>
                                                <option value="contacted" className="bg-[#161616] text-[#F5F5F5]">Contacted</option>
                                                <option value="approved" className="bg-[#161616] text-[#F5F5F5]">Approved</option>
                                                <option value="rejected" className="bg-[#161616] text-[#F5F5F5]">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 align-middle">
                                            <span className="font-mono text-xs text-[#555555]">{r.created_at}</span>
                                        </td>
                                        <td className="whitespace-nowrap pr-6 pl-4 py-4 text-right align-middle">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setViewRequest(r)}
                                                    className="h-8 w-8 p-0 text-[#9A9A9A] hover:bg-[rgba(255,107,0,0.12)] hover:text-[#E53F01]"
                                                    aria-label="View details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteTarget(r)}
                                                    className="h-8 w-8 p-0 text-[#9A9A9A] hover:bg-red-500/10 hover:text-red-400"
                                                    aria-label="Delete request"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {requests.data.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="py-12 text-center text-sm text-[#9A9A9A]">
                                            No access requests found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {requests.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: requests.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/access-requests?page=${page}`}
                                className={`h-8 w-8 flex items-center justify-center rounded-lg text-xs font-semibold ${page === requests.current_page
                                    ? 'bg-[#E53F01] text-white'
                                    : 'bg-[#161616] border border-[#2A2A2A] text-[#9A9A9A] hover:text-[#F5F5F5]'
                                    }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* ── VIEW DETAILS MODAL ── */}
            {viewRequest && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={() => setViewRequest(null)}
                >
                    <div
                        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#F5F5F5]">{viewRequest.name}</h3>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <Badge variant="outline" className={`${roleStyles[viewRequest.role] ?? roleStyles.other} text-xs font-medium capitalize`}>
                                        {viewRequest.role}
                                    </Badge>
                                    <Badge variant="outline" className={`${statusStyles[viewRequest.status] ?? statusStyles.pending} text-xs font-medium capitalize`}>
                                        {viewRequest.status}
                                    </Badge>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setViewRequest(null)}
                                className="text-[#94A3B8] hover:text-[#F5F5F5]"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Email */}
                            <div className="flex items-start gap-3 rounded-xl border border-[#2A2A2A] bg-[#111111] p-3">
                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E53F01]" />
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555555]">Email</p>
                                    <a href={`mailto:${viewRequest.email}`} className="text-sm break-all text-[#F5F5F5] hover:text-[#E53F01]">
                                        {viewRequest.email}
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            {viewRequest.phone && (
                                <div className="flex items-start gap-3 rounded-xl border border-[#2A2A2A] bg-[#111111] p-3">
                                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E53F01]" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555555]">Phone</p>
                                        <p className="text-sm text-[#F5F5F5]">{viewRequest.phone}</p>
                                    </div>
                                </div>
                            )}

                            {/* Organization */}
                            {viewRequest.organization && (
                                <div className="flex items-start gap-3 rounded-xl border border-[#2A2A2A] bg-[#111111] p-3">
                                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E53F01]" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555555]">Organization</p>
                                        <p className="text-sm text-[#F5F5F5]">{viewRequest.organization}</p>
                                    </div>
                                </div>
                            )}

                            {/* Country */}
                            {viewRequest.country && (
                                <div className="flex items-start gap-3 rounded-xl border border-[#2A2A2A] bg-[#111111] p-3">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E53F01]" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555555]">Country</p>
                                        <p className="text-sm text-[#F5F5F5]">{viewRequest.country}</p>
                                    </div>
                                </div>
                            )}

                            {/* Interest */}
                            {viewRequest.interest && (
                                <div className="flex items-start gap-3 rounded-xl border border-[#2A2A2A] bg-[#111111] p-3">
                                    <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-[#E53F01]" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555555]">Interested In</p>
                                        <p className="text-sm text-[#F5F5F5]">{viewRequest.interest}</p>
                                    </div>
                                </div>
                            )}

                            {/* Message */}
                            {viewRequest.message && (
                                <div className="flex items-start gap-3 rounded-xl border border-[#2A2A2A] bg-[#111111] p-3">
                                    <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#E53F01]" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555555]">Message</p>
                                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#F5F5F5]">{viewRequest.message}</p>
                                    </div>
                                </div>
                            )}

                            {/* Received */}
                            <div className="flex items-start gap-3 rounded-xl border border-[#2A2A2A] bg-[#111111] p-3">
                                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#E53F01]" />
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#555555]">Received</p>
                                    <p className="font-mono text-sm text-[#9A9A9A]">{viewRequest.created_at}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button
                                type="button"
                                onClick={() => setViewRequest(null)}
                                className="bg-[#E53F01] text-white hover:bg-[#E53F01]"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── DELETE CONFIRMATION MODAL ── */}
            {deleteTarget && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={() => !deleting && setDeleteTarget(null)}
                >
                    <div
                        className="w-full max-w-sm rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                            <AlertTriangle className="h-6 w-6 text-red-400" />
                        </div>

                        <h3 className="text-center text-lg font-bold text-[#F5F5F5]">Delete this request?</h3>
                        <p className="mt-2 text-center text-sm leading-relaxed text-[#9A9A9A]">
                            You're about to permanently delete the access request from{' '}
                            <span className="font-semibold text-[#F5F5F5]">{deleteTarget.name}</span>. This action cannot be undone.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setDeleteTarget(null)}
                                disabled={deleting}
                                className="flex-1 border border-[#2A2A2A] text-[#9A9A9A] hover:bg-[#1F1F1F] hover:text-[#F5F5F5]"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={confirmDelete}
                                disabled={deleting}
                                className="flex-1 bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                            >
                                {deleting ? 'Deleting…' : 'Confirm'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
