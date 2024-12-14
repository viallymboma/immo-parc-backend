/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(':id')
  async getReport(@Param('id') userId: string) {
    return this.reportsService.getUserReport(userId);
  }
}

