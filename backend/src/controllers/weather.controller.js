const weatherController = {};
const fetch = require("node-fetch");
const { API_KEY } = process.env;
const functions = require("../utils/util");
const Query = require("../models/Query");

weatherController.cityInfo = async (req, res) => {
  let { city } = req.params;
  city = city.toLowerCase();
  const ip = req.connection.remoteAddress;

  const { lat, lon, err, sent } = await getCityLocation(city);

  if (!sent) {
    res.json({
      message: `[API] - ${city} is not a valid city name. Please enter a correct one`,
      result: {},
      err,
      sent,
    });
  } else {
    const { userRes, dbRes } = await getCityData(lat, lon, city);

    const newQuery = new Query({ city, ip, dbRes });
    await newQuery.save();

    res.json({
      message:
        "[API] - Query added to database succesfully / Data sent to client succesfully",
      result: userRes,
      err,
      sent,
    });
  }
};

/*
  getCityLocation - gets the latitude and longitude of a given city
  @city: City passed by the client.
*/
const getCityLocation = (city) => {
  const location = {};

  return fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data["features"].length === 0) {
        location.err = `${city} is not a valid city name. Please enter a correct one`;
        location.sent = false;
      } else {
        location.lat = data["features"][0]["center"][1];
        location.lon = data["features"][0]["center"][0];
        location.sent = true;
      }
      return location;
    })
    .catch((error) => {
      console.error(error);
    });
};

/*
  getCityData - fetches weather data for a given latitude and longitude
  @lat: Latitude given by mapBox API
  @lon: Longitude given by mapBox API
  @city: city passed by the clien
*/
const getCityData = (lat, lon, city) => {
  const Response = {};

  return fetch(
    `https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/${lat},${lon}`
  )
    .then((res) => res.json())
    .then((data) => {
      Response.userRes = {
        actually: {
          city,
          timezone: data["timezone"],
          temperature: functions.farenToCelc(data["currently"]["temperature"]),
          feelsTemp: functions.farenToCelc(
            data["currently"]["apparentTemperature"]
          ),
          lowTemp: functions.farenToCelc(
            data["daily"]["data"][0]["apparentTemperatureLow"]
          ),
          highTemp: functions.farenToCelc(
            data["daily"]["data"][0]["apparentTemperatureHigh"]
          ),
          summary: data["currently"]["summary"],
        },
        minutely:
          data["minutely"] !== undefined
            ? functions.cleanMinutes(data["minutely"], data["offset"])
            : {},
        hourly: functions.cleanHours(data["hourly"], data["offset"]),
        daily: functions.cleanDays(data["daily"], data["offset"]),
      };

      Response.dbRes = data;

      return Response;
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = weatherController;
