import React from "react";

const Daily = ({ dailyInfo }) => {
  const data = dailyInfo;
  return (
    <div className="daily">
      <div className="dly-container">
        <h3>Forecast for the next week</h3>
      </div>
      <div className="dly-holder">
        <div className="dly-hld-row">
          <div className="dly-hld-column">
            <span>{data.startDate}</span>
          </div>
          <div className="dly-hld-column">
            <p>
              <b>Min:</b> {data.avgTempMin}°C
            </p>
          </div>
          <div className="dly-hld-column">
            <p>
              <b>Max:</b>
              {data.avgTempMax}°C
            </p>
          </div>
          <div className="dly-hld-column">
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

export default Daily;
