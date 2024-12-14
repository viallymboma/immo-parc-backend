import * as bcrypt from 'bcrypt';
/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Packages } from 'src/entities/package.entity';
import {
  Users,
  UsersDocument,
} from 'src/entities/user.entity';
import { INITIAL_SELECTED_TASKCOUNT } from 'src/utils/constants';

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    @InjectModel(Packages.name) private readonly packageModel: Model<any>
  ) {}
  // constructor(@InjectModel(Users.name) private readonly userModel: Model<UsersDocument>) {}


  async createUser(phone: string, password: string, packageId?: string, parentId?: string, email?: string, firstName?: string, lastName?: string): Promise<Users> {
    // const parent: any = parentId ? await this.userModel.findById(parentId) : null; 
    const parent: any = parentId ? await this.findByPhone(parentId) : null; 

    // await this.findByPhone(phone)

    // const pkg = packageId ? await this.packageModel.findById(packageId) : null;

    if (!parent) throw new Error('Parent not found');

    // Find the package, either by ID or select the smallest package by level
    let pkg = null;
    if (packageId) {
      pkg = await this.packageModel.findById(packageId);
      if (!pkg) throw new Error('Package not found');
    } else {
      pkg = await this.packageModel.findOne().sort({ level: 1 }); // Find the package with the smallest level
      if (!pkg) throw new Error('No packages available');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(parent, "the parent: 000000000000")

    const user = new this.userModel({
      username: `user_${Date.now()}`,
      email, 
      phone, 
      password: hashedPassword,
      status: 'active',
      accountType: 'internship', 
      firstName, 
      lastName, 
      selectedTasksCount: INITIAL_SELECTED_TASKCOUNT, 
      parent: parent ? parent._id.toString() : null,
      package: pkg ? pkg._id : null,
      internshipExpiry: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      children: []
    });

    console.log(user, "display that user....")

    await user.save();

    if (parent) {
      parent.children.push(user._id);
      await parent.save();
    }

    return user;
  }

  async createSuperAdmin(phone: string, password: string, email?: string,): Promise<Users> {
    console.log(phone, password, email, "in the service")
    const existingAdmin = await this.userModel.findOne({ role: 'super_admin' });
    if (existingAdmin) throw new Error('Super admin already exists');

    // Fetch all packages and find the highest level
    const packages = await this.packageModel.find().sort({ level: -1 }).exec();
    if (!packages || packages.length === 0) throw new Error('No packages found');
    const highestPackage = packages[0]; // The package with the highest level

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const superAdmin = new this.userModel({
      email,
      password: hashedPassword,
      phone,
      status: 'active',
      accountType: 'regular', 
      role: 'super_admin',
      parentId: null, // No parent for super admin
      children: [],
      package: highestPackage._id, // Assign the highest package
    });
    return superAdmin.save();
  }

  async updateStatus(userId: string, status: 'internship' | 'regular'): Promise<Users> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');
    user.accountType = status;
    return await user.save();
  }

  async assignPackageToUser(userId: string, packageId: string): Promise<Users> {
    const user = await this.userModel.findById(userId); 
    const pkg = await this.packageModel.findById(packageId); 
    if (!user) throw new Error('User not found'); 
    if (!pkg) throw new Error('Package not found'); 
    user.package = pkg._id;
    return user.save();
  }

  async findAllUsers(): Promise<Users | null> {
    const result: any = await this.userModel.find(); 
    console.log(result, "hello result"); 
    return result;
  }

  async findUserChildren(user: any): Promise<Users | null> {
    const result: any = await this.userModel.find({ _id: { $in: user?.children } }).exec();
    console.log(result, "hello result"); 
    return result;
  }

  async findByEmail(email: string): Promise<UsersDocument | null> {
    return this.userModel.findOne({ email }); 
  }

  async findByPhone(phone: string): Promise<UsersDocument | null> {
    return this.userModel.findOne({ phone })
      .populate('package')
      .populate('children').populate('parent').exec(); 
    // .populate('package')
    // .populate('parent', 'username email') // Populate parent details
    // .populate('children', 'username email') // Populate children details
    // .populate('package', 'name price') // Populate package details
    // .exec(); // Execute the query and return a promise; 
  }

  async findUserById(userId: string): Promise<Users | null> {
    return this.userModel.findById(userId);
  }

  async findUserByIdForReport(userId: string): Promise<Users | null> {
    return this.userModel
      .findById(userId)
      .populate('children')
      .populate('tasks');
  }

  async getDownline(userId: string): Promise<Users[] | null> {
    const user: any = await this.userModel
      .findById(userId)
      .populate('children', 'email accountType funds'); // Adjust fields as necessary

    return user?.children || null;
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userModel.findByIdAndDelete(userId).exec();
  }
}

