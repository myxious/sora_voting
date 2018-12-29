import React, { PureComponent } from "react";
import { string } from "prop-types";
import Card from "../Card";
import VotingPanel from "../VotingPanel";
import styles from "./styles.module.scss";

class LogoCard extends PureComponent {
  static propTypes = {
    title: string,
    image: string,
  };

  static defaultProps = {
    title: "",
    image: "/static/media/default-image.png",
  };

  render() {
    const { title, image } = this.props;

    return (
      <Card className={styles.card}>
        <Card.Image src={image} />
        <Card.Header>{title}</Card.Header>
        <Card.Content>
          <VotingPanel />
        </Card.Content>
      </Card>
    );
  }
}

export default LogoCard;
