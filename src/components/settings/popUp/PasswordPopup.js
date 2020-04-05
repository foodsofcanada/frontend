import React from "react";
import "./css/popUp.css";

class PasswordPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: sessionStorage.getItem("currentUser"),
      password: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      errorMessage: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    // const {name, value, type, checked} = event.target
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    if (
      this.state.newPassword === "" ||
      this.state.oldPassword === "" ||
      this.state.confirmNewPassword === ""
    ) {
      this.setState({ errorMessage: "All fields must be filled" });
      return;
    }
    if (this.state.oldPassword !== this.state.password) {
      let formData = JSON.stringify({
        email: this.state.email,
        password: this.state.oldPassword
      });

      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {})
        .catch(() => {
          this.setState({ errorMessage: "Current password is wrong" });
          return;
        });
    }

    if (this.state.newPassword !== this.state.confirmNewPassword) {
      this.setState({ errorMessage: "The new passwords do not match" });
      return;
    }
    if (
      this.state.newPassword !== "" &&
      this.state.oldPassword !== "" &&
      this.state.confirmNewPassword !== ""
    ) {
      let formData = JSON.stringify({
        lastname: "",
        firstname: "",
        password: this.state.newPassword
      });
      fetch("http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/members/" + this.state.email, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ password: data.password });
          this.setState({ errorMessage: "Password has been changed!" });
        })
        .catch(() => {
          this.setState({ errorMessage: "Something went wrong somewhere" });
        });
    }
  };

  render() {
    return (
      <div
        id="passwordPopup"
        className="password"
        onClick={event => {
          if (event.target.id === "passwordPopup") {
            document.getElementById("passwordPopup").style.display = "none";
            this.setState({
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: "",
              errorMessage: ""
            });
          }
        }}
      >
        <div className="passwordBox">
          <div style={{ marginBottom: "47px" }}>
            <div
              style={{
                display: "inline-block",
                lineHeight: "40px",
                fontSize: "18px"
              }}
            >
              Change Password
            </div>

            <div
              style={{ display: "inline-block", float: "right" }}
              className="cancelButton"
              onClick={() => {
                document.getElementById("passwordPopup").style.display = "none";
                this.setState({
                  oldPassword: "",
                  newPassword: "",
                  confirmNewPassword: "",
                  errorMessage: ""
                });
              }}
            >
              Cancel
            </div>
            <div
              className="passwordButton"
              style={{ display: "inline-block", float: "right" }}
              onClick={this.handleSubmit}
            >
              Save Changes
            </div>
          </div>
          <div>
            <label className="label">
              <span>Current Password</span> &nbsp;
              <br />
              <input
                type="password"
                className="textBoxes"
                name="oldPassword"
                value={this.state.oldPassword}
                onChange={this.handleChange}
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)",
                  marginBottom: "20px",
                  marginRight: "50px"
                }}
              />
            </label>
            {this.state.errorMessage !== "Password has been changed!" ? (
              <span style={{ color: "red" }}>{this.state.errorMessage}</span>
            ) : (
                <span style={{ color: "rgb(105, 230, 105)" }}>
                  {this.state.errorMessage}
                </span>
              )}
            <br />
            <label className="label">
              <span>New Password</span> &nbsp;
              <br />
              <input
                type="password"
                className="textBoxes"
                name="newPassword"
                onChange={this.handleChange}
                value={this.state.newPassword}
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)",
                  marginBottom: "20px",
                  marginRight: "50px"
                }}
              />
            </label>
            <label className="label">
              <span>Confirm new Password</span> &nbsp;
              <br />
              <input
                type="password"
                className="textBoxes"
                name="confirmNewPassword"
                onChange={this.handleChange}
                value={this.state.confirmNewPassword}
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)",
                  marginBottom: "20px"
                }}
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordPopup;
