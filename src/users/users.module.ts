/* eslint-disable prettier/prettier */
import {
  Task,
  TaskSchema,
} from 'src/entities/task.entity';
import {
  Users,
  UsersSchema,
} from 'src/entities/user.entity';
import { PackageModule } from 'src/packages/packages.module';

// import { TasksService } from 'src/tasks/task.service';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ 
            name: Users.name, 
            schema: UsersSchema, 
        }]),
        PackageModule, 
        // MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema, }]), // Import PackageModule
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema, }]),
    ],
    controllers: [UsersController], // Controllers are listed here
    providers: [UsersService], // Services and other providers go here
    exports: [UsersService, MongooseModule], // <-- Export UsersService
})
export class UsersModule {}
