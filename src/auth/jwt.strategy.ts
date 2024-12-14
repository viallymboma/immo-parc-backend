/* eslint-disable prettier/prettier */
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
                // Extract JWT from the cookie
                return req?.cookies?.jwt;
            }]),
            ignoreExpiration: false,
            secretOrKey: 'your_jwt_secret', // Replace with a secure secret
            // secretOrKey: process.env.JWT_SECRET, // Replace with a secure secret
        });
    }

    async validate(payload: any) {
        // console.log("in the jwt strategy what is the payload", payload)
        return payload;
        // return { userId: payload.sub, username: payload.username };
    }
}