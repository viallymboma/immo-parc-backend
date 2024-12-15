/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

import {
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PackageModule } from './packages/packages.module';
import { ReportsModule } from './reports/reports.module';
import { TaskAssignmentModule } from './task-assignment/task-assignment.module';
import { TasksModule } from './tasks/tasks.module';
import { TransactionModule } from './transactions/transaction.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ReportsModule, UsersModule, TasksModule, AuthModule, AdminModule, TransactionModule,
		PackageModule, 
		MongooseModule.forRoot(
			// process.env.DATABASE_URL
			// 'mongodb+srv://mbomadesir:gt1xQPboLPYGv4cs@immoparc.jigjs.mongodb.net/immo_parc_db'
			'mongodb://localhost:27017/immo_parc_db'
		), 
		ConfigModule.forRoot({
			isGlobal: true, // Makes the config accessible across all modules
		}), TaskAssignmentModule,
	],
	controllers: [AppController], 
	providers: [AppService],
})
export class AppModule implements OnModuleInit {

	async onModuleInit() {
		this.setupMongooseConnectionEvents();
	}

	private setupMongooseConnectionEvents() {
		const connection = mongoose.connection;
		connection.on('connected', () => {
			console.log('Mongoose connected to Swivy DB');
		});
		connection.on('error', (err) => {
			console.log('Mongoose connection error:', err);
		});
		connection.on('disconnected', () => {
			console.log('Mongoose disconnected from Swivy DB');
		});
		console.log('Immo-parc Annexe DB connected successfully');
	}
}




























// TypeOrmModule.forRoot({
		// 	type: 'mongodb',
		// 	// host: 'localhost',
		// 	host: 'immoparc.jigjs.mongodb.net', 
		// 	port: 27017,
		// 	username: 'mbomadesir',
		// 	password: 'gt1xQPboLPYGv4cs',
		// 	database: 'immo_parc_db',
		// 	entities: [User, Task],
		// 	synchronize: true,
		// 	// type: 'postgres',
		// 	// host: process.env.DB_HOST,
		// 	// port: +process.env.DB_PORT,
		// 	// username: process.env.DB_USER,
		// 	// password: process.env.DB_PASSWORD,
		// 	// database: process.env.DB_NAME,
		// 	// // entities: ['dist/models/*.js'],
		// 	// entities: [User, Task],
		// 	// synchronize: process.env.NODE_ENV !== ('production' || 'staging') ? true : false,
		// 	autoLoadEntities: true
		// 	// 'mongodb+srv://mbomadesir:gt1xQPboLPYGv4cs@immoparc.jigjs.mongodb.net/'
		// }),