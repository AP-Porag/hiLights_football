import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    Check,
    X,
    Lock,
    Shield,
    CreditCard,
    Sparkles,
    Crown,
    Zap,
    Star,
    Award,
    Users,
    BarChart3,
    Video,
    Eye,
    MessageSquare,
    Globe,
    Headphones,
    TrendingUp,
    AlertTriangle,
    RotateCcw,
    User,
    CheckCircle,
    Binoculars,
    ShieldCheck,
} from 'lucide-react';
import PlayerNavbar from '@/components/player/PlayerNavbar';
import { useForm } from '@inertiajs/react';
// ── Stripe price IDs (nijer real price ID diye replace koro) ──
const PLAN_ONE_PRICE = 'price_1TsfD5HKtXG9R7bGyzR4H6C9'; // Premium
const PLAN_TWO_PRICE = 'price_1TsfDtHKtXG9R7bGVsNxRTT6'; // Elite
// TODO: name — auth theke ana jabe
const player = {
    name: 'Benjamin',
};
const freePlan = [
    'Public Profile',
    'Upload 1 Video',
    'Club History',
    'Competitions History',
    'Achievements',
];
const premiumPlan = [
    'Public Profile',
    'Upload 3 Videos',
    'Club History',
    'Competitions History',
    'Achievements',
    'HiLights Member Card with exclusive QR code',
    'Badge of Verified Profile',
    'Priority in Searches',
    'Consultancy for profile and video improvements',
];
const items = [
    {
        icon: Binoculars,
        title: 'MORE VISIBILITY',
        description: 'Get noticed by scouts and clubs worldwide.',
    },
    {
        icon: Users,
        title: 'BUILD YOUR STORY',
        description: 'Show your achievements and evolution as an athlete.',
    },
    {
        icon: Globe,
        title: 'CONNECT',
        description: 'Connect with the biggest football network.',
    },
    {
        icon: ShieldCheck,
        title: 'BE VERIFIED',
        description: 'Build credibility and boost your career.',
    },
];
export default function SubscriptionIndex() {
    const { current_plan, on_grace_period, is_cancelled, subscription_ends_at } = usePage<{
        current_plan: string | null;
        on_grace_period?: boolean;
        is_cancelled?: boolean;
        subscription_ends_at?: string | null;
    }>().props;
    const { post, processing } = useForm({});
    // cancel confirmation modal
    const [cancelOpen, setCancelOpen] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    // resume confirmation modal
    const [resumeOpen, setResumeOpen] = useState(false);
    const [resuming, setResuming] = useState(false);
    // premium = plan_one, elite = plan_two
    const disablePremium =
        current_plan === PLAN_ONE_PRICE || current_plan === PLAN_TWO_PRICE;
    const disableElite = current_plan === PLAN_TWO_PRICE;
    // Stripe price ID theke ekhon-er plan id (badge/"Current" thik korar jonno)
    const currentPlanId: 'free' | 'premium' | 'elite' =
        current_plan === PLAN_TWO_PRICE
            ? 'elite'
            : current_plan === PLAN_ONE_PRICE
                ? 'premium'
                : 'free';
    const currentPlanName =
        currentPlanId === 'elite'
            ? 'Elite plan'
            : currentPlanId === 'premium'
                ? 'Premium plan'
                : 'Free plan';
    const hasPlan = current_plan !== null;
    const endsAtText = subscription_ends_at
        ? new Date(subscription_ends_at).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : null;
    // Stripe checkout — from=subscription pathacchi (success-e ei page-e fire ashbe)
    const handleCheckout = (planName: string) => {
        console.log("Checkout clicked");
        post(route('subscription.checkout', { name: planName, from: 'subscription' }), {
            preserveScroll: true,
            // No need for onSuccess - Inertia::location() handles the redirect automatically
        });
    };
    // subscription cancel — grace period-e jabe (modal theke confirm hoy)
    const handleCancel = () => {
        setCancelling(true);
        router.post(
            route('subscription.cancel'),
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setCancelling(false);
                    setCancelOpen(false);
                },
            }
        );
    };
    // grace period theke abar resume (modal theke confirm hoy)
    const handleResume = () => {
        setResuming(true);
        router.post(
            route('subscription.resume'),
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setResuming(false);
                    setResumeOpen(false);
                },
            }
        );
    };
    return (
        <div className="min-h-screen bg-black">
            <PlayerNavbar />
            <main className="pt-16">
                {/* ====================== HERO HEADER ====================== */}
                <section className="bg-[#FF6B00] py-12 sm:py-16">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm">
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-white">
                                Welcome back, {player.name}
                            </span>
                        </div>
                        <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Your Subscription
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl font-sans text-base text-white/95 sm:text-lg lg:text-xl">
                            You're currently on the{' '}
                            <span className="font-bold underline decoration-white/40 underline-offset-4">
                                {currentPlanName}
                            </span>
                            . Upgrade to unlock your full potential.
                        </p>
                        {/* ── Cancel / Resume action (plan state onujayi) ── */}
                        {on_grace_period ? (
                            <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center justify-center gap-3 rounded-xl bg-white/15 px-5 py-4 backdrop-blur-sm sm:flex-row">
                                <span className="font-sans text-sm text-white">
                                    Your subscription has been cancelled. You'll keep full access
                                    {endsAtText ? ` until ${endsAtText}` : ' until the end of your billing period'}
                                    . You can resume anytime before then.
                                </span>
                                <button
                                    onClick={() => setResumeOpen(true)}
                                    className="shrink-0 rounded-lg bg-white px-4 py-1.5 font-sans text-sm font-semibold text-[#FF6B00] hover:bg-white/90"
                                >
                                    Resume Subscription
                                </button>
                            </div>
                        ) : hasPlan ? (
                            <div className="mx-auto mt-6 flex max-w-xl flex-col items-center justify-center gap-3 rounded-xl bg-white/15 px-5 py-3 backdrop-blur-sm sm:flex-row">
                                <span className="font-sans text-sm text-white">
                                    You're subscribed to the <strong>{currentPlanName}</strong>.
                                </span>
                                <button
                                    onClick={() => setCancelOpen(true)}
                                    className="shrink-0 rounded-lg border border-white/60 bg-transparent px-4 py-1.5 font-sans text-sm font-semibold text-white hover:bg-white/10"
                                >
                                    Cancel Subscription
                                </button>
                            </div>
                        ) : null}
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-xs text-white/90 sm:text-sm">
                            <div className="flex items-center gap-1.5">
                                <Check className="h-4 w-4" strokeWidth={3} />
                                <span>Cancel anytime</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Check className="h-4 w-4" strokeWidth={3} />
                                <span>14-day money-back guarantee</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Check className="h-4 w-4" strokeWidth={3} />
                                <span>Secure checkout</span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ====================== PRICING CARDS ====================== */}
                <section className="bg-black px-4 py-12 sm:py-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-10 text-center sm:mb-12">
                            <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#FF6B00]">
                                Choose your plan
                            </span>
                            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-[#F5F5F5] sm:text-4xl">
                                Built for serious athletes
                            </h2>
                            <p className="mx-auto mt-3 max-w-2xl font-sans text-sm text-[#9A9A9A] sm:text-base">
                                Pick the plan that matches your ambition.
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Free Profile */}
                            <div className="relative rounded-[20px] border border-gray-700 bg-black p-6 md:relative">
                                {currentPlanId === 'free' && (
                                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                                        <span className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-4 py-1 text-xs font-bold uppercase text-white">
                                            <Check className="h-3 w-3" strokeWidth={3} /> Active Plan
                                        </span>
                                    </div>
                                )}
                                <div className="mb-6 flex -translate-y-[85%] justify-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-600 bg-black">
                                        <User size={32} className="text-white" />
                                    </div>
                                </div>
                                <h3 className="mb-6 text-center text-2xl font-bold text-white uppercase italic">Free Profile</h3>
                                <div className="mb-8 space-y-3">
                                    {freePlan.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle size={18} className="text-green-500" />
                                            <span className="text-[#ececec]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    disabled
                                    className="w-full cursor-not-allowed rounded-xl border border-gray-500 py-3 font-bold uppercase text-white opacity-70 md:absolute md:bottom-6 md:left-1/2 md:w-[90%] md:-translate-x-1/2"
                                >
                                    {currentPlanId === 'free' ? 'Current Plan' : 'Free Plan'}
                                </button>
                            </div>
                            {/* Premium — 12 months fidelity (plan_one) */}
                            <div className="relative rounded-[20px] border border-orange-500 bg-black p-6">
                                {currentPlanId === 'premium' ? (
                                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                                        <span className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-4 py-1 text-xs font-bold uppercase text-white">
                                            <Check className="h-3 w-3" strokeWidth={3} /> Active Plan
                                        </span>
                                    </div>
                                ) : (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-[#e53f01] px-4 py-1 text-xs font-bold text-white uppercase">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-4 flex justify-center">
                                    <img src="/images/club-logo/hlf_logo.png" alt="logo" className="h-12 w-12" />
                                </div>
                                <h3 className="text-center text-2xl font-bold text-white uppercase italic">HiLights Premium</h3>
                                <p className="mb-6 text-center">
                                    <span className="text-[20px] font-semibold text-white">R$ <span className="pl-1 text-[30px] font-bold text-[#e73d00]">47</span></span>
                                    <span className="ml-2 text-sm text-white">/month</span>
                                    <span className="ml-4 text-xs text-orange-500">(12 months fidelity)</span>
                                </p>
                                <div className="mb-8 space-y-3">
                                    {premiumPlan.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle size={18} className="mt-1 shrink-0 text-green-500" />
                                            <span className="text-[#ececec]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={disablePremium ? undefined : () => handleCheckout('plan_one')}
                                    disabled={disablePremium}
                                    className={`w-full rounded-xl py-3 font-bold text-white uppercase transition ${disablePremium
                                        ? 'cursor-not-allowed bg-gray-600 opacity-50'
                                        : 'bg-[#e53f01] hover:bg-orange-600'
                                        }`}
                                >
                                    {disablePremium ? 'Already Subscribed' : 'Choose Premium'}
                                </button>
                            </div>
                            {/* Premium — no fidelity (plan_two) */}
                            <div className="relative rounded-[20px] border border-orange-500 bg-black p-6">
                                {currentPlanId === 'elite' && (
                                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                                        <span className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-4 py-1 text-xs font-bold uppercase text-white">
                                            <Check className="h-3 w-3" strokeWidth={3} /> Active Plan
                                        </span>
                                    </div>
                                )}
                                <div className="mb-4 flex justify-center">
                                    <img src="/images/club-logo/hlf_logo.png" alt="logo" className="h-12 w-12" />
                                </div>
                                <h3 className="text-center text-2xl font-bold text-white uppercase italic">HiLights Premium</h3>
                                <p className="mb-6 text-center">
                                    <span className="text-[20px] font-semibold text-white">R$ <span className="pl-1 text-[30px] font-bold text-[#e73d00]">94</span></span>
                                    <span className="ml-2 text-sm text-white">/month</span>
                                    <span className="ml-6 text-xs text-orange-500">(no fidelity)</span>
                                </p>
                                <div className="mb-8 space-y-3">
                                    {premiumPlan.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle size={18} className="mt-1 shrink-0 text-green-500" />
                                            <span className="text-[#ececec]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={disableElite ? undefined : () => handleCheckout('plan_two')}
                                    disabled={disableElite}
                                    className={`w-full rounded-xl py-3 font-bold text-white uppercase transition ${disableElite
                                        ? 'cursor-not-allowed bg-gray-600 opacity-50'
                                        : 'bg-[#e53f01] hover:bg-orange-600'
                                        }`}
                                >
                                    {disableElite ? 'Already Subscribed' : 'Choose Premium'}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ====================== BENEFITS ====================== */}
                <section className="w-full bg-black px-4">
                    <div className="mx-auto max-w-7xl">
                        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#0b0b0b]">
                            <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-4">
                                {items.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`px-6 py-6 text-center transition-all duration-300 hover:bg-[#121212] ${index !== items.length - 1 ? 'border-zinc-800 lg:border-r-2' : ''}`}
                                        >
                                            <div className="flex justify-center">
                                                <Icon size={42} className="text-[#ff3500]" strokeWidth={2} />
                                            </div>
                                            <h3 className="mt-5 text-[18px] font-bold tracking-wide text-white">{item.title}</h3>
                                            <p className="mt-3 text-[14px] leading-6 text-[#d3d3d3]">{item.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
                {/* ====================== TRUST / SECURITY SECTION ====================== */}
                <section className="border-t border-[#2A2A2A] bg-black py-12 sm:py-16">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 sm:p-10">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(255,107,0,0.12)]">
                                        <Shield className="h-5 w-5 text-[#FF6B00]" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#F5F5F5]">
                                            Bank-level security
                                        </h3>
                                        <p className="mt-1.5 font-sans text-sm leading-relaxed text-[#9A9A9A]">
                                            256-bit SSL encryption. PCI-DSS Level 1 compliant. Your payment details are never stored on our servers.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(255,107,0,0.12)]">
                                        <CreditCard className="h-5 w-5 text-[#FF6B00]" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#F5F5F5]">
                                            Cancel anytime
                                        </h3>
                                        <p className="mt-1.5 font-sans text-sm leading-relaxed text-[#9A9A9A]">
                                            No contracts, no commitments. Cancel from your dashboard in one click — keep access until your billing period ends.
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(255,107,0,0.12)]">
                                        <Award className="h-5 w-5 text-[#FF6B00]" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#F5F5F5]">
                                            14-day guarantee
                                        </h3>
                                        <p className="mt-1.5 font-sans text-sm leading-relaxed text-[#9A9A9A]">
                                            Not happy? Get a full refund within 14 days of upgrading. No questions asked, no hassle.
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                            <div className="mt-10 border-t border-[#2A2A2A] pt-8">
                                <p className="text-center font-mono text-[11px] font-medium uppercase tracking-widest text-[#555555]">
                                    Secure payments powered by
                                </p>
                                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
                                    <div className="flex items-center gap-2 rounded-md border border-[#2A2A2A] bg-[#1F1F1F] px-4 py-2.5">
                                        <span className="font-display text-lg font-bold italic tracking-tight text-[#635BFF]">
                                            stripe
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center rounded-md border border-[#2A2A2A] bg-[#1F1F1F] px-4 py-2.5">
                                        <span className="font-display text-base font-bold italic tracking-wider text-[#C7CBF5]">
                                            VISA
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-0 rounded-md border border-[#2A2A2A] bg-[#1F1F1F] px-3 py-2.5">
                                        <div className="h-5 w-5 rounded-full bg-[#EB001B]" />
                                        <div className="-ml-2 h-5 w-5 rounded-full bg-[#F79E1B] opacity-90" />
                                        <span className="ml-2 font-sans text-[10px] font-bold uppercase tracking-wider text-[#F5F5F5]">
                                            Mastercard
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-8 text-center font-sans text-xs text-[#555555]">
                                Questions about billing?{' '}
                                <Link
                                    href="/support"
                                    className="font-semibold text-[#FF6B00] hover:text-[#CC5500] hover:underline"
                                >
                                    Contact our support team
                                </Link>{' '}
                                — we typically respond within 2 hours.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            {/* ====================== CANCEL CONFIRMATION MODAL ====================== */}
            {cancelOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={() => !cancelling && setCancelOpen(false)}
                >
                    <div
                        className="w-full max-w-md rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,107,0,0.12)]">
                                    <AlertTriangle className="h-5 w-5 text-[#FF6B00]" />
                                </div>
                                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#F5F5F5]">
                                    Cancel Subscription
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => !cancelling && setCancelOpen(false)}
                                className="text-[#94A3B8] hover:text-[#F5F5F5]"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="mt-4 font-sans text-sm leading-relaxed text-[#9A9A9A]">
                            Are you sure you want to cancel your subscription? You will keep full
                            access to all your plan features
                            {endsAtText ? ` until ${endsAtText}` : ' until the end of your current billing period'}
                            . After that, your account will move back to the Free plan.
                        </p>
                        <p className="mt-3 font-sans text-sm leading-relaxed text-[#9A9A9A]">
                            You can resume your subscription anytime before it ends.
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setCancelOpen(false)}
                                disabled={cancelling}
                                className="rounded-lg border border-[#2A2A2A] bg-transparent px-5 py-2.5 font-sans text-sm font-semibold text-[#F5F5F5] hover:bg-[#1F1F1F] disabled:opacity-60"
                            >
                                Keep Subscription
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={cancelling}
                                className="rounded-lg bg-[#FF6B00] px-5 py-2.5 font-sans text-sm font-semibold text-white hover:bg-[#CC5500] disabled:opacity-60"
                            >
                                {cancelling ? 'Cancelling...' : 'Yes, Cancel Subscription'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ====================== RESUME CONFIRMATION MODAL ====================== */}
            {resumeOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={() => !resuming && setResumeOpen(false)}
                >
                    <div
                        className="w-full max-w-md rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,107,0,0.12)]">
                                    <RotateCcw className="h-5 w-5 text-[#FF6B00]" />
                                </div>
                                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#F5F5F5]">
                                    Resume Subscription
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => !resuming && setResumeOpen(false)}
                                className="text-[#94A3B8] hover:text-[#F5F5F5]"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="mt-4 font-sans text-sm leading-relaxed text-[#9A9A9A]">
                            Do you want to resume your subscription? Your plan will stay active and
                            billing will continue as normal
                            {endsAtText ? ` from ${endsAtText}` : ' from your next billing date'}
                            . You won't be charged anything extra right now.
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setResumeOpen(false)}
                                disabled={resuming}
                                className="rounded-lg border border-[#2A2A2A] bg-transparent px-5 py-2.5 font-sans text-sm font-semibold text-[#F5F5F5] hover:bg-[#1F1F1F] disabled:opacity-60"
                            >
                                Not Now
                            </button>
                            <button
                                type="button"
                                onClick={handleResume}
                                disabled={resuming}
                                className="rounded-lg bg-[#FF6B00] px-5 py-2.5 font-sans text-sm font-semibold text-white hover:bg-[#CC5500] disabled:opacity-60"
                            >
                                {resuming ? 'Resuming...' : 'Yes, Resume Subscription'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
