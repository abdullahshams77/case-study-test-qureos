import {
  IsOptional,
  IsBoolean,
  IsDateString,
  IsString,
  IsIn,
  IsEnum,
} from "class-validator";
import { HabitPriority } from "../enums";
import { Transform } from "class-transformer";

export enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}

export class habit_filter_dto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === "true" || value === true ? true : false)
  isArchived?: boolean;

  @IsOptional()
  @IsDateString()
  creationDateFrom?: string;

  @IsOptional()
  @IsDateString()
  creationDateTo?: string;

  @IsOptional()
  @IsEnum(HabitPriority)
  priority?: HabitPriority;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsIn(["creationDate", "priority", "streak"])
  sortBy?: "creationDate" | "priority" | "streak";

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;



}
