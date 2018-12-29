import React, { PureComponent } from "react";
import LogoCard from "../LogoCard";
import styles from "./styles.module.scss";

class LogoGallery extends PureComponent {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.gallery}>
          <LogoCard
            title="Version A"
            image="https://placeimg.com/800/450/nature"
          />
          <LogoCard title="Version B" />
        </div>
      </div>
    );
  }
}

export default LogoGallery;
