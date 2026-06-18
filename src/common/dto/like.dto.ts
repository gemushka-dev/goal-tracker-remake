import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class LikeGoalDTO {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId!: number;
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  goalId!: number;
}
export class LikeCommentDTO {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId!: number;
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  commentId!: number;
}
