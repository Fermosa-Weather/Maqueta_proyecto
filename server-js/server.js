import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'; // Asegúrate de que esta ruta es correcta
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permite solicitudes de otros orígenes
app.use(express.json()); // Parsear JSON en el cuerpo de las solicitudes

// Configura las rutas de autenticación
app.use('/api/auth', authRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Esta opción es opcional en versiones más recientes
  useUnifiedTopology: true, // Esta opción es opcional en versiones más recientes
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
