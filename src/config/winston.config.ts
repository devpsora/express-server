import path from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;

// 로그 디렉토리
const logDir = process.env.LOG_PATH;

const format = combine (
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const transports = [
  // error 레벨 로그를 저장할 파일 설정 (파일 설정은 WinstonDaily 모듈 사용)
  // 모든 레벨 로그를 저장할 파일 설정
  new winstonDaily({
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    dirname: path.resolve(logDir),
    filename: '%DATE%.access.log',
    maxFiles: 7, // 7일
    zippedArchive: true
  }),
  new winstonDaily({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: path.resolve(logDir),
    filename: '%DATE%.error.log',
    maxFiles: 7, // 7일
    zippedArchive: true
  }),
]

const Logger = winston.createLogger({
  format,
  transports,
});

// Production 환경이 아닌 경우(dev 등) 배포 환경에서는 최대한 자원을 안잡아 먹는 로그를 출력해야함
if (process.env.NODE_ENV !== 'production') {
  Logger.add(new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
        format // log format 적용
      )
  }));
}

export default Logger;