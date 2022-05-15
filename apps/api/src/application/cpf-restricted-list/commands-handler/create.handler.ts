import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cpfValidation } from '../../../../src/utils/cpfValidation';
import { CreateCpfCommand } from '../commands/create.command';
import { CpfRestrictedList } from '../entities/cpf-restricted-list.entity';
import { ExistsCpfException } from '../exceptions/exists-cpf.exception';
import { CpfRestrictedListRepository } from '../repositories/cpf-restricted-list.repository';

@CommandHandler(CreateCpfCommand)
export class CreateCpfCommandHandler
  implements ICommandHandler<CreateCpfCommand>
{
  constructor(
    private readonly cpfRestrictedListRepository: CpfRestrictedListRepository,
  ) {}

  async execute(
    command: CreateCpfCommand,
  ): Promise<{ cpf: CpfRestrictedList['cpf'] }> {
    const { payload } = command;

    cpfValidation(payload.cpf);

    const findCpf = await this.cpfRestrictedListRepository.findOne({
      where: {
        cpf: payload.cpf,
      },
    });

    if (findCpf) {
      throw new ExistsCpfException();
    }

    const createdCpf = await this.cpfRestrictedListRepository.save(
      new CpfRestrictedList({
        cpf: payload.cpf,
      }),
    );

    return {
      cpf: createdCpf.cpf,
    };
  }
}
