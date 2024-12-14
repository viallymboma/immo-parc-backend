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

export type TransactionsDocument = Transactions & Document;

@Schema({ timestamps: true })
export class Transactions {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ enum: ['funding', 'withdrawal', 'earning'], required: true })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ enum: ['pending', 'completed', 'rejected'], default: 'pending' })
  status: string;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transactions);
