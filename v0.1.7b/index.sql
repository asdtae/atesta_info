-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 17. 12:00
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `12b19a`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `index`
--

CREATE TABLE `index` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `text` varchar(1000) NOT NULL,
  `megjegyzes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `index`
--

INSERT INTO `index` (`id`, `text`, `megjegyzes`) VALUES
(1, 'Cyclesphere', 'title'),
(2, 'Reduce, Reuse, Recycle — For a Cleaner, Greener Future!', 'motto'),
(3, 'Recycling is the process of collecting, processing, and reusing materials that would otherwise be thrown away as waste. By converting waste into reusable materials, recycling helps conserve natural resources, reduces pollution, and supports sustainable development.', 'bio'),
(4, 'Save Natural Resources: Recycling conserves raw materials such as metals, plastics, and paper.', 'points1'),
(5, 'Protect the Environment: Recycling reduces the amount of waste sent to landfills and incinerators, helping to decrease pollution.\r\n', 'points2'),
(6, 'Energy Savings: Manufacturing with recycled materials uses less energy than making products from raw materials.\r\n', 'points3'),
(7, 'Support the Economy: Recycling creates jobs and drives the green economy by promoting the use of sustainable products.', 'points4'),
(8, 'To spread awareness about the benefits of recycling and provide practical resources for individuals and businesses to recycle more effectively. Together, we can reduce waste, conserve energy, and protect our planet for future generations.', 'mission'),
(9, 'Learn How: Discover the proper methods of recycling in your community.\r\n', 'more points1'),
(10, 'Take Action: Start recycling at home, school, or work today!\r\n', 'more points2'),
(11, 'Spread the Word: Educate others about the importance of recycling.', 'more points3');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `index`
--
ALTER TABLE `index`
  ADD UNIQUE KEY `id` (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `index`
--
ALTER TABLE `index`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
