SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de données : `d10h_!`
--

CREATE DATABASE IF NOT EXISTS `d10h_database` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `d10h_database`;

-- --------------------------------------------------------

--
-- Structure de la table `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `deezer_link` varchar(500) DEFAULT NULL,
  `cover` varchar(500) NOT NULL,
  `cover_small` varchar(500) DEFAULT NULL,
  `cover_medium` varchar(500) DEFAULT NULL,
  `cover_big` varchar(500) DEFAULT NULL,
  `cover_xl` varchar(500) DEFAULT NULL,
  `artist_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `artists`
--

CREATE TABLE `artists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `deezer_link` varchar(500) DEFAULT NULL,
  `picture` varchar(500) NOT NULL,
  `picture_small` varchar(500) DEFAULT NULL,
  `picture_medium` varchar(500) DEFAULT NULL,
  `picture_big` varchar(500) DEFAULT NULL,
  `picture_xl` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Structure de la table `genders`
--

CREATE TABLE `genders` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `picture` varchar(500) NOT NULL,
  `picture_small` varchar(500) DEFAULT NULL,
  `picture_medium` varchar(500) DEFAULT NULL,
  `picture_big` varchar(500) DEFAULT NULL,
  `picture_xl` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `instruments`
--

CREATE TABLE `instruments` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Structure de la table `scorbraries`
--

CREATE TABLE `scorbraries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `visibility` enum('public','private','collaborative') NOT NULL DEFAULT 'public',
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `scorbrary_items`
--

CREATE TABLE `scorbrary_items` (
  `scorbrary_id` int(11) NOT NULL,
  `score_id` int(11) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `bpm` int(11) NOT NULL,
  `difficulty` tinyint(4) NOT NULL,
  `time_signature` varchar(10) NOT NULL,
  `clef` varchar(20) NOT NULL,
  `clef_signature` varchar(10) DEFAULT NULL,
  `measures` longtext NOT NULL,
  `score_preview` varchar(500) DEFAULT NULL,
  `song_id` int(11) NOT NULL,
  `is_explicit` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `score_instruments`
--

CREATE TABLE `score_instruments` (
  `score_id` int(11) NOT NULL,
  `instrument_id` int(11) NOT NULL,
  `track_name` varchar(50) NOT NULL DEFAULT 'Main',
  `is_current` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `score_views`
--

CREATE TABLE `score_views` (
  `id` int(11) NOT NULL,
  `score_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `viewed_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `songs`
--

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `deezer_link` varchar(500) DEFAULT NULL,
  `deezer_full_name` varchar(255) NOT NULL,
  `audio_preview` varchar(500) DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `is_explicit` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `external_id` varchar(255) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `user_history`
--

CREATE TABLE `user_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `score_id` int(11) NOT NULL,
  `played_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user_instruments`
--

CREATE TABLE `user_instruments` (
  `user_id` int(11) NOT NULL,
  `instrument_id` int(11) NOT NULL,
  `lvl` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `user_id` int(11) NOT NULL,
  `avatar_url` varchar(500) DEFAULT NULL,
  `age` int(3) NOT NULL,
  `birthday` date DEFAULT NULL,
  `gender` enum('M','F','NB','Private') DEFAULT 'Private',
  `language` varchar(50) NOT NULL DEFAULT 'fr',
  `filter_explicit` enum('not_filtered','not_suggested','hidden') NOT NULL DEFAULT 'not_filtered',
  `is_child_account` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_album_artist` (`artist_id`);

--
-- Index pour la table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `scorbraries`
--
ALTER TABLE `scorbraries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_scorbrary_user` (`user_id`);

--
-- Index pour la table `scorbrary_items`
--
ALTER TABLE `scorbrary_items`
  ADD PRIMARY KEY (`scorbrary_id`,`score_id`),
  ADD KEY `fk_item_partition` (`score_id`);

--
-- Index pour la table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_part_song` (`song_id`);

--
-- Index pour la table `score_instruments`
--
ALTER TABLE `score_instruments`
  ADD PRIMARY KEY (`score_id`,`instrument_id`,`track_name`),
  ADD KEY `fk_link_instrument` (`instrument_id`);

--
-- Index pour la table `score_views`
--
ALTER TABLE `score_views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_views_partition` (`score_id`),
  ADD KEY `fk_views_user` (`user_id`);

--
-- Index pour la table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_part_album` (`album_id`),
  ADD KEY `fk_part_artist` (`artist_id`),
  ADD KEY `fk_part_genre` (`gender_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `deezer_id` (`external_id`);

--
-- Index pour la table `user_history`
--
ALTER TABLE `user_history`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_score_unique` (`user_id`,`score_id`),
  ADD KEY `fk_history_partition` (`score_id`);

--
-- Index pour la table `user_instruments`
--
ALTER TABLE `user_instruments`
  ADD PRIMARY KEY (`user_id`,`instrument_id`),
  ADD KEY `fk_ui_inst` (`instrument_id`);

--
-- Index pour la table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `instruments`
--
ALTER TABLE `instruments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `scorbraries`
--
ALTER TABLE `scorbraries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `score_views`
--
ALTER TABLE `score_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT pour la table `user_history`
--
ALTER TABLE `user_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;