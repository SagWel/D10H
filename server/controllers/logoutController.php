<?php

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

http_response_code(200);
echo json_encode([
    "isAuthenticated" => false,
    "user" => null,
    "isFirstLogin" => false
]);
