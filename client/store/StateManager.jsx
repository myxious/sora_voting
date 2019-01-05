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
    logoList: [],
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

  fetchLogoList = async () => {
    try {
      const logoList = await api.logoList();
      this.setState({ logoList });
    } catch (err) {
      this.errorHandler(err.message);
    }
  };

  voteForLogo = async (logoName, userVote) => {
    try {
      await api.vote(logoName, userVote);
      await Promise.all([this.fetchUserData(), this.fetchLogoList()]);
    } catch (err) {
      this.errorHandler(err.message);
    }
  };

  cancelVote = async logoName => {
    try {
      await api.cancelVote(logoName);
      await Promise.all([this.fetchUserData(), this.fetchLogoList()]);
    } catch (err) {
      this.errorHandler(err.message);
    }
  };

  errorHandler = message => {
    const { alert } = this.props;
    alert.error(message);
  };

  render() {
    const { children } = this.props;

    return (
      <Provider
        value={{
          state: this.state,
          actions: {
            login: this.login,
            fetchUserData: this.fetchUserData,
            fetchLogoList: this.fetchLogoList,
            voteForLogo: this.voteForLogo,
            cancelVote: this.cancelVote,
          },
        }}
      >
        {children}
      </Provider>
    );
  }
}

export default withAlert(StateManager);
