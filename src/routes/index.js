const CharactersController = require("../controllers/CharactersController");

module.exports = (app) => {
  app.get("/characters", CharactersController.get);
  app.get("/characters/:characterId", CharactersController.show);
};
