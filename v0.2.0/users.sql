-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2025 at 01:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cyclesphere`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pfp` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `two_factor_enabled` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `pfp`, `bio`, `two_factor_enabled`, `created_at`, `updated_at`) VALUES
(1, 'test@example.com', 'test@example.com', '$2b$10$Oa8X.LGmSY1FYDZPB9ZkvejN2bXoLgmxqMe43aDMAQh/JFNc/9l6u', '', NULL, 0, '2025-02-18 22:46:49', '2025-03-05'),
(2, 'asdadasd', 'asdadasd@asdadasd', '$2b$10$bf7QwXcKHaHEum5TGMXnR.2H4ppomaNADB7TFKqHxEhUJaszehIRm', '', NULL, 0, '2025-02-18 22:55:15', '2025-03-05'),
(3, 'asdadadad', 'asdadadad@asdadadad', '$2b$10$qKyavn6dtRLpA8F8KQMAuuTnJYxfU8lRgC.QpUqaTKd6jcZA5uEIa', '', NULL, 0, '2025-02-18 22:59:54', '2025-03-05'),
(4, 'user_gen', 'sdadadasdaf@asdadadad', '$2b$10$I3jUoOSvpWi4Gs8IZFOANeTiUtXHY9sRPndPe5JbY3LmY0Ard8pZ2', '', NULL, 0, '2025-02-18 23:01:29', '2025-03-05'),
(6, 'adadasdad', 'adsadas@asdasd', '$2b$10$kDPVr.G7UJn8CR7.49/0t.kWaN9QqQwDVbN6hXC1dQWXI5Ghtx5KG', '', NULL, 0, '2025-02-19 00:26:29', '2025-03-05'),
(7, 'adadasdaduihhui', 'adsadas@asdasdujiiu', '$2b$10$t4GXHRrWuUZvP3EOhoSEdu1leiOsm9LZoZJ6M25KyPtBpSuHzuA3a', '', NULL, 0, '2025-02-19 05:51:17', '2025-03-05'),
(8, 'ada', '212322@asdasdujiiu', '$2b$10$lGk7fNxtdRDZ9aMjkC1W/ekn5i2Pt6eTXIk18iUQrg4CbyfeX8pIy', '', NULL, 0, '2025-02-19 05:51:34', '2025-03-05'),
(9, 'adaas', '2123ss22@asdasdujiiu', '$2b$10$WwzVX55lIJ.oFT2WUygBhOqdWIW1zJpsXqDBRLuhBp0tXM0j5nnxO', '', NULL, 0, '2025-02-19 05:52:18', '2025-03-05'),
(10, '2323fgyut', 'adsadas@asdasdyuigh', '$2b$10$5XvpVnwc4itxwssZr/RUPOB4uO.QOMSfrVjeMK.FPpWEAJxLl3rca', '', NULL, 0, '2025-02-19 05:55:53', '2025-03-05'),
(11, 'testokjom', 'test1@example.com', '$2b$10$oFH7xvt878SQ8LlnMjy7AOWV2o/e65fMYOH7zKHPuMBPJKgLczq3S', '/test/1.png', NULL, 0, '2025-03-03 19:26:32', '2025-03-05'),
(12, 'erfdgh', 'drftgdrftgdrftgdr@ftgdrftgdrftgdrftgdrftgdrftg', '$2b$10$0Hv68TFWLQTlUD9fOvB6s.JzOo3STVmazA/IlWZYr9ba0AOXHFPHe', NULL, NULL, 0, '2025-03-03 20:32:36', '2025-03-05'),
(13, 'user_gen', 'sfdfdsfd@sfdsfd', '$2b$10$x2r3yVP8k.gpYxkaxWqXUOmNqA/bwISoIzCiY7qHVDO0bLXyE.MpW', 'resources/default-avatar.jpg', NULL, 0, '2025-03-03 20:36:23', '2025-03-05'),
(14, 'testsss', 'ssaasas@fgfgfgfg', '$2b$10$WUEARQ7AYr1gT4Rx2RntlOxC1rcEyr8e0FVJpBosHEAyJDtoMyJPe', '/uploads/profile_1741035947522.png', NULL, 0, '2025-03-03 21:05:47', '2025-03-05'),
(15, 'matyika', 'matyi.horv@tbr.ro', '$2b$10$OQ.WOvsStmYAovhEUvO3U.aUvCD3HXb7qMB1w7ii3S4fSJVVBWyjK', '/uploads/profile_1741037886082.png', NULL, 0, '2025-03-03 21:38:06', '2025-03-05'),
(16, 'matyika', 'msatyi.horv@tbr.ro', '$2b$10$ARsuhAmt871Bt2CnftQtyuvuHuInuozP/7x/lT6yEhaCiVRWILFJC', '/uploads/profile_1741038028573.png', NULL, 0, '2025-03-03 21:40:28', '2025-03-05'),
(17, 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'sss@s', '$2b$10$aECLDhoj91btr1CMISfZ5uneESU0i6l6ly6vq7xrr0f4.G.S6/ZVK', '/default-avatar.jpg', NULL, 0, '2025-03-03 21:43:46', '2025-03-05'),
(18, 'ssaassasa', 'sasasasa@s', '$2b$10$P6gmujQdmGDTlpLQcT3fAuuxUYn6qMNP9Y3REuS6LB10nSm/NLz0a', '/default-avatar.jpg', NULL, 0, '2025-03-03 21:46:45', '2025-03-05'),
(19, 'ssasasaas', 'sassasa@ssaassa', '$2b$10$xarD9.JpnmXbB1GV4KbOPuxi.0BWuxNy1OelwgGOOg9Br7oCFuC66', '/uploads/profile_1741038447128.png', NULL, 0, '2025-03-03 21:47:27', '2025-03-05'),
(20, 'sasdsdaad', 'dssdasd@sdasd', '$2b$10$JJhPzoN2AtKKHTpzseJiE.SdSs1KqyTGIkjcs6.6jXXmEPkc6Aoci', '/default-avatar.jpg', NULL, 0, '2025-03-03 21:47:58', '2025-03-05'),
(21, 'tetii hiii', 'szeretem@csokit', '$2b$10$OLxi64Vstg7Fdox1ahsyu.7bWgoQrlmlJcur6uTw4visnIu1RC0m6', '/uploads/profile_1741039340440.png', NULL, 0, '2025-03-03 22:02:20', '2025-03-05'),
(22, 'rubi', 'ruben@tbr.com', '$2b$10$f50kP4B66APv8o6G9TQY8eldWwVSGwW7IBhK1.JaSCJ/RJ/40HkwK', '/uploads/profile_1741129688282.png', NULL, 0, '2025-03-04 23:08:08', '2025-03-05'),
(23, 'idkmannn', 'ruben1@tbr.com', '$2b$10$wqZxXuJnWs/VH.ZME/MBJezugUsEAE5OyGO34lzGjp3yVDyLNf0Li', '/uploads/profile_1741130207434.png', NULL, 0, '2025-03-04 23:16:47', '2025-03-05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
