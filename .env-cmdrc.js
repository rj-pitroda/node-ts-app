const common = {};

export default {
  development: {
    ...common,
    PORT: 8080,
    NODE_ENV: "development",
    DB_PASSWORD: "york123",
    DB_NAME: "node-learning",
  },

  production: {
    ...common,
    NODE_ENV: "production",
  },
};
