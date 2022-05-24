const express = require("express");
const app = express();
const db = require("./models");
require("./routes")(app);

app.use(express.json());

db.sequelize.sync({ force: false }).then(() => {
  // console.log("Drop and re-sync db!");
});

app.listen(8080, () => {
  console.log("Server is running!");
});
