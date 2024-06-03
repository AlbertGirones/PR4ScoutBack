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

router.post('/addScout', (req, res) => {
  const { team, player, desc } = req.body;

  // Consulta SQL para verificar si ya existe un registro con el mismo jugador y equipo
  const checkQuery = 'SELECT * FROM scouts WHERE player = ? AND team = ?';

  // Ejecutar la consulta para verificar si ya existe un registro
  connection.query(checkQuery, [player, team], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error al verificar si el jugador ya está siendo observado en este equipo:', checkError);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Si ya existe un registro, enviar un mensaje de error
    if (checkResults.length > 0) {
      res.status(400).json({ error: '¡Este jugador ya está siendo observado en este equipo!' });
      return;
    }

    // Si no existe un registro, proceder a insertar el nuevo registro en la base de datos
    const insertQuery = 'INSERT INTO scouts (player, team, description) VALUES (?, ?, ?)';
    connection.query(insertQuery, [player, team, desc], (insertError, insertResults) => {
      if (insertError) {
        console.error('Error al crear el equipo:', insertError);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      res.json({ message: 'Scout creado correctamente', results: insertResults });
    });
  });
});

module.exports = router;
