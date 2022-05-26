const db = require("../models");
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
};
