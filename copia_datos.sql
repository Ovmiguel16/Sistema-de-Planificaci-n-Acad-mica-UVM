CREATE DATABASE IF NOT EXISTS `uvm_planificacion`;

USE `uvm_planificacion`;

-- Crear la tabla 'directores'
CREATE TABLE `directores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `directores` VALUES 
(1,'salvatore','bermudez','helany.bermudez22@gmail.com','04120434234'),
(2,'salvatore','bastidas','sheintru@gmail.com','04120434234'),
(3,'erica','bermudez','eri@gmail.com','04120434234'),
(4,'lucho','bermudez','lu@gmail.com','041204342341'),
(5,'salvatore','bermudez','salva@gmail.com','0412043423412'),
(6,'salvatores','bermudez','carlos@gmail.com','04120434234'),
(7,'salvator','bermudez','bermudez22@gmail.com','04120434234'),
(8,'salva','bermudez','32@gmail.com','04120434234'),
(9,'salva','bermudez','32@gmail.com','04120434234'),
(10,'salvatore','bermudez','32@gmail.com','043423412321'),
(11,'antho','bermudez','antho@gmail.com','0412043423412'),
(12,'julio','bermudez','31@gmail.com','04120434234'),
(13,'lucas','bermudez','lucas@gmail.com','04120434234'),
(14,'antonio','peña','1@gmail.com','04120434234');

-- Crear la tabla 'profesores'
CREATE TABLE `profesores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `profesores` VALUES 
(6,'salvator','tore','bermudez@gmail.com','03423423'),
(12,'anthonella','linares','antho@gmail.com','123213123'),
(19,'salvatore','bermudez','as@gmai.com','04120434234'),
(20,'antonio','bermudez','2@gmail.com','04120434234'),
(23,'salvatore','tore','30@gmail.com','0412043423411'),
(25,'luis juan','bermudez','sheintru@gmail.com','04120434234'),
(27,'Luisa','bermudez','helany.bermudez22@gmail.com','04120434234');

-- Crear la tabla 'materias'
CREATE TABLE `materias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `profesor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `materias_ibfk_1` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`)
);

INSERT INTO `materias` VALUES 
(3,'asd12321','mate4','matematicas',12),
(5,'xpw3e6','salvatore','asdsadasd',6),
(8,'xpw3e614543','Estadistica','desarrollo de estadistica',27);

-- Crear la tabla 'secciones'
CREATE TABLE `secciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `grupo` varchar(255) NOT NULL,
  `profesor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `secciones_ibfk_1` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`)
);

INSERT INTO `secciones` VALUES 
(1,'quinto ','a',6),
(2,'quinto a','a',6),
(5,'trimestre a','asdasd',27);

-- Crear la tabla 'trimestres'
CREATE TABLE `trimestres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `diasFestivos` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `trimestres` VALUES 
(3,'trimestre c','2024-07-20','2024-10-20','lunes 21 dia de la independencia ');

-- Crear la tabla 'usuarios'
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `rol` enum('director','profesor') NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `usuarios` VALUES 
(1,'Juan','Perez','juan.perez@ejemplo.com','1234567890','director','password123'),
(2,'Ana','Garcia','ana.garcia@ejemplo.com','0987654321','profesor','password123');

-- Crear la tabla 'eventos'
CREATE TABLE `eventos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `profesor_id` int DEFAULT NULL,
  `materia_id` int DEFAULT NULL,
  `seccion_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_profesor` (`profesor_id`),
  KEY `fk_materia` (`materia_id`),
  KEY `fk_seccion` (`seccion_id`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`),
  CONSTRAINT `eventos_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`),
  CONSTRAINT `eventos_ibfk_3` FOREIGN KEY (`seccion_id`) REFERENCES `secciones` (`id`)
);

INSERT INTO `eventos` VALUES 
(10,'Especial','corte de notas','corte de notas año 2024','2024-07-19','11:47:00','tempe',6,3,1),
(12,'encuentro','videoconferencia','asdasd','2024-07-19','22:16:00','tempe',19,5,1),
(13,'evaluación','asdasd','asdasd','2024-07-19','22:22:00','tempe',23,3,1),
(14,'Especial','asdasd','asdasd','2024-07-19','22:30:00','asdas',20,3,1),
(16,'evaluación','evalucion 1.1','evacualicion','2024-07-29','11:21:00','estovacuy',27,8,1);
