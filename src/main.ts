/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable prettier/prettier */

import {
  RequestListener,
} from 'http'; // Import the type for callable HTTP request handlers

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 5000; // Default port for local development
let server: RequestListener | null = null; // Use the correct type for an HTTP request handler

// Function to initialize the app
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://immo-parc-frontend.vercel.app'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  app.use(require('body-parser').json());
  app.use(require('cookie-parser')());

  // Listen on a port when running locally
  if (!process.env.IS_SERVERLESS) {
    await app.listen(PORT);
    console.log(`Application is running on: http://localhost:${PORT}`);
  }

  await app.init();
  return app.getHttpAdapter().getInstance() as RequestListener;
}

// For local development, call bootstrap directly
if (!process.env.IS_SERVERLESS) {
  bootstrap();
}

// Export the handler for Vercel or other serverless environments
export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res); // Invoke the server with incoming request and response
}







// import { RequestListener } from 'http';

// // import * as bodyParser from 'body-parser';
// // import * as cookieParser from 'cookie-parser';
// import { ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';

// import { AppModule } from './app.module';

// let server: RequestListener;

// export async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.useGlobalPipes(new ValidationPipe());
//   app.enableCors({
//     origin: ['http://localhost:3000', 'https://immo-parc-frontend.vercel.app'],
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//     credentials: true,
//   });

//   app.use(require('body-parser').json());
//   app.use(require('cookie-parser')());

//   await app.init();
//   return app.getHttpAdapter().getInstance();
// }

// // Export the handler expected by Vercel
// export default async function handler(req: any, res: any) {
//   if (!server) {
//     const appInstance = await bootstrap();
//     server = appInstance; // Ensure compatibility with serverless function
//   }
//   return server(req, res); // Correctly delegate request/response handling
// }


















// import { ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { Server } from 'http';
// import { AppModule } from './app.module';

// let server: Server;

// export async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe());

//   // Enable CORS for all origins
//   app.enableCors({
//     origin: ['http://localhost:3000', 'https://immo-parc-frontend.vercel.app'],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });

//   app.use(require('body-parser').json());
//   app.use(require('cookie-parser')());

//   await app.init();
//   return app.getHttpAdapter().getInstance();
// }

// export default async function handler(req, res) {
//   if (!server) {
//     const app = await bootstrap();
//     server = app;
//   }
//   server(req, res);
// }








// import * as bodyParser from 'body-parser';
// import * as cookieParser from 'cookie-parser';

// import { ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';

// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe());

//   // Enable CORS for all origins
//   app.enableCors({
//     // origin: '*', // Allow requests from any origin
//     origin: ['http://localhost:3000', 'https://immo-parc-frontend.vercel.app', '*'], // Allow the frontend origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
//     credentials: true, // Allow credentials (e.g., cookies, authorization headers)
//   });
//   // await app.listen(PORT);
//   app.use(bodyParser.json()); // Ensure JSON parsing
//   // Use cookie-parser middleware to parse cookies in requests
//   app.use(cookieParser());
//   const PORT = 5000;
//   console.log(`Application is running on: http://localhost:${PORT}`);
//   await app.listen(process.env.PORT ?? PORT);
// }
// bootstrap();
