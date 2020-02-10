import React from "react";
import "./css/NavBar.css";
//import back from "./chevron-down.svg";
import NavBarItem from "./NavBarItem";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import profile from "../../icons/user.svg";
import help from "../../icons/help-circle.svg";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      activeId: "1",
      currentPage: "productInfo:1"
    };
  }

  handleClick() {
    alert("Hello");
  }

  handleButtonClick(event) {
    console.log(event.currentTarget);
    this.setState({ activeId: event.currentTarget.id });
  }

  render() {
    return (
      <div className="NavBar">
        <div className="header">
          <Link to="/">
            <span className="backLink">
              <div className="backStuff">
                <ReactSVG
                  src={icon}
                  style={{ height: "30px", transform: "rotate(90deg)" }}
                />
              </div>
              Jane Doe
            </span>
          </Link>
          <br />
          <span className="head">Settings</span>
        </div>
        <div className="buttonLinks">
          <Link to="/settings">
            <NavBarItem
              onClick={this.handleButtonClick}
              image={profile}
              color="#3ED5F1"
              text="Profile"
              id="1"
              isActive={this.state.activeId}
            ></NavBarItem>
          </Link>
        </div>
        <div className="buttonLinks">
          <Link to="/settings/about">
            <NavBarItem
              onClick={this.handleButtonClick}
              image={help}
              color="#8898AA"
              text="About foods of Canada"
              id="2"
              isActive={this.state.activeId}
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
