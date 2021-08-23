module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "blogproject",
      user: "postgres",
      password: "123456",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {
    client: process.env.DATABASE_CLIENT,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
