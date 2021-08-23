module.exports = {
    development: {
      client: "pg",
      connection: {
        database: "dvt9ppubaf2bd",
        user: "rgkgagyhmbtejm",
        password: "6926269d2e00997dec2aaf6dc26f2b835b5087026585949aa5c710641c2f40ad",
		host:"ec2-44-196-170-156.compute-1.amazonaws.com",
		port:"5432"
      },
      migrations: {
        directory: "./data/migrations",
      },
      seeds: {
        directory: "./data/seeds",
      },
    },
  };
  