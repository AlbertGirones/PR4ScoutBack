const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Obtener todas las ligas
router.get('/getMatchesOfClub/:clubId', (req, res) => {
  const clubId = req.params.clubId;
  const query = 'SELECT m.id_match, m.local_team, m.visitor_team, m.day, m.hour, m.journey, m.league, m.result FROM matches m INNER JOIN team t ON t.id_team = m.local_team OR t.id_team = m.visitor_team WHERE t.id_team = ?';
  connection.query(query, [clubId], (error, results) => {
    if (error) {
      console.error('Error al obtener las ligas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;