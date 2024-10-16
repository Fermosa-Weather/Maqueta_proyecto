import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'; // Asegúrate de que esta ruta es correcta
import noticiasRoutes from './routes/noticiasRoutes.js'; 
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Permite solicitudes de otros orígenes
app.use(express.json()); // Parsear JSON en el cuerpo de las solicitudes

// Configura las rutas de autenticación
app.use('/api/auth', authRoutes);
app.use('/api/noticia', noticiasRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
