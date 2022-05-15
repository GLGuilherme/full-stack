import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CpfRestrictedList } from '../entities/cpf-restricted-list.entity';
import { GetQuery } from '../queries/get.query';
import { CpfRestrictedListRepository } from '../repositories/cpf-restricted-list.repository';

@QueryHandler(GetQuery)
export class GetQueryHandler implements IQueryHandler<GetQuery> {
  constructor(
    private readonly cpfRestrictedListRepository: CpfRestrictedListRepository,
  ) {}

  async execute(query: GetQuery): Promise<{
    items: CpfRestrictedList[];
    page: number;
    perPage: number;
    total: number;
  }> {
    const { payload } = query;
    const { page, perPage } = payload;

    const qb = this.cpfRestrictedListRepository
      .createQueryBuilder('list')
      .orderBy('list.updatedAt', 'ASC')
      .take(perPage)
      .skip(perPage * (page - 1));

    const findAll = await qb.getManyAndCount();

    if (!findAll) {
      throw new NotFoundException('not found cpf!');
    }

    return {
      items: findAll[0],
      page,
      perPage,
      total: findAll[1],
    };
  }
}