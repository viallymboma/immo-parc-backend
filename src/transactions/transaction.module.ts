// import { TransactionController } from './transaction.controller';
import {
  Transactions,
  TransactionsSchema,
} from 'src/entities/transaction.schema';

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

// import { Transaction, TransactionSchema } from './transaction.schema';
// import { TransactionService } from './transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transactions.name, schema: TransactionsSchema },
    ]),
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService, MongooseModule],
})

export class TransactionModule {}
