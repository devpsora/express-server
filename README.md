# Express 를 활용한 웹서버 구축

## 폴더 구조

```
┌── node_modules
├── logs                - 로그 파일
├── src
│ ├── config            - 설정 파일 (DB,Log..)
│ ├── contoller         - API 컨트롤러 파일
│ ├── router            - 라우팅 관련 파일
│ ├── schema            - DB 스키마
│ └── server.ts         - 프로젝트 루트 파일
├── .env                - 환경변수
├── .gitignore          - 깃 저장소에 올라가지 않아야할 파일들을 명시
└── tsconfig.json       - typescript 설정 파일
```

## 프로젝트 기본 구성

- Express + NodeJS
- Typescript

### 1. 필수 모듈 설치

- express : NodeJS를 사용하여 서버를 쉽게 구성할 수 있게 만든 프레임워크
- @types/express : 타입스크립트 환경에서 express를 사용할 수 있도록
- typescript : 타입스크립트
- nodemon : 노드 서버 자동 실행 모듈
- ts-node : NodeJS용 타입스크립트 실행 엔진(타입스크립트를 노드는 인식하지 못한다. 이에 따라 ts-node 모듈을 설치하여 .ts 파일을 콘솔에서 실행할 수 있다.)

  **설치방법**

  ```
  npm i express typescript @types/express
  npm i -D nodemon ts-node
  ```

### 2. 타입스크립트 설정 파일 생성 및 속성 작성(tsconfig.json)

```
  {
  "compilerOptions": {
    "target" : "es6",
    "module" : "commonjs",
    "outDir" : "dist",       // TS -> JS 로 빌드된 파일들 모아두는 폴더명 정의
    "esModuleInterop": true, // es6 모듈 사양을 준수하여 commonjs 모듈을 가져옴
  }
}

```

### 3. 서버 실행을 위한 스크립트 작성

`server.ts`

```
import express from 'express';

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server listening`);
});
```

### 4. 서버 모듈 실행

> package.json 파일의 scripts 를 아래와 같이 수정한다.
>
> ※ typescript 를 정상적으로 실행하기 위해서는 아래와 같은 작업이 필요함(ts-node)

```
  "scripts": {
    "start": "nodemon server",
    "dev": "nodemon --watch \"*.ts\" --exec \"ts-node\" server.ts"
  },
```

### 5. npm run dev 명령어 실행

- 아래와 같이 실행 결과 확인 가능

```
[nodemon] restarting due to changes...
[nodemon] starting `ts-node server.ts`
server listening
```

## DB 연결

- mongoDB를 사용한 예시
  > 사이트 : https://www.mongodb.com/

### DB 연결을 위한 노드 모듈 설치

```
  npm i mongoose
  npm i -D @types/mongoose
```

### DB 연결 테스트

`database.config.ts`

- 아래와 같이 소스코드를 작성하고 루트 파일(`server.ts`)에서 연결한다.
  > 단, DB 정보 관련은 .env 환경 변수 파일에 작성하여 사용한다.

```
 import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
    console.log(`mongodb connected`);
  } catch (error) {
    console.log(`mongodb connect error :::: ${error}`);
  }
}

export default dbConnect;
```

`server.ts`

```
import dbConnect from './config/database.config';

// mongoDB 연결
dbConnect();
```

## 암/복호화 모듈 활용

**bcryptjs, @types/bcryptjs**

- 로그인/회원가입에서 사용한 암/복호화 모듈

1. 사용방법

- a. npm i bcryptjs / npm i -D @types/bcryptjs(타입스크립트)
- b. 작성예시

```
<!-- hash : 동기, hashSync : 비동기 -->
const bcrypt = require('bcrypt');

const PW = 'abcd1234'
const salt = 12;

// hash 비동기콜백
bcrypt.hash(PW, salt, (err, encryptedPW) => {

})

// hashSync 동기
const hash = bcrypt.hashSync(PW, salt);

// async/await 사용
const hash = await bcrypt.hash(PW, salt)
```

- salt : 암호화에 사용되는 Salt, 값이 클수록 암호화 연산이 증가(단, 속도가 느려질 수 있음)

## 로그 설정(morgan / winston)

> 참고 : https://intrepidgeeks.com/tutorial/better-logging-for-expressjs-using-winston-morgan-and-typescript

- winston : 로그 파일 및 로그 레벨 관리 모듈
- winston-dayily-rotate-file : 매일 날짜 별로 로그 파일 생성 및 관리 모듈(시간이 지나면 자동으로 삭제 & 압축 관리)
- morgan : request 요청 로깅 미들웨어

> config 해당 폴더 하위의 로그 설정 정보 참고!!!!

- info > warn > error
