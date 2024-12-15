/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(phone: string, password: string) {
    const user = await this.usersService.findByPhone(phone);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = {
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
    return this.jwtService.sign(payload);
  }
}
