/* eslint-disable prettier/prettier */
import {
  Packages,
  PackagesSchema,
} from 'src/entities/package.entity';

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PackageController } from './packages.controller';
import { PackageService } from './packages.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Packages.name, schema: PackagesSchema }]),
    ],
    controllers: [PackageController], 
    providers: [PackageService],
    exports: [PackageService, MongooseModule],
})
export class PackageModule {}
