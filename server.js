const express = require('express');
const cors = require('cors');
const path = require('path');
const userDataRoutes = require('./routes/userDataRoutes');
const teamsRoutes = require('./routes/teams');
const leaguesRoutes = require('./routes/leagues');
const playersRoutes = require('./routes/players');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userDataRoutes);
app.use('/api', teamsRoutes);
app.use('/api', leaguesRoutes);
app.use('/api', playersRoutes); 

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
