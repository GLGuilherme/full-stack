import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCpfCommand } from '../commands/create.command';
import { CpfRestrictedList } from '../entities/cpf-restricted-list.entity';
import { CpfRestrictedListRepository } from '../repositories/cpf-restricted-list.repository';

@CommandHandler(CreateCpfCommand)
export class CreateCpfCommandHandler
  implements ICommandHandler<CreateCpfCommand>
{
  constructor(
    private readonly cpfRestrictedListRepository: CpfRestrictedListRepository,
  ) {}

  async execute(command: CreateCpfCommand): Promise<CpfRestrictedList> {
    const { payload } = command;

    const cpf = await this.cpfRestrictedListRepository.save(
      new CpfRestrictedList({
        cpf: payload.cpf,
      }),
    );

    return cpf;
  }
}
