import morgan, { StreamOptions } from "morgan";
import Logger from './winston.config';

// body 설정
morgan.token('body', (req: any, res: any) => JSON.stringify(req.body));

// Access
const accessStream: StreamOptions = {
  write: (message) => Logger.info(message)
};
const accessSkip = (req, res) => res.statusCode >= 400;

// Error
const errorStream: StreamOptions = {
  write: (message) => Logger.error(message)
};
const errorSkip = (req, res) => res.statusCode < 400;

// Build the morgan middleware
const accessMoarganMiddleware = morgan(
  ':req[host] :remote-addr :req[Content-Length] [:date] ":method :url HTTP/:http-version" '
    + ':status :response-time[0] :res[Content-Length] ":referrer" ":user-agent"',
  { stream: accessStream, skip: accessSkip }
);
const errorMorganMiddleware = morgan(
  ':method :url :body', // 하고싶은대로 설정해서 사용할것....(포맷)
    { stream: errorStream, skip: errorSkip }
);

export { accessMoarganMiddleware, errorMorganMiddleware };