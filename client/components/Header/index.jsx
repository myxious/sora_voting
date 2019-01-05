import React, { PureComponent } from "react";
import { shape, number } from "prop-types";
import Sticky from "react-stickynode";
import cn from "classnames";
import styles from "./styles.module.scss";

class Header extends PureComponent {
  static propTypes = {
    user: shape({
      positive_votes: number.isRequired,
      negative_votes: number.isRequired,
    }).isRequired,
  };

  render() {
    const { user } = this.props;

    return (
      <>
        <div className={styles.headerText}>
          <h2>SORA Logo voting</h2>
        </div>
        <Sticky>
          {({ status }) => (
            <div
              className={cn({
                [styles.stickyHeader]: true,
                [styles.sticked]: status === 2,
              })}
            >
              <div className={styles.stickyHeaderInner}>
                Remaining votes
                <div className={styles.negativeVotes}>
                  {user.negative_votes > 0 ? `-${user.negative_votes}` : 0}
                </div>
                <div className={styles.positiveVotes}>
                  {user.positive_votes > 0 ? `+${user.positive_votes}` : 0}
                </div>
              </div>
            </div>
          )}
        </Sticky>
      </>
    );
  }
}

export default Header;
