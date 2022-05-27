require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const config = require("./config");

const app = express();
app.use(express.json());
app.use(cors());

require("./passport");

require("./routes")(app);

db.sequelize.sync({ force: false }).then(() => {
  // console.log("Drop and re-sync db!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
