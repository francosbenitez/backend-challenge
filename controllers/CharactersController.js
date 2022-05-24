const db = require("../models");
const Character = db.character;

module.exports = {
  async get(req, res) {
    try {
      characters = await Character.findAll({
        limit: 10,
      });
      console.log("characters", characters);
      res.send(characters);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to get the characters",
      });
    }
  },
};
