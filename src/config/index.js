module.exports = {
  PORT: 8080,
  // HOST: "us-cdbr-east-05.cleardb.net",
  // USER: "b9f45cf270e05b",
  // PASSWORD: "fd460bc2",
  // DB: "heroku_71b0a1bf689fa92",
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "challenge-db",
  dialect: "mysql",
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
};
