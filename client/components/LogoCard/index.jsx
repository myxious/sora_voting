import React, { PureComponent } from "react";
import { string, number, func } from "prop-types";
import Card from "../Card";
import VotingPanel from "../VotingPanel";
import styles from "./styles.module.scss";

class LogoCard extends PureComponent {
  static propTypes = {
    title: string,
    image: string,
    selectedVote: number,
    voteForLogo: func.isRequired,
    cancelVote: func.isRequired,
    onOpenImage: func.isRequired,
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

  onOpenImage = () => {
    const { image, onOpenImage } = this.props;
    onOpenImage(image);
  };

  render() {
    const { title, image, selectedVote } = this.props;

    return (
      <Card className={styles.card}>
        <Card.Image src={image} onOpenImage={this.onOpenImage} />
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
