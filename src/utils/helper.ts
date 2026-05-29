export const ENV_VAR = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_PASSWORD: process.env.DB_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  IS_DEV_ENV: process.env.NODE_ENV === "development",
};
