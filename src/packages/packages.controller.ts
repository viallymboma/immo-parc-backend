import { CreatePackageDto } from 'src/dto/create-packages.dto';
import { UpdatePackageDto } from 'src/dto/update-packages.dto';
import { Packages } from 'src/entities/package.entity';

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { PackageService } from './packages.service';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post('/create-package')
  async create(@Body() data: CreatePackageDto): Promise<CreatePackageDto> {
    console.log(data, "creating a package in controller")
    return this.packageService.createPackage(data);
  }

  @Get()
  async findAll(): Promise<Packages[]> {
    return this.packageService.findAllPackages();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Packages> {
    return this.packageService.findPackageById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePackageDto): Promise<UpdatePackageDto> {
    return this.packageService.updatePackage(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.packageService.deletePackage(id);
  }
}
