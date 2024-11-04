import User from '../models/UserModel.js'

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_completo, username, profileImage } = req.body; // Acepta el profileImage del frontend
    const file = req.files?.fotoUser; // Obtén el archivo si se sube uno nuevo

    // Objeto para almacenar los datos que se van a actualizar
    const updateData = {};
    if (nombre_completo) updateData.nombre_completo = nombre_completo;
    if (username) updateData.username = username;

    // Si no hay archivo nuevo, usa el nombre de la imagen actual (profileImage)
    if (!file && profileImage) {
      updateData.fotoUser = profileImage;
    }

    // Si se sube un nuevo archivo, actualiza la imagen
    if (file) {
      const fileName = file.name; 
      const filePath = `../../../proyecto/Proyecto_finish_clima/client/public/foto_users/${fileName}`;

      updateData.fotoUser = fileName;

      // Mueve el archivo a la carpeta correspondiente
      await new Promise((resolve, reject) => {
        file.mv(filePath, (err) => {
          if (err) {
            console.error("Error al mover el archivo:", err);
            return reject(new Error('Error al guardar el archivo'));
          }
          resolve();
        });
      });
    }

    // Actualiza el registro del usuario en la base de datos
    const result = await User.updateOne(
      { _id: id }, // Asegúrate de que coincida con el campo _id
      { $set: updateData }
    );

    // Verifica si la actualización fue exitosa
    if (result.nModified === 0) {
      return res.status(400).json({ message: 'No se pudo actualizar el perfil, el usuario puede no existir o no se realizaron cambios' });
    }

    res.status(200).json({ message: 'Perfil actualizado exitosamente' });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};

export const uploadUserImage = async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.files?.fotoUser; // Obtén el archivo cargado
  
      console.log("ID del usuario:", id);
      console.log("Archivo de imagen:", file);
  
      // Verifica si el archivo existe
      if (!file) {
        return res.status(400).json({
          message: 'No se ha proporcionado una imagen de perfil.',
        });
      }
  
      const fileName = file.name; 
      const filePath = `../../../proyecto/Proyecto_finish_clima/client/public/foto_users/${fileName}`
  
      // Actualiza el nombre de la imagen en el registro del usuario
      const usuarioPerfil = await User.updateOne(
        { id },
        { fotoUser: fileName }
      );
  
      // Mueve el archivo al directorio específico
      file.mv(filePath, (err) => {
        if (err) {
          console.error("Error al mover el archivo:", err);
          return res.status(500).json({ message: 'Error al guardar el archivo' });
        }
        res.status(200).json({ message: 'Imagen cargada exitosamente', usuarioPerfil });
      });
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      res.status(500).json({ message: 'Error al cargar la imagen' });
    }
  };
