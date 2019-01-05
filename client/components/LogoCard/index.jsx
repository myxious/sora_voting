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
    cancelVote: func.isRequired,
  };

  static defaultProps = {
    title: "",
    image: null,
    selectedVote: null,
  };

  voteForLogo = vote => {
    const { title, voteForLogo } = this.props;
    voteForLogo(title, vote);
  };

  cancelVote = () => {
    const { title, cancelVote } = this.props;
    cancelVote(title);
  };

  render() {
    const { title, image, selectedVote } = this.props;

    return (
      <Card className={styles.card}>
        <Card.Image src={image ? `/static/media/${image}` : noImagePath} />
        <Card.Header>{title}</Card.Header>
        <Card.Content>
          <VotingPanel
            selectedVote={selectedVote}
            voteForLogo={this.voteForLogo}
            cancelVote={this.cancelVote}
          />
        </Card.Content>
      </Card>
    );
  }
}

export default LogoCard;
