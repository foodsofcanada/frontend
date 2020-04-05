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
      <div className="profileOptions" id={this.props.id}>
        <div
          id={this.props.id}
          style={{
            position: "relative",
            top: "15px",
            display: "inline-flex"
          }}
        >
          <span
            id={this.props.id}
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
          <div
            id={this.props.id}
            style={{
              width: "100px",
              height: "40px",
              marginLeft: "20px",
              display: "inline-block"
            }}
          >
            {this.props.name}
          </div>
          <div
            id={this.props.id}
            style={{
              display: "inline-flex",
              color: "#8898AA",
              marginLeft: "45px",
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
                backgroundColor: "rgba(0,0,0,0) !important",
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
