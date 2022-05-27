const Promise = require("bluebird");
const bcrypt = require("bcrypt");

const db = require("../src/models");

const users = require("./users.json");
const characters = require("./characters.json");
const films = require("./films.json");
const films_characters = require("./films_characters.json");
const genders = require("./gender.json");

const User = db.user;
const Character = db.character;
const Film = db.film;
const FilmCharacter = db.film_character;
const Gender = db.gender;

db.sequelize.sync({ force: true }).then(async function () {
  await Promise.all(
    users.map((user) => {
      console.log(">> processing users");
      user.password = bcrypt.hashSync(user.password, 10);
      User.create(user);
    })
  );

  await Promise.all(
    characters.map((character) => {
      console.log(">> processing characters");
      Character.create(character);
    })
  );

  await Promise.all(
    genders.map((gender) => {
      console.log(">> processing genders");
      Gender.create(gender);
    })
  );

  await Promise.all(
    films.map((film) => {
      console.log(">> processing films");
      Film.create(film);
    })
  );

  await Promise.all(
    films_characters.map((film_character) => {
      console.log(">> processing films_characters");
      FilmCharacter.create(film_character);
    })
  );
});
