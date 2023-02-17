import express, { Router } from 'express';
import { searchBoard, insertBoard } from '../contorller/board';

const router: Router = express.Router();

router.use('/insert', insertBoard);
router.use('/search/:slug', searchBoard);

export default router;