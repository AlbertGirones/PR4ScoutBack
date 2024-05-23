const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const multer = require('multer');
const upload = multer();

router.get('/getMatchesOfClub/:clubId', (req, res) => {
  const clubId = req.params.clubId;
  const query = "SELECT m.id_match, team_local.name AS local_team, team_local.image AS local_team_image, team_visitor.name AS visitor_team, team_visitor.image AS visitor_team_image, DATE_FORMAT(m.day, '%d/%m/%Y') AS day, DATE_FORMAT(m.hour, '%H:%i') AS hour, m.journey, l.name AS league, m.result FROM matches m INNER JOIN teams team_local ON m.local_team = team_local.id_team INNER JOIN teams team_visitor ON m.visitor_team = team_visitor.id_team INNER JOIN leagues l ON m.league = l.id_league WHERE m.local_team = ? OR m.visitor_team = ? ORDER BY m.journey";
  connection.query(query, [clubId, clubId], (error, results) => {
    if (error) {
      console.error('Error al obtener los partidos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

router.get('/journeys', (req, res) => {
  connection.query('SELECT DISTINCT journey FROM matches', (error, results) => {
    if (error) {
      console.error('Error al obtener las jornadas:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    const journeys = results.map(result => result.journey);
    res.json({ journeys });
  });
});

// Agregar un nuevo partido con verificaciones
router.post('/addMatch', upload.none(), (req, res) => {
  const { leagueId, localeTeam, visitantTeam, day, time, journey } = req.body;

  // Verificar si hay un partido el mismo día para los equipos
  const checkDayQuery = `
    SELECT COUNT(*) AS count FROM matches
    WHERE (local_team = ? OR visitor_team = ?) AND day = ?
  `;
  
  connection.query(checkDayQuery, [localeTeam, localeTeam, day], (error, dayResults) => {
    if (error) {
      console.error('Error al verificar partidos el mismo día:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    if (dayResults[0].count > 0) {
      return res.status(400).json({ error: 'El equipo ya tiene un partido ese día.' });
    }

    // Verificar si hay un partido en la misma jornada y liga para los equipos
    const checkJourneyQuery = `
      SELECT COUNT(*) AS count FROM matches
      WHERE (local_team = ? OR visitor_team = ?) AND journey = ? AND league = ?
    `;
    
    connection.query(checkJourneyQuery, [localeTeam, localeTeam, journey, leagueId], (error, journeyResults) => {
      if (error) {
        console.error('Error al verificar partidos en la misma jornada:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      if (journeyResults[0].count > 0) {
        return res.status(400).json({ error: 'El equipo ya tiene un partido en esta jornada de la misma liga.' });
      }

      // Insertar el nuevo partido
      const insertQuery = `
        INSERT INTO matches (local_team, visitor_team, day, hour, journey, league)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      connection.query(insertQuery, [localeTeam, visitantTeam, day, time, journey, leagueId], (error, results) => {
        if (error) {
          console.error('Error al agregar el partido:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
        }
        res.json({ success: true });
      });
    });
  });
});

module.exports = router;