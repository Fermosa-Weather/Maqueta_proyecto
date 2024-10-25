import User from '../models/UserModel.js'

// Controlador para subir la imagen de usuario
export const uploadUserImage = async (req, res) => {
  try {
    const {id}=req.params 
    const { fotoUser} = req.body;

    console.log("id del usuario: ", id)
    console.log("archivo de imagen: ", req.files)

    if (!req.files || !req.files.fotoUser) {
      return res.status(400).json({
          message: 'No se ha proporcionado una imagen de perfil.'
      });
  }
  const file = req.files.fotoUser;
  console.log("file", file);

  const fileName = file.name; 

  console.log("filename", fileName);

    const usuarioPerfil = await User.updateOne(
    {id},
    { fotoUser: fileName },
    );

      file.mv(`../../../proyecto/Proyecto_finish_clima/client/public/foto_users/${fileName}`, (err) => {
          if (err) {
              console.log(err);
              return res.status(500).json({ message: 'Error save archive' });
          }
          res.status(200).json({ message: 'Image upload', usuarioPerfil });
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error upload image' });
  }
};
