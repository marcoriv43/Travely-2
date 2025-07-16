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

app.get('/vehiculos', async (req, res) => {  
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'SELECT * FROM vehiculo ORDER BY capacidad',
    );
    connection.release();
    
    res.send(result);
  } catch (error) {
    console.error('Error al obtener los vehiculos registrados:', error);
    res.status(500).json({ error: 'Error al obtener los vehiculos registrados' });
  }
});

app.post('/nuevo-vehiculo', async (req, res) => {  
  try {
    const { tipo, modelo, marca, color, capacidad } = req.body;
    
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO vehiculo(tipo, modelo, marca, color, capacidad) VALUES (?, ?, ?, ?, ?)',
      [tipo, modelo, marca, color, capacidad]
    );
    connection.release();
    
    res.status(200).json({ message: 'Vehiculo registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar un nuevo vehiculo:', error);
    res.status(500).json({ error: 'Error al registrar el vehiculo' });
  }
});

app.get('/rutas', async (req, res) => {  
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'SELECT * FROM ruta ORDER BY nombre',
    );
    connection.release();
    
    res.send(result);
  } catch (error) {
    console.error('Error al obtener las rutas registradas:', error);
    res.status(500).json({ error: 'Error al obtener las rutas registradas' });
  }
});

app.post('/nueva-ruta', async (req, res) => {  
  try {
    const { nombre, salida, llegada } = req.body;
    
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO ruta (nombre, salida, llegada) VALUES (?, ?, ?)',
      [nombre, salida, llegada]
    );
    connection.release();
    
    res.status(200).json({ message: 'Ruta registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar la nueva ruta:', error);
    res.status(500).json({ error: 'Error al registrar rutas' });
  }
});

module.exports = app;