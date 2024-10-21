import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Controlador para el registro de usuarios
const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validar que todos los campos estén presentes
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos' });
  }

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden' });
  }

  try {
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario con la contraseña encriptada
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    // Generar un token de autenticación
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar el token y el ID del usuario en la respuesta
    res.status(201).json({ token, userId: newUser._id });
  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Controlador para el inicio de sesión de usuarios
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validar que todos los campos estén presentes
  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos' });
  }

  try {
    // Verificar si el usuario existe
    console.log(email)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Correo electrónico no encontrado' });
    }

    // Registrar la contraseña almacenada y la contraseña proporcionada para depuración
    console.log('Contraseña almacenada (encriptada):', user.password);
    console.log('Contraseña proporcionada:', password);

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Coincidencia de contraseñas:', isMatch); 

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar un token de autenticación
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar el token y el ID del usuario en la respuesta
    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export { register, login };
