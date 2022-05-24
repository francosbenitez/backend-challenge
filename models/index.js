const Sequelize = require("sequelize");
const config = require("../config");
const db = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.character = require("./Character")(sequelize, Sequelize);
db.film = require("./Film")(sequelize, Sequelize);
db.gender = require("./Gender")(sequelize, Sequelize);

db.film.belongsTo(db.character);
db.character.belongsTo(db.film);
db.gender.belongsTo(db.character);

module.exports = db;
