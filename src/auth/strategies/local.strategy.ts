import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException , Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

  constructor(private authService: AuthService) {
    super({usernameField: 'email'});
  }
  async validate(email: string, password: string) {
   const user=await this.authService.validateUser(email, password);
   console.log('inside local strategy');
   if(!user){
     throw new UnauthorizedException('invalid credentials')
   }

   return user;

  }
}