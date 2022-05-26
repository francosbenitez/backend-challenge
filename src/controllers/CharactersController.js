const db = require("../models");
const Character = db.character;
const Film = db.film;

module.exports = {
  async get(req, res) {
    try {
      characters = await Character.findAll({
        limit: 10,
        attributes: ["image", "name"],
      });
      res.send(characters);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to get the characters",
      });
    }
  },

  async show(req, res) {
    try {
      const character = await Character.findByPk(req.params.characterId, {
        include: [
          {
            model: Film,
            as: "films",
            attributes: ["image", "title", "date", "score"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(character);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to show the character",
      });
    }
  },

  async post(req, res) {
    try {
      const newCharacter = await Character.create(req.body);
      res.send(newCharacter);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the character",
      });
    }
  },
};
