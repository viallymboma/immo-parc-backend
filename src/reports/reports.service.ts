// import { Repository } from 'typeorm';

// import { UsersService } from 'src/users/users.service';
import { Model } from 'mongoose';

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// import { InjectRepository } from '@nestjs/typeorm';
import {
  Users,
  UsersDocument,
} from '../entities/user.entity';

@Injectable()
export class ReportsService {
  // constructor(
  //   @InjectRepository(Users) 
  //   // private readonly userRepo: Repository<User>,
  //   private readonly usersService: UsersService
  // ) {}

  constructor(@InjectModel(Users.name) private readonly userModel: Model<UsersDocument>) {}

  async getUserReport(userId: string) {
    const user = await this.userModel.findById(userId)

    const funding = user.funds;
    const withdrawals = 0; // Replace with actual withdrawal logic.
    // const earnings = user.earnings;

    return { funding, withdrawals, 
      // earnings 
    };
  }
}

