const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("./config/db");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importar rutas
const profesoresRoutes = require('./routes/profesores');
const directoresRoutes = require('./routes/directores');
const materiasRoutes = require('./routes/materias');
const eventosRoutes = require('./routes/eventos');
const seccionesRoutes = require('./routes/secciones');
const planificacionRoutes = require('./routes/planificacion'); 
const trimestresRoutes = require('./routes/trimestres'); 
const usuariosRoutes = require('./routes/usuarios'); 

// Usar rutas
app.use('/api/profesores', profesoresRoutes);
app.use('/api/directores', directoresRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/secciones', seccionesRoutes);
app.use('/api/planificacion', planificacionRoutes); 
app.use('/api/trimestres', trimestresRoutes); 
app.use('/api/usuarios', usuariosRoutes); 


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
