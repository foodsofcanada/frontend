import React, { Component } from "react";
import "./css/InfoBar.css";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import Item from "./Item";

import { Spinner } from "react-bootstrap";

class FavoritesBar extends Component {
  constructor(props) {
    super();
    this.state = {};
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  /**
   * runs when the component first mounts
   */
  componentDidMount() {
    this.fetchFavourites();
  }

  /**
   * runs when the component rerenders
   */
  componentDidUpdate() {
    console.log("FavouriteBar updated");
  }

  /**
   * gets called when the "back" button is pressed
   */
  handleBackClick() {
    this.props.setCurrentPage("profile/");
  }

  /**
   * onClick to view product info
   */
  handleButtonClick = event => {
    if (!isNaN(event.target.id) && event.target.id !== "") {
      this.props.setPrevPage(this.props.currentPage);
      this.props.setCurrentPage("products/" + event.target.id);
    }
  };

  /**
   * handles the event Onclick to add/delete product from favourites
   * @param {Integer} targetIndex - the index of the selected product to add/delete product from favourites
   */
  handleHeartClick = targetIndex => {
    console.log("heart clicked");
    const email = sessionStorage.getItem("currentUser");
    if (email !== null && email !== "") {
      const { productId, regionId, coordinates } = this.props.currentMarkers[
        targetIndex
      ];
      //add/delete product from favourite
      fetch(
        "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/fav/" +
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
          this.fetchFavourites();
        }); //end of fetch
    }
  };

  /**
   * fetches the user's favourites
   */
  fetchFavourites = () => {
    fetch(
      "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/favourites/" +
      sessionStorage.getItem("currentUser")
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.setCurrentMarkers(data);
      });
  };

  /**
   * 
   */
  handlePantryClick = value => {
    this.props.setproductToAddToPantry(value);
  };

  /**
   * what to render on screen
   */
  render() {
    let productItems = null;
    let number = 0;
    if (this.props.currentMarkers.length === 0) {
      productItems = (
        <div
          style={{
            marginLeft: "20px",
            marginTop: "2.5%"
          }}
        >
          Nothing to show here...For now
          <br />
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
            Favorite Products
          </div>
        </div>
        <div style={{ marginBottom: "15px" }}>{productItems}</div>
      </div>
    );
  }
}

export default FavoritesBar;
