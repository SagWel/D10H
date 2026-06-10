<?php

require_once '../models/instrumentsModel.php';

$userId = $_GET['id'];

$instruments = getUserInstruments($pdo, $userId);

if ($instruments) {
    http_response_code(200);
    echo json_encode($instruments);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Aucun instrument trouvé ..."]);
}
