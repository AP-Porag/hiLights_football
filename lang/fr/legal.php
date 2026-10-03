<?php

return [
    'ui' => [
        'legal_center' => "Centre juridique",
        'index_title' => "Mentions et politiques",
        'index_subtitle' => "Tout ce que vous devez savoir sur le fonctionnement de HiLights Football, la protection de vos données et la gestion de votre abonnement.",
        'last_updated' => "Dernière mise à jour",
        'effective_date' => "En vigueur depuis le",
        'version' => "Version",
        'on_this_page' => "Sur cette page",
        'read_time' => ":min min de lecture",
        'read_document' => "Lire le document",
        'language' => "Langue",
        'questions_title' => "Des questions sur ce document ?",
        'questions_body' => "Notre équipe juridique et confidentialité répond à toutes les demandes sous 5 jours ouvrés.",
        'contact_us' => "Contacter l'équipe juridique",
        'or_email' => "Ou écrivez-nous à",
        'related' => "Documents associés",
        'print' => "Imprimer",
        'sections_count' => ":count sections",
        'sponsored' => "Sponsorisé",
        'translation_notice' => "En cas de divergence entre les traductions, la version anglaise prévaut.",
    ],

    'documents' => [
        'privacy-policy' => [
            'title' => "Politique de confidentialité",
            'summary' => "Comment HiLights Football collecte, utilise, partage et protège les données personnelles sur ses espaces joueurs, recruteurs, agents et clubs.",
            'sections' => [
                [
                    'id' => 'introduction',
                    'heading' => "Introduction",
                    'paragraphs' => [
                        "HiLights Football (« HiLights », « nous ») exploite une plateforme de détection et de scouting de footballeurs qui met en relation les joueurs avec des recruteurs, des agents et des clubs. La présente politique explique quelles données personnelles nous traitons lorsque vous visitez notre site, créez un compte ou souscrivez un abonnement, ainsi que les choix dont vous disposez.",
                        "HiLights Football est responsable du traitement des données personnelles décrites dans la présente politique. Nous traitons les données conformément au Règlement général sur la protection des données (RGPD), au UK GDPR, à la loi générale brésilienne sur la protection des données (LGPD) et aux autres lois applicables en matière de vie privée.",
                    ],
                ],
                [
                    'id' => 'information-we-collect',
                    'heading' => "Informations que nous collectons",
                    'paragraphs' => [
                        "Nous collectons les informations que vous nous fournissez directement, celles générées par votre utilisation de la plateforme et un nombre limité d'informations provenant de tiers de confiance.",
                    ],
                    'items' => [
                        "Données de compte : nom, adresse e-mail, mot de passe (stocké sous forme hachée), rôle (Joueur, Recruteur, Agent ou Club) et langue préférée.",
                        "Données du profil joueur : date de naissance, nationalité, poste, pied fort, taille, poids, parcours en club, statistiques, vidéos de temps forts et photos.",
                        "Données professionnelles : organisation, licence ou accréditation et centres d'intérêt des recruteurs, agents et clubs.",
                        "Évaluations et notes des recruteurs : évaluations selon les dimensions Technique, Physique, Tactique et Mentale soumises par des recruteurs vérifiés.",
                        "Données de paiement : informations de facturation traitées par Stripe. Nous ne stockons jamais de numéros de carte complets sur nos serveurs.",
                        "Données d'utilisation : adresse IP, type d'appareil et de navigateur, pages consultées, filtres de recherche et journaux d'interaction.",
                    ],
                ],
                [
                    'id' => 'how-we-use',
                    'heading' => "Comment nous utilisons vos informations",
                    'paragraphs' => [
                        "Nous utilisons les données personnelles uniquement à des fins précises et légitimes :",
                    ],
                    'items' => [
                        "Créer et gérer votre compte et afficher votre profil auprès du public de votre choix.",
                        "Faire fonctionner les outils de recherche, de filtrage et de détection destinés aux recruteurs, agents et clubs.",
                        "Traiter les abonnements, les paiements et les factures.",
                        "Envoyer des messages de service, des alertes de sécurité et, avec votre consentement, des actualités produit.",
                        "Mesurer les performances, prévenir la fraude et améliorer la plateforme.",
                        "Afficher de la publicité. Les annonces sont contextuelles par défaut ; les annonces personnalisées ne s'affichent qu'avec votre consentement.",
                    ],
                    'closing' => [
                        "Nos bases légales sont l'exécution d'un contrat, l'intérêt légitime, le respect d'obligations légales et, lorsque cela est requis, votre consentement.",
                    ],
                ],
                [
                    'id' => 'sharing',
                    'heading' => "Comment nous partageons les informations",
                    'paragraphs' => [
                        "Nous ne vendons pas vos données personnelles. Nous les partageons uniquement dans les cas suivants :",
                    ],
                    'items' => [
                        "Avec les autres utilisateurs, selon les paramètres de visibilité de votre profil. Les profils publics des joueurs peuvent être consultés par les recruteurs, agents et clubs inscrits.",
                        "Avec les prestataires qui hébergent, sécurisent et assistent la plateforme, dont Stripe pour les paiements, dans le cadre d'accords de traitement des données.",
                        "Avec nos partenaires publicitaires et d'analyse, uniquement sous forme de données agrégées ou pseudonymisées, sauf consentement de votre part.",
                        "Avec les autorités, lorsque la loi l'exige ou pour protéger les droits et la sécurité de nos utilisateurs.",
                    ],
                ],
                [
                    'id' => 'minors',
                    'heading' => "Joueurs de moins de 18 ans",
                    'paragraphs' => [
                        "De nombreux joueurs talentueux sont mineurs. Les utilisateurs de moins de 18 ans (ou n'ayant pas atteint l'âge du consentement numérique dans leur pays) ne peuvent créer un profil qu'avec le consentement vérifié d'un parent ou d'un représentant légal.",
                        "Pour les mineurs, les coordonnées ne sont jamais affichées publiquement, la messagerie directe est réservée aux clubs vérifiés et aux recruteurs accrédités, et le représentant légal peut demander à tout moment l'accès, la rectification ou la suppression du profil.",
                    ],
                ],
                [
                    'id' => 'retention',
                    'heading' => "Conservation des données",
                    'paragraphs' => [
                        "Nous conservons les données personnelles uniquement tant que votre compte est actif ou aussi longtemps que nécessaire pour fournir le service. Lorsque vous supprimez votre compte, les données du profil sont effacées sous 30 jours. Les données de facturation sont conservées pendant la durée imposée par la réglementation fiscale et comptable, généralement jusqu'à 10 ans.",
                    ],
                ],
                [
                    'id' => 'security',
                    'heading' => "Sécurité des données",
                    'paragraphs' => [
                        "Nous utilisons le chiffrement en transit (TLS), des mots de passe hachés, un contrôle d'accès par rôle, des sauvegardes régulières et une surveillance continue. Aucun système n'étant totalement sûr, nous vous recommandons également d'utiliser un mot de passe robuste et unique.",
                    ],
                ],
                [
                    'id' => 'your-rights',
                    'heading' => "Vos droits",
                    'paragraphs' => [
                        "Selon votre lieu de résidence, vous avez le droit de :",
                    ],
                    'items' => [
                        "Accéder aux données personnelles que nous détenons à votre sujet et en recevoir une copie.",
                        "Rectifier des données inexactes ou incomplètes.",
                        "Demander l'effacement de vos données.",
                        "Limiter certains traitements ou vous y opposer, y compris la prospection commerciale.",
                        "Recevoir vos données dans un format portable.",
                        "Retirer votre consentement à tout moment, sans remettre en cause les traitements antérieurs.",
                    ],
                    'closing' => [
                        "Vous pouvez exercer la plupart de ces droits depuis les paramètres de votre compte ou en nous contactant. Vous avez également le droit d'introduire une réclamation auprès de l'autorité de protection des données de votre pays, comme la CNIL en France.",
                    ],
                ],
                [
                    'id' => 'international-transfers',
                    'heading' => "Transferts internationaux",
                    'paragraphs' => [
                        "Nos utilisateurs et nos prestataires sont situés dans plusieurs pays. Lorsque nous transférons des données personnelles hors de votre pays, nous nous appuyons sur des décisions d'adéquation, des clauses contractuelles types ou d'autres garanties reconnues par la loi applicable.",
                    ],
                ],
                [
                    'id' => 'contact',
                    'heading' => "Modifications et contact",
                    'paragraphs' => [
                        "Nous pouvons mettre à jour cette politique de temps à autre. En cas de modification importante, nous vous en informerons par e-mail ou via la plateforme avant son entrée en vigueur.",
                        "Pour toute question ou demande relative à la vie privée, contactez notre délégué à la protection des données à l'adresse :privacy_email.",
                    ],
                ],
            ],
        ],

        'terms-and-conditions' => [
            'title' => "Conditions générales d'utilisation",
            'summary' => "Les règles qui encadrent votre accès à HiLights Football et son utilisation, notamment les comptes, les contenus, les abonnements et la responsabilité.",
            'sections' => [
                [
                    'id' => 'acceptance',
                    'heading' => "Acceptation des conditions",
                    'paragraphs' => [
                        "En créant un compte ou en utilisant HiLights Football, vous acceptez les présentes Conditions générales d'utilisation ainsi que notre Politique de confidentialité. Si vous utilisez la plateforme pour le compte d'un club, d'une agence ou d'une autre organisation, vous confirmez être habilité à accepter ces conditions en son nom.",
                    ],
                ],
                [
                    'id' => 'eligibility',
                    'heading' => "Conditions d'âge",
                    'paragraphs' => [
                        "Vous devez avoir au moins 18 ans pour créer un compte par vous-même. Les joueurs de moins de 18 ans ne peuvent utiliser la plateforme qu'avec le consentement et sous la supervision d'un parent ou d'un représentant légal, qui accepte ces conditions en leur nom.",
                    ],
                ],
                [
                    'id' => 'accounts-roles',
                    'heading' => "Comptes et rôles",
                    'paragraphs' => [
                        "Chaque compte se voit attribuer un rôle : Joueur, Recruteur, Agent ou Club. Vous vous engagez à :",
                    ],
                    'items' => [
                        "Fournir des informations exactes et à jour, et les maintenir à jour.",
                        "Garder votre mot de passe confidentiel et nous signaler immédiatement tout accès non autorisé.",
                        "Ne pas créer de compte pour d'autres personnes sans leur autorisation.",
                        "Compléter la vérification lorsqu'elle vous est demandée. Les recruteurs, agents et clubs peuvent devoir justifier d'une licence ou d'une affiliation.",
                    ],
                ],
                [
                    'id' => 'user-content',
                    'heading' => "Vos contenus",
                    'paragraphs' => [
                        "Vous restez propriétaire des vidéos, photos, statistiques et autres contenus que vous publiez. En publiant un contenu, vous accordez à HiLights Football une licence mondiale, non exclusive et gratuite pour l'héberger, l'afficher, le traiter et le promouvoir sur la plateforme et ses canaux marketing.",
                        "Vous confirmez détenir tous les droits nécessaires à sa publication, y compris ceux des personnes qui y apparaissent et, le cas échéant, ceux de la compétition ou du diffuseur.",
                    ],
                ],
                [
                    'id' => 'acceptable-use',
                    'heading' => "Utilisation acceptable",
                    'paragraphs' => [
                        "Il vous est interdit de :",
                    ],
                    'items' => [
                        "Publier des statistiques ou des images fausses, trompeuses ou manipulées.",
                        "Usurper l'identité d'un joueur, d'un recruteur, d'un agent, d'un club ou de toute autre personne.",
                        "Utiliser la plateforme pour contacter des mineurs en dehors des canaux autorisés ou à toute autre fin que le recrutement sportif légitime.",
                        "Extraire, copier ou revendre des données de la plateforme sans autorisation écrite.",
                        "Porter atteinte à la sécurité ou au fonctionnement du service.",
                    ],
                ],
                [
                    'id' => 'subscriptions',
                    'heading' => "Abonnements et paiements",
                    'paragraphs' => [
                        "Certaines fonctionnalités nécessitent un abonnement payant Premium ou Elite. Les prix sont indiqués sur notre page Tarifs et les paiements sont traités de manière sécurisée par Stripe.",
                        "Les abonnements sont renouvelés automatiquement à la fin de chaque période de facturation jusqu'à leur résiliation. Le passage à une offre supérieure prend effet immédiatement avec une facturation au prorata ; le passage à une offre inférieure s'applique au renouvellement suivant. Les remboursements sont régis par notre Politique de remboursement et d'annulation.",
                    ],
                ],
                [
                    'id' => 'ratings-disclaimer',
                    'heading' => "Évaluations des recruteurs et opportunités",
                    'paragraphs' => [
                        "Les évaluations, rapports et statistiques de profil reflètent l'avis d'utilisateurs individuels ou les informations qu'ils ont fournies. HiLights Football ne garantit aucun essai, contrat, transfert ni aucun autre résultat professionnel, et n'est partie à aucun accord conclu entre utilisateurs.",
                    ],
                ],
                [
                    'id' => 'intellectual-property',
                    'heading' => "Propriété intellectuelle",
                    'paragraphs' => [
                        "Le nom, le logo, les logiciels, le design et les bases de données de HiLights Football appartiennent à HiLights Football ou à ses concédants de licence et sont protégés par le droit de la propriété intellectuelle. Vous ne pouvez pas les copier, les modifier ni les distribuer sans notre accord écrit préalable.",
                    ],
                ],
                [
                    'id' => 'liability',
                    'heading' => "Limitation de responsabilité",
                    'paragraphs' => [
                        "La plateforme est fournie « en l'état » et « selon disponibilité ». Dans toute la mesure permise par la loi, HiLights Football ne saurait être tenue responsable des pertes indirectes ou consécutives, et notre responsabilité totale au titre de toute réclamation est limitée au montant que vous nous avez versé au cours des 12 mois précédant la réclamation. Rien dans les présentes conditions ne limite les droits que vous confère le droit impératif de la consommation.",
                    ],
                ],
                [
                    'id' => 'termination-changes',
                    'heading' => "Résiliation, modifications et droit applicable",
                    'paragraphs' => [
                        "Vous pouvez fermer votre compte à tout moment. Nous pouvons suspendre ou résilier les comptes qui enfreignent ces conditions, après préavis lorsque cela est raisonnablement possible.",
                        "Nous pouvons mettre à jour ces conditions ; toute modification importante sera notifiée au moins 30 jours à l'avance. Les présentes conditions sont régies par le droit du pays où HiLights Football est immatriculée, sans préjudice des lois de protection des consommateurs de votre pays de résidence.",
                    ],
                ],
            ],
        ],

        'cookie-policy' => [
            'title' => "Politique relative aux cookies",
            'summary' => "Les cookies et technologies similaires que nous utilisons, leurs finalités et la manière de les contrôler.",
            'sections' => [
                [
                    'id' => 'what-are-cookies',
                    'heading' => "Qu'est-ce qu'un cookie ?",
                    'paragraphs' => [
                        "Les cookies sont de petits fichiers texte enregistrés sur votre appareil lorsque vous visitez un site web. Nous utilisons également des technologies similaires, comme le stockage local et les pixels. Dans la présente politique, nous les désignons tous sous le terme « cookies ».",
                    ],
                ],
                [
                    'id' => 'types',
                    'heading' => "Les cookies que nous utilisons",
                    'paragraphs' => [
                        "Nous classons les cookies en quatre catégories :",
                    ],
                    'items' => [
                        "Strictement nécessaires : ils maintiennent votre connexion, protègent les formulaires contre les attaques CSRF et sécurisent les paiements. Ils ne peuvent pas être désactivés.",
                        "Préférences : ils mémorisent votre thème (clair ou sombre) et votre langue préférée.",
                        "Mesure d'audience : ils nous aident à comprendre l'utilisation de la plateforme afin de l'améliorer. Ils ne sont déposés qu'avec votre consentement.",
                        "Publicité : ils mesurent la performance des annonces et, avec votre consentement, affichent des publicités plus pertinentes de nos partenaires.",
                    ],
                ],
                [
                    'id' => 'third-party',
                    'heading' => "Cookies tiers",
                    'paragraphs' => [
                        "Certains cookies sont déposés par des partenaires tels que Stripe (sécurité des paiements et prévention de la fraude), des fournisseurs de mesure d'audience et des partenaires publicitaires. Ces partenaires traitent les données conformément à leurs propres politiques de confidentialité.",
                    ],
                ],
                [
                    'id' => 'managing',
                    'heading' => "Gérer vos préférences",
                    'paragraphs' => [
                        "Vous pouvez modifier vos choix à tout moment via le lien « Paramètres des cookies » en pied de page. Vous pouvez également bloquer ou supprimer les cookies dans les paramètres de votre navigateur, mais certaines fonctionnalités, comme le maintien de la connexion, risquent de ne plus fonctionner.",
                    ],
                ],
                [
                    'id' => 'changes',
                    'heading' => "Mises à jour de cette politique",
                    'paragraphs' => [
                        "Nous révisons régulièrement cette politique et mettons à jour la date de « Dernière mise à jour » à chaque modification. Vous pouvez adresser vos questions à :privacy_email.",
                    ],
                ],
            ],
        ],

        'refund-policy' => [
            'title' => "Politique de remboursement et d'annulation",
            'summary' => "Fonctionnement de la facturation, des annulations et des remboursements des abonnements Premium et Elite.",
            'sections' => [
                [
                    'id' => 'overview',
                    'heading' => "Présentation",
                    'paragraphs' => [
                        "Cette politique s'applique à tous les abonnements payants souscrits sur HiLights Football. Notre objectif est de garantir une facturation transparente et équitable pour les joueurs, recruteurs, agents et clubs.",
                    ],
                ],
                [
                    'id' => 'billing',
                    'heading' => "Cycle de facturation",
                    'paragraphs' => [
                        "Les abonnements sont facturés à l'avance, mensuellement ou annuellement, via Stripe. Vous recevez un reçu par e-mail après chaque paiement réussi et pouvez télécharger vos factures depuis votre compte.",
                    ],
                ],
                [
                    'id' => 'cancellation',
                    'heading' => "Résilier votre abonnement",
                    'paragraphs' => [
                        "Vous pouvez résilier à tout moment depuis la page Abonnement de votre compte. Après la résiliation, vous conservez l'accès aux fonctionnalités payantes jusqu'à la fin de la période de facturation en cours et aucun nouveau prélèvement ne sera effectué.",
                    ],
                ],
                [
                    'id' => 'refunds',
                    'heading' => "Remboursements",
                    'paragraphs' => [
                        "Les paiements ne sont en principe pas remboursables, sauf dans les cas suivants :",
                    ],
                    'items' => [
                        "Vous avez été débité deux fois ou de manière incorrecte en raison d'une erreur technique.",
                        "Une fonctionnalité payante a été indisponible pendant une période prolongée en raison d'une défaillance de notre part.",
                        "Un abonnement annuel a été renouvelé automatiquement et vous demandez un remboursement dans les 7 jours, sans avoir utilisé de fonctionnalité payante depuis le renouvellement.",
                        "Vous avez droit à un remboursement en vertu du droit impératif de la consommation.",
                    ],
                ],
                [
                    'id' => 'withdrawal',
                    'heading' => "Droit légal de rétractation",
                    'paragraphs' => [
                        "Lorsque la législation locale accorde aux consommateurs un délai de rétractation, par exemple 14 jours dans l'UE et au Royaume-Uni ou 7 jours au Brésil pour les achats en ligne, vous pouvez annuler dans ce délai et être remboursé. Lorsque la loi le permet, si vous commencez à utiliser des fonctionnalités payantes pendant ce délai, le remboursement peut être réduit au prorata du service déjà fourni.",
                    ],
                ],
                [
                    'id' => 'how-to-request',
                    'heading' => "Demander un remboursement",
                    'paragraphs' => [
                        "Écrivez à :support_email depuis l'adresse associée à votre compte, en indiquant votre numéro de facture et le motif de votre demande. Nous répondons sous 5 jours ouvrés et les remboursements acceptés sont crédités sur le moyen de paiement d'origine sous 5 à 10 jours ouvrés.",
                    ],
                ],
            ],
        ],
    ],
];
