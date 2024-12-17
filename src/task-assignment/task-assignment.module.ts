import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TaskAssignmentSchema } from 'src/entities/task-assignment.schema';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from 'src/utils/jwtAuthGuard';

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskAssignmentController } from './task-assignment.controller';
import { TaskAssignmentService } from './task-assignment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TaskAssignment', schema: TaskAssignmentSchema }]), 
    JwtModule.register({
      // secret: process.env.JWT_SECRET, // Replace with a secure secret
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule, 
  ],
  providers: [TaskAssignmentService, JwtStrategy, JwtAuthGuard],
  controllers: [TaskAssignmentController], 
  exports: [TaskAssignmentService, MongooseModule],
})
export class TaskAssignmentModule {}
