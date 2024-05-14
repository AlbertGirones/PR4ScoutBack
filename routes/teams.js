const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    // Generar un nombre de archivo único basado en el ID del equipo y el nombre original del archivo
    const uniqueFilename = `${req.body.league_id}-${file.originalname}`;
    cb(null, uniqueFilename); // Utiliza el nombre de archivo único
  }
});

const upload = multer({ storage: storage });

// Ruta POST para crear un nuevo equipo
router.post('/teams', upload.single('image'), (req, res) => {
  const { name, league_id } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ error: 'Debes proporcionar una imagen' });
  }

  const imagePath = '/uploads/' + image.filename;

  // Luego inserta el nuevo equipo en la base de datos
  connection.query('INSERT INTO teams (name, league, image) VALUES (?, ?, ?)', [name, league_id, imagePath], (error, results) => {
    if (error) {
      console.error('Error al crear el equipo:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ message: 'Equipo creado correctamente' });
  });
});

module.exports = router;
