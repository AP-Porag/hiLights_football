<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>

<body style="margin:0; padding:0; background-color:#0D0D0D; font-family:'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
        style="background-color:#0D0D0D; padding:40px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="480" cellpadding="0" cellspacing="0"
                    style="max-width:480px; width:100%;">

                    {{-- Logo (text-based — image local dev-e broken thake) --}}
                    <tr>
                        <td align="center" style="padding-bottom:32px;">
                            <span style="font-size:24px; font-weight:900; font-style:italic; color:#F5F5F5;">
                                Hi<span style="color:#E53F01;">Lights</span>
                            </span>
                            <div
                                style="font-size:11px; font-weight:700; letter-spacing:0.1em; color:#9A9A9A; margin-top:2px;">
                                FOOTBALL
                            </div>
                        </td>
                    </tr>

                    {{-- Card --}}
                    <tr>
                        <td
                            style="background-color:#161616; border:1px solid #2A2A2A; border-radius:16px; padding:32px;">

                            {{-- Icon --}}
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding-bottom:20px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="56" height="56" align="center" valign="middle"
                                                    style="background-color:rgba(255,107,0,0.12); border-radius:50%; font-size:24px;">
                                                    🔒
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <h1
                                style="margin:0 0 12px; text-align:center; font-size:22px; font-weight:800; color:#F5F5F5;">
                                Reset Your Password
                            </h1>

                            <p
                                style="margin:0 0 8px; text-align:center; font-size:14px; line-height:1.6; color:#9A9A9A;">
                                Hi {{ $name }},
                            </p>

                            <p
                                style="margin:0 0 28px; text-align:center; font-size:14px; line-height:1.6; color:#9A9A9A;">
                                We received a request to reset the password for your HiLights Football account. Click
                                the button below to choose a new password.
                            </p>

                            {{-- Button --}}
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding-bottom:24px;">
                                        <a href="{{ $url }}"
                                            style="display:inline-block; background-color:#E53F01; color:#ffffff; font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; text-decoration:none; padding:14px 32px; border-radius:12px;">
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p
                                style="margin:0 0 8px; text-align:center; font-size:12px; line-height:1.6; color:#555555;">
                                This password reset link will expire in {{ $expireMinutes }} minutes.
                            </p>

                            <p style="margin:0; text-align:center; font-size:12px; line-height:1.6; color:#555555;">
                                If you did not request a password reset, no further action is required.
                            </p>

                            {{-- Divider --}}
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                style="margin:28px 0;">
                                <tr>
                                    <td style="border-top:1px solid #2A2A2A;"></td>
                                </tr>
                            </table>

                            <p
                                style="margin:0; text-align:center; font-size:11px; color:#555555; word-break:break-all;">
                                Or copy and paste this link into your browser:<br>
                                <a href="{{ $url }}"
                                    style="color:#E53F01; text-decoration:none;">{{ $url }}</a>
                            </p>

                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td align="center" style="padding-top:24px;">
                            <p style="margin:0; font-size:11px; color:#555555;">
                                &copy; {{ date('Y') }} HiLights Football. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>

</html>
