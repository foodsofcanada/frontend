import React from "react";
import "./css/InfoBar.css";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import Item from "./Item";

import { Spinner } from "react-bootstrap";
import Pantry from "./Pantry";

class PantryInfo extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleBackClick() {
    this.props.setCurrentPage("pantry/");
  }

  handleButtonClick = event => {
    if (!isNaN(event.target.id) && event.target.id !== "") {
      this.props.setPrevPage(this.props.currentPage);
      this.props.setCurrentPage("products/" + event.target.id);
    }
  };

  render() {
    let productItems = null;
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
      productItems = this.props.currentMarkers.map(product => {
        number = number + 1;

        return (
          <div
            onClick={this.handleButtonClick}
            key={number}
            id={product.productId}
          >
            <Item
              number={number}
              key={number}
              name={product.name}
              region={product.region}
              actualProduct={product.productId}
              currPage={this.props.setCurrentPage}
            />
          </div>
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
          <div className="editPantryButton">Edit Pantry</div>
        </div>

        <div
          style={{
            marginTop: "50px",
            marginLeft: "15px",
            marginRight: "15px",
            height: "110px",
            display: "flex"
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              width: "30%",
              height: "96px",
              display: "inline-block",
              backgroundColor: "#0CC8AC",
              borderRadius: "5px",
              marginRight: "10px"
            }}
          >
            &nbsp;
          </div>
          <div
            className="titlePlate"
            style={{
              marginBottom: "10px",
              width: "60%",
              display: "inline-block",
              padding: "0px 0px 0px 0px",
              overflowX: "hidden"
            }}
          >
            <div className="head2" style={{}}>
              My Special Tools
            </div>
            <div style={{}}>Jane Doe</div>
          </div>
        </div>

        <div
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            marginLeft: "20px",
            marginRight: "13px",
            fontSize: "14.5px",
            overflowX: "hidden"
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus
          urna duis convallis convallis tellus.
        </div>

        <div style={{ marginBottom: "15px" }}>{productItems}</div>
      </div>
    );
  }
}

export default PantryInfo;
