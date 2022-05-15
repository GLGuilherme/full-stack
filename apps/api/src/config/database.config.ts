import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    migrationsRun: false,
    migrationsTableName: 'migrations',
    entities: ['dist/**/**.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*.{ts,js}'],
    cli: {
      migrationsDir: 'dist/database/migrations',
    },
  };
});
