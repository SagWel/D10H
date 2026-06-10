<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$port = getenv('MYSQL_PORT') ?: $_ENV['MYSQL_PORT'];
$host = getenv('MYSQL_HOST') ?: $_ENV['MYSQL_HOST'];
$dbname = getenv('MYSQL_NAME') ?: $_ENV['MYSQL_NAME'];
$user = getenv('MYSQL_USER') ?: $_ENV['MYSQL_USER'];
$password = getenv('MYSQL_PASSWORD') ?: $_ENV['MYSQL_PWD'];

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_TIMEOUT            => 10,
];

try {
    $pdo = new PDO(
        sprintf('mysql:host=%s;dbname=%s;port=%s;charset=utf8', $host, $dbname, $port),
        $user,
        $password,
        $options
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        "erreur" => "Connexion base de données impossible",
        "details" => $e->getMessage()
    ]);
    exit;
}
