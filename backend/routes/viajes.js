const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const pool = require('../db/pool');
app.use(bodyParser.json());

app.get('', async (req, res) => {  
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'SELECT * FROM viajes',
    );
    connection.release();
    
    res.send(result);
  } catch (error) {
    console.error('Error al obtener viaje:', error);
    res.status(500).json({ error: 'Error al obtener viaje' });
  }
});

app.post('/register', async (req, res) => {  
  
  try {
    const { nombre, vehiculo, asientos, ruta, precio, disponibleHoy } = req.body;
    
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO viajes (nombre, vehiculo, asientos, ruta, precio, disponibleHoy) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, vehiculo, asientos, ruta, precio, disponibleHoy]
    );
    connection.release();
    
    res.status(200).json({ message: 'Viaje registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar viaje:', error);
    res.status(500).json({ error: 'Error al registrar viaje' });
  }
});

module.exports = app;