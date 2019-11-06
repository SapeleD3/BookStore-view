import React from "react";
import "../Home/styles.scss";

//redux
import { connect } from "react-redux";
import { getUser } from "../../Redux/actions/userAction";

class Dashboard extends React.Component {

  render() {
    const {
      user: { userData }
    } = this.props;
    return (
      <div className="welcome text-center">
        <div>
          <h3 className="greet">Welcome {userData.name}</h3>
          <p>Welcome to StoryBooks 1.0.0</p>
          <p>
            Post stories from the best and worst of your life and choose for
            them to be read by the world or completley private as your own
            personal diary
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  getUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Dashboard);
