import React, { PureComponent } from "react";
import { func, arrayOf, shape, string, number } from "prop-types";
import LogoCard from "../LogoCard";
import Spinner from "../Spinner";
import ImageViewer from "../ImageViewer";
import { subscribe } from "../../store";
import styles from "./styles.module.scss";

const noImagePath = "/static/media/default-image.png";

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
    cancelVote: func.isRequired,
  };

  state = {
    isLoading: false,
    selectedImage: "",
    isImageOpened: false,
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

  cancelVote = async (...args) => {
    const { cancelVote } = this.props;
    this.setState({ isLoading: true });
    await cancelVote(...args);
    this.setState({ isLoading: false });
  };

  onOpenImage = image => {
    this.setState({
      selectedImage: image,
      isImageOpened: true,
    });
  };

  onCloseImage = () => {
    this.setState({ selectedImage: "", isImageOpened: false });
  };

  render() {
    const { isLoading, selectedImage, isImageOpened } = this.state;
    const { logoList } = this.props;

    return (
      <div className={styles.wrapper}>
        <Spinner isActive={isLoading} className={styles.spinner} />
        <div className={styles.gallery}>
          {logoList.map(logo => (
            <LogoCard
              key={logo.name}
              title={logo.name}
              image={
                logo.image_name
                  ? `/static/media/${logo.image_name}`
                  : noImagePath
              }
              selectedVote={logo.positive_vote || -logo.negative_vote}
              voteForLogo={this.voteForLogo}
              cancelVote={this.cancelVote}
              onOpenImage={this.onOpenImage}
            />
          ))}
        </div>
        <ImageViewer
          image={selectedImage}
          isActive={isImageOpened}
          onCloseImage={this.onCloseImage}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ logoList }) => ({
  logoList,
});

const mapActionsToProps = ({ fetchLogoList, voteForLogo, cancelVote }) => ({
  fetchLogoList,
  voteForLogo,
  cancelVote,
});

export default subscribe(mapStateToProps, mapActionsToProps)(LogoGallery);
