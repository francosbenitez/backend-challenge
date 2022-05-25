const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcrypt");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create(req.body);
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      res.status(400).send({
        error: "This email account is already in use.",
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(403).send({
          error: "The login information was incorrect",
        });
      }

      if (user) {
        console.log(password, user.password);
        const equals = bcrypt.compareSync(password, user.password);
        if (equals) {
          const userJson = user.toJSON();
          res.send({
            user: userJson,
            token: jwtSignUser(userJson),
          });
        } else {
          res.json({ error: "Error in user and/or password v1" });
        }
      } else {
        res.json({ error: "Error in user and/or password v2" });
      }
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to log in",
      });
    }
  },
};
