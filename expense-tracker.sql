-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Dec 29, 2025 at 11:28 PM
-- Server version: 8.0.44
-- PHP Version: 8.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expense-tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `accumulated`
--

CREATE TABLE `accumulated` (
  `id` int NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `total` float NOT NULL DEFAULT '0',
  `belong_to` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `accumulated`
--

INSERT INTO `accumulated` (`id`, `uuid`, `total`, `belong_to`, `created_at`, `name`) VALUES
(2, 'd3865d00-7707-11f0-86fc-13e807de0b22', 27536, '993c4b34-6764-44c9-bae5-e1eb26ca1746', '2025-08-11 23:06:34', 'Herencia');

-- --------------------------------------------------------

--
-- Table structure for table `purpose`
--

CREATE TABLE `purpose` (
  `id` int NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `total` float NOT NULL DEFAULT '0',
  `belong_to` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `purpose`
--

INSERT INTO `purpose` (`id`, `uuid`, `name`, `total`, `belong_to`, `created_at`) VALUES
(6, '94cc0cc0-90e0-11f0-8169-2372cdfa1342', 'Ahorro general', 19343, '993c4b34-6764-44c9-bae5-e1eb26ca1746', '2025-09-13 20:31:09'),
(7, 'cd5be0b0-90e0-11f0-8169-2372cdfa1342', 'Casa', 2500, '993c4b34-6764-44c9-bae5-e1eb26ca1746', '2025-09-13 20:32:44'),
(8, 'e61fe790-90e0-11f0-8169-2372cdfa1342', 'Tatuaje', 1000, '993c4b34-6764-44c9-bae5-e1eb26ca1746', '2025-09-13 20:33:25'),
(9, '0c6bad30-90e1-11f0-8169-2372cdfa1342', 'Seguro del coche', 500, '993c4b34-6764-44c9-bae5-e1eb26ca1746', '2025-09-13 20:34:29'),
(10, '67954690-dab4-11f0-8e6b-7d264168ee8a', 'raqueta', 600, '993c4b34-6764-44c9-bae5-e1eb26ca1746', '2025-12-16 19:21:21');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `date` timestamp NOT NULL,
  `is_expense` tinyint(1) NOT NULL,
  `name` varchar(50) NOT NULL,
  `amount` float NOT NULL DEFAULT '0',
  `included_in` int NOT NULL,
  `is_cash` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `uuid`, `date`, `is_expense`, `name`, `amount`, `included_in`, `is_cash`) VALUES
(24, 'b9b6bbc0-90e0-11f0-8169-2372cdfa1342', '2025-09-14 02:31:00', 0, 'Ahorro inicial', 22583, 6, 0),
(25, 'dbf7a780-90e0-11f0-8169-2372cdfa1342', '2025-09-14 02:32:00', 0, 'Casa inicial', 2000, 7, 0),
(26, '049e9b30-90e1-11f0-8169-2372cdfa1342', '2025-09-14 02:32:00', 0, 'Tatuaje inicial', 759, 8, 0),
(27, '37cf28d0-90e1-11f0-8169-2372cdfa1342', '2025-09-02 00:00:00', 1, 'Renta', 2000, 7, 1),
(28, '5a3a58e0-90e1-11f0-8169-2372cdfa1342', '2025-09-08 02:30:00', 1, 'Pago parcial tarjeta', 5000, 6, 0),
(29, '7da349e0-90e1-11f0-8169-2372cdfa1342', '2025-09-14 02:37:00', 0, 'Aporte de esta quincena', 2100, 7, 0),
(30, 'a2453010-90e1-11f0-8169-2372cdfa1342', '2025-09-14 02:32:00', 0, 'Ahorro de esta quincena', 8000, 6, 0),
(31, 'ba7cfc80-90e1-11f0-8169-2372cdfa1342', '2025-09-14 02:32:00', 0, '584', 584, 8, 0),
(32, '78648e70-90e2-11f0-8169-2372cdfa1342', '2025-09-14 02:44:00', 1, 'Pago tarjeta de agosto', 15060, 6, 0),
(33, '8afc04a0-9a3d-11f0-8ed7-c37b0a6880e2', '2025-09-19 01:00:00', 1, 'apartar cita de tatuaje', 500, 8, 0),
(34, '7ab3ade0-9e30-11f0-8b5b-05b0c7bf630f', '2025-09-28 00:00:00', 1, 'Sesion de pierna ', 843, 8, 1),
(35, '8fc7cc20-9e30-11f0-8b5b-05b0c7bf630f', '2025-09-28 00:00:00', 1, 'Completar tatuaje', 457, 7, 1),
(36, '6104dc60-9e31-11f0-8b5b-05b0c7bf630f', '2025-10-01 01:11:00', 0, 'Aporte de esta quincena', 857, 7, 0),
(37, '84a53110-9e31-11f0-8b5b-05b0c7bf630f', '2025-10-01 01:11:00', 0, 'Aporte voluntario', 8000, 6, 0),
(38, 'b4f708c0-9e31-11f0-8b5b-05b0c7bf630f', '2025-10-01 01:14:00', 0, 'Next tatt', 900, 8, 0),
(39, '800303c0-9e32-11f0-8b5b-05b0c7bf630f', '2025-10-01 01:20:00', 1, 'renta + titulo', 2500, 7, 0),
(41, '4ba6eae0-aa19-11f0-b11e-e9cd1798a32e', '2025-10-16 04:49:00', 0, 'segunda quincena de octubre', 2500, 7, 0),
(42, '610ef580-aa19-11f0-b11e-e9cd1798a32e', '2025-10-16 04:50:00', 0, 'seguro del coche', 1200, 9, 0),
(43, '85a717b0-aa19-11f0-b11e-e9cd1798a32e', '2025-10-16 04:50:00', 0, 'Aporte voluntario', 6000, 6, 0),
(44, '9e08da50-aa19-11f0-b11e-e9cd1798a32e', '2025-10-16 04:52:00', 0, 'aporte next tatt', 343, 8, 0),
(45, '35b177e0-aa1a-11f0-b11e-e9cd1798a32e', '2025-10-16 04:56:00', 1, 'Pago de tarjeta', 15100, 6, 0),
(46, '024e24b0-adef-11f0-90cc-85dc75ec69c5', '2025-10-20 01:00:00', 1, 'pago casa', 2500, 7, 1),
(47, '89230100-b5eb-11f0-8249-735b7ac381f6', '2025-10-31 05:52:00', 0, 'renta', 2100, 7, 0),
(48, '97ecb5a0-b5eb-11f0-8249-735b7ac381f6', '2025-10-31 05:55:00', 0, 'seguro del coche', 1200, 9, 0),
(49, 'aa33d130-b5eb-11f0-8249-735b7ac381f6', '2025-10-31 05:55:00', 0, 'tattoo', 500, 8, 0),
(50, 'c6a85cf0-b5eb-11f0-8249-735b7ac381f6', '2025-10-31 05:55:00', 0, 'Ahorro de esta quincena', 6100, 6, 0),
(51, '2ccd80a0-b5ec-11f0-8249-735b7ac381f6', '2025-10-31 06:00:00', 1, 'transferencia renta', 2100, 7, 0),
(52, '6850b100-c0ce-11f0-9196-a7d0de131fb2', '2025-11-09 01:00:00', 1, 'tattoo session', 1743, 8, 0),
(53, 'bdf6f600-c0ce-11f0-9196-a7d0de131fb2', '2025-11-14 02:24:00', 0, 'aportacion casa', 2100, 7, 0),
(55, '7d8f9350-c0cf-11f0-9196-a7d0de131fb2', '2025-11-14 02:29:00', 0, 'tarjeta', 7354, 6, 0),
(56, '270cdb90-c0d0-11f0-9196-a7d0de131fb2', '2025-11-14 02:34:00', 1, 'pago tarjeta', 19334, 6, 0),
(57, '07c80420-cc89-11f0-ae13-298819f87878', '2025-11-29 00:35:00', 0, 'renta', 400, 7, 0),
(58, '1c704130-cc89-11f0-ae13-298819f87878', '2025-11-29 00:36:00', 0, 'tarjeta', 8000, 6, 0),
(59, '414d82b0-cc89-11f0-ae13-298819f87878', '2025-11-29 00:37:00', 0, 'Parte del seguro', 1200, 9, 0),
(60, '9eb67970-cc89-11f0-ae13-298819f87878', '2025-11-29 00:39:00', 1, 'ajuste para a tattoo', 600, 9, 0),
(61, 'b1412db0-cc89-11f0-ae13-298819f87878', '2025-11-29 00:40:00', 0, 'ingreso para tatuaje', 600, 8, 0),
(62, '91e0b020-cc8a-11f0-ae13-298819f87878', '2025-11-29 00:46:00', 1, 'pago de renta', 2000, 7, 0),
(63, '0731ad70-dab4-11f0-8e6b-7d264168ee8a', '2025-12-17 01:18:00', 0, 'Aporte mangas', 2000, 8, 0),
(64, '1476e4f0-dab4-11f0-8e6b-7d264168ee8a', '2025-12-17 01:18:00', 0, 'Aporte seguro', 1000, 9, 0),
(66, '30df89d0-dab4-11f0-8e6b-7d264168ee8a', '2025-12-17 01:19:00', 0, 'Casa', 2000, 7, 0),
(67, '5da8d700-dab4-11f0-8e6b-7d264168ee8a', '2025-12-17 01:20:00', 0, 'ahorro General', 8000, 6, 0),
(68, '7dc7a610-dab4-11f0-8e6b-7d264168ee8a', '2025-12-17 01:21:00', 0, 'Santa', 10000, 10, 0),
(69, '92486880-dab5-11f0-8e6b-7d264168ee8a', '2025-12-17 01:29:00', 1, 'pago tarjeta', 11200, 6, 0),
(70, 'a2161fa0-dab5-11f0-8e6b-7d264168ee8a', '2025-12-17 01:29:00', 1, 'cambio a general', 3000, 10, 0),
(71, 'aef171c0-dab5-11f0-8e6b-7d264168ee8a', '2025-12-17 01:30:00', 0, 'de santa de general', 3000, 6, 0),
(72, '9033a760-dab7-11f0-8e6b-7d264168ee8a', '2025-12-17 01:43:00', 1, 'pago seguro semestral', 4000, 9, 0),
(73, '6b3dc3b0-df6b-11f0-96fa-e3842e347189', '2025-12-22 08:00:00', 1, '1st session arms', 2600, 8, 1),
(74, 'a4ba1a80-df6b-11f0-96fa-e3842e347189', '2025-12-17 07:22:00', 1, 'renta', 2500, 7, 0),
(75, 'c807ad80-e50c-11f0-8a19-7b6dad9344a0', '2025-12-24 11:18:00', 1, 'santa llego', 7000, 10, 0),
(76, '0ca0b680-e50d-11f0-8a19-7b6dad9344a0', '2025-12-30 05:20:00', 0, 'Aporte seguro', 500, 9, 0),
(77, '1b0f04b0-e50d-11f0-8a19-7b6dad9344a0', '2025-12-30 05:21:00', 0, 'renta ', 2500, 7, 0),
(78, '4235c100-e50d-11f0-8a19-7b6dad9344a0', '2025-12-30 05:22:00', 0, 'tarjeta', 8000, 6, 0),
(79, '597ee7b0-e50d-11f0-8a19-7b6dad9344a0', '2025-12-30 05:23:00', 0, 'aporte segunda sesion mangas', 1000, 8, 0),
(80, '063ded70-e50e-11f0-8a19-7b6dad9344a0', '2025-12-30 05:27:00', 0, 'aporte raqueta', 600, 10, 0);

--
-- Triggers `transaction`
--
DELIMITER $$
CREATE TRIGGER `update_purpose_total` AFTER INSERT ON `transaction` FOR EACH ROW UPDATE purpose
    SET total = (
        SELECT COALESCE(SUM(CASE WHEN is_expense THEN -amount ELSE amount END), 0)
        FROM transaction
        WHERE included_in = NEW.included_in
    )
    WHERE id = NEW.included_in
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_total_purpose_delete` AFTER DELETE ON `transaction` FOR EACH ROW UPDATE purpose
    SET total = (
        SELECT COALESCE(SUM(CASE WHEN is_expense THEN -amount ELSE amount END), 0)
        FROM transaction
        WHERE included_in = OLD.included_in
    )
    WHERE id = OLD.included_in
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uuid` char(36) NOT NULL,
  `username` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uuid`, `username`) VALUES
('993c4b34-6764-44c9-bae5-e1eb26ca1746', 'lince');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accumulated`
--
ALTER TABLE `accumulated`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `belong_to_FK_1` (`belong_to`);

--
-- Indexes for table `purpose`
--
ALTER TABLE `purpose`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `purpose_FK_1` (`belong_to`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `transaction_FK_1` (`included_in`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accumulated`
--
ALTER TABLE `accumulated`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purpose`
--
ALTER TABLE `purpose`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accumulated`
--
ALTER TABLE `accumulated`
  ADD CONSTRAINT `belong_to_FK_1` FOREIGN KEY (`belong_to`) REFERENCES `users` (`uuid`);

--
-- Constraints for table `purpose`
--
ALTER TABLE `purpose`
  ADD CONSTRAINT `purpose_FK_1` FOREIGN KEY (`belong_to`) REFERENCES `users` (`uuid`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_FK_1` FOREIGN KEY (`included_in`) REFERENCES `purpose` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
