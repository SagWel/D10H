<?php

fwrite(STDOUT, "Quel est l'hote de la base de données ? ");

$host = trim(fgets(STDIN));

if ($host === '') {
    $host = 'localhost';
}

fwrite(STDOUT, "Quel est le nom d'utilisateur MySQL ? ");

$user = trim(fgets(STDIN));

if ($user === '') {
    $user = 'root';
}

fwrite(STDOUT, "Quel est le mot de passe associé ? ");

$password = trim(fgets(STDIN));


try {
    fwrite(STDOUT, "Merci de fournir le chemin absolue vers htdocs pour xampp ou vers www pour wamp. Par défault sous windows C:\xampp\htdocs ");

    $htdocsPath = trim(fgets(STDIN));

    if ($htdocsPath === '') {
        $htdocsPath = 'C:\xampp\htdocs';
    }

    $serverPath = realpath(__DIR__ . '/../server');

    $folderPath = $htdocsPath . '/D10h_server';


    $pdo = new PDO(
        sprintf('mysql:host=%s;port=%s;charset=utf8', $host, '3306'),
        $user,
        $password
    );


    echo "Connexion au serveur MySQL réussie...\n";

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = $pdo->prepare('CREATE DATABASE IF NOT EXISTS D10h_database');

    $sql->execute();

    echo "Base de donnée crée avec succes !\n";

    $pdo->exec('USE D10h_database');

    $init = file_get_contents(__DIR__ . '/init.sql');

    $pdo->exec($init);

    echo "Structure de la base de données injectée avec succès !\n";

    $seed = file_get_contents(__DIR__ . '/seed.sql');

    $pdo->exec($seed);

    $env = <<<EOD
MYSQL_HOST=$host
MYSQL_PORT=3306
MYSQL_USER=$user
MYSQL_PWD=$password
MYSQL_NAME=D10h_database
EOD;

    file_put_contents(__DIR__ . '/../server/.env', $env);

    echo "Fichier .env généré automatiquement avec vos identifiants !\n";

    symlink($serverPath, $folderPath);

    echo "Installation de l'application D10h terminée avec succès ! L'application est prête. \n";
} catch (Exception $e) {
    die('Erreur :' . $e->getMessage());
}
