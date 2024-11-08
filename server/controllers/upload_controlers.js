import User from '../models/UserModel.js';
import path from 'path';
import fs from 'fs';

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_completo, username, profileImage } = req.body;
    const file = req.files?.fotoUser;

    const updateData = {};
    if (nombre_completo) updateData.nombre_completo = nombre_completo;
    if (username) updateData.username = username;

    // Si se proporciona una nueva imagen
    if (file) {
      const fileName = file.name;
      const uploadDir = path.resolve('./uploads/foto_users');

      // Crear carpeta si no existe
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      updateData.fotoUser = `foto_users/${fileName}`;

      // Mueve el archivo a la carpeta correspondiente
      await file.mv(filePath, (err) => {
        if (err) {
          console.error("Error al mover el archivo:", err);
          throw new Error('Error al guardar el archivo');
        }
      });
    } else if (profileImage) {
      // Si no hay archivo nuevo, usa la imagen actual
      updateData.fotoUser = profileImage;
    }

    console.log({ updateData });

    const result = await User.updateOne(
      { _id: id },
      { $set: updateData }
    );

    if (!result.acknowledged || result.modifiedCount === 0) {
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
    const file = req.files?.fotoUser;

    if (!file) {
      return res.status(400).json({
        message: 'No se ha proporcionado una imagen de perfil.',
      });
    }

    const fileName = file.name;
    const uploadDir = path.resolve('./uploads/foto_users');

    // Crear carpeta si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    const imagePath = `foto_users/${fileName}`;

    console.log({ imagePath, id });

    // Actualiza el nombre de la imagen en el registro del usuario
    const usuarioPerfil = await User.updateOne(
      { _id: id },
      { $set: { fotoUser: imagePath } }
    );

    if (!usuarioPerfil.acknowledged || usuarioPerfil.modifiedCount === 0) {
      return res.status(400).json({ message: 'No se pudo actualizar la imagen de perfil en la base de datos' });
    }

    // Mueve el archivo al directorio específico
    await file.mv(filePath, (err) => {
      if (err) {
        console.error("Error al mover el archivo:", err);
        return res.status(500).json({ message: 'Error al guardar el archivo' });
      }
      res.status(200).json({ message: 'Imagen cargada exitosamente', imagePath });
    });
  } catch (error) {
    console.error("Error al cargar la imagen:", error);
    res.status(500).json({ message: 'Error al cargar la imagen' });
  }
};
