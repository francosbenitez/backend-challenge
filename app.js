const express = require("express");
const app = express();
app.use(express.json());
const db = require("./models");
require("./routes")(app);

db.sequelize.sync({ force: false }).then(() => {
  // console.log("Drop and re-sync db!");
});

app.listen(8080, () => {
  console.log("Server is running!");
});
