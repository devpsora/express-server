import { RequestHandler } from 'express';
import { Article, Board } from '../schema';

/**
 * 관리자 : 게시판 추가
 * @param req 
 * @param res 
 * @returns 
 */
export const insertBoard : RequestHandler = async (req, res) => {
  try {
    const { title, slug } = req.body;
    const newBoard = await Board.create({
      title,
      slug
    });
    res.send(newBoard._id ? true : false);
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}
// TODO
// 관리자 > 게시판수정 / 삭제

/**
 * 게시판별 게시글 조회
 * @param req 
 * @param res 
 * @returns 
 */
export const searchBoard : RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params;
    // const { lastIndex } = req.query; // 무한 스크롤 구현시 사용할 인덱스
    const board = await Board.findOne({ slug });   
    if(!board._id) {
      res.send({
        article: [],
        error: true,
        msg: "존재하지 않는 게시판"
      });
    }
    const article = await Article.find({ board : board._id });
    res.send({ article })
  } catch (error) {
    return  res.status(500).send(error.message);
  }
}