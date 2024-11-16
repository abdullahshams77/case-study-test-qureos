import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Habit, HabitSchema } from 'src/schemas/habit.schema';
import { HabitService } from './habit-service';
import { HabitController } from './habit-controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema }]),
  ], 
  providers: [HabitService],
  exports: [HabitService],
  controllers: [HabitController],
})
export class HabitModule {}