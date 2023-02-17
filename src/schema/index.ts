import { Article } from './article.schema'; 
import { Board } from './board.schema';
import { Comment } from './comment.schema';
import { Reply } from './reply.schema';
import { User } from './user.schema';

export {
  Article, // 사용자가 작성한 게시글
  Board,   // 각각의 게시판
  Comment, // 게시글 안에 있는 댓글
  Reply,   // 게시글 안에 있는 댓글(Comment)의 대댓글
  User,    // 사용자 정보
}