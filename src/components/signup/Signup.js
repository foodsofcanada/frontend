import React from "react";
import "./css/Signup.css";
import { Redirect, Link } from "react-router-dom";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      errorMessage: " "
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    // const {name, value, type, checked} = event.target
    document.getElementById(name).style.border = "";
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var re = new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    );

    if (this.state.firstName === "") {
      document.getElementById("firstName").style.border = " 1px solid red";
    }
    if (this.state.lastName === "") {
      document.getElementById("lastName").style.border = " 1px solid red";
    }
    if (this.state.email === "") {
      document.getElementById("email").style.border = " 1px solid red";
    }
    if (this.state.password === "") {
      document.getElementById("password").style.border = " 1px solid red";
    }
    if (this.state.confirmPassword === "") {
      document.getElementById("confirmPassword").style.border =
        " 1px solid red";
    }
    if (
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      this.setState({ errorMessage: "Are you missing something buddy?" });
      return;
    }

    if (!re.test(this.state.email)) {
      document.getElementById("email").style.border = " 1px solid red";
      this.setState({ errorMessage: "Does that look like an email to you?" });
      return;
    }

    if (this.state.confirmPassword !== this.state.password) {
      document.getElementById("confirmPassword").style.border =
        " 1px solid red";
      this.setState({ errorMessage: "Passwords do not match try again" });
      return;
    }

    if (
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.confirmPassword !== ""
    ) {
      document.getElementById("firstName").style.border = "";
      document.getElementById("lastName").style.border = "";
      document.getElementById("email").style.border = "";
      document.getElementById("password").style.border = "";
      document.getElementById("confirmPassword").style.border = "";

      let formData = JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstName,
        lastname: this.state.lastName
      });

      fetch("http://localhost:8080/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data === true) {
            this.setState({
              errorMessage:
                "Account has been created, Please Click Login button."
            });
          } else {
            this.setState({ errorMessage: "Account already exists" });
          }
        })
        .catch(() => {
          this.setState({ errorMessage: "Something went wrong." });
        });
      return;
    }
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: "100vh",
            width: "70%",
            backgroundColor: "white",
            display: "inline"
          }}
          className="d-flex justify-content-center"
        >
          <div className="loginBox d-block justify-content-center">
            <div
              className="head d-flex justify-content-center"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              Create an account
            </div>
            {this.state.errorMessage ===
            "Account has been created, Please Click Login button." ? (
              <div
                className="d-flex justify-content-center"
                style={{
                  width: "100%",
                  color: "rgb(105, 230, 105)",
                  marginBottom: "20px"
                }}
              >
                {this.state.errorMessage}
              </div>
            ) : (
              <div
                className="d-flex justify-content-center"
                style={{
                  width: "100%",
                  color: "red",
                  marginBottom: "20px"
                }}
              >
                {this.state.errorMessage}
              </div>
            )}

            <div
              style={{
                width: "100%"
              }}
              className="d-flex justify-content-center"
            >
              <form onSubmit={this.handleSubmit}>
                <label className="label">
                  <span className="textboxLabels">First Name</span> &nbsp;
                  <br />
                  <input
                    type="text"
                    style={{
                      borderStyle: "solid",
                      backgroundColor: "rgb(244,248,247)",
                      marginBottom: "20px",
                      width: "160px",
                      marginRight: "60px"
                    }}
                    className="nameBoxes"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    id="firstName"
                  />
                </label>

                <label className="label">
                  <span className="textboxLabels">Last Name</span> &nbsp;
                  <br />
                  <input
                    type="text"
                    style={{
                      borderStyle: "solid",
                      backgroundColor: "rgb(244,248,247)",
                      marginBottom: "20px",
                      width: "160px"
                    }}
                    className="nameBoxes"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    id="lastName"
                  />
                </label>
                <br />
                <label className="label">
                  <span className="textboxLabels">Email</span> &nbsp;
                  <br />
                  <input
                    type="text"
                    style={{
                      borderStyle: "solid",
                      backgroundColor: "rgb(244,248,247)",
                      marginBottom: "20px"
                    }}
                    className="textbox"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    id="email"
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
                      marginBottom: "20px"
                    }}
                    name="password"
                    className="textbox"
                    value={this.state.password}
                    onChange={this.handleChange}
                    id="password"
                  />
                </label>
                <br />
                <label className="label">
                  <span className="textboxLabels">Confirm Password</span> &nbsp;
                  <br />
                  <input
                    type="password"
                    style={{
                      borderStyle: "solid",
                      backgroundColor: "rgb(244,248,247)",
                      marginBottom: "20px"
                    }}
                    name="confirmPassword"
                    className="textbox"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    id="confirmPassword"
                  />
                </label>
                <div>
                  <input
                    type="submit"
                    value="Create an Account"
                    className="registerAccountButton"
                  />
                  &nbsp;
                  <Link to="/login">
                    <button className="loginPageButton">Login</button>
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
            display: "inline"
          }}
          className="d-flex justify-content-center"
        ></div>
      </div>
    );
  }
}

export default LoginPage;
