<?php

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['message' => "Erreur : Aucune donnée reçue"]);
    exit;
}

$email = $_GET['id'];
$password = $data['password'];
$username = trim($data['username']);
$age = $data['age'];
$gender = $data['identity'];

if ($email === null | $password === null |  $username === null | $age == null | $gender === null) {
    http_response_code(400);
    echo json_encode([
        'message' => 'Erreur : Une donnée est null',
        'email' => $email,
        'password' => $password,
        'username' => $username,
        'age' => $age,
        'gender' => $gender
    ]);
    exit;
}

static $reservedNames = ['admin', 'root', 'support', 'help', 'api', 'moderator'];
static $genders = ['M', 'F', 'NB', 'Private'];

if ($email && $password) {
    if (
        filter_var($email, FILTER_VALIDATE_EMAIL)
        && strlen($password) >= 8
        && preg_match('/\d/', $password) === 1
        && preg_match('/[a-z]/i', $password) === 1
    ) {
        $_POST['email'] = filter_var($email, FILTER_SANITIZE_EMAIL);
        $_POST['password'] = $password;
        if ($username && 3 < strlen($username) && strlen($username)  <= 20) {
            if (preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
                if (!in_array(strtolower($username), $reservedNames)) {
                    $_POST['username'] = $username;
                    if (is_numeric($age)) {
                        $_POST['age'] = $age;
                        if (in_array($gender, $genders)) {
                            $_POST['gender'] = $gender;
                        } else {
                            http_response_code(400);
                            echo json_encode(['message' => "Erreur : Genre non listé. Veuillez nous contacter si besoin."]);
                            exit;
                        }
                    } else {
                        http_response_code(400);
                        echo json_encode(['message' => "Erreur : L'age n'est pas dans le bon format"]);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode([
                        'message' => "Erreur : Ce nom d'utilisateur est réservé."
                    ]);
                    exit;
                }
            } else {
                http_response_code(400);
                echo json_encode(['message' => "Erreur : Seuls les caractères alphanumériques et l'underscore sont autorisés."]);
                exit;
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => "Erreur : La longueur doit être comprise entre 3 et 20 caractères."]);
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(['message' => "Erreur : Identifiants incorrect ..."]);
        exit;
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => "Erreur : Identifiants incorrect ..."]);
    exit;
}
