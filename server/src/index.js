const express = require("express");
const morgan = require("morgan");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const middleware = require("./middlewares");
const mongoose = require("mongoose");
const logs = require("./api/logs");
const bodyParser = require("body-parser");
const port = process.env.PORT || 1337;

require("dotenv").config();

app.use(morgan("common"));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json()); // same as a above

app.get("/", (req, res) => {
  res.json({ message: "testing" });
});

app.use("/api/logs", logs);

app.use(middleware.notFound);

app.use(middleware.errorHandler);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Listing in port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
