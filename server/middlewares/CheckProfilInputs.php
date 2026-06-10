<?php

$userId = $_GET['id'];
$username = $_POST['username'] ?? null;
$gender = $_POST['gender'] ?? null;
$avatar = $_FILES['avatar'] ?? null;
$birthday = $_POST['birthday'] ?? null;
$userInstruments = $_POST['userInstruments'] ?? null;

if (is_string($userInstruments)) {
    $userInstruments = json_decode($userInstruments, true);
}

if (!is_numeric($userId)) {
    http_response_code(400);
    echo json_encode(["erreur" => "L'identifiant doit être un nombre"]);
    exit;
}

if ($username !== null) {
    $reservedNames = ['admin', 'root', 'support', 'help', 'api', 'moderator'];
    if (strlen($username) < 3 || strlen($username) > 20 || !preg_match('/^[a-zA-Z0-9_]+$/', $username) || in_array(strtolower($username), $reservedNames)) {
        http_response_code(400);
        echo json_encode(['message' => "Nom d'utilisateur invalide ou réservé."]);
        exit;
    }
}

if ($gender !== null) {
    $allowedGenders = ['M', 'F', 'NB', 'Private'];
    if (!in_array($gender, $allowedGenders)) {
        http_response_code(400);
        echo json_encode(['message' => "Genre non reconnu."]);
        exit;
    }
}

if ($avatar !== null && $avatar['error'] !== UPLOAD_ERR_NO_FILE) {
    if ($avatar['error'] === UPLOAD_ERR_OK) {
        $allowedMimes = ['image/jpeg', 'image/png'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $avatar['tmp_name']);

        if (in_array($mimeType, $allowedMimes) && $avatar['size'] <= 2 * 1024 * 1024) {
            $extension = pathinfo($avatar['name'], PATHINFO_EXTENSION);
            $_POST['avatar'] = "avatar_" . $userId . "_" . uniqid() . "." . $extension;
        } else {
            http_response_code(400);
            echo json_encode(['message' => "Image invalide (format ou taille)."]);
            exit;
        }
    }
}

if ($birthday !== null) {
    $format = 'Y-m-d';
    $date = DateTime::createFromFormat($format, $birthday);
    if (!$date || $date->format($format) !== $birthday) {
        http_response_code(400);
        echo json_encode(['message' => "Date de naissance non valide."]);
        exit;
    }
}

if ($userInstruments !== null) {
    if (is_array($userInstruments)) {
        foreach ($userInstruments as $inst) {
            $instId = $inst['instrument']['id'];
            $lvl = $inst['lvl'];

            if (!is_numeric($instId) || !is_numeric($lvl) || $lvl < 1 || $lvl > 5) {
                http_response_code(400);
                echo json_encode([
                    'message' => "Données d'instruments incorrectes.",
                    'instrument' => $inst
                ]);
                exit;
            }

            $stmt = $pdo->prepare("SELECT id FROM instruments WHERE id = ?");
            $stmt->execute([$instId]);
            if (!$stmt->fetch()) {
                http_response_code(400);
                echo json_encode([
                    'message' => "L'instrument ID $instId n'existe pas.",
                    'instrument' => $inst
                ]);
                exit;
            }
        }

        $_POST['userInstruments'] = $userInstruments;
    }
}
