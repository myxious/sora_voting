import React, { PureComponent } from "react";
import { func, number } from "prop-types";
import VotingButton from "../VotingButton";
import styles from "./styles.module.scss";

class VotingPanel extends PureComponent {
  static propTypes = {
    selectedVote: number,
    voteForLogo: func.isRequired,
  };

  static defaultProps = {
    selectedVote: null,
  };

  render() {
    const { voteForLogo, selectedVote } = this.props;

    return (
      <div className={styles.votingPanel}>
        <div className={styles.subPanelLeft}>
          <div className={styles.votingButtons}>
            <VotingButton
              text="-4"
              isSelected={selectedVote === -4}
              onClick={() => voteForLogo(-4)}
            />
            <VotingButton
              text="-3"
              isSelected={selectedVote === -3}
              onClick={() => voteForLogo(-3)}
            />
            <VotingButton
              text="-2"
              isSelected={selectedVote === -2}
              onClick={() => voteForLogo(-2)}
            />
            <VotingButton
              text="-1"
              isSelected={selectedVote === -1}
              onClick={() => voteForLogo(-1)}
            />
          </div>
          <div className={styles.description}>Worst</div>
        </div>
        <div className={styles.subPanelRight}>
          <div className={styles.votingButtons}>
            <VotingButton
              text="+1"
              isSelected={selectedVote === 1}
              onClick={() => voteForLogo(1)}
            />
            <VotingButton
              text="+2"
              isSelected={selectedVote === 2}
              onClick={() => voteForLogo(2)}
            />
            <VotingButton
              text="+3"
              isSelected={selectedVote === 3}
              onClick={() => voteForLogo(3)}
            />
            <VotingButton
              text="+4"
              isSelected={selectedVote === 4}
              onClick={() => voteForLogo(4)}
            />
          </div>
          <div className={styles.description}>Best</div>
        </div>
      </div>
    );
  }
}

export default VotingPanel;
