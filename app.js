// external imports
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandaler");

// env file setup
dotenv.config();
console.log(process.env.app_name);

// database connecton
mongoose
  .connect(process.env.mongo_connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection succesfull!");
  })
  .catch((err) => {
    console.log(err);
  });

// request parser
app.use(express.json()); //?string to json convert
app.use(express.urlencoded({ extended: true })); //? url encoded by express

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.cookie_secret));
console.log(process.env.cookie_secret);

// routing setup

// error handaling

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.port, () => {
  console.log(`app listing to port ${process.env.port}`);
});
