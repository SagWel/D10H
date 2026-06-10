<?php

$id = $_GET['id'];
$id2 = $_GET['id2'] ?? null;

if (!is_numeric($id)) {
    http_response_code(400);
    echo json_encode([
        "erreur" => "L'identifiant dois être un nombre",
        "id" => $id
    ]);
    exit();
}

if ($id2) {
    if (!is_numeric($id2)) {
        http_response_code(400);
        echo json_encode([
            "erreur" => "Le deuxième identifiant dois être un nombre",
            "id" => $id2
        ]);
        exit();
    }
}
