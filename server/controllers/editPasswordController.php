<?php

require_once '../models/userModel.php';

$oldPasswordDb = $_POST['userOldPassword'];
$currentPassword = $_POST['currentPassword'];
$newPassword = $_POST['newPassword'];
$userId = $_POST['userId'];

if (!password_verify($currentPassword, $oldPasswordDb)) {
    http_response_code(401);
    echo json_encode([
        'verifing' => false,
        'message' => 'Erreur : Identifiants incorrects ...'
    ]);
    exit;
}

$passwordHash = password_hash($newPassword, PASSWORD_ARGON2ID);

$updatePassword = updatePassword($pdo, $userId, $passwordHash);

http_response_code($updatePassword['codeHttp']);
echo json_encode([
    'validating' => $updatePassword['validating'],
    'message' => $updatePassword['message'],
]);
