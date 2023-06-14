import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  // We can also use the @Req() req: Request (imported from express's request type)
  // signin(@Req() body: Request)
  // but it's a best practice to use the @Body as its easy to work with different frameworks
  // @Body is framework agnostic

  // We can also use Pipes to validate the data types as,
  // signin(@Body('email') email: string, @Body('password', ParseIntPipe) password: string)
  // ParseIntPipe will check for numbers in the password, but we can do that check in AuthDto
  // using class-validator package
  signup(@Body() body: AuthDto) {
    return this.authService.signup(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() body: AuthDto) {
    return this.authService.signin(body);
  }
}
