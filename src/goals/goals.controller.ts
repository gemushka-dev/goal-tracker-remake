import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { GoalsService } from "./goals.service";
import type { AuthRequest } from "../common/types/authrequest.type";
import { GoalDTO } from "../common/dto/goal.dto";
import { GoalGuard } from "../common/guards/goal.guard";
import { ApiCookieAuth, ApiParam, ApiQuery } from "@nestjs/swagger";

@Controller("goals")
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @ApiQuery({
    name: "limit",
    type: Number,
    description: "Limit number for pagination",
  })
  @ApiQuery({
    name: "offset",
    type: Number,
    description: "Offset for pagination",
  })
  @Get("all")
  async getAllGoals(
    @Query("limit", ParseIntPipe) limit: number,
    @Query("offset", ParseIntPipe) offset: number,
  ) {
    return await this.goalsService.getAllGoals(limit, offset);
  }

  @ApiParam({ name: "id", type: Number, description: "GoalId to get goal" })
  @Get("by-id/:id")
  async getGoalById(@Param("id", ParseIntPipe) id: number) {
    return await this.goalsService.getGoalById(id);
  }

  @ApiParam({
    name: "id",
    type: Number,
    description: "UserId to get goals(public)",
  })
  @Get("user/:id")
  async getGoalsByUserId(@Param("id", ParseIntPipe) id: number) {
    return await this.goalsService.getGoalsByUserId(id);
  }

  @ApiCookieAuth("jwt_token")
  @UseGuards(GoalGuard)
  @Get("profile")
  async getProfileGoals(@Req() req: AuthRequest) {
    return await this.goalsService.getProfileGoals(req.user["id"]);
  }

  @ApiCookieAuth("jwt_token")
  @UseGuards(GoalGuard)
  @Post("create")
  async createGoal(@Body() goal: GoalDTO) {
    return await this.goalsService.createGoal(goal);
  }

  @ApiParam({ name: "id", type: Number, description: "GoalId to delete goal" })
  @ApiCookieAuth("jwt_token")
  @UseGuards(GoalGuard)
  @Delete("delete/:id")
  async deleteGoal(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    return await this.goalsService.deleteGoal(id, req.user["id"]);
  }
}
