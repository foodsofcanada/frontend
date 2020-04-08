import React from "react";
import "./css/login.css";
import { Redirect, Link } from "react-router-dom";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMessage: " ",
      sessionValue: sessionStorage.getItem("currentUser"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    // const {name, value, type, checked} = event.target
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.email === "" && this.state.password === "") {
      this.setState({
        errorMessage: "Both email and password fields cannot be empty.",
      });
      return;
    }

    if (this.state.email === "") {
      this.setState({ errorMessage: "Email field cannot be empty." });
      return;
    }

    if (this.state.password === "") {
      this.setState({ errorMessage: "Password field cannot be empty." });
      return;
    }

    if (this.state.email !== "" && this.state.password !== "") {
      let formData = JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      });

      fetch(
        "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          this.setState({ errorMessage: "" });
          sessionStorage.setItem("currentUser", data.email);
          this.setState({
            sessionValue: sessionStorage.getItem("currentUser"),
          });
        })
        .catch(() => {
          this.setState({ errorMessage: "Incorrect email or password." });
        });
      return;
    }
  }

  render() {
    if (
      this.state.sessionValue !== "" &&
      this.state.sessionValue !== null &&
      this.state.sessionValue !== "null"
    ) {
      return <Redirect to="/" />;
    } else {
      return (
        <div style={{ display: "flex" }}>
          <div
            style={{
              height: "100vh",
              width: "70%",
              backgroundColor: "white",
              display: "inline",
            }}
            className="d-flex justify-content-center"
          >
            <div className="loginBox d-block justify-content-center">
              <div
                className="head d-flex justify-content-center"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                Log in to Foods of Canada
              </div>
              <div
                className="d-flex justify-content-center"
                style={{
                  width: "100%",
                  color: "red",
                  marginBottom: "20px",
                }}
              >
                {this.state.errorMessage}
              </div>
              <div
                style={{
                  width: "100%",
                }}
                className="d-flex justify-content-center"
              >
                <form onSubmit={this.handleSubmit}>
                  <label className="label">
                    <span className="textboxLabels">Email</span> &nbsp;
                    <br />
                    <input
                      type="text"
                      style={{
                        borderStyle: "solid",
                        backgroundColor: "rgb(244,248,247)",
                        marginBottom: "20px",
                      }}
                      className="textbox"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </label>
                  <br />
                  <label className="label">
                    <span className="textboxLabels">Password</span> &nbsp;
                    <br />
                    <input
                      type="password"
                      style={{
                        borderStyle: "solid",
                        backgroundColor: "rgb(244,248,247)",
                        marginBottom: "20px",
                      }}
                      name="password"
                      className="textbox"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </label>

                  <div>
                    <input
                      type="submit"
                      value="Login"
                      className="loginButton"
                    />
                    &nbsp;
                    <Link to="/register">
                      <button className="createAccountButton">
                        Create an Account
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "100vh",
              width: "30%",
              backgroundColor: "#8574e7",
              display: "inline",
              textAlign: "center",
              color: "white",
            }}
          >
            <div className="head" style={{ color: "white", marginTop: "50%" }}>
              Welcome to foods of canada
            </div>
            <br />
            <div>Don't want to create an account? You could: </div>
            <Link to="/">
              <button className="continueAsGuestButton">
                Continue As a Guest
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default LoginPage;
