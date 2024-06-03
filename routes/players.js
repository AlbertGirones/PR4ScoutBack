const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const connection = require('../db/connection');

router.get('/players/getScoutedPlayers/:teamId', (req, res) => {
  const teamId = req.params.teamId;

  const query = "SELECT t.image AS escudo, t.name AS teamName, s.player, p.image, p.name, p.position FROM scouts s JOIN players p ON s.player = p.id_player JOIN teams t ON t.id_team = p.team WHERE s.team = ? ORDER BY p.name ASC LIMIT 3";

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

router.get('/localPlayersOfMatch/:clubId/:teamId', (req, res) => {
  const clubId = req.params.clubId;
  const teamId = req.params.teamId;
  const query = "SELECT p.id_player, p.name, p.position, p.image FROM players p LEFT JOIN (SELECT DISTINCT player FROM stats WHERE id_match = ?) s ON p.id_player = s.player WHERE s.player IS NULL AND p.team = ? ORDER BY p.position";
  connection.query(query, [teamId, clubId], (error, results) => {
    if (error) {
      console.error('Error al obtener los jugadores del equipo local:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

router.get('/visitantPlayersOfMatch/:clubId/:teamId', (req, res) => {
  const clubId = req.params.clubId;
  const teamId = req.params.teamId;
  const query = "SELECT p.id_player, p.name, p.position, p.image FROM players p LEFT JOIN (SELECT DISTINCT player FROM stats WHERE id_match = ?) s ON p.id_player = s.player WHERE s.player IS NULL AND p.team = ? ORDER BY p.position";
  connection.query(query, [teamId, clubId], (error, results) => {
    if (error) {
      console.error('Error al obtener los jugadores del equipo local:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

router.get('/getScouts/:clubId', (req, res) => {
  const clubId = req.params.clubId;
  const query = "SELECT p.id_player ,p.position, p.image, p.name, s.description FROM scouts s JOIN players p ON s.player = p.id_player WHERE s.team = ?";
  connection.query(query, [clubId], (error, results) => {
    if (error) {
      console.error('Error al obtener los partidos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

router.get('/getSquadTeamInScout/:clubId', (req, res) => {
  const clubId = req.params.clubId;
  const query = "SELECT * FROM players p WHERE p.team = ? AND p.id_player NOT IN (SELECT s.player FROM scouts s) ORDER BY p.position";
  connection.query(query, [clubId], (error, results) => {
    if (error) {
      console.error('Error al obtener los partidos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

router.get('/getInfoPlayer/:playerId', (req, res) => {
  const playerId = req.params.playerId;
  const query = "SELECT p.*, t.name AS teamName FROM players p JOIN teams t ON p.team = t.id_team WHERE p.id_player = ?";
  connection.query(query, [playerId], (error, results) => {
    if (error) {
      console.error('Error al obtener la información del jugador:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log(results);
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

router.delete('/deletePlayer/:playerId', (req, res) => {
  const playerId = req.params.playerId;
  connection.query('DELETE FROM players WHERE id_player = ?', [playerId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el jugador:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ success: true });
  });
});

router.delete('/deleteScout/:playerId', (req, res) => {
  const playerId = req.params.playerId;
  connection.query('DELETE FROM scouts WHERE player = ?', [playerId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el jugador:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;