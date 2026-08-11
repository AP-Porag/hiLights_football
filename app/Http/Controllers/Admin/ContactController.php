<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/contact/Index', [
            'messages' => $messages,
        ]);
    }

    public function show($id)
    {
        $message = ContactMessage::findOrFail($id);
        // auto mark as read when viewed
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }
        return Inertia::render('admin/contact/Show', [
            'message' => $message,
        ]);
    }

    public function markAsRead($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->update(['is_read' => !$message->is_read]);
        return back()->with('success', 'Status updated.');
    }

    public function reply(Request $request, $id)
    {
        $request->validate([
            'reply' => 'required|string|max:5000',
        ]);

        $message = ContactMessage::findOrFail($id);

        // Send email reply
        Mail::raw($request->reply, function ($mail) use ($message) {
            $mail->to($message->email)
                ->subject('Re: ' . ($message->subject ?? 'Contact Form Message'))
                ->from(config('mail.from.address'), config('mail.from.name'));
        });

        // Mark as read and optionally store reply? We can log a reply in a new column, but we'll just mark read.
        $message->update(['is_read' => true]);

        return back()->with('success', 'Reply sent successfully.');
    }

    public function destroy($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();
        return back()->with('success', 'Message deleted.');
    }

    public function markAsReadOnly($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->update(['is_read' => true]);
        return back()->with('success', 'Marked as read.');
    }
}
