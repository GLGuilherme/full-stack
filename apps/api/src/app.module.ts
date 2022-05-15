import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpfRestrictedListModule } from './application/cpf-restricted-list/cpf-restricted-list.module';

@Module({
  imports: [
    CpfRestrictedListModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
  ],
})
export class AppModule {}
