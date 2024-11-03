import { Router } from "express";
import generarActividad from '../controllers/model_controller.js';
const router = Router();

router.post('/consulta-data', generarActividad);

export default router;