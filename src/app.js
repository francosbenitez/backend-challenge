const express = require("express");
const app = express();
const db = require("./models");
const config = require("./config");
require("./routes")(app);

app.use(express.json());
require("./passport");

db.sequelize.sync({ force: false }).then(() => {
  // console.log("Drop and re-sync db!");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port http://localhost:${config.PORT}/`);
});
