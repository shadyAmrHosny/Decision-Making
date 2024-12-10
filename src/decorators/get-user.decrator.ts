import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/user.entity';

export const GetUser = createParamDecorator(
  (data: any, context: ExecutionContext) : User=> {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
