import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentCommentDTO, CommentGoalDTO } from "../common/dto/comment.dto";
import type { AuthRequest } from "../common/types/authrequest.type";
import { GoalGuard } from "../common/guards/goal.guard";
import { ParamsGuard } from "../common/guards/params.guard";
import { ApiParam } from "@nestjs/swagger";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiParam({ name: "id", type: Number, description: "GoalId to get comments" })
  @Get("comments/:id")
  async getRootComments(@Param("id", ParseIntPipe) id: number) {
    return await this.commentsService.getRootComments(id);
  }

  @ApiParam({
    name: "id",
    type: Number,
    description: "GoalId to create comment",
  })
  @UseGuards(ParamsGuard)
  @Post("create-to-goal/:id")
  async createCommentToGoal(@Body() comment: CommentGoalDTO) {
    return await this.commentsService.createCommentToGoal(comment);
  }

  @ApiParam({
    name: "id",
    type: Number,
    description: "GoalId to create comment",
  })
  @ApiParam({
    name: "parent",
    type: Number,
    description: "ParentId to create comment",
  })
  @UseGuards(ParamsGuard)
  @Post("create-to-comment/:id/:parent")
  async createCommentToComment(@Body() comment: CommentCommentDTO) {
    return await this.commentsService.createCommentToComment(comment);
  }

  @ApiParam({
    name: "id",
    type: Number,
    description: "CommentId to delete comment",
  })
  @UseGuards(GoalGuard)
  @Delete("delete/:id")
  async deleteComment(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    return await this.commentsService.deleteComment(id, req.user["id"]);
  }
}
