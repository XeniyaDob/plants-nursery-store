require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//routers
const authRouter = require("./routes/auth");
const itemsRouter = require("./routes/items");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Plants nursery");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
