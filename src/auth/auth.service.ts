/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

// import { Model } from 'mongoose';
// import { UsersDocument } from 'src/entities/user.entity';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel('Users') private userModel: Model<UsersDocument>, 
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(phone: string, password: string) {
    const user = await this.usersService.findByPhone(phone);
    // const user = await this.userModel.findOne({ phone }).populate('package');
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // async findByPhone(phone: string): Promise<UsersDocument | null> {
  //   return this.userModel.findOne({ phone }).populate('package').exec();
  // }

  async login(user: any) {
    // const payload = { email: user.email, sub: user._id.toString() };
    const payload = {
      // ...user, 
      children: user?.children, 
      funds: user?.funds,
      accountType: user?.accountType,
      role: user?.role,
      status: user?.status,
      firstName: user?.firstName, 
      lastName: user?.lastName, 
      _id: user?._id.toString(),
      sub: user._id.toString(), 
      email: user?.email,
      parent: user?.parent || [], 
      phone: user?.phone, 
      package: user?.package,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    }
    // console.log(payload, "no be easy ooo", user)
    return this.jwtService.sign(payload);
  }
}
