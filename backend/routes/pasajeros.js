const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const pool = require('../db/pool');
app.use(bodyParser.json());

app.get('', async (req, res) => {  
  try {
    let id_conductor = req.query.id_conductor;
    
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      `SELECT * FROM viajes 
        LEFT JOIN vehiculo ON vehiculo_id=id_vehiculo 
        LEFT JOIN ruta ON ruta_id=id_ruta         
        WHERE conductor_id = ? 
        AND inicia_el BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 DAY)
        ORDER BY inicia_el DESC`,
      [id_conductor]
    );
    connection.release(); 
    res.send(result);
  } catch (error) {
    console.error('Error al obtener los viajes registrados:', error);
    res.status(500).json({ error: 'Error al obtener los viajes registrados' });
  }
});

module.exports = app;