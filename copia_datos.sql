-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: uvm_planificacion
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acceso_directores`
--

DROP TABLE IF EXISTS `acceso_directores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acceso_directores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `director_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `director_id` (`director_id`),
  CONSTRAINT `acceso_directores_ibfk_1` FOREIGN KEY (`director_id`) REFERENCES `directores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acceso_directores`
--

LOCK TABLES `acceso_directores` WRITE;
/*!40000 ALTER TABLE `acceso_directores` DISABLE KEYS */;
INSERT INTO `acceso_directores` VALUES (1,'admin','$2b$08$BcBbtiZS/ysjOkOrTX9EUOtyC29.LhaWlcEwHaqLej6Oq1t7CyK.u',1),(2,'admine','$2b$08$6iPXRN0miTEik3hZqU/F7uicO0CiQ9mQdZLJkP9bJykURvb9o2xna',2),(3,'eri','$2b$08$cD6Jz.0dMazdUCWRVIk7SOEmIXYMpXBaRNxP2UKAYRf58cicExJNC',3),(4,'lucho','$2b$08$cUG1nB0J1RItMlZFEvTbE.4jKDhLB5HvoEEPeouf5WBq.FMdgR9e.',4),(5,'sasa','$2b$08$LPhls.8ySx80wNBhABz/He5lSCbqCP2jmDN7m1OKKknNd4R5t2RL2',5),(6,'carlos','$2b$08$4mnspOha8Q29Jrhbc.dFUe6M1Y0/Q7pKwP3ERITvIrmbGB7yA6pBq',6),(7,'admen','$2b$08$bkDTN1UMDDnTIHG4iZi9se8F7lZtyhs8d35HW/eJKIENZGiy2oU.G',7),(8,'admin','$2b$08$F1hIUzHWEg4X4WluuFHu3OzQOmq0sxwQiceln7qUTakcJW09n4lJ2',8),(9,'admin','$2b$08$BvAWZ9JlL6UV8pWigii.K.2dwNAHrnAOcff4.g.ueDa1z4qdUt3XK',9),(10,'sjbb','$2b$08$z7wDKMPFzudrShOd9D3Xp.saA5TPPY0w.8tFf2ZbG4n/CyIBR6ixq',10),(11,'antho','$2b$08$iSbrmHS6S.lnnFrYgUGtD.OHidUF.9NdRqScGJtO/bb/l7CYMNtgC',11),(12,'adm','$2b$08$iJd80NOx4JstOHo9ubu6u.Hc8G2I4IhI5bYccs1hYtpKbhfLbUFce',12),(13,'lucas','$2b$08$YyzWROtkz1GP8N.5uJ0Kx.4HtU5gNSBvL1V/Tyk/BI4uCfVbEL9EO',13),(14,'lu','$2b$08$64gyCKMRodDfURIkNngrO.b62I66/PAdPELHiTJHuCEB5l3fDzeZq',14);
/*!40000 ALTER TABLE `acceso_directores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acceso_profesores`
--

DROP TABLE IF EXISTS `acceso_profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acceso_profesores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `profesor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `acceso_profesores_ibfk_1` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acceso_profesores`
--

LOCK TABLES `acceso_profesores` WRITE;
/*!40000 ALTER TABLE `acceso_profesores` DISABLE KEYS */;
INSERT INTO `acceso_profesores` VALUES (20,'lu1','1234',20),(25,'admin','12345',25);
/*!40000 ALTER TABLE `acceso_profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directores`
--

DROP TABLE IF EXISTS `directores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directores`
--

LOCK TABLES `directores` WRITE;
/*!40000 ALTER TABLE `directores` DISABLE KEYS */;
INSERT INTO `directores` VALUES (1,'salvatore','bermudez','helany.bermudez22@gmail.com','04120434234'),(2,'salvatore','bastidas','sheintru@gmail.com','04120434234'),(3,'erica','bermudez','eri@gmail.com','04120434234'),(4,'lucho','bermudez','lu@gmail.com','041204342341'),(5,'salvatore','bermudez','salva@gmail.com','0412043423412'),(6,'salvatores','bermudez','carlos@gmail.com','04120434234'),(7,'salvator','bermudez','bermudez22@gmail.com','04120434234'),(8,'salva','bermudez','32@gmail.com','04120434234'),(9,'salva','bermudez','32@gmail.com','04120434234'),(10,'salvatore','bermudez','32@gmail.com','043423412321'),(11,'antho','bermudez','antho@gmail.com','0412043423412'),(12,'julio','bermudez','31@gmail.com','04120434234'),(13,'lucas','bermudez','lucas@gmail.com','04120434234'),(14,'antonio','peña','1@gmail.com','04120434234');
/*!40000 ALTER TABLE `directores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  CONSTRAINT `fk_materia` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`),
  CONSTRAINT `fk_profesor` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`),
  CONSTRAINT `fk_seccion` FOREIGN KEY (`seccion_id`) REFERENCES `secciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (10,'Especial','corte de notas','corte de notas año 2024','2024-07-19','11:47:00','tempe',6,3,1),(12,'encuentro','videoconferencia','asdasd','2024-07-19','22:16:00','tempe',19,5,1),(13,'evaluación','asdasd','asdasd','2024-07-19','22:22:00','tempe',23,3,1),(14,'Especial','asdasd','asdasd','2024-07-19','22:30:00','asdas',20,3,1),(15,'videoconferencia','asdasd','asdasd','2024-07-29','00:35:00','asda',20,3,1);
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `profesor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `materias_ibfk_1` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (3,'asd12321','mate4','matematicas',12),(5,'xpw3e6','salvatore','asdsadasd',6),(7,'xpw3e61','mate2','matematicas',23);
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES (6,'salvator','tore','bermudez@gmail.com','03423423'),(12,'anthonella','linares','antho@gmail.com','123213123'),(19,'salvatore','bermudez','as@gmai.com','04120434234'),(20,'antonio','bermudez','2@gmail.com','04120434234'),(23,'salvatore','tore','30@gmail.com','0412043423411'),(25,'luis juan','bermudez','sheintru@gmail.com','04120434234');
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secciones`
--

DROP TABLE IF EXISTS `secciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `grupo` varchar(255) NOT NULL,
  `profesor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `secciones_ibfk_1` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secciones`
--

LOCK TABLES `secciones` WRITE;
/*!40000 ALTER TABLE `secciones` DISABLE KEYS */;
INSERT INTO `secciones` VALUES (1,'quinto ','a',6),(2,'quinto a','a',6),(4,'hasdhsahd','jasdhasdh',6);
/*!40000 ALTER TABLE `secciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trimestres`
--

DROP TABLE IF EXISTS `trimestres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trimestres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `diasFestivos` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trimestres`
--

LOCK TABLES `trimestres` WRITE;
/*!40000 ALTER TABLE `trimestres` DISABLE KEYS */;
INSERT INTO `trimestres` VALUES (1,'salvatore','2024-07-19','2024-07-30','asdasd');
/*!40000 ALTER TABLE `trimestres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `rol` enum('director','profesor') NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan','Perez','juan.perez@ejemplo.com','1234567890','director','password123'),(2,'Ana','Garcia','ana.garcia@ejemplo.com','0987654321','profesor','password123');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-20  0:46:53
