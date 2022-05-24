module.exports = (sequelize, DataTypes) => {
  const Gender = sequelize.define("gender", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  return Gender;
};
