import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

// Custom decorator to read user from @Req() decorator
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // Request can be of type Express Request (Express.Request)
    // because we are using Express by default, can be changed based
    // on the library we use
    const request: Request = ctx.switchToHttp().getRequest();

    if (data) return request.user[data]

    return request.user;
  },
);
