<?php

require_once '../config/db.php';
require_once '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

$requestUri = $_SERVER['REQUEST_URI'] ?? '';

$path = parse_url($requestUri, PHP_URL_PATH);

$parts = explode('/', trim($path, '/'));

$publicIndex = array_search('public', $parts);

if ($publicIndex !== false) {
    $ressource = $parts[$publicIndex + 1] ?? '';
    $id = $parts[$publicIndex + 2] ?? null;
    $id2 = $parts[$publicIndex + 3] ?? null;
} else {
    $ressource = $parts[0] ?? '';
    $id = $parts[1] ?? null;
    $id2 = $parts[2] ?? null;
}

$ressource = preg_replace('/[^a-zA-Z0-9]/', '', $ressource ?? '');

$controlerFile = "../controllers/" . $ressource . "Controller.php";

if ($ressource && file_exists($controlerFile)) {
    if ($id) {
        $_GET['id'] = $id;
    }
    if ($id2) {
        $_GET['id2'] = $id2;
    }

    $middlewareID = '../middlewares/CheckNumericId.php';

    switch ($ressource) {
        case 'checkAuth':
            break;
        case 'auth':
            require_once '../middlewares/CheckLogin.php';
            break;
        case 'foundByEmail':
            require_once '../middlewares/CheckEmail.php';
            break;
        case 'logout':
            break;
        case 'creatUser':
            require_once '../middlewares/CheckCreatUser.php';
            break;
        case 'creatUserInstruments':
            require_once $middlewareID;
            break;
        case 'deleteAccount':
            require_once $middlewareID;
            require_once '../middlewares/CheckLogin.php';
            $_POST['userId'] = $id;
            break;
        case 'profil':
            require_once $middlewareID;
            break;
        case 'addUserHistory':
            require_once $middlewareID;
            $_POST['userId'] = $id;
            $_POST['scoreId'] = $id2;
            break;
        case 'updateProfil':
            require_once '../middlewares/CheckProfilInputs.php';
            $_POST['userId'] = $id;
            break;
        case 'editPassword':
            require_once $middlewareID;
            require_once '../middlewares/CheckEditPassword.php';
            $_POST['userId'] = $id;
            break;
        case 'filterExplicit':
            require_once $middlewareID;
            $_POST['userId'] = $id;
            require_once '../middlewares/CheckFilterExplicitChoice.php';
            break;
        case 'score':
            require_once $middlewareID;
            break;
        case 'allInstruments':
            break;
        case 'scoresInstruments':
            require_once '../middlewares/CheckInstrument.php';
            break;
        case 'searchScore':
            require_once '../middlewares/CheckQuery.php';
            break;
        case 'popular':
            break;
        case 'news':
            break;
        case 'suggestions':
            require_once $middlewareID;
            break;
        case 'history':
            require_once $middlewareID;
            break;
        default:
            http_response_code(500);
            echo json_encode([
                "erreur" => 'route non reconnue',
                "ressource" => $ressource,
                "parts" => $parts,
                "path" => $path
            ]);
            exit;
    }
    require_once $controlerFile;
} else {
    http_response_code(404);
    echo json_encode([
        "erreur" => "Ressource introuvable",
        "debug_info" => [
            "url_recue" => $requestUri,
            "tableau_parts" => $parts,
            "index_public_trouve" => $publicIndex,
            "ressource_extraite" => $ressource,
            "fichier_tente" => $controlerFile,
            "dossier_actuel" => getcwd()
        ]
    ]);
}
