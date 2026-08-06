import React, { useMemo, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, CheckCircle, X } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';

interface UserEdit {
    id: number;
    name: string;
    email: string;
    nationality: string;
    role: string;
    subscription: string;
    status: string;
}

interface Country {
    code: string;
    name: string;
}

export default function EditUser() {
    const { user, countries } = usePage<{
        user: UserEdit;
        countries: Country[];
    }>().props;

    const [toast, setToast] = useState<string | null>(null);

    const countryOptions = useMemo(
        () =>
            countries.map((c) => ({
                value: c.code,
                label: `${c.name} (${c.code})`,
            })),
        [countries]
    );
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit',
            href: '',
        },
    ];

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        router.put(route('users.update', user.id), data, {
            onSuccess: () => {
                setToast('User updated successfully!');
                setTimeout(() => {
                    setToast(null);
                    router.visit(route('users.index'));
                }, 2000);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-[#0D0D0D] pt-4 px-4 sm:px-8 relative">
                {/* Toast message */}
                {toast && (
                    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl shadow-xl px-5 py-4 animate-in slide-in-from-top-2">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-[#F5F5F5]">{toast}</span>
                        <button
                            type="button"
                            onClick={() => setToast(null)}
                            className="ml-2 text-[#94A3B8] hover:text-[#F5F5F5] cursor-pointer"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <div className="max-w-[700px] mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href={route('users.index')}
                            className="inline-flex items-center gap-1 text-sm text-[#FF6B00] hover:underline"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Users
                        </Link>
                        <h1 className="text-2xl font-bold text-[#F5F5F5]">
                            Edit User: {user.name}
                        </h1>
                    </div>

                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="text-xs uppercase tracking-wide text-[#94A3B8] block mb-1">
                                    Full Name
                                </label>
                                <Input
                                    name="name"
                                    defaultValue={user.name}
                                    required
                                    className="h-9 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5] focus-visible:border-[#FF6B00] focus-visible:ring-1 focus-visible:ring-[#FF6B00]"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="text-xs uppercase tracking-wide text-[#94A3B8] block mb-1">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    defaultValue={user.role}
                                    className="h-9 w-full rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-2 text-sm text-[#F5F5F5] focus:border-[#FF6B00] focus:outline-none"
                                >
                                    <option value="Player">Player</option>
                                    <option value="Scout">Scout</option>
                                    <option value="Agent">Agent</option>
                                    <option value="Club">Club</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            {/* Nationality (react-select) */}
                            <div>
                                <label className="text-xs uppercase tracking-wide text-[#94A3B8] block mb-1">
                                    Nationality
                                </label>
                                <Select
                                    name="nationality"
                                    options={countryOptions}
                                    defaultValue={countryOptions.find(
                                        (o) => o.value === user.nationality
                                    )}
                                    isSearchable
                                    styles={selectStyles}
                                    className="text-sm"
                                    onChange={(selected) => {
                                        const hiddenInput = document.querySelector<HTMLInputElement>(
                                            'input[name="nationality"]'
                                        );
                                        if (hiddenInput) {
                                            hiddenInput.value = selected?.value || '';
                                        }
                                    }}
                                />
                                <input type="hidden" name="nationality" defaultValue={user.nationality} />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-xs uppercase tracking-wide text-[#94A3B8] block mb-1">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    defaultValue={user.status}
                                    className="h-9 w-full rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-2 text-sm text-[#F5F5F5] focus:border-[#FF6B00] focus:outline-none"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Suspended">Suspended</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-[#2A2A2A]">
                                <Button
                                    type="submit"
                                    className="bg-[#FF6B00] hover:bg-[#CC5500] text-white font-medium text-sm h-9 px-6"
                                >
                                    Update User
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
