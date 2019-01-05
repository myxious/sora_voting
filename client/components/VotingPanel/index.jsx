import React, { PureComponent } from "react";
import { func, number } from "prop-types";
import VotingButton from "../VotingButton";
import styles from "./styles.module.scss";

class VotingPanel extends PureComponent {
  static propTypes = {
    selectedVote: number,
    voteForLogo: func.isRequired,
    cancelVote: func.isRequired,
  };

  static defaultProps = {
    selectedVote: null,
  };

  buttonRender = buttonValue => {
    const { selectedVote, voteForLogo, cancelVote } = this.props;
    const isSelected = buttonValue === selectedVote;
    const onClick = isSelected ? cancelVote : () => voteForLogo(buttonValue);

    return (
      <VotingButton
        key={buttonValue}
        text={buttonValue < 0 ? buttonValue.toString() : `+${buttonValue}`}
        isSelected={isSelected}
        onClick={onClick}
      />
    );
  };

  render() {
    return (
      <div className={styles.votingPanel}>
        <div className={styles.subPanelLeft}>
          <div className={styles.votingButtons}>
            {[-4, -3, -2, -1].map(this.buttonRender)}
          </div>
          <div className={styles.description}>Worst</div>
        </div>
        <div className={styles.subPanelRight}>
          <div className={styles.votingButtons}>
            {[1, 2, 3, 4].map(this.buttonRender)}
          </div>
          <div className={styles.description}>Best</div>
        </div>
      </div>
    );
  }
}

export default VotingPanel;
