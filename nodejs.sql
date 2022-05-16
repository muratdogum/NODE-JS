CREATE DATABASE IF NOT EXISTS `nodejs` DEFAULT CHARACTER SET utf8 COLLATE utf8_turkish_ci;
USE `nodejs`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `users` (`username`, `password`, `email`) VALUES ('admin', 'admin', 'admin@admin.com');

ALTER TABLE `users` ADD PRIMARY KEY (`id`);
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;