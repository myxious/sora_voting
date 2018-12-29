/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import { Provider as AlertProvider } from "react-alert";
import App from "./components/App";
import AlertTemplate from "./components/Alert";
import StateManager from "./store/StateManager";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <AlertProvider template={AlertTemplate} timeout={5000}>
    <StateManager>
      <App />
    </StateManager>
  </AlertProvider>,
  document.getElementById("root"),
);

serviceWorker.unregister();
