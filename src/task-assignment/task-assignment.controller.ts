/* eslint-disable prettier/prettier */
import {
  Request,
  Response,
} from 'express'; // Import from express
import { JwtAuthGuard } from 'src/utils/jwtAuthGuard';

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TaskAssignmentService } from './task-assignment.service';

@Controller('task-assignment')
export class TaskAssignmentController {

    constructor(
        private readonly taskAssignmentService: TaskAssignmentService, 
        private readonly jwtService: JwtService, 
    ) {}

    @UseGuards(JwtAuthGuard) // Ensures the user is authenticated
    @Get('user-tasks')
    async getUserTasks(@Req() req: Request, @Res() res: Response) {
        try {
            const extractToken: string = req.cookies.jwt
            const userInfo: any = await this.jwtService.verify(extractToken, { secret: 'your_jwt_secret' });
            // Extract user ID from request (use auth middleware if implemented)
            const userId = userInfo._id; // Assuming `req.user.id` contains the logged-in user's ID

            const taskAssignments = await this.taskAssignmentService.getTasksForUser(userId);
            return res.status(HttpStatus.OK).json({ tasks: taskAssignments });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
        }
    }

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
