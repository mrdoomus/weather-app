import React from "react";

const Hourly = ({ hourlyInfo }) => {
  const data = hourlyInfo;
  return (
    <div className="hourly">
      <div className="hrl-container">
        <h3>Forecast for the next 2 days</h3>
      </div>
      <div className="hrl-holder">
        <div className="hrl-hld-row">
          <div className="hrl-hld-column">
            <span>{data.startDate}</span>
          </div>
          <div className="hrl-hld-column">
            <p>{data.avgTempFirstDay}°C on average</p>
          </div>
          <div className="hrl-hld-column">
            <span>{data.midDate}</span>
          </div>
          <div className="hrl-hld-column">
            <p>{data.avgTempSecondDay}°C on average</p>
          </div>
          <div className="hrl-hld-column">
            <span>{data.endDate}</span>
          </div>
        </div>
      </div>
      <p>
        <i>{data.summary}</i>
      </p>
    </div>
  );
};

export default Hourly;
