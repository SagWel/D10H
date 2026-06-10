<?php

require_once '../models/scoresModel.php';
require_once '../utils/mapperScores.php';

$rows = getPopularScores($pdo);

$scores = [];

foreach ($rows as $row) {
    $rowsOtherInstruments = getOtherInstrumentScoreId($pdo, $row['song_id'], $row['id']);

    $scores[] = mapperScore($row, $rowsOtherInstruments);
}

echo json_encode($scores);
