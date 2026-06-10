<?php

$stmt = $pdo->prepare("SELECT id FROM instruments WHERE name = ?");
$stmt->execute([$id]);

$instrument = $stmt->fetch(PDO::FETCH_ASSOC);

if ($instrument) {
    $_GET['instrument_id'] = $instrument['id'];
} else {
    http_response_code(400);
    echo json_encode([
        "erreur" => "Cet instrument n'est pas disponible",
        'instrument' => $instrument
    ]);
    exit();
}
