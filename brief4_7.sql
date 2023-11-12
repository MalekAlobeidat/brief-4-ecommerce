-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2023 at 05:58 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brief4`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'vegetables'),
(2, 'fruits'),
(3, 'herbs');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_date`, `user_id`, `total_price`) VALUES
(2, '2023-11-11 09:46:55', 3, 2.29),
(4, '2023-11-11 11:37:52', 3, 1.98),
(5, '2023-11-11 12:05:33', 3, 2.28),
(6, '2023-11-11 12:09:13', 3, 6.37),
(7, '2023-11-11 12:11:21', 3, 0.69),
(8, '2023-11-11 12:13:28', 3, 1.78),
(9, '2023-11-11 12:17:10', 3, 2.29),
(10, '2023-11-11 12:18:43', 3, 2.29),
(11, '2023-11-11 12:33:47', 3, 2.29),
(12, '2023-11-11 12:53:29', 3, 3.56),
(13, '2023-11-11 12:59:52', 3, 2.76),
(16, '2023-11-11 19:38:33', 3, 14.31),
(17, '2023-11-12 00:04:12', 3, 3.18),
(18, '2023-11-12 00:27:33', 3, 3.18),
(19, '2023-11-12 00:35:14', 3, 3.18);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_details_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `image` text DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `price_after_discount` decimal(10,2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `image`, `name`, `description`, `price`, `price_after_discount`, `category_id`, `created_at`) VALUES
(1, '\\home\\image\\carrot.jpg.webp', 'Carrot', 'Fresh carrots', 1.99, 1.79, 1, '2023-11-12 12:33:59'),
(3, '\\home\\image\\Apple.jpg.webp', 'Apple', 'Fresh basil leaves', 0.99, 0.89, 2, '2023-11-12 12:47:34'),
(4, '\\home\\image\\AppleGoldenItaly.jpg.jpeg', 'Apple_Golde', 'goldappal', 1.00, 2.29, 2, '2023-11-12 12:47:46'),
(5, '\\home\\image\\Avocado.jpg.jpg', 'Avocado', 'Ripe bananas', 2.00, 1.29, 2, '2023-11-12 12:38:27'),
(6, '\\home\\image\\BananaEcuador.jpg.jpeg', 'Banana', 'Ripe bananas', 0.79, 0.69, 2, '2023-11-12 12:47:55'),
(7, '\\home\\image\\Capsicum Green.jpg.jpeg', 'Capsicum', 'Juicy red tomatoes', 1.29, 1.19, 1, '2023-11-12 12:38:57'),
(8, '\\home\\image\\Cucumber.jpg.jpeg', 'Cucumber', 'Sweet oranges', 1.99, 1.79, 1, '2023-11-12 12:48:12'),
(9, '\\home\\image\\Eggplant Fat.jpg.jpeg', 'Eggplant ', 'Fresh rosemary', 2.00, 1.39, 1, '2023-11-12 12:48:18'),
(10, '\\home\\image\\GrapefruitwhiteLocal.jpg.jpeg', 'Grapefruitwhite', 'Fresh rosemary', 1.49, 1.39, 2, '2023-11-12 12:48:25'),
(12, '\\home\\image\\GrapesRedLocal.jpg.jpeg', 'GrapesRed', 'Fresh rosemary', 3.00, 2.00, 2, '2023-11-12 12:42:20'),
(13, '\\home\\image\\green lemon.jpg.webp', 'green lemon', 'Fresh ', 1.22, 0.60, 1, '2023-11-12 12:46:45'),
(14, '\\home\\image\\MelonsSweet.jpg.jpeg', 'MelonsSweet', 'Fresh ', 1.90, 1.70, 2, '2023-11-12 12:46:47'),
(15, '\\home\\image\\ment.jpg.jpg', 'ment', 'Fresh ', 0.30, 0.20, 3, '2023-11-12 12:46:50'),
(16, '\\home\\image\\MushroomBottmWhite.jpg.jpeg', 'MushroomBottmWhite', 'Fresh ', 1.40, 0.80, 1, '2023-11-12 12:46:52'),
(17, '\\home\\image\\Orange.jpg.jpg', 'Orange', 'Sweet oranges', 2.90, 2.70, 2, '2023-11-12 12:46:37'),
(18, '\\home\\image\\Tomato Round.pjp.jpeg', 'Tomato ', 'Fresh ', 1.70, 1.60, 1, '2023-11-12 12:46:54');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `image` text DEFAULT '0.png',
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role_id` int(11) DEFAULT 2,
  `email` varchar(100) DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
  `rate` varchar(255) NOT NULL DEFAULT '5',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `image`, `username`, `password`, `role_id`, `email`, `review`, `rate`, `created_at`) VALUES
(1, '\\home\\image\\person1.jpg.jpg', 'mohammad', 'Yazan1234**', 2, 'user1@example.com', 'very cool', '5', '2023-11-12 12:27:56'),
(2, '\\home\\image\\person6.jpg.jpeg', 'reem', 'Yazan1234**', 2, 'usevvr1@example.com', 'soooooooo cool', '5', '2023-11-12 12:28:26'),
(3, '\\home\\image\\person8.jpg.jpg', 'nadden', 'Yazan1234**', 2, 'User3@Example.Com', 'OMG cool', '5', '2023-11-12 12:28:49'),
(4, '\\home\\image\\person2.jpg.jpg', 'abd', 'Yazan1234**', 1, 'admin1@example.com', NULL, '5', '2023-11-12 12:29:08'),
(5, '\\home\\image\\person9.jpg.jpg', 'noor', 'Yazan1234**', 1, 'admin2@example.com', NULL, '5', '2023-11-12 12:29:34'),
(6, '\\home\\image\\person3.jpg.jpg', 'yasen', 'Yazan1234**', 1, 'admin3@example.com', NULL, '5', '2023-11-12 12:29:48'),
(7, '\\home\\image\\person3.jpg.jpg', 'user4', 'Yazan1234**', 2, 'user4@example.com', NULL, '5', '2023-11-12 12:29:57'),
(8, '\\home\\image\\person4.jpg.jpg', 'user5', 'Yazan1234**', 2, 'user5@example.com', NULL, '5', '2023-11-12 12:30:08'),
(9, '\\home\\image\\person5.jpg.jpg', 'admin4', 'Yazan1234**', 2, 'admin4@example.com', NULL, '5', '2023-11-12 12:30:27'),
(10, '\\home\\image\\person7.jpg.jpg', 'admin5', 'Yazan1234**', 1, 'admin5@example.com', NULL, '5', '2023-11-12 12:30:43'),
(11, '\\home\\image\\person9.jpg.jpg', 'malek', 'Yazan1234**', 2, 'mm@gmail.com', NULL, '5', '2023-11-12 12:30:57'),
(12, '\\home\\image\\person7.jpg.jpg', 'yazan', 'Yazan1234**', 2, 'mmbbv@gmail.com', NULL, '5', '2023-11-12 12:31:36'),
(21, '\\home\\image\\person2.jpg.jpg', 'mohannad', 'Yazan1234**', 2, 'mmm@gmail.com', NULL, '5', '2023-11-12 12:32:04'),
(23, '\\home\\image\\person3.jpg.jpg', 'kaled', 'Yazan1234**', 2, 'Mmmbv@Gmail.Com', NULL, '5', '2023-11-12 12:32:13'),
(31, '\\home\\image\\person2.jpg.jpg', 'maleek', 'Yazan1234**', 2, 'malek@gmail.com', NULL, '5', '2023-11-12 12:32:21'),
(33, '\\home\\image\\person1.jpg.jpg', 'tasn', 'Yazan1234**', 2, 'maleek@gmail.com', NULL, '5', '2023-11-12 12:32:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_details_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
