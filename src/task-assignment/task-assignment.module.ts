import { TaskAssignmentSchema } from 'src/entities/task-assignment.schema';
import { UsersModule } from 'src/users/users.module';

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskAssignmentController } from './task-assignment.controller';
import { TaskAssignmentService } from './task-assignment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TaskAssignment', schema: TaskAssignmentSchema }]), 
    UsersModule, 
  ],
  providers: [TaskAssignmentService],
  controllers: [TaskAssignmentController], 
  exports: [TaskAssignmentService, MongooseModule],
})
export class TaskAssignmentModule {}
