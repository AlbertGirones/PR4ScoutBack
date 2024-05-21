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

module.exports = router;