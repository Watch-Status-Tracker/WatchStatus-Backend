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
import { ListsService } from 'src/Lists/lists.service';

@Controller()
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/get-user-lists')
  async getLists(@Req() req, @Res() response) {
    const a = await this.listsService.getLists(req);
    response.status(200).send(a);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/create-list')
  async createList(@Body() data, @Req() req, @Res() response) {
    const { list } = await this.listsService.createList(req, data);
    response.status(200).send(list);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/update-list')
  async updateList(@Body() data, @Req() req, @Res() response) {
    await this.listsService.updateList(req, data);
    response.status(200).send({
      status: HttpStatus.OK,
      message: `List [${data.id}] data updated successfully`,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/update-list-positions')
  async updateListPositions(@Body() data, @Req() req, @Res() response) {
    await this.listsService.addPositionToList(req, data);
    response.status(200).send({
      status: HttpStatus.OK,
      message: `List [${data.listId}] positions updated successfully`,
    });
  }
}
