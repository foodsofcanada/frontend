import React from "react";
import "./css/InfoBar.css";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import heart from "../../icons/heart.svg";
import settings from "../../icons/settings.svg";
import mail from "../../icons/mail.svg";
import pantry from "../../icons/pantry.svg";
import { Link } from "react-router-dom";

class ProfileSidebar extends React.Component {
  constructor(props) {
    super();
    this.state = { activeTab: "1" };
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleBackClick() {
    window.location.reload();
  }

  handleTabClick(event) {
    this.setState({ activeTab: event.currentTarget.id });
  }

  profileButtons() {
    return (
      <div>
        <div className="profileOptions">
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

        <div className="profileOptions">
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
        <Link to="/settings/" style={{ textDecoration: "none" }}>
          <div className="profileOptions">
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
        </Link>
        <div className="profileOptions">
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

  render() {
    // let productItems = this.props.currentMarkers.map(product => <Item key={product.id} name={product.item}/>)
    let proButtons = this.profileButtons();
    return (
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
            Jane Doe
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
              <button
                style={{
                  height: "35px",
                  width: "80px",
                  borderRadius: "25px",
                  color: "white",
                  backgroundColor: "#7764E4",
                  outline: "none"
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileSidebar;
