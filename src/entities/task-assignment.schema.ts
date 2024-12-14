/* eslint-disable prettier/prettier */
import {
  Schema as MongooseSchema,
  Types,
} from 'mongoose';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type TaskAssignmentDocument = TaskAssignment & Document;

@Schema({ timestamps: true })
export class TaskAssignment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', required: true })
  user: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Task', required: true })
  task: Types.ObjectId;

  @Prop({ default: 'pending', enum: ['pending', 'in-progress', 'completed'] })
  status: string;
}

export const TaskAssignmentSchema = SchemaFactory.createForClass(TaskAssignment);
