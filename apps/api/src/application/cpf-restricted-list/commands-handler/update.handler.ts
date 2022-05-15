import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCpfCommand } from '../commands/update.command';
import { CpfRestrictedList } from '../entities/cpf-restricted-list.entity';
import { CpfRestrictedListRepository } from '../repositories/cpf-restricted-list.repository';

@CommandHandler(UpdateCpfCommand)
export class UpdateCpfCommandHandler
  implements ICommandHandler<UpdateCpfCommand>
{
  constructor(
    private readonly cpfRestrictedListRepository: CpfRestrictedListRepository,
  ) {}

  async execute(command: UpdateCpfCommand): Promise<CpfRestrictedList> {
    const { payload } = command;

    const { id, cpf } = payload;

    const findCpf = await this.cpfRestrictedListRepository.findOne({
      where: { id },
    });

    if (!findCpf) {
      throw new NotFoundException('cpf not found');
    }

    findCpf.cpf = cpf;

    await this.cpfRestrictedListRepository.save(findCpf);

    return findCpf;
  }
}
