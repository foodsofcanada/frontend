import React from "react";
import "./css/InfoBar.css";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import Item from "./Item";
import Pantry from "./Pantry";

import { Spinner, Dropdown, DropdownButton } from "react-bootstrap";

class PantriesBar extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleBackClick() {
    this.props.setCurrentPage("profile/");
  }

  handlePantryClick = event => {
    if (!isNaN(event.target.id) && event.target.id !== "") {
      this.props.setCurrentPage("pantryInfo/" + event.target.id);
    }
  };

  newPantryButton() {
    return (
      <div className="profileOptions">
        <div
          style={{
            position: "relative",
            top: "15px",
            display: "inline-flex"
          }}
        >
          <div style={{ color: "#0CC8AC" }} className="plus">
            +
          </div>
          Add a Pantry
        </div>
      </div>
    );
  }

  render() {
    let newPantryButton = this.newPantryButton();

    // let productItems = this.props.currentMarkers.map(product => <Item key={product.id} name={product.item}/>)
    return (
      <div className="sidebar" id="bar">
        <div>
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
        </div>
        <div>
          <div className="head" style={{ marginBottom: "10px" }}>
            Pantries
          </div>
        </div>

        {newPantryButton}
        <div onClick={this.handlePantryClick} style={{ marginBottom: "15px" }}>
          <Pantry name="Poutine" />
        </div>
      </div>
    );
  }
}

export default PantriesBar;
