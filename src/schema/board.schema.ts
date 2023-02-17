import { Schema, model, Model } from 'mongoose';

// Define Types
interface IBoard {
  username: string,
  title: string,
  slug: string,
  content: string,
  createdAt: Date,
}

const BoardSchema = new Schema<IBoard>({
  username: {
    type: String,
    lowercase: true,
    required: [true, "사용자 이름은 필수값 입니다."],
  },
  title: {
    type: String,
    unique: true,
    required: [true, "게시판 제목은 필수값 입니다."],
  },
  slug: {
    type: String,
    unique: true,
    required: [true, "게시판 슬러그는 필수값 입니다."],
  },
  content: {
    type: String,
    required: [true, "게시판 내용은 필수값 입니다."],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export const Board:Model<IBoard> = model("Board", BoardSchema);