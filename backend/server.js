const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.use(cors());
app.use(bodyParser.json());

//Rutas
const apiRoutes = require('./routes/api');
const viajesRoutes = require('./routes/viajes');
const pasajerosRoutes = require('./routes/pasajeros');

app.use('/api', apiRoutes);
app.use('/viajes', viajesRoutes);
app.use('/pasajeros', pasajerosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});