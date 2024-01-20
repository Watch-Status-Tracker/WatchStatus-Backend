import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from 'src/User/user.service';
import { AdditionalData, PasswordData } from 'src/User/user.types';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/change-password')
  async updatePassword(
    @Body() data: PasswordData,
    @Req() req,
    @Res() response
  ) {
    await this.userService.changePassword(req, data);
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

  @HttpCode(HttpStatus.OK)
  @Get('/get-user-lists')
  async getUserLists(@Req() req, @Res() response) {
    const { lists } = await this.userService.getUserLists(req);

    response.status(200).send(lists);
  }

  // get user personal informations
  @HttpCode(HttpStatus.OK)
  @Get('/get-user-personal-data')
  async getUserPersonalData(@Req() req, @Res() response) {
    const { personalData } = await this.userService.getUserPersonalData(req);

    response.status(200).send(personalData);
  }
}
