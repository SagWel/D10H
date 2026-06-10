<?php

require_once '../models/scoresModel.php';

$userId = $_POST['userId'] ?? null;
$scoreId = $_POST['scoreId'] ?? null;

if ($userId && $scoreId) {
    $result = addToUserHistory($pdo, $userId, $scoreId);
    http_response_code($result['codeHttp']);
    echo json_encode([
        "success" => $result['success'],
        'userId' => $result['userId'],
        'scoreId' => $result['scoreId'],
        "message" => $result['message']
    ]);
} else {
    http_response_code(400);
    echo json_encode(["status" => "error : un ou plusieur Ids sont manquant"]);
    exit;
}
