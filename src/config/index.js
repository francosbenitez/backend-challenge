module.exports = {
  PORT: process.env.PORT || 8080,
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "challenge-db",
  dialect: "mysql",
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
};
