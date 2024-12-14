/* eslint-disable prettier/prettier */
import {
  Document,
  Types,
} from 'mongoose';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {

  @Prop({ required: true })
  taskTitle: string;

  @Prop({ required: true })
  taskMission: string;

  @Prop({ required: true })
  taskShortInstruction: string;

  // @Prop({ required: true })
  // taskRemuneration: number;

  @Prop({ required: true })
  taskDescription: string;

  @Prop({ required: true })
  taskLink: string;

  @Prop({ required: false, enum: ['video', 'landing'], default: 'video' } )
  taskCategory: string;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ enum: ['unassigned', 'assigned', 'completed', 'overdue'], default: 'unassigned' })
  taskStatus: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  assignedTo: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  completedBy: Types.ObjectId[];

  @Prop()
  dueDate: Date; 

  @Prop({ type: Types.ObjectId, ref: 'Packages', required: true }) // Link to the Package table
  packageId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

