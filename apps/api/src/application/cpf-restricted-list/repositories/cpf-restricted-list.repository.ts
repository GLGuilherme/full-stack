import { EntityRepository, Repository } from 'typeorm';
import { CpfRestrictedList } from '../entities/cpf-restricted-list.entity';

@EntityRepository(CpfRestrictedList)
export class CpfRestrictedListRepository extends Repository<CpfRestrictedList> {}
