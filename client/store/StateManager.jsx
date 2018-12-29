/* eslint-disable react/no-unused-state, react/forbid-prop-types */
import React, { Component } from "react";
import { node, object } from "prop-types";
import { withAlert } from "react-alert";
import { Provider } from "./contextCreator";
import api from "../common/api";

// TODO: put actions to separate files with binding to "this"

class StateManager extends Component {
  static propTypes = {
    children: node.isRequired,
    alert: object.isRequired,
  };

  state = {
    user: undefined,
    count: 0,
    somethingElse: "123",
  };

  login = async invite => {
    try {
      const user = await api.login(invite);
      localStorage.setItem("auth", user.invite);
      this.setState({ user });
    } catch (err) {
      this.errorHandler(err.message);
    }
  };

  fetchUserData = async invite => {
    try {
      const user = await api.userData(invite);
      this.setState({ user });
    } catch (err) {
      this.errorHandler(err.message);
    }
  };

  errorHandler = message => {
    const { alert } = this.props;
    alert.error(message);
  };

  render() {
    const { state } = this;
    const { children } = this.props;

    // console.log("current state: ", state);
    return (
      <Provider
        value={{
          state: this.state,
          actions: {
            increment: () => this.setState({ count: state.count + 1 }),
            login: this.login,
            fetchUserData: this.fetchUserData,
          },
        }}
      >
        {children}
      </Provider>
    );
  }
}

export default withAlert(StateManager);
