import React from "react";

const Actually = ({ actuallyInfo }) => {
  const data = actuallyInfo;

  return (
    <div className="actually">
      <div className="act-holder">
        <div className="act-hld-row">
          <span className="act-hld-column">
            <b>Feels like:</b> {data.feelsTemp}°C
          </span>
          <span className="act-hld-column">
            <b>Low:</b> {data.lowTemp}°C
          </span>
          <span className="act-hld-column">
            <b>High:</b> {data.highTemp}°C
          </span>
        </div>
      </div>
      <div>
        <h1>
          {data.temperature}°C {data.summary}.
        </h1>
        <h1>{data.city}</h1>
        <h1 style={{ margin: "0" }}>🏙️</h1>
        <p>
          <i>{data.timezone}</i>
        </p>
      </div>
    </div>
  );
};

export default Actually;
