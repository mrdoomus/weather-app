//Server Config
const express = require("express");
const morgan = require("morgan");

// Inits
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require("./routes/weather.routes"));

module.exports = app;
