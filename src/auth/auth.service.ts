import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { PayloadDto } from './dtos/payload.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string){
    const user= await this.usersService.find(email);

    if (user && (await compare(password,user.password))) {
      delete user.password;
      return user;
    }
    return null;
    // passport will take care of attaching a user object and populate it with the user data itself on the req
    // return{access_token: await this.jwtService.sign({id:user.id, email:user.email})}
  }

  async login(user: User){
    const { id, email}= user;
    const tokenPayload: PayloadDto = {
      id,
      email
    }

    const token = this.jwtService.sign(tokenPayload)

    return token;
  }

  async validateUserToken(payload: PayloadDto){
    const {id} = payload;
    const checkUser =await this.usersService.findOne(id);
    if (!checkUser){ throw new UnauthorizedException('invalid user')}

    delete  checkUser.password;

    return checkUser;

  }


}
