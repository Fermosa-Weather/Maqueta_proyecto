// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define el esquema del modelo de usuario
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Elimina espacios en blanco alrededor del nombre
  },
  email: {
    type: String,
    required: true,
    unique: true, // Asegura que el correo electrónico sea único
    trim: true,
    lowercase: true, // Convierte el correo electrónico a minúsculas
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fecha de creación por defecto
  },
});

// Middleware para encriptar la contraseña antes de guardar
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error('Error al comparar contraseñas');
  }
};

// Crea y exporta el modelo de usuario
const User = mongoose.model('User', UserSchema);

export default User;
