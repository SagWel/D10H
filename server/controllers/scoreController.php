<?php

require_once '../models/scoresModel.php';
require_once '../utils/mapperScores.php';

$id = $_GET['id'] ?? null;

if ($id && ctype_digit($id)) {
    $id = (int)$id;
    $row = getScoreById($pdo, $id);

    if ($row) {
        $rowsOtherInstruments = getOtherInstrumentScoreId($pdo, $row['song_id'], $id);

        $score = mapperScore($row, $rowsOtherInstruments);

        header('Content-Type: application/json');
        echo json_encode($score);
    } else {
        http_response_code(404);
        echo json_encode(['erreur' => 'Partition introuvable']);
    }
} else {
    http_response_code(400);
    echo json_encode(['erreur' => 'ID non conforme']);
}
