import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Mail, User, Calendar } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function ContactShow() {
    const { message } = usePage<{ message: any }>().props;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'View Message', href: '' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="max-w-3xl mx-auto space-y-6">
                <Link href="/admin/contact-messages" className="inline-flex items-center gap-2 text-[#FF6B00] hover:underline pt-5">
                    <ArrowLeft className="h-4 w-4" /> Back to messages
                </Link>
                <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="font-display text-2xl font-bold text-[#F5F5F5]">{message.subject || 'No Subject'}</h1>
                            <div className="mt-2 flex items-center gap-4 text-sm text-[#94A3B8]">
                                <span className="flex items-center gap-1"><User className="h-4 w-4" /> {message.name}</span>
                                <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {message.email}</span>
                                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(message.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-bold uppercase ${message.is_read ? 'border-green-700 bg-green-900/20 text-green-400' : 'border-[#FF6B00] bg-[rgba(255,107,0,0.12)] text-[#FF6B00]'
                            }`}>
                            {message.is_read ? 'Read' : 'Unread'}
                        </span>
                    </div>
                    <div className="mt-6 p-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-[#F5F5F5] whitespace-pre-wrap">
                        {message.message}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}