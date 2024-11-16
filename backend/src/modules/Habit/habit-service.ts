import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { RequestDto } from "src/common/dtos/request.dto";
import { create_habit_dto } from "src/common/dtos/request.dtos/create_habit_dto";
import { habit_filter_dto } from "src/common/dtos/request.dtos/habit_filter_dto";
import { update_habit_dto } from "src/common/dtos/request.dtos/update_habit_dto";
import { RespDto } from "src/common/dtos/resp.dto";
import { Habit, HabitDocument } from "src/schemas/habit.schema";
import { GeneralException } from "src/util/general.exception";

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

  calculateCurrentStreak(tracking: { date: Date; completed: boolean }[]): number {
    if (!tracking || tracking.length === 0) {
      return 0;
    }
    let streak = 0;
    let currentDate = new Date();
    for (let i = tracking.length - 1; i >= 0; i--) {
      const track = tracking[i];
      const trackingDate = new Date(track.date);
      const dayDifference = Math.floor((currentDate.getTime() - trackingDate.getTime()) / (1000 * 3600 * 24));
      if (dayDifference === 0 || dayDifference === 1) {
        streak++;
        currentDate = trackingDate;
      } else if (dayDifference > 1) {
        break;
      }
    }
    return streak;
  }

  async completeHabitForDay(id: Types.ObjectId, requestDto: RequestDto<{}>) {
    // Find the habit by userId and habitId
    const habit = await this.habitModel.findOne({
      userId: requestDto.user?._id,
      _id: id,
    });
    if (!habit) {
      throw new GeneralException("Habit not found");
    }
    const today = new Date();
    const existingTracking =
      habit.tracking &&
      habit.tracking.find(
        (track) => track.date.toDateString() === today.toDateString()
      );

    if (existingTracking) {
      throw new GeneralException("Habit already completed for the day");
    }
    habit.tracking.push({ date: today, completed: true });
    habit.streak = this.calculateCurrentStreak(habit.tracking);
    await habit.save();
    const respnse = new RespDto({
      status: "Habit Completed for day",
    });
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
