
import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../schema/user.schema';

const saltArounds = 10;

/**
 * 회원가입
 * @param req 
 * @param res 
 * @returns 
 */
export const signup : RequestHandler = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    //////////////////// 유효성 체크 S ////////////////////
    // 기존에 등록된 회원 여부 체크
    const user = await User.findOne({ username: username });
    if(user) {
      return res.status(500).json({
        status: 500,
        message: `이미 가입된 사용자입니다. 로그인 화면 또는 비밀번호를 찾기`
      });
    }
    // 암호화상태로 저장되기 때문에 유효성 체크를 먼저 처리한다.
    if(!password) {
      return res.status(500).json({
        status: 500,
        message: `비밀번호는 필수값 입니다.`
      });
    } else if(password.length < 8) {
      // TODO. 비밀번호 규칙 설정 추가 해보기!!
      return res.status(500).json({
        status: 500,
        message: `비밀번호는 8자리 이상 입력해주세요.`
      });
    }
    //////////////////// 유효성 체크 E ////////////////////
    // 신규 회원 가입
    // 비밀번호는 bcrypt 암호화 처리하여 DB에 저장
    const hashedPwd = await bcrypt.hash(password, saltArounds);
    const insertUser = await User.create({
      username,
      password: hashedPwd, // 보안패스워드
      email
    });
    return res.status(200).json({
      status: 200,
      message: `${insertUser.username} 님, 회원가입을 축하합니다. 로그인화면으로 이동`
    });
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 로그인
 * @param req 
 * @param res 
 * @returns 
 */
export const login : RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    // 유효성 체크
    if(!username || !password) {
      return res.status(500).send(`사용자이름, 비밀번호는 필수 입력값 입니다.`);
    }
    // 사용자 찾기
    const user = await User.findOne({ username: username }); 
    if (user) {
      // DB에 저장된 비밀번호를 복호화하여 비교
      const cmp = await bcrypt.compare(password, user.password);
      const sendMessage = cmp ? "로그인 성공" : "사용자 이름, 비밀번호 실패";
      return res.send(sendMessage);
    } else {
      return res.send("사용자 정보가 없습니다.");
    }
  } catch (error) {
    return res.status(500).send("로그인 오류");
  }
}

// TODO....
// 사용자 정보 변경
// 프로필 이미지 변경
// 회원탈퇴