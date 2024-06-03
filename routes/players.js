const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const connection = require('../db/connection');

router.get('/getPlayerInfo/:playerId', (req, res) => {
  const playerId = req.params.playerId; // Obtener el ID del jugador de los parámetros de la URL

  // Consulta SQL para obtener la información del jugador por su ID
  const query = 'SELECT * FROM players WHERE id_player = ?';

  // Ejecutar la consulta en la base de datos
  connection.query(query, [playerId], (error, results) => {
    if (error) {
      console.error('Error al obtener la información del jugador:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Verificar si se encontró algún jugador con el ID especificado
    if (results.length === 0) {
      res.status(404).json({ error: 'Jugador no encontrado' });
      return;
    }

    // Si se encontró el jugador, devolver sus datos en la respuesta
    const playerInfo = results[0];
    res.json(playerInfo);
  });
});

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
  const query = "SELECT s.id_scout, p.id_player ,p.position, p.image, p.name, s.description FROM scouts s JOIN players p ON s.player = p.id_player WHERE s.team = ?";
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

router.get('/getScoutModifyInfo/:scoutId', (req, res) => {
  const { scoutId } = req.params; // Obtener el ID del scout de los parámetros de la URL

  // Realizar la consulta en la base de datos
  connection.query(
    'SELECT description FROM scouts WHERE id_scout = ?',
    [scoutId],
    (error, results) => {
      if (error) {
        console.error('Error al obtener la descripción del jugador:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'No se encontró la descripción del jugador' });
        return;
      }
      // Devolver la descripción del jugador
      res.json({ description: results[0].description });
    }
  );
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

router.put('/updatePlayer/:playerId', (req, res) => {
  const { playerId } = req.params; // Obtener el ID del jugador de los parámetros de la URL
  const { description, position } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Realizar la actualización en la base de datos
  connection.query(
    'UPDATE players SET description = ?, position = ? WHERE id_player = ?',
    [description, position, playerId],
    (error, results) => {
      if (error) {
        console.error('Error al modificar el jugador:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      res.json({ message: 'Jugador modificado correctamente', results });
    }
  );
});

router.put('/updateScout/:scoutId', (req, res) => {
  const { scoutId } = req.params; // Obtener el ID del jugador de los parámetros de la URL
  const { description } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Realizar la actualización en la base de datos
  connection.query(
    'UPDATE scouts SET description = ? WHERE id_scout = ?',
    [description, scoutId],
    (error, results) => {
      if (error) {
        console.error('Error al modificar el jugador:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      res.json({ message: 'Jugador modificado correctamente', results });
    }
  );
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