import React, { Component } from "react";
import { withRouter } from "react-router";
import styles from "./styles.module.scss";
import { subscribe } from "../../store";

class LoginPage extends Component {
  state = {
    isLoading: false,
    enteredInvite: "",
  };

  componentDidMount() {
    localStorage.removeItem("auth");
  }

  onLogin = async () => {
    const { enteredInvite } = this.state;
    const { login, history } = this.props;

    this.setState({ isLoading: true });

    await login(enteredInvite);

    this.setState({ isLoading: false });
    history.replace("/");
  };

  onEnteredInviteChange = ({ target: { value } }) => {
    this.setState({ enteredInvite: value });
  };

  onPressEnter = ({ keyCode }) => {
    if (keyCode === 13) {
      this.onLogin();
    }
  };

  render() {
    const { enteredInvite, isLoading } = this.state;

    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <h3 className={styles.loginHeader}>SORA Logo voting TEST</h3>
          <hr />
          <span className={styles.label}>
            Please enter your invitation code
          </span>
          <input
            className={styles.input}
            value={enteredInvite}
            onChange={this.onEnteredInviteChange}
            onKeyDown={this.onPressEnter}
            autoFocus
          />
          <button
            type="submit"
            onClick={this.onLogin}
            loading={isLoading}
            disabled={!enteredInvite}
            className={styles.button}
          >
            Sign-in
          </button>
        </div>
      </div>
    );
  }
}

const mapActionsToProps = actions => ({
  login: actions.login,
});

export default subscribe(undefined, mapActionsToProps)(withRouter(LoginPage));
