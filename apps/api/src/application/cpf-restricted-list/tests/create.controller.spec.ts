import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpfRestrictedListModule } from '../cpf-restricted-list.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../../../config/database.config';
import { InvalidCpfException } from '../exceptions/invalid-cpf.exception';
import { ExistsCpfException } from '../exceptions/exists-cpf.exception';

export const testSuite1 = (cpf: string) =>
  describe('CreateCpf', () => {
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

    it('(POST) should be success', async () => {
      const req = await request(app.getHttpServer())
        .post('/cpf')
        .send({ cpf })
        .expect(201);

      expect(JSON.parse(req.text)).toMatchObject({ cpf });
    });

    it('(POST) should be InvalidCpfException', async () => {
      const req = await request(app.getHttpServer())
        .post('/cpf')
        .send({ cpf: '97715415020' });

      expect(JSON.parse(req.text)).toStrictEqual(
        new InvalidCpfException().getResponse(),
      );
    });

    it('(POST) should be ExistsCpfException', async () => {
      const req = await request(app.getHttpServer()).post('/cpf').send({ cpf });

      expect(JSON.parse(req.text)).toStrictEqual(
        new ExistsCpfException().getResponse(),
      );
    });
  });
