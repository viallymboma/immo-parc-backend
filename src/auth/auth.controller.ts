/* eslint-disable prettier/prettier */
import {
  Request,
  Response,
} from 'express'; // Import from express
import { JwtAuthGuard } from 'src/utils/jwtAuthGuard';

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService, 
  ) {}

  @Post('login')
  async login(@Body() body: { phone: string; password: string }, @Res() res: Response) {
    const { phone, password } = body;
    const userInfo = await this.authService.validateUser(phone, password);
    const accessToken = await this.authService.login(userInfo)
    // Set the cookie with the token
    res.cookie('jwt', accessToken, {
      httpOnly: true, // Ensures the cookie is accessible only by the web server
      // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      // secure: true,
      // maxAge: 24 * 60 * 60 * 1000, // Set expiration for the cookie (1 day in ms)
      maxAge: 3600000, // Cookie expiration time (e.g., 1 hour)
      // sameSite: 'strict', // Restrict cookie usage to same site
    });

    
    console.log('====================================');
    console.log(userInfo, accessToken);
    console.log('====================================');
    // return accessToken;
    return res.status(200).json({ message: 'Login successful', info: {accessToken, userInfo} });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard) // Ensures the user is authenticated
  async getProfile(@Req() req: Request, @Res() res: Response) {
    // console.log(req, req.cookies.jwt, req.headers, "hhhhhhhhhhhh"); 
    const extractToken: string = req.cookies.jwt
    const userInfo: any = await this.jwtService.verify(extractToken, { secret: 'your_jwt_secret' });
    // console.log(userInfo, "hhhhhhuserInfohhhhhh"); 
    return res.status(200).json({ message: 'Login successful', userInfo }); // Return the user object set by the JWT strategy
  }

  @Get('verify-token')
  async verifyToken(@Headers('authorization') authHeader: string): Promise<{ valid: boolean; message: string; }> {
    // console.log(authHeader, "hhdgdgffs", authHeader[0]); 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1]; // Extract token from the "Bearer <token>" format
    // console.log(token, "Token extracted from header");

    try {
      const validTkn: any = await this.jwtService.verify(token, { secret: 'your_jwt_secret' });
      console.log(validTkn, "ooppuuttrree"); 
      return validTkn;
    } catch (error: any) {
      throw new UnauthorizedException('Invalid or expired token', error);
    }
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true, // Ensure the cookie cannot be accessed via JavaScript
      // sameSite: 'strict', // Adjust based on your needs
      // secure: true, // Use this if your app is served over HTTPS
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  }
}

























  // @Get('verify-token')
  // verifyToken(@Req() req: Request): { valid: boolean; message: string } {
  //   console.log(req.headers, "hhdgdgffs"); 
  //   const token = req.cookies['jwt']; // Retrieve token from cookies
  //   console.log(token, "hhdgdgffs")
  //   if (!token) {
  //     throw new UnauthorizedException('No token provided');
  //   }

  //   try {
  //     this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
  //     return { valid: true, message: 'Token is valid' };
  //   } catch (error: any) {
  //     throw new UnauthorizedException('Invalid or expired token', error);
  //   }
  // }