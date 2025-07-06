const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));

app.use(cors());
app.use(bodyParser.json());

//Rutas
const apiRoutes = require('./routes/api');
const viajesRoutes = require('./routes/viajes');

app.use('/api', apiRoutes);
app.use('/viajes', viajesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});