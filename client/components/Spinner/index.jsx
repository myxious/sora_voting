import React from "react";
import cn from "classnames";
import { bool, string } from "prop-types";
import styles from "./styles.module.scss";

// It takes classNames from the main html file
function Spinner({ isActive, className }) {
  return (
    <div
      className={cn("spinner-wrapper", className, {
        [styles.disabled]: !isActive,
      })}
    >
      <div className="spinner" />
    </div>
  );
}

Spinner.propTypes = {
  isActive: bool,
  className: string,
};

Spinner.defaultProps = {
  isActive: true,
  className: undefined,
};

export default Spinner;
