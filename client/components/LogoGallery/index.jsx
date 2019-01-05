import React, { PureComponent } from "react";
import { func, arrayOf, shape, string, number } from "prop-types";
import cn from "classnames";
import LogoCard from "../LogoCard";
import Spinner from "../Spinner";
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
    voteForLogo: func.isRequired,
  };

  state = {
    isLoading: false,
  };

  componentDidMount() {
    const { fetchLogoList } = this.props;
    fetchLogoList();
  }

  voteForLogo = async (...args) => {
    const { voteForLogo } = this.props;
    this.setState({ isLoading: true });
    await voteForLogo(...args);
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;
    const { logoList } = this.props;

    return (
      <div className={styles.wrapper}>
        <Spinner isActive={isLoading} className={styles.spinner} />
        <div className={styles.gallery}>
          {logoList.map(logo => (
            <LogoCard
              key={logo.name}
              title={logo.name}
              image={logo.image_name}
              selectedVote={logo.positive_vote || -logo.negative_vote}
              voteForLogo={this.voteForLogo}
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
  voteForLogo: actions.voteForLogo,
});

export default subscribe(mapStateToProps, mapActionsToProps)(LogoGallery);
