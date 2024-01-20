// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const { id: sub, ...userData } = user;
    const payload = { sub, ...userData };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data): Promise<void> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { username: data.username },
    });

    if (existingUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'A user with this username already exists',
        },
        HttpStatus.CONFLICT
      );
    }

    const newUser = await this.prismaService.user.create({
      data: {
        username: data.username,
        password: data.password,
        email: data.email,
        title: 'Watcher',
        favouriteGenre: '',
      },
    });

    await this.prismaService.list.create({
      data: {
        name: 'Currently watching',
        userId: newUser.id,
      },
    });
  }

  async hello(): Promise<any> {
    return 'Hello! You are authenticated!';
  }
}
