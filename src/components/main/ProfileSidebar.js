import React from "react";
import "./css/InfoBar.css";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import heart from "../../icons/heart.svg";
import settings from "../../icons/settings.svg";
import mail from "../../icons/mail.svg";
import pantry from "../../icons/pantry.svg";
import { Redirect } from "react-router-dom";
import SuggestPopup from "./popUp/SuggestPopup";
import LogoutPopup from "./popUp/LogoutPopup";
import LoginPopup from "./popUp/LoginPopup";

class ProfileSidebar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentUserInfo: { isExist: false },
      email: sessionStorage.getItem("currentUser"),
      isLogin: false,
      isSetting: false
    };
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidMount() {
    let url = "http://localhost:8080/members/" + this.state.email;

    if (
      this.state.email === null ||
      this.state.email === "" ||
      this.state.email === "null"
    ) {
      url = 'http://localhost:8080/members/""';
    }

    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(profileInfo => {
        this.setState({ currentUserInfo: profileInfo });
      })
      .catch(() => {
        console.log("Failed to retrieve profile");
      });
  }

  handleBackClick() {
    this.props.setCurrentPage("");
  }

  profileButtons() {
    return (
      <div>
        <div
          className="profileOptions"
          onClick={() => {
            if (this.state.currentUserInfo.isExist) {
              this.props.setCurrentPage("favorites/");
            } else {
              document.getElementById("loginPopup").style.display =
                "inline-block";
            }
          }}
        >
          <div
            style={{
              position: "relative",
              top: "15px",
              display: "inline-flex"
            }}
          >
            <ReactSVG
              src={heart}
              style={{
                height: "25px",
                stroke: "#B1B0FD",
                fill: "#B1B0FD",
                marginLeft: "20px",
                marginRight: "38px"
              }}
            />
            Favorite Products
          </div>
        </div>

        <div
          className="profileOptions"
          onClick={() => {
            if (this.state.currentUserInfo.isExist) {
              this.props.setCurrentPage("pantry/");
            } else {
              document.getElementById("loginPopup").style.display =
                "inline-block";
            }
          }}
        >
          <div
            style={{
              position: "relative",
              top: "15px",
              display: "inline-flex"
            }}
          >
            <ReactSVG
              src={pantry}
              style={{
                height: "25px",
                stroke: "#0CC8AC",
                marginLeft: "20px",
                marginRight: "38px"
              }}
            />
            Pantries
          </div>
        </div>

        <div
          className="profileOptions"
          onClick={() => {
            if (this.state.currentUserInfo.isExist) {
              this.setState({ isSetting: true });
            } else {
              document.getElementById("loginPopup").style.display =
                "inline-block";
            }
          }}
        >
          <div
            style={{
              position: "relative",
              top: "15px",
              display: "inline-flex"
            }}
          >
            <ReactSVG
              src={settings}
              style={{
                height: "25px",

                marginLeft: "20px",
                marginRight: "38px"
              }}
            />
            Settings
          </div>
        </div>

        <div
          className="profileOptions"
          onClick={() => {
            if (this.state.currentUserInfo.isExist) {
              document.getElementById("suggest").style.display = "inline-block";
            } else {
              document.getElementById("loginPopup").style.display =
                "inline-block";
            }
          }}
        >
          <div
            style={{
              position: "relative",
              top: "15px",
              display: "inline-flex"
            }}
          >
            <ReactSVG
              src={mail}
              style={{
                height: "25px",

                marginLeft: "20px",
                marginRight: "38px"
              }}
            />
            Suggest Product
          </div>
        </div>
      </div>
    );
  }

  handleLogin = () => {
    sessionStorage.removeItem("currentUser");
    this.setState({ isLogin: true });
  };

  handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    document.getElementById("logoutPopup").style.display = "inline-block";
    this.setState({ currentUserInfo: { isExist: false } });
  };
  render() {
    // let productItems = this.props.currentMarkers.map(product => <Item key={product.id} name={product.item}/>)

    if (this.state.isLogin) {
      return <Redirect to="/login" />;
    }

    if (this.state.isSetting) {
      return <Redirect to="/settings" />;
    }
    let proButtons = this.profileButtons();

    let logButton = this.state.currentUserInfo.isExist ? (
      <button
        style={{
          height: "35px",
          width: "80px",
          borderRadius: "25px",
          color: "white",
          backgroundColor: "#7764E4",
          outline: "none"
        }}
        onClick={this.handleLogout}
      >
        Logout
      </button>
    ) : (
      <button
        style={{
          height: "35px",
          width: "80px",
          borderRadius: "25px",
          color: "white",
          backgroundColor: "#7764E4",
          outline: "none"
        }}
        onClick={this.handleLogin}
      >
        Login
      </button>
    );
    return (
      <div>
        <LoginPopup />
        <LogoutPopup />
        <SuggestPopup />
        <div className="sidebar" id="bar">
          <div>
            <div
              className="backLink"
              style={{
                display: "inline",
                marginTop: "90px"
              }}
              onClick={this.handleBackClick}
            >
              &nbsp;
            </div>
            <div
              className="backLink"
              style={{ display: "inline", marginTop: "90px" }}
              onClick={this.handleBackClick}
            >
              <div className="backStuff ">
                <ReactSVG
                  src={icon}
                  style={{
                    height: "30px",
                    transform: "rotate(90deg)",
                    marginTop: "10px"
                  }}
                />
              </div>
              Back
            </div>

            <div className=" profilePicBig "></div>
            <div
              className="head"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "fit-content"
              }}
            >
              {this.state.currentUserInfo.isExist
                ? this.state.currentUserInfo.firstName +
                  " " +
                  this.state.currentUserInfo.lastName
                : "Guest"}
            </div>
            {proButtons}
            <div
              style={{
                marginTop: "40%",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginLeft: "140px",
                  width: "fit-content",
                  marginBottom: "30px"
                }}
              >
                {logButton}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileSidebar;
