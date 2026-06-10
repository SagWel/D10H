<?php

require_once '../models/instrumentsModel.php';

$instruments = getAllInstruments($pdo);

if ($instruments) {
    http_response_code(200);
    echo json_encode($instruments);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Aucun instrument trouvé ..."]);
}
