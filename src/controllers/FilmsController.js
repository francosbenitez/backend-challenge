const db = require("../models");
const Character = db.character;
const Film = db.film;

module.exports = {
  async get(req, res) {
    try {
      films = await Film.findAll({
        limit: 10,
        attributes: ["image", "title", "date"],
      });
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
};
