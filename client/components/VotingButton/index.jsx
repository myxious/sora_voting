import React, { PureComponent } from "react";
import { string } from "prop-types";
import styles from "./styles.module.scss";

class VotingButton extends PureComponent {
  static propTypes = {
    text: string,
  };

  static defaultProps = {
    text: "0",
  };

  render() {
    const { text } = this.props;

    return (
      <button type="button" className={styles.button}>
        {text}
      </button>
    );
  }
}

export default VotingButton;
