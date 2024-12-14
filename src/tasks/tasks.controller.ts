import { JwtAuthGuard } from 'src/utils/jwtAuthGuard';

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TasksService } from './task.service';

// import { Task } from 'src/entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService, 
    private readonly jwtService: JwtService, 
  ) {}

  @UseGuards(JwtAuthGuard) // Ensure user is authenticated
  @Get('users-tasks')
  async getTasksForLoggedInUser(@Req() req: any) {
    const extractToken: string = req.cookies.jwt
    const userInfo: any = await this.jwtService.verify(extractToken, { secret: 'your_jwt_secret' }); 
    // console.log(userInfo, "")
    // // const userId = req.user._id; // Extract user ID from JWT payload
    // const tasks = await this.tasksService.getTasksForUser(userInfo?._id);
    // return tasks;
    if (!userInfo) {
      throw new ForbiddenException('Invalid token or user not found');
    }
  
    console.log(userInfo, ""); // Debug log for userInfo
  
    // Check if the user is an admin
    if (userInfo.role === 'super_admin') {
      // Admin gets all tasks
      return await this.tasksService.getAllTasks();
    }
  
    // Regular user gets tasks based on their subscribed package
    return await this.tasksService.getTasksForUser(userInfo._id);
  }

  @Post('create')
  createTask(@Body() body: { packageId: string, taskTitle: string, taskMission: string, taskShortInstruction: string, taskDescription: string, taskLink: string, taskCategory?: string, imageUrl?: string }) {
    return this.tasksService.createTask(body);
  }

  @Post(':id/assign')
  assignTask(@Param('id') taskId: string, @Body() body: { userId: string }) { 
    return this.tasksService.assignTask(taskId, body.userId);
  }

  @Post(':id/complete')
  completeTask(@Param('id') taskId: string, @Body() body: { userId: string }) {
    return this.tasksService.completeTask(taskId, body.userId);
  }

  // @Get(':id/get-task-for-users')
  // async findAllPackages(@Param('id') ): Promise<Task[]> {
  //   return this.tasksService.().exec();
  // }

  // @Post('upload-image')
  // // @UseInterceptors(FileInterceptor('image'))
  // @UseInterceptors(FileInterceptor('image', multerOptions))
  // uploadTaskImage(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() body: { taskId: string },
  // ) {
  //   return this.tasksService.attachImageToTask(body.taskId, file.filename);
  // }
}
