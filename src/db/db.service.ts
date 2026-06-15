import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from "dotenv";
import * as schema from "./schema";
import { and, desc, eq, isNull, like } from "drizzle-orm";
import type { UserDTO } from "../common/dto/user.dto";
import type { GoalDTO } from "../common/dto/goal.dto";
import type {
  CommentCommentDTO,
  CommentGoalDTO,
} from "../common/dto/comment.dto";
import type { LikeCommentDTO, LikeGoalDTO } from "../common/dto/like.dto";

config();

class DbService {
  private readonly pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  private readonly db = drizzle(this.pool, { schema });

  getUserById(userId: number) {
    return this.db.query.users.findFirst({
      where: eq(schema.users.userId, userId),
      with: {
        likes: true,
      },
    });
  }
  getUserByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
  }

  async createUser(user: UserDTO) {
    try {
      return await this.db.insert(schema.users).values(user).returning();
    } catch (e) {
      return e;
    }
  }

  deleteUser(userId: number) {
    return this.db
      .delete(schema.users)
      .where(eq(schema.users.userId, userId))
      .returning();
  }

  getAllGoals(limit: number, offset: number) {
    return this.db.query.goals.findMany({
      limit,
      offset,
      orderBy: desc(schema.goals.createdAt),
    });
  }
  getGoalById(goalId: number) {
    return this.db.query.goals.findFirst({
      where: eq(schema.goals.goalId, goalId),
      with: {
        user: true,
        likes: true,
        comments: true,
      },
    });
  }
  getProfileGoals(userId: number) {
    return this.db.query.goals.findMany({
      where: eq(schema.goals.userId, userId),
      orderBy: desc(schema.goals.createdAt),
      with: {
        likes: true,
      },
    });
  }
  getGoalsByUserId(userId: number) {
    return this.db.query.goals.findMany({
      where: and(
        eq(schema.goals.userId, userId),
        eq(schema.goals.status, "public"),
      ),
      orderBy: desc(schema.goals.createdAt),
      with: {
        likes: true,
      },
    });
  }
  async createGoal(goal: GoalDTO) {
    try {
      return await this.db.insert(schema.goals).values(goal).returning();
    } catch (e) {
      return e;
    }
  }
  deleteGoal(goalId: number) {
    return this.db
      .delete(schema.goals)
      .where(eq(schema.goals.goalId, goalId))
      .returning();
  }
  getRootCommentsByGoalId(goalId: number) {
    return this.db.query.comments.findMany({
      where: and(
        eq(schema.comments.goalId, goalId),
        isNull(schema.comments.parentId),
      ),
      with: {
        user: {
          columns: { password: false },
        },
        replies: {
          with: {
            user: { columns: { password: false } },
          },
        },
      },
    });
  }
  async createCommentToGoal(comment: CommentGoalDTO) {
    try {
      return await this.db.insert(schema.comments).values(comment).returning();
    } catch (e) {
      return e;
    }
  }
  async createCommentToComment(comment: CommentCommentDTO) {
    try {
      return await this.db.insert(schema.comments).values(comment).returning();
    } catch (e) {
      return e;
    }
  }
  deleteComment(commentId: number) {
    return this.db
      .delete(schema.comments)
      .where(eq(schema.comments.commentId, commentId))
      .returning();
  }

  async likeGoal(like: LikeGoalDTO) {
    try {
      return await this.db.insert(schema.likes).values(like).returning();
    } catch (e) {
      throw e;
    }
  }

  async likeComment(like: LikeCommentDTO) {
    try {
      return await this.db.insert(schema.likes).values(like).returning();
    } catch (e) {
      throw e;
    }
  }

  unlikeGoal(userId: number, goalId: number) {
    return this.db
      .delete(schema.likes)
      .where(
        and(eq(schema.likes.userId, userId), eq(schema.likes.goalId, goalId)),
      )
      .returning();
  }
}

export const dbService = new DbService();
