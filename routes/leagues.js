const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Obtener todas las ligas
router.get('/leagues', (req, res) => {
  connection.query('SELECT * FROM leagues', (error, results) => {
    if (error) {
      console.error('Error al obtener las ligas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

router.get('/getLeagueOfClub/:teamId', (req, res) => {
  const { teamId } = req.params;
  connection.query('SELECT league FROM teams WHERE id_team = ?', [teamId], (error, results) => {
    if (error) {
      console.error('Error al obtener la liga del equipo:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    res.json(results[0].league);
  });
});

router.post('/leagues', (req, res) => {
  const { league } = req.body;

  if (!league) {
    return res.status(400).json({ error: 'El nombre de la liga es requerido' });
  }

  connection.query('INSERT INTO leagues (name) VALUES (?)', [league], (error, results) => {
    if (error) {
      console.error('Error al crear la liga:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json({ message: 'Liga creada correctamente', results });
  });
});

module.exports = router;
