const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const connection = require('../db/connection');

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
router.post('/players', upload.single('image'), (req, res) => {
  const { federationNumber, name, description, team } = req.body;
  const image = req.file;

  if (!image) {
      return res.status(400).json({ error: 'Debes proporcionar una imagen' });
  }

  // Crear la ruta de la carpeta de uploads
  const uploadsFolderPath = path.join(__dirname, '..', 'uploads');
  
  // Crear la ruta de la carpeta de playerUploads
  const playerUploadsFolderPath = path.join(uploadsFolderPath, 'playerUploads');
  
  // Verificar si la carpeta de playerUploads ya existe, si no, crearla
  if (!fs.existsSync(playerUploadsFolderPath)) {
    fs.mkdirSync(playerUploadsFolderPath);
  }

  // Crear la ruta de la carpeta del jugador dentro de playerUploads
  const playerFolderPath = path.join(playerUploadsFolderPath, federationNumber);
  
  // Verificar si la carpeta del jugador ya existe, si no, crearla
  if (!fs.existsSync(playerFolderPath)) {
    fs.mkdirSync(playerFolderPath);
  }

  // Mover la imagen al directorio del jugador
  const imagePath = path.join(playerFolderPath, image.filename);
  fs.renameSync(image.path, imagePath);

  // Luego inserta el nuevo equipo en la base de datos
  connection.query('INSERT INTO players (federationNumber, name, description, team, image) VALUES (?, ?, ?, ?, ?)', [federationNumber, name, description, team, imagePath], (error, results) => {
    if (error) {
      console.error('Error al crear el equipo:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ message: 'Equipo creado correctamente', results });
  });
});


module.exports = router;