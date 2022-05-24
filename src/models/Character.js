module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define("character", {
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weigh: DataTypes.INTEGER,
    story: DataTypes.TEXT,
  });
  return Character;
};
