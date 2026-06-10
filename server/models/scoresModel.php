<?php

function getScoreById($pdo, $id)
{
    $sql = $pdo->prepare(
        'SELECT
            s.*,
            so.id AS song_id, so.title, so.deezer_link, so.deezer_full_name, so.audio_preview, so.duration, so.is_explicit,
            a.id AS artist_id, a.name AS artist_name, a.picture AS artist_picture,
            al.id AS album_id, al.title AS album_title,
            al.cover AS album_cover, al.cover_small AS album_cover_small, al.cover_medium AS album_cover_medium, al.cover_big AS album_cover_big, al.cover_xl AS album_cover_xl,
            al.deezer_link AS album_deezer_link,
            g.id AS gender_id, g.name AS gender_name,
            COUNT(DISTINCT sv.id) AS popularity_count,
            GROUP_CONCAT(i.name) AS all_instruments_names,
            GROUP_CONCAT(i.id) AS all_instruments_ids,
            GROUP_CONCAT(si.track_name) As all_instruments_roles,
            GROUP_CONCAT(si.is_current) AS all_is_current
        FROM scores s
        JOIN songs so ON s.song_id = so.id
        LEFT JOIN artists a ON so.artist_id = a.id
        LEFT JOIN albums al ON so.album_id = al.id
        LEFT JOIN genders g ON so.gender_id = g.id
        LEFT JOIN score_instruments si ON s.id = si.score_id
        LEFT JOIN instruments i ON si.instrument_id = i.id
        LEFT JOIN score_views sv ON s.id = sv.score_id
        WHERE s.id = ?
        GROUP BY s.id'
    );

    $sql->execute([$id]);

    return $sql->fetch(PDO::FETCH_ASSOC);
}

function getOtherInstrumentScoreId($pdo, $songId, $scoreId)
{
    $sql = $pdo->prepare(
        'SELECT
            s.id AS score_id,
            i.id AS instrument_id,
            i.name AS instrument_name
        FROM scores s
        JOIN score_instruments si ON s.id = si.score_id
        JOIN instruments i ON si.instrument_id = i.id
        WHERE s.song_id = ?
          AND s.id != ?
          AND si.is_current = 1'
    );

    $sql->execute([$songId, $scoreId]);

    return $sql->fetchAll(PDO::FETCH_ASSOC);
}

function getNewsScores($pdo)
{
    $sql = $pdo->prepare(
        'SELECT
            s.*,
            so.id AS song_id, so.title, so.deezer_link, so.deezer_full_name, so.audio_preview, so.duration, so.is_explicit,
            a.id AS artist_id, a.name AS artist_name, a.picture AS artist_picture,
            al.id AS album_id, al.title AS album_title,
            al.cover AS album_cover, al.cover_small AS album_cover_small, al.cover_medium AS album_cover_medium, al.cover_big AS album_cover_big, al.cover_xl AS album_cover_xl,
            al.deezer_link AS album_deezer_link,
            g.id AS gender_id, g.name AS gender_name,
            COUNT(DISTINCT sv.id) AS popularity_count,
            GROUP_CONCAT(i.name) AS all_instruments_names,
            GROUP_CONCAT(i.id) AS all_instruments_ids,
            GROUP_CONCAT(si.track_name) As all_instruments_roles,
            GROUP_CONCAT(si.is_current) AS all_is_current
        FROM scores s
        JOIN songs so ON s.song_id = so.id
        LEFT JOIN artists a ON so.artist_id = a.id
        LEFT JOIN albums al ON so.album_id = al.id
        LEFT JOIN genders g ON so.gender_id = g.id
        LEFT JOIN score_instruments si ON s.id = si.score_id
        LEFT JOIN instruments i ON si.instrument_id = i.id
        LEFT JOIN score_views sv ON s.id = sv.score_id
        GROUP BY s.id
        ORDER BY s.created_at DESC
        LIMIT 12;'
    );

    $sql->execute();

    return $sql->fetchAll(PDO::FETCH_ASSOC);
}

function getPopularScores($pdo)
{
    $sql = $pdo->prepare(
        'SELECT
            s.*,
            so.id AS song_id, so.title, so.deezer_link, so.deezer_full_name, so.audio_preview, so.duration, so.is_explicit,
            a.id AS artist_id, a.name AS artist_name, a.picture AS artist_picture,
            al.id AS album_id, al.title AS album_title,
            al.cover AS album_cover, al.cover_small AS album_cover_small, al.cover_medium AS album_cover_medium, al.cover_big AS album_cover_big, al.cover_xl AS album_cover_xl,
            al.deezer_link AS album_deezer_link,
            g.id AS gender_id, g.name AS gender_name,
            COUNT(DISTINCT sv.id) AS popularity_count,
            GROUP_CONCAT(i.name) AS all_instruments_names,
            GROUP_CONCAT(i.id) AS all_instruments_ids,
            GROUP_CONCAT(si.track_name) As all_instruments_roles,
            GROUP_CONCAT(si.is_current) AS all_is_current
        FROM scores s
        JOIN songs so ON s.song_id = so.id
        LEFT JOIN artists a ON so.artist_id = a.id
        LEFT JOIN albums al ON so.album_id = al.id
        LEFT JOIN genders g ON so.gender_id = g.id
        LEFT JOIN score_instruments si ON s.id = si.score_id
        LEFT JOIN instruments i ON si.instrument_id = i.id
        LEFT JOIN score_views sv ON s.id = sv.score_id
            AND sv.viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY s.id
        ORDER BY popularity_count DESC
        LIMIT 12;'
    );

    $sql->execute();

    return $sql->fetchAll(PDO::FETCH_ASSOC);
}

function getSuggestionsScores($pdo, $userId)
{
    $sql = $pdo->prepare(
        'SELECT
            s.*,
            so.id AS song_id, so.title, so.deezer_link, so.deezer_full_name, so.audio_preview, so.duration, so.is_explicit,
            a.id AS artist_id, a.name AS artist_name, a.picture AS artist_picture,
            al.id AS album_id, al.title AS album_title,
            al.cover AS album_cover, al.cover_small AS album_cover_small, al.cover_medium AS album_cover_medium, al.cover_big AS album_cover_big, al.cover_xl AS album_cover_xl,
            al.deezer_link AS album_deezer_link,
            g.id AS gender_id, g.name AS gender_name,
            COUNT(DISTINCT sv.id) AS popularity_count,
            GROUP_CONCAT(i.name) AS all_instruments_names,
            GROUP_CONCAT(i.id) AS all_instruments_ids,
            GROUP_CONCAT(si.track_name) As all_instruments_roles,
            GROUP_CONCAT(si.is_current) AS all_is_current
        FROM scores s
        JOIN songs so ON s.song_id = so.id
        LEFT JOIN artists a ON so.artist_id = a.id
        LEFT JOIN albums al ON so.album_id = al.id
        LEFT JOIN genders g ON so.gender_id = g.id
        LEFT JOIN score_instruments si ON s.id = si.score_id
        LEFT JOIN instruments i ON si.instrument_id = i.id
        LEFT JOIN score_views sv ON s.id = sv.score_id
        WHERE s.id IN (
            SELECT si2.score_id
            FROM score_instruments si2
            JOIN user_instruments ui ON si2.instrument_id = ui.instrument_id
            WHERE ui.user_id = ?
              AND si2.is_current = 1
        )
        GROUP BY s.id
        ORDER BY RAND()
        LIMIT 12;'
    );

    $sql->execute([$userId]);

    return $sql->fetchAll(PDO::FETCH_ASSOC);
}

function getUserHistoryScores($pdo, $userId)
{
    $sql = $pdo->prepare(
        'SELECT
            h.played_at,
            s.*,
            so.id AS song_id, so.title, so.deezer_link, so.deezer_full_name, so.audio_preview, so.duration, so.is_explicit,
            a.id AS artist_id, a.name AS artist_name, a.picture AS artist_picture,
            al.id AS album_id, al.title AS album_title,
            al.cover AS album_cover, al.cover_small AS album_cover_small, al.cover_medium AS album_cover_medium, al.cover_big AS album_cover_big, al.cover_xl AS album_cover_xl,
            al.deezer_link AS album_deezer_link,
            g.id AS gender_id, g.name AS gender_name,
            COUNT(DISTINCT sv.id) AS popularity_count,
            GROUP_CONCAT(i.name) AS all_instruments_names,
            GROUP_CONCAT(i.id) AS all_instruments_ids,
            GROUP_CONCAT(si.track_name) As all_instruments_roles,
            GROUP_CONCAT(si.is_current) AS all_is_current
        FROM user_history h
        INNER JOIN scores s ON h.score_id = s.id
        INNER JOIN songs so ON s.song_id = so.id
        LEFT JOIN artists a ON so.artist_id = a.id
        LEFT JOIN albums al ON so.album_id = al.id
        LEFT JOIN genders g ON so.gender_id = g.id
        LEFT JOIN score_instruments si ON s.id = si.score_id
        LEFT JOIN instruments i ON si.instrument_id = i.id
        LEFT JOIN score_views sv ON s.id = sv.score_id
        WHERE h.user_id = ?
        ORDER BY h.played_at DESC'
    );

    $sql->execute([$userId]);

    return $sql->fetchAll(PDO::FETCH_ASSOC);
}

function getScoresByInstrument($pdo, $instrumentId)
{
    $sql = $pdo->prepare(
        'SELECT
            s.*,
            so.id AS song_id, so.title, so.deezer_link, so.deezer_full_name, so.audio_preview, so.duration, so.is_explicit,
            a.id AS artist_id, a.name AS artist_name, a.picture AS artist_picture,
            al.id AS album_id, al.title AS album_title,
            al.cover AS album_cover, al.cover_small AS album_cover_small, al.cover_medium AS album_cover_medium, al.cover_big AS album_cover_big, al.cover_xl AS album_cover_xl,
            al.deezer_link AS album_deezer_link,
            g.id AS gender_id, g.name AS gender_name,
            COUNT(DISTINCT sv.id) AS popularity_count,
            GROUP_CONCAT(i.name) AS all_instruments_names,
            GROUP_CONCAT(i.id) AS all_instruments_ids,
            GROUP_CONCAT(si.track_name) As all_instruments_roles,
            GROUP_CONCAT(si.is_current) AS all_is_current
        FROM scores s
        JOIN songs so ON s.song_id = so.id
        LEFT JOIN artists a ON so.artist_id = a.id
        LEFT JOIN albums al ON so.album_id = al.id
        LEFT JOIN genders g ON so.gender_id = g.id
        LEFT JOIN score_instruments si ON s.id = si.score_id
        LEFT JOIN instruments i ON si.instrument_id = i.id
        LEFT JOIN score_views sv ON s.id = sv.score_id
        WHERE s.id IN (
            SELECT si2.score_id
            FROM score_instruments si2
            WHERE si2.instrument_id = ?
            AND si2.is_current = 1
        )
        GROUP BY s.id'
    );

    $sql->execute([$instrumentId]);

    return $sql->fetchAll(PDO::FETCH_ASSOC);
}

function getSearchScores($pdo, $searchTerm)
{
    $sql = $pdo->prepare(
        'SELECT
            s.*,
            so.id AS song_id, so.title, so.deezer_link, so.deezer_full_name, so.audio_preview, so.duration, so.is_explicit,
            a.id AS artist_id, a.name AS artist_name, a.picture AS artist_picture,
            al.id AS album_id, al.title AS album_title,
            al.cover AS album_cover, al.cover_small AS album_cover_small, al.cover_medium AS album_cover_medium, al.cover_big AS album_cover_big, al.cover_xl AS album_cover_xl,
            al.deezer_link AS album_deezer_link,
            g.id AS gender_id, g.name AS gender_name,
            COUNT(DISTINCT sv.id) AS popularity_count,
            GROUP_CONCAT(i.name) AS all_instruments_names,
            GROUP_CONCAT(i.id) AS all_instruments_ids,
            GROUP_CONCAT(si.track_name) As all_instruments_roles,
            GROUP_CONCAT(si.is_current) AS all_is_current
        FROM scores s
        INNER JOIN songs so ON s.song_id = so.id
        LEFT JOIN artists a ON so.artist_id = a.id
        LEFT JOIN albums al ON so.album_id = al.id
        LEFT JOIN genders g ON so.gender_id = g.id
        LEFT JOIN score_instruments si ON s.id = si.score_id
        LEFT JOIN instruments i ON si.instrument_id = i.id
        LEFT JOIN score_views sv ON s.id = sv.score_id
        WHERE
            so.title LIKE :query
            OR so.deezer_full_name LIKE :query
            OR a.name LIKE :query
            OR g.name LIKE :query
        GROUP BY s.id
        ORDER BY
            CASE
                WHEN a.name LIKE :exact_query THEN 1
                WHEN so.title LIKE :exact_query THEN 2
                WHEN so.deezer_full_name LIKE :exact_query THEN 3
                ELSE 4
            END,
            so.title ASC'
    );

    $likeQuery = "%" . $searchTerm . "%";

    $sql->execute([
        'query' => $likeQuery,
        'exact_query' => $searchTerm
    ]);

    return $sql->fetchAll(PDO::FETCH_ASSOC);
}

function addToUserHistory($pdo, $userId, $scoreId)
{
    try {
        $sql = $pdo->prepare(
            'INSERT INTO user_history (user_id, score_id, played_at)
            VALUES (?, ?, NOW())
            ON DUPLICATE KEY UPDATE played_at = NOW()'
        );
        $sql->execute([$userId, $scoreId]);

        $rowCount = $sql->rowCount();

        return [
            'success' => true,
            'codeHttp' => 200,
            'userId' => $userId,
            'scoreId' => $scoreId,
            'message' => "Ajout à l'historique de l'utilisateur bien réalisé sur la colonne " . $rowCount
        ];
    } catch (PDOException $e) {
        return [
            'success' => false,
            'codeHttp' => 500,
            'userId' => $userId,
            'scoreId' => $scoreId,
            'message' => "Erreur SQL : " . $e->getMessage()
        ];
    }
}
