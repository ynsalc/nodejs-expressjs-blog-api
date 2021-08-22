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
  };
  