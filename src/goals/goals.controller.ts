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

@Controller("goals")
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get("all")
  async getAllGoals(
    @Query("limit", ParseIntPipe) limit: number,
    @Query("offset", ParseIntPipe) offset: number,
  ) {
    return await this.goalsService.getAllGoals(limit, offset);
  }

  @Get("by-id/:id")
  async getGoalById(@Param("id", ParseIntPipe) id: number) {
    return await this.goalsService.getGoalById(id);
  }

  @Get("user/:id")
  async getGoalsByUserId(@Param("id", ParseIntPipe) id: number) {
    return await this.goalsService.getGoalsByUserId(id);
  }

  @UseGuards(GoalGuard)
  @Get("profile")
  async getProfileGoals(@Req() req: AuthRequest) {
    return await this.goalsService.getProfileGoals(req.user["id"]);
  }

  @UseGuards(GoalGuard)
  @Post("create")
  async createGoal(@Body() goal: GoalDTO) {
    return await this.goalsService.createGoal(goal);
  }

  @UseGuards(GoalGuard)
  @Delete("delete/:id")
  async deleteGoal(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    return await this.goalsService.deleteGoal(id, req.user["id"]);
  }
}
