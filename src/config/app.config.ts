process.loadEnvFile();

export interface EnvConfigProps {
  NODE_ENV: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  JWT_PASSWORD: string;
  JWT_EXPIRATION: string;
  JWT_SALT: string;
  PORT: number;
}

export const EnvConfig: EnvConfigProps = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  DB_USER: process.env.DB_USER ?? '',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
  DB_NAME: process.env.DB_NAME ?? '',
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  JWT_PASSWORD: process.env.JWT_PASSWORD ?? '',
  JWT_EXPIRATION: process.env.DB_JWT_EXPIRATION ?? '',
  JWT_SALT: process.env.JWT_SALT ?? '',
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
};
