import User from '../models/UserModel.js';
import Cuenta from '../models/cuentaModel.js';

// Función para asociar un usuario con una cuenta
async function asociarUsuarioConCuenta(userId, cuentaId) {
  // Añade la cuenta al usuario
  await User.findByIdAndUpdate(userId, { $addToSet: { cuentas: cuentaId } });

  // Añade el usuario a la cuenta
  await Cuenta.findByIdAndUpdate(cuentaId, { $addToSet: { usuarios: userId } });
}

export const obtenerUsuariosConCuentas = async (req, res) => {
  try {
    const usuarios = await User.find().populate('cuentas');
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios con cuentas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Función para obtener usuarios de una cuenta
export async function obtenerUsuariosDeCuenta(req, res) {
  const { id } = req.params;
  try {
    const cuenta = await Cuenta.findById(id).populate('usuarios');
    if (!cuenta) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }
    res.json(cuenta.usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios de la cuenta', error });
  }
}

// Función para agregar una cuenta a un usuario
export async function agregarCuentaAUsuario(req, res) {
  const { userId } = req.params;
  const { nombre_cuenta } = req.body; // Asumiendo que el nombre de la cuenta se envía en el cuerpo de la solicitud

  try {
    // 1. Verifica si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // 2. Crea una nueva cuenta
    const nuevaCuenta = new Cuenta({ nombre_cuenta });
    await nuevaCuenta.save();

    // 3. Agrega la referencia de la cuenta al usuario
    user.cuentas.push(nuevaCuenta._id);
    await user.save();

    // 4. Agrega la referencia del usuario a la cuenta
    nuevaCuenta.usuarios.push(user._id);
    await nuevaCuenta.save();

    res.status(201).json({ message: 'Cuenta creada y agregada al usuario', cuenta: nuevaCuenta });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar la cuenta al usuario', error });
  }
}


export const obtenerCuentasConUsuarios = async (req, res) => {
  try {
    const cuentas = await Cuenta.find().populate('usuarios');
    res.status(200).json(cuentas);
  } catch (error) {
    console.error('Error al obtener cuentas con usuarios:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Función para obtener cuentas de un usuario
export async function obtenerCuentasDeUsuario(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate({
      path: 'cuentas',
      model: 'Cuenta',
      populate: {
        path: 'usuarios', // Poblamos el campo 'usuarios' dentro de cada cuenta
        model: 'User', // Referenciamos el modelo 'User'
        
      },
    }).lean(); // Usar lean para obtener un objeto JSON sin métodos adicionales

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user.cuentas); // Retorna todas las cuentas con detalles completos de los usuarios
  } catch (error) {
    console.error('Error al obtener las cuentas del usuario:', error);
    res.status(500).json({ message: 'Error al obtener las cuentas del usuario', error });
  }
}

