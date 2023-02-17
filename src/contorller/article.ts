import { RequestHandler } from 'express';
import { Article, Comment } from '../schema';

/**
 * 사용자가 작성한 게시글 조회
 * @param req 
 * @param res 
 * @returns 
 */
export const searchArticle : RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;   
    const article = await Article.findById(id);
    const comment = await Comment.find({ article : id });
    res.send({ article, comment });
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 사용자 작성한 게시글 생성
 * @param req 
 * @param res 
 * @returns 
 */
export const insertArticle : RequestHandler = async (req, res) => {
  try {
    const { author, title, content, board } = req.body;
    const newArticle = await Article.create({
      author,
      title,
      content,
      board
    });
    // @ts-ignore
    res.send(newArticle);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 게시글 수정
 * @param req 
 * @param res 
 * @returns 
 */
export const updateArticle : RequestHandler = async (req, res) => {
  try {
    const { id, author, content } = req.body;
    const updateArticle = await Article.findByIdAndUpdate({
      _id : id,
      author
    }, {
      content
    })
    res.send(updateArticle);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 게시글 삭제(hard)
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteHardArticle : RequestHandler = async (req, res) => {
  try {
    const { id, author } = req.body;
    const deleteArticle = await Article.findByIdAndDelete({
      _id : id,
      author
    });
    res.send(deleteArticle);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
/**
 * 게시글 삭제(soft)
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteSoftArticle : RequestHandler = async (req, res) => {
  try {
    const { id, author } = req.body;
    const deleteArticle = await Article.findByIdAndUpdate({
      _id : id,
      author
    }, {
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30일 후의 시간 저장
    })
    res.send(deleteArticle);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}