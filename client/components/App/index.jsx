import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "../MainLayout";
import LoginPage from "../LoginPage";
import "./styles.module.scss";

class App extends Component {
  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;

    // TODO: better error visualization
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={MainLayout} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
