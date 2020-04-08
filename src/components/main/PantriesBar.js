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
    this.state = { email: sessionStorage.getItem("currentUser") };
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  fetchPantry = () => {
    const email = this.state.email;

    if (email !== null && email !== "") {
      fetch(
        "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/userPantries/" +
          email +
          "/"
      )
        .then((response) => response.json())
        .then((data) => {
          this.props.setUserPantries(data);
        });
    }
  };

  componentDidMount() {
    this.fetchPantry();
  }

  handleBackClick() {
    this.props.setCurrentPage("profile/");
  }

  handlePantryDelete = (id) => {
    let pantryId = id.substring(id.lastIndexOf("/") + 1, id.length);

    fetch(
      "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/deletepantry/" +
        pantryId +
        "/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.fetchPantry();
      });
  };
  handlePantryClick = (event) => {
    if (!isNaN(event.target.id) && event.target.id !== "") {
      this.props.setCurrentPage(
        "pantryinfo/" + this.state.email + "/" + event.target.id
      );
    }
  };

  newPantryButton() {
    return (
      <div
        className="profileOptions"
        onClick={() => {
          document.getElementById("createPantry").style.display =
            "inline-block";
        }}
      >
        <div
          style={{
            position: "relative",
            top: "15px",
            display: "inline-flex",
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
    let pantries = null;

    if (this.props.userPantries.length !== 0) {
      pantries = this.props.userPantries.map((pantry) => (
        <Pantry
          name={pantry.pantryName}
          id={pantry.pantryId}
          handlePantryDelete={this.handlePantryDelete}
        />
      ));
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
                  marginTop: "10px",
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
          {pantries}
        </div>
      </div>
    );
  }
}

export default PantriesBar;
