import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cpfValidation } from '../../../../src/utils/cpfValidation';
import { DeleteCpfCommand } from '../commands/delete.command';
import { NotFoundCpfException } from '../exceptions/not-found-cpf.exception';
import { CpfRestrictedListRepository } from '../repositories/cpf-restricted-list.repository';

@CommandHandler(DeleteCpfCommand)
export class DeleteCpfCommandHandler
  implements ICommandHandler<DeleteCpfCommand>
{
  constructor(
    private readonly cpfRestrictedListRepository: CpfRestrictedListRepository,
  ) {}

  async execute(command: DeleteCpfCommand): Promise<any> {
    const { payload } = command;
    const { cpf } = payload;

    cpfValidation(cpf);

    const findCpf = await this.cpfRestrictedListRepository.findOne({
      where: { cpf },
    });

    if (!findCpf) {
      throw new NotFoundCpfException();
    }

    await this.cpfRestrictedListRepository.delete({ id: findCpf.id });

    return {};
  }
}
