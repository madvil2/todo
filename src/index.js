import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import App from "./App";

import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import history from "./utils/history.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
