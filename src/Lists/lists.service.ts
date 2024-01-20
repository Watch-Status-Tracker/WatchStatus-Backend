// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListsService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async createList(request: Request, data: any): Promise<any> {
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

    const list = await this.prismaService.list.create({
      data: {
        name: data.name,
        // positions: { create: data.positions },
        userId: payload.sub,
      },
    });

    return list;
  }

  async getLists(request: Request): Promise<any> {
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
    });

    return lists;
  }

  async updateList(request: Request, data: any): Promise<any> {
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

    await this.prismaService.list.update({
      where: { id: data.id },
      data: {
        name: data.name,
      },
    });
  }

  async addPositionToList(request: Request, data: any): Promise<any> {
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

    const list = await this.prismaService.list.findUnique({
      where: { id: data.listId },
    });

    if (!list) {
      throw new Error('List not found');
    }

    const position = await this.prismaService.position.create({
      data: {
        positionId: data.positionId,
        image: data.image,
        title: data.title,
        list: {
          connect: { id: data.listId },
        },
      },
    });

    return position;
  }
}
