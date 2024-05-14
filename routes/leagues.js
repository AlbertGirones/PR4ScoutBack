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

module.exports = router;
