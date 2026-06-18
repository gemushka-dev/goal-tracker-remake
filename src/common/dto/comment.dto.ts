import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CommentGoalDTO {
  @ApiProperty({
    description: "Comment text",
    example: "Great goal, never give up!",
    type: String,
  })
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
  @ApiProperty({
    description: "Comment text",
    example: "Great goal, never give up!",
    type: String,
  })
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
