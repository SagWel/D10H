<?php

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['message' => "Erreur : Aucune donnée reçue"]);
    exit;
}

$filterExplicitChoice = $data['filterExplicit'];

$filterExplicitAccepted = ['not_filtered', 'not_suggested', 'hidden'];

if (!is_string($filterExplicitChoice)) {
    http_response_code(400);
    echo json_encode([
        'updateIsOk' => false,
        'message' => "Erreur : Les données envoyé ne sont pas dans le bon format"
    ]);
    exit;
}

if (!in_array($filterExplicitChoice, $filterExplicitAccepted)) {
    http_response_code(400);
    echo json_encode(([
        'updateIsOk' => false,
        'message' => "Erreur : Le choix fais ne fais pas partie des choix possible"
    ]));
    exit;
}

$_POST['filterExplicit'] = $filterExplicitChoice;
