-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS `uvm_planificacion`;

-- Usar la base de datos
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

-- Insertar datos en 'directores'
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

-- Insertar datos en 'profesores'
INSERT INTO `profesores` VALUES 
(1,'salvator','tore','bermudez@gmail.com','03423423'),
(2,'anthonella','linares','antho@gmail.com','123213123'),
(3,'salvatore','bermudez','as@gmai.com','04120434234'),
(4,'antonio','bermudez','2@gmail.com','04120434234'),
(5,'salvatore','tore','30@gmail.com','0412043423411'),
(6,'luis juan','bermudez','sheintru@gmail.com','04120434234'),
(7,'Luisa','bermudez','helany.bermudez22@gmail.com','04120434234');

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

-- Insertar datos en 'materias'
INSERT INTO `materias` VALUES 
(1,'asd12321','mate4','matematicas',1),
(2,'xpw3e6','salvatore','asdsadasd',2),
(3,'xpw3e614543','Estadistica','desarrollo de estadistica',3);

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

-- Insertar datos en 'secciones'
INSERT INTO `secciones` VALUES 
(1,'quinto ','a',1),
(2,'quinto a','a',2),
(3,'trimestre a','asdasd',3);

-- Crear la tabla 'trimestres'
CREATE TABLE `trimestres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `diasFestivos` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Insertar datos en 'trimestres'
INSERT INTO `trimestres` VALUES 
(1,'trimestre c','2024-07-20','2024-10-20','lunes 21 dia de la independencia ');

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

-- Insertar datos en 'usuarios'
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

-- Insertar datos en 'eventos'
INSERT INTO `eventos` VALUES 
(1,'Especial','corte de notas','corte de notas año 2024','2024-07-19','11:47:00','tempe',1,1,1),
(2,'encuentro','videoconferencia','asdasd','2024-07-19','22:16:00','tempe',1,1,1),
(3,'evaluación','asdasd','asdasd','2024-07-19','22:22:00','tempe',1,1,1),
(4,'Especial','asdasd','asdasd','2024-07-19','22:30:00','asdas',1,1,1),
(5,'evaluación','evalucion 1.1','evacualicion','2024-07-29','11:21:00','estovacuy',2,2,2);

-- Crear la tabla 'acceso_directores'
CREATE TABLE `acceso_directores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `director_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `director_id` (`director_id`),
  CONSTRAINT `acceso_directores_ibfk_1` FOREIGN KEY (`director_id`) REFERENCES `directores` (`id`)
);

-- Insertar datos en 'acceso_directores'
INSERT INTO `acceso_directores` VALUES 
(1,'admin','$2b$08$BcBbtiZS/ysjOkOrTX9EUOtyC29.LhaWlcEwHaqLej6Oq1t7CyK.u',1),
(2,'admine','$2b$08$6iPXRN0miTEik3hZqU/F7uicO0CiQ9mQdZLJkP9bJykURvb9o2xna',2),
(3,'eri','$2b$08$cD6Jz.0dMazdUCWRVIk7SOEmIXYMpXBaRNxP2UKAYRf58cicExJNC',3),
(4,'lucho','$2b$08$cUG1nB0J1RItMlZFEvTbE.4jKDhLB5HvoEEPeouf5WBq.FMdgR9e.',4),
(5,'sasa','$2b$08$LPhls.8ySx80wNBhABz/He5lSCbqCP2jmDN7m1OKKknNd4R5t2RL2',5),
(6,'carlos','$2b$08$4mnspOha8Q29Jrhbc.dFUe6M1Y0/Q7pKwP3ERITvIrmbGB7yA6pBq',6),
(7,'admen','$2b$08$bkDTN1UMDDnTIHG4iZi9se8F7lZtyhs8d35HW/eJKIENZGiy2oU.G',7),
(8,'admin','$2b$08$F1hIUzHWEg4X4WluuFHu3OzQOmq0sxwQiceln7qUTakcJW09n4lJ2',8),
(9,'admin','$2b$08$BvAWZ9JlL6UV8pWigii.K.2dwNAHrnAOcff4.g.ueDa1z4qdUt3XK',9),
(10,'sjbb','$2b$08$z7wDKMPFzudrShOd9D3Xp.saA5TPPY0w.8tFf2ZbG4n/CyIBR6ixq',10),
(11,'antho','$2b$08$iSbrmHS6S.lnnFrYgUGtD.OHidUF.9NdRqScGJtO/bb/l7CYMNtgC',11),
(12,'adm','$2b$08$iJd80NOx4JstOHo9ubu6u.Hc8G2I4IhI5bYccs1hYtpKbhfLbUFce',12),
(13,'lucas','$2b$08$YyzWROtkz1GP8N.5uJ0Kx.4HtU5gNSBvL1V/Tyk/BI4uCfVbEL9EO',13),
(14,'lu','$2b$08$64gyCKMRodDfURIkNngrO.b62I66/PAdPELHiTJHuCEB5l3fDzeZq',14);

-- Crear la tabla 'acceso_profesores'
CREATE TABLE `acceso_profesores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `profesor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `acceso_profesores_ibfk_1` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`)
);

-- Insertar datos en 'acceso_profesores'
INSERT INTO `acceso_profesores` VALUES 
(1,'lu1','1234',1),
(2,'admin','12345',2);
