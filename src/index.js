import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import "./fonts/Gilroy-Bold.ttf";
import "./fonts/Gilroy-ExtraBold.ttf";
import "./fonts/Gilroy-Heavy.ttf";
import "./fonts/Gilroy-Light.ttf";
import "./fonts/Gilroy-Medium.ttf";
import "./fonts/Gilroy-Regular.ttf";
import "./fonts/Gilroy-SemiBold.ttf";
import "./fonts/Gilroy-Thin.ttf";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
