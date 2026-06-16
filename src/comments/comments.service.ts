import { Injectable } from "@nestjs/common";
import { dbService } from "../db/db.service";
import { CommentCommentDTO, CommentGoalDTO } from "../common/dto/comment.dto";

@Injectable()
export class CommentsService {
  async getRootComments(goalId: number) {
    const comments = await dbService.getRootCommentsByGoalId(goalId);
    const commentMap = new Map<number, any>();
    const rootComments: any[] = [];
    comments.forEach((el) => {
      commentMap.set(el.commentId, { ...el, replies: [] });
    });
    comments.forEach((el) => {
      const mappedComment = commentMap.get(el.commentId);
      if (el.parentId === null) {
        rootComments.push(mappedComment);
      } else {
        const parentComment = commentMap.get(el.parentId);
        if (parentComment) {
          parentComment.replies.unshift(mappedComment);
        }
      }
    });
    return rootComments;
  }
  async createCommentToGoal(comment: CommentGoalDTO) {
    return await dbService.createCommentToGoal(comment);
  }

  async createCommentToComment(comment: CommentCommentDTO) {
    return await dbService.createCommentToComment(comment);
  }
  async deleteComment(commentId: number, userId: number) {
    return await dbService.deleteComment(commentId, userId);
  }
}
