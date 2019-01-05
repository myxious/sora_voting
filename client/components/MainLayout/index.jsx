import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { object, shape, number } from "prop-types";
import LogoGallery from "../LogoGallery";
import Header from "../Header";
import Spinner from "../Spinner";
import { subscribe } from "../../store";

class MainLayout extends PureComponent {
  static propTypes = {
    user: shape({
      positive_votes: number.isRequired,
      negative_votes: number.isRequired,
    }),
    history: object.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  state = {
    isPreloading: true,
  };

  componentWillMount() {
    const { user, history } = this.props;

    const invite = localStorage.getItem("auth");
    if (invite && !user) {
      this.fetchUser();
    } else if (!user) {
      history.replace("/login");
    } else {
      this.setState({ isPreloading: false });
    }
  }

  fetchUser = async invite => {
    const { fetchUserData } = this.props;

    await fetchUserData(invite);
    this.setState({ isPreloading: false });
  };

  render() {
    const { isPreloading } = this.state;
    const { user } = this.props;

    if (isPreloading) {
      return <Spinner />;
    }

    return (
      <>
        <Header user={user} />
        <LogoGallery />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionsToProps = actions => ({
  fetchUserData: actions.fetchUserData,
});

export default subscribe(mapStateToProps, mapActionsToProps)(
  withRouter(MainLayout),
);
