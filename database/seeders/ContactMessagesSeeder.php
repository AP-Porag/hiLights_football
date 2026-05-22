<?php

namespace Database\Seeders;

use App\Models\ContactMessage;
use Illuminate\Database\Seeder;

class ContactMessagesSeeder extends Seeder
{
    public function run(): void
    {
        $messages = [
            ['name' => 'Patricia Almeida', 'email' => 'patricia@sportsfuture.com', 'subject' => 'partnership', 'message' => 'Hello, we are a Brazilian player agency representing 30+ young talents. We would like to discuss a potential platform partnership for showcasing our players. Please advise on next steps.', 'status' => 'in_progress'],
            ['name' => 'Ricardo Lima', 'email' => 'ricardo.lima@gmail.com', 'subject' => 'general', 'message' => 'My son is 14 years old and plays for a youth academy in Brazil. Can he create a profile on the platform? What are the rules for minors?', 'status' => 'resolved'],
            ['name' => 'Sarah Mitchell', 'email' => 'sarah@football-investments.uk', 'subject' => 'advertising', 'message' => 'Hi, we are interested in advertising on your platform. Could you send media kit and rate card for sidebar banner placement?', 'status' => 'new'],
            ['name' => 'Antonio Silva', 'email' => 'antonio.silva@scoutpro.pt', 'subject' => 'support', 'message' => 'I cannot access the saved players page after upgrading my subscription. Could someone please help me resolve this?', 'status' => 'resolved'],
            ['name' => 'Football Weekly', 'email' => 'press@footballweekly.com', 'subject' => 'press', 'message' => 'We are writing an article about scouting platforms for amateur players. Would your team be available for an interview next week?', 'status' => 'in_progress'],
            ['name' => 'João Pereira', 'email' => 'joao.pereira.99@email.com', 'subject' => 'support', 'message' => 'My video URL is not working on my profile. It is a YouTube link. Please check.', 'status' => 'resolved'],
            ['name' => 'Talent Hunter Magazine', 'email' => 'editor@talenthunter.com', 'subject' => 'partnership', 'message' => 'We would like to discuss a content partnership where we feature top players from your platform in our monthly magazine.', 'status' => 'new'],
            ['name' => 'Maria Costa', 'email' => 'maria.costa.parent@gmail.com', 'subject' => 'general', 'message' => 'How does the guardian-managed profile work for minors? Do I need to verify my identity?', 'status' => 'resolved'],
            ['name' => 'Diego Hernandez', 'email' => 'diego@hernandez-agency.com', 'subject' => 'partnership', 'message' => 'Soy agente con 15 jugadores en Argentina. ¿Podemos discutir un descuento para múltiples cuentas?', 'status' => 'in_progress'],
            ['name' => 'TechCorp Sports', 'email' => 'advertising@techcorp.com', 'subject' => 'advertising', 'message' => 'We want to run a 6-month banner campaign targeting scouts and agents. Please share rate card and demographic data.', 'status' => 'new'],
        ];

        foreach ($messages as $msg) {
            ContactMessage::create(array_merge($msg, [
                'ip_address' => rand(1, 255) . '.' . rand(0, 255) . '.' . rand(0, 255) . '.' . rand(1, 254),
                'created_at' => now()->subDays(rand(1, 30)),
            ]));
        }

        $this->command->info('✓ Created ' . count($messages) . ' contact messages');
    }
}
