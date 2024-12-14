import { CreateTransactionDto } from 'src/dto/create-transaction.dto';
/* eslint-disable prettier/prettier */
import { Transactions } from 'src/entities/transaction.schema';

import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { TransactionService } from './transaction.service';

// import { Transaction } from './transaction.schema';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transactions> {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get()
  async findAll(): Promise<Transactions[]> {
    return this.transactionService.findAll();
  }

  // Add more routes as needed (e.g., findById, update, delete)
}
