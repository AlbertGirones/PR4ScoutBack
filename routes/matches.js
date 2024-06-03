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

router.get('/infoMatch/:matchId', (req, res) => {
  const matchId = req.params.matchId;
  const query = "SELECT m.*, DATE_FORMAT(m.day, '%d/%m/%Y') AS dayGood, DATE_FORMAT(m.hour, '%H:%i') AS hourGood, local_team.name AS local_team_name, visitor_team.name AS visitor_team_name, local_team.image AS local_team_image, visitor_team.image AS visitor_team_image FROM matches m JOIN teams local_team ON m.local_team = local_team.id_team JOIN teams visitor_team ON m.visitor_team = visitor_team.id_team WHERE m.id_match = ?";
  connection.query(query, [matchId], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos del partido:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results[0]);
  });
});

router.get('/matches/upcomingAndRecent/:teamId', (req, res) => {
  const teamId = req.params.teamId;

  const upcomingMatchQuery = `
    SELECT IF(m.local_team = ?, visitor_team.image, local_team.image) AS rival_image, 
           IF(m.local_team = ?, visitor_team.name, local_team.name) AS rival_name, 
           DATE_FORMAT(m.day, '%d/%m/%Y') AS match_day, 
           DATE_FORMAT(m.hour, '%H:%i') AS match_hour, 
           CASE WHEN m.local_team != NULL THEN m.result ELSE '-' END AS result, 
           CASE WHEN m.local_team = ? THEN 'Visitante' ELSE 'Local' END AS local_or_visitor 
    FROM matches m 
    JOIN teams local_team ON m.local_team = local_team.id_team 
    JOIN teams visitor_team ON m.visitor_team = visitor_team.id_team 
    WHERE (m.local_team = ? OR m.visitor_team = ?) 
      AND (m.result IS NULL OR m.result != '') 
      AND m.day >= CURDATE() 
    ORDER BY m.day ASC LIMIT 1
  `;

  const recentMatchesQuery = `
    SELECT IF(m.local_team = ?, t2.image, t1.image) AS rival_image, 
           IF(m.local_team = ?, t2.name, t1.name) AS rival_name, 
           DATE_FORMAT(m.day, '%d/%m/%Y') AS match_day, 
           DATE_FORMAT(m.hour, '%H:%i') AS match_hour, 
           CASE WHEN m.local_team IS NOT NULL THEN m.result ELSE '-' END AS result, 
           CASE WHEN m.local_team = ? THEN 'Visitante' ELSE 'Local' END AS local_or_visitor 
    FROM matches m 
    INNER JOIN teams t1 ON m.local_team = t1.id_team 
    INNER JOIN teams t2 ON m.visitor_team = t2.id_team 
    WHERE (m.local_team = ? OR m.visitor_team = ?) 
      AND (m.result IS NOT NULL AND m.result != '') 
      AND m.day < CURDATE() 
    ORDER BY m.id_match DESC LIMIT 2
  `;

  connection.query(upcomingMatchQuery, [teamId, teamId, teamId, teamId, teamId], (error, upcomingMatchResult) => {
    if (error) {
      console.error('Error al obtener el próximo partido:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    connection.query(recentMatchesQuery, [teamId, teamId, teamId, teamId, teamId], (error, recentMatchesResult) => {
      if (error) {
        console.error('Error al obtener los partidos recientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      res.json({
        upcomingMatch: upcomingMatchResult[0],
        recentMatches: recentMatchesResult
      });
    });
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
  console.log('Request body:', req.body);
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

router.delete('/deleteMatch/:matchId', (req, res) => {
  const matchId = req.params.matchId;
  connection.query('DELETE FROM matches WHERE id_match = ?', [matchId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el partido:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;