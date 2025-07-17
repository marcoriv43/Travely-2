const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const pool = require('../db/pool');
app.use(bodyParser.json());

app.get('/', async (req, res) => {  
  try {
    let id_conductor = req.query.id_conductor;
    
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'SELECT * FROM viajes LEFT JOIN vehiculo ON vehiculo_id=id_vehiculo LEFT JOIN ruta ON ruta_id=id_ruta WHERE conductor_id = ? ORDER BY inicia_el DESC', [id_conductor]
    );
    connection.release();
    res.send(result);
  } catch (error) {
    console.error('Error al obtener los viajes registrados:', error);
    res.status(500).json({ error: 'Error al obtener los viajes registrados' });
  }
});

app.post('/register', async (req, res) => {  
  try {
    const { descripcion, vehiculo_id, ruta_id, disponibleHoy, inicia_el, inicia_a, precio, conductor_id } = req.body;
    
    const connection = await pool.getConnection();
    const [newPasajeros] = await connection.execute(
      'INSERT INTO pasajeros(id_pasajero1, id_pasajero2, id_pasajero3, id_pasajero4, id_pasajero5, id_pasajero6, id_pasajero7, id_pasajero8) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [0, 0, 0, 0, 0, 0, 0, 0]
    );
    const idPasajeros = newPasajeros.insertId;    
    
    const [result] = await connection.execute(
      'INSERT INTO viajes (descripcion, vehiculo_id, ruta_id, disp_hoy, inicia_el, inicia_a, precio, conductor_id, pasajeros_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [descripcion, vehiculo_id, ruta_id, disponibleHoy, inicia_el, inicia_a, precio, conductor_id, idPasajeros]
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