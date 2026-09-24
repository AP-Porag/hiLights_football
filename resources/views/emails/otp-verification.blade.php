<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
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
                                                    ✉️
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <h1
                                style="margin:0 0 12px; text-align:center; font-size:22px; font-weight:800; color:#F5F5F5;">
                                Verify Your Email
                            </h1>

                            <p
                                style="margin:0 0 8px; text-align:center; font-size:14px; line-height:1.6; color:#9A9A9A;">
                                Hi {{ $name }},
                            </p>

                            <p
                                style="margin:0 0 28px; text-align:center; font-size:14px; line-height:1.6; color:#9A9A9A;">
                                Use the verification code below to confirm your email address and activate your HiLights
                                Football account.
                            </p>

                            {{-- OTP Code Box --}}
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding-bottom:24px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td
                                                    style="background-color:#111111; border:1px solid #E53F01; border-radius:12px; padding:18px 32px;">
                                                    <span
                                                        style="font-size:32px; font-weight:700; letter-spacing:10px; color:#E53F01; font-family:'Courier New', monospace;">
                                                        {{ $code }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <p
                                style="margin:0 0 8px; text-align:center; font-size:12px; line-height:1.6; color:#555555;">
                                This code will expire in 10 minutes.
                            </p>

                            <p style="margin:0; text-align:center; font-size:12px; line-height:1.6; color:#555555;">
                                If you did not create an account, no further action is required.
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
