import express, { Router } from 'express';
import { deleteHardArticle, deleteSoftArticle, updateArticle,insertArticle, searchArticle } from '../contorller/article';

const router: Router = express.Router();

router.use('/search/:id', searchArticle);
router.use('/insert', insertArticle);
router.use('/update', updateArticle);
router.use('/delete/hard', deleteHardArticle);
router.use('/delete/soft', deleteSoftArticle);

export default router;