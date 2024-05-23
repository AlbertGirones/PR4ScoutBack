-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2024 a las 19:57:36
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
(1, 15, 18, '2024-05-04', '16:00:00', 1, 1, NULL),
(23, 18, 15, '2024-05-08', '20:00:00', 2, 1, NULL),
(25, 15, 14, '2024-05-10', '20:00:00', 3, 1, NULL),
(26, 15, 16, '2024-05-13', '20:00:00', 5, 1, NULL),
(27, 15, 17, '2024-05-18', '20:00:00', 7, 1, NULL),
(35, 14, 15, '2024-05-21', '20:45:00', 6, 1, NULL),
(36, 16, 15, '2024-05-25', '20:45:00', 8, 1, NULL),
(38, 17, 15, '2024-06-01', '21:00:00', 9, 1, NULL),
(39, 19, 15, '2024-06-08', '18:00:00', 4, 1, NULL),
(40, 15, 19, '2024-06-14', '18:00:00', 10, 1, NULL);

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
(7, '47334363H', 'Albert Girones Rodriguez', 'Jugador lento, mucha clase, no pierde balones', 15, 'MCD', 'uploads\\playerUploads\\47334363H\\undefined-316264-1678877651.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stats`
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
(21, 'CE Jupiter', 1, '/uploads/1-00100_0000672019_cejupiter_200x200.png');

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
(3, 'Mandreade@gmail.com', '$2a$10$BXRQmL6RHmTg2WXRRMekaOmuACOcXhpoxFcGkYi/aY53f..o3JK5G', 'Marcos', 'Andrade Garcia', 14);

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
-- Indices de la tabla `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id_stats`),
  ADD KEY `id_match` (`id_match`,`player`),
  ADD KEY `player` (`player`);

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
  MODIFY `id_match` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `id_player` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `stats`
--
ALTER TABLE `stats`
  MODIFY `id_stats` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `teams`
--
ALTER TABLE `teams`
  MODIFY `id_team` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`league`) REFERENCES `leagues` (`id_league`),
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`local_team`) REFERENCES `teams` (`id_team`),
  ADD CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`visitor_team`) REFERENCES `teams` (`id_team`);

--
-- Filtros para la tabla `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);

--
-- Filtros para la tabla `stats`
--
ALTER TABLE `stats`
  ADD CONSTRAINT `stats_ibfk_1` FOREIGN KEY (`player`) REFERENCES `players` (`id_player`),
  ADD CONSTRAINT `stats_ibfk_2` FOREIGN KEY (`id_match`) REFERENCES `matches` (`id_match`);

--
-- Filtros para la tabla `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`league`) REFERENCES `leagues` (`id_league`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`team`) REFERENCES `teams` (`id_team`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
