<?php

require_once '../models/userModel.php';
require_once '../models/instrumentsModel.php';

$token = $_COOKIE['auth_token'] ?? null;

if (!$token) {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    http_response_code(401);
    echo json_encode(["isAuthenticate" => false, "message" => "Aucun token trouvé"]);
    exit;
}

$parts = explode('.', $token);

$jsonPayload = base64_decode(str_replace(
    ['-', '_', ''],
    ['+', '/', '='],
    $parts[1]
));

$payload = json_decode($jsonPayload, true);

$secretKey = getenv('MA_SUPER_CLEF_SECRETE') ?: ($_ENV['MA_SUPER_CLEF_SECRETE'] ?? '');

$signatureTest = hash_hmac(
    'sha256',
    $parts[0] . "." . $parts[1],
    $secretKey,
    true
);
$base64UrlSignatureTest = str_replace(
    ['+', '/', '='],
    ['-', '_', ''],
    base64_encode($signatureTest)
);

if ($base64UrlSignatureTest !== $parts[2]) {
    http_response_code(401);
    echo json_encode([
        "isAuthenticate" => false,
        "message" => "Token non conforme"
    ]);
    exit;
}

if (time() > $payload['exp']) {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    http_response_code(401);
    echo json_encode([
        "isAuthenticate" => false,
        "message" => "Token exipré"
    ]);
    exit;
}

$email = $payload['email'];

global $pdo;

$user = getUserByEmail($pdo, $email);
$profiUser = getUserProfil($pdo, $user['id']);
$firstLogin = isFirstLogin($pdo, $email);
$userInstruments = getUserInstruments($pdo, $user['id']);
$userInstrumentLvl = [];

foreach ($userInstruments as $userInstrument) {

    $userInstrumentLvl[] = [
        "instrument" => [
            "id" => $userInstrument['id'],
            "name" => $userInstrument['name']
        ],
        "lvl" => $userInstrument['lvl']
    ];
}

http_response_code(200);
echo json_encode([
    "isAuthenticated" => true,
    "user" => [
        "id" => (int)$user['id'],
        "email" => $user['email'],
        "username" => $user['username'],
        "avatarUrl" => $profiUser['avatar_url'],
        "age" => (int)$profiUser['age'],
        "birthday" => $profiUser['birthday'],
        "gender" => $profiUser['gender'],
        "language" => $profiUser['language'],
        "filterExplicit" => $profiUser['filter_explicit'],
        "isChildAccount" => (int)$profiUser['is_child_account'] === 1 ? true : false,
        "userInstruments" => $userInstrumentLvl
    ],
    "isFirstLogin" => $firstLogin
]);
