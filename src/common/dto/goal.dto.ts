import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class GoalDTO {
  @IsString()
  @IsNotEmpty()
  goalTitle!: string;
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
