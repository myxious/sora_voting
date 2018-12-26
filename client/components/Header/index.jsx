import React, { PureComponent } from "react";
import { Header as SemanticHeader, Sticky } from "semantic-ui-react";
import cn from "classnames";
import styles from "./styles.module.scss";

class Header extends PureComponent {
  state = {
    sticky: false,
  };

  onStick = () => this.setState({ sticky: true });

  onUnstick = () => this.setState({ sticky: false });

  render() {
    const { sticky } = this.state;
    return (
      <div className={styles.header}>
        <SemanticHeader
          as="h2"
          className={cn(styles.headerText, styles.padding)}
        >
          SORA Logo voting
        </SemanticHeader>
        <div className={styles.stickyPlaceholder}>
          <Sticky onStick={this.onStick} onUnstick={this.onUnstick}>
            <div
              className={cn({
                [styles.stickyHeader]: true,
                [styles.padding]: true,
                [styles.sticked]: sticky,
              })}
            >
              <span>Remaining votes</span>
            </div>
          </Sticky>
        </div>
      </div>
    );
  }
}

export default Header;
