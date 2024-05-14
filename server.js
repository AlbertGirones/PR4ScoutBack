const express = require('express');
const cors = require('cors');
const userDataRoutes = require('./routes/userDataRoutes');
const teamsRoutes = require('./routes/teams');
const leaguesRoutes = require('./routes/leagues');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza esta URL con la URL de tu aplicación de React
  credentials: true // Permite el intercambio de cookies entre el cliente y el servidor
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userDataRoutes);
app.use('/api', teamsRoutes);
app.use('/api', leaguesRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
