const common = {};

export default {
  development: {
    ...common,
    PORT: 8080,
    NODE_ENV: "development",
    DB_PASSWORD: "york123",
    DB_USERNAME: "postgres",
    DB_NAME: "node-learning",
    DB_PORT: 5432,
    DB_HOST: "localhost",
    JWT_ACCESS_SECRET: "access_secret_key_change_me_in_prod",
    JWT_REFRESH_SECRET: "refresh_secret_key_change_me_in_prod",
    JWT_RESET_SECRET: "reset_secret_key_change_me_in_prod",

    JWT_ACCESS_EXPIRES_IN: "15m",
    JWT_REFRESH_EXPIRES_IN: "30m",
    JWT_RESET_EXPIRES_IN: "15m",

    SMTP_HOST: "smtp.ethereal.email",
    SMTP_PORT: 587,
    SMTP_USER: "placeholder_user",
    SMTP_PASSWORD: "placeholder_password",
    SMTP_FROM: "noreply@nodeapp.com",
    FRONTEND_URL: "http://localhost:5173",
  },

  production: {
    ...common,
    NODE_ENV: "production",
  },
};
