import React from "react";
import "./css/NavBarItem.css";

import { ReactSVG } from "react-svg";

function NavBarItem(props) {
  if (props.isActive === props.id) {
    return (
      <button
        id={props.id}
        style={{ color: props.color, backgroundColor: "#F6F9FC" }}
        onClick={props.onClick}
        className="navbutton"
      >
        <div className="test">
          <div style={{ display: "inline-block", marginRight: "15px" }}>
            <ReactSVG
              src={props.image}
              style={{ height: "30px", fill: "none", stroke: props.color }}
            />
          </div>
          {props.text}
        </div>
      </button>
    );
  } else {
    return (
      <button
        id={props.id}
        className="navbutton"
        onClick={props.onClick}
        style={{ color: props.color }}
      >
        <div className="test">
          <div style={{ display: "inline-block", marginRight: "15px" }}>
            <ReactSVG
              src={props.image}
              style={{ height: "30px", fill: "none", stroke: props.color }}
            />
          </div>
          {props.text}
        </div>
      </button>
    );
  }
}

export default NavBarItem;
