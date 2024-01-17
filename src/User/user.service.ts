// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  AdditionalData,
  PasswordData,
  PersonalData,
} from 'src/User/user.types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async changePassword(request: Request, data: PasswordData): Promise<any> {
    const token = this.extractTokenFromHeader(request);
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException();
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await this.prismaService.user.update({
      where: { id: payload.sub },
      data: { password: data?.newPassword },
    });
  }

  async changePersonalData(request: Request, data: PersonalData): Promise<any> {
    const token = this.extractTokenFromHeader(request);
    let payload: any;

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException();
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await this.prismaService.user.update({
      where: { id: payload.sub },
      data: { username: data?.username, email: data?.email },
    });
  }

  async changeAdditionalData(
    request: Request,
    data: AdditionalData
  ): Promise<any> {
    const token = this.extractTokenFromHeader(request);
    let payload: any;

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException();
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await this.prismaService.user.update({
      where: { id: payload.sub },
      data: { title: data?.title, favouriteGenre: data?.favouriteGenre },
    });
  }
}
