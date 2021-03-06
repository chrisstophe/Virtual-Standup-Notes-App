const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require("./api");
const mongoose = require("mongoose");

const app = express();

// Use either the port passed in through env variable or 8081
app.set("port", process.env.PORT || 8081);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/api", api);
app.use(express.static("static"));

app.use(morgan("dev"));

app.use(function (req, res) {
  const err = new Error("Not Found");
  err.status = 404;
  res.json(err);
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/virtualstandups", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to MongoDB");
  app.listen(app.get("port"), function () {
    console.log(`API Server listening on port ${app.get("port")}`);
  });
});
