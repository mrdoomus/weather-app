import React from "react";

const Minutely = ({ minutelyInfo }) => {
  const data = minutelyInfo;
  return (
    <div className="minutely">
      <div className="mnt-container">
        <h3>Forecast for the next hour</h3>
      </div>
      <div className="mnt-holder">
        {Object.keys(data).length ? (
          <div>
            <div className="mnt-hld-row">
              <div className="mnt-hld-column">
                <span>{data.startHour}</span>
              </div>
              <div className="mnt-hld-column">
                <p>{data.precipProbability}% chance of raining</p>
              </div>
              <div className="mnt-hld-column">
                <span>{data.endHour}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>
            <i>There's no next hour info for this city</i>
          </p>
        )}
      </div>
      {Object.keys(data).length ? (
        <p>
          <i>{data.summary}</i>
        </p>
      ) : null}
    </div>
  );
};

export default Minutely;
