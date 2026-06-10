<?php

$query = trim($_GET['id'] ?? '');
$query = stripslashes($query);
$query = urldecode($query);

if (!empty($query)) {
    if (mb_strlen($query, 'UTF-8') <= 50) {
        $forbiddenSequences = [';', '--', '/*', '*/'];
        foreach ($forbiddenSequences as $seq) {
            if (str_contains($query, $seq)) {
                http_response_code(400);
                echo json_encode(['erreur' => 'La requête contient du contenu interdis ...']);
                exit;
            }
        }
        $safeQuery = str_replace(['%', '_'], ['\%', '\_'], $query);
        $_GET['safe_query'] = mb_strtolower($safeQuery, 'UTF-8');
    } else {
        http_response_code(400);
        echo json_encode(['erreur' => "Requête trop longue ..."]);
        exit;
    }
} else {
    http_response_code(400);
    echo json_encode(['erreur' => "Requête vide ..."]);
    exit;
}
