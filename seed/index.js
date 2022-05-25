const db = require("../src/models");
const Promise = require("bluebird");
const Character = db.character;
const Film = db.film;
const CharacterFilm = db.film_character;
const Gender = db.gender;

const characters = require("./characters.json");
const films = require("./films.json");
const films_characters = require("./films_characters.json");
const genders = require("./gender.json");

db.sequelize.sync({ force: true }).then(async function () {
  await Promise.all(
    genders.map((gender) => {
      Gender.create(gender);
    })
  );

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

  await Promise.all(
    films_characters.map((film_character) => {
      CharacterFilm.create(film_character);
    })
  );
});
