import { Get, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  @Get()
  getHello(): string {
    return `Hello World!`;
  }
}
