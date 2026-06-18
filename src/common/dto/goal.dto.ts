import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class GoalDTO {
  @ApiProperty({
    description: "Goal title",
    example: "Start doing sport",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  goalTitle!: string;

  @ApiProperty({
    description: "Goal content",
    example: "Run every day and do push ups",
    type: String,
  })
  @IsOptional()
  @IsString()
  goalContent!: string;
  @IsOptional()
  @IsString()
  status?: "private" | "public";
  @IsInt()
  @IsPositive()
  userId!: number;
}
