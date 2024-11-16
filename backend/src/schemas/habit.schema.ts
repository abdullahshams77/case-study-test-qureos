import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HabitDocument = HydratedDocument<Habit>;
// Habit Schema

@Schema({ timestamps: true })
export class Habit {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  details: string;

  @Prop({ default: false })
  isArchieved: Boolean;

  @Prop({ default: 0 })
  streak: Number;

  @Prop({ default: 0 })
  longestStreak: Number;

  @Prop({
    type: [
      {
        date: { type: Date, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    default: [],
  })
  tracking: { date: Date; completed: boolean }[];
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
