/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
// import "semantic-ui-css/semantic.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
