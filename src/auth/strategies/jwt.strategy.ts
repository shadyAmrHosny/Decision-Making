import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PayloadDto } from '../dtos/payload.dto';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private authService: AuthService, private configService: ConfigService) {
    super({

      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) =>{
        return req.session?.jwt || null;
      },
        ExtractJwt.fromAuthHeaderAsBearerToken()
        ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: PayloadDto){
    console.log('inside jwt strategy');
    console.log(payload);
    return await this.authService.validateUserToken(payload);
  }
}