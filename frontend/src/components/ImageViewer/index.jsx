import React, { PureComponent } from "react";
import { createPortal } from "react-dom";
import { string, bool, func } from "prop-types";
import cn from "classnames";
import styles from "./styles.module.scss";

class ImageViewer extends PureComponent {
  static propTypes = {
    image: string.isRequired,
    isActive: bool,
    onCloseImage: func.isRequired,
  };

  static defaultProps = {
    isActive: false,
  };

  constructor(props) {
    super(props);
    const viewerNode = document.createElement("div");
    viewerNode.setAttribute("id", "image-viewer");
    document.body.appendChild(viewerNode);
    this.viewerNode = viewerNode;
  }

  componentDidUpdate() {
    const { isActive } = this.props;
    const root = document.getElementById("root");
    if (isActive) {
      root.classList.add(styles.rootBlured);
    } else {
      root.classList.remove(styles.rootBlured);
    }
  }

  // TODO: add pop-up and pop-out animations with ReactTransitionGroup
  render() {
    const { image, isActive, onCloseImage } = this.props;
    const imageViewer = (
      <div
        className={cn({ [styles.wrapper]: true, [styles.isActive]: isActive })}
      >
        <div className={styles.content}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onCloseImage}
          >
            x
          </button>
          <img src={image} alt="" />
        </div>
      </div>
    );

    return createPortal(imageViewer, this.viewerNode);
  }
}

export default ImageViewer;
