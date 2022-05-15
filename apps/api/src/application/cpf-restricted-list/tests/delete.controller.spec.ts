import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpfRestrictedListModule } from '../cpf-restricted-list.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../../../config/database.config';
import { InvalidCpfException } from '../exceptions/invalid-cpf.exception';
import { NotFoundCpfException } from '../exceptions/not-found-cpf.exception';

export const testSuite4 = (cpf: string) =>
  describe('DeleteCpf', () => {
    let app: INestApplication;

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          CpfRestrictedListModule,
          ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
          }),
          TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              ...configService.get('database'),
              host: 'localhost',
            }),
          }),
        ],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterEach(async () => {
      await app.close();
    });

    it('(DELETE) should be success', async () => {
      await request(app.getHttpServer()).delete(`/cpf/${cpf}`).expect(200);
    });

    it('(DELETE) should be InvalidCpfException', async () => {
      const req = await request(app.getHttpServer()).delete('/cpf/97715415020');

      expect(JSON.parse(req.text)).toStrictEqual(
        new InvalidCpfException().getResponse(),
      );
    });

    it('(DELETE) should be NotFoundCpfException', async () => {
      const req = await request(app.getHttpServer()).delete(`/cpf/${cpf}`);

      expect(JSON.parse(req.text)).toStrictEqual(
        new NotFoundCpfException().getResponse(),
      );
    });
  });
