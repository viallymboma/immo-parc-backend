/* eslint-disable prettier/prettier */
import {
  Document,
  Types,
} from 'mongoose';

/* eslint-disable prettier/prettier */
import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Packages extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, default: 0 })
  level: number;

  @Prop({ required: true })
  inverstment: number;

  @Prop({ required: true })
  numberOfTaskPerDay: number;

  @Prop({ required: true })
  priceEarnedPerTaskDone: number;

  @Prop({ required: true })
  priceEarnedForAllTaskDonePerDay: number;

  @Prop({ required: true })
  priceEarnedForAllTaskDonePerMonth: number;

  @Prop({ required: true })
  priceEarnedForAllTaskDonePerYear: number;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Task', default: [] }) // Array of task IDs
  listOfTasks: Types.ObjectId[];

  @Prop({ type: Map, of: String, required: false }) // Dynamic additional options
  options?: Map<string, string>;
}

export const PackagesSchema = SchemaFactory.createForClass(Packages);
