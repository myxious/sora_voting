import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import cn from "classnames";
import styles from "./styles.module.scss";

class LoginPage extends Component {
  render() {
    return (
      <div className={styles.loginPage}>
        <Card className={cn("sora-card", styles.loginCard)}>
          <Card.Header>SORA Logo voting</Card.Header>
          alksdlask
        </Card>
      </div>
    );
  }
}

export default LoginPage;
