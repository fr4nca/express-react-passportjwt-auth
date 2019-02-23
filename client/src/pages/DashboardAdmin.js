import React, { Component } from "react";

import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

export class Dashboard extends Component {
  logoutUser = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        DASHBOARD ADMIN PORRA <button onClick={this.logoutUser}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
