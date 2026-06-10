<?php

require_once '../models/scoresModel.php';
require_once '../utils/mapperScores.php';

$query = $_GET['safe_query'];

$rows = getSearchScores($pdo, $query);

$scores = [];

foreach ($rows as $row) {
    $rowsOtherInstruments = getOtherInstrumentScoreId($pdo, $row['song_id'], $row['id']);

    $scores[] = mapperScore($row, $rowsOtherInstruments);
}

echo json_encode([
    'scores' => $scores,
    'query' => $query
]);
