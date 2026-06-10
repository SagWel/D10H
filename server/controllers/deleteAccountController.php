<?php

require_once '../models/userModel.php';

$email = $_POST['email'];
$password = $_POST['password'];

$user = getUserByEmail($pdo, $email);

if (!$user) {
    http_response_code(400);
    echo json_encode([
        'isDeleting' => false,
        'userId' => $user['id'],
        'mesage' => 'Utilisateur non trouvé. Suppression impossible'
    ]);
    exit;
}

if (!password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode([
        'erreur' => 'Identifiants incorrect ...'
    ]);
    exit;
}

$deleting = deleteAccount($pdo, $user['id']);

if ($deleting['isDeleting'] === false) {
    http_response_code($deleting['codeHttp']);
    echo json_encode([
        'isDeleting' => $deleting['isDeleting'],
        'userId' => $deleting['userId'],
        'message' => $deleting['message']
    ]);
    exit;
}

setcookie(
    "auth_token",
    '',
    [
        'expires' => time() - 86400,
        'path' => '/',
        'httponly' => true,
        'secure' => true,
        'samesite' => 'None'
    ]
);

http_response_code($deleting['codeHttp']);
echo json_encode([
    'isDeleting' => $deleting['isDeleting'],
    'userId' => $deleting['userId'],
    'message' => $deleting['message'],
    "isAuthenticated" => false,
    "user" => null,
    "isFirstLogin" => false
]);
