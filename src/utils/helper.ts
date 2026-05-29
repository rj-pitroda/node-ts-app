const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const ENV_VAR = {
  PORT: getRequiredEnv("PORT"),
  DB_NAME: getRequiredEnv("DB_NAME"),
  DB_HOST: getRequiredEnv("DB_HOST"),
  DB_PORT: getRequiredEnv("DB_PORT"),
  DB_PASSWORD: getRequiredEnv("DB_PASSWORD"),
  DB_USERNAME: getRequiredEnv("DB_USERNAME"),
  NODE_ENV: getRequiredEnv("NODE_ENV"),
  IS_DEV_ENV: process.env.NODE_ENV === "development",
};
