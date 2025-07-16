-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2025 at 08:48 PM
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
-- Database: `travely-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `pasajeros`
--

CREATE TABLE `pasajeros` (
  `id` int(11) NOT NULL,
  `id_pasajero1` int(11) NOT NULL,
  `id_pasajero2` int(11) NOT NULL,
  `id_pasajero3` int(11) NOT NULL,
  `id_pasajero4` int(11) NOT NULL,
  `id_pasajero5` int(11) NOT NULL,
  `id_pasajero6` int(11) NOT NULL,
  `id_pasajero7` int(11) NOT NULL,
  `id_pasajero8` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ruta`
--

CREATE TABLE `ruta` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `salida` varchar(100) NOT NULL,
  `llegada` varchar(100) NOT NULL  
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` enum('conductor','pasajero','admin') NOT NULL,
  `sexo` enum('masculino','femenino','otro') DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `tipo`, `sexo`, `creado_en`, `estado`) VALUES
(1, 'admin', 'admin@travely.com', '$2b$10$1/k45Ct6kHZyCxxO1P9Sj.A3of5vg0ZczzRuM82eBtF6YaR9CW2C.', 'admin', 'otro', '2025-07-15 21:04:36', 'activo'),
(2, 'conductor', 'conductor@gmail.com', '$2b$10$/nX9yGb8pNCLfVWKPz8MjO0ijLgaBXhvASl9iio0gJi6DGlINudc2', 'conductor', 'masculino', '2025-07-16 14:52:22', 'activo'),
(3, 'pasajero', 'pasajero@gmail.com', '$2b$10$FRbEAHfNYKstXF188q1EIeSgbi3IOI9yy0Tx5cxeuhyzZOAV3LHpK', 'pasajero', 'masculino', '2025-07-16 15:18:23', 'inactivo');

-- --------------------------------------------------------

--
-- Table structure for table `vehiculo`
--

CREATE TABLE `vehiculo` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `color` varchar(80) NOT NULL,
  `capacidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `viajes`
--

CREATE TABLE `viajes` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `id_vehiculo` int(11) NOT NULL,
  `asientos_disp` int(10) NOT NULL,
  `id_ruta` int(11) NOT NULL,
  `disp_hoy` tinyint(1) NOT NULL DEFAULT 0,
  `inicia_el` datetime NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `precio` int(100) NOT NULL,
  `id_conductor` int(11) NOT NULL,
  `id_pasajeros` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasajeros`
--
ALTER TABLE `pasajeros`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_vehiculo` (`id_vehiculo`,`id_ruta`,`id_conductor`,`id_pasajeros`),
  ADD KEY `id_pasajeros` (`id_pasajeros`),
  ADD KEY `id_conductor` (`id_conductor`),
  ADD KEY `id_ruta` (`id_ruta`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pasajeros`
--
ALTER TABLE `pasajeros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `viajes`
--
ALTER TABLE `viajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ruta`
--
ALTER TABLE `ruta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `viajes`
--
ALTER TABLE `viajes`
  ADD CONSTRAINT `viajes_ibfk_1` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculo` (`id`),
  ADD CONSTRAINT `viajes_ibfk_2` FOREIGN KEY (`id_pasajeros`) REFERENCES `pasajeros` (`id`),
  ADD CONSTRAINT `viajes_ibfk_3` FOREIGN KEY (`id_conductor`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `viajes_ibfk_4` FOREIGN KEY (`id_ruta`) REFERENCES `ruta` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
