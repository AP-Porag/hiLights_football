<?php

return [
    'ui' => [
        'legal_center' => 'Centro Legal',
        'index_title' => 'Avisos y Políticas',
        'index_subtitle' => 'Todo lo que necesitas saber sobre cómo funciona HiLights Football, cómo protege tus datos y cómo gestiona tu suscripción.',
        'last_updated' => 'Última actualización',
        'effective_date' => 'En vigor desde',
        'version' => 'Versión',
        'on_this_page' => 'En esta página',
        'read_time' => ':min min de lectura',
        'read_document' => 'Leer documento',
        'language' => 'Idioma',
        'questions_title' => '¿Dudas sobre este documento?',
        'questions_body' => 'Nuestro equipo legal y de privacidad responde a todas las consultas en un plazo de 5 días hábiles.',
        'contact_us' => 'Contactar con el equipo legal',
        'or_email' => 'O escríbenos a',
        'related' => 'Documentos relacionados',
        'print' => 'Imprimir',
        'sections_count' => ':count secciones',
        'sponsored' => 'Patrocinado',
        'translation_notice' => 'En caso de discrepancia entre traducciones, prevalecerá la versión en inglés.',
    ],

    'documents' => [
        'privacy-policy' => [
            'title' => 'Política de Privacidad',
            'summary' => 'Cómo HiLights Football recopila, utiliza, comparte y protege los datos personales en sus portales para jugadores, ojeadores, agentes y clubes.',
            'sections' => [
                [
                    'id' => 'introduction',
                    'heading' => 'Introducción',
                    'paragraphs' => [
                        'HiLights Football («HiLights», «nosotros») opera una plataforma de descubrimiento y scouting de futbolistas que conecta a jugadores con ojeadores, agentes y clubes. Esta Política de Privacidad explica qué datos personales tratamos cuando visitas nuestro sitio web, creas una cuenta o contratas una suscripción, y qué opciones tienes.',
                        'HiLights Football es el responsable del tratamiento de los datos personales descritos en esta política. Tratamos los datos conforme al Reglamento General de Protección de Datos de la UE (RGPD), el UK GDPR, la Ley General de Protección de Datos de Brasil (LGPD) y demás leyes de privacidad aplicables.',
                    ],
                ],
                [
                    'id' => 'information-we-collect',
                    'heading' => 'Información que Recopilamos',
                    'paragraphs' => [
                        'Recopilamos la información que nos proporcionas directamente, la que se genera al usar la plataforma y una cantidad limitada de información de terceros de confianza.',
                    ],
                    'items' => [
                        'Datos de la cuenta: nombre, correo electrónico, contraseña (almacenada mediante hash), rol (Jugador, Ojeador, Agente o Club) e idioma preferido.',
                        'Datos del perfil de jugador: fecha de nacimiento, nacionalidad, posición, pierna hábil, altura, peso, historial de clubes, estadísticas, vídeos de jugadas destacadas y fotos.',
                        'Datos profesionales: organización, licencia o acreditación y áreas de interés de ojeadores, agentes y clubes.',
                        'Valoraciones y notas de ojeadores: evaluaciones en las dimensiones Técnica, Física, Táctica y Mental enviadas por ojeadores verificados.',
                        'Datos de pago: datos de facturación procesados por Stripe. Nunca almacenamos números de tarjeta completos en nuestros servidores.',
                        'Datos de uso: dirección IP, tipo de dispositivo y navegador, páginas visitadas, filtros de búsqueda y registros de interacción.',
                    ],
                ],
                [
                    'id' => 'how-we-use',
                    'heading' => 'Cómo Utilizamos tu Información',
                    'paragraphs' => [
                        'Utilizamos los datos personales solo para fines específicos y legítimos:',
                    ],
                    'items' => [
                        'Crear y gestionar tu cuenta y mostrar tu perfil al público que elijas.',
                        'Hacer funcionar las herramientas de búsqueda, filtrado y descubrimiento para ojeadores, agentes y clubes.',
                        'Procesar suscripciones, pagos y facturas.',
                        'Enviar mensajes del servicio, alertas de seguridad y, con tu consentimiento, novedades del producto.',
                        'Medir el rendimiento, prevenir el fraude y mejorar la plataforma.',
                        'Mostrar publicidad. Los anuncios son contextuales por defecto; los anuncios personalizados solo se muestran con tu consentimiento.',
                    ],
                    'closing' => [
                        'Nuestras bases legales son la ejecución de un contrato, el interés legítimo, el cumplimiento de obligaciones legales y, cuando sea necesario, tu consentimiento.',
                    ],
                ],
                [
                    'id' => 'sharing',
                    'heading' => 'Cómo Compartimos la Información',
                    'paragraphs' => [
                        'No vendemos tus datos personales. Solo los compartimos en los siguientes casos:',
                    ],
                    'items' => [
                        'Con otros usuarios, según la configuración de visibilidad de tu perfil. Los perfiles públicos de jugadores pueden ser vistos por ojeadores, agentes y clubes registrados.',
                        'Con proveedores de servicios que alojan, protegen y dan soporte a la plataforma, incluido Stripe para los pagos, en virtud de contratos de encargo de tratamiento.',
                        'Con socios de publicidad y analítica, limitado a datos agregados o seudonimizados salvo que consientas lo contrario.',
                        'Con las autoridades, cuando lo exija la ley o para proteger los derechos y la seguridad de nuestros usuarios.',
                    ],
                ],
                [
                    'id' => 'minors',
                    'heading' => 'Jugadores Menores de 18 Años',
                    'paragraphs' => [
                        'Muchos jugadores con talento son menores de edad. Los usuarios menores de 18 años (o por debajo de la edad de consentimiento digital en su país) solo pueden crear un perfil con el consentimiento verificado de su madre, padre o tutor legal.',
                        'En el caso de menores, los datos de contacto nunca se muestran públicamente, la mensajería directa se limita a clubes verificados y ojeadores acreditados, y el tutor puede solicitar en cualquier momento el acceso, la rectificación o la eliminación del perfil.',
                    ],
                ],
                [
                    'id' => 'retention',
                    'heading' => 'Conservación de Datos',
                    'paragraphs' => [
                        'Conservamos los datos personales solo mientras tu cuenta esté activa o durante el tiempo necesario para prestar el servicio. Cuando eliminas tu cuenta, los datos del perfil se borran en un plazo de 30 días. Los registros de facturación se conservan durante el plazo exigido por la normativa fiscal y contable, normalmente hasta 10 años.',
                    ],
                ],
                [
                    'id' => 'security',
                    'heading' => 'Seguridad de los Datos',
                    'paragraphs' => [
                        'Utilizamos cifrado en tránsito (TLS), contraseñas con hash, controles de acceso basados en roles, copias de seguridad periódicas y supervisión continua. Ningún sistema es completamente seguro, por lo que te recomendamos usar una contraseña robusta y única.',
                    ],
                ],
                [
                    'id' => 'your-rights',
                    'heading' => 'Tus Derechos',
                    'paragraphs' => [
                        'Según tu lugar de residencia, tienes derecho a:',
                    ],
                    'items' => [
                        'Acceder a los datos personales que tenemos sobre ti y recibir una copia.',
                        'Rectificar datos inexactos o incompletos.',
                        'Solicitar la supresión de tus datos.',
                        'Limitar u oponerte a determinados tratamientos, incluido el marketing directo.',
                        'Recibir tus datos en un formato portable.',
                        'Retirar tu consentimiento en cualquier momento, sin que ello afecte al tratamiento anterior.',
                    ],
                    'closing' => [
                        'Puedes ejercer la mayoría de estos derechos desde la configuración de tu cuenta o contactándonos. También tienes derecho a presentar una reclamación ante la autoridad de protección de datos de tu país.',
                    ],
                ],
                [
                    'id' => 'international-transfers',
                    'heading' => 'Transferencias Internacionales',
                    'paragraphs' => [
                        'Nuestros usuarios y proveedores se encuentran en varios países. Cuando transferimos datos personales fuera de tu país, nos basamos en decisiones de adecuación, cláusulas contractuales tipo u otras garantías reconocidas por la legislación aplicable.',
                    ],
                ],
                [
                    'id' => 'contact',
                    'heading' => 'Cambios y Contacto',
                    'paragraphs' => [
                        'Podemos actualizar esta política periódicamente. Si los cambios son importantes, te avisaremos por correo electrónico o a través de la plataforma antes de que entren en vigor.',
                        'Para cualquier consulta o solicitud sobre privacidad, contacta con nuestro Delegado de Protección de Datos en :privacy_email.',
                    ],
                ],
            ],
        ],

        'terms-and-conditions' => [
            'title' => 'Términos y Condiciones',
            'summary' => 'Las normas que rigen tu acceso y uso de HiLights Football, incluidas las cuentas, el contenido, las suscripciones y la responsabilidad.',
            'sections' => [
                [
                    'id' => 'acceptance',
                    'heading' => 'Aceptación de los Términos',
                    'paragraphs' => [
                        'Al crear una cuenta o utilizar HiLights Football, aceptas estos Términos y Condiciones y nuestra Política de Privacidad. Si utilizas la plataforma en nombre de un club, agencia u otra organización, confirmas que estás autorizado para aceptar estos términos en su nombre.',
                    ],
                ],
                [
                    'id' => 'eligibility',
                    'heading' => 'Requisitos de Edad',
                    'paragraphs' => [
                        'Debes tener al menos 18 años para crear una cuenta por tu cuenta. Los jugadores menores de 18 años solo pueden usar la plataforma con el consentimiento y la supervisión de su madre, padre o tutor legal, que acepta estos términos en su nombre.',
                    ],
                ],
                [
                    'id' => 'accounts-roles',
                    'heading' => 'Cuentas y Roles',
                    'paragraphs' => [
                        'A cada cuenta se le asigna un rol: Jugador, Ojeador, Agente o Club. Te comprometes a:',
                    ],
                    'items' => [
                        'Proporcionar información veraz y actualizada, y mantenerla al día.',
                        'Mantener tu contraseña en secreto y avisarnos de inmediato de cualquier acceso no autorizado.',
                        'No crear cuentas para otras personas sin su permiso.',
                        'Completar la verificación cuando se te solicite. Los ojeadores, agentes y clubes pueden tener que acreditar su licencia o afiliación.',
                    ],
                ],
                [
                    'id' => 'user-content',
                    'heading' => 'Tu Contenido',
                    'paragraphs' => [
                        'Conservas la titularidad de los vídeos, fotos, estadísticas y demás contenido que subas. Al subir contenido, concedes a HiLights Football una licencia mundial, no exclusiva y gratuita para alojarlo, mostrarlo, procesarlo y promocionarlo dentro de la plataforma y en sus canales de marketing.',
                        'Confirmas que tienes todos los derechos necesarios para subir el contenido, incluidos los de otras personas que aparezcan en él y, en su caso, los de la competición o el operador de televisión.',
                    ],
                ],
                [
                    'id' => 'acceptable-use',
                    'heading' => 'Uso Aceptable',
                    'paragraphs' => [
                        'No debes:',
                    ],
                    'items' => [
                        'Subir estadísticas o imágenes falsas, engañosas o manipuladas.',
                        'Hacerte pasar por un jugador, ojeador, agente, club o cualquier otra persona.',
                        'Usar la plataforma para contactar con menores fuera de los canales autorizados o con cualquier fin distinto del reclutamiento deportivo legítimo.',
                        'Extraer, copiar o revender datos de la plataforma sin autorización por escrito.',
                        'Interferir en la seguridad o el funcionamiento del servicio.',
                    ],
                ],
                [
                    'id' => 'subscriptions',
                    'heading' => 'Suscripciones y Pagos',
                    'paragraphs' => [
                        'Algunas funciones requieren una suscripción de pago Premium o Elite. Los precios se muestran en nuestra página de Planes y los pagos se procesan de forma segura a través de Stripe.',
                        'Las suscripciones se renuevan automáticamente al final de cada periodo de facturación hasta que se cancelan. Las mejoras de plan se aplican de inmediato con cargo prorrateado; los cambios a un plan inferior se aplican en la siguiente renovación. Los reembolsos se rigen por nuestra Política de Reembolso y Cancelación.',
                    ],
                ],
                [
                    'id' => 'ratings-disclaimer',
                    'heading' => 'Valoraciones de Ojeadores y Oportunidades',
                    'paragraphs' => [
                        'Las valoraciones, informes y estadísticas de perfil reflejan la opinión de usuarios individuales o la información que estos han facilitado. HiLights Football no garantiza pruebas, contratos, traspasos ni ningún otro resultado profesional, y no es parte de ningún acuerdo entre usuarios.',
                    ],
                ],
                [
                    'id' => 'intellectual-property',
                    'heading' => 'Propiedad Intelectual',
                    'paragraphs' => [
                        'El nombre, el logotipo, el software, el diseño y las bases de datos de HiLights Football pertenecen a HiLights Football o a sus licenciantes y están protegidos por las leyes de propiedad intelectual. No puedes copiarlos, modificarlos ni distribuirlos sin nuestro consentimiento previo por escrito.',
                    ],
                ],
                [
                    'id' => 'liability',
                    'heading' => 'Limitación de Responsabilidad',
                    'paragraphs' => [
                        'La plataforma se ofrece «tal cual» y «según disponibilidad». En la máxima medida permitida por la ley, HiLights Football no será responsable de pérdidas indirectas o consecuentes, y nuestra responsabilidad total por cualquier reclamación se limita al importe que nos hayas pagado en los 12 meses anteriores a la reclamación. Nada de lo dispuesto en estos términos limita los derechos que te otorga la normativa imperativa de protección de los consumidores.',
                    ],
                ],
                [
                    'id' => 'termination-changes',
                    'heading' => 'Resolución, Cambios y Legislación Aplicable',
                    'paragraphs' => [
                        'Puedes cerrar tu cuenta en cualquier momento. Podemos suspender o cancelar las cuentas que incumplan estos términos, con aviso previo siempre que sea razonablemente posible.',
                        'Podemos actualizar estos términos; los cambios sustanciales se notificarán con al menos 30 días de antelación. Estos términos se rigen por las leyes de la jurisdicción en la que está registrada HiLights Football, sin perjuicio de las leyes de protección de los consumidores de tu país de residencia.',
                    ],
                ],
            ],
        ],

        'cookie-policy' => [
            'title' => 'Política de Cookies',
            'summary' => 'Qué cookies y tecnologías similares utilizamos, para qué las usamos y cómo puedes controlarlas.',
            'sections' => [
                [
                    'id' => 'what-are-cookies',
                    'heading' => 'Qué Son las Cookies',
                    'paragraphs' => [
                        'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. También utilizamos tecnologías similares, como el almacenamiento local y los píxeles. En esta política nos referimos a todas ellas como «cookies».',
                    ],
                ],
                [
                    'id' => 'types',
                    'heading' => 'Cookies que Utilizamos',
                    'paragraphs' => [
                        'Agrupamos las cookies en cuatro categorías:',
                    ],
                    'items' => [
                        'Estrictamente necesarias: mantienen tu sesión iniciada, protegen los formularios frente a ataques CSRF y aseguran los pagos. No se pueden desactivar.',
                        'Preferencias: recuerdan tu tema (claro u oscuro) y tu idioma preferido.',
                        'Analíticas: nos ayudan a entender cómo se utiliza la plataforma para poder mejorarla. Solo se activan con tu consentimiento.',
                        'Publicidad: miden el rendimiento de los anuncios y, con tu consentimiento, muestran anuncios más relevantes de nuestros socios.',
                    ],
                ],
                [
                    'id' => 'third-party',
                    'heading' => 'Cookies de Terceros',
                    'paragraphs' => [
                        'Algunas cookies las establecen socios como Stripe (seguridad de pagos y prevención del fraude), proveedores de analítica y socios publicitarios. Estos socios tratan los datos conforme a sus propias políticas de privacidad.',
                    ],
                ],
                [
                    'id' => 'managing',
                    'heading' => 'Gestión de tus Preferencias',
                    'paragraphs' => [
                        'Puedes cambiar tus preferencias en cualquier momento desde el enlace de configuración de cookies del pie de página. También puedes bloquear o eliminar cookies desde la configuración de tu navegador, aunque algunas funciones, como mantener la sesión iniciada, podrían dejar de funcionar.',
                    ],
                ],
                [
                    'id' => 'changes',
                    'heading' => 'Actualizaciones de esta Política',
                    'paragraphs' => [
                        'Revisamos esta política con regularidad y actualizaremos la fecha de «Última actualización» cada vez que se realicen cambios. Puedes enviar tus dudas a :privacy_email.',
                    ],
                ],
            ],
        ],

        'refund-policy' => [
            'title' => 'Política de Reembolso y Cancelación',
            'summary' => 'Cómo funcionan la facturación, las cancelaciones y los reembolsos de las suscripciones Premium y Elite.',
            'sections' => [
                [
                    'id' => 'overview',
                    'heading' => 'Resumen',
                    'paragraphs' => [
                        'Esta política se aplica a todas las suscripciones de pago contratadas en HiLights Football. Nuestro objetivo es que la facturación sea transparente y justa para jugadores, ojeadores, agentes y clubes.',
                    ],
                ],
                [
                    'id' => 'billing',
                    'heading' => 'Ciclo de Facturación',
                    'paragraphs' => [
                        'Las suscripciones se facturan por adelantado, de forma mensual o anual, a través de Stripe. Recibirás un recibo por correo electrónico después de cada pago realizado correctamente y podrás descargar tus facturas desde tu cuenta.',
                    ],
                ],
                [
                    'id' => 'cancellation',
                    'heading' => 'Cancelar tu Suscripción',
                    'paragraphs' => [
                        'Puedes cancelar en cualquier momento desde la página de Suscripción de tu cuenta. Tras la cancelación, conservas el acceso a las funciones de pago hasta el final del periodo de facturación actual y no se te volverá a cobrar.',
                    ],
                ],
                [
                    'id' => 'refunds',
                    'heading' => 'Reembolsos',
                    'paragraphs' => [
                        'Por lo general, los pagos no son reembolsables, salvo en los siguientes casos:',
                    ],
                    'items' => [
                        'Se te ha cobrado dos veces o de forma incorrecta debido a un error técnico.',
                        'Una función de pago no estuvo disponible durante un periodo prolongado por un fallo de nuestra parte.',
                        'Una suscripción anual se renovó automáticamente y solicitas el reembolso en un plazo de 7 días sin haber usado funciones de pago tras la renovación.',
                        'Tienes derecho a un reembolso conforme a la normativa imperativa de consumo.',
                    ],
                ],
                [
                    'id' => 'withdrawal',
                    'heading' => 'Derecho Legal de Desistimiento',
                    'paragraphs' => [
                        'Cuando la legislación local concede a los consumidores un plazo de desistimiento, como 14 días en la UE y el Reino Unido o 7 días en Brasil para compras en línea, puedes cancelar dentro de ese plazo y obtener un reembolso. Cuando la ley lo permita, si empiezas a utilizar funciones de pago durante ese plazo, el reembolso podrá reducirse en proporción al servicio ya prestado.',
                    ],
                ],
                [
                    'id' => 'how-to-request',
                    'heading' => 'Cómo Solicitar un Reembolso',
                    'paragraphs' => [
                        'Escribe a :support_email desde la dirección asociada a tu cuenta, indicando el número de factura y el motivo de la solicitud. Respondemos en un plazo de 5 días hábiles y los reembolsos aprobados se devuelven al método de pago original en un plazo de 5 a 10 días hábiles.',
                    ],
                ],
            ],
        ],
    ],
];
