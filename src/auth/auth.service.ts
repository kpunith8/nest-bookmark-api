import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(body: AuthDto) {
    // generate the password
    const password = await argon.hash(body.password);
    // save the user in the db
    try {
      const user = await this.prisma.user.create({
        data: { email: body.email, password },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }

      throw error;
    }
  }

  async signin(body: AuthDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    // If no user exist throw an error
    if (!user) throw new ForbiddenException("Credentials doesn't exist");

    // Compare password
    const isValidPassword = await argon.verify(user.password, body.password);

    // Not a valid password throw an error
    if (!isValidPassword) throw new ForbiddenException('Incorrect password!');

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };

    const secret = this.config.get('JWT_SECRET');
    const jwtToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: jwtToken,
    };
  }
}
