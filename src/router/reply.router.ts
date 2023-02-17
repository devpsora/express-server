import express, { Router } from 'express';
import { deleteHardReply, deleteSoftReply, insertReply, updateReply } from '../contorller/reply';

const router: Router = express.Router();

router.use('/insert', insertReply);
router.use('/update', updateReply);
router.use('/delete/hard', deleteHardReply);
router.use('/delete/soft', deleteSoftReply);

export default router;