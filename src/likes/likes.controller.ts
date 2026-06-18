import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { LikesService } from "./likes.service";
import type { LikeCommentDTO, LikeGoalDTO } from "../common/dto/like.dto";
import type { AuthRequest } from "../common/types/authrequest.type";
import { GoalGuard } from "../common/guards/goal.guard";
import { ParamsGuard } from "../common/guards/params.guard";

@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(ParamsGuard)
  @Post("create-to-goal/:id")
  async likeGoal(@Body() like: LikeGoalDTO) {
    return await this.likesService.likeGoal(like);
  }

  @UseGuards(ParamsGuard)
  @Post("create-to-comment/:comment")
  async likeComment(@Body() like: LikeCommentDTO) {
    return await this.likesService.likeComment(like);
  }

  @UseGuards(GoalGuard)
  @Delete("unlike-goal/:id")
  async unlikeGoal(@Param("id") goalId: number, @Req() req: AuthRequest) {
    return await this.likesService.unlikeGoal(req.user["id"], goalId);
  }

  @UseGuards(GoalGuard)
  @Delete("unlike-comment/:id")
  async unlikeComment(@Param("id") commentId: number, @Req() req: AuthRequest) {
    return await this.likesService.unlikeComment(req.user["id"], commentId);
  }
}
