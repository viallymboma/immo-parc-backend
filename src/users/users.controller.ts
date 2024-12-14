/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { UsersService } from './users.service';

// import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/get-all-users")
  // @Roles('super_admin') // Only super admin can access this
  async getAllUsers() {
    console.log("hellooooooo")
    return await this.usersService.findAllUsers(); 
  }

  @Post("/create-regular-user")
  createUser(@Body() body: { phone: string; password: string; packageId?: string, parentId?: string, email?: string, firstName?: string, lastName?: string }) {
    return this.usersService.createUser(body.phone, body.password, body.packageId, body.parentId, body.email, body.firstName, body.lastName); 
  }

  @Post("/create-super-admin")
  createSuperAdmin(@Body() body: { phone: string; password: string; email?: string }) {
    console.log(body, body.phone, body.password, body.email, "in controller")
    return this.usersService.createSuperAdmin(body.phone, body.password, body.email);
  }

  // createUser(@Body() body: CreateUserDto) {
  //   return this.usersService.createUser(body.email, body.password, body.parentId);
  // }

  @Post(':id/status')
  updateStatus(@Param('id') userId: string, @Body() body: { status: 'internship' | 'regular' }) {
    return this.usersService.updateStatus(userId, body.status);
  } 

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
} 
