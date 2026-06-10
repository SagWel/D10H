<?php

function getAllInstruments($pdo)
{
    $sql = $pdo->prepare(
        'SELECT i.id, i.name FROM instruments i'
    );

    $sql->execute();

    return $sql->fetchAll(PDO::FETCH_ASSOC);
}

function creatUserInstruments($pdo, $userId, $instrument, $lvl)
{
    $sql = $pdo->prepare(
        'INSERT INTO user_instruments (user_id, instrument_id, lvl) VALUES (?, ?, ?)'
    );

    return $sql->execute([$userId, $instrument['id'], $lvl]);
}

function getUserInstruments($pdo, $userId)
{
    $sql = $pdo->prepare(
        'SELECT i.id, i.name, ui.lvl AS lvl
         FROM instruments i
         JOIN user_instruments ui ON i.id = ui.instrument_id
         WHERE ui.user_id = ?'
    );

    $sql->execute([$userId]);

    return $sql->fetchAll(PDO::FETCH_ASSOC);
}
