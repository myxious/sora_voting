/* eslint-disable react/prop-types */
import React, { PureComponent } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import info from "./svg/info.svg";
import success from "./svg/success.svg";
import error from "./svg/error.svg";

class AlertTemplate extends PureComponent {
  render() {
    const { style, options, message, close } = this.props;
    const imgSrc = {
      info,
      success,
      error,
    }[options.type];

    return (
      <div
        style={style}
        className={cn({
          [styles.info]: options.type === "info",
          [styles.success]: options.type === "success",
          [styles.error]: options.type === "error",
        })}
      >
        <img src={imgSrc} alt="" width={30} height={30} />
        {message}
        <button type="button" onClick={close}>
          close
        </button>
      </div>
    );
  }
}

export default AlertTemplate;
