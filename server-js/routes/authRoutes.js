import express from 'express';
import { register, login, getAllUsers, getUserById, updateUser} from '../controllers/authcontroller.js';
import { check } from 'express-validator'; 

const router = express.Router();

// Ruta para el registro de usuarios
router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  ],
  register
);
// Ruta para el inicio de sesión de usuarios
router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').exists(),
  ],
  login
);

router.get("/:id", getUserById)

router.get("/", getAllUsers)

router.put("/", updateUser)

// router.update("/", )

export default router;
