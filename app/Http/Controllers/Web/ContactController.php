<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactNotification; // পরে তৈরি করব
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class ContactController extends Controller
{
    // public function index()
    // {
    //     return Inertia::render('Contact');
    // }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email'     => 'required|email|max:255',
            'subject'   => 'nullable|string|max:255',
            'message'   => 'required|string',
        ]);

        // ডেটাবেসে সংরক্ষণ
        $contact = ContactMessage::create($validated);

        // অ্যাডমিনকে ইমেইল পাঠান (কিউতে দিতে পারেন)
        Mail::to(config('mail.admin_email'))->send(new ContactNotification($contact));

        // Inertia দিয়ে সাফল্য মেসেজ সহ রিডাইরেক্ট
        return redirect()->back()->with('success', 'Message sent! We\'ll reply within 24 hours.');
    }
}
