import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpfRestrictedListModule } from '../cpf-restricted-list.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../../../config/database.config';
import { InvalidCpfException } from '../exceptions/invalid-cpf.exception';
import { NotFoundCpfException } from '../exceptions/not-found-cpf.exception';

export const testSuite2 = (cpf: string) =>
  describe('GetByCpf', () => {
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

    it('(GET) should be InvalidCpfException', async () => {
      const req = await request(app.getHttpServer()).get('/cpf/97715415020');

      expect(JSON.parse(req.text)).toStrictEqual(
        new InvalidCpfException().getResponse(),
      );
    });

    it('(GET) should be NotFoundCpfException', async () => {
      const req = await request(app.getHttpServer()).get('/cpf/97715415014');

      expect(JSON.parse(req.text)).toStrictEqual(
        new NotFoundCpfException().getResponse(),
      );
    });

    it('(GET) should be success', async () => {
      const req = await request(app.getHttpServer())
        .get(`/cpf/${cpf}`)
        .expect(200);

      expect(JSON.parse(req.text)).toMatchObject({ cpf });
      expect(req.text).toContain('createdAt');
    });
  });
