module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define("film", {
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    score: DataTypes.INTEGER,
  });
  return Film;
};
