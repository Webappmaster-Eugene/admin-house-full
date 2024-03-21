import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SigninParams, SignupParams } from './types/auth.types';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async signup(
    { email, password, phone, name }: SignupParams,
    userType: UserType,
  ) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prismaService.user.create({
      data: {
        email,
        phone,
        name,
        password: hashedPassword,
        user_type: userType,
      },
    });

    const token = await this.generateJWT(user.name, user.id);

    return token;
  }

  async signin({ email, password }: SigninParams) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    const token = await this.generateJWT(user.name, user.id);

    return token;
  }

  async generateJWT(name: string, id: number) {
    const token = jwt.sign(
      {
        name,
        id,
      },
      this.configService.get('JWT_KEY'),
      {
        expiresIn: 86400,
      },
    );
    return token;
  }

  async generateProductKey(email: string, userType: UserType) {
    const str = `${email}-${userType}-${this.configService.get('PRODUCT_KEY_SECRET')}`;
    return bcrypt.hash(str, 10);
  }
}
