const AuthenticationController = require("../controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("../policies/AuthenticationControllerPolicy");
const isAuthenticated = require("../policies/isAuthenticated");
const CharactersController = require("../controllers/CharactersController");
const FilmsController = require("../controllers/FilmsController");

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

  // FILMS
  app.get("/films", isAuthenticated, FilmsController.get);
  app.get("/films/:filmId", isAuthenticated, FilmsController.show);
  app.post("/films", isAuthenticated, FilmsController.post);
  app.delete("/films/:filmId", isAuthenticated, FilmsController.delete);
  app.put("/films/:filmId", isAuthenticated, FilmsController.put);
};
