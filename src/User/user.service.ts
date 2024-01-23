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
import { hashPassword } from 'utils/bcrypt';

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

    const hashedPassword = await hashPassword(data.newPassword);

    await this.prismaService.user.update({
      where: { id: payload.sub },
      data: { password: hashedPassword },
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

    const updateData: PersonalData = {};
    if (data?.username) {
      updateData.username = data.username;
    }
    if (data?.email) {
      updateData.email = data.email;
    }

    await this.prismaService.user.update({
      where: { id: payload.sub },
      data: updateData,
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

    const updateData: AdditionalData = {};
    if (data?.title) {
      updateData.title = data.title;
    }
    if (data?.favouriteGenre) {
      updateData.favouriteGenre = data.favouriteGenre;
    }

    await this.prismaService.user.update({
      where: { id: payload.sub },
      data: updateData,
    });
  }

  async getUserLists(request: Request): Promise<any> {
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

    const lists = await this.prismaService.list.findMany({
      where: { userId: payload.sub },
      select: {
        id: true,
        name: true,
        positions: {
          select: {
            positionId: true,
            title: true,
            image: true,
          },
        },
      },
    });

    return { lists };
  }

  async getUserPersonalData(request: Request): Promise<any> {
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

    const personalData = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
      select: {
        username: true,
        title: true,
      },
    });

    return { personalData };
  }
}
