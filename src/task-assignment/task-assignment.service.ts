import { Model } from 'mongoose';
import {
  TaskAssignment,
  TaskAssignmentDocument,
} from 'src/entities/task-assignment.schema';
import { Task } from 'src/entities/task.entity';
import { UsersDocument } from 'src/entities/user.entity';

/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskAssignmentService {
    constructor(
        @InjectModel('TaskAssignment') private taskAssignmentModel: Model<TaskAssignmentDocument>,
        @InjectModel('Users') private userModel: Model<UsersDocument>,
        @InjectModel('Task') private taskModel: Model<Task>,
    ) {}

    async assignTaskToUser(userId: string, taskId: string): Promise<TaskAssignment> {

        const user = await this.userModel.findById(userId).populate('package');
        if (!user || !user.package) {
            throw new BadRequestException('User or package not found');
        }
    
        const { numberOfTaskPerDay } = user.package;

        // Check if the user has reached their daily task limit
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const tasksAssignedToday = await this.taskAssignmentModel.countDocuments({
            user: user._id,
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });
    
        if (tasksAssignedToday >= numberOfTaskPerDay) {
            throw new BadRequestException(
                `Task limit reached. You can only select ${numberOfTaskPerDay} tasks per day.`,
            );
        }

        // Check if the task is already assigned
        const task = await this.taskModel.findById(taskId);
        if (!task || task.taskStatus !== 'unassigned') {
            throw new BadRequestException('Task not available for assignment.');
        }

        // Assign the task
        const assignment = new this.taskAssignmentModel({ user: user._id, task: task._id });
        await assignment.save();

        // Mark the task as assigned
        task.taskStatus = 'assigned';
        await task.save();

        // Increment user's selectedTasksCount
        user.selectedTasksCount += 1;
        await user.save();

        return assignment;
    }
}
