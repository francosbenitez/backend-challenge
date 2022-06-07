const db = require("../models");
const Character = db.character;
const Film = db.film;
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      const title = req.query.name;
      const genderId = req.query.genre;
      const order = req.query.order;

      console.log("order", order);

      if (title || genderId || order) {
        if (title) {
          films = await Film.findAll({
            where: {
              title: {
                [Op.like]: `%${title}%`,
              },
            },
          });
        }
        if (genderId) {
          films = await Film.findAll({
            where: {
              genderId: genderId,
            },
          });
        }
        if (order) {
          films = await Film.findAll({
            order: [["date", order]],
          });
        }
      } else {
        films = await Film.findAll({
          limit: 10,
          attributes: ["image", "title", "date"],
        });
      }
      res.send(films);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to get the films: " + err,
      });
    }
  },

  async show(req, res) {
    try {
      const { filmId } = req.params;
      const film = await Film.findByPk(filmId, {
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
      res.send(film);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to show the film: " + err,
      });
    }
  },

  async post(req, res) {
    try {
      const newFilm = await Film.create(req.body);
      res.send(newFilm);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the film: " + err,
      });
    }
  },

  async delete(req, res) {
    try {
      const { filmId } = req.params;
      const film = await Film.findOne({
        where: {
          id: filmId,
        },
      });
      await film.destroy();
      res.send(film);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "An error has ocurred trying to delete the film: " + err,
      });
    }
  },

  async put(req, res) {
    try {
      const { filmId } = req.params;
      await Film.update(req.body, {
        where: {
          id: filmId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to update the film: " + err,
      });
    }
  },
};
