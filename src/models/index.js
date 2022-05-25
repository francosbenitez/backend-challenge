const Sequelize = require("sequelize");
const config = require("../config");
const db = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.character = require("./Character")(sequelize, Sequelize);
db.film = require("./Film")(sequelize, Sequelize);
db.film_character = require("./FilmCharacter")(sequelize, Sequelize);
db.gender = require("./Gender")(sequelize, Sequelize);

// O:M
db.gender.hasMany(db.film, { as: "films" });
db.film.belongsTo(db.gender, {
  foreignKey: "genderId",
  as: "gender",
});

// M:M
db.character.belongsToMany(db.film, {
  through: db.film_character,
  as: "films",
  foreignKey: "character_id",
});
db.film.belongsToMany(db.character, {
  through: db.film_character,
  as: "characters",
  foreignKey: "film_id",
});

module.exports = db;
