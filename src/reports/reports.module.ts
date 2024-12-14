// import { UsersModule } from 'src/users/users.module';

import { UsersModule } from 'src/users/users.module';

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [UsersModule],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}
