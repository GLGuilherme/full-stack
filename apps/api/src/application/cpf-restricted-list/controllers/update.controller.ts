import { Body, Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateCpfCommand } from '../commands/update.command';
import { UpdateCpfDto } from '../dtos/updateCpf.dto';

@Controller('cpf/:id')
export class UpdateCpfController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put()
  async handle(@Param('id') id: string, @Body() updateCpfDto: UpdateCpfDto) {
    return await this.commandBus.execute(
      new UpdateCpfCommand({
        id,
        cpf: updateCpfDto.cpf,
      }),
    );
  }
}
