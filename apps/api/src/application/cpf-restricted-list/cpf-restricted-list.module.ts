import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpfRestrictedListRepository } from './repositories/cpf-restricted-list.repository';
import { CreateCpfController } from './controllers/create.controller';
import { CreateCpfCommandHandler } from './commands-handler/create.handler';
import { UpdateCpfController } from './controllers/update.controller';
import { UpdateCpfCommandHandler } from './commands-handler/update.handler';
import { DeleteCpfController } from './controllers/delete.controller';
import { DeleteCpfCommandHandler } from './commands-handler/delete.handler';
import { GetByCpfController } from './controllers/get-by-cpf.controller';
import { GetByCpfQueryHandler } from './queries-handler/get-by-cpf.handler';
import { GetController } from './controllers/get.controller';
import { GetQueryHandler } from './queries-handler/get.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CpfRestrictedListRepository]),
  ],
  controllers: [
    CreateCpfController,
    UpdateCpfController,
    DeleteCpfController,
    GetByCpfController,
    GetController,
  ],
  providers: [
    CreateCpfCommandHandler,
    UpdateCpfCommandHandler,
    DeleteCpfCommandHandler,
    GetByCpfQueryHandler,
    GetQueryHandler,
  ],
})
export class CpfRestrictedListModule {}
