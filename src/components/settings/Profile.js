import React from "react";

import "./css/Profile.css";
import trash from "../../icons/trash-2.svg";
import { ReactSVG } from "react-svg";

//import "bootstrap/dist/css/bootstrap-theme.css";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUserInfo: { isExist: true },
      email: sessionStorage.getItem("currentUser"),
      firstName: "",
      lastName: "",
      errorMessage: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    // const {name, value, type, checked} = event.target
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    if (this.state.firstName === "" && this.state.lastName === "") {
      this.setState({
        errorMessage: "Both fields cannot be empty"
      });
      return;
    }

    if (this.state.lastName === "") {
      this.setState({ errorMessage: "Lastname field cannot be empty." });
      return;
    }

    if (this.state.firstName === "") {
      this.setState({ errorMessage: "Firstname field cannot be empty." });
      return;
    }

    if (this.state.lastName !== "" && this.state.firstName !== "") {
      let formData = JSON.stringify({
        lastname: this.state.lastName,
        firstname: this.state.firstName,
        password: ""
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
          document.getElementById("savedPopup").style.display = "inline-block";
          this.setState({ errorMessage: "" });
        })
        .catch(() => {
          this.setState({ errorMessage: "Something went wrong somewhere" });
        });
    }
  };

  componentDidMount() {
    let url = "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/members/" + this.state.email;

    if (
      this.state.email === null ||
      this.state.email === "" ||
      this.state.email === "null"
    ) {
      url = 'http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/members/""';
    }

    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(profileInfo => {
        this.setState({
          currentUserInfo: profileInfo,
          firstName: profileInfo.firstName,
          lastName: profileInfo.lastName
        });
      })
      .catch(() => {
        console.log("Failed to retrieve profile");
      });
  }
  render() {
    if (this.state.currentUserInfo.isExist === false) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="settingsContent ">
        <div className="headerProfile">Profile</div>
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          {/* <ReactSVG src={trash} style={{ height: "30px", float: "right" }} /> */}
          <div
            style={{
              width: "145px",
              height: "145px",
              background: "red",
              float: "right",
              overflow: "none",
              borderRadius: "50%"
            }}
          ></div>
        </div>
        <div
          style={{
            color: "red",
            marginTop: "20px",
            textAlign: "center"
          }}
        >
          {this.state.errorMessage}
        </div>
        <div
          style={{ width: "100%", marginTop: "50px" }}
          className="d-flex justify-content-center"
        >
          <div style={{ display: "inline-block" }}>
            <label>
              First name <br />
              <input
                type="text"
                value={this.state.firstName}
                name="firstName"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div style={{ display: "inline-block", marginLeft: "35px" }}>
            Last name <br />
            <input
              type="text"
              value={this.state.lastName}
              name="lastName"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            marginTop: "50px",
            marginLeft: "20px"
          }}
        >
          <span
            style={{ color: "#7764E4" }}
            className="changePassword"
            onClick={() => {
              document.getElementById("passwordPopup").style.display =
                "inline-block";
            }}
          >
            Change password?
          </span>
        </div>

        <div style={{ width: "100%", marginTop: "25px" }}>
          <div style={{ display: "inline-block", marginLeft: "20px" }}>
            <label>
              Language <br />
              <Form.Group controlId="formGridState">
                <Form.Control as="select">
                  <option>English</option>
                  <option>French</option>
                </Form.Control>
              </Form.Group>
            </label>
          </div>
        </div>

        <div>
          <span
            style={{ color: "#FF3D3D", marginLeft: "20px" }}
            className="deleteText"
            onClick={() => {
              document.getElementById("deletePopup").style.display =
                "inline-block";
            }}
          >
            Delete account?
          </span>

          <input
            type="submit"
            value="Save changes"
            style={{ float: "right" }}
            className="saveProfile"
            onClick={this.handleSubmit}
          ></input>
        </div>
      </div>
    );
  }
}

export default Profile;
