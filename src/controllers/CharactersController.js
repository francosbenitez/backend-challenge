const { character } = require("../models");
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
      const { characterId } = req.params;
      const character = await Character.findByPk(characterId, {
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

  async delete(req, res) {
    try {
      const { characterId } = req.params;
      const character = await Character.findOne({
        where: {
          id: characterId,
        },
      });
      await character.destroy();
      res.send(character);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "An error has ocurred trying to delete the character",
      });
    }
  },

  async put(req, res) {
    try {
      const { characterId } = req.params;
      await Character.update(req.body, {
        where: {
          id: characterId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to update the character",
      });
    }
  },
};
