import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDto } from '../dtos/get.dto';
import { GetQuery } from '../queries/get.query';
import { CpfRestrictedListRepository } from '../repositories/cpf-restricted-list.repository';

@QueryHandler(GetQuery)
export class GetQueryHandler implements IQueryHandler<GetQuery> {
  constructor(
    private readonly cpfRestrictedListRepository: CpfRestrictedListRepository,
  ) {}

  async execute(query: GetQuery): Promise<GetDto> {
    const { payload } = query;
    const { page, perPage } = payload;

    const qb = this.cpfRestrictedListRepository
      .createQueryBuilder('list')
      .orderBy('list.createdAt', 'ASC')
      .take(perPage)
      .skip(perPage * (page - 1));

    const findAll = await qb.getManyAndCount();

    return {
      items: findAll[0],
      page: parseInt(page.toString()),
      perPage: parseInt(perPage.toString()),
      total: findAll[1],
    };
  }
}
