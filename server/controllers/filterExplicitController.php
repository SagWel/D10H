<?php

require_once '../models/userModel.php';

$userId = $_POST['userId'];
$newFilterExplicit = $_POST['filterExplicit'];

$updateResult = updateFilterExplicit($pdo, $userId, $newFilterExplicit);

http_response_code($updateResult['CodeHttp']);
echo json_encode([
    'updateIsOk' => $updateResult['updateIsOk'],
    'message' => $updateResult['message']
]);
