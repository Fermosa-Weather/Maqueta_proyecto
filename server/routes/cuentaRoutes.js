import  Router  from 'express'
import {obtenerCuentasDeUsuario, obtenerUsuariosDeCuenta, agregarCuentaAUsuario, obtenerUsuariosConCuentas, obtenerCuentasConUsuarios } from '../controllers/cuentaController.js'

const router = Router()

router.get('/usuarios', obtenerUsuariosConCuentas);

router.get('/cuentas', obtenerCuentasConUsuarios);

//obtiene todas las cuentas de un usuario
router.get('/cuentas/:id', obtenerCuentasDeUsuario);

//obtiene todos los usuarios de una cuenta
router.get('/usuarios/:id', obtenerUsuariosDeCuenta);

router.post('/usuarios/:userId/cuentas', agregarCuentaAUsuario);

export default router;