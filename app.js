require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// The security configuration uses the following node packages:
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//connect DB
const connectDB = require("./db/connect");

const authenticateUser = require("./middleware/authentication");

//routers
const authRouter = require("./routes/auth");
const itemsRouter = require("./routes/items");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json());

// use packages
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("Plants store API");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/items", authenticateUser, itemsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
