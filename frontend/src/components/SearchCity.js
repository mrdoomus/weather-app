import React, { useState } from "react";
import axios from "axios";

import Actually from "./Actually";
import Minutely from "./Minutely";
import Hourly from "./Hourly";
import Daily from "./Daily";

import noData from "../components/imgs/noData.png";

const SearchCity = () => {
  const [response, setResponse] = useState({
    actually: null,
    minutely: null,
    hourly: null,
    daily: null,
    sent: false,
    err: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements.form;
    axios
      .post(`weather/${value}`)
      .then((res) => {
        setResponse({
          ...response,
          actually: res.data.result.actually,
          minutely: res.data.result.minutely,
          hourly: res.data.result.hourly,
          daily: res.data.result.daily,
          sent: res.data.sent,
          err: res.data.err,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="searchcity">
      <h1 className="scc-title">THE WEATHER APP</h1>
      <p style={{ letterSpacing: "2px" }}>
        <i>Forecasts at your hand, try it out!</i>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          className="form"
          type="text"
          name="form"
          placeholder="London"
          autoFocus
        />
      </form>
      {response.sent ? (
        <div>
          <Actually actuallyInfo={response.actually} />
          <Minutely minutelyInfo={response.minutely} />
          <Hourly hourlyInfo={response.hourly} />
          <Daily dailyInfo={response.daily} />
          <small>
            <a href="https://darksky.net/forecast/" target="_blank">
              You can see a full report here!
            </a>
          </small>
        </div>
      ) : (
        <div className="scc-error">
          <h1>
            <i>
              {response.err
                ? response.err
                : "No results, try searching for a city!"}
            </i>
          </h1>
          <img style={{ width: "200px" }} src={noData} alt="Sad face :'(" />
        </div>
      )}
    </div>
  );
};

export default SearchCity;
