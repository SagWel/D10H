<?php

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['message' => "Erreur : Aucune donnée reçue"]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

if ($email && $password) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL) && strlen($password) > 7) {
        $_POST['email'] = filter_var($email, FILTER_SANITIZE_EMAIL);
        $_POST['password'] = $password;
    } else {
        http_response_code(400);
        echo json_encode(['erreur' => "Identifiants incorrect ..."]);
        exit;
    }
} else {
    http_response_code(400);
    echo json_encode(['erreur' => "Identifiants incorrect ..."]);
    exit;
}
