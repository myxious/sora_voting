import React, { PureComponent } from "react";
import { string } from "prop-types";
import Card from "../Card";
import VotingPanel from "../VotingPanel";
import styles from "./styles.module.scss";

class LogoCard extends PureComponent {
  static propTypes = {
    title: string,
  };

  static defaultProps = {
    title: "",
  };

  render() {
    const { title } = this.props;

    return (
      <Card className={styles.card}>
        <Card.Image src="https://placeimg.com/800/450/nature" />
        <Card.Header>{title}</Card.Header>
        <Card.Content>
          <VotingPanel />
        </Card.Content>
      </Card>
    );
  }
}

export default LogoCard;
