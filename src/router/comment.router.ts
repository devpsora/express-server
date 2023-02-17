import express, { Router } from 'express';
import { deleteSoftComment, deleteHardComment, insertComment, updateComment } from '../contorller/comment';

const router: Router = express.Router();

router.use('/insert', insertComment);
router.use('/update', updateComment);
router.use('/delete/hard', deleteHardComment);
router.use('/delete/soft', deleteSoftComment);

export default router;