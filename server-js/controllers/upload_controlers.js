import User from '../models/UserModel.js'

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_completo, username } = req.body; // Get the updated name and username from the request body
    const file = req.files?.fotoUser; // Get the uploaded image file if provided

    console.log("ID del usuario:", id);
    console.log("Nombre completo:", nombre_completo);
    console.log("Nombre de usuario:", username);
    console.log("Archivo de imagen:", file);

    // Create an object to hold the update data
    const updateData = {};
    if (nombre_completo) {
      updateData.nombre_completo = nombre_completo;
    }
    if (username) {
      updateData.username = username;
    }

    // Check if the file exists
    if (file) {
      const fileName = file.name; 
      const filePath = `../../../proyecto/Proyecto_finish_clima/client/public/foto_users/${fileName}`;

      // Add the fotoUser field to the update data
      updateData.fotoUser = fileName;

      // Move the file to the specified directory
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

    // Update the user record with the new data
    const result = await User.updateOne(
      { _id: id }, // Ensure you're matching the _id field
      { $set: updateData }
    );

    // Check if the update was successful
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
