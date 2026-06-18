import { Injectable } from "@nestjs/common";
import { dbService } from "../db/db.service";
import { LikeCommentDTO, LikeGoalDTO } from "../common/dto/like.dto";

@Injectable()
export class LikesService {
  async likeGoal(like: LikeGoalDTO) {
    return await dbService.likeGoal(like);
  }

  async likeComment(like: LikeCommentDTO) {
    return await dbService.likeComment(like);
  }

  async unlikeGoal(userId: number, goalId: number) {
    return await dbService.unlikeGoal(userId, goalId);
  }
  async unlikeComment(userId: number, commentId: number) {
    return await dbService.unlikeComment(userId, commentId);
  }
}
