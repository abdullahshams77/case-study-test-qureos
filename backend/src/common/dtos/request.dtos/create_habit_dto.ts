import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class create_habit_dto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  details?: string;

}