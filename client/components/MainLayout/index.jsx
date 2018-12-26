import React, { Component } from "react";
import LogoGallery from "../LogoGallery";
import Header from "../Header";
import styles from "./styles.module.scss";

class MainLayout extends Component {
  render() {
    return (
      <>
        <Header />
        <div className={styles.main}>
          <LogoGallery />
        </div>
      </>
    );
  }
}

export default MainLayout;
