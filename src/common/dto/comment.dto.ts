import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CommentGoalDTO {
  @IsString()
  @IsNotEmpty()
  commentText!: string;
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId!: number;
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  goalId!: number;
}
export class CommentCommentDTO {
  @IsString()
  @IsNotEmpty()
  commentText!: string;
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId!: number;
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  goalId!: number;
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  parentId!: number;
}
