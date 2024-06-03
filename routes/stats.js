const express = require('express');
const router = express.Router();
const connection = require('../db/connection');


router.get('/getGeneralStats/:playerId', (req, res) => {
  const playerId = req.params.playerId;

  const query = "SELECT s.*, SUM(goals) AS totalGoals, SUM(assist) AS totalAssists, SUM(goodPass) AS totalGoodPass, SUM(pass) AS totalPass, ROUND(IFNULL((SUM(goodPass) / NULLIF(SUM(pass), 0)) * 100, 0),2) AS passAccuracy, SUM(goodShots) AS totalGoodShots, SUM(shots) AS totalShots, ROUND(IFNULL((SUM(goodShots) / NULLIF(SUM(shots), 0)) * 100, 0),2) AS shotAccuracy FROM stats s WHERE player = ? GROUP BY id_match";

  connection.query(query, [playerId], (error, results) => {
    if (error) {
      console.error('Error al obtener las estadisticas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log(results);
    res.json(results);
  });
});

router.get('/getGeneralStatsInMatch/:playerId/:matchId', (req, res) => {
  const playerId = req.params.playerId;
  const matchId = req.params.matchId;

  const query = "SELECT s.*, SUM(goals) AS totalGoals, SUM(assist) AS totalAssists, SUM(goodPass) AS totalGoodPass, SUM(pass) AS totalPass, ROUND(IFNULL((SUM(goodPass) / NULLIF(SUM(pass), 0)) * 100, 0),2) AS passAccuracy, SUM(goodShots) AS totalGoodShots, SUM(shots) AS totalShots, ROUND(IFNULL((SUM(goodShots) / NULLIF(SUM(shots), 0)) * 100, 0),2) AS shotAccuracy FROM stats s WHERE player = ?  AND s.id_match = ?";

  connection.query(query, [playerId, matchId], (error, results) => {
    if (error) {
      console.error('Error al obtener las estadisticas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log(results);
    res.json(results);
  });
});

router.post('/insertPlayerStats', (req, res) => {
    const { id_match, id_team, player, minutes, yellow_cards, goals, assist, shots, goodShots, pass, goodPass, offensiveonevsone, defensiveonevsone, interceptions, steals, Rating } = req.body;
    const sql = `INSERT INTO stats (id_match, id_team, player, minutes, yellow_cards, goals, assist, shots, goodShots, pass, goodPass, 1vs1_OF, 1vs1_DEF, interceptions, steals, Rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [id_match, id_team, player, minutes, yellow_cards, goals, assist, shots, goodShots, pass, goodPass, offensiveonevsone, defensiveonevsone, interceptions, steals, Rating], (err, result) => {
      if (err) {
        console.error('Error al insertar estadísticas:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        console.log('Estadísticas insertadas correctamente');
        res.status(200).json({ message: 'Estadísticas insertadas correctamente' });
      }
    });
  });

  

module.exports = router;