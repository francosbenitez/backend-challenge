const CharactersController = require("../controllers/CharactersController");
const AuthenticationController = require("../controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("../policies/AuthenticationControllerPolicy");
const isAuthenticated = require("../policies/isAuthenticated");

module.exports = (app) => {
  // REGISTER & LOGIN
  app.post(
    "/auth/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );
  app.post("/auth/login", AuthenticationController.login);

  // CHARACTERS
  app.get("/characters", isAuthenticated, CharactersController.get);
  app.get(
    "/characters/:characterId",
    isAuthenticated,
    CharactersController.show
  );
  app.post("/characters", isAuthenticated, CharactersController.post);
  app.delete(
    "/characters/:characterId",
    isAuthenticated,
    CharactersController.delete
  );
  app.put(
    "/characters/:characterId",
    isAuthenticated,
    CharactersController.put
  );
};
