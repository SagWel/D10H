SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de données : `D10h_!`
--

--
-- Déchargement des données de la table `albums`
--

INSERT INTO `albums` (`id`, `title`, `deezer_link`, `cover`, `cover_small`, `cover_medium`, `cover_big`, `cover_xl`, `artist_id`) VALUES
(12047936, 'rubber soul', 'https://www.deezer.com/fr/album/12047936', 'https://api.deezer.com/album/12047936/image', 'https://cdn-images.dzcdn.net/images/cover/da80520440d5d29876b9df3e375793b5/56x56-000000-80-0-0.jpg', 'https://cdn-images.dzcdn.net/images/cover/da80520440d5d29876b9df3e375793b5/250x250-000000-80-0-0.jpg', 'https://cdn-images.dzcdn.net/images/cover/da80520440d5d29876b9df3e375793b5/500x500-000000-80-0-0.jpg', 'https://cdn-images.dzcdn.net/images/cover/da80520440d5d29876b9df3e375793b5/1000x1000-000000-80-0-0.jpg', 1);

--
-- Déchargement des données de la table `artists`
--

INSERT INTO `artists` (`id`, `name`, `deezer_link`, `picture`, `picture_small`, `picture_medium`, `picture_big`, `picture_xl`) VALUES
(1, 'the beatles', 'https://www.deezer.com/artist/1', 'https://api.deezer.com/artist/1/image', 'https://cdn-images.dzcdn.net/images/artist/fe9eb4463ea87452e84ed97e0c86b878/56x56-000000-80-0-0.jpg', 'https://cdn-images.dzcdn.net/images/artist/fe9eb4463ea87452e84ed97e0c86b878/250x250-000000-80-0-0.jpg', 'https://cdn-images.dzcdn.net/images/artist/fe9eb4463ea87452e84ed97e0c86b878/500x500-000000-80-0-0.jpg', 'https://cdn-images.dzcdn.net/images/artist/fe9eb4463ea87452e84ed97e0c86b878/1000x1000-000000-80-0-0.jpg');

--
-- Déchargement des données de la table `genders`
--

INSERT INTO `genders` (`id`, `name`, `picture`, `picture_small`, `picture_medium`, `picture_big`, `picture_xl`) VALUES
(132, 'pop', 'https://api.deezer.com/genre/132/image', 'https://cdn-images.dzcdn.net/images/misc/db7a604d9e7634a67d45cfc86b48370a/56x56-000000-80-0-0.jpg', 'https://cdn-images.dzcdn.net/images/misc/db7a604d9e7634a67d45cfc86b48370a/250x250-000000-80-0-0.jpg', 'https://cdn-images.dzcdn.net/images/misc/db7a604d9e7634a67d45cfc86b48370a/500x500-000000-80-0-0.jpg', 'https://cdn-images.dzcdn.net/images/misc/db7a604d9e7634a67d45cfc86b48370a/1000x1000-000000-80-0-0.jpg');

--
-- Déchargement des données de la table `instruments`
--

INSERT INTO `instruments` (`id`, `name`) VALUES
(1, 'guitare'),
(2, 'chant'),
(3, 'basse'),
(4, 'piano'),
(5, 'batterie'),
(6, 'ukulele'),
(7, 'saxophone');

--
-- Déchargement des données de la table `scores` sans la colonne `measures`
--

INSERT INTO `scores` (`id`, `name`, `bpm`, `difficulty`, `time_signature`, `clef`, `clef_signature`, `measures`, `score_preview`, `song_id`, `is_explicit`, `created_at`) VALUES
(1, 'Michelle-Beatles-Chant', 118, 3, '4/4', 'treble', 'Ab', '[{\"id\":1,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":2,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":3,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":4,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":5,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"Mi\"},
{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"chelle,\"}]},
{\"id\":6,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"q\",\"isRest\":true},
{\"keys\":[\"d/5\"],\"duration\":\"q\",\"lyrics\":\"ma\"},
{\"keys\":[\"a/4\"],\"duration\":\"h\",\"lyrics\":\"belle,\"}]},
{\"id\":7,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"these\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"are\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"words\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"that\"}]},
{\"id\":8,\"notes\":[{\"keys\":[\"f/4\"],\"duration\":\"q\",\"lyrics\":\"go\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"to\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"accidental\":\"n\",\"lyrics\":\"geth\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"er\"}]},
{\"id\":9,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"h\",\"lyrics\":\"well,\"},
{\"keys\":[\"f/4\"],\"duration\":\"q\",\"lyrics\":\"my\"},
{\"keys\":[\"a/4\"],\"duration\":\"8\",\"beam\":\"start\",\"lyrics\":\"Mi\"},
{\"keys\":[\"g/4\"],\"duration\":\"8\",\"beam\":\"end\",\"keyTies\":[[{\"status\":\"start\",\"direction\":\"down\"}]],\"lyrics\":\"chelle.\"}]},
{\"id\":10,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"w\",\"keyTies\":[[{\"status\":\"end\",\"direction\":\"down\"}]],\"lyrics\":\"_\"}]},
{\"id\":11,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"Mi\"},
{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"chelle,\"}]},
{\"id\":12,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"q\",\"isRest\":true},
{\"keys\":[\"d/5\"],\"duration\":\"q\",\"lyrics\":\"ma\"},
{\"keys\":[\"a/4\"],\"duration\":\"h\",\"lyrics\":\"belle,\"}]},
{\"id\":13,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"sont\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"des\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"mots\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"qui\"}]},
{\"id\":14,\"notes\":[{\"keys\":[\"f/4\"],\"duration\":\"q\",\"lyrics\":\"vont\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"trés\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"accidental\":\"n\",\"lyrics\":\"bien\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"en\"}]},
{\"id\":15,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"h\",\"lyrics\":\"semble\"},
{\"keys\":[\"f/4\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"start\"},\"lyrics\":\"trés\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"mid\"},\"lyrics\":\"bien\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"end\",\"num\":3,\"occupied\":2},\"lyrics\":\"en\"}]},
{\"id\":16,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"h\",\"dots\":1,\"lyrics\":\"semble.\"},
{\"keys\":[\"b/4\"],\"duration\":\"8\",\"isRest\":true},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"lyrics\":\"I\"}]},
{\"id\":17,\"notes\":[{\"keys\":[\"f/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"start\"},\"lyrics\":\"love\"},
{\"keys\":[\"e/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"mid\"},\"lyrics\":\"you,\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"end\",\"num\":3,\"occupied\":2},\"lyrics\":\"I\"},
{\"keys\":[\"f/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"start\"},\"lyrics\":\"love\"},
{\"keys\":[\"e/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"mid\"},\"lyrics\":\"you,\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"end\",\"num\":3,\"occupied\":2},\"lyrics\":\"I\"}]},
{\"id\":18,\"notes\":[{\"keys\":[\"g/5\"],\"duration\":\"q\",\"lyrics\":\"love\"},
{\"keys\":[\"f/5\"],\"duration\":\"h\",\"dots\":1,\"lyrics\":\"you,\"}]},
{\"id\":19,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"8\",\"isRest\":true},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"lyrics\":\"that\'s\"},
{\"keys\":[\"d/5\"],\"duration\":\"8\",\"beam\":\"start\",\"lyrics\":\"all\"},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"beam\":\"end\",\"lyrics\":\"I\"},
{\"keys\":[\"d/5\"],\"duration\":\"q\",\"dots\":1,\"lyrics\":\"want\"},
{\"keys\":[\"a/4\"],\"duration\":\"8\",\"lyrics\":\"to\"}]},
{\"id\":20,\"notes\":[{\"keys\":[\"a/4\"],\"duration\":\"w\",\"lyrics\":\"say,\"}]},
{\"id\":21,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"8\",\"isRest\":true},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"lyrics\":\"Un\"},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"beam\":\"start\",\"lyrics\":\"til\"},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"beam\":\"end\",\"lyrics\":\"I\"},
{\"keys\":[\"f/5\"],\"duration\":\"q\",\"lyrics\":\"find\"},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"beam\":\"start\",\"lyrics\":\"a\"},
{\"keys\":[\"b/4\"],\"duration\":\"8\",\"beam\":\"end\",\"keyTies\":[[{\"status\":\"start\",\"direction\":\"up\"},
{\"status\":\"start\",\"direction\":\"up\"}]],\"lyrics\":\"way,\"}]},
{\"id\":22,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"8\",\"keyTies\":[[{\"status\":\"end\",\"direction\":\"up\"}]],\"lyrics\":\"_\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"dots\":1,\"keyTies\":[[{\"status\":\"start\",\"direction\":\"down\"}]],\"lyrics\":\"_\"},
{\"keys\":[\"a/4\"],\"duration\":\"8\",\"beam\":\"start\",\"keyTies\":[[{\"status\":\"end\",\"direction\":\"up\"},
{\"status\":\"end\",\"direction\":\"down\"}]],\"lyrics\":\"_\"},
{\"keys\":[\"a/4\"],\"duration\":\"8\",\"beam\":\"end\",\"lyrics\":\"I\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"lyrics\":\"will\"}]},
{\"id\":23,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"say\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"the\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"on\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"ly\"}]},
{\"id\":24,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"words\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"I\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"know\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"that\"}]},
{\"id\":25,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"you\'ll\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"lyrics\":\"un\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"der\"}]},
{\"id\":26,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"w\",\"lyrics\":\"stand.\"}]},
{\"id\":27,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"Mi\"},
{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"chelle,\"}]},
{\"id\":28,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"q\",\"isRest\":true},
{\"keys\":[\"d/5\"],\"duration\":\"q\",\"lyrics\":\"ma\"},
{\"keys\":[\"a/4\"],\"duration\":\"h\",\"lyrics\":\"belle,\"}]},
{\"id\":29,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"sont\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"des\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"mots\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"qui\"}]},
{\"id\":30,\"notes\":[{\"keys\":[\"f/4\"],\"duration\":\"q\",\"lyrics\":\"vont\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"trés\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"accidental\":\"n\",\"lyrics\":\"bien\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"en\"}]},
{\"id\":31,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"h\",\"lyrics\":\"semble\"},
{\"keys\":[\"f/4\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"start\"},\"lyrics\":\"trés\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"mid\"},\"lyrics\":\"bien\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"end\",\"num\":3,\"occupied\":2},\"lyrics\":\"en\"}]},
{\"id\":32,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"h\",\"dots\":1,\"lyrics\":\"semble.\"},
{\"keys\":[\"b/4\"],\"duration\":\"8\",\"isRest\":true},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"lyrics\":\"I\"}]},
{\"id\":33,\"notes\":[{\"keys\":[\"f/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"start\"},\"lyrics\":\"need\"},
{\"keys\":[\"e/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"mid\"},\"lyrics\":\"to,\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"end\",\"num\":3,\"occupied\":2},\"lyrics\":\"I\"},
{\"keys\":[\"f/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"start\"},\"lyrics\":\"need\"},
{\"keys\":[\"e/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"mid\"},\"lyrics\":\"to,\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"end\",\"num\":3,\"occupied\":2},\"lyrics\":\"I\"}]},
{\"id\":34,\"notes\":[{\"keys\":[\"g/5\"],\"duration\":\"q\",\"lyrics\":\"need\"},
{\"keys\":[\"f/5\"],\"duration\":\"h\",\"dots\":1,\"lyrics\":\"to,\"}]},
{\"id\":35,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"8\",\"isRest\":true},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"lyrics\":\"I\"},
{\"keys\":[\"d/5\"],\"duration\":\"8\",\"beam\":\"start\",\"lyrics\":\"need\"},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"beam\":\"end\",\"lyrics\":\"to\"},
{\"keys\":[\"d/5\"],\"duration\":\"q\",\"dots\":1,\"lyrics\":\"make\"},
{\"keys\":[\"a/4\"],\"duration\":\"8\",\"lyrics\":\"you\"}]},
{\"id\":36,\"notes\":[{\"keys\":[\"a/4\"],\"duration\":\"w\",\"lyrics\":\"see,\"}]},
{\"id\":37,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"8\",\"isRest\":true},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"lyrics\":\"oh,\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"what\"},
{\"keys\":[\"f/5\"],\"duration\":\"q\",\"lyrics\":\"you\"},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"beam\":\"start\",\"lyrics\":\"mean\"},
{\"keys\":[\"b/4\"],\"duration\":\"8\",\"beam\":\"end\",\"keyTies\":[[{\"status\":\"start\",\"direction\":\"up\"}]],\"lyrics\":\"to\"}]},
{\"id\":38,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"8\",\"keyTies\":[[{\"status\":\"end\",\"direction\":\"up\"}]],\"lyrics\":\"me.\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"dots\":1,\"keyTies\":[[{\"status\":\"start\",\"direction\":\"down\"}]],\"lyrics\":\"_\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"keyTies\":[[{\"status\":\"end\",\"direction\":\"down\"}]]},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"lyrics\":\"Un\"}]},
{\"id\":39,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"til\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"I\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"do,\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"I\'m\"}]},
{\"id\":40,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"hop\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"ing\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"you\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"will\"}]},
{\"id\":41,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"know\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"lyrics\":\"what\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"I\"}]},
{\"id\":42,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"w\",\"lyrics\":\"mean.\"}]},
{\"id\":43,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"q\",\"isRest\":true},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"I\"},
{\"keys\":[\"e/5\"],\"duration\":\"8\",\"lyrics\":\"love\"},
{\"keys\":[\"f/5\"],\"duration\":\"q\",\"dots\":1,\"keyTies\":[[{\"status\":\"start\",\"direction\":\"up\"}]],\"lyrics\":\"you.\"}]},
{\"id\":44,\"notes\":[{\"keys\":[\"f/5\"],\"duration\":\"w\",\"keyTies\":[[{\"status\":\"end\",\"direction\":\"up\"},
{\"status\":\"start\",\"direction\":\"up\"}]]}]},
{\"id\":45,\"notes\":[{\"keys\":[\"f/5\"],\"duration\":\"w\",\"keyTies\":[[{\"status\":\"end\",\"direction\":\"up\"}]]}]},
{\"id\":46,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":47,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":48,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"h\",\"isRest\":true},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"isRest\":true},
{\"keys\":[\"b/4\"],\"duration\":\"8\",\"isRest\":true},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"lyrics\":\"I\"}]},
{\"id\":49,\"notes\":[{\"keys\":[\"f/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"start\"},\"lyrics\":\"want\"},
{\"keys\":[\"e/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"mid\"},\"lyrics\":\"you,\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"end\",\"num\":3,\"occupied\":2},\"lyrics\":\"I\"},
{\"keys\":[\"f/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"start\"},\"lyrics\":\"want\"},
{\"keys\":[\"e/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"mid\"},\"lyrics\":\"you,\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"end\",\"num\":3,\"occupied\":2},\"lyrics\":\"I\"}]},
{\"id\":50,\"notes\":[{\"keys\":[\"g/5\"],\"duration\":\"q\",\"dots\":1,\"keyTies\":[[{\"status\":\"start\",\"direction\":\"up\"}]],\"lyrics\":\"want\"},
{\"keys\":[\"a/5\"],\"duration\":\"16\",\"beam\":\"start\",\"lyrics\":\"_\"},
{\"keys\":[\"g/5\"],\"duration\":\"16\",\"beam\":\"end\",\"keyTies\":[[{\"status\":\"end\",\"direction\":\"up\"}]]},
{\"keys\":[\"f/5\"],\"duration\":\"h\",\"lyrics\":\"you,\"}]},
{\"id\":51,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"8\",\"isRest\":true},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"lyrics\":\"I\"},
{\"keys\":[\"d/5\"],\"duration\":\"8\",\"beam\":\"start\",\"lyrics\":\"think\"},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"beam\":\"end\",\"lyrics\":\"you\"},
{\"keys\":[\"d/5\"],\"duration\":\"q\",\"lyrics\":\"know\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"by\"}]},
{\"id\":52,\"notes\":[{\"keys\":[\"a/4\"],\"duration\":\"w\",\"lyrics\":\"now,\"}]},
{\"id\":53,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"8\",\"isRest\":true},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"lyrics\":\"I\'ll\"},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"beam\":\"start\",\"lyrics\":\"get\"},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"beam\":\"end\",\"lyrics\":\"to\"},
{\"keys\":[\"f/5\"],\"duration\":\"q\",\"lyrics\":\"you\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"some\"}]},
{\"id\":54,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"8\",\"beam\":\"start\",\"keyTies\":[[{\"status\":\"start\",\"direction\":\"down\"}]],\"lyrics\":\"how.\"},
{\"keys\":[\"a/4\"],\"duration\":\"8\",\"beam\":\"end\",\"keyTies\":[[{\"status\":\"start\",\"direction\":\"down\"}]],\"lyrics\":\"_\"},
{\"keys\":[\"a/4\"],\"duration\":\"h\",\"keyTies\":[[{\"status\":\"end\",\"direction\":\"down\"},
{\"status\":\"end\",\"direction\":\"down\"}]]},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"lyrics\":\"Un\"}]},
{\"id\":55,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"til\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"I\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"do\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"I\'m\"}]},
{\"id\":56,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"tell\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"ing\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"dots\":1,\"lyrics\":\"you,\"},
{\"keys\":[\"c/5\"],\"duration\":\"8\",\"lyrics\":\"so\"}]},
{\"id\":57,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"you\'ll\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"lyrics\":\"un\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"der\"}]},
{\"id\":58,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"w\",\"lyrics\":\"stand.\"}]},
{\"id\":59,\"notes\":[{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"Mi\"},
{\"keys\":[\"c/5\"],\"duration\":\"h\",\"lyrics\":\"chelle,\"}]},
{\"id\":60,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"q\",\"isRest\":true},
{\"keys\":[\"d/5\"],\"duration\":\"q\",\"lyrics\":\"ma\"},
{\"keys\":[\"a/4\"],\"duration\":\"h\",\"lyrics\":\"belle,\"}]},
{\"id\":61,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"sont\"},
{\"keys\":[\"c/5\"],\"duration\":\"q\",\"lyrics\":\"des\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"mots\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"qui\"}]},
{\"id\":62,\"notes\":[{\"keys\":[\"f/4\"],\"duration\":\"q\",\"lyrics\":\"vont\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"trés\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"accidental\":\"n\",\"lyrics\":\"bien\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"en\"}]},
{\"id\":63,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"h\",\"lyrics\":\"semble\"},
{\"keys\":[\"f/4\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"start\"},\"lyrics\":\"trés\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"mid\"},\"lyrics\":\"bien\"},
{\"keys\":[\"a/4\"],\"duration\":\"q\",\"tuplet\":{\"type\":\"end\",\"num\":3,\"occupied\":2},\"lyrics\":\"en\"}]},
{\"id\":64,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"h\",\"lyrics\":\"semble.\"},
{\"keys\":[\"b/4\"],\"duration\":\"8\",\"dots\":1,\"isRest\":true},
{\"keys\":[\"f/4\"],\"duration\":\"16\",\"lyrics\":\"And\"},
{\"keys\":[\"f/4\"],\"duration\":\"8\",\"beam\":\"start\",\"lyrics\":\"I\"},
{\"keys\":[\"g/4\"],\"duration\":\"8\",\"beam\":\"end\",\"lyrics\":\"will\"}]},
{\"id\":65,\"notes\":[{\"keys\":[\"a/4\"],\"duration\":\"q\",\"lyrics\":\"say\"},
{\"keys\":[\"f/4\"],\"duration\":\"q\",\"lyrics\":\"the\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"lyrics\":\"on\"},
{\"keys\":[\"g/4\"],\"duration\":\"8\",\"beam\":\"start\",\"lyrics\":\"ly\"},
{\"keys\":[\"a/4\"],\"duration\":\"8\",\"beam\":\"end\",\"keyTies\":[[{\"status\":\"start\",\"direction\":\"down\"}]],\"lyrics\":\"words.\"}]},
{\"id\":66,\"notes\":[{\"keys\":[\"a/4\"],\"duration\":\"q\",\"keyTies\":[[{\"status\":\"end\",\"direction\":\"down\"}]],\"lyrics\":\"_\"},
{\"keys\":[\"f/4\"],\"duration\":\"q\",\"lyrics\":\"I\"},
{\"keys\":[\"b/4\"],\"duration\":\"q\",\"lyrics\":\"know\"},
{\"keys\":[\"b/4\"],\"duration\":\"8\",\"isRest\":true},
{\"keys\":[\"g/4\"],\"duration\":\"8\",\"lyrics\":\"that\"}]},
{\"id\":67,\"notes\":[{\"keys\":[\"a/4\"],\"duration\":\"h\",\"lyrics\":\"you\'ll\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"un\"},
{\"keys\":[\"f/4\"],\"duration\":\"q\",\"lyrics\":\"der\"}]},
{\"id\":68,\"notes\":[{\"keys\":[\"e/4\"],\"duration\":\"h\",\"accidental\":\"n\",\"lyrics\":\"stand,\"},
{\"keys\":[\"f/4\"],\"duration\":\"q\",\"lyrics\":\"my\"},
{\"keys\":[\"g/4\"],\"duration\":\"q\",\"lyrics\":\"Mi\"}]},
{\"id\":69,\"notes\":[{\"keys\":[\"g/4\"],\"duration\":\"w\",\"lyrics\":\"chelle\"}]},
{\"id\":70,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":71,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":72,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":73,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":74,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":75,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":76,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":77,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":78,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]},
{\"id\":79,\"notes\":[{\"keys\":[\"b/4\"],\"duration\":\"w\",\"isRest\":true}]}]', 'uploads/previews/partition_1.png', 1, 0, '2026-02-18 14:55:32');

--
-- Déchargement des données de la table `score_instruments`
--

INSERT INTO `score_instruments` (`score_id`, `instrument_id`, `track_name`, `is_current`) VALUES
(1, 1, 'Ryhtmic', 0),
(1, 1, 'Solo', 0),
(1, 2, 'Choirs', 0),
(1, 2, 'Main', 1),
(1, 3, 'Main', 0),
(1, 5, 'Main', 0);

--
-- Déchargement des données de la table `songs`
--

INSERT INTO `songs` (`id`, `title`, `deezer_link`, `deezer_full_name`, `audio_preview`, `duration`, `artist_id`, `album_id`, `gender_id`, `is_explicit`, `created_at`) VALUES
(1, 'michelle', 'https://www.deezer.com/track/116348264', 'michelle (remastered 2009) - the beatles', 'https://cdnt-preview.dzcdn.net/api/1/1/8/2/a/0/82aed4ff815e92629fbd193688e8de2b.mp3?hdnea=exp=1773750270~acl=/api/1/1/8/2/a/0/82aed4ff815e92629fbd193688e8de2b.mp3*~data=user_id=0,application_id=42~hmac=d913a5425e10a4f1d8d3af5d4158326ec900535eb2d15d7e0d8f3e328ef6e6d5', 161, 1, 12047936, 132, 0, '2026-06-01 14:26:11');

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `external_id`, `username`, `email`, `password`, `created_at`) VALUES
(3, NULL, 'SagWel', 'nicolasbesnault@free.fr', '$2y$10$aYGJvMwoObpjF9fXhvdaO.UF6iF2oYu8dXEyyPJIWCE5SyT.rA4k2', '2026-03-01 14:38:48'),
(10, NULL, 'RubieMl', 'rubie_ml@yahoo.fr', '$2y$10$vyGYA7NsOTOCEw8iDTaukOljWuaLf5V.apFTQr9XBIUPfvCGCk.mm', '2026-03-13 14:20:22'),
(11, NULL, 'CamilleBordeaux', 'camille.bordeaux@laposte.net', '$2y$10$B8PT7dl43NAParxSvW48Eu2ubsHT9i5CA7ddYHk7sNW3SlPZlkgFK', '2026-03-14 14:11:44'),
(13, NULL, 'JulieVox', 'juliedupont18@gmail.com', '$2y$10$F0XD4DIQVNJYxyfuzf3kZ.T0Cg173XyEfB/5njxFHZ.j7dqBnFPT.', '2026-04-01 11:30:35'),
(35, NULL, 'Test', 'test@test.com', '$2y$10$17IuUuCUzIRoZOD5OvdNvuAwMxTFoveNYd3/jP9xFxOzZznanN5Xu', '2026-04-30 08:15:21'),
(50, NULL, 'Antoine', 'antoine@antoine.com', '$2y$10$fDHByHlPMfkeQGHxyYIB7unUqfEgAQz79I3LTjo6eb8qvlJ.2EtZO', '2026-05-04 15:08:22'),
(56, NULL, 'Jesuisunbg', 'jesuisunbg@jesaisplustropquoi.com', '$2y$10$.5XpDUrB663beIihvvWBvubMFz71gnqW9GFfbzbqi/rVGjJ/NLFpO', '2026-05-10 16:18:21'),
(58, NULL, 'Natacha', 'natacha@natacha.com', '$2y$10$oFmNQDp7/UqyBmyr3ALkiOlNb/XWFlKlEvBhdvNYk/JljX3mQbAg2', '2026-05-11 09:22:11'),
(61, NULL, 'Test120526', 'test120526@test.com', '$2y$10$sd819vqQbA.cW7Cu5vJ1.eYNFZ9ULSGwoFQZliCNiJBXH4tiYaAwS', '2026-05-12 15:53:16');

--
-- Déchargement des données de la table `user_history`
--

INSERT INTO `user_history` (`id`, `user_id`, `score_id`, `played_at`) VALUES
(18, 13, 1, '2026-04-29 12:19:54'),
(22, 56, 1, '2026-05-10 16:20:33'),
(23, 58, 1, '2026-05-11 09:43:52'),
(26, 61, 1, '2026-05-12 16:03:57'),
(27, 35, 1, '2026-06-02 09:06:12');

--
-- Déchargement des données de la table `user_instruments`
--

INSERT INTO `user_instruments` (`user_id`, `instrument_id`, `lvl`) VALUES
(3, 1, 3),
(10, 4, 1),
(11, 1, 1),
(11, 2, 1),
(13, 2, 3),
(35, 3, 3),
(50, 3, 1),
(56, 6, 5),
(56, 7, 1),
(58, 2, 3),
(58, 4, 3),
(61, 2, 2);

--
-- Déchargement des données de la table `user_profiles`
--

INSERT INTO `user_profiles` (`user_id`, `avatar_url`, `age`, `birthday`, `gender`, `language`, `filter_explicit`, `is_child_account`) VALUES
(3, NULL, 33, '1992-08-18', 'M', 'fr', 'not_filtered', 0),
(10, NULL, 0, NULL, 'Private', 'fr', 'not_filtered', 0),
(11, NULL, 0, NULL, 'Private', 'fr', 'not_filtered', 0),
(13, NULL, 31, '1995-04-17', 'F', 'fr', 'not_filtered', 0),
(35, 'avatar_35_6a0b2e1d77d2a.jpeg', 31, '1994-07-10', 'M', 'fr', 'not_filtered', 0),
(50, NULL, 15, NULL, 'M', 'fr', 'hidden', 1),
(56, NULL, 76, NULL, 'NB', 'fr', '', 0),
(58, NULL, 25, '2001-03-02', 'F', 'fr', '', 0),
(61, NULL, 25, NULL, 'M', 'fr', '', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `fk_album_artist` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `scorbraries`
--
ALTER TABLE `scorbraries`
  ADD CONSTRAINT `fk_scorbrary_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `scorbrary_items`
--
ALTER TABLE `scorbrary_items`
  ADD CONSTRAINT `fk_item_partition` FOREIGN KEY (`score_id`) REFERENCES `scores` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_item_scorbrary` FOREIGN KEY (`scorbrary_id`) REFERENCES `scorbraries` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `fk_part_song` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`);

--
-- Contraintes pour la table `score_instruments`
--
ALTER TABLE `score_instruments`
  ADD CONSTRAINT `fk_link_instrument` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_link_partition` FOREIGN KEY (`score_id`) REFERENCES `scores` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `score_views`
--
ALTER TABLE `score_views`
  ADD CONSTRAINT `fk_views_partition` FOREIGN KEY (`score_id`) REFERENCES `scores` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_views_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `fk_part_album` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`),
  ADD CONSTRAINT `fk_part_artist` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`),
  ADD CONSTRAINT `fk_part_genre` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`);

--
-- Contraintes pour la table `user_history`
--
ALTER TABLE `user_history`
  ADD CONSTRAINT `fk_history_partition` FOREIGN KEY (`score_id`) REFERENCES `scores` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_history_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user_instruments`
--
ALTER TABLE `user_instruments`
  ADD CONSTRAINT `fk_ui_inst` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ui_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `fk_profile_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;