const config = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  logger: 'simple-console',
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: ['src/database/migrations/*.{ts,js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = config;
