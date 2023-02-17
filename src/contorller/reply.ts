import { RequestHandler } from 'express';
import { Reply } from '../schema/reply.schema';

/**
 * 대댓글 생성하기
 * @param req 
 * @param res 
 * @returns 
 */
export const insertReply : RequestHandler = async (req, res) => {
  try {
    const { author, article, content } = req.body;
    const newReply = await Reply.create({
      author, article, content
    });
    res.send(newReply._id ? true : false);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 대댓글 수정하기
 * @param req 
 * @param res 
 * @returns 
 */
export const updateReply : RequestHandler = async (req, res) => {
  try {
    const { id, author, content } = req.body;    
    const updatedReply = await Reply.findByIdAndUpdate({
      _id : id,
      author
    }, {
      content
    });
    res.send(updatedReply);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 대댓글 삭제하기(HARD)
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteHardReply : RequestHandler = async (req, res) => {
  try {
    const { id, author } = req.body;
    const deleteComment = await Reply.findByIdAndDelete({
      _id : id,
      author
    });
    res.send(deleteComment);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 대댓글 삭제하기(SOFT)
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteSoftReply : RequestHandler = async (req, res) => {
  try {
    const { id, author } = req.body;
    const deleteComment = await Reply.findByIdAndUpdate({
      _id : id,
      author
    }, {
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30일 후의 시간 저장
    });
    res.send(deleteComment);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}