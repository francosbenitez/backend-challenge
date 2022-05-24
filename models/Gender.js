module.exports = (sequelize, type) => {
  const Gender = sequelize.define("gender", {
    name: type.STRING,
    image: type.STRING,
  });
  return Gender;
};
