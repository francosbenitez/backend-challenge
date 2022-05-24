const db = require("../models");
const Character = db.character;

const characters = require("./characters.json");

db.sequelize.sync({ force: true }).then(async function () {
  await Promise.all(
    characters.map((character) => {
      Character.create(character);
    })
  );
});
