const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.get('/userDataRoutes/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `
  SELECT 
    u.name AS userName, 
    u.surname AS userSurname, 
    t.id_team AS clubId, 
    t.name AS teamName, 
    t.image 
    FROM users u 
    LEFT JOIN teams t ON u.team = t.id_team 
    WHERE u.id_user = ?
  `;

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    results.forEach(result => {
      result.image = `http://localhost:5000${result.image}`;
    });
    res.json(results);
  });
});

router.get('/user/:userId/team', (req, res) => {
  const userId = req.params.userId;
  
  const sql = `SELECT team FROM users WHERE id_user = ?`;
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length > 0) {
      res.json({ teamId: result[0].team });
    } else {
      res.status(404).send('Team not found');
    }
  });
});

module.exports = router;