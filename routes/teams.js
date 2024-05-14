const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Obtener todos los equipos
router.get('/teams', (req, res) => {
  connection.query('SELECT * FROM teams', (error, results) => {
    if (error) {
      console.error('Error al obtener los equipos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

// Crear un nuevo equipo
router.post('/teams', (req, res) => {
  const { name, category, image } = req.body;
  // Aquí debes guardar la imagen y obtener su ruta

  // Luego inserta el nuevo equipo en la base de datos
  connection.query('INSERT INTO teams (name, category, image) VALUES (?, ?, ?)', [name, category, image], (error, results) => {
    if (error) {
      console.error('Error al crear el equipo:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ message: 'Equipo creado correctamente' });
  });
});

module.exports = router;
