import { Body, Controller, Get, Post } from '@nestjs/common';
import { HabitService } from './habit-service';
import { create_habit_dto } from 'src/common/dtos/request.dtos/create_habit_dto';
import { RequestDto } from 'src/common/dtos/request.dto';
import { habit_filter_dto } from 'src/common/dtos/request.dtos/habit_filter_dto';


@Controller('habits')
export class HabitController {
  constructor(
    private readonly habitService: HabitService
  ) {}

  @Post()
  async createHabit(@Body() createHabitDto: RequestDto<create_habit_dto>) {
    return this.habitService.createHabit(createHabitDto);
  }
  @Get()
  async getHabits(@Body() habit_filter_dto: RequestDto<habit_filter_dto>) {
    return this.habitService.getHabits(habit_filter_dto);
  }
}
