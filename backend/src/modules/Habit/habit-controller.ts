import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { HabitService } from "./habit-service";
import { create_habit_dto } from "src/common/dtos/request.dtos/create_habit_dto";
import { RequestDto } from "src/common/dtos/request.dto";
import { habit_filter_dto } from "src/common/dtos/request.dtos/habit_filter_dto";
import { update_habit_dto } from "src/common/dtos/request.dtos/update_habit_dto";
import { track_habit_dto } from "src/common/dtos/request.dtos/track_habit_dto";
import { Types } from "mongoose";

@Controller("habits")
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Post()
  async createHabit(@Body() createHabitDto: RequestDto<create_habit_dto>) {
    return this.habitService.createHabit(createHabitDto);
  }
  @Get()
  async getHabits(@Body() habit_filter_dto: RequestDto<habit_filter_dto>) {
    return this.habitService.getHabits(habit_filter_dto);
  }
  @Put(":id")
  async updateHabit(
    @Param("id") id: Types.ObjectId,
    @Body() updateHabitDto: RequestDto<update_habit_dto>
  ) {
    return this.habitService.updateHabit(id, updateHabitDto);
  }
  @Delete(":id")
  async deleteHabit(@Param("id") id: Types.ObjectId) {
    return this.habitService.deleteHabit(id);
  }
  @Put(":id/archive")
  async archiveHabit(@Param("id") id: Types.ObjectId) {
    return this.habitService.archiveHabit(id);
  }
  @Post(":id/track")
  async trackHabit(
    @Param("id") id: Types.ObjectId,
    @Body() trackHabitDto: RequestDto<track_habit_dto>
  ) {
    return;
  }
}
