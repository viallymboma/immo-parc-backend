import { Model } from 'mongoose';
import { CreatePackageDto } from 'src/dto/create-packages.dto';
import { Packages } from 'src/entities/package.entity';

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PackageService {
  constructor(@InjectModel(Packages.name) private readonly packageModel: Model<CreatePackageDto>) {}

  async createPackage(data: CreatePackageDto): Promise<CreatePackageDto> {
    console.log(data, "creating a package in in service")
    const pkg = new this.packageModel(data);
    return pkg.save();
  }

  async findAllPackages(): Promise<Packages[]> {
    return await  this.packageModel.find().exec();
  }

  async updatePackage(packageId: string, data: Partial<Packages>): Promise<Packages> {
    return await this.packageModel.findByIdAndUpdate(packageId, data, { new: true }).exec();
  }

  async deletePackage(packageId: string): Promise<void> {
    await this.packageModel.findByIdAndDelete(packageId).exec();
  }

  async findPackageById(packageId: string): Promise<Packages | null> {
    return await this.packageModel.findById(packageId).exec();
  }
}
