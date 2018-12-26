import React, { PureComponent } from "react";
import LogoCard from "../LogoCard";
import styles from "./styles.module.scss";

class LogoGallery extends PureComponent {
  render() {
    return (
      <div className={styles.gallery}>
        <LogoCard title="Version A" />
        <LogoCard title="Version B" />
      </div>
    );
  }
}

export default LogoGallery;
