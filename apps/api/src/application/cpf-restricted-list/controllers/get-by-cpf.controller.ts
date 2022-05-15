import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetByCpfQuery } from '../queries/get-by-cpf.query';

@Controller('cpf/:cpf')
export class GetByCpfController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async handle(@Param('cpf') cpf: string) {
    return await this.queryBus.execute(new GetByCpfQuery({ cpf }));
  }
}
