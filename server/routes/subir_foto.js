import express from 'express';
import {uploadUserImage, updateUserProfile} from '../controllers/upload_controlers.js';

const router = express.Router();

router.put('/editar/:id', updateUserProfile)

router.put('/:id', uploadUserImage)


export default router;

