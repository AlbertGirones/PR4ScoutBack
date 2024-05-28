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

router.get('/getLocalTeams/:teamId/:leagueId', (req, res) => {
  const { teamId, leagueId } = req.params;
  const query = 'SELECT t_local.id_team AS id, t_local.name AS equipo_local FROM teams t_local LEFT JOIN matches m ON t_local.id_team = m.local_team AND m.visitor_team = ? WHERE m.id_match IS NULL AND t_local.league = ? AND t_local.id_team != ?';
  connection.query(query, [teamId, leagueId, teamId], (error, results) => {
    if (error) {
      console.error('Error al obtener las ligas:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Equipos no encontrados' });
    }
    res.json(results);
  });
});

router.get('/getVisitorTeams/:teamId/:leagueId', (req, res) => {
  const { teamId, leagueId } = req.params;
  const query = 'SELECT t_visitor.id_team AS id, t_visitor.name AS equipo_visitante, m.day, m.hour FROM teams t_visitor LEFT JOIN matches m ON t_visitor.id_team = m.visitor_team AND m.local_team = ? WHERE m.id_match IS NULL AND t_visitor.league = ? AND t_visitor.id_team != ?';
  connection.query(query, [teamId, leagueId, teamId], (error, results) => {
    if (error) {
      console.error('Error al obtener las ligas:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Equipos no encontrados' });
    }
    res.json(results);
  });
});

router.get('/teams/nextTeamInfo/:teamId', (req, res) => {
  const teamId = req.params.teamId;

  const query = "SELECT DISTINCT p.id_player, p.image, p.name, p.position FROM players p JOIN teams t ON p.team = t.id_team JOIN matches m ON (t.id_team = m.local_team OR t.id_team = m.visitor_team) JOIN (SELECT CASE WHEN m.local_team = ? THEN m.visitor_team ELSE m.local_team END AS rival_id FROM matches m WHERE (m.local_team = ? OR m.visitor_team = ?) AND (m.result IS NULL OR m.result != '') AND m.day >= CURDATE() ORDER BY m.day ASC LIMIT 1) AS subquery ON t.id_team = subquery.rival_id ORDER BY p.name ASC LIMIT 3";

  connection.query(query, [teamId, teamId, teamId], (error, results) => {
    if (error) {
      console.error('Error al obtener el próximo partido:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Datos del equipo no encontrados' });
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

  // Verificar si el nombre del equipo ya existe
  connection.query('SELECT * FROM teams WHERE name = ?', [name], (error, results) => {
    if (error) {
      console.error('Error al verificar el nombre del equipo:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'El nombre del equipo ya existe' });
    }

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
});

module.exports = router;
