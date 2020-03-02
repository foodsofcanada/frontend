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
    window.location.reload();
  }

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
    let productItems = null;
    let newPantryButton = this.newPantryButton();
    let number = 0;
    if (this.props.currentMarkers.length === 0) {
      productItems = (
        <div
          style={{
            marginLeft: "40%",
            marginTop: "50%"
          }}
        >
          &nbsp;&nbsp;&nbsp;
          <Spinner animation="grow" variant="primary" />
          <br />
          Loading...
        </div>
      );
    } else {
      productItems = this.props.currentMarkers.map(function(product) {
        number = number + 1;
        return (
          <Item
            number={number}
            key={number}
            name={product.information.name}
            region={product.information.region}
          />
        );
      });
    }

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
        <Pantry name="Poutine" />
      </div>
    );
  }
}

export default PantriesBar;
