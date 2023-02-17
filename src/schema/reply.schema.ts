// https://dev.to/osiroski/server-api-endpoints-2h69
import { Schema, model, Model } from 'mongoose';

// 대댓글
// Define Types
interface IReply {
  article: Schema.Types.ObjectId,
  content: string,
  createdAt: Date,
  thumbupCount: Number,
  deleteTime: Number,
  articleImgAddress: string,
}

const ReplySchema = new Schema<IReply>({
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  thumbupCount: {
    type: Number,
    default: 0,
  },
  deleteTime: {
    type: Number,
    default: 0,
  },
  articleImgAddress: {
    type: String,
  },
});

export const Reply:Model<IReply> = model("Reply", ReplySchema);