import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCpfCommand } from '../commands/delete.command';
import { CpfRestrictedListRepository } from '../repositories/cpf-restricted-list.repository';

@CommandHandler(DeleteCpfCommand)
export class DeleteCpfCommandHandler
  implements ICommandHandler<DeleteCpfCommand>
{
  constructor(
    private readonly cpfRestrictedListRepository: CpfRestrictedListRepository,
  ) {}

  async execute(command: DeleteCpfCommand): Promise<boolean> {
    const { payload } = command;
    const { cpf } = payload;

    const findCpf = await this.cpfRestrictedListRepository.findOne({
      where: { cpf },
    });

    if (!findCpf) {
      throw new NotFoundException('cpf not found');
    }

    return await this.cpfRestrictedListRepository
      .delete({ id: findCpf.id })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
