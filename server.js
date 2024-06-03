const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const userDataRoutes = require('./routes/userDataRoutes');
const teamsRoutes = require('./routes/teams');
const leaguesRoutes = require('./routes/leagues');
const playersRoutes = require('./routes/players');
const matchRoutes = require('./routes/matches');
const statsRoutes = require('./routes/stats');
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 5000;

const app = express();

// Configuración de CORS para permitir todos los orígenes
app.use(cors({
  origin: ['http://192.168.1.101:5000', 'http://192.168.1.101:3000', 'http://localhost:5000', 'http://localhost:3000'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userDataRoutes);
app.use('/api', teamsRoutes);
app.use('/api', leaguesRoutes);
app.use('/api', playersRoutes);
app.use('/auth', authRoutes);
app.use('/api', matchRoutes);
app.use('/api', statsRoutes);


// Definir una ruta para la raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Ruta para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Configuración del servidor para escuchar en todas las interfaces de red
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

module.exports = app;
