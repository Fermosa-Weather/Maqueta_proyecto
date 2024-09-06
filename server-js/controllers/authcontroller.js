import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Controlador para el registro de usuarios
const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    // Generar un token de autenticación
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, userId: newUser._id });
  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Controlador para el inicio de sesión de usuarios
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos' });
  }

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    // Generar un token de autenticación
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export { register, login };
