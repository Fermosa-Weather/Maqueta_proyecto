import express from 'express';
import {addNew, getNew} from '../controllers/noticiasControllers.js';

const router = express.Router();

router.get('/all', getNew);

router.post('/add', addNew);

export default router;
