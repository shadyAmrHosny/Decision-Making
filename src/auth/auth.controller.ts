import { Controller, Body, Post, UseGuards, Session, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decrator';
import { Public } from '../decorators/public.decorator';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @GetUser() user: User, @Session() session: any) {
    //session.jwt = await this.authService.login(user);
    const token= await this.authService.login(user);
    session.jwt=token;
    console.log(session.jwt)
    //return user
     return {...user,token}
  }
  @Get('me')
  //@UseGuards(JwtAuthGuard)
  status(@GetUser() user:User){
    return user;
  }

  @Public()
  @Post('logout')
  logOut(@Session() session: any){
    session.jwt=null;
    console.log(session.jwt);
  }
}
