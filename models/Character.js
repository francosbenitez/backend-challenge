module.exports = (sequelize, type) => {
  const Character = sequelize.define("character", {
    image: type.STRING,
    name: type.STRING,
    age: type.INTEGER,
    weigh: type.INTEGER,
    story: type.TEXT,
  });
  return Character;
};
