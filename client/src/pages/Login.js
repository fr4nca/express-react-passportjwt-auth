import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(next) {
    if (next.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    this.props.loginUser(user);
  };

  render() {
    return (
      <div id="form">
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">senha</label>
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
