import React, { PureComponent } from "react";
import cn from "classnames";
import { string, func, bool } from "prop-types";
import styles from "./styles.module.scss";

class VotingButton extends PureComponent {
  static propTypes = {
    text: string,
    onClick: func.isRequired,
    isSelected: bool,
  };

  static defaultProps = {
    text: "0",
    isSelected: false,
  };

  render() {
    const { text, onClick, isSelected } = this.props;

    return (
      <button
        type="button"
        className={cn({
          [styles.button]: true,
          [styles.selected]: isSelected,
          [styles.positive]: Number(text) > 0,
          [styles.negative]: Number(text) < 0,
        })}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
}

export default VotingButton;
