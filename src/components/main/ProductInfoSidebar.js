import React from "react";
import "./css/InfoBar.css";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import Item from "./Item";
import { Spinner, Dropdown, DropdownButton } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import heart from "../../icons/heart.svg";
import more from "../../icons/more-vertical.svg";

class ProductInfoSidebar extends React.Component {
  constructor(props) {
    super();
    this.state = { activeTab: "1" };
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleBackClick() {
    window.location.reload();
  }

  loadTab() {
    return (
      <div
        style={{
          backgroundColor: "#B9B8F27D",
          width: "100%",
          borderRadius: "15px",
          height: "10%",
          boxShadow: "0px 6px 6px #00000029",
          lineHeight: "45px"
        }}
      >
        <div
          style={{
            display: "inline-block",
            width: "33.3%",
            textAlign: "center",
            height: "100%",

            borderRadius: "15px 0  0 15px"
          }}
          className="tab"
          onClick={this.handleTabClick}
          id="1"
        >
          {this.state.activeTab === "1" ? (
            <span className="tabTitle activeTab"> GENERAL</span>
          ) : (
            <span className="tabTitle"> GENERAL</span>
          )}
        </div>
        <div
          style={{
            display: "inline-block",
            width: "33.3%",
            textAlign: "center",
            height: "100%"
          }}
          className="tab"
          onClick={this.handleTabClick}
          id="2"
        >
          {this.state.activeTab === "2" ? (
            <span className="tabTitle activeTab"> AGRICULTURE</span>
          ) : (
            <span className="tabTitle"> AGRICULTURE</span>
          )}
        </div>
        <div
          style={{
            display: "inline-block",
            width: "33.3%",
            textAlign: "center",
            height: "100%",

            borderRadius: "0 15px 15px 0"
          }}
          className="tab"
          onClick={this.handleTabClick}
          id="3"
        >
          {this.state.activeTab === "3" ? (
            <span className="tabTitle activeTab"> KITCHEN</span>
          ) : (
            <span className="tabTitle"> KITCHEN</span>
          )}
        </div>
      </div>
    );
  }

  handleTabClick(event) {
    this.setState({ activeTab: event.currentTarget.id });
  }

  render() {
    let productItems = null;
    let number = 0;
    let tab = this.loadTab();
    let cardContent = "";
    if (this.state.activeTab === "1") {
      cardContent = <p>General info</p>;
    }

    if (this.state.activeTab === "2") {
      cardContent = <p>AGRICULTURE info</p>;
    }

    if (this.state.activeTab === "3") {
      cardContent = <p>KITCHEN info</p>;
    }

    let moreButton = (
      <ReactSVG
        src={more}
        style={{
          height: "25px",

          marginLeft: "25px",
          stroke: "#172B4D",
          fill: "none"
        }}
      />
    );
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
            &nbsp;
          </div>
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

          <div className="profilePic"></div>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{
            marginTop: "75px"
          }}
        >
          <Carousel
            style={{
              width: "146px",
              height: "146px",
              borderRadius: "50%"
            }}
          >
            <Carousel.Item
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)`,
                width: "146px",
                height: "146px",
                borderRadius: "50%",
                backgroundSize: "cover"
              }}
            ></Carousel.Item>
            <Carousel.Item
              style={{
                backgroundImage: `url(https://www.w3schools.com/w3css/img_lights.jpg)`,
                width: "146px",
                height: "146px",
                borderRadius: "50%",
                backgroundSize: "cover"
              }}
            ></Carousel.Item>
            <Carousel.Item
              style={{
                backgroundImage: `url(https://cdn.mos.cms.futurecdn.net/LGoEDSKPxnLjMpJv4VaEK5.jpg)`,
                width: "146px",
                height: "146px",
                borderRadius: "50%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            ></Carousel.Item>
          </Carousel>
        </div>
        <div>
          <div style={{ display: "inline-flex" }}>
            <h2 class="head">Barley</h2>
          </div>
          <div
            style={{
              display: "inline-flex",
              float: "right",
              marginRight: "10px",
              fontSize: "10px",
              position: "relative",
              top: "15px"
            }}
          >
            <ReactSVG
              className="infoHeart"
              src={heart}
              style={{
                height: "25px",
                stroke: "#172B4D"
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
              <Dropdown.Item as="button">Add to Pantry</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#E2E7EC",
            width: "95%",
            height: "420px",
            borderRadius: "15px",
            marginLeft: "10px",
            boxShadow: "0px 3px 6px #00000029",
            color: "#5C5CA7",
            fontWeight: "bold"
          }}
        >
          {tab}
          <div className="cardContent" style={{ height: "90%" }}>
            {cardContent}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductInfoSidebar;
