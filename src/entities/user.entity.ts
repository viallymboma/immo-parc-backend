/* eslint-disable prettier/prettier */
import {
  Document,
  Schema as MongooseSchema,
  Types,
} from 'mongoose';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { Packages } from './package.entity';

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: false, unique: true })
  username: string;

  @Prop({ required: false, unique: true })
  email: string;

  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ default: 0 })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Users' })
  parent: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Users', default: [] })
  children: Types.ObjectId[];

  @Prop({ default: 0 })
  funds: number;

  @Prop({ default: 5, required: false }) // Track selected tasks
  selectedTasksCount: number;

  @Prop({ enum: ['internship', 'regular'], default: 'internship' })
  accountType: string;

  @Prop({ type: String, enum: ['super_admin', 'regular_user'], default: 'regular_user' })
  role: 'super_admin' | 'regular_user'; // Role property

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Packages', required: false })
  package: Packages | null; // Reference to a Package

  @Prop()
  internshipExpiry: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
