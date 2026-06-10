<?php

require_once '../models/userModel.php';

$userId = $_POST['userId'] ?? $_POST['id'];
$username = $_POST['username'] ?? null;
$gender = $_POST['gender'] ?? null;
$avatar = $_POST['avatar'] ?? null;
$birthday = $_POST['birthday'] ?? null;
$userInstruments = $_POST['userInstruments'] ?? null;

$oldUserProfile = getUserProfil($pdo, $userId);
$oldAvatarName = $oldUserProfile['avatar_url'] ?? null;

try {
    $newAvatarGenerated = false;

    if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = "../public/uploads/avatars/";

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $destination = $uploadDir . $avatar;

        if (move_uploaded_file($_FILES['avatar']['tmp_name'], $destination)) {
            $newAvatarGenerated = true;
        } else {
            throw new Exception("Impossible de sauvegarder l'image sur le serveur.");
        }
    }

    $succes = updateProfil($pdo, $userId, $username, $gender, $avatar, $birthday, $userInstruments);

    if ($succes) {
        if ($newAvatarGenerated && $oldAvatarName) {
            $oldFilePath = "../public/uploads/avatars/" . $oldAvatarName;

            if (file_exists($oldFilePath) && $oldAvatarName !== 'default_avatar.png') {
                unlink($oldFilePath);
            }
        }
        http_response_code(200);
        echo json_encode([
            "message" => "Profil mis à jour avec succès",
            "avatarUrl" => $avatar,
            "validating" => true
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "message" => "Erreur lors de l'édition du profil",
            "userId" => $userId,
            "username" => $username,
            "gender" => $gender,
            "avatar" => $avatar,
            "birthday" => $birthday,
            "userInstruments" => $userInstruments,
            "validating" => false
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["erreur" => "Erreur serveur : " . $e->getMessage()]);
}
