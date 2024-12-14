/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Packages } from 'src/entities/package.entity';
import {
  Task,
  TaskDocument,
} from 'src/entities/task.entity';
import {
  Users,
  UsersDocument,
} from 'src/entities/user.entity';

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// import { Task, TaskDocument } from '../schemas/task.schema';
// import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>, 
    @InjectModel(Packages.name) private packageModel: Model<[]>,
  ) {}

  async getTasksForUser(userId: string): Promise<Task[]> {
    // Fetch the user and their subscribed package
    const user = await this.userModel.findById(userId).populate('package', 'listOfTasks');
    
    if (!user || !user.package) {
      throw new Error('User or user package not found');
    }
  
    // // Fetch tasks associated with the package
    // const packageWithTasks: any = await this.packageModel
    //   .findById(user.package._id)
    //   .populate('listOfTasks')
    //   .exec();

    // Fetch tasks associated with the package and populate the packageId field
    const packageWithTasks: any = await this.packageModel
    .findById(user.package._id)
    .populate({
      path: 'listOfTasks',
      populate: {
        path: 'packageId', // Populate the packageId for each task
        // select: 'name price', // Specify fields to include from the Package schema
      },
    })
    .exec();
  
    if (!packageWithTasks) {
      throw new Error('Package not found or has no tasks');
    }
  
    // Return the list of tasks
    return packageWithTasks.listOfTasks as Task[];
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find().exec(); // Fetch all tasks
  }  

  async createTask(taskData: any): Promise<Task> {
    const { packageId, ...taskDetails } = taskData;

    // Validate packageId
    const pkg: any = await this.packageModel.findById(packageId);
    if (!pkg) {
      throw new Error('Invalid package ID');
    }

    // Create the task
    const task = new this.taskModel({ ...taskDetails, packageId });
    const createdTask = await task.save();

    // Update the package to include the new task ID in listOfTasks
    pkg.listOfTasks.push(createdTask._id);
    await pkg.save();

    return createdTask;
  }

  // async getAllTasks(): Promise<Task> {
  //   const task: any = await this.taskModel.findById(taskId);
  //   const user: any = await this.userModel.findById(userId);

  //   if (!task) throw new Error('Task not found');
  //   if (!user) throw new Error('User not found');

  //   task.assignedTo.push(user._id);
  //   task.status = 'assigned';

  //   await task.save();
  //   return task;
  // }

  async assignTask(taskId: string, userId: string): Promise<Task> {
    const task: any = await this.taskModel.findById(taskId);
    const user: any = await this.userModel.findById(userId);

    if (!task) throw new Error('Task not found');
    if (!user) throw new Error('User not found');

    task.assignedTo.push(user._id);
    task.status = 'assigned';

    await task.save();
    return task;
  }

  async completeTask(taskId: string, userId: string): Promise<Task> {
    const task: any = await this.taskModel.findById(taskId);
    const user: any = await this.userModel.findById(userId);

    if (!task) throw new Error('Task not found');
    if (!user) throw new Error('User not found');
    if (!task.assignedTo.includes(user._id)) {
      throw new Error('Task is not assigned to this user');
    }

    task.status = 'completed';
    return task.save();
  }

  async attachImageToTask(taskId: string, imageUrl: string): Promise<Task> {
    const task: any = await this.taskModel.findById(taskId);
    if (!task) throw new Error('Task not found');

    task.imageUrl = imageUrl;
    return task.save();
  }
}















// import { Repository } from 'typeorm';

// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';

// import { Task } from '../entities/task.entity';
// import { User } from '../entities/user.entity';

// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
//     @InjectRepository(User) private readonly userRepo: Repository<User>,
//   ) {}

//   async createTask(description: string, imageUrl: string, videoLink: string) {
//     const task = this.taskRepo.create({ description, imageUrl, videoLink, status: 'not_assigned' });
//     return this.taskRepo.save(task);
//   }

//   async assignTask(taskId: string, userId: string) {
//     const task = await this.taskRepo.findOne({ where: { id: taskId }, relations: ['assignedTo'] });
//     const user = await this.userRepo.findOne({ where: { id: userId } });

//     if (task && user) {
//       task.assignedTo.push(user);
//       task.status = 'assigned';
//       return this.taskRepo.save(task);
//     }
//   }

//   async completeTask(taskId: string, userId: string) {
//     const task = await this.taskRepo.findOne({ where: { id: taskId }, relations: ['assignedTo'] });
//     const user = await this.userRepo.findOne({ where: { id: userId } });

//     if (task && user && task.assignedTo.find((u) => u.id === userId)) {
//       task.status = 'completed';
//       return this.taskRepo.save(task);
//     }
//   }

// async attachImageToTask(taskId: string, imageUrl: string) {
//   const task = await this.taskRepo.findOne({ where: { id: taskId } });
//   if (!task) throw new Error('Task not found');
//   task.imageUrl = imageUrl;
//   return this.taskRepo.save(task);
// }

// }
