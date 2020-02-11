import React from "react";
import "./css/Item.css";
import { ReactSVG } from "react-svg";
import heart from "../../icons/heart.svg";
import more from "../../icons/more-vertical.svg";

class Item extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className=" d-flex justify-content-center">
        <div className="item">
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
          >
            {this.props.number}.
          </div>
          <div
            style={{
              display: "inline-block",
              color: "#7764E4",
              marginBottom: "7px",
              marginLeft: "25px",
              fontSize: "14px",
              width: "120px"
            }}
          >
            {this.props.name}
          </div>
          <div
            style={{
              display: "inline",
              color: "#8898AA",
              marginTop: "7px",
              marginBottom: "7px",
              marginLeft: "10px",
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
              marginLeft: "10px",
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
