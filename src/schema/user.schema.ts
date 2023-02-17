// https://dev.to/osiroski/server-api-endpoints-2h69
import { Schema, model, Model } from 'mongoose';

// Define Types
interface IUser {
  id: string,
  username: string,
  password: string,
  email: string,
  createdAt: Date,
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "사용자 이름은 필수값 입니다."],
  },
  password: {
    type: String,
    required: [true, "비밀번호는 필수값 입니다."],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "이메일은 필수값 입니다."],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, '유효한 주소를 사용해주세요'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

export const User:Model<IUser> = model("User", UserSchema);