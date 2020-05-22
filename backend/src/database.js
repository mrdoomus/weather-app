//Conection to MongoDB with mongoose
const mongoose = require("mongoose");

const { WEATHER_APP_MONGODB_HOST, WEATHER_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${WEATHER_APP_MONGODB_HOST}/${WEATHER_APP_MONGODB_DATABASE}`;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log(err));
