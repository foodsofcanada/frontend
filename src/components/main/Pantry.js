import React from "react";
import "./css/Item.css";
import { ReactSVG } from "react-svg";
// import heart from "../../icons/heart.svg";
import more from "../../icons/more-vertical.svg";
import { Dropdown, DropdownButton } from "react-bootstrap";

class Pantry extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let moreButton = (
      <ReactSVG
        src={more}
        style={{
          height: "25px",
          stroke: "#0CC8AC",
          fill: "none",
          marginLeft: "25px"
        }}
      />
    );

    return (
      <div className="profileOptions" id="1">
        <div
          id="1"
          style={{
            position: "relative",
            top: "15px",
            display: "inline-flex"
          }}
        >
          <span
            id="1"
            style={{
              backgroundColor: "#0CC8AC",
              width: "43px",
              height: "40px",
              borderRadius: "5px",
              marginLeft: "20px",
              marginRight: "38px",

              top: "-7px",
              position: "relative"
            }}
          ></span>
          {this.props.name}

          <div
            id="1"
            style={{
              display: "inline-flex",
              color: "#8898AA",
              marginLeft: "100px",
              fontSize: "10px",
              position: "relative",
              top: "-3.8px",
              float: "left"
            }}
          >
            <DropdownButton
              title={moreButton}
              style={{
                top: "-4.5px",
                height: "10px",
                width: "30px",
                backgroundCo7lor: "rgba(0,0,0,0) !important",
                marginRight: "20px",
                marginLeft: "10px"
              }}
              id="dropdownB"
            >
              <Dropdown.Item as="button">Delete Pantry</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Pantry;
