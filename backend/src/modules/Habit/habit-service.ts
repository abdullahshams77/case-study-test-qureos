import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RequestDto } from "src/common/dtos/request.dto";
import { create_habit_dto } from "src/common/dtos/request.dtos/create_habit_dto";
import { RespDto } from "src/common/dtos/resp.dto";
import { Habit, HabitDocument } from "src/schemas/habit.schema";

@Injectable()
export class HabitService {
  constructor(
    @InjectModel(Habit.name) private habitModel: Model<HabitDocument>
  ) {}

  // Create a new habit
  async createHabit(createHabitDto: RequestDto<create_habit_dto>) {
    const habit = new this.habitModel({...createHabitDto.data,userId: createHabitDto?.user?._id});
    const newHabit = await habit.save();
    const respnse = new RespDto(newHabit);
    return respnse;
  }
}
