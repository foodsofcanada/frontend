import React from "react";
import "./css/InfoBar.css";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import Item from "./Item";

import { Spinner } from "react-bootstrap";
import LoginPopup from "./popUp/LoginPopup";

class InfoBar extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleBackClick() {
    window.location.reload();
  }

  handleProfileClick = event => {
    this.props.setCurrentPage("profile/");
  };

  handleButtonClick = event => {
    if (!isNaN(event.target.id) && event.target.id !== "") {
      this.props.setPrevPage(this.props.currentPage);
      this.props.setCurrentPage("products/" + event.target.id);
    }
  };

  handlePantryClick = value => {
    this.props.setproductToAddToPantry(value);
  };

  handleHeartClick = targetIndex => {
    const email = sessionStorage.getItem("currentUser");
    if (email !== null && email !== "") {
      const { productId, regionId, coordinates } = this.props.currentMarkers[
        targetIndex
      ];
      //add/delete product from favourite
      fetch(
        "http://localhost:8080/fav/" +
          email +
          "/" +
          productId +
          "/" +
          regionId +
          "/" +
          coordinates +
          "",
        { method: "POST" }
      )
        .then(response => response.json())
        .then(data => {
          const updatedCurrentMarkers = this.props.currentMarkers.map(
            (product, index) => {
              if (targetIndex === index) {
                return {
                  ...product,
                  isFavourite: data
                };
              } else {
                return {
                  ...product
                };
              }
            }
          );
          // console.log("updatedCurrentMarkers")
          // console.log(updatedCurrentMarkers)
          this.props.setCurrentMarkers(updatedCurrentMarkers);
        }); //end of fetch
    } else {
      //user is guest
      //prompt guest to login
      document.getElementById("loginPopup").style.display = "inline-block";
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
        // console.log(product);
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
              region={product.regionName}
              regionId={product.regionId}
              coordinates={product.coordinates}
              actualProduct={product.productId}
              currPage={this.props.setCurrentPage}
              isFavourite={product.isFavourite}
              handleHeartClick={this.handleHeartClick}
              handlePantryClick={this.handlePantryClick}
            />
          </div>
        );
      });
    }

    // let productItems = this.props.currentMarkers.map(product => <Item key={product.id} name={product.item}/>)
    return (
      <div>
        <LoginPopup />
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

            <div className="profilePic" onClick={this.handleProfileClick}></div>
          </div>
          <div>
            <div className="head" style={{ marginBottom: "10px" }}>
              {this.props.header}
              {/* {this.props.header === null
              ? "Top 10 searched products"
              : "Products in " + this.props.header + " Region"} */}
            </div>
          </div>

          {productItems}
        </div>
      </div>
    );
  }
}

export default InfoBar;
