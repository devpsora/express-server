// https://dev.to/osiroski/server-api-endpoints-2h69
import mongoose, { Schema, model, Model } from 'mongoose';
// https://github.com/ramiel/mongoose-sequence#requiring (import 로 오류 발생함...)
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define Types
interface IArticle {
  author: Schema.Types.ObjectId,
  title: string,
  content: string,
  board: Schema.Types.ObjectId,
  createdAt: Date,
  viewCount: Number,
  thumbupCount: Number,
  commentCount: Number,
  deleteTime: Number,
  mention: Schema.Types.ObjectId,
  articleImgAddress: String,
}

// 변동이 많은 데이터들의 경우 스키마를 별도로 분리하는게 좋다.. reviewScore, realtimeScore
const ArticleSchema = new Schema<IArticle>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  // 동적으로 변동될 수 있는 데이터
  viewCount: {
    type: Number,
    default: 0
  },
  thumbupCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  deleteTime: {
    type: Number,
    default: 0,
  },
  // 사용자가 추가한 정보
  mention: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  articleImgAddress: {
    type: String,
  },
});

ArticleSchema.plugin(AutoIncrement, {inc_field: 'key'}); // 1,2,3.....

export const Article:Model<IArticle> = model("Article", ArticleSchema);