import React from "react";
import SearchCity from "./components/SearchCity";

import "./components/styles/style.css";

function App() {
  return (
    <div id="App">
      <div className="app-container">
        <SearchCity />
        <br />
        <footer>
          <small>
            <a
              className="author-dev"
              href="https://www.github.com/mrdoomus"
              target="_blank"
            >
              Developed by Camilo Villegas
            </a>
          </small>
        </footer>
      </div>
    </div>
  );
}

export default App;
