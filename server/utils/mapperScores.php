<?php

function mapperScore(array $row, array $rowsOtherInstruments, ?string $searchedInstrument = null)
{
    $instrumentsNames = explode(',', $row['all_instruments_names'] ?? '');
    $instrumentsIds = explode(',', $row['all_instruments_ids'] ?? '');
    $instrumentsRoles = explode(',', $row['all_instruments_roles'] ?? '');
    $instrumentsCurrent = explode(',', $row['all_is_current'] ?? '');

    $currentInstrument = null;

    foreach ($instrumentsNames as $index => $instrumentName) {
        if ($instrumentsRoles[$index] === 'Main') {
            $instrumentData = [
                "id" => (int)$instrumentsIds[$index],
                "name" => $instrumentName
            ];
        } else {
            $instrumentData = [
                "id" => (int)$instrumentsIds[$index],
                "name" => $instrumentName,
                "role" => $instrumentsRoles[$index]
            ];
        }

        if ($searchedInstrument && $instrumentName === $searchedInstrument) {
            $currentInstrument = $instrumentData;
        } elseif (!$searchedInstrument && $instrumentsCurrent[$index] === "1") {
            $currentInstrument = $instrumentData;
        }
    }

    $othersInstruments = [];

    foreach ($rowsOtherInstruments as $otherInstrumentRow) {
        $othersInstruments[] = [
            "instrument" => [
                "id" => (int)$otherInstrumentRow['instrument_id'],
                "name" => $otherInstrumentRow['instrument_name']
            ],
            "scorenId" => (int)$otherInstrumentRow['scorenId']
        ];
    }

    if (!$currentInstrument) {
        http_response_code(404);
        echo json_encode([
            "erreur" => "Pas de current Instrument",
            "debug_infos" => [
                "Liste instruments" => $instrumentName,
                "Ids instruents" => $instrumentsIds,
                "instruments Is_current" => $instrumentsCurrent,
                "current instrument" => $currentInstrument,
                "autres instruments" => $othersInstruments
            ]
        ]);
        return;
    }

    $artist = [
        "id" => (int)$row['artist_id'],
        "name" => ucwords($row['artist_name']),
        "picture" => $row['artist_picture'] ?? "",
    ];

    $album = [
        "id" => (int)$row['album_id'],
        "title" => ucwords($row['album_title']),
        "cover" => $row['album_cover'] ?? "",
        "cover_small" => $row['album_cover_small'],
        "cover_medium" => $row['album_cover_medium'],
        "cover_big" => $row['album_cover_big'],
        "cover_xl" => $row['album_cover_xl'],
        "artist" => $artist,
        "deezer_link" => $row['album_deezer_link'] ?? "",
    ];

    $song = [
        "id" => (int)($row['song_id'] ?? 0),
        "title" => ucwords($row['title']),
        "deezer_link" => $row['deezer_link'] ?? "",
        "deezer_full_name" => $row['deezer_full_name'] ?? '',
        "audio_preview" => $row['audio_preview'] ?? "",
        "duration" => (int)($row['duration'] ?? 0),
        "artist" => $artist,
        "album" => $album,
        "gender" => [
            "id" => (int)($row['gender_id'] ?? 0),
            "name" => ucwords($row['gender_name']) ?? "",
            "picture" => ""
        ],
        "isExplicit" => (int)$row['is_explicit'] === 1 ? true : false
    ];

    return [
        "id" => (int)$row['id'],
        "difficulty" => (int)$row['difficulty'],
        "instruments" => [
            "currentInstrument" => $currentInstrument,
            "othersInstruments" => $othersInstruments
        ],
        "song" => $song,
        "bpm" => (int)($row['bpm'] ?? 0),
        "time_signature" => $row['time_signature'] ?? "4/4",
        "clef" => $row['clef'] ?? "G",
        "clef_signature" => $row['clef_signature'] ?? null,
        "measures" => json_decode($row['measures']),
        "score_preview" => $row['score_preview'],
        "popularity" => $row['popularity_count'],
        "created_at" => $row['created_at']
    ];
}
