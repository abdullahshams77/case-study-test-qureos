import { IsNotEmpty, IsString, IsOptional, IsEnum } from "class-validator";
import { HabitPriority } from "../enums";

export class update_habit_dto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  goal: string;

  @IsOptional()
  @IsEnum(HabitPriority)
  priority?: HabitPriority;

  @IsOptional()
  details?: string;
}
