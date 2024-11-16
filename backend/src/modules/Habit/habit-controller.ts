import { Body, Controller, Post } from '@nestjs/common';
import { HabitService } from './habit-service';
import { create_habit_dto } from 'src/common/dtos/request.dtos/create_habit_dto';
import { RequestDto } from 'src/common/dtos/request.dto';


@Controller('habits')
export class HabitController {
  constructor(
    private readonly habitService: HabitService
  ) {}

  @Post()
  async createHabit(@Body() createHabitDto: RequestDto<create_habit_dto>) {
    return this.habitService.createHabit(createHabitDto);
  }
}
