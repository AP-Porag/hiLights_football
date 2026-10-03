<?php

return [
    'ui' => [
        'legal_center' => 'Legal Center',
        'index_title' => 'Legal & Policies',
        'index_subtitle' => 'Everything you need to know about how HiLights Football operates, protects your data and handles your subscription.',
        'last_updated' => 'Last updated',
        'effective_date' => 'Effective',
        'version' => 'Version',
        'on_this_page' => 'On this page',
        'read_time' => ':min min read',
        'read_document' => 'Read document',
        'language' => 'Language',
        'questions_title' => 'Questions about this document?',
        'questions_body' => 'Our legal and privacy team responds to all enquiries within 5 business days.',
        'contact_us' => 'Contact legal team',
        'or_email' => 'Or write to us at',
        'related' => 'Related documents',
        'print' => 'Print',
        'sections_count' => ':count sections',
        'sponsored' => 'Sponsored',
        'translation_notice' => 'In case of any discrepancy between translations, the English version prevails.',
    ],

    'documents' => [
        'privacy-policy' => [
            'title' => 'Privacy Policy',
            'summary' => 'How HiLights Football collects, uses, shares and protects personal data across our player, scout, agent and club portals.',
            'sections' => [
                [
                    'id' => 'introduction',
                    'heading' => 'Introduction',
                    'paragraphs' => [
                        'HiLights Football ("HiLights", "we", "us") operates a football player discovery and scouting platform that connects players with scouts, agents and clubs. This Privacy Policy explains what personal data we process when you visit our website, create an account or purchase a subscription, and the choices you have.',
                        'HiLights Football is the data controller for the personal data described in this policy. We process data in line with the EU General Data Protection Regulation (GDPR), the UK GDPR, the Brazilian General Data Protection Law (LGPD) and other applicable privacy laws.',
                    ],
                ],
                [
                    'id' => 'information-we-collect',
                    'heading' => 'Information We Collect',
                    'paragraphs' => [
                        'We collect information you provide directly, information generated when you use the platform, and limited information from trusted third parties.',
                    ],
                    'items' => [
                        'Account data: name, email address, password (stored hashed), role (Player, Scout, Agent or Club) and preferred language.',
                        'Player profile data: date of birth, nationality, position, preferred foot, height, weight, club history, statistics, highlight videos and photos.',
                        'Professional data: organisation, licence or accreditation details and areas of interest for scouts, agents and clubs.',
                        'Scout ratings and notes: evaluations across Technical, Physical, Tactical and Mental dimensions submitted by verified scouts.',
                        'Payment data: billing details processed by Stripe. We never store full card numbers on our servers.',
                        'Usage data: IP address, device and browser type, pages viewed, search filters and interaction logs.',
                    ],
                ],
                [
                    'id' => 'how-we-use',
                    'heading' => 'How We Use Your Information',
                    'paragraphs' => [
                        'We use personal data only for specific, legitimate purposes:',
                    ],
                    'items' => [
                        'To create and manage your account and display your profile to the audiences you choose.',
                        'To power search, filtering and discovery tools for scouts, agents and clubs.',
                        'To process subscriptions, payments and invoices.',
                        'To send service messages, security alerts and, with your consent, product updates.',
                        'To measure performance, prevent fraud and improve the platform.',
                        'To show advertising. Ads are contextual by default; personalised ads are only shown with your consent.',
                    ],
                    'closing' => [
                        'Our legal bases are performance of a contract, legitimate interests, compliance with legal obligations and, where required, your consent.',
                    ],
                ],
                [
                    'id' => 'sharing',
                    'heading' => 'How We Share Information',
                    'paragraphs' => [
                        'We do not sell your personal data. We share it only in the following cases:',
                    ],
                    'items' => [
                        'With other users, according to your profile visibility settings. Public player profiles can be viewed by registered scouts, agents and clubs.',
                        'With service providers that host, secure and support the platform, including Stripe for payments, under written data processing agreements.',
                        'With advertising and analytics partners, limited to aggregated or pseudonymised data unless you consent otherwise.',
                        'With authorities, when required by law or to protect the rights and safety of our users.',
                    ],
                ],
                [
                    'id' => 'minors',
                    'heading' => 'Players Under 18',
                    'paragraphs' => [
                        'Many talented players are minors. Users under 18 (or under the age of digital consent in their country) may only create a profile with verified consent from a parent or legal guardian.',
                        'For minors, contact details are never shown publicly, direct messaging is restricted to verified clubs and accredited scouts, and the guardian can request access, correction or deletion of the profile at any time.',
                    ],
                ],
                [
                    'id' => 'retention',
                    'heading' => 'Data Retention',
                    'paragraphs' => [
                        'We keep personal data only as long as your account is active or as needed to provide the service. When you delete your account, profile data is removed within 30 days. Billing records are retained for the period required by tax and accounting law, usually up to 10 years.',
                    ],
                ],
                [
                    'id' => 'security',
                    'heading' => 'Data Security',
                    'paragraphs' => [
                        'We use encryption in transit (TLS), hashed passwords, role-based access controls, regular backups and continuous monitoring. No system is completely secure, so we also encourage you to use a strong, unique password.',
                    ],
                ],
                [
                    'id' => 'your-rights',
                    'heading' => 'Your Rights',
                    'paragraphs' => [
                        'Depending on where you live, you have the right to:',
                    ],
                    'items' => [
                        'Access the personal data we hold about you and receive a copy.',
                        'Correct inaccurate or incomplete data.',
                        'Request deletion of your data.',
                        'Restrict or object to certain processing, including direct marketing.',
                        'Receive your data in a portable format.',
                        'Withdraw consent at any time, without affecting earlier processing.',
                    ],
                    'closing' => [
                        'You can exercise most rights from your account settings or by contacting us. You also have the right to lodge a complaint with your local data protection authority.',
                    ],
                ],
                [
                    'id' => 'international-transfers',
                    'heading' => 'International Transfers',
                    'paragraphs' => [
                        'Our users and service providers are located in several countries. When we transfer personal data outside your country, we rely on adequacy decisions, Standard Contractual Clauses or other safeguards recognised by applicable law.',
                    ],
                ],
                [
                    'id' => 'contact',
                    'heading' => 'Changes and Contact',
                    'paragraphs' => [
                        'We may update this policy from time to time. If changes are significant, we will notify you by email or through the platform before they take effect.',
                        'For any privacy question or request, contact our Data Protection Officer at :privacy_email.',
                    ],
                ],
            ],
        ],

        'terms-and-conditions' => [
            'title' => 'Terms & Conditions',
            'summary' => 'The rules that govern your access to and use of HiLights Football, including accounts, content, subscriptions and liability.',
            'sections' => [
                [
                    'id' => 'acceptance',
                    'heading' => 'Acceptance of Terms',
                    'paragraphs' => [
                        'By creating an account or using HiLights Football, you agree to these Terms & Conditions and our Privacy Policy. If you use the platform on behalf of a club, agency or other organisation, you confirm that you are authorised to accept these terms on its behalf.',
                    ],
                ],
                [
                    'id' => 'eligibility',
                    'heading' => 'Eligibility',
                    'paragraphs' => [
                        'You must be at least 18 years old to create an account on your own. Players under 18 may use the platform only with the consent and supervision of a parent or legal guardian, who accepts these terms on their behalf.',
                    ],
                ],
                [
                    'id' => 'accounts-roles',
                    'heading' => 'Accounts and Roles',
                    'paragraphs' => [
                        'Each account is assigned a role: Player, Scout, Agent or Club. You agree to:',
                    ],
                    'items' => [
                        'Provide accurate, current information and keep it up to date.',
                        'Keep your password confidential and notify us immediately of any unauthorised access.',
                        'Not create accounts for other people without their permission.',
                        'Complete verification when requested. Scouts, agents and clubs may need to provide proof of licence or affiliation.',
                    ],
                ],
                [
                    'id' => 'user-content',
                    'heading' => 'Your Content',
                    'paragraphs' => [
                        'You keep ownership of the videos, photos, statistics and other content you upload. By uploading content, you grant HiLights Football a worldwide, non-exclusive, royalty-free licence to host, display, process and promote it within the platform and its marketing channels.',
                        'You confirm that you hold all rights needed to upload the content, including the rights of other people who appear in it and of the competition or broadcaster where applicable.',
                    ],
                ],
                [
                    'id' => 'acceptable-use',
                    'heading' => 'Acceptable Use',
                    'paragraphs' => [
                        'You must not:',
                    ],
                    'items' => [
                        'Upload false, misleading or manipulated statistics or footage.',
                        'Impersonate a player, scout, agent, club or any other person.',
                        'Use the platform to contact minors outside approved channels or for any purpose other than legitimate football recruitment.',
                        'Scrape, copy or resell data from the platform without written permission.',
                        'Interfere with the security or operation of the service.',
                    ],
                ],
                [
                    'id' => 'subscriptions',
                    'heading' => 'Subscriptions and Payments',
                    'paragraphs' => [
                        'Some features require a paid Premium or Elite subscription. Prices are shown on our Pricing page and payments are processed securely by Stripe.',
                        'Subscriptions renew automatically at the end of each billing period until cancelled. Plan upgrades take effect immediately with prorated charges; downgrades apply at the next renewal. Refunds are handled according to our Refund & Cancellation Policy.',
                    ],
                ],
                [
                    'id' => 'ratings-disclaimer',
                    'heading' => 'Scout Ratings and Opportunities',
                    'paragraphs' => [
                        'Scout ratings, reports and profile statistics reflect the opinions of individual users or the information they provided. HiLights Football does not guarantee trials, contracts, transfers or any other professional outcome, and is not a party to any agreement between users.',
                    ],
                ],
                [
                    'id' => 'intellectual-property',
                    'heading' => 'Intellectual Property',
                    'paragraphs' => [
                        'The HiLights Football name, logo, software, design and databases are owned by HiLights Football or its licensors and protected by intellectual property laws. You may not copy, modify or distribute them without our prior written consent.',
                    ],
                ],
                [
                    'id' => 'liability',
                    'heading' => 'Limitation of Liability',
                    'paragraphs' => [
                        'The platform is provided "as is" and "as available". To the maximum extent permitted by law, HiLights Football is not liable for indirect or consequential losses, and our total liability for any claim is limited to the amount you paid us in the 12 months before the claim. Nothing in these terms limits rights you have under mandatory consumer law.',
                    ],
                ],
                [
                    'id' => 'termination-changes',
                    'heading' => 'Termination, Changes and Governing Law',
                    'paragraphs' => [
                        'You may close your account at any time. We may suspend or terminate accounts that breach these terms, after notice where reasonably possible.',
                        'We may update these terms; material changes will be notified at least 30 days in advance. These terms are governed by the laws of the jurisdiction where HiLights Football is registered, without prejudice to the consumer protection laws of your country of residence.',
                    ],
                ],
            ],
        ],

        'cookie-policy' => [
            'title' => 'Cookie Policy',
            'summary' => 'Which cookies and similar technologies we use, why we use them and how you can control them.',
            'sections' => [
                [
                    'id' => 'what-are-cookies',
                    'heading' => 'What Are Cookies',
                    'paragraphs' => [
                        'Cookies are small text files stored on your device when you visit a website. We also use similar technologies such as local storage and pixels. Together we call them "cookies" in this policy.',
                    ],
                ],
                [
                    'id' => 'types',
                    'heading' => 'Cookies We Use',
                    'paragraphs' => [
                        'We group cookies into four categories:',
                    ],
                    'items' => [
                        'Strictly necessary: keep you signed in, protect forms against CSRF attacks and secure payments. These cannot be switched off.',
                        'Preferences: remember your theme (light or dark) and preferred language.',
                        'Analytics: help us understand how the platform is used so we can improve it. Only set with your consent.',
                        'Advertising: measure ad performance and, with your consent, show more relevant ads from our partners.',
                    ],
                ],
                [
                    'id' => 'third-party',
                    'heading' => 'Third-Party Cookies',
                    'paragraphs' => [
                        'Some cookies are set by partners such as Stripe (payment security and fraud prevention), analytics providers and advertising partners. These partners process data according to their own privacy policies.',
                    ],
                ],
                [
                    'id' => 'managing',
                    'heading' => 'Managing Your Preferences',
                    'paragraphs' => [
                        'You can change your choices at any time through the cookie settings link in the footer. You can also block or delete cookies in your browser settings, but some features, such as staying signed in, may stop working.',
                    ],
                ],
                [
                    'id' => 'changes',
                    'heading' => 'Updates to This Policy',
                    'paragraphs' => [
                        'We review this policy regularly and will update the "Last updated" date whenever changes are made. Questions can be sent to :privacy_email.',
                    ],
                ],
            ],
        ],

        'refund-policy' => [
            'title' => 'Refund & Cancellation Policy',
            'summary' => 'How billing, cancellations and refunds work for Premium and Elite subscriptions.',
            'sections' => [
                [
                    'id' => 'overview',
                    'heading' => 'Overview',
                    'paragraphs' => [
                        'This policy applies to all paid subscriptions purchased on HiLights Football. Our goal is to keep billing transparent and fair for players, scouts, agents and clubs.',
                    ],
                ],
                [
                    'id' => 'billing',
                    'heading' => 'Billing Cycle',
                    'paragraphs' => [
                        'Subscriptions are billed in advance on a monthly or annual basis through Stripe. You will receive an email receipt after every successful payment and can download invoices from your account.',
                    ],
                ],
                [
                    'id' => 'cancellation',
                    'heading' => 'Cancelling Your Subscription',
                    'paragraphs' => [
                        'You can cancel at any time from the Subscription page in your account. After cancellation, you keep access to paid features until the end of the current billing period, and you will not be charged again.',
                    ],
                ],
                [
                    'id' => 'refunds',
                    'heading' => 'Refunds',
                    'paragraphs' => [
                        'Payments are generally non-refundable, except in the following cases:',
                    ],
                    'items' => [
                        'You were charged twice or incorrectly due to a technical error.',
                        'A paid feature was unavailable for an extended period because of a fault on our side.',
                        'An annual subscription renewed automatically and you request a refund within 7 days without having used paid features after the renewal.',
                        'You are entitled to a refund under mandatory consumer law.',
                    ],
                ],
                [
                    'id' => 'withdrawal',
                    'heading' => 'Statutory Right of Withdrawal',
                    'paragraphs' => [
                        'Where local law grants consumers a withdrawal period, such as 14 days in the EU and UK or 7 days in Brazil for online purchases, you may cancel within that period for a refund. Where permitted by law, if you start using paid features during this period, the refund may be reduced in proportion to the service already provided.',
                    ],
                ],
                [
                    'id' => 'how-to-request',
                    'heading' => 'How to Request a Refund',
                    'paragraphs' => [
                        'Email :support_email from the address linked to your account, including your invoice number and the reason for the request. We respond within 5 business days, and approved refunds are returned to the original payment method within 5 to 10 business days.',
                    ],
                ],
            ],
        ],
    ],
];
