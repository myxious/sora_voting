import React, { PureComponent } from "react";
import { Button } from "semantic-ui-react";
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
      <Button circular className={styles.button}>
        {text}
      </Button>
    );
  }
}

export default VotingButton;
