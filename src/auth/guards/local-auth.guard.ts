import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
  canActivate(context: ExecutionContext){
    console.log('inside local guard');
    return super.canActivate(context)
  }
}