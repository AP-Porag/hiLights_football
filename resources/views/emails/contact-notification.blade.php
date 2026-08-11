<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
    <style>
        /* Gmail ও অন্যান্য ক্লায়েন্টের জন্য ইনলাইন CSS ব্যবহার করাই ভালো, তবে হেডারেও দেওয়া যেতে পারে */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7fc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            overflow: hidden;
            border: 1px solid #e9edf2;
        }
        .header {
            background: linear-gradient(135deg, #1e293b, #0f172a);
            padding: 30px 40px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .header p {
            color: #94a3b8;
            margin: 5px 0 0 0;
            font-size: 14px;
        }
        .content {
            padding: 40px 40px 30px 40px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 5px;
        }
        .sub-greeting {
            color: #475569;
            margin-top: 0;
            margin-bottom: 25px;
            font-size: 15px;
            border-bottom: 1px solid #eef2f6;
            padding-bottom: 15px;
        }
        .detail-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .detail-table tr {
            border-bottom: 1px solid #f1f5f9;
        }
        .detail-table td {
            padding: 12px 8px 12px 0;
            vertical-align: top;
            font-size: 15px;
            line-height: 1.6;
        }
        .detail-table .label {
            width: 80px;
            font-weight: 600;
            color: #334155;
            white-space: nowrap;
        }
        .detail-table .value {
            color: #0f172a;
            word-break: break-word;
        }
        .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #3b82f6;
            padding: 16px 20px;
            margin: 15px 0 10px 0;
            border-radius: 0 6px 6px 0;
            color: #1e293b;
            font-style: italic;
            line-height: 1.7;
        }
        .footer {
            background-color: #f8fafc;
            padding: 20px 40px;
            border-top: 1px solid #e9edf2;
            text-align: center;
            color: #64748b;
            font-size: 13px;
        }
        .footer a {
            color: #3b82f6;
            text-decoration: none;
        }
        .badge {
            display: inline-block;
            background-color: #dbeafe;
            color: #1e40af;
            font-size: 12px;
            font-weight: 600;
            padding: 2px 12px;
            border-radius: 20px;
            margin-left: 8px;
        }
        .btn {
            display: inline-block;
            background-color: #3b82f6;
            color: #ffffff;
            padding: 10px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
            margin-top: 10px;
        }
        @media only screen and (max-width: 480px) {
            .content, .header, .footer { padding-left: 20px; padding-right: 20px; }
            .detail-table td { display: block; padding: 6px 0; }
            .detail-table .label { width: auto; }
        }
    </style>
</head>
<body>

<div class="container">
    <!-- Header -->
    <div class="header">
        <h1>📨 New Contact Message</h1>
        <p>HiLights Football · Inquiry Notification</p>
    </div>

    <!-- Body -->
    <div class="content">
        <p class="greeting">Hello Admin,</p>
        <p class="sub-greeting">
            You have received a new message from the website contact form.
            <span class="badge">Unread</span>
        </p>

        <!-- সাবমিট করা ডেটা টেবিল আকারে -->
        <table class="detail-table">
            <tr>
                <td class="label">👤 Name</td>
                <td class="value"><strong>{{ $contact->name }}</strong></td>
            </tr>
            <tr>
                <td class="label">📧 Email</td>
                <td class="value">
                    <a href="mailto:{{ $contact->email }}" style="color:#3b82f6; text-decoration:none;">
                        {{ $contact->email }}
                    </a>
                </td>
            </tr>
            <tr>
                <td class="label">📌 Subject</td>
                <td class="value">
                    {{ $contact->subject ?? 'Not specified' }}
                </td>
            </tr>
            <tr>
                <td class="label">🕒 Sent at</td>
                <td class="value">
                    {{ $contact->created_at->format('F j, Y, g:i A') }}
                    ({{ $contact->created_at->diffForHumans() }})
                </td>
            </tr>
        </table>

        <!-- মেসেজ কন্টেন্ট -->
        <div style="margin-top: 20px;">
            <p style="font-weight:600; color:#0f172a; margin-bottom:4px;">💬 Message:</p>
            <div class="message-box">
                {{ $contact->message }}
            </div>
        </div>

        <!-- দ্রুত অ্যাকশন লিংক (ঐচ্ছিক) -->
        <div style="text-align: center; margin-top: 30px;">
            <a href="{{ url('/admin/messages/'.$contact->id) }}" class="btn">
                View in Dashboard →
            </a>
            <p style="font-size:12px; color:#94a3b8; margin-top:8px;">
                (If you haven't set up an admin panel yet, just ignore this link.)
            </p>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p style="margin:0;">
            &copy; {{ date('Y') }} <strong>HiLights Football</strong>. All rights reserved.
        </p>
        <p style="margin:5px 0 0 0; font-size:12px;">
            This is an automated notification. Please do not reply to this email.
        </p>
        <p style="margin:10px 0 0 0; font-size:12px;">
            <a href="{{ url('/') }}">Visit Website</a> · 
            <a href="mailto:{{ config('mail.admin_email') }}">Support</a>
        </p>
    </div>
</div>

</body>
</html>