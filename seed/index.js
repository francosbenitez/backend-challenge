const db = require("../src/models");
const Promise = require("bluebird");
const Character = db.character;
const Film = db.film;

const characters = require("./characters.json");
const films = require("./films.json");

db.sequelize.sync({ force: true }).then(async function () {
  await Promise.all(
    characters.map((character) => {
      Character.create(character);
    })
  );

  await Promise.all(
    films.map((film) => {
      Film.create(film);
    })
  );
});
