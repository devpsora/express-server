import express, { Router } from 'express';
import articleRouter from './article.router';
import boardRouter from './board.router';
import commentRouter from './comment.router';
import replyRouter from './reply.router';
import userRouter from './user.router';

const router: Router = express.Router();

router.use('/article', articleRouter);
router.use('/board', boardRouter);
router.use('/comment', commentRouter);
router.use('/reply', replyRouter);
router.use('/user', userRouter);

export default router;