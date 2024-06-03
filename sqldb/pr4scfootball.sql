-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2024 a las 09:34:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pr4scfootball`
--
CREATE DATABASE IF NOT EXISTS `pr4scfootball` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pr4scfootball`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `leagues`
--

CREATE TABLE `leagues` (
  `id_league` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `classification` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `leagues`
--

INSERT INTO `leagues` (`id_league`, `name`, `classification`) VALUES
(1, 'JUVENIL PRIMERA DIVISION', 'skksks'),
(6, 'LOS TETES', NULL),
(7, 'L)OSTETES', NULL),
(12, 'PAPITU', NULL),
(13, 'PAPITU 2', NULL),
(14, 'JSSIJSI', NULL),
(15, 'DBHSBDH', NULL),
(16, 'NFJDNFJDNJ', NULL),
(17, 'FDFD', NULL),
(19, 'LOS TETEsdsd', NULL),
(20, 'MDKD', NULL),
(21, 'sdsds', NULL),
(22, 'A', NULL),
(24, 'AS', NULL),
(25, 'JUVENIL PRIMERA', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matches`
--

CREATE TABLE `matches` (
  `id_match` int(11) NOT NULL,
  `local_team` int(11) NOT NULL,
  `visitor_team` int(11) NOT NULL,
  `day` date NOT NULL,
  `hour` time NOT NULL,
  `journey` int(11) NOT NULL,
  `league` int(11) NOT NULL,
  `result` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `matches`
--

INSERT INTO `matches` (`id_match`, `local_team`, `visitor_team`, `day`, `hour`, `journey`, `league`, `result`) VALUES
(1, 15, 18, '2024-05-04', '16:00:00', 1, 1, '3-1'),
(23, 18, 15, '2024-05-08', '20:00:00', 2, 1, '1-1'),
(25, 15, 14, '2024-05-10', '20:00:00', 3, 1, '2-0'),
(26, 15, 16, '2024-05-19', '20:00:00', 5, 1, '1-1'),
(27, 15, 17, '2024-05-25', '20:00:00', 7, 1, '3-0'),
(35, 14, 15, '2024-05-22', '20:45:00', 6, 1, '0-1'),
(36, 16, 15, '2024-05-31', '20:45:00', 8, 1, NULL),
(39, 19, 15, '2024-05-15', '18:00:00', 4, 1, '1-0'),
(68, 15, 34, '2024-06-03', '20:00:00', 9, 1, NULL),
(69, 17, 15, '2024-06-05', '17:00:00', 10, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `players`
--

CREATE TABLE `players` (
  `id_player` int(11) NOT NULL,
  `federationNumber` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `team` int(11) NOT NULL,
  `position` enum('POR','DFC','LD / CAD','LI / CAI','MCD','MC','MCO','MI','MD','EI','ED','SD','DC') NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `players`
--

INSERT INTO `players` (`id_player`, `federationNumber`, `name`, `description`, `team`, `position`, `image`) VALUES
(10, '59652659Ñ', 'Ñenjo', 'Estable con balón, abarca mucho campo, tiene un gran poderío físico', 15, 'MCD', 'uploads\\playerUploads\\59652659Ñ\\undefined-406625-1695024988.webp'),
(11, '67456467I', 'Iago Palazón Gomez', 'Jugador rapido, un pulmón ', 15, 'LD / CAD', 'uploads\\playerUploads\\67456467I\\undefined-433177-1684155052.webp'),
(12, '56376567M', 'Moussa Baka', 'Tremendamente habilidoso, un jugón, el mejor 1vs1 de la categoría', 15, 'EI', 'uploads\\playerUploads\\56376567M\\undefined-371998-1664869583.webp'),
(13, '64573873W', 'Willy Chantiez', 'Muy corpulento, fuerte en las disputas', 19, 'DC', 'uploads\\playerUploads\\64573873W\\undefined-357164-1661352687.webp'),
(14, '37847873K', 'Iker Carrillo', 'Pivote con mucha clase', 19, 'MCD', 'uploads\\playerUploads\\37847873K\\undefined-413112-1668500754.webp'),
(15, '64736437M', 'Max Ballesta', 'Jugador muy rápido, mucho gol, poco trabajador en defensa', 19, 'EI', 'uploads\\playerUploads\\64736437M\\undefined-580195-1711745441.webp'),
(16, '78347438L', 'Lautaro Picón', 'Delantero centro muy corpulento', 19, 'DC', 'uploads\\playerUploads\\78347438L\\undefined-576024-1684920938.webp'),
(17, '47334363H', 'Albert Girones', 'Jugador muy habilidoso, no pierde un balón', 19, 'MC', 'uploads\\playerUploads\\47334363H\\undefined-316264-1678877651 (1).webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `scouts`
--

CREATE TABLE `scouts` (
  `id_scout` int(11) NOT NULL,
  `player` int(11) NOT NULL,
  `team` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `scouts`
--

INSERT INTO `scouts` (`id_scout`, `player`, `team`, `description`) VALUES
(15, 15, 15, 'Jugador muy rapido'),
(16, 14, 15, '465'),
(17, 11, 15, 'sadada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stats`
--

CREATE TABLE `stats` (
  `id_stats` int(11) NOT NULL,
  `id_match` int(11) NOT NULL,
  `id_team` int(11) NOT NULL,
  `player` int(11) NOT NULL,
  `minutes` int(11) NOT NULL,
  `yellow_cards` int(11) NOT NULL,
  `goals` int(11) NOT NULL,
  `assist` int(11) NOT NULL,
  `shots` int(11) NOT NULL,
  `goodShots` int(11) NOT NULL,
  `pass` int(11) NOT NULL,
  `goodPass` int(11) NOT NULL,
  `1vs1_OF` int(11) NOT NULL,
  `1vs1_DEF` int(11) NOT NULL,
  `interceptions` int(11) NOT NULL,
  `steals` int(11) NOT NULL,
  `Rating` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stats`
--

INSERT INTO `stats` (`id_stats`, `id_match`, `id_team`, `player`, `minutes`, `yellow_cards`, `goals`, `assist`, `shots`, `goodShots`, `pass`, `goodPass`, `1vs1_OF`, `1vs1_DEF`, `interceptions`, `steals`, `Rating`) VALUES
(4, 36, 16, 15, 70, 1, 0, 0, 12, 7, 6, 5, 3, 0, 3, 5, 4.65),
(6, 36, 16, 13, 80, 1, 2, 1, 10, 6, 8, 5, 4, 0, 0, 0, 3.05),
(7, 36, 16, 16, 90, 1, 2, 1, 17, 11, 17, 13, 19, 0, 3, 4, 3.95),
(8, 68, 15, 12, 70, 0, 2, 1, 11, 9, 20, 18, 13, 0, 1, 1, 7.75),
(10, 68, 15, 10, 55, 0, 2, 2, 14, 8, 43, 38, 9, 8, 11, 13, 6.75),
(11, 68, 34, 14, 75, 1, 1, 1, 16, 10, 21, 19, 7, 6, 4, 7, 6.61),
(12, 69, 15, 11, 86, 1, 2, 2, 10, 6, 28, 22, 0, 15, 21, 21, 4.54),
(13, 68, 15, 11, 22, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6),
(14, 68, 34, 17, 65, 1, 3, 0, 21, 18, 25, 23, 6, 1, 2, 2, 6.84);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teams`
--

CREATE TABLE `teams` (
  `id_team` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `league` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `teams`
--

INSERT INTO `teams` (`id_team`, `name`, `league`, `image`) VALUES
(14, 'RCD Espanyol', 1, '/uploads/1-00100_0000582930_espanyol-200x200.png'),
(15, 'FF Badalona', 1, '/uploads/1-00100_0000599903_ffb_200x200.png'),
(16, 'CE Mataro', 1, '/uploads/1-00100_0000672015_cemataro_200x200.png'),
(17, 'CE Hospitalet', 1, '/uploads/1-00100_0000879825_cehospi_200.png'),
(18, 'CF Bufala', 1, '/uploads/1-00100_0000894175_bufalacf_200.png'),
(19, 'FCB', 1, '/uploads/1-00100_0000614269_FCB200.png'),
(34, 'Premier BCN', 1, '/uploads/1-00100_0000754057_premierbcn_200x200.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `team` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `surname`, `team`) VALUES
(2, 'agirones600@gmail.com', '$2a$10$tZt4eRp1H6mLNTcUw8lx6uNnxP0HRU3LuE3wsNwYVR8lrSbxVhg6C', 'Albert', 'Girones Rodriguez', 15),
(3, 'Mandreade@gmail.com', '$2a$10$BXRQmL6RHmTg2WXRRMekaOmuACOcXhpoxFcGkYi/aY53f..o3JK5G', 'Marcos', 'Andrade Garcia', 14),
(6, 'fgirones600@gmail.com', '$2a$10$eKXj96ezI6DkNEXd2RSg6eq2iT9vF.zarWP7j1XTaaP6mK8vakI4y', 'Francesc', 'Girones Sanchez', NULL),
(7, 'agirones59@gmail.com', '$2a$10$19S9ZA81ejIYcrNbxbWlbOMR6CrYAF7tBNwK3xkvdth41YoSj4ZJq', 'Cristobal', 'Márquez Ruiz', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `leagues`
--
ALTER TABLE `leagues`
  ADD PRIMARY KEY (`id_league`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id_match`),
  ADD UNIQUE KEY `journey` (`journey`,`league`),
  ADD UNIQUE KEY `journey_2` (`journey`),
  ADD KEY `local_team` (`local_team`,`visitor_team`,`journey`,`league`),
  ADD KEY `league` (`league`),
  ADD KEY `visitor_team` (`visitor_team`),
  ADD KEY `day` (`day`);

--
-- Indices de la tabla `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id_player`),
  ADD UNIQUE KEY `federationNumber` (`federationNumber`),
  ADD KEY `team` (`team`);

--
-- Indices de la tabla `scouts`
--
ALTER TABLE `scouts`
  ADD PRIMARY KEY (`id_scout`),
  ADD KEY `player` (`player`,`team`),
  ADD KEY `team` (`team`);

--
-- Indices de la tabla `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id_stats`),
  ADD KEY `id_match` (`id_match`,`player`),
  ADD KEY `player` (`player`),
  ADD KEY `id_team` (`id_team`);

--
-- Indices de la tabla `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id_team`),
  ADD KEY `league` (`league`),
  ADD KEY `name` (`name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`,`email`),
  ADD KEY `team` (`team`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `leagues`
--
ALTER TABLE `leagues`
  MODIFY `id_league` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `matches`
--
ALTER TABLE `matches`
  MODIFY `id_match` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `id_player` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `scouts`
--
ALTER TABLE `scouts`
  MODIFY `id_scout` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `stats`
--
ALTER TABLE `stats`
  MODIFY `id_stats` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `teams`
--
ALTER TABLE `teams`
  MODIFY `id_team` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `FK_matches_leagues` FOREIGN KEY (`league`) REFERENCES `leagues` (`id_league`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_matches_teams` FOREIGN KEY (`local_team`) REFERENCES `teams` (`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_matches_teams_2` FOREIGN KEY (`visitor_team`) REFERENCES `teams` (`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `scouts`
--
ALTER TABLE `scouts`
  ADD CONSTRAINT `scouts_ibfk_1` FOREIGN KEY (`id_scout`) REFERENCES `players` (`id_player`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `stats`
--
ALTER TABLE `stats`
  ADD CONSTRAINT `stats_ibfk_1` FOREIGN KEY (`id_match`) REFERENCES `matches` (`id_match`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `stats_ibfk_2` FOREIGN KEY (`player`) REFERENCES `players` (`id_player`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `stats_ibfk_3` FOREIGN KEY (`id_team`) REFERENCES `teams` (`id_team`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
