-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 05, 2017 at 01:49 AM
-- Server version: 5.6.34-log
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c217_fc`
--
CREATE DATABASE IF NOT EXISTS `c217_fc` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `c217_fc`;

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE IF NOT EXISTS `cards` (
  `card_id` int(20) unsigned NOT NULL,
  `stack_id` int(20) unsigned NOT NULL,
  `question` varchar(1000) NOT NULL,
  `answer` varchar(3000) NOT NULL,
  `difficulty` int(10) unsigned NOT NULL,
  `orig_source_stack` varchar(100) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `card_comment` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`card_id`, `stack_id`, `question`, `answer`, `difficulty`, `orig_source_stack`, `last_updated`, `card_comment`) VALUES
(1, 1, 'power house of the cell', 'mitochondria', 1, 'user1', '2017-04-29 07:00:00', 2),
(2, 2, 'what is 2+2', '4', 0, 'user1', '2017-04-29 07:00:00', 0),
(3, 3, 'right triangle', '3 4 5', 0, 'user2', '2017-04-29 07:00:00', 0),
(4, 4, '"updated bio qqqqq"', '"updated bio answerrrrrr"', 0, 'user2', '2017-04-29 07:00:00', 0),
(6, 1, 'power house cell pt 2', 'mitochondria pt 2', 1, 'user1', '2017-05-02 01:06:34', 2),
(24, 1, 'power house of the cell', 'mitochondria', 0, 'user1', '2017-05-02 17:24:22', 0),
(25, 1, 'power house cell pt 2', 'mitochondria pt 2', 0, 'user1', '2017-05-02 17:24:22', 0),
(26, 7, 'What is a financial security', 'A security is a financial instrument that represents an ownership position in a publicly-traded corp', 0, 'user1', '2017-05-03 20:14:55', 0),
(27, 7, 'What is a short position', 'A short, or short position, is a directional trading or investment strategy where the investor sells', 0, 'user1', '2017-05-03 20:20:07', 0),
(28, 7, 'What is a long position', 'A long (or long position) is the buying of a security such as a stock, commodity or currency with th', 0, 'user1', '2017-05-03 20:20:07', 0),
(29, 7, 'What is a bull market', 'A bull market is a financial market of a group of securities in which prices are rising or expected ', 0, 'user1', '2017-05-03 20:20:07', 0),
(30, 7, 'What is a bear market', 'A bear market is a condition in which securities prices fall and widespread pessimism causes the sto', 0, 'user1', '2017-05-03 20:20:07', 0),
(31, 7, 'What is technical analysis', 'Technical analysis is a trading tool employed to evaluate securities and attempt to forecast their f', 0, 'user1', '2017-05-03 20:20:07', 0);

-- --------------------------------------------------------

--
-- Table structure for table `stacks`
--

CREATE TABLE IF NOT EXISTS `stacks` (
  `stack_id` int(20) unsigned NOT NULL,
  `user_id` int(20) unsigned NOT NULL,
  `subject` varchar(20) NOT NULL,
  `category` varchar(20) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_played` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stacks`
--

INSERT INTO `stacks` (`stack_id`, `user_id`, `subject`, `category`, `created`, `last_played`, `rating`) VALUES
(1, 1, 'human biology', 'biology', '2017-04-30 00:50:37', '2017-04-29 23:01:38', 1),
(2, 1, 'Calc 1', 'Math', '2017-04-30 01:45:51', '2017-04-30 08:45:51', 1),
(3, 2, 'Calc 2', 'Math', '2017-04-30 02:39:55', '2017-04-29 09:39:55', 1),
(4, 2, 'human biology', 'biology', '2017-04-30 02:41:06', '2017-04-30 09:41:06', 1),
(7, 1, 'Markets', 'Finance', '2017-05-03 19:31:18', '2017-05-03 19:31:18', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(20) unsigned NOT NULL,
  `fullname` varchar(40) NOT NULL,
  `username` varchar(20) NOT NULL,
  `user_pw` varchar(70) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_join` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(20) unsigned NOT NULL,
  `login_source` varchar(20) NOT NULL,
  `source_id` varchar(20) NOT NULL,
  `user_bday` date NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `username`, `user_pw`, `user_email`, `user_join`, `status`, `login_source`, `source_id`, `user_bday`, `last_login`) VALUES
(1, 'Brian Bernstein', 'stayasleep', 'Password1', 'email@Server.com', '2017-04-29 20:53:45', 1, 'native', 'user1', '1900-01-01', '2017-04-29 07:00:00'),
(2, 'Kevin Chalmers', 'kchalm', 'Password2', 'email2@Server.com', '2017-04-30 02:37:39', 1, 'native', 'user2', '1901-02-02', '2017-04-29 07:00:00'),
(8, 'James Shafik', 'staysad', '$2a$10$DAWnrgpye6x/kQNi.P4hF.4F3/aR.9P03WAJEvHY.rNKjN4aHa/8e', 'test@test.com', '2017-05-04 07:08:45', 0, '', '', '2000-10-10', '2017-05-04 07:08:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`card_id`),
  ADD KEY `stack_id` (`stack_id`);

--
-- Indexes for table `stacks`
--
ALTER TABLE `stacks`
  ADD PRIMARY KEY (`stack_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `card_id` int(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=151;
--
-- AUTO_INCREMENT for table `stacks`
--
ALTER TABLE `stacks`
  MODIFY `stack_id` int(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`stack_id`) REFERENCES `stacks` (`stack_id`) ON DELETE CASCADE;

--
-- Constraints for table `stacks`
--
ALTER TABLE `stacks`
  ADD CONSTRAINT `stacks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
