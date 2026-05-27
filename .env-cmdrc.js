const common = {};

export default {
  development: {
    ...common,
    PORT: 8080,
    NODE_ENV: "development",
  },

  production: {
    ...common,
    NODE_ENV: "production",
  },
};
