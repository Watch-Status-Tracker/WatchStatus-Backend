import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/Auth/auth.guard';
import { AuthService } from 'src/Auth/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() credentials: Pick<User, 'username' | 'password'>) {
    console.log('Login endpoint reached');
    console.log('port: ', process.env.PORT);
    const { access_token } = await this.authService.signIn(
      credentials.username,
      credentials.password
    );
    return { access_token };
  }

  @Post('/register')
  @HttpCode(201)
  async createUser(
    @Body()
    user,
    @Res() response
  ): Promise<void> {
    await this.authService.signUp(user);
    response.status(201).send({
      status: response.statusCode,
      message: 'User added successfully',
    });
  }

  @UseGuards(AuthGuard)
  @Get('/test')
  async getHello(): Promise<any> {
    return await this.authService.hello();
  }
}
