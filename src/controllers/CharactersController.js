const { character } = require("../models");
const db = require("../models");
const Character = db.character;
const Film = db.film;
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      console.log(">> req.query: ", req.query);

      const name = req.query.name;
      const age = req.query.age;
      const filmId = req.query.films;

      if (name || age || filmId) {
        if (name) {
          characters = await Character.findAll({
            where: {
              name: {
                [Op.like]: `%${name}%`,
              },
            },
          });
        }
        if (age) {
          characters = await Character.findAll({
            where: {
              age: {
                [Op.like]: `%${age}%`,
              },
            },
          });
        }
        if (filmId) {
          characters = await Film.findByPk(filmId, {
            include: [
              {
                model: Character,
                as: "characters",
                attributes: ["id", "image", "name", "age", "weigh", "story"],
                through: {
                  attributes: [],
                },
              },
            ],
          });
        }
      } else {
        characters = await Character.findAll({
          limit: 10,
          attributes: ["image", "name"],
        });
      }
      res.send(characters);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to get the characters: " + err,
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
            attributes: ["id", "image", "title", "date", "score"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(character);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to show the character: " + err,
      });
    }
  },

  async post(req, res) {
    try {
      const newCharacter = await Character.create(req.body);
      res.send(newCharacter);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the character: " + err,
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
        error: "An error has ocurred trying to delete the character: " + err,
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
        error: "An error has ocurred trying to update the character: " + err,
      });
    }
  },
};
