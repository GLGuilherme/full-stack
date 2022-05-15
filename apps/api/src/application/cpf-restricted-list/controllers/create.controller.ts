import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCpfCommand } from '../commands/create.command';
import { CreateCpfDto } from '../dtos/createCpf.dto';

@Controller('cpf')
export class CreateCpfController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async handle(@Body() createCpfDto: CreateCpfDto) {
    return await this.commandBus.execute(
      new CreateCpfCommand({ ...createCpfDto }),
    );
  }
}
