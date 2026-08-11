import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
    Eye,
    Trash2,
    Mail,
    MailOpen,
    Search,
    Reply,
} from 'lucide-react';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface PageProps {
    messages: ContactMessage[];
}

export default function ContactIndex() {
    const { messages } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<ContactMessage | null>(null);
    const [replyOpen, setReplyOpen] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [sending, setSending] = useState(false);

    // Delete modal state
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
    const [deleting, setDeleting] = useState(false);

    const filtered = messages.filter(
        (m) =>
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.email.toLowerCase().includes(search.toLowerCase()) ||
            (m.subject && m.subject.toLowerCase().includes(search.toLowerCase()))
    );

    const handleReadToggle = (id: number) => {
        router.put(route('admin.contact.read', id), {}, {
            preserveScroll: true,
        });
    };

    // Open delete confirmation modal
    const openDelete = (msg: ContactMessage) => {
        setDeleteTarget(msg);
        setDeleteOpen(true);
    };

    // Perform delete
    const confirmDelete = () => {
        if (!deleteTarget) return;
        setDeleting(true);
        router.delete(route('admin.contact.destroy', deleteTarget.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteOpen(false);
                setDeleteTarget(null);
                setDeleting(false);
            },
            onFinish: () => {
                setDeleting(false);
            },
        });
    };

    const handleReply = (message: ContactMessage) => {
        setSelected(message);
        setReplyText('');
        setReplyOpen(true);
    };

    const sendReply = () => {
        if (!selected || !replyText.trim()) return;
        setSending(true);
        router.post(
            route('admin.contact.reply', selected.id),
            { reply: replyText },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setReplyOpen(false);
                    setSelected(null);
                    setReplyText('');
                },
                onFinish: () => setSending(false),
            }
        );
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contact Messages', href: '/admin/dashboard' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="pt-5">
                        {/* <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-[#F5F5F5] sm:text-3xl">
                            Contact Messages
                        </h1> */}
                        <p className="mt-1 text-sm text-[#94A3B8]">
                            Manage inquiries from the contact form.
                        </p>
                    </div>
                    <div className="text-xs text-[#94A3B8]">
                        Total: <span className="font-mono font-semibold text-[#F5F5F5]">{messages.length}</span>
                        {' '}· Unread: <span className="font-mono font-semibold text-[#FF6B00]">
                            {messages.filter(m => !m.is_read).length}
                        </span>
                    </div>
                </div>

                {/* Search */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                    <Input
                        placeholder="Search by name, email, or subject..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-[#2A2A2A] bg-[#0D0D0D] pl-9 text-sm text-[#F5F5F5] placeholder:text-[#555555] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-800"
                    />
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#0D0D0D]">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-[#2A2A2A] bg-[#1A1A1A] hover:bg-[#1A1A1A]">
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">From</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Subject</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Message</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Date</TableHead>
                                    <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Status</TableHead>
                                    <TableHead className="w-[160px] text-right text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-32 text-center text-sm text-[#94A3B8]">
                                            No messages found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((msg) => (
                                        <TableRow
                                            key={msg.id}
                                            className={`border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors ${!msg.is_read ? 'bg-[#1A1A1A]/50' : ''
                                                }`}
                                        >
                                            <TableCell className="py-4">
                                                <div>
                                                    <div className="font-semibold text-[#F5F5F5]">{msg.name}</div>
                                                    <div className="text-xs text-[#94A3B8]">{msg.email}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 text-sm text-[#F5F5F5]">
                                                {msg.subject || '—'}
                                            </TableCell>
                                            <TableCell className="py-4 text-sm text-[#94A3B8] truncate max-w-[200px]">
                                                {msg.message.substring(0, 60)}...
                                            </TableCell>
                                            <TableCell className="py-4 text-sm font-mono text-[#94A3B8]">
                                                {new Date(msg.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </TableCell>
                                            <TableCell className="py-4 text-center">
                                                <button
                                                    onClick={() => handleReadToggle(msg.id)}
                                                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${msg.is_read
                                                        ? 'border-green-700 bg-green-900/20 text-green-400 hover:bg-green-900/40'
                                                        : 'border-[#FF6B00] bg-[rgba(255,107,0,0.12)] text-[#FF6B00] hover:bg-[rgba(255,107,0,0.2)]'
                                                        }`}
                                                >
                                                    {msg.is_read ? (
                                                        <>
                                                            <MailOpen className="h-3 w-3" />
                                                            Read
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Mail className="h-3 w-3" />
                                                            Unread
                                                        </>
                                                    )}
                                                </button>
                                            </TableCell>
                                            <TableCell className="py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        href={`/admin/contact-messages/${msg.id}`}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#94A3B8] hover:bg-[#1A1A1A] hover:text-[#F5F5F5]"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleReply(msg)}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#94A3B8] hover:bg-[#1A1A1A] hover:text-[#FF6B00]"
                                                    >
                                                        <Reply className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDelete(msg)}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#94A3B8] hover:bg-red-500/10 hover:text-red-400"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Reply Dialog */}
            <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
                <DialogContent className="bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="font-display text-xl font-bold uppercase tracking-tight text-[#F5F5F5]">
                            Reply to {selected?.name}
                        </DialogTitle>
                        <DialogDescription className="text-[#94A3B8]">
                            Your reply will be sent via email to <strong className="text-[#F5F5F5]">{selected?.email}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] p-4 text-sm text-[#94A3B8] max-h-32 overflow-y-auto">
                            <div className="font-semibold text-[#F5F5F5]">{selected?.name} wrote:</div>
                            <div className="mt-1 italic">{selected?.message}</div>
                        </div>
                        <Textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply here..."
                            rows={5}
                            className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] placeholder:text-[#555555] focus-visible:border-[#FF6B00] focus-visible:ring-2 focus-visible:ring-orange-800 resize-none"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setReplyOpen(false)}
                            className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] hover:bg-[#2A2A2A]"
                            disabled={sending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={sendReply}
                            disabled={!replyText.trim() || sending}
                            className="bg-[#FF6B00] text-white hover:bg-[#CC5500]"
                        >
                            {sending ? 'Sending...' : 'Send Reply'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent className="bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-display text-xl font-bold uppercase tracking-tight text-[#F5F5F5]">
                            Confirm Delete
                        </DialogTitle>
                        <DialogDescription className="text-[#94A3B8]">
                            Do you want to delete this message?
                            {deleteTarget && (
                                <div className="mt-2 p-3 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] text-sm">
                                    <span className="text-[#F5F5F5] font-medium">{deleteTarget.name}</span>
                                    <span className="text-[#555555]"> — </span>
                                    <span className="text-[#94A3B8]">{deleteTarget.subject || 'No subject'}</span>
                                </div>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteOpen(false)}
                            className="border-[#2A2A2A] bg-[#1A1A1A] text-[#F5F5F5] hover:bg-[#2A2A2A]"
                            disabled={deleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            disabled={deleting}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            {deleting ? 'Deleting...' : 'Confirm Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}