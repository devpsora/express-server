require('dotenv').config({ path: '.env'});

import express, { Router } from 'express';
import cors from 'cors';
import dbConnect from './config/database.config';
import apiRouter from './router';
import Logger from './config/winston.config';
import { errorMorganMiddleware, accessMoarganMiddleware} from './config/morgan.config';

const app: express.Application = express();
const router: Router = Router();

const PORT = process.env.PORT || 4000;

// mongoDB 연결
dbConnect();

// 미들웨어 설정
app
  .use(accessMoarganMiddleware)
  .use(errorMorganMiddleware)
  .use(cors())
  .use(express.json()) // req.body
  .use(express.urlencoded( { extended : true}))

// API 라우트 설정
router.use('/api', apiRouter);

// 서버 설정
const server = () => {
  app.get('/', (req, res) => {
    res.send('Server is running!');
  });
  // 서버 연결
  app.listen(PORT, () => {
    Logger.info(`Server is up and running @ http://localhost:${PORT}`);
  });
}

// 서버 실행
server();