import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import path from 'path';
import {__dirname} from "./helpers/ruta.js"
import { fileURLToPath } from 'url';


import uploadRoutes from './routes/subir_foto.js';
import authRoutes from './routes/authRoutes.js';
import noticiasRoutes from './routes/noticiasRoutes.js';
import modelRoutes from './routes/model_router.js';
import cuentaRoutes from './routes/cuentaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"./tmp"
})); 

app.use('/public', express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta public

// Configura las rutas de autenticación
app.use('/api/auth', authRoutes);
app.use('/api/noticia', noticiasRoutes);
app.use('/api/model', modelRoutes); 
app.use('/api/upload', uploadRoutes);
app.use('/api', cuentaRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
