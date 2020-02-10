import React from "react";
import "./css/InfoBar.css";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import Item from "./Item";

class InfoBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="sidebar">
        <div>
          <div
            className="backLink"
            style={{ display: "inline", marginTop: "90px" }}
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
          <div className="profilePic"></div>
        </div>
        <div>
          <div className="head" style={{ marginBottom: "10px" }}>
            Top 10 searched products
          </div>
        </div>

        <Item />
        <Item />
      </div>
    );
  }
}

export default InfoBar;
