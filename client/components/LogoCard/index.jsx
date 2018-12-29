import React, { PureComponent } from "react";
import { string, number, func } from "prop-types";
import Card from "../Card";
import VotingPanel from "../VotingPanel";
import styles from "./styles.module.scss";

const noImagePath = "/static/media/default-image.png";

class LogoCard extends PureComponent {
  static propTypes = {
    title: string,
    image: string,
    selectedVote: number,
    voteForLogo: func.isRequired,
  };

  static defaultProps = {
    title: "",
    image: noImagePath,
    selectedVote: null,
  };

  render() {
    const { title, image, selectedVote, voteForLogo } = this.props;

    return (
      <Card className={styles.card}>
        <Card.Image src={image ? `/static/media/${image}` : noImagePath} />
        <Card.Header>{title}</Card.Header>
        <Card.Content>
          <VotingPanel
            selectedVote={selectedVote}
            voteForLogo={vote => voteForLogo(title, vote)}
          />
        </Card.Content>
      </Card>
    );
  }
}

export default LogoCard;
