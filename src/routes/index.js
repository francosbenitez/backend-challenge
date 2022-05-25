const CharactersController = require("../controllers/CharactersController");
const AuthenticationController = require("../controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("../policies/AuthenticationControllerPolicy");
const isAuthenticated = require("../policies/isAuthenticated");

module.exports = (app) => {
  app.post(
    "/auth/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );
  app.post("/auth/login", AuthenticationController.login);

  app.get("/characters", isAuthenticated, CharactersController.get);
  app.get(
    "/characters/:characterId",
    isAuthenticated,
    CharactersController.show
  );
};
