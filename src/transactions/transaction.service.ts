import { Model } from 'mongoose';
import {
  Transactions,
  TransactionsDocument,
} from 'src/entities/transaction.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transactions.name)
    private readonly transactionModel: Model<TransactionsDocument>,
  ) {}

  async createTransaction(createTransactionDto: any): Promise<Transactions> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return createdTransaction.save();
  }

  async findAll(): Promise<Transactions[]> {
    return this.transactionModel.find().exec();
  }

  // Other methods like findOne, update, delete can be added as needed
}
