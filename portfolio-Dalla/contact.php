<?php
/**
 * Formulaire de contact sécurisé pour le portfolio de Diallo Dalla
 * Étudiant BUT Informatique - Cybersécurité
 */

// Configuration
$config = [
    'to_email' => 'diallo.dalla@edu.univ-paris13.fr',
    'from_email' => 'noreply@portfolio-diallo-dalla.fr',
    'subject_prefix' => '[Portfolio Diallo Dalla] ',
    'max_message_length' => 2000,
    'rate_limit_minutes' => 5,
    'max_attempts_per_ip' => 3
];

// Headers de sécurité
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Fonction de nettoyage et validation
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) && 
           !preg_match('/[<>"\']/', $email);
}

function validateName($name) {
    return preg_match('/^[a-zA-ZÀ-ÿ\s\-\']{2,50}$/', $name);
}

function isValidMessage($message) {
    global $config;
    return strlen($message) >= 10 && 
           strlen($message) <= $config['max_message_length'] &&
           !preg_match('/<script|javascript:|data:|vbscript:/i', $message);
}

// Traitement principal
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ['success' => false, 'message' => ''];
    $client_ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    
    try {
        // Récupération et validation des données
        $data = [
            'nom' => sanitizeInput($_POST['nom'] ?? ''),
            'prenom' => sanitizeInput($_POST['prenom'] ?? ''),
            'email' => sanitizeInput($_POST['email'] ?? ''),
            'sujet' => sanitizeInput($_POST['sujet'] ?? 'autre'),
            'message' => sanitizeInput($_POST['message'] ?? ''),
            'honeypot' => $_POST['honeypot'] ?? ''
        ];
        
        // Vérification anti-spam (honeypot)
        if (!empty($data['honeypot'])) {
            throw new Exception('Spam détecté.');
        }
        
        // Validation des champs requis
        if (empty($data['nom']) || empty($data['prenom']) || empty($data['email']) || empty($data['message'])) {
            throw new Exception('Tous les champs marqués d\'un * sont requis.');
        }
        
        // Validation spécifique
        if (!validateName($data['nom'])) {
            throw new Exception('Le nom contient des caractères invalides.');
        }
        
        if (!validateName($data['prenom'])) {
            throw new Exception('Le prénom contient des caractères invalides.');
        }
        
        if (!validateEmail($data['email'])) {
            throw new Exception('L\'adresse email n\'est pas valide.');
        }
        
        if (!isValidMessage($data['message'])) {
            throw new Exception('Le message doit contenir entre 10 et ' . $config['max_message_length'] . ' caractères.');
        }
        
        // Préparation de l'email
        $subject_map = [
            'alternance' => 'Opportunité d\'alternance',
            'stage' => 'Proposition de stage',
            'projet' => 'Collaboration projet',
            'autre' => 'Contact général'
        ];
        
        $email_subject = $config['subject_prefix'] . ($subject_map[$data['sujet']] ?? 'Contact');
        
        // Corps de l'email en HTML
        $email_body = generateEmailBody($data, $client_ip);
        
        // Headers de l'email
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . $config['from_email'],
            'Reply-To: ' . $data['email'],
            'X-Mailer: PHP/' . phpversion(),
            'X-Priority: 3',
            'X-Portfolio-Contact: Diallo-Dalla-Cybersecurity'
        ];
        
        // Envoi de l'email
        if (mail($config['to_email'], $email_subject, $email_body, implode("\r\n", $headers))) {
            $response['success'] = true;
            $response['message'] = 'Message envoyé avec succès! Je vous répondrai rapidement.';
            
            // Log du message réussi
            logMessage($data, $client_ip, 'SUCCESS');
            
        } else {
            throw new Exception('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
        }
        
    } catch (Exception $e) {
        $response['message'] = $e->getMessage();
        logMessage($data ?? [], $client_ip, 'ERROR: ' . $e->getMessage());
    }
    
    // Redirection pour formulaire classique
    $status = $response['success'] ? 'success' : 'error';
    $message = urlencode($response['message']);
    header("Location: contact.html?status=$status&message=$message");
    exit;
}

function generateEmailBody($data, $client_ip) {
    $timestamp = date('d/m/Y à H:i:s');
    
    return "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Nouveau contact - Portfolio Diallo Dalla</title>
        <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
            .header p { margin: 10px 0 0; opacity: 0.9; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #8b5cf6; border-radius: 8px; }
            .field-label { font-weight: 600; color: #1a1a2e; margin-bottom: 5px; display: block; }
            .field-value { color: #4b5563; }
            .message-box { background: #ffffff; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px; margin: 20px 0; }
            .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
            .cyber-accent { color: #8b5cf6; font-weight: 600; }
            .security-info { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🔐 Nouveau Contact Portfolio</h1>
                <p>Diallo Dalla - <span class='cyber-accent'>Cybersécurité</span></p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <span class='field-label'>👤 Nom complet:</span>
                    <div class='field-value'>" . htmlspecialchars($data['prenom'] . ' ' . $data['nom']) . "</div>
                </div>
                
                <div class='field'>
                    <span class='field-label'>📧 Email:</span>
                    <div class='field-value'>" . htmlspecialchars($data['email']) . "</div>
                </div>
                
                <div class='field'>
                    <span class='field-label'>🎯 Sujet:</span>
                    <div class='field-value'>" . htmlspecialchars($data['sujet']) . "</div>
                </div>
                
                <div class='message-box'>
                    <span class='field-label'>💬 Message:</span>
                    <div class='field-value'>" . nl2br(htmlspecialchars($data['message'])) . "</div>
                </div>
                
                <div class='security-info'>
                    <strong>🛡️ Informations de sécurité:</strong><br>
                    <strong>Date:</strong> $timestamp<br>
                    <strong>IP:</strong> $client_ip<br>
                    <strong>User-Agent:</strong> " . htmlspecialchars($_SERVER['HTTP_USER_AGENT'] ?? 'Non disponible') . "
                </div>
            </div>
            
            <div class='footer'>
                <p>Portfolio Cybersécurité - Diallo Dalla</p>
                <p>BUT Informatique - IUT de Villetaneuse</p>
                <p>🎓 Futur Ingénieur en Cybersécurité</p>
            </div>
        </div>
    </body>
    </html>";
}

function logMessage($data, $ip, $status) {
    $log_entry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $ip,
        'status' => $status,
        'email' => $data['email'] ?? 'N/A',
        'subject' => $data['sujet'] ?? 'N/A'
    ];
    
    $log_line = implode(' | ', $log_entry) . "\n";
    file_put_contents('contact_messages.log', $log_line, FILE_APPEND | LOCK_EX);
}

// Page de confirmation pour accès direct
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['status'])) {
    $status = $_GET['status'];
    $message = urldecode($_GET['message'] ?? '');
    
    echo "<!DOCTYPE html>
    <html lang='fr'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Contact - Portfolio Diallo Dalla</title>
        <style>
            body { font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; margin: 0; padding: 50px 20px; }
            .container { max-width: 600px; margin: 0 auto; text-align: center; }
            .status-box { background: rgba(255,255,255,0.1); padding: 40px; border-radius: 20px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
            .success { border-left: 5px solid #10b981; }
            .error { border-left: 5px solid #e94560; }
            .icon { font-size: 4rem; margin-bottom: 20px; }
            .success .icon { color: #10b981; }
            .error .icon { color: #e94560; }
            h1 { margin-bottom: 20px; font-size: 2rem; }
            p { font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; }
            .btn { display: inline-block; padding: 15px 30px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 12px; font-weight: 600; transition: all 0.3s ease; }
            .btn:hover { background: #7c3aed; transform: translateY(-2px); }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='status-box " . ($status === 'success' ? 'success' : 'error') . "'>
                <div class='icon'>" . ($status === 'success' ? '🚀' : '⚠️') . "</div>
                <h1>" . ($status === 'success' ? 'Message envoyé!' : 'Erreur') . "</h1>
                <p>" . htmlspecialchars($message) . "</p>
                <a href='index.html' class='btn'>🏠 Retour au portfolio</a>
            </div>
        </div>
    </body>
    </html>";
}
?>
