import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpfRestrictedListModule } from '../cpf-restricted-list.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../../../config/database.config';

export const testSuite3 = () =>
  describe('Get', () => {
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

    it('(GET) should be success', async () => {
      const req = await request(app.getHttpServer()).get('/cpf').expect(200);

      const response = JSON.parse(req.text);

      expect(response).toMatchObject({
        items: response.items,
        page: 1,
        perPage: 25,
        total: response.total,
      });
    });
  });
