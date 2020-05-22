module.exports = functions = {
  farenToCelc: (temp) => tempConverter(temp),

  /*
  cleanMinutes - cleans the minutely JSON response
  @minutely: Object with the minutely key value from darksky API.
  @offset: timezone offset to get actual UTC time.
  */
  cleanMinutes: (minutely, offset) => {
    const timeInt = timeConverter(minutely["data"][0]["time"], offset);

    const newMinutely = {};
    let totProbability = 0;

    // summary
    newMinutely.summary = minutely["summary"];

    // Adding up every precip probability by minute.
    minutely["data"].map((time) => {
      totProbability += time["precipProbability"];
    });

    // Average probability calc
    newMinutely.precipProbability = parseFloat(
      ((totProbability / 60) * 100).toFixed(1)
    );

    let meridiem = "am";
    if (timeInt.getUTCHours() >= 12 && timeInt.getUTCHours() <= 24) {
      meridiem = "pm";
    }

    // Start Hour
    newMinutely.startHour =
      timeInt.getUTCHours().toString() +
      ":" +
      timeInt.getUTCMinutes().toString() +
      meridiem;

    // End hour
    newMinutely.endHour =
      (timeInt.getUTCHours() + 1).toString() +
      ":" +
      timeInt.getUTCMinutes().toString() +
      meridiem;

    return newMinutely;
  },

  /*
  cleanHours - cleans the hourly JSON response
  @hourly: Object with the hourly key value from darksky API.
  @offset: timezone offset to get actual UTC time.
  */
  cleanHours: (hourly, offset) => {
    const timeInt = timeConverter(hourly["data"][0]["time"], offset);

    const newHourly = {};
    let totProbabilityFirstHalf = 0,
      totProbabilitySecondHalf = 0;

    // summary
    newHourly.summary = hourly["summary"];

    // First Half for Temp Avg
    for (let day = 1; day < hourly["data"].length / 2; day++) {
      totProbabilityFirstHalf += hourly["data"][day]["temperature"];
    }

    // Second Half for Temp Avg
    for (let day = 25; day < hourly["data"].length; day++) {
      totProbabilitySecondHalf += hourly["data"][day]["temperature"];
    }

    // Average temperature for two days calcs
    newHourly.avgTempFirstDay = tempConverter(totProbabilityFirstHalf / 24);
    newHourly.avgTempSecondDay = tempConverter(totProbabilitySecondHalf / 24);

    // Start, Middle and End Day
    newHourly.startDate =
      timeInt.getUTCDate().toString() +
      " " +
      monthString[timeInt.getUTCMonth()];
    newHourly.midDate =
      (timeInt.getUTCDate() + 1).toString() +
      " " +
      monthString[timeInt.getUTCMonth()];
    newHourly.endDate =
      (timeInt.getUTCDate() + 2).toString() +
      " " +
      monthString[timeInt.getUTCMonth()];

    return newHourly;
  },

  /*
  cleanDaily - cleans teh JSON response
  @daily: Object with the daily key value from darksky API.
  @offset: timezone offset to get actual UTC time.
  */
  cleanDays: (daily, offset) => {
    const timeIntStart = timeConverter(daily["data"][0]["time"], offset);
    const timeIntEnd = timeConverter(daily["data"][7]["time"], offset);

    const newDaily = {};
    let totMinTemp = 0,
      totMaxTemp = 0;

    // summary
    newDaily.summary = daily["summary"];

    // Min and Max Temperature avg per day calc
    for (let day = 0; day < daily["data"].length - 1; day++) {
      totMinTemp += daily["data"][day]["temperatureMin"];
      totMaxTemp += daily["data"][day]["temperatureMax"];
    }

    // Min and Max Temperature avg per day
    newDaily.avgTempMin = tempConverter(totMinTemp / 7);
    newDaily.avgTempMax = tempConverter(totMaxTemp / 7);

    // Start and End day
    newDaily.startDate =
      timeIntStart.getUTCDate().toString() +
      " " +
      monthString[timeIntStart.getUTCMonth()];
    newDaily.endDate =
      timeIntEnd.getUTCDate().toString() +
      " " +
      monthString[timeIntEnd.getUTCMonth()];

    return newDaily;
  },
};

/*
timeConverter - Converts miliseconds to real UTC time. Getting this right was hard.
@time: miliseconds given by darksky API.
@offset: timezone offset to get actual UTC time.
*/
function timeConverter(time, offset) {
  const targetTime = new Date(time * 1000);
  //get the timezone offset from local time in minutes
  const tzDifference = offset * 60;
  //convert the offset to milliseconds, add to targetTime, and make a new Date
  const offsetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);

  return offsetTime;
}

/*
tempConverter - Converts Farenheit to Celcius
@temp: Fahrenheit temperature
*/
function tempConverter(temp) {
  return Math.floor((temp - 32) * (5 / 9));
}

// Helper function with monthso f the year
const monthString = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dic",
};
