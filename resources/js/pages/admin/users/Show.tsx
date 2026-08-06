import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, User, Mail, Shield, Flag, Calendar, Hash } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';

interface UserShow {
    id: number;
    name: string;
    email: string;
    nationality: string;
    role: string;
    status: string;
    joined: string;
}

interface Country {
    code: string;
    name: string;
}

export default function ShowUser() {
    const { user, countries } = usePage<{
        user: UserShow;
        countries: Country[];
    }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'View',
            href: '',
        },
    ];

    const countryName = countries.find((c) => c.code === user.nationality)?.name || user.nationality;

    const statusColor =
        user.status === 'Active'
            ? 'text-green-400'
            : user.status === 'Suspended'
                ? 'text-red-400'
                : 'text-yellow-400';


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-[#0D0D0D] pt-4 px-4 sm:px-8">
                <div className="max-w-[700px] mx-auto">
                    {/* Back Link */}
                    <div className="mb-8">
                        <Link
                            href={route('users.index')}
                            className="inline-flex items-center gap-1 text-sm text-[#FF6B00] hover:underline"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Users
                        </Link>
                    </div>

                    {/* User Info Card */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-8">
                        <h1 className="text-2xl font-bold text-[#F5F5F5] mb-6 flex items-center gap-2">
                            <User className="h-6 w-6 text-[#FF6B00]" />
                            User Details
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* ID */}
                            <div className="flex items-start gap-3">
                                <Hash className="h-5 w-5 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-[#94A3B8]">ID</p>
                                    <p className="text-sm font-semibold text-[#F5F5F5]">{user.id}</p>
                                </div>
                            </div>

                            {/* Name */}
                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-[#94A3B8]">Full Name</p>
                                    <p className="text-sm font-semibold text-[#F5F5F5]">{user.name}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-[#94A3B8]">Email</p>
                                    <p className="text-sm font-semibold text-[#F5F5F5]">{user.email}</p>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="flex items-start gap-3">
                                <Shield className="h-5 w-5 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-[#94A3B8]">Role</p>
                                    <p className="text-sm font-semibold text-[#F5F5F5]">{user.role}</p>
                                </div>
                            </div>

                            {/* Nationality */}
                            <div className="flex items-start gap-3">
                                <Flag className="h-5 w-5 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-[#94A3B8]">Nationality</p>
                                    <p className="text-sm font-semibold text-[#F5F5F5]">{countryName}</p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-start gap-3">
                                <div
                                    className={`h-5 w-5 flex-shrink-0 rounded-full ${user.status === 'Active' ? 'bg-green-500' : user.status === 'Suspended' ? 'bg-red-500' : 'bg-yellow-500'}`}
                                />
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-[#94A3B8]">Status</p>
                                    <p className={`text-sm font-semibold ${statusColor}`}>{user.status}</p>
                                </div>
                            </div>

                            {/* Joined */}
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-[#94A3B8]">Joined</p>
                                    <p className="text-sm font-semibold text-[#F5F5F5]">{user.joined}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
