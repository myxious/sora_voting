import React, { PureComponent } from "react";
import VotingButton from "../VotingButton";
import styles from "./styles.module.scss";

class VotingPanel extends PureComponent {
  render() {
    return (
      <div className={styles.votingPanel}>
        <div className={styles.subPanelLeft}>
          <div className={styles.votingButtons}>
            <VotingButton text="-4" />
            <VotingButton text="-3" />
            <VotingButton text="-2" />
            <VotingButton text="-1" />
          </div>
          <div className={styles.description}>Worst</div>
        </div>
        <div className={styles.subPanelRight}>
          <div className={styles.votingButtons}>
            <VotingButton text="+1" />
            <VotingButton text="+2" />
            <VotingButton text="+3" />
            <VotingButton text="+4" />
          </div>
          <div className={styles.description}>Best</div>
        </div>
      </div>
    );
  }
}

export default VotingPanel;
