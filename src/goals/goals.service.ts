import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { dbService } from "../db/db.service";
import { GoalDTO } from "../common/dto/goal.dto";

@Injectable()
export class GoalsService {
  async getAllGoals(limit: number, offset: number) {
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    return await dbService.getAllGoals(limit, offset);
  }

  async getGoalById(goalId: number) {
    const goal = await dbService.getGoalById(goalId);
    if (!goal?.goalId) throw new NotFoundException();
    return goal;
  }

  async getGoalsByUserId(userId: number) {
    return await dbService.getGoalsByUserId(userId);
  }

  async getProfileGoals(userId: number) {
    return await dbService.getProfileGoals(userId);
  }

  async createGoal(goal: GoalDTO) {
    return await dbService.createGoal(goal);
  }

  async deleteGoal(goalId: number, userId: number) {
    return await dbService.deleteGoal(goalId, userId);
  }
}
