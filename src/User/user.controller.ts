import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from 'src/User/user.service';
import { AdditionalData } from 'src/User/user.types';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/change-password')
  async updatePassword(@Body() data, @Req() req, @Res() response) {
    await this.userService.changePassword(req, data?.newPassword);
    response.status(200).send({
      status: HttpStatus.OK,
      message: 'Password updated successfully',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/change-personal-data')
  async updatePersonalData(@Body() data, @Req() req, @Res() response) {
    await this.userService.changePersonalData(req, data);
    response.status(200).send({
      status: HttpStatus.OK,
      message: 'Personal data updated successfully',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/change-additional-data')
  async updateAdditionalData(
    @Body() data: AdditionalData,
    @Req() req,
    @Res() response
  ) {
    await this.userService.changeAdditionalData(req, data);
    response.status(200).send({
      status: HttpStatus.OK,
      message: 'Additional data updated successfully',
    });
  }
}
