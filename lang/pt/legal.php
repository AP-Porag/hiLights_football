<?php

return [
    'ui' => [
        'legal_center' => 'Central Jurídica',
        'index_title' => 'Termos e Políticas',
        'index_subtitle' => 'Tudo o que você precisa saber sobre como a HiLights Football funciona, protege seus dados e gerencia sua assinatura.',
        'last_updated' => 'Última atualização',
        'effective_date' => 'Em vigor desde',
        'version' => 'Versão',
        'on_this_page' => 'Nesta página',
        'read_time' => ':min min de leitura',
        'read_document' => 'Ler documento',
        'language' => 'Idioma',
        'questions_title' => 'Dúvidas sobre este documento?',
        'questions_body' => 'Nossa equipe jurídica e de privacidade responde a todas as solicitações em até 5 dias úteis.',
        'contact_us' => 'Falar com a equipe jurídica',
        'or_email' => 'Ou escreva para',
        'related' => 'Documentos relacionados',
        'print' => 'Imprimir',
        'sections_count' => ':count seções',
        'sponsored' => 'Patrocinado',
        'translation_notice' => 'Em caso de divergência entre as traduções, prevalece a versão em inglês.',
    ],

    'documents' => [
        'privacy-policy' => [
            'title' => 'Política de Privacidade',
            'summary' => 'Como a HiLights Football coleta, usa, compartilha e protege dados pessoais nos portais de jogadores, olheiros, agentes e clubes.',
            'sections' => [
                [
                    'id' => 'introduction',
                    'heading' => 'Introdução',
                    'paragraphs' => [
                        'A HiLights Football ("HiLights", "nós") opera uma plataforma de descoberta e scouting de jogadores de futebol que conecta atletas a olheiros, agentes e clubes. Esta Política de Privacidade explica quais dados pessoais tratamos quando você visita nosso site, cria uma conta ou contrata uma assinatura, e quais escolhas você tem.',
                        'A HiLights Football é a controladora dos dados pessoais descritos nesta política. Tratamos dados de acordo com o Regulamento Geral sobre a Proteção de Dados da UE (GDPR), o UK GDPR, a Lei Geral de Proteção de Dados (LGPD) e demais leis de privacidade aplicáveis.',
                    ],
                ],
                [
                    'id' => 'information-we-collect',
                    'heading' => 'Informações que Coletamos',
                    'paragraphs' => [
                        'Coletamos informações que você nos fornece diretamente, informações geradas pelo uso da plataforma e informações limitadas de terceiros confiáveis.',
                    ],
                    'items' => [
                        'Dados da conta: nome, e-mail, senha (armazenada com hash), perfil (Jogador, Olheiro, Agente ou Clube) e idioma preferido.',
                        'Dados do perfil de jogador: data de nascimento, nacionalidade, posição, pé preferido, altura, peso, histórico de clubes, estatísticas, vídeos de destaques e fotos.',
                        'Dados profissionais: organização, licença ou credenciamento e áreas de interesse de olheiros, agentes e clubes.',
                        'Avaliações e notas de olheiros: avaliações nas dimensões Técnica, Física, Tática e Mental enviadas por olheiros verificados.',
                        'Dados de pagamento: dados de cobrança processados pela Stripe. Nunca armazenamos números completos de cartão em nossos servidores.',
                        'Dados de uso: endereço IP, tipo de dispositivo e navegador, páginas visitadas, filtros de busca e registros de interação.',
                    ],
                ],
                [
                    'id' => 'how-we-use',
                    'heading' => 'Como Usamos Suas Informações',
                    'paragraphs' => [
                        'Usamos dados pessoais apenas para finalidades específicas e legítimas:',
                    ],
                    'items' => [
                        'Criar e gerenciar sua conta e exibir seu perfil ao público que você escolher.',
                        'Viabilizar as ferramentas de busca, filtragem e descoberta para olheiros, agentes e clubes.',
                        'Processar assinaturas, pagamentos e faturas.',
                        'Enviar mensagens de serviço, alertas de segurança e, com seu consentimento, novidades do produto.',
                        'Medir desempenho, prevenir fraudes e melhorar a plataforma.',
                        'Exibir publicidade. Os anúncios são contextuais por padrão; anúncios personalizados só são exibidos com seu consentimento.',
                    ],
                    'closing' => [
                        'Nossas bases legais são a execução de contrato, o legítimo interesse, o cumprimento de obrigações legais e, quando exigido, o seu consentimento.',
                    ],
                ],
                [
                    'id' => 'sharing',
                    'heading' => 'Como Compartilhamos Informações',
                    'paragraphs' => [
                        'Não vendemos seus dados pessoais. Compartilhamos apenas nos seguintes casos:',
                    ],
                    'items' => [
                        'Com outros usuários, conforme as configurações de visibilidade do seu perfil. Perfis públicos de jogadores podem ser vistos por olheiros, agentes e clubes cadastrados.',
                        'Com prestadores de serviço que hospedam, protegem e dão suporte à plataforma, incluindo a Stripe para pagamentos, mediante contratos de tratamento de dados.',
                        'Com parceiros de publicidade e análise, limitado a dados agregados ou pseudonimizados, salvo consentimento em contrário.',
                        'Com autoridades, quando exigido por lei ou para proteger os direitos e a segurança dos nossos usuários.',
                    ],
                ],
                [
                    'id' => 'minors',
                    'heading' => 'Jogadores Menores de 18 Anos',
                    'paragraphs' => [
                        'Muitos jogadores talentosos são menores de idade. Usuários com menos de 18 anos (ou abaixo da idade de consentimento digital em seu país) só podem criar um perfil com o consentimento verificado de um dos pais ou responsável legal.',
                        'No caso de menores, os dados de contato nunca são exibidos publicamente, as mensagens diretas ficam restritas a clubes verificados e olheiros credenciados, e o responsável pode solicitar a qualquer momento o acesso, a correção ou a exclusão do perfil.',
                    ],
                ],
                [
                    'id' => 'retention',
                    'heading' => 'Retenção de Dados',
                    'paragraphs' => [
                        'Mantemos dados pessoais apenas enquanto sua conta estiver ativa ou pelo tempo necessário para prestar o serviço. Ao excluir sua conta, os dados do perfil são removidos em até 30 dias. Registros de cobrança são mantidos pelo prazo exigido pela legislação fiscal e contábil, geralmente de até 10 anos.',
                    ],
                ],
                [
                    'id' => 'security',
                    'heading' => 'Segurança dos Dados',
                    'paragraphs' => [
                        'Utilizamos criptografia em trânsito (TLS), senhas com hash, controle de acesso por perfil, backups regulares e monitoramento contínuo. Nenhum sistema é totalmente seguro, por isso recomendamos também que você use uma senha forte e exclusiva.',
                    ],
                ],
                [
                    'id' => 'your-rights',
                    'heading' => 'Seus Direitos',
                    'paragraphs' => [
                        'Dependendo de onde você mora, você tem o direito de:',
                    ],
                    'items' => [
                        'Acessar os dados pessoais que mantemos sobre você e receber uma cópia.',
                        'Corrigir dados incorretos ou incompletos.',
                        'Solicitar a exclusão dos seus dados.',
                        'Limitar ou se opor a determinados tratamentos, incluindo marketing direto.',
                        'Receber seus dados em formato portável.',
                        'Revogar o consentimento a qualquer momento, sem afetar o tratamento realizado anteriormente.',
                    ],
                    'closing' => [
                        'Você pode exercer a maioria desses direitos nas configurações da sua conta ou entrando em contato conosco. Você também tem o direito de apresentar reclamação à autoridade de proteção de dados do seu país, como a ANPD no Brasil.',
                    ],
                ],
                [
                    'id' => 'international-transfers',
                    'heading' => 'Transferências Internacionais',
                    'paragraphs' => [
                        'Nossos usuários e prestadores de serviço estão localizados em vários países. Quando transferimos dados pessoais para fora do seu país, utilizamos decisões de adequação, cláusulas contratuais padrão ou outras salvaguardas reconhecidas pela legislação aplicável.',
                    ],
                ],
                [
                    'id' => 'contact',
                    'heading' => 'Alterações e Contato',
                    'paragraphs' => [
                        'Podemos atualizar esta política periodicamente. Se as alterações forem relevantes, avisaremos por e-mail ou pela plataforma antes que entrem em vigor.',
                        'Para qualquer dúvida ou solicitação sobre privacidade, entre em contato com nosso Encarregado de Proteção de Dados (DPO) pelo e-mail :privacy_email.',
                    ],
                ],
            ],
        ],

        'terms-and-conditions' => [
            'title' => 'Termos e Condições',
            'summary' => 'As regras que regem seu acesso e uso da HiLights Football, incluindo contas, conteúdo, assinaturas e responsabilidade.',
            'sections' => [
                [
                    'id' => 'acceptance',
                    'heading' => 'Aceitação dos Termos',
                    'paragraphs' => [
                        'Ao criar uma conta ou usar a HiLights Football, você concorda com estes Termos e Condições e com nossa Política de Privacidade. Se você usa a plataforma em nome de um clube, agência ou outra organização, confirma que tem autorização para aceitar estes termos em nome dela.',
                    ],
                ],
                [
                    'id' => 'eligibility',
                    'heading' => 'Elegibilidade',
                    'paragraphs' => [
                        'Você deve ter pelo menos 18 anos para criar uma conta por conta própria. Jogadores menores de 18 anos só podem usar a plataforma com o consentimento e a supervisão de um dos pais ou responsável legal, que aceita estes termos em seu nome.',
                    ],
                ],
                [
                    'id' => 'accounts-roles',
                    'heading' => 'Contas e Perfis',
                    'paragraphs' => [
                        'Cada conta recebe um perfil: Jogador, Olheiro, Agente ou Clube. Você concorda em:',
                    ],
                    'items' => [
                        'Fornecer informações precisas e atualizadas e mantê-las em dia.',
                        'Manter sua senha em sigilo e nos avisar imediatamente sobre qualquer acesso não autorizado.',
                        'Não criar contas para outras pessoas sem a permissão delas.',
                        'Concluir a verificação quando solicitado. Olheiros, agentes e clubes podem precisar comprovar licença ou vínculo.',
                    ],
                ],
                [
                    'id' => 'user-content',
                    'heading' => 'Seu Conteúdo',
                    'paragraphs' => [
                        'Você continua sendo o titular dos vídeos, fotos, estatísticas e demais conteúdos que enviar. Ao enviar conteúdo, você concede à HiLights Football uma licença mundial, não exclusiva e gratuita para hospedá-lo, exibi-lo, processá-lo e promovê-lo na plataforma e em seus canais de marketing.',
                        'Você confirma que detém todos os direitos necessários para enviar o conteúdo, incluindo os direitos de outras pessoas que aparecem nele e, quando aplicável, da competição ou emissora.',
                    ],
                ],
                [
                    'id' => 'acceptable-use',
                    'heading' => 'Uso Aceitável',
                    'paragraphs' => [
                        'Você não deve:',
                    ],
                    'items' => [
                        'Enviar estatísticas ou imagens falsas, enganosas ou manipuladas.',
                        'Se passar por um jogador, olheiro, agente, clube ou qualquer outra pessoa.',
                        'Usar a plataforma para contatar menores fora dos canais autorizados ou para qualquer finalidade que não seja o recrutamento legítimo no futebol.',
                        'Extrair, copiar ou revender dados da plataforma sem autorização por escrito.',
                        'Interferir na segurança ou no funcionamento do serviço.',
                    ],
                ],
                [
                    'id' => 'subscriptions',
                    'heading' => 'Assinaturas e Pagamentos',
                    'paragraphs' => [
                        'Alguns recursos exigem uma assinatura paga Premium ou Elite. Os preços são exibidos na nossa página de Planos e os pagamentos são processados com segurança pela Stripe.',
                        'As assinaturas são renovadas automaticamente ao fim de cada período de cobrança até serem canceladas. Upgrades de plano entram em vigor imediatamente, com cobrança proporcional; downgrades se aplicam na próxima renovação. Reembolsos seguem nossa Política de Reembolso e Cancelamento.',
                    ],
                ],
                [
                    'id' => 'ratings-disclaimer',
                    'heading' => 'Avaliações de Olheiros e Oportunidades',
                    'paragraphs' => [
                        'Avaliações, relatórios e estatísticas de perfil refletem a opinião de usuários individuais ou as informações fornecidas por eles. A HiLights Football não garante testes, contratos, transferências ou qualquer outro resultado profissional e não é parte de nenhum acordo entre usuários.',
                    ],
                ],
                [
                    'id' => 'intellectual-property',
                    'heading' => 'Propriedade Intelectual',
                    'paragraphs' => [
                        'O nome, o logotipo, o software, o design e as bases de dados da HiLights Football pertencem à HiLights Football ou a seus licenciantes e são protegidos pelas leis de propriedade intelectual. Você não pode copiá-los, modificá-los ou distribuí-los sem nosso consentimento prévio por escrito.',
                    ],
                ],
                [
                    'id' => 'liability',
                    'heading' => 'Limitação de Responsabilidade',
                    'paragraphs' => [
                        'A plataforma é fornecida "no estado em que se encontra" e "conforme disponível". Na máxima extensão permitida por lei, a HiLights Football não se responsabiliza por perdas indiretas ou consequenciais, e nossa responsabilidade total por qualquer reclamação limita-se ao valor que você nos pagou nos 12 meses anteriores à reclamação. Nada nestes termos limita direitos garantidos pela legislação de defesa do consumidor.',
                    ],
                ],
                [
                    'id' => 'termination-changes',
                    'heading' => 'Encerramento, Alterações e Lei Aplicável',
                    'paragraphs' => [
                        'Você pode encerrar sua conta a qualquer momento. Podemos suspender ou encerrar contas que violem estes termos, com aviso prévio sempre que razoavelmente possível.',
                        'Podemos atualizar estes termos; alterações relevantes serão comunicadas com pelo menos 30 dias de antecedência. Estes termos são regidos pelas leis da jurisdição em que a HiLights Football está registrada, sem prejuízo das leis de proteção ao consumidor do seu país de residência.',
                    ],
                ],
            ],
        ],

        'cookie-policy' => [
            'title' => 'Política de Cookies',
            'summary' => 'Quais cookies e tecnologias semelhantes usamos, por que os usamos e como você pode controlá-los.',
            'sections' => [
                [
                    'id' => 'what-are-cookies',
                    'heading' => 'O Que São Cookies',
                    'paragraphs' => [
                        'Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Também usamos tecnologias semelhantes, como armazenamento local e pixels. Nesta política, chamamos todos de "cookies".',
                    ],
                ],
                [
                    'id' => 'types',
                    'heading' => 'Cookies Que Usamos',
                    'paragraphs' => [
                        'Agrupamos os cookies em quatro categorias:',
                    ],
                    'items' => [
                        'Estritamente necessários: mantêm você conectado, protegem formulários contra ataques CSRF e garantem a segurança dos pagamentos. Não podem ser desativados.',
                        'Preferências: lembram seu tema (claro ou escuro) e seu idioma preferido.',
                        'Análise: nos ajudam a entender como a plataforma é usada para que possamos melhorá-la. Só são ativados com seu consentimento.',
                        'Publicidade: medem o desempenho dos anúncios e, com seu consentimento, exibem anúncios mais relevantes dos nossos parceiros.',
                    ],
                ],
                [
                    'id' => 'third-party',
                    'heading' => 'Cookies de Terceiros',
                    'paragraphs' => [
                        'Alguns cookies são definidos por parceiros como a Stripe (segurança de pagamentos e prevenção de fraudes), provedores de análise e parceiros de publicidade. Esses parceiros tratam os dados de acordo com suas próprias políticas de privacidade.',
                    ],
                ],
                [
                    'id' => 'managing',
                    'heading' => 'Gerenciando Suas Preferências',
                    'paragraphs' => [
                        'Você pode alterar suas escolhas a qualquer momento pelo link de configurações de cookies no rodapé. Também é possível bloquear ou excluir cookies nas configurações do navegador, mas alguns recursos, como permanecer conectado, podem deixar de funcionar.',
                    ],
                ],
                [
                    'id' => 'changes',
                    'heading' => 'Atualizações Desta Política',
                    'paragraphs' => [
                        'Revisamos esta política regularmente e atualizaremos a data de "Última atualização" sempre que houver alterações. Dúvidas podem ser enviadas para :privacy_email.',
                    ],
                ],
            ],
        ],

        'refund-policy' => [
            'title' => 'Política de Reembolso e Cancelamento',
            'summary' => 'Como funcionam a cobrança, os cancelamentos e os reembolsos das assinaturas Premium e Elite.',
            'sections' => [
                [
                    'id' => 'overview',
                    'heading' => 'Visão Geral',
                    'paragraphs' => [
                        'Esta política se aplica a todas as assinaturas pagas contratadas na HiLights Football. Nosso objetivo é manter a cobrança transparente e justa para jogadores, olheiros, agentes e clubes.',
                    ],
                ],
                [
                    'id' => 'billing',
                    'heading' => 'Ciclo de Cobrança',
                    'paragraphs' => [
                        'As assinaturas são cobradas antecipadamente, em base mensal ou anual, por meio da Stripe. Você recebe um recibo por e-mail após cada pagamento aprovado e pode baixar as faturas na sua conta.',
                    ],
                ],
                [
                    'id' => 'cancellation',
                    'heading' => 'Cancelando Sua Assinatura',
                    'paragraphs' => [
                        'Você pode cancelar a qualquer momento na página de Assinatura da sua conta. Após o cancelamento, você mantém acesso aos recursos pagos até o fim do período de cobrança atual e não será cobrado novamente.',
                    ],
                ],
                [
                    'id' => 'refunds',
                    'heading' => 'Reembolsos',
                    'paragraphs' => [
                        'Os pagamentos, em geral, não são reembolsáveis, exceto nos seguintes casos:',
                    ],
                    'items' => [
                        'Você foi cobrado em duplicidade ou de forma incorreta devido a um erro técnico.',
                        'Um recurso pago ficou indisponível por um período prolongado devido a uma falha da nossa parte.',
                        'Uma assinatura anual foi renovada automaticamente e você solicita o reembolso em até 7 dias, sem ter usado recursos pagos após a renovação.',
                        'Você tem direito a reembolso pela legislação de defesa do consumidor.',
                    ],
                ],
                [
                    'id' => 'withdrawal',
                    'heading' => 'Direito Legal de Arrependimento',
                    'paragraphs' => [
                        'Quando a legislação local garante ao consumidor um prazo de arrependimento, como 7 dias no Brasil para compras on-line (art. 49 do Código de Defesa do Consumidor) ou 14 dias na UE e no Reino Unido, você pode cancelar dentro desse prazo e receber o reembolso. Quando permitido por lei, se você começar a usar recursos pagos nesse período, o reembolso poderá ser reduzido proporcionalmente ao serviço já prestado.',
                    ],
                ],
                [
                    'id' => 'how-to-request',
                    'heading' => 'Como Solicitar um Reembolso',
                    'paragraphs' => [
                        'Envie um e-mail para :support_email a partir do endereço vinculado à sua conta, informando o número da fatura e o motivo da solicitação. Respondemos em até 5 dias úteis, e os reembolsos aprovados são devolvidos ao meio de pagamento original em 5 a 10 dias úteis.',
                    ],
                ],
            ],
        ],
    ],
];
