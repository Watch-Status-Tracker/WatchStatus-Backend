import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/Auth/auth.controller';
import { AuthService } from 'src/Auth/auth.service';
import { ListsController } from 'src/Lists/lists.controller';
import { ListsService } from 'src/Lists/lists.service';
import { UserController } from 'src/User/user.controller';
import { UserService } from 'src/User/user.service';
import { PrismaService } from 'src/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AppController, AuthController, UserController, ListsController],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    UserService,
    ListsService,
  ],
})
export class AppModule {}
