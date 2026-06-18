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
import { ApiCookieAuth, ApiParam } from "@nestjs/swagger";

@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiParam({
    name: "id",
    type: Number,
    description: "GoalId to create like",
  })
  @ApiCookieAuth("jwt_token")
  @UseGuards(ParamsGuard)
  @Post("create-to-goal/:id")
  async likeGoal(@Body() like: LikeGoalDTO) {
    return await this.likesService.likeGoal(like);
  }

  @ApiParam({
    name: "comment",
    type: Number,
    description: "CommentId to create like",
  })
  @ApiCookieAuth("jwt_token")
  @UseGuards(ParamsGuard)
  @Post("create-to-comment/:comment")
  async likeComment(@Body() like: LikeCommentDTO) {
    return await this.likesService.likeComment(like);
  }

  @ApiParam({
    name: "id",
    type: Number,
    description: "GoalId to delete like",
  })
  @ApiCookieAuth("jwt_token")
  @UseGuards(GoalGuard)
  @Delete("unlike-goal/:id")
  async unlikeGoal(@Param("id") goalId: number, @Req() req: AuthRequest) {
    return await this.likesService.unlikeGoal(req.user["id"], goalId);
  }

  @ApiParam({
    name: "id",
    type: Number,
    description: "CommentId to delete like",
  })
  @ApiCookieAuth("jwt_token")
  @UseGuards(GoalGuard)
  @Delete("unlike-comment/:id")
  async unlikeComment(@Param("id") commentId: number, @Req() req: AuthRequest) {
    return await this.likesService.unlikeComment(req.user["id"], commentId);
  }
}
