import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cpfValidation } from 'src/utils/cpfValidation';
import { CpfRestrictedList } from '../entities/cpf-restricted-list.entity';
import { NotFoundCpfException } from '../exceptions/not-found-cpf.exception';
import { GetByCpfQuery } from '../queries/get-by-cpf.query';
import { CpfRestrictedListRepository } from '../repositories/cpf-restricted-list.repository';

@QueryHandler(GetByCpfQuery)
export class GetByCpfQueryHandler implements IQueryHandler<GetByCpfQuery> {
  constructor(
    private readonly cpfRestrictedListRepository: CpfRestrictedListRepository,
  ) {}

  async execute(query: GetByCpfQuery): Promise<CpfRestrictedList> {
    const { payload } = query;
    const { cpf } = payload;

    cpfValidation(cpf);

    const findCpf = await this.cpfRestrictedListRepository.findOne({
      where: { cpf },
    });

    if (!findCpf) {
      throw new NotFoundCpfException();
    }

    return findCpf;
  }
}
