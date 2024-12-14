/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { TaskAssignmentService } from './task-assignment.service';

@Controller('task-assignment')
export class TaskAssignmentController {

    constructor(private readonly taskAssignmentService: TaskAssignmentService) {}

    @Post('assign')
    async assignTask (
        @Body() body: { userId: string; taskId: string },
        @Res() res,
    ) {
        try {
        const { userId, taskId } = body; 
        const assignment = await this.taskAssignmentService.assignTaskToUser(userId, taskId);
        return res.status(HttpStatus.OK).json({ message: 'Task assigned successfully', assignment });
        } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
        }
    }
}
