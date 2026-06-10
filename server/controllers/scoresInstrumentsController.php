<?php

require_once '../models/scoresModel.php';
require_once '../utils/mapperScores.php';

$instrumentId = $_GET['instrument_id'] ?? null;
$instrument = $_GET['id'];

if ($instrumentId) {
    $rows = getScoresByInstrument($pdo, $instrumentId);

    $scores = [];

    foreach ($rows as $row) {
        $rowsOtherInstruments = getOtherInstrumentScoreId($pdo, $row['song_id'], $row['id']);

        $scores[] = mapperScore($row, $rowsOtherInstruments, $instrument);
    }

    echo json_encode($scores);
} else {
    http_response_code(400);
    echo json_encode([
        'erreur' => 'Instrument non repertorié',
        'instrumentId' => $instrumentId,
        'instrument' => $instrument
    ]);
}
