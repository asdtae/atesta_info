-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2025 at 06:58 AM
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'test@example.com', 'test@example.com', '$2b$10$Oa8X.LGmSY1FYDZPB9ZkvejN2bXoLgmxqMe43aDMAQh/JFNc/9l6u', '2025-02-18 22:46:49'),
(2, 'asdadasd', 'asdadasd@asdadasd', '$2b$10$bf7QwXcKHaHEum5TGMXnR.2H4ppomaNADB7TFKqHxEhUJaszehIRm', '2025-02-18 22:55:15'),
(3, 'asdadadad', 'asdadadad@asdadadad', '$2b$10$qKyavn6dtRLpA8F8KQMAuuTnJYxfU8lRgC.QpUqaTKd6jcZA5uEIa', '2025-02-18 22:59:54'),
(4, 'user_gen', 'sdadadasdaf@asdadadad', '$2b$10$I3jUoOSvpWi4Gs8IZFOANeTiUtXHY9sRPndPe5JbY3LmY0Ard8pZ2', '2025-02-18 23:01:29'),
(6, 'adadasdad', 'adsadas@asdasd', '$2b$10$kDPVr.G7UJn8CR7.49/0t.kWaN9QqQwDVbN6hXC1dQWXI5Ghtx5KG', '2025-02-19 00:26:29'),
(7, 'adadasdaduihhui', 'adsadas@asdasdujiiu', '$2b$10$t4GXHRrWuUZvP3EOhoSEdu1leiOsm9LZoZJ6M25KyPtBpSuHzuA3a', '2025-02-19 05:51:17'),
(8, 'ada', '212322@asdasdujiiu', '$2b$10$lGk7fNxtdRDZ9aMjkC1W/ekn5i2Pt6eTXIk18iUQrg4CbyfeX8pIy', '2025-02-19 05:51:34'),
(9, 'adaas', '2123ss22@asdasdujiiu', '$2b$10$WwzVX55lIJ.oFT2WUygBhOqdWIW1zJpsXqDBRLuhBp0tXM0j5nnxO', '2025-02-19 05:52:18'),
(10, '2323fgyut', 'adsadas@asdasdyuigh', '$2b$10$5XvpVnwc4itxwssZr/RUPOB4uO.QOMSfrVjeMK.FPpWEAJxLl3rca', '2025-02-19 05:55:53');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
