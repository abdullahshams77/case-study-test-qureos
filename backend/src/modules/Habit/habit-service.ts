import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { RequestDto } from "src/common/dtos/request.dto";
import { create_habit_dto } from "src/common/dtos/request.dtos/create_habit_dto";
import { habit_filter_dto } from "src/common/dtos/request.dtos/habit_filter_dto";
import { update_habit_dto } from "src/common/dtos/request.dtos/update_habit_dto";
import { RespDto } from "src/common/dtos/resp.dto";
import { Habit, HabitDocument } from "src/schemas/habit.schema";

@Injectable()
export class HabitService {
  constructor(
    @InjectModel(Habit.name) private habitModel: Model<HabitDocument>
  ) {}

  // Create a new habit
  async createHabit(createHabitDto: RequestDto<create_habit_dto>) {
    const habit = new this.habitModel({
      ...createHabitDto.data,
      userId: createHabitDto?.user?._id,
    });
    const newHabit = await habit.save();
    const respnse = new RespDto(newHabit);
    return respnse;
  }

  async updateHabit(
    id: Types.ObjectId,
    update_habit_dto: RequestDto<update_habit_dto>
  ) {
    const updatedHabit = await this.habitModel.findByIdAndUpdate(
      id,
      update_habit_dto.data,
      { new: true }
    );
    const respnse = new RespDto(updatedHabit);
    return respnse;
  }

  async deleteHabit(id: Types.ObjectId) {
    const updatedHabit = await this.habitModel.findByIdAndDelete(id);
    const respnse = new RespDto(updatedHabit);
    return respnse;
  }

  async archiveHabit(id: Types.ObjectId) {
    const updatedHabit = await this.habitModel.findByIdAndUpdate(
      id,
      { isArchieved: true },
      { new: true }
    );
    const respnse = new RespDto(updatedHabit);
    return respnse;
  }

  async getHabits(habitFilterDto: RequestDto<habit_filter_dto>) {
    const {
      isArchived,
      priority,
      creationDateFrom,
      creationDateTo,
      title,
      sortBy = "creationDate",
      sortOrder = "asc",
    } = habitFilterDto.data;

    const query: any = {};

    query.userId = habitFilterDto?.user?._id;

    if (isArchived !== undefined) query.isArchieved = isArchived;
    if (priority !== undefined) query.priority = priority;
    if (creationDateFrom)
      query.createdAt = { $gte: new Date(creationDateFrom) };
    if (creationDateTo) query.createdAt = { $lte: new Date(creationDateTo) };

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    // Sort by specified field
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const habits = await this.habitModel.find(query).sort(sortOptions).exec();
    const respnse = new RespDto(habits);
    return respnse;
  }
}
