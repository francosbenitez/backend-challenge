module.exports = {
  PORT: 8080,
  HOST: process.env.HOST,
  USER: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
};
