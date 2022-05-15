import { Controller, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteCpfCommand } from '../commands/delete.command';

@Controller('cpf/:cpf')
export class DeleteCpfController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete()
  async handle(@Param('cpf') cpf: string) {
    return await this.commandBus.execute(new DeleteCpfCommand({ cpf }));
  }
}
