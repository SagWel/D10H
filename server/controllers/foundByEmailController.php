<?php

require_once '../models/userModel.php';

$email = $_POST['email'];

$user = getUserByEmail($pdo, $email);

if ($user) {
    $profiUser = getUserProfil($pdo, $user['id']);

    http_response_code(200);
    echo json_encode([
        "message" => "utilisateur déjà existant",
        "isFounded" => true
    ]);
    exit;
}

http_response_code(200);
echo json_encode([
    "message" => 'utilisateur non trouvé. Création autorisée',
    "isFounded" => false
]);
