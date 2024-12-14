import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from 'src/utils/jwtAuthGuard';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
// import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      // secret: process.env.JWT_SECRET, // Replace with a secure secret
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtModule, JwtAuthGuard], // Export JwtModule for other modules
})
export class AuthModule {}
