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

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get("comments/:id")
  async getRootComments(@Param("id", ParseIntPipe) id: number) {
    return await this.commentsService.getRootComments(id);
  }

  @UseGuards(GoalGuard)
  @Post("create-to-goal")
  async createCommentToGoal(@Body() comment: CommentGoalDTO) {
    return await this.commentsService.createCommentToGoal(comment);
  }

  @UseGuards(GoalGuard)
  @Post("create-to-comment")
  async createCommentToComment(@Body() comment: CommentCommentDTO) {
    return await this.commentsService.createCommentToComment(comment);
  }

  @UseGuards(GoalGuard)
  @Delete("delete/:id")
  async deleteComment(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    return await this.commentsService.deleteComment(id, req.user["id"]);
  }
}
