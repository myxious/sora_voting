import React, { PureComponent } from "react";
import { func, arrayOf, shape, string, number } from "prop-types";
import LogoCard from "../LogoCard";
import { subscribe } from "../../store";
import styles from "./styles.module.scss";

class LogoGallery extends PureComponent {
  static propTypes = {
    logoList: arrayOf(
      shape({
        name: string.isRequired,
        image_name: string,
        positive_vote: number,
        negative_vote: number,
      }),
    ).isRequired,
    fetchLogoList: func.isRequired,
  };

  componentDidMount() {
    const { fetchLogoList } = this.props;
    fetchLogoList();
  }

  render() {
    const { logoList } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.gallery}>
          {logoList.map(logo => (
            <LogoCard
              key={logo.name}
              title={logo.name}
              image={logo.image_name}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logoList: state.logoList,
});

const mapActionsToProps = actions => ({
  fetchLogoList: actions.fetchLogoList,
});

export default subscribe(mapStateToProps, mapActionsToProps)(LogoGallery);
