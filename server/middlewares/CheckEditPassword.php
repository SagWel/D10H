<?php

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['message' => "Erreur : Aucune donnée reçue"]);
    exit;
}

$stmt = $pdo->prepare('SELECT password FROM users WHERE id = ?');
$stmt->execute([$id]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    http_response_code(400);
    echo json_encode([
        'validating' => false,
        'message' => 'Erreur : Utilisateur non reconnu',
        '$id' => $id
    ]);
    exit;
}

$_POST['userOldPassword'] = $user['password'];

$currentPassword = $data['currentPassword'];
$newPassword = $data['newPassword'];

if (!is_string($currentPassword) || !is_string($newPassword)) {
    http_response_code(400);
    echo json_encode([
        'validating' => false,
        'message' => "Erreur : Les données envoyé ne sont pas dans le bon format"
    ]);
    exit;
}

$_POST['currentPassword'] = $currentPassword;

if (strlen($newPassword) < 8) {
    http_response_code(400);
    echo json_encode([
        'validating' => false,
        'message' => "Erreur : Les nouveau mot de passe doit faire une longueur minimum de 8 caractères"
    ]);
    exit;
}

if (!preg_match('/\d/', $newPassword)) {
    http_response_code(400);
    echo json_encode([
        'validating' => false,
        'message' => "Erreur : Les nouveau mot de passe doit contenir au moins un chiffre"
    ]);
    exit;
}

if (!preg_match('/[a-z]/i', $newPassword)) {
    http_response_code(400);
    echo json_encode([
        'validating' => false,
        'message' => "Erreur : Les nouveau mot de passe doit contenir au moins une lettre"
    ]);
    exit;
}

$_POST['newPassword'] = $newPassword;
