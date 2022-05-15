import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetQuery } from '../queries/get.query';

@Controller('cpf')
export class GetController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async handle(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('perPage', new DefaultValuePipe(25)) perPage: number,
  ) {
    return await this.queryBus.execute(new GetQuery({ page, perPage }));
  }
}
