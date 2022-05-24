module.exports = (sequelize, type) => {
  const Film = sequelize.define("film", {
    image: type.STRING,
    title: type.STRING,
    date: type.DATE,
    score: type.INTEGER,
  });
  return Film;
};
