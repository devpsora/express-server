import { RequestHandler } from 'express';
import { Comment } from '../schema';

/**
 * 댓글 생성하기
 * @param req 
 * @param res 
 * @returns 
 */
export const insertComment : RequestHandler = async (req, res) => {
  try {
    const { author, article, content } = req.body;
    const newComment = await Comment.create({
      author, article, content
    });
    res.send(newComment._id ? true : false);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 댓글 수정하기
 * @param req 
 * @param res 
 * @returns 
 */
export const updateComment : RequestHandler = async (req, res) => {
  try {
    const { id, author, content } = req.body;    
    const updatedComment = await Comment.findByIdAndUpdate({
      _id : id,
      author
    }, {
      content
    })
    console.log(updatedComment);
    res.send(updatedComment);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 댓글 삭제하기(HARD)
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteHardComment : RequestHandler = async (req, res) => {
  try {
    const { id, author } = req.body;
    const deleteComment = await Comment.findByIdAndDelete({
      _id : id,
      author
    })
    console.log(deleteComment);
    res.send(deleteComment);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 댓글 삭제하기(SOFT)
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteSoftComment : RequestHandler = async (req, res) => {
  try {
    const { id, author } = req.body;
    const deleteComment = await Comment.findByIdAndUpdate({
      _id : id,
      author
    }, {
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30일 후의 시간 저장
    })
    res.send(deleteComment);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}