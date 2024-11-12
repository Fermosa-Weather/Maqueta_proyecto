import User from '../models/UserModel.js';
import Cuenta from '../models/cuentaModel.js';

// Función para asociar un usuario con una cuenta
async function asociarUsuarioConCuenta(userId, cuentaId) {
  // Añade la cuenta al usuario
  await User.findByIdAndUpdate(userId, { $addToSet: { cuentas: cuentaId } });

//   // Añade el usuario a la cuenta
//   await Cuenta.findByIdAndUpdate(cuentaId, { $addToSet: { usuarios: userId } });
// }

export const addAccountToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password } = req.body;  // Extraemos email y password del body

    // Validar que los campos email y password estén presentes
    console.log("email", email)
    console.log("password", password)

    if (!email || !password) {
      return res.status(400).json({ error: 'Por favor, complete los campos de email y contraseña' });
    }

    // 1. Busca al usuario por correo electrónico
    const userAdd = await User.findOne({ email });
    if (!userAdd) {
      return res.status(404).json({ message: 'Correo no encontrado' });
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


export const getAccountsForUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extrae el userId de los parámetros
    const user = await User.findById(userId).populate('cuentas'); // Busca al usuario y popula las cuentas asociadas

    if (!user) {
      // Si no se encuentra al usuario, se lanza un error
      throw new Error('Usuario no encontrado');
    }

    // Si el usuario tiene cuentas asociadas, las devuelve
    if (user.cuentas.length === 0) {
      res.status(404).json({ message: 'No cuentas asociadas' });
    } else {
      res.status(200).json(user.cuentas); // Responde con las cuentas asociadas
    }
  } catch (error) {
    // Si hay un error, responde con un mensaje de error
    res.status(400).json({ error: error.message });
  }
};

export const removeAccountFromUser = async (req, res) => {
  try {
    const { userId, accountId } = req.params; // ID del usuario y de la cuenta a eliminar

    // 1. Buscar al usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // 2. Verificar si la cuenta está asociada al usuario
    if (!user.cuentas.includes(accountId)) {
      return res.status(400).json({ error: 'La cuenta no está asociada a este usuario' });
    }

    // 3. Eliminar la cuenta del array de cuentas del usuario
    user.cuentas = user.cuentas.filter(cuenta => cuenta.toString() !== accountId);
    await user.save();

    // 4. Eliminar la cuenta de la base de datos
    await Cuenta.findByIdAndDelete(accountId);

    // 5. Enviar una respuesta de éxito
    res.status(200).json({ message: 'Cuenta eliminada y disociada del usuario' });
  } catch (error) {
    console.error('Error al obtener las cuentas del usuario:', error);
    res.status(500).json({ message: 'Error al obtener las cuentas del usuario', error });
  }
}
