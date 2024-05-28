const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const connection = require('../db/connection');

router.get('/players/getScoutedPlayers/:teamId', (req, res) => {
  const teamId = req.params.teamId;

  const query = "SELECT t.image AS escudo, t.name AS teamName, s.player, p.image, p.name, s.position FROM scouts s JOIN players p ON s.player = p.id_player JOIN teams t ON t.id_team = p.team WHERE s.team = ? ORDER BY p.name ASC LIMIT 3";

  connection.query(query, [teamId], (error, results) => {
    if (error) {
      console.error('Error al obtener los jugadores:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    res.json(results);
  });
});

router.get('/players/getPersonalPlayers/:teamId', (req, res) => {
  const teamId = req.params.teamId;

  const query = "SELECT id_player, image, name, position FROM players WHERE team = ? ORDER BY name ASC LIMIT 3";

  connection.query(query, [teamId], (error, results) => {
    if (error) {
      console.error('Error al obtener los jugadores:', error);
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
    const uniqueFilename = `${req.body.league_id}-${file.originalname}`;
    cb(null, uniqueFilename);
  }
});
  
const upload = multer({ storage: storage });
  
// Ruta POST para agregar jugador //

router.post('/players', upload.single('image'), (req, res) => {
  const { federationNumber, name, description, team, position } = req.body;
  const image = req.file;

  if (!image) {
      return res.status(400).json({ error: 'Debes proporcionar una imagen' });
  }

  const relativeImagePath = path.join('uploads', 'playerUploads', federationNumber, image.filename);
  console.log(relativeImagePath);
  const absoluteImagePath = path.join(__dirname, '..',  relativeImagePath);
  
  const playerUploadsFolderPath = path.dirname(absoluteImagePath);
  if (!fs.existsSync(playerUploadsFolderPath)) {
    fs.mkdirSync(playerUploadsFolderPath, { recursive: true });
  }

  fs.renameSync(image.path, absoluteImagePath);

  connection.query('INSERT INTO players (federationNumber, name, description, team, position, image) VALUES (?, ?, ?, ?, ?, ?)', [federationNumber, name, description, team, position, relativeImagePath], (error, results) => {
    if (error) {
      console.error('Error al crear el equipo:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ message: 'Equipo creado correctamente', results });
  });
});


module.exports = router;