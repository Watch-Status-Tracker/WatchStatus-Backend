import { Controller, Get } from '@nestjs/common';
import { hashPassword } from 'utils/bcrypt';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(): Promise<any> {
    const a = await hashPassword('numer');
    const b = await hashPassword('kira');
    const c = await hashPassword('lajt');
    const d = await hashPassword('tester');
    // return 'Hello World!';
    return { numer: a, kira: b, lajt: c, tester: d };
  }
}
