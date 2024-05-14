-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Temps de generació: 14-05-2024 a les 20:47:51
-- Versió del servidor: 10.4.32-MariaDB
-- Versió de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `pr4scfootball`
--
CREATE DATABASE IF NOT EXISTS `pr4scfootball` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pr4scfootball`;

-- --------------------------------------------------------

--
-- Estructura de la taula `leagues`
--

CREATE TABLE `leagues` (
  `id_league` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `classification` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Bolcament de dades per a la taula `leagues`
--

INSERT INTO `leagues` (`id_league`, `name`, `classification`) VALUES
(1, 'JUVENIL SEGUNDA DIVISION GRUPO 3', 'skksks');

-- --------------------------------------------------------

--
-- Estructura de la taula `matches`
--

CREATE TABLE `matches` (
  `id_match` int(11) NOT NULL,
  `local_team` int(11) NOT NULL,
  `visitor_team` int(11) NOT NULL,
  `day` date NOT NULL,
  `hour` time NOT NULL,
  `journey` int(11) NOT NULL,
  `league` int(11) NOT NULL,
  `result` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Bolcament de dades per a la taula `matches`
--

INSERT INTO `matches` (`id_match`, `local_team`, `visitor_team`, `day`, `hour`, `journey`, `league`, `result`) VALUES
(1, 1, 2, '2024-05-17', '16:00:00', 1, 1, '0-0');

-- --------------------------------------------------------

--
-- Estructura de la taula `players`
--

CREATE TABLE `players` (
  `id_player` int(11) NOT NULL,
  `federationNumber` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `team` int(11) NOT NULL,
  `position` enum('POR','DFC','LD / CAD','LI / CAI','MCD','MC','MCO','MI','MD','EI','ED','SD','DC') NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `stats`
--

CREATE TABLE `stats` (
  `id_stats` int(11) NOT NULL,
  `id_match` int(11) NOT NULL,
  `player` int(11) NOT NULL,
  `minutes` int(11) NOT NULL,
  `yellow_cards` int(11) NOT NULL,
  `red_cards` int(11) NOT NULL,
  `goals` int(11) NOT NULL,
  `assist` int(11) NOT NULL,
  `shots` int(11) NOT NULL,
  `passes` int(11) NOT NULL,
  `blocks` int(11) NOT NULL,
  `outsides` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de la taula `teams`
--

CREATE TABLE `teams` (
  `id_team` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `league` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Bolcament de dades per a la taula `teams`
--

INSERT INTO `teams` (`id_team`, `name`, `league`, `image`) VALUES
(1, 'CF Badalona', 1, 'jnjsndj'),
(2, 'CF Bufala', 1, 'sdsds');

-- --------------------------------------------------------

--
-- Estructura de la taula `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `team` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Bolcament de dades per a la taula `users`
--

INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `team`) VALUES
(1, 'agirones600@gmail.com', '123', 'Albert', 'Girones Rodriguez', 1);

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `leagues`
--
ALTER TABLE `leagues`
  ADD PRIMARY KEY (`id_league`);

--
-- Índexs per a la taula `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `local_team` (`local_team`,`visitor_team`,`journey`,`league`),
  ADD KEY `league` (`league`),
  ADD KEY `visitor_team` (`visitor_team`);

--
-- Índexs per a la taula `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id_player`),
  ADD UNIQUE KEY `federationNumber` (`federationNumber`),
  ADD KEY `team` (`team`);

--
-- Índexs per a la taula `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id_stats`),
  ADD KEY `id_match` (`id_match`,`player`),
  ADD KEY `player` (`player`);

--
-- Índexs per a la taula `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id_team`),
  ADD KEY `league` (`league`);

--
-- Índexs per a la taula `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`,`email`),
  ADD KEY `team` (`team`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `leagues`
--
ALTER TABLE `leagues`
  MODIFY `id_league` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la taula `matches`
--
ALTER TABLE `matches`
  MODIFY `id_match` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la taula `players`
--
ALTER TABLE `players`
  MODIFY `id_player` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `stats`
--
ALTER TABLE `stats`
  MODIFY `id_stats` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `teams`
--
ALTER TABLE `teams`
  MODIFY `id_team` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la taula `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restriccions per a les taules bolcades
--

--
-- Restriccions per a la taula `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`league`) REFERENCES `leagues` (`id_league`),
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`local_team`) REFERENCES `teams` (`id_team`),
  ADD CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`visitor_team`) REFERENCES `teams` (`id_team`);

--
-- Restriccions per a la taula `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);

--
-- Restriccions per a la taula `stats`
--
ALTER TABLE `stats`
  ADD CONSTRAINT `stats_ibfk_1` FOREIGN KEY (`player`) REFERENCES `players` (`id_player`),
  ADD CONSTRAINT `stats_ibfk_2` FOREIGN KEY (`id_match`) REFERENCES `matches` (`id_match`);

--
-- Restriccions per a la taula `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`league`) REFERENCES `leagues` (`id_league`);

--
-- Restriccions per a la taula `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
