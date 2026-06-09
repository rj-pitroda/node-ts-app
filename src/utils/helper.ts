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
  JWT_ACCESS_SECRET: getRequiredEnv("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: getRequiredEnv("JWT_REFRESH_SECRET"),
  JWT_ACCESS_EXPIRES_IN: getRequiredEnv("JWT_ACCESS_EXPIRES_IN"),
  JWT_REFRESH_EXPIRES_IN: getRequiredEnv("JWT_REFRESH_EXPIRES_IN"),
  JWT_RESET_SECRET: getRequiredEnv("JWT_RESET_SECRET"),
  JWT_RESET_EXPIRES_IN: getRequiredEnv("JWT_RESET_EXPIRES_IN"),
  SMTP_HOST: getRequiredEnv("SMTP_HOST"),
  SMTP_PORT: getRequiredEnv("SMTP_PORT"),
  SMTP_USER: getRequiredEnv("SMTP_USER"),
  SMTP_PASSWORD: getRequiredEnv("SMTP_PASSWORD"),
  SMTP_FROM: getRequiredEnv("SMTP_FROM"),
  FRONTEND_URL: getRequiredEnv("FRONTEND_URL"),
};

export const parseDurationToMs = (duration: string): number => {
  const match = duration.match(/^(\d+)(ms|s|m|h|d|w|y)?$/);
  if (!match) return 0;
  const value = parseInt(match[1], 10);
  const unit = match[2] || "ms";
  switch (unit) {
    case "ms":
      return value;
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    case "w":
      return value * 7 * 24 * 60 * 60 * 1000;
    case "y":
      return value * 365 * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
};
