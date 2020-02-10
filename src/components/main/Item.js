import React from "react";
import "./css/Item.css";
import { ReactSVG } from "react-svg";
import heart from "../../icons/heart.svg";
import more from "../../icons/more-vertical.svg";

class Item extends React.Component {
  render() {
    return (
      <div className=" d-flex justify-content-center">
        <div className="item">
          <div
            className="head"
            style={{
              display: "inline",
              color: "#7764E4",
              marginTop: "7px",
              marginBottom: "7px",
              fontSize: "30px"
            }}
          >
            1.
          </div>
          <div
            style={{
              display: "inline-flex",
              color: "#7764E4",
              marginBottom: "7px",
              marginLeft: "45px",
              fontSize: "15px"
            }}
          >
            Lettuce
          </div>
          <div
            style={{
              display: "inline",
              color: "#8898AA",
              marginTop: "7px",
              marginBottom: "7px",
              marginLeft: "65px",
              fontSize: "10px",
              textTransform: "uppercase"
            }}
          >
            Priaries
          </div>
          <div
            style={{
              display: "inline-flex",
              color: "#8898AA",
              marginLeft: "5%",
              fontSize: "10px",
              position: "relative",
              top: "-4.5px"
            }}
          >
            <ReactSVG
              src={heart}
              style={{
                height: "30px",
                stroke: "#7764E4",
                fill: "none"
              }}
            />
            <ReactSVG
              src={more}
              style={{
                height: "30px",
                stroke: "#7764E4",
                fill: "none",
                marginLeft: "25px",
                stroke: "#7764E4",
                fill: "none"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
