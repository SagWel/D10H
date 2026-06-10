<?php

require_once '../models/instrumentsModel.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['message' => "Erreur : Aucune donnée reçue"]);
    exit;
}

$userId = $data['userId'];
$instrumentslvl = $data['userInstruments'];

try {
    $pdo->beginTransaction();

    foreach ($instrumentslvl as $instrumentlvl) {
        $lvl = $instrumentlvl['lvl'];
        $instrument = $instrumentlvl['instrument'];

        creatUserInstruments($pdo, $userId, $instrument, $lvl);
    }

    $pdo->commit();
    http_response_code(201);
    echo json_encode(["message" => "Instruments intègrés au profil avec succès"]);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["message" => "Erreur lors de l'enregistrement"]);
}
