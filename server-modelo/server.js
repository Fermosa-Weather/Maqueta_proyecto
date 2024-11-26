import express from 'express';
import cors from 'cors';  // Importa el paquete CORS
import dotenv from 'dotenv';  // Importa dotenv
import modelRoutes from './routes/model_router.js';

// Configuración de dotenv para leer variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;  // Usa el puerto de la variable de entorno o 3000 por defecto

// Middleware para permitir CORS en todas las rutas
app.use(cors());  // Habilita CORS para todas las solicitudes entrantes

// Middleware para analizar cuerpos JSON en las solicitudes
app.use(express.json());  // Para manejar datos JSON en el cuerpo de la solicitud

// Middleware para servir archivos estáticos (si los necesitas)
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor funcionando en el puerto ' + PORT);
});

// Rutas del modelo
app.use('/api/model', modelRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});