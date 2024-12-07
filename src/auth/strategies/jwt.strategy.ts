import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants';
import { Injectable } from '@nestjs/common';
import { PayloadDto } from '../dtos/payload.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private authService: AuthService) {
    super({
      jwtFromRequest: (req: Request) =>{
        return req.session?.jwt || null;
      },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: PayloadDto){
    console.log('inside jwt strategy');
    console.log(payload);
    return await this.authService.validateUserToken(payload);
  }
}