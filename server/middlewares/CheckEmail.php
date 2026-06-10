<?php

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? $_GET['id'];

if ($email) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_POST['email'] = filter_var($email, FILTER_SANITIZE_EMAIL);
    } else {
        http_response_code(400);
        echo json_encode(['erreur' => "email invalide ..."]);
        exit;
    }
} else {
    http_response_code(400);
    echo json_encode(['erreur' => "Identifiants incorrect ..."]);
    exit;
}
