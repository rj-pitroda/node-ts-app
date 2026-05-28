const common = {};

export default {
  development: {
    ...common,
    PORT: 8080,
    NODE_ENV: "development",
    DB_PASSWORD: "york123",
    DB_NAME: "node-learning",
    DB_PORT: 5432,
    DB_HOST: "localhost",
  },

  production: {
    ...common,
    NODE_ENV: "production",
  },
};
