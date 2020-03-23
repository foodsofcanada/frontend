import React from "react";
import "./css/Item.css";
import { ReactSVG } from "react-svg";
import heart from "../../icons/heart.svg";
import more from "../../icons/more-vertical.svg";
import { Dropdown, DropdownButton } from "react-bootstrap";

class Item extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let moreButton = (
      <ReactSVG
        src={more}
        style={{
          height: "25px",
          stroke: "#7764E4",
          fill: "none",
          marginLeft: "25px"
        }}
      />
    );

    return (
      <div
        className=" d-flex justify-content-center"
        id={this.props.actualProduct}
        // onClick={this.handleClick}
      >
        <div className="item" id={this.props.actualProduct}>
          <div
            className="head"
            style={{
              display: "inline-block",
              color: "#7764E4",
              marginTop: "7px",
              marginBottom: "7px",
              fontSize: "25px",
              width: "30px"
            }}
            id={this.props.actualProduct}
          >
            {this.props.number}.
          </div>
          <div
            style={{
              display: "inline-block",
              color: "#7764E4",
              marginBottom: "7px",
              marginLeft: "15px",
              fontSize: "14px",
              width: "120px"
            }}
            id={this.props.actualProduct}
          >
            {this.props.name}
          </div>
          <div
            style={{
              display: "inline-block",
              color: "#8898AA",
              marginTop: "7px",
              marginBottom: "7px",
              marginLeft: "5px",
              marginRight: "20px",
              fontSize: "10px",
              textTransform: "uppercase",
              width: "30px"
            }}
            id={this.props.actualProduct}
          >
            {this.props.region}
          </div>
          <div
            id={this.props.actualProduct}
            style={{
              display: "inline-flex",
              color: "#8898AA",
              marginLeft: "10px",
              fontSize: "10px",
              position: "relative",
              top: "-4.5px"
            }}
          >
            <ReactSVG
              className="heart"
              src={heart}
              style={{
                height: "30px",
                stroke: "#7764E4"
              }}
            />
            <DropdownButton
              title={moreButton}
              style={{
                top: "-10px",
                height: "10px",
                width: "30px",
                backgroundColor: "rgba(0,0,0,0) !important",
                marginRight: "20px",
                marginLeft: "10px"
              }}
              id="dropdownB"
            >
              <Dropdown.Item as="button" style={{ color: "black" }}>
                Add to Pantry
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
