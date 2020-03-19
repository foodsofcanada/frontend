import React from "react";
import "./css/InfoBar.css";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import Item from "./Item";

import { Spinner } from "react-bootstrap";

class InfoBar extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleBackClick() {
    window.location.reload();
  }

  handleButtonClick = event => {
    if (!isNaN(event.target.id) && event.target.id !== "") {
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
            id={product.prod_id}
          >
            <Item
              number={number}
              key={number}
              name={product.name}
              region={product.regionName}
              actualProduct={product.prod_id}
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
          {this.props.header === null ? (
            <div
              className="backLink"
              style={{ display: "inline", marginTop: "90px" }}
              onClick={this.handleBackClick}
            >
              &nbsp;
            </div>
          ) : (
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
          )}

          <div className="profilePic"></div>
        </div>
        <div>
          <div className="head" style={{ marginBottom: "10px" }}>
            {this.props.header === null
              ? "Top 10 searched products"
              : "Products in " + this.props.header + " Region"}
          </div>
        </div>

        {productItems}
      </div>
    );
  }
}

export default InfoBar;
