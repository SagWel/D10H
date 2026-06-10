<?php

require_once '../models/scoresModel.php';
require_once '../utils/mapperScores.php';

$userId = $_GET['id'];

$rows = getUserHistoryScores($pdo, $userId);

$scores = [];

foreach ($rows as $row) {
    $rowsOtherInstruments = getOtherInstrumentScoreId($pdo, $row['song_id'], $row['id']);

    $scores[] = mapperScore($row, $rowsOtherInstruments);
}

echo json_encode($scores);
