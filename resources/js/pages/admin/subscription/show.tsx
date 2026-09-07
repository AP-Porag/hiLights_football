import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout.js';
import { GlobalConstant } from '@/utils/GlobalConstant';

const breadcrumbs = [
    {
        title: 'Subscription Details',
        href: '',
    },
];

const planLabel = (price) => {
    if (price === GlobalConstant.TIER_VIEW_ONLY_PRICE_ID) return 'View Only';
    if (price === GlobalConstant.TIER_FULL_ACCESS_PRICE_ID) return 'Full Access';
    return 'Trial';
};

const priceAmount = (price) => {
    if (price === GlobalConstant.TIER_VIEW_ONLY_PRICE_ID) return '$8.99';
    if (price === GlobalConstant.TIER_FULL_ACCESS_PRICE_ID) return '$12.99';
    return '$0.00';
};

const tabs = [
    { key: 'subscription', label: 'Subscription' },
    { key: 'card', label: 'Card Details' },
    { key: 'items', label: 'Subscription Items' },
];

export default function Show({ subscription }) {
    const [activeTab, setActiveTab] = useState('subscription');
    const user = subscription.user;
    const items = subscription.items || [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription Details" />
            <div className="min-h-full bg-[#0D0D0D] p-4">
                <h1 className="text-2xl font-bold mb-4 text-[#F5F5F5]">Subscription Details</h1>

                {/* Tabs */}
                <div className="mb-4 flex gap-1 border-b border-[#2A2A2A]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab.key
                                ? 'border-[#FF6B00] text-[#FF6B00]'
                                : 'border-transparent text-[#9A9A9A] hover:text-[#F5F5F5]'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Subscription Tab */}
                {activeTab === 'subscription' && (
                    <div className="bg-[#161616] border border-[#2A2A2A] shadow rounded p-6 space-y-3 text-[#F5F5F5]">
                        <div><strong className="text-[#9A9A9A] font-medium">User:</strong> {user?.name}</div>
                        <div><strong className="text-[#9A9A9A] font-medium">Email:</strong> {user?.email}</div>
                        <div><strong className="text-[#9A9A9A] font-medium">Status:</strong> {subscription.stripe_status}</div>
                        <div><strong className="text-[#9A9A9A] font-medium">Plan:</strong> {planLabel(subscription.stripe_price)}</div>
                        <div><strong className="text-[#9A9A9A] font-medium">Quantity:</strong> {subscription.quantity || '—'}</div>
                        <div><strong className="text-[#9A9A9A] font-medium">Trial Ends:</strong> {subscription.trial_ends_at ? new Date(subscription.trial_ends_at).toLocaleDateString() : '—'}</div>
                        <div><strong className="text-[#9A9A9A] font-medium">Ends At:</strong> {subscription.ends_at ? new Date(subscription.ends_at).toLocaleDateString() : '—'}</div>
                        <div><strong className="text-[#9A9A9A] font-medium">Created:</strong> {new Date(subscription.created_at).toLocaleString()}</div>
                    </div>
                )}

                {/* Card Details Tab */}
                {activeTab === 'card' && (
                    <div className="bg-[#161616] border border-[#2A2A2A] shadow rounded p-6 space-y-3 text-[#F5F5F5]">
                        {user?.pm_last_four ? (
                            <>
                                <div><strong className="text-[#9A9A9A] font-medium">Card Type:</strong> {user.pm_type ? user.pm_type.toUpperCase() : '—'}</div>
                                <div><strong className="text-[#9A9A9A] font-medium">Card Number:</strong> •••• •••• •••• {user.pm_last_four}</div>
                                <div><strong className="text-[#9A9A9A] font-medium">Billing Name:</strong> {user?.name || '—'}</div>
                                <div><strong className="text-[#9A9A9A] font-medium">Billing Email:</strong> {user?.email || '—'}</div>
                            </>
                        ) : (
                            <div className="text-sm text-[#555555]">No card information available.</div>
                        )}
                    </div>
                )}

                {/* Subscription Items Tab */}
                {activeTab === 'items' && (
                    <div className="bg-[#161616] border border-[#2A2A2A] shadow rounded p-6">
                        {items.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[#2A2A2A] text-left text-[#9A9A9A]">
                                            <th className="py-2 pr-4 font-medium">Plan</th>
                                            <th className="py-2 pr-4 font-medium">Product ID</th>
                                            <th className="py-2 pr-4 font-medium">Price ID</th>
                                            <th className="py-2 pr-4 font-medium">Price</th>
                                            <th className="py-2 pr-4 font-medium">Quantity</th>
                                            <th className="py-2 pr-4 font-medium">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.id} className="border-b border-[#2A2A2A] text-[#F5F5F5]">
                                                <td className="py-2 pr-4">{planLabel(item.stripe_price)}</td>
                                                <td className="py-2 pr-4 text-[#9A9A9A]">{item.stripe_product || '—'}</td>
                                                <td className="py-2 pr-4 text-[#9A9A9A]">{item.stripe_price || '—'}</td>
                                                <td className="py-2 pr-4">{priceAmount(item.stripe_price)}</td>
                                                <td className="py-2 pr-4">{item.quantity ?? '—'}</td>
                                                <td className="py-2 pr-4 whitespace-nowrap">
                                                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : '—'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-sm text-[#555555]">No subscription items found.</div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}